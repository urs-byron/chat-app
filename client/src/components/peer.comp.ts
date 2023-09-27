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
  topMsgsAggregate,
} from "../models/peer.model";

/**
 * This class holds functions which manage and render data related to the user peer(s)' and its data and HTML items.
 *
 * @extends Component
 */
export class PeerComponent extends Component<HTMLDivElement, HTMLElement> {
  private static instance: PeerComponent | null;

  private chatUserWrap!: HTMLDivElement;
  private chatUserToggle!: HTMLDivElement;
  private chatPeerHeadings!: HTMLDivElement;
  private chatPeerLists!: HTMLDivElement;
  private chatSearchForm!: HTMLFormElement;
  private chatRemoveSearch!: HTMLButtonElement;
  private chatSearchTypes!: HTMLDivElement;
  private chatSearchInput!: HTMLInputElement;
  private chatSearchList!: HTMLDivElement;
  private chatSearchListWrap!: HTMLDivElement;
  private static chatPeerList: HTMLDivElement;
  private chatPeerListWrap!: HTMLDivElement;

  /** array of peer list item data */
  private static chatPeerRelationsInfo: Array<iRelation> = [];
  /** array of peer list item HTML elements */
  private static chatPeerRelationsHTML: Array<HTMLDivElement> = [];

  /** skip counter for peer list pagination logic */
  private relSkip: number = 0;
  /** skip limit constant for peer list pagination logic */
  private relSkipConst: number = 15;
  /** HTML Peer Item count of retrieved top message for peer list pagination logic */
  private relTopCount: number = 0;
  /** skip counter for search list pagination logic */
  private searchSkip: number = 0;
  /** skip limit constant for search list pagination logic */
  private searchSkipConst: number = 15;
  /** skip full indicator for search list pagination logic */
  private searchFull: boolean = false;
  /** search item total count for search list pagination logic */
  private searchResults: number = 0;

  // FOREIGN COMPONENT ELEMENT
  private chatApp!: HTMLDivElement;

