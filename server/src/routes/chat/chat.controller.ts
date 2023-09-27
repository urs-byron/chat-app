import { GeneralUtil } from "../../util/misc.util";
import {
  chatIdsAggregateMatcher,
  chatIdsAggregateMatcherArr,
  chatIdsAggregateProject,
  chatIdsAggregateRec,
  iChatMsgs,
  iChatReqBody,
  msgsIDsAggregate,
  topMsgsAggregate,
  topMsgsAggregateItem,
} from "../../models/chat.imodel";
import { AggregateSteps } from "redis";
import { RequestHandler } from "express";
import { chatMsgSkipCnt, relSkipCnt } from "../../global/search.global";
import { ValidateMethods } from "../../util/validate.util";
import { Chat, ChatMessages } from "../../models/chat.model";
import { RedisMethods as redis } from "../../services/redis.srvcs";
import { APIError, newApiError } from "../../global/httpErrors.global";
import { iChat, iChatDoc, iMsgBody } from "../../models/chat.imodel";

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

export const getChatMsgs: RequestHandler = async (req, res, next) => {
  // VALIDATION
  const v = validateChatReqBody(req.body as iChatReqBody);
  if (v instanceof APIError || v instanceof Error) return next(v);

  // DATA GATHERING
  const { skip: reqSkip, type, chatId, listCnt } = req.body as iChatReqBody;
  let msgs: iMsgBody[] | APIError | Error;

  // FORK: check if chat mesages index has caches
  const c = await checkChatInfo(chatId);
  if (c instanceof APIError || c instanceof Error) return next(c);

  if (listCnt >= c)
    return res
      .status(200)
      .json({ statusCode: 200, data: { msgsId: "", msgs: [] } });

  // FORK (TRUE): retrieve mesages index caches
  const { skip: rSkip, limit: rLimit } = GeneralUtil.getRedisSkipLimit(
    reqSkip,
    chatMsgSkipCnt
  );

  if (c) {
    if (rSkip > c) return res.status(200).json({ statusCode: 200, data: null });
    msgs = await getCacheMsgs(chatId, rSkip, rLimit);
    if (msgs instanceof APIError || msgs instanceof Error) return next(msgs);

    // RESPONSE
    return res
      .status(200)
      .json({ statusCode: 200, data: { msgsId: "", msgs } });
  }

  // FORK (FALSE): retrieve mesages index docs
  const msgsId = await getMsgsId(chatId);
  if (msgsId instanceof APIError || msgsId instanceof Error)
    return next(msgsId);

  const { skip: mSkip, limit: mLimit } = GeneralUtil.getMongoSkipLimit(
    reqSkip,
    chatMsgSkipCnt
  );
  msgs = await getDocMsgs(msgsId as string, mSkip, mLimit);
  if (msgs instanceof APIError || msgs instanceof Error) return next(msgs);

  // CACHE: messages
  const t = await cacheMsgs(chatId, msgs);
  if (t instanceof APIError || t instanceof Error) return next(t);

  // RESPONSE
  return res.status(200).json({ statusCode: 200, data: { msgsId, msgs } });
};

// SUB FUNCTIONS

/**
 * Input Validation
 *
 * @param { iChatReqBody } reqBody - data sent over HTTP for input validation
 * @returns { APIError | Error | void }
 */
export function validateChatReqBody(
  reqBody: iChatReqBody
): APIError | Error | void {
  const v = ValidateMethods.chatReqBody(reqBody);
  if (!v.isValid)
    return newApiError(
      400,
      "client sent invalid chat message retrieval data",
      v.error
    );
}

/**
 * This function returns ERROR if no message id is available to be returned.
 *
 * @param { string } chatId
 * @returns { Promise<string | Error | APIError> }
 */
export async function getMsgsId(
  chatId: string
): Promise<string | Error | APIError> {
  try {
    let chatCache = await redis.client.ft.search(
      redis.chatIdxStr,
      `@chat_id:(${chatId})`
    );

    if (chatCache.total)
      return (chatCache.documents[0].value as unknown as iChat).msgs_id;
  } catch (err) {
    return newApiError(500, "server is unable to search for chat cache", err);
  }

  try {
    const chatDoc = (await Chat.findOne({
      chat_id: chatId,
    } as iChat).lean()) as iChatDoc;

    if (chatDoc === null)
      return newApiError(500, "server found no matching chat id");
    else return chatDoc.msgs_id;
  } catch (err) {
    return newApiError(500, "server is unable to search for chat doc", err);
  }
}

/**
 * This function returns the number of cache items within the cache msgs index.
 *
 * @param { string } chatId
 * @returns { Promise<number | APIError | Error> }
 */
export async function checkChatInfo(
  chatId: string
): Promise<number | APIError | Error> {
  try {
    const info = await redis.client.ft.info(redis.chatSetName(chatId));

    return parseInt(info.numDocs);
  } catch (err) {
    return newApiError(
      500,
      "server is unable to fetch chat cache index info",
      err
    );
  }
}

