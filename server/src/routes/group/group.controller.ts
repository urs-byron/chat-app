import { iUser } from "../../models/user.imodel";
import { Group } from "../../models/group.model";
import { chatType } from "../../models/user.model";
import { SearchReply } from "redis";
import { GroupMethods } from "../../data/group.data";
import { GenRelations } from "../../models/gen.model";
import { RequestHandler } from "express";
import { ValidateMethods } from "../../util/validate.util";
import { PassportSession } from "../../models/auth.imodel";
import { UpdateWriteOpResult } from "mongoose";
import { RedisMethods as redis } from "../../services/redis.srvcs";
import { newApiError, APIError } from "../../global/httpErrors.global";
import { iGroup, iGroupDoc, iNewGrpBody } from "../../models/group.imodel";
import {
  iRelation,
  iGenRelations,
  iGenRelationsDoc,
  iGenSecurityDoc,
  iGetGenRels,
  iGetGenReqs,
} from "../../models/gen.imodel";
import {
  cacheRelDocs,
  cacheReq,
  cacheUser,
  chechReqCache,
  checkRelCache,
  getPrivacyDoc,
  getRelCache,
  getRelDoc,
  getReqCache,
  getReqDoc,
} from "../user/user.controller";

/*
// URGENT
validation --------- 0000
caching ------------ DONE
promisify ---------- DONE
error-handling ----- DONE
response ----------- DONE

// URGENT
import ------------- DONE
comment ------------ DONE
*/

export const getGroup: RequestHandler = async (req, res, next) => {
  const groupId = req.params.groupId;
  let cacheFlag: boolean = false;
  let group: iGroupDoc | APIError | Error,
    userSecurity: iGenSecurityDoc | APIError | Error,
    userRelations!: iGetGenRels | APIError | Error,
    userRequests: iGetGenReqs | APIError | Error;

  // PROCESS: ready cache transaction
  const tx = redis.client.multi();

  // FURTHER PROCESS: search for user info
  group = await getGroupDoc(groupId, tx);
  if (group instanceof APIError || group instanceof Error) return next(group);
  else cacheFlag = true;

  const {
    requests: requestsId,
    relations: relationsId,
    security: securityId,
  } = group;

  // @TAG(CHILD PROCESS)
  // CANDIDATE FOR WORKER THREAD: START

  // FURTHER PROCESS: search for user privacy
  userSecurity = await getPrivacyDoc(groupId, securityId, tx);
  if (userSecurity instanceof APIError || userSecurity instanceof Error)
    return next(userSecurity);
  else cacheFlag = true;

  // FURTHER PROCESS: search for user relations
  const relationIndexInfo = await checkRelCache(groupId);
  if (
    relationIndexInfo instanceof APIError ||
    relationIndexInfo instanceof Error
  )
    return next(relationIndexInfo);

  if (relationIndexInfo) {
    // if relation index has user relation set caches, further retrieve user relation set items
    userRelations = (await getRelCaches(groupId)) as any;
    if (userRelations instanceof APIError || userRelations instanceof Error)
      return next(userRelations);

    // else, search in DB
  } else {
    userRelations = await getRelDoc(relationsId);
    if (userRelations instanceof APIError || userRelations instanceof Error)
      return next(userRelations);

    cacheFlag = true;
    cacheRelDocs(groupId, relationsId, userRelations, tx);
  }
  // FURTHER PROCESS: search for user requests
  const reqsNumDocs = await chechReqCache(groupId);
  if (reqsNumDocs instanceof APIError || reqsNumDocs instanceof Error)
    return next(reqsNumDocs);
  const { reqInCacheNum, reqOutCacheNum } = reqsNumDocs;

  // if user request IN | OUT set indexes has cachees, return them as response
  if (reqInCacheNum || reqOutCacheNum) {
    userRequests = await getReqCache(groupId, reqInCacheNum, reqOutCacheNum);
    if (userRequests instanceof APIError || userRequests instanceof Error)
      return next(userRequests);

    // else, search in DB
  } else {
    userRequests = await getReqDoc(requestsId);
    if (userRequests instanceof APIError || userRequests instanceof Error)
      return next(userRequests);

    cacheReq(groupId, requestsId, userRequests, tx);
    cacheFlag = true;
  }

  // FURTHER PROCESS: execute cache transaction in reference to flag
  const c = await cacheUser(cacheFlag, tx);
  if (c instanceof APIError || c instanceof Error) return next(c);
  // CANDIDATE FOR WORKER THREAD: END

  const groupData = configUserData(
    groupId,
    group,
    userSecurity,
    userRequests,
    userRelations
  );

  // RESPONSE
  return res.status(200).json({
    statusCode: 200,
    data: groupData,
  });
};

