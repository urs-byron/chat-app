import { UserMethods } from "../../../data/user.data";
import { iValidityType } from "../../../global/validity.global";
import {
  ValidateMethods,
  ValidateMethods as valid,
} from "../../../util/validate.util";

describe("Validation Methods", () => {
  // CONSTANT VAR
  const userId = "userId";
  const recipientId = "recipientId";
  const validRes = {
    isValid: true,
    error: null,
  };
  function invalidRes(...err: Array<string>): iValidityType {
    return {
      isValid: false,
      error: [...err],
    };
  }

  describe("Instantiation", () => {
    test("if class would instantiate the same class", () => {
      expect(valid.getInst()).toStrictEqual(valid.getInst());
    });
  });

  describe("Password Set Inputs", () => {
    const p: string = "123456789";
    const sh = UserMethods.generateHash(p);

    // PASSWORD + HASH & SALT GENERATED FROM PASSWORD
    test("if valid password and hash & salt would pass", () => {
      expect(valid.password(p, sh.hash, sh.salt)).toStrictEqual(validRes);
    });

    // OTHER PASSWORD + HASH & SALT GENERATED FROM PASSWORD
    test("if invalid password and hash & salt would return error", () => {
      expect(valid.password("987654321", sh.hash, sh.salt)).toStrictEqual(
        invalidRes("password entered is incorrect")
      );
    });
  });

  describe("User Id", () => {
    test("if valid Id would pass", () => {
      expect(valid.authenticate("sampleString")).toStrictEqual(validRes);
    });
  });

  describe("Register Inputs", () => {
    // USERNAME requirement
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, or CERTAIN SPECIAL characters
    // --- at length of 8-20 characters
    // PASSWORD requirement
    // --- must have at least ONE(1) UPPERCASE, LOWERCASE, NUMERIC, and CERTAIN SPECIAL character
    // --- at least 8 characters
    // RE-PASSWORD requirement
    // --- must have at least ONE(1) UPPERCASE, LOWERCASE, NUMERIC, and CERTAIN SPECIAL character
    // --- at least 8 characters
    // --- equals password

    test("if valid mock register inputs would pass", () => {
      expect(
        valid.register({
          // CAN BE A COMBINATION OR NOT
          username: "12345678",
          // MUST BE A COMBINATION
          password: "P@ssw0rd",
          // MUST BE A COMBINATION
          rePassword: "P@ssw0rd",
        })
      ).toStrictEqual(validRes);
    });
  });

  describe("Login Inputs", () => {
    // USERNAME requirement
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, or CERTAIN SPECIAL characters
    // --- at length of 8-20 characters
    // PASSWORD requirement
    // --- must have at least ONE(1) UPPERCASE, LOWERCASE, NUMERIC, and CERTAIN SPECIAL character
    // --- at least 8 characters

    test("if valid mock login inputs would pass", () => {
      expect(
        valid.loginInputs({
          // CAN BE A COMBINATION OR NOT
          username: "12345678",
          // MUST BE A COMBINATION
          password: "P@ssw0rd",
        })
      ).toStrictEqual(validRes);
    });
  });

  describe("Search Inputs", () => {
    test("if valid mock search inputs would pass", () => {
      expect(
        valid.search({ pattern: "a", type: 0, skip: 0, cnt: 0 })
      ).toStrictEqual(validRes);
    });
    test("if invalid mock search inputs would return an error", () => {
      expect(
        valid.search({ pattern: "", type: 0, skip: 0, cnt: 0 })
      ).toStrictEqual(invalidRes("Search Pattern is required"));
    });

    // further combination of error is not necessary since typescript prohibits them
  });

  describe("Password Change Inputs", () => {
    // valid password set
    test("if valid password set inputs would pass", () => {
      expect(
        valid.passwordChange({ password: "P@ssw0rd", rePassword: "P@ssw0rd" })
      ).toStrictEqual(validRes);
    });

    // invalid password set
    test("if invalid password set inputs would return an error", () => {
      expect(
        valid.passwordChange({ password: "Passw0rd", rePassword: "Passw0rds" })
      ).toStrictEqual(
        invalidRes(
          "Password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
          "Confirmed password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
          "Password & Confirmation password does not match"
        )
      );
    });
  });

  describe("Relation Contact Inputs", () => {
    // groupId must be null for user related requests
    test("if valid user relation contact inputs would pass", () => {
      expect(
        valid.relationBody({
          chatType: "user",
          contactType: "contact",
          groupId: null,
          skip: 0,
        })
      ).toStrictEqual(validRes);
    });

    // groupId is required for group related requests
    test("if valid group relation contact inputs would pass", () => {
      expect(
        valid.relationBody({
          chatType: "group",
          contactType: "contact",
          groupId: "sampleId",
          skip: 0,
        })
      ).toStrictEqual(validRes);
    });

    // further combination of error is not necessary since typescript prohibits them
  });

  describe("Relation Action Inputs", () => {
    // ALL VALID INPUTS
    test("if valid user relation action inputs would pass", () => {
      expect(
        valid.relationAct({
          recipientId: "sampleId",
          userAction: "block",
          actionValue: true,
        })
      ).toStrictEqual(validRes);
    });

    // INVALID recipientId input
    test("if invalid user relation action inputs would return error", () => {
      expect(
        valid.relationAct({
          recipientId: "",
          userAction: "block",
          actionValue: true,
        })
      ).toStrictEqual(invalidRes("Recipient ID is required"));
    });

    // further combination of error is not necessary since typescript prohibits them
  });

  describe("Privacy Data Inputs", () => {
    // ALL VALID INPUTS
    test("if valid user privacy data inputs would pass", () => {
      expect(
        valid.privacyData(
          { property: "availability", value: "true" },
          "availability"
        )
      ).toStrictEqual(validRes);
    });

    // INVALID property input
    test("if invalid user privacy data inputs would return an error", () => {
      expect(
        valid.privacyData({ property: "availability", value: "true" }, "public")
      ).toStrictEqual(invalidRes(`Privacy property must be public`));
    });

    // further combination of error is not necessary since typescript prohibits them
  });

  describe("Request Relation Inputs", () => {
    // ALL VALID REQUESTS PATTERNS
    // --- TYPE 1 --- groupId is required to be empty
    test("if valid type 1 would pass validation", () => {
      expect(
        valid.requestBody(
          { type: 1, recipientId: recipientId, groupId: "" },
          userId
        )
      ).toStrictEqual(validRes);
    });
    // --- TYPE 2 --- recipientId is required to be empty
    test("if valid type 2 would pass validation", () => {
      expect(
        valid.requestBody(
          { type: 2, recipientId: "", groupId: "groupId" },
          userId
        )
      ).toStrictEqual(validRes);
    });
    // --- TYPE 3 --- every Ids are required
    test("if valid type 3 would pass validation", () => {
      expect(
        valid.requestBody(
          { type: 3, recipientId: recipientId, groupId: "groupId" },
          userId
        )
      ).toStrictEqual(validRes);
    });

    // INVALID REQUESTS
    // --- equal pair of Ids
    test("if invalid type 1 would recognize ID similarity error", () => {
      expect(
        valid.requestBody(
          { type: 1, recipientId: recipientId, groupId: "" },
          recipientId
        )
      ).toStrictEqual(
        invalidRes(
          "Any pair from User, Recipient, & Group IDs can not be the same"
        )
      );
    });
    test("if invalid type 2 would recognize ID similarity error", () => {
      expect(
        valid.requestBody(
          { type: 2, recipientId: "", groupId: "groupId" },
          "groupId"
        )
      ).toStrictEqual(
        invalidRes(
          "Any pair from User, Recipient, & Group IDs can not be the same"
        )
      );
    });
    test("if invalid type 3 would recognize ID similarity error", () => {
      expect(
        valid.requestBody(
          { type: 3, recipientId: recipientId, groupId: "groupId" },
          "groupId"
        )
      ).toStrictEqual(
        invalidRes(
          "Any pair from User, Recipient, & Group IDs can not be the same"
        )
      );
    });
    // --- not "null" Id per type requirement
    test("if invalid type 1 recognizes not 'null' ID error", () => {
      expect(
        // groupId must be null
        valid.requestBody(
          { type: 1, recipientId: recipientId, groupId: "groupId" },
          userId
        )
      ).toStrictEqual(
        invalidRes("User to User request must not have group ID")
      );
    });
    test("if invalid type 2 recognizes not 'null' ID error", () => {
      // recipientId must be null
      expect(
        valid.requestBody(
          { type: 2, recipientId: recipientId, groupId: "groupId" },
          userId
        )
      ).toStrictEqual(
        invalidRes("User to Group request must not have Recipient ID")
      );
    });
    test("if invalid type 3 recognizes not 'null' ID error", () => {
      // all Ids are required
      expect(
        valid.requestBody({ type: 3, recipientId: "", groupId: "" }, userId)
      ).toStrictEqual(
        invalidRes(
          // "User ID is required",
          "Any pair from User, Recipient, & Group IDs can not be the same",
          "Group to User Request required Recipient ID",
          "User to Group Request required Group ID"
        )
      );
    });

    // further combination of error is not necessary since typescript prohibits them
  });

  describe("Patch Request Relation Input", () => {
    // ALL VALID INPUTS
    test("if valid type 1 mock patch request relation inputs would pass", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 1,
            recipientId: recipientId,
            groupId: "",
          },
          "approve"
        )
      ).toStrictEqual(validRes);
    });
    test("if valid type 2 mock patch request relation inputs would pass", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 2,
            recipientId: "",
            groupId: "groupId",
          },
          "reject"
        )
      ).toStrictEqual(validRes);
    });
    test("if valid type 3 mock patch request relation inputs would pass", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 3,
            recipientId: recipientId,
            groupId: "groupId",
          },
          "cancel"
        )
      ).toStrictEqual(validRes);
    });

    // SAMPLE INVALID INPUTS
    // --- equal pair of Ids
    test("if type 1 Id similarity error would return error", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 1,
            recipientId: userId,
            groupId: "",
          },
          "approve"
        )
      ).toStrictEqual(
        invalidRes(
          "Any pair between User, Recipient, and Group ID cannot be the same"
        )
      );
    });
    test("if type 2 Id similarity error would return error", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 2,
            recipientId: "",
            groupId: userId,
          },
          "cancel"
        )
      ).toStrictEqual(
        invalidRes(
          "Any pair between User, Recipient, and Group ID cannot be the same"
        )
      );
    });
    test("if type 3 Id similarity error would return error", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 3,
            recipientId: recipientId,
            groupId: recipientId,
          },
          "reject"
        )
      ).toStrictEqual(
        invalidRes(
          "Any pair between User, Recipient, and Group ID cannot be the same"
        )
      );
    });
    // --- "null" Id per type error
    test("if type 1 not 'null' id error would return error", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 1,
            recipientId: recipientId,
            groupId: "groupId",
          },
          "approve"
        )
      ).toStrictEqual(invalidRes(`Type:1 action requires no Group ID`));
    });
    test("if type 2 not 'null' id error would return error", () => {
      expect(
        valid.patchRequestBody(
          userId,
          {
            type: 2,
            recipientId: recipientId,
            groupId: "groupId",
          },
          "cancel"
        )
      ).toStrictEqual(invalidRes("Type:2 action requires no Recipient ID"));
    });
    test("if type 3 not 'null' id error would return error", () => {
      expect(
        valid.patchRequestBody(
          "",
          {
            type: 3,
            recipientId: "",
            groupId: "",
          },
          "cancel"
        )
      ).toStrictEqual(
        invalidRes(
          "User ID is required",
          "Any pair between User, Recipient, and Group ID cannot be the same",
          `Type:3 action requires Recipient ID`,
          "Type:3 action requires Group ID"
        )
      );
    });

    // further combination of error is not necessary since typescript prohibits them
  });

  describe("New Group Inputs", () => {
    test("if valid new mock group inputs would pass", () => {
      expect(
        valid.newGrpBody(
          { recipientId: recipientId, grpName: "sampleGrpName" },
          userId
        )
      ).toStrictEqual(validRes);
    });

    test("if invalid new mock group inputs would return errors", () => {
      expect(
        valid.newGrpBody({ recipientId: "", grpName: "" }, "")
      ).toStrictEqual(
        invalidRes(
          "User ID is required",
          "Recipient ID is required",
          "Group Name is required",
          "User & Recipient ID must not be the same"
        )
      );
    });

    // further combination of error is not necessary since typescript prohibits them
  });

  describe("Chat IDs Array Input", () => {
    /**
     * Test 1 - return valid res from empty array
     * Test 2 - return error res from invalid argument type
     * Test 3 - return valid res from valid arguments
     *
     */

    test("if fx would return valid response from empty array", () => {
      const t1 = valid.chatIDs([]);
      expect(t1).toStrictEqual(validRes);
    });

    test("if fx would return error from wrongly typed argument", () => {
      const t21 = valid.chatIDs(["sdsd", 51561, null] as string[]);
      expect(t21).toStrictEqual(invalidRes("ChatIDs are invalid."));
      const t22 = valid.chatIDs(["sdsdsad", null] as string[]);
      expect(t22).toStrictEqual(invalidRes("ChatIDs are invalid."));
      const t23 = valid.chatIDs(["sdsd", 6584654654] as string[]);
      expect(t23).toStrictEqual(invalidRes("ChatIDs are invalid."));
      const t24 = valid.chatIDs(["sdsdsad", 6584654654] as string[]);
      expect(t24).toStrictEqual(invalidRes("ChatIDs are invalid."));
    });

    test("if fx would return valid response from valid argument", () => {
      const t31 = valid.chatIDs(["68574684"]);
      expect(t31).toStrictEqual(validRes);
      const t32 = valid.chatIDs(["68574684", "68574684"]);
      expect(t32).toStrictEqual(validRes);
      const t33 = valid.chatIDs(["68574684", "68574684", "68574684"]);
      expect(t33).toStrictEqual(validRes);
    });
  });

  describe("Validity", () => {
    test("if it would return valid response", () => {
      expect(valid.setValidity([null])).toStrictEqual(validRes);
    });
    test("if it would return mock invalid response", () => {
      expect(valid.setValidity(["error statement"])).toStrictEqual(
        invalidRes("error statement")
      );
    });
  });
});
