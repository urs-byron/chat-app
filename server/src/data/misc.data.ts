import { iUser, iUserDoc } from "../models/user.imodel";
import { iGroup, iGroupDoc } from "../models/group.imodel";
import { Utility } from "./util.data";
import { chatType } from "../models/user.model";
import { randomUUID } from "node:crypto";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { APIError, newApiError } from "../global/httpErrors.global";
import { iChatType, memberValues } from "../models/chat.imodel";
import {
  GenRelations,
  GenRequests,
  GenSecurity,
  genRequestState,
} from "../models/gen.model";
import {
  iGenRelations,
  iGenRequest,
  iGenRequests,
  iGenSecurity,
  iGenSecuritySH,
  iNewGenRequests,
  iRelation,
} from "../models/gen.imodel";

export class GeneralMethods extends Utility {
  static instance: GeneralMethods | null = null;

  private constructor() {
    super();
  }

  private async createSecurity(
    type: iChatType,
    sh: iGenSecuritySH | null
  ): Promise<string | APIError | Error> {
    const str_id: string = randomUUID().replace(/-/g, "");
    const new_security: iGenSecurity =
      type === "user"
        ? {
            str_id: str_id,
            security: sh!,
            privacy: {
              public: true,
              availability: false,
            },
          }
        : {
            str_id: str_id,

            privacy: {
              public: true,
              availability: false,
            },
          };

    try {
      await this.createDBData(GenSecurity, new_security);
      return str_id;
    } catch (err) {
      return newApiError(500, "server failed to create user security", err);
    }
  }

  private async createRequests(): Promise<string | APIError | Error> {
    const str_id: string = randomUUID().replace(/-/g, "");
    let new_requests: iGenRequests = {
      str_id: str_id,
      requests: {
        invitations: {
          incoming: [],
          outgoing: [],
        },
        memberships: {
          incoming: [],
          outgoing: [],
        },
      },
    };

    try {
      await this.createDBData(GenRequests, new_requests);
      return str_id;
    } catch (err) {
      return newApiError(500, "server failed to create user requests", err);
    }
  }

  private async createRelations(
    type: iChatType,
    admin: memberValues
  ): Promise<string | APIError | Error> {
    const str_id: string = randomUUID().replace(/-/g, "");
    let new_relations: iGenRelations;

    // filter - designated null input per chat type

    type === chatType.group
      ? (new_relations = {
          str_id: str_id,
          relations: {
            hBump: 0,
            list: [
              {
                accnt_id: admin.accnt_id,
                accnt_name: admin.accnt_name,
                admin: true,
                type: type,
                chat_id: "",
                block: false,
                mute: false,
                archive: false,
                bump: 0,
              },
            ],
          },
        })
      : (new_relations = {
          str_id: str_id,
          relations: {
            hBump: 0,
            list: [],
          },
        });

    try {
      await this.createDBData(GenRelations, new_relations);
      return str_id;
    } catch (err) {
      return newApiError(500, "server failed to create user relations", err);
    }
  }
  static async createGenData(
    type: iChatType,
    sh: iGenSecuritySH | null,
    admin: memberValues | null
  ) {
    const methods: GeneralMethods = this.getInstace();

    const requests_id: string | APIError | Error =
      await methods.createRequests();
    const relations_id: string | APIError | Error =
      await methods.createRelations(type, admin!);
    const security_id: string | APIError | Error = await methods.createSecurity(
      type,
      sh
    );

    if (requests_id instanceof APIError || requests_id instanceof Error) {
      return requests_id;
    }
    if (relations_id instanceof APIError || relations_id instanceof Error) {
      return relations_id;
    }
    if (security_id instanceof APIError || security_id instanceof Error) {
      return security_id;
    }

    return {
      securityId: security_id,
      requestId: requests_id,
      relationId: relations_id,
    };
  }

  // UTILITY FUNCTION
  static async createRequest(
    user: iUser & iGroup & iUserDoc & iGroupDoc,
    userId: string,
    recipient: iUser & iGroup,
    recipientId: string,
    requestType: 1 | 2 | 3,
    requestPath: "invitations" | "memberships"
  ): Promise<APIError | Error | iNewGenRequests> {
    // create new requests
    const newOutRequest: iGenRequest = {
      accnt_id: recipientId,
      accnt_name: requestType !== 2 ? recipient.act_name : recipient.grp_name,
      isGroup: requestType !== 1 ? true : false,
      status: genRequestState.pending,
    };
    const newInRequest: iGenRequest = {
      accnt_id: userId,
      accnt_name: requestType !== 3 ? user.act_name : user.grp_name,
      isGroup: requestType !== 1 ? true : false,
      status: genRequestState.pending,
    };

    // update db collection by adding new requests
    try {
      await GenRequests.updateOne(
        { str_id: user.requests },
        { $push: { [`requests.${requestPath}.outgoing`]: newOutRequest } }
      );
    } catch (err) {
      return newApiError(500, "server cannot make request in db", err);
    }

    try {
      await GenRequests.updateOne(
        { str_id: recipient.requests },
        { $push: { [`requests.${requestPath}.incoming`]: newInRequest } }
      );
    } catch (err) {
      return newApiError(500, "server cannot make request in db", err);
    }

    // update cache request sets by adding new requests
    const tx = redis.client.multi();
    const userKey = redis.requestOutSetItemName(userId, recipientId);
    const recipientKey = redis.requestInSetItemName(recipientId, userId);
    tx.json.set(userKey, "$", redis.redifyObj(newOutRequest));
    // tx.expire(userKey, redis.days(3));
    tx.json.set(recipientKey, "$", redis.redifyObj(newInRequest));
    // tx.expire(recipientKey, redis.days(3));
    try {
      await tx.exec();
    } catch (err) {
      return newApiError(
        500,
        "server failed to execute cache transaction for new request",
        err
      );
    }

    return {
      newInReq: newInRequest,
      newOutReq: newOutRequest,
    };
  }

  static createRelationObj(
    member: memberValues,
    type: iChatType,
    isAdmin: boolean,
    chat_id: string,
    hBump: number
  ): iRelation {
    return {
      accnt_id: member.accnt_id,
      accnt_name: member.accnt_name,
      type: type,
      chat_id: chat_id,
      admin: isAdmin,
      block: false,
      mute: false,
      archive: false,
      bump: hBump,
    };
  }

  static readonly getInstace: () => GeneralMethods = () => {
    !this.instance ? (this.instance = new GeneralMethods()) : null;
    return this.instance;
  };
}
