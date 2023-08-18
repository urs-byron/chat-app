import { GenUtil } from "../util/gen.util";
import { tryCatch } from "../util/asyncWrap.util";
import { iMsgBody } from "../models/msgList.model";
import { Validate } from "../util/validation.util";
import { Component } from "./base.comp";
import { UserComponent } from "./user.comp";
import { SocketMethods } from "../util/socket.util";
import { iHttpResponse } from "../models/http.model";
import { iValidityType } from "../models/validity.model";
import { GroupComponent } from "./group.comp";
import { MessagesComponent } from "./msgs.comp";
import { iChatType, iRelBody } from "../models/gen.model";
import { iRelation, iUserObj } from "../models/user.model";
import { ErrorComponent as error } from "./error.comp";
import { httpGetTopMsg, httpGetUsers } from "../hooks/requests.hook";
import {
  httpPatchRelation,
  httpGetUserRelations,
} from "../hooks/requests.hook";
import {
  chatType,
  contactAct,
  iSearchItem,
  iRelationAct,
  iSearchItems,
  iSearchValues,
} from "../models/peer.model";

export class PeerComponent extends Component<HTMLDivElement, HTMLElement> {
  static instance: PeerComponent | null;

  private skip: number = 0;

  private chatUserWrap!: HTMLDivElement;
  private chatUserToggle!: HTMLDivElement;
  private chatPeerHeadings!: HTMLDivElement;
  private chatPeerLists!: HTMLDivElement;
  private chatSearchForm!: HTMLFormElement;
  private chatRemoveSearch!: HTMLButtonElement;
  private chatSearchTypes!: HTMLDivElement;
  private chatSearchInput!: HTMLInputElement;
  private chatSearchList!: HTMLDivElement;
  static chatPeerList: HTMLDivElement;
  static chatPeerRelationsInfo: Array<iRelation> = [];
  static chatPeerRelationsHTML: Array<HTMLDivElement> = [];

  // FOREIGN COMPONENT ELEMENT
  private chatApp!: HTMLDivElement;

  private constructor(private readonly userData: iUserObj) {
    super(".chat-peer-wrap", "peer-temp", "afterbegin");

    (async () => {
      try {
        await this.getUserContacts();
        this.configureComponent();
        this.renderComponent();
        this.connectToSocketRooms();
        // await this.fetchTopMsgs();
      } catch (err) {
        error.showComp(
          "ERROR: client is unable to request user relations",
          err
        );
      }
    })();
  }

  configureComponent(): void {
    this.chatUserWrap = document.querySelector(
      ".chat-user-wrap"
    )! as HTMLDivElement;
    this.chatUserToggle = document.querySelector(
      ".chat-user-toggle > i"
    )! as HTMLDivElement;
    this.chatPeerHeadings = document.querySelector(
      ".chat-lists-head"
    )! as HTMLDivElement;
    this.chatPeerLists = document.querySelector(
      ".chat-lists"
    )! as HTMLDivElement;
    this.chatSearchForm = document.querySelector(
      ".chat-search-form"
    )! as HTMLFormElement;
    this.chatRemoveSearch = document.querySelector(
      ".chat-remove-search"
    )! as HTMLButtonElement;
    this.chatSearchTypes = document.querySelector(
      ".chat-search-types"
    )! as HTMLDivElement;
    this.chatSearchInput = document.getElementById(
      "chat-search-input"
    )! as HTMLInputElement;
    this.chatSearchList = document.querySelector(
      ".chat-search-list"
    )! as HTMLDivElement;
    PeerComponent.chatPeerList = document.querySelector(
      ".chat-contact-list"
    )! as HTMLDivElement;

    this.chatApp = document.querySelector(".chat-app")! as HTMLDivElement;

    this.chatUserToggle.addEventListener("click", this.clickUserToggleHandler);
    this.chatRemoveSearch.addEventListener("click", this.removeSearchHandler);
    this.chatSearchInput.addEventListener("click", this.clickSearchHandler);
    this.chatSearchInput.addEventListener("input", this.submitSearchHandler);
    this.chatSearchForm.addEventListener("submit", this.submitSearchHandler);
    this.chatSearchTypes.addEventListener(
      "click",
      this.clickSearchTypesHandler
    );
    PeerComponent.chatPeerList.addEventListener(
      "click",
      this.clickPeerListHandler
    );

    document.addEventListener("click", this.undoEventClickHandler);
    document.addEventListener("keypress", this.undoEventKeyHandler);
  }
  renderComponent(): void {
    this.chatSearchTypes
      .querySelector(".chat-search-type-user")
      ?.classList.add("chat-search-type");
    this.chatSearchTypes.dataset.chatType = chatType.user;

    this.generateContactItems();
  }

