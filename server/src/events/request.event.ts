import { Group } from "../models/group.model";
import { Socket } from "socket.io";
import { iGroup, iGroupDoc } from "../models/group.imodel";
import { ChatMethods } from "../data/chat.data";
import { GeneralMethods } from "../data/misc.data";
import { User, chatType } from "../models/user.model";
import { ValidateMethods } from "../util/validate.util";
import { iUser, iUserDoc } from "../models/user.imodel";
import { UpdateWriteOpResult } from "mongoose";
import { RedisMethods, RedisMethods as redis } from "../services/redis.srvcs";
import { APIError, newApiError } from "../global/httpErrors.global";
import { SocketMethods as socket } from "../services/socket.srvcs";
import {
  GenRelations,
  GenRequests,
  genRequestState,
  requestPath as reqPath,
} from "../models/gen.model";
import {
  iGenRequest,
  iGenRequestState,
  iNewGenRequests,
  iRelation,
  iGenRequestActions,
  iGenRequestBody,
  iGenRequestPath,
  iGenRelations,
  iGenRequests,
  iGenRelationsDoc,
} from "../models/gen.imodel";
import { RedisFlushModes } from "redis";
import cookieSession from "cookie-session";

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

export const postRequest = async (
  data: iGenRequestBody,
  soc: Socket,
  clients: Map<string, Socket>
): Promise<boolean | undefined> => {
  // DATA GATHERING
  const reqUser = (soc.request as any).user as iUserDoc;
  const userId: string = reqUser.act_id.accnt_id;

  // VALIDATION: returns an error if client sent data in invalid
  const reqBodyValid = ValidateMethods.requestBody(data, userId);
  if (!reqBodyValid.isValid) {
    return soc.emit(
      socket.serverErrRev,
      newApiError(400, "invalid user request data", reqBodyValid.error)
    );
  }

  // DATA GATHERING: FURTHER
  const { type: requestType, recipientId, groupId } = data as iGenRequestBody;

  let request: iGenRequest, newReqs!: iNewGenRequests | APIError | Error;

  /*
    REQUEST TYPES
    type 1 - USER  USER
    type 2 - USER  GROUP
    type 3 - GROUP USER
    */

  //  SETTING REQUEST DATABASE PATH
  const { requestPath, senderId, receiverId } = configRequestVars(
    requestType,
    userId,
    recipientId,
    groupId
  );

  // SEARCH FOR USER & RECEIVER
  const userRecipient = await getUserRecipient(
    requestType,
    senderId,
    receiverId,
    reqUser
  );
  if (userRecipient instanceof APIError || userRecipient instanceof Error)
    return soc.emit(socket.serverErrRev, userRecipient);
  const { user, recipient } = userRecipient;

  // VALIDATION: returns error if user | recipient is within recipient | user relations
  const v = await validateWithinUserReqErr(
    senderId,
    receiverId,
    user,
    recipient
  );
  if (v instanceof APIError || v instanceof Error)
    return soc.emit(socket.serverErrRev, v);

  // PROCESS: return user requests
  const userReqs = await getUserReqs(receiverId, user, requestPath);
  if (userReqs instanceof APIError || userReqs instanceof Error)
    return soc.emit(socket.serverErrRev, userReqs);
  const { incoming, outgoing } = userReqs;

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
      return soc.emit(socket.serverErrRev, newReqs);

    await postRequestR(
      requestType,
      senderId,
      receiverId,
      soc,
      clients,
      newReqs
    );
    return;
  }

  // FURTHER PROCESS IF A PREVIOUS request item MATCHED
  incoming.length ? (request = incoming[0]) : (request = outgoing[0]);
  if (request.status === genRequestState.approved) {
    // VALIDATION: return error if previous request is already approved
    return soc.emit(
      socket.serverErrRev,
      newApiError(400, "user request is already approved")
    );
  } else if (request.status === genRequestState.pending) {
    // VALIDATION: return error if previous request is already pending
    return soc.emit(
      socket.serverErrRev,
      newApiError(400, "user request is pending")
    );
  }

  // FURTHER PROCESS IF A PREVIOUS REQUEST IRS REJECTED OR CANCELLED, UPDATE request items TO "pending"

  /*
    IF PREVIOUS REQUEST BELONGS TO RECIPIENT, 
    ----- DELETE (pull) PREVIOUS request items FROM CURRENT ARRAYS
    ----- CREATE (push) NEW request items ON CONPLEMENTING ARRAYS
    ----- DELETE PREVIOUS cache request items
    ----- CREATE NEW cache request items
  */
  if (incoming.length) {
    // DELETE request item
    const dDb = await deleteDbRequests(
      user,
      recipient,
      senderId,
      receiverId,
      requestPath
    );
    if (dDb instanceof APIError || dDb instanceof Error)
      return soc.emit(socket.serverErrRev, dDb);

    // DELETE CACHE request items
    const dC = await deleteCacheRequests(senderId, receiverId);
    if (dC instanceof APIError || dC instanceof Error)
      return soc.emit(socket.serverErrRev, dC);

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
      return soc.emit(socket.serverErrRev, newReqs);
  } else {
    /*
      IF PREVIOUS REQUEST BELONGS TO USER, 
      ----- MODIFY PREVIOUS request items
    */

    // UPDATE DB request items
    const upDb = await updateDbRequests(
      senderId,
      receiverId,
      user,
      recipient,
      requestPath
    );
    if (upDb instanceof APIError || upDb instanceof Error)
      return soc.emit(socket.serverErrRev, upDb);

    // UPDATE CACHE request items
    const upC = await updateCacheRequests(senderId, receiverId);
    if (upC instanceof APIError || upC instanceof Error)
      return soc.emit(socket.serverErrRev, upC);

    // GET NEW REQESTS
    newReqs = await getNewCacheRequests(receiverId, senderId);
    if (newReqs instanceof APIError || newReqs instanceof Error)
      return soc.emit(socket.serverErrRev, newReqs);
  }

  // EMIT RESPONDING SOCKET EV
  const r = await postRequestR(
    requestType,
    senderId,
    receiverId,
    soc,
    clients,
    newReqs as iNewGenRequests
  );
  if (r instanceof APIError || r instanceof Error)
    return soc.emit(socket.serverErrRev, r);
};

