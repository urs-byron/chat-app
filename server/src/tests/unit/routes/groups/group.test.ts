import "dotenv/config";

import { iUser } from "../../../../models/user.imodel";
import { Group } from "../../../../models/group.model";
import { APIError } from "../../../../global/httpErrors.global";
import { TestUtil } from "../../../misc/util";
import { UserMethods } from "../../../../data/user.data";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { GenRelations } from "../../../../models/gen.model";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { iGenSecuritySH, iRelation } from "../../../../models/gen.imodel";
import {
  iGroup,
  iGroupDoc,
  iNewGrpBody,
} from "../../../../models/group.imodel";
import {
  getGroupDoc,
  getRelCaches,
  getGroupRelCaches,
  getGroupRelDocs,
  txCacheGroupSet,
  validateNewGrp,
  sameCacheGrpNameErr,
  sameDbGrpNameErr,
  getIncrDBUserHBump,
  createGrpRelObj,
} from "../../../../routes/group/group.controller";

const OLD_ENV = process.env;
const password = "samplePassword";
const userSH: iGenSecuritySH = UserMethods.generateHash(password);
const users = TestUtil.createSampleUser();
const user = users[0];
const userId = user.act_id.accnt_id;
const grps = TestUtil.createSampleGroup();
const grp = grps[0];

