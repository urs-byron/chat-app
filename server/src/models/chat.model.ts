import { Model, Schema, model } from "mongoose";
import {
  iChat,
  iChatDoc,
  iChatMsgs,
  iChatRules,
  iChatMsgsDoc,
  iChatRulesDoc,
  iMsgBody,
} from "./chat.imodel";

const chatMsgSchema = new Schema<iMsgBody>({
  msg: { type: String, require: true },
  msgId: { type: String, require: true, index: true },
  chatId: { type: String, require: true },
  senderName: { type: String, require: true, index: true },
  senderId: { type: String, require: true },
  timeReceived: { type: Number, require: true, index: true },
});

const chatMsgsSchema = new Schema<iChatMsgs>({
  str_id: { type: String, require: true, index: true },
  list: [chatMsgSchema],

  count: { type: Number, require: false },
});
const chatRulesSchema = new Schema<iChatRules>({
  str_id: { type: String, require: true, index: true },
  list: [
    {
      value: { type: String, require: true },
      isRegex: { type: Boolean, require: false },
    },
  ],

  count: { type: Number, require: false },
});
const chatSchema = new Schema<iChat>({
  chat_id: { type: String, require: true, index: true },
  msgs_id: { type: String, require: true },
  rules_id: { type: String, require: true },
});

export const ChatMessages: Model<iChatMsgsDoc> = model<iChatMsgsDoc>(
  "chat-messages",
  chatMsgsSchema
);
export const ChatRules: Model<iChatRulesDoc> = model<iChatRulesDoc>(
  "chat-rules",
  chatRulesSchema
);
export const Chat: Model<iChatDoc> = model<iChatDoc>("chat", chatSchema);
