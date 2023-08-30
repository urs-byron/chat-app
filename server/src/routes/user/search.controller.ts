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
import { GeneralUtil } from "../../util/misc.util";

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
  const { pattern, type, skip, cnt }: iUserSearchValues = req.body;
  // GET skip & limit for mongoose aggegate
  const { skip: mSkip, limit: mLimit } = GeneralUtil.getMongoSkipLimit(
    skip,
    searchSkipCnt
  );

  // CONFIGURE SEARCH VARIABLES
  const { model, id, name, fields } = configSearch(type);
  // GET search aggregate filter
  const searchFilter = createSearchFilter(userId, pattern, id, name);

  // VALIDATION: return if no more matching docs to return
  const matchCount = await countMatch(model, searchFilter);
  if (matchCount instanceof APIError || matchCount instanceof Error)
    return next(matchCount);

  // RESPONSE
  if (cnt > matchCount)
    return res.status(200).json({ statusCode: 200, data: [] });

  // FETCH ALL DOCUMENTS WITH MATCHING act_name pattern FROM DB
  const searchResults = await searchDbUserGroup(
    searchFilter,
    mSkip,
    mLimit,
    model,
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

/**
 * Variable Assignment
 *
 * @param { 0 | 1 } type - (0) user & (1) group
 * @returns
 */
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

/**
 * This function returns a matching object for DB aggregate pipeline.
 *
 * @param { string } userId - account ID of search requestor, w/c will be omited from search
 * @param { string } pattern - search pattern transformed to regex
 * @param { "act_id.accnt_id" | "grp_id" } id - id key path name within object
 * @param { "act_name" | "grp_name" } name - name key path name within object
 * @returns
 */
export function createSearchFilter(
  userId: string,
  pattern: string,
  id: "act_id.accnt_id" | "grp_id",
  name: "act_name" | "grp_name"
) {
  return {
    [`${id}`]: { $ne: userId },
    [`${name}`]: {
      $regex: pattern,
      $options: "i",
    },
  };
}

/**
 * This function returns the total number of matching documents from a user | group collection.
 *
 * @param { Model<iUserDoc> | Model<iGroupDoc> } model
 * @param { any } filter
 * @returns
 */
export async function countMatch(
  model: Model<iUserDoc> | Model<iGroupDoc>,
  filter: any
): Promise<number | APIError | Error> {
  try {
    const c = await model.count(filter);

    return c;
  } catch (err) {
    return newApiError(500, "server is unable to search match count", err);
  }
}

/**
 * This function returns an array users or groups from DB.
 *
 * @param { any } filter
 * @param { number } skip
 * @param { number } limit
 * @param { Model<iUserDoc> | Model<iGroupDoc> } model
 * @param { any } fields
 * @returns { Promise<iUserDoc[] | iGroupDoc[] | APIError | Error> }
 */
export async function searchDbUserGroup(
  filter: any,
  skip: number,
  limit: number,
  model: Model<iUserDoc> | Model<iGroupDoc>,
  fields: any
): Promise<iUserDoc[] | iGroupDoc[] | APIError | Error> {
  try {
    const searchResults = await model.aggregate([
      { $match: filter },
      { $sort: { act_name: 1 } },
      { $project: fields },
      { $skip: skip },
      { $limit: limit },
    ]);

    if (!searchResults.length) return [];
    return searchResults as iUserDoc[] | iGroupDoc[];
  } catch (err) {
    return newApiError(500, "server is unable to find user", err);
  }
}

/**
 * This function filters users and groups who are set as not available for public search.
 *
 * @param { Array<iUserDoc | iGroupDoc> } searchResults
 * @param { 0 | 1 } type - (0) user | (1) group
 * @returns { Promise<Array<iUserSearchObj> | APIError | Error> }
 */
export async function filterNonPublic(
  searchResults: Array<iUserDoc | iGroupDoc>,
  type: 0 | 1
): Promise<Array<iUserSearchObj> | APIError | Error> {
  if (
    searchResults === undefined ||
    searchResults === null ||
    !searchResults.length
  )
    return [];

  let user: iUserDoc | iGroupDoc;
  let publicUsers: Array<iUserSearchObj> = [];
  let publicProp: iGenSecurityDoc | null;

  for (user of searchResults) {
    try {
      publicProp = await GenSecurity.findOne({
        str_id: user.security,
      }).lean();

      if (!publicProp)
        return newApiError(404, "server found no user | group security");

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
