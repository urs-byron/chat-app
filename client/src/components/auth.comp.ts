import { Validate } from "../util/validation.util";
import { tryCatch } from "../util/asyncWrap.util";
import { Component } from "./base.comp";
import { iAuthInputs } from "../models/auth.model";
import { AppComponent } from "./app.comp";
import { iHttpResponse } from "../models/http.model";
import { iValidityType } from "../models/validity.model";
import { GenUtil as Gen } from "../util/gen.util";
import { ErrorComponent, ErrorComponent as error } from "./error.comp";
import { httpPostLogin, httpPostRegister } from "../hooks/requests.hook";

/**
 * Controls processes related to the auth component
 * @extends Component
 */
export class AuthComponent extends Component<HTMLDivElement, HTMLElement> {
  private static instance: AuthComponent;

  private appComp: AppComponent = AppComponent.getInstance();
  private static authWrap: HTMLDivElement;
  private static authLoader: HTMLDivElement;
  private authComps!: HTMLDivElement;
  private authRegisterComp!: HTMLDivElement;
  private authLoginComp!: HTMLDivElement;

  private regForm!: HTMLFormElement;
  private regUsernameInput!: HTMLInputElement;
  private regPasswordInput!: HTMLInputElement;
  private regRePasswordInput!: HTMLInputElement;
  private regSubmit!: HTMLInputElement;

  private signInSpan!: HTMLSpanElement;
  private logForm!: HTMLFormElement;
  private logUsernameInput!: HTMLInputElement;
  private logPasswordInput!: HTMLInputElement;
  private logSubmit!: HTMLInputElement;
  private signUpSpan!: HTMLSpanElement;
  private signOn!: HTMLDivElement;
  private signOnLinks!: HTMLLinkElement[];

  private readonly showSignClass: string = "show-sign-in";

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
    this.authRegisterComp = document.querySelector(
      ".auth-register-div"
    )! as HTMLDivElement;
    this.authLoginComp = document.querySelector(
      "auth-login-div"
    )! as HTMLDivElement;
    this.regForm = this.insertedElement.querySelector(
      "#register-form"
    )! as HTMLFormElement;
    this.authComps = document.querySelector(".auth-comps")! as HTMLDivElement;
    this.regUsernameInput = document.getElementById(
      "reg-username"
    )! as HTMLInputElement;
    this.regPasswordInput = document.getElementById(
      "reg-password"
    )! as HTMLInputElement;
    this.regRePasswordInput = document.getElementById(
      "reg-rePassword"
    )! as HTMLInputElement;
    this.regSubmit = this.regForm.querySelector(
      "input:last-child"
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
    this.logSubmit = this.logForm.querySelector(
      "input:last-child"
    )! as HTMLInputElement;
    this.signInSpan = document.querySelector(
      ".auth-register-div p span"
    )! as HTMLSpanElement;
    this.signUpSpan = document.querySelector(
      ".auth-login-div p span"
    )! as HTMLSpanElement;
    this.signOn = document.querySelector(".auth-signon-div") as HTMLDivElement;
    this.signOnLinks = [
      ...document.querySelectorAll(".auth-signon-div a"),
    ]! as HTMLLinkElement[];

    this.signInSpan.addEventListener("click", this.clickSignInSpan);
    this.signUpSpan.addEventListener("click", this.clickSignUpSpan);
    this.regForm.addEventListener("submit", this.submitRegisterFormHandler);
    this.logForm.addEventListener("submit", this.submitLoginFormHandler);
  }

  renderComponent(): void {
    this.logUsernameInput.setAttribute("disabled", "");
    this.logPasswordInput.setAttribute("disabled", "");
    this.logSubmit.setAttribute("disabled", "");

    this.signOn.classList.add("hideElement", "invisibleElem");
  }

  /** EVENT LISTENERS */

  /**
   * - This function submits user registration data.
   *
   * @param {SubmitEvent} e
   * @returns {Promise<void>}
   *
   * @listens SubmitEvent
   */
  private submitRegisterFormHandler = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    /** DATA GATHERING
     * - Gathers request body data.
     */
    const regInputs: iAuthInputs = this.getRegisterInput();

    /** VALIDATION
     * - Immediately returns & instructs UI to show exception upon invalid gathered data.
     */

    /** @constant @type {iValidityType} */
    const regValid: iValidityType = Validate.registerForm(regInputs);
    if (!regValid.isValid) {
      return error.showComp(
        "ERROR: submitted registration data is invalid",
        regValid.error
      );
    }

