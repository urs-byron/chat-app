import { Group } from "../../models/group.model.js";
import { APIError } from "../../global/httpErrors.global.js";
import { newApiError } from "../../global/httpErrors.global.js";
import { ChatMethods } from "../../data/chat.data.js";
import { RequestHandler } from "express";
import { GeneralMethods } from "../../data/misc.data.js";
import { ValidateMethods } from "../../util/validate.util.js";
import { PassportSession } from "../../models/auth.imodel.js";
import { UpdateWriteOpResult } from "mongoose";
import { RedisMethods as redis } from "../../services/redis.srvcs.js";
import {
  GenRelations,
  GenRequests,
  genRequestState,
  requestPath as reqPath,
} from "../../models/gen.model.js";
import {
  iGenRequestPath,
  iGenRequestBody,
  iNewGenRequests,
  iGenRequest,
  iGenRequestSet,
  iGenRequestActions,
  iGenRequestState,
  iRelation,
  iGenRelations,
  iGenRequests,
} from "../../models/gen.imodel.js";
import { User, chatType } from "../../models/user.model.js";
/*
// URGENT
validation --------- DONE
caching ------------ DONE
promisify ---------- DONE
error-handling ----- DONE
response ----------- DONE

// URGENT
import ------------- DONE
comment ------------ DONE
*/

