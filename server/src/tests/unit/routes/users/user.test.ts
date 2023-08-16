import "dotenv/config";

import {
  getUserDoc,
  getPrivacyDoc,
} from "../../../../routes/user/user.controller";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { UserMethods } from "../../../../data/user.data";
import { iUser } from "../../../../models/user.imodel";
import { APIError } from "../../../../global/httpErrors.global";
import { User } from "../../../../models/user.model";

describe("GET User Sub Fxs", () => {
  test("sample", async () => {
    expect(1).toEqual(1);
  });

  const OLD_ENV = process.env;
  let user: iUser | APIError | Error;
  const userId: string = "sampleUserId";
  const userName: string = "sampleUserName";
  const userPW: string = "sampleUserPW";
  const userSH = UserMethods.generateHash(userPW);
  let tx: any;

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();

    tx = RedisMethods.client.multi();
  });

  describe("Retrieve User Doc Fx", () => {
    beforeAll(async () => {
      await RedisMethods.createIndexes();
    });

    test("if fx would return error since collection is empty", async () => {
      const t1 = await getUserDoc(userId, tx);
      expect(t1).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return user", async () => {
      user = await UserMethods.createUser(userId, userName, userSH, "local");
      const t2 = await getUserDoc(userId, tx);
      expect("act_id" in t2).toEqual(true);
    });

    test("if fx would return error since collection is id is wrong", async () => {
      const t1 = await getUserDoc(userId.concat("wrong"), tx);
      expect(t1).toBeInstanceOf(APIError || Error);
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
