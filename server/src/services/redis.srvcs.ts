import { GeneralUtil } from "../util/misc.util";
import { newServerError } from "../global/serverErrors.global";
import { APIError, newApiError } from "../global/httpErrors.global";
import { createClient, RedisClientType } from "redis";
import { iRedisRelationItem, iRedisRequestItem } from "../models/redis.imodel";

import {
  userSessionSchema,
  userSchema,
  securitySchema,
  relationsIndexSchema,
  relationSchema,
  requestsIndexSchema,
  requestSchema,
  groupSchema,
  chatSchema,
  chatSetSchema,
} from "../models/redis.model";

export class RedisMethods {
  private static instance: RedisMethods;
  static client: RedisClientType;
  // active users str
  static readonly userSessionIdxStr = "idx:userSessions";
  static readonly userSessionItemStr = "userSession";
  // users str
  static readonly userIdxStr = "idx:users";
  static readonly userItmStr = "user";
  // security str
  static readonly securityIdxStr = "idx:securities";
  static readonly securityItmStr = "security";
  // relations str
  static readonly relationIdxStr = "idx:relations";
  static readonly relationItmStr = "relation";
  static readonly relationSetIdxStr = "idx:relSet";
  static readonly relationSetItemStr = "relItem";
  // requests str
  static readonly requestIdxStr = "idx:requests";
  static readonly requestItmStr = "request";
  static readonly requestInSetIdxStr = "idx:reqInSet";
  static readonly requestInSetItemStr = "reqInItem";
  static readonly requestOutSetIdxStr = "idx:reqOutSet";
  static readonly requestOutSetItemStr = "reqOutItem";
  // groups str
  static readonly groupIdxStr = "idx:groups";
  static readonly groupItmStr = "group";
  static readonly groupSetIdxStr = "idx:groupSet";
  static readonly groupSetItemStr = "grpItem";
  // chat str
  static readonly chatIdxStr = "idx:chats";
  static readonly chatItemStr = "chat";
  static readonly chatSetIdxStr = "idx:chatSet";
  static readonly chatSetItemStr = "chatItem";
  // msgs str
  static readonly msgsIdxStr = "idx:messages";
  static readonly msgsItemStr = "msg";
  // rules str
  static readonly rulesIdxStr = "idx:rules";
  static readonly rulesItemStr = "rule";

  private constructor() {
    if (process.env.SERVER_ENV === "DEVELOPMENT") {
      RedisMethods.client = createClient({
        password: process.env.REDIS_DEV_PW!,
        socket: {
          host: process.env.REDIS_DEV_HOST!,
          port: +process.env.REDIS_DEV_PORT!,
        },
      });

      console.log("Server -><- Redis-dev");
    } else if (process.env.SERVER_ENV === "TESTING") {
      RedisMethods.client = createClient({
        password: process.env.REDIS_TEST_PW!,
        socket: {
          host: process.env.REDIS_TEST_HOST!,
          port: +process.env.REDIS_TEST_PORT!,
        },
      });
    }
  }

  static async connect() {
    try {
      await this.client.connect();
    } catch (err) {
      const new_err = newServerError(
        "db",
        "server failed connecting to redis",
        err
      );

      console.error(new_err);
    }
    await RedisMethods.configureRedis();
  }

  static async disconnect() {
    try {
      await this.client.QUIT();
      if (process.env.SERVER_ENV !== "TESTING")
        console.log("Server <--> Redis");
    } catch (err) {
      console.error("server failed disconnecting from redis");
      console.log(err);
    }
  }

  static async configureRedis() {
    // await this.dropActiveUserIdx();
    // try {
    // } catch (err) {
    // return newServerError("cnfg")
    // return newApiError(500)
    // }
    await this.createIndexes();
    // await this.dropIndexes();
    // const list = await this.client.ft._LIST();
    // console.log(list);
  }

