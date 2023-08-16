import { Component } from "./base.comp";
import { MessagesListComponent } from "./msgsList.comp";
import { MessagesOptionsComponent } from "./msgsOpts.comp";

export class MessagesComponent extends Component<HTMLDivElement, HTMLElement> {
  static instance: MessagesComponent | null;

  // COMPONENTS
  static msgListInstance: MessagesListComponent | null;
  static msgOptsInstance: MessagesOptionsComponent | null;

  // COMPONENT ELEMENTS
  static chatMsgs: HTMLDivElement;

  private constructor() {
    super(".chat-msgs-wrap", "msgs-temp", "afterbegin");

    this.configureComponent();
    this.renderComponent();
  }

  configureComponent(): void {}

  renderComponent(): void {}

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  static readonly getInstance = (
    userId: string,
    peerId: string,
    peerName: string,
    chatId: string,
    availability: boolean,
    type: "user" | "group",
    deleteInstance: boolean,
    fromPeer: boolean
  ): MessagesComponent | null => {
    // if constructor is called for creating class component
    if (!deleteInstance) {
      // if no messageComponent exists, create a new one
      if (!this.instance) {
        this.instance = new MessagesComponent();
        this.chatMsgs = document.querySelector(".chat-msgs")! as HTMLDivElement;

        this.getMsgsInstance(
          userId,
          peerId,
          peerName,
          chatId,
          availability,
          type,
          fromPeer,
          false
        );
      } else if (this.chatMsgs.dataset.userId !== peerId) {
        // else, delete then replace the previous one
        this.getMsgsInstance(
          "deleteId",
          "deleteId",
          "deleteName",
          "deleteChatId",
          false,
          type,
          fromPeer,
          true
        );

        this.chatMsgs.innerHTML = "";

        this.getMsgsInstance(
          userId,
          peerId,
          peerName,
          chatId,
          availability,
          type,
          fromPeer,
          false
        );
      }
    } else {
      // else, delete component
      this.getMsgsInstance(
        "deleteId",
        "deleteId",
        "deleteName",
        "deleteChatId",
        false,
        type,
        fromPeer,
        true
      );
    }

    return this.instance;
  };

  static readonly getMsgsInstance = (
    userId: string,
    peerId: string,
    peerName: string,
    chatId: string,
    availability: boolean,
    type: "user" | "group",
    fromPeer: boolean,
    deleteInstance: boolean
  ): void => {
    if (peerId === this.chatMsgs.dataset.userId) return;

    deleteInstance
      ? (this.chatMsgs.dataset.userId = "")
      : (this.chatMsgs.dataset.userId = peerId);

    this.msgOptsInstance = MessagesOptionsComponent.getInstance(
      peerId,
      peerName,
      chatId,
      type,
      availability,
      fromPeer,
      deleteInstance
    );
    this.msgListInstance = MessagesListComponent.init(
      userId,
      peerId,
      peerName,
      chatId,
      availability,
      type,
      fromPeer,
      deleteInstance
    );
  };
}
