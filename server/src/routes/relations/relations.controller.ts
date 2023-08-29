import { iUser } from "../../models/user.imodel";
import { Group } from "../../models/group.model";
import { maxPeers, relSkipCnt } from "../../global/search.global";
import { iChatType } from "../../models/chat.imodel";
import { iGroupDoc } from "../../models/group.imodel";
import { GeneralUtil } from "../../util/misc.util";
import { iValidityType } from "../../global/validity.global";
import { AggregateSteps } from "redis";
import { RequestHandler } from "express";
import { PassportSession } from "../../models/auth.imodel";
import { ValidateMethods } from "../../util/validate.util";
import { UpdateWriteOpResult } from "mongoose";
import { RedisMethods as redis } from "../../services/redis.srvcs";
import { APIError, newApiError } from "../../global/httpErrors.global";
import { GenRelations, contactType } from "../../models/gen.model";
import {
  iRelation,
  iGenRelBody,
  iRelationAct,
  iContactTypes,
} from "../../models/gen.imodel";

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

export const getUserRelations: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId: string = (req.session as PassportSession).passport.user;
  const {
    chatType,
    contactType: conType,
    groupId,
    skip: reqSkip,
  } = req.body as iGenRelBody;

  let userRelations!: any;

  // VALIDATION: returns error if client sent data is invalid
  const v = validateContactType(req.body as iGenRelBody);
  if (v instanceof APIError || v instanceof Error) return next(v);

  // FETCH group document if REQUESTOR IS A GROUP
  const relationsId: string | APIError | Error = await assignRelationsId(
    chatType,
    groupId!,
    req.user as iUser
  );
  if (relationsId instanceof APIError || relationsId instanceof Error)
    return next(relationsId);

  // CHECK user relation set
  const c = await checkRelSetCache(userId);
  if (c instanceof APIError || c instanceof Error) return next(c);

  if (c) {
    // FETCH user relations FROM CACHE BASED ON RELATION SET CHECK
    const { skip: rSkip, limit: rLimit } = GeneralUtil.getRedisSkipLimit(
      reqSkip,
      relSkipCnt
    );
    userRelations = await getCacheRels(
      chatType === "user" ? userId : groupId!,
      conType,
      rSkip,
      rLimit
    );
    if (userRelations instanceof APIError || userRelations instanceof Error)
      return next(userRelations);
  } else {
    // ELSE, FETCH user relations FROM DB
    const { skip: mSkip, limit: mLimit } = GeneralUtil.getMongoSkipLimit(
      reqSkip,
      relSkipCnt
    );
    userRelations = await getDocRels(relationsId, conType, mSkip, mLimit);
    if (userRelations instanceof APIError || userRelations instanceof Error)
      return next(userRelations);

    // DISABLED
    // const cG = await cacheRels(userId, userRelations);
    // if (cG instanceof APIError || cG instanceof Error) return next(cG);
  }

  // RESPONSE
  return res.status(200).json({
    statusCode: 200,
    data: userRelations,
  });
};

// SUB FUNCTION

/**
 * Input Validation
 *
 * @param { iGenRelBody } reqBody
 * @returns { void | APIError | Error }
 */
export function validateContactType(
  reqBody: iGenRelBody
): void | APIError | Error {
  const contactTypeValid = ValidateMethods.relationBody(reqBody);

  if (!contactTypeValid.isValid) {
    return newApiError(
      400,
      "client request with invalid contact type",
      contactTypeValid.error
    );
  }
}

/**
 * This function returns group data object.
 *
 * @param { string } groupId
 * @returns { Promise<iGroupDoc | APIError | Error> }
 */
export async function getDbGroup(
  groupId: string
): Promise<iGroupDoc | APIError | Error> {
  try {
    const group: iGroupDoc | null = await Group.findOne({
      grp_id: groupId,
    }).lean();

    if (!group) return newApiError(404, "server found no group in db");
    return group;
  } catch (err) {
    return newApiError(500, "server is unable to search for group", err);
  }
}