  static async createIndexes() {
    try {
      await Promise.allSettled([
        this.client.ft.create(this.userSessionIdxStr, userSessionSchema, {
          ON: "JSON",
          PREFIX: this.userSessionItemStr,
        }),
        this.client.ft.create(this.userIdxStr, userSchema, {
          ON: "JSON",
          PREFIX: this.userItmStr,
        }),
        this.client.ft.create(this.securityIdxStr, securitySchema, {
          ON: "JSON",
          PREFIX: this.securityItmStr,
        }),
        this.client.ft.create(this.relationIdxStr, relationsIndexSchema, {
          ON: "JSON",
          PREFIX: this.relationItmStr,
        }),
        this.client.ft.create(this.requestIdxStr, requestsIndexSchema, {
          ON: "JSON",
          PREFIX: this.requestItmStr,
        }),
        this.client.ft.create(this.groupIdxStr, groupSchema, {
          ON: "JSON",
          PREFIX: this.groupItmStr,
        }),
        this.client.ft.create(this.chatIdxStr, chatSchema, {
          ON: "JSON",
          PREFIX: this.chatItemStr,
        }),
      ]);
    } catch (err) {
      if ((err as any).message === "Index already exists") {
        console.error("Index exists already, skipped creation.");
      } else {
        console.error(err);
      }
    }
  }
  static async dropIndexes() {
    try {
      await Promise.all([
        // this.client.ft.dropIndex("idx:activeUsers"),
        // this.client.ft.dropIndex(this.userIdxStr),
        // this.client.ft.dropIndex(this.securityIdxStr),
        // this.client.ft.dropIndex(this.relationIdxStr),
        // this.client.ft.dropIndex(this.requestIdxStr),
        // this.client.ft.dropIndex("idx:groups"),
        // this.client.ft.dropIndex("idx:chats"),
      ]);
    } catch (err) {
      console.error(err);
    }
  }
  static async fillUsersIdx() {}

  static async dropActiveUserIdx(): Promise<void> {
    let users: any;
    try {
      users = await this.client.ft.search("idx:activeUsers", "*", {
        LIMIT: {
          from: 0,
          size: 10000,
        },
      });
    } catch (err) {
      const new_err = newServerError(
        "db",
        "server failed to fetch active users index cache",
        err
      );
      console.error(new_err);
    }

    let activeUser: any;
    for (activeUser of users.documents) {
      try {
        await this.client.json.del(activeUser.id);
      } catch (err) {
        const new_err = newServerError(
          "db",
          "server failed to delete active users cache",
          err
        );
        console.error(new_err);
      }
    }
  }

  static async listIndexes(): Promise<Array<string> | void> {
    let list: Array<string> = [];
    try {
      list = await this.client.ft._list();
      return list;
    } catch (err) {
      const new_err = newServerError(
        "db",
        "server failed fetching cache indexes",
        err
      );
      console.error(new_err);
    }
  }

  // SESSION UTILITY
  static userSessionName(userId: string): string {
    return `${this.userSessionItemStr}:${userId}`;
  }

  // USER UTILITY
  static userItemName(userId: string): string {
    return `${this.userItmStr}:${userId}`;
  }

  // SECURITY UTILITY
  static securityItemName(userId: string): string {
    return `${this.securityItmStr}:${userId}`;
  }

  // RELATION UTILITY
  static relationItemName(userId: string): string {
    return `${this.relationItmStr}:${userId}`;
  }
  static relationSetName(userId: string): string {
    return `${this.relationSetIdxStr}${userId}`;
  }
  static relationSetItemName(userId: string, recipientId: string): string {
    return `${this.relationSetItemStr}${userId}:${recipientId}`;
  }
  static relationItemObj(
    relationsId: string,
    bump: string,
    userId: string
  ): iRedisRelationItem {
    return {
      str_id: relationsId,
      hBump: parseInt(bump),
      relationSet: RedisMethods.relationSetName(userId),
    };
  }
  static async createRelationIndex(
    userId: string
  ): Promise<void | APIError | Error> {
    try {
      await this.client.ft.create(
        RedisMethods.relationSetName(userId),
        relationSchema,
        {
          ON: "JSON",
          PREFIX: `${this.relationSetItemStr}${userId}`,
        }
      );
    } catch (err) {
      return newApiError(
        500,
        "server is unable to create user relation cache index",
        err
      );
    }
  }

  // REQUEST UTILITY
  static requestItemName(userId: string): string {
    return `${this.requestItmStr}:${userId}`;
  }
  static requestInSetName(userId: string): string {
    return `${this.requestInSetIdxStr}${userId}`;
  }
  static requestInSetItemName(userId: string, recipientId: string): string {
    return `${this.requestInSetItemStr}${userId}:${recipientId}`;
  }
  static requestOutSetName(userId: string): string {
    return `${this.requestOutSetIdxStr}${userId}`;
  }
  static requestOutSetItemName(userId: string, recipientId: string): string {
    return `${this.requestOutSetItemStr}${userId}:${recipientId}`;
  }
  static requestItemObj(requestId: string, userId: string): iRedisRequestItem {
    return {
      str_id: requestId,
      reqInSet: RedisMethods.requestInSetName(userId),
      reqOutSet: RedisMethods.requestOutSetName(userId),
    };
  }
  static async createRequestIndex(
    userId: string
  ): Promise<void | APIError | Error> {
    try {
      await Promise.all([
        this.client.ft.create(
          RedisMethods.requestInSetName(userId),
          requestSchema,
          {
            ON: "JSON",
            PREFIX: `${this.requestInSetItemStr}${userId}`,
          }
        ),
        this.client.ft.create(
          RedisMethods.requestOutSetName(userId),
          requestSchema,
          {
            ON: "JSON",
            PREFIX: `${this.requestOutSetItemStr}${userId}`,
          }
        ),
      ]);
    } catch (err) {
      return newApiError(
        500,
        "server is unable to create user request cache index",
        err
      );
    }
  }

