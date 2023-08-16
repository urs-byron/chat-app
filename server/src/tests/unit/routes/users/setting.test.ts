import "dotenv/config";

import { iUser, iUserDoc } from "../../../../models/user.imodel";
import { APIError } from "../../../../global/httpErrors.global";
import { UserMethods } from "../../../../data/user.data";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { iUserPassword } from "../../../../global/validity.global";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import {
  iGenPrivacyProp,
  iGenPrivacyValue,
  iPrivacyRequest,
} from "../../../../models/gen.imodel";
import {
  validatePutPrivacy,
  updateDocPrivacy,
  updateCachePrivacy,
  validatePutSecurity,
  validateSamePasswordErr,
  updateUserPassword,
} from "../../../../routes/user/settings.controller";

describe("Update User Privacy Fxs", () => {
  const OLD_ENV = process.env;
  const sUsrId: string = "sampleUserId";
  const sUsrName: string = "sampleUserName";
  const sUsrPW: string = "sampleUserPW";
  let u: iUser | APIError | Error;

  function privData(
    property: iGenPrivacyProp,
    value: iGenPrivacyValue
  ): iPrivacyRequest {
    return {
      property,
      value,
    };
  }

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";
    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Pirvacy Inputs Validation Fx", () => {
    test("if fx would return undefined for valid arguments", () => {
      const v1 = validatePutPrivacy(
        privData("availability", "true"),
        "availability"
      );

      expect(v1).toBeUndefined();
    });

    test("if fx would return error for invalid argument", () => {
      const v2 = validatePutPrivacy(privData("availability", "true"), "public");

      expect(v2).toBeInstanceOf(APIError || Error);
    });
  });

  describe("Update Security Privacy Doc Fx", () => {
    beforeAll(async () => {
      u = await UserMethods.createUser(
        sUsrId,
        sUsrName,
        UserMethods.generateHash(sUsrPW),
        "local"
      );
    });

    test("if fx would return error from using setting-same argument", async () => {
      const v1 = await updateDocPrivacy(
        (u as iUser).security,
        privData("availability", "false")
      );

      expect(v1).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return undefined from using setting-different argument", async () => {
      const v1 = await updateDocPrivacy(
        (u as iUser).security,
        privData("availability", "true")
      );

      expect(v1).toBeUndefined();
    });
  });

  describe("Update Security Privacy Cache Fx", () => {
    beforeAll(async () => {
      await RedisMethods.createIndexes();
    });

    test("if fx would return error from updating non-existing cache", async () => {
      const c = await updateCachePrivacy(
        sUsrId,
        privData("availability", "true")
      );

      expect(c).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return undefined after successfully setting security cache", async () => {
      const usrSecCacheObj = {
        str_id: sUsrId,
        public: true,
        availability: false,
      };

      await RedisMethods.client.json.set(
        RedisMethods.securityItemName(sUsrId),
        "$",
        RedisMethods.redifyObj(usrSecCacheObj)
      );

      const up = await updateCachePrivacy(
        sUsrId,
        privData("availability", "true")
      );

      expect(up).toBeUndefined();

      await updateCachePrivacy(sUsrId, privData("public", "false"));
      await updateCachePrivacy(sUsrId, privData("availability", "true"));

      const c = await RedisMethods.client.ft.search(
        RedisMethods.securityIdxStr,
        `@str_id:(${sUsrId})`
      );

      expect(c.documents[0].value.public).toEqual(0);
      expect(c.documents[0].value.availability).toEqual(1);
    });
  });

  afterAll(async () => {
    process.env = OLD_ENV;
    await MongoDBMethods.flush();
    await RedisMethods.client.flushAll();
    await MongoDBMethods.disconnect();
    await RedisMethods.disconnect();
  });
});

describe("Update User Security Fxs", () => {
  const OLD_ENV = process.env;
  const sUsrId: string = "sampleUserId";
  const sUsrName: string = "sampleUserName";
  const sUsrPW: string = "sampleUserPW";
  const sUsrPWSet: iUserPassword = {
    password: sUsrPW,
    rePassword: sUsrPW,
  };
  const sUsrPWSetNew: iUserPassword = {
    password: sUsrPW + "add",
    rePassword: sUsrPW + "add",
  };
  const sUsrSH = UserMethods.generateHash(sUsrPW);
  let u: iUser | APIError | Error;

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Password Validation Fx", () => {
    test("if fx would return undefined from valid password input", () => {
      const v1 = validatePutSecurity({
        password: "Excaled@h02",
        rePassword: "Excaled@h02",
      });

      expect(v1).toBeUndefined();
    });

    test("if fx would return error from invalid password input", () => {
      const v2 = validatePutSecurity({
        password: "Excaledah02",
        rePassword: "excaled@h",
      });

      expect(v2).toBeInstanceOf(APIError || Error);
    });
  });

  describe("Same Password Err Fx", () => {
    beforeAll(async () => {
      u = await UserMethods.createUser(sUsrId, sUsrName, sUsrSH, "local");
    });

    test("if fx would return error from same password", async () => {
      const v3 = await validateSamePasswordErr(
        (u as iUserDoc).security,
        sUsrPWSet
      );
      expect(v3).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return undefined from different password", async () => {
      const v3 = await validateSamePasswordErr(
        (u as iUserDoc).security,
        sUsrPWSetNew
      );

      expect(v3).toBeUndefined();
    });
  });

  describe("Update User Password Fx", () => {
    test("if fx would return undefined from updating password", async () => {
      const v1 = await updateUserPassword((u as iUserDoc).security, sUsrPWSet);

      expect(v1).toBeUndefined();
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

// https://www.reddit.com/user/OneTop3934/
