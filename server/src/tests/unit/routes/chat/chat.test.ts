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
} from "../../../../models/chat.imodel";
import {
  getMsgsId,
  cacheMsgs,
  getDocMsgs,
  getCacheMsgs,
  checkChatInfo,
  validateChatReqBody,
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
  const msgsObjs: iMsgBody[] = TestUtil.createSampleMsgs();
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
      const cMsgs = TestUtil.createSampleMsgs(cMsgsCnt);
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
      const sMsgs = TestUtil.createSampleMsgs(65);

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
    const cMsgs = TestUtil.createSampleMsgs(35);

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