/**
 * Variable Assignment
 *
 * @param { iChatType } chatType
 * @param { string } groupId
 * @param { iUser } reqUser
 * @returns { Promise<string | APIError | Error> }
 */
export async function assignRelationsId(
  chatType: iChatType,
  groupId: string,
  reqUser: iUser
): Promise<string | APIError | Error> {
  let relationsId: string;

  if (chatType === "group") {
    const group: iGroupDoc | APIError | Error = await getDbGroup(groupId);
    if (group instanceof APIError || group instanceof Error) return group;
    else relationsId = group.relations;
  } else {
    relationsId = reqUser.relations;
  }

  return relationsId;
}

/**
 * This function returns the count of cache items in an index.
 *
 * @param { string } userId
 * @returns { Promise<number | APIError | Error> }
 */
export async function checkRelSetCache(
  userId: string
): Promise<number | APIError | Error> {
  let userRelationInfo;
  try {
    userRelationInfo = await redis.client.ft.info(
      redis.relationSetName(userId)
    );

    return parseInt(userRelationInfo.numDocs);
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search user relations set cache",
      err
    );
  }
}

/**
 * This function returns a complete array of cache relations.
 *
 * @param { string } userId
 * @param { iContactTypes } conType - whether normal, muted, block
 * @param { number } skip - starting number from where aggrevate will retrieve
 * @param { number } limit - highest number of items permitted to return
 * @returns { Promise<Array<iRelation> | APIError | Error> }
 */
export async function getCacheRels(
  userId: string,
  conType: iContactTypes,
  skip: number,
  limit: number
): Promise<Array<iRelation> | APIError | Error> {
  let contactFilter!: string;
  let userRelations: any;
  if (conType === contactType.block)
    // --- blocked filter
    contactFilter = `@${contactType.block}:[1 1]`;
  // --- muted filter
  else if (conType === contactType.mute)
    contactFilter = `@${contactType.block}:[0 0] @${contactType.mute}:[1 1]`;
  // --- contacts filter
  else if (conType === contactType.contact)
    contactFilter = `@${contactType.block}:[0 0]`;

  try {
    userRelations = await redis.client.ft.aggregate(
      redis.relationSetName(userId),
      "*",
      {
        LOAD: [
          "@accnt_id",
          "@accnt_name",
          "@type",
          "@chat_id",
          "@admin",
          "@block",
          "@mute",
          "@archive",
          "@bump",
        ],
        STEPS: [
          {
            type: AggregateSteps.SORTBY,
            BY: { BY: "@bump", DIRECTION: "DESC" },
          },
          { type: AggregateSteps.LIMIT, from: 0, size: maxPeers - 1 },
        ],
      }
    );

    userRelations = userRelations.results;
    return userRelations as Array<iRelation>;
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for user relations set cache",
      err
    );
  }
}

/**
 * This function returns a complete array of docs relations.
 *
 * @param { string } relationsId
 * @param { iContactTypes } conType - whether normal, muted, block
 * @param { number } skip - starting number from where aggrevate will retrieve
 * @param { number } limit - highest number of items permitted to return
 * @returns { Promise<Array<iRelation> | APIError | Error> }
 */
export async function getDocRels(
  relationsId: string,
  conType: iContactTypes,
  skip: number,
  limit: number
): Promise<Array<iRelation> | APIError | Error> {
  try {
    let contactFilter;

    // --- blocked user filter
    if (conType === contactType.block)
      contactFilter = {
        $eq: ["$$l.block", true],
      };
    // --- muted user filter
    else if (conType === contactType.mute)
      contactFilter = {
        $and: [{ $eq: ["$$l.block", false] }, { $eq: ["$$l.mute", true] }],
      };
    // --- contacts user filter
    else if (conType === contactType.contact)
      contactFilter = {
        $eq: ["$$l.block", false],
      };

    const userRelations = await GenRelations.aggregate([
      { $match: { str_id: relationsId } },
      { $unwind: "$relations.list" },
      { $sort: { "relations.list.bump": -1 } },
      { $group: { list: { $push: "$relations.list" }, _id: -1 } },
      { $project: { list: 1 } },
      { $project: { list: { $slice: ["$list", 0, maxPeers] } } },
    ]);

    if (!userRelations.length) return [];
    return userRelations[0].list as Array<iRelation>;
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for user relations from db",
      err
    );
  }
}

