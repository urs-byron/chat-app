import { Component } from "./base.comp";

/** This class creates HTML element for client UI components upon super */
export class ErrorComponent extends Component<HTMLElement, HTMLDivElement> {
  private static instance: ErrorComponent;

  /**
   * @constructor
   * @extends Component
   */
  private constructor() {
    super(".chat-app", "error-temp", "afterbegin");
  }

  configureComponent(...args: any[]): void {}
  renderComponent(...args: any[]): void {}

  /**
   * This function instructs error component to be:
   * - temporarily visible
   * - if not empty, display error
   *
   * @param {string} head
   * @param {any} content
   *
   * @static
   */
  static readonly showComp = (head: string, content?: any): void => {
    /** error container element */
    const wrap = document.querySelector(".error-wrap") as HTMLDivElement;
    /** error head element */
    const errorHead = document.querySelector(
      ".error-head"
    ) as HTMLHeadingElement;
    /** error content element */
    const errorContent = document.querySelector(
      ".error-content"
    ) as HTMLParagraphElement;

    // assign values to error component
    errorHead.textContent = head;
    content
      ? (errorContent.textContent = JSON.stringify(content))
      : (errorContent.textContent = null);

    // temporarily apply visibility error component through styling
    wrap.classList.remove("hideComp");
    wrap.classList.remove("invisibleElem");
    wrap.classList.add("show-error-wrap");
    wrap.classList.add("fadeIn");

    setTimeout(() => {
      wrap.classList.add("invisibleElem");
      wrap.classList.remove("fadeIn");
      wrap.classList.add("hideComp");
      wrap.classList.remove("show-error-wrap");
    }, 5000);
  };

  /**
   * This function returns either a new or the old instance of the component
   * @returns {ErrorComponent}
   */
  static readonly getInstance = (): ErrorComponent => {
    if (!this.instance) this.instance = new ErrorComponent();

    return this.instance;
  };
}