  /**
   * Upon instantiation, the constructor:
   * - immediately fetches for user connected peers
   * - renders data into corresponding HTML elements
   *
   * @param { iUserObj } userData - set of data retrieved from the server, specific for the logged user
   *
   * @constructor
   */
  private constructor(private readonly userData: iUserObj) {
    super(".chat-peer-wrap", "peer-temp", "afterbegin");

    (async () => {
      try {
        await this.getUserContacts();
        this.configureComponent();
        await this.renderComponent();
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
      ".chat-user-toggle > button"
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
    this.chatSearchListWrap = document.querySelector(
      ".chat-search-list-wrap"
    )! as HTMLDivElement;
    PeerComponent.chatPeerList = document.querySelector(
      ".chat-contact-list"
    )! as HTMLDivElement;
    this.chatPeerListWrap = document.querySelector(
      ".chat-contact-list-wrap"
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
      this.togglePeerTooltipHandler
    );
    this.chatSearchListWrap.addEventListener(
      "scroll",
      this.scrollBottomSearchList
    );
    this.chatPeerListWrap.addEventListener("scroll", this.scrollBottomPeerList);

    document.addEventListener("click", this.undoEventClickHandler);
    document.addEventListener("keypress", this.undoEventKeyHandler);

    this.connectToSocketRooms();
  }
  async renderComponent(): Promise<void> {
    this.chatSearchTypes
      .querySelector(".chat-search-type-user")
      ?.classList.add("chat-search-type");
    this.chatSearchTypes.dataset.chatType = chatType.user;

    await this.generateContactItems();
    this.createFirstPeerMsgComp();
  }

  // ----------------------------
  // ------ EVENT HANDLERS ------
  // ----------------------------

  /**
   * This callback listens to a click event, which upon doing so, instructs UI to make the user component visible.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickUserToggleHandler = (e: MouseEvent): void => {
    this.chatUserWrap.classList.add("chat-user-show");
  };

  /**
   * This function, upon invoking, modifies HTML lists' CSS classes to apply visibility to peer list alone.
   *
   * @param { MouseEvent } [e]
   *
   * @listens MouseEvent
   */
  private removeSearchHandler = (e?: MouseEvent): void => {
    this.chatPeerHeadings.classList.remove("chat-lists-search");
    this.chatPeerLists.classList.remove("chat-lists-search");
    this.chatSearchForm.classList.remove("chat-search-form-search-state");
  };

  /**
   * Upon callback, this function checks whether search list is visible, then hides it if so.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickSearchHandler = (e: MouseEvent): void => {
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

  /**
   * This function returns a search component summary object, reflecting of the current state of the search list, to be used in an HTTP request.
   *
   * @returns { iSearchValues }
   */
  private readonly createSearchReqObj = (): iSearchValues => {
    const searchType: iChatType = this.chatSearchTypes.dataset
      .chatType! as iChatType;
    const skip: number = this.searchSkip;

    return {
      pattern: this.chatSearchInput.value.trim(),
      type: searchType === "user" ? 0 : 1,
      skip: skip,
      cnt: this.searchResults,
    };
  };

  /**
   * Upon callback, this function:
   * - resets search related variables
   * - sends search related variables for new batch of search items
   *
   * @param { Event } e
   * @returns { Promise<void> }
   */
  private submitSearchHandler = async (e: Event): Promise<void> => {
    e.preventDefault();

    // PROCESS: reset search data
    this.searchSkip = 0;
    this.searchResults = 0;
    this.searchFull = false;

    // DATA GATHERING
    const chatSearchValue: iSearchValues = this.createSearchReqObj();

    // VALIDATION
    const searchValid = Validate.search(
      chatSearchValue,
      this.chatSearchTypes.dataset.chatType! as iChatType
    );
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

    // VALIDATION: returns
    if (this.searchFull) return;

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
      this.searchResults = this.searchResults + searchItems.length;
      this.searchSkip++;
      this.generateSearchItems(
        searchItems,
        this.chatSearchTypes.dataset.chatType! as iChatType
      );
    }

    if (!searchItems.length || searchItems.length < this.searchSkipConst)
      this.searchFull = true;
  };

  /**
   * Upon callback, this function sends search status summary for next batch of search items.
   *
   * @param { Event } e
   * @returns { Promise<void> }
   */
  private scrollBottomSearchList = async (e: Event): Promise<void> => {
    if (this.searchFull) return;

    const t = e.target as HTMLElement;

    if (t.scrollTop === t.scrollHeight - t.offsetHeight) {
      // DATA GATHERING
      const chatSearchValue: iSearchValues = this.createSearchReqObj();

      // VALIDATION
      const searchValid = Validate.search(
        chatSearchValue,
        this.chatSearchTypes.dataset.chatType! as iChatType
      );
      if (!searchValid.isValid) {
        return error.showComp(
          "ERROR: client search data is inavalid",
          searchValid.error
        );
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
      const searchItems: iSearchItems = response.data.data;
      if (
        searchItems &&
        typeof searchItems === "object" &&
        searchItems.length > 0
      ) {
        // HTTP RESPONSE PROCESSING
        this.searchSkip++;
        this.searchResults = this.searchResults + searchItems.length;
        this.generateSearchItems(
          searchItems,
          this.chatSearchTypes.dataset.chatType! as iChatType
        );
      }

      if (!searchItems.length || searchItems.length < this.searchSkipConst)
        this.searchFull = true;
    }
  };

  /**
   * Upon callback, this function modifies search type.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickSearchTypesHandler = (e: MouseEvent): void => {
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

  /**
   * Upon callback, this function calls for a new instance of the Message Component, corresponding the clicked peer | gorup target.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickSearchItemHandler = (e: MouseEvent): void => {
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

  /**
   * Upon callback, this function proceeds with a logic to decide whether the event can instruct the Peer Component to hide search list.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
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

  /**
   * Upon callback, this function prevents pressing 'Enter' key to hide search list.
   *
   * @param { KeyboardEvent } e
   *
   * @listens KeyboardEvent
   */
  private undoEventKeyHandler = (e: KeyboardEvent): void => {
    // if (
    //   e.type === "keypress" &&
    //   e.key === "Enter" &&
    //   this.chatApp.classList.contains("chat-app-user-state")
    // )
    //   e.preventDefault();
  };

  /**
   * Upon callback, this function calls for a new instance of the Message Component, corresponding the clicked peer | gorup target.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
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

  /**
   * Upon callback, this function either:
   * - hide visible peer item tooltip
   * - show a peer item tooltip
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private togglePeerTooltipHandler = (e: MouseEvent): void => {
    let target = e.target as HTMLElement;

    if (
      !target.classList.contains("chat-contact-tooltip") &&
      !target.classList.contains("fa-ellipsis-vertical")
    )
      return;

    // if target clicked is the icon instead of the tooltip area, change target to parent
    if (target.classList.contains("fa-ellipsis-vertical")) {
      target = target.parentElement as HTMLElement;
    }

    const action = target.querySelector(
      ".chat-contact-tooltip-content"
    ) as HTMLElement;

    if (action.classList.contains("chat-contact-tooltip-show")) {
      // remove a single visible tooltip
      action.classList.remove("chat-contact-tooltip-show");
    } else {
      const actions = [
        ...PeerComponent.chatPeerList.querySelectorAll(
          ".chat-contact-tooltip-content"
        ),
      ] as Array<HTMLDivElement>;

      // remove all visible tooltip
      actions.length > 0
        ? actions.forEach((action) => {
            action.classList.remove("chat-contact-tooltip-show");
          })
        : null;

      // apply visibility to clicked tooltip
      action.classList.add("chat-contact-tooltip-show");
    }
  };

  /**
   * Upon callback, this function
   * - requests an HTTP PATCH to the server to modify user relationship status from target peer
   * - modifies peer list item according to actiion taken
   *
   * @param { MouseEvent } e
   * @returns { Promise<void> }
   *
   * @listens MouseEvent
   *
   * @static
   */
  private static readonly clickContactActionHandler = async (
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

  /**
   * Upon callback, this function feeds a function with an array of peer item data and transform them into corresponding HTML elements.
   *
   * @param { Event } e
   * @returns { Promise<void> }
   *
   * @listens Event - scroll
   */
  private readonly scrollBottomPeerList = async (e: Event): Promise<void> => {
    const t = e.target as HTMLElement;
    const relCount = PeerComponent.chatPeerRelationsInfo.length;

    if (t.scrollTop === t.scrollHeight - t.offsetHeight && relCount) {
      this.generateContactItems();
    }
  };

  /**
   * This function returns a set of starting and ending numbers for the pagination logic of the peer list.
   *
   * @param { number } skip - current skip status of the list
   * @param { number } [k] - initially, skip limit constant of the peer list
   * @returns { { start: number; end: number } | void }
   */
  private readonly getStartEnd = (
    skip: number,
    k: number = this.relSkipConst
  ): { start: number; end: number } | void => {
    if (typeof skip !== "number" || typeof k !== "number") return;

    return { start: skip ? skip * k : 0, end: (skip ? (skip + 1) * k : k) - 1 };
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------

  /**
   * This function
   * - requests an HTTP POST to the server to retrieve user contacts.
   * - stores retrieved data within class method
   *
   * @returns { Promise<void> }
   */
  private async getUserContacts(): Promise<void> {
    // DATA GATHERING
    const relBody = this.createRelReqBody();

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetUserRelations, relBody);
    } catch (err) {
      console.log(err);
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

  /** This function connects client to other user based on data about connected peers. */
  private connectToSocketRooms(): void {
    const chatIds = PeerComponent.chatPeerRelationsInfo
      .filter((rel: iRelation) => !rel.block)
      .map((rel: iRelation) => rel.chat_id);

    SocketMethods.socket?.emit(
      SocketMethods.joinRoomsEv,
      chatIds,
      (res: any) => {
        console.log(res);
      }
    );
  }

  /**
   * This function loops over search item data and transforms them into HTML elements.
   *
   * @param { iSearchItems } userItems - array of search item data
   * @param { iChatType } type
   */
  private generateSearchItems(userItems: iSearchItems, type: iChatType): void {
    let user: iSearchItem;
    for (user of userItems) {
      this.createSearchItem(user, type);
    }
  }

  /**
   * This function
   * - creates a corresponding HTML element from the user object
   * - attaches them to the search list element
   *
   * @param { iSearchItems } user - user object
   * @param { iChatType } type - user chat type
   */
  private createSearchItem(user: iSearchItem, type: iChatType): void {
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

  /** This function loops over peer item data and transforms them into HTML elements. */
  private generateContactItems = async (): Promise<void> => {
    const { start, end } = this.getStartEnd(this.relSkip)!;
    let i: number = start;
    if (start > PeerComponent.chatPeerRelationsInfo.length) return;
    const slicedArr = PeerComponent.chatPeerRelationsInfo.slice(
      this.relSkip === 0 ? 0 : start - 1,
      end + 1
    );

    let item: iRelation;
    let HTMLArr = [];
    for (item of slicedArr) {
      if (i === end) break;
      HTMLArr.push(PeerComponent.createRelationItemHTML(item));
      i++;
    }

    await this.fetchTopMsgs(HTMLArr);

    this.relSkip++;
  };

  /**
   * This function creates and returns an HTML element from a user relation data about a peer.
   *
   * @param { iRelation } item - user's relation object to describe peer
   * @returns { HTMLDivElement | void }
   *
   * @static
   */
  private static readonly createRelationItemHTML = (
    item: iRelation
  ): HTMLDivElement => {
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
    //// item main icon
    const itemNameIcon = document.createElement("div");
    itemNameIcon.textContent = item.accnt_name[0];
    itemNameIcon.classList.add("chat-contact-icon");

    //// item main wrap
    const itemNameWrap = document.createElement("div");
    itemNameWrap.classList.add("chat-contact-info");
    //// item main name
    const itemName = document.createElement("h3");
    itemName.textContent = item.accnt_name;
    //// item main content --------------- EDIT
    const itemText = document.createElement("p");

    const itemTextTime = document.createElement("span");
    const itemTextMsg = document.createElement("span");

    if (item.mute) {
      itemTextTime.textContent = `---`;
      itemTextMsg.textContent = ` - ------`;
    } else {
      itemTextTime.textContent = `---`;
      itemTextMsg.textContent = ` - Say Hi!`;
    }

    // fist msg info is time
    itemText.appendChild(itemTextTime);
    // last msg info is message
    itemText.appendChild(itemTextMsg);
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

    itemWrap.appendChild(itemNameIcon);
    itemWrap.appendChild(itemNameWrap);
    itemWrap.appendChild(itemTooltipWrap);
    itemNameWrap.addEventListener("click", this.instance!.clickPeerItemHandler);

    this.chatPeerList.appendChild(itemWrap);

    this.chatPeerRelationsHTML.push(itemWrap);

    return itemWrap;
  };

  /** This function creates an object for an HTTP POST for peer list items retrieval.
   *
   * @returns { iRelBody }
   */
  private createRelReqBody(): iRelBody {
    return {
      contactType: "contact",
      chatType: "user",
      groupId: null,
      skip: this.relSkip,
    };
  }

  /** This function creates an instance of the peer lists first item if available. */
  private readonly createFirstPeerMsgComp = () => {
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
  };

  /**
   * This function modifies a peer item HTML, from:
   * - adding an item to peer list
   * - message information
   * - reordering peer list items
   *
   * @param { iRelation } rel - user data on a peer about their relation
   * @param { iMsgBody } [msg] - optional message item
   */
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
      vRelHTML = this.createRelationItemHTML(rel)!;
    }

    // if called from new msg, add message
    if (msg !== undefined && msg !== null && "msg" in msg) {
      PeerComponent.updateMsg(vRelHTML, msg);
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

  /**
   * This function returns matching peer item object from class stored peer items data.
   *
   * @param { string } id - account id or group id of a user peer
   * @returns { iRelation | undefined }
   *
   * @static
   */
  static readonly searchPeerInfo = (id: string): iRelation | undefined => {
    const t: iRelation | undefined = PeerComponent.chatPeerRelationsInfo.find(
      (rel: iRelation) => rel.chat_id === id
    );

    return t;
  };

  /**
   * This function returns matching peer item HTML element from class tracked peer HTML array.
   *
   * @param { string } id - account id or group id of a user peer
   * @returns { DivElement | undefined }
   *
   * @static
   */
  static readonly searchPeerHTML = (id: string): HTMLDivElement | void => {
    let html;
    this.chatPeerRelationsHTML.forEach((h: HTMLDivElement) => {
      if (h.dataset.chatId === id) {
        html = h;
      }
    });

    return html;
  };

  /**
   * This function
   * - loops over a certain range of peer item HTML
   * - fetch its most recent message, if available
   */
  private readonly fetchTopMsgs = async (slicedArrHTML: HTMLDivElement[]) => {
    const chatIds: Array<string | undefined> = slicedArrHTML
      .map((h: HTMLDivElement): string | undefined => h.dataset.chatId)
      .filter(
        (s: string | undefined) => s !== undefined && s !== null && s.length > 0
      );

    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetTopMsg, chatIds);
    } catch (err) {
      // return error.showComp(
      error.showComp("ERROR: client is unable to fetch top chat message", err);
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server error occured`,
      `client responded with an error for upon request for top chat message`
    );

    if (!httpValid) return;

    const data = response.data.data as topMsgsAggregate;
    if (data === undefined || data === null || !data.length) return;

    this.relTopCount += data.length;
    PeerComponent.updateMsgs(slicedArrHTML, data);
  };

  /**
   * This function requests an HTTP GET to the server to retrieve its most recent message.
   *
   * @param { HTMLDivElement } htmlArr - peer item html as source of chat ID
   * @param { any } data -
   *
   * @static
   */
  private static readonly updateMsgs = (
    HTMLArr: HTMLDivElement[],
    data: topMsgsAggregate
  ): void => {
    for (const msg of data) {
      for (const html of HTMLArr) {
        if (msg.top.chatId === html.dataset.chatId) {
          PeerComponent.updateMsg(html, msg.top);
        }
      }
    }
  };

  /**
   * This function updates an HTML message info elements.
   *
   * @param { HTMLDivElement } html - HTML element to be modified
   * @param { iMsgBody } data - message data
   *
   * @static
   */
  private static readonly updateMsg = (
    html: HTMLDivElement,
    data: iMsgBody
  ) => {
    const t = html.querySelector("span:first-child")!;
    t.textContent = GenUtil.milliToTime(+data.timeReceived);
    const m = html.querySelector("span:last-child")!;
    m.textContent = " - ".concat(data.msg.slice(0, 10)).concat(" ...");
  };

  /**
   * This function either returns
   * - anew or old instance of the class
   * - null if the class is instructed to be deleted
   *
   * @param { boolean } deleteInstance - flag indicating whether this class will be deleted
   * @param { iUserObj } userObj - user data
   * @returns { PeerComponent | null }
   */
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