// SUB FUNCTIONS

export function configRequestVars(
  requestType: 1 | 2 | 3,
  userId: string,
  recipientId: string,
  groupId: string
): { requestPath: iGenRequestPath; senderId: string; receiverId: string } {
  let requestPath: iGenRequestPath, senderId: string, receiverId: string;

  requestType === 1
    ? (requestPath = reqPath.invitations)
    : (requestPath = reqPath.memberships);

  //  SETTING SENDER & RECEIVER IDs
  requestType !== 3 ? (senderId = userId) : (senderId = groupId);
  requestType !== 2 ? (receiverId = recipientId) : (receiverId = groupId);

  return { requestPath, senderId, receiverId };
}

export async function getUserRecipient(
  requestType: 1 | 2 | 3,
  senderId: string,
  receiverId: string,
  reqUser: iUserDoc
): Promise<
  | { user: iUserDoc & iGroupDoc; recipient: iUserDoc & iGroupDoc }
  | APIError
  | Error
> {
  let user: (iUserDoc & iGroupDoc) | null;
  let recipient: (iUserDoc & iGroupDoc) | null;

  try {
    if (requestType !== 3) {
      user = reqUser as iUserDoc & iGroupDoc;
    } else {
      user = await Group.findOne<iGroupDoc>({ grp_id: senderId }).lean();
    }
    if (requestType !== 2) {
      recipient = await User.findOne<iUserDoc>({
        "act_id.accnt_id": receiverId,
      }).lean();
    } else {
      recipient = await Group.findOne<iGroupDoc>({ grp_id: receiverId }).lean();
    }

    if (!user || !recipient) {
      return newApiError(404, "server found no user");
    }

    return { user, recipient };
  } catch (err) {
    return newApiError(500, "server is unable to search for user", err);
  }
}

