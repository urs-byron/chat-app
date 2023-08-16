import { User } from "../../models/user.model";
import { Model } from "mongoose";
import { Group } from "../../models/group.model";
import { iGroupDoc } from "../../models/group.imodel";
import { searchSkipCnt } from "../../global/search.global";
import { GenSecurity } from "../../models/gen.model";
import { RequestHandler } from "express";
import { PassportSession } from "../../models/auth.imodel";
import { ValidateMethods } from "../../util/validate.util";
import { APIError, newApiError } from "../../global/httpErrors.global";
import { iGenSecurity, iGenSecurityDoc } from "../../models/gen.imodel";
import {
  iUserDoc,
  iUserSearchObj,
  iUserSearchValues,
} from "../../models/user.imodel";

/*
// URGENT
validation --------- DONE
caching ------------ 0000
promisify ---------- DONE
error-handling ----- DONE
response ----------- DONE

// URGENT
import ------------- DONE
comment ------------ DONE
*/

export const postUserSearch: RequestHandler = async (req, res, next) => {
  // VALIDATION: returns error if client sent data is invalid
  const searchValid = ValidateMethods.search(req.body as iUserSearchValues);
  if (!searchValid.isValid) {
    return next(newApiError(400, "search data is invalid", searchValid.error));
  }

  // DATA GATHERING & SETTING
  const userId = (req.session as PassportSession).passport.user;
  const { pattern, type, skip }: iUserSearchValues = req.body;
  let searchResults: any;

  // CONFIGURE SEARCH OPTIONS
  const { model, id, name, fields } = configSearch(type);

  // FETCH ALL DOCUMENTS WITH MATCHING act_name pattern FROM DB
  searchResults = await searchDbUserGroup(
    userId,
    pattern,
    skip,
    model,
    id,
    name,
    fields
  );
  if (searchResults instanceof APIError || searchResults instanceof Error)
    return next(searchResults);

  // COMPILE ALL users CONFIGURED AS public
  const publicUsers = await filterNonPublic(searchResults, type);
  if (publicUsers instanceof APIError || publicUsers instanceof Error)
    return next(publicUsers);

  // RESPONSE
  return res.status(200).json({ statusCode: 200, data: publicUsers });
};

export function configSearch(type: 0 | 1): {
  model: Model<iUserDoc> | Model<iGroupDoc>;
  id: "act_id.accnt_id" | "grp_id";
  name: "act_name" | "grp_name";
  fields:
    | {
        _id: 0;
        "act_id.accnt_id": 1;
        act_name: 1;
        security: 1;
      }
    | {
        _id: 0;
        grp_id: 1;
        grp_name: 1;
        security: 1;
      };
} {
  if (type === 0)
    return {
      model: User,
      id: "act_id.accnt_id",
      name: "act_name",
      fields: {
        _id: 0,
        "act_id.accnt_id": 1,
        act_name: 1,
        security: 1,
      },
    };
  else
    return {
      model: Group,
      id: "grp_id",
      name: "grp_name",
      fields: {
        _id: 0,
        grp_id: 1,
        grp_name: 1,
        security: 1,
      },
    };
}

export async function searchDbUserGroup(
  userId: string,
  pattern: string,
  skip: number,
  model: Model<iUserDoc> | Model<iGroupDoc>,
  id: "act_id.accnt_id" | "grp_id",
  name: "act_name" | "grp_name",
  fields: any
): Promise<iUserDoc[] | iGroupDoc[] | APIError | Error> {
  try {
    const searchResults = await model.aggregate([
      {
        $match: {
          [`${id}`]: { $ne: userId },
          [`${name}`]: {
            $regex: pattern,
            $options: "i",
          },
        },
      },
      {
        $project: fields,
      },
      {
        // EDIT
        $skip: skip * searchSkipCnt,
      },
    ]);

    return searchResults as iUserDoc[] | iGroupDoc[];
  } catch (err) {
    return newApiError(500, "server is unable to find user", err);
  }
}

export async function filterNonPublic(
  searchResults: Array<iUserDoc | iGroupDoc>,
  type: 0 | 1
): Promise<Array<iUserSearchObj> | APIError | Error> {
  let user: iUserDoc | iGroupDoc;
  let publicUsers: Array<iUserSearchObj> = [];
  let publicProp: iGenSecurityDoc | null;

  for (user of searchResults) {
    try {
      publicProp = await GenSecurity.findOne({
        str_id: user.security,
      }).lean();

      if (!publicProp)
        return newApiError(404, "server found no user | group sewcurity");

      if (publicProp.privacy.public) {
        publicUsers!.push({
          accnt_id:
            type === 0
              ? (user as iUserDoc).act_id.accnt_id
              : (user as iGroupDoc).grp_id,
          act_name:
            type === 0
              ? (user as iUserDoc).act_name
              : (user as iGroupDoc).grp_name,
          availability: publicProp.privacy.availability,
        });
      }
    } catch (err) {
      return newApiError(
        500,
        "server is unable to search for user security",
        err
      );
    }
  }
  return publicUsers;
}
