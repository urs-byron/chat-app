import { GenUtil } from "../util/gen.util";
import { tryCatch } from "../util/asyncWrap.util";
import { Validate } from "../util/validation.util";
import { Component } from "./base.comp";
import { httpGetGroup } from "../hooks/requests.hook";
import { iHttpResponse } from "../models/http.model";
import { iValidityType } from "../models/validity.model";
import { SocketMethods } from "../util/socket.util";
import { ErrorComponent as error } from "./error.comp";
import { iChatType, iRequestBody, iStrBool } from "../models/gen.model";
import {
  iRelation,
  iRequest,
  iRequestActions,
  requestActions,
} from "../models/user.model";

export class MessagesOptionsComponent extends Component<
  HTMLDivElement,
  HTMLElement
> {
  static instance: MessagesOptionsComponent | null;
  static chatMsgsOpts: HTMLDivElement;
  private msgOptsMembership!: HTMLDivElement;
  static msgOptsIncomingWrap: HTMLDivElement;
  static msgOptsOutgoingWrap: HTMLDivElement;
  static msgOptsAdminsgWrap: HTMLDivElement;
  static msgOptsMembersWrap: HTMLDivElement;

  private msgOptsHeads!: HTMLDivElement[];

  // COMPONENT FETCHED DATA
  private msgGrpInfo!: any;
  static sType: iChatType;
  static sChatId: string;

  private constructor(
    private readonly peerId: string,
    private readonly peerName: string,
    private readonly chatId: string,
    private readonly type: iChatType,
    private readonly availability: boolean,
    private readonly fromPeer: boolean
  ) {
    super(".chat-msgs", "msgs-opts-temp", "afterbegin");
    (async () => {
      if (this.type === "group" && this.fromPeer) await this.getGroup(peerId);

      this.configureComponent();
      this.renderComponent();
    })();
  }

  configureComponent(): void {
    MessagesOptionsComponent.sType = this.type;
    MessagesOptionsComponent.sChatId = this.chatId;

    Object.freeze(MessagesOptionsComponent.sType);
    Object.freeze(MessagesOptionsComponent.sChatId);

    this.msgOptsHeads = [
      ...document.querySelectorAll(".chat-msg-opts-head"),
    ]! as HTMLDivElement[];
    this.msgOptsMembership = document.querySelector(
      "#chat-msg-opts-memberships"
    )! as HTMLDivElement;
    MessagesOptionsComponent.msgOptsIncomingWrap = document.querySelector(
      ".chat-msg-opts-incoming-wrap"
    ) as HTMLDivElement;
    MessagesOptionsComponent.msgOptsOutgoingWrap = document.querySelector(
      ".chat-msg-opts-outgoing-wrap"
    ) as HTMLDivElement;
    MessagesOptionsComponent.msgOptsAdminsgWrap = document.querySelector(
      ".chat-msg-opts-admins-wrap"
    ) as HTMLDivElement;
    MessagesOptionsComponent.msgOptsMembersWrap = document.querySelector(
      ".chat-msg-opts-members-wrap"
    ) as HTMLDivElement;

    if (this.type === "group")
      this.msgOptsMembership.addEventListener("click", this.clickGroupRequest);

    this.chatToggleUserSection();
  }
  renderComponent(): void {
    const msgOptsHTML = [...this.wrapperElement.children][0];

    if (this.fromPeer && this.type === "user") {
      msgOptsHTML.innerHTML = "Chat settings is only available for group chats";
      return;
    } else if (!this.fromPeer) {
      msgOptsHTML.innerHTML =
        "Chat settings is only available for related peers";
      return;
    }

    this.generateRequests();
    this.generateAdmins();
    this.generateMembers();
  }

  // --------------------------
  // ----- EVENT HANDLERS -----
  // --------------------------
  private chatToggleUserSection = (): void => {
    this.msgOptsHeads.forEach((head: HTMLDivElement) => {
      head.addEventListener("click", this.clickMsgOptsSectionHandler);
    });
  };
  private clickMsgOptsSectionHandler = (e: Event): void => {
    const headIcon: HTMLElement = (
      e.target as HTMLHeadingElement
    ).querySelector("i")! as HTMLElement;
    const headSibling: HTMLElement = (e.target as HTMLElement)
      .nextElementSibling! as HTMLElement;

    headIcon.classList.toggle("chat-msg-opts-head-toggled");
    headSibling.classList.toggle("chat-msg-opts-content-toggle");
  };
  private clickGroupRequest = (e: MouseEvent): void => {
    // DATA GATHERING
    const target = e.target as HTMLElement;
    const reqBody = this.createRequestBody(
      this.peerId,
      target.parentElement?.parentElement?.dataset.userId as string
    );
    const action = target.dataset.requestAction as iRequestActions;

    if (!action) return;

    // VALIDATION
    const requestValid = Validate.patchRequestData(reqBody, action);
    if (!requestValid.isValid) {
      console.error(`ERROR: client data for group request action is invalid`);
      console.error(requestValid.error);
      return;
    }

    // SOCKET REQUEST
    if (target.classList.contains("request-action")) {
      SocketMethods.socket?.emit(SocketMethods.patchRequestEv, reqBody, action);
    }
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  private readonly getGroup = async (id: string) => {
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetGroup, id);
    } catch (err) {
      return error.showComp("ERROR: client is unable to fetch group data", err);
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server error occured`,
      `client responded with an error for upon request for group information`
    );

    if (!httpValid) return;

    // HTTP RESPONSE PROCESSING
    this.msgGrpInfo = response.data.data;
  };
  private generateRequests() {
    if (
      !this.msgGrpInfo ||
      typeof this.msgGrpInfo !== "object" ||
      Object.keys(this.msgGrpInfo).length < 1
    )
      return;

    const incoming = this.msgGrpInfo.requests.incoming;
    const outgoing = this.msgGrpInfo.requests.outgoing;

    let item: iRequest;

    for (item of incoming) {
      MessagesOptionsComponent.createRequest(
        item,
        MessagesOptionsComponent.msgOptsIncomingWrap,
        "incoming"
      );
    }

    for (item of outgoing) {
      MessagesOptionsComponent.createRequest(
        item,
        MessagesOptionsComponent.msgOptsOutgoingWrap,
        "outgoing"
      );
    }
  }
  static readonly createRequest = (
    item: iRequest,
    wrapper: HTMLDivElement,
    type: "incoming" | "outgoing"
  ): void => {
    item = GenUtil.requestStrIntToBool(item) as iRequest;

    const requestValid: iValidityType = Validate.requestItem(
      item,
      wrapper,
      type
    );

    if (!requestValid.isValid) {
      return error.showComp(
        "ERROR: Request item data is invalid",
        requestValid.error
      );
    }

    const itemWrap = document.createElement("div") as HTMLDivElement;
    const itemName = document.createElement("p") as HTMLParagraphElement;
    const itemActions = document.createElement("p") as HTMLParagraphElement;
    let itemCancel!: HTMLElement;
    let itemApprove!: HTMLElement;
    let itemReject!: HTMLElement;

    if (type === "outgoing") {
      itemCancel = document.createElement("i") as HTMLElement;

      itemWrap.classList.add("chat-msg-opts-outgoing-item");
      itemName.textContent = item.accnt_name;
      itemCancel.classList.add("fa-solid", "fa-xmark", "request-action");
      itemCancel.dataset.requestAction = requestActions.cancel;

      itemActions.appendChild(itemCancel);
    } else if (type === "incoming") {
      itemApprove = document.createElement("i") as HTMLElement;
      itemReject = document.createElement("i") as HTMLElement;

      itemWrap.classList.add("chat-msg-opts-incoming-item");
      itemName.textContent = item.accnt_name;
      itemApprove.classList.add("fa-solid", "fa-check", "request-action");
      itemApprove.dataset.requestAction = requestActions.approve;
      itemReject.classList.add("fa-solid", "fa-xmark", "request-action");
      itemReject.dataset.requestAction = requestActions.reject;

      itemActions.appendChild(itemApprove);
      itemActions.appendChild(itemReject);
    }

    itemWrap.dataset.userId = item.accnt_id;
    itemWrap.dataset.isGroup = item.isGroup ? `true` : `false`;
    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemActions);

    wrapper.appendChild(itemWrap);

    // HTML TEMPLATE - incoming request item
    // <div class='chat-msg-opts-incoming-item'>
    //   <p>incoming member request</p>
    //   <p>
    //     <i class='fa-solid fa-check'></i>
    //     <i class='fa-solid fa-xmark'></i>
    //   </p>
    // </div>;

    // HTML TEMPLATE - outgoing request item
    // <div class='chat-msg-opts-outgoing-item'>
    //   <p>outgoing member request</p>
    //   <p>
    //     <i class='fa-solid fa-xmark'></i>
    //   </p>
    // </div>;
  };
  private generateAdmins() {
    const admins = this.msgGrpInfo.relations as iRelation[];
    let admin: iRelation;

    for (admin of admins) {
      admin = GenUtil.relationStrIntToBool(admin);
      if (!admin.admin) continue;

      MessagesOptionsComponent.createAdmin(
        admin,
        MessagesOptionsComponent.msgOptsAdminsgWrap
      );
    }
  }
  static readonly createAdmin = (item: iRelation, wrap: HTMLDivElement) => {
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-msg-opts-admin-item");

    const itemName = document.createElement("p");
    itemName.textContent = item.accnt_name;

    itemWrap.appendChild(itemName);
    wrap.appendChild(itemWrap);

    // HTML TEMPLATE - admin item
    // <div class='chat-msg-opts-admin-item'>
    //   <p>admin name</p>
    // </div>;
  };
  private generateMembers() {
    const members = this.msgGrpInfo.relations as iRelation[];
    let member: iRelation;

    for (member of members) {
      member = GenUtil.relationStrIntToBool(member);
      if (member.admin) continue;

      MessagesOptionsComponent.createMember(
        member,
        MessagesOptionsComponent.msgOptsMembersWrap
      );
    }
  }
  static readonly createMember = (item: iRelation, wrap: HTMLDivElement) => {
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-msg-opts-member-item");

    const itemName = document.createElement("p");
    itemName.textContent = item.accnt_name;

    const itemActions = document.createElement("p");
    const iAdmin = document.createElement("i");
    iAdmin.classList.add("fa-solid", "fa-crown");
    const iMute = document.createElement("i");
    iMute.classList.add("fa-solid", "fa-comment-slash");
    const iBlock = document.createElement("i");
    iBlock.classList.add("fa-solid", "fa-user-slash");

    // itemActions.appendChild(iMute);
    // itemActions.appendChild(iBlock);
    itemActions.appendChild(iAdmin);

    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemActions);

    wrap.appendChild(itemWrap);

    // HTML TEMPLATE = member item
    // <div class='chat-msg-opts-member-item'>
    //   <p>member name</p>
    //   <p>
    //     <i class='fa-solid fa-crown'></i>
    //     <i class='fa-solid fa-comment-slash'></i>
    //     <i class='fa-solid fa-user-slash'></i>
    //   </p>
    // </div>;
  };
  private createRequestBody(groupId: string, receiverId: string): iRequestBody {
    return {
      type: 3,
      recipientId: receiverId,
      groupId: groupId,
    };
  }
  static readonly deleteRequest = (requestItemId: string, chatId: string) => {
    if (this.sType === "user" || MessagesOptionsComponent.sChatId !== chatId)
      return;

    (
      [
        ...MessagesOptionsComponent.msgOptsOutgoingWrap.children,
      ] as HTMLDivElement[]
    ).forEach((html: HTMLDivElement) => {
      if (html.dataset.userId === requestItemId)
        MessagesOptionsComponent.msgOptsOutgoingWrap.removeChild(html);
    });

    (
      [
        ...MessagesOptionsComponent.msgOptsIncomingWrap.children,
      ] as HTMLDivElement[]
    ).forEach((html: HTMLDivElement) => {
      if (html.dataset.userId === requestItemId)
        MessagesOptionsComponent.msgOptsIncomingWrap.removeChild(html);
    });
  };

  static readonly getInstance = (
    peerId: string,
    peerName: string,
    chatId: string,
    type: iChatType,
    availability: boolean,
    fromPeer: boolean,
    deleteInstance: boolean
  ): MessagesOptionsComponent | null => {
    if (!deleteInstance) {
      if (!this.instance) {
        this.instance = new MessagesOptionsComponent(
          peerId,
          peerName,
          chatId,
          type,
          availability,
          fromPeer
        );

        this.chatMsgsOpts = document.querySelector(
          ".chat-msg-opts"
        )! as HTMLDivElement;
      }
    } else {
      this.instance = null;
      this.chatMsgsOpts.innerHTML = "";
    }
    return this.instance;
  };
}
