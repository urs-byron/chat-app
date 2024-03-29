import { Chat, ChatMessages } from "../../models/chat.model";
import { User } from "../../models/user.model";
import { iUser } from "../../models/user.imodel";
import { Group } from "../../models/group.model";
import { iGroup } from "../../models/group.imodel";
import { iRelation } from "../../models/gen.imodel";
import { GenRelations } from "../../models/gen.model";
import { RedisMethods } from "../../services/redis.srvcs";
import { GeneralMethods } from "../../data/misc.data";
import { iChat, iChatDoc, iMsgBody } from "../../models/chat.imodel";
import {
  createGrpRelObj,
  updateUserCacheRelations,
  updateUserDbRelations,
} from "../../routes/group/group.controller";
import { ChatMethods } from "../../data/chat.data";
import { APIError } from "../../global/httpErrors.global";

export class TestUtil {
  /**
   *
   * @param i
   * @returns
   */
  static readonly createSampleGroup = (i: number = 5): iGroup[] => {
    let n = 0;
    let grps: iGroup[] = [];

    while (n < i) {
      grps.push({
        grp_id: `grpId${n}`,
        chat_id: `chatId${n}`,
        grp_name: `grpName${n}`,
        security: `security${n}`,
        relations: `relations${n}`,
        requests: `requests${n}`,
      });

      n++;
    }

    return grps;
  };

  /**
   * This function returns a set of user object with:
   * - their IDs starting with 5
   * - ending the set items up to 10 by default
   *
   * @param { number } i - limiting constant of account saved within DB
   * @returns { iUser[] }
   */
  static readonly createSampleUser = (i: number = 10): iUser[] => {
    let n: number = 5;
    let users: iUser[] = [];

    while (n < i) {
      users.push({
        act_id: { accnt_id: `sampleAccntId${n}`, accnt_type: "local" },
        act_name: `sampleUser${n}`,
        security: `sampleSecurityId${n}`,
        relations: `sampleRelationsId${n}`,
        requests: `sampleRequestsId${n}`,
      });

      n++;
    }

    return users;
  };

  /**
   * This function returns an array of chat objects.
   *
   * @param { number } [i] - optional number of chat objects to be created, default as 5
   * @returns { iChat[] }
   *
   * @static
   */
  static readonly createSampleChat = (i: number = 5): iChat[] => {
    const chatArr: iChat[] = [];

    for (let index = 0; index < i; index++) {
      chatArr.push({
        chat_id: `sampleChatId${index}`,
        msgs_id: `sampleMsgsId${index}`,
        rules_id: `sampleRulesId${index}`,
      });
    }

    return chatArr;
  };

  /**
   * This function returns an array of messages.
   *
   * @param { number } [i] - optional length for returned messages array, default as 5
   * @returns
   */
  static readonly createSampleMsgs = (
    chatID: string,
    i: number = 5
  ): iMsgBody[] => {
    const chatArr: iMsgBody[] = [];

    for (let index = 0; index < i; index++) {
      chatArr.push({
        msg: `sampleChatId${index}`,
        msgId: `sampleMsgsId${index}`,
        chatId: chatID,
        senderId: `sampleSenderId${index}`,
        senderName: `sampleSenderName${index}`,
        timeReceived: Math.floor(Math.random() * 100),
      });
    }

    return chatArr;
  };
  static readonly createDiffConRel = (
    c?: number,
    m?: number,
    b?: number
  ): iRelation[] => {
    let i: number = 0;
    const rels: iRelation[] = [];

    if (c !== undefined)
      for (let index = 0; index < c; index++, i++) {
        rels.push({
          accnt_id: `sampleAccntId${i}`,
          accnt_name: `sampleAccntName${i}`,
          type: `sampletype${i}`,
          chat_id: `samplechat_id${i}`,
          admin: false,
          block: false,
          mute: false,
          archive: false,
          bump: i,
        });
      }

    if (m !== undefined)
      for (let index = 0; index < m; index++, i++) {
        rels.push({
          accnt_id: `sampleAccntId${i}`,
          accnt_name: `sampleAccntName${i}`,
          type: `sampletype${i}`,
          chat_id: `samplechat_id${i}`,
          admin: false,
          block: false,
          mute: true,
          archive: false,
          bump: i,
        });
      }

    if (b !== undefined)
      for (let index = 0; index < b; index++, i++) {
        rels.push({
          accnt_id: `sampleAccntId${i}`,
          accnt_name: `sampleAccntName${i}`,
          type: `sampletype${i}`,
          chat_id: `samplechat_id${i}`,
          admin: false,
          block: true,
          mute: false,
          archive: false,
          bump: i,
        });
      }

    return rels;
  };

