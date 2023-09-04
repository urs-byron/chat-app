import { User } from "../../models/user.model";
import { AggregateSteps, SearchReply } from "redis";
import { RequestHandler } from "express";
import { PassportSession } from "../../models/auth.imodel";
import { iUser, iUserDoc } from "../../models/user.imodel";
import { RedisMethods as redis } from "../../services/redis.srvcs";
import { APIError, newApiError } from "../../global/httpErrors.global";
import {
  iRelation,
  iGenRequest,
  iGenSecurityDoc,
  iGetGenRels,
  iGetGenReqs,
} from "../../models/gen.imodel";
import {
  GenRequests,
  GenSecurity,
  contactType,
  GenRelations,
} from "../../models/gen.model";

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

export const getUser: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId = (req.session as PassportSession).passport.user;
  const {
    requests: requestsId,
    relations: relationsId,
    security: securityId,
  } = req.user as iUser;

  let cacheFlag: boolean = false;

  // PROCESS: ready cache transaction
  const tx = redis.client.multi();

  let user: iUserDoc | APIError | Error,
    userSecurity: iGenSecurityDoc | APIError | Error,
    userRelations!: iGetGenRels | APIError | Error,
    userRequests: iGetGenReqs | APIError | Error,
    relNumDocs: number | APIError | Error,
    reqsNumDocs:
      | { reqInCacheNum: number; reqOutCacheNum: number }
      | APIError
      | Error;

  const [userP, secP, relCkP, reqCkP] = await Promise.allSettled([
    getUserDoc(userId, tx),
    getPrivacyDoc(userId, securityId, tx),
    checkRelCache(userId),
    chechReqCache(userId),
  ]);

  if (userP.status === "fulfilled")
    if (userP.value instanceof APIError || userP.value instanceof Error)
      return next(userP.value);
    else user = userP.value;
  else return next(userP.reason);

  if (secP.status === "fulfilled")
    if (secP.value instanceof APIError || secP.value instanceof Error)
      return next(secP.value);
    else userSecurity = secP.value;
  else return next(secP.reason);

  if (relCkP.status === "fulfilled")
    if (relCkP.value instanceof APIError || relCkP.value instanceof Error)
      return next(relCkP.value);
    else relNumDocs = relCkP.value;
  else return next(relCkP.reason);

  if (reqCkP.status === "fulfilled")
    if (reqCkP.value instanceof APIError || reqCkP.value instanceof Error)
      return next(reqCkP.value);
    else reqsNumDocs = reqCkP.value;
  else return next(reqCkP.reason);

  const { reqInCacheNum, reqOutCacheNum } = reqsNumDocs;

  cacheFlag = true;

  // FURTHER PROCESS: search for user relations

  if (relNumDocs) {
    // if relation index has user relation set caches, further retrieve user relation set items
    userRelations = await getRelCache(userId);
    if (userRelations instanceof APIError || userRelations instanceof Error)
      return next(userRelations);

    // else, search in DB
  } else {
    userRelations = await getRelDoc(relationsId);
    if (userRelations instanceof APIError || userRelations instanceof Error)
      return next(userRelations);

    cacheFlag = true;
    cacheRelDocs(userId, relationsId, userRelations, tx);
  }

  // FURTHER PROCESS: search for user requests

  if (reqInCacheNum || reqOutCacheNum) {
    // if user request IN | OUT set indexes has cachees, return them as response
    userRequests = await getReqCache(userId, reqInCacheNum, reqOutCacheNum);
    if (userRequests instanceof APIError || userRequests instanceof Error)
      return next(userRequests);

    // else, search in DB
  } else {
    userRequests = await getReqDoc(requestsId);
    if (userRequests instanceof APIError || userRequests instanceof Error)
      return next(userRequests);

    cacheReq(userId, requestsId, userRequests, tx);
    cacheFlag = true;
  }

  // FURTHER PROCESS: execute cache transaction in reference to flag
  const c = await cacheUser(cacheFlag, tx);
  if (c instanceof APIError || c instanceof Error) return next(c);

  // FURTHER PROCESS: configure user response object
  const userData = configUserData(
    userId,
    user,
    userSecurity,
    userRequests,
    userRelations
  );

  // RESPONSE
  return res.status(200).json({
    statusCode: 200,
    data: userData,
  });
};

// SUB FXS

/**
 * This function
 * - retrieves iUser data object from cache
 * - else, from DB
 * - - then, cache that iUser data
 * - returns iUser data
 *
 * @param { string } userId
 * @param { any } tx - Redis Transaction Command Variable
 * @returns { Promise<iUserDoc | APIError | Error> }
 */
