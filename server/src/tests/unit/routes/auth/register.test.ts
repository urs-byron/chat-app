import "dotenv/config";

import { User } from "../../../../models/user.model";
import { iUser } from "../../../../models/user.imodel";
import { APIError } from "../../../../global/httpErrors.global";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import {
  existingCacheUser,
  existingDBUser,
} from "../../../../routes/auth/register.controller";

describe("Register Route Sub Functions", () => {
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

  describe("Existing Cache User Fx", () => {
    const cacheKey = RedisMethods.userItemName(userId);

    test("if fx would return an undefined for no matching cache", async () => {
      const e = await existingCacheUser(userDoc.act_name);
      expect(e).toBeUndefined();
    });
    test("if fx would return an error for a matching cache", async () => {
      await RedisMethods.client.json.set(
        cacheKey,
        "$",
        RedisMethods.redifyObj(userDoc)
      );
      const e = await existingCacheUser(userDoc.act_name);
      expect(e).toBeInstanceOf(APIError || Error);
    });
    test("if fx would return an undefined due to deleting cache", async () => {
      await RedisMethods.client.json.del(cacheKey);
      const e = await existingCacheUser(userDoc.act_name);
      expect(e).toBeUndefined();
    });
  });

  describe("Existing DB User Fx", () => {
    test("if fx would return undefined for a matching doc", async () => {
      const e = await existingDBUser(userDoc.act_name);
      expect(e).toBeUndefined();
    });

    test("if fx would return an error for matching doc", async () => {
      await User.create(userDoc);
      const e = await existingDBUser(userDoc.act_name);
      expect(e).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return an undefined due to deleting doc", async () => {
      await User.deleteOne({ "act_id.accnt_id": userDoc.act_id.accnt_id });
      const e = await existingDBUser(userDoc.act_name);
      expect(e).toBeUndefined();
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