/**
 * This function will return a limited (skipped?) set of aggregated msg caches.
 *
 * @param { string } chatId
 * @param { number } skip - starting number from where aggrevate will retrieve
 * @param { number } limit - highest number of items permitted to return [REDACTED]
 * @returns
 */
export async function getCacheMsgs(
  chatId: string,
  skip: number,
  limit: number
): Promise<APIError | Error | iMsgBody[]> {
  try {
    const msgs = await redis.client.ft.aggregate(
      redis.chatSetName(chatId),
      "*",
      {
        LOAD: [
          "@msg",
          "@msgId",
          "@chatId",
          "@senderName",
          "@senderId",
          "@timeReceived",
        ],
        STEPS: [
          {
            type: AggregateSteps.SORTBY,
            BY: { BY: "@timeReceived", DIRECTION: "DESC" },
          },
          { type: AggregateSteps.LIMIT, from: skip, size: chatMsgSkipCnt },
        ],
      }
    );

    return msgs.results as unknown as iMsgBody[];
  } catch (err) {
    return newApiError(500, "server is unable to fetch chat messages", err);
  }
}

/**
 * This function will return a limited (skipped?) set of aggregated msg docs.
 *
 * @param { string } msgsId
 * @param { number } skip - starting number from where aggrevate will retrieve
 * @param { number } limit - highest number of items permitted to return
 * @returns
 */
export async function getDocMsgs(
  msgsId: string,
  skip: number,
  limit: number
): Promise<iMsgBody[] | APIError | Error> {
  try {
    let msgs = await ChatMessages.aggregate([
      { $match: { str_id: msgsId } as iChatMsgs },
      { $unwind: "$list" },
      { $sort: { "list.timeReceived": -1 } },
      { $group: { msgs: { $push: "$list" }, _id: -1 } },
      { $project: { msgs: 1 } },
      { $project: { msgs: { $slice: ["$msgs", skip, limit] } } },
    ]);

    if (!msgs.length) return [];
    return msgs[0].msgs as iMsgBody[];
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search chat messages document",
      err
    );
  }
}

/**
 * This function caches set of chat msgs.
 *
 * @param { string } chatId
 * @param { iMsgBody[] } msgs
 * @returns { Promise<APIError | Error | void> }
 */
