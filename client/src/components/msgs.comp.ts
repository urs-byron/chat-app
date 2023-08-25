import { iChatType } from "../models/gen.model";
import { Component } from "./base.comp";
import { MessagesListComponent } from "./msgsList.comp";
import { MessagesOptionsComponent } from "./msgsOpts.comp";

/**
 * This class holds functions related to modifying class instances and UI interface of:
 * - MessagesListComponent
 * - MessagesOptionsComponent
 *
 * @extends Component
 */
export class MessagesComponent extends Component<HTMLDivElement, HTMLElement> {
  static instance: MessagesComponent | null;

  // COMPONENTS
  static msgListInstance: MessagesListComponent | null;
  static msgOptsInstance: MessagesOptionsComponent | null;

  // COMPONENT ELEMENTS
  static chatMsgs: HTMLDivElement;
  static readonly chatMsgUserClass: string = "chat-msgs-user";
  static readonly chatMsgGroupClass: string = "chat-msgs-group";

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

  /**
   * This function controls whether MessagesComponent either:
   * - call a new class for a new user message component
   * - delete class and corresponding HTML elements
   *
   * @param { string } userId - account id of the client logged in
   * @param { string } peerId - account id of the user's target connected peer
   * @param { string } peerName - account name of the user's target connected peer
   * @param { string } chatId - chat id between the user & peer | group
   * @param { boolean } availability -  availability setting of the user target
   * @param { iChatType } type - chat type of the user's target
   * @param { boolean } deleteInstance - flag indicating if the message comp will be deleted
   * @param { boolean } fromPeer - flag indicating if the user target is from the peer list
   *
   * @returns { MessagesComponent | null }
   *
   * @static
   */
  static readonly getInstance = (
    userId: string,
    peerId: string,
    peerName: string,
    chatId: string,
    availability: boolean,
    type: iChatType,
    deleteInstance: boolean,
    fromPeer: boolean
  ): MessagesComponent | null => {
    // if static function is called for creating new class components
    if (!deleteInstance) {
      if (!this.instance) {
        // if no messageComponent exists, create a new one
        this.instance = new MessagesComponent();
        this.chatMsgs = document.querySelector(".chat-msgs")! as HTMLDivElement;

        // set message component chat type
        type === "user"
          ? MessagesComponent.chatMsgs.classList.add(
              MessagesComponent.chatMsgUserClass
            )
          : MessagesComponent.chatMsgs.classList.add(
              MessagesComponent.chatMsgGroupClass
            );

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

        // delete message component HTML
        this.chatMsgs.innerHTML = "";

        // replace message component chat type
        type === "user"
          ? MessagesComponent.chatMsgs.classList.replace(
              MessagesComponent.chatMsgGroupClass,
              MessagesComponent.chatMsgUserClass
            )
          : MessagesComponent.chatMsgs.classList.replace(
              MessagesComponent.chatMsgUserClass,
              MessagesComponent.chatMsgGroupClass
            );

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

  /**
   * This function controls whether MessagesListComponent & MessagesOptionsComponent will:
   * - creates a new class for a new user message component
   * - delete class and corresponding HTML elements
   *
   * @param { string } userId - account id of the client logged in
   * @param { string } peerId - account id of the user's target connected peer
   * @param { string } peerName - account name of the user's target connected peer
   * @param { string } chatId - chat id between the user & peer | group
   * @param { boolean } availability -  availability setting of the user target
   * @param { iChatType } type - chat type of the user's target
   * @param { boolean } fromPeer - flag indicating if the user target is from the peer list
   * @param { boolean } deleteInstance - flag indicating if the message comp will be deleted
   *
   * @returns { MessagesComponent | null }
   *
   * @static
   */
  private static readonly getMsgsInstance = (
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
