import { GenUtil } from "../util/gen.util";
import { Validate } from "../util/validation.util";
import { UserComponent } from "../components/user.comp";
import { PeerComponent } from "../components/peer.comp";
import { iRequest, iRequestApproveData } from "../models/user.model";
import { SocketMethods } from "../util/socket.util";
import { iReqType } from "../models/gen.model";
import { GroupComponent } from "../components/group.comp";
import { MessagesOptionsComponent } from "../components/msgsOpts.comp";

export class RequestEvents {
  private static inst: RequestEvents;

  private constructor() {}

  // DATA TYPE GUIDE
  // arg1
  // iRequest
  // arg2
  // 0 --- outgoing
  // 1 --- incoming
  static readonly postRequestR = (
    requestItem: iRequest,
    type: 0 | 1,
    reqType: iReqType,
    chatId: string
  ) => {
    // OPTION FOR ADDING REQUEST VIA SOCKET IS NOT VIABLE SINCE SOCKET ID ARE FROM USER ID, CONNECTED UPON LOGGING IN, GROUP SOCKET IDS, MUST FIRST BE ESTABLISHED
    requestItem = GenUtil.requestStrIntToBool(requestItem);

    if (reqType === 1) {
      UserComponent.createRequest(
        requestItem,
        type === 0
          ? UserComponent.chatUserOutgoingWrap
          : UserComponent.chatUserIncomingWrap,
        type === 0 ? "outgoing" : "incoming"
      );
    } else if (reqType === 2) {
      if (type === 0)
        UserComponent.createRequest(
          requestItem,
          UserComponent.chatUserOutgoingWrap,
          "outgoing"
        );
      else
        MessagesOptionsComponent.createRequest(
          requestItem,
          MessagesOptionsComponent.msgOptsIncomingWrap,
          "incoming",
          chatId
        );
    } else {
      if (type === 0)
        MessagesOptionsComponent.createRequest(
          requestItem,
          MessagesOptionsComponent.msgOptsOutgoingWrap,
          "outgoing",
          chatId
        );
      else
        UserComponent.createRequest(
          requestItem,
          UserComponent.chatUserIncomingWrap,
          "incoming"
        );
    }
  };

  static readonly patchRequestR = (
    requestItemId: string,
    type: 0 | 1,
    approveData: iRequestApproveData,
    reqType: iReqType,
    chatId: string
  ): void => {
    if (approveData.relItem.type === "user")
      UserComponent.deleteRequest(requestItemId, type);

    if (reqType === 2 || reqType === 3)
      MessagesOptionsComponent.deleteRequest(requestItemId, chatId);

    if (
      Validate.approveData(approveData).isValid &&
      Validate.contactItem(approveData.relItem).isValid
    ) {
      PeerComponent.updatePeerListHTML(approveData.relItem);
      SocketMethods.socket?.emit(
        SocketMethods.joinRoomEv,
        approveData.relItem.chat_id,
        (res: string) => {
          console.log(res);
        }
      );
    }
  };

  static getInst = (): RequestEvents => {
    if (!this.inst) this.inst = new RequestEvents();
    return this.inst;
  };
}