  /**
   * This funtion independently stores group document within mongoDB groups collection.
   *
   * @param { iGroup[] } grps
   * @returns { Promise<void> }
   */
  static readonly createSampleGroupDoc = async (
    grps: iGroup[]
  ): Promise<void> => {
    if (
      grps === null ||
      grps === undefined ||
      !Array.isArray(grps) ||
      !grps.length
    )
      return;

    let p = [];
    for (const grp of grps) {
      p.push(Group.create(grp));
    }

    await Promise.allSettled(p);
  };

  /**
   * This function saves sample user objects within MongoDB.
   *
   * @param { iUser[] } usrs
   * @returns { Promise<void> }
   */
  static readonly createSampleUserDoc = async (
    usrs: iUser[]
  ): Promise<void> => {
    if (usrs === null || usrs === undefined || !usrs.length) return;

    let usr: iUser;
    let prs: any = [];

    for (usr of usrs) {
      prs.push(User.create(usr));
    }

    await Promise.allSettled(prs);
  };

  /**
   * This function takes in iRelation[] and independently deleted them from relation index.
   *
   * @param { string } userId
   * @param { iRelation[] } rels
   *
   * @returns
   *
   * @static
   */
  static readonly createRelCaches = async (
    userId: string,
    rels: iRelation[]
  ): Promise<void> => {
    if (
      rels === undefined ||
      rels === null ||
      !Array.isArray(rels) ||
      !rels.length
    )
      return;

    const tx = RedisMethods.client.multi();
    let rel: iRelation;
    let relKey: string;

    for (rel of rels) {
      relKey = RedisMethods.relationSetItemName(userId, rel.accnt_id);
      tx.json.set(relKey, "$", RedisMethods.redifyObj(rel));
    }

    await tx.exec();
  };

  /**
   * This function takes in iRelation[] and independently deleted them from relation index.
   *
   * @param { string } userId
   * @param { iRelation[] } rels
   *
   * @returns
   *
   * @static
   */
  static readonly deleteRelCaches = async (
    userId: string,
    rels: iRelation[]
  ): Promise<void> => {
    if (
      rels === undefined ||
      rels === null ||
      !Array.isArray(rels) ||
      !rels.length
    )
      return;

    const tx = RedisMethods.client.multi();
    let rel: iRelation;
    let relKey: string;

    for (rel of rels) {
      relKey = RedisMethods.relationSetItemName(userId, rel.accnt_id);
      tx.json.del(relKey);
    }

    await tx.exec();
  };

  /**
   * This function saves sample user objects within Redis.
   *
   * @param { iUser[] } usrs
   * @returns { Promise<void> }
   */
  static readonly createSampleUserCache = async (
    usrs: iUser[]
  ): Promise<void> => {
    if (
      usrs === null ||
      usrs === undefined ||
      !Array.isArray(usrs) ||
      !usrs.length
    )
      return;

    let usr: iUser;
    const tx = RedisMethods.client.multi();

    for (usr of usrs)
      tx.json.set(
        RedisMethods.userItemName(usr.act_id.accnt_id),
        "$",
        RedisMethods.redifyObj(usr)
      );

    await tx.exec();
  };

  static readonly createSampleGroupRelCache = async (
    userId: string,
    grps: iGroup[]
  ) => {
    let rel: iRelation;
    const tx = RedisMethods.client.multi();
    grps.forEach((grp, index) => {
      rel = createGrpRelObj(grp, grp.grp_name, index);
      tx.json.set(
        RedisMethods.relationSetItemName(userId, grp.grp_id),
        "$",
        RedisMethods.redifyObj(rel)
      );
    });

    await updateUserCacheRelations(tx);
  };

  /**
   * This function stores iRelation objects to a GenRelation document.
   * @param { string } relationsId
   * @param { iRelation[] } relArr
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly pushRelArrToRelDoc = async (
    relationsId: string,
    relArr: iRelation[]
  ): Promise<void> => {
    await GenRelations.updateOne(
      { str_id: relationsId },
      { $push: { [`relations.list`]: { $each: relArr } } }
    );
  };

  /**
   * This function stores iRelation objects to a GenRelation document.
   * @param { string } relationsId
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly pullAllFromRelDoc = async (
    relationsId: string
  ): Promise<void> => {
    await GenRelations.updateOne(
      { str_id: relationsId },
      { $pull: { [`relations.list`]: {} } }
    );
  };

  /**
   * This function populates a mock account's relation cache index, independently.
   *
   * @param { string } userId
   * @param { iUser[] } users
   *
   * @static
   */
  static readonly createSampleUsersRelCache = async (
    userId: string,
    users: iUser[]
  ) => {
    let rel: iRelation;
    const tx = RedisMethods.client.multi();
    users.forEach((user, index) => {
      rel = GeneralMethods.createRelationObj(
        { accnt_name: user.act_name, accnt_id: user.act_id.accnt_id },
        "user",
        false,
        `sampleChatId${index}`,
        index
      );
      tx.json.set(
        RedisMethods.relationSetItemName(userId, user.act_id.accnt_id),
        "$",
        RedisMethods.redifyObj(user)
      );
    });

    await updateUserCacheRelations(tx);
  };
  static readonly createSampleGroupRelDoc = async (
    userId: string,
    relationsId: string,
    grps: iGroup[]
  ) => {
    let grp: iGroup;
    let rel: iRelation;
    let index: number = 0;
    for (grp of grps) {
      rel = rel = createGrpRelObj(grp, grp.grp_name, index);

      await updateUserDbRelations(
        userId,
        relationsId,
        index,
        rel,
        RedisMethods.client.multi()
      );
    }
  };
  static readonly createSampleUserRelDoc = async (
    userId: string,
    relationsId: string,
    users: iUser[]
  ) => {
    let rel: iRelation;

    users.forEach(async (user, index) => {
      rel = GeneralMethods.createRelationObj(
        { accnt_name: user.act_name, accnt_id: user.act_id.accnt_id },
        "user",
        false,
        `sampleChatId${index}`,
        index
      );

      await updateUserDbRelations(
        userId,
        relationsId,
        index,
        rel,
        RedisMethods.client.multi()
      );
    });
  };

