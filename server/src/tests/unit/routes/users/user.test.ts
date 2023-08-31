import "dotenv/config";

import { User } from "../../../../models/user.model";
import { iUser } from "../../../../models/user.imodel";
import { APIError } from "../../../../global/httpErrors.global";
import { UserMethods } from "../../../../data/user.data";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import {
  getUserDoc,
  getPrivacyDoc,
  checkRelCache,
  getRelCache,
  getRelDoc,
  cacheRelDocs,
  chechReqCache,
  getReqCache,
  getReqDoc,
  cacheReq,
  cacheUser,
} from "../../../../routes/user/user.controller";
import { iGenSecurityDoc } from "../../../../models/gen.imodel";

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
      expect(t1).toBeInstanceOf<typeof APIError | Error>(APIError || Error);
    });

    test("if fx would return user", async () => {
      user = await UserMethods.createUser(userId, userName, userSH, "local");
      const t2 = await getUserDoc(userId, tx);
      expect("act_id" in t2).toEqual<boolean>(true);
    });

    test("if fx would return error since collection is id is wrong", async () => {
      const t1 = await getUserDoc(userId.concat("wrong"), tx);
      expect(t1).toBeInstanceOf<typeof APIError | Error>(APIError || Error);
    });
  });

  describe("Retrieve User Security Fx", () => {
    /**
     * getPrivacyDoc() first checks the the cache with the security ID
     * if nothing matched, it will check the DB with the security ID
     * and eventually return an error after finding none
     */

    /**
     * Test 1 - Return data since previous test already created a security data
     * Test 2 - Return error after using fake user & security Id
     * Test 3 - Return data from DB
     * Test 3 - Return data from cache
     */

    test("if fx would return target security data", async () => {
      const tx = RedisMethods.client.multi();

      const t1 = await getPrivacyDoc(userId, (user as iUser).security, tx);
      expect((t1 as iGenSecurityDoc).str_id).toEqual<string>(
        (user as iUser).security
      );

      tx.discard();
    });

    test("if fx would return error after matching no account", async () => {
      const tx = RedisMethods.client.multi();

      const t21 = await getPrivacyDoc(
        userId.concat("fake"),
        (user as iUser).security.concat("fake"),
        tx
      );

      expect(t21).toBeInstanceOf<typeof APIError | Error>(APIError || Error);

      tx.discard();
    });

    test("if fx would return data from DB", async () => {
      const tx = RedisMethods.client.multi();
      const t22 = await getPrivacyDoc(userId, (user as iUser).security, tx);

      expect("_id" in t22).toBe<boolean>(true);
      expect((t22 as iGenSecurityDoc).str_id).toEqual<string>(
        (user as iUser).security
      );

      await tx.exec();
    });

    test("if fx would return data from cache", async () => {
      // will return a security object after previously caching
      const t23 = await getPrivacyDoc(userId, (user as iUser).security, tx);

      expect("_id" in t23).toBe<boolean>(false);
      expect((t23 as iGenSecurityDoc).str_id).toEqual<string>(
        (user as iUser).security
      );
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