export async function cacheMsgs(
  chatId: string,
  msgs: iMsgBody[]
): Promise<APIError | Error | void> {
  const tx = redis.client.multi();
  let msg: iMsgBody;

  if (
    msgs === null ||
    msgs === undefined ||
    !Array.isArray(msgs) ||
    !msgs.length
  )
    return;

  for (msg of msgs) {
    tx.json.set(
      redis.chatSetItemName(chatId, msg.msgId),
      "$",
      redis.redifyObj(msg)
    );
  }
  try {
    await tx.exec();
  } catch (err) {
    return newApiError(
      500,
      "server is unable to execute chat messages caching transaction",
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

export const getTopChatMsg: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const chatId = req.params.id;
  let tMsg: iMsgBody[] | APIError | Error;

  // FORK: check if chat messages cache index is filed
  const i = await checkChatInfo(chatId);
  if (i instanceof APIError || i instanceof Error) return next(i);

  // FORK (TRUE): retrieve chat messages cache index top
  if (i) {
    tMsg = await getCacheMsgs(chatId, 0, 1);
    if (tMsg instanceof APIError || tMsg instanceof Error) return next(tMsg);

    // RESPONSE
    res.status(200).json({ statusCode: 200, data: tMsg[0] });
  }

  // FORK (TRUE): retrieve chat messages doc array top
  // FORK (TRUE): --- retrieve msg id prop
  const msgId = await getMsgsId(chatId);
  if (msgId instanceof APIError || msgId instanceof Error) return next(msgId);

  // FORK (TRUE): --- retrieve msg doc array top
  tMsg = await getDocMsgs(msgId, 0, 1);
  if (tMsg instanceof APIError || tMsg instanceof Error) return next(tMsg);

  // RESPONSE
  res.status(200).json({ statusCode: 200, data: tMsg[0] });
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

export const getTopMsgs: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  /** Array of chat IDs */
  const chatIds = req.body as string[];

  // VALIDATION
  const IDvalid = ValidateMethods.chatIDs(chatIds);
  if (!IDvalid.isValid)
    return next(newApiError(400, "client sent invalid data", IDvalid.error));

  // DATA GATHERING - AGGREGATION
  /** Array of object chat ID filter */

  const aggregateMatcher = chatAggregateMatcherFilter(chatIds);

  let msgsIDs: string[] | APIError | Error;

  const c = await redis.client.ft.info(redis.chatIdxStr);

  if (parseInt(c.numDocs)) msgsIDs = await getCacheMsgsIDs(chatIds);
  else msgsIDs = await getDocMsgIDs(aggregateMatcher);

  if (msgsIDs instanceof APIError || msgsIDs instanceof Error)
    return next(msgsIDs);

  // VALIDATION
  /** Return immediately if  */
  if (chatIds.length !== msgsIDs.length)
    return next(
      newApiError(400, "client sent invalid data", [
        "certain client chatId is invalid",
      ])
    );

  // DATA GATHERING - AGGREGATION
  /** Array of most recent message object(s) from certain message list document(s). */
  const topMsgs = await getTopMsgDocs([...msgsAggregateMatcherFilter(msgsIDs)]);
  if (topMsgs instanceof APIError || topMsgs instanceof Error)
    return next(topMsgs);

  // RESPONSE
  return res.status(200).json({ statusCode: 200, data: topMsgs });
};

/**
 * This function accepts an array of chat ID strings and transforms them into an object understandable by the Mongoose Aggregate method.
 *
 * @param { string[] } chatIds
 * @returns { chatIdsAggregateMatcherArr }
 */
export function chatAggregateMatcherFilter(
  chatIds: string[]
): chatIdsAggregateMatcherArr {
  return chatIds.map((id: string) => {
    return { chat_id: id };
  });
}

/**
 * This function aggregates matching cache Chat IDs and returns the Message IDs.
 *
 * @param { string[] } chatIds
 * @returns { Promise<string[] | APIError | Error> }
 */
export async function getCacheMsgsIDs(
  chatIds: string[]
): Promise<string[] | APIError | Error> {
  try {
    const msgsIDs = (
      await redis.client.ft.aggregate(
        redis.chatIdxStr,
        `@chat_id:(${chatIds.join("|")})`,
        { LOAD: ["@msgs_id"] }
      )
    ).results.map((m: any) => m.msgs_id);

    return msgsIDs;
  } catch (err) {
    return newApiError(500, "server failed to aggragete msg IDs", err);
  }
}

/**
 * This function accepts an array of chat ID strings and transforms them into an object understandable by the Mongoose Aggregate method.
 *
 * @param { string[] } msgsIds
 * @returns { msgsIDsAggregate }
 */
export function msgsAggregateMatcherFilter(
  msgsIds: string[]
): msgsIDsAggregate {
  return msgsIds.map((id: string) => {
    return { str_id: id };
  });
}

/**
 * This function aggregates matching document Chat IDs and returns the Message IDs.
 *
 * @param { chatIdsAggregateMatcherArr } aggregateMatcher
 * @param { chatIdsAggregateProject } aggregateProject
 * @returns { Promise<msgsIDsAggregate | APIError | Error> }
 */
export async function getDocMsgIDs(
  aggregateMatcher: chatIdsAggregateMatcherArr
): Promise<string[] | APIError | Error> {
  /** Object field filter */
  const aggregateProject: chatIdsAggregateProject = { _id: false, msgs_id: 1 };

  try {
    const msgsIds = (
      await Chat.aggregate<Record<"msgs_id", string>>([
        { $match: { $or: aggregateMatcher } },
        { $project: aggregateProject },
      ])
    ).map((p: Record<"msgs_id", string>) => p.msgs_id);

    return msgsIds;
  } catch (err) {
    return newApiError(500, "server is unable to aggregate message IDs", err);
  }
}

/**
 * This function returns an array containing the top (highest timeReceived) message of specific message documents. Note that:
 * - no object will be returned even if matching document if found when no message is available
 * - thus, matching msg IDs set as argument may not equate to the length of returned top messages
 *
 * @param { msgsIDsAggregate } msgsIDs - objectified array of msg IDs that will act as a matcher for mongoose agggregate API
 * @returns { Promise<topMsgsAggregate | APIError | Error> }
 *
 * @static
 */
export async function getTopMsgDocs(
  msgsIDs: msgsIDsAggregate
): Promise<topMsgsAggregate | APIError | Error> {
  try {
    const m = await ChatMessages.aggregate<topMsgsAggregateItem>([
      { $match: { $or: msgsIDs, list: { $ne: [] } } },
      { $sort: { str_id: -1 } },
      {
        $project: {
          _id: false,
          top: {
            $reduce: {
              input: "$list", // Specify the 'items' array
              initialValue: { timeReceived: 0 }, // Initialize with a quantity of 0
              in: {
                $cond: {
                  if: { $gt: ["$$this.timeReceived", "$$value.timeReceived"] }, // Compare quantities
                  then: "$$this", // Replace if the current item has a higher quantity
                  else: "$$value", // Keep the previous item
                },
              },
            },
          },
        },
      },
    ]);

    return m;
  } catch (err) {
    return newApiError(
      500,
      "server is unable to aggregate top message documents",
      err
    );
  }
}
