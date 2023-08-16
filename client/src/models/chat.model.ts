import { iChatType } from "./gen.model";

export interface iChatReqBody {
  skip: number;
  type: iChatType;
  chatId: string;
  listCnt?: number;
}
