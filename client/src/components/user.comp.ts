import { GenUtil } from "../util/gen.util";
import { tryCatch } from "../util/asyncWrap.util";
import { Validate } from "../util/validation.util";
import { Component } from "./base.comp";
import { AppComponent } from "./app.comp";
import { iRelationAct } from "../models/peer.model";
import { PeerComponent } from "./peer.comp";
import { AuthComponent } from "./auth.comp";
import { SocketMethods } from "../util/socket.util";
import { iHttpResponse } from "../models/http.model";
import { iValidityType } from "../models/validity.model";
import { MessagesComponent } from "./msgs.comp";
import { iRequestBody, iStrBool } from "../models/gen.model";
import { ErrorComponent as error } from "./error.comp";
import {
  iRequest,
  iRelation,
  iPrivacyRequest,
  iUserPrivacyProp,
  iUserObj,
} from "../models/user.model";
import {
  iUser,
  userSettings,
  iUserPassword,
  requestActions,
  iRequestActions,
} from "../models/user.model";
import {
  httpGetUser,
  httpGetLogout,
  httpPatchRelation,
  httpPutUserRequest,
  httpPutUserPrivacy,
  httpPutUserPassword,
} from "../hooks/requests.hook";

/**
 * This class holds functions w/c manages and renders data regarding user settings and requests.
 *
 * @extends Component
 */
export class UserComponent extends Component<HTMLDivElement, HTMLElement> {
  private static instance: UserComponent | null;

  private appComp: AppComponent = AppComponent.getInstance();
  private chatUserWrap!: HTMLDivElement;
  private chatPeerWrap!: HTMLDivElement;
  private chatUserRemove!: HTMLElement;
  private chatUserName!: HTMLHeadingElement;
  private chatUserHeads!: Array<HTMLHeadingElement>;
  private chatUserInvites!: HTMLDivElement;
  static chatUserIncomingWrap: HTMLDivElement;
  static chatUserOutgoingWrap: HTMLDivElement;
  static chatUserMutesWrap: HTMLDivElement;
  static chatUserBlocksWrap: HTMLDivElement;
  private chatUserPublic!: HTMLParagraphElement;
  private chatUserAvailability!: HTMLParagraphElement;
  private chatUserForm!: HTMLFormElement;
  private chatUserPassword!: HTMLInputElement;
  private chatUserRePassword!: HTMLInputElement;
  private chastUserLogout!: HTMLDivElement;

  // COMPONENT FETCHED DATA

  /** @type { iUser } - data regarding logged user's security, requests, & relations*/
  private chatUserInfo!: iUser;

  /**
   * Upon instantiation, the constructor immediately sends request to the server for user data.
   *
   * @constructor
   */
  private constructor() {
    super(".chat-user-wrap", "user-temp", "afterbegin");

    this.configureComponent();

    (async () => {
      try {
        await this.getUser();
        this.renderComponent();
      } catch (err) {
        error.showComp(`client is unable to get user data`, err);
      }
    })();
  }

