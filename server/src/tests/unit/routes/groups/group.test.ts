import "dotenv/config";

import { iUser } from "../../../../models/user.imodel";
import { Group } from "../../../../models/group.model";
import { APIError } from "../../../../global/httpErrors.global";
import { TestUtil } from "../../../misc/util";
import { UserMethods } from "../../../../data/user.data";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { GenRelations } from "../../../../models/gen.model";
import { iGenSecuritySH } from "../../../../models/gen.imodel";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { iGroup, iNewGrpBody } from "../../../../models/group.imodel";
import {
  getCacheGroupRels,
  getGroupRelDocs,
  txCacheGroupSet,
  validateNewGrp,
  sameCacheGrpNameErr,
  sameDbGrpNameErr,
  getDBUserHBump,
  createGrpRelObj,
  updateUserDbRelations,
  updateUserCacheRelations,
} from "../../../../routes/group/group.controller";

const OLD_ENV = process.env;
const userId = "sampleUserId";
const user: iUser | any = {
  act_id: {
    accnt_id: userId,
    accnt_type: "local",
  },
  act_name: "sampleaUserName",
};
const password = "samplePassword";
const userSH: iGenSecuritySH = UserMethods.generateHash(password);
const grps = TestUtil.createSampleGroup();
const users = TestUtil.createSampleUser();

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
      const gs = await getCacheGroupRels(userId);
      expect(gs).toBeUndefined();
    });

    test("if fx would return group relation array", async () => {
      await TestUtil.createSampleGroupRelCache(userId, grps);
      await TestUtil.createSampleUsersRelCache(userId, users);
      // const i = await RedisMethods.client.ft.info(
      //   RedisMethods.relationSetName(userId)
      // );
      const gs = await getCacheGroupRels(userId);
      expect(Array.isArray(gs)).toEqual(true);
      expect((gs as []).length).toEqual(5);
    }, 15000);

    test("if fx would return a void since the cache are deleted", async () => {
      let cacheKey: string;
      grps.forEach((grp: iGroup) => {
        cacheKey = RedisMethods.relationSetItemName(userId, grp.grp_id);
        RedisMethods.client.json.del(cacheKey);
      });

      const rg = await getCacheGroupRels(userId);
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
      expect((gd as []).length).toBe(0);
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

      const r = await GenRelations.findOne({
        str_id: (u as iUser).relations,
      }).lean();
      r?.relations.list;

      const gd = await getGroupRelDocs((u as iUser).relations);
      expect((gd as []).length).toEqual(5);
    }, 15000);

    test("if fx would return an empty array since the documents are deleted", async () => {
      await GenRelations.updateOne(
        {
          str_id: (u as iUser).relations,
        },
        {
          $pull: {
            ["relations.list"]: {
              type: "group",
            },
          },
        }
      );

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
      let grpKey: string;

      grps.forEach(async (grp: iGroup) => {
        grpKey = RedisMethods.grpItemName(grp.grp_id);
        await RedisMethods.client.json.set(
          grpKey,
          "$",
          RedisMethods.redifyObj(grp)
        );
      });

      const v = await sameCacheGrpNameErr(mainGrpSample.grp_name);
      expect(v).toBeInstanceOf(APIError || Error);
    });

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
      let grp: iGroup;
      for (grp of grps) {
        await Group.create(grp);
      }
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
      const b = await getDBUserHBump(userId, (u as iUser).relations, tx);
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
      const b = await getDBUserHBump(userId, (u as iUser).relations, tx);
      expect(typeof b).toEqual("number");
    });

    test("if fx would return an error after deleting relation match", async () => {
      await GenRelations.deleteMany({});
      const b = await getDBUserHBump(userId, (u as iUser).relations, tx);
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
