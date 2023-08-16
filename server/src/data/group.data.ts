import { Group } from "../models/group.model";
import { chatType } from "../models/user.model";
import { randomUUID } from "node:crypto";
import { ChatMethods } from "./chat.data";
import { memberValues } from "../models/chat.imodel";
import { GeneralMethods } from "./misc.data";
import { iGeneralProp, iGroup } from "../models/group.imodel";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { APIError, newApiError } from "../global/httpErrors.global";

export class GroupMethods {
  static instance: GroupMethods;

  private constructor() {}

  static async createGroup(
    admin: memberValues,
    grpName: string
  ): Promise<Error | APIError | iGroup> {
    const str_id = randomUUID().replace(/-/g, "");

    const genProp: iGeneralProp | APIError | Error =
      await GeneralMethods.createGenData(chatType.group, null, admin);
    const chatId: APIError | Error | string = await ChatMethods.createChat();

    if (genProp instanceof APIError || genProp instanceof Error) return genProp;
    if (chatId instanceof APIError || chatId instanceof Error) return chatId;

    const new_group: iGroup = {
      grp_id: str_id,
      grp_name: grpName,
      chat_id: chatId,
      security: genProp.securityId,
      requests: genProp.requestId,
      relations: genProp.relationId,
    };

    try {
      await Group.create(new_group);
    } catch (err) {
      return newApiError(500, "server failed to create new group in db", err);
    }

    // create user relation cache index
    const userRelationCacheIndex = await redis.createRelationIndex(str_id);
    if (
      userRelationCacheIndex instanceof APIError ||
      userRelationCacheIndex instanceof Error
    )
      return userRelationCacheIndex;

    // create user request cache index
    const userRequestCacheIndex = await redis.createRequestIndex(str_id);
    if (
      userRequestCacheIndex instanceof APIError ||
      userRequestCacheIndex instanceof Error
    )
      return userRequestCacheIndex;

    return new_group;
  }

  static getInstance(): GroupMethods {
    if (!this.instance) this.instance = new GroupMethods();
    return this.instance;
  }
}