  configureComponent(): void {
    this.chatUserRemove = document.querySelector(
      ".chat-user-name > i"
    )! as HTMLElement;
    this.chatUserName = document.querySelector(
      ".chat-user-name > h2"
    )! as HTMLHeadingElement;
    this.chatUserWrap = document.querySelector(
      ".chat-user-wrap"
    )! as HTMLDivElement;
    this.chatPeerWrap = document.querySelector(
      ".chat-peer-wrap"
    )! as HTMLDivElement;
    this.chatUserHeads = [
      ...document.querySelectorAll(".chat-user-head"),
    ]! as Array<HTMLHeadingElement>;
    this.chatUserInvites = document.querySelector(
      ".chat-user-invitations"
    )! as HTMLDivElement;
    UserComponent.chatUserIncomingWrap = document.querySelector(
      ".chat-user-incoming-items-wrap"
    )! as HTMLDivElement;
    UserComponent.chatUserOutgoingWrap = document.querySelector(
      ".chat-user-outgoing-items-wrap"
    )! as HTMLDivElement;
    // UserComponent.chatUserMutesWrap = document.querySelector(
    //   ".chat-user-mutes"
    // )! as HTMLDivElement;
    UserComponent.chatUserMutesWrap = document.querySelector(
      ".chat-user-mute-items-wrap"
    )! as HTMLDivElement;
    // UserComponent.chatUserBlocksWrap = document.querySelector(
    //   ".chat-user-blocks"
    // )! as HTMLDivElement;
    UserComponent.chatUserBlocksWrap = document.querySelector(
      ".chat-user-block-items-wrap"
    )! as HTMLDivElement;
    this.chatUserPublic = document.querySelector(
      ".chat-user-security-public"
    )! as HTMLParagraphElement;
    this.chatUserAvailability = document.querySelector(
      ".chat-user-security-availability"
    )! as HTMLParagraphElement;
    this.chatUserForm = document.querySelector(
      ".chat-user-set-password"
    )! as HTMLFormElement;
    this.chatUserPassword = document.querySelector(
      "#set-password"
    )! as HTMLInputElement;
    this.chatUserRePassword = document.querySelector(
      "#set-rePassword"
    )! as HTMLInputElement;
    this.chastUserLogout = document.querySelector(
      ".chat-user-logout"
    )! as HTMLDivElement;

    this.chatUserRemove.addEventListener("click", this.chatUserRemoveHandler);
    this.chatUserPublic.addEventListener("click", this.clickUserPublicHandler);
    this.chatUserAvailability.addEventListener(
      "click",
      this.clickUserAvailabilityHandler
    );
    this.chatUserForm.addEventListener("submit", this.submitPasswordHandler);
    this.chatUserInvites.addEventListener("click", this.clickUserRequest);
    this.chastUserLogout.addEventListener("click", this.userLogoutHandler);
    this.chatToggleUserSection();
  }
  renderComponent(): void {
    this.chatUserName.textContent = this.chatUserInfo.accnt_name;
    this.chatUserPublic.dataset.settingsProperty = userSettings.public;
    this.chatUserPublic.dataset.settingsPublic = `${this.chatUserInfo.privacy.public}`;
    this.chatUserAvailability.dataset.settingsProperty =
      userSettings.availability;
    this.chatUserAvailability.dataset.settingsAvailability = `${this.chatUserInfo.privacy.availability}`;

    this.generateRequests();
    this.generateMuteBlockItem();
  }

  // --------------------------
  // ---- EVENT HANDLERS -----
  // --------------------------

  /**
   * Upon callback, this function hides user component.
   *
   * @param { MouseEvent } [e]
   *
   * @listens MouseEvent
   */
  private chatUserRemoveHandler = (e?: MouseEvent): void => {
    this.chatUserWrap.classList.remove("chat-user-show");
  };

  /** This function assigns event listeners to user component sections' heads. */
  private chatToggleUserSection = (): void => {
    this.chatUserHeads.forEach((head) => {
      head.addEventListener("click", this.clickUserSectionHandler);
    });
  };

