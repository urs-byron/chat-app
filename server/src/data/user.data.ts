import { User } from "../models/user.model";
import { Utility } from "./util.data";
import { chatType } from "../models/user.model";
import { iGeneralProp } from "../models/group.imodel";
import { iGenSecuritySH } from "../models/gen.imodel";
import { GeneralMethods } from "./misc.data";
import { iUser, iUserType } from "../models/user.imodel";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { APIError, newApiError } from "../global/httpErrors.global";
import { randomUUID, randomBytes, pbkdf2Sync } from "node:crypto";

/**
 * This class holds functions related initialization of user data:
 * - General Documents in DB
 * - User Salt Hash Generation
 *
 * @extends Utility
 */
export class UserMethods extends Utility {
  static instance: UserMethods | null;

  private constructor() {
    super();
  }

  /**
   * This function is creates required user initial documents & indexes:
   * - security
   * - requests
   * - relations
   *
   * @param { string } [id] - optional since Sign-On accounts already have their IDs
   * @param { string } username
   * @param { iGenSecuritySH } [sh] - optional since Sign-On accounts don't have password
   * @param { iUserType } type
   * @returns
   */
  static readonly createUser = async (
    id: string | null,
    username: string,
    sh: iGenSecuritySH | null,
    type: iUserType
  ): Promise<iUser | APIError | Error> => {
    const optId: string = id ? id : randomUUID().replace(/-/g, "");
    const genProp = await GeneralMethods.createGenData(chatType.user, sh, null);

    Object.values(genProp).forEach((e) => {
      if (e instanceof APIError || e instanceof Error) return e;
    });

    const new_user: iUser = {
      act_id: {
        accnt_type: type,
        accnt_id: optId,
      },
      act_name: username,
      security: (genProp as iGeneralProp).securityId,
      requests: (genProp as iGeneralProp).requestId,
      relations: (genProp as iGeneralProp).relationId,
    };

    // create user relation cache index
    const userRelationCacheIndex = await redis.createRelationIndex(optId);
    if (
      userRelationCacheIndex instanceof APIError ||
      userRelationCacheIndex instanceof Error
    )
      return userRelationCacheIndex;

    // create user request cache index
    const userRequestCacheIndex = await redis.createRequestIndex(optId);
    if (
      userRequestCacheIndex instanceof APIError ||
      userRequestCacheIndex instanceof Error
    )
      return userRequestCacheIndex;

    const userGroupCacheIndex = await redis.createGroupIndex(optId);
    if (
      userGroupCacheIndex instanceof APIError ||
      userGroupCacheIndex instanceof Error
    )
      return userGroupCacheIndex;

    try {
      await User.create(new_user);
      return new_user;
    } catch (err) {
      return newApiError(500, "server failed to create user", err);
    }
  };

  /**
   * This function generates hash & salt for a corresponding password.
   *
   * @param { string } password
   * @returns { iGenSecuritySH }
   */
  static readonly generateHash = (password: string): iGenSecuritySH => {
    const salt: string = randomBytes(32).toString("hex");
    const hash: string = pbkdf2Sync(
      password,
      salt as BinaryType,
      10000,
      64,
      "sha512"
    ).toString("hex");

    return { salt: salt, hash: hash };
  };

  static readonly getInstance = (): UserMethods => {
    if (!this.instance) this.instance = new UserMethods();
    return this.instance;
  };
}
