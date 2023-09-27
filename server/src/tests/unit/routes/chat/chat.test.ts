import "dotenv/config";

import { iUser } from "../../../../models/user.imodel";
import { TestUtil } from "../../../misc/util";
import { APIError } from "../../../../global/httpErrors.global";
import { RedisMethods } from "../../../../services/redis.srvcs";
import { chatMsgSkipCnt } from "../../../../global/search.global";
import { MongoDBMethods } from "../../../../services/mongo.srvcs";
import { Chat, ChatMessages } from "../../../../models/chat.model";
import {
  iChat,
  iMsgBody,
  iChatMsgs,
  iChatReqBody,
  chatIdsAggregateProject,
  chatIdsAggregateMatcherArr,
  msgsIDsAggregate,
  topMsgsAggregate,
  topMsgsAggregateItem,
} from "../../../../models/chat.imodel";
import {
  getMsgsId,
  cacheMsgs,
  getDocMsgs,
  getCacheMsgs,
  checkChatInfo,
  validateChatReqBody,
  chatAggregateMatcherFilter,
  getDocMsgIDs,
  getCacheMsgsIDs,
  getTopMsgDocs,
  msgsAggregateMatcherFilter,
} from "../../../../routes/chat/chat.controller";

describe("Chat Route Sub Functions", () => {
  const OLD_ENV = process.env;
  const userId = "sampleUserId";
  const user: iUser = {
    act_id: {
      accnt_id: userId,
      accnt_type: "local",
    },
    act_name: "sampleUserName",
    security: "sampleSecurityId",
    relations: "sampleRelationsId",
    requests: "sampleRequestsId",
  };
  const chatObjs: iChat[] = TestUtil.createSampleChat();
  const chatObj: iChat = chatObjs[0];
  const msgsObjs: iMsgBody[] = TestUtil.createSampleMsgs(chatObj.chat_id);
  const msgObj: iMsgBody = msgsObjs[0];

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Validation Sub Fx", () => {
    const ivObj: iChatReqBody = {
      skip: 0,
      type: "group",
      chatId: "",
      listCnt: 1,
    };
    const vObj: iChatReqBody = {
      skip: 0,
      type: "group",
      chatId: "sampleChatId",
      listCnt: 1,
    };

    test("if fx would return an error upon invalid argument", () => {
      const t1 = validateChatReqBody(ivObj);
      expect(t1).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return an undefined upon valid argument", () => {
      const t2 = validateChatReqBody(vObj);
      expect(t2).toBeUndefined();
    });

    // further omit of possible input combinations from testing is laid off to TS
  });

  describe("Get Message Id Fx", () => {
    test("if fx would return error since db is empty", async () => {
      const t1 = await getMsgsId(chatObj.chat_id);
      expect(t1).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return string after filling db", async () => {
      await TestUtil.createSampleChatDocs(chatObjs);
      const t2 = await getMsgsId(chatObj.chat_id);
      expect(typeof t2).toBe<"string">("string");
    }, 15000);

    test("if fx would error from wrong argument", async () => {
      const t4 = await getMsgsId(chatObj.chat_id.concat("sample"));
      expect(t4).toBeInstanceOf(APIError || APIError);
    }, 15000);

    test("if fx would return error after deleting chat collection", async () => {
      await Chat.deleteMany({});
      const t3 = await getMsgsId(chatObj.chat_id);
      expect(t3).toBeInstanceOf(APIError || Error);
    }, 30000);
  });

  describe("Check Chat Cache Count Fx", () => {
    test("if fx would return error since chat set index is not created", async () => {
      const t1 = await checkChatInfo(chatObj.chat_id);
      expect(t1).toBeInstanceOf(APIError || Error);
    });

    test("if fx would return 0 after creating chat set index", async () => {
      await RedisMethods.createChatIndex(chatObj.chat_id);
      const t2 = await checkChatInfo(chatObj.chat_id);
      expect(t2).toStrictEqual(0);
    });

    test("if fx would error after non existing chat id", async () => {
      await RedisMethods.createChatIndex(chatObj.chat_id);
      const t25 = await checkChatInfo(chatObj.chat_id.concat("epdasda"));
      expect(t25).toBeInstanceOf(APIError || Error);
    });

    test(`if fx would return ${msgsObjs.length} after filling chat set index`, async () => {
      await TestUtil.createSampleMsgsCache(chatObj.chat_id, msgsObjs);
      const t3 = await checkChatInfo(chatObj.chat_id);
      expect(t3).toEqual(msgsObjs.length);
    }, 30000);

    test(`if fx would return ${
      msgsObjs.length - 1
    } & 0 after deleting chat set index caches`, async () => {
      await RedisMethods.client.json.del(
        RedisMethods.chatSetItemName(chatObj.chat_id, msgObj.msgId)
      );
      const t4 = await checkChatInfo(chatObj.chat_id);
      expect(t4).toEqual(msgsObjs.length - 1);

      await TestUtil.deleteSampleMsgsCache(chatObj.chat_id, msgsObjs);
      const t5 = await checkChatInfo(chatObj.chat_id);
      expect(t5).toEqual(0);
    }, 30000);
  });

  describe("Get Chat Cache Msgs Fx", () => {
    test("if fx would error from non existing chat id", async () => {
      const msgs = await getCacheMsgs(chatObj.chat_id.concat("fake"), 0, 0);
      expect(msgs).toBeInstanceOf(APIError || Error);
    }, 20000);

    test("if fx would return 0 since msgs are emptied", async () => {
      const msgs = await getCacheMsgs(chatObj.chat_id, 0, 0);
      expect((msgs as iMsgBody[]).length).toEqual(0);
    }, 20000);

    test(`if fx would return specific counts filling & skipping chat set index`, async () => {
      const cMsgsCnt = 33;
      const cMsgs = TestUtil.createSampleMsgs(chatObj.chat_id, cMsgsCnt);
      await TestUtil.createSampleMsgsCache(chatObj.chat_id, cMsgs);

      const pr = [
        getCacheMsgs(chatObj.chat_id, 0, 0),
        getCacheMsgs(chatObj.chat_id, chatMsgSkipCnt, 0),
        getCacheMsgs(chatObj.chat_id, cMsgsCnt * 100, 0),
      ];

      const [p1, p2, p3] = await Promise.allSettled(pr);
      // cMsgsCnt
      if (p1.status === "fulfilled")
        expect((p1.value as iMsgBody[]).length).toEqual(chatMsgSkipCnt);
      else
        throw new Error("error upon assertion where array length = cMsgsCnt");

      // cMsgsCnt - chatMsgSkipCnt
      if (p2.status === "fulfilled")
        expect((p2.value as iMsgBody[]).length).toEqual(
          cMsgsCnt - chatMsgSkipCnt
        );
      else
        throw new Error(
          "error upon assertion where array length = cMsgsCnt - chatMsgSkipCnt"
        );

      // 0
      if (p3.status === "fulfilled")
        expect((p3.value as iMsgBody[]).length).toEqual(0);
      else throw new Error("error upon assertion where array length = 0");

      // 0
      await TestUtil.deleteSampleMsgsCache(chatObj.chat_id, cMsgs);
      const t4 = await getCacheMsgs(chatObj.chat_id, 0, 0);
      expect((t4 as iMsgBody[]).length).toEqual(0);
    }, 30000);
  });

  describe("Get Chat Doc Msgs Fx", () => {
    // due to the nature of the aggregate function, this method will not longer return error unless there is a syntax error as aggregate allways retur an array even without a match

    test("if fx would return empty array even if collection is empty", async () => {
      const msgs = await getDocMsgs(chatObj.msgs_id, 0, chatMsgSkipCnt);
      expect(Array.isArray(msgs)).toBe(true);
    }, 30000);

    test("if fx would return an empty array after just creating msgs doc", async () => {
      const chatMsgs: iChatMsgs = {
        str_id: chatObj.msgs_id,
        list: [],
        count: 0,
      };
      await ChatMessages.create(chatMsgs);

      const t2 = await getDocMsgs(chatObj.msgs_id, 0, chatMsgSkipCnt);

      expect((t2 as []).length).toEqual(0);
    }, 30000);

    test("if fx would return a specific count after updating msgs doc", async () => {
      const sMsgs = TestUtil.createSampleMsgs(chatObj.chat_id, 65);

      await ChatMessages.updateOne(
        { str_id: chatObj.msgs_id },
        {
          $set: { list: sMsgs },
        }
      );

      const t2 = await getDocMsgs(chatObj.msgs_id, 0, chatMsgSkipCnt);
      expect((t2 as []).length).toEqual(chatMsgSkipCnt);
    }, 30000);

    test("if fx would return a empty array after updating msgs doc", async () => {
      await ChatMessages.updateOne(
        { str_id: chatObj.msgs_id },
        {
          $set: { list: [] },
        }
      );

      const t2 = await getDocMsgs(chatObj.msgs_id, 0, chatMsgSkipCnt);
      expect((t2 as []).length).toEqual(0);
    }, 30000);

    test("if fx would return empty array with non-existing document", async () => {
      const msgs = await getDocMsgs(
        chatObj.msgs_id.concat("fake"),
        0,
        chatMsgSkipCnt
      );

      expect(Array.isArray(msgs)).toBe(true);
      expect((msgs as iMsgBody[]).length).toEqual(0);
    }, 30000);

    test("if fx would return empty array with a skip number > total items", async () => {
      const msgs = await getDocMsgs(
        chatObj.msgs_id.concat("fake"),
        100,
        chatMsgSkipCnt
      );

      expect(Array.isArray(msgs)).toBe(true);
      expect((msgs as iMsgBody[]).length).toEqual(0);
    }, 30000);

    test("if fx would return a empty array after deleting msgs doc", async () => {
      await ChatMessages.deleteMany({});

      const t2 = await getDocMsgs(chatObj.msgs_id, 0, chatMsgSkipCnt);
      expect((t2 as []).length).toEqual(0);
    }, 30000);
  });

  describe("Cache Chat Msgs Fx", () => {
    // empty chat cache index is existing from tests earlier
    const cMsgs = TestUtil.createSampleMsgs(chatObj.chat_id, 35);

    test("if fx would return void after sending empty array", async () => {
      const t1 = await cacheMsgs(chatObj.chat_id, []);
      expect(t1).toBeUndefined();
    });

    test("if fx would return void after passing valid iMsgBody[]", async () => {
      const t2 = await cacheMsgs(chatObj.chat_id, cMsgs);
      expect(t2).toBeUndefined();
    });

    test("if fx successfully cached msg items", async () => {
      const t3 = await checkChatInfo(chatObj.chat_id);
      expect(t3).toEqual(cMsgs.length);
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

describe("GET Top Msgs Sub Functions", () => {
  const OLD_ENV = process.env;

  beforeAll(async () => {
    process.env.SERVER_ENV = "TESTING";
    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();
  });

  describe("Mongoose Match Filter Object Fx", () => {
    /** Tests here will assume that proceeding data are previously validated and sanitized */

    test("if fx would return valid object array(s)", () => {
      let i: Record<"chat_id", string>;

      const t1 = chatAggregateMatcherFilter(["qwert"]);

      for (i of t1) {
        expect(
          "chat_id" in i && typeof i.chat_id === "string" && i.chat_id.length
            ? true
            : false
        ).toBe<boolean>(true);
      }

      const t2 = chatAggregateMatcherFilter(["qwert", "qwert", "qwert"]);
      for (i of t2) {
        expect(
          "chat_id" in i && typeof i.chat_id === "string" && i.chat_id.length
            ? true
            : false
        ).toBe<boolean>(true);
      }
    });
  });

  describe("Get Doc Message IDs Fx", () => {
    const chats = TestUtil.createSampleChat();
    const chatIDs = chats.map((chat: iChat) => chat.chat_id);
    const aggregateMatcher: chatIdsAggregateMatcherArr =
      chatAggregateMatcherFilter(chatIDs);
    const aggregateProject: chatIdsAggregateProject = {
      _id: false,
      msgs_id: 1,
    };

    /**
     * Test 1 - return an empty array
     * --- populate chat docs
     * Test 2 - return filled array
     * Test 3 - return specific amount of items array
     */

    test("if fx would return an empty array from en empty collection", async () => {
      const t1 = await getDocMsgIDs(aggregateMatcher);
      expect((t1 as string[]).length).toEqual<number>(0);
    });

    test(`if fx would return a ${chatIDs.length} length array after filling it`, async () => {
      await TestUtil.createSampleChatDocs(chats);

      const t2 = await getDocMsgIDs(aggregateMatcher);
      expect((t2 as string[]).length).toEqual<number>(chats.length);
    }, 15000);

    test("if fx would return varying array depending on filter", async () => {
      const OG_LENGTH = aggregateMatcher.length;

      const newAgg1 = aggregateMatcher.slice(0, OG_LENGTH - 1);
      const t31 = await getDocMsgIDs(newAgg1);
      expect((t31 as string[]).length).toEqual<number>(OG_LENGTH - 1);

      const newAgg2 = aggregateMatcher.slice(0, OG_LENGTH - 1 - 1);
      const t32 = await getDocMsgIDs(newAgg2);
      expect((t32 as string[]).length).toEqual<number>(OG_LENGTH - 1 - 1);

      const newAgg3 = aggregateMatcher.slice(0, 1);
      const t33 = await getDocMsgIDs(newAgg3);
      expect((t33 as string[]).length).toEqual<number>(1);
    }, 30000);
  });

  describe("Get Cache Message IDs Fx", () => {
    const chats = TestUtil.createSampleChat();
    const chatIDs = chats.map((chat: iChat) => chat.chat_id);

    /**
     * Test 1 - return an empty array
     * --- populate chat docs
     * Test 2 - return filled array
     * Test 3 - return specific amount of items array
     */

    test("if fx would return an empty array from empty index", async () => {
      const t1 = await getCacheMsgsIDs(chatIDs);
      expect((t1 as string[]).length).toEqual<number>(0);
    });

    test(`if fx would return a ${chatIDs.length} length array after populating it`, async () => {
      await TestUtil.createSampleChatCache(chats);

      const t2 = await getCacheMsgsIDs(chatIDs);
      expect((t2 as string[]).length).toEqual<number>(chatIDs.length);
    }, 15000);

    test("if fx would return varying array depending on filter", async () => {
      const t1a = chatIDs.slice(0, 1);

      const t31 = await getCacheMsgsIDs(t1a);
      expect((t31 as string[]).length).toEqual<number>(t1a.length);

      const t2a = chatIDs.slice(0, 1);
      const t32 = await getCacheMsgsIDs(t2a);
      expect((t32 as string[]).length).toEqual<number>(t2a.length);

      const t3a = chatIDs.slice(0, 1);
      const t33 = await getCacheMsgsIDs(t3a);
      expect((t33 as string[]).length).toEqual<number>(t3a.length);
    }, 15000);
  });

  describe("Get Top Document Message Fx", () => {
    let chatIDs: string[] = [],
      msgsIDs: string[] = [],
      msgsIDsAggArr: msgsIDsAggregate = [],
      targetChatId: string,
      targetMsgsId: string,
      sampleMsgs0: iMsgBody[],
      timeArr0: iMsgBody[],
      sampleMsgs1: iMsgBody[],
      timeArr1: iMsgBody[];

    beforeAll(async () => {
      chatIDs = [...((await TestUtil.createSampleChatInfoDocs()) as string[])];
      msgsIDs = (await getDocMsgIDs(
        chatAggregateMatcherFilter(chatIDs)
      )) as string[];
      msgsIDsAggArr = [...msgsAggregateMatcherFilter(msgsIDs)];
      targetChatId = chatIDs[0];
      targetMsgsId = msgsIDs[0];

      sampleMsgs0 = TestUtil.createSampleMsgs(targetChatId);
      timeArr0 = sampleMsgs0
        .sort((a, b) => b.timeReceived - a.timeReceived)
        .slice(0, 1);
      sampleMsgs1 = TestUtil.createSampleMsgs(chatIDs[1]);
      timeArr1 = sampleMsgs1
        .sort((a, b) => b.timeReceived - a.timeReceived)
        .slice(0, 1);
    }, 15000);

    /**
     * Test 1 - return empty aggregate from unpopulated un
     * Test 2 & 3 - return controlled results from aggregate
     */

    test("if fx would return empty aggregate", async () => {
      const t1 = (await getTopMsgDocs(msgsIDsAggArr)) as topMsgsAggregate;
      expect(t1.length).toEqual<number>(0);
    }, 15000);

    test("if fx would recognize populated msgs", async () => {
      await TestUtil.createSampleMsgsDoc(targetMsgsId, sampleMsgs0);
      const t20 = (await getTopMsgDocs(msgsIDsAggArr)) as topMsgsAggregate;
      expect(t20.length).toEqual<number>(1);

      expect(t20[0].top.chatId).toEqual<string>(targetChatId);
      expect(t20[0].top.timeReceived).toEqual(timeArr0[0].timeReceived);
    }, 30000);

    test("if fx would recognize another populated msgs", async () => {
      await TestUtil.createSampleMsgsDoc(msgsIDs[1], sampleMsgs1);
      const t21 = (await getTopMsgDocs(msgsIDsAggArr)) as topMsgsAggregate;

      expect(t21.length).toEqual<number>(2);

      const t211: boolean =
        (t21[0].top.chatId === targetChatId &&
          t21[1].top.chatId === chatIDs[1]) ||
        (t21[0].top.chatId === chatIDs[1] &&
          t21[1].top.chatId === targetChatId);

      const t212: boolean =
        (t21[0].top.timeReceived === timeArr1[0].timeReceived &&
          t21[1].top.timeReceived === timeArr0[0].timeReceived) ||
        (t21[0].top.timeReceived === timeArr0[0].timeReceived &&
          t21[1].top.timeReceived === timeArr1[0].timeReceived);

      expect(t211).toBe<boolean>(true);
      expect(t212).toBe<boolean>(true);
    }, 30000);

    afterAll(async () => {
      await MongoDBMethods.flush();
      await RedisMethods.client.flushAll();
      await MongoDBMethods.disconnect();
      await RedisMethods.disconnect();

      process.env = OLD_ENV;
    });
  });
});
