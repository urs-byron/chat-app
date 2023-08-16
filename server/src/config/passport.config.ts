import passport from "passport";

import { User } from "../models/user.model";
import { UserMethods } from "../data/user.data";
import { GenSecurity } from "../models/gen.model";
import { newApiError } from "../global/httpErrors.global";
import { iValidityType } from "../global/validity.global";
import { ValidateMethods } from "../util/validate.util";
import { RedisMethods as redis } from "../services/redis.srvcs";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import {
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";

// --- PASSPORT WILL SEARCH HTTP.REQ BASED ON THESE FIELDS
const custom_field = {
  usernameField: "username",
  passwordField: "password",
};

// ------ PASSPORT STRATEGIES

// --- LOCAL STRAT
// --- LOCAL CALLBACK
async function localVerifyCallback(
  username: string,
  password: string,
  done: VerifyCallback
) {
  const validity: iValidityType = ValidateMethods.loginInputs({
    username,
    password,
  });

  if (validity.isValid) {
    let user: any;

    // ACCOUNT SEARCH FROM DB
    try {
      user = await User.findOne({ act_name: username }).lean();
    } catch (err: any) {
      const new_err = newApiError(500, "unable to search user", err);
      return done(new_err);
    }

    if (!user) {
      // ERROR FROM NULL ACCOUNT SEARCH
      const new_err = newApiError(404, "account not found");
      return done(new_err, false);
    }

    // ACCOUNT SECURITY REPLICATION
    let user_security: any;
    try {
      user_security = await GenSecurity.findOne({
        str_id: user.security,
      });
    } catch (err: any) {
      const new_err = newApiError(
        500,
        "unable to fetch user security information",
        err
      );
      return done(new_err);
    }

    // ACCOUNT PASSWORD VERIFICATION
    const validPass = ValidateMethods.password(
      password,
      user_security!.security.hash as string,
      user_security!.security.salt as string
    );

    // ACCOUNT AUTHENTICATION LOGIC
    if (validPass.isValid) return done(null, user);
    else return done(newApiError(400, "invalid password input"));
  } else {
    const new_err = newApiError(
      400,
      "invalid login credentials",
      validity.error
    );
    return done(new_err);
  }
}

// --- PASSPORT AUTH STRAT OPTION TYPE
interface iStratOpt {
  callbackURL: string;
  clientID: string;
  clientSecret: string;
}

// --- GOOGLE-OAUTH20 STRAT
// GOOGLE-OAUTH20 OPTIONS
const google_opts: StrategyOptions & iStratOpt = {
  callbackURL: "/auth/login/google/callback",
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
};
// GOOGLE-OAUTH20 CB
async function googleVerifyCallback(
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
): Promise<void> {
  try {
    // ACCOUNT SEARCH FROM DB
    const user = await User.findOne({
      act_id: { accnt_type: "google", accnt_id: profile?.id },
    }).lean();

    if (user) {
      // SERILIZATION IF ACCOUNT IS SEARCHED
      return done(null, user!);
    } else {
      // ACCOUNT CREATION IF NULL IS SEARCHED
      const email: string = profile?.emails?.[0]?.value as string;
      let new_user: any;
      try {
        new_user = await UserMethods.createUser(
          profile?.id,
          email,
          null,
          "google"
        );

        await redis.createRelationIndex(profile?.id);
        await redis.createRequestIndex(profile?.id);

        return done(null, new_user!);
      } catch (err: any) {
        const new_err = newApiError(500, "unable to create new user", err);
        done(new_err);
      }
    }
  } catch (err: any) {
    const new_err = newApiError(500, "unable to search user", err);
    return done(new_err);
  }
}

// --- FACEBOOK STRAT
// FACEBOOK OPTIONS
const facebook_opts: iStratOpt = {
  callbackURL: "/auth/login/facebook/callback",
  clientID: process.env.FACEBOOK_CLIENT_ID!,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
};

// FACEBOOK CB
async function facebookVerifyCallback(
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
): Promise<void> {
  try {
    // ACCOUNT SEARCH FROM DB
    const user = await User.findOne({
      act_id: { accnt_type: "facebook", accnt_id: profile?.id },
    }).lean();
    if (user) {
      // SERILIZATION IF ACCOUNT IS SEARCHED
      return done(null, user!);
    } else {
      // ACCOUNT CREATION IF NULL IS SEARCHED
      let new_user: any;
      try {
        new_user = await UserMethods.createUser(
          profile.id,
          profile.displayName,
          null,
          "facebook"
        );

        await redis.createRelationIndex(profile.id);
        await redis.createRequestIndex(profile.id);

        return done(null, new_user);
      } catch (err: any) {
        const new_err = newApiError(500, "unable to create new user", err);
        done(new_err);
      }
    }
  } catch (err) {
    const new_err = newApiError(500, "unable to search user", err);
    return done(new_err);
  }
}

// --- GITHUB STRAT
// GITHUB OPTIONS
const github_opts: iStratOpt = {
  callbackURL: "/auth/login/github/callback" as string,
  clientID: process.env.GITHUB_CLIENT_ID as string,
  clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
};

// GITHUB CB
async function githubVerifyCallback(
  accessToken: any,
  refreshToken: any,
  profile: any,
  done: any
): Promise<void> {
  try {
    // ACCOUNT SEARCH FROM DB
    const user = await User.findOne({
      act_id: { accnt_type: "github", accnt_id: profile.id },
    }).lean();

    if (user) {
      // SERILIZATION IF ACCOUNT IS SEARCHED
      return done(null, user);
    } else {
      // ACCOUNT CREATION IF NULL IS SEARCHED
      let new_user: any;
      try {
        new_user = await UserMethods.createUser(
          profile?.id,
          profile?.login,
          null,
          "github"
        );
        await redis.createRelationIndex(profile.id);
        await redis.createRequestIndex(profile.id);

        return done(null, new_user);
      } catch (err: any) {
        const new_err = newApiError(500, "unable to create new user", err);
        done(new_err);
      }
    }
  } catch (err) {
    const new_err = newApiError(500, "unable to search user", err);
    done(new_err);
  }
}

const local_strategy = new LocalStrategy(custom_field, localVerifyCallback);
const google_strategy = new GoogleStrategy(google_opts, googleVerifyCallback);
const facebook_strategy = new FacebookStrategy(
  facebook_opts,
  facebookVerifyCallback
);
const github_strategy = new GithubStrategy(github_opts, githubVerifyCallback);

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
