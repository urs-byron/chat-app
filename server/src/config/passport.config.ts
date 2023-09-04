import "dotenv/config";

import passport from "passport";

import { User } from "../models/user.model";
import { UserMethods } from "../data/user.data";
import { GenSecurity } from "../models/gen.model";
import { iValidityType } from "../global/validity.global";
import { iGenSecurityDoc } from "../models/gen.imodel";
import { ValidateMethods } from "../util/validate.util";
import { APIError, newApiError } from "../global/httpErrors.global";
import { Strategy as LocalStrategy } from "passport-local";
import { iUser, iUserDoc, iUserType } from "../models/user.imodel";
import {
  Profile as GProfile,
  VerifyCallback,
  StrategyOptions,
  Strategy as GoogleStrategy,
} from "passport-google-oauth20";
import {
  Strategy as FacebookStrategy,
  Profile as FBProfile,
} from "passport-facebook";
import {
  Strategy as GithubStrategy,
  Profile as GHProfile,
} from "passport-github2";
import { iStratOpt } from "../models/auth.imodel";

export class Passport {
  // --------------------------
  // ---- STRATEGY OPTIONS ----
  // --------------------------
  /** Custom Request Body Key Names searched by Passport. */
  static readonly custom_field = {
    usernameField: "username",
    passwordField: "password",
  };

  /** Custom Google Passport Options: cb, id, sercret. */
  static readonly google_opts: StrategyOptions & iStratOpt = {
    callbackURL: "/1/auth/login/google/callback",
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  };

  /** Custom FB Passport Options: cb, id, sercret. */
  static readonly facebook_opts: iStratOpt = {
    callbackURL: "/1/auth/login/facebook/callback",
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  };

  /** Custom GitHub Passport Options: cb, id, sercret. */
  static readonly github_opts: iStratOpt = {
    callbackURL: "/1/auth/login/github/callback",
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  };

  private constructor() {}

  // --------------------------
  // --- STRATEGY CALLBACKS ---
  // --------------------------

  /**
   * This function contains the reagrding user authentication from local login.
   *
   * @param { string } username - account username
   * @param { string } password - account password
   * @param { VerifyCallback } done
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly localVerifyCallback = async (
    username: string,
    password: string,
    done: VerifyCallback
  ): Promise<void> => {
    /** This variable contains validity and possible reasons of credential invalidity. */
    const validity: iValidityType = ValidateMethods.loginInputs({
      username,
      password,
    });

    // Cut logic immediately upon invalid credeential.
    if (!validity.isValid)
      return done(
        newApiError(400, "invalid login credentials", validity.error)
      );

    /** User Doc from MongoDB */
    let user: iUserDoc | null;

    /** Search DB if matching account exist. */
    try {
      user = await User.findOne({ act_name: username }).lean();
    } catch (err) {
      return done(newApiError(500, "unable to search user", err));
    }

    // Cut logic if no match user is found.
    if (!user) return done(newApiError(404, "account not found"), false);

    /** User Security Doc from MongoDB */
    let user_security: iGenSecurityDoc | null;
    try {
      user_security = await GenSecurity.findOne({
        str_id: user.security,
      });
    } catch (err) {
      return done(
        newApiError(500, "unable to fetch user security information", err)
      );
    }

    // Cut logic if no match security is found.
    if (
      user_security === undefined ||
      user_security === null ||
      !("security" in user_security)
    )
      return done(
        newApiError(500, "unable to fetch user security information")
      );

    /** This variable contains validity and possible reasons of user password mismatch. */
    const validPass = ValidateMethods.password(
      password,
      user_security!.security!.hash as string,
      user_security!.security!.salt as string
    );