export async function getUserDoc(
  userId: string,
  tx: any
): Promise<iUserDoc | APIError | Error> {
  let cUser: any;
  let user: iUserDoc | null;

  try {
    cUser = (await redis.client.ft.search(
      redis.userIdxStr,
      `@str_id:(${userId})`
    )) as SearchReply;

    // if index already has user info, return cache as reponse
  } catch (err) {
    await redis.discard();
    return newApiError(500, "server is unable to search user cache", err);
  }

  if (cUser.total) {
    user = cUser.documents[0].value as iUserDoc;
    // else search DB
  } else {
    try {
      user = await User.findOne<iUserDoc>({ "act_id.accnt_id": userId }).lean();

      // if document === null, return error
      if (!user) {
        await redis.discard();
        return newApiError(404, "server found no user");
      }

      // add user info into transaction
      const keyName = redis.userItemName(userId);
      tx.json.set(keyName, "$", redis.redifyObj(user));
      // tx.expire(keyName, redis.days(3));
    } catch (err) {
      await redis.discard();
      return newApiError(500, "server is unable to search user document", err);
    }
  }

  return user;
}

/**
 * This function
 * - retrieves iGenSecurity data object from cache
 * - else, from DB
 * - - then, cache that iGenSecurity data
 * - returns iGenSecurity data
 *
 * @param { string } userId
 * @param { string } securityId
 * @param { any } tx - Redis Transaction Command Variable
 * @returns { Promise<iGenSecurityDoc | APIError | Error> }
 */
export async function getPrivacyDoc(
  userId: string,
  securityId: string,
  tx: any
): Promise<iGenSecurityDoc | APIError | Error> {
  let userSecurity: iGenSecurityDoc | any;

  try {
    userSecurity = (await redis.client.ft.search(
      redis.securityIdxStr,
      `@str_id:(${securityId})`
    )) as SearchReply;
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to search user security cache",
      err
    );
  }

  // if security index has user security cache, return cache as response
  if (userSecurity.total) {
    userSecurity = userSecurity.documents[0].value;
    userSecurity.privacy = redis.intToBool(userSecurity);
    "str_id" in userSecurity.privacy
      ? delete userSecurity.privacy.str_id
      : null;

    return userSecurity;
  }

  // else, search DB
  try {
    userSecurity = (await GenSecurity.findOne<iGenSecurityDoc>({
      str_id: securityId,
    }).lean()) as iGenSecurityDoc | null;

    if (!userSecurity) {
      await redis.discard();
      return newApiError(404, "server found no user security");
    }

    // add user security to cache transaction
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to search user security in DB",
      err
    );
  }

  const keyName = redis.securityItemName(userId);
  tx.json.set(
    keyName,
    "$",
    redis.redifyObj({
      str_id: userSecurity.str_id,
      public: userSecurity.privacy.public,
      availability: userSecurity.privacy.availability,
    })
  );
  // tx.expire(keyName, redis.days(3));

  return userSecurity;
}

/**
 * This function returns the count of cache within user's relation cache index.
 *
 * @param { string } userId
 * @returns { Promise<number | APIError | Error> }
 */
export async function checkRelCache(
  userId: string
): Promise<number | APIError | Error> {
  try {
    const relationIndexInfo = await redis.client.ft.info(
      redis.relationSetName(userId)
    );

    return parseInt(relationIndexInfo.numDocs);
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to search for user relations cache",
      err
    );
  }
}

/**
 * This function returns all the a user's muted and blocked connected user | group from cache.
 *
 * @param { string } userId
 * @returns { Promise<iGetGenRels | APIError | Error> }
 */
export async function getRelCache(
  userId: string
): Promise<iGetGenRels | APIError | Error> {
  try {
    // return user relation set blocked items
    const blockAgg = await redis.client.ft.aggregate(
      redis.relationSetName(userId),
      `@${contactType.block}:[1 1]`,
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
        ],
      }
    );

    // return user relation set muted items
    const muteAgg = await redis.client.ft.aggregate(
      redis.relationSetName(userId),
      `@${contactType.block}:[0 0] @${contactType.mute}:[1 1]`,
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
        ],
      }
    );

    return [
      { blocks: blockAgg.results as any[], mutes: muteAgg.results as any[] },
    ];
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to search for user relation set cache",
      err
    );
  }
}

/**
 *  This function returns all the a user's muted and blocked connected user | group from DB.
 *
 * @param { string } relationsId
 * @returns { Promise<iGetGenRels | APIError | Error> }
 */
