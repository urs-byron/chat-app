import "dotenv/config";

import { iUser } from "../../../../models/user.imodel";
import { Group } from "../../../../models/group.model";
import { iGroup } from "../../../../models/group.imodel";
import { TestUtil } from "../../../misc/util";
import { APIError } from "../../../../global/httpErrors.global";
import { relSkipCnt } from "../../../../global/search.global";
import { UserMethods } from "../../../../data/user.data";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { updateUserDbRelations } from "../../../../routes/group/group.controller";
import { GenRelations, contactType } from "../../../../models/gen.model";
import {
  iRelation,
  iRelationAct,
  iGenRelations,
} from "../../../../models/gen.imodel";
import {
  cacheRels,
  getDocRels,
  getDbGroup,
  getCacheRels,
  validatePatchRel,
  checkRelSetCache,
  assignRelationsId,
  validateContactType,
  updateDbUserRelations,
  updateUserRelationCache,
} from "../../../../routes/relations/relations.controller";

describe("Get Relations Sub Fxs", () => {
  const OLD_ENV = process.env;
  const user: iUser = {
    act_id: {
      accnt_id: "sampleAccntId",
      accnt_type: "local",
    },
    act_name: "sampleActName",
    security: "sampleSecurityId",
    relations: "sampleRelationsId",
    requests: "sampleRequestsId",
  };
  let grps = TestUtil.createSampleGroup();
  let sGrp = grps[0];

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    RedisMethods.init();
    MongoDBMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Data Validation Fx", () => {
    test("if fx would recognize valid input patterns", () => {
      const v1 = validateContactType({
        chatType: "user",
        contactType: "contact",
        groupId: null,
        skip: 0,
      });
      const v2 = validateContactType({
        chatType: "group",
        contactType: "contact",
        groupId: "sampleGroupId",
        skip: 0,
      });

      expect(v1).toBeUndefined();
      expect(v2).toBeUndefined();

      // further input combination is not tested and laid off to TS
    });

    test("if fx would recognize invalid input patterns", () => {
      const iV1 = validateContactType({
        chatType: "user",
        contactType: "contact",
        groupId: "invalidGroupId",
        skip: 0,
      });
      const iV2 = validateContactType({
        chatType: "group",
        contactType: "contact",
        groupId: null,
        skip: 0,
      });
      expect(iV1).toBeInstanceOf(APIError || Error);
      expect(iV2).toBeInstanceOf(APIError || Error);
    });
  });

  describe("Group Retreiving Fx", () => {
    test("if fx would return an error since collection is empty", async () => {
      const g = await getDbGroup(sGrp.grp_id);
      expect(g).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return undefined from finding matching doc", async () => {
      await TestUtil.createSampleGroupDoc(grps);
      const g = await getDbGroup(sGrp.grp_id);

      expect("grp_id" in g).toBe(true);
    }, 15000);

    test("if fx would return error since collection is emptied", async () => {
      await Group.deleteMany({});
      const g = await getDbGroup(sGrp.grp_id);
      expect(g).toBeInstanceOf(APIError || Error);
    }, 15000);
  });

  describe("RelationsId Assigning Fx", () => {
    test("if fx with user chat type would return user relations Id", async () => {
      const r = await assignRelationsId("user", sGrp.grp_id, user);
      expect(r).toEqual(user.relations);
    });

    test("if fx with group chat type would return error from empty collection", async () => {
      const r = await assignRelationsId("group", sGrp.grp_id, user);
      expect(r).toBeInstanceOf(APIError || Error);
    }, 15000);

    test("if fx with group chat type would return group relations Id", async () => {
      await TestUtil.createSampleGroupDoc(grps);
      const r = await assignRelationsId("group", sGrp.grp_id, user);
      expect(r).toEqual(sGrp.relations);
    }, 15000);

    test("if fx with group chat type would return error for not matching any doc", async () => {
      const r = await assignRelationsId("group", sGrp.grp_id.concat("r"), user);
      expect(r).toBeInstanceOf(APIError || Error);
    }, 15000);

    test("if fx with group chat type would return error after deleting collection", async () => {
      await Group.deleteMany({});
      const r = await assignRelationsId("group", sGrp.grp_id, user);
      expect(r).toBeInstanceOf(APIError || Error);
    }, 15000);

    // further input combination validation is omitted & laid off to TS
  });

  describe("User Relation Cache Index Info Retrieval Fx", () => {
    beforeAll(async () => {
      await RedisMethods.createRelationIndex(user.act_id.accnt_id);
    });

    test("if fx would return 0 since index is empty", async () => {
      const i = await checkRelSetCache(user.act_id.accnt_id);
      expect(i).toEqual(0);
    });

    test(`if fx would return ${grps.length} after filling cache index`, async () => {
      await TestUtil.createSampleGroupRelCache(user.act_id.accnt_id, grps);
      const i = await checkRelSetCache(user.act_id.accnt_id);
      expect(i).toEqual(grps.length);
    }, 15000);

    test("if fx would return 0 after deleting index cache", async () => {
      const tx = RedisMethods.client.multi();
      let relKey: string;
      grps.forEach(async (grp: iGroup) => {
        relKey = RedisMethods.relationSetItemName(
          user.act_id.accnt_id,
          grp.grp_id
        );
        tx.json.del(relKey);
      });
      await tx.exec();

      const i = await checkRelSetCache(user.act_id.accnt_id);
      expect(i).toStrictEqual(0);
    }, 15000);

    afterAll(async () => {
      await RedisMethods.client.flushAll();
    });
  });

  describe("Relation Cache Index Retrieval Fx", () => {
    beforeAll(async () => {
      await RedisMethods.createRelationIndex(user.act_id.accnt_id);
    });

    test("if fx would return empty array", async () => {
      const ac = await getCacheRels(
        user.act_id.accnt_id,
        contactType.contact,
        0,
        100
      );
      const am = await getCacheRels(
        user.act_id.accnt_id,
        contactType.mute,
        0,
        100
      );
      const ab = await getCacheRels(
        user.act_id.accnt_id,
        contactType.block,
        0,
        100
      );

      expect((ac as iRelation[]).length).toEqual(0);
      expect((am as iRelation[]).length).toEqual(0);
      expect((ab as iRelation[]).length).toEqual(0);
    }, 15000);

    test("if fx would return same values after filling index w/ diff caches", async () => {
      const tx = RedisMethods.client.multi();
      const rels = TestUtil.createDiffConRel();
      let rel: iRelation;
      let relKey: string;
      for (rel of rels) {
        relKey = RedisMethods.relationSetItemName(
          user.act_id.accnt_id,
          rel.accnt_id
        );

        tx.json.set(relKey, "$", RedisMethods.redifyObj(rel));
      }
      await tx.exec();

      const ac = await getCacheRels(
        user.act_id.accnt_id,
        contactType.contact,
        0,
        relSkipCnt
      );
      const am = await getCacheRels(
        user.act_id.accnt_id,
        contactType.mute,
        0,
        relSkipCnt
      );
      const ab = await getCacheRels(
        user.act_id.accnt_id,
        contactType.block,
        0,
        relSkipCnt
      );

      expect((ac as iRelation[]).length).toEqual(rels.length);
      expect((am as iRelation[]).length).toEqual(rels.length);
      expect((ab as iRelation[]).length).toEqual(rels.length);
    }, 15000);

    test("if fx would return empty array after deleting index caches", async () => {
      const tx = RedisMethods.client.multi();
      let rel: iRelation;
      let relKey: string;
      for (rel of TestUtil.createDiffConRel()) {
        relKey = RedisMethods.relationSetItemName(
          user.act_id.accnt_id,
          rel.accnt_id
        );
        tx.json.del(relKey);
      }
      await tx.exec();

      const ac = await getCacheRels(
        user.act_id.accnt_id,
        contactType.contact,
        0,
        100
      );
      const am = await getCacheRels(
        user.act_id.accnt_id,
        contactType.mute,
        0,
        100
      );
      const ab = await getCacheRels(
        user.act_id.accnt_id,
        contactType.block,
        0,
        100
      );

      expect((ac as iRelation[]).length).toEqual(0);
      expect((am as iRelation[]).length).toEqual(0);
      expect((ab as iRelation[]).length).toEqual(0);
    });
  });

  /** PROBLEM */
  describe("Relation Doc Retrieval Fx", () => {
    let u: iUser | APIError | Error;
    const userPass = "samplePassword";
    let userSH = UserMethods.generateHash(userPass);

    beforeAll(async () => {
      u = await UserMethods.createUser(null, user.act_name, userSH, "local");
    });

    test("if fx would return an empty array", async () => {
      const c = await getDocRels((u as iUser).relations, "contact", 0, 100);
      const m = await getDocRels((u as iUser).relations, "mute", 0, 100);
      const b = await getDocRels((u as iUser).relations, "block", 0, 100);

      expect((c as iRelation[]).length).toEqual(0);
      expect((m as iRelation[]).length).toEqual(0);
      expect((b as iRelation[]).length).toEqual(0);
    });

    test("if fx would return same lengths after filling database w/ diff docs", async () => {
      const rels = TestUtil.createDiffConRel(2, 2, 2);
      let rel: iRelation;
      let i: number = 0;
      const tx = RedisMethods.client.multi();

      for (rel of rels) {
        await updateUserDbRelations(
          user.act_id.accnt_id,
          (u as iUser).relations,
          i,
          rel,
          tx
        );
        i++;
      }

      const c = await getDocRels(
        (u as iUser).relations,
        "contact",
        0,
        relSkipCnt
      );
      const m = await getDocRels((u as iUser).relations, "mute", 0, relSkipCnt);
      const b = await getDocRels(
        (u as iUser).relations,
        "block",
        0,
        relSkipCnt
      );

      expect((c as iRelation[]).length).toEqual(rels.length);
      expect((m as iRelation[]).length).toEqual(rels.length);
      expect((b as iRelation[]).length).toEqual(rels.length);
    }, 15000);

    test("if fx would return empty arrays after deleting user relation docs", async () => {
      await GenRelations.updateOne(
        {
          str_id: (u as iUser).relations,
        } as iGenRelations,
        {
          $pull: {
            ["relations.list"]: {
              block: true,
            } as iRelation,
          },
        }
      );

      let c = await getDocRels(
        (u as iUser).relations,
        "contact",
        0,
        relSkipCnt
      );

      expect((c as iRelation[]).length).toEqual(4);

      await GenRelations.updateOne(
        {
          str_id: (u as iUser).relations,
        } as iGenRelations,
        {
          $pull: {
            ["relations.list"]: {
              mute: true,
            } as iRelation,
          },
        }
      );

      let m = await getDocRels((u as iUser).relations, "mute", 0, relSkipCnt);
      m = await getDocRels((u as iUser).relations, "block", 0, relSkipCnt);

      expect((m as iRelation[]).length).toEqual(2);

      await GenRelations.updateOne(
        {
          str_id: (u as iUser).relations,
        } as iGenRelations,
        {
          $pull: {
            ["relations.list"]: {} as iRelation,
          },
        }
      );

      let b = await getDocRels((u as iUser).relations, "block", 0, relSkipCnt);

      expect((b as iRelation[]).length).toEqual(0);
    }, 15000);
  });

  describe("Cache Relation Array Fx", () => {
    const users = TestUtil.createSampleUser();
    const grps = TestUtil.createSampleGroup();

    beforeAll(async () => {
      await RedisMethods.createRelationIndex(user.act_id.accnt_id);
    });

    test("if fx would return void upon passing empty | proper relation array", async () => {
      const c1 = await cacheRels(user.act_id.accnt_id, []);
      expect(c1).toBeUndefined();

      const i1 = await RedisMethods.client.ft.info(
        RedisMethods.relationSetName(user.act_id.accnt_id)
      );
      expect(parseInt(i1.numDocs)).toEqual(0);

      const relTypeCount = 3;
      await cacheRels(
        user.act_id.accnt_id,
        TestUtil.createDiffConRel(relTypeCount, relTypeCount, relTypeCount)
      );
      const i2 = await RedisMethods.client.ft.info(
        RedisMethods.relationSetName(user.act_id.accnt_id)
      );
      expect(parseInt(i2.numDocs)).toEqual(relTypeCount * 3);
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

describe("Patch Relation Sub Fxs", () => {
  const OLD_ENV = process.env;
  const user: iUser = {
    act_id: {
      accnt_id: "sampleAccntId",
      accnt_type: "local",
    },
    act_name: "sampleActName",
    security: "sampleSecurityId",
    relations: "sampleRelationsId",
    requests: "sampleRequestsId",
  };
  const userPass = "samplePassword";
  const userSH = UserMethods.generateHash(userPass);
  let rels: iRelation[];
  let recipientRel: iRelation;
  let validRelAct: iRelationAct;

  beforeAll(async () => {
    rels = TestUtil.createDiffConRel(2, 2, 2);
    recipientRel = rels[0];
    validRelAct = {
      recipientId: recipientRel.accnt_id,
      userAction: "mute",
      actionValue: true,
    };

    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Patch Relation Validation Fx", () => {
    test("if fx would return undefined from valid inputs", () => {
      const v1 = validatePatchRel(validRelAct);
      expect(v1).toBeUndefined();
    });

    test("if fx would return error from invalid inputs", () => {
      validRelAct.recipientId = "";
      const v1 = validatePatchRel(validRelAct);
      expect(v1).toBeInstanceOf(APIError || Error);
    });

    // further input combination is omitted and laid off to TS
  });

  describe("User Relation Doc Update Fx", () => {
    let u: iUser | APIError | Error;

    beforeAll(async () => {
      validRelAct.recipientId = recipientRel.accnt_id;
      u = await UserMethods.createUser(
        user.act_id.accnt_id,
        user.act_name,
        userSH,
        "local"
      );
    });

    test("if fx would return error upon finding no match from empty collection", async () => {
      const r = await updateDbUserRelations(recipientRel.accnt_id, validRelAct);
      expect(r).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return error upon finding match from filled collection", async () => {
      let rel: iRelation;
      let i: number = 0;
      for (rel of rels) {
        await updateUserDbRelations(
          user.act_id.accnt_id,
          (u as iUser).relations,
          i,
          rel,
          RedisMethods.client.multi()
        );
        i++;
      }

      const r = await updateDbUserRelations(
        (u as iUser).relations,
        validRelAct
      );
      expect(r).toBeUndefined();
    });

    test("if fx would return an error upon using wrong recipientId", async () => {
      validRelAct.recipientId = validRelAct.recipientId.concat("12");
      const r = await updateDbUserRelations(
        (u as iUser).relations,
        validRelAct
      );
      expect(r).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return an error upon updating relation with prev argument", async () => {
      validRelAct.recipientId = recipientRel.accnt_id;

      const r = await updateDbUserRelations(
        (u as iUser).relations,
        validRelAct
      );
      expect(r).toBeInstanceOf(APIError || Error);
    });
  });

  describe("User Relation Cache Update Fx", () => {
    beforeAll(async () => {
      validRelAct.recipientId = recipientRel.accnt_id;
      await RedisMethods.createRelationIndex(user.act_id.accnt_id);
    });

    test("if fx would return error after updating nonexisting cache", async () => {
      const cu1 = await updateUserRelationCache(
        user.act_id.accnt_id,
        validRelAct
      );
      expect(cu1).toBeInstanceOf(APIError || Error);
    });
    test("if fx would return void after updating cache", async () => {
      let cache = await RedisMethods.client.ft.search(
        RedisMethods.relationSetName(user.act_id.accnt_id),
        `@accnt_id:(${validRelAct.recipientId})`
      );

      expect(cache.total).toEqual(0);

      await RedisMethods.client.json.set(
        RedisMethods.relationSetItemName(
          user.act_id.accnt_id,
          validRelAct.recipientId
        ),
        "$",
        RedisMethods.redifyObj(recipientRel)
      );

      cache = await RedisMethods.client.ft.search(
        RedisMethods.relationSetName(user.act_id.accnt_id),
        `@accnt_id:(${validRelAct.recipientId})`
      );
      expect(cache.total).toEqual(1);

      const cu1 = await updateUserRelationCache(
        user.act_id.accnt_id,
        validRelAct
      );
      expect(cu1).toBeUndefined();
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