// SUB FUNCTIONS

export async function getGroupDoc(
  groupId: string,
  tx: any
): Promise<iGroupDoc | APIError | Error> {
  let cGroup: any;
  let group: iGroupDoc | null;

  try {
    cGroup = (await redis.client.ft.search(
      redis.groupIdxStr,
      `@grp_id:(${groupId})`
    )) as SearchReply;

    // if index already has group info, return cache as reponse
  } catch (err) {
    await redis.discard();
    return newApiError(500, "server is unable to search group cache", err);
  }

  if (cGroup.total) {
    group = cGroup.documents[0].value as iGroupDoc;
    // else search DB
  } else {
    try {
      group = await Group.findOne<iGroupDoc>({
        grp_id: groupId,
      }).lean();

      // if document === null, return error
      if (!group) {
        await redis.discard();
        return newApiError(404, "server found no group");
      }

      // add group info into transaction
      const keyName = redis.userItemName(groupId);
      tx.json.set(keyName, "$", redis.redifyObj(group));
      // tx.expire(keyName, redis.days(3));
    } catch (err) {
      await redis.discard();
      return newApiError(500, "server is unable to search group document", err);
    }
  }

  return group;
}

async function getRelCaches(id: string) {
  let userRelations: any;
  try {
    userRelations = await redis.client.ft.aggregate(
      redis.relationSetName(id),
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
      }
    );
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for group cache relations",
      err
    );
  }

  return [{ relations: userRelations.results }];
}

export function configUserData(
  groupId: string,
  group: iGroupDoc,
  userSecurity: iGenSecurityDoc,
  userRequests: any,
  userRelations: any
): {
  accnt_name: string;
  accnt_id: string;
  privacy: any;
  requests: any;
  relations: any;
} {
  return {
    accnt_name: group.grp_name,
    accnt_id: groupId,
    privacy: userSecurity.privacy ? userSecurity.privacy : userSecurity,
    requests: {
      incoming: [...userRequests[0].incoming],
      outgoing: [...userRequests[0].outgoing],
    },
    relations: [...userRelations[0].relations],
  };
}

/*
// URGENT
validation --------- 0000
caching ------------ DONE
promisify ---------- DONE
error-handling ----- DONE
response ----------- DONE

// URGENT
import ------------- DONE
comment ------------ DONE
*/

export const getGroups: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId = (req.session as PassportSession).passport.user;
  const { relations: relationsId } = req.user as iUser;
  let groups: Array<iRelation> | void | APIError | Error;

  // FETCH user groups FROM CACHE
  groups = await getCacheGroupRels(userId);
  if (groups instanceof APIError || groups instanceof Error)
    return next(groups);
  if (Array.isArray(groups))
    return res.status(200).json({
      statusCode: 200,
      data: groups,
    });

  // ELSE, FETCH user groups FROM DB
  groups = await getGroupRelDocs(relationsId);
  if (groups instanceof APIError || groups instanceof Error)
    return next(groups);

  // SET user groups IN CACHE
  const tx = await txCacheGroupSet(groups, userId);
  if (tx instanceof APIError || tx instanceof Error) return next(tx);

  // RESPONSE
  return res.status(200).json({
    statusCode: 200,
    data: groups,
  });
};

