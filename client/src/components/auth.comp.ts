import { Validate } from "../util/validation.util";
import { tryCatch } from "../util/asyncWrap.util";
import { Component } from "./base.comp";
import { iAuthInputs } from "../models/auth.model";
import { AppComponent } from "./app.comp";
import { iHttpResponse } from "../models/http.model";
import { iValidityType } from "../models/validity.model";
import { GenUtil as Gen } from "../util/gen.util";
import { ErrorComponent as error } from "./error.comp";
import { httpPostLogin, httpPostRegister } from "../hooks/requests.hook";

export class AuthComponent extends Component<HTMLDivElement, HTMLElement> {
  static instance: AuthComponent;

  private appComp: AppComponent = AppComponent.getInstance();
  static authWrap: HTMLDivElement;
  static authLoader: HTMLDivElement;
  private regForm!: HTMLFormElement;
  private regUsernameInput!: HTMLInputElement;
  private regPasswordInput!: HTMLInputElement;
  private regRePasswordInput!: HTMLInputElement;
  private logForm!: HTMLFormElement;
  private logUsernameInput!: HTMLInputElement;
  private logPasswordInput!: HTMLInputElement;

  private constructor() {
    super(".chat-app", "auth-temp", "afterbegin");
    this.configureComponent();
    this.renderComponent();
  }

  configureComponent(): void {
    AuthComponent.authWrap = document.querySelector(
      ".auth-comp"
    )! as HTMLDivElement;
    AuthComponent.authLoader = document.querySelector(
      ".auth-wrap .loader"
    )! as HTMLDivElement;
    this.regForm = this.insertedElement.querySelector(
      "#register-form"
    )! as HTMLFormElement;
    this.regUsernameInput = document.getElementById(
      "reg-username"
    )! as HTMLInputElement;
    this.regPasswordInput = document.getElementById(
      "reg-password"
    )! as HTMLInputElement;
    this.regRePasswordInput = document.getElementById(
      "reg-rePassword"
    )! as HTMLInputElement;
    this.logForm = this.insertedElement.querySelector(
      "#login-form"
    )! as HTMLFormElement;
    this.logUsernameInput = document.getElementById(
      "log-username"
    )! as HTMLInputElement;
    this.logPasswordInput = document.getElementById(
      "log-password"
    )! as HTMLInputElement;

    this.regForm.addEventListener("submit", this.submitRegisterFormHandler);
    this.logForm.addEventListener("submit", this.submitLoginFormHandler);
  }
  renderComponent(): void {}

  // --------------------------
  // ----- EVENT HANDLERS -----
  // --------------------------
  private submitRegisterFormHandler = async (e: Event): Promise<void> => {
    e.preventDefault();

    // DATA GATHERING
    const regInputs: iAuthInputs = this.getRegisterInput();
    const regValid: iValidityType = Validate.registerForm(regInputs);

    // VALIDATION
    if (!regValid.isValid) {
      return error.showComp(
        "ERROR: submitted registration data is invalid",
        regValid.error
      );
    }

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPostRegister, regInputs);
    } catch (err) {
      return error.showComp(
        `ERROR: client is unable to request for registration`,
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const resValid = Validate.httpRes(
      response,
      "server is unable to process request for registration",
      `server responded with an error upon client's request for registration`
    );
    if (!resValid) return;

    this.clearRegisterInput();
  };
  private submitLoginFormHandler = async (e: Event): Promise<void> => {
    e.preventDefault();

    // DATA GATHERING
    const loginInputs: iAuthInputs = this.getLoginInput();
    const loginValid: iValidityType = Validate.loginForm(loginInputs);

    // VALIDATION
    if (!loginValid.isValid) {
      return error.showComp(
        `ERROR: submitted login data is invalid`,
        loginValid.error
      );
    }

    // HTTP REQUEST
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPostLogin, loginInputs);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to request for login",
        err
      );
    }

    // VALIDATION: HTTP RESPONSE
    const resValid = Validate.httpRes(
      response,
      "server is unable to process client's request for login",
      `server responded with an error upon client's request for login`
    );
    if (!resValid) return;

    // PROCESS
    try {
      await Gen.logUser();
    } catch (err) {
      return error.showComp(
        `ERROR: client is unable to display user information`,
        err
      );
    }

    this.appComp.appUser();
    this.clearLoginInput();
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------
  private getRegisterInput(): iAuthInputs {
    return {
      username: this.regUsernameInput.value,
      password: this.regPasswordInput.value,
      rePassword: this.regRePasswordInput.value,
    } as iAuthInputs;
  }
  private clearRegisterInput(): void {
    this.regUsernameInput.value = "";
    this.regPasswordInput.value = "";
    this.regRePasswordInput.value = "";
  }
  private getLoginInput(): iAuthInputs {
    return {
      username: this.logUsernameInput.value,
      password: this.logPasswordInput.value,
    } as iAuthInputs;
  }
  private clearLoginInput(): void {
    this.logUsernameInput.value = "";
    this.logPasswordInput.value = "";
  }

  static showComp(): void {
    this.authLoader.classList.add("hideElement");
    this.authWrap.classList.remove("hideElement");
  }
  static hideComp(): void {
    this.authLoader.classList.add("hideElement");
    this.authWrap.classList.add("hideElement");
  }
  static loadingComp(): void {
    this.authLoader.classList.remove("hideElement");
    this.authWrap.classList.add("hideElement");
  }
  static readonly getInstance = (): AuthComponent => {
    if (!this.instance) this.instance = new AuthComponent();
    return this.instance;
  };
}
