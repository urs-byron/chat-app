import { Component } from "./base.comp";

export class ErrorComponent extends Component<HTMLElement, HTMLDivElement> {
  static instance: ErrorComponent;

  private constructor() {
    super(".chat-app", "error-temp", "afterbegin");
  }

  configureComponent(...args: any[]): void {}
  renderComponent(...args: any[]): void {}

  static readonly showComp = (head: string, content?: any): void => {
    const wrap = document.querySelector(".error-wrap") as HTMLDivElement;
    const errorHead = document.querySelector(
      ".error-head"
    ) as HTMLHeadingElement;
    const errorContent = document.querySelector(
      ".error-content"
    ) as HTMLParagraphElement;

    errorHead.textContent = head;
    content
      ? (errorContent.textContent = JSON.stringify(content))
      : (errorContent.textContent = null);

    wrap.classList.remove("hideComp");
    wrap.classList.remove("invisibleElem");
    wrap.classList.add("fadeIn");
    setTimeout(() => {
      wrap.classList.add("invisibleElem");
      wrap.classList.remove("fadeIn");
      wrap.classList.add("hideComp");
    }, 5000);
  };

  static readonly getInstance = (): ErrorComponent => {
    if (!this.instance) this.instance = new ErrorComponent();

    return this.instance;
  };
}
