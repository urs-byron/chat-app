import { iMsgBody } from "../models/chat.imodel";
import { pbkdf2Sync } from "node:crypto";
import { iNewGrpBody } from "../models/group.imodel";
import { iChatReqBody } from "../models/chat.imodel";
import { iUserSearchValues } from "../models/user.imodel";
import { actionType, contactType } from "../models/gen.model";
import {
  special_char,
  username_pattern,
  password_pattern,
} from "../global/regex.global";
import {
  iAuthInputs,
  iUserPassword,
  iValidityType,
} from "../global/validity.global.js";
import {
  iPrivacyRequest,
  iGenRelBody,
  iRelationAct,
  iGenRequestActions,
  iGenRequestBody,
  iGenPrivacyProp,
} from "../models/gen.imodel";
import { chatType } from "../models/user.model";

export class ValidateMethods {
  private static inst: ValidateMethods;

  private constructor() {}

  static password(p: string, hash: string, salt: string): iValidityType {
    const testHash: string = pbkdf2Sync(
      p,
      salt as BinaryType,
      10000,
      64,
      "sha512"
    ).toString("hex");

    const validity = [
      hash === testHash ? null : "password entered is incorrect",
    ];

    return this.setValidity(validity);
  }
  static authenticate(userId: string): iValidityType {
    const validity = [
      typeof userId === "string" && userId.length > 0
        ? null
        : "Authentication require valid user ID",
    ];

    return this.setValidity(validity);
  }
  static register(registerInputs: iAuthInputs): iValidityType {
    const { username, password, rePassword } = registerInputs;

    // USERNAME VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, or CERTAIN SPECIAL characters
    // --- at length of 8-20 characters
    // PASSWORD VALIDATE
    // --- must have at least ONE(1) UPPERCASE, LOWERCASE, NUMERIC, and CERTAIN SPECIAL character
    // --- at least 8 characters
    // RE-PASSWORD VALIDATE
    // --- must have at least ONE(1) UPPERCASE, LOWERCASE, NUMERIC, and CERTAIN SPECIAL character
    // --- at least 8 characters
    // --- equals password

    const validity = [
      typeof username === "string" && username.match(username_pattern)
        ? null
        : `Username can only contain 8-20 uppercase, lowercase, numeric, or ${special_char} characters`,
      typeof password === "string" && password.match(password_pattern)
        ? null
        : `Password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and ${special_char} characters`,
      typeof rePassword === "string" && rePassword!.match(password_pattern)
        ? null
        : `Confirmed password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and ${special_char} characters`,
      password === rePassword
        ? null
        : "Password & Confirmation password does not match",
    ];

    return this.setValidity(validity);
  }
  static loginInputs(loginInputs: iAuthInputs): iValidityType {
    const { username, password } = loginInputs;
    const validity = [
      typeof username === "string" && username.match(username_pattern)
        ? null
        : "Username is invalid",
      typeof password === "string" && password.match(password_pattern)
        ? null
        : "Password is invalid",
    ];

    // typeof username === "string" && username.trim().length < 8;
    // typeof password === "string" && password.trim().length < 8;

    return this.setValidity(validity);
  }
  static search(searchBody: iUserSearchValues): iValidityType {
    const { pattern, type, skip } = searchBody;

    const validity = [
      typeof pattern === "string" && pattern.length > 0
        ? null
        : "Search Pattern is required",
      type === 0 || type === 1 ? null : "Search Type must be either 0 or 1",
      typeof skip === "number" ? null : "Search Skip must be a number",
    ];

    return this.setValidity(validity);
  }
  static passwordChange(passwordSet: iUserPassword): iValidityType {
    const { password, rePassword } = passwordSet;

    const validaty = [
      typeof password === "string" && password.match(password_pattern)
        ? null
        : "Password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
      typeof rePassword === "string" && rePassword.match(password_pattern)
        ? null
        : "Confirmed password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
      passwordSet.password === passwordSet.rePassword
        ? null
        : "Password & Confirmation password does not match",
    ];

    return this.setValidity(validaty);
  }
  static relationBody(relBody: iGenRelBody): iValidityType {
    const { chatType, contactType: conType, groupId, skip } = relBody;
    const validity = [
      conType === contactType.block ||
      conType === contactType.mute ||
      conType === contactType.contact
        ? null
        : `Relation action must be '${contactType.contact}', '${contactType.mute}', or '${contactType.block}'`,
      typeof skip === "number" ? null : "Skip must be a number",
    ];

    if (chatType === "user")
      validity.push(!groupId ? null : "User Relations requires no Group Id");
    else if (chatType === "group")
      validity.push(
        typeof groupId === "string" && groupId.length > 0
          ? null
          : "Group Relations requires Group Id"
      );
    else
      validity.push(`Relations Request chatType can only be 'user' or 'group'`);

    return this.setValidity(validity);
  }
  static relationAct(relAct: iRelationAct): iValidityType {
    const { recipientId, userAction, actionValue } = relAct;
    const validity = [
      typeof recipientId === "string" && recipientId.length > 0
        ? null
        : "Recipient ID is required",
      userAction === actionType.archive ||
      userAction === actionType.mute ||
      userAction === actionType.block
        ? null
        : `Relation action must be ${actionType.archive}, ${actionType.mute}, or ${actionType.block}`,
      typeof actionValue === "boolean" ? null : "Relation Action is invalid",
    ];

    return this.setValidity(validity);
  }
  static privacyData(
    privacyData: iPrivacyRequest,
    prop: iGenPrivacyProp
  ): iValidityType {
    const validity = [
      (privacyData.property === "availability" ||
        privacyData.property === "public") &&
      privacyData.property === prop
        ? null
        : `Privacy property must be ${prop}`,
      privacyData.value === "true" || privacyData.value === "false"
        ? null
        : "Privacy property value must be a stringified boolean",
    ];

    return this.setValidity(validity);
  }
  static requestBody(reqBody: iGenRequestBody, userId: string): iValidityType {
    const { type, recipientId, groupId } = reqBody;
    let validity: Array<null | string> | null;

    validity = [
      typeof userId === "string" && userId.length > 0
        ? null
        : "User ID is required",
      userId !== recipientId && userId !== groupId && groupId !== recipientId
        ? null
        : "Any pair from User, Recipient, & Group IDs can not be the same",
      type === 1 || type === 2 || type === 3
        ? null
        : "Request type can only be 1, 2, or 3",
    ];

    if (type !== 2) {
      validity.push(
        typeof recipientId === "string" && recipientId.length > 0
          ? null
          : "Group to User Request required Recipient ID"
      );
    } else {
      validity.push(
        !recipientId ? null : "User to Group request must not have Recipient ID"
      );
    }
    if (type !== 1) {
      validity.push(
        typeof groupId === "string" && groupId.length > 0
          ? null
          : "User to Group Request required Group ID"
      );
    } else {
      validity.push(
        !groupId ? null : "User to User request must not have group ID"
      );
    }

    // UPDATE: TRANSITION ABANDONED
    // REASON: !"" IS a truthy value, meaning, "" is falsy
    // TRANSITION TO CODE BELOW UPON FURTHER TESTING
    // if (type !== 2) {
    //   validity.push(
    //     typeof recipientId === "string" && recipientId.length > 0
    //       ? null
    //       : "Group to User Request required Recipient ID"
    //   );
    // } else {
    //   validity.push(
    //     typeof recipientId === "string" && recipientId.length === 0
    //       ? null
    //       : "User to Group request must not have Recipient ID"
    //   );
    // }
    // if (type !== 1) {
    //   validity.push(
    //     typeof groupId === "string" && groupId.length > 0
    //       ? null
    //       : "User to Group Request required Group ID"
    //   );
    // } else {
    //   validity.push(
    //     typeof groupId === "string" && groupId.length === 0
    //       ? null
    //       : "User to User request must not have group ID"
    //   );
    // }

    return this.setValidity(validity);
  }
  static patchRequestBody(
    userId: string,
    reqBody: iGenRequestBody,
    action: iGenRequestActions
  ): iValidityType {
    const { type, recipientId, groupId } = reqBody;
    const validity = [
      typeof userId === "string" && userId.length > 0
        ? null
        : "User ID is required",
      userId !== recipientId && recipientId !== groupId && groupId !== userId
        ? null
        : "Any pair between User, Recipient, and Group ID cannot be the same",
      type === 1 || type === 2 || type === 3
        ? null
        : "Action Type can only be 1, 2, or 3",
      action === "approve" || action === "reject" || action === "cancel"
        ? null
        : "Request action can only be approve, reject, or cancel",
    ];

    if (type !== 2) {
      validity.push(
        typeof recipientId === "string" && recipientId.length > 0
          ? null
          : `Type:${type} action requires Recipient ID`
      );
    } else {
      validity.push(
        !recipientId ? null : `Type:${type} action requires no Recipient ID`
      );
    }

    if (type !== 1) {
      validity.push(
        typeof groupId === "string" && groupId.length > 0
          ? null
          : `Type:${type} action requires Group ID`
      );
    } else {
      validity.push(
        !groupId ? null : `Type:${type} action requires no Group ID`
      );
    }

    return this.setValidity(validity);
  }
  static newGrpBody(newGrpBody: iNewGrpBody, userId: string): iValidityType {
    const { recipientId, grpName } = newGrpBody;

    const validity = [
      typeof userId === "string" && userId.length > 0
        ? null
        : "User ID is required",
      typeof recipientId === "string" && recipientId.length > 0
        ? null
        : "Recipient ID is required",
      grpName.match(username_pattern) ? null : "Group Name is required",
      recipientId !== userId
        ? null
        : "User & Recipient ID must not be the same",
    ];

    return this.setValidity(validity);
  }
  static chatReqBody(data: iChatReqBody): iValidityType {
    const { skip, type, chatId, listCnt } = data;

    const v = [
      typeof skip === "number" ? null : "Skip must be a number",
      type === "user" || type === "group"
        ? null
        : `Chat Type must be either ${chatType.user} or ${chatType.group}.`,
      chatId && typeof chatId === "string" && chatId.length
        ? null
        : "Chat Id is required",
      typeof listCnt === "number" ? null : "List Count must be a number",
    ];

    return this.setValidity(v);
  }
  static newMessage(newMsg: iMsgBody, recipientId: string): iValidityType {
    const validity = [
      typeof newMsg.msg === "string" && newMsg.msg.length > 0
        ? null
        : "Message Content is required",
      typeof newMsg.msgId === "string" && newMsg.msgId.length > 0
        ? null
        : "Message ID is required",
      typeof newMsg.senderId === "string" && newMsg.senderId.length > 0
        ? null
        : "Message Sender ID is required",
      newMsg.senderName.match(username_pattern)
        ? null
        : "Message Sender Name is required",
      typeof newMsg.timeReceived === "number"
        ? null
        : "Message Time is required",
      typeof newMsg.chatId === "string" && newMsg.chatId.length > 0
        ? null
        : "Message ID is required",
      newMsg.senderId !== recipientId &&
      recipientId !== newMsg.chatId &&
      newMsg.chatId !== newMsg.senderId
        ? null
        : "Any of the sender, recipient, and chat IDs cannot be the same",
    ];

    return this.setValidity(validity);
  }
  static setValidity(validity: Array<string | null>): iValidityType {
    if (validity.join("")) {
      return {
        isValid: false,
        error: validity.filter((err) => err !== null),
      };
    } else {
      return { isValid: true, error: null };
    }
  }

  static readonly getInst = () => {
    if (!this.inst) this.inst = new ValidateMethods();
    return this.inst;
  };
}