  // ----------------------------
  // ------ EVENT HANDLERS ------
  // ----------------------------
  private clickUserToggleHandler = (e: Event): void => {
    this.chatUserWrap.classList.add("chat-user-show");
  };
  private removeSearchHandler = (e?: Event): void => {
    this.chatPeerHeadings.classList.remove("chat-lists-search");
    this.chatPeerLists.classList.remove("chat-lists-search");
    this.chatSearchForm.classList.remove("chat-search-form-search-state");
  };
  private clickSearchHandler = (e: Event): void => {
    // if search list is visible
    if (this.chatPeerHeadings.classList.contains("chat-lists-search")) {
      // if search input has value
      if (!this.chatSearchInput.value.length) {
        this.removeSearchHandler();
      }
    } else {
      this.chatPeerHeadings.classList.add("chat-lists-search");
      this.chatPeerLists.classList.add("chat-lists-search");
      this.chatSearchForm.classList.add("chat-search-form-search-state");
    }
  };
  private submitSearchHandler = async (e: Event): Promise<void> => {
    e.preventDefault();

    // DATA GATHERING
    const searchType: iChatType = this.chatSearchTypes.dataset
      .chatType! as iChatType;
    const skip: number = 0;

    const chatSearchValue: iSearchValues = {
      pattern: this.chatSearchInput.value.trim(),
      type: searchType === "user" ? 0 : 1,
      skip: skip,
    };

    // VALIDATION
    const searchValid = Validate.search(chatSearchValue, searchType);
    if (!searchValid.isValid) {
      return error.showComp(
        "ERROR: client search data is inavalid",
        searchValid.error
      );
    }

    if (chatSearchValue.pattern.length === 0) {
      this.chatSearchList.innerHTML = "";
      return;
    }

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetUsers, chatSearchValue);
    } catch (err) {
      return error.showComp(
        `ERROR: client is unable to request for user search`,
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server is unable to process user search`,
      `server responded with an error upon client's request for user search`
    );
    if (!httpValid) return;

    // PROCESS
    this.chatSearchList.innerHTML = "";
    const searchItems: iSearchItems = response.data.data;
    if (
      searchItems &&
      typeof searchItems === "object" &&
      searchItems.length > 0
    ) {
      // HTTP RESPONSE PROCESSING
      this.generateSearchItems(searchItems, searchType);
    }
  };
  private clickSearchTypesHandler = (e: Event): void => {
    const target = e.target as HTMLButtonElement;

    target.classList.contains("chat-search-type")
      ? target.classList.remove("chat-search-type")
      : null;

    target.nextElementSibling
      ? target.nextElementSibling!.classList.remove("chat-search-type")
      : target.previousElementSibling!.classList.remove("chat-search-type");

    target.classList.add("chat-search-type");
    this.chatSearchTypes.dataset.chatType = target.dataset.chatType;
  };
  private clickSearchItemHandler = (e: Event): void => {
    const target = e.currentTarget as HTMLElement;

    let chatId: string = "";
    let peerFlag: boolean = false;
    PeerComponent.chatPeerRelationsInfo.map((rel: iRelation) => {
      if (rel.accnt_id === target.dataset.userId!) {
        chatId = rel.chat_id;
        peerFlag = true;
      }
    });

    MessagesComponent.getInstance(
      this.userData.act_id.accnt_id,
      target.dataset.userId!,
      target.querySelector("h3")!.textContent!,
      chatId,
      peerFlag,
      target.dataset.chatType as "user" | "group",
      false,
      peerFlag
    );
  };
  private undoEventClickHandler = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;

    // if clicked element is not "chat-search-input" or search-types button
    if (e.type === "click") {
      if (
        e.button === 0 &&
        target !== this.chatSearchInput &&
        !target.classList.contains("chat-search-type-group") &&
        !target.classList.contains("chat-search-type-user")
      ) {
        if (
          // if search head & list are open
          this.chatPeerHeadings.classList.contains("chat-lists-search") &&
          // if search input has value
          !this.chatSearchInput.value.length
        ) {
          this.removeSearchHandler();
        }
      }
    }
  };
  private undoEventKeyHandler = (e: KeyboardEvent): void => {
    // if (
    //   e.type === "keypress" &&
    //   e.key === "Enter" &&
    //   this.chatApp.classList.contains("chat-app-user-state")
    // )
    //   e.preventDefault();
  };
  private clickPeerItemHandler = (e: MouseEvent) => {
    const target = (e.currentTarget as HTMLElement).parentElement!;

    MessagesComponent.getInstance(
      this.userData.act_id.accnt_id,
      target.dataset.userId!,
      target.querySelector("h3")!.textContent!,
      target.dataset.chatId!,
      true,
      target.dataset.chatType as "user" | "group",
      false,
      true
    );
  };
  private clickPeerListHandler = (e: MouseEvent): void => {
    let target = e.target as HTMLElement;

    if (target.classList.contains("chat-contact-tooltip")) {
      // if target clicked is the icon instead of the tooltip area, change target to parent
      if (target.classList.contains("fa-ellipsis-vertical")) {
        target = target.parentElement as HTMLElement;
      }

      const action = target.querySelector(
        ".chat-contact-tooltip-content"
      ) as HTMLElement;

      if (action.classList.contains("chat-contact-tooltip-show")) {
        action.classList.remove("chat-contact-tooltip-show");
      } else {
        const actions = [
          ...PeerComponent.chatPeerList.querySelectorAll(
            ".chat-contact-tooltip-content"
          ),
        ] as Array<HTMLDivElement>;

        actions.length > 0
          ? actions.forEach((action) => {
              action.classList.remove("chat-contact-tooltip-show");
            })
          : null;

        action.classList.add("chat-contact-tooltip-show");
      }
    }
  };
  static readonly clickContactActionHandler = async (
    e: MouseEvent
  ): Promise<void> => {
    // DATA GATHERING
    const target = e.target as HTMLElement;
    const action = target.dataset.contactAct! as "archive" | "block" | "mute";
    let response!: iHttpResponse;
    let relActValid!: iValidityType;

    const t = target.parentElement?.parentElement?.parentElement!;
    const relationAct: iRelationAct = {
      recipientId: t.dataset.userId!,
      userAction: action,
      // CONTACT TOOLTIPS WILL ALWAYS HAVE A VALUE OF TRUE
      actionValue: true,
    };

    // VALIDATION
    relActValid = Validate.relationAction(relationAct);
    if (!relActValid.isValid) {
      return error.showComp(
        "ERROR: User data for requesting user relation action is invalid",
        relActValid.error
      );
    }

    // ARCHIVE
    // --- temporarily hide chat item element
    if (action === "archive") {
      PeerComponent.chatPeerList.removeChild(t);
      return;
    }

    // HTTP REQUEST
    try {
      response = await tryCatch(httpPatchRelation, relationAct);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to request relation action",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server is unable to process request for user action`,
      `server responded with an error upon client's request for relation action`
    );
    if (!httpValid) return;

    // HTTP RESPONSE PROCESSING
    const item: iRelation = {
      accnt_id: t.dataset.userId!,
      accnt_name: [...t.children][0].querySelector("h3")?.textContent!,
      type: t.dataset.chatType! as "user" | "group",
      chat_id: "pseudo",
      admin: false,
      archive: t.dataset.isArchived === "true" ? true : false,
      block: t.dataset.isBlocked === "true" ? true : false,
      mute: t.dataset.isMuted === "true" ? true : false,
      bump: 0,
    };

    if (action === "block" && item.type === "group") {
      let gs = JSON.parse(
        sessionStorage.getItem(GroupComponent.grpSessionStoreName)!
      ) as iRelation[];
      gs = gs.filter((g) => item.accnt_id !== g.accnt_id);
      sessionStorage.removeItem(GroupComponent.grpSessionStoreName);
      sessionStorage.setItem(
        GroupComponent.grpSessionStoreName,
        JSON.stringify(gs)
      );
    }

    if (action === "mute") {
      //  MUTE
      //  --- erase chat item message display from muting party
      const p = t.querySelector("p")!;
      p.textContent = "-----";

      UserComponent.createMuteBlockItem(
        item,
        UserComponent.chatUserMutesWrap,
        0
      );
    } else {
      // BLOCK
      // --- unable to accept | receiver message from both parties
      // --- not searchable by both parties

      UserComponent.createMuteBlockItem(
        item,
        UserComponent.chatUserBlocksWrap,
        1
      );

      // PeerComponent.chatPeerList.removeChild(t);
    }

    // DELETE ACTION OPTION
    target.parentElement?.removeChild(target);
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  private async getUserContacts(): Promise<void> {
    // DATA GATHERING
    const relBody = this.createRelBody();

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetUserRelations, relBody);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to request user relations",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server is unable to process request for user relations`,
      `server responded with an error upon client's request for user relations`
    );
    if (!httpValid) return;

    // RESPONSE PROCESSING
    let rel: iRelation;
    for (rel of response.data.data) {
      PeerComponent.chatPeerRelationsInfo.push(
        GenUtil.relationStrIntToBool(rel) as iRelation
      );
    }
  }
  private connectToSocketRooms(): void {
    const chatIds = PeerComponent.chatPeerRelationsInfo.map(
      (rel) => rel.chat_id
    );

    SocketMethods.socket?.emit(
      SocketMethods.joinRoomsEv,
      chatIds,
      (res: any) => {
        console.log(res);
      }
    );
  }
  private generateSearchItems(
    userItems: iSearchItems,
    type: "user" | "group"
  ): void {
    let user: iSearchItem;
    for (user of userItems) {
      this.createSearchItem(user, type);
    }
  }
  private createSearchItem(user: iSearchItem, type: iChatType) {
    // DATA GATHERING
    const userValid = Validate.searchItem(user);

    // VALIDATION
    if (!userValid.isValid) {
      return error.showComp(
        "ERROR: search item data is invalid",
        userValid.error
      );
    }

    // PROCESSING
    const searchItem: HTMLDivElement = document.createElement(
      "div"
    )! as HTMLDivElement;
    const userH3: HTMLHeadingElement = document.createElement(
      "h3"
    )! as HTMLHeadingElement;
    const userName: Text = document.createTextNode(user.act_name)! as Text;

    searchItem.classList.add("chat-search-item");
    searchItem.dataset.userId = user.accnt_id;
    searchItem.dataset.chatType = type;
    searchItem.dataset.availability = `${user.availability}`;

    userH3.appendChild(userName);
    searchItem.appendChild(userH3);
    searchItem.addEventListener("click", this.clickSearchItemHandler);

    this.chatSearchList.insertAdjacentElement("beforeend", searchItem);
  }
  private generateContactItems(): void {
    let item: iRelation;

    for (item of PeerComponent.chatPeerRelationsInfo) {
      PeerComponent.createRelationItem(item);
    }

    if (PeerComponent.chatPeerRelationsInfo.length) {
      const firstRelation = PeerComponent.chatPeerRelationsInfo[0];

      MessagesComponent.getInstance(
        this.userData.act_id.accnt_id,
        firstRelation.accnt_id,
        firstRelation.accnt_name,
        firstRelation.chat_id,
        true,
        firstRelation.type,
        false,
        true
      );
    }
  }
  static readonly createRelationItem = (
    item: iRelation
  ): HTMLDivElement | void => {
    item = GenUtil.relationStrIntToBool(item) as iRelation;
    const userValid = Validate.contactItem(item);

    // if (!userValid.isValid) {
    //   return error.showComp(
    //     "ERROR: contact item data is invalid",
    //     userValid.error
    //   );
    // }

    // item wrapper
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-contact-item");
    itemWrap.dataset.userId = item.accnt_id;
    itemWrap.dataset.chatId = item.chat_id;
    itemWrap.dataset.isMuted = `${item.mute}`;
    itemWrap.dataset.isBlocked = `${item.block}`;
    itemWrap.dataset.isArchived = `${item.archive}`;
    itemWrap.dataset.chatType = item.type;

    // item main
    //// item main wrap
    const itemNameWrap = document.createElement("div");
    itemNameWrap.classList.add("chat-contact-info");
    //// item main name
    const itemName = document.createElement("h3");
    itemName.textContent = item.accnt_name;
    //// item main content --------------- EDIT
    const itemText = document.createElement("p");

    if (item.mute) itemText.textContent = `------`;
    else itemText.textContent = `Greet your new peer.`;

    itemNameWrap.appendChild(itemName);
    itemNameWrap.appendChild(itemText);

    // item tooltip
    const itemTooltipWrap = document.createElement("div");
    itemTooltipWrap.classList.add("chat-contact-tooltip");

    //// item tooltip icon
    const itemTooltip = document.createElement("i");
    itemTooltip.classList.add("fa-solid", "fa-ellipsis-vertical");
    //// item tooltip content
    const itemTooltipContext = document.createElement("div");
    itemTooltipContext.classList.add("chat-contact-tooltip-content");

    if (!item.block) {
      const itemTooltipBlock = document.createElement("p");
      itemTooltipBlock.textContent = contactAct.block;
      itemTooltipBlock.dataset.contactAct = contactAct.block;
      itemTooltipContext.appendChild(itemTooltipBlock);
    }
    if (!item.mute) {
      const itemTooltipMute = document.createElement("p");
      itemTooltipMute.textContent = contactAct.mute;
      itemTooltipMute.dataset.contactAct = contactAct.mute;
      itemTooltipContext.appendChild(itemTooltipMute);
    }

    const itemTooltipArchive = document.createElement("p");
    itemTooltipArchive.textContent = contactAct.archive;
    itemTooltipArchive.dataset.contactAct = contactAct.archive;
    itemTooltipContext.appendChild(itemTooltipArchive);
    itemTooltipContext.addEventListener(
      "click",
      this.clickContactActionHandler
    );

    itemTooltipWrap.appendChild(itemTooltip);
    itemTooltipWrap.appendChild(itemTooltipContext);

    itemWrap.appendChild(itemNameWrap);
    itemWrap.appendChild(itemTooltipWrap);
    itemNameWrap.addEventListener("click", this.instance!.clickPeerItemHandler);

    this.chatPeerList.appendChild(itemWrap);

    this.chatPeerRelationsHTML.push(itemWrap);

    return itemWrap;
  };
  private createRelBody(): iRelBody {
    return {
      contactType: "contact",
      chatType: "user",
      groupId: null,
      skip: this.skip,
    };
  }
  static readonly updatePeerListHTML = (rel: iRelation, msg?: iMsgBody) => {
    const vRelInfo = this.searchPeerInfo(rel.chat_id);
    let vRelHTML: HTMLDivElement;
    let withinList: boolean;

    if (vRelInfo && "chat_id" in vRelInfo) {
      withinList = true;
      // if rel is within peerInfo, fetch present representing HTML
      vRelHTML = this.searchPeerHTML(rel.chat_id)!;

      // if rel not atop peerList, remove rel from peerList & peerInfo
      if (this.chatPeerRelationsHTML[0] !== vRelHTML) {
        this.chatPeerRelationsHTML = this.chatPeerRelationsHTML.filter(
          (html: HTMLDivElement) => html.dataset.chatId !== rel.chat_id
        );
        this.chatPeerRelationsInfo = this.chatPeerRelationsInfo.filter(
          (relInfo: iRelation) => relInfo.chat_id !== rel.chat_id
        );
      }
    } else {
      withinList = false;
      // if rel is not within peerInfo, create representing HTML
      vRelHTML = this.createRelationItem(rel)!;
    }

    // if called from new msg, add message
    if (msg !== null) {
      const p = vRelHTML.querySelector("h3 + p")!;
      p.textContent =
        GenUtil.milliToTime(msg?.timeReceived!) + " - " + msg?.msg!;
    }

    // if rel not atop peerList
    if (this.chatPeerRelationsHTML[0] !== vRelHTML) {
      // place it at the peerList's & peerInfo's beginning
      this.chatPeerRelationsHTML.unshift(vRelHTML);
      this.chatPeerRelationsInfo.unshift(rel);

      // place it at the peerList's HTML beginning
      this.chatPeerList.removeChild(vRelHTML);
      this.chatPeerList.prepend(vRelHTML);
    }
  };
  static readonly searchPeerInfo = (id: string): iRelation | undefined => {
    const t: iRelation | undefined = PeerComponent.chatPeerRelationsInfo.find(
      (rel: iRelation) => rel.chat_id === id
    );

    return t;
  };
  static readonly searchPeerHTML = (id: string): HTMLDivElement | void => {
    let html;
    this.chatPeerRelationsHTML.forEach((h: HTMLDivElement) => {
      if (h.dataset.chatId === id) {
        html = h;
      }
    });

    return html;
  };
  private readonly fetchTopMsgs = async () => {
    let response!: iHttpResponse;
    let h: HTMLDivElement;

    for (h of PeerComponent.chatPeerRelationsHTML) {
      try {
        response = await tryCatch(httpGetTopMsg, h.dataset.chatId);
      } catch (err) {
        // return error.showComp(
        error.showComp(
          "ERROR: client is unable to fetch top chat message",
          err
        );
      }

      // VALIDATION: HTTP RESPONSE
      const httpValid = Validate.httpRes(
        response,
        `server error occured`,
        `client responded with an error for upon request for top chat message`
      );

      // if (!httpValid) return;

      h.querySelector("p")!.textContent = (response.data.data as iMsgBody).msg;
    }
  };

  static readonly getInstance = (
    deleteInstance: boolean,
    userObj: iUserObj
  ): PeerComponent | null => {
    if (!deleteInstance) {
      if (!this.instance) this.instance = new PeerComponent(userObj);
    } else {
      this.instance = null;
      this.chatPeerRelationsInfo.length = 0;
      this.chatPeerRelationsHTML.length = 0;
    }

    return this.instance;
  };
}