export async function validateWithinUserReqErr(
  senderId: string,
  receiverId: string,
  user: iUserDoc & iGroupDoc,
  recipient: iUserDoc & iGroupDoc
): Promise<void | APIError | Error> {
  try {
    const userRelations = await GenRelations.findOne({
      str_id: user.relations,
      "relations.list": {
        $elemMatch: { accnt_id: receiverId },
      },
    }).lean();

    const recipientRelations = await GenRelations.findOne({
      str_id: recipient.relations,
      "relations.list": {
        $elemMatch: { accnt_id: senderId },
      },
    }).lean();

    if (userRelations || recipientRelations) {
      return newApiError(400, "user is already connected to this person");
    }
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for user's relations",
      err
    );
  }
}

export async function getUserReqs(
  receiverId: string,
  user: iUserDoc & iGroupDoc,
  requestPath: iGenRequestPath
): Promise<
  | { incoming: Array<iGenRequest>; outgoing: Array<iGenRequest> }
  | APIError
  | Error
> {
  let userRequests: any;

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
    if (!Object.keys(userRequests[0]).length) {
      return newApiError(404, "server found no matching user requests");
    }
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for user's requests",
      err
    );
  }

  const incoming: Array<iGenRequest> = userRequests[0].incoming;
  const outgoing: Array<iGenRequest> = userRequests[0].outgoing;

  return { incoming, outgoing };
}

export async function deleteDbRequests(
  user: iUserDoc & iGroupDoc,
  recipient: iUserDoc & iGroupDoc,
  senderId: string,
  receiverId: string,
  requestPath: iGenRequestPath
): Promise<void | APIError | Error> {
  try {
    const updateResponse = await GenRequests.updateOne(
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
      return newApiError(500, "user's requests is unsuccesfully updated");
    }
  } catch (err) {
    return newApiError(500, "server is unable to update user's requests");
  }

  // DELETE request item
  try {
    const updateResponse = await GenRequests.updateOne(
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
      return newApiError(500, "recipient's requests is unsuccesfully updated");
    }
  } catch (err) {
    return newApiError(
      500,
      "server is unable to update recipient's update requests",
      err
    );
  }
}

export async function deleteCacheRequests(
  senderId: string,
  receiverId: string
): Promise<void | APIError | Error> {
  const tx = redis.client.multi();
  tx.json.del(redis.requestInSetItemName(senderId, receiverId));
  tx.json.del(redis.requestOutSetItemName(receiverId, senderId));

  try {
    await tx.exec();
  } catch (err) {
    return newApiError(
      500,
      "server failed to execute cache transaction for deleting request set items",
      err
    );
  }
}

