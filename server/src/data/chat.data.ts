import { Utility } from "./util.data";
import { randomUUID } from "node:crypto";
import { APIError, newApiError } from "../global/httpErrors.global";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { iChat, iChatMsgs, iChatRules } from "../models/chat.imodel";
import { Chat, ChatMessages, ChatRules } from "../models/chat.model";

/**
 * This class holds functions which manages DB procedures mainly in regards with chat data.
 *
 * @extends Utility
 */
export class ChatMethods extends Utility {
  static instance: ChatMethods;

  private constructor() {
    super();
  }

  /**
   * This function creates a pair | group exclusive document to contain their chat messages.
   *
   * @returns { Promise<APIError | Error | string> }
   */
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

  /**
   * This function creates a pair | group exclusive document to contain their chat rules.
   *
   * @returns { Promise<APIError | Error | string> }
   */
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

  /**
   * This function creates a pair | group exclusive document to contain their chat rules.
   *
   * @returns { Promise<APIError | Error | string> }
   */
  static async createChat(): Promise<APIError | Error | string> {
    // Get ChatMethods instance
    const chatMethods: ChatMethods = ChatMethods.getInstance();

    // Create chat id
    const chat_id: string = randomUUID().replace(/-/g, "");

    const msgsId = await chatMethods.createChatMsgs();
    if (msgsId instanceof APIError || msgsId instanceof Error) return msgsId;

    const rulesId = await chatMethods.createChatRules();
    if (rulesId instanceof APIError || rulesId instanceof Error) return rulesId;

    /** Pair | Group exclusive document to contain their chat related IDs. */
    const newChatObj: iChat = {
      chat_id: chat_id,
      msgs_id: msgsId,
      rules_id: rulesId,
    };

    // Save to MongoDB
    try {
      await Chat.create(newChatObj);
    } catch (err) {
      return newApiError(
        500,
        "server is unable to create chat document in db",
        err
      );
    }

    // Save to Redis
    const tx = redis.client.multi();
    const keyName = redis.chatItemName(chat_id);
    tx.json.set(keyName, "$", redis.redifyObj(newChatObj));
    // tx.expire(keyName, redis.days(3));

    try {
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
