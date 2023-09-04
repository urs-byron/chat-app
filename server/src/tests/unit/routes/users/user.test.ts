import "dotenv/config";

import { User } from "../../../../models/user.model";
import { iUser } from "../../../../models/user.imodel";
import { TestUtil } from "../../../misc/util";
import { APIError } from "../../../../global/httpErrors.global";
import { UserMethods } from "../../../../data/user.data";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { iGenSecurityDoc, iGetGenRels } from "../../../../models/gen.imodel";
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
  const usrs = TestUtil.createSampleUser();
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

  describe("Retrieve Relation Cache Count Fx", () => {
    /**
     * Test 1 - Return an error since no index exist
     * --- create index
     * Test 2 - Return 0 since index is empty
     * --- populate index
     * Test 3 - Return specific count
     * --- (1) delete 1 index item (2) drop index
     * Test 4 - Return specific count and 0 after continuous index items deletion
     */

    test("if fx would return an error since no index exists", async () => {
      const t1 = await checkRelCache(userId.concat("fake"));
      expect(t1).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return zero (0) since index is empty", async () => {
      const t2 = await checkRelCache(userId);

      expect(t2).toBe<number>(0);
    });

    test(`if fx would return ${usrs.length} after populating index`, async () => {
      await TestUtil.createSampleUsersRelCache(userId, usrs);

      const t3 = await checkRelCache(userId);

      expect(t3).toEqual<number>(usrs.length);
    });

    test(`if fx would return ${
      usrs.length - 1
    } from deleting one cache from index`, async () => {
      await RedisMethods.client.json.del(
        RedisMethods.relationSetItemName(userId, usrs[0].act_id.accnt_id)
      );

      const t4 = await checkRelCache(userId);
      expect(t4).toEqual<number>(usrs.length - 1);
    });

    test(`if fx would return 0 from dropping cache index`, async () => {
      const tx = RedisMethods.client.multi();
      usrs.forEach((usr: iUser, i: number) => {
        if (i + 1 === usrs.length) return;
        tx.json.del(
          RedisMethods.relationSetItemName(userId, usrs[i + 1].act_id.accnt_id)
        );
      });
      await tx.exec();

      const t5 = await checkRelCache(userId);

      await RedisMethods.client.ft.dropIndex(
        RedisMethods.relationSetName(userId)
      );

      expect(t5).toEqual<number>(0);
    });
  });

  describe("Retrieve Relation Cache Fx", () => {
    /**
     * Test 1 - Return error since no relation cache index exists
     * --- create relation cache index
     * Test 2 - Return empty cache array
     * --- populate relation cache index
     * Test 3 - Return filled cache defined relation array
     * --- delete single relation item
     * Test 4 - Return filled cache defined - 1, relation array
     * --- delete all relation caches
     * Test 5 - Return empty cache array
     */

    const sCount = 3;
    const mutesBlocks = TestUtil.createDiffConRel(sCount, sCount, sCount);

    test("if fx would return an error since no relation cache index exist", async () => {
      const t1 = await getRelCache(userId);
      expect(t1).toBeInstanceOf<typeof APIError | Error>(APIError || Error);
    });

    test("if fx would return empty array", async () => {
      await RedisMethods.createRelationIndex(userId);

      const t2 = await getRelCache(userId);
      expect((t2 as iGetGenRels)[0].mutes.length).toStrictEqual<number>(0);
      expect((t2 as iGetGenRels)[0].blocks.length).toStrictEqual<number>(0);
    });

    test(`if fx would return ${sCount} for mute & blocks aray length`, async () => {
      await TestUtil.createRelCaches(userId, mutesBlocks);

      const t3 = await getRelCache(userId);
      expect((t3 as iGetGenRels)[0].mutes.length).toStrictEqual<number>(sCount);
      expect((t3 as iGetGenRels)[0].blocks.length).toStrictEqual<number>(
        sCount
      );
    }, 15000);

    test("if fx would return empty arrays after deleting caches from index", async () => {
      await TestUtil.deleteRelCaches(userId, mutesBlocks);

      const t4 = await getRelCache(userId);

      expect((t4 as iGetGenRels)[0].mutes.length).toStrictEqual<number>(0);
      expect((t4 as iGetGenRels)[0].blocks.length).toStrictEqual<number>(0);
    });
  });

  describe("Retrieve Relation Doc Fx", () => {
    const sCnt = 3;
    const mutesBlocks = TestUtil.createDiffConRel(sCnt, sCnt, sCnt);

    /**
     * Test 1 - Return Error from non existing user docs
     * Test 2 - Return empty relations docs
     * --- populate rel docs
     * Test 3 - Return filled relations docs
     * --- delete rel docs
     * Test 3 - Return empty relations docs
     */

    test("if fx would return error from fake relations ID", async () => {
      const t1 = await getRelDoc((user as iUser).relations.concat("faker"));
      expect(t1).toBeInstanceOf<typeof APIError | Error>(APIError || Error);
    });

    test("if fx would return empty from mutes and blocks", async () => {
      const t2 = await getRelDoc((user as iUser).relations);

      expect((t2 as iGetGenRels)[0].mutes.length).toBe<number>(0);
      expect((t2 as iGetGenRels)[0].blocks.length).toBe<number>(0);
    });

    test(`if fx would return ${sCnt} from mutes and blocks`, async () => {
      await TestUtil.pushRelArrToRelDoc((user as iUser).relations, mutesBlocks);

      const t3 = await getRelDoc((user as iUser).relations);

      expect((t3 as iGetGenRels)[0].mutes.length).toBe<number>(sCnt);
      expect((t3 as iGetGenRels)[0].blocks.length).toBe<number>(sCnt);
    }, 15000);

    test("if fx would return 0 from mutes and blocks after deleting items", async () => {
      await TestUtil.pullAllFromRelDoc((user as iUser).relations);

      const t4 = await getRelDoc((user as iUser).relations);

      expect((t4 as iGetGenRels)[0].mutes.length).toBe<number>(0);
      expect((t4 as iGetGenRels)[0].blocks.length).toBe<number>(0);
    }, 15000);
  });

  afterAll(async () => {
    await MongoDBMethods.flush();
    await RedisMethods.client.flushAll();
    await MongoDBMethods.disconnect();
    await RedisMethods.disconnect();

    process.env = OLD_ENV;
  });
});
