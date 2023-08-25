import { tryCatch } from "../util/asyncWrap.util";
import { Validate } from "../util/validation.util";
import { iRelation } from "../models/user.model";
import { iNewGrpBody } from "../models/group.model";
import { PeerComponent } from "./peer.comp";
import { SocketMethods } from "../util/socket.util";
import { iHttpResponse } from "../models/http.model";
import { iValidityType } from "../models/validity.model";
import { iCompFunctions } from "../models/comp.model";
import { ErrorComponent as error } from "./error.comp";
import { iChatType, iRequestBody } from "../models/gen.model";
import { httpGetGroups, httpPostGroup } from "../hooks/requests.hook";

/** This class holds functions related to managing & rendering of client stored group data */
export class GroupComponent implements iCompFunctions {
  private static instance: GroupComponent | null;

  private static groupsWrap: HTMLDivElement;
  private groupRequestBtn!: HTMLElement;
  private groupsForm!: HTMLFormElement;
  private groupsInput!: HTMLInputElement;

  /** @type { iRelation[] } - array of information about connected user groups */
  private userGroups: Array<iRelation> = [];
  /** @type { string } - account id of connected user peer */
  private static sPeerId: string;
  /** @type { iRequestBody[] } - array of request data for multiple group-to-user requests */
  private static requestStack: iRequestBody[] = [];
  /** @type { string } - naming signature for for all groups stored within sessionStorage */
  static readonly grpSessionStoreName: string = "sessionGroups";

  // FOREIGN ELEMENT(S)
  private chatMsgs!: HTMLDivElement;

  /**
   * Upon instantiating, the constructor fetches & renders user related groups
   *
   * @param {string} peerId - account id of connected user peer
   * @param {iChatType} type - chat type of the peer
   *
   * @constructor
   */
  private constructor(
    private readonly peerId: string,
    private readonly type: iChatType
  ) {
    (async () => {
      try {
        await this.getGroups();

        this.configureComponent();
        this.renderComponent();
      } catch (err) {
        error.showComp("ERROR: client is unable to get user groups", err);
      }
    })();
  }

  configureComponent(...args: any[]): void {
    GroupComponent.sPeerId = this.peerId;
    GroupComponent.groupsWrap = document.querySelector(
      ".chat-msg-groups"
    )! as HTMLDivElement;
    this.groupRequestBtn = document.querySelector(
      ".chat-msg-groups-head i"
    ) as HTMLElement;
    this.groupsForm = document.querySelector(
      ".chat-msg-group-new"
    )! as HTMLFormElement;
    this.groupsInput = document.querySelector(
      ".chat-msg-group-new input"
    )! as HTMLInputElement;
    this.chatMsgs = document.querySelector(".chat-msgs")! as HTMLDivElement;

    this.groupRequestBtn.addEventListener(
      "click",
      this.submitMembershipRequest
    );
    this.groupsForm.addEventListener("submit", this.submitNewGroup);
  }
  renderComponent(...args: any[]): void {
    this.generateGroups();
  }

  // --------------------------
  // ------- GET | SET --------
  // --------------------------

  /**
   * Empties group-to-user request stack
   *
   * @static
   */
  static readonly emptyRequestStack = () => {
    GroupComponent.requestStack = [];
  };

  // --------------------------
  // ----- EVENT HANDLERS -----
  // --------------------------

  /**
   * This functions sends multiple incoming peer request to user related groups via socket
   *
   * @param {MouseEvent} e
   *
   * @listens MouseEvent
   */
  private submitMembershipRequest = (e: MouseEvent): void => {
    if (
      GroupComponent.requestStack === undefined ||
      GroupComponent.requestStack === null ||
      !Array.isArray(GroupComponent.requestStack) ||
      GroupComponent.requestStack.length < 0
    )
      return;

    /** Data Gathering */
    /** @type {iRequestBody} - temporary request body holder */
    let req: iRequestBody;
    /** @type {iValidityType} - temporary request body validity holder */
    let reqValid: iValidityType;

    /** Loops over request stack for multiple group-2-user requests via socket */
    for (req of GroupComponent.requestStack) {
      /** Inspects request body validity, skips data upon data invalidity. */
      reqValid = Validate.requestBody(req);
      if (!reqValid.isValid) continue;

      SocketMethods.socket?.emit(SocketMethods.postRequestEv, req);
    }

    GroupComponent.emptyRequestStack();
  };

  /**
   * This function modifies group-to-user request stack and corresponding HTML elements
   * - in/decrement group-to-user request stack.
   * - modifies HTML element which corresponds to group clicked
   *
   * @param { MouseEvent } e
   *
   * @listens MouseEvent
   *
   * @static
   */
  static readonly addMembershipRequest = (e: MouseEvent): void => {
    const grpBtns = e.currentTarget as HTMLElement;
    const grpId = grpBtns.dataset.grpId!;

    // toggle class
    grpBtns.classList.toggle("chat-msg-group-action-undo");

    // if after toggling, undo class is present: push to stack
    if (grpBtns.classList.contains("chat-msg-group-action-undo"))
      this.requestStack.push(
        GroupComponent.createRequestBody(grpId, GroupComponent.sPeerId)
      );
    // if after toggling, undo class is present: remove to stack
    else
      this.requestStack = this.requestStack.filter(
        (req: iRequestBody) => req.groupId !== grpId
      );
  };

  /**
   * This function requests an HTTP POST to the server to create a new group.
   *
   * @param {SubmitEvent} e
   *
   * @listens SubmitEvent
   */
  private submitNewGroup = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    /** new group object */
    const newGrpObj: iNewGrpBody = {
      recipientId: this.chatMsgs.dataset.userId
        ? this.chatMsgs.dataset.userId
        : "",
      grpName: this.groupsInput.value,
    };

