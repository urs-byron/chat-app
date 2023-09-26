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

export interface iMsgBody {
  msg: string;
  msgId: string;
  chatId: string;
  senderName: string;
  senderId: string;
  timeReceived: number;
}

export interface iChatMsgs {
  str_id: string;
  list: iMsgBody[];
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

export type chatIdsAggregateProject = Record<"msgs_id", 0 | 1> &
  Record<string, any>;
export type chatIdsAggregateMatcher = Record<"chat_id", string>;
export type chatIdsAggregateMatcherArr = chatIdsAggregateMatcher[];
export type chatIdsAggregateRec = Record<"msgs_id", string>;
export type msgsIDsAggregate = Record<"str_id", string>[];
export type topMsgsAggregateItem = Record<"top", iMsgBody>;
export type topMsgsAggregate = topMsgsAggregateItem[];