export async function updateDbRequests(
  senderId: string,
  receiverId: string,
  user: iUserDoc & iGroupDoc,
  recipient: iUserDoc & iGroupDoc,
  requestPath: iGenRequestPath
) {
  try {
    const updateResponse = await GenRequests.updateOne(
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
      return newApiError(500, "server modified no user request");
    }
  } catch (err) {
    return newApiError(500, "server is unable to update user request", err);
  }

  try {
    const updateResponse = await GenRequests.updateOne(
      {
        str_id: recipient.requests,
        [`requests.${requestPath}.incoming`]: {
          $elemMatch: { accnt_id: senderId },
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
      return newApiError(500, "server modified no recipient request");
    }
  } catch (err) {
    return newApiError(
      500,
      "server is unable to update recipient requests",
      err
    );
  }
}

export async function updateCacheRequests(
  senderId: string,
  receiverId: string
): Promise<void | APIError | Error> {
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
    return newApiError(
      500,
      "server failed to execute request update cache transaction",
      err
    );
  }
}

export async function getNewCacheRequests(
  receiverId: string,
  senderId: string
): Promise<iNewGenRequests | APIError | Error> {
  try {
    const newInReq = await redis.client.json.get(
      redis.requestInSetItemName(receiverId, senderId)
    );
    const newOutReq = await redis.client.json.get(
      redis.requestOutSetItemName(senderId, receiverId)
    );

    return {
      newInReq,
      newOutReq,
    } as unknown as iNewGenRequests;
  } catch (err) {
    return newApiError(
      500,
      "server failed to retrieve new request caches",
      err
    );
  }
}

export async function postRequestR(
  type: 1 | 2 | 3,
  senderId: string,
  receiverId: string,
  soc: Socket,
  clients: Map<string, Socket>,
  newReqs: iNewGenRequests
): Promise<void | APIError | Error> {
  let receiverSocketId: string;

  let groupChatId!: string | APIError | Error;
  if (type !== 1)
    groupChatId = await getGroupChatId(type === 2 ? receiverId : senderId);
  if (groupChatId instanceof APIError || groupChatId instanceof Error)
    return groupChatId;

  // EMIT REPLY EVENT TO senderId

  if (type !== 3) {
    soc.emit(socket.postRequestRev, newReqs.newOutReq, 0, type);
  } else {
    soc.emit(socket.postRequestRev, newReqs.newOutReq, 0, type, groupChatId);
    soc
      .to(groupChatId)
      .emit(socket.postRequestRev, newReqs.newOutReq, 0, type, groupChatId);
  }

  // EMIT REPLY EVENT TO receiverId
  if (type !== 2) {
    try {
      receiverSocketId = (await redis.client.get(
        redis.userSessionName(receiverId)
      )) as string;

      // --- return socket.emit
      // arg1
      // iRequest
      // arg2
      // 0 --- outgoing
      // 1 --- incoming
    } catch (err) {
      return newApiError(
        500,
        "server is unable to search for user session caches",
        err
      );
    }

    if (receiverSocketId && clients.get(receiverSocketId)) {
      clients
        .get(receiverSocketId)!
        .emit(socket.postRequestRev, newReqs.newInReq, 1, type);
    }
  } else {
    soc.join(groupChatId);
    soc
      .to(groupChatId)
      .emit(socket.postRequestRev, newReqs.newInReq, 1, type, groupChatId);
    soc.leave(groupChatId);
  }
}

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

export const patchRequest = async (
  reqBody: iGenRequestBody,
  action: iGenRequestActions,
  soc: Socket,
  clients: Map<string, Socket>
): Promise<boolean | undefined> => {
  // DATA
  const reqUser = (soc.request as any).user as iUserDoc;
  const userId: string = ((soc.request as any).user as iUser).act_id.accnt_id;

  // VALIDATION: returns error if data sent are invalid
  const patchRequestValid = ValidateMethods.patchRequestBody(
    userId,
    reqBody,
    action
  );
  if (!patchRequestValid.isValid) {
    return soc.emit(
      socket.serverErrRev,
      newApiError(400, "patch request data is invalid", patchRequestValid.error)
    );
  }

  // DATA GATHERING: further
  const { type, recipientId, groupId } = reqBody;

  let newUserRelation!: iRelation;
  let newRecipientRelation!: iRelation;

  // CONFIG VARIABLES
  const { senderId, receiverId } = configPatchReqVar(
    userId,
    recipientId,
    groupId,
    type
  );

  // DATA GATHERING: SENDER & RECEIVER COMPONENTS
  const userRecipient = await getUserRecipient(
    type,
    senderId,
    receiverId,
    reqUser
  );
  if (userRecipient instanceof APIError || userRecipient instanceof Error)
    return soc.emit(socket.serverErrRev, userRecipient);
  const { user, recipient } = userRecipient;

  // VALIDATION: returns error if type 3 requestor is not a group admin
  if (type === 3) {
    const vGrp = await isNotAdminErr(userId, user);
    if (vGrp instanceof APIError || vGrp instanceof Error)
      return soc.emit(socket.serverErrRev, vGrp);
  }

  // DATA GATHERING: MISC

  const {
    newStatus,
    userList,
    recipientList,
    senderKey,
    receiverKey,
    requestPath,
  } = configPatchReqVar2(senderId, receiverId, action, type);

  // UPDATE request items in DB
  const upDb = await updateDbPatchReqs(
    user,
    recipient,
    senderId,
    receiverId,
    userList,
    recipientList,
    newStatus,
    requestPath
  );
  if (upDb instanceof APIError || upDb instanceof Error)
    return soc.emit(socket.serverErrRev, upDb);

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
    let userHBump: APIError | Error | number = 0;
    let recipientHBump: APIError | Error | number = 0;

    // UPDATE hBump
    if (type !== 3) {
      userHBump = await getUserHBump(senderId, user, tx);
      if (userHBump instanceof APIError || userHBump instanceof Error)
        return soc.emit(socket.serverErrRev, userHBump);
    }

    if (type !== 2) {
      recipientHBump = await getRecipientHBump(receiverId, recipient, tx);
      if (recipientHBump instanceof APIError || recipientHBump instanceof Error)
        return soc.emit(socket.serverErrRev, recipientHBump);
    }

    // CREATE chat IN DB
    const chat_id = await createNewChat(user, recipient, type);
    if (chat_id instanceof APIError || chat_id instanceof Error)
      return soc.emit(socket.serverErrRev, chat_id);

    // create new relations object
    newUserRelation = GeneralMethods.createRelationObj(
      {
        accnt_id: receiverId,
        accnt_name: type !== 2 ? recipient.act_name : recipient.grp_name,
      },
      type === 1 ? chatType.user : chatType.group,
      false,
      chat_id,
      userHBump
    );
    newRecipientRelation = GeneralMethods.createRelationObj(
      {
        accnt_id: senderId,
        accnt_name: type !== 3 ? user.act_name : user.grp_name,
      },
      type === 1 ? chatType.user : chatType.group,
      false,
      chat_id,
      recipientHBump
    );

    // update relations in db with new relations object
    const upDb = await updateDbRels(
      senderId,
      receiverId,
      user,
      recipient,
      userHBump,
      recipientHBump,
      newUserRelation,
      newRecipientRelation,
      tx
    );
    if (upDb instanceof APIError || upDb instanceof Error)
      return soc.emit(socket.serverErrRev, upDb);
  } else {
    newUserRelation = {
      accnt_id: receiverId,
      type: type !== 3 ? "user" : "group",
    } as iRelation;
    newRecipientRelation = {
      accnt_id: senderId,
      type: type !== 2 ? "user" : "group",
    } as iRelation;
  }

  // EXECUTE CACHE TRANSACTIONS
  const t = await executeCacheTransaction(tx);
  if (t instanceof APIError || t instanceof Error)
    return soc.emit(socket.serverErrRev, t);

  // ADD SOCKET EVENT - create request item to client browsers if active
  const socR = await patchRequestR(
    type,
    action,
    senderId,
    receiverId,
    newStatus,
    soc,
    clients,
    newUserRelation,
    newRecipientRelation
  );
  if (socR instanceof APIError || socR instanceof Error)
    return soc.emit(socket.serverErrRev, socR);
};

