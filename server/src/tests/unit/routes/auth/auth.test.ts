import "dotenv/config";

import { APIError } from "../../../../global/httpErrors.global";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { iUser, iUserDoc } from "../../../../models/user.imodel";
import {
  validateAuth,
  matchRedisUser,
  matchMongoUser,
  txRedisUser,
} from "../../../../routes/auth/auth.controller";
import { User } from "../../../../models/user.model";

describe("Auth Route Sub Functions", () => {
  const OLD_ENV = process.env;
  const userId = "sampleUserId";
  const userDoc: iUser = {
    act_id: {
      accnt_id: userId,
      accnt_type: "local",
    },
    act_name: "sampleName",
    security: "securityId",
    relations: "relationsId",
    requests: "requestsId",
  };

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Validation Fx", () => {
    test("if function would recognize valid inpnut patterns", () => {
      const v1 = validateAuth("lengthyString");

      expect(v1).toBeUndefined();
    });

    test("if function would recognize invalid inpnut patterns", () => {
      const iv1 = validateAuth("");
      expect(iv1).toBeInstanceOf(APIError || Error);
    });

    // further combination are not tested and laid off to typescript
  });

  describe("Matching Redis User Fx", () => {
    test("if function would return false for no matching cache", async () => {
      const u = await matchRedisUser(userId);
      expect(u).toEqual<boolean | APIError | Error>(false);
    });

    test("if function would return true for matching cache", async () => {
      await txRedisUser(userId, RedisMethods.redifyObj<iUserDoc>(userDoc));
      const u = await matchRedisUser(userId);
      expect(u).toEqual<boolean | APIError | Error>(true);
    });

    test("if function would return false for deleted cache", async () => {
      await RedisMethods.client.json.del(RedisMethods.userItemName(userId));
      const u = await matchRedisUser(userId);
      expect(u).toEqual<boolean | APIError | Error>(false);
    });
  });

  describe("Matching Mongoose User Fx", () => {
    test("if function would return false for no matching doc", async () => {
      const u = await matchMongoUser(userId);
      expect(u).toBeInstanceOf(APIError || Error);
    });

    test("if function would return true for matching doc", async () => {
      await User.create(userDoc);
      const u = await matchMongoUser(userId);
      Object.keys(RedisMethods.redifyObj(userDoc)).forEach((key) => {
        expect(key in RedisMethods.redifyObj<iUserDoc>(u!)).toEqual<boolean>(
          true
        );
      });
    });

    test("if function would return false for deleted doc", async () => {
      await User.deleteOne({ "act_id.accnt_id": userId });
      const u = await matchMongoUser(userId);
      expect(u).toBeInstanceOf(APIError || Error);
    });
  });

  afterAll(async () => {
    await MongoDBMethods.flush();
    await RedisMethods.client.flushAll();

    await MongoDBMethods.disconnect();
    await RedisMethods.disconnect();

    process.env = OLD_ENV;
  });
});
