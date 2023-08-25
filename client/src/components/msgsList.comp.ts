import { GenUtil } from "../util/gen.util";
import { tryCatch } from "../util/asyncWrap.util";
import { iMsgBody } from "../models/msgList.model";
import { Validate } from "../util/validation.util";
import { Component } from "./base.comp";
import { iRelation } from "../models/user.model";
import { httpGetMsgs } from "../hooks/requests.hook";
import { iChatReqBody } from "../models/chat.model";
import { PeerComponent } from "./peer.comp";
import { SocketMethods } from "../util/socket.util";
import { iHttpResponse } from "../models/http.model";
import { GroupComponent } from "./group.comp";
import { ErrorComponent as error } from "./error.comp";
import { iChatType, iRequestBody } from "../models/gen.model";

export class MessagesListComponent extends Component<
  HTMLDivElement,
  HTMLElement
> {
  private static instance: MessagesListComponent | null;
  private static chatMsgsList: HTMLDivElement;

  static chatMsgsListWrap: HTMLDivElement;
  private chatMsgHead!: HTMLDivElement;
  private chatMsgHeadName!: HTMLHeadingElement;
  private chatListGrpBtnWrap!: HTMLDivElement;
  private chatListGrpBtn!: HTMLElement;
  private static chatMsgBody: HTMLDivElement;
  private chatMsgsForms!: HTMLDivElement;
  private chatMsgRequest!: HTMLButtonElement;
  private chatMsgForm!: HTMLFormElement;
  private chatMsgModal!: HTMLFormElement;
  private modalGroupInput!: HTMLInputElement;

  private static readonly myMsgClass: string = "chat-msg-others";
  private static readonly peerMsgClass: string = "chat-msg-mine";
  private static readonly sessionStoreListKey: string = "msgList";
  private static sPeerId: string;
  private skip: number = 0;
  private skipCnt: 30 = 30;
  private msgsId: string | null = null;
  private msgsLists: Map<string, iMsgBody[]> = new Map();
  private msgsListCnt: number = 0;

  private constructor(
    private readonly userId: string,
    private readonly peerId: string,
    private readonly peerName: string,
    private readonly chatId: string,
    private readonly availability: boolean,
    private readonly type: iChatType,
    private readonly fromPeer: boolean
  ) {
    super(".chat-msgs", "msgs-list-temp", "afterbegin");

    (async () => {
      if (PeerComponent.searchPeerInfo(this.chatId) !== undefined) {
        const n = MessagesListComponent.getMsgListInfoCount(this.chatId);
        if (!n) await this.getMessages();
        else {
          this.msgsListCnt = n;
          const m = Math.floor(n / this.skipCnt);
          this.skip = m;
        }
      }

      this.configureComponent();
      this.renderComponent(
        userId,
        peerId,
        peerName,
        chatId,
        availability,
        type
      );
    })();
  }

  configureComponent(): void {
    MessagesListComponent.sPeerId = this.peerId;
    MessagesListComponent.chatMsgsListWrap = document.querySelector(
      ".chat-msg-body-wrap"
    )! as HTMLDivElement;
    MessagesListComponent.chatMsgsListWrap.dataset.chatId = this.chatId;
    MessagesListComponent.chatMsgBody = document.querySelector(
      "#chat-msg-body"
    )! as HTMLDivElement;
    this.chatMsgHead = document.querySelector(
      ".chat-msg-head"
    )! as HTMLHeadingElement;
    this.chatMsgHeadName = document.querySelector(
      ".chat-msg-head-name h2"
    )! as HTMLHeadingElement;
    this.chatListGrpBtnWrap = document.querySelector(
      ".chat-msg-head-opts-btn"
    )! as HTMLDivElement;
    this.chatListGrpBtn = document.querySelector(
      ".chat-msg-head-opts-btn i"
    )! as HTMLElement;
    this.chatMsgsForms = document.querySelector(
      ".chat-msg-forms"
    )! as HTMLDivElement;
    this.chatMsgRequest = document.querySelector(
      ".chat-msg-request"
    )! as HTMLButtonElement;
    this.chatMsgForm = document.querySelector(
      ".chat-msg-form"
    )! as HTMLFormElement;
    this.chatMsgModal = document.querySelector(
      ".chat-msg-group-modal"
    )! as HTMLFormElement;
    this.modalGroupInput = document.querySelector(
      ".chat-msg-group-new input"
    )! as HTMLInputElement;

    this.chatMsgRequest.addEventListener(
      "click",
      this.clickMsgBtnRequestHandler
    );
    this.chatMsgForm.addEventListener("submit", this.submitMessageHandler);
    MessagesListComponent.chatMsgsListWrap.addEventListener(
      "scroll",
      this.getMoreMessages
    );
  }
  renderComponent(
    userId: string,
    peerId: string,
    peerName: string,
    chatId: string,
    availability: boolean,
    type: "user" | "group"
  ): void {
    this.chatMsgsForms.dataset.peerId = peerId;
    this.chatMsgsForms.dataset.chatType = type;
    this.chatMsgHeadName.textContent = peerName;

    if (this.type === "group") {
      this.chatMsgHead.removeChild(this.chatListGrpBtnWrap);
    }

    if (!availability) {
      this.chatListGrpBtn.classList.add(
        "chat-msg-head-opts-btn-unavailable-state"
      );
      MessagesListComponent.chatMsgsListWrap.scrollTop =
        MessagesListComponent.chatMsgsListWrap.scrollHeight;
      this.chatMsgsForms.classList.add("chat-msg-form-request-state");
    } else {
      this.chatListGrpBtn.addEventListener(
        "click",
        this.clickMsgOptsBtnHandler
      );
    }

    if (type === "user") GroupComponent.getInstance(peerId, type, false);

    this.generateMsgItems(
      userId,
      JSON.parse(
        sessionStorage.getItem(
          MessagesListComponent.sessionStoreListKey + this.chatId
        )!
      )
    );

    MessagesListComponent.chatMsgsListWrap.scrollTop =
      MessagesListComponent.chatMsgsListWrap.scrollHeight;
  }

  // --------------------------
  // ------- GET | SET --------
  // --------------------------
  static readonly getChatMsgsListWrap = (): HTMLDivElement => {
    return this.chatMsgsListWrap;
  };
  static readonly getChatMsgBody = (): HTMLDivElement => {
    return this.chatMsgBody;
  };
  static readonly getMsgListInfoCount = (chatId: string): number => {
    const t = JSON.parse(
      sessionStorage.getItem(this.sessionStoreListKey + chatId)!
    );

    const n = t !== null && Array.isArray(t) && t.length ? t.length : 0;

    return n;
  };
  static readonly setMsgListInfo = (
    chatId: string,
    msg: iMsgBody | null,
    msgs: iMsgBody[] | null
  ): void => {
    // session item key name
    const keyName = this.sessionStoreListKey + chatId;

    // get session item
    const s = JSON.parse(sessionStorage.getItem(keyName)!) as iMsgBody[] | null;
    const sessionList =
      s === null || !Array.isArray(s) ? ([] as iMsgBody[]) : s;

    if (
      (msg === null || !("msg" in msg) || Object.keys(msg).length !== 5) &&
      (msgs === null || !Array.isArray(msgs) || !msgs.length)
    )
      return;

    // create temporary array with new msgs
    const a1 =
      msgs !== null && Array.isArray(msgs) && msgs.length
        ? [...sessionList, ...(msgs as iMsgBody[])]
        : [...sessionList];

    // add new msg to temporary array
    if (msg !== null && "msg" in msg && Object.keys(msg).length === 5)
      a1.unshift(msg);

    // set session item
    sessionStorage.setItem(keyName, JSON.stringify(a1));
  };
  public readonly incrMsgsListCnt = (incr: number = 1) => {
    this.msgsListCnt++;
  };

  // --------------------------
  // ----- EVENT HANDLERS -----
  // --------------------------
  private clickMsgOptsBtnHandler = (e: Event): void => {
    this.chatMsgModal.classList.toggle("chat-msg-group-modal-show-state");
    GroupComponent.emptyRequestStack();
  };
  private clickMsgBtnRequestHandler = (e: Event): void => {
    const reqBody: iRequestBody = MessagesListComponent.createRequestBody(
      this.chatMsgsForms.dataset.chatType as "user" | "group",
      this.peerId as string
    );

    SocketMethods.socket?.emit(SocketMethods.postRequestEv, reqBody);
  };
  private submitMessageHandler = (e: SubmitEvent): void => {
    e.preventDefault();
    const inputHMTL = (e.target as HTMLFormElement).querySelector(
      "input"
    )! as HTMLInputElement;

    const msgBody: iMsgBody = {
      msg: inputHMTL.value,
      msgId: crypto.randomUUID().replace(/-/g, ""),
      chatId: this.chatId,
      senderName: "You",
      senderId: this.userId,
      timeReceived: 0,
    };

    SocketMethods.socket!.emit(
      SocketMethods.postMessageEv,
      msgBody,
      this.peerId,
      this.type,
      (res: iMsgBody) => {
        if ("msg" in res) {
          MessagesListComponent.createMsgItem(
            res,
            MessagesListComponent.chatMsgBody,
            MessagesListComponent.chatMsgsListWrap,
            0
          );

          PeerComponent.updatePeerListHTML(
            { accnt_id: this.peerId, chat_id: res.chatId } as iRelation,
            res
          );

          this.msgsListCnt = this.msgsListCnt + 1;
          MessagesListComponent.setMsgListInfo(this.chatId, res, null);

          MessagesListComponent.chatMsgsListWrap.scrollTop =
            MessagesListComponent.chatMsgsListWrap.scrollHeight;
        } else
          error.showComp(
            "ERROR: server failed to send message",
            JSON.stringify(res)
          );
      }
    );

    inputHMTL.value = "";
  };
  private getMoreMessages = async (e: Event): Promise<void> => {
    // DATA FATHERING
    const t = e.target as HTMLDivElement;
    let response!: iHttpResponse;
    const skipChatReq = this.getChatReqBody();

    // VALIDATION: if scroll height is not at top, return
    if (t.scrollTop !== 0) return;

    // VALIDATION: if message items exceed starting skip item, return
    const listCnt = MessagesListComponent.getMsgListInfoCount(this.chatId);
    if (this.skip * this.skipCnt > listCnt) return;

    const currentScrolllHeight = t.scrollHeight;

    // VALIDATION: HTTP REQUEST
    try {
      response = await tryCatch(httpGetMsgs, skipChatReq);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to fetch chat messages",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server error occured`,
      `client responded with an error for upon request for chat messages`
    );
    if (!httpValid) return;

    // VALIDATION: check if response has additional data
    if (response.data.data === null) return;

    const msgs: iMsgBody[] = response.data.data.msgs;
    // VALIDATION: check if array has contents
    if (msgs === null || !Array.isArray(msgs) || !msgs.length) return;

    // PROCESS: add HTML message items
    this.generateMsgItems(this.userId, msgs as iMsgBody[]);

    // PROCESS: reverse received array
    // const revArrMsgs: iMsgBody[] = [];
    // let msg: iMsgBody;

    // for (msg of msgs) {
    //   revArrMsgs.unshift(msg);
    // }

    // PROCESS: +1 to skip
    this.skip++;
    // PROCESS: add list items count
    this.msgsListCnt = this.msgsListCnt + msgs.length;

    // PROCESS: update class message list
    // this.msgsLists.set(this.chatId, [
    //   ...this.msgsLists.get(this.chatId)!,
    //   ...revArrMsgs,
    // ]);

    // PROCESS: update session storage message list
    MessagesListComponent.setMsgListInfo(this.chatId, null, msgs);

    // PROCESS: maintain current scroll location
    t.scrollTop = t.scrollHeight - currentScrolllHeight;
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  private async getMessages(): Promise<void> {
    // DATA GATHERING
    let response!: iHttpResponse;
    const chatReqBody: iChatReqBody = this.getChatReqBody();

    // HTTP REQUEST: request for chat messages
    try {
      response = await tryCatch(httpGetMsgs, chatReqBody);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to fetch chat messages",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server error occured`,
      `client responded with an error for upon request for chat messages`
    );

    if (!httpValid) return;

    // HTTP RESPONSE PROCESSING
    // --- +1 for skip
    this.skip++;
    // --- store messageId
    this.msgsId = response.data.data.msgsId;

    // --- store chat messages as session storage
    // this.msgsLists.set(this.chatId, response.data.data.msgs);
    // sessionStorage.setItem(
    //   MessagesListComponent.sessionStoreListKey + this.chatId,
    //   JSON.stringify(response.data.data.msgs)
    // );

    if (
      response.data.data.msgs !== null &&
      Array.isArray(response.data.data.msgs) &&
      response.data.data.msgs.length
    )
      this.msgsListCnt = response.data.data.msgs.length;

    MessagesListComponent.setMsgListInfo(
      this.chatId,
      null,
      response.data.data.msgs as iMsgBody[]
    );
  }
  private readonly generateMsgItems = (userId: string, msgs: iMsgBody[]) => {
    let msg: iMsgBody;

    if (msgs === null || !Array.isArray(msgs) || !msgs.length) return;

    for (msg of msgs) {
      MessagesListComponent.createMsgItem(
        msg,
        MessagesListComponent.chatMsgBody,
        MessagesListComponent.chatMsgsListWrap,
        userId === msg.senderId ? 0 : 1,
        true
      );
    }
  };
  static createRequestBody(type: iChatType, receiverId: string): iRequestBody {
    return {
      type: type === "user" ? 1 : 2,
      recipientId: type === "user" ? receiverId! : null,
      groupId: type === "group" ? receiverId! : null,
    };
  }
  static readonly createMsgItem = (
    msg: iMsgBody,
    wrap: HTMLDivElement,
    chatMsgsListWrap: HTMLDivElement,
    // 0 - from client browser      1 - from other user(s)
    type: 0 | 1,
    isFetched: boolean = false
  ) => {
    if (msg.chatId !== MessagesListComponent.chatMsgsListWrap.dataset.chatId) {
      console.log(msg.chatId);
      return;
    }

    const msgWrapWrap = document.createElement("div");
    const msgWrap = document.createElement("div");

    const msgSender = document.createElement("div");
    msgSender.textContent = type ? msg.senderName : "You";
    msgSender.dataset.msgId = msg.msgId;
    const msgContent = document.createElement("p");
    msgContent.textContent = msg.msg;

    const msgTimeWrap = document.createElement("div");
    const msgTimeSub = document.createElement("sub");
    const msgTimeSubSub = document.createElement("sub");
    msgTimeSubSub.textContent = GenUtil.milliToTime(
      typeof msg.timeReceived !== "number"
        ? parseInt(msg.timeReceived)
        : msg.timeReceived
    );
    msgTimeSub.appendChild(msgTimeSubSub);
    msgTimeWrap.appendChild(msgTimeSub);

    msgWrap.appendChild(msgSender);
    msgWrap.appendChild(msgContent);
    msgWrap.appendChild(msgTimeWrap);

    msgWrapWrap.appendChild(msgWrap);

    msgWrapWrap.classList.add(type ? this.myMsgClass : this.peerMsgClass);

    if (isFetched) wrap.prepend(msgWrapWrap);
    else wrap.append(msgWrapWrap);

    // <div class="chat-msg-others">
    //   <div>
    //     <div>Sender</div>
    //     <p>Lorem ipsum dolor sit amet</p>
    //     <div>
    //       <sub><sub>9:00.AM</sub></sub>
    //     </div>
    //   </div>
    // </div>
    //
    // <div class="chat-msg-mine">
    //   <div>
    //     <div>Sender</div>
    //     <p>
    //       Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
    //       consectetur adipisicing elit. Eos placeat ipsam id eius
    //       debitis, natus eveniet maiores incidunt maxime nobis!
    //     </p>
    //     <div>
    //       <sup><sub>9:00.AM</sub></sup>
    //     </div>
    //   </div>
    // </div>
  };
  private getChatReqBody(): iChatReqBody {
    return {
      skip: this.skip,
      type: this.type,
      chatId: this.chatId,
      listCnt: this.msgsListCnt,
    };
  }

  static readonly init = (
    userId: string,
    peerId: string,
    peerName: string,
    chatId: string,
    availability: boolean,
    type: iChatType,
    fromPeer: boolean,
    deleteInstance: boolean
  ): MessagesListComponent | null => {
    if (!deleteInstance) {
      if (!this.instance) {
        this.instance = new MessagesListComponent(
          userId,
          peerId,
          peerName,
          chatId,
          availability,
          type,
          fromPeer
        );
        this.chatMsgsList = document.querySelector(
          ".chat-msg-list"
        )! as HTMLDivElement;
      }
    } else {
      if (type === "user") GroupComponent.getInstance(peerId, type, true);
      this.instance = null;
      this.chatMsgsList.innerHTML = "";
      this.chatMsgsListWrap;
      this.chatMsgBody;
    }
    return this.instance;
  };

  static readonly getInst = (): MessagesListComponent | null => {
    if (!this.instance) return null;
    return this.instance;
  };
}