// SUB FUNCTIONS

export function configPatchReqVar(
  userId: string,
  recipientId: string,
  groupId: string,
  type: 1 | 2 | 3
): { senderId: string; receiverId: string } {
  let senderId: string, receiverId: string;
  type !== 3 ? (senderId = userId) : (senderId = groupId);
  type !== 2 ? (receiverId = recipientId) : (receiverId = groupId);

  return { senderId, receiverId };
}

export async function isNotAdminErr(
  userId: string,
  user: iUserDoc | iGroupDoc
): Promise<void | APIError | Error> {
  try {
    const isGrpAdmin = await GenRelations.findOne({
      str_id: user.relations,
      [`relations.list`]: {
        $elemMatch: {
          accnt_id: userId,
          admin: true,
        },
      },
    }).lean();

    if (!isGrpAdmin) {
      return newApiError(403, "user is forbidden to act on this request");
    }
  } catch (err) {
    return newApiError(500, "server is unable to search relations", err);
  }
}

export function configPatchReqVar2(
  senderId: string,
  receiverId: string,
  action: iGenRequestActions,
  type: 1 | 2 | 3
): {
  newStatus: iGenRequestState;
  userList: "incoming" | "outgoing";
  recipientList: "incoming" | "outgoing";
  senderKey: string;
  receiverKey: string;
  requestPath: iGenRequestPath;
} {
  let newStatus!: iGenRequestState;
  let userList!: "incoming" | "outgoing";
  let recipientList!: "incoming" | "outgoing";
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

  type === 1
    ? (requestPath = reqPath.invitations)
    : (requestPath = reqPath.memberships);

  return {
    newStatus,
    userList,
    recipientList,
    senderKey,
    receiverKey,
    requestPath,
  };
}

