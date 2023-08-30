import { User } from "../../models/user.model";
import { SearchReply } from "redis";
import { iAuthInputs } from "../../global/validity.global";
import { UserMethods } from "../../data/user.data";
import { RequestHandler } from "express";
import { iGenSecuritySH } from "../../models/gen.imodel";
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

export const postRegister: RequestHandler = async (req, res, next) => {
  // VALIDATION: returns error if client sent data is invalid
  const regValid = ValidateMethods.register(req.body);
  if (!regValid.isValid)
    return next(newApiError(400, "invalid registration input", regValid.error));

  // DATA GETHERING
  const { username, password } = req.body as iAuthInputs;
  const sh: iGenSecuritySH = UserMethods.generateHash(password);

  // VALIDATION: returns error if matching user cache is found
  const e = await existingCacheUser(username);
  if (e instanceof APIError || e instanceof Error) return next(e);

  // VALIDATION: returns error if matching user document is found
  const f = await existingDBUser(username);
  if (f instanceof APIError || f instanceof Error) return next(e);

  // CREATE NEW USER IN DB
  const user = await UserMethods.createUser(null, username, sh, "local");
  if (user instanceof APIError || user instanceof Error) return next(user);

  // RESPONSE
  return res.status(200).json({ statusCode: 200, data: null });
};

// SUB FUNCTIONS

/**
 * This function returns error if matching user is found from cache.
 *
 * @param { string } username
 * @returns { Promise<void | APIError | Error> }
 */
export async function existingCacheUser(
  username: string
): Promise<void | APIError | Error> {
  try {
    const existingUser: SearchReply = await redis.client.ft.search(
      redis.userIdxStr,
      `@act_name:(${username})`
    );

    if (existingUser.total) {
      return newApiError(400, "matching username exists");
    }
  } catch (err) {
    return newApiError(500, "server is unable to search for user cache", err);
  }
}

/**
 * This function returns error if matching user is found from DB.
 *
 * @param { string } username
 * @returns { Promise<void | APIError | Error> }
 */
export async function existingDBUser(
  username: string
): Promise<void | APIError | Error> {
  try {
    const existingUser = await User.exists({ act_name: username });

    if (existingUser !== null)
      return newApiError(400, "matching username exists");
  } catch (err) {
    return newApiError(500, "server is unable to find for user from db", err);
  }
}