export async function getRelDoc(
  relationsId: string
): Promise<iGetGenRels | APIError | Error> {
  try {
    const userRelations = await GenRelations.aggregate([
      { $match: { str_id: relationsId } },
      {
        $project: {
          // hBump & complete relations
          hBump: "$relations.hBump",
          relations: {
            $filter: {
              input: "$relations.list",
              as: "l",
              cond: {},
            },
          },
          blocks: {
            $filter: {
              input: "$relations.list",
              as: "l",
              cond: {
                $eq: ["$$l.block", true],
              },
            },
          },
          mutes: {
            $filter: {
              input: "$relations.list",
              as: "l",
              cond: {
                $and: [
                  { $eq: ["$$l.mute", true] },
                  { $eq: ["$$l.block", false] },
                ],
              },
            },
          },
        },
      },
    ]);

    if (userRelations.length < 1) {
      await redis.discard();
      return newApiError(404, "server found no user relations");
    }

    return userRelations as iGetGenRels;
  } catch (err) {
    await redis.discard();
    return newApiError(500, "server is unable to aggregate user relations");
  }
}

/**
 * This function caches hBump and an array of iRelation.
 *
 * @param { string } userId
 * @param { string } relationsId
 * @param { any } userRelations - iRelation[] or iRelation Array
 * @param { any } tx - Redis Transaction Command Variable
 */
export function cacheRelDocs(
  userId: string,
  relationsId: string,
  userRelations: any,
  tx: any
): void | APIError | void {
  // add user relation info to cache transaction
  const relCache = redis.relationItemObj(
    relationsId,
    userRelations[0].hBump,
    userId
  );
  tx.json.set(redis.relationItemName(userId), "$", relCache);
  // tx.expire(redis.relationItemName(userId), redis.days(3));

  // add user relation set items to cache transaction
  let keyName: string;
  let relItem: iRelation;
  for (relItem of userRelations[0].relations as Array<iRelation>) {
    keyName = redis.relationSetItemName(userId, relItem.accnt_id);
    tx.json.set(keyName, "$", redis.redifyObj(relItem));
    // tx.expire(keyName, redis.days(3));
  }
}

/**
 * This function returns the total user cache items from:
 * - incoming request index
 * - outgoing request index
 *
 * @param { string } userId
 * @returns { Promise<{ reqInCacheNum: number; reqOutCacheNum: number } | APIError | Error> }
 */
export async function chechReqCache(
  userId: string
): Promise<
  { reqInCacheNum: number; reqOutCacheNum: number } | APIError | Error
> {
  try {
    const reqInInfo = await redis.client.ft.info(
      redis.requestInSetName(userId)
    );
    const reqOutInfo = await redis.client.ft.info(
      redis.requestOutSetName(userId)
    );

    return {
      reqInCacheNum: parseInt(reqInInfo.numDocs),
      reqOutCacheNum: parseInt(reqOutInfo.numDocs),
    };
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to search for user request cache",
      err
    );
  }
}

/**
 * This function returns a set of pending requests from:
 * - incoming request index
 * - outgoing request index
 *
 * @param { string } userId
 * @param { number } reqInInfo
 * @param { number } reqOutInfo
 * @returns { Promise<iGetGenReqs | APIError | Error> }
 */
export async function getReqCache(
  userId: string,
  reqInInfo: number,
  reqOutInfo: number
): Promise<iGetGenReqs | APIError | Error> {
  try {
    let reqIn, reqOut;

    if (reqInInfo) {
      reqIn = await redis.client.ft.aggregate(
        redis.requestInSetName(userId),
        "@status:pending",
        { LOAD: ["@accnt_id", "@accnt_name", "@isGroup", "@status"] }
      );
    }

    if (reqOutInfo) {
      reqOut = await redis.client.ft.aggregate(
        redis.requestOutSetName(userId),
        "@status:pending",
        { LOAD: ["@accnt_id", "@accnt_name", "@isGroup", "@status"] }
      );
    }

    return [
      {
        incoming:
          reqIn !== undefined ? (reqIn.total ? [...reqIn.results] : []) : [],
        outgoing:
          reqOut !== undefined ? (reqOut.total ? [...reqOut.results] : []) : [],
      },
    ] as iGetGenReqs;
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to search for user request set cache",
      err
    );
  }
}

/**
 * This function will return aggregated requests:
 * - incoming requests
 * - outgoing requests
 *
 * @param { string } requestsId
 * @returns { Promise<iGetGenReqs | APIError | Error> }
 */
