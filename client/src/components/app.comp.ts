import { AuthComponent } from "./auth.comp";

/**
 * Controls viewability of the chat component and the auth commponent
 */
export class AppComponent {
  private static instance: AppComponent;
  private chatApp!: HTMLDivElement;

  /**
   * Class defines main chat div element
   *
   * @constructor
   */
  private constructor() {
    this.chatApp = document.querySelector(".chat-app")! as HTMLDivElement;
  }

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------

  /**
   * This function will move the auth component aside and show the chat component
   */
  public appUser() {
    this.chatApp.classList.add("chat-app-user-state");
    AuthComponent.hideComp();
  }

  /**
   * This function will move the chat component aside and show the auth component
   */
  public appAuth() {
    AuthComponent.showComp();
    this.chatApp.classList.remove("chat-app-user-state");
  }

  /**
   * This function returns either a new instance or the old instance
   *
   * @returns {AppComponent}
   */
  static readonly getInstance = (): AppComponent => {
    if (!this.instance) this.instance = new AppComponent();

    return this.instance;
  };
}
