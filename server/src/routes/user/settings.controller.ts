import { iUser } from "../../models/user.imodel";
import { UserMethods } from "../../data/user.data";
import { iUserPassword } from "../../global/validity.global";
import { RequestHandler } from "express";
import { PassportSession } from "../../models/auth.imodel";
import { ValidateMethods } from "../../util/validate.util";
import { UpdateWriteOpResult } from "mongoose";
import { RedisMethods as redis } from "../../services/redis.srvcs";
import { APIError, newApiError } from "../../global/httpErrors.global";
import { GenSecurity, userSettings } from "../../models/gen.model";
import {
  iPrivacyRequest,
  iGenPrivacyProp,
  iGenSecuritySH,
  iGenSecurity,
  iGenSecurityDoc,
} from "../../models/gen.imodel";

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

export const putUserPrivacy: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const userId = (req.session as PassportSession).passport.user;
  const privacyData: iPrivacyRequest = req.body;
  const { security: securityId } = req.user as iUser;

  let propValue!: iGenPrivacyProp;
  if (privacyData.property === "availability") {
    propValue = userSettings.availability;
  } else if (privacyData.property === "public") {
    propValue = userSettings.public;
  }

  // VALIDATION: returns error if client sent data is invalid
  const v = validatePutPrivacy(privacyData, propValue);
  if (v instanceof APIError || v instanceof Error) return next(v);

  // UPDATE DATABASE with new user privacy
  const upS = await updateDocPrivacy(securityId, privacyData);
  if (upS instanceof APIError || upS instanceof Error) return next(upS);

  // UPDATE CACHE WITH new user privacy
  const upC = await updateCachePrivacy(userId, privacyData);
  if (upC instanceof APIError || upC instanceof Error) return next(upC);

  // RESPONSE
  return res.status(200).json({ statusCode: 200, data: null });
};

// SUB FX

export function validatePutPrivacy(
  privacyData: iPrivacyRequest,
  propValue: iGenPrivacyProp
): APIError | Error | void {
  const privacyDataValid = ValidateMethods.privacyData(privacyData, propValue);
  if (!privacyDataValid.isValid) {
    return newApiError(
      400,
      "client send an invalid data upon request for user privacy configuration",
      privacyDataValid.error
    );
  }
}

export async function updateDocPrivacy(
  securityId: string,
  privacyData: iPrivacyRequest
): Promise<void | APIError | Error> {
  try {
    const updateResponse = (await GenSecurity.updateOne(
      {
        str_id: securityId,
        [`privacy.${privacyData.property}`]:
          privacyData.value === "true" ? false : true,
      },
      {
        $set: {
          [`privacy.${privacyData.property}`]:
            privacyData.value === "true" ? true : false,
        },
      }
    )) as UpdateWriteOpResult;

    if (updateResponse.modifiedCount < 1) {
      return newApiError(500, "server failed to update user privacy");
    }
  } catch (err) {
    return newApiError(500, "server is unable to search for user", err);
  }
}

export async function updateCachePrivacy(
  userId: string,
  privacyData: iPrivacyRequest
): Promise<void | APIError | Error> {
  try {
    await redis.client.json.set(
      redis.securityItemName(userId),
      `$.${privacyData.property}`,
      privacyData.value === "true" ? 1 : 0
    );
  } catch (err) {
    return newApiError(
      500,
      "server is unable to search for user security cache",
      err
    );
  }
}

/*
// URGENT
validation --------- DONE
caching ------------ 0000
promisify ---------- DONE
error-handling ----- DONE
response ----------- DONE

// URGENT
import ------------- DONE
comment ------------ !NO!
*/

export const putUserPassword: RequestHandler = async (req, res, next) => {
  // DATA GATHERING
  const passwordSet = req.body as iUserPassword;
  const { security: securityId } = req.user as iUser;

  // VALIDATION: returns error if client sent data is invalid
  const v = validatePutSecurity(passwordSet);
  if (v instanceof APIError || v instanceof Error) return next(v);

  // VALIDATION: returns error if new password matches previous password
  const v2 = await validateSamePasswordErr(securityId, passwordSet);
  if (v2 instanceof APIError || v2 instanceof Error) return next(v2);

  // UPDATE DATABASE WITH new user security
  const upP = await updateUserPassword(securityId, passwordSet);
  if (upP instanceof APIError || upP instanceof Error) return next(upP);

  // RESPONSE
  return res.status(200).json({ statusCode: 200, data: null });
};

// SUB FX

export function validatePutSecurity(
  passwordSet: iUserPassword
): void | APIError | Error {
  const validity = ValidateMethods.passwordChange(passwordSet);
  if (!validity.isValid) {
    return newApiError(404, "invalid password values", validity.error);
  }
}

export async function validateSamePasswordErr(
  securityId: string,
  passwordSet: iUserPassword
): Promise<APIError | Error | void> {
  try {
    const userSecurity = await GenSecurity.findOne<iGenSecurityDoc>({
      str_id: securityId,
    } as iGenSecurity).select("-_id security");
    if (!userSecurity) {
      return newApiError(404, "user security not found");
    }

    const validPassword = ValidateMethods.password(
      passwordSet.password,
      userSecurity.security!.hash,
      userSecurity.security!.salt
    );

    // VALIDATION: return error IF NEW PASSWORD MATCHES PREVIOUS SALT & HASH
    if (validPassword.isValid)
      return newApiError(400, "invalid password input", validPassword.error);
  } catch (err) {
    return newApiError(500, "unable to search user", err);
  }
}

export async function updateUserPassword(
  securityId: string,
  passwordSet: iUserPassword
): Promise<APIError | Error | void> {
  try {
    const newGenHash = UserMethods.generateHash(passwordSet.password);
    const updateResponse = (await GenSecurity.updateOne(
      {
        str_id: securityId,
      } as iGenSecurity,
      {
        $set: {
          security: {
            salt: newGenHash.salt,
            hash: newGenHash.hash,
          } as iGenSecuritySH,
        },
      }
    )) as UpdateWriteOpResult;
    if (updateResponse.modifiedCount < 1)
      return newApiError(500, "user security is unsuccessfuly updated");
  } catch (err) {
    return newApiError(500, "server is unable to update user security", err);
  }
}
