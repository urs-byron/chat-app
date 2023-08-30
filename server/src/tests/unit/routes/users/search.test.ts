import "dotenv/config";

import { User } from "../../../../models/user.model";
import { Group } from "../../../../models/group.model";
import { TestUtil } from "../../../misc/util";
import { APIError } from "../../../../global/httpErrors.global";
import { UserMethods } from "../../../../data/user.data";
import { GroupMethods } from "../../../../data/group.data";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { iUser, iUserDoc } from "../../../../models/user.imodel";
import { iGroup, iGroupDoc } from "../../../../models/group.imodel";
import {
  configSearch,
  createSearchFilter,
  filterNonPublic,
  searchDbUserGroup,
} from "../../../../routes/user/search.controller";
import { GeneralUtil } from "../../../../util/misc.util";
import { searchSkipCnt } from "../../../../global/search.global";

describe("Search User Sub Fxs", () => {
  const OLD_ENV = process.env;

  // TEST VARIABLES
  const t0 = configSearch(0);
  const t1 = configSearch(1);
  const usrs = TestUtil.createSampleUser();
  const grps = TestUtil.createSampleGroup();
  const tUsr = usrs[2];
  const tGrp = grps[2];
  const { skip: searchSkip, limit: searchLimit } =
    GeneralUtil.getMongoSkipLimit(0, searchSkipCnt);

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Search Filter Obj Assignment Fx", () => {
    test("if fx would return expected obj for type 0", () => {
      const v1 = configSearch(0);
      expect(v1).toStrictEqual({
        model: User,
        id: "act_id.accnt_id",
        name: "act_name",
        fields: {
          _id: 0,
          "act_id.accnt_id": 1,
          act_name: 1,
          security: 1,
        },
      });
    });

    test("if fx would return expected obj for type 1", () => {
      const v2 = configSearch(1);
      expect(v2).toStrictEqual({
        model: Group,
        id: "grp_id",
        name: "grp_name",
        fields: {
          _id: 0,
          grp_id: 1,
          grp_name: 1,
          security: 1,
        },
      });
    });
  });

  describe("User | Group Doc Search Fx", () => {
    let initUserSearchFilter!: any;
    let initGroupSearchFilter!: any;

    beforeAll(() => {
      initUserSearchFilter = createSearchFilter(
        tUsr.act_id.accnt_id,
        usrs[0].act_name,
        t0.id,
        t0.name
      );
      initGroupSearchFilter = createSearchFilter(
        tUsr.act_id.accnt_id,
        grps[0].grp_name,
        t1.id,
        t1.name
      );
    });

    test("if fx would return empty arrays", async () => {
      const e1 = await searchDbUserGroup(
        initUserSearchFilter,
        searchSkip,
        searchSkipCnt,
        t0.model,
        t0.fields
      );
      const e2 = await searchDbUserGroup(
        initGroupSearchFilter,
        searchSkip,
        searchSkipCnt,
        t1.model,
        t1.fields
      );

      expect((e1 as iUser[]).length).toEqual(0);
      expect((e2 as iUser[]).length).toEqual(0);
    });

    test("if fx would return matching user(s) | group(s)", async () => {
      await TestUtil.createSampleUserDoc(usrs);
      await TestUtil.createSampleGroupDoc(grps);

      const a1 = await searchDbUserGroup(
        initUserSearchFilter,
        searchSkip,
        searchSkipCnt,
        t0.model,
        t0.fields
      );

      expect((a1 as iUser[])[0].act_name).toEqual(usrs[0].act_name);

      const pattern_6 = createSearchFilter(
        tUsr.act_id.accnt_id,
        "6",
        t0.id,
        t0.name
      );
      const a21 = await searchDbUserGroup(
        pattern_6,
        searchSkip,
        searchSkipCnt,
        t0.model,
        t0.fields
      );

      expect((a21 as iUser[]).length).toEqual(1);

      const pattern_sample = createSearchFilter(
        tUsr.act_id.accnt_id,
        "sample",
        t0.id,
        t0.name
      );
      const a2 = await searchDbUserGroup(
        pattern_sample,
        searchSkip,
        searchLimit,
        t0.model,
        t0.fields
      );

      expect((a2 as iUser[]).length).toEqual(usrs.length - 1);

      const pattern_grp_name = createSearchFilter(
        tGrp.grp_id,
        grps[0].grp_name,
        t1.id,
        t1.name
      );
      const a3 = await searchDbUserGroup(
        pattern_grp_name,
        searchSkip,
        searchLimit,
        t1.model,
        t1.fields
      );

      expect((a3 as iGroup[])[0].grp_name).toEqual(grps[0].grp_name);

      const pattern_1 = createSearchFilter(tGrp.grp_id, "1", t1.id, t1.name);
      const a41 = await searchDbUserGroup(
        pattern_1,
        searchSkip,
        searchLimit,
        t1.model,
        t1.fields
      );

      expect((a41 as iGroup[]).length).toEqual(1);

      const pattern_grp = createSearchFilter(
        tGrp.grp_id,
        "grp",
        t1.id,
        t1.name
      );
      const a4 = await searchDbUserGroup(
        pattern_grp,
        searchSkip,
        searchLimit,
        t1.model,
        t1.fields
      );

      expect((a4 as iGroup[]).length).toEqual(grps.length - 1);
    }, 15000);
  });

  describe("User | Group Array Transform Fx", () => {
    test("if fx would return error since no account actually exist", async () => {
      const pattern_sample = createSearchFilter(
        tUsr.act_id.accnt_id,
        "sample",
        t0.id,
        t0.name
      );
      const aggUsrs = await searchDbUserGroup(
        pattern_sample,
        searchSkip,
        searchSkipCnt,
        t0.model,
        t0.fields
      );

      const filUsrs = await filterNonPublic(aggUsrs as iUserDoc[], 0);
      expect(filUsrs).toBeInstanceOf(APIError || Error);

      await User.deleteMany({});
      await Group.deleteMany({});
    }, 30000);

    test("if fx would return transformed user | group array", async () => {
      let usr: iUser;
      let grp: iGroup;

      for (usr of usrs) {
        await UserMethods.createUser(
          usr.act_id.accnt_id,
          usr.act_name,
          null,
          "local"
        );
      }
      for (grp of grps) {
        await GroupMethods.createGroup(
          { accnt_id: tUsr.act_id.accnt_id, accnt_name: tUsr.act_name },
          grp.grp_name
        );
      }

      const pattern_sample = createSearchFilter(
        tUsr.act_id.accnt_id,
        "sample",
        t0.id,
        t0.name
      );
      const aggUsrs = await searchDbUserGroup(
        pattern_sample,
        searchSkip,
        searchSkipCnt,
        t0.model,
        t0.fields
      );

      const filUsrs = await filterNonPublic(aggUsrs as iUserDoc[], 0);

      expect((filUsrs as any[]).length).toEqual((aggUsrs as iUser[]).length);

      const pattern_grp = createSearchFilter(
        tUsr.act_id.accnt_id,
        "grp",
        t1.id,
        t1.name
      );
      const aggGrps = await searchDbUserGroup(
        pattern_grp,
        searchSkip,
        searchSkipCnt,
        t1.model,
        t1.fields
      );

      const filGrps = await filterNonPublic(aggGrps as iGroupDoc[], 1);

      expect((filGrps as any[]).length).toEqual((aggGrps as iUser[]).length);
    }, 30000);

    test("if fx would return error after using wrong security id", async () => {
      const pattern_sample = createSearchFilter(
        tUsr.act_id.accnt_id,
        "sample",
        t0.id,
        t0.name
      );
      const aggUsrs = await searchDbUserGroup(
        pattern_sample,
        searchSkip,
        searchLimit,
        t0.model,
        t0.fields
      );

      (aggUsrs as any[])[0].security = "pseudoSecId";

      const pattern_sample2 = createSearchFilter(
        tUsr.act_id.accnt_id,
        "sample",
        t1.id,
        t1.name
      );
      const filUsrs = await filterNonPublic(aggUsrs as iUserDoc[], 0);
      expect(filUsrs).toBeInstanceOf(APIError || Error);

      const aggGrps = await searchDbUserGroup(
        [pattern_sample2],
        searchSkip,
        searchLimit,
        t1.model,
        t1.fields
      );

      (aggUsrs as any[])[0].security = "pseudoSecId";
      const filGrps = await filterNonPublic(aggUsrs as iUserDoc[], 0);
      expect(filGrps).toBeInstanceOf(APIError || Error);
    }, 30000);
  });

  afterAll(async () => {
    await MongoDBMethods.flush();
    await RedisMethods.client.flushAll();
    await MongoDBMethods.disconnect();
    await RedisMethods.disconnect();

    process.env = OLD_ENV;
  }, 15000);
});
