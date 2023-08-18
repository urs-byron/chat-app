import { GenUtil } from "../util/gen.util";
import { Validate } from "../util/validation.util";
import { UserComponent } from "../components/user.comp";
import { PeerComponent } from "../components/peer.comp";
import { iRequest, iRequestApproveData } from "../models/user.model";

export class RequestEvents {
  private static inst: RequestEvents;

  private constructor() {}

  // DATA TYPE GUIDE
  // arg1
  // iRequest
  // arg2
  // 0 --- outgoing
  // 1 --- incoming
  static readonly postRequestR = (requestItem: iRequest, type: 0 | 1) => {
    // OPTION FOR ADDING REQUEST VIA SOCKET IS NOT VIABLE SINCE SOCKET ID ARE FROM USER ID, CONNECTED UPON LOGGING IN, GROUP SOCKET IDS, MUST FIRST BE ESTABLISHED
    requestItem = GenUtil.requestStrIntToBool(requestItem);

    if (requestItem.isGroup) return;
    console.log(requestItem);
    UserComponent.createRequest(
      requestItem,
      type === 0
        ? UserComponent.chatUserOutgoingWrap
        : UserComponent.chatUserIncomingWrap,
      type === 0 ? "outgoing" : "incoming"
    );
  };

  static readonly patchRequestR = (
    requestItemId: string,
    type: 0 | 1,
    approveData: iRequestApproveData
  ): void => {
    if (approveData.relItem.type === "user")
      UserComponent.deleteRequest(requestItemId, type);

    if (
      Validate.approveData(approveData).isValid &&
      Validate.contactItem(approveData.relItem).isValid
    ) {
      PeerComponent.updatePeerListHTML(approveData.relItem);
      console.log(approveData);
    }
  };

  static getInst = (): RequestEvents => {
    if (!this.inst) this.inst = new RequestEvents();
    return this.inst;
  };
}
