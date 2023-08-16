import { tryCatch } from "../util/asyncWrap.util";
import { Validate } from "../util/validation.util";
import { Component } from "./base.comp";
import { iRelation } from "../models/user.model";
import { iNewGrpBody } from "../models/group.model";
import { iChatType, iRequestBody } from "../models/gen.model";
import { iHttpResponse } from "../models/http.model";
import { ErrorComponent as error } from "./error.comp";
import {
  httpGetGroups,
  httpPostGroup,
  httpPostUserRequest,
} from "../hooks/requests.hook";
import { SocketMethods } from "../util/socket.util";
import { MessagesListComponent } from "./msgsList.comp";

export class GroupComponent {
  static instance: GroupComponent | null;

  private userGroups: Array<iRelation> = [];
  static groupsWrap: HTMLDivElement;
  private groupRequestBtn!: HTMLElement;
  private groupsForm!: HTMLFormElement;
  private groupsInput!: HTMLInputElement;

  private static sPeerId: string;
  private static requestStack: iRequestBody[] = [];
  static readonly grpSessionStoreName = "sessionGroups";

  // FOREIGN ELEMENT(S)
  private chatMsgs!: HTMLDivElement;

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
  // ----- EVENT HANDLERS -----
  // --------------------------
  private submitMembershipRequest = (e: MouseEvent) => {
    let req: iRequestBody;
    for (req of GroupComponent.requestStack) {
      3;
      SocketMethods.socket?.emit(SocketMethods.postRequestEv, req);
    }
  };
  static readonly addMembershipRequest = (e: MouseEvent) => {
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
  private submitNewGroup = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    // DATA GATHERING
    const newGrpObj: iNewGrpBody = {
      recipientId: this.chatMsgs.dataset.userId
        ? this.chatMsgs.dataset.userId
        : "",
      grpName: this.groupsInput.value,
    };

    // VALIDATION
    const newGrpValid = Validate.newGroupInput(newGrpObj);
    if (!newGrpValid.isValid) {
      return error.showComp(
        "ERROR: client's new group request data is invalid",
        newGrpValid.error
      );
    }

    // HTTP REQUEST (POST GROUP)
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPostGroup, newGrpObj);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to request for user groups",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE (POST GROUP)
    let httpValid = Validate.httpRes(
      response,
      `server is unable to process request for submitting new group`,
      `server responded with an error upon client's request for user groups`
    );
    if (!httpValid) return;

    // HTTP REQUEST (POST MEMBERSHIP)
    const grp_id: string = (response.data.data as { group_id: string })
      .group_id;
    const reqBody: iRequestBody = this.createRequestBody(
      this.chatMsgs.dataset.userId as string,
      grp_id
    );

    SocketMethods.socket?.emit(SocketMethods.postRequestEv, reqBody);

    // VALIDATION: HTTP RESPONSE (POST MEMBERSHIP)
    httpValid = Validate.httpRes(
      response,
      `server is unable to process request for user membership`,
      `server responded with an error upon client's request for user membership`
    );
    if (!httpValid) return;

    // FINAL PROCESS
    this.groupsInput.value = "";
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  private async getGroups(): Promise<void> {
    // HTTP REQUEST
    const gs = sessionStorage.getItem(GroupComponent.grpSessionStoreName);
    if (gs && Array.isArray(JSON.parse(gs))) {
      this.userGroups = JSON.parse(gs) as iRelation[];
      return;
    }

    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetGroups);
    } catch (err) {
      return error.showComp("ERROR: client is unable to get user groups", err);
    }

    // VALIDATION: HTTP RESPONSE
    const httpValid = Validate.httpRes(
      response,
      `server is unable to process request for user groups`,
      `server responded with an error upon client's request for user groups`
    );
    if (!httpValid) return;

    this.userGroups = response.data.data as Array<iRelation>;

    // PROCESS: store user groups in sessionStorage
    let grp: iRelation;
    sessionStorage.setItem(
      GroupComponent.grpSessionStoreName,
      JSON.stringify(this.userGroups)
    );
  }
  private generateGroups() {
    if (this.type === "group") return;

    let grp: iRelation;

    for (grp of this.userGroups) {
      if (grp.accnt_id !== this.peerId)
        GroupComponent.createGroupItem(grp, GroupComponent.groupsWrap);
    }
  }
  static readonly createGroupItem = (
    grp: iRelation,
    wrapper: HTMLDivElement
  ) => {
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
  private createRequestBody(receiverId: string, groupId: string): iRequestBody {
    return {
      type: 3,
      recipientId: receiverId,
      groupId: groupId,
    };
  }
  static createRequestBody(groupId: string, receiverId: string): iRequestBody {
    return {
      type: 3,
      recipientId: receiverId,
      groupId: groupId,
    };
  }
  static readonly getInstance = (
    peerId: string,
    type: iChatType,
    deleteInstance: boolean
  ): GroupComponent | null => {
    if (!deleteInstance) {
      if (!this.instance) this.instance = new GroupComponent(peerId, type);
    } else {
      this.instance = null;
    }

    return this.instance;
  };
}