    // ACCOUNT AUTHENTICATION LOGIC
    if (validPass.isValid) return done(null, user);
    else return done(newApiError(400, "invalid password input"));
  };

  /**
   * This function contains the reagrding user authentication from Google login.
   *
   * @param { string } accessToken
   * @param { string } refreshToken
   * @param { GProfile } profile
   * @param { VerifyCallback } done
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly googleVerifyCallback = async (
    accessToken: string,
    refreshToken: string,
    profile: GProfile,
    done: VerifyCallback
  ): Promise<void> => {
    const r = await this.logOrCreateSignOnAccount(
      profile.id,
      profile.displayName as string,
      "google"
    );

    if (r instanceof APIError || r instanceof Error) done(r);
    else done(null, r);
  };

  /**
   * This function contains the reagrding user authentication from Facebook login.
   *
   * @param { string } accessToken
   * @param { string } refreshToken
   * @param { FBProfile } profile
   * @param { VerifyCallback } done
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly facebookVerifyCallback = async (
    accessToken: string,
    refreshToken: string,
    profile: FBProfile,
    done: VerifyCallback
  ): Promise<void> => {
    const r = await this.logOrCreateSignOnAccount(
      profile.id,
      profile.displayName,
      "facebook"
    );

    if (r instanceof APIError || r instanceof Error) done(r);
    else done(null, r);
  };

  /**
   * This function contains the reagrding user authentication from GitHub login.
   *
   * @param { string } accessToken
   * @param { string } refreshToken
   * @param { GHProfile } profile
   * @param { VerifyCallback } done
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly githubVerifyCallback = async (
    accessToken: string,
    refreshToken: string,
    profile: GHProfile,
    done: VerifyCallback
  ): Promise<void> => {
    const r = await this.logOrCreateSignOnAccount(
      profile.id,
      profile.displayName,
      "github"
    );

    if (r instanceof APIError || r instanceof Error) return done(r);
    else done(null, r);
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------

  /**
   * This function either:
   * - logs from a 3rd party account
   * - creates a new user account on the DBs.
   *
   * @param { string } id - user ID from 3rd party API
   * @param { string } username - username from 3rd party API
   * @param { iUserType } type - type of account login
   * @returns { Promise<iUser | APIError | Error> }
   *
   * @static
   */
  static readonly logOrCreateSignOnAccount = async (
    id: string,
    username: string,
    type: iUserType
  ): Promise<iUser | APIError | Error> => {
    let user!: iUserDoc | null;

    try {
      // ACCOUNT SEARCH FROM DB
      user = await User.findOne({
        act_id: { accnt_type: type, accnt_id: id },
      } as iUser).lean();
    } catch (err) {
      return newApiError(500, "unable to search user", err);
    }

    // SERILIZATION IF ACCOUNT IS SEARCHED
    if (user) return user;

    // ACCOUNT CREATION IF NULL IS SEARCHED
    const new_user = await UserMethods.createUser(id, username, null, type);
    return new_user;
  };
}

const local_strategy = new LocalStrategy(
  Passport.custom_field,
  Passport.localVerifyCallback
);
const google_strategy = new GoogleStrategy(
  Passport.google_opts,
  Passport.googleVerifyCallback
);
const facebook_strategy = new FacebookStrategy(
  Passport.facebook_opts,
  Passport.facebookVerifyCallback
);
const github_strategy = new GithubStrategy(
  Passport.github_opts,
  Passport.githubVerifyCallback
);

passport.use(local_strategy);
passport.use(google_strategy);
passport.use(facebook_strategy);
passport.use(github_strategy);

// DECIDES WHAT WILL BE PASSED TO THE SESSION (COOKIE)
passport.serializeUser((user: Express.User & { [key: string]: any }, done) => {
  done(null, user.act_id.accnt_id);
});

// DECIDES WHAT WILL BE FETCHED FROM THE SESSION (COOKIE)
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ "act_id.accnt_id": userId }).lean();
    done(null, user);
  } catch (err) {
    const new_err = newApiError(500, "unable to search for user", err);
    done(new_err);
  }
});

// ------------ NOTE
// Only the LocalStrategy CB has an error 404 since logic for SIGN-ONs requires creation of unexisting account
// Only the LocalStrategy CB has logic for hash & salt generation since SIGN-ONs provide account security on their servers