    /** Returns immediately if request data is found invalid. */
    const newGrpValid = Validate.newGroupInput(newGrpObj);
    if (!newGrpValid.isValid) {
      return error.showComp(
        "ERROR: client's new group request data is invalid",
        newGrpValid.error
      );
    }

    /** Request HTTP POST to server to create new group. */
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPostGroup, newGrpObj);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to request for user groups",
        err
      );
    }

    /** Immediately returns if the HTTP response is invalid. */
    let httpValid = Validate.httpRes(
      response,
      `server is unable to process request for submitting new group`,
      `server responded with an error upon client's request for user groups`
    );
    if (!httpValid) return;

    /** Gather data for sequential group-to-user request after successful group creation */
    const grpRel = response.data.data as iRelation;
    const grp_id: string = grpRel.accnt_id;
    const reqBody: iRequestBody = GroupComponent.createRequestBody(
      this.chatMsgs.dataset.userId as string,
      grp_id
    );

    /** Returns immediately if request data is found invalid. */
    const reqValid = Validate.requestBody(reqBody);
    if (!reqValid.isValid) return;

    /** Request via socket to server create request from group-to-user. */
    SocketMethods.socket?.emit(SocketMethods.postRequestEv, reqBody);

    /** Update peer component list with new group */
    PeerComponent.updatePeerListHTML(grpRel);

    /** Connect to socket room after successful group creation */
    SocketMethods.socket?.emit(
      SocketMethods.joinRoomEv,
      grpRel.chat_id,
      (res: string) => {
        console.log(res);
      }
    );

    /** Clear used group input element */
    this.groupsInput.value = "";
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  /**
   * This function:
   * - fetches groups from the server
   * - stores it in the sessionSotrage
   *
   * @returns { Promise<void> }
   */
  private async getGroups(): Promise<void> {
    /** Check if sessionStorage has stored group items. */
    const gs = sessionStorage.getItem(GroupComponent.grpSessionStoreName);
    /** Immediately returns if true. */
    if (gs && Array.isArray(JSON.parse(gs))) {
      this.userGroups = JSON.parse(gs) as iRelation[];
      return;
    }

    /** Request HTTP GET to the server for user related groups */
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetGroups);
    } catch (err) {
      return error.showComp("ERROR: client is unable to get user groups", err);
    }

    /** Immediately returns if HTTP Response is invalid */
    const httpValid = Validate.httpRes(
      response,
      `server is unable to process request for user groups`,
      `server responded with an error upon client's request for user groups`
    );
    if (!httpValid) return;

    /** Store groups received to:
     * - class
     * - sessionStorage
     * */
    this.userGroups = response.data.data as Array<iRelation>;
    sessionStorage.setItem(
      GroupComponent.grpSessionStoreName,
      JSON.stringify(this.userGroups)
    );
  }

  /** This function creates group lists for a group type message component */
  private generateGroups(): void {
    if (this.type === "group") return;

    let grp: iRelation;

    for (grp of this.userGroups) {
      if (grp.accnt_id !== this.peerId)
        GroupComponent.createGroupItemHTML(grp, GroupComponent.groupsWrap);
    }
  }

  /**
   * This function creates an HTML element within the message component's connected groups list.
   *
   * @param { iRelation } grp
   * @param { HTMLDivElement } wrapper
   */
  private static readonly createGroupItemHTML = (
    grp: iRelation,
    wrapper: HTMLDivElement
  ): void => {
    //   <div class='chat-msg-group-item'>
    const grpWrap = document.createElement("div");
    grpWrap.classList.add("chat-msg-group-item");

    //     <h4>grp 1</h4>
    const grpName = document.createElement("h4");
    grpName.textContent = grp.accnt_name;

    //     <div class='chat-msg-group-action'>
    const grpBtns = document.createElement("div");
    grpBtns.classList.add("chat-msg-group-action");

    //       <span>undo</span>
    const undoBtn = document.createElement("span");
    undoBtn.textContent = "undo";

    //       <i class='fa-solid fa-plus'></i>
    const addBtn = document.createElement("i");
    addBtn.classList.add("fa-solid", "fa-plus");

    grpBtns.appendChild(undoBtn);
    grpBtns.appendChild(addBtn);
    grpBtns.dataset.grpId = grp.accnt_id;

    grpWrap.appendChild(grpName);
    grpWrap.appendChild(grpBtns);

    wrapper.appendChild(grpWrap);

    grpBtns.addEventListener("click", GroupComponent.addMembershipRequest);
    //     </div>
    //   </div>
  };

  /**
   * This function creates a request object for a group-to-user.
   *
   * @param { string } groupId
   * @param { string } receiverId
   * @returns { iRequestBody }
   *
   * @static
   */
  private static createRequestBody(
    groupId: string,
    receiverId: string
  ): iRequestBody {
    return {
      type: 3,
      recipientId: receiverId,
      groupId: groupId,
    };
  }

  /**
   * This function returns either:
   * - new or old instance of the class
   * - null if the class is to be deleted
   *
   * @param { string } peerId - account id of the user's connected peer
   * @param { iChatType } type - chat type of the user's connected peer
   * @param { boolean } deleteInstance - flag indicating whether class is to be deleted or not
   * @returns { GroupComponent | null }
   *
   * @static
   */
  static readonly getInstance = (
    peerId: string,
    type: iChatType,
    deleteInstance: boolean
  ): GroupComponent | null => {
    if (!deleteInstance) {
      if (!this.instance) {
        this.instance = new GroupComponent(peerId, type);
        GroupComponent.emptyRequestStack();
      }
    } else {
      this.instance = null;
    }

    return this.instance;
  };
}
