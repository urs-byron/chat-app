import { iMsgBody } from "./msgList.model";

export const relationType: {
  contact: "contact";
  mute: "mute";
  block: "block";
} = {
  contact: "contact",
  mute: "mute",
  block: "block",
};

export const contactAct: { archive: "archive"; block: "block"; mute: "mute" } =
  {
    archive: "archive",
    block: "block",
    mute: "mute",
  };

export const chatType: iChatType = {
  user: "user",
  group: "group",
};

export interface iChatType {
  user: "user";
  group: "group";
}

export interface iSearchValues {
  pattern: string;
  type: 0 | 1;
  skip: number;
  cnt: number;
}

export interface iSearchItem {
  accnt_id: string;
  act_name: string;
  availability: boolean;
}
export type iSearchItems = Array<iSearchItem>;

export interface iContactValue {
  accnt_id: string;
  accnt_name: string;
}

export interface iRelationAct {
  recipientId: string;
  userAction: "archive" | "block" | "mute";
  actionValue: boolean;
}

export type topMsgsAggregateItem = Record<"top", iMsgBody>;
export type topMsgsAggregate = topMsgsAggregateItem[];