export const postRequest: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  let userId: string = (req.session as PassportSession).passport.user;

  // VALIDATION: returns an error if client sent data in invalid
  const reqBodyValid = ValidateMethods.requestBody(
    req.body as iGenRequestBody,
    userId
  );
  if (!reqBodyValid.isValid) {
    return next(
      newApiError(400, "invalid user request data", reqBodyValid.error)
    );
  }

  // DATA GATHERING: FURTHER
  const {
    type: requestType,
    recipientId,
    groupId,
  } = req.body as iGenRequestBody;
  let requestPath!: iGenRequestPath;
  let user: any;
  let senderId: string;
  let recipient: any;
  let receiverId: string;
  let userRequests: any;
  let userRelations: any;
  let recipientRelations: any;
  let newReqs: iNewGenRequests | APIError | Error;

  /*
  REQUEST TYPES
  type 1 - USER  USER
  type 2 - USER  GROUP
  type 3 - GROUP USER
  */

  //  SETTING REQUEST DATABASE PATH
  requestType === 1
    ? (requestPath = reqPath.invitations)
    : (requestPath = reqPath.memberships);

  //  SETTING SENDER & RECEIVER IDs
  requestType !== 3 ? (senderId = userId) : (senderId = groupId);
  requestType !== 2 ? (receiverId = recipientId) : (receiverId = groupId);

  // SEARCH FOR USER & RECEIVER
  try {
    if (requestType !== 3) {
      user = req.user;
    } else {
      user = await Group.findOne({ grp_id: senderId }).lean();
    }
    if (requestType !== 2) {
      recipient = await User.findOne({
        "act_id.accnt_id": receiverId,
      }).lean();
    } else {
      recipient = await Group.findOne({ grp_id: receiverId }).lean();
    }

    if (!user || !recipient) {
      return next(newApiError(404, "server found no user"));
    }
  } catch (err) {
    return next(newApiError(500, "server is unable to search for user", err));
  }

  // VALIDATION: returns error if user | recipient is within recipient | user relations
  try {
    userRelations = await GenRelations.findOne({
      str_id: user.relations,
      "relations.list": {
        $elemMatch: { accnt_id: receiverId },
      },
    }).lean();

    recipientRelations = await GenRelations.findOne({
      str_id: recipient.relations,
      "relations.list": {
        $elemMatch: { accnt_id: senderId },
      },
    }).lean();

    if (userRelations || recipientRelations) {
      return next(newApiError(400, "user is already connected to this person"));
    }
  } catch (err) {
    return next(
      newApiError(500, "server is unable to search for user's relations", err)
    );
  }

  try {
    const pipeline = [
      {
        $match: {
          str_id: { $eq: user.requests },
        },
      },
      {
        $project: {
          incoming: {
            $filter: {
              input: `$requests.${requestPath}.incoming`,
              as: "i",
              cond: {
                $or: [
                  {
                    $eq: ["$$i.accnt_id", receiverId],
                  },
                ],
              },
            },
          },
          outgoing: {
            $filter: {
              input: `$requests.${requestPath}.outgoing`,
              as: "o",
              cond: {
                $or: [
                  {
                    $eq: ["$$o.accnt_id", receiverId],
                  },
                ],
              },
            },
          },
        },
      },
    ];

    userRequests = await GenRequests.aggregate(pipeline);

    // VALIDATION: returns error if no matching user request is found
    if (userRequests[0].length < 1) {
      return next(newApiError(404, "server found no matching user requests"));
    }

    const incoming: iGenRequestSet = userRequests[0].incoming;
    const outgoing: iGenRequestSet = userRequests[0].outgoing;

    // CREATE NEW REQUESTS IF NO MATCHING request items ARE FOUND
    if (incoming.length < 1 && outgoing.length < 1) {
      newReqs = await GeneralMethods.createRequest(
        user,
        senderId,
        recipient,
        receiverId,
        requestType,
        requestPath
      );

      if (newReqs instanceof APIError || newReqs instanceof Error)
        return next(newReqs);

      return res.status(200).json({ statusCode: 200, data: null });
    }

    // FURTHER PROCESS IF A PREVIOUS request item MATCHED
    let request: iGenRequest;
    incoming.length ? (request = incoming[0]) : (request = outgoing[0]);
    if (request.status === genRequestState.approved) {
      // VALIDATION: return error if previous request is already approved
      return next(newApiError(400, "user request is already approved"));
    } else if (request.status === genRequestState.pending) {
      // VALIDATION: return error if previous request is already pending
      return next(newApiError(400, "user request is pending"));
    } else if (
      // FURTHER PROCESS IF A PREVIOUS REQUEST IRS REJECTED OR CANCELLED, UPDATE request items TO "pending"
      request.status === genRequestState.rejected ||
      request.status === genRequestState.cancelled
    ) {
      let updateResponse!: UpdateWriteOpResult;

      /*
      IF PREVIOUS REQUEST BELONGS TO RECIPIENT, 
      ----- DELETE (pull) PREVIOUS request items FROM CURRENT ARRAYS
      ----- CREATE (push) NEW request items ON CONPLEMENTING ARRAYS
      ----- DELETE PREVIOUS cache request items
      ----- CREATE NEW cache request items
      */
      if (incoming.length) {
        // DELETE request item
        try {
          updateResponse = await GenRequests.updateOne(
            {
              str_id: user.requests,
            } as iGenRequests,
            {
              $pull: {
                [`requests.${requestPath}.incoming`]: {
                  accnt_id: receiverId,
                },
              },
            }
          );

          // VALIDATION: returns error if no modification occured
          if (updateResponse.modifiedCount < 1) {
            return next(
              newApiError(500, "user's requests is unsuccesfully updated")
            );
          }
        } catch (err) {
          return next(
            newApiError(500, "server is unable to update user's requests")
          );
        }

        // DELETE request item
        try {
          updateResponse = await GenRequests.updateOne(
            {
              str_id: recipient.requests,
            } as iGenRequests,
            {
              $pull: {
                [`requests.${requestPath}.outgoing`]: {
                  accnt_id: senderId,
                },
              },
            }
          );

          // VALIDATION: returns error if no modification occured
          if (updateResponse.modifiedCount < 1) {
            return next(
              newApiError(500, "recipient's requests is unsuccesfully updated")
            );
          }
        } catch (err) {
          return next(
            newApiError(
              500,
              "server is unable to update recipient's update requests",
              err
            )
          );
        }

        // DELETE CACHE request items
        const tx = redis.client.multi();
        tx.json.del(redis.requestInSetItemName(senderId, receiverId));
        tx.json.del(redis.requestOutSetItemName(receiverId, senderId));

        try {
          await tx.exec();
        } catch (err) {
          return next(
            newApiError(
              500,
              "server failed to execute cache transaction for deleting request set items",
              err
            )
          );
        }

        // CREATE NEW request items in DB & CACHE
        newReqs = await GeneralMethods.createRequest(
          user,
          senderId,
          recipient,
          receiverId,
          requestType,
          requestPath
        );

        if (newReqs instanceof APIError || newReqs instanceof Error)
          return next(newReqs);
      } else {
        /*
        IF PREVIOUS REQUEST BELONGS TO USER, 
        ----- MODIFY PREVIOUS request items
        */

        // UPDATE DB request items
        try {
          updateResponse = await GenRequests.updateOne(
            {
              str_id: user.requests,
              [`requests.${requestPath}.outgoing`]: {
                $elemMatch: { accnt_id: receiverId },
              },
            },
            {
              $set: {
                [`requests.${requestPath}.outgoing.$.status`]:
                  genRequestState.pending,
              },
            }
          );

          if (updateResponse.modifiedCount < 1) {
            return next(newApiError(500, "server modified no user request"));
          }
        } catch (err) {
          return next(
            newApiError(500, "server is unable to update user request", err)
          );
        }

        try {
          updateResponse = await GenRequests.updateOne(
            {
              str_id: recipient.requests,
              [`requests.${requestPath}.incoming`]: {
                $elemMatch: { accnt_id: userId },
              },
            },
            {
              $set: {
                [`requests.${requestPath}.incoming.$.status`]:
                  genRequestState.pending,
              },
            }
          );

          if (updateResponse.modifiedCount < 1) {
            return next(
              newApiError(500, "server modified no recipient request")
            );
          }
        } catch (err) {
          return next(
            newApiError(
              500,
              "server is unable to update recipient requests",
              err
            )
          );
        }

        // UPDATE CACHE request items
        const tx = redis.client.multi();
        tx.json.set(
          redis.requestOutSetItemName(senderId, receiverId),
          "$.status",
          genRequestState.pending
        );
        tx.json.set(
          redis.requestInSetItemName(receiverId, senderId),
          "$.status",
          genRequestState.pending
        );

        try {
          await tx.exec();
        } catch (err) {
          return next(
            newApiError(
              500,
              "server failed to execute request update cache transaction",
              err
            )
          );
        }
      }
    }
  } catch (err) {
    return next(
      newApiError(500, "server is unable to search for user's requests", err)
    );
  }

  return res.status(200).json({ statusCode: 200, data: null });
};