  /**
   * Upon callback, this function toggles visibility of clicked user component section.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickUserSectionHandler = (e: MouseEvent): void => {
    const headIcon: HTMLElement = (
      e.target as HTMLHeadingElement
    ).querySelector("i")! as HTMLElement;
    const headSibling: HTMLElement = (e.target as HTMLElement)
      .nextElementSibling! as HTMLElement;

    headIcon.classList.toggle("chat-user-head-toggled");
    headSibling.classList.toggle("chat-user-content-toggle");
  };

  /**
   * This callback listens to click events which will emit a socket event to the server to respond to peer | group requests.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickUserRequest = (e: MouseEvent): void => {
    // DATA GATHERING
    const target = e.target as HTMLElement;
    const reqBody = this.createRequestBody(
      target.parentElement?.parentElement?.dataset.isGroup as iStrBool,
      target.parentElement?.parentElement?.dataset.userId as string
    );
    const action = target.dataset.requestAction as iRequestActions;

    if (!action) return;

    // VALIDATION
    const requestValid = Validate.patchRequestData(reqBody, action);
    if (!requestValid.isValid) {
      console.error(`ERROR: client data for user request action is invalid`);
      console.error(requestValid.error);
      return;
    }

    // SOCKET REQUEST
    if (
      target.classList.contains("request-action") &&
      target.parentElement?.parentElement
    ) {
      SocketMethods.socket?.emit(SocketMethods.patchRequestEv, reqBody, action);

      // try {
      //   response = await tryCatch(httpPutUserRequest, reqBody, action);

      //   if (response.data) {
      //     if (
      //       response.data.statusCode >= 200 &&
      //       response.data.statusCode < 400
      //     ) {
      //       return;
      //     } else {
      //       console.error(
      //         "ERROR: server responded with an error upon client's request for user-to-user contact request"
      //       );
      //       console.error(response.data);
      //       return;
      //     }
      //   } else {
      //     console.error(
      //       "ERROR: server is unable to process user request fro user-to-user contact request"
      //     );
      //     console.error(response.err);
      //     return;
      //   }
      // } catch (err) {
      //   console.error(
      //     `ERROR: client is unable to request user-to-user contact request`
      //   );
      //   console.error(err);
      // }
    }
  };

  /**
   *  Upon callback, this function
   * - requests an HTTP PATCH to the server to modify user relationship status from target peer
   * - modifies peer list item according to actiion taken
   *
   * @param { MouseEvent } e
   * @returns { Promise<void> }
   *
   * @listens MouseEvent
   */
  private static readonly clickUserMuteBlock = async (
    e: MouseEvent
  ): Promise<void> => {
    // DATA GATHERING
    const target = e.target as HTMLElement;
    const action: "mute" | "block" = (target.parentElement as HTMLElement)
      .dataset.action! as "mute" | "block";

    const relationAct: iRelationAct = {
      recipientId: (target.parentElement as HTMLElement).dataset
        .userId! as string,
      userAction: action,
      actionValue: false,
    };

    // VALIDATION
    const relActValid = Validate.relationAction(relationAct);
    if (!relActValid.isValid) {
      return error.showComp(
        "ERROR: client request data for user relation patch is invalid",
        relActValid.error
      );
    }

    // HTTP REQUEST
    // PATCH to user relations
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPatchRelation, relationAct);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to request for patching of user relations",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const resValid = Validate.httpRes(
      response,
      "server is unable to process user's request for patching relations",
      "server responded with an error upon user's request for patching relations"
    );
    if (!resValid) return;

    /*
    MUTE | BLOCK
    --- if unmuted peer list item is within visible peerlist
    --- sort by bump, then add item
    */

    // REMOVE MUTE | BLOCK ITEM
    target.parentElement?.parentElement?.parentElement?.removeChild(
      target.parentElement?.parentElement
    );

    // SEARCH FOR RELATION ITEM IN PEER COMPONENT
    // --- IF VISIBLE, ACT, OTHERWISE, IGNORE
    const relItem = PeerComponent.searchPeerHTML(
      (target.parentElement as HTMLElement).dataset.userId as string
    );
  };

  /**
   * Upon callback, this function requests an HTTP PUT to the server to modify their publicity setting.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickUserPublicHandler = async (e: MouseEvent): Promise<void> => {
    // DATA GATHERING
    const userPrivacy: iPrivacyRequest = {
      property: this.chatUserPublic.dataset
        .settingsProperty as iUserPrivacyProp,
      value:
        (this.chatUserPublic.dataset.settingsPublic as iStrBool) === "true"
          ? "false"
          : "true",
    };

    // VALIDATION
    const privacyDataValid = Validate.privacyData(
      userPrivacy,
      userSettings.public
    );
    if (!privacyDataValid.isValid) {
      return error.showComp(
        `ERROR: privacy data for user publicity configuration request is invalid`,
        privacyDataValid.error
      );
    }

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPutUserPrivacy, userPrivacy);
    } catch (err) {
      return error.showComp(
        `ERROR: client is unable to send request for user privacy configuration`,
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const resValid = Validate.httpRes(
      response,
      "server is unable to process client's request for privacy configuration",
      "server responded with an error upon client's request for user privacy configuration"
    );
    if (!resValid) return;

    // HTTP REPONSE PROCESSING
    const publicValue =
      (this.chatUserPublic.dataset.settingsPublic as iStrBool) === "true"
        ? "false"
        : "true";
    this.chatUserPublic.dataset.settingsPublic = publicValue;
  };

  /**
   * Upon callback, this function requests an HTTP PUT to the server to modify their availability setting.
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   */
  private clickUserAvailabilityHandler = async (
    e: MouseEvent
  ): Promise<void> => {
    // DATA GATHERING
    const userPrivacy: iPrivacyRequest = {
      property: this.chatUserAvailability.dataset
        .settingsProperty as iUserPrivacyProp,
      value:
        (this.chatUserAvailability.dataset.settingsAvailability as iStrBool) ===
        "true"
          ? "false"
          : "true",
    };

    // VALIDATION
    const privacyDataValid = Validate.privacyData(
      userPrivacy,
      userSettings.availability
    );
    if (!privacyDataValid.isValid) {
      return error.showComp(
        `ERROR: privacy data for user availability configuration request is invalid`,
        privacyDataValid.error
      );
    }

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPutUserPrivacy, userPrivacy);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to send request for publicity configuration",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const resValid = Validate.httpRes(
      response,
      "server is unable to process client's request for privacy configuration",
      "server responded with an error upon client's request for user privacy configuration"
    );
    if (!resValid) return;

    // HTTP RESPONSE PROCESSING
    const publicValue =
      (this.chatUserAvailability.dataset.settingsAvailability as iStrBool) ===
      "true"
        ? "false"
        : "true";
    this.chatUserAvailability.dataset.settingsAvailability = publicValue;
  };

  /**
   * Upon callback, this function requests an HTTP PUT to the server to modify their account password.
   *
   * @param { SubmitEvent } e
   *
   * @listens SubmitEvent
   */
  private submitPasswordHandler = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    // DATA GATHERING
    const passwordSet: iUserPassword = this.getPasswordForm();
    const passwordValid: iValidityType =
      Validate.changePasswordForm(passwordSet);

    // VALIDATION
    if (!passwordValid.isValid) {
      return error.showComp(
        `ERROR: password data for user security configuration request is invalid`,
        passwordValid.error
      );
    }

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPutUserPassword, passwordSet);
    } catch (err) {
      return error.showComp(
        `ERROR: something went wrong upon client's request for password change`,
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const resValid = Validate.httpRes(
      response,
      "server is unable to process user logout",
      "server responded with an error is unable to send request for user logout"
    );
    if (!resValid) return;

    try {
      await this.userLogoutHandler();
    } catch (err) {
      return error.showComp(
        `ERROR: client is unable to send request for user logout`,
        err
      );
    }
    this.clearPasswordForm();
  };

  /**
   * Upon callback, this function:
   * - requests HTTP GET to the server to initiate account logout
   * - destroy any other connections
   * - deletes related HTML elements
   *
   * @param { MouseEvent } [e]
   * @returns { Promise<void> }
   */
  private userLogoutHandler = async (e?: MouseEvent): Promise<void> => {
    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetLogout);
    } catch (err) {
      return error.showComp(
        `ERROR: client is unable to send request for user logout`,
        err
      );
    }

    // VALIDATION
    const resValid = Validate.httpRes(
      response,
      "server is unable to process user logout",
      `server responded with an error upon client's request for user logout`
    );
    if (!resValid) return;

    SocketMethods.destroy();
    sessionStorage.clear();
    this.appComp.appAuth();

    const authComp = AuthComponent.getInstance();
    authComp.enableLogElements();
    authComp.disableRegElements();
    authComp.showLogForm();

    this.deleteUserComponents();
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------

  /**
   * This function
   * - requests an HTTP GET to the server
   * - stores received user data to class
   *
   * @returns { Promise<void> }
   */
  private async getUser(): Promise<void> {
    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetUser);
    } catch (err) {
      return error.showComp("ERROR: client is unable to fetch user data", err);
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server error occured`,
      `client responded with an error for upon request for user information`
    );

    if (!httpValid) return;

    // HTTP RESPONSE PROCESSING
    this.chatUserInfo = response.data.data;
  }

  /**
   * This function retrieves values from password section input elements.
   *
   * @returns { iUserPassword }
   */
  private getPasswordForm(): iUserPassword {
    return {
      password: this.chatUserPassword.value,
      rePassword: this.chatUserRePassword.value,
    };
  }

  /** This function clears values of password section input elements.*/
  private clearPasswordForm(): void {
    this.chatUserPassword.value = "";
    this.chatUserRePassword.value = "";
  }

  private deleteUserComponents(): void {
    UserComponent.getInstance(true);
    PeerComponent.getInstance(true, {} as iUserObj);
    MessagesComponent.getInstance(
      "deleteId",
      "deleteId",
      "deleteName",
      "deleteChatId",
      false,
      "user",
      true,
      false
    );
    this.chatUserWrap.innerHTML = "";
    this.chatPeerWrap.innerHTML = "";
    this.chatUserRemoveHandler();
  }

  /** Loops over available request items array from user data for rendering. */
  private generateRequests(): void {
    if (
      !this.chatUserInfo ||
      typeof this.chatUserInfo !== "object" ||
      Object.keys(this.chatUserInfo).length < 1
    )
      return;

    const incoming = this.chatUserInfo.requests.incoming;
    const outgoing = this.chatUserInfo.requests.outgoing;

    let item: iRequest;

    for (item of incoming) {
      UserComponent.createRequest(
        item,
        UserComponent.chatUserIncomingWrap,
        "incoming"
      );
    }

    for (item of outgoing) {
      UserComponent.createRequest(
        item,
        UserComponent.chatUserOutgoingWrap,
        "outgoing"
      );
    }
  }

  /**
   * This function
   * - transforms a request item data into an HTML element
   * - attaches it to a corresponding request section
   *
   * @param { iRequest } item - request item data
   * @param { HTMLDivElement } wrapper - request item section container
   * @param { "incoming" | "outgoing" } type - requester chat type
   *
   * @static
   */
  static readonly createRequest = (
    item: iRequest,
    wrapper: HTMLDivElement,
    type: "incoming" | "outgoing"
  ): void => {
    item = GenUtil.requestStrIntToBool(item) as iRequest;

    // if (item.isGroup && type === "outgoing") return;

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

      itemWrap.classList.add("chat-user-outgoing-item");
      itemName.textContent = item.accnt_name;
      itemCancel.classList.add("fa-solid", "fa-xmark", "request-action");
      itemCancel.dataset.requestAction = requestActions.cancel;

      itemActions.appendChild(itemCancel);
    } else if (type === "incoming") {
      itemApprove = document.createElement("i") as HTMLElement;
      itemReject = document.createElement("i") as HTMLElement;

      itemWrap.classList.add("chat-user-incoming-item");
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
  };

  /**
   * This function deletes a request HTML element from the user component.
   *
   * @param { string } requestItemId - account or group id of the request item
   * @param { 0 | 1 } type - account type of the request item
   *
   * @static
   */
  static readonly deleteRequest = (
    requestItemId: string,
    type: 0 | 1
  ): void => {
    // DATA GATHERING
    const inputValid = Validate.requestDel(requestItemId, type);

    // VALIDATION
    if (!inputValid.isValid) {
      return error.showComp(
        `ERROR: Server send invalid request deletion data`,
        inputValid.error
      );
    }

    // PROCESS: wrapper identification
    let parentNode: HTMLDivElement;
    type === 0
      ? (parentNode = this.chatUserOutgoingWrap)
      : (parentNode = this.chatUserIncomingWrap);

    parentNode.removeChild(
      ([...parentNode.children] as Array<HTMLDivElement>).filter(
        (item) => requestItemId === item.dataset.userId
      )[0]
    );
  };

  /** This function
   * - loops ofer retrieved user relation data
   * - picks who will belong to mute & block section
   * */
  private generateMuteBlockItem(): void {
    const mutes = this.chatUserInfo.relations.mutes;
    const blocks = this.chatUserInfo.relations.blocks;
    let mute: iRelation;
    let block: iRelation;

    for (mute of mutes) {
      UserComponent.createMuteBlockItem(
        mute,
        UserComponent.chatUserMutesWrap,
        0
      );
    }
    for (block of blocks) {
      UserComponent.createMuteBlockItem(
        block,
        UserComponent.chatUserBlocksWrap,
        1
      );
    }
  }

  /**
   * This function
   * - transforms a iRelation item data into an HTML element
   * - attaches it to a corresponding section
   *
   * @param { iRelation } item - request item data
   * @param { HTMLDivElement } wrapper - request item section container
   * @param { 0 | 1 } type - mute | block item chat type
   * @returns
   */
  static readonly createMuteBlockItem = (
    item: iRelation,
    wrapper: HTMLDivElement,
    // 0 (mute)    (1) block
    type: 0 | 1
  ): void => {
    // VALIDATION
    const itemValid = Validate.muteBlockItem(item, wrapper, type);
    if (!itemValid.isValid) {
      return error.showComp(
        `ERROR: Mute item contains invalid data`,
        itemValid.error
      );
    }

    // item wrapper
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-user-block-item");

    // item name
    const itemName = document.createElement("p");
    itemName.textContent = item.accnt_name;

    // item action
    const itemAction = document.createElement("p");
    itemAction.dataset.userId = item.accnt_id;
    itemAction.dataset.action = type === 0 ? "mute" : "block";
    itemAction.addEventListener("click", UserComponent.clickUserMuteBlock);

    // item icon
    const itemIcon = document.createElement("i");
    itemIcon.classList.add("fa-solid", "fa-xmark");

    itemAction.appendChild(itemIcon);
    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemAction);
    wrapper.appendChild(itemWrap);

    // MODEL HTML
    // <div class='chat-user-block-item'>
    //   <p>blocked user</p>
    //   <p data-user-id='3asda3da4' data-action='block'>
    //     <i class='fa-solid fa-xmark'></i>
    //   </p>
    // </div>;
  };

  /**
   * This function returns an object to be sent along an HTTP Request when sending peer request.
   *
   * @param { iStrBool } isGroup
   * @param { string } receiverId
   * @returns { iRequestBody }
   */
  private createRequestBody(
    isGroup: iStrBool,
    receiverId: string
  ): iRequestBody {
    return {
      type: isGroup === "true" ? 2 : 1,
      recipientId: isGroup === "false" ? receiverId : null,
      groupId: isGroup === "true" ? receiverId : null,
    };
  }

  /**
   * This function returns:
   * - a new or old instance
   * - null if the component is instructed for deletion
   *
   * @param { boolean } deleteInstance - flag indicating whther the component will be deleted.
   * @returns
   */
  static readonly getInstance = (
    deleteInstance: boolean
  ): UserComponent | null => {
    if (!deleteInstance) {
      if (!this.instance) this.instance = new UserComponent();
    } else {
      this.instance!.chatUserRemoveHandler();
      this.instance!.chatUserWrap.innerHTML = "";
      this.instance = null;
    }
    return this.instance;
  };
}
