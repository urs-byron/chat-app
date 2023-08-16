import { AuthComponent } from "./auth.comp";

export class AppComponent {
  private static instance: AppComponent;
  private chatApp!: HTMLDivElement;

  private constructor() {
    this.chatApp = document.querySelector(".chat-app")! as HTMLDivElement;
  }

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  public appUser() {
    this.chatApp.classList.add("chat-app-user-state");
    AuthComponent.hideComp();
  }
  public appAuth() {
    AuthComponent.showComp();
    this.chatApp.classList.remove("chat-app-user-state");
  }

  static readonly getInstance = (): AppComponent => {
    if (!this.instance) this.instance = new AppComponent();

    return this.instance;
  };
}
