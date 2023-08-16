import { iUser } from "../../models/user.imodel";
import { iGroup } from "../../models/group.imodel";
import { iRelation } from "../../models/gen.imodel";
import { RedisMethods } from "../../services/redis.srvcs";
import { GeneralMethods } from "../../data/misc.data";
import {
  createGrpRelObj,
  updateUserCacheRelations,
  updateUserDbRelations,
} from "../../routes/group/group.controller";
import { Group } from "../../models/group.model";
import { User } from "../../models/user.model";
import { iChat, iMsgBody } from "../../models/chat.imodel";
import { Chat } from "../../models/chat.model";

export class TestUtil {
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
  static readonly createSampleUser = (i: number = 10) => {
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
  static readonly createSampleMsgs = (i: number = 5): iMsgBody[] => {
    const chatArr: iMsgBody[] = [];

    for (let index = 0; index < i; index++) {
      chatArr.push({
        msg: `sampleChatId${index}`,
        msgId: `sampleMsgsId${index}`,
        senderId: `sampleSenderId${index}`,
        senderName: `sampleSenderName${index}`,
        timeReceived: index,
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
  static readonly createSampleGroupDoc = async (
    grps: iGroup[]
  ): Promise<void> => {
    for (const grp of grps) {
      await Group.create(grp);
    }
  };
  static readonly createSampleUserDoc = async (
    usrs: iUser[]
  ): Promise<void> => {
    let usr: iUser;
    for (usr of usrs) {
      await User.create(usr);
    }
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
  static readonly createSampleChatDocs = async (
    cArr: iChat[]
  ): Promise<void> => {
    let c: iChat;

    for (c of cArr) {
      await Chat.create(c);
    }
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
}