/*
// URGENT
validation --------- DONE
caching ------------ DONE
promisify ---------- DONE
error-handling ----- DONE
response ----------- DONE

// URGENT
import ------------- DONE
comment ------------ DONE
*/

export const patchRequest: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId: string = (req.session as PassportSession).passport.user;
  const action: iGenRequestActions = req.params.action as iGenRequestActions;

  // VALIDATION: returns error if data sent are invalid
  const patchRequestValid = ValidateMethods.patchRequestBody(
    userId,
    req.body as iGenRequestBody,
    action
  );
  if (!patchRequestValid.isValid) {
    return next(
      newApiError(400, "patch request data is invalid", patchRequestValid.error)
    );
  }

  // DATA GATHERING: further
  const { type, recipientId, groupId } = req.body as iGenRequestBody;

  let user: any;
  let senderId: string;
  let recipient: any;
  let receiverId: string;
  let isGrpAdmin!: any;

  type !== 3 ? (senderId = userId) : (senderId = groupId);
  type !== 2 ? (receiverId = recipientId) : (receiverId = groupId);

  // DATA GATHERING: SENDER & RECEIVER COMPONENTS
  try {
    if (type !== 3) {
      user = req.user;
    } else {
      user = await Group.findOne({ grp_id: senderId }).lean();
    }
    if (type !== 2) {
      recipient = await User.findOne({ "act_id.accnt_id": receiverId }).lean();
    } else {
      recipient = await Group.findOne({ grp_id: receiverId }).lean();
    }

    if (!user || !recipient) {
      return next(newApiError(404, "user | group is not found"));
    }
  } catch (err) {
    return next(newApiError(500, "server is unable to find user | group", err));
  }

  // VALIDATION: returns error if type 3 requestor is not a group admin
  if (type === 3)
    try {
      isGrpAdmin = await GenRelations.findOne({
        str_id: user.relations,
        [`relations.list`]: {
          $elemMatch: {
            accnt_id: userId,
            admin: true,
          },
        },
      }).lean();

      if (!isGrpAdmin) {
        return next(
          newApiError(403, "user is forbidden to act on this request")
        );
      }
    } catch (err) {
      return next(
        newApiError(500, "server is unable to search relations", err)
      );
    }

  // DATA GATHERING: MISC
  let newStatus!: iGenRequestState;
  let userList: any;
  let recipientList: any;
  let senderKey!: string;
  let receiverKey!: string;

  if (action === "cancel") {
    userList = "outgoing";
    recipientList = "incoming";
    newStatus = genRequestState.cancelled;

    senderKey = redis.requestOutSetItemName(senderId, receiverId);
    receiverKey = redis.requestInSetItemName(receiverId, senderId);
  } else if (action === "reject") {
    userList = "incoming";
    recipientList = "outgoing";
    newStatus = genRequestState.rejected;

    senderKey = redis.requestInSetItemName(senderId, receiverId);
    receiverKey = redis.requestOutSetItemName(receiverId, senderId);
  } else if (action === "approve") {
    userList = "incoming";
    recipientList = "outgoing";
    newStatus = genRequestState.approved;

    senderKey = redis.requestInSetItemName(senderId, receiverId);
    receiverKey = redis.requestOutSetItemName(receiverId, senderId);
  }

  let requestPath!: iGenRequestPath;
  let userReqUpdateRes: iGenRequestActions | any;
  let recReqUpdateRes: iGenRequestActions | any;

  type === 1
    ? (requestPath = reqPath.invitations)
    : (requestPath = reqPath.memberships);

  // UPDATE request items in DB
  try {
    userReqUpdateRes = await GenRequests.updateOne(
      {
        str_id: user.requests,
        [`requests.${requestPath}.${userList}`]: {
          $elemMatch: {
            accnt_id: receiverId,
            status: genRequestState.pending,
          },
        },
      },
      {
        $set: { [`requests.${requestPath}.${userList}.$.status`]: newStatus },
      }
    );

    recReqUpdateRes = await GenRequests.updateOne(
      {
        str_id: recipient.requests,
        [`requests.${requestPath}.${recipientList}`]: {
          $elemMatch: {
            accnt_id: senderId,
            status: genRequestState.pending,
          },
        },
      },
      {
        $set: {
          [`requests.${requestPath}.${recipientList}.$.status`]: newStatus,
        },
      }
    );

    // VALIDATION: returns error if no modification occured
    if (userReqUpdateRes.modifiedCount < 1)
      return next(
        newApiError(500, "server is unable to update sender requests")
      );
    // VALIDATION: returns error if no modification occured
    if (recReqUpdateRes.modifiedCount < 1)
      return next(
        newApiError(500, "server is unable to update receiver requests")
      );
  } catch (error) {
    return next(newApiError(500, "server is unable to find requests", error));
  }

  // UPDATE request items CACHE
  const tx = redis.client.multi();
  tx.json.set(senderKey, "$.status", newStatus);
  tx.json.set(receiverKey, "$.status", newStatus);
  // tx.expire(senderKey, redis.days(3));
  // tx.expire(receiverKey, redis.days(3));

  // FURTHER PROCESS IF action === "approve"
  // ---- UPDATE sender & receiver hBump IN DB & CACHE
  // ---- CREATE CHAT DB IN DB & CACHE
  // ---- CREATE NEW relation items IN DB & CACHE
  if (action === "approve") {
    let userHBump: any = 0;
    let recipientHBump: any = 0;
    let chat_id: any;

    // UPDATE hBump
    if (type !== 3) {
      try {
        userHBump = await GenRelations.findOne({
          str_id: user.relations,
        }).lean();

        if (!userHBump) {
          await redis.discard();
          return next(newApiError(404, "user | group relations not found"));
        }

        userHBump = userHBump.relations.hBump + 1;

        tx.json.numIncrBy(redis.relationItemName(senderId), "$.hBump", 1);
      } catch (err) {
        await redis.discard();
        return next(
          newApiError(500, "server cannot update user relations", err)
        );
      }
    }

    if (type !== 2) {
      try {
        recipientHBump = await GenRelations.findOne({
          str_id: recipient.relations,
        }).lean();

        if (!recipientHBump) {
          await redis.discard();
          return next(newApiError(404, "user | group relations not found"));
        }

        recipientHBump = recipientHBump.relations.hBump + 1;

        tx.json.numIncrBy(redis.relationItemName(receiverId), "$.hBump", 1);
      } catch (err) {
        await redis.discard();
        return next(
          newApiError(500, "server cannot update user relations", err)
        );
      }
    }

    // CREATE chat IN DB
    if (type === 1) {
      try {
        chat_id = await ChatMethods.createChat();

        if (chat_id instanceof APIError || chat_id instanceof Error) {
          await redis.discard();
          return next(chat_id);
        }
      } catch (err) {
        await redis.discard();
        return next(newApiError(500, "server is unable to create chat", err));
      }
    } else if (type === 2) {
      chat_id = recipient.chat_id;
    } else if (type === 3) {
      chat_id = user.chat_id;
    }

    // create new relations object
    const new_user_relation = GeneralMethods.createRelationObj(
      {
        accnt_id: receiverId,
        accnt_name: type !== 2 ? recipient.act_name : recipient.grp_name,
      },
      type === 1 ? chatType.user : chatType.group,
      false,
      chat_id as string,
      userHBump
    );
    const new_recipient_relation = GeneralMethods.createRelationObj(
      {
        accnt_id: senderId,
        accnt_name: type !== 3 ? user.act_name : user.grp_name,
      },
      type === 1 ? chatType.user : chatType.group,
      false,
      chat_id as string,
      recipientHBump
    );

    // update relations in db with new relations object
    let userUpdateResponse!: UpdateWriteOpResult;
    let recUpdateResponse!: UpdateWriteOpResult;

    try {
      userUpdateResponse = await GenRelations.updateOne(
        {
          str_id: user.relations,
        } as iGenRelations,
        {
          "relations.hBump": userHBump,
          $push: {
            "relations.list": new_user_relation,
          },
        }
      );

      recUpdateResponse = await GenRelations.updateOne(
        {
          str_id: recipient.relations,
        } as iGenRelations,
        {
          "relations.hBump": recipientHBump,
          $push: {
            "relations.list": new_recipient_relation,
          },
        }
      );

      if (userUpdateResponse.modifiedCount < 1) {
        await redis.discard();

        return next(newApiError(500, "server cannot update user relations"));
      }
      if (recUpdateResponse.modifiedCount < 1) {
        await redis.discard();

        return next(
          newApiError(500, "server cannot update recipient relations")
        );
      }

      tx.json.set(
        redis.relationItemName(senderId),
        "$",
        redis.redifyObj(new_user_relation)
      );
      tx.json.set(
        redis.relationItemName(receiverId),
        "$",
        redis.redifyObj(new_recipient_relation)
      );
    } catch (err) {
      await redis.discard();
      return next(newApiError(500, "server cannot update user relations", err));
    }
  }

  try {
    await tx.exec();
  } catch (err) {
    return next(
      newApiError(
        500,
        "server is unable to execute transaction for request patch",
        err
      )
    );
  }

  return res.status(200).json({ statusCode: 200, data: null });
};