describe("Get Group Sub Fxs", () => {
  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Get Group Doc Fx", () => {
    /**
     * Test 1 - no cache, no doc, return error
     * --- fill group docs
     * Test 2 - no cache, has doc, return group doc
     * --- tx.exec()
     * Test 3 - has cache, has doc, return group doc
     */

    test("if fx would return error from empty cache and DB", async () => {
      const tx = RedisMethods.client.multi();
      const t1 = await getGroupDoc(grp.grp_id, tx);
      expect(t1).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return group doc after filling DB", async () => {
      const tx = RedisMethods.client.multi();
      await TestUtil.createSampleGroupDoc(grps);
      const t2 = await getGroupDoc(grp.grp_id, tx);

      await tx.exec();

      expect((t2 as iGroupDoc).grp_id).toEqual<string>(grp.grp_id);
    }, 15000);

    test(" if fx would return group cache previously caching group", async () => {
      const tx = RedisMethods.client.multi();
      const t3 = await getGroupDoc(grp.grp_id, tx);

      tx.discard();

      expect((t3 as iGroupDoc).grp_id).toEqual(grp.grp_id);
    });

    test("if fx would return error from non-existing group", async () => {
      const tx = RedisMethods.client.multi();
      const t1 = await getGroupDoc(grp.grp_id.concat("fakce"), tx);
      expect(t1).toBeInstanceOf(APIError || Error);
    });
  });

  describe("Get Relation Caches", () => {
    type T = Record<"relations", iRelation[]>[];
    const relCacheObj: T = [{ relations: [] }];

    /**
     * Test 1: Return Error from non existing index
     * --- create relation index
     * Test 2: Return empty array
     * --- populate relation index
     * Test 3: Return predetermined array
     * --- delete relation index caches
     * Test 4: Return empty array
     */

    test("if fx would return error from non existing index", async () => {
      const t1 = await getRelCaches(userId);
      expect(t1).toBeInstanceOf<typeof APIError | Error>(APIError || Error);
    });

    test("if fx would return empty array afer creating index", async () => {
      await RedisMethods.createRelationIndex(userId);
      const t2 = await getRelCaches(userId);

      expect((t2 as T)[0].relations.length).toEqual<number>(0);
      expect(t2).toStrictEqual<T>(relCacheObj);
    });

    test(`if fx would return a rel array with a length of ${users.length}`, async () => {
      await TestUtil.createSampleUsersRelCache(userId, users);
      const t3 = await getRelCaches(userId);

      let t3ex = relCacheObj;
      t3ex[0].relations = [...(t3 as T)[0].relations];

      expect((t3 as T)[0].relations.length).toEqual<number>(users.length);
      expect(t3).toStrictEqual<T>(t3ex);
    }, 15000);

    test("if fx would return an empty array after deleting index cache relations", async () => {
      const tx = RedisMethods.client.multi();

      let user: iUser;
      let userKey: string;
      for (user of users) {
        userKey = RedisMethods.relationSetItemName(
          userId,
          user.act_id.accnt_id
        );
        tx.json.del(userKey);
      }
      await tx.exec();

      const t4 = await getRelCaches(userId);

      let t4ex = relCacheObj;
      t4ex[0].relations = [...(t4 as T)[0].relations];

      expect((t4 as T)[0].relations.length).toEqual<number>(0);
      expect(t4).toStrictEqual<T>(relCacheObj);
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

describe("Get Groups Sub Fxs", () => {
  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await RedisMethods.connect();
    await MongoDBMethods.connect();
  });

  describe("Get Cache Groups Fx", () => {
    beforeAll(async () => {
      await RedisMethods.createRelationIndex(userId);
    });

    test("if fx would return a void since the index is empty", async () => {
      const gs = await getGroupRelCaches(userId);
      expect(gs).toBeUndefined();
    });

    test(`if fx would return group relation array of ${users.length} items`, async () => {
      await Promise.allSettled([
        TestUtil.createSampleGroupRelCache(userId, grps),
        TestUtil.createSampleUsersRelCache(userId, users),
      ]);

      const gs = await getGroupRelCaches(userId);
      expect(Array.isArray(gs)).toEqual<boolean>(true);
      expect((gs as []).length).toEqual<number>(users.length);
    }, 15000);

    test("if fx would return a void since the cache are deleted", async () => {
      const tx = RedisMethods.client.multi();
      let cacheKey: string;
      grps.forEach((grp: iGroup) => {
        cacheKey = RedisMethods.relationSetItemName(userId, grp.grp_id);
        tx.json.del(cacheKey);
      });
      await tx.exec();

      const rg = await getGroupRelCaches(userId);
      expect(rg).toBeUndefined();
    }, 15000);
  });

  describe("Get Doc Groups Fx", () => {
    let u: iUser | APIError | Error;

    beforeAll(async () => {
      await RedisMethods.client.flushAll();
      u = await UserMethods.createUser(
        user.act_id.accnt_id,
        user.act_name,
        userSH,
        "local"
      );
    });

    test("if fx would return an empty group array", async () => {
      const gd = await getGroupRelDocs((u as iUser).relations);
      expect((gd as []).length).toBe<number>(0);
    });

    test("if fx would return group relation array", async () => {
      await TestUtil.createSampleGroupRelDoc(
        userId,
        (u as iUser).relations,
        grps
      );
      await TestUtil.createSampleUserRelDoc(
        userId,
        (u as iUser).relations,
        users
      );

      const gd = await getGroupRelDocs((u as iUser).relations);
      expect((gd as []).length).toEqual(5);
    }, 15000);

    test("if fx would return an empty array since the documents are deleted", async () => {
      await TestUtil.pullAllFromRelDoc((u as iUser).relations);

      const gd = await getGroupRelDocs((u as iUser).relations);
      expect((gd as []).length).toEqual(0);
    }, 15000);
  });

  describe("Cache Group Relation Items Fx", () => {
    const grpSetName = RedisMethods.grpSetName(userId);

    beforeAll(async () => {
      await RedisMethods.createGroupIndex(userId);
    });

    test("if fx would not transact anything", async () => {
      await txCacheGroupSet([], userId);
      const i = await RedisMethods.client.ft.info(grpSetName);
      expect(parseInt(i.numDocs)).toEqual(0);
    });

    test("if fx would recognize transacted groups", async () => {
      const grpRels = grps.map((grp: iGroup, index: number) =>
        createGrpRelObj(grp, grp.grp_name, index)
      );
      await txCacheGroupSet(grpRels, userId);
      const i = await RedisMethods.client.ft.info(grpSetName);
      expect(parseInt(i.numDocs)).toEqual(grps.length);
    }, 15000);

    test("if fx would recognize emptied index after cache deletion", async () => {
      const tx = RedisMethods.client.multi();
      let itemKey!: string;
      let grp: iGroup;
      for (grp of grps) {
        itemKey = RedisMethods.grpSetItemName(userId, grp.grp_id);
        tx.json.del(itemKey);
      }
      await tx.exec();

      const i = await RedisMethods.client.ft.info(grpSetName);
      expect(parseInt(i.numDocs)).toEqual(0);
    }, 15000);
  });

  afterAll(async () => {
    await RedisMethods.client.flushAll();
    await MongoDBMethods.flush();
    await RedisMethods.disconnect();
    await MongoDBMethods.disconnect();

    process.env = OLD_ENV;
  });
});

describe("Post Groups Sub Fxs", () => {
  const OLV_ENV = process.env;
  const userId = "sampleuserId";
  const grps = makeGroupObj();
  const mainGrpSample = grps[0];

  function makeGroupObj(i = 5): iGroup[] {
    const groups: iGroup[] = [];

    let n = 0;
    while (n < i) {
      groups.push({
        grp_id: `sampleGrpId${n}`,
        grp_name: `sampleGrpName${n}`,
        chat_id: `sampleChatId${n}`,
        security: `sampleSecurityId${n}`,
        relations: `sampleRelationsId${n}`,
        requests: `sampleRequestsId${n}`,
      });
      n++;
    }

    return groups;
  }

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";
    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Validate New Group Inputs Fx", () => {
    beforeAll(async () => {
      await MongoDBMethods.flush();
      await RedisMethods.client.flushAll();
    });

    test("if fx would recognize valid inputs", () => {
      const vI: iNewGrpBody = {
        recipientId: "samplerecipientId",
        grpName: "samplegrpName",
      };

      const v = validateNewGrp(vI, userId);
      expect(v).toBeUndefined();
    });
    test("if fx would recognize invalid inputs", () => {
      const ivI: iNewGrpBody = {
        recipientId: "",
        grpName: "",
      };

      const v = validateNewGrp(ivI, userId);
      expect(v).toBeInstanceOf(APIError || Error);
    });
  });

  describe("Same Cache Group Name Error Fx", () => {
    beforeAll(async () => {
      await MongoDBMethods.flush();
      await RedisMethods.client.flushAll();
      await RedisMethods.createIndexes();
    });

    test("if fx would return error from empty cache index", async () => {
      const v = await sameCacheGrpNameErr(mainGrpSample.grp_name);
      expect(v).toBeUndefined();
    });

    test("if fx would return undefined upon finding cache match", async () => {
      const tx = RedisMethods.client.multi();
      let grpKey: string;

      grps.forEach(async (grp: iGroup) => {
        grpKey = RedisMethods.grpItemName(grp.grp_id);
        tx.json.set(grpKey, "$", RedisMethods.redifyObj(grp));
      });
      tx.exec();

      const v = await sameCacheGrpNameErr(mainGrpSample.grp_name);
      expect(v).toBeInstanceOf(APIError || Error);
    }, 15000);

    test("if fx would return undefined after deleting matching cache", async () => {
      await RedisMethods.client.json.del(
        RedisMethods.grpItemName(mainGrpSample.grp_id)
      );
      const v = await sameCacheGrpNameErr(mainGrpSample.grp_name);
      expect(v).toBeUndefined();
    });
  });

  describe("Same Doc Group Name Err Fx", () => {
    test("if fx would return undefined since collection is empty", async () => {
      const v = await sameDbGrpNameErr(mainGrpSample.grp_name);
      expect(v).toBeUndefined();
    });

    test("if fx would return an error after finding matching doc", async () => {
      await TestUtil.createSampleGroupDoc(grps);

      await Group.findOne({
        grp_name: mainGrpSample.grp_name,
      } as iGroup).lean();
      const v = await sameDbGrpNameErr(mainGrpSample.grp_name);
      expect(v).toBeInstanceOf(APIError || Error);
    }, 15000);

    test("if fx would return undefined after deleting amtching document", async () => {
      await Group.deleteMany({});
      const g = await Group.findOne({
        grp_id: mainGrpSample.grp_id,
      } as iGroup).lean();
      const v = await sameDbGrpNameErr(mainGrpSample.grp_name);
      expect(v).toBeUndefined();
    }, 15000);
  });

  describe("Retrieve User Bump Fx", () => {
    let u: iUser | APIError | Error;
    let tx: any;
    beforeAll(async () => {
      u = await UserMethods.createUser(userId, user.act_name, userSH, "local");
      tx = RedisMethods.client.multi();
    });

    test("if fx would return an error after finding no relation match", async () => {
      const b = await getIncrDBUserHBump(userId, (u as iUser).relations, tx);
      expect(b).toEqual(1);
    });

    test("if fx would retrieve user hBump", async () => {
      await TestUtil.createSampleGroupRelDoc(
        userId,
        (u as iUser).relations,
        grps
      );
      await TestUtil.createSampleUserRelDoc(
        userId,
        (u as iUser).relations,
        users
      );
      const b = await getIncrDBUserHBump(userId, (u as iUser).relations, tx);
      expect(typeof b).toEqual("number");
    });

    test("if fx would return an error after deleting relation match", async () => {
      await GenRelations.deleteMany({});
      const b = await getIncrDBUserHBump(userId, (u as iUser).relations, tx);
      expect(b).toBeInstanceOf(APIError || Error);
    });
  });

  afterAll(async () => {
    await MongoDBMethods.flush();
    await RedisMethods.client.flushAll();
    await MongoDBMethods.disconnect();
    await RedisMethods.disconnect();

    process.env = OLV_ENV;
  });
});