  /**
   * This function stores iChat objects in the MongoDB chat collection.
   *
   * @param { iChat[] } cArr
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly createSampleChatDocs = async (
    cArr: iChat[]
  ): Promise<void> => {
    if (
      cArr === undefined ||
      cArr === null ||
      !Array.isArray(cArr) ||
      !cArr.length
    )
      return;

    let c: iChat;
    let p = [];

    for (c of cArr) {
      p.push(Chat.create(c));
    }

    await Promise.allSettled(p);
  };

  /**
   * This function stores iChat objects in the MongoDB chat index.
   *
   * @param { iChat[] } cArr
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly createSampleChatCache = async (
    cArr: iChat[]
  ): Promise<void> => {
    if (
      cArr === undefined ||
      cArr === null ||
      !Array.isArray(cArr) ||
      !cArr.length
    )
      return;

    const tx = RedisMethods.client.multi();
    let c: iChat;
    let cKey: string;

    for (c of cArr) {
      tx.json.set(
        RedisMethods.chatItemName(c.chat_id),
        "$",
        RedisMethods.redifyObj(c)
      );
    }

    await tx.exec();
  };
  static readonly createSampleMsgsCache = async (
    chatId: string,
    mArr: iMsgBody[]
  ): Promise<void> => {
    const tx = RedisMethods.client.multi();

    mArr.forEach((msg: iMsgBody) => {
      tx.json.set(
        RedisMethods.chatSetItemName(chatId, msg.msgId),
        "$",
        RedisMethods.redifyObj(msg)
      );
    });

    await tx.exec();
  };
  static readonly deleteSampleMsgsCache = async (
    chatId: string,
    mArr: iMsgBody[]
  ): Promise<void> => {
    const tx = RedisMethods.client.multi();

    mArr.forEach((msg: iMsgBody) => {
      tx.json.del(RedisMethods.chatSetItemName(chatId, msg.msgId));
    });

    await tx.exec();
  };

  /**
   * This function will generate a mock for any chat relation document including Chat, ChatMessages, & ChatRules Document within the MongoDB Database.
   *
   * @param { number } i - times a chat information document will be created; default = 5
   * @returns { Promise<Error | string[]> }
   *
   * @static
   */
  static readonly createSampleChatInfoDocs = async (
    i: number = 5
  ): Promise<Error | string[]> => {
    const pr: Promise<string | Error | APIError>[] = [];

    let j: number = 0;
    while (j < i) {
      pr.push(ChatMethods.createChat());
      j++;
    }

    const prs = await Promise.allSettled(pr);

    const c = prs.map((p) => {
      if (p.status === "fulfilled") return p.value;
      else throw new Error(`test failed: ${p.reason}`);
    }) as string[];

    return c;
  };

  /**
   * This function returns the corresponding string from a unique mock chat info document.
   *
   * @param chatIds - array of chat ID strings
   * @returns
   *
   * @static
   */
  static readonly getMsgIDsDoc = async (
    chatIds: string[]
  ): Promise<Error | (string | null)[]> => {
    const pr = [];

    let c: string;
    for (c of chatIds) {
      pr.push(Chat.findOne({ chat_id: c } as iChat).lean());
    }

    const prs = await Promise.allSettled(pr);

    const ms = prs.map((p) => {
      if (p.status === "fulfilled") return (p.value as iChat).msgs_id;
      else throw new Error(`test failed: ${p.reason}`);
    }) as (string | null)[];

    return ms;
  };

  /**
   * This function stores a set of message objects to a Message Document list property.
   *
   * @param { string } msgId
   * @param { iMsgBody[] } msgs
   * @returns { Promise<void> }
   *
   * @static
   */
  static readonly createSampleMsgsDoc = async (
    msgId: string,
    msgs: iMsgBody[]
  ): Promise<void> => {
    await ChatMessages.updateOne(
      { str_id: msgId },
      { $push: { list: { $each: msgs } } }
    );
  };
}