export async function getReqDoc(
  requestsId: string
): Promise<iGetGenReqs | APIError | Error> {
  try {
    const userRequests = await GenRequests.aggregate([
      { $match: { str_id: requestsId } },
      {
        $project: {
          requests: "$requests",
          i_incoming: {
            $filter: {
              input: "$requests.invitations.incoming",
              as: "ii",
              cond: { $eq: ["$$ii.status", "pending"] },
            },
          },
          o_outgoing: {
            $filter: {
              input: "$requests.invitations.outgoing",
              as: "io",
              cond: { $eq: ["$$io.status", "pending"] },
            },
          },
          m_incoming: {
            $filter: {
              input: "$requests.memberships.incoming",
              as: "mi",
              cond: { $eq: ["$$mi.status", "pending"] },
            },
          },
          m_outgoing: {
            $filter: {
              input: "$requests.memberships.outgoing",
              as: "mo",
              cond: { $eq: ["$$mo.status", "pending"] },
            },
          },
        },
      },
      {
        $addFields: {
          incoming: { $concatArrays: ["$i_incoming", "$m_incoming"] },
          outgoing: { $concatArrays: ["$o_outgoing", "$m_outgoing"] },
        },
      },
    ]);

    if (userRequests.length < 1) {
      await redis.discard();
      return newApiError(404, "server found no matching user request from db");
    }

    return userRequests as iGetGenReqs;
  } catch (err) {
    await redis.discard();
    return newApiError(
      500,
      "server is unable to search for user request from db",
      err
    );
  }
}

/**
 * This function will add caching of the following to a pending transaction:
 * - incoming requests
 * - outgoing requests
 *
 * @param { string } userId
 * @param { string } requestsId
 * @param { any } userRequests
 * @param { any } tx
 *
 * @returns { void }
 */
export function cacheReq(
  userId: string,
  requestsId: string,
  userRequests: any,
  tx: any
): void {
  // add user request to cache transaction
  tx.json.set(
    redis.requestItemName(userId),
    "$",
    redis.requestItemObj(requestsId, userId) as any
  );
  // tx.expire(redis.requestItemName(userId), redis.days(3));

  // add user request IN | OUT set items to cache transaction
  let keyName: string;
  let reqItem: iGenRequest;
  for (reqItem of [
    ...userRequests[0].requests.invitations.incoming,
    ...userRequests[0].requests.memberships.incoming,
  ] as Array<iGenRequest>) {
    keyName = redis.requestInSetItemName(userId, reqItem.accnt_id);
    tx.json.set(keyName, "$", redis.redifyObj(reqItem));
    // tx.expire(keyName, redis.days(3));
  }
  for (reqItem of [
    ...userRequests[0].requests.invitations.outgoing,
    ...userRequests[0].requests.memberships.outgoing,
  ] as Array<iGenRequest>) {
    keyName = redis.requestOutSetItemName(userId, reqItem.accnt_id);
    tx.json.set(keyName, "$", redis.redifyObj(reqItem));
    // tx.expire(keyName, redis.days(3));
  }
}

/**
 * This function will execute transaction depending on a cacheFlag.
 *
 * @param { boolean } cacheFlag - indicator whether the transaction will execute or note
 * @param { any } tx - Redis Transaction Command Variable
 * @returns { Promise<void | APIError | Error> }
 */
export async function cacheUser(
  cacheFlag: boolean,
  tx: any
): Promise<void | APIError | Error> {
  if (cacheFlag)
    try {
      await tx.exec();
    } catch (err) {
      return newApiError(
        500,
        "server failed to execute user request cache transaction",
        err
      );
    }
  else await redis.discard();
}

/**
 * This function will transform the final object to be sent as a response over HTTP.
 *
 * @param { string } userId
 * @param { iUserDoc } user
 * @param { iGenSecurityDoc } userSecurity
 * @param { any } userRequests
 * @param { any } userRelations
 * @returns { { accnt_name: string; accnt_id: string; privacy: any; requests: any; relations: any; }}
 */
export function configUserData(
  userId: string,
  user: iUserDoc,
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
    accnt_name: user.act_name,
    accnt_id: userId,
    privacy: userSecurity.privacy ? userSecurity.privacy : userSecurity,
    requests: {
      incoming: [...userRequests[0].incoming],
      outgoing: [...userRequests[0].outgoing],
    },
    relations: {
      mutes: [...userRelations[0].mutes],
      blocks: [...userRelations[0].blocks],
    },
  };
}
