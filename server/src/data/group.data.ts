import { Group } from "../models/group.model";
import { chatType } from "../models/user.model";
import { randomUUID } from "node:crypto";
import { ChatMethods } from "./chat.data";
import { memberValues } from "../models/chat.imodel";
import { GeneralMethods } from "./misc.data";
import { iGeneralProp, iGroup } from "../models/group.imodel";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { APIError, newApiError } from "../global/httpErrors.global";

/** This class holds function related to creating message groups */
export class GroupMethods {
  static instance: GroupMethods;

  private constructor() {}

  /**
   * This function creates a group exclusive
   * - document in MongoDB
   * - indexes in Redis.
   *
   * @param { memberValues } admin - group admin
   * @param { string } grpName
   * @returns { Promise<Error | APIError | iGroup> }
   *
   * @static
   */
  static async createGroup(
    admin: memberValues,
    grpName: string
  ): Promise<Error | APIError | iGroup> {
    /**
     * Create general group exclusive mongoDB documents - 0
     *
     * Create chat group exclusive mongoDB documents - 1
     *
     * Add Group to DB - 2
     *
     * Create group exclusive cache indexes - 3
     */

    // 0
    const genProp = await GeneralMethods.createGenData(
      chatType.group,
      null,
      admin
    );
    if (genProp instanceof APIError || genProp instanceof Error) return genProp;

    // 1
    const chatId = await ChatMethods.createChat();
    if (chatId instanceof APIError || chatId instanceof Error) return chatId;

    const str_id = randomUUID().replace(/-/g, "");
    const new_group: iGroup = {
      grp_id: str_id,
      grp_name: grpName,
      chat_id: chatId,
      security: genProp.securityId,
      requests: genProp.requestId,
      relations: genProp.relationId,
    };

    // 2
    try {
      await Group.create(new_group);
    } catch (err) {
      return newApiError(500, "server failed to create new group in db", err);
    }

    // 3
    const res1 = await redis.createRelationIndex(str_id);
    if (res1 instanceof APIError || res1 instanceof Error) return res1;

    const res2 = await redis.createRequestIndex(str_id);
    if (res2 instanceof APIError || res2 instanceof Error) return res2;

    return new_group;
  }

  static getInstance(): GroupMethods {
    if (!this.instance) this.instance = new GroupMethods();
    return this.instance;
  }
}
