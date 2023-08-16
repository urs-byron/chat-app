import { Utility } from "./util.data";
import { randomUUID } from "node:crypto";
import { APIError, newApiError } from "../global/httpErrors.global";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { iChat, iChatMsgs, iChatRules } from "../models/chat.imodel";
import { Chat, ChatMessages, ChatRules } from "../models/chat.model";

export class ChatMethods extends Utility {
  static instance: ChatMethods;

  private constructor() {
    super();
  }

  private async createChatMsgs(): Promise<APIError | Error | string> {
    const str_id: string = randomUUID().replace(/-/g, "");
    const new_msgs: iChatMsgs = {
      str_id: str_id,
      list: [],
      count: 0,
    };

    try {
      await this.createDBData(ChatMessages, new_msgs);
      return str_id;
    } catch (err) {
      return newApiError(
        500,
        "server is unable to create chat messages in db",
        err
      );
    }
  }

  private async createChatRules(): Promise<APIError | Error | string> {
    const str_id: string = randomUUID().replace(/-/g, "");
    const new_rules: iChatRules = {
      str_id: str_id,
      list: [],
      count: 0,
    };

    try {
      await this.createDBData(ChatRules, new_rules);
      return str_id;
    } catch (err) {
      return newApiError(500, "server is unable create chat rules in db", err);
    }
  }

  static async createChat(): Promise<APIError | Error | string> {
    const chatMethods: ChatMethods = ChatMethods.getInstance();
    const chat_id: string = randomUUID().replace(/-/g, "");
    let new_chat: iChat;
    const messagesId = await chatMethods.createChatMsgs();
    const rulesId = await chatMethods.createChatRules();
    const newChatObj = {
      chat_id: chat_id,
      msgs_id: messagesId,
      rules_id: rulesId,
    };

    if (messagesId instanceof APIError || messagesId instanceof Error)
      return messagesId;
    if (rulesId instanceof APIError || rulesId instanceof Error) return rulesId;

    try {
      await Chat.create(newChatObj);
    } catch (err) {
      return newApiError(
        500,
        "server is unable to create chat document in db",
        err
      );
    }

    try {
      const tx = redis.client.multi();
      const keyName = redis.chatItemName(chat_id);
      tx.json.set(keyName, "$", redis.redifyObj(newChatObj));
      // tx.expire(keyName, redis.days(3));
      await tx.exec();
      return chat_id;
    } catch (err) {
      return newApiError(
        500,
        "server is unable to create chat document in db",
        err
      );
    }
  }

  static getInstance(): ChatMethods {
    if (!this.instance) this.instance = new ChatMethods();
    return this.instance;
  }
}