/**
 * This function caches a set of iRelation.
 *
 * @param { string } userId
 * @param { Array<iRelation> } relations
 * @returns { Promise<APIError | Error | void> }
 */
export async function cacheRels(
  userId: string,
  relations: Array<iRelation>
): Promise<APIError | Error | void> {
  if (!relations.length) return;

  try {
    const tx = redis.client.multi();
    let keyName: string;
    let relItem: iRelation;
    for (relItem of relations) {
      keyName = redis.relationSetItemName(userId, relItem.accnt_id);
      tx.json.set(keyName, "$", redis.redifyObj(relItem));
    }

    await tx.exec();
  } catch (err) {
    return newApiError(
      500,
      "server failed to execute user relation caching transaction",
      err
    );
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

export const patchRelations: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId = (req.session as PassportSession).passport.user;
  const relationAct = req.body as iRelationAct;
  const { relations: relationsId } = req.user as iUser;

  // VALIDATION: returns an error if client sent data is invalid
  const v = validatePatchRel(relationAct);
  if (v instanceof APIError || v instanceof Error) return next(v);

  // UPDATE user relation DOCUMENT
  const upDb = await updateDbUserRelations(relationsId, relationAct);
  if (upDb instanceof APIError || upDb instanceof Error) return next(upDb);

  // UPDATE user relation CACHE
  const upC = await updateUserRelationCache(userId, relationAct);
  if (upC instanceof APIError || upC instanceof Error) return next(upC);

  // RESPONSE
  return res.status(200).json({ statusCode: 200, data: null });
};

// SUB FUNCTION

/**
 * Input Validation
 *
 * @param { iRelationAct } relationAct - request body sent over HTTP
 * @returns { APIError | Error | void }
 */
export function validatePatchRel(
  relationAct: iRelationAct
): APIError | Error | void {
  const relActValid: iValidityType = ValidateMethods.relationAct(relationAct);
  if (!relActValid.isValid)
    return newApiError(
      400,
      "client requested with invalid data",
      relActValid.error
    );
}

/**
 * This function updates user relations item doc with new relation status.
 *
 * @param { string } relationsId
 * @param { iRelationAct } relationAct - request body sent over HTTP
 * @returns { Promise<void | APIError | Error> }
 */
export async function updateDbUserRelations(
  relationsId: string,
  relationAct: iRelationAct
): Promise<void | APIError | Error> {
  let userRelations: UpdateWriteOpResult;

  try {
    userRelations = await GenRelations.updateOne(
      {
        str_id: relationsId,
        "relations.list": {
          $elemMatch: {
            accnt_id: relationAct.recipientId,
            [`${relationAct.userAction}`]: !relationAct.actionValue,
          },
        },
      },
      {
        $set: {
          [`relations.list.$.${relationAct.userAction}`]:
            relationAct.actionValue,
        },
      }
    );

    if (userRelations.modifiedCount < 1)
      return newApiError(
        500,
        "server is unable to update user relations in db"
      );
  } catch (err) {
    return newApiError(
      404,
      "server is unable to search for user's relations in db",
      err
    );
  }
}

/**
 * This function updates user relations item cache with new relation status.
 *
 * @param { string } userId
 * @param { iRelationAct } relationAct - request body sent over HTTP
 * @returns
 */
export async function updateUserRelationCache(
  userId: string,
  relationAct: iRelationAct
): Promise<void | APIError | Error> {
  try {
    await redis.client.json.set(
      redis.relationSetItemName(userId, relationAct.recipientId),
      `$.${relationAct.userAction}`,
      relationAct.actionValue ? 1 : 0
    );

    // RESPONSE
  } catch (err) {
    return newApiError(
      500,
      "server is unable to update user relation set cache",
      err
    );
  }
}
