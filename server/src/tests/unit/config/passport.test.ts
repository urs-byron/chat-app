import "dotenv/config";

import passport from "passport";

import { Passport } from "../../../config/passport.config";
import { iStratOpt } from "../../../models/auth.imodel";
import { MongoDBMethods } from "../../../services/mongo.srvcs";

describe("Passport Configuration", () => {
  const OLD_ENV = process.env;

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    await MongoDBMethods.connect();
  });

  describe("Strategy Options", () => {
    test("if variables are valid & defined", () => {
      const optsArr = [
        Passport.google_opts,
        Passport.facebook_opts,
        Passport.github_opts,
      ];
      let opts: iStratOpt;
      let item: string;

      for (opts of optsArr) {
        const o = [opts.callbackURL, opts.clientID, opts.clientSecret];
        for (item of o) {
          expect(
            typeof item === "string" && item.length ? true : false
          ).toBe<boolean>(true);
        }
      }
    });
  });

  afterAll(async () => {
    await MongoDBMethods.flush();
    await MongoDBMethods.disconnect();

    process.env = OLD_ENV;
  });
});
