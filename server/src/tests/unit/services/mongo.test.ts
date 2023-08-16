import "dotenv/config";

import { User } from "../../../models/user.model";
import { iUser } from "../../../models/user.imodel";
import { MongoDBMethods } from "../../../services/mongo.srvcs";
import {
  GenRelations,
  GenRequests,
  GenSecurity,
} from "../../../models/gen.model";
import {
  iGenRelations,
  iGenRelationsDoc,
  iGenRequest,
  iGenRequests,
  iGenRequestsDoc,
  iGenSecurity,
  iGenSecurityDoc,
} from "../../../models/gen.imodel";

describe("MongoDB Service", () => {
  const OLD_ENV = process.env;

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";
    MongoDBMethods.init();
    await MongoDBMethods.connect();
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = OLD_ENV;
  });

  describe("Instantiation", () => {
    test("if instantiations would yield the same class", () => {
      expect(MongoDBMethods.init()).toStrictEqual(MongoDBMethods.init());
    });
  });

  describe("Schemas", () => {
    test("User", async () => {
      const user: iUser = {
        act_id: { accnt_type: "local", accnt_id: "id" },
        act_name: "name",
        security: "secStr",
        requests: "reqStr",
        relations: "relStr",
      };

      await User.create(user);

      const u = (await User.findOne({
        "act_id.accnt_id": "id",
      }).lean()) as iUser;
      expect(u.act_id.accnt_id).toEqual(user.act_id.accnt_id);
      expect(u.act_id.accnt_type).toEqual(user.act_id.accnt_type);
      expect(u.act_name).toEqual(user.act_name);
      expect(u.security).toEqual(user.security);
      expect(u.requests).toEqual(user.requests);
      expect(u.relations).toEqual(user.relations);

      const new_name: string = "newName";
      const up = await User.updateOne(
        {
          act_name: user.act_name,
        } as iUser,
        {
          act_name: new_name,
        } as iUser
      );

      const n = (await User.findOne({
        "act_id.accnt_id": "id",
      }).lean()) as iUser;
      expect(up.matchedCount).toEqual(1);
      expect(up.modifiedCount).toEqual(1);
      expect(n.act_name).toEqual(new_name);
    });

    test("Security", async () => {
      const sec: iGenSecurity = {
        str_id: "secId",
        security: {
          salt: "saltComb",
          hash: "hashCom",
        },
        privacy: {
          public: true,
          availability: false,
        },
      };

      await GenSecurity.create(sec);
      const s: iGenSecurityDoc | null = await GenSecurity.findOne({
        str_id: sec.str_id,
      } as iGenSecurity).lean();

      expect(s!.str_id).toEqual(sec.str_id);
      expect(s!.security?.salt).toEqual(sec.security?.salt);
      expect(s!.security?.hash).toEqual(sec.security?.hash);
      expect(s!.privacy.public).toEqual(sec.privacy.public);
      expect(s!.privacy.availability).toEqual(sec.privacy.availability);

      const nsalt: string = "saltCombv2";
      const up = await GenSecurity.updateOne({ "security.salt": nsalt });

      expect(up.matchedCount).toEqual(1);
      expect(up.modifiedCount).toEqual(1);

      const sup: iGenSecurityDoc | null = await GenSecurity.findOne({
        str_id: sec.str_id,
      } as iGenSecurity).lean();

      expect(sup?.security?.salt).toEqual(nsalt);
    });

    test("Requests", async () => {
      const req: iGenRequest = {
        accnt_id: "accntId",
        accnt_name: "accntName",
        isGroup: false,
        status: "pending",
      };

      const reqs: iGenRequests = {
        str_id: "reqId",
        requests: {
          invitations: {
            incoming: [req],
            outgoing: [req],
          },
          memberships: {
            incoming: [req],
            outgoing: [req],
          },
        },
      };

      await GenRequests.create<iGenRequests>(reqs);
      const r: iGenRequestsDoc | null = await GenRequests.findOne({
        str_id: reqs.str_id,
      } as iGenRequests).lean();

      expect(r?.str_id).toBe(reqs.str_id);
      delete (r?.requests?.invitations.incoming[0] as any)._id;
      expect(r?.requests?.invitations.incoming[0]).toStrictEqual(req);
      delete (r?.requests?.invitations.outgoing[0] as any)._id;
      expect(r?.requests?.invitations.outgoing[0]).toStrictEqual(req);
      delete (r?.requests?.memberships.incoming[0] as any)._id;
      expect(r?.requests?.memberships.incoming[0]).toStrictEqual(req);
      delete (r?.requests?.memberships.outgoing[0] as any)._id;
      expect(r?.requests?.memberships.outgoing[0]).toStrictEqual(req);
    });

    test("Relations", async () => {
      const rel: iGenRelations = {
        str_id: "relId",
        relations: {
          list: [
            {
              accnt_id: "accntId",
              accnt_name: "accntName",
              type: "user",
              chat_id: "chatId",
              admin: false,
              block: false,
              mute: false,
              archive: false,
              bump: 0,
            },
          ],
          hBump: 0,
        },
      };

      await GenRelations.create(rel);
      const r = (await GenRelations.findOne({
        str_id: "relId",
      }).lean()) as iGenRelationsDoc;
      delete (r as any)._id;
      delete (r as any).__v;
      delete (r.relations.list[0] as any)._id;
      delete (r.relations.list[0] as any).__v;

      expect(r).toStrictEqual(rel);
    });

    // further schema testing would be unneccesary since basic method query, update, and options can be checked with TS
    // complication can arise from aggregation and Array typed properties
    // further unit testing is suggested instead
  });

  afterAll(async () => {
    process.env = OLD_ENV;
    await MongoDBMethods.flush();
    await MongoDBMethods.disconnect();
  });
});
