import { iMsgBody } from "../models/msgList.model";
import { iRelation } from "../models/user.model";
import { PeerComponent } from "../components/peer.comp";
import { MessagesListComponent } from "../components/msgsList.comp";

export class MessageEvent {
  private static inst: MessageEvent;

  private constructor() {}

  static readonly postMessageR = (data: iMsgBody): void => {
    MessagesListComponent.createMsgItem(
      data,
      MessagesListComponent.getChatMsgBody(),
      MessagesListComponent.getChatMsgsListWrap(),
      // 0 - from client browser      1 - from other user(s)
      1
    );

    PeerComponent.updatePeerListHTML(
      { accnt_id: data.senderId, chat_id: data.chatId } as iRelation,
      data
    );

    if (MessagesListComponent.getInst() !== null)
      MessagesListComponent.getInst()!.incrMsgsListCnt();

    MessagesListComponent.setMsgListInfo(
      MessagesListComponent.getChatMsgsListWrap().dataset.chatId!,
      data,
      null
    );
  };

  static readonly getInst = (): MessageEvent => {
    if (!this.inst) this.inst = new MessageEvent();
    return this.inst;
  };
}