    /** HTTP REQUEST
     * - Requests an HTTP POST to the server.
     * - Immediately returns & instructs UI to show exception upon logic error.
     */
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPostRegister, regInputs);
    } catch (err) {
      return error.showComp(
        `ERROR: client is unable to request for registration`,
        err
      );
    }

    /**
     * VALIDATION: HTTP RESPONSE
     * - Immediately returns & instructs UI to show exception upon >= 400 status code.
     */
    const resValid = Validate.httpRes(
      response,
      "server is unable to process request for registration",
      `server responded with an error upon client's request for registration`
    );
    if (!resValid) return;

    /** PROCESS */
    this.clearRegisterInput();
  };

  /**
   * - This function submits user credentials for sign-in.
   *
   * @param {SubmitEvent} e
   * @returns {Promise<void>}
   *
   * @listens SubmitEvent
   */
  private submitLoginFormHandler = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();

    /** DATA GATHERING
     * - Gathers request body data.
     */
    const loginInputs: iAuthInputs = this.getLoginInput();

    /** VALIDATION
     * - Immediately returns and & instructs UI to show exception upon invalid data.
     */
    const loginValid: iValidityType = Validate.loginForm(loginInputs);
    if (!loginValid.isValid) {
      return error.showComp(
        `ERROR: submitted login data is invalid`,
        loginValid.error
      );
    }

    /** HTTP REQUEST
     * - Requests an HTTP POST to the server including user credentials.
     * - Immediately returns and instructs UI to show exception upon logic error.
     */
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpPostLogin, loginInputs);
    } catch (err) {
      return error.showComp(
        "ERROR: client is unable to request for login",
        err
      );
    }

    /** VALIDATION: HTTP RESPONSE
     * - Immediately returns and instructs UI to show exception upon >= 400 status code
     */
    const resValid = Validate.httpRes(
      response,
      "server is unable to process client's request for login",
      `server responded with an error upon client's request for login`
    );
    if (!resValid) return;

    /** HTTP REQUEST
     * - Requests an HTTP GET to the server for authentication
     * - Immediately returns upon unsuccessful sign-in
     */
    const logSuccess = await Gen.logUser();
    if (!logSuccess) return;

    /** PROCESS */
    this.disableRegElements();
    this.disableLogElements();
    this.appComp.appUser();
    this.clearLoginInput();
  };

  /**
   * - This function displays the login form within the auth component upon a click of a certain span element.
   *
   * @param {MouseEvent} e
   *
   * @listens MouseEvent
   */
  private clickSignInSpan = (e: MouseEvent): void => {
    if (!this.authComps.classList.contains(this.showSignClass)) {
      this.showLogForm();

      this.disableRegElements();
      this.enableLogElements();
    }
  };

  /**
   * - This function displays the registration form within the auth component upon a click of a certain span element.
   *
   * @param {MouseEvent} e
   *
   * @listens MouseEvent
   */
  private clickSignUpSpan = (e: MouseEvent): void => {
    if (this.authComps.classList.contains(this.showSignClass)) {
      this.authComps.classList.remove(this.showSignClass);

      this.enableRegElements();
      this.disableLogElements();
    }
  };

  // --------------------------
  // ----- CLASS UTILITY ------
  // --------------------------

  /**
   * - This function returns all the input values from the register form input elements.
   *
   * @returns {iAuthInputs}
   */
  private getRegisterInput(): iAuthInputs {
    return {
      username: this.regUsernameInput.value,
      password: this.regPasswordInput.value,
      rePassword: this.regRePasswordInput.value,
    } as iAuthInputs;
  }

  /**  This function moves AuthComps to display sign-in form. */
  public showLogForm = (): void => {
    this.authComps.classList.add(this.showSignClass);
  };

  /** - This function assigns disable HTML attribute to all of register form's input elements. */
  public disableRegElements = () => {
    this.regUsernameInput.setAttribute("disabled", "");
    this.regPasswordInput.setAttribute("disabled", "");
    this.regRePasswordInput.setAttribute("disabled", "");
    this.regSubmit.setAttribute("disabled", "");
  };

  /** - This function removes disable HTML attribute to all of register form's input elements. */
  public enableRegElements = (): void => {
    this.regUsernameInput.removeAttribute("disabled");
    this.regPasswordInput.removeAttribute("disabled");
    this.regRePasswordInput.removeAttribute("disabled");
    this.regSubmit.removeAttribute("disabled");
  };

  /**
   * This function hides elements of the login form
   * - Assigns disable HTML attribute to all of login form's input elements.
   * - Hides all of login form's sign-on button elements.
   * */
  public disableLogElements = (): void => {
    this.logUsernameInput.setAttribute("disabled", "");
    this.logPasswordInput.setAttribute("disabled", "");
    this.logSubmit.setAttribute("disabled", "");

    setTimeout(() => {
      this.signOn.classList.add("hideElement", "invisibleElem");
    }, 250);
  };

  /**
   * This function assures visibility to elements of the login form
   * - Removes disable HTML attribute to all of login form's input elements.
   * - Remove non-displaying styles to all of login form's sign-on button elements.
   * */
  public enableLogElements = (): void => {
    this.logUsernameInput.removeAttribute("disabled");
    this.logPasswordInput.removeAttribute("disabled");
    this.logSubmit.removeAttribute("disabled");

    this.signOn.classList.remove("hideElement", "invisibleElem");
  };

  /** - Clear used register input tag values. */
  private clearRegisterInput(): void {
    this.regUsernameInput.value = "";
    this.regPasswordInput.value = "";
    this.regRePasswordInput.value = "";
  }

  /**
   * - Returns all the input values from the login form input elements.
   *
   * @returns {iAuthInputs}
   */
  private getLoginInput(): iAuthInputs {
    return {
      username: this.logUsernameInput.value,
      password: this.logPasswordInput.value,
    } as iAuthInputs;
  }

  /** - Clear used login input tag values. */
  private clearLoginInput(): void {
    this.logUsernameInput.value = "";
    this.logPasswordInput.value = "";
  }

  /**
   * This function assures visibility of auth component by hiding auth component loader.
   * @static
   */
  static showComp(): void {
    this.authLoader.classList.add("hideElement");
    this.authWrap.classList.remove("hideElement");
  }

  /**
   * This function hides both auth component & auth component loader gif.
   * @static
   *  */
  static hideComp(): void {
    this.authLoader.classList.add("hideElement");
    this.authWrap.classList.add("hideElement");
  }

  /**
   * This function assures visibility of auth component loader by hiding the auth component.
   * @static
   */
  static loadingComp(): void {
    this.authLoader.classList.remove("hideElement");
    this.authWrap.classList.add("hideElement");
  }

  /**
   * Returns either a new or the old instance of the component
   *
   * @returns {AuthComponent}
   *
   * @static
   */
  static readonly getInstance = (): AuthComponent => {
    if (!this.instance) this.instance = new AuthComponent();
    return this.instance;
  };
}
