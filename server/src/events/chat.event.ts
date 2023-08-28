import { Socket } from "socket.io";
import { iRelation } from "../models/gen.imodel";
import { GenRelations } from "../models/gen.model";
import { ChatMessages } from "../models/chat.model";
import { ValidateMethods } from "../util/validate.util";
import { iUser, iUserDoc } from "../models/user.imodel";
import { APIError, newApiError } from "../global/httpErrors.global";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { executeCacheTransaction } from "./request.event";
import { iChat, iChatType, iMsgBody } from "../models/chat.imodel";

/**
 * This function contains steps executed after a user sent a message over socket.
 *
 * @param { iMsgBody } data - message object sent over socket
 * @param { string } recipientId
 * @param { iChatType } type
 * @param { Socket } soc
 * @returns { Promise<iMsgBody | APIError | Error> }
 */
export const postMessage = async (
  data: iMsgBody,
  recipientId: string,
  type: iChatType,
  soc: Socket
): Promise<iMsgBody | APIError | Error> => {
  const { chatId } = data;
  const user = (soc.request as any).user as iUserDoc;
  data.senderName = user.act_name;
  data.timeReceived = Date.now();

  Object.freeze(data);

  const tx = redis.client.multi();

  // VALIDATION
  const v = validatePostMessage(data, recipientId, chatId);
  if (v instanceof APIError || v instanceof Error) return v;

  // FETCH: messages str id
  const chatObj = await getChatObj(chatId);
  if (chatObj instanceof APIError || chatObj instanceof Error) return chatObj;

  const s = await storeMsgCacheDoc(chatId, chatObj, data, tx);
  if (s instanceof APIError || s instanceof Error) return s;

  if (type === "user") {
    // DB UPDATE
    // --- array | hBump

    const recipientObj = await getUserCache(recipientId);
    if (recipientObj instanceof APIError || recipientObj instanceof Error)
      return recipientObj;

    const r = await bumpRelDocs(
      user.act_id.accnt_id,
      user.relations,
      recipientId,
      recipientObj.relations,
      type
    );
    if (r instanceof APIError || r instanceof Error) return r;

    // CACHE UPDATE
    // --- set | hBump

    txRelsBumpCache(user.act_id.accnt_id, recipientId, type, tx);
  } else {
    const members = await getGroupMemberIDs(recipientId);
    if (members instanceof APIError || members instanceof Error) return members;

    let member: iRelation;
    let userCache: any;

    for (member of members) {
      userCache = await getUserCache(member.accnt_id);
      if (userCache instanceof APIError || userCache instanceof Error)
        return userCache;

      const r = await bumpRelDocs(
        "",
        userCache.relations,
        recipientId,
        "",
        type
      );
      if (r instanceof APIError || r instanceof Error) return r;

      txRelsBumpCache(userCache.accnt_id, recipientId, type, tx);
    }
  }

  const t = await executeCacheTransaction(tx);
  if (t instanceof APIError || t instanceof Error) return t;

  return data;
};

/**
 * This function validates postMessage inputs.
 *
 * @param { iMsgBody } data - message object sent over socket
 * @param { string } recipientId
 * @param { string } chatId
 * @returns { APIError | Error | void }
 */
export function validatePostMessage(
  data: iMsgBody,
  recipientId: string,
  chatId: string
): APIError | Error | void {
  const v = ValidateMethods.newMessage(data, recipientId);
  if (!v.isValid)
    return newApiError(400, "client sent invalid message data", v.error);
}

/**
 * @param { string } chatId
 * @returns { Promise<APIError | Error | iChat> }
 */
export async function getChatObj(
  chatId: string
): Promise<APIError | Error | iChat> {
  try {
    const c = (
      await redis.client.ft.search(redis.chatIdxStr, `@chat_id:(${chatId})`)
    ).documents[0].value as unknown as iChat;

    return c;
  } catch (err) {
    return newApiError(500, "server is unable to search chat cache", err);
  }
}

/**
 * This function stores sent message to DB and cache.
 *
 * @param { string } chatId
 * @param { iChat } chatObj
 * @param { iMsgBody } data
 * @param { any } tx
 * @returns { Promise<void | APIError | Error> }
 */
