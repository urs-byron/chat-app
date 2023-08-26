import { GenUtil } from "../util/gen.util";
import { iReqType } from "../models/gen.model";
import { Validate } from "../util/validation.util";
import { SocketMethods } from "../util/socket.util";
import { UserComponent } from "../components/user.comp";
import { PeerComponent } from "../components/peer.comp";
import { MessagesOptionsComponent } from "../components/msgsOpts.comp";
import { iRequest, iRequestApproveData } from "../models/user.model";

/** This class holds function  */
export class RequestEvents {
  private static inst: RequestEvents;

  private constructor() {}

  /**
   * This function entails the logic upon receiving a request post from socket.
   *
   * @param { iRequest } requestItem - request body object
   * @param { 0 | 1 } type - 0 outgoing | 1 incoming
   * @param { iReqType } reqType - 1 u2u (user-user) | 2 u2g (user-group) | 3 g2u (group-user)
   * @param { string } chatId - group chat id of the target group of request
   *
   * @static
   */
  static readonly postRequestR = (
    requestItem: iRequest,
    type: 0 | 1,
    reqType: iReqType,
    chatId: string
  ): void => {
    // OPTION FOR ADDING REQUEST VIA SOCKET IS NOT VIABLE SINCE SOCKET ID ARE FROM USER ID, CONNECTED UPON LOGGING IN, GROUP SOCKET IDS, MUST FIRST BE ESTABLISHED
    requestItem = GenUtil.requestStrIntToBool(requestItem);

    if (reqType === 1) {
      // if u2u, add request to user comp
      UserComponent.createRequest(
        requestItem,
        type === 0
          ? UserComponent.chatUserOutgoingWrap
          : UserComponent.chatUserIncomingWrap,
        type === 0 ? "outgoing" : "incoming"
      );
    } else if (reqType === 2) {
      /**
       * if u2g, either
       * - add request to user comp if outgoing
       * - add request to message comp if incoming
       */
      if (type === 0)
        UserComponent.createRequest(
          requestItem,
          UserComponent.chatUserOutgoingWrap,
          "outgoing"
        );
      else
        MessagesOptionsComponent.createRequest(
          requestItem,
          MessagesOptionsComponent.getMsgOptsIncomingWrap(),
          "incoming",
          chatId
        );
    } else {
      /**
       * if g2u,
       * - add request to message comp if outgoing
       * - add request to user comp if incoming
       */
      if (type === 0)
        MessagesOptionsComponent.createRequest(
          requestItem,
          MessagesOptionsComponent.getMsgOptsOutgoingWrap(),
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

  /**
   * This function entails the logic upon receiving a request patch from socket.
   *
   * @param { string } requestItemId - account id of the other party of request
   * @param { 0 | 1 } type - 0 outgoing | 1 incoming
   * @param { iRequestApproveData } approveData - new request status and key relation item of the other party of request
   * @param { iReqType } reqType - 1 u2u (user-user) | 2 u2g (user-group) | 3 g2u (group-user)
   * @param { string } chatId - group chat id of the target group of request
   *
   * @static
   */
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

      // joins room of the new connected peer in socket
      SocketMethods.socket?.emit(
        SocketMethods.joinRoomEv,
        approveData.relItem.chat_id,
        (res: string) => {
          console.log(res);
        }
      );
    }
  };

  /**
   * This function returns a new or the first instance of the class.
   *
   * @returns { RequestEvents }
   *
   * @static
   */
  static getInst = (): RequestEvents => {
    if (!this.inst) this.inst = new RequestEvents();
    return this.inst;
  };
}
