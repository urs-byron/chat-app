import { User } from "../../models/user.model";
import { SearchReply } from "redis";
import { RequestHandler } from "express";
import { iUser, iUserDoc } from "../../models/user.imodel";
import { ValidateMethods } from "../../util/validate.util";
import { RedisMethods as redis } from "../../services/redis.srvcs";
import { APIError, newApiError } from "../../global/httpErrors.global";

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

export const getAuth: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId = (req.user as iUser).act_id.accnt_id;
  let user: iUserDoc | null | APIError | Error;
  const resOK = {
    statusCode: 200,
    data: req.user,
  };

  // VALIDATION: returns error if client sent data is invalid
  const v = validateAuth(userId);
  if (v instanceof APIError || v instanceof Error) return next(v);

  // SEARCH REDIS FOR MATCHING user cache
  const u = await matchRedisUser(userId);
  if (u instanceof APIError || u instanceof Error) return next(u);
  else if (u) return res.status(200).json(resOK);

  // SEARCH DB FOR MATCHING user documents
  user = await matchMongoUser(userId);
  if (user instanceof APIError || user instanceof Error) return next(user);

  // FURTHER: cache user item
  const tx = await txRedisUser(userId, user as iUserDoc);
  if (tx instanceof APIError || tx instanceof Error) return next(user);

  // RESPONSE
  return res.status(200).json(resOK);
};

// SUB FUNCTIONS

export const validateAuth: (userId: string) => void | APIError | Error = (
  userId
) => {
  const userValid = ValidateMethods.authenticate(userId);
  if (!userValid.isValid) {
    return newApiError(
      403,
      "server found invalid user credentials",
      userValid.error
    );
  }
};

export const matchRedisUser: (
  userId: string
) => Promise<boolean | APIError | Error> = async (userId) => {
  let user: SearchReply;

  try {
    user = await redis.client.ft.search(
      redis.userIdxStr,
      `@accnt_id:(${userId})`
    );

    if (user.total) return true;
    else return false;
  } catch (err) {
    return newApiError(500, "server failed fetching user cache", err);
  }
};

export const matchMongoUser: (
  userId: string
) => Promise<iUserDoc | null | APIError | Error> = async (userId) => {
  let user: iUserDoc | null;

  try {
    user = await User.findOne<iUserDoc>({
      "act_id.accnt_id": userId,
    }).lean();

    if (!user) return newApiError(404, "server found no matching user");
    else return user;
  } catch (err) {
    return newApiError(404, "server failed fetching user document", err);
  }
};

export const txRedisUser: (
  userId: string,
  user: iUserDoc
) => Promise<void | APIError | Error> = async (userId, user) => {
  try {
    const keyName = redis.userItemName(userId);

    const tx = redis.client.multi();
    tx.json.set(keyName, "$", redis.redifyObj(user));
    // tx.expire(keyName, redis.days(3));
    await tx.exec();
  } catch (err) {
    return newApiError(500, "server failed transacting user cache", err);
  }
};