export async function updateDbPatchReqs(
  user: iUserDoc & iGroupDoc,
  recipient: iUserDoc & iGroupDoc,
  senderId: string,
  receiverId: string,
  userList: "incoming" | "outgoing",
  recipientList: "incoming" | "outgoing",
  newStatus: iGenRequestState,
  requestPath: iGenRequestPath
): Promise<void | APIError | Error> {
  try {
    const userReqUpdateRes = await GenRequests.updateOne(
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

    const recReqUpdateRes = await GenRequests.updateOne(
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
    if (userReqUpdateRes.modifiedCount < 1) return;
    newApiError(500, "server is unable to update sender requests");

    // VALIDATION: returns error if no modification occured
    if (recReqUpdateRes.modifiedCount < 1)
      return newApiError(500, "server is unable to update receiver requests");
  } catch (error) {
    return newApiError(500, "server is unable to find requests", error);
  }
}

export async function getUserHBump(
  senderId: string,
  user: iUserDoc & iGroupDoc,
  tx: any
): Promise<APIError | Error | number> {
  try {
    const userHBump: iGenRelationsDoc | null =
      await GenRelations.findOne<iGenRelationsDoc>({
        str_id: user.relations,
      }).lean();

    if (!userHBump) {
      await redis.discard();
      return newApiError(404, "user | group relations not found");
    }

    tx.json.numIncrBy(redis.relationItemName(senderId), "$.hBump", 1);

    return userHBump.relations.hBump + 1;
  } catch (err) {
    await redis.discard();
    return newApiError(500, "server cannot update user relations", err);
  }
}

export async function getRecipientHBump(
  receiverId: string,
  recipient: iUserDoc & iGroupDoc,
  tx: any
): Promise<APIError | Error | number> {
  try {
    const recipientHBump: iGenRelationsDoc | null =
      await GenRelations.findOne<iGenRelationsDoc>({
        str_id: recipient.relations,
      }).lean();

    if (!recipientHBump) {
      await redis.discard();
      return newApiError(404, "user | group relations not found");
    }

    tx.json.numIncrBy(redis.relationItemName(receiverId), "$.hBump", 1);
    return recipientHBump.relations.hBump + 1;
  } catch (err) {
    await redis.discard();
    return newApiError(500, "server cannot update user relations", err);
  }
}

export async function createNewChat(
  user: iUserDoc & iGroupDoc,
  recipient: iUserDoc & iGroupDoc,
  type: 1 | 2 | 3
): Promise<string | APIError | Error> {
  let chat_id!: string | APIError | Error;

  if (type === 1) {
    try {
      chat_id = await ChatMethods.createChat();

      if (chat_id instanceof APIError || chat_id instanceof Error) {
        await redis.discard();
        return chat_id;
      }
    } catch (err) {
      await redis.discard();
      return newApiError(500, "server is unable to create chat", err);
    }

    const c = await RedisMethods.createChatIndex(chat_id);
    if (c instanceof APIError || c instanceof Error) {
      await redis.discard();
      return c;
    }
  } else if (type === 2) {
    chat_id = recipient.chat_id;
  } else if (type === 3) {
    chat_id = user.chat_id;
  }

  return chat_id;
}

export async function updateDbRels(
  senderId: string,
  receiverId: string,
  user: iUserDoc & iGroupDoc,
  recipient: iUserDoc & iGroupDoc,
  userHBump: any,
  recipientHBump: any,
  newUserRelation: iRelation,
  newRecipientRelation: iRelation,
  tx: any
): Promise<void | APIError | Error> {
  try {
    const userUpdateResponse = await GenRelations.updateOne(
      {
        str_id: user.relations,
      } as iGenRelations,
      {
        "relations.hBump": userHBump,
        $push: {
          "relations.list": newUserRelation,
        },
      }
    );

    const recUpdateResponse = await GenRelations.updateOne(
      {
        str_id: recipient.relations,
      } as iGenRelations,
      {
        "relations.hBump": recipientHBump,
        $push: {
          "relations.list": newRecipientRelation,
        },
      }
    );

    if (userUpdateResponse.modifiedCount < 1) {
      await redis.discard();

      return newApiError(500, "server cannot update user relations");
    }
    if (recUpdateResponse.modifiedCount < 1) {
      await redis.discard();

      return newApiError(500, "server cannot update recipient relations");
    }

    tx.json.set(
      redis.relationSetItemName(senderId, receiverId),
      "$",
      redis.redifyObj(newUserRelation)
    );
    tx.json.set(
      redis.relationSetItemName(receiverId, senderId),
      "$",
      redis.redifyObj(newRecipientRelation)
    );

    // EMIT SOCKET FOR NEW REL ITEM
  } catch (err) {
    await redis.discard();
    return newApiError(500, "server cannot update user relations", err);
  }
}

export async function executeCacheTransaction(
  tx: any
): Promise<void | APIError | Error> {
  try {
    await tx.exec();
  } catch (err) {
    return newApiError(
      500,
      "server is unable to execute transaction for request patch",
      err
    );
  }
}

export async function getGroupChatId(
  groupId: string
): Promise<string | APIError | Error> {
  try {
    const g = await redis.client.ft.search(
      redis.groupIdxStr,
      `@grp_id:(${groupId})`
    );

    if (!g.documents.length)
      return newApiError(404, "server found no matching group id");

    return (g.documents[0].value as unknown as iGroup).chat_id;
  } catch (err) {
    return newApiError(500, "server is unable to retrieve group cache", err);
  }
}

export async function patchRequestR(
  reqType: 1 | 2 | 3,
  action: iGenRequestActions,
  senderId: string,
  receiverId: string,
  newStatus: iGenRequestState,
  soc: Socket,
  clients: Map<string, Socket>,
  newUserRelation: iRelation,
  newRecipientRelation: iRelation
): Promise<void | APIError | Error> {
  try {
    // --- return socket.emit
    // arg1
    // iRequest
    // arg2
    // 0 --- outgoing
    // 1 --- incoming
    const senderType: 1 | 0 = action === "cancel" ? 0 : 1;
    const receiverType: 1 | 0 = action === "cancel" ? 1 : 0;

    let groupChatId!: string | APIError | Error;
    if (reqType === 2 || reqType === 3) {
      groupChatId = await getGroupChatId(reqType === 2 ? receiverId : senderId);
      if (groupChatId instanceof APIError || groupChatId instanceof Error)
        soc.emit(socket.serverErrRev, groupChatId);
    }
    if (groupChatId instanceof APIError || groupChatId instanceof Error)
      return groupChatId;

    if (reqType !== 3) {
      soc.emit(
        socket.patchRequestRev,
        receiverId,
        senderType,
        {
          newStatus: newStatus,
          relItem: newUserRelation,
        },
        reqType
      );
    } else {
      soc.emit(
        socket.patchRequestRev,
        receiverId,
        senderType,
        {
          newStatus: newStatus,
          relItem: newUserRelation,
        },
        reqType,
        groupChatId
      );
      soc.to(groupChatId).emit(
        socket.patchRequestRev,
        receiverId,
        senderType,
        {
          newStatus: newStatus,
          relItem: newUserRelation,
        },
        reqType,
        groupChatId
      );
    }

    if (reqType !== 2) {
      const receiverSocketId = await redis.client.get(
        redis.userSessionName(receiverId)
      );

      if (receiverSocketId && clients.get(receiverSocketId)) {
        clients.get(receiverSocketId)!.emit(
          socket.patchRequestRev,
          senderId,
          receiverType,
          {
            newStatus: newStatus,
            relItem: newRecipientRelation,
          },
          reqType
        );
      }
    } else {
      soc.join(groupChatId);
      soc.to(groupChatId).emit(
        socket.patchRequestRev,
        senderId,
        receiverType,
        {
          newStatus: newStatus,
          relItem: newRecipientRelation,
        },
        reqType,
        groupChatId
      );
      soc.leave(groupChatId);
    }
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for user session caches",
      err
    );
  }
}