export async function storeMsgCacheDoc(
  chatId: string,
  chatObj: iChat,
  data: iMsgBody,
  tx: any
): Promise<void | APIError | Error> {
  try {
    // STORE: cache message data
    tx.json.set(
      redis.chatSetItemName(chatId, data.msgId),
      "$",
      redis.redifyObj(data)
    );
    // STORE: doc message data
  } catch (err) {
    return newApiError(500, "server is unable to set new message cache", err);
  }

  try {
    const m = await ChatMessages.updateOne(
      { str_id: chatObj.msgs_id },
      { $push: { list: data } }
    );

    if (m.modifiedCount < 1)
      return newApiError(500, "server is failed to modify new message doc");
  } catch (err) {
    return newApiError(500, "server is unable to set new message doc", err);
  }
}

/**
 * This function retrieves user object from cache.
 *
 * @param { string } Id
 * @returns { Promise<iUser | APIError | Error> }
 */
export async function getUserCache(
  Id: string
): Promise<iUser | APIError | Error> {
  try {
    const u = (
      await redis.client.ft.search(redis.userIdxStr, `@accnt_id:(${Id})`)
    ).documents[0].value as unknown as iUser;

    return u;
  } catch (err) {
    return newApiError(500, "server is unable to search user cache index", err);
  }
}

/**
 * This function increments the sender & recipient relations documents hBump
 *
 * @param { string } userId
 * @param { string } userRelId
 * @param { string } recipientId
 * @param { string } recipientRelId
 * @param { iChatType } type
 * @returns
 */
export async function bumpRelDocs(
  userId: string,
  userRelId: string,
  recipientId: string,
  recipientRelId: string,
  type: iChatType
) {
  try {
    const ur = await GenRelations.updateOne(
      {
        str_id: userRelId,
        "relations.list": {
          $elemMatch: { accnt_id: recipientId } as iRelation,
        },
      },
      { $inc: { ["relations.hBump"]: 1, [`relations.list.$.bump`]: 1 } }
    );

    if (ur.modifiedCount < 1)
      return newApiError(500, "server failed to modify sender relation doc");
  } catch (err) {
    return newApiError(
      500,
      "server is unable to update sender relation doc",
      err
    );
  }

  if (type === "user")
    try {
      const rr = await GenRelations.updateOne(
        {
          str_id: recipientRelId,
          [`relations.list`]: {
            $elemMatch: { accnt_id: userId },
          },
        },
        { $inc: { ["relations.hBump"]: 1, [`relations.list.$.bump`]: 1 } }
      );

      if (rr.modifiedCount < 1)
        return newApiError(
          500,
          "server failed to modify recipient relation doc"
        );
    } catch (err) {
      return newApiError(
        500,
        "server is unable to update recipient relation doc",
        err
      );
    }
}

/**
 * This function initiates Redis transaction for sender & recipient relations bump increment.
 *
 * @param { string } userId
 * @param { string } recipientId
 * @param { iChatType } type
 * @param { any } tx - Redis Transaction Command Variable
 */
export function txRelsBumpCache(
  userId: string,
  recipientId: string,
  type: iChatType,
  tx: any
) {
  tx.json.numIncrBy(redis.relationItemName(userId), "$.hBump", 1);
  tx.json.numIncrBy(
    redis.relationSetItemName(userId, recipientId),
    "$.bump",
    1
  );

  if (type === "user") {
    tx.json.numIncrBy(redis.relationItemName(recipientId), "$.hBump", 1);
    tx.json.numIncrBy(
      redis.relationSetItemName(recipientId, userId),
      "$.bump",
      1
    );
  }
}

/**
 * This function retrieves account ID of members from a group.
 *
 * @param { string } groupId
 * @returns { Promise<iRelation[] | APIError | Error> }
 */
export async function getGroupMemberIDs(
  groupId: string
): Promise<iRelation[] | APIError | Error> {
  try {
    const members = await redis.client.ft.aggregate(
      redis.relationSetName(groupId),
      "*",
      { LOAD: ["@accnt_id"] }
    );

    return members.results as unknown as iRelation[];
  } catch (err) {
    return newApiError(500, "server is unable to aggregate group members", err);
  }
}

/**
 * This function executes redis transaction.
 *
 * @param { any } tx - Redis Transaction Commnad Variable
 * @returns
 */
export async function transactCache(tx: any) {
  try {
    await tx.exec();
  } catch (err) {
    return newApiError(
      500,
      "server is unable to execute cache transaction",
      err
    );
  }
}