// SUB FUNCTIONS

export async function getCacheGroupRels(
  userId: string
): Promise<iRelation[] | void | APIError | Error> {
  let groups;
  try {
    groups = await redis.client.ft.aggregate(
      redis.relationSetName(userId),
      "@type:(group)",
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
      }
    );

    // IF user group IS WITHIN CACHE
    if (groups.total) return groups.results as unknown as Array<iRelation>;
  } catch (err) {
    return newApiError(500, "server is unable to search user group cache", err);
  }
}

export async function getGroupRelDocs(
  relationsId: string
): Promise<Array<iRelation> | APIError | Error> {
  let groups;
  try {
    groups = await GenRelations.aggregate([
      {
        $match: {
          str_id: relationsId,
        },
      },
      {
        $project: {
          groups: {
            $filter: {
              input: "$relations.list",
              as: "l",
              cond: {
                $eq: ["$$l.type", "group"],
              },
            },
          },
        },
      },
    ]);

    if (!groups.length)
      return newApiError(404, "server found no matching user");
    else return groups[0].groups;
  } catch (err) {
    return newApiError(500, "server is unable to search user group in db", err);
  }
}

export async function txCacheGroupSet(
  groups: Array<iRelation>,
  userId: string
): Promise<void | APIError | Error> {
  if (!groups.length) return;

  try {
    const tx = redis.client.multi();
    let keyName: string;
    groups.forEach((grp: iRelation) => {
      keyName = redis.grpSetItemName(userId, grp.accnt_id);
      tx.json.set(keyName, "$", redis.redifyObj(grp));
      // tx.expire(keyName, redis.days(3));
    });

    await tx.exec();
  } catch (err) {
    return newApiError(500, "server is unable to execute caching user group");
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
comment ------------ !NO!
*/

export const postGroup: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId = (req.session as PassportSession).passport.user;

  // VALIDATION: returns error if client data is invalid
  const v = validateNewGrp(req.body as iNewGrpBody, userId);
  if (v instanceof APIError || v instanceof Error) return next(v);

  // DATA GATHERING: FURTHER
  const tx = redis.client.multi();
  const { act_name, relations: relationsId } = req.user as iUser;
  const { grpName } = req.body as iNewGrpBody;

  // VALIDATION: returs error if matching grp_name is found in cache
  const gCV = await sameCacheGrpNameErr(grpName);
  if (gCV instanceof APIError || gCV instanceof Error) return next(gCV);

  // VALIDATION: returs error if matching grp_name is found in db
  const gDbV = await sameDbGrpNameErr(grpName);
  if (gDbV instanceof APIError || gDbV instanceof Error) return next(gDbV);

  // CREATE GROUP
  const new_grp = await GroupMethods.createGroup(
    {
      accnt_id: userId,
      accnt_name: act_name,
    },
    grpName
  );
  // VALIDATION: returns error if something went wrong
  if (new_grp instanceof APIError || new_grp instanceof Error)
    return next(new_grp);

  // CACHE NEW GROUP ITEM
  cacheNewGroup(new_grp, tx);

  // CREATE CHAT CACHE SET INDEX
  const c = await redis.createChatIndex(new_grp.chat_id);
  if (c instanceof APIError || c instanceof Error) {
    await redis.discard();
    return c;
  }

  // UPDATE USER RELATIONS
  // ---- UPDATE relation hBump in DB & CACHE
  // ---- UPDATE relation list in DB & CACHE

  // UPDATE user hBump in DB
  const userBump = await getDBUserHBump(userId, relationsId, tx);
  if (userBump instanceof APIError || userBump instanceof Error)
    return next(userBump);

  // UPDATE user relations DB
  const new_rel = createGrpRelObj(new_grp, grpName, userBump);
  const upDbV = await updateUserDbRelations(
    userId,
    relationsId,
    userBump,
    new_rel,
    tx
  );
  if (upDbV instanceof APIError || upDbV instanceof Error) return next(upDbV);

  // UPDATE user relations cache
  const upCV = await updateUserCacheRelations(tx);
  if (upCV instanceof APIError || upCV instanceof Error) return next(upCV);

  return res.status(200).json({
    statusCode: 200,
    data: new_rel,
  });
};

// SUB FUNCTIONS

export function validateNewGrp(
  newGrpBody: iNewGrpBody,
  userId: string
): void | APIError | Error {
  const grpBodyValid = ValidateMethods.newGrpBody(newGrpBody, userId);
  if (!grpBodyValid.isValid)
    return newApiError(400, "new group data is invalid", grpBodyValid.error);
}

export async function sameCacheGrpNameErr(
  grpName: string
): Promise<void | APIError | Error> {
  try {
    const grp: SearchReply = await redis.client.ft.search(
      redis.groupIdxStr,
      `@grp_name:(${grpName})`
    );
    if (grp.total) return newApiError(400, "group name already in use");
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for group in cache",
      err
    );
  }
}