  // GROUP UTILITY
  static grpItemName(grpId: string): string {
    return `${this.groupItmStr}:${grpId}`;
  }
  static grpSetName(userId: string): string {
    return `${this.groupSetIdxStr}${userId}`;
  }
  static grpSetItemName(userId: string, itemId: string): string {
    return `${this.groupSetItemStr}${userId}:${itemId}`;
  }
  static async createGroupIndex(
    userId: string
  ): Promise<APIError | Error | void> {
    try {
      await this.client.ft.create(
        RedisMethods.grpSetName(userId),
        relationSchema,
        {
          ON: "JSON",
          PREFIX: `${this.groupSetItemStr}${userId}`,
        }
      );
    } catch (err) {
      return newApiError(
        500,
        "server failed to create user group cache index",
        err
      );
    }
  }

  // CHAT UTILITY
  static chatItemName(chatId: string): string {
    return `${this.chatItemStr}:${chatId}`;
  }
  static chatSetName(chatId: string): string {
    return `${this.chatSetIdxStr}${chatId}`;
  }
  static chatSetItemName(chatId: string, msgId: string): string {
    return `${this.chatSetItemStr}${chatId}:${msgId}`;
  }
  static async createChatIndex(chatId: string) {
    try {
      await this.client.ft.create(
        RedisMethods.chatSetName(chatId),
        chatSetSchema,
        {
          ON: "JSON",
          PREFIX: `${this.chatSetItemStr}${chatId}`,
        }
      );
    } catch (err) {
      return newApiError(
        500,
        "server is unable to create chat cache index",
        err
      );
    }
  }

  // REDIS UTILITY
  static days(i: number): number {
    return i * 60 * 60 * 24;
  }
  static weeks(i: number): number {
    return i * 60 * 60 * 24 * 7;
  }
  static redifyObj<T>(obj: object): T {
    return RedisMethods.boolToInt(GeneralUtil.flattenObject(obj)) as T;
  }
  static boolToInt(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (let key in obj) {
      const value = obj[key];
      if (typeof value === "boolean") {
        result[key] = value ? 1 : 0;
      } else {
        result[key] = value;
      }
    }
    return result;
  }
  static intToBool(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};

    for (let key in obj) {
      const value = obj[key];
      if (typeof value === "number") {
        result[key] = value ? true : false;
      } else {
        result[key] = value;
      }
    }

    return result;
  }
  static async discard() {
    try {
      await this.client.discard();
    } catch (err) {
      return err;
    }
  }

  static init() {
    if (!this.instance) this.instance = new RedisMethods();
    return this.instance;
  }
}

/*
------------------------
------- RELATIONS ------
------------------------

DECLARATION
relations                  relations' index
- str_id                   DB str_id
- hBump                    DB hBump
- relationSetIndex         cache relation special index` relationSet${UserId}`

METHOD
redis.client.ft.search("idx:relations", relationsId)
redis.client.json.set(`relation:${userId}`, redisRelationObj)

DECLARATION
relSet${UserId}            relations special index
- data                     iRelation data

METHOD
redis.client.ft.search(`idx:relSet${userId}`, recipientId)
redis.client.json.set(`relItem${userId}:redisRelationObj.accnt_id`, redisRelationObj)

------------------------
------- REQUESTS -------
------------------------
DECLARATION
requests                   relations' index
- str_id                   DB str_id
- reqInSetIndex            cache request-in special index` relSet${UserId}`
- reqOutSetIndex           cache request-out special index` relSet${UserId}`

METHOD
redis.client.ft.search("idx:requests", requestsId)
redis.client.json.set(`request:${userId}`, redisRequestObj)

DECLARATION
reqSet${UserId}            request special index
- data                     iUserRequest data

METHOD
redis.client.ft.search(`idx:reqInSet${userId}`, redisReqInObj)
redis.client.json.set(`reqInItem${userId}:reqInObj.accnt_id`, reqInObj)
*/
