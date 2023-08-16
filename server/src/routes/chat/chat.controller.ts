import { GeneralUtil } from "../../util/misc.util";
import { iChatMsgs, iChatReqBody } from "../../models/chat.imodel";
import { AggregateSteps } from "redis";
import { RequestHandler } from "express";
import { chatMsgSkipCnt } from "../../global/search.global";
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

export async function getMsgsId(
  chatId: string
): Promise<string | Error | APIError> {
  let msgsId: string;

  try {
    let chatCache = await redis.client.ft.search(
      redis.chatIdxStr,
      `@chat_id:(${chatId})`
    );

    if (chatCache.documents.length)
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

export async function getCacheMsgs(
  chatId: string,
  skip: number,
  limit: number
): Promise<APIError | Error | iMsgBody[]> {
  try {
    const msgs = (
      await redis.client.ft.aggregate(redis.chatSetName(chatId), "*", {
        LOAD: ["@msg", "@msgId", "@senderName", "@senderId", "@timeReceived"],
        STEPS: [
          {
            type: AggregateSteps.SORTBY,
            BY: { BY: "@timeReceived", DIRECTION: "DESC" },
          },
          { type: AggregateSteps.LIMIT, from: skip, size: chatMsgSkipCnt },
        ],
      })
    ).results as unknown as iMsgBody[];

    return msgs;
  } catch (err) {
    return newApiError(500, "server is unable to fetch chat messages", err);
  }
}

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

export async function cacheMsgs(
  chatId: string,
  msgs: iMsgBody[]
): Promise<APIError | Error | void> {
  const tx = redis.client.multi();
  let msg: iMsgBody;

  if (msgs === null || !Array.isArray(msgs) || !msgs.length) return;

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