export async function sameDbGrpNameErr(
  grpName: string
): Promise<void | APIError | Error> {
  try {
    const grp: iGroup | null = await Group.findOne({
      grp_name: grpName,
    }).lean();

    if (grp) return newApiError(400, "group name already in use");
  } catch (err) {
    return newApiError(500, "server is unable to search for group in db", err);
  }
}

export function cacheNewGroup(new_grp: iGroup, tx: any) {
  tx.json.set(redis.grpItemName(new_grp.grp_id), "$", redis.redifyObj(new_grp));
}

export async function getDBUserHBump(
  userId: string,
  relationsId: string,
  tx: any
): Promise<number | APIError | Error> {
  let userBump: iGenRelationsDoc | null;
  try {
    userBump = await GenRelations.findOne({
      str_id: relationsId,
    }).lean();

    if (!userBump) {
      return newApiError(404, "server found no user hBump");
    }

    tx.json.numIncrBy(redis.relationItemName(userId), "$.hBump", 1);
    return userBump.relations.hBump + 1;
  } catch (err) {
    await redis.discard();
    return newApiError(500, "server is unable to fetch user relations", err);
  }
}

export function createGrpRelObj(
  new_grp: iGroup,
  grpName: string,
  userBump: number
): iRelation {
  const new_rel: iRelation = {
    accnt_id: new_grp.grp_id,
    accnt_name: grpName,
    admin: false,
    type: chatType.group,
    chat_id: (new_grp as iGroup).chat_id,
    block: false,
    mute: false,
    archive: false,
    bump: userBump,
  };

  return new_rel;
}

export async function updateUserDbRelations(
  userId: string,
  relationsId: string,
  userBump: number,
  new_rel: iRelation,
  tx: any
): Promise<void | APIError | Error> {
  let userRelations: UpdateWriteOpResult;

  try {
    userRelations = await GenRelations.updateOne(
      {
        str_id: relationsId,
      } as iGenRelations,
      {
        "relations.hBump": userBump,
        $push: {
          "relations.list": new_rel,
        },
      }
    );

    if (userRelations.modifiedCount < 0) {
      await redis.discard();
      return newApiError(500, "server failed to update user relations in db");
    }

    const keyName = redis.relationSetItemName(userId, new_rel.accnt_id);
    tx.json.set(keyName, "$", redis.redifyObj(new_rel));
    // tx.expire(keyName, redis.days(3));
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to update user relations in db",
      err
    );
  }
}

export async function updateUserCacheRelations(
  tx: any
): Promise<void | APIError | Error> {
  try {
    await tx.exec();
  } catch (err) {
    return newApiError(
      500,
      "server is unable to execute caching for new user group relation",
      err
    );
  }
}
