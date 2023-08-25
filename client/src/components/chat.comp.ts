import { Component } from "./base.comp";

export class ChatComponent extends Component<HTMLDivElement, HTMLElement> {
  private static instance: ChatComponent;

  /**
   * This class, upon instantiation, creates HTML element for main chat component
   *
   * @constructor
   * @extends Component
   */
  private constructor() {
    super(".chat-app", "chat-temp", "afterbegin");
  }

  configureComponent(): void {}
  renderComponent(): void {}

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------

  /**
   * This function returns either a new or the old instance of the class.
   *
   * @returns {ChatComponent}
   */
  static getInstance = (): ChatComponent => {
    if (!this.instance) this.instance = new ChatComponent();
    return this.instance;
  };
}
