import { Component } from "./base.comp";

export class ChatComponent extends Component<HTMLDivElement, HTMLElement> {
  static instance: ChatComponent;

  private constructor() {
    super(".chat-app", "chat-temp", "afterbegin");
  }

  configureComponent(): void {}
  renderComponent(): void {}

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  static getInstance = (): ChatComponent => {
    if (!this.instance) this.instance = new ChatComponent();
    return this.instance;
  };
}
