import { Document } from "mongoose";
import { iGenRelations, iGenRequests } from "./gen.imodel";

export type iChatType = "user" | "group";

export interface iChatReqBody {
  skip: number;
  type: iChatType;
  chatId: string;
  listCnt: number;
}

export type iChatSections =
  | iGenRelations
  | iGenRequests
  | iChat
  | iChatMsgs
  | iChatRules;
export interface memberValues {
  accnt_id: string;
  accnt_name: string;
}

export interface iChatMsgs {
  str_id: string;
  list: Array<{
    sender: string;
    value: string;
    time_sent: Date;
    time_received: Date;
    time_read?: Date;
  }>;

  count: Number;
}

export interface iChatRules {
  str_id: string;
  list: Array<{
    value: string;
    isRegex: Boolean;
  }>;

  count: Number;
}

export interface iChat {
  chat_id: string;
  msgs_id: string;
  rules_id: string;
}

export interface iChatMsgsDoc extends iChatMsgs, Document {}
export interface iChatRulesDoc extends iChatRules, Document {}
export interface iChatDoc extends iChat, Document {}

export interface iMsgBody {
  msg: string;
  msgId: string;
  senderName: string;
  senderId: string;
  timeReceived: number;
}
