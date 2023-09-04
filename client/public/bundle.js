/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/app.comp.ts":
/*!************************************!*\
  !*** ./src/components/app.comp.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _auth_comp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.comp */ "./src/components/auth.comp.ts");
var _a;

/**
 * Controls viewability of the chat component and the auth commponent
 */
class AppComponent {
    /**
     * Class defines main chat div element
     *
     * @constructor
     */
    constructor() {
        this.chatApp = document.querySelector(".chat-app");
    }
    // --------------------------
    // ----- CLASS UTILITY ------
    // --------------------------
    /**
     * This function will move the auth component aside and show the chat component
     */
    appUser() {
        this.chatApp.classList.add("chat-app-user-state");
        _auth_comp__WEBPACK_IMPORTED_MODULE_0__.AuthComponent.hideComp();
    }
    /**
     * This function will move the chat component aside and show the auth component
     */
    appAuth() {
        _auth_comp__WEBPACK_IMPORTED_MODULE_0__.AuthComponent.showComp();
        this.chatApp.classList.remove("chat-app-user-state");
    }
}
_a = AppComponent;
/**
 * This function returns either a new instance or the old instance
 *
 * @returns {AppComponent}
 */
AppComponent.getInstance = () => {
    if (!_a.instance)
        _a.instance = new AppComponent();
    return _a.instance;
};



/***/ }),

/***/ "./src/components/auth.comp.ts":
/*!*************************************!*\
  !*** ./src/components/auth.comp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthComponent": () => (/* binding */ AuthComponent)
/* harmony export */ });
/* harmony import */ var _util_validation_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/validation.util */ "./src/util/validation.util.ts");
/* harmony import */ var _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/asyncWrap.util */ "./src/util/asyncWrap.util.ts");
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
/* harmony import */ var _app_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.comp */ "./src/components/app.comp.ts");
/* harmony import */ var _util_gen_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util/gen.util */ "./src/util/gen.util.ts");
/* harmony import */ var _error_comp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./error.comp */ "./src/components/error.comp.ts");
/* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../hooks/requests.hook */ "./src/hooks/requests.hook.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;







/**
 * Controls processes related to the auth component
 * @extends Component
 */
class AuthComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_2__.Component {
    constructor() {
        super(".chat-app", "auth-temp", "afterbegin");
        this.appComp = _app_comp__WEBPACK_IMPORTED_MODULE_3__.AppComponent.getInstance();
        this.showSignClass = "show-sign-in";
        /** EVENT LISTENERS */
        /**
         * - This function submits user registration data.
         *
         * @param {SubmitEvent} e
         * @returns {Promise<void>}
         *
         * @listens SubmitEvent
         */
        this.submitRegisterFormHandler = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            /** DATA GATHERING
             * - Gathers request body data.
             */
            const regInputs = this.getRegisterInput();
            /** VALIDATION
             * - Immediately returns & instructs UI to show exception upon invalid gathered data.
             */
            /** @constant @type {iValidityType} */
            const regValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_0__.Validate.registerForm(regInputs);
            if (!regValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_5__.ErrorComponent.showComp("ERROR: submitted registration data is invalid", regValid.error);
            }
            /** HTTP REQUEST
             * - Requests an HTTP POST to the server.
             * - Immediately returns & instructs UI to show exception upon logic error.
             */
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_6__.httpPostRegister, regInputs);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_5__.ErrorComponent.showComp(`ERROR: client is unable to request for registration`, err);
            }
            /**
             * VALIDATION: HTTP RESPONSE
             * - Immediately returns & instructs UI to show exception upon >= 400 status code.
             */
            const resValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_0__.Validate.httpRes(response, "server is unable to process request for registration", `server responded with an error upon client's request for registration`);
            if (!resValid)
                return;
            /** PROCESS */
            this.clearRegisterInput();
        });
        /**
         * - This function submits user credentials for sign-in.
         *
         * @param {SubmitEvent} e
         * @returns {Promise<void>}
         *
         * @listens SubmitEvent
         */
        this.submitLoginFormHandler = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            /** DATA GATHERING
             * - Gathers request body data.
             */
            const loginInputs = this.getLoginInput();
            /** VALIDATION
             * - Immediately returns and & instructs UI to show exception upon invalid data.
             */
            const loginValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_0__.Validate.loginForm(loginInputs);
            if (!loginValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_5__.ErrorComponent.showComp(`ERROR: submitted login data is invalid`, loginValid.error);
            }
            /** HTTP REQUEST
             * - Requests an HTTP POST to the server including user credentials.
             * - Immediately returns and instructs UI to show exception upon logic error.
             */
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_6__.httpPostLogin, loginInputs);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_5__.ErrorComponent.showComp("ERROR: client is unable to request for login", err);
            }
            /** VALIDATION: HTTP RESPONSE
             * - Immediately returns and instructs UI to show exception upon >= 400 status code
             */
            const resValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_0__.Validate.httpRes(response, "server is unable to process client's request for login", `server responded with an error upon client's request for login`);
            if (!resValid)
                return;
            /** HTTP REQUEST
             * - Requests an HTTP GET to the server for authentication
             * - Immediately returns upon unsuccessful sign-in
             */
            const logSuccess = yield _util_gen_util__WEBPACK_IMPORTED_MODULE_4__.GenUtil.logUser();
            if (!logSuccess)
                return;
            /** PROCESS */
            this.disableRegElements();
            this.disableLogElements();
            this.appComp.appUser();
            this.clearLoginInput();
        });
        /**
         * - This function displays the login form within the auth component upon a click of a certain span element.
         *
         * @param {MouseEvent} e
         *
         * @listens MouseEvent
         */
        this.clickSignInSpan = (e) => {
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
        this.clickSignUpSpan = (e) => {
            if (this.authComps.classList.contains(this.showSignClass)) {
                this.authComps.classList.remove(this.showSignClass);
                this.enableRegElements();
                this.disableLogElements();
            }
        };
        /**  This function moves AuthComps to display sign-in form. */
        this.showLogForm = () => {
            this.authComps.classList.add(this.showSignClass);
        };
        /** - This function assigns disable HTML attribute to all of register form's input elements. */
        this.disableRegElements = () => {
            this.regUsernameInput.setAttribute("disabled", "");
            this.regPasswordInput.setAttribute("disabled", "");
            this.regRePasswordInput.setAttribute("disabled", "");
            this.regSubmit.setAttribute("disabled", "");
        };
        /** - This function removes disable HTML attribute to all of register form's input elements. */
        this.enableRegElements = () => {
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
        this.disableLogElements = () => {
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
        this.enableLogElements = () => {
            this.logUsernameInput.removeAttribute("disabled");
            this.logPasswordInput.removeAttribute("disabled");
            this.logSubmit.removeAttribute("disabled");
            this.signOn.classList.remove("hideElement", "invisibleElem");
        };
        this.configureComponent();
        this.renderComponent();
    }
    configureComponent() {
        AuthComponent.authWrap = document.querySelector(".auth-comp");
        AuthComponent.authLoader = document.querySelector(".auth-wrap .loader");
        this.authRegisterComp = document.querySelector(".auth-register-div");
        this.authLoginComp = document.querySelector("auth-login-div");
        this.regForm = this.insertedElement.querySelector("#register-form");
        this.authComps = document.querySelector(".auth-comps");
        this.regUsernameInput = document.getElementById("reg-username");
        this.regPasswordInput = document.getElementById("reg-password");
        this.regRePasswordInput = document.getElementById("reg-rePassword");
        this.regSubmit = this.regForm.querySelector("input:last-child");
        this.logForm = this.insertedElement.querySelector("#login-form");
        this.logUsernameInput = document.getElementById("log-username");
        this.logPasswordInput = document.getElementById("log-password");
        this.logSubmit = this.logForm.querySelector("input:last-child");
        this.signInSpan = document.querySelector(".auth-register-div p span");
        this.signUpSpan = document.querySelector(".auth-login-div p span");
        this.signOn = document.querySelector(".auth-signon-div");
        this.signOnLinks = [
            ...document.querySelectorAll(".auth-signon-div a"),
        ];
        this.signInSpan.addEventListener("click", this.clickSignInSpan);
        this.signUpSpan.addEventListener("click", this.clickSignUpSpan);
        this.regForm.addEventListener("submit", this.submitRegisterFormHandler);
        this.logForm.addEventListener("submit", this.submitLoginFormHandler);
    }
    renderComponent() {
        this.logUsernameInput.setAttribute("disabled", "");
        this.logPasswordInput.setAttribute("disabled", "");
        this.logSubmit.setAttribute("disabled", "");
        this.signOn.classList.add("hideElement", "invisibleElem");
    }
    // --------------------------
    // ----- CLASS UTILITY ------
    // --------------------------
    /**
     * - This function returns all the input values from the register form input elements.
     *
     * @returns {iAuthInputs}
     */
    getRegisterInput() {
        return {
            username: this.regUsernameInput.value,
            password: this.regPasswordInput.value,
            rePassword: this.regRePasswordInput.value,
        };
    }
    /** - Clear used register input tag values. */
    clearRegisterInput() {
        this.regUsernameInput.value = "";
        this.regPasswordInput.value = "";
        this.regRePasswordInput.value = "";
    }
    /**
     * - Returns all the input values from the login form input elements.
     *
     * @returns {iAuthInputs}
     */
    getLoginInput() {
        return {
            username: this.logUsernameInput.value,
            password: this.logPasswordInput.value,
        };
    }
    /** - Clear used login input tag values. */
    clearLoginInput() {
        this.logUsernameInput.value = "";
        this.logPasswordInput.value = "";
    }
    /**
     * This function assures visibility of auth component by hiding auth component loader.
     * @static
     */
    static showComp() {
        this.authLoader.classList.add("hideElement");
        this.authWrap.classList.remove("hideElement");
    }
    /**
     * This function hides both auth component & auth component loader gif.
     * @static
     *  */
    static hideComp() {
        this.authLoader.classList.add("hideElement");
        this.authWrap.classList.add("hideElement");
    }
    /**
     * This function assures visibility of auth component loader by hiding the auth component.
     * @static
     */
    static loadingComp() {
        this.authLoader.classList.remove("hideElement");
        this.authWrap.classList.add("hideElement");
    }
}
_a = AuthComponent;
/**
 * Returns either a new or the old instance of the component
 *
 * @returns {AuthComponent}
 *
 * @static
 */
AuthComponent.getInstance = () => {
    if (!_a.instance)
        _a.instance = new AuthComponent();
    return _a.instance;
};



/***/ }),

/***/ "./src/components/base.comp.ts":
/*!*************************************!*\
  !*** ./src/components/base.comp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
class Component {
    /**
     * This constructor, upon instantiating, attaches a temlate HTML element within wrapper element
     *
     * @param {string} wrapperClass - class of the soon container of the template element
     * @param {string} templateId - id of the template element
     * @param {string} insertedPosition - position within the wrapperElement where the template will be inserted
     * @param {string} [insertedId] - assigns id to the insertedElement if not null | undefined
     *
     * @constructor
     * @abstract
     */
    constructor(wrapperClass, templateId, insertedPosition, insertedId) {
        // --- --- class variables as HTML
        this.wrapperElement = document.querySelector(wrapperClass);
        this.templateElement = document.getElementById(templateId);
        // --- --- --- newNode as import child copy of template
        this.insertedElement = document.importNode(this.templateElement.content, true).firstElementChild;
        // --- --- newNode set id
        if (insertedId)
            this.insertedElement.setAttribute("id", insertedId);
        // --- --- attach call
        this.attachElement(insertedPosition);
    }
    /**
     * This function inserts the template element within the wrapper element depending on the position.
     * @param {string} position
     */
    attachElement(position) {
        this.wrapperElement.insertAdjacentElement(position, this.insertedElement);
    }
}


/***/ }),

/***/ "./src/components/chat.comp.ts":
/*!*************************************!*\
  !*** ./src/components/chat.comp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatComponent": () => (/* binding */ ChatComponent)
/* harmony export */ });
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
var _a;

class ChatComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * This class, upon instantiation, creates HTML element for main chat component
     *
     * @constructor
     * @extends Component
     */
    constructor() {
        super(".chat-app", "chat-temp", "afterbegin");
    }
    configureComponent() { }
    renderComponent() { }
}
_a = ChatComponent;
// --------------------------
// ----- CLASS UTILITY ------
// --------------------------
/**
 * This function returns either a new or the old instance of the class.
 *
 * @returns {ChatComponent}
 */
ChatComponent.getInstance = () => {
    if (!_a.instance)
        _a.instance = new ChatComponent();
    return _a.instance;
};



/***/ }),

/***/ "./src/components/error.comp.ts":
/*!**************************************!*\
  !*** ./src/components/error.comp.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorComponent": () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
var _a;

/** This class creates HTML element for client UI components upon super */
class ErrorComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_0__.Component {
    /**
     * @constructor
     * @extends Component
     */
    constructor() {
        super(".chat-app", "error-temp", "afterbegin");
    }
    configureComponent(...args) { }
    renderComponent(...args) { }
}
_a = ErrorComponent;
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
ErrorComponent.showComp = (head, content) => {
    /** error container element */
    const wrap = document.querySelector(".error-wrap");
    /** error head element */
    const errorHead = document.querySelector(".error-head");
    /** error content element */
    const errorContent = document.querySelector(".error-content");
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
ErrorComponent.getInstance = () => {
    if (!_a.instance)
        _a.instance = new ErrorComponent();
    return _a.instance;
};



/***/ }),

/***/ "./src/components/group.comp.ts":
/*!**************************************!*\
  !*** ./src/components/group.comp.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupComponent": () => (/* binding */ GroupComponent)
/* harmony export */ });
/* harmony import */ var _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/asyncWrap.util */ "./src/util/asyncWrap.util.ts");
/* harmony import */ var _util_validation_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation.util */ "./src/util/validation.util.ts");
/* harmony import */ var _peer_comp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./peer.comp */ "./src/components/peer.comp.ts");
/* harmony import */ var _util_socket_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/socket.util */ "./src/util/socket.util.ts");
/* harmony import */ var _error_comp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error.comp */ "./src/components/error.comp.ts");
/* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks/requests.hook */ "./src/hooks/requests.hook.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;






/** This class holds functions related to managing & rendering of client stored group data */
class GroupComponent {
    /**
     * Upon instantiating, the constructor fetches & renders user related groups
     *
     * @param {string} peerId - account id of connected user peer
     * @param {iChatType} type - chat type of the peer
     *
     * @constructor
     */
    constructor(peerId, type) {
        this.peerId = peerId;
        this.type = type;
        /** @type { iRelation[] } - array of information about connected user groups */
        this.userGroups = [];
        // --------------------------
        // ----- EVENT HANDLERS -----
        // --------------------------
        /**
         * This functions sends multiple incoming peer request to user related groups via socket
         *
         * @param {MouseEvent} e
         *
         * @listens MouseEvent
         */
        this.submitMembershipRequest = (e) => {
            var _b;
            if (GroupComponent.requestStack === undefined ||
                GroupComponent.requestStack === null ||
                !Array.isArray(GroupComponent.requestStack) ||
                GroupComponent.requestStack.length < 0)
                return;
            /** Data Gathering */
            /** @type {iRequestBody} - temporary request body holder */
            let req;
            /** @type {iValidityType} - temporary request body validity holder */
            let reqValid;
            /** Loops over request stack for multiple group-2-user requests via socket */
            for (req of GroupComponent.requestStack) {
                /** Inspects request body validity, skips data upon data invalidity. */
                reqValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_1__.Validate.requestBody(req);
                if (!reqValid.isValid)
                    continue;
                (_b = _util_socket_util__WEBPACK_IMPORTED_MODULE_3__.SocketMethods.socket) === null || _b === void 0 ? void 0 : _b.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_3__.SocketMethods.postRequestEv, req);
            }
            GroupComponent.emptyRequestStack();
        };
        /**
         * This function requests an HTTP POST to the server to create a new group.
         *
         * @param {SubmitEvent} e
         *
         * @listens SubmitEvent
         */
        this.submitNewGroup = (e) => __awaiter(this, void 0, void 0, function* () {
            var _b, _c;
            e.preventDefault();
            /** new group object */
            const newGrpObj = {
                recipientId: this.chatMsgs.dataset.userId
                    ? this.chatMsgs.dataset.userId
                    : "",
                grpName: this.groupsInput.value,
            };
            /** Returns immediately if request data is found invalid. */
            const newGrpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_1__.Validate.newGroupInput(newGrpObj);
            if (!newGrpValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_4__.ErrorComponent.showComp("ERROR: client's new group request data is invalid", newGrpValid.error);
            }
            /** Request HTTP POST to server to create new group. */
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_0__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_5__.httpPostGroup, newGrpObj);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_4__.ErrorComponent.showComp("ERROR: client is unable to request for user groups", err);
            }
            /** Immediately returns if the HTTP response is invalid. */
            let httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_1__.Validate.httpRes(response, `server is unable to process request for submitting new group`, `server responded with an error upon client's request for user groups`);
            if (!httpValid)
                return;
            /** Gather data for sequential group-to-user request after successful group creation */
            const grpRel = response.data.data;
            const grp_id = grpRel.accnt_id;
            const reqBody = GroupComponent.createRequestBody(this.chatMsgs.dataset.userId, grp_id);
            /** Returns immediately if request data is found invalid. */
            const reqValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_1__.Validate.requestBody(reqBody);
            if (!reqValid.isValid)
                return;
            /** Request via socket to server create request from group-to-user. */
            (_b = _util_socket_util__WEBPACK_IMPORTED_MODULE_3__.SocketMethods.socket) === null || _b === void 0 ? void 0 : _b.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_3__.SocketMethods.postRequestEv, reqBody);
            /** Update peer component list with new group */
            _peer_comp__WEBPACK_IMPORTED_MODULE_2__.PeerComponent.updatePeerListHTML(grpRel);
            /** Connect to socket room after successful group creation */
            (_c = _util_socket_util__WEBPACK_IMPORTED_MODULE_3__.SocketMethods.socket) === null || _c === void 0 ? void 0 : _c.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_3__.SocketMethods.joinRoomEv, grpRel.chat_id, (res) => {
                console.log(res);
            });
            /** Clear used group input element */
            this.groupsInput.value = "";
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getGroups();
                this.configureComponent();
                this.renderComponent();
            }
            catch (err) {
                _error_comp__WEBPACK_IMPORTED_MODULE_4__.ErrorComponent.showComp("ERROR: client is unable to get user groups", err);
            }
        }))();
    }
    configureComponent(...args) {
        GroupComponent.sPeerId = this.peerId;
        GroupComponent.groupsWrap = document.querySelector(".chat-msg-groups");
        this.groupRequestBtn = document.querySelector(".chat-msg-groups-head i");
        this.groupsForm = document.querySelector(".chat-msg-group-new");
        this.groupsInput = document.querySelector(".chat-msg-group-new input");
        this.chatMsgs = document.querySelector(".chat-msgs");
        this.groupRequestBtn.addEventListener("click", this.submitMembershipRequest);
        this.groupsForm.addEventListener("submit", this.submitNewGroup);
    }
    renderComponent(...args) {
        this.generateGroups();
    }
    // --------------------------
    // ----- CLASS UTILITY ------
    // --------------------------
    /**
     * This function:
     * - fetches groups from the server
     * - stores it in the sessionSotrage
     *
     * @returns { Promise<void> }
     */
    getGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            /** Check if sessionStorage has stored group items. */
            const gs = sessionStorage.getItem(GroupComponent.grpSessionStoreName);
            /** Immediately returns if true. */
            if (gs && Array.isArray(JSON.parse(gs))) {
                this.userGroups = JSON.parse(gs);
                return;
            }
            /** Request HTTP GET to the server for user related groups */
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_0__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_5__.httpGetGroups);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_4__.ErrorComponent.showComp("ERROR: client is unable to get user groups", err);
            }
            /** Immediately returns if HTTP Response is invalid */
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_1__.Validate.httpRes(response, `server is unable to process request for user groups`, `server responded with an error upon client's request for user groups`);
            if (!httpValid)
                return;
            /** Store groups received to:
             * - class
             * - sessionStorage
             * */
            this.userGroups = response.data.data;
            sessionStorage.setItem(GroupComponent.grpSessionStoreName, JSON.stringify(this.userGroups));
        });
    }
    /** This function creates group lists for a group type message component */
    generateGroups() {
        if (this.type === "group")
            return;
        let grp;
        for (grp of this.userGroups) {
            if (grp.accnt_id !== this.peerId)
                GroupComponent.createGroupItemHTML(grp, GroupComponent.groupsWrap);
        }
    }
    /**
     * This function creates a request object for a group-to-user.
     *
     * @param { string } groupId
     * @param { string } receiverId
     * @returns { iRequestBody }
     *
     * @static
     */
    static createRequestBody(groupId, receiverId) {
        return {
            type: 3,
            recipientId: receiverId,
            groupId: groupId,
        };
    }
}
_a = GroupComponent;
/** @type { iRequestBody[] } - array of request data for multiple group-to-user requests */
GroupComponent.requestStack = [];
/** @type { string } - naming signature for for all groups stored within sessionStorage */
GroupComponent.grpSessionStoreName = "sessionGroups";
// --------------------------
// ------- GET | SET --------
// --------------------------
/**
 * Empties group-to-user request stack
 *
 * @static
 */
GroupComponent.emptyRequestStack = () => {
    GroupComponent.requestStack = [];
};
/**
 * This function modifies group-to-user request stack and corresponding HTML elements
 * - in/decrement group-to-user request stack.
 * - modifies HTML element which corresponds to group clicked
 *
 * @param { MouseEvent } e
 *
 * @listens MouseEvent
 *
 * @static
 */
GroupComponent.addMembershipRequest = (e) => {
    const grpBtns = e.currentTarget;
    const grpId = grpBtns.dataset.grpId;
    // toggle class
    grpBtns.classList.toggle("chat-msg-group-action-undo");
    // if after toggling, undo class is present: push to stack
    if (grpBtns.classList.contains("chat-msg-group-action-undo"))
        _a.requestStack.push(GroupComponent.createRequestBody(grpId, GroupComponent.sPeerId));
    // if after toggling, undo class is present: remove to stack
    else
        _a.requestStack = _a.requestStack.filter((req) => req.groupId !== grpId);
};
/**
 * This function creates an HTML element within the message component's connected groups list.
 *
 * @param { iRelation } grp
 * @param { HTMLDivElement } wrapper
 */
GroupComponent.createGroupItemHTML = (grp, wrapper) => {
    //   <div class='chat-msg-group-item'>
    const grpWrap = document.createElement("div");
    grpWrap.classList.add("chat-msg-group-item");
    //     <h4>grp 1</h4>
    const grpName = document.createElement("h4");
    grpName.textContent = grp.accnt_name;
    //     <div class='chat-msg-group-action'>
    const grpBtns = document.createElement("div");
    grpBtns.classList.add("chat-msg-group-action");
    //       <span>undo</span>
    const undoBtn = document.createElement("span");
    undoBtn.textContent = "undo";
    //       <i class='fa-solid fa-plus'></i>
    const addBtn = document.createElement("i");
    addBtn.classList.add("fa-solid", "fa-plus");
    grpBtns.appendChild(undoBtn);
    grpBtns.appendChild(addBtn);
    grpBtns.dataset.grpId = grp.accnt_id;
    grpWrap.appendChild(grpName);
    grpWrap.appendChild(grpBtns);
    wrapper.appendChild(grpWrap);
    grpBtns.addEventListener("click", GroupComponent.addMembershipRequest);
    //     </div>
    //   </div>
};
/**
 * This function returns either:
 * - new or old instance of the class
 * - null if the class is to be deleted
 *
 * @param { string } peerId - account id of the user's connected peer
 * @param { iChatType } type - chat type of the user's connected peer
 * @param { boolean } deleteInstance - flag indicating whether class is to be deleted or not
 * @returns { GroupComponent | null }
 *
 * @static
 */
GroupComponent.getInstance = (peerId, type, deleteInstance) => {
    if (!deleteInstance) {
        if (!_a.instance) {
            _a.instance = new GroupComponent(peerId, type);
            GroupComponent.emptyRequestStack();
        }
    }
    else {
        _a.instance = null;
    }
    return _a.instance;
};



/***/ }),

/***/ "./src/components/msgs.comp.ts":
/*!*************************************!*\
  !*** ./src/components/msgs.comp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessagesComponent": () => (/* binding */ MessagesComponent)
/* harmony export */ });
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
/* harmony import */ var _msgsList_comp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./msgsList.comp */ "./src/components/msgsList.comp.ts");
/* harmony import */ var _msgsOpts_comp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./msgsOpts.comp */ "./src/components/msgsOpts.comp.ts");
var _a;



/**
 * This class holds functions related to modifying class instances and UI interface of:
 * - MessagesListComponent
 * - MessagesOptionsComponent
 *
 * @extends Component
 */
class MessagesComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_0__.Component {
    constructor() {
        super(".chat-msgs-wrap", "msgs-temp", "afterbegin");
        this.configureComponent();
        this.renderComponent();
    }
    configureComponent() { }
    renderComponent() { }
}
_a = MessagesComponent;
MessagesComponent.chatMsgUserClass = "chat-msgs-user";
MessagesComponent.chatMsgGroupClass = "chat-msgs-group";
// --------------------------
// ----- CLASS UTILITY ------
// --------------------------
/**
 * This function controls whether MessagesComponent either:
 * - call a new class for a new peer message component
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
MessagesComponent.getInstance = (userId, peerId, peerName, chatId, availability, type, deleteInstance, fromPeer) => {
    // if static function is called for creating new class components
    if (!deleteInstance) {
        if (!_a.instance) {
            // if no messageComponent exists, create a new one
            _a.instance = new MessagesComponent();
            _a.chatMsgs = document.querySelector(".chat-msgs");
            // set message component chat type
            type === "user"
                ? MessagesComponent.chatMsgs.classList.add(MessagesComponent.chatMsgUserClass)
                : MessagesComponent.chatMsgs.classList.add(MessagesComponent.chatMsgGroupClass);
            _a.getMsgsInstance(userId, peerId, peerName, chatId, availability, type, fromPeer, false);
        }
        else if (_a.chatMsgs.dataset.userId !== peerId) {
            // else, delete then replace the previous one
            _a.getMsgsInstance("deleteId", "deleteId", "deleteName", "deleteChatId", false, type, fromPeer, true);
            // delete message component HTML
            _a.chatMsgs.innerHTML = "";
            // replace message component chat type
            type === "user"
                ? MessagesComponent.chatMsgs.classList.replace(MessagesComponent.chatMsgGroupClass, MessagesComponent.chatMsgUserClass)
                : MessagesComponent.chatMsgs.classList.replace(MessagesComponent.chatMsgUserClass, MessagesComponent.chatMsgGroupClass);
            _a.getMsgsInstance(userId, peerId, peerName, chatId, availability, type, fromPeer, false);
        }
    }
    else {
        // else, delete component
        _a.getMsgsInstance("deleteId", "deleteId", "deleteName", "deleteChatId", false, type, fromPeer, true);
    }
    return _a.instance;
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
MessagesComponent.getMsgsInstance = (userId, peerId, peerName, chatId, availability, type, fromPeer, deleteInstance) => {
    if (peerId === _a.chatMsgs.dataset.userId)
        return;
    deleteInstance
        ? (_a.chatMsgs.dataset.userId = "")
        : (_a.chatMsgs.dataset.userId = peerId);
    _a.msgOptsInstance = _msgsOpts_comp__WEBPACK_IMPORTED_MODULE_2__.MessagesOptionsComponent.getInstance(peerId, peerName, chatId, type, availability, fromPeer, deleteInstance);
    _a.msgListInstance = _msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.init(userId, peerId, peerName, chatId, availability, type, fromPeer, deleteInstance);
};



/***/ }),

/***/ "./src/components/msgsList.comp.ts":
/*!*****************************************!*\
  !*** ./src/components/msgsList.comp.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessagesListComponent": () => (/* binding */ MessagesListComponent)
/* harmony export */ });
/* harmony import */ var _util_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/gen.util */ "./src/util/gen.util.ts");
/* harmony import */ var _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/asyncWrap.util */ "./src/util/asyncWrap.util.ts");
/* harmony import */ var _util_validation_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation.util */ "./src/util/validation.util.ts");
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
/* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/requests.hook */ "./src/hooks/requests.hook.ts");
/* harmony import */ var _peer_comp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peer.comp */ "./src/components/peer.comp.ts");
/* harmony import */ var _util_socket_util__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../util/socket.util */ "./src/util/socket.util.ts");
/* harmony import */ var _group_comp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./group.comp */ "./src/components/group.comp.ts");
/* harmony import */ var _error_comp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./error.comp */ "./src/components/error.comp.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;









/**
 * This class holds functions which manage and render data related to the user and their peer(s)' message lists and its items.
 *
 * @extends Component
 */
class MessagesListComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_3__.Component {
    /**
     * Upon instantiation, the constructor:
     * - checks for available session stored matching message list
     * - if available: skips fetching from server and modifies pagination related data
     * - else        : fetches from server
     *
     * Then:
     * - configures related UI component
     * - render related UI component
     *
     * @param { string } userId - account id of the client logged in
     * @param { string } peerId - account id of the user's target connected peer
     * @param { string } peerName - account name of the user's target connected peer
     * @param { string } chatId - chat id between the user & peer | group
     * @param { boolean } availability - availability setting of the user target
     * @param { iChatType } type - chat type of the user's target
     * @param { boolean } fromPeer - flag indicating if the user target is from the peer list
     *
     * @constructor
     */
    constructor(userId, peerId, peerName, chatId, availability, type, fromPeer) {
        super(".chat-msgs", "msgs-list-temp", "afterbegin");
        this.userId = userId;
        this.peerId = peerId;
        this.peerName = peerName;
        this.chatId = chatId;
        this.availability = availability;
        this.type = type;
        this.fromPeer = fromPeer;
        /** Skip counter for the peer list's pagination logic. */
        this.skip = 0;
        /** Skip Constant for the peer list's pagination logic. */
        this.skipCnt = 30;
        /** Message ID between the user & peer's chat data. */
        this.msgsId = null;
        /** Message List Items Map between the user & peer's chat data. */
        this.msgsLists = new Map();
        /** Message List Items count between the user & peer's chat data. */
        this.msgsListCnt = 0;
        /** This function increments the Message List Items count of a specific chat data by one (1). */
        this.incrMsgsListCnt = () => {
            this.msgsListCnt++;
        };
        // --------------------------
        // ----- EVENT HANDLERS -----
        // --------------------------
        /**
         * This listener function shows group component if the target peer type is user.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickMsgOptsBtnHandler = (e) => {
            this.chatMsgModal.classList.toggle("chat-msg-group-modal-show-state");
            _group_comp__WEBPACK_IMPORTED_MODULE_7__.GroupComponent.emptyRequestStack();
        };
        /**
         * This listener function sends request to the target peer via socket.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickMsgBtnRequestHandler = (e) => {
            var _b;
            const reqBody = MessagesListComponent.createRequestBody(this.chatMsgsForms.dataset.chatType, this.peerId);
            (_b = _util_socket_util__WEBPACK_IMPORTED_MODULE_6__.SocketMethods.socket) === null || _b === void 0 ? void 0 : _b.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_6__.SocketMethods.postRequestEv, reqBody);
        };
        /**
         * This listener function sends message body to the target peer chat via socket.
         *
         * @param { SubmitEvent } e
         *
         * @listens SubmitEvent
         */
        this.submitMessageHandler = (e) => {
            e.preventDefault();
            const inputHMTL = e.target.querySelector("input");
            /** Message Item to be sent to chat */
            const msgBody = {
                msg: inputHMTL.value,
                msgId: crypto.randomUUID().replace(/-/g, ""),
                chatId: this.chatId,
                senderName: "You",
                senderId: this.userId,
                timeReceived: 0,
            };
            /** Socket Event and callback Response upon sending message to chat */
            _util_socket_util__WEBPACK_IMPORTED_MODULE_6__.SocketMethods.socket.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_6__.SocketMethods.postMessageEv, msgBody, this.peerId, this.type, (res) => {
                if ("msg" in res) {
                    MessagesListComponent.createMsgItem(res, MessagesListComponent.chatMsgBody, MessagesListComponent.getChatMsgsListWrap(), 0);
                    _peer_comp__WEBPACK_IMPORTED_MODULE_5__.PeerComponent.updatePeerListHTML({ accnt_id: this.peerId, chat_id: res.chatId }, res);
                    this.msgsListCnt = this.msgsListCnt + 1;
                    MessagesListComponent.setMsgListInfo(this.chatId, res, null);
                    MessagesListComponent.getChatMsgsListWrap().scrollTop =
                        MessagesListComponent.getChatMsgsListWrap().scrollHeight;
                }
                else
                    _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: server failed to send message", JSON.stringify(res));
            });
            inputHMTL.value = "";
        };
        /**
         * This listener function retrieves addition message list items from target peer chat.
         *
         * @param { Event } e - specifically a scroll event
         *
         * @listens Event - specifically a scroll event
         */
        this.getMoreMessages = (e) => __awaiter(this, void 0, void 0, function* () {
            // DATA FATHERING
            const t = e.target;
            let response;
            const skipChatReq = this.getChatReqBody();
            // VALIDATION: if scroll height is not at top, return
            if (t.scrollTop !== 0)
                return;
            // VALIDATION: if message items exceed starting skip item, return
            const listCnt = MessagesListComponent.getMsgListInfoCount(this.chatId);
            if (this.skip * this.skipCnt > listCnt)
                return;
            const currentScrolllHeight = t.scrollHeight;
            // VALIDATION: HTTP REQUEST
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_4__.httpGetMsgs, skipChatReq);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client is unable to fetch chat messages", err);
            }
            // VALIDATION: HTTP RESPONSE
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server error occured`, `client responded with an error for upon request for chat messages`);
            if (!httpValid)
                return;
            // VALIDATION: check if response has additional data
            if (response.data.data === null)
                return;
            const msgs = response.data.data.msgs;
            // VALIDATION: check if array has contents
            if (msgs === null || !Array.isArray(msgs) || !msgs.length)
                return;
            // PROCESS: add HTML message items
            this.generateMsgItems(this.userId, msgs);
            // PROCESS: reverse received array
            // const revArrMsgs: iMsgBody[] = [];
            // let msg: iMsgBody;
            // for (msg of msgs) {
            //   revArrMsgs.unshift(msg);
            // }
            // PROCESS: +1 to skip
            this.skip++;
            // PROCESS: add list items count
            this.msgsListCnt = this.msgsListCnt + msgs.length;
            // PROCESS: update class message list
            // this.msgsLists.set(this.chatId, [
            //   ...this.msgsLists.get(this.chatId)!,
            //   ...revArrMsgs,
            // ]);
            // PROCESS: update session storage message list
            MessagesListComponent.setMsgListInfo(this.chatId, null, msgs);
            // PROCESS: maintain current scroll location
            t.scrollTop = t.scrollHeight - currentScrolllHeight;
        });
        /**
         * This function renders retrieved array of message list items to HTML elements.
         *
         * @param { string } userId - account id of the client logged in
         * @param { iMsgBody[] } msgs - Message List Items Array between the user & peer's chat data.
         */
        this.generateMsgItems = (userId, msgs) => {
            let msg;
            if (msgs === null || !Array.isArray(msgs) || !msgs.length)
                return;
            for (msg of msgs) {
                MessagesListComponent.createMsgItem(msg, MessagesListComponent.chatMsgBody, MessagesListComponent.getChatMsgsListWrap(), userId === msg.senderId ? 0 : 1, true);
            }
        };
        (() => __awaiter(this, void 0, void 0, function* () {
            if (_peer_comp__WEBPACK_IMPORTED_MODULE_5__.PeerComponent.searchPeerInfo(this.chatId) !== undefined) {
                const n = MessagesListComponent.getMsgListInfoCount(this.chatId);
                if (!n)
                    yield this.getMessages();
                else {
                    this.msgsListCnt = n;
                    const m = Math.floor(n / this.skipCnt);
                    this.skip = m;
                }
            }
            this.configureComponent();
            this.renderComponent(userId, peerId, peerName, chatId, availability, type);
        }))();
    }
    configureComponent() {
        MessagesListComponent.sPeerId = this.peerId;
        MessagesListComponent.chatMsgsListWrap = document.querySelector(".chat-msg-body-wrap");
        MessagesListComponent.chatMsgsListWrap.dataset.chatId = this.chatId;
        MessagesListComponent.chatMsgBody = document.querySelector("#chat-msg-body");
        this.chatMsgHead = document.querySelector(".chat-msg-head");
        this.chatMsgHeadName = document.querySelector(".chat-msg-head-name h2");
        this.chatListGrpBtnWrap = document.querySelector(".chat-msg-head-opts-btn");
        this.chatListGrpBtn = document.querySelector(".chat-msg-head-opts-btn i");
        this.chatMsgsForms = document.querySelector(".chat-msg-forms");
        this.chatMsgRequest = document.querySelector(".chat-msg-request");
        this.chatMsgForm = document.querySelector(".chat-msg-form");
        this.chatMsgModal = document.querySelector(".chat-msg-group-modal");
        this.modalGroupInput = document.querySelector(".chat-msg-group-new input");
        this.chatMsgRequest.addEventListener("click", this.clickMsgBtnRequestHandler);
        this.chatMsgForm.addEventListener("submit", this.submitMessageHandler);
        MessagesListComponent.chatMsgsListWrap.addEventListener("scroll", this.getMoreMessages);
    }
    renderComponent(userId, peerId, peerName, chatId, availability, type) {
        this.chatMsgsForms.dataset.peerId = peerId;
        this.chatMsgsForms.dataset.chatType = type;
        this.chatMsgHeadName.textContent = peerName;
        if (this.type === "group") {
            this.chatMsgHead.removeChild(this.chatListGrpBtnWrap);
        }
        if (!availability) {
            this.chatListGrpBtn.classList.add("chat-msg-head-opts-btn-unavailable-state");
            MessagesListComponent.getChatMsgsListWrap().scrollTop =
                MessagesListComponent.getChatMsgsListWrap().scrollHeight;
            this.chatMsgsForms.classList.add("chat-msg-form-request-state");
        }
        else {
            this.chatListGrpBtn.addEventListener("click", this.clickMsgOptsBtnHandler);
        }
        if (type === "user")
            _group_comp__WEBPACK_IMPORTED_MODULE_7__.GroupComponent.getInstance(peerId, type, false);
        this.generateMsgItems(userId, JSON.parse(sessionStorage.getItem(MessagesListComponent.sessionStoreListKey + this.chatId)));
        MessagesListComponent.getChatMsgsListWrap().scrollTop =
            MessagesListComponent.getChatMsgsListWrap().scrollHeight;
    }
    // --------------------------
    // ----- CLASS UTILITY ------
    // --------------------------
    /**
     * This function requests an HTTP POST to the server to retrieve first batch of chat data message items.
     *
     * @returns { Promise<void> }
     */
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            // DATA GATHERING
            let response;
            const chatReqBody = this.getChatReqBody();
            // HTTP REQUEST: request for chat messages
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_4__.httpGetMsgs, chatReqBody);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client is unable to fetch chat messages", err);
            }
            // VALIDATION: HTTP RESPONSE
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server error occured`, `client responded with an error for upon request for chat messages`);
            if (!httpValid)
                return;
            // HTTP RESPONSE PROCESSING
            // --- +1 for skip
            this.skip++;
            // --- store messageId
            this.msgsId = response.data.data.msgsId;
            // --- store chat messages as session storage
            // this.msgsLists.set(this.chatId, response.data.data.msgs);
            // sessionStorage.setItem(
            //   MessagesListComponent.sessionStoreListKey + this.chatId,
            //   JSON.stringify(response.data.data.msgs)
            // );
            // PROCESS: further if the message data retrieved is not empty by any means
            if (response.data.data.msgs !== null &&
                Array.isArray(response.data.data.msgs) &&
                response.data.data.msgs.length)
                this.msgsListCnt = response.data.data.msgs.length;
            MessagesListComponent.setMsgListInfo(this.chatId, null, response.data.data.msgs);
        });
    }
    /**
     * This function creates an object for the user's outgoing request.
     *
     * @param { iChatType } type - chat type of the user's target
     * @param { string } receiverId - account id of the user's request recipient
     * @returns { iRequestBody }
     *
     * @static
     */
    static createRequestBody(type, receiverId) {
        return {
            type: type === "user" ? 1 : 2,
            recipientId: type === "user" ? receiverId : null,
            groupId: type === "group" ? receiverId : null,
        };
    }
    /**
     * This function returns an object to be use for requesting subsequent batch of message list items.
     *
     * @returns { iChatReqBody }
     */
    getChatReqBody() {
        return {
            skip: this.skip,
            type: this.type,
            chatId: this.chatId,
            listCnt: this.msgsListCnt,
        };
    }
}
_a = MessagesListComponent;
/** CSS Class name to style user sent message. */
MessagesListComponent.myMsgClass = "chat-msg-mine";
/** CSS Class name to style peer(s) sent message. */
MessagesListComponent.peerMsgClass = "chat-msg-others";
/** Naming convention for session stored message list array. */
MessagesListComponent.sessionStoreListKey = "msgList";
// --------------------------
// ------- GET | SET --------
// --------------------------
MessagesListComponent.getChatMsgsListWrap = () => {
    return _a.chatMsgsListWrap;
};
MessagesListComponent.getChatMsgBody = () => {
    return _a.chatMsgBody;
};
/**
 * This function returns total message list items count.
 *
 * @param { string } chatId - chat id between the user & peer | group
 * @returns { number }
 */
MessagesListComponent.getMsgListInfoCount = (chatId) => {
    const t = JSON.parse(sessionStorage.getItem(_a.sessionStoreListKey + chatId));
    const n = t !== null && Array.isArray(t) && t.length ? t.length : 0;
    return n;
};
/**
 * This function modifies the session Message List Data by either:
 * - adding a single message item
 * - adding an array of message items
 *
 * @param { string } chatId - chat id between the user & peer | group
 * @param { iMsgBody | null } [msg] - message item object
 * @param { iMsgBody[] | null } [msgs] - array of message item object
 * @returns { void }
 */
MessagesListComponent.setMsgListInfo = (chatId, msg, msgs) => {
    // session item key name
    const keyName = _a.sessionStoreListKey + chatId;
    // get session item
    const s = JSON.parse(sessionStorage.getItem(keyName));
    const sessionList = s === null || !Array.isArray(s) ? [] : s;
    if ((msg === null || !("msg" in msg) || Object.keys(msg).length !== 5) &&
        (msgs === null || !Array.isArray(msgs) || !msgs.length))
        return;
    // create temporary array with new msgs
    const a1 = msgs !== null && Array.isArray(msgs) && msgs.length
        ? [...sessionList, ...msgs]
        : [...sessionList];
    // add new msg to temporary array
    if (msg !== null && "msg" in msg && Object.keys(msg).length === 5)
        a1.unshift(msg);
    // set session item
    sessionStorage.setItem(keyName, JSON.stringify(a1));
};
/**
 * This function transforms the message list item object into a HTMLelement and attaches it to the MessageComponentList.
 *
 * @param { iMsgBody } msg
 * @param { HTMLDivElement } wrap
 * @param { HTMLDivElement } chatMsgsListWrap
 * @param { 0 | 1} type
 * @param { boolean } isFetched
 * @returns
 *
 * @static
 */
MessagesListComponent.createMsgItem = (msg, wrap, chatMsgsListWrap, 
// 0 - from client browser      1 - from other user(s)
type, isFetched = false) => {
    if (msg.chatId !== MessagesListComponent.getChatMsgsListWrap().dataset.chatId) {
        console.log(msg.chatId);
        return;
    }
    const msgWrapWrap = document.createElement("div");
    const msgWrap = document.createElement("div");
    const msgSender = document.createElement("div");
    msgSender.textContent = type ? msg.senderName : "You";
    msgSender.dataset.msgId = msg.msgId;
    const msgContent = document.createElement("p");
    msgContent.textContent = msg.msg;
    const msgTimeWrap = document.createElement("div");
    const msgTimeSub = document.createElement("sub");
    const msgTimeSubSub = document.createElement("sub");
    msgTimeSubSub.textContent = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.milliToTime(typeof msg.timeReceived !== "number"
        ? parseInt(msg.timeReceived)
        : msg.timeReceived);
    msgTimeSub.appendChild(msgTimeSubSub);
    msgTimeWrap.appendChild(msgTimeSub);
    msgWrap.appendChild(msgSender);
    msgWrap.appendChild(msgContent);
    msgWrap.appendChild(msgTimeWrap);
    msgWrapWrap.appendChild(msgWrap);
    msgWrapWrap.classList.add(type ? _a.peerMsgClass : _a.myMsgClass);
    if (isFetched)
        wrap.prepend(msgWrapWrap);
    else
        wrap.append(msgWrapWrap);
    // <div class="chat-msg-others">
    //   <div>
    //     <div>Sender</div>
    //     <p>Lorem ipsum dolor sit amet</p>
    //     <div>
    //       <sub><sub>9:00.AM</sub></sub>
    //     </div>
    //   </div>
    // </div>
    //
    // <div class="chat-msg-mine">
    //   <div>
    //     <div>Sender</div>
    //     <p>
    //       Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
    //       consectetur adipisicing elit. Eos placeat ipsam id eius
    //       debitis, natus eveniet maiores incidunt maxime nobis!
    //     </p>
    //     <div>
    //       <sup><sub>9:00.AM</sub></sup>
    //     </div>
    //   </div>
    // </div>
};
/**
 * This function controls returns its constructor instance & whether MessagesListComponent either:
 * - call a new class for a new peer message component
 * - delete class and corresponding HTML elements
 *
 * @param { string } userId - account id of the client logged in
 * @param { string } peerId - account id of the user's target connected peer
 * @param { string } peerName - account name of the user's target connected peer
 * @param { string } chatId - chat id between the user & peer | group
 * @param { boolean } availability - availability setting of the user target
 * @param { iChatType } type - chat type of the user's target
 * @param { boolean } fromPeer - flag indicating if the user target is from the peer list
 * @param { boolean } deleteInstance - flag indicating if user target comp is to be deleted
 *
 * @returns { MessagesListComponent | null }
 *
 * @static
 */
MessagesListComponent.init = (userId, peerId, peerName, chatId, availability, type, fromPeer, deleteInstance) => {
    if (!deleteInstance) {
        // calls for a new instance if there is no previous called instance
        if (!_a.instance) {
            _a.instance = new MessagesListComponent(userId, peerId, peerName, chatId, availability, type, fromPeer);
            // sets new main component div element
            _a.chatMsgsList = document.querySelector(".chat-msg-list");
        }
    }
    else {
        if (type === "user")
            _group_comp__WEBPACK_IMPORTED_MODULE_7__.GroupComponent.getInstance(peerId, type, true);
        _a.instance = null;
        _a.chatMsgsList.innerHTML = "";
    }
    return _a.instance;
};
/** This function returns available MessageListComponent instance */
MessagesListComponent.getInst = () => {
    if (!_a.instance)
        return null;
    return _a.instance;
};



/***/ }),

/***/ "./src/components/msgsOpts.comp.ts":
/*!*****************************************!*\
  !*** ./src/components/msgsOpts.comp.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessagesOptionsComponent": () => (/* binding */ MessagesOptionsComponent)
/* harmony export */ });
/* harmony import */ var _util_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/gen.util */ "./src/util/gen.util.ts");
/* harmony import */ var _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/asyncWrap.util */ "./src/util/asyncWrap.util.ts");
/* harmony import */ var _util_validation_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation.util */ "./src/util/validation.util.ts");
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
/* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hooks/requests.hook */ "./src/hooks/requests.hook.ts");
/* harmony import */ var _util_socket_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/socket.util */ "./src/util/socket.util.ts");
/* harmony import */ var _error_comp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./error.comp */ "./src/components/error.comp.ts");
/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../models/user.model */ "./src/models/user.model.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;








/**
 * This class holds functions which manage and render data related to the user and their peer(s)' message options and its items.
 *
 * @extends Component
 */
class MessagesOptionsComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_3__.Component {
    /**
     * Upon instantiation, if the peer type is 'group', the constructor will call for the group data.
     *
     * @param { string } peerId - account id of the user's target connected peer
     * @param { string } peerName - account name of the user's target connected peer
     * @param { string } chatId - chat id between the user & peer | group
     * @param { iChatType } type - chat type of the user's target
     * @param { boolean } availability - availability setting of the user target
     * @param { boolean } fromPeer - flag indicating if the user target is from the peer list
     *
     * @constructor
     */
    constructor(peerId, peerName, chatId, type, availability, fromPeer) {
        super(".chat-msgs", "msgs-opts-temp", "afterbegin");
        this.peerId = peerId;
        this.peerName = peerName;
        this.chatId = chatId;
        this.type = type;
        this.availability = availability;
        this.fromPeer = fromPeer;
        // --------------------------
        // ----- EVENT HANDLERS -----
        // --------------------------
        /**
         * This function adds an event listener to message option head elements.
         *
         * @fires MouseEvent
         */
        this.chatToggleUserSection = () => {
            this.msgOptsHeads.forEach((head) => {
                head.addEventListener("click", this.clickMsgOptsSectionHandler);
            });
        };
        /**
         * This callback listens to click events which will toggle visibility of specific message option sections.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickMsgOptsSectionHandler = (e) => {
            const headIcon = e.target.querySelector("i");
            const headSibling = e.target
                .nextElementSibling;
            headIcon.classList.toggle("chat-msg-opts-head-toggled");
            headSibling.classList.toggle("chat-msg-opts-content-toggle");
        };
        /**
         * This callback listens to click events which will emit a socket event to the server to respond to peer requests.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickGroupRequest = (e) => {
            var _b, _c, _d;
            // DATA GATHERING
            const target = e.target;
            const reqBody = this.createRequestBody(this.peerId, (_c = (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.dataset.userId);
            const action = target.dataset.requestAction;
            if (!action)
                return;
            // VALIDATION
            const requestValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.patchRequestData(reqBody, action);
            if (!requestValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent.showComp(`ERROR: client data for group request action is invalid`, requestValid.error);
            }
            // SOCKET REQUEST
            if (target.classList.contains("request-action")) {
                (_d = _util_socket_util__WEBPACK_IMPORTED_MODULE_5__.SocketMethods.socket) === null || _d === void 0 ? void 0 : _d.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_5__.SocketMethods.patchRequestEv, reqBody, action);
            }
        };
        // --------------------------
        // ----- CLASS UTILITY ------
        // --------------------------
        /**
         * This function requests an HTTP GET to the server to retrieve group data.
         *
         * @param { string } id - Group Id
         * @returns { Promise<void> }
         */
        this.getGroup = (id) => __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_4__.httpGetGroup, id);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent.showComp("ERROR: client is unable to fetch group data", err);
            }
            // VALIDATION: HTTP RESPONSE
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server error occured`, `client responded with an error for upon request for group information`);
            if (!httpValid)
                return;
            // HTTP RESPONSE PROCESSING
            this.msgGrpInfo = response.data.data;
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            if (this.type === "group" && this.fromPeer)
                yield this.getGroup(peerId);
            this.configureComponent();
            this.renderComponent();
        }))();
    }
    configureComponent() {
        MessagesOptionsComponent.sType = this.type;
        MessagesOptionsComponent.sChatId = this.chatId;
        Object.freeze(MessagesOptionsComponent.sType);
        Object.freeze(MessagesOptionsComponent.sChatId);
        this.msgOptsHeads = [
            ...document.querySelectorAll(".chat-msg-opts-head"),
        ];
        this.msgOptsMembership = document.querySelector("#chat-msg-opts-memberships");
        MessagesOptionsComponent.msgOptsIncomingWrap = document.querySelector(".chat-msg-opts-incoming-wrap");
        MessagesOptionsComponent.msgOptsOutgoingWrap = document.querySelector(".chat-msg-opts-outgoing-wrap");
        MessagesOptionsComponent.msgOptsAdminsgWrap = document.querySelector(".chat-msg-opts-admins-wrap");
        MessagesOptionsComponent.msgOptsMembersWrap = document.querySelector(".chat-msg-opts-members-wrap");
        if (this.type === "group")
            this.msgOptsMembership.addEventListener("click", this.clickGroupRequest);
        this.chatToggleUserSection();
    }
    renderComponent() {
        const msgOptsHTML = [...this.wrapperElement.children][0];
        if (this.fromPeer && this.type === "user") {
            msgOptsHTML.innerHTML = "Chat settings is only available for group chats";
            return;
        }
        else if (!this.fromPeer) {
            msgOptsHTML.innerHTML =
                "Chat settings is only available for related peers";
            return;
        }
        this.generateRequests();
        this.generateAdmins();
        this.generateMembers();
    }
    /**
     * This function:
     * - sends retrieved Group Data Requests to an HTML elements transforming function
     * - decides type of rendition
     * - & where to attach request renditions within Message Options Request Section
     */
    generateRequests() {
        if (!this.msgGrpInfo ||
            typeof this.msgGrpInfo !== "object" ||
            Object.keys(this.msgGrpInfo).length < 1)
            return;
        const incoming = this.msgGrpInfo.requests.incoming;
        const outgoing = this.msgGrpInfo.requests.outgoing;
        let item;
        for (item of incoming) {
            MessagesOptionsComponent.createRequest(item, MessagesOptionsComponent.getMsgOptsIncomingWrap(), "incoming");
        }
        for (item of outgoing) {
            MessagesOptionsComponent.createRequest(item, MessagesOptionsComponent.getMsgOptsOutgoingWrap(), "outgoing");
        }
    }
    /** This function feeds array of group admins data HTML elements rendering function corresponding to group admins. */
    generateAdmins() {
        const admins = this.msgGrpInfo.relations;
        let admin;
        for (admin of admins) {
            admin = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.relationStrIntToBool(admin);
            if (!admin.admin)
                continue;
            MessagesOptionsComponent.createAdmin(admin, MessagesOptionsComponent.getMsgOptsAdminsgWrap());
        }
    }
    /** This function feeds array of group members data HTML elements rendering function corresponding to group members. */
    generateMembers() {
        const members = this.msgGrpInfo.relations;
        let member;
        for (member of members) {
            member = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.relationStrIntToBool(member);
            if (member.admin)
                continue;
            MessagesOptionsComponent.createMember(member, MessagesOptionsComponent.getMsgOptsMembersWrap());
        }
    }
    /**
     * This function creates an object which will be sent to the server to act upon a specific pending group-to-user request of the group
     *
     * @param { string } groupId - group id of the current message component instance
     * @param { string } receiverId - target user, recipient of the request response
     * @returns
     */
    createRequestBody(groupId, receiverId) {
        return {
            type: 3,
            recipientId: receiverId,
            groupId: groupId,
        };
    }
}
_a = MessagesOptionsComponent;
// --------------------------
// ------- GET | SET --------
// --------------------------
MessagesOptionsComponent.getMsgOptsIncomingWrap = () => {
    return _a.msgOptsIncomingWrap;
};
MessagesOptionsComponent.getMsgOptsOutgoingWrap = () => {
    return _a.msgOptsOutgoingWrap;
};
MessagesOptionsComponent.getMsgOptsAdminsgWrap = () => {
    return _a.msgOptsAdminsgWrap;
};
MessagesOptionsComponent.getMsgOptsMembersWrap = () => {
    return _a.msgOptsMembersWrap;
};
/**
 * This function
 * - renders group request data to an HTML element and
 * - attach request renditions within Message Options Request Section
 *
 * @param { iRequest } item - group request item
 * @param { HTMLDivElement } wrapper
 * @param { "incoming" | "outgoing" } type - request rendition section indicator
 * @param { string } chatId - used to verify of the request item belongs to a user
 *
 * @static
 */
MessagesOptionsComponent.createRequest = (item, wrapper, type, chatId) => {
    item = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.requestStrIntToBool(item);
    if (chatId !== undefined)
        if (_a.sType === "user" || _a.sChatId !== chatId)
            return;
    const requestValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.requestItem(item, wrapper, type);
    if (!requestValid.isValid) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent.showComp("ERROR: Request item data is invalid", requestValid.error);
    }
    const itemWrap = document.createElement("div");
    const itemName = document.createElement("p");
    const itemActions = document.createElement("p");
    let itemCancel;
    let itemApprove;
    let itemReject;
    if (type === "outgoing") {
        itemCancel = document.createElement("i");
        itemWrap.classList.add("chat-msg-opts-outgoing-item");
        itemName.textContent = item.accnt_name;
        itemCancel.classList.add("fa-solid", "fa-xmark", "request-action");
        itemCancel.dataset.requestAction = _models_user_model__WEBPACK_IMPORTED_MODULE_7__.requestActions.cancel;
        itemActions.appendChild(itemCancel);
    }
    else if (type === "incoming") {
        itemApprove = document.createElement("i");
        itemReject = document.createElement("i");
        itemWrap.classList.add("chat-msg-opts-incoming-item");
        itemName.textContent = item.accnt_name;
        itemApprove.classList.add("fa-solid", "fa-check", "request-action");
        itemApprove.dataset.requestAction = _models_user_model__WEBPACK_IMPORTED_MODULE_7__.requestActions.approve;
        itemReject.classList.add("fa-solid", "fa-xmark", "request-action");
        itemReject.dataset.requestAction = _models_user_model__WEBPACK_IMPORTED_MODULE_7__.requestActions.reject;
        itemActions.appendChild(itemApprove);
        itemActions.appendChild(itemReject);
    }
    itemWrap.dataset.userId = item.accnt_id;
    itemWrap.dataset.isGroup = item.isGroup ? `true` : `false`;
    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemActions);
    wrapper.appendChild(itemWrap);
    // HTML TEMPLATE - incoming request item
    // <div class='chat-msg-opts-incoming-item'>
    //   <p>incoming member request</p>
    //   <p>
    //     <i class='fa-solid fa-check'></i>
    //     <i class='fa-solid fa-xmark'></i>
    //   </p>
    // </div>;
    // HTML TEMPLATE - outgoing request item
    // <div class='chat-msg-opts-outgoing-item'>
    //   <p>outgoing member request</p>
    //   <p>
    //     <i class='fa-solid fa-xmark'></i>
    //   </p>
    // </div>;
};
/**
 * This function transforms group admin relation objects into a corresponding HTML element and attaches it to the Message Option.
 *
 * @param { iRelation } item - group relation item for admins
 * @param { HTMLDivElement } wrap
 *
 * @static
 */
MessagesOptionsComponent.createAdmin = (item, wrap) => {
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-msg-opts-admin-item");
    const itemName = document.createElement("p");
    itemName.textContent = item.accnt_name;
    itemWrap.appendChild(itemName);
    wrap.appendChild(itemWrap);
    // HTML TEMPLATE - admin item
    // <div class='chat-msg-opts-admin-item'>
    //   <p>admin name</p>
    // </div>;
};
/**
 * This function transforms group member relation objects into a corresponding HTML element and attaches it to the Message Option.
 *
 * @param { iRelation } item - group relation item for non-admins
 * @param { HTMLDivElement } wrap
 *
 * @static
 */
MessagesOptionsComponent.createMember = (item, wrap) => {
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-msg-opts-member-item");
    const itemName = document.createElement("p");
    itemName.textContent = item.accnt_name;
    const itemActions = document.createElement("p");
    const iAdmin = document.createElement("i");
    iAdmin.classList.add("fa-solid", "fa-crown");
    const iMute = document.createElement("i");
    iMute.classList.add("fa-solid", "fa-comment-slash");
    const iBlock = document.createElement("i");
    iBlock.classList.add("fa-solid", "fa-user-slash");
    // itemActions.appendChild(iMute);
    // itemActions.appendChild(iBlock);
    itemActions.appendChild(iAdmin);
    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemActions);
    wrap.appendChild(itemWrap);
    // HTML TEMPLATE = member item
    // <div class='chat-msg-opts-member-item'>
    //   <p>member name</p>
    //   <p>
    //     <i class='fa-solid fa-crown'></i>
    //     <i class='fa-solid fa-comment-slash'></i>
    //     <i class='fa-solid fa-user-slash'></i>
    //   </p>
    // </div>;
};
/**
 * This function deletes a corresponding HTML element of a message option comp request.
 *
 * @param { string } requestItemId
 * @param { string } chatId
 *
 * @static
 */
MessagesOptionsComponent.deleteRequest = (requestItemId, chatId) => {
    if (_a.sType === "user" || MessagesOptionsComponent.sChatId !== chatId)
        return;
    [
        ...MessagesOptionsComponent.getMsgOptsOutgoingWrap().children,
    ].forEach((html) => {
        if (html.dataset.userId === requestItemId)
            MessagesOptionsComponent.getMsgOptsOutgoingWrap().removeChild(html);
    });
    [
        ...MessagesOptionsComponent.getMsgOptsIncomingWrap().children,
    ].forEach((html) => {
        if (html.dataset.userId === requestItemId)
            MessagesOptionsComponent.getMsgOptsIncomingWrap().removeChild(html);
    });
};
/**
 * This function either:
 * - calls for a new instance of this class
 * - delete the instance of this class and all related data within
 *
 * @param { string } peerId - account id of the user's target connected peer
 * @param { string } peerName - account name of the user's target connected peer
 * @param { string } chatId - chat id between the user & peer | group
 * @param { iChatType } type - chat type of the user's target
 * @param { boolean } availability - availability setting of the user target
 * @param { boolean } fromPeer - flag indicating if the user target is from the peer list
 * @param { boolean } deleteInstance - flag indicating if user target comp is to be deleted
 * @returns { MessagesOptionsComponent | null }
 *
 * @static
 */
MessagesOptionsComponent.getInstance = (peerId, peerName, chatId, type, availability, fromPeer, deleteInstance) => {
    if (!deleteInstance) {
        if (!_a.instance) {
            _a.instance = new MessagesOptionsComponent(peerId, peerName, chatId, type, availability, fromPeer);
            _a.chatMsgsOpts = document.querySelector(".chat-msg-opts");
        }
    }
    else {
        _a.instance = null;
        _a.chatMsgsOpts.innerHTML = "";
    }
    return _a.instance;
};



/***/ }),

/***/ "./src/components/peer.comp.ts":
/*!*************************************!*\
  !*** ./src/components/peer.comp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PeerComponent": () => (/* binding */ PeerComponent)
/* harmony export */ });
/* harmony import */ var _util_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/gen.util */ "./src/util/gen.util.ts");
/* harmony import */ var _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/asyncWrap.util */ "./src/util/asyncWrap.util.ts");
/* harmony import */ var _util_validation_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation.util */ "./src/util/validation.util.ts");
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
/* harmony import */ var _user_comp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user.comp */ "./src/components/user.comp.ts");
/* harmony import */ var _util_socket_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/socket.util */ "./src/util/socket.util.ts");
/* harmony import */ var _group_comp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./group.comp */ "./src/components/group.comp.ts");
/* harmony import */ var _msgs_comp__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./msgs.comp */ "./src/components/msgs.comp.ts");
/* harmony import */ var _error_comp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./error.comp */ "./src/components/error.comp.ts");
/* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../hooks/requests.hook */ "./src/hooks/requests.hook.ts");
/* harmony import */ var _models_peer_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../models/peer.model */ "./src/models/peer.model.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;












/**
 * This class holds functions which manage and render data related to the user peer(s)' and its data and HTML items.
 *
 * @extends Component
 */
class PeerComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_3__.Component {
    /**
     * Upon instantiation, the constructor:
     * - immediately fetches for user connected peers
     * - renders data into corresponding HTML elements
     *
     * @param { iUserObj } userData - set of data retrieved from the server, specific for the logged user
     *
     * @constructor
     */
    constructor(userData) {
        super(".chat-peer-wrap", "peer-temp", "afterbegin");
        this.userData = userData;
        /** skip counter for peer list pagination logic */
        this.relSkip = 0;
        /** skip limit constant for peer list pagination logic */
        this.relSkipConst = 15;
        /** skip counter for search list pagination logic */
        this.searchSkip = 0;
        /** skip limit constant for search list pagination logic */
        this.searchSkipConst = 15;
        /** skip full indicator for search list pagination logic */
        this.searchFull = false;
        /** search item total count for search list pagination logic */
        this.searchResults = 0;
        // ----------------------------
        // ------ EVENT HANDLERS ------
        // ----------------------------
        /**
         * This callback listens to a click event, which upon doing so, instructs UI to make the user component visible.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickUserToggleHandler = (e) => {
            this.chatUserWrap.classList.add("chat-user-show");
        };
        /**
         * This function, upon invoking, modifies HTML lists' CSS classes to apply visibility to peer list alone.
         *
         * @param { MouseEvent } [e]
         *
         * @listens MouseEvent
         */
        this.removeSearchHandler = (e) => {
            this.chatPeerHeadings.classList.remove("chat-lists-search");
            this.chatPeerLists.classList.remove("chat-lists-search");
            this.chatSearchForm.classList.remove("chat-search-form-search-state");
        };
        /**
         * Upon callback, this function checks whether search list is visible, then hides it if so.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickSearchHandler = (e) => {
            // if search list is visible
            if (this.chatPeerHeadings.classList.contains("chat-lists-search")) {
                // if search input has value
                if (!this.chatSearchInput.value.length) {
                    this.removeSearchHandler();
                }
            }
            else {
                this.chatPeerHeadings.classList.add("chat-lists-search");
                this.chatPeerLists.classList.add("chat-lists-search");
                this.chatSearchForm.classList.add("chat-search-form-search-state");
            }
        };
        /**
         * This function returns a search component summary object, reflecting of the current state of the search list, to be used in an HTTP request.
         *
         * @returns { iSearchValues }
         */
        this.createSearchReqObj = () => {
            const searchType = this.chatSearchTypes.dataset
                .chatType;
            const skip = this.searchSkip;
            return {
                pattern: this.chatSearchInput.value.trim(),
                type: searchType === "user" ? 0 : 1,
                skip: skip,
                cnt: this.searchResults,
            };
        };
        /**
         * Upon callback, this function:
         * - resets search related variables
         * - sends search related variables for new batch of search items
         *
         * @param { Event } e
         * @returns { Promise<void> }
         */
        this.submitSearchHandler = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            // PROCESS: reset search data
            this.searchSkip = 0;
            this.searchResults = 0;
            this.searchFull = false;
            // DATA GATHERING
            const chatSearchValue = this.createSearchReqObj();
            // VALIDATION
            const searchValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.search(chatSearchValue, this.chatSearchTypes.dataset.chatType);
            if (!searchValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client search data is inavalid", searchValid.error);
            }
            if (chatSearchValue.pattern.length === 0) {
                this.chatSearchList.innerHTML = "";
                return;
            }
            // VALIDATION: returns
            if (this.searchFull)
                return;
            // HTTP REQUEST
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_9__.httpGetUsers, chatSearchValue);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp(`ERROR: client is unable to request for user search`, err);
            }
            // VALIDATION: HTTP RESPONSE
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server is unable to process user search`, `server responded with an error upon client's request for user search`);
            if (!httpValid)
                return;
            // PROCESS
            this.chatSearchList.innerHTML = "";
            const searchItems = response.data.data;
            if (searchItems &&
                typeof searchItems === "object" &&
                searchItems.length > 0) {
                // HTTP RESPONSE PROCESSING
                this.searchResults = this.searchResults + searchItems.length;
                this.searchSkip++;
                this.generateSearchItems(searchItems, this.chatSearchTypes.dataset.chatType);
            }
            if (!searchItems.length || searchItems.length < this.searchSkipConst)
                this.searchFull = true;
        });
        /**
         * Upon callback, this function sends search status summary for next batch of search items.
         *
         * @param { Event } e
         * @returns { Promise<void> }
         */
        this.scrollBottomSearchList = (e) => __awaiter(this, void 0, void 0, function* () {
            if (this.searchFull)
                return;
            const t = e.target;
            if (t.scrollTop === t.scrollHeight - t.offsetHeight) {
                // DATA GATHERING
                const chatSearchValue = this.createSearchReqObj();
                // VALIDATION
                const searchValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.search(chatSearchValue, this.chatSearchTypes.dataset.chatType);
                if (!searchValid.isValid) {
                    return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client search data is inavalid", searchValid.error);
                }
                // HTTP REQUEST
                let response;
                try {
                    response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_9__.httpGetUsers, chatSearchValue);
                }
                catch (err) {
                    return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp(`ERROR: client is unable to request for user search`, err);
                }
                // VALIDATION: HTTP RESPONSE
                const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server is unable to process user search`, `server responded with an error upon client's request for user search`);
                if (!httpValid)
                    return;
                // PROCESS
                const searchItems = response.data.data;
                if (searchItems &&
                    typeof searchItems === "object" &&
                    searchItems.length > 0) {
                    // HTTP RESPONSE PROCESSING
                    this.searchSkip++;
                    this.searchResults = this.searchResults + searchItems.length;
                    this.generateSearchItems(searchItems, this.chatSearchTypes.dataset.chatType);
                }
                if (!searchItems.length || searchItems.length < this.searchSkipConst)
                    this.searchFull = true;
            }
        });
        /**
         * Upon callback, this function modifies search type.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickSearchTypesHandler = (e) => {
            const target = e.target;
            target.classList.contains("chat-search-type")
                ? target.classList.remove("chat-search-type")
                : null;
            target.nextElementSibling
                ? target.nextElementSibling.classList.remove("chat-search-type")
                : target.previousElementSibling.classList.remove("chat-search-type");
            target.classList.add("chat-search-type");
            this.chatSearchTypes.dataset.chatType = target.dataset.chatType;
        };
        /**
         * Upon callback, this function calls for a new instance of the Message Component, corresponding the clicked peer | gorup target.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickSearchItemHandler = (e) => {
            const target = e.currentTarget;
            let chatId = "";
            let peerFlag = false;
            PeerComponent.chatPeerRelationsInfo.map((rel) => {
                if (rel.accnt_id === target.dataset.userId) {
                    chatId = rel.chat_id;
                    peerFlag = true;
                }
            });
            _msgs_comp__WEBPACK_IMPORTED_MODULE_7__.MessagesComponent.getInstance(this.userData.act_id.accnt_id, target.dataset.userId, target.querySelector("h3").textContent, chatId, peerFlag, target.dataset.chatType, false, peerFlag);
        };
        /**
         * Upon callback, this function proceeds with a logic to decide whether the event can instruct the Peer Component to hide search list.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.undoEventClickHandler = (e) => {
            const target = e.target;
            // if clicked element is not "chat-search-input" or search-types button
            if (e.type === "click") {
                if (e.button === 0 &&
                    target !== this.chatSearchInput &&
                    !target.classList.contains("chat-search-type-group") &&
                    !target.classList.contains("chat-search-type-user")) {
                    if (
                    // if search head & list are open
                    this.chatPeerHeadings.classList.contains("chat-lists-search") &&
                        // if search input has value
                        !this.chatSearchInput.value.length) {
                        this.removeSearchHandler();
                    }
                }
            }
        };
        /**
         * Upon callback, this function prevents pressing 'Enter' key to hide search list.
         *
         * @param { KeyboardEvent } e
         *
         * @listens KeyboardEvent
         */
        this.undoEventKeyHandler = (e) => {
            // if (
            //   e.type === "keypress" &&
            //   e.key === "Enter" &&
            //   this.chatApp.classList.contains("chat-app-user-state")
            // )
            //   e.preventDefault();
        };
        /**
         * Upon callback, this function calls for a new instance of the Message Component, corresponding the clicked peer | gorup target.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickPeerItemHandler = (e) => {
            const target = e.currentTarget.parentElement;
            _msgs_comp__WEBPACK_IMPORTED_MODULE_7__.MessagesComponent.getInstance(this.userData.act_id.accnt_id, target.dataset.userId, target.querySelector("h3").textContent, target.dataset.chatId, true, target.dataset.chatType, false, true);
        };
        /**
         * Upon callback, this function either:
         * - hide visible peer item tooltip
         * - show a peer item tooltip
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.togglePeerTooltipHandler = (e) => {
            let target = e.target;
            if (!target.classList.contains("chat-contact-tooltip") &&
                !target.classList.contains("fa-ellipsis-vertical"))
                return;
            // if target clicked is the icon instead of the tooltip area, change target to parent
            if (target.classList.contains("fa-ellipsis-vertical")) {
                target = target.parentElement;
            }
            const action = target.querySelector(".chat-contact-tooltip-content");
            if (action.classList.contains("chat-contact-tooltip-show")) {
                // remove a single visible tooltip
                action.classList.remove("chat-contact-tooltip-show");
            }
            else {
                const actions = [
                    ...PeerComponent.chatPeerList.querySelectorAll(".chat-contact-tooltip-content"),
                ];
                // remove all visible tooltip
                actions.length > 0
                    ? actions.forEach((action) => {
                        action.classList.remove("chat-contact-tooltip-show");
                    })
                    : null;
                // apply visibility to clicked tooltip
                action.classList.add("chat-contact-tooltip-show");
            }
        };
        /**
         * Upon callback, this function feeds a function with an array of peer item data and transform them into corresponding HTML elements.
         *
         * @param { Event } e
         * @returns { Promise<void> }
         *
         * @listens Event - scroll
         */
        this.scrollBottomPeerList = (e) => __awaiter(this, void 0, void 0, function* () {
            const t = e.target;
            if (t.scrollTop === t.scrollHeight - t.offsetHeight) {
                this.generateContactItems();
                yield this.fetchTopMsgs();
                this.relSkip++;
            }
        });
        /**
         * This function returns a set of starting and ending numbers for the pagination logic of the peer list.
         *
         * @param { number } skip - current skip status of the list
         * @param { number } [k] - initially, skip limit constant of the peer list
         * @returns { { start: number; end: number } | void }
         */
        this.getStartEnd = (skip, k = this.relSkipConst) => {
            if (typeof skip !== "number" || typeof k !== "number")
                return;
            return { start: skip ? skip * k : 0, end: (skip ? (skip + 1) * k : k) - 1 };
        };
        /** This function loops over peer item data and transforms them into HTML elements. */
        this.generateContactItems = () => {
            const { start, end } = this.getStartEnd(this.relSkip);
            let i = start;
            if (start > PeerComponent.chatPeerRelationsInfo.length)
                return;
            const slicedArr = PeerComponent.chatPeerRelationsInfo.slice(this.relSkip === 0 ? 0 : start - 1, end + 1);
            let item;
            for (item of slicedArr) {
                if (i === end)
                    break;
                PeerComponent.createRelationItemHTML(item);
                i++;
            }
        };
        /** This function creates an instance of the peer lists first item if available. */
        this.createFirstPeerMsgComp = () => {
            if (PeerComponent.chatPeerRelationsInfo.length) {
                const firstRelation = PeerComponent.chatPeerRelationsInfo[0];
                _msgs_comp__WEBPACK_IMPORTED_MODULE_7__.MessagesComponent.getInstance(this.userData.act_id.accnt_id, firstRelation.accnt_id, firstRelation.accnt_name, firstRelation.chat_id, true, firstRelation.type, false, true);
            }
        };
        /**
         * This function
         * - loops over a certain range of peer item HTML
         * - fetch its most recent message, if available
         */
        this.fetchTopMsgs = () => __awaiter(this, void 0, void 0, function* () {
            let h;
            let i = 0;
            const { start, end } = this.getStartEnd(this.relSkip);
            this.relSkip++;
            const slicedArrHTML = PeerComponent.chatPeerRelationsHTML.slice(start, end);
            for (h of slicedArrHTML) {
                if (i === end)
                    break;
                yield this.fetchTopMsg(h);
                i++;
            }
        });
        /**
         * This function requests an HTTP GET to the server to retrieve its most recent message.
         *
         * @param { HTMLDivElement } peerHTML - peer item html as source of chat ID
         * @returns { Promise<void> }
         */
        this.fetchTopMsg = (peerHTML) => __awaiter(this, void 0, void 0, function* () {
            if (!(peerHTML instanceof HTMLDivElement) ||
                peerHTML.dataset.chatId === undefined ||
                peerHTML.dataset.chatId === null ||
                !peerHTML.dataset.chatId.length)
                return;
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_9__.httpGetTopMsg, peerHTML.dataset.chatId);
            }
            catch (err) {
                // return error.showComp(
                _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client is unable to fetch top chat message", err);
            }
            // VALIDATION: HTTP RESPONSE
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server error occured`, `client responded with an error for upon request for top chat message`);
            if (!httpValid)
                return;
            const data = response.data.data;
            if (data === undefined || data === null || !("msg" in data))
                return;
            PeerComponent.updateMsg(peerHTML, data);
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getUserContacts();
                this.configureComponent();
                yield this.renderComponent();
            }
            catch (err) {
                _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client is unable to request user relations", err);
            }
        }))();
    }
    configureComponent() {
        this.chatUserWrap = document.querySelector(".chat-user-wrap");
        this.chatUserToggle = document.querySelector(".chat-user-toggle > button");
        this.chatPeerHeadings = document.querySelector(".chat-lists-head");
        this.chatPeerLists = document.querySelector(".chat-lists");
        this.chatSearchForm = document.querySelector(".chat-search-form");
        this.chatRemoveSearch = document.querySelector(".chat-remove-search");
        this.chatSearchTypes = document.querySelector(".chat-search-types");
        this.chatSearchInput = document.getElementById("chat-search-input");
        this.chatSearchList = document.querySelector(".chat-search-list");
        this.chatSearchListWrap = document.querySelector(".chat-search-list-wrap");
        PeerComponent.chatPeerList = document.querySelector(".chat-contact-list");
        this.chatPeerListWrap = document.querySelector(".chat-contact-list-wrap");
        this.chatApp = document.querySelector(".chat-app");
        this.chatUserToggle.addEventListener("click", this.clickUserToggleHandler);
        this.chatRemoveSearch.addEventListener("click", this.removeSearchHandler);
        this.chatSearchInput.addEventListener("click", this.clickSearchHandler);
        this.chatSearchInput.addEventListener("input", this.submitSearchHandler);
        this.chatSearchForm.addEventListener("submit", this.submitSearchHandler);
        this.chatSearchTypes.addEventListener("click", this.clickSearchTypesHandler);
        PeerComponent.chatPeerList.addEventListener("click", this.togglePeerTooltipHandler);
        this.chatSearchListWrap.addEventListener("scroll", this.scrollBottomSearchList);
        this.chatPeerListWrap.addEventListener("scroll", this.scrollBottomPeerList);
        document.addEventListener("click", this.undoEventClickHandler);
        document.addEventListener("keypress", this.undoEventKeyHandler);
        this.connectToSocketRooms();
    }
    renderComponent() {
        var _b;
        return __awaiter(this, void 0, void 0, function* () {
            (_b = this.chatSearchTypes
                .querySelector(".chat-search-type-user")) === null || _b === void 0 ? void 0 : _b.classList.add("chat-search-type");
            this.chatSearchTypes.dataset.chatType = _models_peer_model__WEBPACK_IMPORTED_MODULE_10__.chatType.user;
            this.generateContactItems();
            this.createFirstPeerMsgComp();
            yield this.fetchTopMsgs();
        });
    }
    // --------------------------
    // ----- CLASS UTILITY ------
    // --------------------------
    /**
     * This function
     * - requests an HTTP POST to the server to retrieve user contacts.
     * - stores retrieved data within class method
     *
     * @returns { Promise<void> }
     */
    getUserContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            // DATA GATHERING
            const relBody = this.createRelReqBody();
            // HTTP REQUEST
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_9__.httpGetUserRelations, relBody);
            }
            catch (err) {
                console.log(err);
                return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client is unable to request user relations", err);
            }
            // VALIDATION: HTTP RESPONSE
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server is unable to process request for user relations`, `server responded with an error upon client's request for user relations`);
            if (!httpValid)
                return;
            // RESPONSE PROCESSING
            let rel;
            for (rel of response.data.data) {
                PeerComponent.chatPeerRelationsInfo.push(_util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.relationStrIntToBool(rel));
            }
        });
    }
    /** This function connects client to other user based on data about connected peers. */
    connectToSocketRooms() {
        var _b;
        const chatIds = PeerComponent.chatPeerRelationsInfo.map((rel) => {
            console.log(rel.block);
            rel.chat_id;
        });
        (_b = _util_socket_util__WEBPACK_IMPORTED_MODULE_5__.SocketMethods.socket) === null || _b === void 0 ? void 0 : _b.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_5__.SocketMethods.joinRoomsEv, chatIds, (res) => {
            console.log(res);
        });
    }
    /**
     * This function loops over search item data and transforms them into HTML elements.
     *
     * @param { iSearchItems } userItems - array of search item data
     * @param { iChatType } type
     */
    generateSearchItems(userItems, type) {
        let user;
        for (user of userItems) {
            this.createSearchItem(user, type);
        }
    }
    /**
     * This function
     * - creates a corresponding HTML element from the user object
     * - attaches them to the search list element
     *
     * @param { iSearchItems } user - user object
     * @param { iChatType } type - user chat type
     */
    createSearchItem(user, type) {
        // DATA GATHERING
        const userValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.searchItem(user);
        // VALIDATION
        if (!userValid.isValid) {
            return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: search item data is invalid", userValid.error);
        }
        // PROCESSING
        const searchItem = document.createElement("div");
        const userH3 = document.createElement("h3");
        const userName = document.createTextNode(user.act_name);
        searchItem.classList.add("chat-search-item");
        searchItem.dataset.userId = user.accnt_id;
        searchItem.dataset.chatType = type;
        searchItem.dataset.availability = `${user.availability}`;
        userH3.appendChild(userName);
        searchItem.appendChild(userH3);
        searchItem.addEventListener("click", this.clickSearchItemHandler);
        this.chatSearchList.insertAdjacentElement("beforeend", searchItem);
    }
    /** This function creates an object for an HTTP POST for peer list items retrieval.
     *
     * @returns { iRelBody }
     */
    createRelReqBody() {
        return {
            contactType: "contact",
            chatType: "user",
            groupId: null,
            skip: this.relSkip,
        };
    }
}
_a = PeerComponent;
/** array of peer list item data */
PeerComponent.chatPeerRelationsInfo = [];
/** array of peer list item HTML elements */
PeerComponent.chatPeerRelationsHTML = [];
/**
 * Upon callback, this function
 * - requests an HTTP PATCH to the server to modify user relationship status from target peer
 * - modifies peer list item according to actiion taken
 *
 * @param { MouseEvent } e
 * @returns { Promise<void> }
 *
 * @listens MouseEvent
 *
 * @static
 */
PeerComponent.clickContactActionHandler = (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    // DATA GATHERING
    const target = e.target;
    const action = target.dataset.contactAct;
    let response;
    let relActValid;
    const t = (_c = (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
    const relationAct = {
        recipientId: t.dataset.userId,
        userAction: action,
        // CONTACT TOOLTIPS WILL ALWAYS HAVE A VALUE OF TRUE
        actionValue: true,
    };
    // VALIDATION
    relActValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.relationAction(relationAct);
    if (!relActValid.isValid) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: User data for requesting user relation action is invalid", relActValid.error);
    }
    // ARCHIVE
    // --- temporarily hide chat item element
    if (action === "archive") {
        PeerComponent.chatPeerList.removeChild(t);
        return;
    }
    // HTTP REQUEST
    try {
        response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_9__.httpPatchRelation, relationAct);
    }
    catch (err) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_8__.ErrorComponent.showComp("ERROR: client is unable to request relation action", err);
    }
    // VALIDATION: HTTP RESPONSE
    const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server is unable to process request for user action`, `server responded with an error upon client's request for relation action`);
    if (!httpValid)
        return;
    // HTTP RESPONSE PROCESSING
    const item = {
        accnt_id: t.dataset.userId,
        accnt_name: (_d = [...t.children][0].querySelector("h3")) === null || _d === void 0 ? void 0 : _d.textContent,
        type: t.dataset.chatType,
        chat_id: "pseudo",
        admin: false,
        archive: t.dataset.isArchived === "true" ? true : false,
        block: t.dataset.isBlocked === "true" ? true : false,
        mute: t.dataset.isMuted === "true" ? true : false,
        bump: 0,
    };
    if (action === "block" && item.type === "group") {
        let gs = JSON.parse(sessionStorage.getItem(_group_comp__WEBPACK_IMPORTED_MODULE_6__.GroupComponent.grpSessionStoreName));
        gs = gs.filter((g) => item.accnt_id !== g.accnt_id);
        sessionStorage.removeItem(_group_comp__WEBPACK_IMPORTED_MODULE_6__.GroupComponent.grpSessionStoreName);
        sessionStorage.setItem(_group_comp__WEBPACK_IMPORTED_MODULE_6__.GroupComponent.grpSessionStoreName, JSON.stringify(gs));
    }
    if (action === "mute") {
        //  MUTE
        //  --- erase chat item message display from muting party
        const p = t.querySelector("p");
        p.textContent = "-----";
        _user_comp__WEBPACK_IMPORTED_MODULE_4__.UserComponent.createMuteBlockItem(item, _user_comp__WEBPACK_IMPORTED_MODULE_4__.UserComponent.chatUserMutesWrap, 0);
    }
    else {
        // BLOCK
        // --- unable to accept | receiver message from both parties
        // --- not searchable by both parties
        _user_comp__WEBPACK_IMPORTED_MODULE_4__.UserComponent.createMuteBlockItem(item, _user_comp__WEBPACK_IMPORTED_MODULE_4__.UserComponent.chatUserBlocksWrap, 1);
        // PeerComponent.chatPeerList.removeChild(t);
    }
    // DELETE ACTION OPTION
    (_e = target.parentElement) === null || _e === void 0 ? void 0 : _e.removeChild(target);
});
/**
 * This function creates and returns an HTML element from a user relation data about a peer.
 *
 * @param { iRelation } item - user's relation object to describe peer
 * @returns { HTMLDivElement | void }
 *
 * @static
 */
PeerComponent.createRelationItemHTML = (item) => {
    item = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.relationStrIntToBool(item);
    const userValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.contactItem(item);
    // if (!userValid.isValid) {
    //   return error.showComp(
    //     "ERROR: contact item data is invalid",
    //     userValid.error
    //   );
    // }
    // item wrapper
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-contact-item");
    itemWrap.dataset.userId = item.accnt_id;
    itemWrap.dataset.chatId = item.chat_id;
    itemWrap.dataset.isMuted = `${item.mute}`;
    itemWrap.dataset.isBlocked = `${item.block}`;
    itemWrap.dataset.isArchived = `${item.archive}`;
    itemWrap.dataset.chatType = item.type;
    // item main
    //// item main icon
    const itemNameIcon = document.createElement("div");
    itemNameIcon.textContent = item.accnt_name[0];
    itemNameIcon.classList.add("chat-contact-icon");
    //// item main wrap
    const itemNameWrap = document.createElement("div");
    itemNameWrap.classList.add("chat-contact-info");
    //// item main name
    const itemName = document.createElement("h3");
    itemName.textContent = item.accnt_name;
    //// item main content --------------- EDIT
    const itemText = document.createElement("p");
    const itemTextTime = document.createElement("span");
    const itemTextMsg = document.createElement("span");
    if (item.mute) {
        itemTextTime.textContent = `---`;
        itemTextMsg.textContent = ` - ------`;
    }
    else {
        itemTextTime.textContent = `---`;
        itemTextMsg.textContent = ` - Say Hi!`;
    }
    // fist msg info is time
    itemText.appendChild(itemTextTime);
    // last msg info is message
    itemText.appendChild(itemTextMsg);
    itemNameWrap.appendChild(itemName);
    itemNameWrap.appendChild(itemText);
    // item tooltip
    const itemTooltipWrap = document.createElement("div");
    itemTooltipWrap.classList.add("chat-contact-tooltip");
    //// item tooltip icon
    const itemTooltip = document.createElement("i");
    itemTooltip.classList.add("fa-solid", "fa-ellipsis-vertical");
    //// item tooltip content
    const itemTooltipContext = document.createElement("div");
    itemTooltipContext.classList.add("chat-contact-tooltip-content");
    if (!item.block) {
        const itemTooltipBlock = document.createElement("p");
        itemTooltipBlock.textContent = _models_peer_model__WEBPACK_IMPORTED_MODULE_10__.contactAct.block;
        itemTooltipBlock.dataset.contactAct = _models_peer_model__WEBPACK_IMPORTED_MODULE_10__.contactAct.block;
        itemTooltipContext.appendChild(itemTooltipBlock);
    }
    if (!item.mute) {
        const itemTooltipMute = document.createElement("p");
        itemTooltipMute.textContent = _models_peer_model__WEBPACK_IMPORTED_MODULE_10__.contactAct.mute;
        itemTooltipMute.dataset.contactAct = _models_peer_model__WEBPACK_IMPORTED_MODULE_10__.contactAct.mute;
        itemTooltipContext.appendChild(itemTooltipMute);
    }
    const itemTooltipArchive = document.createElement("p");
    itemTooltipArchive.textContent = _models_peer_model__WEBPACK_IMPORTED_MODULE_10__.contactAct.archive;
    itemTooltipArchive.dataset.contactAct = _models_peer_model__WEBPACK_IMPORTED_MODULE_10__.contactAct.archive;
    itemTooltipContext.appendChild(itemTooltipArchive);
    itemTooltipContext.addEventListener("click", _a.clickContactActionHandler);
    itemTooltipWrap.appendChild(itemTooltip);
    itemTooltipWrap.appendChild(itemTooltipContext);
    itemWrap.appendChild(itemNameIcon);
    itemWrap.appendChild(itemNameWrap);
    itemWrap.appendChild(itemTooltipWrap);
    itemNameWrap.addEventListener("click", _a.instance.clickPeerItemHandler);
    _a.chatPeerList.appendChild(itemWrap);
    _a.chatPeerRelationsHTML.push(itemWrap);
    return itemWrap;
};
/**
 * This function modifies a peer item HTML, from:
 * - adding an item to peer list
 * - message information
 * - reordering peer list items
 *
 * @param { iRelation } rel - user data on a peer about their relation
 * @param { iMsgBody } [msg] - optional message item
 */
PeerComponent.updatePeerListHTML = (rel, msg) => {
    const vRelInfo = _a.searchPeerInfo(rel.chat_id);
    let vRelHTML;
    let withinList;
    if (vRelInfo && "chat_id" in vRelInfo) {
        withinList = true;
        // if rel is within peerInfo, fetch present representing HTML
        vRelHTML = _a.searchPeerHTML(rel.chat_id);
        // if rel not atop peerList, remove rel from peerList & peerInfo
        if (_a.chatPeerRelationsHTML[0] !== vRelHTML) {
            _a.chatPeerRelationsHTML = _a.chatPeerRelationsHTML.filter((html) => html.dataset.chatId !== rel.chat_id);
            _a.chatPeerRelationsInfo = _a.chatPeerRelationsInfo.filter((relInfo) => relInfo.chat_id !== rel.chat_id);
        }
    }
    else {
        withinList = false;
        // if rel is not within peerInfo, create representing HTML
        vRelHTML = _a.createRelationItemHTML(rel);
    }
    // if called from new msg, add message
    if (msg !== undefined && msg !== null && "msg" in msg) {
        PeerComponent.updateMsg(vRelHTML, msg);
    }
    // if rel not atop peerList
    if (_a.chatPeerRelationsHTML[0] !== vRelHTML) {
        // place it at the peerList's & peerInfo's beginning
        _a.chatPeerRelationsHTML.unshift(vRelHTML);
        _a.chatPeerRelationsInfo.unshift(rel);
        // place it at the peerList's HTML beginning
        _a.chatPeerList.removeChild(vRelHTML);
        _a.chatPeerList.prepend(vRelHTML);
    }
};
/**
 * This function returns matching peer item object from class stored peer items data.
 *
 * @param { string } id - account id or group id of a user peer
 * @returns { iRelation | undefined }
 *
 * @static
 */
PeerComponent.searchPeerInfo = (id) => {
    const t = PeerComponent.chatPeerRelationsInfo.find((rel) => rel.chat_id === id);
    return t;
};
/**
 * This function returns matching peer item HTML element from class tracked peer HTML array.
 *
 * @param { string } id - account id or group id of a user peer
 * @returns { DivElement | undefined }
 *
 * @static
 */
PeerComponent.searchPeerHTML = (id) => {
    let html;
    _a.chatPeerRelationsHTML.forEach((h) => {
        if (h.dataset.chatId === id) {
            html = h;
        }
    });
    return html;
};
/**
 * This function updates an HTML message info elements.
 *
 * @param { HTMLDivElement } html - HTML element to be modified
 * @param { iMsgBody } data - message data
 */
PeerComponent.updateMsg = (html, data) => {
    const t = html.querySelector("span:first-child");
    t.textContent = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.milliToTime(+data.timeReceived);
    const m = html.querySelector("span:last-child");
    m.textContent = " - ".concat(data.msg.slice(0, 10)).concat(" ...");
};
/**
 * This function either returns
 * - anew or old instance of the class
 * - null if the class is instructed to be deleted
 *
 * @param { boolean } deleteInstance - flag indicating whether this class will be deleted
 * @param { iUserObj } userObj - user data
 * @returns { PeerComponent | null }
 */
PeerComponent.getInstance = (deleteInstance, userObj) => {
    if (!deleteInstance) {
        if (!_a.instance)
            _a.instance = new PeerComponent(userObj);
    }
    else {
        _a.instance = null;
        _a.chatPeerRelationsInfo.length = 0;
        _a.chatPeerRelationsHTML.length = 0;
    }
    return _a.instance;
};



/***/ }),

/***/ "./src/components/user.comp.ts":
/*!*************************************!*\
  !*** ./src/components/user.comp.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserComponent": () => (/* binding */ UserComponent)
/* harmony export */ });
/* harmony import */ var _util_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/gen.util */ "./src/util/gen.util.ts");
/* harmony import */ var _util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/asyncWrap.util */ "./src/util/asyncWrap.util.ts");
/* harmony import */ var _util_validation_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/validation.util */ "./src/util/validation.util.ts");
/* harmony import */ var _base_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.comp */ "./src/components/base.comp.ts");
/* harmony import */ var _app_comp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.comp */ "./src/components/app.comp.ts");
/* harmony import */ var _peer_comp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peer.comp */ "./src/components/peer.comp.ts");
/* harmony import */ var _auth_comp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./auth.comp */ "./src/components/auth.comp.ts");
/* harmony import */ var _util_socket_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../util/socket.util */ "./src/util/socket.util.ts");
/* harmony import */ var _msgs_comp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./msgs.comp */ "./src/components/msgs.comp.ts");
/* harmony import */ var _error_comp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./error.comp */ "./src/components/error.comp.ts");
/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../models/user.model */ "./src/models/user.model.ts");
/* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../hooks/requests.hook */ "./src/hooks/requests.hook.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;












/**
 * This class holds functions w/c manages and renders data regarding user settings and requests.
 *
 * @extends Component
 */
class UserComponent extends _base_comp__WEBPACK_IMPORTED_MODULE_3__.Component {
    /**
     * Upon instantiation, the constructor immediately sends request to the server for user data.
     *
     * @constructor
     */
    constructor() {
        super(".chat-user-wrap", "user-temp", "afterbegin");
        this.appComp = _app_comp__WEBPACK_IMPORTED_MODULE_4__.AppComponent.getInstance();
        // --------------------------
        // ---- EVENT HANDLERS -----
        // --------------------------
        /**
         * Upon callback, this function hides user component.
         *
         * @param { MouseEvent } [e]
         *
         * @listens MouseEvent
         */
        this.chatUserRemoveHandler = (e) => {
            this.chatUserWrap.classList.remove("chat-user-show");
        };
        /** This function assigns event listeners to user component sections' heads. */
        this.chatToggleUserSection = () => {
            this.chatUserHeads.forEach((head) => {
                head.addEventListener("click", this.clickUserSectionHandler);
            });
        };
        /**
         * Upon callback, this function toggles visibility of clicked user component section.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickUserSectionHandler = (e) => {
            const headIcon = e.target.querySelector("i");
            const headSibling = e.target
                .nextElementSibling;
            headIcon.classList.toggle("chat-user-head-toggled");
            headSibling.classList.toggle("chat-user-content-toggle");
        };
        /**
         * This callback listens to click events which will emit a socket event to the server to respond to peer | group requests.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickUserRequest = (e) => {
            var _b, _c, _d, _e, _f, _g;
            // DATA GATHERING
            const target = e.target;
            const reqBody = this.createRequestBody((_c = (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.dataset.isGroup, (_e = (_d = target.parentElement) === null || _d === void 0 ? void 0 : _d.parentElement) === null || _e === void 0 ? void 0 : _e.dataset.userId);
            const action = target.dataset.requestAction;
            if (!action)
                return;
            // VALIDATION
            const requestValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.patchRequestData(reqBody, action);
            if (!requestValid.isValid) {
                console.error(`ERROR: client data for user request action is invalid`);
                console.error(requestValid.error);
                return;
            }
            // SOCKET REQUEST
            if (target.classList.contains("request-action") &&
                ((_f = target.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement)) {
                (_g = _util_socket_util__WEBPACK_IMPORTED_MODULE_7__.SocketMethods.socket) === null || _g === void 0 ? void 0 : _g.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_7__.SocketMethods.patchRequestEv, reqBody, action);
                // try {
                //   response = await tryCatch(httpPutUserRequest, reqBody, action);
                //   if (response.data) {
                //     if (
                //       response.data.statusCode >= 200 &&
                //       response.data.statusCode < 400
                //     ) {
                //       return;
                //     } else {
                //       console.error(
                //         "ERROR: server responded with an error upon client's request for user-to-user contact request"
                //       );
                //       console.error(response.data);
                //       return;
                //     }
                //   } else {
                //     console.error(
                //       "ERROR: server is unable to process user request fro user-to-user contact request"
                //     );
                //     console.error(response.err);
                //     return;
                //   }
                // } catch (err) {
                //   console.error(
                //     `ERROR: client is unable to request user-to-user contact request`
                //   );
                //   console.error(err);
                // }
            }
        };
        /**
         * Upon callback, this function requests an HTTP PUT to the server to modify their publicity setting.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickUserPublicHandler = (e) => __awaiter(this, void 0, void 0, function* () {
            // DATA GATHERING
            const userPrivacy = {
                property: this.chatUserPublic.dataset
                    .settingsProperty,
                value: this.chatUserPublic.dataset.settingsPublic === "true"
                    ? "false"
                    : "true",
            };
            // VALIDATION
            const privacyDataValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.privacyData(userPrivacy, _models_user_model__WEBPACK_IMPORTED_MODULE_10__.userSettings["public"]);
            if (!privacyDataValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: privacy data for user publicity configuration request is invalid`, privacyDataValid.error);
            }
            // HTTP REQUEST
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_11__.httpPutUserPrivacy, userPrivacy);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: client is unable to send request for user privacy configuration`, err);
            }
            // VALIDATION: HTTP RESPONSE
            const resValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, "server is unable to process client's request for privacy configuration", "server responded with an error upon client's request for user privacy configuration");
            if (!resValid)
                return;
            // HTTP REPONSE PROCESSING
            const publicValue = this.chatUserPublic.dataset.settingsPublic === "true"
                ? "false"
                : "true";
            this.chatUserPublic.dataset.settingsPublic = publicValue;
        });
        /**
         * Upon callback, this function requests an HTTP PUT to the server to modify their availability setting.
         *
         * @param { MouseEvent } e
         *
         * @listens MouseEvent
         */
        this.clickUserAvailabilityHandler = (e) => __awaiter(this, void 0, void 0, function* () {
            // DATA GATHERING
            const userPrivacy = {
                property: this.chatUserAvailability.dataset
                    .settingsProperty,
                value: this.chatUserAvailability.dataset.settingsAvailability ===
                    "true"
                    ? "false"
                    : "true",
            };
            // VALIDATION
            const privacyDataValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.privacyData(userPrivacy, _models_user_model__WEBPACK_IMPORTED_MODULE_10__.userSettings.availability);
            if (!privacyDataValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: privacy data for user availability configuration request is invalid`, privacyDataValid.error);
            }
            // HTTP REQUEST
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_11__.httpPutUserPrivacy, userPrivacy);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp("ERROR: client is unable to send request for publicity configuration", err);
            }
            // VALIDATION: HTTP RESPONSE
            const resValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, "server is unable to process client's request for privacy configuration", "server responded with an error upon client's request for user privacy configuration");
            if (!resValid)
                return;
            // HTTP RESPONSE PROCESSING
            const publicValue = this.chatUserAvailability.dataset.settingsAvailability ===
                "true"
                ? "false"
                : "true";
            this.chatUserAvailability.dataset.settingsAvailability = publicValue;
        });
        /**
         * Upon callback, this function requests an HTTP PUT to the server to modify their account password.
         *
         * @param { SubmitEvent } e
         *
         * @listens SubmitEvent
         */
        this.submitPasswordHandler = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            // DATA GATHERING
            const passwordSet = this.getPasswordForm();
            const passwordValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.changePasswordForm(passwordSet);
            // VALIDATION
            if (!passwordValid.isValid) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: password data for user security configuration request is invalid`, passwordValid.error);
            }
            // HTTP REQUEST
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_11__.httpPutUserPassword, passwordSet);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: something went wrong upon client's request for password change`, err);
            }
            // VALIDATION: HTTP RESPONSE
            const resValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, "server is unable to process user logout", "server responded with an error is unable to send request for user logout");
            if (!resValid)
                return;
            try {
                yield this.userLogoutHandler();
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: client is unable to send request for user logout`, err);
            }
            this.clearPasswordForm();
        });
        /**
         * Upon callback, this function:
         * - requests HTTP GET to the server to initiate account logout
         * - destroy any other connections
         * - deletes related HTML elements
         *
         * @param { MouseEvent } [e]
         * @returns { Promise<void> }
         */
        this.userLogoutHandler = (e) => __awaiter(this, void 0, void 0, function* () {
            // HTTP REQUEST
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_11__.httpGetLogout);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: client is unable to send request for user logout`, err);
            }
            // VALIDATION
            const resValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, "server is unable to process user logout", `server responded with an error upon client's request for user logout`);
            if (!resValid)
                return;
            _util_socket_util__WEBPACK_IMPORTED_MODULE_7__.SocketMethods.destroy();
            sessionStorage.clear();
            this.appComp.appAuth();
            const authComp = _auth_comp__WEBPACK_IMPORTED_MODULE_6__.AuthComponent.getInstance();
            authComp.enableLogElements();
            authComp.disableRegElements();
            authComp.showLogForm();
            this.deleteUserComponents();
        });
        this.configureComponent();
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getUser();
                this.renderComponent();
            }
            catch (err) {
                _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`client is unable to get user data`, err);
            }
        }))();
    }
    configureComponent() {
        this.chatUserRemove = document.querySelector(".chat-user-name > i");
        this.chatUserName = document.querySelector(".chat-user-name > h2");
        this.chatUserWrap = document.querySelector(".chat-user-wrap");
        this.chatPeerWrap = document.querySelector(".chat-peer-wrap");
        this.chatUserHeads = [
            ...document.querySelectorAll(".chat-user-head"),
        ];
        this.chatUserInvites = document.querySelector(".chat-user-invitations");
        UserComponent.chatUserIncomingWrap = document.querySelector(".chat-user-incoming-items-wrap");
        UserComponent.chatUserOutgoingWrap = document.querySelector(".chat-user-outgoing-items-wrap");
        // UserComponent.chatUserMutesWrap = document.querySelector(
        //   ".chat-user-mutes"
        // )! as HTMLDivElement;
        UserComponent.chatUserMutesWrap = document.querySelector(".chat-user-mute-items-wrap");
        // UserComponent.chatUserBlocksWrap = document.querySelector(
        //   ".chat-user-blocks"
        // )! as HTMLDivElement;
        UserComponent.chatUserBlocksWrap = document.querySelector(".chat-user-block-items-wrap");
        this.chatUserPublic = document.querySelector(".chat-user-security-public");
        this.chatUserAvailability = document.querySelector(".chat-user-security-availability");
        this.chatUserForm = document.querySelector(".chat-user-set-password");
        this.chatUserPassword = document.querySelector("#set-password");
        this.chatUserRePassword = document.querySelector("#set-rePassword");
        this.chastUserLogout = document.querySelector(".chat-user-logout");
        this.chatUserRemove.addEventListener("click", this.chatUserRemoveHandler);
        this.chatUserPublic.addEventListener("click", this.clickUserPublicHandler);
        this.chatUserAvailability.addEventListener("click", this.clickUserAvailabilityHandler);
        this.chatUserForm.addEventListener("submit", this.submitPasswordHandler);
        this.chatUserInvites.addEventListener("click", this.clickUserRequest);
        this.chastUserLogout.addEventListener("click", this.userLogoutHandler);
        this.chatToggleUserSection();
    }
    renderComponent() {
        this.chatUserName.textContent = this.chatUserInfo.accnt_name;
        this.chatUserPublic.dataset.settingsProperty = _models_user_model__WEBPACK_IMPORTED_MODULE_10__.userSettings["public"];
        this.chatUserPublic.dataset.settingsPublic = `${this.chatUserInfo.privacy.public}`;
        this.chatUserAvailability.dataset.settingsProperty =
            _models_user_model__WEBPACK_IMPORTED_MODULE_10__.userSettings.availability;
        this.chatUserAvailability.dataset.settingsAvailability = `${this.chatUserInfo.privacy.availability}`;
        this.generateRequests();
        this.generateMuteBlockItem();
    }
    // --------------------------
    // ----- CLASS UTILITY ------
    // --------------------------
    /**
     * This function
     * - requests an HTTP GET to the server
     * - stores received user data to class
     *
     * @returns { Promise<void> }
     */
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            // HTTP REQUEST
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_11__.httpGetUser);
            }
            catch (err) {
                return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp("ERROR: client is unable to fetch user data", err);
            }
            // VALIDATION: HTTP RESPONSE
            const httpValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, `server error occured`, `client responded with an error for upon request for user information`);
            if (!httpValid)
                return;
            // HTTP RESPONSE PROCESSING
            this.chatUserInfo = response.data.data;
        });
    }
    /**
     * This function retrieves values from password section input elements.
     *
     * @returns { iUserPassword }
     */
    getPasswordForm() {
        return {
            password: this.chatUserPassword.value,
            rePassword: this.chatUserRePassword.value,
        };
    }
    /** This function clears values of password section input elements.*/
    clearPasswordForm() {
        this.chatUserPassword.value = "";
        this.chatUserRePassword.value = "";
    }
    deleteUserComponents() {
        UserComponent.getInstance(true);
        _peer_comp__WEBPACK_IMPORTED_MODULE_5__.PeerComponent.getInstance(true, {});
        _msgs_comp__WEBPACK_IMPORTED_MODULE_8__.MessagesComponent.getInstance("deleteId", "deleteId", "deleteName", "deleteChatId", false, "user", true, false);
        this.chatUserWrap.innerHTML = "";
        this.chatPeerWrap.innerHTML = "";
        this.chatUserRemoveHandler();
    }
    /** Loops over available request items array from user data for rendering. */
    generateRequests() {
        if (!this.chatUserInfo ||
            typeof this.chatUserInfo !== "object" ||
            Object.keys(this.chatUserInfo).length < 1)
            return;
        const incoming = this.chatUserInfo.requests.incoming;
        const outgoing = this.chatUserInfo.requests.outgoing;
        let item;
        for (item of incoming) {
            UserComponent.createRequest(item, UserComponent.chatUserIncomingWrap, "incoming");
        }
        for (item of outgoing) {
            UserComponent.createRequest(item, UserComponent.chatUserOutgoingWrap, "outgoing");
        }
    }
    /** This function
     * - loops ofer retrieved user relation data
     * - picks who will belong to mute & block section
     * */
    generateMuteBlockItem() {
        const mutes = this.chatUserInfo.relations.mutes;
        const blocks = this.chatUserInfo.relations.blocks;
        let mute;
        let block;
        for (mute of mutes) {
            UserComponent.createMuteBlockItem(mute, UserComponent.chatUserMutesWrap, 0);
        }
        for (block of blocks) {
            UserComponent.createMuteBlockItem(block, UserComponent.chatUserBlocksWrap, 1);
        }
    }
    /**
     * This function returns an object to be sent along an HTTP Request when sending peer request.
     *
     * @param { iStrBool } isGroup
     * @param { string } receiverId
     * @returns { iRequestBody }
     */
    createRequestBody(isGroup, receiverId) {
        return {
            type: isGroup === "true" ? 2 : 1,
            recipientId: isGroup === "false" ? receiverId : null,
            groupId: isGroup === "true" ? receiverId : null,
        };
    }
}
_a = UserComponent;
/**
 *  Upon callback, this function
 * - requests an HTTP PATCH to the server to modify user relationship status from target peer
 * - modifies peer list item according to actiion taken
 *
 * @param { MouseEvent } e
 * @returns { Promise<void> }
 *
 * @listens MouseEvent
 */
UserComponent.clickUserMuteBlock = (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    // DATA GATHERING
    const target = e.target;
    const action = target.parentElement
        .dataset.action;
    const relationAct = {
        recipientId: target.parentElement.dataset
            .userId,
        userAction: action,
        actionValue: false,
    };
    // VALIDATION
    const relActValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.relationAction(relationAct);
    if (!relActValid.isValid) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp("ERROR: client request data for user relation patch is invalid", relActValid.error);
    }
    // HTTP REQUEST
    // PATCH to user relations
    let response;
    try {
        response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_11__.httpPatchRelation, relationAct);
    }
    catch (err) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp("ERROR: client is unable to request for patching of user relations", err);
    }
    // VALIDATION: HTTP RESPONSE
    const resValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.httpRes(response, "server is unable to process user's request for patching relations", "server responded with an error upon user's request for patching relations");
    if (!resValid)
        return;
    /*
    MUTE | BLOCK
    --- if unmuted peer list item is within visible peerlist
    --- sort by bump, then add item
    */
    // REMOVE MUTE | BLOCK ITEM
    (_d = (_c = (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.removeChild((_e = target.parentElement) === null || _e === void 0 ? void 0 : _e.parentElement);
    // SEARCH FOR RELATION ITEM IN PEER COMPONENT
    // --- IF VISIBLE, ACT, OTHERWISE, IGNORE
    const relItem = _peer_comp__WEBPACK_IMPORTED_MODULE_5__.PeerComponent.searchPeerHTML(target.parentElement.dataset.userId);
});
/**
 * This function
 * - transforms a request item data into an HTML element
 * - attaches it to a corresponding request section
 *
 * @param { iRequest } item - request item data
 * @param { HTMLDivElement } wrapper - request item section container
 * @param { "incoming" | "outgoing" } type - requester chat type
 *
 * @static
 */
UserComponent.createRequest = (item, wrapper, type) => {
    item = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.requestStrIntToBool(item);
    // if (item.isGroup && type === "outgoing") return;
    const requestValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.requestItem(item, wrapper, type);
    if (!requestValid.isValid) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp("ERROR: Request item data is invalid", requestValid.error);
    }
    const itemWrap = document.createElement("div");
    const itemName = document.createElement("p");
    const itemActions = document.createElement("p");
    let itemCancel;
    let itemApprove;
    let itemReject;
    if (type === "outgoing") {
        itemCancel = document.createElement("i");
        itemWrap.classList.add("chat-user-outgoing-item");
        itemName.textContent = item.accnt_name;
        itemCancel.classList.add("fa-solid", "fa-xmark", "request-action");
        itemCancel.dataset.requestAction = _models_user_model__WEBPACK_IMPORTED_MODULE_10__.requestActions.cancel;
        itemActions.appendChild(itemCancel);
    }
    else if (type === "incoming") {
        itemApprove = document.createElement("i");
        itemReject = document.createElement("i");
        itemWrap.classList.add("chat-user-incoming-item");
        itemName.textContent = item.accnt_name;
        itemApprove.classList.add("fa-solid", "fa-check", "request-action");
        itemApprove.dataset.requestAction = _models_user_model__WEBPACK_IMPORTED_MODULE_10__.requestActions.approve;
        itemReject.classList.add("fa-solid", "fa-xmark", "request-action");
        itemReject.dataset.requestAction = _models_user_model__WEBPACK_IMPORTED_MODULE_10__.requestActions.reject;
        itemActions.appendChild(itemApprove);
        itemActions.appendChild(itemReject);
    }
    itemWrap.dataset.userId = item.accnt_id;
    itemWrap.dataset.isGroup = item.isGroup ? `true` : `false`;
    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemActions);
    wrapper.appendChild(itemWrap);
};
/**
 * This function deletes a request HTML element from the user component.
 *
 * @param { string } requestItemId - account or group id of the request item
 * @param { 0 | 1 } type - account type of the request item
 *
 * @static
 */
UserComponent.deleteRequest = (requestItemId, type) => {
    // DATA GATHERING
    const inputValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.requestDel(requestItemId, type);
    // VALIDATION
    if (!inputValid.isValid) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: Server send invalid request deletion data`, inputValid.error);
    }
    // PROCESS: wrapper identification
    let parentNode;
    type === 0
        ? (parentNode = _a.chatUserOutgoingWrap)
        : (parentNode = _a.chatUserIncomingWrap);
    parentNode.removeChild([...parentNode.children].filter((item) => requestItemId === item.dataset.userId)[0]);
};
/**
 * This function
 * - transforms a iRelation item data into an HTML element
 * - attaches it to a corresponding section
 *
 * @param { iRelation } item - request item data
 * @param { HTMLDivElement } wrapper - request item section container
 * @param { 0 | 1 } type - mute | block item chat type
 * @returns
 */
UserComponent.createMuteBlockItem = (item, wrapper, 
// 0 (mute)    (1) block
type) => {
    // VALIDATION
    const itemValid = _util_validation_util__WEBPACK_IMPORTED_MODULE_2__.Validate.muteBlockItem(item, wrapper, type);
    if (!itemValid.isValid) {
        return _error_comp__WEBPACK_IMPORTED_MODULE_9__.ErrorComponent.showComp(`ERROR: Mute item contains invalid data`, itemValid.error);
    }
    // item wrapper
    const itemWrap = document.createElement("div");
    itemWrap.classList.add("chat-user-block-item");
    // item name
    const itemName = document.createElement("p");
    itemName.textContent = item.accnt_name;
    // item action
    const itemAction = document.createElement("p");
    itemAction.dataset.userId = item.accnt_id;
    itemAction.dataset.action = type === 0 ? "mute" : "block";
    itemAction.addEventListener("click", UserComponent.clickUserMuteBlock);
    // item icon
    const itemIcon = document.createElement("i");
    itemIcon.classList.add("fa-solid", "fa-xmark");
    itemAction.appendChild(itemIcon);
    itemWrap.appendChild(itemName);
    itemWrap.appendChild(itemAction);
    wrapper.appendChild(itemWrap);
    // MODEL HTML
    // <div class='chat-user-block-item'>
    //   <p>blocked user</p>
    //   <p data-user-id='3asda3da4' data-action='block'>
    //     <i class='fa-solid fa-xmark'></i>
    //   </p>
    // </div>;
};
/**
 * This function returns:
 * - a new or old instance
 * - null if the component is instructed for deletion
 *
 * @param { boolean } deleteInstance - flag indicating whther the component will be deleted.
 * @returns
 */
UserComponent.getInstance = (deleteInstance) => {
    if (!deleteInstance) {
        if (!_a.instance)
            _a.instance = new UserComponent();
    }
    else {
        _a.instance.chatUserRemoveHandler();
        _a.instance.chatUserWrap.innerHTML = "";
        _a.instance = null;
    }
    return _a.instance;
};



/***/ }),

/***/ "./src/hooks/requests.hook.ts":
/*!************************************!*\
  !*** ./src/hooks/requests.hook.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "httpGetAuth": () => (/* binding */ httpGetAuth),
/* harmony export */   "httpGetGroup": () => (/* binding */ httpGetGroup),
/* harmony export */   "httpGetGroups": () => (/* binding */ httpGetGroups),
/* harmony export */   "httpGetLogout": () => (/* binding */ httpGetLogout),
/* harmony export */   "httpGetMsgs": () => (/* binding */ httpGetMsgs),
/* harmony export */   "httpGetTopMsg": () => (/* binding */ httpGetTopMsg),
/* harmony export */   "httpGetUser": () => (/* binding */ httpGetUser),
/* harmony export */   "httpGetUserRelations": () => (/* binding */ httpGetUserRelations),
/* harmony export */   "httpGetUsers": () => (/* binding */ httpGetUsers),
/* harmony export */   "httpPatchRelation": () => (/* binding */ httpPatchRelation),
/* harmony export */   "httpPostGroup": () => (/* binding */ httpPostGroup),
/* harmony export */   "httpPostLogin": () => (/* binding */ httpPostLogin),
/* harmony export */   "httpPostRegister": () => (/* binding */ httpPostRegister),
/* harmony export */   "httpPostUserRequest": () => (/* binding */ httpPostUserRequest),
/* harmony export */   "httpPutUserPassword": () => (/* binding */ httpPutUserPassword),
/* harmony export */   "httpPutUserPrivacy": () => (/* binding */ httpPutUserPrivacy),
/* harmony export */   "httpPutUserRequest": () => (/* binding */ httpPutUserRequest)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function httpPostLogin(loginBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(loginBody),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpPostRegister(regBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/auth/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(regBody),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/auth", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetUsers(searchValues) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch(`/1/user/search/`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchValues),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpPostUserRequest(requestBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/request", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpPutUserRequest(requestBody, requestAction) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch(`/1/request/${requestAction}`, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpPutUserPrivacy(userSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch(`/1/user/settings`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userSettings),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) { }
    });
}
function httpPutUserPassword(passwordSet) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/user/settings/password", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(passwordSet),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetLogout() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/auth/logout", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetUserRelations(relBody) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch(`/1/relation`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(relBody),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpPatchRelation(relationAct) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/relation", {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(relationAct),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetGroup(groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch(`/1/group/${groupId}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/group", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpPostGroup(newGrp) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/group", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newGrp),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetMsgs(chatData) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch("/1/chat", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(chatData),
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}
function httpGetTopMsg(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch(`/1/chat/${chatId}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
        }
        catch (err) {
            return err;
        }
        try {
            data = yield response.json();
            return data;
        }
        catch (err) {
            return err;
        }
    });
}


/***/ }),

/***/ "./src/models/auth.model.ts":
/*!**********************************!*\
  !*** ./src/models/auth.model.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "password_pattern": () => (/* binding */ password_pattern),
/* harmony export */   "username_pattern": () => (/* binding */ username_pattern)
/* harmony export */ });
const password_pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", "g");
const username_pattern = new RegExp("^[a-zA-Z0-9#?!@$%^&*]{8,20}$");


/***/ }),

/***/ "./src/models/peer.model.ts":
/*!**********************************!*\
  !*** ./src/models/peer.model.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chatType": () => (/* binding */ chatType),
/* harmony export */   "contactAct": () => (/* binding */ contactAct),
/* harmony export */   "relationType": () => (/* binding */ relationType)
/* harmony export */ });
const relationType = {
    contact: "contact",
    mute: "mute",
    block: "block",
};
const contactAct = {
    archive: "archive",
    block: "block",
    mute: "mute",
};
const chatType = {
    user: "user",
    group: "group",
};


/***/ }),

/***/ "./src/models/user.model.ts":
/*!**********************************!*\
  !*** ./src/models/user.model.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iRequestType": () => (/* binding */ iRequestType),
/* harmony export */   "requestActions": () => (/* binding */ requestActions),
/* harmony export */   "userSettings": () => (/* binding */ userSettings)
/* harmony export */ });
const requestActions = {
    approve: "approve",
    reject: "reject",
    cancel: "cancel",
};
const userSettings = {
    public: "public",
    availability: "availability",
};
const iRequestType = {
    out: "outgoing",
    in: "incoming",
};


/***/ }),

/***/ "./src/socket/message.events.ts":
/*!**************************************!*\
  !*** ./src/socket/message.events.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageEvent": () => (/* binding */ MessageEvent)
/* harmony export */ });
/* harmony import */ var _components_peer_comp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/peer.comp */ "./src/components/peer.comp.ts");
/* harmony import */ var _components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/msgsList.comp */ "./src/components/msgsList.comp.ts");
var _a;


/** This class holds functions which manages Message List HTML & Data, and Peer Component HTML Update.*/
class MessageEvent {
    constructor() { }
}
_a = MessageEvent;
/**
 * This function entails the occuring logic when a message is received.
 * - message list HTML update
 * - peer list HTML update
 * - message list data update
 *
 * @param { iMsgBody } data - message received from socket
 */
MessageEvent.postMessageR = (data) => {
    _components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.createMsgItem(data, _components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.getChatMsgBody(), _components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.getChatMsgsListWrap(), 
    // 0 - from client browser      1 - from other user(s)
    1);
    _components_peer_comp__WEBPACK_IMPORTED_MODULE_0__.PeerComponent.updatePeerListHTML({ accnt_id: data.senderId, chat_id: data.chatId }, data);
    if (_components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.getInst() !== null)
        _components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.getInst().incrMsgsListCnt();
    _components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.setMsgListInfo(_components_msgsList_comp__WEBPACK_IMPORTED_MODULE_1__.MessagesListComponent.getChatMsgsListWrap().dataset.chatId, data, null);
};
/**
 * This function returns a new or the first instance of the class.
 *
 * @returns { MessageEvent }
 *
 * @static
 */
MessageEvent.getInst = () => {
    if (!_a.inst)
        _a.inst = new MessageEvent();
    return _a.inst;
};



/***/ }),

/***/ "./src/socket/relation.events.ts":
/*!***************************************!*\
  !*** ./src/socket/relation.events.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RelationEvent": () => (/* binding */ RelationEvent)
/* harmony export */ });
var _a;
class RelationEvent {
}
_a = RelationEvent;
RelationEvent.patchRelation = () => { };
RelationEvent.getInst = () => {
    if (!_a.inst)
        _a.inst = new RelationEvent();
    return _a.inst;
};



/***/ }),

/***/ "./src/socket/request.events.ts":
/*!**************************************!*\
  !*** ./src/socket/request.events.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RequestEvents": () => (/* binding */ RequestEvents)
/* harmony export */ });
/* harmony import */ var _util_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/gen.util */ "./src/util/gen.util.ts");
/* harmony import */ var _util_validation_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation.util */ "./src/util/validation.util.ts");
/* harmony import */ var _util_socket_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/socket.util */ "./src/util/socket.util.ts");
/* harmony import */ var _components_user_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/user.comp */ "./src/components/user.comp.ts");
/* harmony import */ var _components_peer_comp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/peer.comp */ "./src/components/peer.comp.ts");
/* harmony import */ var _components_msgsOpts_comp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/msgsOpts.comp */ "./src/components/msgsOpts.comp.ts");
var _a;






/** This class holds function  */
class RequestEvents {
    constructor() { }
}
_a = RequestEvents;
/**
 * This function entails the logic upon receiving a request post from socket.
 *
 * @param { iRequest } requestItem - request body object
 * @param { 0 | 1 } type - 0 outgoing | 1 incoming
 * @param { iReqType } reqType - 1 u2u (user-user) | 2 u2g (user-group) | 3 g2u (group-user)
 * @param { string } chatId - group chat id of the target group of request
 *
 * @static
 */
RequestEvents.postRequestR = (requestItem, type, reqType, chatId) => {
    // OPTION FOR ADDING REQUEST VIA SOCKET IS NOT VIABLE SINCE SOCKET ID ARE FROM USER ID, CONNECTED UPON LOGGING IN, GROUP SOCKET IDS, MUST FIRST BE ESTABLISHED
    requestItem = _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.requestStrIntToBool(requestItem);
    if (reqType === 1) {
        // if u2u, add request to user comp
        _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.createRequest(requestItem, type === 0
            ? _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.chatUserOutgoingWrap
            : _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.chatUserIncomingWrap, type === 0 ? "outgoing" : "incoming");
    }
    else if (reqType === 2) {
        /**
         * if u2g, either
         * - add request to user comp if outgoing
         * - add request to message comp if incoming
         */
        if (type === 0)
            _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.createRequest(requestItem, _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.chatUserOutgoingWrap, "outgoing");
        else
            _components_msgsOpts_comp__WEBPACK_IMPORTED_MODULE_5__.MessagesOptionsComponent.createRequest(requestItem, _components_msgsOpts_comp__WEBPACK_IMPORTED_MODULE_5__.MessagesOptionsComponent.getMsgOptsIncomingWrap(), "incoming", chatId);
    }
    else {
        /**
         * if g2u,
         * - add request to message comp if outgoing
         * - add request to user comp if incoming
         */
        if (type === 0)
            _components_msgsOpts_comp__WEBPACK_IMPORTED_MODULE_5__.MessagesOptionsComponent.createRequest(requestItem, _components_msgsOpts_comp__WEBPACK_IMPORTED_MODULE_5__.MessagesOptionsComponent.getMsgOptsOutgoingWrap(), "outgoing", chatId);
        else
            _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.createRequest(requestItem, _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.chatUserIncomingWrap, "incoming");
    }
};
/**
 * This function entails the logic upon receiving a request patch from socket.
 *
 * @param { string } requestItemId - account id of the other party of request
 * @param { 0 | 1 } type - 0 outgoing | 1 incoming
 * @param { iRequestApproveData } approveData - new request status and key relation item of the other party of request
 * @param { iReqType } reqType - 1 u2u (user-user) | 2 u2g (user-group) | 3 g2u (group-user)
 * @param { string } chatId - group chat id of the target group of request
 *
 * @static
 */
RequestEvents.patchRequestR = (requestItemId, type, approveData, reqType, chatId) => {
    var _b;
    if (approveData.relItem.type === "user")
        _components_user_comp__WEBPACK_IMPORTED_MODULE_3__.UserComponent.deleteRequest(requestItemId, type);
    if (reqType === 2 || reqType === 3)
        _components_msgsOpts_comp__WEBPACK_IMPORTED_MODULE_5__.MessagesOptionsComponent.deleteRequest(requestItemId, chatId);
    if (_util_validation_util__WEBPACK_IMPORTED_MODULE_1__.Validate.approveData(approveData).isValid &&
        _util_validation_util__WEBPACK_IMPORTED_MODULE_1__.Validate.contactItem(approveData.relItem).isValid) {
        _components_peer_comp__WEBPACK_IMPORTED_MODULE_4__.PeerComponent.updatePeerListHTML(approveData.relItem);
        // joins room of the new connected peer in socket
        (_b = _util_socket_util__WEBPACK_IMPORTED_MODULE_2__.SocketMethods.socket) === null || _b === void 0 ? void 0 : _b.emit(_util_socket_util__WEBPACK_IMPORTED_MODULE_2__.SocketMethods.joinRoomEv, approveData.relItem.chat_id, (res) => {
            console.log(res);
        });
    }
};
/**
 * This function returns a new or the first instance of the class.
 *
 * @returns { RequestEvents }
 *
 * @static
 */
RequestEvents.getInst = () => {
    if (!_a.inst)
        _a.inst = new RequestEvents();
    return _a.inst;
};



/***/ }),

/***/ "./src/util/asyncWrap.util.ts":
/*!************************************!*\
  !*** ./src/util/asyncWrap.util.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tryCatch": () => (/* binding */ tryCatch)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * This function is an asynchronous wrapper for HTTP requesting functions which returns a transformed HTTP response object for error management.
 *
 * @param { Function } fx - an asynchronous function
 * @param { any[] } [params] - optional parameter(s)
 *
 * @returns { Promise<{ err: any; data: any }> }
 */
function tryCatch(fx, ...params) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data;
            if (params) {
                data = yield fx(...params);
            }
            else {
                data = yield fx();
            }
            if (data.statusCode >= 400) {
                return { err: data, data: null };
            }
            else {
                return { err: null, data };
            }
        }
        catch (err) {
            return { err, data: null };
        }
    });
}


/***/ }),

/***/ "./src/util/gen.util.ts":
/*!******************************!*\
  !*** ./src/util/gen.util.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GenUtil": () => (/* binding */ GenUtil)
/* harmony export */ });
/* harmony import */ var _asyncWrap_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asyncWrap.util */ "./src/util/asyncWrap.util.ts");
/* harmony import */ var _hooks_requests_hook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/requests.hook */ "./src/hooks/requests.hook.ts");
/* harmony import */ var _components_app_comp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/app.comp */ "./src/components/app.comp.ts");
/* harmony import */ var _socket_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./socket.util */ "./src/util/socket.util.ts");
/* harmony import */ var _components_user_comp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/user.comp */ "./src/components/user.comp.ts");
/* harmony import */ var _components_peer_comp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/peer.comp */ "./src/components/peer.comp.ts");
/* harmony import */ var _components_error_comp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/error.comp */ "./src/components/error.comp.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;







/** Thi class holds a variety of helper functions used throughout the client code base. */
class GenUtil {
    constructor() { }
}
_a = GenUtil;
/**
 * This function transforms an iRequest object retrieved from a redis.
 *
 * @param { any } obj
 * @returns { iRequest }
 *
 * @static
 */
GenUtil.requestStrIntToBool = (obj) => {
    if (obj.isGroup === "0" || obj.isGroup === 0) {
        obj.isGroup = false;
    }
    else if (obj.isGroup === "1" || obj.isGroup === 1) {
        obj.isGroup = true;
    }
    return obj;
};
/**
 * This function transforms an iRelation object retrieved from a redis.
 *
 * @param { any } obj
 * @returns { iRelation }
 *
 * @static
 */
GenUtil.relationStrIntToBool = (obj) => {
    if (obj.admin === "0" || obj.admin === 0) {
        obj.admin = false;
    }
    else if (obj.admin === "1" || obj.admin === 1) {
        obj.admin = true;
    }
    if (obj.block === "0" || obj.block === 0) {
        obj.block = false;
    }
    else if (obj.block === "1" || obj.block === 1) {
        obj.block = true;
    }
    if (obj.mute === "0" || obj.mute === 0) {
        obj.mute = false;
    }
    else if (obj.mute === "1" || obj.mute === 1) {
        obj.mute = true;
    }
    if (obj.archive === "0" || obj.archive === 0) {
        obj.archive = false;
    }
    else if (obj.archive === "1" || obj.archive === 1) {
        obj.archive = true;
    }
    obj.bump = parseInt(obj.bump);
    return obj;
};
/**
 * Transforms a number into formatted time.
 *
 * @param {number} milliseconds - Date in milliseconds.
 * @returns {string} - Formatted Date e.g. 6:21:50 AM | 12:01:00 PM
 *
 * @example
 * GenUtil.milliToTime(1692946408844); // Returns '2:53:28 PM'
 *
 * @static
 */
GenUtil.milliToTime = (milliseconds) => {
    /** Data Gathering
     * - Transforms millisecond into hours, minutes, & seconds.
     */
    const date = new Date(milliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // Add leading zeros if needed
    const halfDayHrs = hours % 12;
    const timePeriod = Math.ceil(hours / 12) === 1 ? "AM" : "PM";
    const formattedHours = halfDayHrs < 10 ? `0${halfDayHrs}` : halfDayHrs;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedTime = `${halfDayHrs}:${formattedMinutes}:${formattedSeconds} ${timePeriod}`;
    return formattedTime;
};
/**
 * - This function requests the server to authenticate a client if it has the credentials of a user.
 *
 * @param {Event} [e]
 * @returns {Promise<boolean>}
 *
 * @listens load
 *
 * @static
 */
GenUtil.logUser = (e) => __awaiter(void 0, void 0, void 0, function* () {
    /** DATA GATHERING
     * - Prepares chat application component.
     */
    const appComp = _components_app_comp__WEBPACK_IMPORTED_MODULE_2__.AppComponent.getInstance();
    /** HTTP REQUEST
     * - Requests an HTTP GET to the server for authentication.
     * - Immediately returns and instructs UI to show exception upon logic error.
     *
     * @example
     * - With credentials.
     * await tryCatch(httpGetAuth); // Object { err: null, data: {...} }
     * - Without credentials.
     * await tryCatch(httpGetAuth); // Object { err: null, data: {} }
     * - Invalid credentials.
     * await tryCatch(httpGetAuth); // Object { err: {...}, data: null }
     */
    let response;
    try {
        response = yield (0,_asyncWrap_util__WEBPACK_IMPORTED_MODULE_0__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_1__.httpGetAuth);
    }
    catch (err) {
        _components_error_comp__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent.showComp("ERROR: client is unable to request for authentication", err);
        return false;
    }
    /**
     * VALIDATION: HTTP RESPONSE
     * - Immediately returns upon invalid response.
     */
    if ((response.err !== null && response.err !== undefined) ||
        !("statusCode" in response.data)) {
        appComp.appAuth();
        return false;
    }
    /** - Create instances of required initial components */
    _components_peer_comp__WEBPACK_IMPORTED_MODULE_5__.PeerComponent.getInstance(false, response.data.data);
    _components_user_comp__WEBPACK_IMPORTED_MODULE_4__.UserComponent.getInstance(false);
    appComp.appUser();
    _socket_util__WEBPACK_IMPORTED_MODULE_3__.SocketMethods.init();
    return true;
});
/**
 * Returns an instance of the GenUtil class.
 * @returns {GenUtil}
 *
 * @static
 */
GenUtil.getInst = () => {
    if (!_a.inst)
        _a.inst = new GenUtil();
    return _a.inst;
};



/***/ }),

/***/ "./src/util/socket.util.ts":
/*!*********************************!*\
  !*** ./src/util/socket.util.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocketMethods": () => (/* binding */ SocketMethods)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/esm/index.js");
/* harmony import */ var _socket_message_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../socket/message.events */ "./src/socket/message.events.ts");
/* harmony import */ var _socket_request_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../socket/request.events */ "./src/socket/request.events.ts");
/* harmony import */ var _socket_relation_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../socket/relation.events */ "./src/socket/relation.events.ts");
var _a;




/** This class holds event and callback configuration for Socket events. */
class SocketMethods {
    constructor() { }
}
_a = SocketMethods;
SocketMethods.postRequestEv = "postRequest";
SocketMethods.postRequestRev = "postRequestR";
SocketMethods.patchRequestEv = "patchRequest";
SocketMethods.patchRequestRev = "patchRequestR";
SocketMethods.patchRelationEv = "patchRelation";
SocketMethods.patchRelationRev = "patchRelationR";
SocketMethods.postMessageEv = "postMessage";
SocketMethods.postMessageRev = "postMessageR";
SocketMethods.joinRoomEv = "joinRoom";
SocketMethods.joinRoomsEv = "joinRooms";
SocketMethods.serverErrRev = "serverErrR";
/** This function:
 * - connects the client to the server via socket
 * - instantiates a new client socket class
 * - prepares socket events
 */
SocketMethods.init = () => {
    _a.socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_0__.io)("https://localhost:8000");
    SocketMethods.get();
    SocketMethods.configureSocket(_a.socket);
};
SocketMethods.configureSocket = (soc) => {
    SocketMethods.configConnEv(soc);
    SocketMethods.configRequestEv(soc);
    SocketMethods.configRelationEv(soc);
    SocketMethods.configMessageEv(soc);
    SocketMethods.configErrEv(soc);
};
SocketMethods.configConnEv = (soc) => {
    soc.on("connect", () => {
        console.log(`${_a.socket.id} contected to server`);
    });
};
SocketMethods.configRequestEv = (soc) => {
    soc.on(_a.postRequestRev, _socket_request_events__WEBPACK_IMPORTED_MODULE_2__.RequestEvents.postRequestR);
    soc.on(_a.patchRequestRev, _socket_request_events__WEBPACK_IMPORTED_MODULE_2__.RequestEvents.patchRequestR);
};
SocketMethods.configRelationEv = (soc) => {
    soc.on(_a.patchRelationEv, _socket_relation_events__WEBPACK_IMPORTED_MODULE_3__.RelationEvent.patchRelation);
};
SocketMethods.configMessageEv = (soc) => {
    soc.on(_a.postMessageRev, _socket_message_events__WEBPACK_IMPORTED_MODULE_1__.MessageEvent.postMessageR);
};
SocketMethods.configErrEv = (soc) => {
    soc.on(_a.serverErrRev, (err) => {
        console.error(err);
    });
};
/** This function disconnects client from any connected rooms and server socket connection. */
SocketMethods.destroy = () => {
    _a.socket.disconnect();
    console.log(`${_a.socket.id} user disconnected to server`);
    _a.socket = null;
};
/** This function returns a new or old instance of the class. */
SocketMethods.get = () => {
    if (!_a.instance)
        _a.instance = new SocketMethods();
    return _a.instance;
};



/***/ }),

/***/ "./src/util/validation.util.ts":
/*!*************************************!*\
  !*** ./src/util/validation.util.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Validate": () => (/* binding */ Validate)
/* harmony export */ });
/* harmony import */ var _components_error_comp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/error.comp */ "./src/components/error.comp.ts");
/* harmony import */ var _models_auth_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/auth.model */ "./src/models/auth.model.ts");
/* harmony import */ var _models_peer_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../models/peer.model */ "./src/models/peer.model.ts");
/* harmony import */ var _models_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/user.model */ "./src/models/user.model.ts");
var _a;




/** This class holds a range of input validation methods used throughout the client code. */
class Validate {
    constructor() { }
    // HTTP RESPONSE VALIDATION
    /**
     * This is a special validation function for HTTP Responses from tryCatch()
     * - inspects HTTP responses for signs of error
     * - instructs error component to activate upon hint of error
     *
     * @param { iHttpResponse } res - HTTP Response from tryCatch
     * @param { string } unknownErr - an uncatched server error occured
     * @param { string } knownErr - an catched server error occured
     *
     * @returns { boolean }
     *
     * @static
     */
    static httpRes(res, unknownErr, knownErr) {
        // VALIDATION: HTTP RESPONSE
        if (!res.data) {
            _components_error_comp__WEBPACK_IMPORTED_MODULE_0__.ErrorComponent.showComp(`ERROR: ${unknownErr}`, res.err);
            return false;
        }
        if (res.data.statusCode < 200 || res.data.statusCode >= 400) {
            _components_error_comp__WEBPACK_IMPORTED_MODULE_0__.ErrorComponent.showComp(`ERROR: ${knownErr}`, res.err);
            return false;
        }
        return true;
    }
}
_a = Validate;
Validate.registerForm = (registerInputs) => {
    // USERNAME VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, or SPECIAL characters
    // --- at length of 8-20 characters
    // PASSWORD VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL characters
    // --- at least one UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL character
    // --- at least 8 characters
    // RE-PASSWORD VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL characters
    // --- equals password
    const validity = [
        registerInputs.username.match(_models_auth_model__WEBPACK_IMPORTED_MODULE_1__.username_pattern)
            ? null
            : "Username must contain 8-20 uppercase, lowercase, numeric, or #?!@$%^&* characters",
        registerInputs.password.match(_models_auth_model__WEBPACK_IMPORTED_MODULE_1__.password_pattern)
            ? null
            : "Password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
        registerInputs.rePassword.match(_models_auth_model__WEBPACK_IMPORTED_MODULE_1__.password_pattern)
            ? null
            : "Confirmed password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
        registerInputs.password === registerInputs.rePassword
            ? null
            : "Password & Confirmation password does not match",
    ];
    return _a.setValidity(validity);
};
Validate.loginForm = (loginInputs) => {
    // USERNAME & PASSWORD ARE REQUIRED
    const validity = [
        loginInputs.username.trim().length < 1 ? "Username is require" : null,
        loginInputs.password.trim().length < 1 ? "Password is require" : null,
    ];
    return _a.setValidity(validity);
};
Validate.search = (searchItem, strType) => {
    const { pattern, type, skip } = searchItem;
    const validity = [
        typeof pattern === "string" ? null : "Search Pattern must be astring",
        type === 0 || type === 1
            ? null
            : `Search String Types can only be either 1 or 1`,
        strType === "user" || strType === "group"
            ? null
            : `Search Type can only be either ${_models_peer_model__WEBPACK_IMPORTED_MODULE_2__.chatType.user} or ${_models_peer_model__WEBPACK_IMPORTED_MODULE_2__.chatType.group}`,
        typeof skip === "number" ? null : `Search Skip must be a number`,
    ];
    return _a.setValidity(validity);
};
Validate.changePasswordForm = (rePasswordInputs) => {
    // PASSWORD VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL characters
    // --- at least one UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL character
    // --- at least 8 characters
    // RE-PASSWORD VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL characters
    // --- equals password
    const validity = [
        rePasswordInputs.password.match(_models_auth_model__WEBPACK_IMPORTED_MODULE_1__.password_pattern)
            ? null
            : "Password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
        rePasswordInputs.rePassword.match(_models_auth_model__WEBPACK_IMPORTED_MODULE_1__.password_pattern)
            ? null
            : "Confirmed password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
        rePasswordInputs.password === rePasswordInputs.rePassword
            ? null
            : "Password & Confirmation password does not match",
    ];
    return _a.setValidity(validity);
};
Validate.relationAction = (relationAct) => {
    const validity = [
        typeof relationAct.recipientId === "string" &&
            relationAct.recipientId.length > 0
            ? null
            : "Recipient id is required",
        relationAct.userAction === _models_peer_model__WEBPACK_IMPORTED_MODULE_2__.contactAct.block ||
            relationAct.userAction === _models_peer_model__WEBPACK_IMPORTED_MODULE_2__.contactAct.mute ||
            relationAct.userAction === _models_peer_model__WEBPACK_IMPORTED_MODULE_2__.contactAct.archive
            ? null
            : `Relation action must only be ${_models_peer_model__WEBPACK_IMPORTED_MODULE_2__.contactAct.archive}, ${_models_peer_model__WEBPACK_IMPORTED_MODULE_2__.contactAct.mute}, or${_models_peer_model__WEBPACK_IMPORTED_MODULE_2__.contactAct.block}`,
        typeof relationAct.actionValue === "boolean"
            ? null
            : "Relation action value must only be a boolean data type",
    ];
    return _a.setValidity(validity);
};
Validate.requestDel = (id, type) => {
    const validity = [
        typeof id === "string" && id.length > 0
            ? null
            : "Request item id is invalid",
        type === 0 || type === 1 ? null : "Request Type is invalid",
    ];
    return _a.setValidity(validity);
};
Validate.requestBody = (reqBody) => {
    const { type, recipientId, groupId } = reqBody;
    let validity = [
        type === 1 || type === 2 || type === 3
            ? null
            : "Request type can only be 1, 2, or 3",
    ];
    if (type !== 2) {
        validity.push(typeof recipientId === "string" && recipientId.length > 0
            ? null
            : "Group to User Request required Recipient ID");
    }
    else {
        validity.push(!recipientId ? null : "User to Group request must not have Recipient ID");
    }
    if (type !== 1) {
        validity.push(typeof groupId === "string" && groupId.length > 0
            ? null
            : "User to Group Request required Group ID");
    }
    else {
        validity.push(!groupId ? null : "User to User request must not have group ID");
    }
    // UPDATE: TRANSITION ABANDONED
    // REASON: !"" IS a truthy value, meaning, "" is falsy
    // TRANSITION TO CODE BELOW UPON FURTHER TESTING
    // if (type !== 2) {
    //   validity.push(
    //     typeof recipientId === "string" && recipientId.length > 0
    //       ? null
    //       : "Group to User Request required Recipient ID"
    //   );
    // } else {
    //   validity.push(
    //     typeof recipientId === "string" && recipientId.length === 0
    //       ? null
    //       : "User to Group request must not have Recipient ID"
    //   );
    // }
    // if (type !== 1) {
    //   validity.push(
    //     typeof groupId === "string" && groupId.length > 0
    //       ? null
    //       : "User to Group Request required Group ID"
    //   );
    // } else {
    //   validity.push(
    //     typeof groupId === "string" && groupId.length === 0
    //       ? null
    //       : "User to User request must not have group ID"
    //   );
    // }
    return _a.setValidity(validity);
};
Validate.requestItem = (item, wrapper, type) => {
    const validity = [
        typeof item.accnt_id === "string" && item.accnt_id.length > 0
            ? null
            : "Request item ID accnt_id is invalid",
        typeof item.accnt_name === "string" && item.accnt_name.length > 0
            ? null
            : "Request item accnt_name is invalid",
        typeof item.isGroup === "boolean" ? null : "Request item type is invalid",
        item.status === "approved" ||
            item.status === "cancelled" ||
            item.status === "pending" ||
            item.status === "rejected"
            ? null
            : `Request item status can only be 'approved', 'canccelled', or 'rejected'`,
        wrapper instanceof HTMLDivElement
            ? null
            : "Wrapper must be an HTMLEDivlement",
        type === "incoming" || type === "outgoing"
            ? null
            : `Request type can only be 'incoming' or 'outgoing'`,
    ];
    return _a.setValidity(validity);
};
Validate.muteBlockItem = (item, wrapper, type) => {
    // 0 (mute) 1 (block)
    const { accnt_id, accnt_name } = item;
    const validity = [
        typeof accnt_id === "string" && accnt_id.length > 0
            ? null
            : `${type === 0 ? "Mute" : "Block"}  item requires user ID`,
        wrapper instanceof HTMLDivElement
            ? null
            : "Wrapper must be an HTMLDivElement",
        typeof accnt_name === "string" && accnt_name.length > 0
            ? null
            : `${type === 0 ? "Mute" : "Block"}  item requires user ID`,
    ];
    return _a.setValidity(validity);
};
Validate.patchRequestData = (patchRequest, action) => {
    const { type, recipientId, groupId } = patchRequest;
    const validity = [
        action === _models_user_model__WEBPACK_IMPORTED_MODULE_3__.requestActions.approve ||
            action === _models_user_model__WEBPACK_IMPORTED_MODULE_3__.requestActions.reject ||
            action === _models_user_model__WEBPACK_IMPORTED_MODULE_3__.requestActions.cancel
            ? null
            : `Request action must only be ${_models_user_model__WEBPACK_IMPORTED_MODULE_3__.requestActions.approve},${_models_user_model__WEBPACK_IMPORTED_MODULE_3__.requestActions.reject}, or ${_models_user_model__WEBPACK_IMPORTED_MODULE_3__.requestActions.cancel}`,
    ];
    if (type === 1 || type === 2 || type === 3) {
        if (type !== 2) {
            validity.push(typeof recipientId === "string" && recipientId.length > 0
                ? null
                : `Type: ${type} action requires Recipient ID`);
        }
        else {
            validity.push(!recipientId ? null : `Type: ${type} action requires no Recipient ID`);
        }
        if (type !== 1) {
            validity.push(typeof groupId === "string" && groupId.length > 0
                ? null
                : `Type: ${type} action requires Group ID`);
        }
        else {
            validity.push(!groupId ? null : `Type: ${type} action requires no Group ID`);
        }
    }
    else {
        validity.push("Action Type can only be 1, 2, or 3");
    }
    return _a.setValidity(validity);
};
Validate.approveData = (data) => {
    const validity = [
        data.newStatus === "approved" ? null : "Status data is invalid",
    ];
    return _a.setValidity(validity);
};
Validate.privacyData = (privacyData, prop) => {
    const validity = [
        privacyData.property === prop ? null : `Privacy property must be ${prop}`,
        privacyData.value === "true" || privacyData.value === "false"
            ? null
            : "Privacy property value must be a stringified boolean",
    ];
    return _a.setValidity(validity);
};
Validate.searchItem = (item) => {
    const validity = [
        typeof item.accnt_id === "string" && item.accnt_id.length > 0
            ? null
            : "Account ID is required for a search item",
        typeof item.act_name === "string" && item.act_name.length > 0
            ? null
            : "Account Name is required for a search item",
        typeof item.availability === "boolean"
            ? null
            : "Account Name is required for a search item",
    ];
    return _a.setValidity(validity);
};
Validate.contactItem = (item) => {
    const validity = [
        typeof item.accnt_id === "string" && item.accnt_id.length > 0
            ? null
            : "Account ID is required for a search item",
        typeof item.accnt_name === "string" && item.accnt_name.length > 0
            ? null
            : "Account Name is required for a search item",
        item.type === _models_peer_model__WEBPACK_IMPORTED_MODULE_2__.chatType.user || item.type === _models_peer_model__WEBPACK_IMPORTED_MODULE_2__.chatType.group
            ? null
            : `Account Type must be either ${_models_peer_model__WEBPACK_IMPORTED_MODULE_2__.chatType.user} or ${_models_peer_model__WEBPACK_IMPORTED_MODULE_2__.chatType.group}`,
        typeof item.chat_id === "string" && item.chat_id.length > 0
            ? null
            : "Account Chat ID is invalid",
        typeof item.admin === "boolean"
            ? null
            : "Account Admin Property is invalid",
        typeof item.archive === "boolean"
            ? null
            : "Account Archive Property is invalid",
        typeof item.mute === "boolean"
            ? null
            : "Account Mute Property is invalid",
        typeof item.block === "boolean"
            ? null
            : "Account Block Property is invalid",
        typeof item.bump === "number" ? null : "Account Bump Property is invalid",
    ];
    return _a.setValidity(validity);
};
Validate.newGroupInput = (grpBody) => {
    const { recipientId, grpName } = grpBody;
    const validity = [
        typeof recipientId === "string" && recipientId.length > 0
            ? null
            : "Recipient ID is required",
        typeof grpName === "string" && grpName.length > 0
            ? null
            : "Group name is required",
    ];
    return _a.setValidity(validity);
};
Validate.setValidity = (validity) => {
    if (validity.join("")) {
        return { isValid: false, error: validity.filter((err) => err !== null) };
    }
    else {
        return { isValid: true, error: null };
    }
};
/**
 * This function returns a new or old instance of this function.
 *
 * @returns { Validate }
 */
Validate.getInstance = () => {
    if (!_a.instance)
        _a.instance = new Validate();
    return _a.instance;
};



/***/ }),

/***/ "./node_modules/@socket.io/component-emitter/index.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/@socket.io/component-emitter/index.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Emitter": () => (/* binding */ Emitter)
/* harmony export */ });
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/contrib/has-cors.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/has-cors.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasCORS": () => (/* binding */ hasCORS)
/* harmony export */ });
// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest();
}
catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
}
const hasCORS = value;


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js":
/*!********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseqs.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
    let str = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (str.length)
                str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for (let i = 0, l = pairs.length; i < l; i++) {
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseuri.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse)
/* harmony export */ });
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];
function parse(str) {
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while (i--) {
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/contrib/yeast.js":
/*!******************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/yeast.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode),
/* harmony export */   "yeast": () => (/* binding */ yeast)
/* harmony export */ });
// imported from https://github.com/unshiftio/yeast

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''), length = 64, map = {};
let seed = 0, i = 0, prev;
/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
    let encoded = '';
    do {
        encoded = alphabet[num % length] + encoded;
        num = Math.floor(num / length);
    } while (num > 0);
    return encoded;
}
/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
    let decoded = 0;
    for (i = 0; i < str.length; i++) {
        decoded = decoded * length + map[str.charAt(i)];
    }
    return decoded;
}
/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
    const now = encode(+new Date());
    if (now !== prev)
        return seed = 0, prev = now;
    return now + '.' + encode(seed++);
}
//
// Map each character to its index.
//
for (; i < length; i++)
    map[alphabet[i]] = i;


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/globalThis.browser.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/globalThis.browser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "globalThisShim": () => (/* binding */ globalThisShim)
/* harmony export */ });
const globalThisShim = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket),
/* harmony export */   "Transport": () => (/* reexport safe */ _transport_js__WEBPACK_IMPORTED_MODULE_1__.Transport),
/* harmony export */   "installTimerFunctions": () => (/* reexport safe */ _util_js__WEBPACK_IMPORTED_MODULE_3__.installTimerFunctions),
/* harmony export */   "nextTick": () => (/* reexport safe */ _transports_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_5__.nextTick),
/* harmony export */   "parse": () => (/* reexport safe */ _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__.parse),
/* harmony export */   "protocol": () => (/* binding */ protocol),
/* harmony export */   "transports": () => (/* reexport safe */ _transports_index_js__WEBPACK_IMPORTED_MODULE_2__.transports)
/* harmony export */ });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ "./node_modules/engine.io-client/build/esm/socket.js");
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/esm/transports/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/parseuri.js */ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js");
/* harmony import */ var _transports_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transports/websocket-constructor.js */ "./node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js");


const protocol = _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket.protocol;







/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/socket.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/esm/transports/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contrib/parseqs.js */ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js");
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseuri.js */ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.mjs");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");






class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__.Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    constructor(uri, opts = {}) {
        super();
        this.writeBuffer = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            uri = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
                opts.query = uri.query;
        }
        else if (opts.host) {
            opts.hostname = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(opts.host).host;
        }
        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.installTimerFunctions)(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = opts.transports || [
            "polling",
            "websocket",
            "webtransport",
        ];
        this.writeBuffer = [];
        this.prevBufferLen = 0;
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024,
            },
            transportOptions: {},
            closeOnBeforeunload: false,
        }, opts);
        this.opts.path =
            this.opts.path.replace(/\/$/, "") +
                (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") {
            this.opts.query = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__.decode)(this.opts.query);
        }
        // set on handshake
        this.id = null;
        this.upgrades = null;
        this.pingInterval = null;
        this.pingTimeout = null;
        // set on heartbeat
        this.pingTimeoutTimer = null;
        if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this.beforeunloadEventListener = () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this.beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this.offlineEventListener = () => {
                    this.onClose("transport close", {
                        description: "network connection lost",
                    });
                };
                addEventListener("offline", this.offlineEventListener, false);
            }
        }
        this.open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port,
        }, this.opts.transportOptions[name]);
        return new _transports_index_js__WEBPACK_IMPORTED_MODULE_0__.transports[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    open() {
        let transport;
        if (this.opts.rememberUpgrade &&
            Socket.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
        }
        else if (0 === this.transports.length) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        else {
            transport = this.transports[0];
        }
        this.readyState = "opening";
        // Retry with the next transport if the transport is disabled (jsonp: false)
        try {
            transport = this.createTransport(transport);
        }
        catch (e) {
            this.transports.shift();
            this.open();
            return;
        }
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this.onDrain.bind(this))
            .on("packet", this.onPacket.bind(this))
            .on("error", this.onError.bind(this))
            .on("close", (reason) => this.onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        Socket.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", (msg) => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    Socket.priorWebsocketSuccess = "websocket" === transport.name;
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err) => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        if (this.upgrades.indexOf("webtransport") !== -1 &&
            name !== "webtransport") {
            // favor WebTransport
            this.setTimeoutFn(() => {
                if (!failed) {
                    transport.open();
                }
            }, 200);
        }
        else {
            transport.open();
        }
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
        this.readyState = "open";
        Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
        // we check for `readyState` in case an `open`
        // listener already closed the socket
        if ("open" === this.readyState && this.opts.upgrade) {
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
                this.probe(this.upgrades[i]);
            }
        }
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this.resetPingTimeout();
                    this.sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this.onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this.upgrades = this.filterUpgrades(data.upgrades);
        this.pingInterval = data.pingInterval;
        this.pingTimeout = data.pingTimeout;
        this.maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this.resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    resetPingTimeout() {
        this.clearTimeoutFn(this.pingTimeoutTimer);
        this.pingTimeoutTimer = this.setTimeoutFn(() => {
            this.onClose("ping timeout");
        }, this.pingInterval + this.pingTimeout);
        if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    onDrain() {
        this.writeBuffer.splice(0, this.prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this.prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            const packets = this.getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this.prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    getWritablePackets() {
        const shouldCheckPayloadSize = this.maxPayload &&
            this.transport.name === "polling" &&
            this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for (let i = 0; i < this.writeBuffer.length; i++) {
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.byteLength)(data);
            }
            if (i > 0 && payloadSize > this.maxPayload) {
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    send(msg, options, fn) {
        this.sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options,
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
        const close = () => {
            this.onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    onError(err) {
        Socket.priorWebsocketSuccess = false;
        this.emitReserved("error", err);
        this.onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    onClose(reason, description) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this.pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
                removeEventListener("beforeunload", this.beforeunloadEventListener, false);
                removeEventListener("offline", this.offlineEventListener, false);
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this.prevBufferLen = 0;
        }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        let i = 0;
        const j = upgrades.length;
        for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
Socket.protocol = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transport.js":
/*!**************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transport.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transport": () => (/* binding */ Transport)
/* harmony export */ });
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.mjs");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseqs.js */ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js");




class TransportError extends Error {
    constructor(reason, description, context) {
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
        super();
        this.writable = false;
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */
    open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */
    close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
        if (this.readyState === "open") {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
        }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
        const packet = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_0__.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) { }
    createUri(schema, query = {}) {
        return (schema +
            "://" +
            this._hostname() +
            this._port() +
            this.opts.path +
            this._query(query));
    }
    _hostname() {
        const hostname = this.opts.hostname;
        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
        if (this.opts.port &&
            ((this.opts.secure && Number(this.opts.port !== 443)) ||
                (!this.opts.secure && Number(this.opts.port) !== 80))) {
            return ":" + this.opts.port;
        }
        else {
            return "";
        }
    }
    _query(query) {
        const encodedQuery = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__.encode)(query);
        return encodedQuery.length ? "?" + encodedQuery : "";
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "transports": () => (/* binding */ transports)
/* harmony export */ });
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling.js */ "./node_modules/engine.io-client/build/esm/transports/polling.js");
/* harmony import */ var _websocket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket.js */ "./node_modules/engine.io-client/build/esm/transports/websocket.js");
/* harmony import */ var _webtransport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webtransport.js */ "./node_modules/engine.io-client/build/esm/transports/webtransport.js");



const transports = {
    websocket: _websocket_js__WEBPACK_IMPORTED_MODULE_1__.WS,
    webtransport: _webtransport_js__WEBPACK_IMPORTED_MODULE_2__.WT,
    polling: _polling_js__WEBPACK_IMPORTED_MODULE_0__.Polling,
};


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/polling.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Polling": () => (/* binding */ Polling),
/* harmony export */   "Request": () => (/* binding */ Request)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contrib/yeast.js */ "./node_modules/engine.io-client/build/esm/contrib/yeast.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./xmlhttprequest.js */ "./node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.mjs");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/esm/globalThis.browser.js");







function empty() { }
const hasXHR2 = (function () {
    const xhr = new _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__.XHR({
        xdomain: false,
    });
    return null != xhr.responseType;
})();
class Polling extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
        super(opts);
        this.polling = false;
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
        }
        /**
         * XHR supports binary
         */
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
        if (this.opts.withCredentials) {
            this.cookieJar = (0,_xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__.createCookieJar)();
        }
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
        this.poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            this.readyState = "paused";
            onPause();
        };
        if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
                total++;
                this.once("pollComplete", function () {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function () {
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    poll() {
        this.polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
        const callback = (packet) => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({ description: "transport closed by the server" });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this.poll();
            }
            else {
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
        const close = () => {
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
        this.writable = false;
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePayload)(packets, (data) => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "https" : "http";
        const query = this.query || {};
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0,_contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__.yeast)();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
    /**
     * Creates a request.
     *
     * @param {String} method
     * @private
     */
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd, cookieJar: this.cookieJar }, this.opts);
        return new Request(this.uri(), opts);
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data,
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__.Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(uri, opts) {
        super();
        (0,_util_js__WEBPACK_IMPORTED_MODULE_5__.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.method = opts.method || "GET";
        this.uri = uri;
        this.data = undefined !== opts.data ? opts.data : null;
        this.create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    create() {
        var _a;
        const opts = (0,_util_js__WEBPACK_IMPORTED_MODULE_5__.pick)(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this.opts.xd;
        const xhr = (this.xhr = new _xmlhttprequest_js__WEBPACK_IMPORTED_MODULE_3__.XHR(opts));
        try {
            xhr.open(this.method, this.uri, true);
            try {
                if (this.opts.extraHeaders) {
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this.opts.extraHeaders) {
                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this.method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
                xhr.timeout = this.opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                var _a;
                if (xhr.readyState === 3) {
                    (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(xhr);
                }
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this.onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this.data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this.onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    onError(err) {
        this.emitReserved("error", err, this.xhr);
        this.cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    cleanup(fromError) {
        if ("undefined" === typeof this.xhr || null === this.xhr) {
            return;
        }
        this.xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this.xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this.index];
        }
        this.xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    onLoad() {
        const data = this.xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this.cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
        this.cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in _globalThis_js__WEBPACK_IMPORTED_MODULE_6__.globalThisShim ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebSocket": () => (/* binding */ WebSocket),
/* harmony export */   "defaultBinaryType": () => (/* binding */ defaultBinaryType),
/* harmony export */   "nextTick": () => (/* binding */ nextTick),
/* harmony export */   "usingBrowserWebSocket": () => (/* binding */ usingBrowserWebSocket)
/* harmony export */ });
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/esm/globalThis.browser.js");

const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return (cb) => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
const WebSocket = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.WebSocket || _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.MozWebSocket;
const usingBrowserWebSocket = true;
const defaultBinaryType = "arraybuffer";


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/websocket.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/websocket.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WS": () => (/* binding */ WS)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contrib/yeast.js */ "./node_modules/engine.io-client/build/esm/contrib/yeast.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./websocket-constructor.js */ "./node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");





// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class WS extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    /**
     * WebSocket transport constructor.
     *
     * @param {Object} opts - connection options
     * @protected
     */
    constructor(opts) {
        super(opts);
        this.supportsBinary = !opts.forceBase64;
    }
    get name() {
        return "websocket";
    }
    doOpen() {
        if (!this.check()) {
            // let probe timeout
            return;
        }
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws =
                _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.usingBrowserWebSocket && !isReactNative
                    ? protocols
                        ? new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket(uri, protocols)
                        : new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket(uri)
                    : new _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType || _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.defaultBinaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = (closeEvent) => this.onClose({
            description: "websocket connection closed",
            context: closeEvent,
        });
        this.ws.onmessage = (ev) => this.onData(ev.data);
        this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_4__.encodePacket)(packet, this.supportsBinary, (data) => {
                // always create a new object (GH-437)
                const opts = {};
                if (!_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.usingBrowserWebSocket) {
                    if (packet.options) {
                        opts.compress = packet.options.compress;
                    }
                    if (this.opts.perMessageDeflate) {
                        const len = 
                        // @ts-ignore
                        "string" === typeof data ? Buffer.byteLength(data) : data.length;
                        if (len < this.opts.perMessageDeflate.threshold) {
                            opts.compress = false;
                        }
                    }
                }
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    if (_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.usingBrowserWebSocket) {
                        // TypeError is thrown when passing the second argument on Safari
                        this.ws.send(data);
                    }
                    else {
                        this.ws.send(data, opts);
                    }
                }
                catch (e) {
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0,_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "wss" : "ws";
        const query = this.query || {};
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0,_contrib_yeast_js__WEBPACK_IMPORTED_MODULE_1__.yeast)();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
    /**
     * Feature detection for WebSocket.
     *
     * @return {Boolean} whether this transport is available.
     * @private
     */
    check() {
        return !!_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_3__.WebSocket;
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/webtransport.js":
/*!****************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/webtransport.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WT": () => (/* binding */ WT)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _websocket_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket-constructor.js */ "./node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");



function shouldIncludeBinaryHeader(packet, encoded) {
    // 48 === "0".charCodeAt(0) (OPEN packet type)
    // 54 === "6".charCodeAt(0) (NOOP packet type)
    return (packet.type === "message" &&
        typeof packet.data !== "string" &&
        encoded[0] >= 48 &&
        encoded[0] <= 54);
}
class WT extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    get name() {
        return "webtransport";
    }
    doOpen() {
        // @ts-ignore
        if (typeof WebTransport !== "function") {
            return;
        }
        // @ts-ignore
        this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        this.transport.closed
            .then(() => {
            this.onClose();
        })
            .catch((err) => {
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this.transport.ready.then(() => {
            this.transport.createBidirectionalStream().then((stream) => {
                const reader = stream.readable.getReader();
                this.writer = stream.writable.getWriter();
                let binaryFlag;
                const read = () => {
                    reader
                        .read()
                        .then(({ done, value }) => {
                        if (done) {
                            return;
                        }
                        if (!binaryFlag && value.byteLength === 1 && value[0] === 54) {
                            binaryFlag = true;
                        }
                        else {
                            // TODO expose binarytype
                            this.onPacket((0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.decodePacketFromBinary)(value, binaryFlag, "arraybuffer"));
                            binaryFlag = false;
                        }
                        read();
                    })
                        .catch((err) => {
                    });
                };
                read();
                const handshake = this.query.sid ? `0{"sid":"${this.query.sid}"}` : "0";
                this.writer
                    .write(new TextEncoder().encode(handshake))
                    .then(() => this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePacketToBinary)(packet, (data) => {
                if (shouldIncludeBinaryHeader(packet, data)) {
                    this.writer.write(Uint8Array.of(54));
                }
                this.writer.write(data).then(() => {
                    if (lastPacket) {
                        (0,_websocket_constructor_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
                            this.writable = true;
                            this.emitReserved("drain");
                        }, this.setTimeoutFn);
                    }
                });
            });
        }
    }
    doClose() {
        var _a;
        (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XHR": () => (/* binding */ XHR),
/* harmony export */   "createCookieJar": () => (/* binding */ createCookieJar)
/* harmony export */ });
/* harmony import */ var _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../contrib/has-cors.js */ "./node_modules/engine.io-client/build/esm/contrib/has-cors.js");
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globalThis.js */ "./node_modules/engine.io-client/build/esm/globalThis.browser.js");
// browser shim for xmlhttprequest module


function XHR(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_0__.hasCORS)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new _globalThis_js__WEBPACK_IMPORTED_MODULE_1__.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}
function createCookieJar() { }


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/util.js":
/*!*********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/util.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "byteLength": () => (/* binding */ byteLength),
/* harmony export */   "installTimerFunctions": () => (/* binding */ installTimerFunctions),
/* harmony export */   "pick": () => (/* binding */ pick)
/* harmony export */ });
/* harmony import */ var _globalThis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globalThis.js */ "./node_modules/engine.io-client/build/esm/globalThis.browser.js");

function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    }
    else {
        obj.setTimeoutFn = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
        obj.clearTimeoutFn = _globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout.bind(_globalThis_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}


/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/commons.js":
/*!************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/commons.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ERROR_PACKET": () => (/* binding */ ERROR_PACKET),
/* harmony export */   "PACKET_TYPES": () => (/* binding */ PACKET_TYPES),
/* harmony export */   "PACKET_TYPES_REVERSE": () => (/* binding */ PACKET_TYPES_REVERSE)
/* harmony export */ });
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach(key => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };



/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decode": () => (/* binding */ decode),
/* harmony export */   "encode": () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
const encode = (arraybuffer) => {
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
const decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};


/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/decodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/decodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodePacket": () => (/* binding */ decodePacket)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");
/* harmony import */ var _contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contrib/base64-arraybuffer.js */ "./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js");


const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
        };
    }
    const packetType = _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return _commons_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1)
        }
        : {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type]
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = (0,_contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__.decode)(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            if (data instanceof Blob) {
                // from WebSocket + binaryType "blob"
                return data;
            }
            else {
                // from HTTP long-polling or WebTransport
                return new Blob([data]);
            }
        case "arraybuffer":
        default:
            if (data instanceof ArrayBuffer) {
                // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
                return data;
            }
            else {
                // from WebTransport (Uint8Array)
                return data.buffer;
            }
    }
};


/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/encodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/encodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "encodePacket": () => (/* binding */ encodePacket),
/* harmony export */   "encodePacketToBinary": () => (/* binding */ encodePacketToBinary)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");

const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = obj => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(_commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};
function toArray(data) {
    if (data instanceof Uint8Array) {
        return data;
    }
    else if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    }
    else {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
    if (withNativeBlob && packet.data instanceof Blob) {
        return packet.data
            .arrayBuffer()
            .then(toArray)
            .then(callback);
    }
    else if (withNativeArrayBuffer &&
        (packet.data instanceof ArrayBuffer || isView(packet.data))) {
        return callback(toArray(packet.data));
    }
    encodePacket(packet, false, encoded => {
        if (!TEXT_ENCODER) {
            TEXT_ENCODER = new TextEncoder();
        }
        callback(TEXT_ENCODER.encode(encoded));
    });
}



/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "decodePacket": () => (/* reexport safe */ _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket),
/* harmony export */   "decodePacketFromBinary": () => (/* binding */ decodePacketFromBinary),
/* harmony export */   "decodePayload": () => (/* binding */ decodePayload),
/* harmony export */   "encodePacket": () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket),
/* harmony export */   "encodePacketToBinary": () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacketToBinary),
/* harmony export */   "encodePayload": () => (/* binding */ encodePayload),
/* harmony export */   "protocol": () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encodePacket.js */ "./node_modules/engine.io-parser/build/esm/encodePacket.browser.js");
/* harmony import */ var _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decodePacket.js */ "./node_modules/engine.io-parser/build/esm/decodePacket.browser.js");


const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket)(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
let TEXT_DECODER;
function decodePacketFromBinary(data, isBinary, binaryType) {
    if (!TEXT_DECODER) {
        // lazily created for compatibility with old browser platforms
        TEXT_DECODER = new TextDecoder();
    }
    // 48 === "0".charCodeAt(0) (OPEN packet type)
    // 54 === "6".charCodeAt(0) (NOOP packet type)
    const isPlainBinary = isBinary || data[0] < 48 || data[0] > 54;
    return (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(isPlainBinary ? data : TEXT_DECODER.decode(data), binaryType);
}
const protocol = 4;



/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/contrib/backo2.js":
/*!*******************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/contrib/backo2.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Backoff": () => (/* binding */ Backoff)
/* harmony export */ });
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* reexport safe */ _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager),
/* harmony export */   "Socket": () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket),
/* harmony export */   "connect": () => (/* binding */ lookup),
/* harmony export */   "default": () => (/* binding */ lookup),
/* harmony export */   "io": () => (/* binding */ lookup),
/* harmony export */   "protocol": () => (/* reexport safe */ socket_io_parser__WEBPACK_IMPORTED_MODULE_3__.protocol)
/* harmony export */ });
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url.js */ "./node_modules/socket.io-client/build/esm/url.js");
/* harmony import */ var _manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manager.js */ "./node_modules/socket.io-client/build/esm/manager.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/esm/socket.js");
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm/index.js");



/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0,_url_js__WEBPACK_IMPORTED_MODULE_0__.url)(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        io = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            cache[id] = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager,
    Socket: _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket,
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */



/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/manager.js":
/*!************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/manager.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Manager": () => (/* binding */ Manager)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/esm/socket.js");
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm/index.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/esm/on.js");
/* harmony import */ var _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/backo2.js */ "./node_modules/socket.io-client/build/esm/contrib/backo2.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.mjs");






class Manager extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__.Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.installTimerFunctions)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__.Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || socket_io_parser__WEBPACK_IMPORTED_MODULE_2__;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new engine_io_client__WEBPACK_IMPORTED_MODULE_0__.Socket(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        const onError = (err) => {
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                this.maybeReconnectOnOpen();
            }
        };
        // emit `error`
        const errorSub = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            // set timer
            const timer = this.setTimeoutFn(() => {
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "ping", this.onping.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "data", this.ondata.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", this.onerror.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "close", this.onclose.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        try {
            this.decoder.add(data);
        }
        catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new _socket_js__WEBPACK_IMPORTED_MODULE_1__.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
        if (this.engine)
            this.engine.close();
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called upon engine close.
     *
     * @private
     */
    onclose(reason, description) {
        this.cleanup();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "on": () => (/* binding */ on)
/* harmony export */ });
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/socket.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Socket": () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm/index.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/esm/on.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.mjs");



/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__.Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */
        this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */
        this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */
        this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */
        this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */
        this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */
        this._queueSeq = 0;
        this.ids = 0;
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "open", this.onopen.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "packet", this.onpacket.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "error", this.onerror.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
        if (discardPacket) {
        }
        else if (this.connected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        this.acks[id] = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, [null, ...args]);
        };
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
        // the timeout flag is optional
        const withErr = this.flags.timeout !== undefined || this._opts.ackTimeout !== undefined;
        return new Promise((resolve, reject) => {
            args.push((arg1, arg2) => {
                if (withErr) {
                    return arg1 ? reject(arg1) : resolve(arg2);
                }
                else {
                    return resolve(arg1);
                }
            });
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({ fromQueue: true }, this.flags),
        };
        args.push((err, ...responseArgs) => {
            if (packet !== this._queue[0]) {
                // the packet has already been acknowledged
                return;
            }
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            }
            else {
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this._sendConnectPacket(data);
            });
        }
        else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
        this.packet({
            type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT,
            data: this._pid
                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data)
                : data,
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT:
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK:
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            self.packet({
                type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowlegement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if ("function" === typeof ack) {
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
        }
        else {
        }
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
        if (this.connected) {
            this.packet({ type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/url.js":
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/url.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "url": () => (/* binding */ url)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.parse)(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/esm/binary.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/binary.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deconstructPacket": () => (/* binding */ deconstructPacket),
/* harmony export */   "reconstructPacket": () => (/* binding */ reconstructPacket)
/* harmony export */ });
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/esm/is-binary.js");

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_0__.isBinary)(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" &&
            data.num >= 0 &&
            data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        }
        else {
            throw new Error("illegal attachments");
        }
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Decoder": () => (/* binding */ Decoder),
/* harmony export */   "Encoder": () => (/* binding */ Encoder),
/* harmony export */   "PacketType": () => (/* binding */ PacketType),
/* harmony export */   "protocol": () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/index.mjs");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ "./node_modules/socket.io-parser/build/esm/binary.js");
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/esm/is-binary.js");



/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener", // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.hasBinary)(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id,
                });
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.deconstructPacket)(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__.Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
        super();
        this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.isBinary)(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        }
        catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return isObject(payload);
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || isObject(payload);
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return (Array.isArray(payload) &&
                    (typeof payload[0] === "number" ||
                        (typeof payload[0] === "string" &&
                            RESERVED_EVENTS.indexOf(payload[0]) === -1)));
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.reconstructPacket)(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/esm/is-binary.js":
/*!**************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/is-binary.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasBinary": () => (/* binding */ hasBinary),
/* harmony export */   "isBinary": () => (/* binding */ isBinary)
/* harmony export */ });
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_gen_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/gen.util */ "./src/util/gen.util.ts");
/* harmony import */ var _components_auth_comp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/auth.comp */ "./src/components/auth.comp.ts");
/* harmony import */ var _components_chat_comp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/chat.comp */ "./src/components/chat.comp.ts");
/* harmony import */ var _components_error_comp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/error.comp */ "./src/components/error.comp.ts");




_components_auth_comp__WEBPACK_IMPORTED_MODULE_1__.AuthComponent.getInstance();
_components_chat_comp__WEBPACK_IMPORTED_MODULE_2__.ChatComponent.getInstance();
_components_error_comp__WEBPACK_IMPORTED_MODULE_3__.ErrorComponent.getInstance();
window.addEventListener("load", _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.logUser);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsTUFBTTtBQUNsQyxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxNQUFNO0FBQ3hDLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxNQUFNO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxNQUFNO0FBQ3pDLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDYTtBQUNBO0FBQ0U7QUFFekQsNEVBQXlCLEVBQUUsQ0FBQztBQUM1Qiw0RUFBeUIsRUFBRSxDQUFDO0FBQzVCLDhFQUEwQixFQUFFLENBQUM7QUFFN0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSwyREFBZSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9hcHAuY29tcC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9hdXRoLmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvYmFzZS5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9jb21wb25lbnRzL2NoYXQuY29tcC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9lcnJvci5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9jb21wb25lbnRzL2dyb3VwLmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvbXNncy5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9jb21wb25lbnRzL21zZ3NMaXN0LmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvbXNnc09wdHMuY29tcC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9wZWVyLmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvdXNlci5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9ob29rcy9yZXF1ZXN0cy5ob29rLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9tb2RlbHMvYXV0aC5tb2RlbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvbW9kZWxzL3BlZXIubW9kZWwudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL21vZGVscy91c2VyLm1vZGVsLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9zb2NrZXQvbWVzc2FnZS5ldmVudHMudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL3NvY2tldC9yZWxhdGlvbi5ldmVudHMudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL3NvY2tldC9yZXF1ZXN0LmV2ZW50cy50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC9hc3luY1dyYXAudXRpbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC9nZW4udXRpbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC9zb2NrZXQudXRpbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC92YWxpZGF0aW9uLnV0aWwudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0Bzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXIvaW5kZXgubWpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL2hhcy1jb3JzLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3BhcnNlcXMuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvcGFyc2V1cmkuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIveWVhc3QuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbFRoaXMuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3NvY2tldC5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LWNvbnN0cnVjdG9yLmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy94bWxodHRwcmVxdWVzdC5icm93c2VyLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS91dGlsLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb21tb25zLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb250cmliL2Jhc2U2NC1hcnJheWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZGVjb2RlUGFja2V0LmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2VuY29kZVBhY2tldC5icm93c2VyLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9iYWNrbzIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9vbi5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS91cmwuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2lzLWJpbmFyeS5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhDb21wb25lbnQgfSBmcm9tIFwiLi9hdXRoLmNvbXBcIjtcclxuXHJcbi8qKlxyXG4gKiBDb250cm9scyB2aWV3YWJpbGl0eSBvZiB0aGUgY2hhdCBjb21wb25lbnQgYW5kIHRoZSBhdXRoIGNvbW1wb25lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBBcHBDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0QXBwITogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYXNzIGRlZmluZXMgbWFpbiBjaGF0IGRpdiBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jaGF0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGF0LWFwcFwiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tIENMQVNTIFVUSUxJVFkgLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIG1vdmUgdGhlIGF1dGggY29tcG9uZW50IGFzaWRlIGFuZCBzaG93IHRoZSBjaGF0IGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhcHBVc2VyKCkge1xyXG4gICAgdGhpcy5jaGF0QXBwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWFwcC11c2VyLXN0YXRlXCIpO1xyXG4gICAgQXV0aENvbXBvbmVudC5oaWRlQ29tcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIG1vdmUgdGhlIGNoYXQgY29tcG9uZW50IGFzaWRlIGFuZCBzaG93IHRoZSBhdXRoIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhcHBBdXRoKCkge1xyXG4gICAgQXV0aENvbXBvbmVudC5zaG93Q29tcCgpO1xyXG4gICAgdGhpcy5jaGF0QXBwLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGF0LWFwcC11c2VyLXN0YXRlXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGVpdGhlciBhIG5ldyBpbnN0YW5jZSBvciB0aGUgb2xkIGluc3RhbmNlXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7QXBwQ29tcG9uZW50fVxyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9ICgpOiBBcHBDb21wb25lbnQgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEFwcENvbXBvbmVudCgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgVmFsaWRhdGUgfSBmcm9tIFwiLi4vdXRpbC92YWxpZGF0aW9uLnV0aWxcIjtcclxuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tIFwiLi4vdXRpbC9hc3luY1dyYXAudXRpbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLmNvbXBcIjtcclxuaW1wb3J0IHsgaUF1dGhJbnB1dHMgfSBmcm9tIFwiLi4vbW9kZWxzL2F1dGgubW9kZWxcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBcIjtcclxuaW1wb3J0IHsgaUh0dHBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaHR0cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpVmFsaWRpdHlUeXBlIH0gZnJvbSBcIi4uL21vZGVscy92YWxpZGl0eS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHZW5VdGlsIGFzIEdlbiB9IGZyb20gXCIuLi91dGlsL2dlbi51dGlsXCI7XHJcbmltcG9ydCB7IEVycm9yQ29tcG9uZW50LCBFcnJvckNvbXBvbmVudCBhcyBlcnJvciB9IGZyb20gXCIuL2Vycm9yLmNvbXBcIjtcclxuaW1wb3J0IHsgaHR0cFBvc3RMb2dpbiwgaHR0cFBvc3RSZWdpc3RlciB9IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcblxyXG4vKipcclxuICogQ29udHJvbHMgcHJvY2Vzc2VzIHJlbGF0ZWQgdG8gdGhlIGF1dGggY29tcG9uZW50XHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEF1dGhDb21wb25lbnQ7XHJcblxyXG4gIHByaXZhdGUgYXBwQ29tcDogQXBwQ29tcG9uZW50ID0gQXBwQ29tcG9uZW50LmdldEluc3RhbmNlKCk7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgYXV0aFdyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIGF1dGhMb2FkZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgYXV0aENvbXBzITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBhdXRoUmVnaXN0ZXJDb21wITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBhdXRoTG9naW5Db21wITogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgcmVnRm9ybSE6IEhUTUxGb3JtRWxlbWVudDtcclxuICBwcml2YXRlIHJlZ1VzZXJuYW1lSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVnUGFzc3dvcmRJbnB1dCE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWdSZVBhc3N3b3JkSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVnU3VibWl0ITogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBzaWduSW5TcGFuITogSFRNTFNwYW5FbGVtZW50O1xyXG4gIHByaXZhdGUgbG9nRm9ybSE6IEhUTUxGb3JtRWxlbWVudDtcclxuICBwcml2YXRlIGxvZ1VzZXJuYW1lSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgbG9nUGFzc3dvcmRJbnB1dCE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBsb2dTdWJtaXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgc2lnblVwU3BhbiE6IEhUTUxTcGFuRWxlbWVudDtcclxuICBwcml2YXRlIHNpZ25PbiE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc2lnbk9uTGlua3MhOiBIVE1MTGlua0VsZW1lbnRbXTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBzaG93U2lnbkNsYXNzOiBzdHJpbmcgPSBcInNob3ctc2lnbi1pblwiO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1hcHBcIiwgXCJhdXRoLXRlbXBcIiwgXCJhZnRlcmJlZ2luXCIpO1xyXG4gICAgdGhpcy5jb25maWd1cmVDb21wb25lbnQoKTtcclxuICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICBBdXRoQ29tcG9uZW50LmF1dGhXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuYXV0aC1jb21wXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgQXV0aENvbXBvbmVudC5hdXRoTG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuYXV0aC13cmFwIC5sb2FkZXJcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLmF1dGhSZWdpc3RlckNvbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5hdXRoLXJlZ2lzdGVyLWRpdlwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuYXV0aExvZ2luQ29tcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiYXV0aC1sb2dpbi1kaXZcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlZ0Zvcm0gPSB0aGlzLmluc2VydGVkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNyZWdpc3Rlci1mb3JtXCJcclxuICAgICkhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHRoaXMuYXV0aENvbXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRoLWNvbXBzXCIpISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMucmVnVXNlcm5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBcInJlZy11c2VybmFtZVwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5yZWdQYXNzd29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwicmVnLXBhc3N3b3JkXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBcInJlZy1yZVBhc3N3b3JkXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlZ1N1Ym1pdCA9IHRoaXMucmVnRm9ybS5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcImlucHV0Omxhc3QtY2hpbGRcIlxyXG4gICAgKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMubG9nRm9ybSA9IHRoaXMuaW5zZXJ0ZWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI2xvZ2luLWZvcm1cIlxyXG4gICAgKSEgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgdGhpcy5sb2dVc2VybmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwibG9nLXVzZXJuYW1lXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmxvZ1Bhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgXCJsb2ctcGFzc3dvcmRcIlxyXG4gICAgKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMubG9nU3VibWl0ID0gdGhpcy5sb2dGb3JtLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiaW5wdXQ6bGFzdC1jaGlsZFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5zaWduSW5TcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuYXV0aC1yZWdpc3Rlci1kaXYgcCBzcGFuXCJcclxuICAgICkhIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHRoaXMuc2lnblVwU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmF1dGgtbG9naW4tZGl2IHAgc3BhblwiXHJcbiAgICApISBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICB0aGlzLnNpZ25PbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1zaWdub24tZGl2XCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5zaWduT25MaW5rcyA9IFtcclxuICAgICAgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdXRoLXNpZ25vbi1kaXYgYVwiKSxcclxuICAgIF0hIGFzIEhUTUxMaW5rRWxlbWVudFtdO1xyXG5cclxuICAgIHRoaXMuc2lnbkluU3Bhbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja1NpZ25JblNwYW4pO1xyXG4gICAgdGhpcy5zaWduVXBTcGFuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrU2lnblVwU3Bhbik7XHJcbiAgICB0aGlzLnJlZ0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFJlZ2lzdGVyRm9ybUhhbmRsZXIpO1xyXG4gICAgdGhpcy5sb2dGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRMb2dpbkZvcm1IYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbXBvbmVudCgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nVXNlcm5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgIHRoaXMubG9nUGFzc3dvcmRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgIHRoaXMubG9nU3VibWl0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG5cclxuICAgIHRoaXMuc2lnbk9uLmNsYXNzTGlzdC5hZGQoXCJoaWRlRWxlbWVudFwiLCBcImludmlzaWJsZUVsZW1cIik7XHJcbiAgfVxyXG5cclxuICAvKiogRVZFTlQgTElTVEVORVJTICovXHJcblxyXG4gIC8qKlxyXG4gICAqIC0gVGhpcyBmdW5jdGlvbiBzdWJtaXRzIHVzZXIgcmVnaXN0cmF0aW9uIGRhdGEuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N1Ym1pdEV2ZW50fSBlXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBTdWJtaXRFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0UmVnaXN0ZXJGb3JtSGFuZGxlciA9IGFzeW5jIChlOiBTdWJtaXRFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8qKiBEQVRBIEdBVEhFUklOR1xyXG4gICAgICogLSBHYXRoZXJzIHJlcXVlc3QgYm9keSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBjb25zdCByZWdJbnB1dHM6IGlBdXRoSW5wdXRzID0gdGhpcy5nZXRSZWdpc3RlcklucHV0KCk7XHJcblxyXG4gICAgLyoqIFZBTElEQVRJT05cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uIGludmFsaWQgZ2F0aGVyZWQgZGF0YS5cclxuICAgICAqL1xyXG5cclxuICAgIC8qKiBAY29uc3RhbnQgQHR5cGUge2lWYWxpZGl0eVR5cGV9ICovXHJcbiAgICBjb25zdCByZWdWYWxpZDogaVZhbGlkaXR5VHlwZSA9IFZhbGlkYXRlLnJlZ2lzdGVyRm9ybShyZWdJbnB1dHMpO1xyXG4gICAgaWYgKCFyZWdWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBzdWJtaXR0ZWQgcmVnaXN0cmF0aW9uIGRhdGEgaXMgaW52YWxpZFwiLFxyXG4gICAgICAgIHJlZ1ZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEhUVFAgUkVRVUVTVFxyXG4gICAgICogLSBSZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlci5cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uIGxvZ2ljIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwUG9zdFJlZ2lzdGVyLCByZWdJbnB1dHMpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCBmb3IgcmVnaXN0cmF0aW9uYCxcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uID49IDQwMCBzdGF0dXMgY29kZS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgcmVzVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgXCJzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgcmVxdWVzdCBmb3IgcmVnaXN0cmF0aW9uXCIsXHJcbiAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciByZWdpc3RyYXRpb25gXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qKiBQUk9DRVNTICovXHJcbiAgICB0aGlzLmNsZWFyUmVnaXN0ZXJJbnB1dCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIC0gVGhpcyBmdW5jdGlvbiBzdWJtaXRzIHVzZXIgY3JlZGVudGlhbHMgZm9yIHNpZ24taW4uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N1Ym1pdEV2ZW50fSBlXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBTdWJtaXRFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0TG9naW5Gb3JtSGFuZGxlciA9IGFzeW5jIChlOiBTdWJtaXRFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8qKiBEQVRBIEdBVEhFUklOR1xyXG4gICAgICogLSBHYXRoZXJzIHJlcXVlc3QgYm9keSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBjb25zdCBsb2dpbklucHV0czogaUF1dGhJbnB1dHMgPSB0aGlzLmdldExvZ2luSW5wdXQoKTtcclxuXHJcbiAgICAvKiogVkFMSURBVElPTlxyXG4gICAgICogLSBJbW1lZGlhdGVseSByZXR1cm5zIGFuZCAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uIGludmFsaWQgZGF0YS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgbG9naW5WYWxpZDogaVZhbGlkaXR5VHlwZSA9IFZhbGlkYXRlLmxvZ2luRm9ybShsb2dpbklucHV0cyk7XHJcbiAgICBpZiAoIWxvZ2luVmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgYEVSUk9SOiBzdWJtaXR0ZWQgbG9naW4gZGF0YSBpcyBpbnZhbGlkYCxcclxuICAgICAgICBsb2dpblZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEhUVFAgUkVRVUVTVFxyXG4gICAgICogLSBSZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlciBpbmNsdWRpbmcgdXNlciBjcmVkZW50aWFscy5cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyBhbmQgaW5zdHJ1Y3RzIFVJIHRvIHNob3cgZXhjZXB0aW9uIHVwb24gbG9naWMgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQb3N0TG9naW4sIGxvZ2luSW5wdXRzKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IGZvciBsb2dpblwiLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICAgKiAtIEltbWVkaWF0ZWx5IHJldHVybnMgYW5kIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uID49IDQwMCBzdGF0dXMgY29kZVxyXG4gICAgICovXHJcbiAgICBjb25zdCByZXNWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBcInNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyBjbGllbnQncyByZXF1ZXN0IGZvciBsb2dpblwiLFxyXG4gICAgICBgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIHVwb24gY2xpZW50J3MgcmVxdWVzdCBmb3IgbG9naW5gXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qKiBIVFRQIFJFUVVFU1RcclxuICAgICAqIC0gUmVxdWVzdHMgYW4gSFRUUCBHRVQgdG8gdGhlIHNlcnZlciBmb3IgYXV0aGVudGljYXRpb25cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyB1cG9uIHVuc3VjY2Vzc2Z1bCBzaWduLWluXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGxvZ1N1Y2Nlc3MgPSBhd2FpdCBHZW4ubG9nVXNlcigpO1xyXG4gICAgaWYgKCFsb2dTdWNjZXNzKSByZXR1cm47XHJcblxyXG4gICAgLyoqIFBST0NFU1MgKi9cclxuICAgIHRoaXMuZGlzYWJsZVJlZ0VsZW1lbnRzKCk7XHJcbiAgICB0aGlzLmRpc2FibGVMb2dFbGVtZW50cygpO1xyXG4gICAgdGhpcy5hcHBDb21wLmFwcFVzZXIoKTtcclxuICAgIHRoaXMuY2xlYXJMb2dpbklucHV0KCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBUaGlzIGZ1bmN0aW9uIGRpc3BsYXlzIHRoZSBsb2dpbiBmb3JtIHdpdGhpbiB0aGUgYXV0aCBjb21wb25lbnQgdXBvbiBhIGNsaWNrIG9mIGEgY2VydGFpbiBzcGFuIGVsZW1lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrU2lnbkluU3BhbiA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAoIXRoaXMuYXV0aENvbXBzLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLnNob3dTaWduQ2xhc3MpKSB7XHJcbiAgICAgIHRoaXMuc2hvd0xvZ0Zvcm0oKTtcclxuXHJcbiAgICAgIHRoaXMuZGlzYWJsZVJlZ0VsZW1lbnRzKCk7XHJcbiAgICAgIHRoaXMuZW5hYmxlTG9nRWxlbWVudHMoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiAtIFRoaXMgZnVuY3Rpb24gZGlzcGxheXMgdGhlIHJlZ2lzdHJhdGlvbiBmb3JtIHdpdGhpbiB0aGUgYXV0aCBjb21wb25lbnQgdXBvbiBhIGNsaWNrIG9mIGEgY2VydGFpbiBzcGFuIGVsZW1lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrU2lnblVwU3BhbiA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAodGhpcy5hdXRoQ29tcHMuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuc2hvd1NpZ25DbGFzcykpIHtcclxuICAgICAgdGhpcy5hdXRoQ29tcHMuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNob3dTaWduQ2xhc3MpO1xyXG5cclxuICAgICAgdGhpcy5lbmFibGVSZWdFbGVtZW50cygpO1xyXG4gICAgICB0aGlzLmRpc2FibGVMb2dFbGVtZW50cygpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiAtIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbGwgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSByZWdpc3RlciBmb3JtIGlucHV0IGVsZW1lbnRzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2lBdXRoSW5wdXRzfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UmVnaXN0ZXJJbnB1dCgpOiBpQXV0aElucHV0cyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VybmFtZTogdGhpcy5yZWdVc2VybmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICBwYXNzd29yZDogdGhpcy5yZWdQYXNzd29yZElucHV0LnZhbHVlLFxyXG4gICAgICByZVBhc3N3b3JkOiB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dC52YWx1ZSxcclxuICAgIH0gYXMgaUF1dGhJbnB1dHM7XHJcbiAgfVxyXG5cclxuICAvKiogIFRoaXMgZnVuY3Rpb24gbW92ZXMgQXV0aENvbXBzIHRvIGRpc3BsYXkgc2lnbi1pbiBmb3JtLiAqL1xyXG4gIHB1YmxpYyBzaG93TG9nRm9ybSA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuYXV0aENvbXBzLmNsYXNzTGlzdC5hZGQodGhpcy5zaG93U2lnbkNsYXNzKTtcclxuICB9O1xyXG5cclxuICAvKiogLSBUaGlzIGZ1bmN0aW9uIGFzc2lnbnMgZGlzYWJsZSBIVE1MIGF0dHJpYnV0ZSB0byBhbGwgb2YgcmVnaXN0ZXIgZm9ybSdzIGlucHV0IGVsZW1lbnRzLiAqL1xyXG4gIHB1YmxpYyBkaXNhYmxlUmVnRWxlbWVudHMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnJlZ1VzZXJuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICB0aGlzLnJlZ1Bhc3N3b3JkSW5wdXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgIHRoaXMucmVnU3VibWl0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gIH07XHJcblxyXG4gIC8qKiAtIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBkaXNhYmxlIEhUTUwgYXR0cmlidXRlIHRvIGFsbCBvZiByZWdpc3RlciBmb3JtJ3MgaW5wdXQgZWxlbWVudHMuICovXHJcbiAgcHVibGljIGVuYWJsZVJlZ0VsZW1lbnRzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5yZWdVc2VybmFtZUlucHV0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgdGhpcy5yZWdQYXNzd29yZElucHV0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgdGhpcy5yZWdSZVBhc3N3b3JkSW5wdXQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICB0aGlzLnJlZ1N1Ym1pdC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGhpZGVzIGVsZW1lbnRzIG9mIHRoZSBsb2dpbiBmb3JtXHJcbiAgICogLSBBc3NpZ25zIGRpc2FibGUgSFRNTCBhdHRyaWJ1dGUgdG8gYWxsIG9mIGxvZ2luIGZvcm0ncyBpbnB1dCBlbGVtZW50cy5cclxuICAgKiAtIEhpZGVzIGFsbCBvZiBsb2dpbiBmb3JtJ3Mgc2lnbi1vbiBidXR0b24gZWxlbWVudHMuXHJcbiAgICogKi9cclxuICBwdWJsaWMgZGlzYWJsZUxvZ0VsZW1lbnRzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5sb2dVc2VybmFtZUlucHV0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgdGhpcy5sb2dQYXNzd29yZElucHV0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgdGhpcy5sb2dTdWJtaXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2lnbk9uLmNsYXNzTGlzdC5hZGQoXCJoaWRlRWxlbWVudFwiLCBcImludmlzaWJsZUVsZW1cIik7XHJcbiAgICB9LCAyNTApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYXNzdXJlcyB2aXNpYmlsaXR5IHRvIGVsZW1lbnRzIG9mIHRoZSBsb2dpbiBmb3JtXHJcbiAgICogLSBSZW1vdmVzIGRpc2FibGUgSFRNTCBhdHRyaWJ1dGUgdG8gYWxsIG9mIGxvZ2luIGZvcm0ncyBpbnB1dCBlbGVtZW50cy5cclxuICAgKiAtIFJlbW92ZSBub24tZGlzcGxheWluZyBzdHlsZXMgdG8gYWxsIG9mIGxvZ2luIGZvcm0ncyBzaWduLW9uIGJ1dHRvbiBlbGVtZW50cy5cclxuICAgKiAqL1xyXG4gIHB1YmxpYyBlbmFibGVMb2dFbGVtZW50cyA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMubG9nVXNlcm5hbWVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIHRoaXMubG9nUGFzc3dvcmRJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIHRoaXMubG9nU3VibWl0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG5cclxuICAgIHRoaXMuc2lnbk9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlRWxlbWVudFwiLCBcImludmlzaWJsZUVsZW1cIik7XHJcbiAgfTtcclxuXHJcbiAgLyoqIC0gQ2xlYXIgdXNlZCByZWdpc3RlciBpbnB1dCB0YWcgdmFsdWVzLiAqL1xyXG4gIHByaXZhdGUgY2xlYXJSZWdpc3RlcklucHV0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWdVc2VybmFtZUlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgIHRoaXMucmVnUGFzc3dvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAtIFJldHVybnMgYWxsIHRoZSBpbnB1dCB2YWx1ZXMgZnJvbSB0aGUgbG9naW4gZm9ybSBpbnB1dCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtpQXV0aElucHV0c31cclxuICAgKi9cclxuICBwcml2YXRlIGdldExvZ2luSW5wdXQoKTogaUF1dGhJbnB1dHMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlcm5hbWU6IHRoaXMubG9nVXNlcm5hbWVJbnB1dC52YWx1ZSxcclxuICAgICAgcGFzc3dvcmQ6IHRoaXMubG9nUGFzc3dvcmRJbnB1dC52YWx1ZSxcclxuICAgIH0gYXMgaUF1dGhJbnB1dHM7XHJcbiAgfVxyXG5cclxuICAvKiogLSBDbGVhciB1c2VkIGxvZ2luIGlucHV0IHRhZyB2YWx1ZXMuICovXHJcbiAgcHJpdmF0ZSBjbGVhckxvZ2luSW5wdXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ1VzZXJuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5sb2dQYXNzd29yZElucHV0LnZhbHVlID0gXCJcIjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYXNzdXJlcyB2aXNpYmlsaXR5IG9mIGF1dGggY29tcG9uZW50IGJ5IGhpZGluZyBhdXRoIGNvbXBvbmVudCBsb2FkZXIuXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBzaG93Q29tcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYXV0aExvYWRlci5jbGFzc0xpc3QuYWRkKFwiaGlkZUVsZW1lbnRcIik7XHJcbiAgICB0aGlzLmF1dGhXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlRWxlbWVudFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaGlkZXMgYm90aCBhdXRoIGNvbXBvbmVudCAmIGF1dGggY29tcG9uZW50IGxvYWRlciBnaWYuXHJcbiAgICogQHN0YXRpY1xyXG4gICAqICAqL1xyXG4gIHN0YXRpYyBoaWRlQ29tcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYXV0aExvYWRlci5jbGFzc0xpc3QuYWRkKFwiaGlkZUVsZW1lbnRcIik7XHJcbiAgICB0aGlzLmF1dGhXcmFwLmNsYXNzTGlzdC5hZGQoXCJoaWRlRWxlbWVudFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYXNzdXJlcyB2aXNpYmlsaXR5IG9mIGF1dGggY29tcG9uZW50IGxvYWRlciBieSBoaWRpbmcgdGhlIGF1dGggY29tcG9uZW50LlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgbG9hZGluZ0NvbXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLmF1dGhMb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVFbGVtZW50XCIpO1xyXG4gICAgdGhpcy5hdXRoV3JhcC5jbGFzc0xpc3QuYWRkKFwiaGlkZUVsZW1lbnRcIik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGVpdGhlciBhIG5ldyBvciB0aGUgb2xkIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtBdXRoQ29tcG9uZW50fVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9ICgpOiBBdXRoQ29tcG9uZW50ID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBBdXRoQ29tcG9uZW50KCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICBwcm90ZWN0ZWQgd3JhcHBlckVsZW1lbnQ6IFQ7XHJcbiAgcHJvdGVjdGVkIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICBwcm90ZWN0ZWQgaW5zZXJ0ZWRFbGVtZW50OiBVO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGNvbnN0cnVjdG9yLCB1cG9uIGluc3RhbnRpYXRpbmcsIGF0dGFjaGVzIGEgdGVtbGF0ZSBIVE1MIGVsZW1lbnQgd2l0aGluIHdyYXBwZXIgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHdyYXBwZXJDbGFzcyAtIGNsYXNzIG9mIHRoZSBzb29uIGNvbnRhaW5lciBvZiB0aGUgdGVtcGxhdGUgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZUlkIC0gaWQgb2YgdGhlIHRlbXBsYXRlIGVsZW1lbnRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5zZXJ0ZWRQb3NpdGlvbiAtIHBvc2l0aW9uIHdpdGhpbiB0aGUgd3JhcHBlckVsZW1lbnQgd2hlcmUgdGhlIHRlbXBsYXRlIHdpbGwgYmUgaW5zZXJ0ZWRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2luc2VydGVkSWRdIC0gYXNzaWducyBpZCB0byB0aGUgaW5zZXJ0ZWRFbGVtZW50IGlmIG5vdCBudWxsIHwgdW5kZWZpbmVkXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAYWJzdHJhY3RcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHdyYXBwZXJDbGFzczogc3RyaW5nLFxyXG4gICAgdGVtcGxhdGVJZDogc3RyaW5nLFxyXG4gICAgaW5zZXJ0ZWRQb3NpdGlvbjogc3RyaW5nLFxyXG4gICAgaW5zZXJ0ZWRJZD86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgLy8gLS0tIC0tLSBjbGFzcyB2YXJpYWJsZXMgYXMgSFRNTFxyXG4gICAgdGhpcy53cmFwcGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlckNsYXNzKSEgYXMgVDtcclxuICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIHRlbXBsYXRlSWRcclxuICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcblxyXG4gICAgLy8gLS0tIC0tLSAtLS0gbmV3Tm9kZSBhcyBpbXBvcnQgY2hpbGQgY29weSBvZiB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5pbnNlcnRlZEVsZW1lbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKFxyXG4gICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxyXG4gICAgICB0cnVlXHJcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XHJcblxyXG4gICAgLy8gLS0tIC0tLSBuZXdOb2RlIHNldCBpZFxyXG4gICAgaWYgKGluc2VydGVkSWQpIHRoaXMuaW5zZXJ0ZWRFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGluc2VydGVkSWQpO1xyXG5cclxuICAgIC8vIC0tLSAtLS0gYXR0YWNoIGNhbGxcclxuICAgIHRoaXMuYXR0YWNoRWxlbWVudChpbnNlcnRlZFBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaW5zZXJ0cyB0aGUgdGVtcGxhdGUgZWxlbWVudCB3aXRoaW4gdGhlIHdyYXBwZXIgZWxlbWVudCBkZXBlbmRpbmcgb24gdGhlIHBvc2l0aW9uLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvblxyXG4gICAqL1xyXG4gIGF0dGFjaEVsZW1lbnQocG9zaXRpb246IHN0cmluZykge1xyXG4gICAgdGhpcy53cmFwcGVyRWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgIHBvc2l0aW9uIGFzIEluc2VydFBvc2l0aW9uLFxyXG4gICAgICB0aGlzLmluc2VydGVkRWxlbWVudFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGNvbmZpZ3VyZXMgY2xhc3MgcmVsYXRlZCB2YXJpYWJsZXMgYW5kIGV2ZW50IGxpc3RlbmVycy4gKi9cclxuICBhYnN0cmFjdCBjb25maWd1cmVDb21wb25lbnQoLi4uYXJnczogYW55W10pOiB2b2lkO1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBjb25maWd1cmVzIGluaXRpYWwgZWxlbWVudHMgYW5kIHN0eWxpbmcgY29uZmlndXJhdGlvbi4gKi9cclxuICBhYnN0cmFjdCByZW5kZXJDb21wb25lbnQoLi4uYXJnczogYW55W10pOiB2b2lkO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENoYXRDb21wb25lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgY2xhc3MsIHVwb24gaW5zdGFudGlhdGlvbiwgY3JlYXRlcyBIVE1MIGVsZW1lbnQgZm9yIG1haW4gY2hhdCBjb21wb25lbnRcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcIi5jaGF0LWFwcFwiLCBcImNoYXQtdGVtcFwiLCBcImFmdGVyYmVnaW5cIik7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7fVxyXG4gIHJlbmRlckNvbXBvbmVudCgpOiB2b2lkIHt9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgZWl0aGVyIGEgbmV3IG9yIHRoZSBvbGQgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0NoYXRDb21wb25lbnR9XHJcbiAgICovXHJcbiAgc3RhdGljIGdldEluc3RhbmNlID0gKCk6IENoYXRDb21wb25lbnQgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENoYXRDb21wb25lbnQoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS5jb21wXCI7XHJcblxyXG4vKiogVGhpcyBjbGFzcyBjcmVhdGVzIEhUTUwgZWxlbWVudCBmb3IgY2xpZW50IFVJIGNvbXBvbmVudHMgdXBvbiBzdXBlciAqL1xyXG5leHBvcnQgY2xhc3MgRXJyb3JDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTEVsZW1lbnQsIEhUTUxEaXZFbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEVycm9yQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1hcHBcIiwgXCJlcnJvci10ZW1wXCIsIFwiYWZ0ZXJiZWdpblwiKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZUNvbXBvbmVudCguLi5hcmdzOiBhbnlbXSk6IHZvaWQge31cclxuICByZW5kZXJDb21wb25lbnQoLi4uYXJnczogYW55W10pOiB2b2lkIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaW5zdHJ1Y3RzIGVycm9yIGNvbXBvbmVudCB0byBiZTpcclxuICAgKiAtIHRlbXBvcmFyaWx5IHZpc2libGVcclxuICAgKiAtIGlmIG5vdCBlbXB0eSwgZGlzcGxheSBlcnJvclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRcclxuICAgKiBAcGFyYW0ge2FueX0gY29udGVudFxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBzaG93Q29tcCA9IChoZWFkOiBzdHJpbmcsIGNvbnRlbnQ/OiBhbnkpOiB2b2lkID0+IHtcclxuICAgIC8qKiBlcnJvciBjb250YWluZXIgZWxlbWVudCAqL1xyXG4gICAgY29uc3Qgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3Itd3JhcFwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIC8qKiBlcnJvciBoZWFkIGVsZW1lbnQgKi9cclxuICAgIGNvbnN0IGVycm9ySGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmVycm9yLWhlYWRcIlxyXG4gICAgKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICAvKiogZXJyb3IgY29udGVudCBlbGVtZW50ICovXHJcbiAgICBjb25zdCBlcnJvckNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5lcnJvci1jb250ZW50XCJcclxuICAgICkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcblxyXG4gICAgLy8gYXNzaWduIHZhbHVlcyB0byBlcnJvciBjb21wb25lbnRcclxuICAgIGVycm9ySGVhZC50ZXh0Q29udGVudCA9IGhlYWQ7XHJcbiAgICBjb250ZW50XHJcbiAgICAgID8gKGVycm9yQ29udGVudC50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpKVxyXG4gICAgICA6IChlcnJvckNvbnRlbnQudGV4dENvbnRlbnQgPSBudWxsKTtcclxuXHJcbiAgICAvLyB0ZW1wb3JhcmlseSBhcHBseSB2aXNpYmlsaXR5IGVycm9yIGNvbXBvbmVudCB0aHJvdWdoIHN0eWxpbmdcclxuICAgIHdyYXAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVDb21wXCIpO1xyXG4gICAgd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52aXNpYmxlRWxlbVwiKTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZChcInNob3ctZXJyb3Itd3JhcFwiKTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZChcImZhZGVJblwiKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgd3JhcC5jbGFzc0xpc3QuYWRkKFwiaW52aXNpYmxlRWxlbVwiKTtcclxuICAgICAgd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZUluXCIpO1xyXG4gICAgICB3cmFwLmNsYXNzTGlzdC5hZGQoXCJoaWRlQ29tcFwiKTtcclxuICAgICAgd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1lcnJvci13cmFwXCIpO1xyXG4gICAgfSwgNTAwMCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGVpdGhlciBhIG5ldyBvciB0aGUgb2xkIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnRcclxuICAgKiBAcmV0dXJucyB7RXJyb3JDb21wb25lbnR9XHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldEluc3RhbmNlID0gKCk6IEVycm9yQ29tcG9uZW50ID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBFcnJvckNvbXBvbmVudCgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tIFwiLi4vdXRpbC9hc3luY1dyYXAudXRpbFwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZSB9IGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb24udXRpbFwiO1xyXG5pbXBvcnQgeyBpUmVsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgaU5ld0dycEJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2dyb3VwLm1vZGVsXCI7XHJcbmltcG9ydCB7IFBlZXJDb21wb25lbnQgfSBmcm9tIFwiLi9wZWVyLmNvbXBcIjtcclxuaW1wb3J0IHsgU29ja2V0TWV0aG9kcyB9IGZyb20gXCIuLi91dGlsL3NvY2tldC51dGlsXCI7XHJcbmltcG9ydCB7IGlIdHRwUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2h0dHAubW9kZWxcIjtcclxuaW1wb3J0IHsgaVZhbGlkaXR5VHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvdmFsaWRpdHkubW9kZWxcIjtcclxuaW1wb3J0IHsgaUNvbXBGdW5jdGlvbnMgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbXAubW9kZWxcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgYXMgZXJyb3IgfSBmcm9tIFwiLi9lcnJvci5jb21wXCI7XHJcbmltcG9ydCB7IGlDaGF0VHlwZSwgaVJlcXVlc3RCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuaW1wb3J0IHsgaHR0cEdldEdyb3VwcywgaHR0cFBvc3RHcm91cCB9IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcblxyXG4vKiogVGhpcyBjbGFzcyBob2xkcyBmdW5jdGlvbnMgcmVsYXRlZCB0byBtYW5hZ2luZyAmIHJlbmRlcmluZyBvZiBjbGllbnQgc3RvcmVkIGdyb3VwIGRhdGEgKi9cclxuZXhwb3J0IGNsYXNzIEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgaUNvbXBGdW5jdGlvbnMge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBHcm91cENvbXBvbmVudCB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGdyb3Vwc1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgZ3JvdXBSZXF1ZXN0QnRuITogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBncm91cHNGb3JtITogSFRNTEZvcm1FbGVtZW50O1xyXG4gIHByaXZhdGUgZ3JvdXBzSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAvKiogQHR5cGUgeyBpUmVsYXRpb25bXSB9IC0gYXJyYXkgb2YgaW5mb3JtYXRpb24gYWJvdXQgY29ubmVjdGVkIHVzZXIgZ3JvdXBzICovXHJcbiAgcHJpdmF0ZSB1c2VyR3JvdXBzOiBBcnJheTxpUmVsYXRpb24+ID0gW107XHJcbiAgLyoqIEB0eXBlIHsgc3RyaW5nIH0gLSBhY2NvdW50IGlkIG9mIGNvbm5lY3RlZCB1c2VyIHBlZXIgKi9cclxuICBwcml2YXRlIHN0YXRpYyBzUGVlcklkOiBzdHJpbmc7XHJcbiAgLyoqIEB0eXBlIHsgaVJlcXVlc3RCb2R5W10gfSAtIGFycmF5IG9mIHJlcXVlc3QgZGF0YSBmb3IgbXVsdGlwbGUgZ3JvdXAtdG8tdXNlciByZXF1ZXN0cyAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlcXVlc3RTdGFjazogaVJlcXVlc3RCb2R5W10gPSBbXTtcclxuICAvKiogQHR5cGUgeyBzdHJpbmcgfSAtIG5hbWluZyBzaWduYXR1cmUgZm9yIGZvciBhbGwgZ3JvdXBzIHN0b3JlZCB3aXRoaW4gc2Vzc2lvblN0b3JhZ2UgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ3JwU2Vzc2lvblN0b3JlTmFtZTogc3RyaW5nID0gXCJzZXNzaW9uR3JvdXBzXCI7XHJcblxyXG4gIC8vIEZPUkVJR04gRUxFTUVOVChTKVxyXG4gIHByaXZhdGUgY2hhdE1zZ3MhOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBpbnN0YW50aWF0aW5nLCB0aGUgY29uc3RydWN0b3IgZmV0Y2hlcyAmIHJlbmRlcnMgdXNlciByZWxhdGVkIGdyb3Vwc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgY29ubmVjdGVkIHVzZXIgcGVlclxyXG4gICAqIEBwYXJhbSB7aUNoYXRUeXBlfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSBwZWVyXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwZWVySWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZTogaUNoYXRUeXBlXHJcbiAgKSB7XHJcbiAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0R3JvdXBzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlndXJlQ29tcG9uZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZXJyb3Iuc2hvd0NvbXAoXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBnZXQgdXNlciBncm91cHNcIiwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZUNvbXBvbmVudCguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgR3JvdXBDb21wb25lbnQuc1BlZXJJZCA9IHRoaXMucGVlcklkO1xyXG4gICAgR3JvdXBDb21wb25lbnQuZ3JvdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLWdyb3Vwc1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuZ3JvdXBSZXF1ZXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctZ3JvdXBzLWhlYWQgaVwiXHJcbiAgICApIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5ncm91cHNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctZ3JvdXAtbmV3XCJcclxuICAgICkhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHRoaXMuZ3JvdXBzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1ncm91cC1uZXcgaW5wdXRcIlxyXG4gICAgKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoYXQtbXNnc1wiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5ncm91cFJlcXVlc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLnN1Ym1pdE1lbWJlcnNoaXBSZXF1ZXN0XHJcbiAgICApO1xyXG4gICAgdGhpcy5ncm91cHNGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXROZXdHcm91cCk7XHJcbiAgfVxyXG4gIHJlbmRlckNvbXBvbmVudCguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5nZW5lcmF0ZUdyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tIEdFVCB8IFNFVCAtLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIEVtcHRpZXMgZ3JvdXAtdG8tdXNlciByZXF1ZXN0IHN0YWNrXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGVtcHR5UmVxdWVzdFN0YWNrID0gKCkgPT4ge1xyXG4gICAgR3JvdXBDb21wb25lbnQucmVxdWVzdFN0YWNrID0gW107XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLSBFVkVOVCBIQU5ETEVSUyAtLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb25zIHNlbmRzIG11bHRpcGxlIGluY29taW5nIHBlZXIgcmVxdWVzdCB0byB1c2VyIHJlbGF0ZWQgZ3JvdXBzIHZpYSBzb2NrZXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0TWVtYmVyc2hpcFJlcXVlc3QgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBHcm91cENvbXBvbmVudC5yZXF1ZXN0U3RhY2sgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICBHcm91cENvbXBvbmVudC5yZXF1ZXN0U3RhY2sgPT09IG51bGwgfHxcclxuICAgICAgIUFycmF5LmlzQXJyYXkoR3JvdXBDb21wb25lbnQucmVxdWVzdFN0YWNrKSB8fFxyXG4gICAgICBHcm91cENvbXBvbmVudC5yZXF1ZXN0U3RhY2subGVuZ3RoIDwgMFxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgLyoqIERhdGEgR2F0aGVyaW5nICovXHJcbiAgICAvKiogQHR5cGUge2lSZXF1ZXN0Qm9keX0gLSB0ZW1wb3JhcnkgcmVxdWVzdCBib2R5IGhvbGRlciAqL1xyXG4gICAgbGV0IHJlcTogaVJlcXVlc3RCb2R5O1xyXG4gICAgLyoqIEB0eXBlIHtpVmFsaWRpdHlUeXBlfSAtIHRlbXBvcmFyeSByZXF1ZXN0IGJvZHkgdmFsaWRpdHkgaG9sZGVyICovXHJcbiAgICBsZXQgcmVxVmFsaWQ6IGlWYWxpZGl0eVR5cGU7XHJcblxyXG4gICAgLyoqIExvb3BzIG92ZXIgcmVxdWVzdCBzdGFjayBmb3IgbXVsdGlwbGUgZ3JvdXAtMi11c2VyIHJlcXVlc3RzIHZpYSBzb2NrZXQgKi9cclxuICAgIGZvciAocmVxIG9mIEdyb3VwQ29tcG9uZW50LnJlcXVlc3RTdGFjaykge1xyXG4gICAgICAvKiogSW5zcGVjdHMgcmVxdWVzdCBib2R5IHZhbGlkaXR5LCBza2lwcyBkYXRhIHVwb24gZGF0YSBpbnZhbGlkaXR5LiAqL1xyXG4gICAgICByZXFWYWxpZCA9IFZhbGlkYXRlLnJlcXVlc3RCb2R5KHJlcSk7XHJcbiAgICAgIGlmICghcmVxVmFsaWQuaXNWYWxpZCkgY29udGludWU7XHJcblxyXG4gICAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBvc3RSZXF1ZXN0RXYsIHJlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgR3JvdXBDb21wb25lbnQuZW1wdHlSZXF1ZXN0U3RhY2soKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIGdyb3VwLXRvLXVzZXIgcmVxdWVzdCBzdGFjayBhbmQgY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnRzXHJcbiAgICogLSBpbi9kZWNyZW1lbnQgZ3JvdXAtdG8tdXNlciByZXF1ZXN0IHN0YWNrLlxyXG4gICAqIC0gbW9kaWZpZXMgSFRNTCBlbGVtZW50IHdoaWNoIGNvcnJlc3BvbmRzIHRvIGdyb3VwIGNsaWNrZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGFkZE1lbWJlcnNoaXBSZXF1ZXN0ID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGdycEJ0bnMgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBncnBJZCA9IGdycEJ0bnMuZGF0YXNldC5ncnBJZCE7XHJcblxyXG4gICAgLy8gdG9nZ2xlIGNsYXNzXHJcbiAgICBncnBCdG5zLmNsYXNzTGlzdC50b2dnbGUoXCJjaGF0LW1zZy1ncm91cC1hY3Rpb24tdW5kb1wiKTtcclxuXHJcbiAgICAvLyBpZiBhZnRlciB0b2dnbGluZywgdW5kbyBjbGFzcyBpcyBwcmVzZW50OiBwdXNoIHRvIHN0YWNrXHJcbiAgICBpZiAoZ3JwQnRucy5jbGFzc0xpc3QuY29udGFpbnMoXCJjaGF0LW1zZy1ncm91cC1hY3Rpb24tdW5kb1wiKSlcclxuICAgICAgdGhpcy5yZXF1ZXN0U3RhY2sucHVzaChcclxuICAgICAgICBHcm91cENvbXBvbmVudC5jcmVhdGVSZXF1ZXN0Qm9keShncnBJZCwgR3JvdXBDb21wb25lbnQuc1BlZXJJZClcclxuICAgICAgKTtcclxuICAgIC8vIGlmIGFmdGVyIHRvZ2dsaW5nLCB1bmRvIGNsYXNzIGlzIHByZXNlbnQ6IHJlbW92ZSB0byBzdGFja1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLnJlcXVlc3RTdGFjayA9IHRoaXMucmVxdWVzdFN0YWNrLmZpbHRlcihcclxuICAgICAgICAocmVxOiBpUmVxdWVzdEJvZHkpID0+IHJlcS5ncm91cElkICE9PSBncnBJZFxyXG4gICAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmVxdWVzdHMgYW4gSFRUUCBQT1NUIHRvIHRoZSBzZXJ2ZXIgdG8gY3JlYXRlIGEgbmV3IGdyb3VwLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdWJtaXRFdmVudH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgU3VibWl0RXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHN1Ym1pdE5ld0dyb3VwID0gYXN5bmMgKGU6IFN1Ym1pdEV2ZW50KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgLyoqIG5ldyBncm91cCBvYmplY3QgKi9cclxuICAgIGNvbnN0IG5ld0dycE9iajogaU5ld0dycEJvZHkgPSB7XHJcbiAgICAgIHJlY2lwaWVudElkOiB0aGlzLmNoYXRNc2dzLmRhdGFzZXQudXNlcklkXHJcbiAgICAgICAgPyB0aGlzLmNoYXRNc2dzLmRhdGFzZXQudXNlcklkXHJcbiAgICAgICAgOiBcIlwiLFxyXG4gICAgICBncnBOYW1lOiB0aGlzLmdyb3Vwc0lucHV0LnZhbHVlLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogUmV0dXJucyBpbW1lZGlhdGVseSBpZiByZXF1ZXN0IGRhdGEgaXMgZm91bmQgaW52YWxpZC4gKi9cclxuICAgIGNvbnN0IG5ld0dycFZhbGlkID0gVmFsaWRhdGUubmV3R3JvdXBJbnB1dChuZXdHcnBPYmopO1xyXG4gICAgaWYgKCFuZXdHcnBWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBjbGllbnQncyBuZXcgZ3JvdXAgcmVxdWVzdCBkYXRhIGlzIGludmFsaWRcIixcclxuICAgICAgICBuZXdHcnBWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXF1ZXN0IEhUVFAgUE9TVCB0byBzZXJ2ZXIgdG8gY3JlYXRlIG5ldyBncm91cC4gKi9cclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQb3N0R3JvdXAsIG5ld0dycE9iaik7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCBmb3IgdXNlciBncm91cHNcIixcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSW1tZWRpYXRlbHkgcmV0dXJucyBpZiB0aGUgSFRUUCByZXNwb25zZSBpcyBpbnZhbGlkLiAqL1xyXG4gICAgbGV0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIHJlcXVlc3QgZm9yIHN1Ym1pdHRpbmcgbmV3IGdyb3VwYCxcclxuICAgICAgYHNlcnZlciByZXNwb25kZWQgd2l0aCBhbiBlcnJvciB1cG9uIGNsaWVudCdzIHJlcXVlc3QgZm9yIHVzZXIgZ3JvdXBzYFxyXG4gICAgKTtcclxuICAgIGlmICghaHR0cFZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgLyoqIEdhdGhlciBkYXRhIGZvciBzZXF1ZW50aWFsIGdyb3VwLXRvLXVzZXIgcmVxdWVzdCBhZnRlciBzdWNjZXNzZnVsIGdyb3VwIGNyZWF0aW9uICovXHJcbiAgICBjb25zdCBncnBSZWwgPSByZXNwb25zZS5kYXRhLmRhdGEgYXMgaVJlbGF0aW9uO1xyXG4gICAgY29uc3QgZ3JwX2lkOiBzdHJpbmcgPSBncnBSZWwuYWNjbnRfaWQ7XHJcbiAgICBjb25zdCByZXFCb2R5OiBpUmVxdWVzdEJvZHkgPSBHcm91cENvbXBvbmVudC5jcmVhdGVSZXF1ZXN0Qm9keShcclxuICAgICAgdGhpcy5jaGF0TXNncy5kYXRhc2V0LnVzZXJJZCBhcyBzdHJpbmcsXHJcbiAgICAgIGdycF9pZFxyXG4gICAgKTtcclxuXHJcbiAgICAvKiogUmV0dXJucyBpbW1lZGlhdGVseSBpZiByZXF1ZXN0IGRhdGEgaXMgZm91bmQgaW52YWxpZC4gKi9cclxuICAgIGNvbnN0IHJlcVZhbGlkID0gVmFsaWRhdGUucmVxdWVzdEJvZHkocmVxQm9keSk7XHJcbiAgICBpZiAoIXJlcVZhbGlkLmlzVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvKiogUmVxdWVzdCB2aWEgc29ja2V0IHRvIHNlcnZlciBjcmVhdGUgcmVxdWVzdCBmcm9tIGdyb3VwLXRvLXVzZXIuICovXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBvc3RSZXF1ZXN0RXYsIHJlcUJvZHkpO1xyXG5cclxuICAgIC8qKiBVcGRhdGUgcGVlciBjb21wb25lbnQgbGlzdCB3aXRoIG5ldyBncm91cCAqL1xyXG4gICAgUGVlckNvbXBvbmVudC51cGRhdGVQZWVyTGlzdEhUTUwoZ3JwUmVsKTtcclxuXHJcbiAgICAvKiogQ29ubmVjdCB0byBzb2NrZXQgcm9vbSBhZnRlciBzdWNjZXNzZnVsIGdyb3VwIGNyZWF0aW9uICovXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChcclxuICAgICAgU29ja2V0TWV0aG9kcy5qb2luUm9vbUV2LFxyXG4gICAgICBncnBSZWwuY2hhdF9pZCxcclxuICAgICAgKHJlczogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvKiogQ2xlYXIgdXNlZCBncm91cCBpbnB1dCBlbGVtZW50ICovXHJcbiAgICB0aGlzLmdyb3Vwc0lucHV0LnZhbHVlID0gXCJcIjtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tIENMQVNTIFVUSUxJVFkgLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uOlxyXG4gICAqIC0gZmV0Y2hlcyBncm91cHMgZnJvbSB0aGUgc2VydmVyXHJcbiAgICogLSBzdG9yZXMgaXQgaW4gdGhlIHNlc3Npb25Tb3RyYWdlXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8dm9pZD4gfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgZ2V0R3JvdXBzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLyoqIENoZWNrIGlmIHNlc3Npb25TdG9yYWdlIGhhcyBzdG9yZWQgZ3JvdXAgaXRlbXMuICovXHJcbiAgICBjb25zdCBncyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oR3JvdXBDb21wb25lbnQuZ3JwU2Vzc2lvblN0b3JlTmFtZSk7XHJcbiAgICAvKiogSW1tZWRpYXRlbHkgcmV0dXJucyBpZiB0cnVlLiAqL1xyXG4gICAgaWYgKGdzICYmIEFycmF5LmlzQXJyYXkoSlNPTi5wYXJzZShncykpKSB7XHJcbiAgICAgIHRoaXMudXNlckdyb3VwcyA9IEpTT04ucGFyc2UoZ3MpIGFzIGlSZWxhdGlvbltdO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJlcXVlc3QgSFRUUCBHRVQgdG8gdGhlIHNlcnZlciBmb3IgdXNlciByZWxhdGVkIGdyb3VwcyAqL1xyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldEdyb3Vwcyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gZ2V0IHVzZXIgZ3JvdXBzXCIsIGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEltbWVkaWF0ZWx5IHJldHVybnMgaWYgSFRUUCBSZXNwb25zZSBpcyBpbnZhbGlkICovXHJcbiAgICBjb25zdCBodHRwVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgYHNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyByZXF1ZXN0IGZvciB1c2VyIGdyb3Vwc2AsXHJcbiAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIGdyb3Vwc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qKiBTdG9yZSBncm91cHMgcmVjZWl2ZWQgdG86XHJcbiAgICAgKiAtIGNsYXNzXHJcbiAgICAgKiAtIHNlc3Npb25TdG9yYWdlXHJcbiAgICAgKiAqL1xyXG4gICAgdGhpcy51c2VyR3JvdXBzID0gcmVzcG9uc2UuZGF0YS5kYXRhIGFzIEFycmF5PGlSZWxhdGlvbj47XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICBHcm91cENvbXBvbmVudC5ncnBTZXNzaW9uU3RvcmVOYW1lLFxyXG4gICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJHcm91cHMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBncm91cCBsaXN0cyBmb3IgYSBncm91cCB0eXBlIG1lc3NhZ2UgY29tcG9uZW50ICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUdyb3VwcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuO1xyXG5cclxuICAgIGxldCBncnA6IGlSZWxhdGlvbjtcclxuXHJcbiAgICBmb3IgKGdycCBvZiB0aGlzLnVzZXJHcm91cHMpIHtcclxuICAgICAgaWYgKGdycC5hY2NudF9pZCAhPT0gdGhpcy5wZWVySWQpXHJcbiAgICAgICAgR3JvdXBDb21wb25lbnQuY3JlYXRlR3JvdXBJdGVtSFRNTChncnAsIEdyb3VwQ29tcG9uZW50Lmdyb3Vwc1dyYXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoaW4gdGhlIG1lc3NhZ2UgY29tcG9uZW50J3MgY29ubmVjdGVkIGdyb3VwcyBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgaVJlbGF0aW9uIH0gZ3JwXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwcGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlR3JvdXBJdGVtSFRNTCA9IChcclxuICAgIGdycDogaVJlbGF0aW9uLFxyXG4gICAgd3JhcHBlcjogSFRNTERpdkVsZW1lbnRcclxuICApOiB2b2lkID0+IHtcclxuICAgIC8vICAgPGRpdiBjbGFzcz0nY2hhdC1tc2ctZ3JvdXAtaXRlbSc+XHJcbiAgICBjb25zdCBncnBXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGdycFdyYXAuY2xhc3NMaXN0LmFkZChcImNoYXQtbXNnLWdyb3VwLWl0ZW1cIik7XHJcblxyXG4gICAgLy8gICAgIDxoND5ncnAgMTwvaDQ+XHJcbiAgICBjb25zdCBncnBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xyXG4gICAgZ3JwTmFtZS50ZXh0Q29udGVudCA9IGdycC5hY2NudF9uYW1lO1xyXG5cclxuICAgIC8vICAgICA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1ncm91cC1hY3Rpb24nPlxyXG4gICAgY29uc3QgZ3JwQnRucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBncnBCdG5zLmNsYXNzTGlzdC5hZGQoXCJjaGF0LW1zZy1ncm91cC1hY3Rpb25cIik7XHJcblxyXG4gICAgLy8gICAgICAgPHNwYW4+dW5kbzwvc3Bhbj5cclxuICAgIGNvbnN0IHVuZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHVuZG9CdG4udGV4dENvbnRlbnQgPSBcInVuZG9cIjtcclxuXHJcbiAgICAvLyAgICAgICA8aSBjbGFzcz0nZmEtc29saWQgZmEtcGx1cyc+PC9pPlxyXG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtcGx1c1wiKTtcclxuXHJcbiAgICBncnBCdG5zLmFwcGVuZENoaWxkKHVuZG9CdG4pO1xyXG4gICAgZ3JwQnRucy5hcHBlbmRDaGlsZChhZGRCdG4pO1xyXG4gICAgZ3JwQnRucy5kYXRhc2V0LmdycElkID0gZ3JwLmFjY250X2lkO1xyXG5cclxuICAgIGdycFdyYXAuYXBwZW5kQ2hpbGQoZ3JwTmFtZSk7XHJcbiAgICBncnBXcmFwLmFwcGVuZENoaWxkKGdycEJ0bnMpO1xyXG5cclxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZ3JwV3JhcCk7XHJcblxyXG4gICAgZ3JwQnRucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgR3JvdXBDb21wb25lbnQuYWRkTWVtYmVyc2hpcFJlcXVlc3QpO1xyXG4gICAgLy8gICAgIDwvZGl2PlxyXG4gICAgLy8gICA8L2Rpdj5cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSByZXF1ZXN0IG9iamVjdCBmb3IgYSBncm91cC10by11c2VyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gZ3JvdXBJZFxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHJlY2VpdmVySWRcclxuICAgKiBAcmV0dXJucyB7IGlSZXF1ZXN0Qm9keSB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlUmVxdWVzdEJvZHkoXHJcbiAgICBncm91cElkOiBzdHJpbmcsXHJcbiAgICByZWNlaXZlcklkOiBzdHJpbmdcclxuICApOiBpUmVxdWVzdEJvZHkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogMyxcclxuICAgICAgcmVjaXBpZW50SWQ6IHJlY2VpdmVySWQsXHJcbiAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGVpdGhlcjpcclxuICAgKiAtIG5ldyBvciBvbGQgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICogLSBudWxsIGlmIHRoZSBjbGFzcyBpcyB0byBiZSBkZWxldGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVySWQgLSBhY2NvdW50IGlkIG9mIHRoZSB1c2VyJ3MgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSB1c2VyJ3MgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZGVsZXRlSW5zdGFuY2UgLSBmbGFnIGluZGljYXRpbmcgd2hldGhlciBjbGFzcyBpcyB0byBiZSBkZWxldGVkIG9yIG5vdFxyXG4gICAqIEByZXR1cm5zIHsgR3JvdXBDb21wb25lbnQgfCBudWxsIH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdGFuY2UgPSAoXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHR5cGU6IGlDaGF0VHlwZSxcclxuICAgIGRlbGV0ZUluc3RhbmNlOiBib29sZWFuXHJcbiAgKTogR3JvdXBDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghZGVsZXRlSW5zdGFuY2UpIHtcclxuICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBHcm91cENvbXBvbmVudChwZWVySWQsIHR5cGUpO1xyXG4gICAgICAgIEdyb3VwQ29tcG9uZW50LmVtcHR5UmVxdWVzdFN0YWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgaUNoYXRUeXBlIH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS5jb21wXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL21zZ3NMaXN0LmNvbXBcIjtcclxuaW1wb3J0IHsgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IH0gZnJvbSBcIi4vbXNnc09wdHMuY29tcFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaG9sZHMgZnVuY3Rpb25zIHJlbGF0ZWQgdG8gbW9kaWZ5aW5nIGNsYXNzIGluc3RhbmNlcyBhbmQgVUkgaW50ZXJmYWNlIG9mOlxyXG4gKiAtIE1lc3NhZ2VzTGlzdENvbXBvbmVudFxyXG4gKiAtIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+IHtcclxuICBzdGF0aWMgaW5zdGFuY2U6IE1lc3NhZ2VzQ29tcG9uZW50IHwgbnVsbDtcclxuXHJcbiAgLy8gQ09NUE9ORU5UU1xyXG4gIHN0YXRpYyBtc2dMaXN0SW5zdGFuY2U6IE1lc3NhZ2VzTGlzdENvbXBvbmVudCB8IG51bGw7XHJcbiAgc3RhdGljIG1zZ09wdHNJbnN0YW5jZTogTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IHwgbnVsbDtcclxuXHJcbiAgLy8gQ09NUE9ORU5UIEVMRU1FTlRTXHJcbiAgc3RhdGljIGNoYXRNc2dzOiBIVE1MRGl2RWxlbWVudDtcclxuICBzdGF0aWMgcmVhZG9ubHkgY2hhdE1zZ1VzZXJDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZ3MtdXNlclwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBjaGF0TXNnR3JvdXBDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZ3MtZ3JvdXBcIjtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFwiLmNoYXQtbXNncy13cmFwXCIsIFwibXNncy10ZW1wXCIsIFwiYWZ0ZXJiZWdpblwiKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZUNvbXBvbmVudCgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb21wb25lbnQoKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZUNvbXBvbmVudCgpOiB2b2lkIHt9XHJcblxyXG4gIHJlbmRlckNvbXBvbmVudCgpOiB2b2lkIHt9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGNvbnRyb2xzIHdoZXRoZXIgTWVzc2FnZXNDb21wb25lbnQgZWl0aGVyOlxyXG4gICAqIC0gY2FsbCBhIG5ldyBjbGFzcyBmb3IgYSBuZXcgcGVlciBtZXNzYWdlIGNvbXBvbmVudFxyXG4gICAqIC0gZGVsZXRlIGNsYXNzIGFuZCBjb3JyZXNwb25kaW5nIEhUTUwgZWxlbWVudHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHVzZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIGNsaWVudCBsb2dnZWQgaW5cclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVySWQgLSBhY2NvdW50IGlkIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0IGNvbm5lY3RlZCBwZWVyXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcGVlck5hbWUgLSBhY2NvdW50IG5hbWUgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBjaGF0SWQgLSBjaGF0IGlkIGJldHdlZW4gdGhlIHVzZXIgJiBwZWVyIHwgZ3JvdXBcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gYXZhaWxhYmlsaXR5IC0gIGF2YWlsYWJpbGl0eSBzZXR0aW5nIG9mIHRoZSB1c2VyIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGUgLSBjaGF0IHR5cGUgb2YgdGhlIHVzZXIncyB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZGVsZXRlSW5zdGFuY2UgLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIG1lc3NhZ2UgY29tcCB3aWxsIGJlIGRlbGV0ZWRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZnJvbVBlZXIgLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgdGFyZ2V0IGlzIGZyb20gdGhlIHBlZXIgbGlzdFxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBNZXNzYWdlc0NvbXBvbmVudCB8IG51bGwgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9IChcclxuICAgIHVzZXJJZDogc3RyaW5nLFxyXG4gICAgcGVlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVyTmFtZTogc3RyaW5nLFxyXG4gICAgY2hhdElkOiBzdHJpbmcsXHJcbiAgICBhdmFpbGFiaWxpdHk6IGJvb2xlYW4sXHJcbiAgICB0eXBlOiBpQ2hhdFR5cGUsXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhbixcclxuICAgIGZyb21QZWVyOiBib29sZWFuXHJcbiAgKTogTWVzc2FnZXNDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIC8vIGlmIHN0YXRpYyBmdW5jdGlvbiBpcyBjYWxsZWQgZm9yIGNyZWF0aW5nIG5ldyBjbGFzcyBjb21wb25lbnRzXHJcbiAgICBpZiAoIWRlbGV0ZUluc3RhbmNlKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgIC8vIGlmIG5vIG1lc3NhZ2VDb21wb25lbnQgZXhpc3RzLCBjcmVhdGUgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBNZXNzYWdlc0NvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMuY2hhdE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoYXQtbXNnc1wiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIHNldCBtZXNzYWdlIGNvbXBvbmVudCBjaGF0IHR5cGVcclxuICAgICAgICB0eXBlID09PSBcInVzZXJcIlxyXG4gICAgICAgICAgPyBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNncy5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAgICAgICAgIE1lc3NhZ2VzQ29tcG9uZW50LmNoYXRNc2dVc2VyQ2xhc3NcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgOiBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNncy5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAgICAgICAgIE1lc3NhZ2VzQ29tcG9uZW50LmNoYXRNc2dHcm91cENsYXNzXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TXNnc0luc3RhbmNlKFxyXG4gICAgICAgICAgdXNlcklkLFxyXG4gICAgICAgICAgcGVlcklkLFxyXG4gICAgICAgICAgcGVlck5hbWUsXHJcbiAgICAgICAgICBjaGF0SWQsXHJcbiAgICAgICAgICBhdmFpbGFiaWxpdHksXHJcbiAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgZnJvbVBlZXIsXHJcbiAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGF0TXNncy5kYXRhc2V0LnVzZXJJZCAhPT0gcGVlcklkKSB7XHJcbiAgICAgICAgLy8gZWxzZSwgZGVsZXRlIHRoZW4gcmVwbGFjZSB0aGUgcHJldmlvdXMgb25lXHJcbiAgICAgICAgdGhpcy5nZXRNc2dzSW5zdGFuY2UoXHJcbiAgICAgICAgICBcImRlbGV0ZUlkXCIsXHJcbiAgICAgICAgICBcImRlbGV0ZUlkXCIsXHJcbiAgICAgICAgICBcImRlbGV0ZU5hbWVcIixcclxuICAgICAgICAgIFwiZGVsZXRlQ2hhdElkXCIsXHJcbiAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICBmcm9tUGVlcixcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBkZWxldGUgbWVzc2FnZSBjb21wb25lbnQgSFRNTFxyXG4gICAgICAgIHRoaXMuY2hhdE1zZ3MuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gcmVwbGFjZSBtZXNzYWdlIGNvbXBvbmVudCBjaGF0IHR5cGVcclxuICAgICAgICB0eXBlID09PSBcInVzZXJcIlxyXG4gICAgICAgICAgPyBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNncy5jbGFzc0xpc3QucmVwbGFjZShcclxuICAgICAgICAgICAgICBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNnR3JvdXBDbGFzcyxcclxuICAgICAgICAgICAgICBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNnVXNlckNsYXNzXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIDogTWVzc2FnZXNDb21wb25lbnQuY2hhdE1zZ3MuY2xhc3NMaXN0LnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgTWVzc2FnZXNDb21wb25lbnQuY2hhdE1zZ1VzZXJDbGFzcyxcclxuICAgICAgICAgICAgICBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNnR3JvdXBDbGFzc1xyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmdldE1zZ3NJbnN0YW5jZShcclxuICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgIHBlZXJJZCxcclxuICAgICAgICAgIHBlZXJOYW1lLFxyXG4gICAgICAgICAgY2hhdElkLFxyXG4gICAgICAgICAgYXZhaWxhYmlsaXR5LFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGZyb21QZWVyLFxyXG4gICAgICAgICAgZmFsc2VcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBlbHNlLCBkZWxldGUgY29tcG9uZW50XHJcbiAgICAgIHRoaXMuZ2V0TXNnc0luc3RhbmNlKFxyXG4gICAgICAgIFwiZGVsZXRlSWRcIixcclxuICAgICAgICBcImRlbGV0ZUlkXCIsXHJcbiAgICAgICAgXCJkZWxldGVOYW1lXCIsXHJcbiAgICAgICAgXCJkZWxldGVDaGF0SWRcIixcclxuICAgICAgICBmYWxzZSxcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIGZyb21QZWVyLFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGNvbnRyb2xzIHdoZXRoZXIgTWVzc2FnZXNMaXN0Q29tcG9uZW50ICYgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IHdpbGw6XHJcbiAgICogLSBjcmVhdGVzIGEgbmV3IGNsYXNzIGZvciBhIG5ldyB1c2VyIG1lc3NhZ2UgY29tcG9uZW50XHJcbiAgICogLSBkZWxldGUgY2xhc3MgYW5kIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gdXNlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgY2xpZW50IGxvZ2dlZCBpblxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSAgYXZhaWxhYmlsaXR5IHNldHRpbmcgb2YgdGhlIHVzZXIgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgaUNoYXRUeXBlIH0gdHlwZSAtIGNoYXQgdHlwZSBvZiB0aGUgdXNlcidzIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBmcm9tUGVlciAtIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdXNlciB0YXJnZXQgaXMgZnJvbSB0aGUgcGVlciBsaXN0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGRlbGV0ZUluc3RhbmNlIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBtZXNzYWdlIGNvbXAgd2lsbCBiZSBkZWxldGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IE1lc3NhZ2VzQ29tcG9uZW50IHwgbnVsbCB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZ2V0TXNnc0luc3RhbmNlID0gKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHBlZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZyxcclxuICAgIGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHR5cGU6IFwidXNlclwiIHwgXCJncm91cFwiLFxyXG4gICAgZnJvbVBlZXI6IGJvb2xlYW4sXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhblxyXG4gICk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHBlZXJJZCA9PT0gdGhpcy5jaGF0TXNncy5kYXRhc2V0LnVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgIGRlbGV0ZUluc3RhbmNlXHJcbiAgICAgID8gKHRoaXMuY2hhdE1zZ3MuZGF0YXNldC51c2VySWQgPSBcIlwiKVxyXG4gICAgICA6ICh0aGlzLmNoYXRNc2dzLmRhdGFzZXQudXNlcklkID0gcGVlcklkKTtcclxuXHJcbiAgICB0aGlzLm1zZ09wdHNJbnN0YW5jZSA9IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRJbnN0YW5jZShcclxuICAgICAgcGVlcklkLFxyXG4gICAgICBwZWVyTmFtZSxcclxuICAgICAgY2hhdElkLFxyXG4gICAgICB0eXBlLFxyXG4gICAgICBhdmFpbGFiaWxpdHksXHJcbiAgICAgIGZyb21QZWVyLFxyXG4gICAgICBkZWxldGVJbnN0YW5jZVxyXG4gICAgKTtcclxuICAgIHRoaXMubXNnTGlzdEluc3RhbmNlID0gTWVzc2FnZXNMaXN0Q29tcG9uZW50LmluaXQoXHJcbiAgICAgIHVzZXJJZCxcclxuICAgICAgcGVlcklkLFxyXG4gICAgICBwZWVyTmFtZSxcclxuICAgICAgY2hhdElkLFxyXG4gICAgICBhdmFpbGFiaWxpdHksXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGZyb21QZWVyLFxyXG4gICAgICBkZWxldGVJbnN0YW5jZVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IEdlblV0aWwgfSBmcm9tIFwiLi4vdXRpbC9nZW4udXRpbFwiO1xyXG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gXCIuLi91dGlsL2FzeW5jV3JhcC51dGlsXCI7XHJcbmltcG9ydCB7IGlNc2dCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9tc2dMaXN0Lm1vZGVsXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvbi51dGlsXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcFwiO1xyXG5pbXBvcnQgeyBpUmVsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgaHR0cEdldE1zZ3MgfSBmcm9tIFwiLi4vaG9va3MvcmVxdWVzdHMuaG9va1wiO1xyXG5pbXBvcnQgeyBpQ2hhdFJlcUJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2NoYXQubW9kZWxcIjtcclxuaW1wb3J0IHsgUGVlckNvbXBvbmVudCB9IGZyb20gXCIuL3BlZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBTb2NrZXRNZXRob2RzIH0gZnJvbSBcIi4uL3V0aWwvc29ja2V0LnV0aWxcIjtcclxuaW1wb3J0IHsgaUh0dHBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaHR0cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHcm91cENvbXBvbmVudCB9IGZyb20gXCIuL2dyb3VwLmNvbXBcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgYXMgZXJyb3IgfSBmcm9tIFwiLi9lcnJvci5jb21wXCI7XHJcbmltcG9ydCB7IGlDaGF0VHlwZSwgaVJlcXVlc3RCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGhvbGRzIGZ1bmN0aW9ucyB3aGljaCBtYW5hZ2UgYW5kIHJlbmRlciBkYXRhIHJlbGF0ZWQgdG8gdGhlIHVzZXIgYW5kIHRoZWlyIHBlZXIocyknIG1lc3NhZ2UgbGlzdHMgYW5kIGl0cyBpdGVtcy5cclxuICpcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNMaXN0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PFxyXG4gIEhUTUxEaXZFbGVtZW50LFxyXG4gIEhUTUxFbGVtZW50XHJcbj4ge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBNZXNzYWdlc0xpc3RDb21wb25lbnQgfCBudWxsO1xyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRNc2dzTGlzdDogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRNc2dzTGlzdFdyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdE1zZ0hlYWQhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRNc2dIZWFkTmFtZSE6IEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRMaXN0R3JwQnRuV3JhcCE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdExpc3RHcnBCdG4hOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHN0YXRpYyBjaGF0TXNnQm9keTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0TXNnc0Zvcm1zITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0TXNnUmVxdWVzdCE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdE1zZ0Zvcm0hOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0TXNnTW9kYWwhOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBtb2RhbEdyb3VwSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAvKiogQ1NTIENsYXNzIG5hbWUgdG8gc3R5bGUgdXNlciBzZW50IG1lc3NhZ2UuICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbXlNc2dDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZy1taW5lXCI7XHJcbiAgLyoqIENTUyBDbGFzcyBuYW1lIHRvIHN0eWxlIHBlZXIocykgc2VudCBtZXNzYWdlLiAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHBlZXJNc2dDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZy1vdGhlcnNcIjtcclxuICAvKiogTmFtaW5nIGNvbnZlbnRpb24gZm9yIHNlc3Npb24gc3RvcmVkIG1lc3NhZ2UgbGlzdCBhcnJheS4gKi9cclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzZXNzaW9uU3RvcmVMaXN0S2V5OiBzdHJpbmcgPSBcIm1zZ0xpc3RcIjtcclxuICAvKiogQWNjb3VudCBJRCBvZiB0aGUgdXNlcidzIHRhcmdldC4gKi9cclxuICBwcml2YXRlIHN0YXRpYyBzUGVlcklkOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTa2lwIGNvdW50ZXIgZm9yIHRoZSBwZWVyIGxpc3QncyBwYWdpbmF0aW9uIGxvZ2ljLiAqL1xyXG4gIHByaXZhdGUgc2tpcDogbnVtYmVyID0gMDtcclxuICAvKiogU2tpcCBDb25zdGFudCBmb3IgdGhlIHBlZXIgbGlzdCdzIHBhZ2luYXRpb24gbG9naWMuICovXHJcbiAgcHJpdmF0ZSBza2lwQ250OiAzMCA9IDMwO1xyXG4gIC8qKiBNZXNzYWdlIElEIGJldHdlZW4gdGhlIHVzZXIgJiBwZWVyJ3MgY2hhdCBkYXRhLiAqL1xyXG4gIHByaXZhdGUgbXNnc0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAvKiogTWVzc2FnZSBMaXN0IEl0ZW1zIE1hcCBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlcidzIGNoYXQgZGF0YS4gKi9cclxuICBwcml2YXRlIG1zZ3NMaXN0czogTWFwPHN0cmluZywgaU1zZ0JvZHlbXT4gPSBuZXcgTWFwKCk7XHJcbiAgLyoqIE1lc3NhZ2UgTGlzdCBJdGVtcyBjb3VudCBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlcidzIGNoYXQgZGF0YS4gKi9cclxuICBwcml2YXRlIG1zZ3NMaXN0Q250OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGluc3RhbnRpYXRpb24sIHRoZSBjb25zdHJ1Y3RvcjpcclxuICAgKiAtIGNoZWNrcyBmb3IgYXZhaWxhYmxlIHNlc3Npb24gc3RvcmVkIG1hdGNoaW5nIG1lc3NhZ2UgbGlzdFxyXG4gICAqIC0gaWYgYXZhaWxhYmxlOiBza2lwcyBmZXRjaGluZyBmcm9tIHNlcnZlciBhbmQgbW9kaWZpZXMgcGFnaW5hdGlvbiByZWxhdGVkIGRhdGFcclxuICAgKiAtIGVsc2UgICAgICAgIDogZmV0Y2hlcyBmcm9tIHNlcnZlclxyXG4gICAqXHJcbiAgICogVGhlbjpcclxuICAgKiAtIGNvbmZpZ3VyZXMgcmVsYXRlZCBVSSBjb21wb25lbnRcclxuICAgKiAtIHJlbmRlciByZWxhdGVkIFVJIGNvbXBvbmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gdXNlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgY2xpZW50IGxvZ2dlZCBpblxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSBhdmFpbGFiaWxpdHkgc2V0dGluZyBvZiB0aGUgdXNlciB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGZyb21QZWVyIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIHRhcmdldCBpcyBmcm9tIHRoZSBwZWVyIGxpc3RcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwZWVySWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGVlck5hbWU6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhdElkOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZTogaUNoYXRUeXBlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmcm9tUGVlcjogYm9vbGVhblxyXG4gICkge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1tc2dzXCIsIFwibXNncy1saXN0LXRlbXBcIiwgXCJhZnRlcmJlZ2luXCIpO1xyXG5cclxuICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmIChQZWVyQ29tcG9uZW50LnNlYXJjaFBlZXJJbmZvKHRoaXMuY2hhdElkKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgbiA9IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRNc2dMaXN0SW5mb0NvdW50KHRoaXMuY2hhdElkKTtcclxuICAgICAgICBpZiAoIW4pIGF3YWl0IHRoaXMuZ2V0TWVzc2FnZXMoKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubXNnc0xpc3RDbnQgPSBuO1xyXG4gICAgICAgICAgY29uc3QgbSA9IE1hdGguZmxvb3IobiAvIHRoaXMuc2tpcENudCk7XHJcbiAgICAgICAgICB0aGlzLnNraXAgPSBtO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb25maWd1cmVDb21wb25lbnQoKTtcclxuICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoXHJcbiAgICAgICAgdXNlcklkLFxyXG4gICAgICAgIHBlZXJJZCxcclxuICAgICAgICBwZWVyTmFtZSxcclxuICAgICAgICBjaGF0SWQsXHJcbiAgICAgICAgYXZhaWxhYmlsaXR5LFxyXG4gICAgICAgIHR5cGVcclxuICAgICAgKTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuc1BlZXJJZCA9IHRoaXMucGVlcklkO1xyXG4gICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNoYXRNc2dzTGlzdFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1ib2R5LXdyYXBcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuY2hhdE1zZ3NMaXN0V3JhcC5kYXRhc2V0LmNoYXRJZCA9IHRoaXMuY2hhdElkO1xyXG4gICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNoYXRNc2dCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjY2hhdC1tc2ctYm9keVwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ0hlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1oZWFkXCJcclxuICAgICkhIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ0hlYWROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctaGVhZC1uYW1lIGgyXCJcclxuICAgICkhIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdExpc3RHcnBCdG5XcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctaGVhZC1vcHRzLWJ0blwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdExpc3RHcnBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1oZWFkLW9wdHMtYnRuIGlcIlxyXG4gICAgKSEgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRNc2dzRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1mb3Jtc1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ1JlcXVlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1yZXF1ZXN0XCJcclxuICAgICkhIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0TXNnRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLWZvcm1cIlxyXG4gICAgKSEgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0TXNnTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1ncm91cC1tb2RhbFwiXHJcbiAgICApISBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICB0aGlzLm1vZGFsR3JvdXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLWdyb3VwLW5ldyBpbnB1dFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuY2hhdE1zZ1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLmNsaWNrTXNnQnRuUmVxdWVzdEhhbmRsZXJcclxuICAgICk7XHJcbiAgICB0aGlzLmNoYXRNc2dGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRNZXNzYWdlSGFuZGxlcik7XHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuY2hhdE1zZ3NMaXN0V3JhcC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcInNjcm9sbFwiLFxyXG4gICAgICB0aGlzLmdldE1vcmVNZXNzYWdlc1xyXG4gICAgKTtcclxuICB9XHJcbiAgcmVuZGVyQ29tcG9uZW50KFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHBlZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZyxcclxuICAgIGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHR5cGU6IFwidXNlclwiIHwgXCJncm91cFwiXHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYXRNc2dzRm9ybXMuZGF0YXNldC5wZWVySWQgPSBwZWVySWQ7XHJcbiAgICB0aGlzLmNoYXRNc2dzRm9ybXMuZGF0YXNldC5jaGF0VHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmNoYXRNc2dIZWFkTmFtZS50ZXh0Q29udGVudCA9IHBlZXJOYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikge1xyXG4gICAgICB0aGlzLmNoYXRNc2dIZWFkLnJlbW92ZUNoaWxkKHRoaXMuY2hhdExpc3RHcnBCdG5XcmFwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWF2YWlsYWJpbGl0eSkge1xyXG4gICAgICB0aGlzLmNoYXRMaXN0R3JwQnRuLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICAgXCJjaGF0LW1zZy1oZWFkLW9wdHMtYnRuLXVuYXZhaWxhYmxlLXN0YXRlXCJcclxuICAgICAgKTtcclxuICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldENoYXRNc2dzTGlzdFdyYXAoKS5zY3JvbGxUb3AgPVxyXG4gICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICB0aGlzLmNoYXRNc2dzRm9ybXMuY2xhc3NMaXN0LmFkZChcImNoYXQtbXNnLWZvcm0tcmVxdWVzdC1zdGF0ZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2hhdExpc3RHcnBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICBcImNsaWNrXCIsXHJcbiAgICAgICAgdGhpcy5jbGlja01zZ09wdHNCdG5IYW5kbGVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IFwidXNlclwiKSBHcm91cENvbXBvbmVudC5nZXRJbnN0YW5jZShwZWVySWQsIHR5cGUsIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlTXNnSXRlbXMoXHJcbiAgICAgIHVzZXJJZCxcclxuICAgICAgSlNPTi5wYXJzZShcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFxyXG4gICAgICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LnNlc3Npb25TdG9yZUxpc3RLZXkgKyB0aGlzLmNoYXRJZFxyXG4gICAgICAgICkhXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldENoYXRNc2dzTGlzdFdyYXAoKS5zY3JvbGxUb3AgPVxyXG4gICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLnNjcm9sbEhlaWdodDtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLSBHRVQgfCBTRVQgLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIHN0YXRpYyByZWFkb25seSBnZXRDaGF0TXNnc0xpc3RXcmFwID0gKCk6IEhUTUxEaXZFbGVtZW50ID0+IHtcclxuICAgIHJldHVybiB0aGlzLmNoYXRNc2dzTGlzdFdyYXA7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0Q2hhdE1zZ0JvZHkgPSAoKTogSFRNTERpdkVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hhdE1zZ0JvZHk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRvdGFsIG1lc3NhZ2UgbGlzdCBpdGVtcyBjb3VudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEByZXR1cm5zIHsgbnVtYmVyIH1cclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0TXNnTGlzdEluZm9Db3VudCA9IChjaGF0SWQ6IHN0cmluZyk6IG51bWJlciA9PiB7XHJcbiAgICBjb25zdCB0ID0gSlNPTi5wYXJzZShcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnNlc3Npb25TdG9yZUxpc3RLZXkgKyBjaGF0SWQpIVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBuID0gdCAhPT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KHQpICYmIHQubGVuZ3RoID8gdC5sZW5ndGggOiAwO1xyXG5cclxuICAgIHJldHVybiBuO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIHNlc3Npb24gTWVzc2FnZSBMaXN0IERhdGEgYnkgZWl0aGVyOlxyXG4gICAqIC0gYWRkaW5nIGEgc2luZ2xlIG1lc3NhZ2UgaXRlbVxyXG4gICAqIC0gYWRkaW5nIGFuIGFycmF5IG9mIG1lc3NhZ2UgaXRlbXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5IHwgbnVsbCB9IFttc2ddIC0gbWVzc2FnZSBpdGVtIG9iamVjdFxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5W10gfCBudWxsIH0gW21zZ3NdIC0gYXJyYXkgb2YgbWVzc2FnZSBpdGVtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHsgdm9pZCB9XHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHNldE1zZ0xpc3RJbmZvID0gKFxyXG4gICAgY2hhdElkOiBzdHJpbmcsXHJcbiAgICBtc2c6IGlNc2dCb2R5IHwgbnVsbCxcclxuICAgIG1zZ3M6IGlNc2dCb2R5W10gfCBudWxsXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICAvLyBzZXNzaW9uIGl0ZW0ga2V5IG5hbWVcclxuICAgIGNvbnN0IGtleU5hbWUgPSB0aGlzLnNlc3Npb25TdG9yZUxpc3RLZXkgKyBjaGF0SWQ7XHJcblxyXG4gICAgLy8gZ2V0IHNlc3Npb24gaXRlbVxyXG4gICAgY29uc3QgcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlOYW1lKSEpIGFzIGlNc2dCb2R5W10gfCBudWxsO1xyXG4gICAgY29uc3Qgc2Vzc2lvbkxpc3QgPVxyXG4gICAgICBzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHMpID8gKFtdIGFzIGlNc2dCb2R5W10pIDogcztcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChtc2cgPT09IG51bGwgfHwgIShcIm1zZ1wiIGluIG1zZykgfHwgT2JqZWN0LmtleXMobXNnKS5sZW5ndGggIT09IDUpICYmXHJcbiAgICAgIChtc2dzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KG1zZ3MpIHx8ICFtc2dzLmxlbmd0aClcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0ZW1wb3JhcnkgYXJyYXkgd2l0aCBuZXcgbXNnc1xyXG4gICAgY29uc3QgYTEgPVxyXG4gICAgICBtc2dzICE9PSBudWxsICYmIEFycmF5LmlzQXJyYXkobXNncykgJiYgbXNncy5sZW5ndGhcclxuICAgICAgICA/IFsuLi5zZXNzaW9uTGlzdCwgLi4uKG1zZ3MgYXMgaU1zZ0JvZHlbXSldXHJcbiAgICAgICAgOiBbLi4uc2Vzc2lvbkxpc3RdO1xyXG5cclxuICAgIC8vIGFkZCBuZXcgbXNnIHRvIHRlbXBvcmFyeSBhcnJheVxyXG4gICAgaWYgKG1zZyAhPT0gbnVsbCAmJiBcIm1zZ1wiIGluIG1zZyAmJiBPYmplY3Qua2V5cyhtc2cpLmxlbmd0aCA9PT0gNSlcclxuICAgICAgYTEudW5zaGlmdChtc2cpO1xyXG5cclxuICAgIC8vIHNldCBzZXNzaW9uIGl0ZW1cclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5TmFtZSwgSlNPTi5zdHJpbmdpZnkoYTEpKTtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBpbmNyZW1lbnRzIHRoZSBNZXNzYWdlIExpc3QgSXRlbXMgY291bnQgb2YgYSBzcGVjaWZpYyBjaGF0IGRhdGEgYnkgb25lICgxKS4gKi9cclxuICBwdWJsaWMgcmVhZG9ubHkgaW5jck1zZ3NMaXN0Q250ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5tc2dzTGlzdENudCsrO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gRVZFTlQgSEFORExFUlMgLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGxpc3RlbmVyIGZ1bmN0aW9uIHNob3dzIGdyb3VwIGNvbXBvbmVudCBpZiB0aGUgdGFyZ2V0IHBlZXIgdHlwZSBpcyB1c2VyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrTXNnT3B0c0J0bkhhbmRsZXIgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5jaGF0TXNnTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtbXNnLWdyb3VwLW1vZGFsLXNob3ctc3RhdGVcIik7XHJcbiAgICBHcm91cENvbXBvbmVudC5lbXB0eVJlcXVlc3RTdGFjaygpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbGlzdGVuZXIgZnVuY3Rpb24gc2VuZHMgcmVxdWVzdCB0byB0aGUgdGFyZ2V0IHBlZXIgdmlhIHNvY2tldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGlja01zZ0J0blJlcXVlc3RIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHJlcUJvZHk6IGlSZXF1ZXN0Qm9keSA9IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5jcmVhdGVSZXF1ZXN0Qm9keShcclxuICAgICAgdGhpcy5jaGF0TXNnc0Zvcm1zLmRhdGFzZXQuY2hhdFR5cGUgYXMgXCJ1c2VyXCIgfCBcImdyb3VwXCIsXHJcbiAgICAgIHRoaXMucGVlcklkIGFzIHN0cmluZ1xyXG4gICAgKTtcclxuXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBvc3RSZXF1ZXN0RXYsIHJlcUJvZHkpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbGlzdGVuZXIgZnVuY3Rpb24gc2VuZHMgbWVzc2FnZSBib2R5IHRvIHRoZSB0YXJnZXQgcGVlciBjaGF0IHZpYSBzb2NrZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBTdWJtaXRFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIFN1Ym1pdEV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJtaXRNZXNzYWdlSGFuZGxlciA9IChlOiBTdWJtaXRFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgaW5wdXRITVRMID0gKGUudGFyZ2V0IGFzIEhUTUxGb3JtRWxlbWVudCkucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCJpbnB1dFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIC8qKiBNZXNzYWdlIEl0ZW0gdG8gYmUgc2VudCB0byBjaGF0ICovXHJcbiAgICBjb25zdCBtc2dCb2R5OiBpTXNnQm9keSA9IHtcclxuICAgICAgbXNnOiBpbnB1dEhNVEwudmFsdWUsXHJcbiAgICAgIG1zZ0lkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLnJlcGxhY2UoLy0vZywgXCJcIiksXHJcbiAgICAgIGNoYXRJZDogdGhpcy5jaGF0SWQsXHJcbiAgICAgIHNlbmRlck5hbWU6IFwiWW91XCIsXHJcbiAgICAgIHNlbmRlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgdGltZVJlY2VpdmVkOiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogU29ja2V0IEV2ZW50IGFuZCBjYWxsYmFjayBSZXNwb25zZSB1cG9uIHNlbmRpbmcgbWVzc2FnZSB0byBjaGF0ICovXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldCEuZW1pdChcclxuICAgICAgU29ja2V0TWV0aG9kcy5wb3N0TWVzc2FnZUV2LFxyXG4gICAgICBtc2dCb2R5LFxyXG4gICAgICB0aGlzLnBlZXJJZCxcclxuICAgICAgdGhpcy50eXBlLFxyXG4gICAgICAocmVzOiBpTXNnQm9keSkgPT4ge1xyXG4gICAgICAgIGlmIChcIm1zZ1wiIGluIHJlcykge1xyXG4gICAgICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNyZWF0ZU1zZ0l0ZW0oXHJcbiAgICAgICAgICAgIHJlcyxcclxuICAgICAgICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNoYXRNc2dCb2R5LFxyXG4gICAgICAgICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLFxyXG4gICAgICAgICAgICAwXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIFBlZXJDb21wb25lbnQudXBkYXRlUGVlckxpc3RIVE1MKFxyXG4gICAgICAgICAgICB7IGFjY250X2lkOiB0aGlzLnBlZXJJZCwgY2hhdF9pZDogcmVzLmNoYXRJZCB9IGFzIGlSZWxhdGlvbixcclxuICAgICAgICAgICAgcmVzXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIHRoaXMubXNnc0xpc3RDbnQgPSB0aGlzLm1zZ3NMaXN0Q250ICsgMTtcclxuICAgICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5zZXRNc2dMaXN0SW5mbyh0aGlzLmNoYXRJZCwgcmVzLCBudWxsKTtcclxuXHJcbiAgICAgICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLnNjcm9sbFRvcCA9XHJcbiAgICAgICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgICAgIFwiRVJST1I6IHNlcnZlciBmYWlsZWQgdG8gc2VuZCBtZXNzYWdlXCIsXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlcylcclxuICAgICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgaW5wdXRITVRMLnZhbHVlID0gXCJcIjtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHJpZXZlcyBhZGRpdGlvbiBtZXNzYWdlIGxpc3QgaXRlbXMgZnJvbSB0YXJnZXQgcGVlciBjaGF0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgRXZlbnQgfSBlIC0gc3BlY2lmaWNhbGx5IGEgc2Nyb2xsIGV2ZW50XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBFdmVudCAtIHNwZWNpZmljYWxseSBhIHNjcm9sbCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0TW9yZU1lc3NhZ2VzID0gYXN5bmMgKGU6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAvLyBEQVRBIEZBVEhFUklOR1xyXG4gICAgY29uc3QgdCA9IGUudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIGNvbnN0IHNraXBDaGF0UmVxID0gdGhpcy5nZXRDaGF0UmVxQm9keSgpO1xyXG5cclxuICAgIC8vIFZBTElEQVRJT046IGlmIHNjcm9sbCBoZWlnaHQgaXMgbm90IGF0IHRvcCwgcmV0dXJuXHJcbiAgICBpZiAodC5zY3JvbGxUb3AgIT09IDApIHJldHVybjtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBpZiBtZXNzYWdlIGl0ZW1zIGV4Y2VlZCBzdGFydGluZyBza2lwIGl0ZW0sIHJldHVyblxyXG4gICAgY29uc3QgbGlzdENudCA9IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRNc2dMaXN0SW5mb0NvdW50KHRoaXMuY2hhdElkKTtcclxuICAgIGlmICh0aGlzLnNraXAgKiB0aGlzLnNraXBDbnQgPiBsaXN0Q250KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY3VycmVudFNjcm9sbGxIZWlnaHQgPSB0LnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFUVVFU1RcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldE1zZ3MsIHNraXBDaGF0UmVxKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBmZXRjaCBjaGF0IG1lc3NhZ2VzXCIsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgY29uc3QgaHR0cFZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIGBzZXJ2ZXIgZXJyb3Igb2NjdXJlZGAsXHJcbiAgICAgIGBjbGllbnQgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgZm9yIHVwb24gcmVxdWVzdCBmb3IgY2hhdCBtZXNzYWdlc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFZBTElEQVRJT046IGNoZWNrIGlmIHJlc3BvbnNlIGhhcyBhZGRpdGlvbmFsIGRhdGFcclxuICAgIGlmIChyZXNwb25zZS5kYXRhLmRhdGEgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtc2dzOiBpTXNnQm9keVtdID0gcmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3M7XHJcbiAgICAvLyBWQUxJREFUSU9OOiBjaGVjayBpZiBhcnJheSBoYXMgY29udGVudHNcclxuICAgIGlmIChtc2dzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KG1zZ3MpIHx8ICFtc2dzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFBST0NFU1M6IGFkZCBIVE1MIG1lc3NhZ2UgaXRlbXNcclxuICAgIHRoaXMuZ2VuZXJhdGVNc2dJdGVtcyh0aGlzLnVzZXJJZCwgbXNncyBhcyBpTXNnQm9keVtdKTtcclxuXHJcbiAgICAvLyBQUk9DRVNTOiByZXZlcnNlIHJlY2VpdmVkIGFycmF5XHJcbiAgICAvLyBjb25zdCByZXZBcnJNc2dzOiBpTXNnQm9keVtdID0gW107XHJcbiAgICAvLyBsZXQgbXNnOiBpTXNnQm9keTtcclxuXHJcbiAgICAvLyBmb3IgKG1zZyBvZiBtc2dzKSB7XHJcbiAgICAvLyAgIHJldkFyck1zZ3MudW5zaGlmdChtc2cpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIFBST0NFU1M6ICsxIHRvIHNraXBcclxuICAgIHRoaXMuc2tpcCsrO1xyXG4gICAgLy8gUFJPQ0VTUzogYWRkIGxpc3QgaXRlbXMgY291bnRcclxuICAgIHRoaXMubXNnc0xpc3RDbnQgPSB0aGlzLm1zZ3NMaXN0Q250ICsgbXNncy5sZW5ndGg7XHJcblxyXG4gICAgLy8gUFJPQ0VTUzogdXBkYXRlIGNsYXNzIG1lc3NhZ2UgbGlzdFxyXG4gICAgLy8gdGhpcy5tc2dzTGlzdHMuc2V0KHRoaXMuY2hhdElkLCBbXHJcbiAgICAvLyAgIC4uLnRoaXMubXNnc0xpc3RzLmdldCh0aGlzLmNoYXRJZCkhLFxyXG4gICAgLy8gICAuLi5yZXZBcnJNc2dzLFxyXG4gICAgLy8gXSk7XHJcblxyXG4gICAgLy8gUFJPQ0VTUzogdXBkYXRlIHNlc3Npb24gc3RvcmFnZSBtZXNzYWdlIGxpc3RcclxuICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5zZXRNc2dMaXN0SW5mbyh0aGlzLmNoYXRJZCwgbnVsbCwgbXNncyk7XHJcblxyXG4gICAgLy8gUFJPQ0VTUzogbWFpbnRhaW4gY3VycmVudCBzY3JvbGwgbG9jYXRpb25cclxuICAgIHQuc2Nyb2xsVG9wID0gdC5zY3JvbGxIZWlnaHQgLSBjdXJyZW50U2Nyb2xsbEhlaWdodDtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tIENMQVNTIFVUSUxJVFkgLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlciB0byByZXRyaWV2ZSBmaXJzdCBiYXRjaCBvZiBjaGF0IGRhdGEgbWVzc2FnZSBpdGVtcy5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRNZXNzYWdlcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgY29uc3QgY2hhdFJlcUJvZHk6IGlDaGF0UmVxQm9keSA9IHRoaXMuZ2V0Q2hhdFJlcUJvZHkoKTtcclxuXHJcbiAgICAvLyBIVFRQIFJFUVVFU1Q6IHJlcXVlc3QgZm9yIGNoYXQgbWVzc2FnZXNcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldE1zZ3MsIGNoYXRSZXFCb2R5KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBmZXRjaCBjaGF0IG1lc3NhZ2VzXCIsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgY29uc3QgaHR0cFZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIGBzZXJ2ZXIgZXJyb3Igb2NjdXJlZGAsXHJcbiAgICAgIGBjbGllbnQgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgZm9yIHVwb24gcmVxdWVzdCBmb3IgY2hhdCBtZXNzYWdlc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgLy8gLS0tICsxIGZvciBza2lwXHJcbiAgICB0aGlzLnNraXArKztcclxuICAgIC8vIC0tLSBzdG9yZSBtZXNzYWdlSWRcclxuICAgIHRoaXMubXNnc0lkID0gcmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3NJZDtcclxuXHJcbiAgICAvLyAtLS0gc3RvcmUgY2hhdCBtZXNzYWdlcyBhcyBzZXNzaW9uIHN0b3JhZ2VcclxuICAgIC8vIHRoaXMubXNnc0xpc3RzLnNldCh0aGlzLmNoYXRJZCwgcmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3MpO1xyXG4gICAgLy8gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcclxuICAgIC8vICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LnNlc3Npb25TdG9yZUxpc3RLZXkgKyB0aGlzLmNoYXRJZCxcclxuICAgIC8vICAgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3MpXHJcbiAgICAvLyApO1xyXG5cclxuICAgIC8vIFBST0NFU1M6IGZ1cnRoZXIgaWYgdGhlIG1lc3NhZ2UgZGF0YSByZXRyaWV2ZWQgaXMgbm90IGVtcHR5IGJ5IGFueSBtZWFuc1xyXG4gICAgaWYgKFxyXG4gICAgICByZXNwb25zZS5kYXRhLmRhdGEubXNncyAhPT0gbnVsbCAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KHJlc3BvbnNlLmRhdGEuZGF0YS5tc2dzKSAmJlxyXG4gICAgICByZXNwb25zZS5kYXRhLmRhdGEubXNncy5sZW5ndGhcclxuICAgIClcclxuICAgICAgdGhpcy5tc2dzTGlzdENudCA9IHJlc3BvbnNlLmRhdGEuZGF0YS5tc2dzLmxlbmd0aDtcclxuXHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuc2V0TXNnTGlzdEluZm8oXHJcbiAgICAgIHRoaXMuY2hhdElkLFxyXG4gICAgICBudWxsLFxyXG4gICAgICByZXNwb25zZS5kYXRhLmRhdGEubXNncyBhcyBpTXNnQm9keVtdXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZW5kZXJzIHJldHJpZXZlZCBhcnJheSBvZiBtZXNzYWdlIGxpc3QgaXRlbXMgdG8gSFRNTCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHVzZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIGNsaWVudCBsb2dnZWQgaW5cclxuICAgKiBAcGFyYW0geyBpTXNnQm9keVtdIH0gbXNncyAtIE1lc3NhZ2UgTGlzdCBJdGVtcyBBcnJheSBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlcidzIGNoYXQgZGF0YS5cclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGdlbmVyYXRlTXNnSXRlbXMgPSAoXHJcbiAgICB1c2VySWQ6IHN0cmluZyxcclxuICAgIG1zZ3M6IGlNc2dCb2R5W11cclxuICApOiB2b2lkID0+IHtcclxuICAgIGxldCBtc2c6IGlNc2dCb2R5O1xyXG5cclxuICAgIGlmIChtc2dzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KG1zZ3MpIHx8ICFtc2dzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgIGZvciAobXNnIG9mIG1zZ3MpIHtcclxuICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNyZWF0ZU1zZ0l0ZW0oXHJcbiAgICAgICAgbXNnLFxyXG4gICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5jaGF0TXNnQm9keSxcclxuICAgICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLFxyXG4gICAgICAgIHVzZXJJZCA9PT0gbXNnLnNlbmRlcklkID8gMCA6IDEsXHJcbiAgICAgICAgdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhbiBvYmplY3QgZm9yIHRoZSB1c2VyJ3Mgb3V0Z29pbmcgcmVxdWVzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGUgLSBjaGF0IHR5cGUgb2YgdGhlIHVzZXIncyB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSByZWNlaXZlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgdXNlcidzIHJlcXVlc3QgcmVjaXBpZW50XHJcbiAgICogQHJldHVybnMgeyBpUmVxdWVzdEJvZHkgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBjcmVhdGVSZXF1ZXN0Qm9keSh0eXBlOiBpQ2hhdFR5cGUsIHJlY2VpdmVySWQ6IHN0cmluZyk6IGlSZXF1ZXN0Qm9keSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiB0eXBlID09PSBcInVzZXJcIiA/IDEgOiAyLFxyXG4gICAgICByZWNpcGllbnRJZDogdHlwZSA9PT0gXCJ1c2VyXCIgPyByZWNlaXZlcklkISA6IG51bGwsXHJcbiAgICAgIGdyb3VwSWQ6IHR5cGUgPT09IFwiZ3JvdXBcIiA/IHJlY2VpdmVySWQhIDogbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHRyYW5zZm9ybXMgdGhlIG1lc3NhZ2UgbGlzdCBpdGVtIG9iamVjdCBpbnRvIGEgSFRNTGVsZW1lbnQgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBNZXNzYWdlQ29tcG9uZW50TGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5IH0gbXNnXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSBjaGF0TXNnc0xpc3RXcmFwXHJcbiAgICogQHBhcmFtIHsgMCB8IDF9IHR5cGVcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gaXNGZXRjaGVkXHJcbiAgICogQHJldHVybnNcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlTXNnSXRlbSA9IChcclxuICAgIG1zZzogaU1zZ0JvZHksXHJcbiAgICB3cmFwOiBIVE1MRGl2RWxlbWVudCxcclxuICAgIGNoYXRNc2dzTGlzdFdyYXA6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgLy8gMCAtIGZyb20gY2xpZW50IGJyb3dzZXIgICAgICAxIC0gZnJvbSBvdGhlciB1c2VyKHMpXHJcbiAgICB0eXBlOiAwIHwgMSxcclxuICAgIGlzRmV0Y2hlZDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIG1zZy5jaGF0SWQgIT09IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCkuZGF0YXNldC5jaGF0SWRcclxuICAgICkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtc2cuY2hhdElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1zZ1dyYXBXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnN0IG1zZ1dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGNvbnN0IG1zZ1NlbmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtc2dTZW5kZXIudGV4dENvbnRlbnQgPSB0eXBlID8gbXNnLnNlbmRlck5hbWUgOiBcIllvdVwiO1xyXG4gICAgbXNnU2VuZGVyLmRhdGFzZXQubXNnSWQgPSBtc2cubXNnSWQ7XHJcbiAgICBjb25zdCBtc2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBtc2dDb250ZW50LnRleHRDb250ZW50ID0gbXNnLm1zZztcclxuXHJcbiAgICBjb25zdCBtc2dUaW1lV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCBtc2dUaW1lU3ViID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN1YlwiKTtcclxuICAgIGNvbnN0IG1zZ1RpbWVTdWJTdWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3ViXCIpO1xyXG4gICAgbXNnVGltZVN1YlN1Yi50ZXh0Q29udGVudCA9IEdlblV0aWwubWlsbGlUb1RpbWUoXHJcbiAgICAgIHR5cGVvZiBtc2cudGltZVJlY2VpdmVkICE9PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyBwYXJzZUludChtc2cudGltZVJlY2VpdmVkKVxyXG4gICAgICAgIDogbXNnLnRpbWVSZWNlaXZlZFxyXG4gICAgKTtcclxuICAgIG1zZ1RpbWVTdWIuYXBwZW5kQ2hpbGQobXNnVGltZVN1YlN1Yik7XHJcbiAgICBtc2dUaW1lV3JhcC5hcHBlbmRDaGlsZChtc2dUaW1lU3ViKTtcclxuXHJcbiAgICBtc2dXcmFwLmFwcGVuZENoaWxkKG1zZ1NlbmRlcik7XHJcbiAgICBtc2dXcmFwLmFwcGVuZENoaWxkKG1zZ0NvbnRlbnQpO1xyXG4gICAgbXNnV3JhcC5hcHBlbmRDaGlsZChtc2dUaW1lV3JhcCk7XHJcblxyXG4gICAgbXNnV3JhcFdyYXAuYXBwZW5kQ2hpbGQobXNnV3JhcCk7XHJcblxyXG4gICAgbXNnV3JhcFdyYXAuY2xhc3NMaXN0LmFkZCh0eXBlID8gdGhpcy5wZWVyTXNnQ2xhc3MgOiB0aGlzLm15TXNnQ2xhc3MpO1xyXG5cclxuICAgIGlmIChpc0ZldGNoZWQpIHdyYXAucHJlcGVuZChtc2dXcmFwV3JhcCk7XHJcbiAgICBlbHNlIHdyYXAuYXBwZW5kKG1zZ1dyYXBXcmFwKTtcclxuXHJcbiAgICAvLyA8ZGl2IGNsYXNzPVwiY2hhdC1tc2ctb3RoZXJzXCI+XHJcbiAgICAvLyAgIDxkaXY+XHJcbiAgICAvLyAgICAgPGRpdj5TZW5kZXI8L2Rpdj5cclxuICAgIC8vICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldDwvcD5cclxuICAgIC8vICAgICA8ZGl2PlxyXG4gICAgLy8gICAgICAgPHN1Yj48c3ViPjk6MDAuQU08L3N1Yj48L3N1Yj5cclxuICAgIC8vICAgICA8L2Rpdj5cclxuICAgIC8vICAgPC9kaXY+XHJcbiAgICAvLyA8L2Rpdj5cclxuICAgIC8vXHJcbiAgICAvLyA8ZGl2IGNsYXNzPVwiY2hhdC1tc2ctbWluZVwiPlxyXG4gICAgLy8gICA8ZGl2PlxyXG4gICAgLy8gICAgIDxkaXY+U2VuZGVyPC9kaXY+XHJcbiAgICAvLyAgICAgPHA+XHJcbiAgICAvLyAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldC4gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXRcclxuICAgIC8vICAgICAgIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEVvcyBwbGFjZWF0IGlwc2FtIGlkIGVpdXNcclxuICAgIC8vICAgICAgIGRlYml0aXMsIG5hdHVzIGV2ZW5pZXQgbWFpb3JlcyBpbmNpZHVudCBtYXhpbWUgbm9iaXMhXHJcbiAgICAvLyAgICAgPC9wPlxyXG4gICAgLy8gICAgIDxkaXY+XHJcbiAgICAvLyAgICAgICA8c3VwPjxzdWI+OTowMC5BTTwvc3ViPjwvc3VwPlxyXG4gICAgLy8gICAgIDwvZGl2PlxyXG4gICAgLy8gICA8L2Rpdj5cclxuICAgIC8vIDwvZGl2PlxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbiBvYmplY3QgdG8gYmUgdXNlIGZvciByZXF1ZXN0aW5nIHN1YnNlcXVlbnQgYmF0Y2ggb2YgbWVzc2FnZSBsaXN0IGl0ZW1zLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBpQ2hhdFJlcUJvZHkgfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Q2hhdFJlcUJvZHkoKTogaUNoYXRSZXFCb2R5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNraXA6IHRoaXMuc2tpcCxcclxuICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICBjaGF0SWQ6IHRoaXMuY2hhdElkLFxyXG4gICAgICBsaXN0Q250OiB0aGlzLm1zZ3NMaXN0Q250LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gY29udHJvbHMgcmV0dXJucyBpdHMgY29uc3RydWN0b3IgaW5zdGFuY2UgJiB3aGV0aGVyIE1lc3NhZ2VzTGlzdENvbXBvbmVudCBlaXRoZXI6XHJcbiAgICogLSBjYWxsIGEgbmV3IGNsYXNzIGZvciBhIG5ldyBwZWVyIG1lc3NhZ2UgY29tcG9uZW50XHJcbiAgICogLSBkZWxldGUgY2xhc3MgYW5kIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gdXNlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgY2xpZW50IGxvZ2dlZCBpblxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSBhdmFpbGFiaWxpdHkgc2V0dGluZyBvZiB0aGUgdXNlciB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGZyb21QZWVyIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIHRhcmdldCBpcyBmcm9tIHRoZSBwZWVyIGxpc3RcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZGVsZXRlSW5zdGFuY2UgLSBmbGFnIGluZGljYXRpbmcgaWYgdXNlciB0YXJnZXQgY29tcCBpcyB0byBiZSBkZWxldGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IE1lc3NhZ2VzTGlzdENvbXBvbmVudCB8IG51bGwgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBpbml0ID0gKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHBlZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZyxcclxuICAgIGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHR5cGU6IGlDaGF0VHlwZSxcclxuICAgIGZyb21QZWVyOiBib29sZWFuLFxyXG4gICAgZGVsZXRlSW5zdGFuY2U6IGJvb2xlYW5cclxuICApOiBNZXNzYWdlc0xpc3RDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghZGVsZXRlSW5zdGFuY2UpIHtcclxuICAgICAgLy8gY2FsbHMgZm9yIGEgbmV3IGluc3RhbmNlIGlmIHRoZXJlIGlzIG5vIHByZXZpb3VzIGNhbGxlZCBpbnN0YW5jZVxyXG4gICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE1lc3NhZ2VzTGlzdENvbXBvbmVudChcclxuICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgIHBlZXJJZCxcclxuICAgICAgICAgIHBlZXJOYW1lLFxyXG4gICAgICAgICAgY2hhdElkLFxyXG4gICAgICAgICAgYXZhaWxhYmlsaXR5LFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGZyb21QZWVyXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gc2V0cyBuZXcgbWFpbiBjb21wb25lbnQgZGl2IGVsZW1lbnRcclxuICAgICAgICB0aGlzLmNoYXRNc2dzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICBcIi5jaGF0LW1zZy1saXN0XCJcclxuICAgICAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGUgPT09IFwidXNlclwiKSBHcm91cENvbXBvbmVudC5nZXRJbnN0YW5jZShwZWVySWQsIHR5cGUsIHRydWUpO1xyXG5cclxuICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuY2hhdE1zZ3NMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfTtcclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhdmFpbGFibGUgTWVzc2FnZUxpc3RDb21wb25lbnQgaW5zdGFuY2UgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdCA9ICgpOiBNZXNzYWdlc0xpc3RDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IEdlblV0aWwgfSBmcm9tIFwiLi4vdXRpbC9nZW4udXRpbFwiO1xyXG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gXCIuLi91dGlsL2FzeW5jV3JhcC51dGlsXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvbi51dGlsXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcFwiO1xyXG5pbXBvcnQgeyBodHRwR2V0R3JvdXAgfSBmcm9tIFwiLi4vaG9va3MvcmVxdWVzdHMuaG9va1wiO1xyXG5pbXBvcnQgeyBpSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9odHRwLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlWYWxpZGl0eVR5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL3ZhbGlkaXR5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IFNvY2tldE1ldGhvZHMgfSBmcm9tIFwiLi4vdXRpbC9zb2NrZXQudXRpbFwiO1xyXG5pbXBvcnQgeyBFcnJvckNvbXBvbmVudCBhcyBlcnJvciB9IGZyb20gXCIuL2Vycm9yLmNvbXBcIjtcclxuaW1wb3J0IHsgaUNoYXRUeXBlLCBpUmVxdWVzdEJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2dlbi5tb2RlbFwiO1xyXG5pbXBvcnQge1xyXG4gIGlSZWxhdGlvbixcclxuICBpUmVxdWVzdCxcclxuICBpUmVxdWVzdEFjdGlvbnMsXHJcbiAgcmVxdWVzdEFjdGlvbnMsXHJcbn0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBob2xkcyBmdW5jdGlvbnMgd2hpY2ggbWFuYWdlIGFuZCByZW5kZXIgZGF0YSByZWxhdGVkIHRvIHRoZSB1c2VyIGFuZCB0aGVpciBwZWVyKHMpJyBtZXNzYWdlIG9wdGlvbnMgYW5kIGl0cyBpdGVtcy5cclxuICpcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PFxyXG4gIEhUTUxEaXZFbGVtZW50LFxyXG4gIEhUTUxFbGVtZW50XHJcbj4ge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQgfCBudWxsO1xyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRNc2dzT3B0czogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBtc2dPcHRzTWVtYmVyc2hpcCE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIG1zZ09wdHNJbmNvbWluZ1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIG1zZ09wdHNPdXRnb2luZ1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIG1zZ09wdHNBZG1pbnNnV3JhcDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgbXNnT3B0c01lbWJlcnNXcmFwOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgLyoqIEFycmF5IG9mIEhUTUwgZGl2IGVsZW1lbnRzIGNvbnRhaW5pbmcgY2xpY2thYmxlIGV2ZW50cy4gKi9cclxuICBwcml2YXRlIG1zZ09wdHNIZWFkcyE6IEhUTUxEaXZFbGVtZW50W107XHJcblxyXG4gIC8qKiBHcm91cCBkYXRhIGZyb20gSWQsIG5hbWUsIHJlcXVlc3RzLCAmIHJlbGF0aW9ucy4gKi9cclxuICBwcml2YXRlIG1zZ0dycEluZm8hOiB7XHJcbiAgICBhY2NudF9uYW1lOiBzdHJpbmc7XHJcbiAgICBhY2NudF9pZDogc3RyaW5nO1xyXG4gICAgcHJpdmFjeTogYm9vbGVhbjtcclxuICAgIHJlcXVlc3RzOiB7XHJcbiAgICAgIGluY29taW5nOiBpUmVxdWVzdFtdO1xyXG4gICAgICBvdXRnb2luZzogaVJlcXVlc3RbXTtcclxuICAgIH07XHJcbiAgICByZWxhdGlvbnM6IGlSZWxhdGlvbltdO1xyXG4gIH07XHJcbiAgLyoqIENoYXQgVHlwZSBvZiB0aGUgdGFyZ2V0IHBlZXIuICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgc1R5cGU6IGlDaGF0VHlwZTtcclxuICAvKiogQ2hhdCBJRCBiZXR3ZWVuIHRoZSB1c2VyICYgdGhlIHRhcmdldCBwZWVyKHMpIGNoYXQgZGF0YS4gKi9cclxuICBwcml2YXRlIHN0YXRpYyBzQ2hhdElkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gaW5zdGFudGlhdGlvbiwgaWYgdGhlIHBlZXIgdHlwZSBpcyAnZ3JvdXAnLCB0aGUgY29uc3RydWN0b3Igd2lsbCBjYWxsIGZvciB0aGUgZ3JvdXAgZGF0YS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGUgLSBjaGF0IHR5cGUgb2YgdGhlIHVzZXIncyB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gYXZhaWxhYmlsaXR5IC0gYXZhaWxhYmlsaXR5IHNldHRpbmcgb2YgdGhlIHVzZXIgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGZyb21QZWVyIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIHRhcmdldCBpcyBmcm9tIHRoZSBwZWVyIGxpc3RcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBlZXJJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwZWVyTmFtZTogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjaGF0SWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZTogaUNoYXRUeXBlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhdmFpbGFiaWxpdHk6IGJvb2xlYW4sXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZyb21QZWVyOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcIi5jaGF0LW1zZ3NcIiwgXCJtc2dzLW9wdHMtdGVtcFwiLCBcImFmdGVyYmVnaW5cIik7XHJcbiAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIgJiYgdGhpcy5mcm9tUGVlcikgYXdhaXQgdGhpcy5nZXRHcm91cChwZWVySWQpO1xyXG5cclxuICAgICAgdGhpcy5jb25maWd1cmVDb21wb25lbnQoKTtcclxuICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoKTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuc1R5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuc0NoYXRJZCA9IHRoaXMuY2hhdElkO1xyXG5cclxuICAgIE9iamVjdC5mcmVlemUoTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LnNUeXBlKTtcclxuICAgIE9iamVjdC5mcmVlemUoTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LnNDaGF0SWQpO1xyXG5cclxuICAgIHRoaXMubXNnT3B0c0hlYWRzID0gW1xyXG4gICAgICAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoYXQtbXNnLW9wdHMtaGVhZFwiKSxcclxuICAgIF0hIGFzIEhUTUxEaXZFbGVtZW50W107XHJcbiAgICB0aGlzLm1zZ09wdHNNZW1iZXJzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjY2hhdC1tc2ctb3B0cy1tZW1iZXJzaGlwc1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5tc2dPcHRzSW5jb21pbmdXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctb3B0cy1pbmNvbWluZy13cmFwXCJcclxuICAgICkgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQubXNnT3B0c091dGdvaW5nV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLW9wdHMtb3V0Z29pbmctd3JhcFwiXHJcbiAgICApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50Lm1zZ09wdHNBZG1pbnNnV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLW9wdHMtYWRtaW5zLXdyYXBcIlxyXG4gICAgKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5tc2dPcHRzTWVtYmVyc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1vcHRzLW1lbWJlcnMtd3JhcFwiXHJcbiAgICApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIilcclxuICAgICAgdGhpcy5tc2dPcHRzTWVtYmVyc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0dyb3VwUmVxdWVzdCk7XHJcblxyXG4gICAgdGhpcy5jaGF0VG9nZ2xlVXNlclNlY3Rpb24oKTtcclxuICB9XHJcbiAgcmVuZGVyQ29tcG9uZW50KCk6IHZvaWQge1xyXG4gICAgY29uc3QgbXNnT3B0c0hUTUwgPSBbLi4udGhpcy53cmFwcGVyRWxlbWVudC5jaGlsZHJlbl1bMF07XHJcblxyXG4gICAgaWYgKHRoaXMuZnJvbVBlZXIgJiYgdGhpcy50eXBlID09PSBcInVzZXJcIikge1xyXG4gICAgICBtc2dPcHRzSFRNTC5pbm5lckhUTUwgPSBcIkNoYXQgc2V0dGluZ3MgaXMgb25seSBhdmFpbGFibGUgZm9yIGdyb3VwIGNoYXRzXCI7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuZnJvbVBlZXIpIHtcclxuICAgICAgbXNnT3B0c0hUTUwuaW5uZXJIVE1MID1cclxuICAgICAgICBcIkNoYXQgc2V0dGluZ3MgaXMgb25seSBhdmFpbGFibGUgZm9yIHJlbGF0ZWQgcGVlcnNcIjtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVSZXF1ZXN0cygpO1xyXG4gICAgdGhpcy5nZW5lcmF0ZUFkbWlucygpO1xyXG4gICAgdGhpcy5nZW5lcmF0ZU1lbWJlcnMoKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLSBHRVQgfCBTRVQgLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0TXNnT3B0c0luY29taW5nV3JhcCA9ICgpOiBIVE1MRGl2RWxlbWVudCA9PiB7XHJcbiAgICByZXR1cm4gdGhpcy5tc2dPcHRzSW5jb21pbmdXcmFwO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldE1zZ09wdHNPdXRnb2luZ1dyYXAgPSAoKTogSFRNTERpdkVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubXNnT3B0c091dGdvaW5nV3JhcDtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRNc2dPcHRzQWRtaW5zZ1dyYXAgPSAoKTogSFRNTERpdkVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubXNnT3B0c0FkbWluc2dXcmFwO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldE1zZ09wdHNNZW1iZXJzV3JhcCA9ICgpOiBIVE1MRGl2RWxlbWVudCA9PiB7XHJcbiAgICByZXR1cm4gdGhpcy5tc2dPcHRzTWVtYmVyc1dyYXA7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLSBFVkVOVCBIQU5ETEVSUyAtLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byBtZXNzYWdlIG9wdGlvbiBoZWFkIGVsZW1lbnRzLlxyXG4gICAqXHJcbiAgICogQGZpcmVzIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNoYXRUb2dnbGVVc2VyU2VjdGlvbiA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMubXNnT3B0c0hlYWRzLmZvckVhY2goKGhlYWQ6IEhUTUxEaXZFbGVtZW50KSA9PiB7XHJcbiAgICAgIGhlYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tNc2dPcHRzU2VjdGlvbkhhbmRsZXIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBjYWxsYmFjayBsaXN0ZW5zIHRvIGNsaWNrIGV2ZW50cyB3aGljaCB3aWxsIHRvZ2dsZSB2aXNpYmlsaXR5IG9mIHNwZWNpZmljIG1lc3NhZ2Ugb3B0aW9uIHNlY3Rpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrTXNnT3B0c1NlY3Rpb25IYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGhlYWRJY29uOiBIVE1MRWxlbWVudCA9IChcclxuICAgICAgZS50YXJnZXQgYXMgSFRNTEhlYWRpbmdFbGVtZW50XHJcbiAgICApLnF1ZXJ5U2VsZWN0b3IoXCJpXCIpISBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGhlYWRTaWJsaW5nOiBIVE1MRWxlbWVudCA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudClcclxuICAgICAgLm5leHRFbGVtZW50U2libGluZyEgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaGVhZEljb24uY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtbXNnLW9wdHMtaGVhZC10b2dnbGVkXCIpO1xyXG4gICAgaGVhZFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtbXNnLW9wdHMtY29udGVudC10b2dnbGVcIik7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBjYWxsYmFjayBsaXN0ZW5zIHRvIGNsaWNrIGV2ZW50cyB3aGljaCB3aWxsIGVtaXQgYSBzb2NrZXQgZXZlbnQgdG8gdGhlIHNlcnZlciB0byByZXNwb25kIHRvIHBlZXIgcmVxdWVzdHMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tHcm91cFJlcXVlc3QgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgcmVxQm9keSA9IHRoaXMuY3JlYXRlUmVxdWVzdEJvZHkoXHJcbiAgICAgIHRoaXMucGVlcklkLFxyXG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8uZGF0YXNldC51c2VySWQgYXMgc3RyaW5nXHJcbiAgICApO1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGFyZ2V0LmRhdGFzZXQucmVxdWVzdEFjdGlvbiBhcyBpUmVxdWVzdEFjdGlvbnM7XHJcblxyXG4gICAgaWYgKCFhY3Rpb24pIHJldHVybjtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCByZXF1ZXN0VmFsaWQgPSBWYWxpZGF0ZS5wYXRjaFJlcXVlc3REYXRhKHJlcUJvZHksIGFjdGlvbik7XHJcbiAgICBpZiAoIXJlcXVlc3RWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IGNsaWVudCBkYXRhIGZvciBncm91cCByZXF1ZXN0IGFjdGlvbiBpcyBpbnZhbGlkYCxcclxuICAgICAgICByZXF1ZXN0VmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTT0NLRVQgUkVRVUVTVFxyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyZXF1ZXN0LWFjdGlvblwiKSkge1xyXG4gICAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBhdGNoUmVxdWVzdEV2LCByZXFCb2R5LCBhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJlcXVlc3RzIGFuIEhUVFAgR0VUIHRvIHRoZSBzZXJ2ZXIgdG8gcmV0cmlldmUgZ3JvdXAgZGF0YS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGlkIC0gR3JvdXAgSWRcclxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8dm9pZD4gfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZ2V0R3JvdXAgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldEdyb3VwLCBpZCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gZmV0Y2ggZ3JvdXAgZGF0YVwiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGVycm9yIG9jY3VyZWRgLFxyXG4gICAgICBgY2xpZW50IHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIGZvciB1cG9uIHJlcXVlc3QgZm9yIGdyb3VwIGluZm9ybWF0aW9uYFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgdGhpcy5tc2dHcnBJbmZvID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb246XHJcbiAgICogLSBzZW5kcyByZXRyaWV2ZWQgR3JvdXAgRGF0YSBSZXF1ZXN0cyB0byBhbiBIVE1MIGVsZW1lbnRzIHRyYW5zZm9ybWluZyBmdW5jdGlvblxyXG4gICAqIC0gZGVjaWRlcyB0eXBlIG9mIHJlbmRpdGlvblxyXG4gICAqIC0gJiB3aGVyZSB0byBhdHRhY2ggcmVxdWVzdCByZW5kaXRpb25zIHdpdGhpbiBNZXNzYWdlIE9wdGlvbnMgUmVxdWVzdCBTZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZVJlcXVlc3RzKCk6IHZvaWQge1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5tc2dHcnBJbmZvIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLm1zZ0dycEluZm8gIT09IFwib2JqZWN0XCIgfHxcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5tc2dHcnBJbmZvKS5sZW5ndGggPCAxXHJcbiAgICApXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBpbmNvbWluZyA9IHRoaXMubXNnR3JwSW5mby5yZXF1ZXN0cy5pbmNvbWluZztcclxuICAgIGNvbnN0IG91dGdvaW5nID0gdGhpcy5tc2dHcnBJbmZvLnJlcXVlc3RzLm91dGdvaW5nO1xyXG5cclxuICAgIGxldCBpdGVtOiBpUmVxdWVzdDtcclxuXHJcbiAgICBmb3IgKGl0ZW0gb2YgaW5jb21pbmcpIHtcclxuICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmNyZWF0ZVJlcXVlc3QoXHJcbiAgICAgICAgaXRlbSxcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c0luY29taW5nV3JhcCgpLFxyXG4gICAgICAgIFwiaW5jb21pbmdcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaXRlbSBvZiBvdXRnb2luZykge1xyXG4gICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuY3JlYXRlUmVxdWVzdChcclxuICAgICAgICBpdGVtLFxyXG4gICAgICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRNc2dPcHRzT3V0Z29pbmdXcmFwKCksXHJcbiAgICAgICAgXCJvdXRnb2luZ1wiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSByZW5kZXJzIGdyb3VwIHJlcXVlc3QgZGF0YSB0byBhbiBIVE1MIGVsZW1lbnQgYW5kXHJcbiAgICogLSBhdHRhY2ggcmVxdWVzdCByZW5kaXRpb25zIHdpdGhpbiBNZXNzYWdlIE9wdGlvbnMgUmVxdWVzdCBTZWN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVxdWVzdCB9IGl0ZW0gLSBncm91cCByZXF1ZXN0IGl0ZW1cclxuICAgKiBAcGFyYW0geyBIVE1MRGl2RWxlbWVudCB9IHdyYXBwZXJcclxuICAgKiBAcGFyYW0geyBcImluY29taW5nXCIgfCBcIm91dGdvaW5nXCIgfSB0eXBlIC0gcmVxdWVzdCByZW5kaXRpb24gc2VjdGlvbiBpbmRpY2F0b3JcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBjaGF0SWQgLSB1c2VkIHRvIHZlcmlmeSBvZiB0aGUgcmVxdWVzdCBpdGVtIGJlbG9uZ3MgdG8gYSB1c2VyXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZVJlcXVlc3QgPSAoXHJcbiAgICBpdGVtOiBpUmVxdWVzdCxcclxuICAgIHdyYXBwZXI6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgdHlwZTogXCJpbmNvbWluZ1wiIHwgXCJvdXRnb2luZ1wiLFxyXG4gICAgY2hhdElkPzogc3RyaW5nXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICBpdGVtID0gR2VuVXRpbC5yZXF1ZXN0U3RySW50VG9Cb29sKGl0ZW0pIGFzIGlSZXF1ZXN0O1xyXG5cclxuICAgIGlmIChjaGF0SWQgIT09IHVuZGVmaW5lZClcclxuICAgICAgaWYgKHRoaXMuc1R5cGUgPT09IFwidXNlclwiIHx8IHRoaXMuc0NoYXRJZCAhPT0gY2hhdElkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdFZhbGlkOiBpVmFsaWRpdHlUeXBlID0gVmFsaWRhdGUucmVxdWVzdEl0ZW0oXHJcbiAgICAgIGl0ZW0sXHJcbiAgICAgIHdyYXBwZXIsXHJcbiAgICAgIHR5cGVcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFyZXF1ZXN0VmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogUmVxdWVzdCBpdGVtIGRhdGEgaXMgaW52YWxpZFwiLFxyXG4gICAgICAgIHJlcXVlc3RWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICBjb25zdCBpdGVtQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgbGV0IGl0ZW1DYW5jZWwhOiBIVE1MRWxlbWVudDtcclxuICAgIGxldCBpdGVtQXBwcm92ZSE6IEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGl0ZW1SZWplY3QhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gXCJvdXRnb2luZ1wiKSB7XHJcbiAgICAgIGl0ZW1DYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgIGl0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LW1zZy1vcHRzLW91dGdvaW5nLWl0ZW1cIik7XHJcbiAgICAgIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gaXRlbS5hY2NudF9uYW1lO1xyXG4gICAgICBpdGVtQ2FuY2VsLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXhtYXJrXCIsIFwicmVxdWVzdC1hY3Rpb25cIik7XHJcbiAgICAgIGl0ZW1DYW5jZWwuZGF0YXNldC5yZXF1ZXN0QWN0aW9uID0gcmVxdWVzdEFjdGlvbnMuY2FuY2VsO1xyXG5cclxuICAgICAgaXRlbUFjdGlvbnMuYXBwZW5kQ2hpbGQoaXRlbUNhbmNlbCk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiaW5jb21pbmdcIikge1xyXG4gICAgICBpdGVtQXBwcm92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBpdGVtUmVqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgICBpdGVtV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1tc2ctb3B0cy1pbmNvbWluZy1pdGVtXCIpO1xyXG4gICAgICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IGl0ZW0uYWNjbnRfbmFtZTtcclxuICAgICAgaXRlbUFwcHJvdmUuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtY2hlY2tcIiwgXCJyZXF1ZXN0LWFjdGlvblwiKTtcclxuICAgICAgaXRlbUFwcHJvdmUuZGF0YXNldC5yZXF1ZXN0QWN0aW9uID0gcmVxdWVzdEFjdGlvbnMuYXBwcm92ZTtcclxuICAgICAgaXRlbVJlamVjdC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS14bWFya1wiLCBcInJlcXVlc3QtYWN0aW9uXCIpO1xyXG4gICAgICBpdGVtUmVqZWN0LmRhdGFzZXQucmVxdWVzdEFjdGlvbiA9IHJlcXVlc3RBY3Rpb25zLnJlamVjdDtcclxuXHJcbiAgICAgIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGl0ZW1BcHByb3ZlKTtcclxuICAgICAgaXRlbUFjdGlvbnMuYXBwZW5kQ2hpbGQoaXRlbVJlamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVdyYXAuZGF0YXNldC51c2VySWQgPSBpdGVtLmFjY250X2lkO1xyXG4gICAgaXRlbVdyYXAuZGF0YXNldC5pc0dyb3VwID0gaXRlbS5pc0dyb3VwID8gYHRydWVgIDogYGZhbHNlYDtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1BY3Rpb25zKTtcclxuXHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGl0ZW1XcmFwKTtcclxuXHJcbiAgICAvLyBIVE1MIFRFTVBMQVRFIC0gaW5jb21pbmcgcmVxdWVzdCBpdGVtXHJcbiAgICAvLyA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1vcHRzLWluY29taW5nLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5pbmNvbWluZyBtZW1iZXIgcmVxdWVzdDwvcD5cclxuICAgIC8vICAgPHA+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLWNoZWNrJz48L2k+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLXhtYXJrJz48L2k+XHJcbiAgICAvLyAgIDwvcD5cclxuICAgIC8vIDwvZGl2PjtcclxuXHJcbiAgICAvLyBIVE1MIFRFTVBMQVRFIC0gb3V0Z29pbmcgcmVxdWVzdCBpdGVtXHJcbiAgICAvLyA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1vcHRzLW91dGdvaW5nLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5vdXRnb2luZyBtZW1iZXIgcmVxdWVzdDwvcD5cclxuICAgIC8vICAgPHA+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLXhtYXJrJz48L2k+XHJcbiAgICAvLyAgIDwvcD5cclxuICAgIC8vIDwvZGl2PjtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBmZWVkcyBhcnJheSBvZiBncm91cCBhZG1pbnMgZGF0YSBIVE1MIGVsZW1lbnRzIHJlbmRlcmluZyBmdW5jdGlvbiBjb3JyZXNwb25kaW5nIHRvIGdyb3VwIGFkbWlucy4gKi9cclxuICBwcml2YXRlIGdlbmVyYXRlQWRtaW5zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgYWRtaW5zID0gdGhpcy5tc2dHcnBJbmZvLnJlbGF0aW9ucyBhcyBpUmVsYXRpb25bXTtcclxuICAgIGxldCBhZG1pbjogaVJlbGF0aW9uO1xyXG5cclxuICAgIGZvciAoYWRtaW4gb2YgYWRtaW5zKSB7XHJcbiAgICAgIGFkbWluID0gR2VuVXRpbC5yZWxhdGlvblN0ckludFRvQm9vbChhZG1pbik7XHJcbiAgICAgIGlmICghYWRtaW4uYWRtaW4pIGNvbnRpbnVlO1xyXG5cclxuICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmNyZWF0ZUFkbWluKFxyXG4gICAgICAgIGFkbWluLFxyXG4gICAgICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRNc2dPcHRzQWRtaW5zZ1dyYXAoKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB0cmFuc2Zvcm1zIGdyb3VwIGFkbWluIHJlbGF0aW9uIG9iamVjdHMgaW50byBhIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50IGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgTWVzc2FnZSBPcHRpb24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVsYXRpb24gfSBpdGVtIC0gZ3JvdXAgcmVsYXRpb24gaXRlbSBmb3IgYWRtaW5zXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZUFkbWluID0gKFxyXG4gICAgaXRlbTogaVJlbGF0aW9uLFxyXG4gICAgd3JhcDogSFRNTERpdkVsZW1lbnRcclxuICApOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGl0ZW1XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGl0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LW1zZy1vcHRzLWFkbWluLWl0ZW1cIik7XHJcblxyXG4gICAgY29uc3QgaXRlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gaXRlbS5hY2NudF9uYW1lO1xyXG5cclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoaXRlbVdyYXApO1xyXG5cclxuICAgIC8vIEhUTUwgVEVNUExBVEUgLSBhZG1pbiBpdGVtXHJcbiAgICAvLyA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1vcHRzLWFkbWluLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5hZG1pbiBuYW1lPC9wPlxyXG4gICAgLy8gPC9kaXY+O1xyXG4gIH07XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGZlZWRzIGFycmF5IG9mIGdyb3VwIG1lbWJlcnMgZGF0YSBIVE1MIGVsZW1lbnRzIHJlbmRlcmluZyBmdW5jdGlvbiBjb3JyZXNwb25kaW5nIHRvIGdyb3VwIG1lbWJlcnMuICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZU1lbWJlcnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBtZW1iZXJzID0gdGhpcy5tc2dHcnBJbmZvLnJlbGF0aW9ucyBhcyBpUmVsYXRpb25bXTtcclxuICAgIGxldCBtZW1iZXI6IGlSZWxhdGlvbjtcclxuXHJcbiAgICBmb3IgKG1lbWJlciBvZiBtZW1iZXJzKSB7XHJcbiAgICAgIG1lbWJlciA9IEdlblV0aWwucmVsYXRpb25TdHJJbnRUb0Jvb2wobWVtYmVyKTtcclxuICAgICAgaWYgKG1lbWJlci5hZG1pbikgY29udGludWU7XHJcblxyXG4gICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuY3JlYXRlTWVtYmVyKFxyXG4gICAgICAgIG1lbWJlcixcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c01lbWJlcnNXcmFwKClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gdHJhbnNmb3JtcyBncm91cCBtZW1iZXIgcmVsYXRpb24gb2JqZWN0cyBpbnRvIGEgY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnQgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBNZXNzYWdlIE9wdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlSZWxhdGlvbiB9IGl0ZW0gLSBncm91cCByZWxhdGlvbiBpdGVtIGZvciBub24tYWRtaW5zXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZU1lbWJlciA9IChcclxuICAgIGl0ZW06IGlSZWxhdGlvbixcclxuICAgIHdyYXA6IEhUTUxEaXZFbGVtZW50XHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBpdGVtV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpdGVtV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1tc2ctb3B0cy1tZW1iZXItaXRlbVwiKTtcclxuXHJcbiAgICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpdGVtLmFjY250X25hbWU7XHJcblxyXG4gICAgY29uc3QgaXRlbUFjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGNvbnN0IGlBZG1pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaUFkbWluLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLWNyb3duXCIpO1xyXG4gICAgY29uc3QgaU11dGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlNdXRlLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLWNvbW1lbnQtc2xhc2hcIik7XHJcbiAgICBjb25zdCBpQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlCbG9jay5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS11c2VyLXNsYXNoXCIpO1xyXG5cclxuICAgIC8vIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGlNdXRlKTtcclxuICAgIC8vIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGlCbG9jayk7XHJcbiAgICBpdGVtQWN0aW9ucy5hcHBlbmRDaGlsZChpQWRtaW4pO1xyXG5cclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1BY3Rpb25zKTtcclxuXHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGl0ZW1XcmFwKTtcclxuXHJcbiAgICAvLyBIVE1MIFRFTVBMQVRFID0gbWVtYmVyIGl0ZW1cclxuICAgIC8vIDxkaXYgY2xhc3M9J2NoYXQtbXNnLW9wdHMtbWVtYmVyLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5tZW1iZXIgbmFtZTwvcD5cclxuICAgIC8vICAgPHA+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLWNyb3duJz48L2k+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLWNvbW1lbnQtc2xhc2gnPjwvaT5cclxuICAgIC8vICAgICA8aSBjbGFzcz0nZmEtc29saWQgZmEtdXNlci1zbGFzaCc+PC9pPlxyXG4gICAgLy8gICA8L3A+XHJcbiAgICAvLyA8L2Rpdj47XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIG9iamVjdCB3aGljaCB3aWxsIGJlIHNlbnQgdG8gdGhlIHNlcnZlciB0byBhY3QgdXBvbiBhIHNwZWNpZmljIHBlbmRpbmcgZ3JvdXAtdG8tdXNlciByZXF1ZXN0IG9mIHRoZSBncm91cFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gZ3JvdXBJZCAtIGdyb3VwIGlkIG9mIHRoZSBjdXJyZW50IG1lc3NhZ2UgY29tcG9uZW50IGluc3RhbmNlXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcmVjZWl2ZXJJZCAtIHRhcmdldCB1c2VyLCByZWNpcGllbnQgb2YgdGhlIHJlcXVlc3QgcmVzcG9uc2VcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlUmVxdWVzdEJvZHkoZ3JvdXBJZDogc3RyaW5nLCByZWNlaXZlcklkOiBzdHJpbmcpOiBpUmVxdWVzdEJvZHkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogMyxcclxuICAgICAgcmVjaXBpZW50SWQ6IHJlY2VpdmVySWQsXHJcbiAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBkZWxldGVzIGEgY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnQgb2YgYSBtZXNzYWdlIG9wdGlvbiBjb21wIHJlcXVlc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSByZXF1ZXN0SXRlbUlkXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gY2hhdElkXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGRlbGV0ZVJlcXVlc3QgPSAoXHJcbiAgICByZXF1ZXN0SXRlbUlkOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZ1xyXG4gICk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHRoaXMuc1R5cGUgPT09IFwidXNlclwiIHx8IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5zQ2hhdElkICE9PSBjaGF0SWQpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAoXHJcbiAgICAgIFtcclxuICAgICAgICAuLi5NZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c091dGdvaW5nV3JhcCgpLmNoaWxkcmVuLFxyXG4gICAgICBdIGFzIEhUTUxEaXZFbGVtZW50W11cclxuICAgICkuZm9yRWFjaCgoaHRtbDogSFRNTERpdkVsZW1lbnQpID0+IHtcclxuICAgICAgaWYgKGh0bWwuZGF0YXNldC51c2VySWQgPT09IHJlcXVlc3RJdGVtSWQpXHJcbiAgICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmdldE1zZ09wdHNPdXRnb2luZ1dyYXAoKS5yZW1vdmVDaGlsZChodG1sKTtcclxuICAgIH0pO1xyXG5cclxuICAgIChcclxuICAgICAgW1xyXG4gICAgICAgIC4uLk1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRNc2dPcHRzSW5jb21pbmdXcmFwKCkuY2hpbGRyZW4sXHJcbiAgICAgIF0gYXMgSFRNTERpdkVsZW1lbnRbXVxyXG4gICAgKS5mb3JFYWNoKChodG1sOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoaHRtbC5kYXRhc2V0LnVzZXJJZCA9PT0gcmVxdWVzdEl0ZW1JZClcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c0luY29taW5nV3JhcCgpLnJlbW92ZUNoaWxkKGh0bWwpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBlaXRoZXI6XHJcbiAgICogLSBjYWxscyBmb3IgYSBuZXcgaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAqIC0gZGVsZXRlIHRoZSBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGFuZCBhbGwgcmVsYXRlZCBkYXRhIHdpdGhpblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcGVlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJOYW1lIC0gYWNjb3VudCBuYW1lIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0IGNvbm5lY3RlZCBwZWVyXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gY2hhdElkIC0gY2hhdCBpZCBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlciB8IGdyb3VwXHJcbiAgICogQHBhcmFtIHsgaUNoYXRUeXBlIH0gdHlwZSAtIGNoYXQgdHlwZSBvZiB0aGUgdXNlcidzIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSBhdmFpbGFiaWxpdHkgc2V0dGluZyBvZiB0aGUgdXNlciB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZnJvbVBlZXIgLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgdGFyZ2V0IGlzIGZyb20gdGhlIHBlZXIgbGlzdFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBkZWxldGVJbnN0YW5jZSAtIGZsYWcgaW5kaWNhdGluZyBpZiB1c2VyIHRhcmdldCBjb21wIGlzIHRvIGJlIGRlbGV0ZWRcclxuICAgKiBAcmV0dXJucyB7IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudCB8IG51bGwgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9IChcclxuICAgIHBlZXJJZDogc3RyaW5nLFxyXG4gICAgcGVlck5hbWU6IHN0cmluZyxcclxuICAgIGNoYXRJZDogc3RyaW5nLFxyXG4gICAgdHlwZTogaUNoYXRUeXBlLFxyXG4gICAgYXZhaWxhYmlsaXR5OiBib29sZWFuLFxyXG4gICAgZnJvbVBlZXI6IGJvb2xlYW4sXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhblxyXG4gICk6IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCFkZWxldGVJbnN0YW5jZSkge1xyXG4gICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudChcclxuICAgICAgICAgIHBlZXJJZCxcclxuICAgICAgICAgIHBlZXJOYW1lLFxyXG4gICAgICAgICAgY2hhdElkLFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGF2YWlsYWJpbGl0eSxcclxuICAgICAgICAgIGZyb21QZWVyXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGF0TXNnc09wdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgXCIuY2hhdC1tc2ctb3B0c1wiXHJcbiAgICAgICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmNoYXRNc2dzT3B0cy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBHZW5VdGlsIH0gZnJvbSBcIi4uL3V0aWwvZ2VuLnV0aWxcIjtcclxuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tIFwiLi4vdXRpbC9hc3luY1dyYXAudXRpbFwiO1xyXG5pbXBvcnQgeyBpTXNnQm9keSB9IGZyb20gXCIuLi9tb2RlbHMvbXNnTGlzdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZSB9IGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb24udXRpbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLmNvbXBcIjtcclxuaW1wb3J0IHsgVXNlckNvbXBvbmVudCB9IGZyb20gXCIuL3VzZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBTb2NrZXRNZXRob2RzIH0gZnJvbSBcIi4uL3V0aWwvc29ja2V0LnV0aWxcIjtcclxuaW1wb3J0IHsgaUh0dHBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaHR0cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpVmFsaWRpdHlUeXBlIH0gZnJvbSBcIi4uL21vZGVscy92YWxpZGl0eS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHcm91cENvbXBvbmVudCB9IGZyb20gXCIuL2dyb3VwLmNvbXBcIjtcclxuaW1wb3J0IHsgTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tIFwiLi9tc2dzLmNvbXBcIjtcclxuaW1wb3J0IHsgaUNoYXRUeXBlLCBpUmVsQm9keSB9IGZyb20gXCIuLi9tb2RlbHMvZ2VuLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlSZWxhdGlvbiwgaVVzZXJPYmogfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgYXMgZXJyb3IgfSBmcm9tIFwiLi9lcnJvci5jb21wXCI7XHJcbmltcG9ydCB7IGh0dHBHZXRUb3BNc2csIGh0dHBHZXRVc2VycyB9IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcbmltcG9ydCB7XHJcbiAgaHR0cFBhdGNoUmVsYXRpb24sXHJcbiAgaHR0cEdldFVzZXJSZWxhdGlvbnMsXHJcbn0gZnJvbSBcIi4uL2hvb2tzL3JlcXVlc3RzLmhvb2tcIjtcclxuaW1wb3J0IHtcclxuICBjaGF0VHlwZSxcclxuICBjb250YWN0QWN0LFxyXG4gIGlTZWFyY2hJdGVtLFxyXG4gIGlSZWxhdGlvbkFjdCxcclxuICBpU2VhcmNoSXRlbXMsXHJcbiAgaVNlYXJjaFZhbHVlcyxcclxufSBmcm9tIFwiLi4vbW9kZWxzL3BlZXIubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGhvbGRzIGZ1bmN0aW9ucyB3aGljaCBtYW5hZ2UgYW5kIHJlbmRlciBkYXRhIHJlbGF0ZWQgdG8gdGhlIHVzZXIgcGVlcihzKScgYW5kIGl0cyBkYXRhIGFuZCBIVE1MIGl0ZW1zLlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQZWVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4ge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQZWVyQ29tcG9uZW50IHwgbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBjaGF0VXNlcldyYXAhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyVG9nZ2xlITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0UGVlckhlYWRpbmdzITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0UGVlckxpc3RzITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0U2VhcmNoRm9ybSE6IEhUTUxGb3JtRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRSZW1vdmVTZWFyY2ghOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRTZWFyY2hUeXBlcyE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFNlYXJjaElucHV0ITogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRTZWFyY2hMaXN0ITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0U2VhcmNoTGlzdFdyYXAhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIHN0YXRpYyBjaGF0UGVlckxpc3Q6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFBlZXJMaXN0V3JhcCE6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAvKiogYXJyYXkgb2YgcGVlciBsaXN0IGl0ZW0gZGF0YSAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRQZWVyUmVsYXRpb25zSW5mbzogQXJyYXk8aVJlbGF0aW9uPiA9IFtdO1xyXG4gIC8qKiBhcnJheSBvZiBwZWVyIGxpc3QgaXRlbSBIVE1MIGVsZW1lbnRzICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY2hhdFBlZXJSZWxhdGlvbnNIVE1MOiBBcnJheTxIVE1MRGl2RWxlbWVudD4gPSBbXTtcclxuXHJcbiAgLyoqIHNraXAgY291bnRlciBmb3IgcGVlciBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHJlbFNraXA6IG51bWJlciA9IDA7XHJcbiAgLyoqIHNraXAgbGltaXQgY29uc3RhbnQgZm9yIHBlZXIgbGlzdCBwYWdpbmF0aW9uIGxvZ2ljICovXHJcbiAgcHJpdmF0ZSByZWxTa2lwQ29uc3Q6IG51bWJlciA9IDE1O1xyXG4gIC8qKiBza2lwIGNvdW50ZXIgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaFNraXA6IG51bWJlciA9IDA7XHJcbiAgLyoqIHNraXAgbGltaXQgY29uc3RhbnQgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaFNraXBDb25zdDogbnVtYmVyID0gMTU7XHJcbiAgLyoqIHNraXAgZnVsbCBpbmRpY2F0b3IgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaEZ1bGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvKiogc2VhcmNoIGl0ZW0gdG90YWwgY291bnQgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaFJlc3VsdHM6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vIEZPUkVJR04gQ09NUE9ORU5UIEVMRU1FTlRcclxuICBwcml2YXRlIGNoYXRBcHAhOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBpbnN0YW50aWF0aW9uLCB0aGUgY29uc3RydWN0b3I6XHJcbiAgICogLSBpbW1lZGlhdGVseSBmZXRjaGVzIGZvciB1c2VyIGNvbm5lY3RlZCBwZWVyc1xyXG4gICAqIC0gcmVuZGVycyBkYXRhIGludG8gY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpVXNlck9iaiB9IHVzZXJEYXRhIC0gc2V0IG9mIGRhdGEgcmV0cmlldmVkIGZyb20gdGhlIHNlcnZlciwgc3BlY2lmaWMgZm9yIHRoZSBsb2dnZWQgdXNlclxyXG4gICAqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHVzZXJEYXRhOiBpVXNlck9iaikge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1wZWVyLXdyYXBcIiwgXCJwZWVyLXRlbXBcIiwgXCJhZnRlcmJlZ2luXCIpO1xyXG5cclxuICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRVc2VyQ29udGFjdHMoKTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZUNvbXBvbmVudCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVuZGVyQ29tcG9uZW50KCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IHVzZXIgcmVsYXRpb25zXCIsXHJcbiAgICAgICAgICBlcnJcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlQ29tcG9uZW50KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGF0VXNlcldyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItd3JhcFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItdG9nZ2xlID4gYnV0dG9uXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0UGVlckhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1saXN0cy1oZWFkXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0UGVlckxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1saXN0c1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXNlYXJjaC1mb3JtXCJcclxuICAgICkhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFJlbW92ZVNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtcmVtb3ZlLXNlYXJjaFwiXHJcbiAgICApISBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFNlYXJjaFR5cGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1zZWFyY2gtdHlwZXNcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBcImNoYXQtc2VhcmNoLWlucHV0XCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1zZWFyY2gtbGlzdFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFNlYXJjaExpc3RXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1zZWFyY2gtbGlzdC13cmFwXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LWNvbnRhY3QtbGlzdFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFBlZXJMaXN0V3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtY29udGFjdC1saXN0LXdyYXBcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5jaGF0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGF0LWFwcFwiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5jaGF0VXNlclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja1VzZXJUb2dnbGVIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFJlbW92ZVNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW1vdmVTZWFyY2hIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrU2VhcmNoSGFuZGxlcik7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5zdWJtaXRTZWFyY2hIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFNlYXJjaEhhbmRsZXIpO1xyXG4gICAgdGhpcy5jaGF0U2VhcmNoVHlwZXMuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLmNsaWNrU2VhcmNoVHlwZXNIYW5kbGVyXHJcbiAgICApO1xyXG4gICAgUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLnRvZ2dsZVBlZXJUb29sdGlwSGFuZGxlclxyXG4gICAgKTtcclxuICAgIHRoaXMuY2hhdFNlYXJjaExpc3RXcmFwLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwic2Nyb2xsXCIsXHJcbiAgICAgIHRoaXMuc2Nyb2xsQm90dG9tU2VhcmNoTGlzdFxyXG4gICAgKTtcclxuICAgIHRoaXMuY2hhdFBlZXJMaXN0V3JhcC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuc2Nyb2xsQm90dG9tUGVlckxpc3QpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnVuZG9FdmVudENsaWNrSGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgdGhpcy51bmRvRXZlbnRLZXlIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3RUb1NvY2tldFJvb21zKCk7XHJcbiAgfVxyXG4gIGFzeW5jIHJlbmRlckNvbXBvbmVudCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuY2hhdFNlYXJjaFR5cGVzXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNoYXQtc2VhcmNoLXR5cGUtdXNlclwiKVxyXG4gICAgICA/LmNsYXNzTGlzdC5hZGQoXCJjaGF0LXNlYXJjaC10eXBlXCIpO1xyXG4gICAgdGhpcy5jaGF0U2VhcmNoVHlwZXMuZGF0YXNldC5jaGF0VHlwZSA9IGNoYXRUeXBlLnVzZXI7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZUNvbnRhY3RJdGVtcygpO1xyXG4gICAgdGhpcy5jcmVhdGVGaXJzdFBlZXJNc2dDb21wKCk7XHJcbiAgICBhd2FpdCB0aGlzLmZldGNoVG9wTXNncygpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLSBFVkVOVCBIQU5ETEVSUyAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgY2FsbGJhY2sgbGlzdGVucyB0byBhIGNsaWNrIGV2ZW50LCB3aGljaCB1cG9uIGRvaW5nIHNvLCBpbnN0cnVjdHMgVUkgdG8gbWFrZSB0aGUgdXNlciBjb21wb25lbnQgdmlzaWJsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGlja1VzZXJUb2dnbGVIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuY2hhdFVzZXJXcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LXVzZXItc2hvd1wiKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uLCB1cG9uIGludm9raW5nLCBtb2RpZmllcyBIVE1MIGxpc3RzJyBDU1MgY2xhc3NlcyB0byBhcHBseSB2aXNpYmlsaXR5IHRvIHBlZXIgbGlzdCBhbG9uZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBbZV1cclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZVNlYXJjaEhhbmRsZXIgPSAoZT86IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuY2hhdFBlZXJIZWFkaW5ncy5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1saXN0cy1zZWFyY2hcIik7XHJcbiAgICB0aGlzLmNoYXRQZWVyTGlzdHMuY2xhc3NMaXN0LnJlbW92ZShcImNoYXQtbGlzdHMtc2VhcmNoXCIpO1xyXG4gICAgdGhpcy5jaGF0U2VhcmNoRm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1zZWFyY2gtZm9ybS1zZWFyY2gtc3RhdGVcIik7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBjaGVja3Mgd2hldGhlciBzZWFyY2ggbGlzdCBpcyB2aXNpYmxlLCB0aGVuIGhpZGVzIGl0IGlmIHNvLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrU2VhcmNoSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAvLyBpZiBzZWFyY2ggbGlzdCBpcyB2aXNpYmxlXHJcbiAgICBpZiAodGhpcy5jaGF0UGVlckhlYWRpbmdzLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtbGlzdHMtc2VhcmNoXCIpKSB7XHJcbiAgICAgIC8vIGlmIHNlYXJjaCBpbnB1dCBoYXMgdmFsdWVcclxuICAgICAgaWYgKCF0aGlzLmNoYXRTZWFyY2hJbnB1dC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVNlYXJjaEhhbmRsZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGF0UGVlckhlYWRpbmdzLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWxpc3RzLXNlYXJjaFwiKTtcclxuICAgICAgdGhpcy5jaGF0UGVlckxpc3RzLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWxpc3RzLXNlYXJjaFwiKTtcclxuICAgICAgdGhpcy5jaGF0U2VhcmNoRm9ybS5jbGFzc0xpc3QuYWRkKFwiY2hhdC1zZWFyY2gtZm9ybS1zZWFyY2gtc3RhdGVcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgc2VhcmNoIGNvbXBvbmVudCBzdW1tYXJ5IG9iamVjdCwgcmVmbGVjdGluZyBvZiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc2VhcmNoIGxpc3QsIHRvIGJlIHVzZWQgaW4gYW4gSFRUUCByZXF1ZXN0LlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBpU2VhcmNoVmFsdWVzIH1cclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGNyZWF0ZVNlYXJjaFJlcU9iaiA9ICgpOiBpU2VhcmNoVmFsdWVzID0+IHtcclxuICAgIGNvbnN0IHNlYXJjaFR5cGU6IGlDaGF0VHlwZSA9IHRoaXMuY2hhdFNlYXJjaFR5cGVzLmRhdGFzZXRcclxuICAgICAgLmNoYXRUeXBlISBhcyBpQ2hhdFR5cGU7XHJcbiAgICBjb25zdCBza2lwOiBudW1iZXIgPSB0aGlzLnNlYXJjaFNraXA7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGF0dGVybjogdGhpcy5jaGF0U2VhcmNoSW5wdXQudmFsdWUudHJpbSgpLFxyXG4gICAgICB0eXBlOiBzZWFyY2hUeXBlID09PSBcInVzZXJcIiA/IDAgOiAxLFxyXG4gICAgICBza2lwOiBza2lwLFxyXG4gICAgICBjbnQ6IHRoaXMuc2VhcmNoUmVzdWx0cyxcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbjpcclxuICAgKiAtIHJlc2V0cyBzZWFyY2ggcmVsYXRlZCB2YXJpYWJsZXNcclxuICAgKiAtIHNlbmRzIHNlYXJjaCByZWxhdGVkIHZhcmlhYmxlcyBmb3IgbmV3IGJhdGNoIG9mIHNlYXJjaCBpdGVtc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgRXZlbnQgfSBlXHJcbiAgICogQHJldHVybnMgeyBQcm9taXNlPHZvaWQ+IH1cclxuICAgKi9cclxuICBwcml2YXRlIHN1Ym1pdFNlYXJjaEhhbmRsZXIgPSBhc3luYyAoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBQUk9DRVNTOiByZXNldCBzZWFyY2ggZGF0YVxyXG4gICAgdGhpcy5zZWFyY2hTa2lwID0gMDtcclxuICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IDA7XHJcbiAgICB0aGlzLnNlYXJjaEZ1bGwgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgY2hhdFNlYXJjaFZhbHVlOiBpU2VhcmNoVmFsdWVzID0gdGhpcy5jcmVhdGVTZWFyY2hSZXFPYmooKTtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCBzZWFyY2hWYWxpZCA9IFZhbGlkYXRlLnNlYXJjaChcclxuICAgICAgY2hhdFNlYXJjaFZhbHVlLFxyXG4gICAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlISBhcyBpQ2hhdFR5cGVcclxuICAgICk7XHJcbiAgICBpZiAoIXNlYXJjaFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IGNsaWVudCBzZWFyY2ggZGF0YSBpcyBpbmF2YWxpZFwiLFxyXG4gICAgICAgIHNlYXJjaFZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYXRTZWFyY2hWYWx1ZS5wYXR0ZXJuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmNoYXRTZWFyY2hMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiByZXR1cm5zXHJcbiAgICBpZiAodGhpcy5zZWFyY2hGdWxsKSByZXR1cm47XHJcblxyXG4gICAgLy8gSFRUUCBSRVFVRVNUXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwR2V0VXNlcnMsIGNoYXRTZWFyY2hWYWx1ZSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IGZvciB1c2VyIHNlYXJjaGAsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgY29uc3QgaHR0cFZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIGBzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgdXNlciBzZWFyY2hgLFxyXG4gICAgICBgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIHVwb24gY2xpZW50J3MgcmVxdWVzdCBmb3IgdXNlciBzZWFyY2hgXHJcbiAgICApO1xyXG4gICAgaWYgKCFodHRwVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyBQUk9DRVNTXHJcbiAgICB0aGlzLmNoYXRTZWFyY2hMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBjb25zdCBzZWFyY2hJdGVtczogaVNlYXJjaEl0ZW1zID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xyXG4gICAgaWYgKFxyXG4gICAgICBzZWFyY2hJdGVtcyAmJlxyXG4gICAgICB0eXBlb2Ygc2VhcmNoSXRlbXMgPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgc2VhcmNoSXRlbXMubGVuZ3RoID4gMFxyXG4gICAgKSB7XHJcbiAgICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB0aGlzLnNlYXJjaFJlc3VsdHMgKyBzZWFyY2hJdGVtcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuc2VhcmNoU2tpcCsrO1xyXG4gICAgICB0aGlzLmdlbmVyYXRlU2VhcmNoSXRlbXMoXHJcbiAgICAgICAgc2VhcmNoSXRlbXMsXHJcbiAgICAgICAgdGhpcy5jaGF0U2VhcmNoVHlwZXMuZGF0YXNldC5jaGF0VHlwZSEgYXMgaUNoYXRUeXBlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWFyY2hJdGVtcy5sZW5ndGggfHwgc2VhcmNoSXRlbXMubGVuZ3RoIDwgdGhpcy5zZWFyY2hTa2lwQ29uc3QpXHJcbiAgICAgIHRoaXMuc2VhcmNoRnVsbCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBzZW5kcyBzZWFyY2ggc3RhdHVzIHN1bW1hcnkgZm9yIG5leHQgYmF0Y2ggb2Ygc2VhcmNoIGl0ZW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgRXZlbnQgfSBlXHJcbiAgICogQHJldHVybnMgeyBQcm9taXNlPHZvaWQ+IH1cclxuICAgKi9cclxuICBwcml2YXRlIHNjcm9sbEJvdHRvbVNlYXJjaExpc3QgPSBhc3luYyAoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmICh0aGlzLnNlYXJjaEZ1bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKHQuc2Nyb2xsVG9wID09PSB0LnNjcm9sbEhlaWdodCAtIHQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICAgIGNvbnN0IGNoYXRTZWFyY2hWYWx1ZTogaVNlYXJjaFZhbHVlcyA9IHRoaXMuY3JlYXRlU2VhcmNoUmVxT2JqKCk7XHJcblxyXG4gICAgICAvLyBWQUxJREFUSU9OXHJcbiAgICAgIGNvbnN0IHNlYXJjaFZhbGlkID0gVmFsaWRhdGUuc2VhcmNoKFxyXG4gICAgICAgIGNoYXRTZWFyY2hWYWx1ZSxcclxuICAgICAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlISBhcyBpQ2hhdFR5cGVcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFzZWFyY2hWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgICAgXCJFUlJPUjogY2xpZW50IHNlYXJjaCBkYXRhIGlzIGluYXZhbGlkXCIsXHJcbiAgICAgICAgICBzZWFyY2hWYWxpZC5lcnJvclxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldFVzZXJzLCBjaGF0U2VhcmNoVmFsdWUpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgICBgRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCBmb3IgdXNlciBzZWFyY2hgLFxyXG4gICAgICAgICAgZXJyXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgICBjb25zdCBodHRwVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICAgIHJlc3BvbnNlLFxyXG4gICAgICAgIGBzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgdXNlciBzZWFyY2hgLFxyXG4gICAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIHNlYXJjaGBcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFodHRwVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIFBST0NFU1NcclxuICAgICAgY29uc3Qgc2VhcmNoSXRlbXM6IGlTZWFyY2hJdGVtcyA9IHJlc3BvbnNlLmRhdGEuZGF0YTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHNlYXJjaEl0ZW1zICYmXHJcbiAgICAgICAgdHlwZW9mIHNlYXJjaEl0ZW1zID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgc2VhcmNoSXRlbXMubGVuZ3RoID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICAvLyBIVFRQIFJFU1BPTlNFIFBST0NFU1NJTkdcclxuICAgICAgICB0aGlzLnNlYXJjaFNraXArKztcclxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB0aGlzLnNlYXJjaFJlc3VsdHMgKyBzZWFyY2hJdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVNlYXJjaEl0ZW1zKFxyXG4gICAgICAgICAgc2VhcmNoSXRlbXMsXHJcbiAgICAgICAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlISBhcyBpQ2hhdFR5cGVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNlYXJjaEl0ZW1zLmxlbmd0aCB8fCBzZWFyY2hJdGVtcy5sZW5ndGggPCB0aGlzLnNlYXJjaFNraXBDb25zdClcclxuICAgICAgICB0aGlzLnNlYXJjaEZ1bGwgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgc2VhcmNoIHR5cGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tTZWFyY2hUeXBlc0hhbmRsZXIgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtc2VhcmNoLXR5cGVcIilcclxuICAgICAgPyB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImNoYXQtc2VhcmNoLXR5cGVcIilcclxuICAgICAgOiBudWxsO1xyXG5cclxuICAgIHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgPyB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nIS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1zZWFyY2gtdHlwZVwiKVxyXG4gICAgICA6IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1zZWFyY2gtdHlwZVwiKTtcclxuXHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImNoYXQtc2VhcmNoLXR5cGVcIik7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlID0gdGFyZ2V0LmRhdGFzZXQuY2hhdFR5cGU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBjYWxscyBmb3IgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIE1lc3NhZ2UgQ29tcG9uZW50LCBjb3JyZXNwb25kaW5nIHRoZSBjbGlja2VkIHBlZXIgfCBnb3J1cCB0YXJnZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tTZWFyY2hJdGVtSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgbGV0IGNoYXRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGxldCBwZWVyRmxhZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm8ubWFwKChyZWw6IGlSZWxhdGlvbikgPT4ge1xyXG4gICAgICBpZiAocmVsLmFjY250X2lkID09PSB0YXJnZXQuZGF0YXNldC51c2VySWQhKSB7XHJcbiAgICAgICAgY2hhdElkID0gcmVsLmNoYXRfaWQ7XHJcbiAgICAgICAgcGVlckZsYWcgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBNZXNzYWdlc0NvbXBvbmVudC5nZXRJbnN0YW5jZShcclxuICAgICAgdGhpcy51c2VyRGF0YS5hY3RfaWQuYWNjbnRfaWQsXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LnVzZXJJZCEsXHJcbiAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKFwiaDNcIikhLnRleHRDb250ZW50ISxcclxuICAgICAgY2hhdElkLFxyXG4gICAgICBwZWVyRmxhZyxcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2hhdFR5cGUgYXMgXCJ1c2VyXCIgfCBcImdyb3VwXCIsXHJcbiAgICAgIGZhbHNlLFxyXG4gICAgICBwZWVyRmxhZ1xyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uIHByb2NlZWRzIHdpdGggYSBsb2dpYyB0byBkZWNpZGUgd2hldGhlciB0aGUgZXZlbnQgY2FuIGluc3RydWN0IHRoZSBQZWVyIENvbXBvbmVudCB0byBoaWRlIHNlYXJjaCBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHVuZG9FdmVudENsaWNrSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAvLyBpZiBjbGlja2VkIGVsZW1lbnQgaXMgbm90IFwiY2hhdC1zZWFyY2gtaW5wdXRcIiBvciBzZWFyY2gtdHlwZXMgYnV0dG9uXHJcbiAgICBpZiAoZS50eXBlID09PSBcImNsaWNrXCIpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGUuYnV0dG9uID09PSAwICYmXHJcbiAgICAgICAgdGFyZ2V0ICE9PSB0aGlzLmNoYXRTZWFyY2hJbnB1dCAmJlxyXG4gICAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hhdC1zZWFyY2gtdHlwZS1ncm91cFwiKSAmJlxyXG4gICAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hhdC1zZWFyY2gtdHlwZS11c2VyXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIC8vIGlmIHNlYXJjaCBoZWFkICYgbGlzdCBhcmUgb3BlblxyXG4gICAgICAgICAgdGhpcy5jaGF0UGVlckhlYWRpbmdzLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtbGlzdHMtc2VhcmNoXCIpICYmXHJcbiAgICAgICAgICAvLyBpZiBzZWFyY2ggaW5wdXQgaGFzIHZhbHVlXHJcbiAgICAgICAgICAhdGhpcy5jaGF0U2VhcmNoSW5wdXQudmFsdWUubGVuZ3RoXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZVNlYXJjaEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uIHByZXZlbnRzIHByZXNzaW5nICdFbnRlcicga2V5IHRvIGhpZGUgc2VhcmNoIGxpc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBLZXlib2FyZEV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgS2V5Ym9hcmRFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5kb0V2ZW50S2V5SGFuZGxlciA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAvLyBpZiAoXHJcbiAgICAvLyAgIGUudHlwZSA9PT0gXCJrZXlwcmVzc1wiICYmXHJcbiAgICAvLyAgIGUua2V5ID09PSBcIkVudGVyXCIgJiZcclxuICAgIC8vICAgdGhpcy5jaGF0QXBwLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtYXBwLXVzZXItc3RhdGVcIilcclxuICAgIC8vIClcclxuICAgIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gY2FsbHMgZm9yIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBNZXNzYWdlIENvbXBvbmVudCwgY29ycmVzcG9uZGluZyB0aGUgY2xpY2tlZCBwZWVyIHwgZ29ydXAgdGFyZ2V0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrUGVlckl0ZW1IYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHRhcmdldCA9IChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLnBhcmVudEVsZW1lbnQhO1xyXG5cclxuICAgIE1lc3NhZ2VzQ29tcG9uZW50LmdldEluc3RhbmNlKFxyXG4gICAgICB0aGlzLnVzZXJEYXRhLmFjdF9pZC5hY2NudF9pZCxcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQudXNlcklkISxcclxuICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKSEudGV4dENvbnRlbnQhLFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jaGF0SWQhLFxyXG4gICAgICB0cnVlLFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jaGF0VHlwZSBhcyBcInVzZXJcIiB8IFwiZ3JvdXBcIixcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBlaXRoZXI6XHJcbiAgICogLSBoaWRlIHZpc2libGUgcGVlciBpdGVtIHRvb2x0aXBcclxuICAgKiAtIHNob3cgYSBwZWVyIGl0ZW0gdG9vbHRpcFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHRvZ2dsZVBlZXJUb29sdGlwSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtY29udGFjdC10b29sdGlwXCIpICYmXHJcbiAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmEtZWxsaXBzaXMtdmVydGljYWxcIilcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8vIGlmIHRhcmdldCBjbGlja2VkIGlzIHRoZSBpY29uIGluc3RlYWQgb2YgdGhlIHRvb2x0aXAgYXJlYSwgY2hhbmdlIHRhcmdldCB0byBwYXJlbnRcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmEtZWxsaXBzaXMtdmVydGljYWxcIikpIHtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aW9uID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtY29udGFjdC10b29sdGlwLWNvbnRlbnRcIlxyXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoYWN0aW9uLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtY29udGFjdC10b29sdGlwLXNob3dcIikpIHtcclxuICAgICAgLy8gcmVtb3ZlIGEgc2luZ2xlIHZpc2libGUgdG9vbHRpcFxyXG4gICAgICBhY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcImNoYXQtY29udGFjdC10b29sdGlwLXNob3dcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhY3Rpb25zID0gW1xyXG4gICAgICAgIC4uLlBlZXJDb21wb25lbnQuY2hhdFBlZXJMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgICAgICBcIi5jaGF0LWNvbnRhY3QtdG9vbHRpcC1jb250ZW50XCJcclxuICAgICAgICApLFxyXG4gICAgICBdIGFzIEFycmF5PEhUTUxEaXZFbGVtZW50PjtcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBhbGwgdmlzaWJsZSB0b29sdGlwXHJcbiAgICAgIGFjdGlvbnMubGVuZ3RoID4gMFxyXG4gICAgICAgID8gYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGF0LWNvbnRhY3QtdG9vbHRpcC1zaG93XCIpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICA6IG51bGw7XHJcblxyXG4gICAgICAvLyBhcHBseSB2aXNpYmlsaXR5IHRvIGNsaWNrZWQgdG9vbHRpcFxyXG4gICAgICBhY3Rpb24uY2xhc3NMaXN0LmFkZChcImNoYXQtY29udGFjdC10b29sdGlwLXNob3dcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvblxyXG4gICAqIC0gcmVxdWVzdHMgYW4gSFRUUCBQQVRDSCB0byB0aGUgc2VydmVyIHRvIG1vZGlmeSB1c2VyIHJlbGF0aW9uc2hpcCBzdGF0dXMgZnJvbSB0YXJnZXQgcGVlclxyXG4gICAqIC0gbW9kaWZpZXMgcGVlciBsaXN0IGl0ZW0gYWNjb3JkaW5nIHRvIGFjdGlpb24gdGFrZW5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICogQHJldHVybnMgeyBQcm9taXNlPHZvaWQ+IH1cclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjbGlja0NvbnRhY3RBY3Rpb25IYW5kbGVyID0gYXN5bmMgKFxyXG4gICAgZTogTW91c2VFdmVudFxyXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGFyZ2V0LmRhdGFzZXQuY29udGFjdEFjdCEgYXMgXCJhcmNoaXZlXCIgfCBcImJsb2NrXCIgfCBcIm11dGVcIjtcclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICBsZXQgcmVsQWN0VmFsaWQhOiBpVmFsaWRpdHlUeXBlO1xyXG5cclxuICAgIGNvbnN0IHQgPSB0YXJnZXQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCE7XHJcbiAgICBjb25zdCByZWxhdGlvbkFjdDogaVJlbGF0aW9uQWN0ID0ge1xyXG4gICAgICByZWNpcGllbnRJZDogdC5kYXRhc2V0LnVzZXJJZCEsXHJcbiAgICAgIHVzZXJBY3Rpb246IGFjdGlvbixcclxuICAgICAgLy8gQ09OVEFDVCBUT09MVElQUyBXSUxMIEFMV0FZUyBIQVZFIEEgVkFMVUUgT0YgVFJVRVxyXG4gICAgICBhY3Rpb25WYWx1ZTogdHJ1ZSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgcmVsQWN0VmFsaWQgPSBWYWxpZGF0ZS5yZWxhdGlvbkFjdGlvbihyZWxhdGlvbkFjdCk7XHJcbiAgICBpZiAoIXJlbEFjdFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IFVzZXIgZGF0YSBmb3IgcmVxdWVzdGluZyB1c2VyIHJlbGF0aW9uIGFjdGlvbiBpcyBpbnZhbGlkXCIsXHJcbiAgICAgICAgcmVsQWN0VmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBUkNISVZFXHJcbiAgICAvLyAtLS0gdGVtcG9yYXJpbHkgaGlkZSBjaGF0IGl0ZW0gZWxlbWVudFxyXG4gICAgaWYgKGFjdGlvbiA9PT0gXCJhcmNoaXZlXCIpIHtcclxuICAgICAgUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QucmVtb3ZlQ2hpbGQodCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIVFRQIFJFUVVFU1RcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cFBhdGNoUmVsYXRpb24sIHJlbGF0aW9uQWN0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IHJlbGF0aW9uIGFjdGlvblwiLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIHJlcXVlc3QgZm9yIHVzZXIgYWN0aW9uYCxcclxuICAgICAgYHNlcnZlciByZXNwb25kZWQgd2l0aCBhbiBlcnJvciB1cG9uIGNsaWVudCdzIHJlcXVlc3QgZm9yIHJlbGF0aW9uIGFjdGlvbmBcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgY29uc3QgaXRlbTogaVJlbGF0aW9uID0ge1xyXG4gICAgICBhY2NudF9pZDogdC5kYXRhc2V0LnVzZXJJZCEsXHJcbiAgICAgIGFjY250X25hbWU6IFsuLi50LmNoaWxkcmVuXVswXS5xdWVyeVNlbGVjdG9yKFwiaDNcIik/LnRleHRDb250ZW50ISxcclxuICAgICAgdHlwZTogdC5kYXRhc2V0LmNoYXRUeXBlISBhcyBcInVzZXJcIiB8IFwiZ3JvdXBcIixcclxuICAgICAgY2hhdF9pZDogXCJwc2V1ZG9cIixcclxuICAgICAgYWRtaW46IGZhbHNlLFxyXG4gICAgICBhcmNoaXZlOiB0LmRhdGFzZXQuaXNBcmNoaXZlZCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgIGJsb2NrOiB0LmRhdGFzZXQuaXNCbG9ja2VkID09PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgbXV0ZTogdC5kYXRhc2V0LmlzTXV0ZWQgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICBidW1wOiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoYWN0aW9uID09PSBcImJsb2NrXCIgJiYgaXRlbS50eXBlID09PSBcImdyb3VwXCIpIHtcclxuICAgICAgbGV0IGdzID0gSlNPTi5wYXJzZShcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEdyb3VwQ29tcG9uZW50LmdycFNlc3Npb25TdG9yZU5hbWUpIVxyXG4gICAgICApIGFzIGlSZWxhdGlvbltdO1xyXG4gICAgICBncyA9IGdzLmZpbHRlcigoZykgPT4gaXRlbS5hY2NudF9pZCAhPT0gZy5hY2NudF9pZCk7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oR3JvdXBDb21wb25lbnQuZ3JwU2Vzc2lvblN0b3JlTmFtZSk7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXHJcbiAgICAgICAgR3JvdXBDb21wb25lbnQuZ3JwU2Vzc2lvblN0b3JlTmFtZSxcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShncylcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWN0aW9uID09PSBcIm11dGVcIikge1xyXG4gICAgICAvLyAgTVVURVxyXG4gICAgICAvLyAgLS0tIGVyYXNlIGNoYXQgaXRlbSBtZXNzYWdlIGRpc3BsYXkgZnJvbSBtdXRpbmcgcGFydHlcclxuICAgICAgY29uc3QgcCA9IHQucXVlcnlTZWxlY3RvcihcInBcIikhO1xyXG4gICAgICBwLnRleHRDb250ZW50ID0gXCItLS0tLVwiO1xyXG5cclxuICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVNdXRlQmxvY2tJdGVtKFxyXG4gICAgICAgIGl0ZW0sXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jaGF0VXNlck11dGVzV3JhcCxcclxuICAgICAgICAwXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBCTE9DS1xyXG4gICAgICAvLyAtLS0gdW5hYmxlIHRvIGFjY2VwdCB8IHJlY2VpdmVyIG1lc3NhZ2UgZnJvbSBib3RoIHBhcnRpZXNcclxuICAgICAgLy8gLS0tIG5vdCBzZWFyY2hhYmxlIGJ5IGJvdGggcGFydGllc1xyXG5cclxuICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVNdXRlQmxvY2tJdGVtKFxyXG4gICAgICAgIGl0ZW0sXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jaGF0VXNlckJsb2Nrc1dyYXAsXHJcbiAgICAgICAgMVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QucmVtb3ZlQ2hpbGQodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gREVMRVRFIEFDVElPTiBPUFRJT05cclxuICAgIHRhcmdldC5wYXJlbnRFbGVtZW50Py5yZW1vdmVDaGlsZCh0YXJnZXQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gZmVlZHMgYSBmdW5jdGlvbiB3aXRoIGFuIGFycmF5IG9mIHBlZXIgaXRlbSBkYXRhIGFuZCB0cmFuc2Zvcm0gdGhlbSBpbnRvIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IEV2ZW50IH0gZVxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBFdmVudCAtIHNjcm9sbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc2Nyb2xsQm90dG9tUGVlckxpc3QgPSBhc3luYyAoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAodC5zY3JvbGxUb3AgPT09IHQuc2Nyb2xsSGVpZ2h0IC0gdC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgdGhpcy5nZW5lcmF0ZUNvbnRhY3RJdGVtcygpO1xyXG4gICAgICBhd2FpdCB0aGlzLmZldGNoVG9wTXNncygpO1xyXG5cclxuICAgICAgdGhpcy5yZWxTa2lwKys7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgc2V0IG9mIHN0YXJ0aW5nIGFuZCBlbmRpbmcgbnVtYmVycyBmb3IgdGhlIHBhZ2luYXRpb24gbG9naWMgb2YgdGhlIHBlZXIgbGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IG51bWJlciB9IHNraXAgLSBjdXJyZW50IHNraXAgc3RhdHVzIG9mIHRoZSBsaXN0XHJcbiAgICogQHBhcmFtIHsgbnVtYmVyIH0gW2tdIC0gaW5pdGlhbGx5LCBza2lwIGxpbWl0IGNvbnN0YW50IG9mIHRoZSBwZWVyIGxpc3RcclxuICAgKiBAcmV0dXJucyB7IHsgc3RhcnQ6IG51bWJlcjsgZW5kOiBudW1iZXIgfSB8IHZvaWQgfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZ2V0U3RhcnRFbmQgPSAoXHJcbiAgICBza2lwOiBudW1iZXIsXHJcbiAgICBrOiBudW1iZXIgPSB0aGlzLnJlbFNraXBDb25zdFxyXG4gICk6IHsgc3RhcnQ6IG51bWJlcjsgZW5kOiBudW1iZXIgfSB8IHZvaWQgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBza2lwICE9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBrICE9PSBcIm51bWJlclwiKSByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHsgc3RhcnQ6IHNraXAgPyBza2lwICogayA6IDAsIGVuZDogKHNraXAgPyAoc2tpcCArIDEpICogayA6IGspIC0gMSB9O1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSByZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlciB0byByZXRyaWV2ZSB1c2VyIGNvbnRhY3RzLlxyXG4gICAqIC0gc3RvcmVzIHJldHJpZXZlZCBkYXRhIHdpdGhpbiBjbGFzcyBtZXRob2RcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRVc2VyQ29udGFjdHMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgcmVsQm9keSA9IHRoaXMuY3JlYXRlUmVsUmVxQm9keSgpO1xyXG5cclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldFVzZXJSZWxhdGlvbnMsIHJlbEJvZHkpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIHJlcXVlc3QgdXNlciByZWxhdGlvbnNcIixcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICBjb25zdCBodHRwVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgYHNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyByZXF1ZXN0IGZvciB1c2VyIHJlbGF0aW9uc2AsXHJcbiAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIHJlbGF0aW9uc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJFU1BPTlNFIFBST0NFU1NJTkdcclxuICAgIGxldCByZWw6IGlSZWxhdGlvbjtcclxuICAgIGZvciAocmVsIG9mIHJlc3BvbnNlLmRhdGEuZGF0YSkge1xyXG4gICAgICBQZWVyQ29tcG9uZW50LmNoYXRQZWVyUmVsYXRpb25zSW5mby5wdXNoKFxyXG4gICAgICAgIEdlblV0aWwucmVsYXRpb25TdHJJbnRUb0Jvb2wocmVsKSBhcyBpUmVsYXRpb25cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGNvbm5lY3RzIGNsaWVudCB0byBvdGhlciB1c2VyIGJhc2VkIG9uIGRhdGEgYWJvdXQgY29ubmVjdGVkIHBlZXJzLiAqL1xyXG4gIHByaXZhdGUgY29ubmVjdFRvU29ja2V0Um9vbXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGF0SWRzID0gUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm8ubWFwKChyZWwpID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVsLmJsb2NrKTtcclxuICAgICAgcmVsLmNoYXRfaWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChcclxuICAgICAgU29ja2V0TWV0aG9kcy5qb2luUm9vbXNFdixcclxuICAgICAgY2hhdElkcyxcclxuICAgICAgKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gbG9vcHMgb3ZlciBzZWFyY2ggaXRlbSBkYXRhIGFuZCB0cmFuc2Zvcm1zIHRoZW0gaW50byBIVE1MIGVsZW1lbnRzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgaVNlYXJjaEl0ZW1zIH0gdXNlckl0ZW1zIC0gYXJyYXkgb2Ygc2VhcmNoIGl0ZW0gZGF0YVxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIGdlbmVyYXRlU2VhcmNoSXRlbXModXNlckl0ZW1zOiBpU2VhcmNoSXRlbXMsIHR5cGU6IGlDaGF0VHlwZSk6IHZvaWQge1xyXG4gICAgbGV0IHVzZXI6IGlTZWFyY2hJdGVtO1xyXG4gICAgZm9yICh1c2VyIG9mIHVzZXJJdGVtcykge1xyXG4gICAgICB0aGlzLmNyZWF0ZVNlYXJjaEl0ZW0odXNlciwgdHlwZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSBjcmVhdGVzIGEgY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnQgZnJvbSB0aGUgdXNlciBvYmplY3RcclxuICAgKiAtIGF0dGFjaGVzIHRoZW0gdG8gdGhlIHNlYXJjaCBsaXN0IGVsZW1lbnRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlTZWFyY2hJdGVtcyB9IHVzZXIgLSB1c2VyIG9iamVjdFxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGUgLSB1c2VyIGNoYXQgdHlwZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlU2VhcmNoSXRlbSh1c2VyOiBpU2VhcmNoSXRlbSwgdHlwZTogaUNoYXRUeXBlKTogdm9pZCB7XHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgdXNlclZhbGlkID0gVmFsaWRhdGUuc2VhcmNoSXRlbSh1c2VyKTtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBpZiAoIXVzZXJWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBzZWFyY2ggaXRlbSBkYXRhIGlzIGludmFsaWRcIixcclxuICAgICAgICB1c2VyVmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQUk9DRVNTSU5HXHJcbiAgICBjb25zdCBzZWFyY2hJdGVtOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXHJcbiAgICAgIFwiZGl2XCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgY29uc3QgdXNlckgzOiBIVE1MSGVhZGluZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICBcImgzXCJcclxuICAgICkhIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIGNvbnN0IHVzZXJOYW1lOiBUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodXNlci5hY3RfbmFtZSkhIGFzIFRleHQ7XHJcblxyXG4gICAgc2VhcmNoSXRlbS5jbGFzc0xpc3QuYWRkKFwiY2hhdC1zZWFyY2gtaXRlbVwiKTtcclxuICAgIHNlYXJjaEl0ZW0uZGF0YXNldC51c2VySWQgPSB1c2VyLmFjY250X2lkO1xyXG4gICAgc2VhcmNoSXRlbS5kYXRhc2V0LmNoYXRUeXBlID0gdHlwZTtcclxuICAgIHNlYXJjaEl0ZW0uZGF0YXNldC5hdmFpbGFiaWxpdHkgPSBgJHt1c2VyLmF2YWlsYWJpbGl0eX1gO1xyXG5cclxuICAgIHVzZXJIMy5hcHBlbmRDaGlsZCh1c2VyTmFtZSk7XHJcbiAgICBzZWFyY2hJdGVtLmFwcGVuZENoaWxkKHVzZXJIMyk7XHJcbiAgICBzZWFyY2hJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrU2VhcmNoSXRlbUhhbmRsZXIpO1xyXG5cclxuICAgIHRoaXMuY2hhdFNlYXJjaExpc3QuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHNlYXJjaEl0ZW0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gbG9vcHMgb3ZlciBwZWVyIGl0ZW0gZGF0YSBhbmQgdHJhbnNmb3JtcyB0aGVtIGludG8gSFRNTCBlbGVtZW50cy4gKi9cclxuICBwcml2YXRlIGdlbmVyYXRlQ29udGFjdEl0ZW1zID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSB0aGlzLmdldFN0YXJ0RW5kKHRoaXMucmVsU2tpcCkhO1xyXG4gICAgbGV0IGk6IG51bWJlciA9IHN0YXJ0O1xyXG4gICAgaWYgKHN0YXJ0ID4gUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm8ubGVuZ3RoKSByZXR1cm47XHJcbiAgICBjb25zdCBzbGljZWRBcnIgPSBQZWVyQ29tcG9uZW50LmNoYXRQZWVyUmVsYXRpb25zSW5mby5zbGljZShcclxuICAgICAgdGhpcy5yZWxTa2lwID09PSAwID8gMCA6IHN0YXJ0IC0gMSxcclxuICAgICAgZW5kICsgMVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgaXRlbTogaVJlbGF0aW9uO1xyXG4gICAgZm9yIChpdGVtIG9mIHNsaWNlZEFycikge1xyXG4gICAgICBpZiAoaSA9PT0gZW5kKSBicmVhaztcclxuICAgICAgUGVlckNvbXBvbmVudC5jcmVhdGVSZWxhdGlvbkl0ZW1IVE1MKGl0ZW0pO1xyXG4gICAgICBpKys7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuZCByZXR1cm5zIGFuIEhUTUwgZWxlbWVudCBmcm9tIGEgdXNlciByZWxhdGlvbiBkYXRhIGFib3V0IGEgcGVlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlSZWxhdGlvbiB9IGl0ZW0gLSB1c2VyJ3MgcmVsYXRpb24gb2JqZWN0IHRvIGRlc2NyaWJlIHBlZXJcclxuICAgKiBAcmV0dXJucyB7IEhUTUxEaXZFbGVtZW50IHwgdm9pZCB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlUmVsYXRpb25JdGVtSFRNTCA9IChcclxuICAgIGl0ZW06IGlSZWxhdGlvblxyXG4gICk6IEhUTUxEaXZFbGVtZW50IHwgdm9pZCA9PiB7XHJcbiAgICBpdGVtID0gR2VuVXRpbC5yZWxhdGlvblN0ckludFRvQm9vbChpdGVtKSBhcyBpUmVsYXRpb247XHJcbiAgICBjb25zdCB1c2VyVmFsaWQgPSBWYWxpZGF0ZS5jb250YWN0SXRlbShpdGVtKTtcclxuXHJcbiAgICAvLyBpZiAoIXVzZXJWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAvLyAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgIC8vICAgICBcIkVSUk9SOiBjb250YWN0IGl0ZW0gZGF0YSBpcyBpbnZhbGlkXCIsXHJcbiAgICAvLyAgICAgdXNlclZhbGlkLmVycm9yXHJcbiAgICAvLyAgICk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gaXRlbSB3cmFwcGVyXHJcbiAgICBjb25zdCBpdGVtV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpdGVtV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1jb250YWN0LWl0ZW1cIik7XHJcbiAgICBpdGVtV3JhcC5kYXRhc2V0LnVzZXJJZCA9IGl0ZW0uYWNjbnRfaWQ7XHJcbiAgICBpdGVtV3JhcC5kYXRhc2V0LmNoYXRJZCA9IGl0ZW0uY2hhdF9pZDtcclxuICAgIGl0ZW1XcmFwLmRhdGFzZXQuaXNNdXRlZCA9IGAke2l0ZW0ubXV0ZX1gO1xyXG4gICAgaXRlbVdyYXAuZGF0YXNldC5pc0Jsb2NrZWQgPSBgJHtpdGVtLmJsb2NrfWA7XHJcbiAgICBpdGVtV3JhcC5kYXRhc2V0LmlzQXJjaGl2ZWQgPSBgJHtpdGVtLmFyY2hpdmV9YDtcclxuICAgIGl0ZW1XcmFwLmRhdGFzZXQuY2hhdFR5cGUgPSBpdGVtLnR5cGU7XHJcblxyXG4gICAgLy8gaXRlbSBtYWluXHJcbiAgICAvLy8vIGl0ZW0gbWFpbiBpY29uXHJcbiAgICBjb25zdCBpdGVtTmFtZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaXRlbU5hbWVJY29uLnRleHRDb250ZW50ID0gaXRlbS5hY2NudF9uYW1lWzBdO1xyXG4gICAgaXRlbU5hbWVJY29uLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWNvbnRhY3QtaWNvblwiKTtcclxuXHJcbiAgICAvLy8vIGl0ZW0gbWFpbiB3cmFwXHJcbiAgICBjb25zdCBpdGVtTmFtZVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaXRlbU5hbWVXcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWNvbnRhY3QtaW5mb1wiKTtcclxuICAgIC8vLy8gaXRlbSBtYWluIG5hbWVcclxuICAgIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xyXG4gICAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpdGVtLmFjY250X25hbWU7XHJcbiAgICAvLy8vIGl0ZW0gbWFpbiBjb250ZW50IC0tLS0tLS0tLS0tLS0tLSBFRElUXHJcbiAgICBjb25zdCBpdGVtVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1UZXh0VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xyXG4gICAgY29uc3QgaXRlbVRleHRNc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuXHJcbiAgICBpZiAoaXRlbS5tdXRlKSB7XHJcbiAgICAgIGl0ZW1UZXh0VGltZS50ZXh0Q29udGVudCA9IGAtLS1gO1xyXG4gICAgICBpdGVtVGV4dE1zZy50ZXh0Q29udGVudCA9IGAgLSAtLS0tLS1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaXRlbVRleHRUaW1lLnRleHRDb250ZW50ID0gYC0tLWA7XHJcbiAgICAgIGl0ZW1UZXh0TXNnLnRleHRDb250ZW50ID0gYCAtIFNheSBIaSFgO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZpc3QgbXNnIGluZm8gaXMgdGltZVxyXG4gICAgaXRlbVRleHQuYXBwZW5kQ2hpbGQoaXRlbVRleHRUaW1lKTtcclxuICAgIC8vIGxhc3QgbXNnIGluZm8gaXMgbWVzc2FnZVxyXG4gICAgaXRlbVRleHQuYXBwZW5kQ2hpbGQoaXRlbVRleHRNc2cpO1xyXG4gICAgaXRlbU5hbWVXcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1OYW1lV3JhcC5hcHBlbmRDaGlsZChpdGVtVGV4dCk7XHJcblxyXG4gICAgLy8gaXRlbSB0b29sdGlwXHJcbiAgICBjb25zdCBpdGVtVG9vbHRpcFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaXRlbVRvb2x0aXBXcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWNvbnRhY3QtdG9vbHRpcFwiKTtcclxuXHJcbiAgICAvLy8vIGl0ZW0gdG9vbHRpcCBpY29uXHJcbiAgICBjb25zdCBpdGVtVG9vbHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaXRlbVRvb2x0aXAuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtZWxsaXBzaXMtdmVydGljYWxcIik7XHJcbiAgICAvLy8vIGl0ZW0gdG9vbHRpcCBjb250ZW50XHJcbiAgICBjb25zdCBpdGVtVG9vbHRpcENvbnRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaXRlbVRvb2x0aXBDb250ZXh0LmNsYXNzTGlzdC5hZGQoXCJjaGF0LWNvbnRhY3QtdG9vbHRpcC1jb250ZW50XCIpO1xyXG5cclxuICAgIGlmICghaXRlbS5ibG9jaykge1xyXG4gICAgICBjb25zdCBpdGVtVG9vbHRpcEJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgIGl0ZW1Ub29sdGlwQmxvY2sudGV4dENvbnRlbnQgPSBjb250YWN0QWN0LmJsb2NrO1xyXG4gICAgICBpdGVtVG9vbHRpcEJsb2NrLmRhdGFzZXQuY29udGFjdEFjdCA9IGNvbnRhY3RBY3QuYmxvY2s7XHJcbiAgICAgIGl0ZW1Ub29sdGlwQ29udGV4dC5hcHBlbmRDaGlsZChpdGVtVG9vbHRpcEJsb2NrKTtcclxuICAgIH1cclxuICAgIGlmICghaXRlbS5tdXRlKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW1Ub29sdGlwTXV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICBpdGVtVG9vbHRpcE11dGUudGV4dENvbnRlbnQgPSBjb250YWN0QWN0Lm11dGU7XHJcbiAgICAgIGl0ZW1Ub29sdGlwTXV0ZS5kYXRhc2V0LmNvbnRhY3RBY3QgPSBjb250YWN0QWN0Lm11dGU7XHJcbiAgICAgIGl0ZW1Ub29sdGlwQ29udGV4dC5hcHBlbmRDaGlsZChpdGVtVG9vbHRpcE11dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1Ub29sdGlwQXJjaGl2ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgaXRlbVRvb2x0aXBBcmNoaXZlLnRleHRDb250ZW50ID0gY29udGFjdEFjdC5hcmNoaXZlO1xyXG4gICAgaXRlbVRvb2x0aXBBcmNoaXZlLmRhdGFzZXQuY29udGFjdEFjdCA9IGNvbnRhY3RBY3QuYXJjaGl2ZTtcclxuICAgIGl0ZW1Ub29sdGlwQ29udGV4dC5hcHBlbmRDaGlsZChpdGVtVG9vbHRpcEFyY2hpdmUpO1xyXG4gICAgaXRlbVRvb2x0aXBDb250ZXh0LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2xpY2tcIixcclxuICAgICAgdGhpcy5jbGlja0NvbnRhY3RBY3Rpb25IYW5kbGVyXHJcbiAgICApO1xyXG5cclxuICAgIGl0ZW1Ub29sdGlwV3JhcC5hcHBlbmRDaGlsZChpdGVtVG9vbHRpcCk7XHJcbiAgICBpdGVtVG9vbHRpcFdyYXAuYXBwZW5kQ2hpbGQoaXRlbVRvb2x0aXBDb250ZXh0KTtcclxuXHJcbiAgICBpdGVtV3JhcC5hcHBlbmRDaGlsZChpdGVtTmFtZUljb24pO1xyXG4gICAgaXRlbVdyYXAuYXBwZW5kQ2hpbGQoaXRlbU5hbWVXcmFwKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1Ub29sdGlwV3JhcCk7XHJcbiAgICBpdGVtTmFtZVdyYXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaW5zdGFuY2UhLmNsaWNrUGVlckl0ZW1IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmNoYXRQZWVyTGlzdC5hcHBlbmRDaGlsZChpdGVtV3JhcCk7XHJcblxyXG4gICAgdGhpcy5jaGF0UGVlclJlbGF0aW9uc0hUTUwucHVzaChpdGVtV3JhcCk7XHJcblxyXG4gICAgcmV0dXJuIGl0ZW1XcmFwO1xyXG4gIH07XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYW4gb2JqZWN0IGZvciBhbiBIVFRQIFBPU1QgZm9yIHBlZXIgbGlzdCBpdGVtcyByZXRyaWV2YWwuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IGlSZWxCb2R5IH1cclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZVJlbFJlcUJvZHkoKTogaVJlbEJvZHkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29udGFjdFR5cGU6IFwiY29udGFjdFwiLFxyXG4gICAgICBjaGF0VHlwZTogXCJ1c2VyXCIsXHJcbiAgICAgIGdyb3VwSWQ6IG51bGwsXHJcbiAgICAgIHNraXA6IHRoaXMucmVsU2tpcCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoZSBwZWVyIGxpc3RzIGZpcnN0IGl0ZW0gaWYgYXZhaWxhYmxlLiAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgY3JlYXRlRmlyc3RQZWVyTXNnQ29tcCA9ICgpID0+IHtcclxuICAgIGlmIChQZWVyQ29tcG9uZW50LmNoYXRQZWVyUmVsYXRpb25zSW5mby5sZW5ndGgpIHtcclxuICAgICAgY29uc3QgZmlyc3RSZWxhdGlvbiA9IFBlZXJDb21wb25lbnQuY2hhdFBlZXJSZWxhdGlvbnNJbmZvWzBdO1xyXG5cclxuICAgICAgTWVzc2FnZXNDb21wb25lbnQuZ2V0SW5zdGFuY2UoXHJcbiAgICAgICAgdGhpcy51c2VyRGF0YS5hY3RfaWQuYWNjbnRfaWQsXHJcbiAgICAgICAgZmlyc3RSZWxhdGlvbi5hY2NudF9pZCxcclxuICAgICAgICBmaXJzdFJlbGF0aW9uLmFjY250X25hbWUsXHJcbiAgICAgICAgZmlyc3RSZWxhdGlvbi5jaGF0X2lkLFxyXG4gICAgICAgIHRydWUsXHJcbiAgICAgICAgZmlyc3RSZWxhdGlvbi50eXBlLFxyXG4gICAgICAgIGZhbHNlLFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIGEgcGVlciBpdGVtIEhUTUwsIGZyb206XHJcbiAgICogLSBhZGRpbmcgYW4gaXRlbSB0byBwZWVyIGxpc3RcclxuICAgKiAtIG1lc3NhZ2UgaW5mb3JtYXRpb25cclxuICAgKiAtIHJlb3JkZXJpbmcgcGVlciBsaXN0IGl0ZW1zXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVsYXRpb24gfSByZWwgLSB1c2VyIGRhdGEgb24gYSBwZWVyIGFib3V0IHRoZWlyIHJlbGF0aW9uXHJcbiAgICogQHBhcmFtIHsgaU1zZ0JvZHkgfSBbbXNnXSAtIG9wdGlvbmFsIG1lc3NhZ2UgaXRlbVxyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSB1cGRhdGVQZWVyTGlzdEhUTUwgPSAocmVsOiBpUmVsYXRpb24sIG1zZz86IGlNc2dCb2R5KSA9PiB7XHJcbiAgICBjb25zdCB2UmVsSW5mbyA9IHRoaXMuc2VhcmNoUGVlckluZm8ocmVsLmNoYXRfaWQpO1xyXG4gICAgbGV0IHZSZWxIVE1MOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIGxldCB3aXRoaW5MaXN0OiBib29sZWFuO1xyXG5cclxuICAgIGlmICh2UmVsSW5mbyAmJiBcImNoYXRfaWRcIiBpbiB2UmVsSW5mbykge1xyXG4gICAgICB3aXRoaW5MaXN0ID0gdHJ1ZTtcclxuICAgICAgLy8gaWYgcmVsIGlzIHdpdGhpbiBwZWVySW5mbywgZmV0Y2ggcHJlc2VudCByZXByZXNlbnRpbmcgSFRNTFxyXG4gICAgICB2UmVsSFRNTCA9IHRoaXMuc2VhcmNoUGVlckhUTUwocmVsLmNoYXRfaWQpITtcclxuXHJcbiAgICAgIC8vIGlmIHJlbCBub3QgYXRvcCBwZWVyTGlzdCwgcmVtb3ZlIHJlbCBmcm9tIHBlZXJMaXN0ICYgcGVlckluZm9cclxuICAgICAgaWYgKHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNIVE1MWzBdICE9PSB2UmVsSFRNTCkge1xyXG4gICAgICAgIHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNIVE1MID0gdGhpcy5jaGF0UGVlclJlbGF0aW9uc0hUTUwuZmlsdGVyKFxyXG4gICAgICAgICAgKGh0bWw6IEhUTUxEaXZFbGVtZW50KSA9PiBodG1sLmRhdGFzZXQuY2hhdElkICE9PSByZWwuY2hhdF9pZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5jaGF0UGVlclJlbGF0aW9uc0luZm8gPSB0aGlzLmNoYXRQZWVyUmVsYXRpb25zSW5mby5maWx0ZXIoXHJcbiAgICAgICAgICAocmVsSW5mbzogaVJlbGF0aW9uKSA9PiByZWxJbmZvLmNoYXRfaWQgIT09IHJlbC5jaGF0X2lkXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2l0aGluTGlzdCA9IGZhbHNlO1xyXG4gICAgICAvLyBpZiByZWwgaXMgbm90IHdpdGhpbiBwZWVySW5mbywgY3JlYXRlIHJlcHJlc2VudGluZyBIVE1MXHJcbiAgICAgIHZSZWxIVE1MID0gdGhpcy5jcmVhdGVSZWxhdGlvbkl0ZW1IVE1MKHJlbCkhO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIGNhbGxlZCBmcm9tIG5ldyBtc2csIGFkZCBtZXNzYWdlXHJcbiAgICBpZiAobXNnICE9PSB1bmRlZmluZWQgJiYgbXNnICE9PSBudWxsICYmIFwibXNnXCIgaW4gbXNnKSB7XHJcbiAgICAgIFBlZXJDb21wb25lbnQudXBkYXRlTXNnKHZSZWxIVE1MLCBtc2cpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIHJlbCBub3QgYXRvcCBwZWVyTGlzdFxyXG4gICAgaWYgKHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNIVE1MWzBdICE9PSB2UmVsSFRNTCkge1xyXG4gICAgICAvLyBwbGFjZSBpdCBhdCB0aGUgcGVlckxpc3QncyAmIHBlZXJJbmZvJ3MgYmVnaW5uaW5nXHJcbiAgICAgIHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNIVE1MLnVuc2hpZnQodlJlbEhUTUwpO1xyXG4gICAgICB0aGlzLmNoYXRQZWVyUmVsYXRpb25zSW5mby51bnNoaWZ0KHJlbCk7XHJcblxyXG4gICAgICAvLyBwbGFjZSBpdCBhdCB0aGUgcGVlckxpc3QncyBIVE1MIGJlZ2lubmluZ1xyXG4gICAgICB0aGlzLmNoYXRQZWVyTGlzdC5yZW1vdmVDaGlsZCh2UmVsSFRNTCk7XHJcbiAgICAgIHRoaXMuY2hhdFBlZXJMaXN0LnByZXBlbmQodlJlbEhUTUwpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBtYXRjaGluZyBwZWVyIGl0ZW0gb2JqZWN0IGZyb20gY2xhc3Mgc3RvcmVkIHBlZXIgaXRlbXMgZGF0YS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGlkIC0gYWNjb3VudCBpZCBvciBncm91cCBpZCBvZiBhIHVzZXIgcGVlclxyXG4gICAqIEByZXR1cm5zIHsgaVJlbGF0aW9uIHwgdW5kZWZpbmVkIH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgc2VhcmNoUGVlckluZm8gPSAoaWQ6IHN0cmluZyk6IGlSZWxhdGlvbiB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgICBjb25zdCB0OiBpUmVsYXRpb24gfCB1bmRlZmluZWQgPSBQZWVyQ29tcG9uZW50LmNoYXRQZWVyUmVsYXRpb25zSW5mby5maW5kKFxyXG4gICAgICAocmVsOiBpUmVsYXRpb24pID0+IHJlbC5jaGF0X2lkID09PSBpZFxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgbWF0Y2hpbmcgcGVlciBpdGVtIEhUTUwgZWxlbWVudCBmcm9tIGNsYXNzIHRyYWNrZWQgcGVlciBIVE1MIGFycmF5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gaWQgLSBhY2NvdW50IGlkIG9yIGdyb3VwIGlkIG9mIGEgdXNlciBwZWVyXHJcbiAgICogQHJldHVybnMgeyBEaXZFbGVtZW50IHwgdW5kZWZpbmVkIH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgc2VhcmNoUGVlckhUTUwgPSAoaWQ6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHwgdm9pZCA9PiB7XHJcbiAgICBsZXQgaHRtbDtcclxuICAgIHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNIVE1MLmZvckVhY2goKGg6IEhUTUxEaXZFbGVtZW50KSA9PiB7XHJcbiAgICAgIGlmIChoLmRhdGFzZXQuY2hhdElkID09PSBpZCkge1xyXG4gICAgICAgIGh0bWwgPSBoO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gaHRtbDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSBsb29wcyBvdmVyIGEgY2VydGFpbiByYW5nZSBvZiBwZWVyIGl0ZW0gSFRNTFxyXG4gICAqIC0gZmV0Y2ggaXRzIG1vc3QgcmVjZW50IG1lc3NhZ2UsIGlmIGF2YWlsYWJsZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZmV0Y2hUb3BNc2dzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgbGV0IGg6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgbGV0IGk6IG51bWJlciA9IDA7XHJcbiAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuZ2V0U3RhcnRFbmQodGhpcy5yZWxTa2lwKSE7XHJcbiAgICB0aGlzLnJlbFNraXArKztcclxuICAgIGNvbnN0IHNsaWNlZEFyckhUTUwgPSBQZWVyQ29tcG9uZW50LmNoYXRQZWVyUmVsYXRpb25zSFRNTC5zbGljZShzdGFydCwgZW5kKTtcclxuXHJcbiAgICBmb3IgKGggb2Ygc2xpY2VkQXJySFRNTCkge1xyXG4gICAgICBpZiAoaSA9PT0gZW5kKSBicmVhaztcclxuICAgICAgYXdhaXQgdGhpcy5mZXRjaFRvcE1zZyhoKTtcclxuICAgICAgaSsrO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmVxdWVzdHMgYW4gSFRUUCBHRVQgdG8gdGhlIHNlcnZlciB0byByZXRyaWV2ZSBpdHMgbW9zdCByZWNlbnQgbWVzc2FnZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IEhUTUxEaXZFbGVtZW50IH0gcGVlckhUTUwgLSBwZWVyIGl0ZW0gaHRtbCBhcyBzb3VyY2Ugb2YgY2hhdCBJRFxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSByZWFkb25seSBmZXRjaFRvcE1zZyA9IGFzeW5jIChcclxuICAgIHBlZXJIVE1MOiBIVE1MRGl2RWxlbWVudFxyXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICAhKHBlZXJIVE1MIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnQpIHx8XHJcbiAgICAgIHBlZXJIVE1MLmRhdGFzZXQuY2hhdElkID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgcGVlckhUTUwuZGF0YXNldC5jaGF0SWQgPT09IG51bGwgfHxcclxuICAgICAgIXBlZXJIVE1MLmRhdGFzZXQuY2hhdElkLmxlbmd0aFxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBHZXRUb3BNc2csIHBlZXJIVE1MLmRhdGFzZXQuY2hhdElkKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgIGVycm9yLnNob3dDb21wKFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gZmV0Y2ggdG9wIGNoYXQgbWVzc2FnZVwiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGVycm9yIG9jY3VyZWRgLFxyXG4gICAgICBgY2xpZW50IHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIGZvciB1cG9uIHJlcXVlc3QgZm9yIHRvcCBjaGF0IG1lc3NhZ2VgXHJcbiAgICApO1xyXG5cclxuICAgIGlmICghaHR0cFZhbGlkKSByZXR1cm47XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5kYXRhIGFzIGlNc2dCb2R5O1xyXG5cclxuICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YSA9PT0gbnVsbCB8fCAhKFwibXNnXCIgaW4gZGF0YSkpIHJldHVybjtcclxuXHJcbiAgICBQZWVyQ29tcG9uZW50LnVwZGF0ZU1zZyhwZWVySFRNTCwgZGF0YSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB1cGRhdGVzIGFuIEhUTUwgbWVzc2FnZSBpbmZvIGVsZW1lbnRzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSBodG1sIC0gSFRNTCBlbGVtZW50IHRvIGJlIG1vZGlmaWVkXHJcbiAgICogQHBhcmFtIHsgaU1zZ0JvZHkgfSBkYXRhIC0gbWVzc2FnZSBkYXRhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgdXBkYXRlTXNnID0gKFxyXG4gICAgaHRtbDogSFRNTERpdkVsZW1lbnQsXHJcbiAgICBkYXRhOiBpTXNnQm9keVxyXG4gICkgPT4ge1xyXG4gICAgY29uc3QgdCA9IGh0bWwucXVlcnlTZWxlY3RvcihcInNwYW46Zmlyc3QtY2hpbGRcIikhO1xyXG4gICAgdC50ZXh0Q29udGVudCA9IEdlblV0aWwubWlsbGlUb1RpbWUoK2RhdGEudGltZVJlY2VpdmVkKTtcclxuICAgIGNvbnN0IG0gPSBodG1sLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuOmxhc3QtY2hpbGRcIikhO1xyXG4gICAgbS50ZXh0Q29udGVudCA9IFwiIC0gXCIuY29uY2F0KGRhdGEubXNnLnNsaWNlKDAsIDEwKSkuY29uY2F0KFwiIC4uLlwiKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGVpdGhlciByZXR1cm5zXHJcbiAgICogLSBhbmV3IG9yIG9sZCBpbnN0YW5jZSBvZiB0aGUgY2xhc3NcclxuICAgKiAtIG51bGwgaWYgdGhlIGNsYXNzIGlzIGluc3RydWN0ZWQgdG8gYmUgZGVsZXRlZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGRlbGV0ZUluc3RhbmNlIC0gZmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdGhpcyBjbGFzcyB3aWxsIGJlIGRlbGV0ZWRcclxuICAgKiBAcGFyYW0geyBpVXNlck9iaiB9IHVzZXJPYmogLSB1c2VyIGRhdGFcclxuICAgKiBAcmV0dXJucyB7IFBlZXJDb21wb25lbnQgfCBudWxsIH1cclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdGFuY2UgPSAoXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhbixcclxuICAgIHVzZXJPYmo6IGlVc2VyT2JqXHJcbiAgKTogUGVlckNvbXBvbmVudCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCFkZWxldGVJbnN0YW5jZSkge1xyXG4gICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgUGVlckNvbXBvbmVudCh1c2VyT2JqKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmNoYXRQZWVyUmVsYXRpb25zSW5mby5sZW5ndGggPSAwO1xyXG4gICAgICB0aGlzLmNoYXRQZWVyUmVsYXRpb25zSFRNTC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgR2VuVXRpbCB9IGZyb20gXCIuLi91dGlsL2dlbi51dGlsXCI7XHJcbmltcG9ydCB7IHRyeUNhdGNoIH0gZnJvbSBcIi4uL3V0aWwvYXN5bmNXcmFwLnV0aWxcIjtcclxuaW1wb3J0IHsgVmFsaWRhdGUgfSBmcm9tIFwiLi4vdXRpbC92YWxpZGF0aW9uLnV0aWxcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS5jb21wXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wXCI7XHJcbmltcG9ydCB7IGlSZWxhdGlvbkFjdCB9IGZyb20gXCIuLi9tb2RlbHMvcGVlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBQZWVyQ29tcG9uZW50IH0gZnJvbSBcIi4vcGVlci5jb21wXCI7XHJcbmltcG9ydCB7IEF1dGhDb21wb25lbnQgfSBmcm9tIFwiLi9hdXRoLmNvbXBcIjtcclxuaW1wb3J0IHsgU29ja2V0TWV0aG9kcyB9IGZyb20gXCIuLi91dGlsL3NvY2tldC51dGlsXCI7XHJcbmltcG9ydCB7IGlIdHRwUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2h0dHAubW9kZWxcIjtcclxuaW1wb3J0IHsgaVZhbGlkaXR5VHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvdmFsaWRpdHkubW9kZWxcIjtcclxuaW1wb3J0IHsgTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tIFwiLi9tc2dzLmNvbXBcIjtcclxuaW1wb3J0IHsgaVJlcXVlc3RCb2R5LCBpU3RyQm9vbCB9IGZyb20gXCIuLi9tb2RlbHMvZ2VuLm1vZGVsXCI7XHJcbmltcG9ydCB7IEVycm9yQ29tcG9uZW50IGFzIGVycm9yIH0gZnJvbSBcIi4vZXJyb3IuY29tcFwiO1xyXG5pbXBvcnQge1xyXG4gIGlSZXF1ZXN0LFxyXG4gIGlSZWxhdGlvbixcclxuICBpUHJpdmFjeVJlcXVlc3QsXHJcbiAgaVVzZXJQcml2YWN5UHJvcCxcclxuICBpVXNlck9iaixcclxufSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHtcclxuICBpVXNlcixcclxuICB1c2VyU2V0dGluZ3MsXHJcbiAgaVVzZXJQYXNzd29yZCxcclxuICByZXF1ZXN0QWN0aW9ucyxcclxuICBpUmVxdWVzdEFjdGlvbnMsXHJcbn0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7XHJcbiAgaHR0cEdldFVzZXIsXHJcbiAgaHR0cEdldExvZ291dCxcclxuICBodHRwUGF0Y2hSZWxhdGlvbixcclxuICBodHRwUHV0VXNlclJlcXVlc3QsXHJcbiAgaHR0cFB1dFVzZXJQcml2YWN5LFxyXG4gIGh0dHBQdXRVc2VyUGFzc3dvcmQsXHJcbn0gZnJvbSBcIi4uL2hvb2tzL3JlcXVlc3RzLmhvb2tcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGhvbGRzIGZ1bmN0aW9ucyB3L2MgbWFuYWdlcyBhbmQgcmVuZGVycyBkYXRhIHJlZ2FyZGluZyB1c2VyIHNldHRpbmdzIGFuZCByZXF1ZXN0cy5cclxuICpcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVXNlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+IHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogVXNlckNvbXBvbmVudCB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgYXBwQ29tcDogQXBwQ29tcG9uZW50ID0gQXBwQ29tcG9uZW50LmdldEluc3RhbmNlKCk7XHJcbiAgcHJpdmF0ZSBjaGF0VXNlcldyYXAhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRQZWVyV3JhcCE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFVzZXJSZW1vdmUhOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyTmFtZSE6IEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VySGVhZHMhOiBBcnJheTxIVE1MSGVhZGluZ0VsZW1lbnQ+O1xyXG4gIHByaXZhdGUgY2hhdFVzZXJJbnZpdGVzITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgc3RhdGljIGNoYXRVc2VySW5jb21pbmdXcmFwOiBIVE1MRGl2RWxlbWVudDtcclxuICBzdGF0aWMgY2hhdFVzZXJPdXRnb2luZ1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHN0YXRpYyBjaGF0VXNlck11dGVzV3JhcDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgc3RhdGljIGNoYXRVc2VyQmxvY2tzV3JhcDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0VXNlclB1YmxpYyE6IEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFVzZXJBdmFpbGFiaWxpdHkhOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyRm9ybSE6IEhUTUxGb3JtRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyUGFzc3dvcmQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFVzZXJSZVBhc3N3b3JkITogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXN0VXNlckxvZ291dCE6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAvLyBDT01QT05FTlQgRkVUQ0hFRCBEQVRBXHJcblxyXG4gIC8qKiBAdHlwZSB7IGlVc2VyIH0gLSBkYXRhIHJlZ2FyZGluZyBsb2dnZWQgdXNlcidzIHNlY3VyaXR5LCByZXF1ZXN0cywgJiByZWxhdGlvbnMqL1xyXG4gIHByaXZhdGUgY2hhdFVzZXJJbmZvITogaVVzZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gaW5zdGFudGlhdGlvbiwgdGhlIGNvbnN0cnVjdG9yIGltbWVkaWF0ZWx5IHNlbmRzIHJlcXVlc3QgdG8gdGhlIHNlcnZlciBmb3IgdXNlciBkYXRhLlxyXG4gICAqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFwiLmNoYXQtdXNlci13cmFwXCIsIFwidXNlci10ZW1wXCIsIFwiYWZ0ZXJiZWdpblwiKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZUNvbXBvbmVudCgpO1xyXG5cclxuICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRVc2VyKCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZXJyb3Iuc2hvd0NvbXAoYGNsaWVudCBpcyB1bmFibGUgdG8gZ2V0IHVzZXIgZGF0YWAsIGVycik7XHJcbiAgICAgIH1cclxuICAgIH0pKCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYXRVc2VyUmVtb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC11c2VyLW5hbWUgPiBpXCJcclxuICAgICkhIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0VXNlck5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItbmFtZSA+IGgyXCJcclxuICAgICkhIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC11c2VyLXdyYXBcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRQZWVyV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtcGVlci13cmFwXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0VXNlckhlYWRzID0gW1xyXG4gICAgICAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoYXQtdXNlci1oZWFkXCIpLFxyXG4gICAgXSEgYXMgQXJyYXk8SFRNTEhlYWRpbmdFbGVtZW50PjtcclxuICAgIHRoaXMuY2hhdFVzZXJJbnZpdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC11c2VyLWludml0YXRpb25zXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgVXNlckNvbXBvbmVudC5jaGF0VXNlckluY29taW5nV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci1pbmNvbWluZy1pdGVtcy13cmFwXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgVXNlckNvbXBvbmVudC5jaGF0VXNlck91dGdvaW5nV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci1vdXRnb2luZy1pdGVtcy13cmFwXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgLy8gVXNlckNvbXBvbmVudC5jaGF0VXNlck11dGVzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAvLyAgIFwiLmNoYXQtdXNlci1tdXRlc1wiXHJcbiAgICAvLyApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJNdXRlc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItbXV0ZS1pdGVtcy13cmFwXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgLy8gVXNlckNvbXBvbmVudC5jaGF0VXNlckJsb2Nrc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgLy8gICBcIi5jaGF0LXVzZXItYmxvY2tzXCJcclxuICAgIC8vICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgVXNlckNvbXBvbmVudC5jaGF0VXNlckJsb2Nrc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItYmxvY2staXRlbXMtd3JhcFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJQdWJsaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItc2VjdXJpdHktcHVibGljXCJcclxuICAgICkhIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0VXNlckF2YWlsYWJpbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci1zZWN1cml0eS1hdmFpbGFiaWxpdHlcIlxyXG4gICAgKSEgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRVc2VyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci1zZXQtcGFzc3dvcmRcIlxyXG4gICAgKSEgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0VXNlclBhc3N3b3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjc2V0LXBhc3N3b3JkXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRVc2VyUmVQYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI3NldC1yZVBhc3N3b3JkXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXN0VXNlckxvZ291dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci1sb2dvdXRcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5jaGF0VXNlclJlbW92ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jaGF0VXNlclJlbW92ZUhhbmRsZXIpO1xyXG4gICAgdGhpcy5jaGF0VXNlclB1YmxpYy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja1VzZXJQdWJsaWNIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFVzZXJBdmFpbGFiaWxpdHkuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLmNsaWNrVXNlckF2YWlsYWJpbGl0eUhhbmRsZXJcclxuICAgICk7XHJcbiAgICB0aGlzLmNoYXRVc2VyRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0UGFzc3dvcmRIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFVzZXJJbnZpdGVzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrVXNlclJlcXVlc3QpO1xyXG4gICAgdGhpcy5jaGFzdFVzZXJMb2dvdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMudXNlckxvZ291dEhhbmRsZXIpO1xyXG4gICAgdGhpcy5jaGF0VG9nZ2xlVXNlclNlY3Rpb24oKTtcclxuICB9XHJcbiAgcmVuZGVyQ29tcG9uZW50KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGF0VXNlck5hbWUudGV4dENvbnRlbnQgPSB0aGlzLmNoYXRVc2VySW5mby5hY2NudF9uYW1lO1xyXG4gICAgdGhpcy5jaGF0VXNlclB1YmxpYy5kYXRhc2V0LnNldHRpbmdzUHJvcGVydHkgPSB1c2VyU2V0dGluZ3MucHVibGljO1xyXG4gICAgdGhpcy5jaGF0VXNlclB1YmxpYy5kYXRhc2V0LnNldHRpbmdzUHVibGljID0gYCR7dGhpcy5jaGF0VXNlckluZm8ucHJpdmFjeS5wdWJsaWN9YDtcclxuICAgIHRoaXMuY2hhdFVzZXJBdmFpbGFiaWxpdHkuZGF0YXNldC5zZXR0aW5nc1Byb3BlcnR5ID1cclxuICAgICAgdXNlclNldHRpbmdzLmF2YWlsYWJpbGl0eTtcclxuICAgIHRoaXMuY2hhdFVzZXJBdmFpbGFiaWxpdHkuZGF0YXNldC5zZXR0aW5nc0F2YWlsYWJpbGl0eSA9IGAke3RoaXMuY2hhdFVzZXJJbmZvLnByaXZhY3kuYXZhaWxhYmlsaXR5fWA7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZVJlcXVlc3RzKCk7XHJcbiAgICB0aGlzLmdlbmVyYXRlTXV0ZUJsb2NrSXRlbSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tIEVWRU5UIEhBTkRMRVJTIC0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBoaWRlcyB1c2VyIGNvbXBvbmVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBbZV1cclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNoYXRVc2VyUmVtb3ZlSGFuZGxlciA9IChlPzogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5jaGF0VXNlcldyYXAuY2xhc3NMaXN0LnJlbW92ZShcImNoYXQtdXNlci1zaG93XCIpO1xyXG4gIH07XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGFzc2lnbnMgZXZlbnQgbGlzdGVuZXJzIHRvIHVzZXIgY29tcG9uZW50IHNlY3Rpb25zJyBoZWFkcy4gKi9cclxuICBwcml2YXRlIGNoYXRUb2dnbGVVc2VyU2VjdGlvbiA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuY2hhdFVzZXJIZWFkcy5mb3JFYWNoKChoZWFkKSA9PiB7XHJcbiAgICAgIGhlYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tVc2VyU2VjdGlvbkhhbmRsZXIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiB0b2dnbGVzIHZpc2liaWxpdHkgb2YgY2xpY2tlZCB1c2VyIGNvbXBvbmVudCBzZWN0aW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrVXNlclNlY3Rpb25IYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGhlYWRJY29uOiBIVE1MRWxlbWVudCA9IChcclxuICAgICAgZS50YXJnZXQgYXMgSFRNTEhlYWRpbmdFbGVtZW50XHJcbiAgICApLnF1ZXJ5U2VsZWN0b3IoXCJpXCIpISBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGhlYWRTaWJsaW5nOiBIVE1MRWxlbWVudCA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudClcclxuICAgICAgLm5leHRFbGVtZW50U2libGluZyEgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaGVhZEljb24uY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtdXNlci1oZWFkLXRvZ2dsZWRcIik7XHJcbiAgICBoZWFkU2libGluZy5jbGFzc0xpc3QudG9nZ2xlKFwiY2hhdC11c2VyLWNvbnRlbnQtdG9nZ2xlXCIpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgY2FsbGJhY2sgbGlzdGVucyB0byBjbGljayBldmVudHMgd2hpY2ggd2lsbCBlbWl0IGEgc29ja2V0IGV2ZW50IHRvIHRoZSBzZXJ2ZXIgdG8gcmVzcG9uZCB0byBwZWVyIHwgZ3JvdXAgcmVxdWVzdHMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tVc2VyUmVxdWVzdCA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCByZXFCb2R5ID0gdGhpcy5jcmVhdGVSZXF1ZXN0Qm9keShcclxuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LmRhdGFzZXQuaXNHcm91cCBhcyBpU3RyQm9vbCxcclxuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LmRhdGFzZXQudXNlcklkIGFzIHN0cmluZ1xyXG4gICAgKTtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRhcmdldC5kYXRhc2V0LnJlcXVlc3RBY3Rpb24gYXMgaVJlcXVlc3RBY3Rpb25zO1xyXG5cclxuICAgIGlmICghYWN0aW9uKSByZXR1cm47XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgY29uc3QgcmVxdWVzdFZhbGlkID0gVmFsaWRhdGUucGF0Y2hSZXF1ZXN0RGF0YShyZXFCb2R5LCBhY3Rpb24pO1xyXG4gICAgaWYgKCFyZXF1ZXN0VmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBFUlJPUjogY2xpZW50IGRhdGEgZm9yIHVzZXIgcmVxdWVzdCBhY3Rpb24gaXMgaW52YWxpZGApO1xyXG4gICAgICBjb25zb2xlLmVycm9yKHJlcXVlc3RWYWxpZC5lcnJvcik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTT0NLRVQgUkVRVUVTVFxyXG4gICAgaWYgKFxyXG4gICAgICB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicmVxdWVzdC1hY3Rpb25cIikgJiZcclxuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnRcclxuICAgICkge1xyXG4gICAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBhdGNoUmVxdWVzdEV2LCByZXFCb2R5LCBhY3Rpb24pO1xyXG5cclxuICAgICAgLy8gdHJ5IHtcclxuICAgICAgLy8gICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQdXRVc2VyUmVxdWVzdCwgcmVxQm9keSwgYWN0aW9uKTtcclxuXHJcbiAgICAgIC8vICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcclxuICAgICAgLy8gICAgIGlmIChcclxuICAgICAgLy8gICAgICAgcmVzcG9uc2UuZGF0YS5zdGF0dXNDb2RlID49IDIwMCAmJlxyXG4gICAgICAvLyAgICAgICByZXNwb25zZS5kYXRhLnN0YXR1c0NvZGUgPCA0MDBcclxuICAgICAgLy8gICAgICkge1xyXG4gICAgICAvLyAgICAgICByZXR1cm47XHJcbiAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAvLyAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAvLyAgICAgICAgIFwiRVJST1I6IHNlcnZlciByZXNwb25kZWQgd2l0aCBhbiBlcnJvciB1cG9uIGNsaWVudCdzIHJlcXVlc3QgZm9yIHVzZXItdG8tdXNlciBjb250YWN0IHJlcXVlc3RcIlxyXG4gICAgICAvLyAgICAgICApO1xyXG4gICAgICAvLyAgICAgICBjb25zb2xlLmVycm9yKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAvLyAgICAgICByZXR1cm47XHJcbiAgICAgIC8vICAgICB9XHJcbiAgICAgIC8vICAgfSBlbHNlIHtcclxuICAgICAgLy8gICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgIC8vICAgICAgIFwiRVJST1I6IHNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyB1c2VyIHJlcXVlc3QgZnJvIHVzZXItdG8tdXNlciBjb250YWN0IHJlcXVlc3RcIlxyXG4gICAgICAvLyAgICAgKTtcclxuICAgICAgLy8gICAgIGNvbnNvbGUuZXJyb3IocmVzcG9uc2UuZXJyKTtcclxuICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgIC8vICAgICBgRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCB1c2VyLXRvLXVzZXIgY29udGFjdCByZXF1ZXN0YFxyXG4gICAgICAvLyAgICk7XHJcbiAgICAgIC8vICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAvLyB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb25cclxuICAgKiAtIHJlcXVlc3RzIGFuIEhUVFAgUEFUQ0ggdG8gdGhlIHNlcnZlciB0byBtb2RpZnkgdXNlciByZWxhdGlvbnNoaXAgc3RhdHVzIGZyb20gdGFyZ2V0IHBlZXJcclxuICAgKiAtIG1vZGlmaWVzIHBlZXIgbGlzdCBpdGVtIGFjY29yZGluZyB0byBhY3RpaW9uIHRha2VuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY2xpY2tVc2VyTXV0ZUJsb2NrID0gYXN5bmMgKFxyXG4gICAgZTogTW91c2VFdmVudFxyXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgYWN0aW9uOiBcIm11dGVcIiB8IFwiYmxvY2tcIiA9ICh0YXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudClcclxuICAgICAgLmRhdGFzZXQuYWN0aW9uISBhcyBcIm11dGVcIiB8IFwiYmxvY2tcIjtcclxuXHJcbiAgICBjb25zdCByZWxhdGlvbkFjdDogaVJlbGF0aW9uQWN0ID0ge1xyXG4gICAgICByZWNpcGllbnRJZDogKHRhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0XHJcbiAgICAgICAgLnVzZXJJZCEgYXMgc3RyaW5nLFxyXG4gICAgICB1c2VyQWN0aW9uOiBhY3Rpb24sXHJcbiAgICAgIGFjdGlvblZhbHVlOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgY29uc3QgcmVsQWN0VmFsaWQgPSBWYWxpZGF0ZS5yZWxhdGlvbkFjdGlvbihyZWxhdGlvbkFjdCk7XHJcbiAgICBpZiAoIXJlbEFjdFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IGNsaWVudCByZXF1ZXN0IGRhdGEgZm9yIHVzZXIgcmVsYXRpb24gcGF0Y2ggaXMgaW52YWxpZFwiLFxyXG4gICAgICAgIHJlbEFjdFZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSFRUUCBSRVFVRVNUXHJcbiAgICAvLyBQQVRDSCB0byB1c2VyIHJlbGF0aW9uc1xyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cFBhdGNoUmVsYXRpb24sIHJlbGF0aW9uQWN0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IGZvciBwYXRjaGluZyBvZiB1c2VyIHJlbGF0aW9uc1wiLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IHJlc1ZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIFwic2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIHVzZXIncyByZXF1ZXN0IGZvciBwYXRjaGluZyByZWxhdGlvbnNcIixcclxuICAgICAgXCJzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiB1c2VyJ3MgcmVxdWVzdCBmb3IgcGF0Y2hpbmcgcmVsYXRpb25zXCJcclxuICAgICk7XHJcbiAgICBpZiAoIXJlc1ZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgLypcclxuICAgIE1VVEUgfCBCTE9DS1xyXG4gICAgLS0tIGlmIHVubXV0ZWQgcGVlciBsaXN0IGl0ZW0gaXMgd2l0aGluIHZpc2libGUgcGVlcmxpc3RcclxuICAgIC0tLSBzb3J0IGJ5IGJ1bXAsIHRoZW4gYWRkIGl0ZW1cclxuICAgICovXHJcblxyXG4gICAgLy8gUkVNT1ZFIE1VVEUgfCBCTE9DSyBJVEVNXHJcbiAgICB0YXJnZXQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucmVtb3ZlQ2hpbGQoXHJcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50XHJcbiAgICApO1xyXG5cclxuICAgIC8vIFNFQVJDSCBGT1IgUkVMQVRJT04gSVRFTSBJTiBQRUVSIENPTVBPTkVOVFxyXG4gICAgLy8gLS0tIElGIFZJU0lCTEUsIEFDVCwgT1RIRVJXSVNFLCBJR05PUkVcclxuICAgIGNvbnN0IHJlbEl0ZW0gPSBQZWVyQ29tcG9uZW50LnNlYXJjaFBlZXJIVE1MKFxyXG4gICAgICAodGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudXNlcklkIGFzIHN0cmluZ1xyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uIHJlcXVlc3RzIGFuIEhUVFAgUFVUIHRvIHRoZSBzZXJ2ZXIgdG8gbW9kaWZ5IHRoZWlyIHB1YmxpY2l0eSBzZXR0aW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrVXNlclB1YmxpY0hhbmRsZXIgPSBhc3luYyAoZTogTW91c2VFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHVzZXJQcml2YWN5OiBpUHJpdmFjeVJlcXVlc3QgPSB7XHJcbiAgICAgIHByb3BlcnR5OiB0aGlzLmNoYXRVc2VyUHVibGljLmRhdGFzZXRcclxuICAgICAgICAuc2V0dGluZ3NQcm9wZXJ0eSBhcyBpVXNlclByaXZhY3lQcm9wLFxyXG4gICAgICB2YWx1ZTpcclxuICAgICAgICAodGhpcy5jaGF0VXNlclB1YmxpYy5kYXRhc2V0LnNldHRpbmdzUHVibGljIGFzIGlTdHJCb29sKSA9PT0gXCJ0cnVlXCJcclxuICAgICAgICAgID8gXCJmYWxzZVwiXHJcbiAgICAgICAgICA6IFwidHJ1ZVwiLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCBwcml2YWN5RGF0YVZhbGlkID0gVmFsaWRhdGUucHJpdmFjeURhdGEoXHJcbiAgICAgIHVzZXJQcml2YWN5LFxyXG4gICAgICB1c2VyU2V0dGluZ3MucHVibGljXHJcbiAgICApO1xyXG4gICAgaWYgKCFwcml2YWN5RGF0YVZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogcHJpdmFjeSBkYXRhIGZvciB1c2VyIHB1YmxpY2l0eSBjb25maWd1cmF0aW9uIHJlcXVlc3QgaXMgaW52YWxpZGAsXHJcbiAgICAgICAgcHJpdmFjeURhdGFWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cFB1dFVzZXJQcml2YWN5LCB1c2VyUHJpdmFjeSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBzZW5kIHJlcXVlc3QgZm9yIHVzZXIgcHJpdmFjeSBjb25maWd1cmF0aW9uYCxcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICBjb25zdCByZXNWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBcInNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyBjbGllbnQncyByZXF1ZXN0IGZvciBwcml2YWN5IGNvbmZpZ3VyYXRpb25cIixcclxuICAgICAgXCJzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIHByaXZhY3kgY29uZmlndXJhdGlvblwiXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVQT05TRSBQUk9DRVNTSU5HXHJcbiAgICBjb25zdCBwdWJsaWNWYWx1ZSA9XHJcbiAgICAgICh0aGlzLmNoYXRVc2VyUHVibGljLmRhdGFzZXQuc2V0dGluZ3NQdWJsaWMgYXMgaVN0ckJvb2wpID09PSBcInRydWVcIlxyXG4gICAgICAgID8gXCJmYWxzZVwiXHJcbiAgICAgICAgOiBcInRydWVcIjtcclxuICAgIHRoaXMuY2hhdFVzZXJQdWJsaWMuZGF0YXNldC5zZXR0aW5nc1B1YmxpYyA9IHB1YmxpY1ZhbHVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gcmVxdWVzdHMgYW4gSFRUUCBQVVQgdG8gdGhlIHNlcnZlciB0byBtb2RpZnkgdGhlaXIgYXZhaWxhYmlsaXR5IHNldHRpbmcuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tVc2VyQXZhaWxhYmlsaXR5SGFuZGxlciA9IGFzeW5jIChcclxuICAgIGU6IE1vdXNlRXZlbnRcclxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICBjb25zdCB1c2VyUHJpdmFjeTogaVByaXZhY3lSZXF1ZXN0ID0ge1xyXG4gICAgICBwcm9wZXJ0eTogdGhpcy5jaGF0VXNlckF2YWlsYWJpbGl0eS5kYXRhc2V0XHJcbiAgICAgICAgLnNldHRpbmdzUHJvcGVydHkgYXMgaVVzZXJQcml2YWN5UHJvcCxcclxuICAgICAgdmFsdWU6XHJcbiAgICAgICAgKHRoaXMuY2hhdFVzZXJBdmFpbGFiaWxpdHkuZGF0YXNldC5zZXR0aW5nc0F2YWlsYWJpbGl0eSBhcyBpU3RyQm9vbCkgPT09XHJcbiAgICAgICAgXCJ0cnVlXCJcclxuICAgICAgICAgID8gXCJmYWxzZVwiXHJcbiAgICAgICAgICA6IFwidHJ1ZVwiLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCBwcml2YWN5RGF0YVZhbGlkID0gVmFsaWRhdGUucHJpdmFjeURhdGEoXHJcbiAgICAgIHVzZXJQcml2YWN5LFxyXG4gICAgICB1c2VyU2V0dGluZ3MuYXZhaWxhYmlsaXR5XHJcbiAgICApO1xyXG4gICAgaWYgKCFwcml2YWN5RGF0YVZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogcHJpdmFjeSBkYXRhIGZvciB1c2VyIGF2YWlsYWJpbGl0eSBjb25maWd1cmF0aW9uIHJlcXVlc3QgaXMgaW52YWxpZGAsXHJcbiAgICAgICAgcHJpdmFjeURhdGFWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cFB1dFVzZXJQcml2YWN5LCB1c2VyUHJpdmFjeSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gc2VuZCByZXF1ZXN0IGZvciBwdWJsaWNpdHkgY29uZmlndXJhdGlvblwiLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IHJlc1ZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIFwic2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIGNsaWVudCdzIHJlcXVlc3QgZm9yIHByaXZhY3kgY29uZmlndXJhdGlvblwiLFxyXG4gICAgICBcInNlcnZlciByZXNwb25kZWQgd2l0aCBhbiBlcnJvciB1cG9uIGNsaWVudCdzIHJlcXVlc3QgZm9yIHVzZXIgcHJpdmFjeSBjb25maWd1cmF0aW9uXCJcclxuICAgICk7XHJcbiAgICBpZiAoIXJlc1ZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgLy8gSFRUUCBSRVNQT05TRSBQUk9DRVNTSU5HXHJcbiAgICBjb25zdCBwdWJsaWNWYWx1ZSA9XHJcbiAgICAgICh0aGlzLmNoYXRVc2VyQXZhaWxhYmlsaXR5LmRhdGFzZXQuc2V0dGluZ3NBdmFpbGFiaWxpdHkgYXMgaVN0ckJvb2wpID09PVxyXG4gICAgICBcInRydWVcIlxyXG4gICAgICAgID8gXCJmYWxzZVwiXHJcbiAgICAgICAgOiBcInRydWVcIjtcclxuICAgIHRoaXMuY2hhdFVzZXJBdmFpbGFiaWxpdHkuZGF0YXNldC5zZXR0aW5nc0F2YWlsYWJpbGl0eSA9IHB1YmxpY1ZhbHVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gcmVxdWVzdHMgYW4gSFRUUCBQVVQgdG8gdGhlIHNlcnZlciB0byBtb2RpZnkgdGhlaXIgYWNjb3VudCBwYXNzd29yZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IFN1Ym1pdEV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgU3VibWl0RXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHN1Ym1pdFBhc3N3b3JkSGFuZGxlciA9IGFzeW5jIChlOiBTdWJtaXRFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICBjb25zdCBwYXNzd29yZFNldDogaVVzZXJQYXNzd29yZCA9IHRoaXMuZ2V0UGFzc3dvcmRGb3JtKCk7XHJcbiAgICBjb25zdCBwYXNzd29yZFZhbGlkOiBpVmFsaWRpdHlUeXBlID1cclxuICAgICAgVmFsaWRhdGUuY2hhbmdlUGFzc3dvcmRGb3JtKHBhc3N3b3JkU2V0KTtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBpZiAoIXBhc3N3b3JkVmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgYEVSUk9SOiBwYXNzd29yZCBkYXRhIGZvciB1c2VyIHNlY3VyaXR5IGNvbmZpZ3VyYXRpb24gcmVxdWVzdCBpcyBpbnZhbGlkYCxcclxuICAgICAgICBwYXNzd29yZFZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSFRUUCBSRVFVRVNUXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwUHV0VXNlclBhc3N3b3JkLCBwYXNzd29yZFNldCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogc29tZXRoaW5nIHdlbnQgd3JvbmcgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciBwYXNzd29yZCBjaGFuZ2VgLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IHJlc1ZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIFwic2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIHVzZXIgbG9nb3V0XCIsXHJcbiAgICAgIFwic2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIGlzIHVuYWJsZSB0byBzZW5kIHJlcXVlc3QgZm9yIHVzZXIgbG9nb3V0XCJcclxuICAgICk7XHJcbiAgICBpZiAoIXJlc1ZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgdGhpcy51c2VyTG9nb3V0SGFuZGxlcigpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gc2VuZCByZXF1ZXN0IGZvciB1c2VyIGxvZ291dGAsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNsZWFyUGFzc3dvcmRGb3JtKCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbjpcclxuICAgKiAtIHJlcXVlc3RzIEhUVFAgR0VUIHRvIHRoZSBzZXJ2ZXIgdG8gaW5pdGlhdGUgYWNjb3VudCBsb2dvdXRcclxuICAgKiAtIGRlc3Ryb3kgYW55IG90aGVyIGNvbm5lY3Rpb25zXHJcbiAgICogLSBkZWxldGVzIHJlbGF0ZWQgSFRNTCBlbGVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IFtlXVxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSB1c2VyTG9nb3V0SGFuZGxlciA9IGFzeW5jIChlPzogTW91c2VFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgLy8gSFRUUCBSRVFVRVNUXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwR2V0TG9nb3V0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgYEVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIHNlbmQgcmVxdWVzdCBmb3IgdXNlciBsb2dvdXRgLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT05cclxuICAgIGNvbnN0IHJlc1ZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIFwic2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIHVzZXIgbG9nb3V0XCIsXHJcbiAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIGxvZ291dGBcclxuICAgICk7XHJcbiAgICBpZiAoIXJlc1ZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgU29ja2V0TWV0aG9kcy5kZXN0cm95KCk7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgdGhpcy5hcHBDb21wLmFwcEF1dGgoKTtcclxuXHJcbiAgICBjb25zdCBhdXRoQ29tcCA9IEF1dGhDb21wb25lbnQuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGF1dGhDb21wLmVuYWJsZUxvZ0VsZW1lbnRzKCk7XHJcbiAgICBhdXRoQ29tcC5kaXNhYmxlUmVnRWxlbWVudHMoKTtcclxuICAgIGF1dGhDb21wLnNob3dMb2dGb3JtKCk7XHJcblxyXG4gICAgdGhpcy5kZWxldGVVc2VyQ29tcG9uZW50cygpO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSByZXF1ZXN0cyBhbiBIVFRQIEdFVCB0byB0aGUgc2VydmVyXHJcbiAgICogLSBzdG9yZXMgcmVjZWl2ZWQgdXNlciBkYXRhIHRvIGNsYXNzXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8dm9pZD4gfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgZ2V0VXNlcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldFVzZXIpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcIkVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIGZldGNoIHVzZXIgZGF0YVwiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGVycm9yIG9jY3VyZWRgLFxyXG4gICAgICBgY2xpZW50IHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIGZvciB1cG9uIHJlcXVlc3QgZm9yIHVzZXIgaW5mb3JtYXRpb25gXHJcbiAgICApO1xyXG5cclxuICAgIGlmICghaHR0cFZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgLy8gSFRUUCBSRVNQT05TRSBQUk9DRVNTSU5HXHJcbiAgICB0aGlzLmNoYXRVc2VySW5mbyA9IHJlc3BvbnNlLmRhdGEuZGF0YTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0cmlldmVzIHZhbHVlcyBmcm9tIHBhc3N3b3JkIHNlY3Rpb24gaW5wdXQgZWxlbWVudHMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IGlVc2VyUGFzc3dvcmQgfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UGFzc3dvcmRGb3JtKCk6IGlVc2VyUGFzc3dvcmQge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGFzc3dvcmQ6IHRoaXMuY2hhdFVzZXJQYXNzd29yZC52YWx1ZSxcclxuICAgICAgcmVQYXNzd29yZDogdGhpcy5jaGF0VXNlclJlUGFzc3dvcmQudmFsdWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gY2xlYXJzIHZhbHVlcyBvZiBwYXNzd29yZCBzZWN0aW9uIGlucHV0IGVsZW1lbnRzLiovXHJcbiAgcHJpdmF0ZSBjbGVhclBhc3N3b3JkRm9ybSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhdFVzZXJQYXNzd29yZC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLmNoYXRVc2VyUmVQYXNzd29yZC52YWx1ZSA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGRlbGV0ZVVzZXJDb21wb25lbnRzKCk6IHZvaWQge1xyXG4gICAgVXNlckNvbXBvbmVudC5nZXRJbnN0YW5jZSh0cnVlKTtcclxuICAgIFBlZXJDb21wb25lbnQuZ2V0SW5zdGFuY2UodHJ1ZSwge30gYXMgaVVzZXJPYmopO1xyXG4gICAgTWVzc2FnZXNDb21wb25lbnQuZ2V0SW5zdGFuY2UoXHJcbiAgICAgIFwiZGVsZXRlSWRcIixcclxuICAgICAgXCJkZWxldGVJZFwiLFxyXG4gICAgICBcImRlbGV0ZU5hbWVcIixcclxuICAgICAgXCJkZWxldGVDaGF0SWRcIixcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIFwidXNlclwiLFxyXG4gICAgICB0cnVlLFxyXG4gICAgICBmYWxzZVxyXG4gICAgKTtcclxuICAgIHRoaXMuY2hhdFVzZXJXcmFwLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB0aGlzLmNoYXRQZWVyV3JhcC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgdGhpcy5jaGF0VXNlclJlbW92ZUhhbmRsZXIoKTtcclxuICB9XHJcblxyXG4gIC8qKiBMb29wcyBvdmVyIGF2YWlsYWJsZSByZXF1ZXN0IGl0ZW1zIGFycmF5IGZyb20gdXNlciBkYXRhIGZvciByZW5kZXJpbmcuICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZVJlcXVlc3RzKCk6IHZvaWQge1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5jaGF0VXNlckluZm8gfHxcclxuICAgICAgdHlwZW9mIHRoaXMuY2hhdFVzZXJJbmZvICE9PSBcIm9iamVjdFwiIHx8XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hhdFVzZXJJbmZvKS5sZW5ndGggPCAxXHJcbiAgICApXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBpbmNvbWluZyA9IHRoaXMuY2hhdFVzZXJJbmZvLnJlcXVlc3RzLmluY29taW5nO1xyXG4gICAgY29uc3Qgb3V0Z29pbmcgPSB0aGlzLmNoYXRVc2VySW5mby5yZXF1ZXN0cy5vdXRnb2luZztcclxuXHJcbiAgICBsZXQgaXRlbTogaVJlcXVlc3Q7XHJcblxyXG4gICAgZm9yIChpdGVtIG9mIGluY29taW5nKSB7XHJcbiAgICAgIFVzZXJDb21wb25lbnQuY3JlYXRlUmVxdWVzdChcclxuICAgICAgICBpdGVtLFxyXG4gICAgICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJJbmNvbWluZ1dyYXAsXHJcbiAgICAgICAgXCJpbmNvbWluZ1wiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChpdGVtIG9mIG91dGdvaW5nKSB7XHJcbiAgICAgIFVzZXJDb21wb25lbnQuY3JlYXRlUmVxdWVzdChcclxuICAgICAgICBpdGVtLFxyXG4gICAgICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJPdXRnb2luZ1dyYXAsXHJcbiAgICAgICAgXCJvdXRnb2luZ1wiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSB0cmFuc2Zvcm1zIGEgcmVxdWVzdCBpdGVtIGRhdGEgaW50byBhbiBIVE1MIGVsZW1lbnRcclxuICAgKiAtIGF0dGFjaGVzIGl0IHRvIGEgY29ycmVzcG9uZGluZyByZXF1ZXN0IHNlY3Rpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlSZXF1ZXN0IH0gaXRlbSAtIHJlcXVlc3QgaXRlbSBkYXRhXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwcGVyIC0gcmVxdWVzdCBpdGVtIHNlY3Rpb24gY29udGFpbmVyXHJcbiAgICogQHBhcmFtIHsgXCJpbmNvbWluZ1wiIHwgXCJvdXRnb2luZ1wiIH0gdHlwZSAtIHJlcXVlc3RlciBjaGF0IHR5cGVcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlUmVxdWVzdCA9IChcclxuICAgIGl0ZW06IGlSZXF1ZXN0LFxyXG4gICAgd3JhcHBlcjogSFRNTERpdkVsZW1lbnQsXHJcbiAgICB0eXBlOiBcImluY29taW5nXCIgfCBcIm91dGdvaW5nXCJcclxuICApOiB2b2lkID0+IHtcclxuICAgIGl0ZW0gPSBHZW5VdGlsLnJlcXVlc3RTdHJJbnRUb0Jvb2woaXRlbSkgYXMgaVJlcXVlc3Q7XHJcblxyXG4gICAgLy8gaWYgKGl0ZW0uaXNHcm91cCAmJiB0eXBlID09PSBcIm91dGdvaW5nXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0VmFsaWQ6IGlWYWxpZGl0eVR5cGUgPSBWYWxpZGF0ZS5yZXF1ZXN0SXRlbShcclxuICAgICAgaXRlbSxcclxuICAgICAgd3JhcHBlcixcclxuICAgICAgdHlwZVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIXJlcXVlc3RWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBSZXF1ZXN0IGl0ZW0gZGF0YSBpcyBpbnZhbGlkXCIsXHJcbiAgICAgICAgcmVxdWVzdFZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXRlbVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgY29uc3QgaXRlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuICAgIGNvbnN0IGl0ZW1BY3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICBsZXQgaXRlbUNhbmNlbCE6IEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGl0ZW1BcHByb3ZlITogSFRNTEVsZW1lbnQ7XHJcbiAgICBsZXQgaXRlbVJlamVjdCE6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGlmICh0eXBlID09PSBcIm91dGdvaW5nXCIpIHtcclxuICAgICAgaXRlbUNhbmNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgICAgaXRlbVdyYXAuY2xhc3NMaXN0LmFkZChcImNoYXQtdXNlci1vdXRnb2luZy1pdGVtXCIpO1xyXG4gICAgICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IGl0ZW0uYWNjbnRfbmFtZTtcclxuICAgICAgaXRlbUNhbmNlbC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS14bWFya1wiLCBcInJlcXVlc3QtYWN0aW9uXCIpO1xyXG4gICAgICBpdGVtQ2FuY2VsLmRhdGFzZXQucmVxdWVzdEFjdGlvbiA9IHJlcXVlc3RBY3Rpb25zLmNhbmNlbDtcclxuXHJcbiAgICAgIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGl0ZW1DYW5jZWwpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBcImluY29taW5nXCIpIHtcclxuICAgICAgaXRlbUFwcHJvdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgaXRlbVJlamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgICAgaXRlbVdyYXAuY2xhc3NMaXN0LmFkZChcImNoYXQtdXNlci1pbmNvbWluZy1pdGVtXCIpO1xyXG4gICAgICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IGl0ZW0uYWNjbnRfbmFtZTtcclxuICAgICAgaXRlbUFwcHJvdmUuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtY2hlY2tcIiwgXCJyZXF1ZXN0LWFjdGlvblwiKTtcclxuICAgICAgaXRlbUFwcHJvdmUuZGF0YXNldC5yZXF1ZXN0QWN0aW9uID0gcmVxdWVzdEFjdGlvbnMuYXBwcm92ZTtcclxuICAgICAgaXRlbVJlamVjdC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS14bWFya1wiLCBcInJlcXVlc3QtYWN0aW9uXCIpO1xyXG4gICAgICBpdGVtUmVqZWN0LmRhdGFzZXQucmVxdWVzdEFjdGlvbiA9IHJlcXVlc3RBY3Rpb25zLnJlamVjdDtcclxuXHJcbiAgICAgIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGl0ZW1BcHByb3ZlKTtcclxuICAgICAgaXRlbUFjdGlvbnMuYXBwZW5kQ2hpbGQoaXRlbVJlamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVdyYXAuZGF0YXNldC51c2VySWQgPSBpdGVtLmFjY250X2lkO1xyXG4gICAgaXRlbVdyYXAuZGF0YXNldC5pc0dyb3VwID0gaXRlbS5pc0dyb3VwID8gYHRydWVgIDogYGZhbHNlYDtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1BY3Rpb25zKTtcclxuXHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGl0ZW1XcmFwKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGRlbGV0ZXMgYSByZXF1ZXN0IEhUTUwgZWxlbWVudCBmcm9tIHRoZSB1c2VyIGNvbXBvbmVudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHJlcXVlc3RJdGVtSWQgLSBhY2NvdW50IG9yIGdyb3VwIGlkIG9mIHRoZSByZXF1ZXN0IGl0ZW1cclxuICAgKiBAcGFyYW0geyAwIHwgMSB9IHR5cGUgLSBhY2NvdW50IHR5cGUgb2YgdGhlIHJlcXVlc3QgaXRlbVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBkZWxldGVSZXF1ZXN0ID0gKFxyXG4gICAgcmVxdWVzdEl0ZW1JZDogc3RyaW5nLFxyXG4gICAgdHlwZTogMCB8IDFcclxuICApOiB2b2lkID0+IHtcclxuICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICBjb25zdCBpbnB1dFZhbGlkID0gVmFsaWRhdGUucmVxdWVzdERlbChyZXF1ZXN0SXRlbUlkLCB0eXBlKTtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBpZiAoIWlucHV0VmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgYEVSUk9SOiBTZXJ2ZXIgc2VuZCBpbnZhbGlkIHJlcXVlc3QgZGVsZXRpb24gZGF0YWAsXHJcbiAgICAgICAgaW5wdXRWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBST0NFU1M6IHdyYXBwZXIgaWRlbnRpZmljYXRpb25cclxuICAgIGxldCBwYXJlbnROb2RlOiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHR5cGUgPT09IDBcclxuICAgICAgPyAocGFyZW50Tm9kZSA9IHRoaXMuY2hhdFVzZXJPdXRnb2luZ1dyYXApXHJcbiAgICAgIDogKHBhcmVudE5vZGUgPSB0aGlzLmNoYXRVc2VySW5jb21pbmdXcmFwKTtcclxuXHJcbiAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKFxyXG4gICAgICAoWy4uLnBhcmVudE5vZGUuY2hpbGRyZW5dIGFzIEFycmF5PEhUTUxEaXZFbGVtZW50PikuZmlsdGVyKFxyXG4gICAgICAgIChpdGVtKSA9PiByZXF1ZXN0SXRlbUlkID09PSBpdGVtLmRhdGFzZXQudXNlcklkXHJcbiAgICAgIClbMF1cclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb25cclxuICAgKiAtIGxvb3BzIG9mZXIgcmV0cmlldmVkIHVzZXIgcmVsYXRpb24gZGF0YVxyXG4gICAqIC0gcGlja3Mgd2hvIHdpbGwgYmVsb25nIHRvIG11dGUgJiBibG9jayBzZWN0aW9uXHJcbiAgICogKi9cclxuICBwcml2YXRlIGdlbmVyYXRlTXV0ZUJsb2NrSXRlbSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IG11dGVzID0gdGhpcy5jaGF0VXNlckluZm8ucmVsYXRpb25zLm11dGVzO1xyXG4gICAgY29uc3QgYmxvY2tzID0gdGhpcy5jaGF0VXNlckluZm8ucmVsYXRpb25zLmJsb2NrcztcclxuICAgIGxldCBtdXRlOiBpUmVsYXRpb247XHJcbiAgICBsZXQgYmxvY2s6IGlSZWxhdGlvbjtcclxuXHJcbiAgICBmb3IgKG11dGUgb2YgbXV0ZXMpIHtcclxuICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVNdXRlQmxvY2tJdGVtKFxyXG4gICAgICAgIG11dGUsXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jaGF0VXNlck11dGVzV3JhcCxcclxuICAgICAgICAwXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGJsb2NrIG9mIGJsb2Nrcykge1xyXG4gICAgICBVc2VyQ29tcG9uZW50LmNyZWF0ZU11dGVCbG9ja0l0ZW0oXHJcbiAgICAgICAgYmxvY2ssXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jaGF0VXNlckJsb2Nrc1dyYXAsXHJcbiAgICAgICAgMVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvblxyXG4gICAqIC0gdHJhbnNmb3JtcyBhIGlSZWxhdGlvbiBpdGVtIGRhdGEgaW50byBhbiBIVE1MIGVsZW1lbnRcclxuICAgKiAtIGF0dGFjaGVzIGl0IHRvIGEgY29ycmVzcG9uZGluZyBzZWN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVsYXRpb24gfSBpdGVtIC0gcmVxdWVzdCBpdGVtIGRhdGFcclxuICAgKiBAcGFyYW0geyBIVE1MRGl2RWxlbWVudCB9IHdyYXBwZXIgLSByZXF1ZXN0IGl0ZW0gc2VjdGlvbiBjb250YWluZXJcclxuICAgKiBAcGFyYW0geyAwIHwgMSB9IHR5cGUgLSBtdXRlIHwgYmxvY2sgaXRlbSBjaGF0IHR5cGVcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBjcmVhdGVNdXRlQmxvY2tJdGVtID0gKFxyXG4gICAgaXRlbTogaVJlbGF0aW9uLFxyXG4gICAgd3JhcHBlcjogSFRNTERpdkVsZW1lbnQsXHJcbiAgICAvLyAwIChtdXRlKSAgICAoMSkgYmxvY2tcclxuICAgIHR5cGU6IDAgfCAxXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCBpdGVtVmFsaWQgPSBWYWxpZGF0ZS5tdXRlQmxvY2tJdGVtKGl0ZW0sIHdyYXBwZXIsIHR5cGUpO1xyXG4gICAgaWYgKCFpdGVtVmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgYEVSUk9SOiBNdXRlIGl0ZW0gY29udGFpbnMgaW52YWxpZCBkYXRhYCxcclxuICAgICAgICBpdGVtVmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpdGVtIHdyYXBwZXJcclxuICAgIGNvbnN0IGl0ZW1XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGl0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LXVzZXItYmxvY2staXRlbVwiKTtcclxuXHJcbiAgICAvLyBpdGVtIG5hbWVcclxuICAgIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IGl0ZW0uYWNjbnRfbmFtZTtcclxuXHJcbiAgICAvLyBpdGVtIGFjdGlvblxyXG4gICAgY29uc3QgaXRlbUFjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgaXRlbUFjdGlvbi5kYXRhc2V0LnVzZXJJZCA9IGl0ZW0uYWNjbnRfaWQ7XHJcbiAgICBpdGVtQWN0aW9uLmRhdGFzZXQuYWN0aW9uID0gdHlwZSA9PT0gMCA/IFwibXV0ZVwiIDogXCJibG9ja1wiO1xyXG4gICAgaXRlbUFjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgVXNlckNvbXBvbmVudC5jbGlja1VzZXJNdXRlQmxvY2spO1xyXG5cclxuICAgIC8vIGl0ZW0gaWNvblxyXG4gICAgY29uc3QgaXRlbUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGl0ZW1JY29uLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXhtYXJrXCIpO1xyXG5cclxuICAgIGl0ZW1BY3Rpb24uYXBwZW5kQ2hpbGQoaXRlbUljb24pO1xyXG4gICAgaXRlbVdyYXAuYXBwZW5kQ2hpbGQoaXRlbU5hbWUpO1xyXG4gICAgaXRlbVdyYXAuYXBwZW5kQ2hpbGQoaXRlbUFjdGlvbik7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGl0ZW1XcmFwKTtcclxuXHJcbiAgICAvLyBNT0RFTCBIVE1MXHJcbiAgICAvLyA8ZGl2IGNsYXNzPSdjaGF0LXVzZXItYmxvY2staXRlbSc+XHJcbiAgICAvLyAgIDxwPmJsb2NrZWQgdXNlcjwvcD5cclxuICAgIC8vICAgPHAgZGF0YS11c2VyLWlkPSczYXNkYTNkYTQnIGRhdGEtYWN0aW9uPSdibG9jayc+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLXhtYXJrJz48L2k+XHJcbiAgICAvLyAgIDwvcD5cclxuICAgIC8vIDwvZGl2PjtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYW4gb2JqZWN0IHRvIGJlIHNlbnQgYWxvbmcgYW4gSFRUUCBSZXF1ZXN0IHdoZW4gc2VuZGluZyBwZWVyIHJlcXVlc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpU3RyQm9vbCB9IGlzR3JvdXBcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSByZWNlaXZlcklkXHJcbiAgICogQHJldHVybnMgeyBpUmVxdWVzdEJvZHkgfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlUmVxdWVzdEJvZHkoXHJcbiAgICBpc0dyb3VwOiBpU3RyQm9vbCxcclxuICAgIHJlY2VpdmVySWQ6IHN0cmluZ1xyXG4gICk6IGlSZXF1ZXN0Qm9keSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBpc0dyb3VwID09PSBcInRydWVcIiA/IDIgOiAxLFxyXG4gICAgICByZWNpcGllbnRJZDogaXNHcm91cCA9PT0gXCJmYWxzZVwiID8gcmVjZWl2ZXJJZCA6IG51bGwsXHJcbiAgICAgIGdyb3VwSWQ6IGlzR3JvdXAgPT09IFwidHJ1ZVwiID8gcmVjZWl2ZXJJZCA6IG51bGwsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zOlxyXG4gICAqIC0gYSBuZXcgb3Igb2xkIGluc3RhbmNlXHJcbiAgICogLSBudWxsIGlmIHRoZSBjb21wb25lbnQgaXMgaW5zdHJ1Y3RlZCBmb3IgZGVsZXRpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBkZWxldGVJbnN0YW5jZSAtIGZsYWcgaW5kaWNhdGluZyB3aHRoZXIgdGhlIGNvbXBvbmVudCB3aWxsIGJlIGRlbGV0ZWQuXHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdGFuY2UgPSAoXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhblxyXG4gICk6IFVzZXJDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghZGVsZXRlSW5zdGFuY2UpIHtcclxuICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFVzZXJDb21wb25lbnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UhLmNoYXRVc2VyUmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgICB0aGlzLmluc3RhbmNlIS5jaGF0VXNlcldyYXAuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGlBdXRoSW5wdXRzIH0gZnJvbSBcIi4uL21vZGVscy9hdXRoLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlDaGF0UmVxQm9keSB9IGZyb20gXCIuLi9tb2RlbHMvY2hhdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpUmVsQm9keSwgaVJlcXVlc3RCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuaW1wb3J0IHsgaU5ld0dycEJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2dyb3VwLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlIdHRwUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2h0dHAubW9kZWxcIjtcclxuaW1wb3J0IHsgaVJlbGF0aW9uQWN0LCBpU2VhcmNoVmFsdWVzIH0gZnJvbSBcIi4uL21vZGVscy9wZWVyLm1vZGVsXCI7XHJcbmltcG9ydCB7XHJcbiAgaVVzZXJQYXRjaFJlcXVlc3QsXHJcbiAgaUNvbnRhY3RUeXBlcyxcclxuICBpUHJpdmFjeVJlcXVlc3QsXHJcbiAgaVJlcXVlc3RBY3Rpb25zLFxyXG59IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBQb3N0TG9naW4obG9naW5Cb2R5OiBpQXV0aElucHV0cykge1xyXG4gIGxldCByZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvYXV0aC9sb2dpblwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIjogXCJ0cnVlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGxvZ2luQm9keSksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwUG9zdFJlZ2lzdGVyKHJlZ0JvZHk6IGlBdXRoSW5wdXRzKSB7XHJcbiAgbGV0IHJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvMS9hdXRoL3JlZ2lzdGVyXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiOiBcInRydWVcIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVnQm9keSksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwR2V0QXV0aCgpIHtcclxuICBsZXQgcmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL2F1dGhcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cEdldFVzZXJzKHNlYXJjaFZhbHVlczogaVNlYXJjaFZhbHVlcykge1xyXG4gIGxldCByZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvMS91c2VyL3NlYXJjaC9gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzZWFyY2hWYWx1ZXMpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cFBvc3RVc2VyUmVxdWVzdChyZXF1ZXN0Qm9keTogaVJlcXVlc3RCb2R5KSB7XHJcbiAgbGV0IHJlc3BvbnNlITogUmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL3JlcXVlc3RcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cFB1dFVzZXJSZXF1ZXN0KFxyXG4gIHJlcXVlc3RCb2R5OiBpUmVxdWVzdEJvZHksXHJcbiAgcmVxdWVzdEFjdGlvbjogaVJlcXVlc3RBY3Rpb25zXHJcbikge1xyXG4gIGxldCByZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvMS9yZXF1ZXN0LyR7cmVxdWVzdEFjdGlvbn1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdEJvZHkpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cFB1dFVzZXJQcml2YWN5KHVzZXJTZXR0aW5nczogaVByaXZhY3lSZXF1ZXN0KSB7XHJcbiAgbGV0IHJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC8xL3VzZXIvc2V0dGluZ3NgLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJTZXR0aW5ncyksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge31cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBQdXRVc2VyUGFzc3dvcmQocGFzc3dvcmRTZXQ6IHtcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIHJlUGFzc3dvcmQ6IHN0cmluZztcclxufSkge1xyXG4gIGxldCByZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvdXNlci9zZXR0aW5ncy9wYXNzd29yZFwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBhc3N3b3JkU2V0KSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBHZXRMb2dvdXQoKSB7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvYXV0aC9sb2dvdXRcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cEdldFVzZXIoKSB7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvdXNlclwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwR2V0VXNlclJlbGF0aW9ucyhyZWxCb2R5OiBpUmVsQm9keSkge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgLzEvcmVsYXRpb25gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZWxCb2R5KSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBQYXRjaFJlbGF0aW9uKHJlbGF0aW9uQWN0OiBpUmVsYXRpb25BY3QpIHtcclxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvMS9yZWxhdGlvblwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVsYXRpb25BY3QpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cEdldEdyb3VwKGdyb3VwSWQ6IHN0cmluZykge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgLzEvZ3JvdXAvJHtncm91cElkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBHZXRHcm91cHMoKSB7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvZ3JvdXBcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cFBvc3RHcm91cChuZXdHcnA6IGlOZXdHcnBCb2R5KSB7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvZ3JvdXBcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobmV3R3JwKSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBHZXRNc2dzKGNoYXREYXRhOiBpQ2hhdFJlcUJvZHkpIHtcclxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvMS9jaGF0XCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNoYXREYXRhKSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBHZXRUb3BNc2coY2hhdElkOiBzdHJpbmcpIHtcclxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC8xL2NoYXQvJHtjaGF0SWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBwYXNzd29yZF9wYXR0ZXJuID0gbmV3IFJlZ0V4cChcclxuICBcIl4oPz0uKj9bQS1aXSkoPz0uKj9bYS16XSkoPz0uKj9bMC05XSkoPz0uKj9bIz8hQCQlXiYqLV0pLns4LH0kXCIsXHJcbiAgXCJnXCJcclxuKTtcclxuZXhwb3J0IGNvbnN0IHVzZXJuYW1lX3BhdHRlcm4gPSBuZXcgUmVnRXhwKFwiXlthLXpBLVowLTkjPyFAJCVeJipdezgsMjB9JFwiKTtcclxuLy8gVVNFRCBBTE9OR1NJREUgLm1hdGNoKCkgbWV0aG9kXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlBdXRoSW5wdXRzIHtcclxuICB1c2VybmFtZTogc3RyaW5nO1xyXG4gIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgcmVQYXNzd29yZD86IHN0cmluZztcclxufVxyXG4iLCJleHBvcnQgY29uc3QgcmVsYXRpb25UeXBlOiB7XHJcbiAgY29udGFjdDogXCJjb250YWN0XCI7XHJcbiAgbXV0ZTogXCJtdXRlXCI7XHJcbiAgYmxvY2s6IFwiYmxvY2tcIjtcclxufSA9IHtcclxuICBjb250YWN0OiBcImNvbnRhY3RcIixcclxuICBtdXRlOiBcIm11dGVcIixcclxuICBibG9jazogXCJibG9ja1wiLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbnRhY3RBY3Q6IHsgYXJjaGl2ZTogXCJhcmNoaXZlXCI7IGJsb2NrOiBcImJsb2NrXCI7IG11dGU6IFwibXV0ZVwiIH0gPVxyXG4gIHtcclxuICAgIGFyY2hpdmU6IFwiYXJjaGl2ZVwiLFxyXG4gICAgYmxvY2s6IFwiYmxvY2tcIixcclxuICAgIG11dGU6IFwibXV0ZVwiLFxyXG4gIH07XHJcblxyXG5leHBvcnQgY29uc3QgY2hhdFR5cGU6IGlDaGF0VHlwZSA9IHtcclxuICB1c2VyOiBcInVzZXJcIixcclxuICBncm91cDogXCJncm91cFwiLFxyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpQ2hhdFR5cGUge1xyXG4gIHVzZXI6IFwidXNlclwiO1xyXG4gIGdyb3VwOiBcImdyb3VwXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaVNlYXJjaFZhbHVlcyB7XHJcbiAgcGF0dGVybjogc3RyaW5nO1xyXG4gIHR5cGU6IDAgfCAxO1xyXG4gIHNraXA6IG51bWJlcjtcclxuICBjbnQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpU2VhcmNoSXRlbSB7XHJcbiAgYWNjbnRfaWQ6IHN0cmluZztcclxuICBhY3RfbmFtZTogc3RyaW5nO1xyXG4gIGF2YWlsYWJpbGl0eTogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgdHlwZSBpU2VhcmNoSXRlbXMgPSBBcnJheTxpU2VhcmNoSXRlbT47XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlDb250YWN0VmFsdWUge1xyXG4gIGFjY250X2lkOiBzdHJpbmc7XHJcbiAgYWNjbnRfbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlSZWxhdGlvbkFjdCB7XHJcbiAgcmVjaXBpZW50SWQ6IHN0cmluZztcclxuICB1c2VyQWN0aW9uOiBcImFyY2hpdmVcIiB8IFwiYmxvY2tcIiB8IFwibXV0ZVwiO1xyXG4gIGFjdGlvblZhbHVlOiBib29sZWFuO1xyXG59XHJcbiIsImV4cG9ydCB0eXBlIGlVc2VyVHlwZSA9IFwibG9jYWxcIiB8IFwiZ29vZ2xlXCIgfCBcImZhY2Vib29rXCIgfCBcImdpdGh1YlwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpVXNlck9iaiB7XHJcbiAgYWN0X2lkOiB7XHJcbiAgICBhY2NudF90eXBlOiBpVXNlclR5cGU7XHJcbiAgICBhY2NudF9pZDogc3RyaW5nO1xyXG4gIH07XHJcbiAgYWN0X25hbWU6IHN0cmluZztcclxuICBzZWN1cml0eTogc3RyaW5nO1xyXG4gIHJlcXVlc3RzOiBzdHJpbmc7XHJcbiAgcmVsYXRpb25zOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXF1ZXN0QWN0aW9uczoge1xyXG4gIGFwcHJvdmU6IFwiYXBwcm92ZVwiO1xyXG4gIHJlamVjdDogXCJyZWplY3RcIjtcclxuICBjYW5jZWw6IFwiY2FuY2VsXCI7XHJcbn0gPSB7XHJcbiAgYXBwcm92ZTogXCJhcHByb3ZlXCIsXHJcbiAgcmVqZWN0OiBcInJlamVjdFwiLFxyXG4gIGNhbmNlbDogXCJjYW5jZWxcIixcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VyU2V0dGluZ3M6IHtcclxuICBwdWJsaWM6IFwicHVibGljXCI7XHJcbiAgYXZhaWxhYmlsaXR5OiBcImF2YWlsYWJpbGl0eVwiO1xyXG59ID0ge1xyXG4gIHB1YmxpYzogXCJwdWJsaWNcIixcclxuICBhdmFpbGFiaWxpdHk6IFwiYXZhaWxhYmlsaXR5XCIsXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBpVXNlclJlcXVlc3RTdGF0ZSA9XHJcbiAgfCBcImFwcHJvdmVkXCJcclxuICB8IFwicGVuZGluZ1wiXHJcbiAgfCBcInJlamVjdGVkXCJcclxuICB8IFwiY2FuY2VsbGVkXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaVJlcXVlc3RUeXBlOiB7IG91dDogXCJvdXRnb2luZ1wiOyBpbjogXCJpbmNvbWluZ1wiIH0gPSB7XHJcbiAgb3V0OiBcIm91dGdvaW5nXCIsXHJcbiAgaW46IFwiaW5jb21pbmdcIixcclxufTtcclxuZXhwb3J0IHR5cGUgaVVzZXJQcml2YWN5UHJvcCA9IFwicHVibGljXCIgfCBcImF2YWlsYWJpbGl0eVwiO1xyXG5leHBvcnQgdHlwZSBpVXNlclByaXZhY3lWYWx1ZSA9IFwidHJ1ZVwiIHwgXCJmYWxzZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgaVJlcXVlc3RBY3Rpb25zID0gXCJhcHByb3ZlXCIgfCBcInJlamVjdFwiIHwgXCJjYW5jZWxcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaVJlcXVlc3RBcHByb3ZlRGF0YSB7XHJcbiAgbmV3U3RhdHVzOiBpVXNlclJlcXVlc3RTdGF0ZTtcclxuICByZWxJdGVtOiBpUmVsYXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIGlDb250YWN0VHlwZXMgPSBcImNvbnRhY3RcIiB8IFwibXV0ZVwiIHwgXCJibG9ja1wiO1xyXG5leHBvcnQgaW50ZXJmYWNlIGlSZWxhdGlvbiB7XHJcbiAgYWNjbnRfaWQ6IHN0cmluZztcclxuICBhY2NudF9uYW1lOiBzdHJpbmc7XHJcbiAgdHlwZTogXCJ1c2VyXCIgfCBcImdyb3VwXCI7XHJcbiAgY2hhdF9pZDogc3RyaW5nO1xyXG4gIGFkbWluOiBib29sZWFuO1xyXG4gIGJsb2NrOiBib29sZWFuO1xyXG4gIG11dGU6IGJvb2xlYW47XHJcbiAgYXJjaGl2ZTogYm9vbGVhbjtcclxuICBidW1wOiBudW1iZXI7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBpUHJpdmFjeVJlcXVlc3Qge1xyXG4gIHByb3BlcnR5OiBpVXNlclByaXZhY3lQcm9wO1xyXG4gIHZhbHVlOiBpVXNlclByaXZhY3lWYWx1ZTtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIGlSZXF1ZXN0IHtcclxuICBhY2NudF9pZDogc3RyaW5nO1xyXG4gIGFjY250X25hbWU6IHN0cmluZztcclxuICBpc0dyb3VwOiBCb29sZWFuO1xyXG4gIHN0YXR1czogXCJhcHByb3ZlZFwiIHwgXCJwZW5kaW5nXCIgfCBcInJlamVjdGVkXCIgfCBcImNhbmNlbGxlZFwiO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlVc2VyIHtcclxuICBhY2NudF9pZDogc3RyaW5nO1xyXG4gIGFjY250X25hbWU6IHN0cmluZztcclxuICBwcml2YWN5OiBpVXNlclByaXZhY3k7XHJcbiAgcmVxdWVzdHM6IHtcclxuICAgIGluY29taW5nOiBBcnJheTxpUmVxdWVzdD47XHJcbiAgICBvdXRnb2luZzogQXJyYXk8aVJlcXVlc3Q+O1xyXG4gIH07XHJcbiAgcmVsYXRpb25zOiB7XHJcbiAgICBtdXRlczogQXJyYXk8aVJlbGF0aW9uPjtcclxuICAgIGJsb2NrczogQXJyYXk8aVJlbGF0aW9uPjtcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlVc2VyUGF0Y2hSZXF1ZXN0IHtcclxuICByZWNpcGllbnRJZDogc3RyaW5nO1xyXG4gIHN0YXR1czogaVJlcXVlc3RBY3Rpb25zO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlVc2VyUHJpdmFjeSB7XHJcbiAgcHVibGljOiBib29sZWFuO1xyXG4gIGF2YWlsYWJpbGl0eTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpVXNlclBhc3N3b3JkIHtcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIHJlUGFzc3dvcmQ6IHN0cmluZztcclxufVxyXG4iLCJpbXBvcnQgeyBpTXNnQm9keSB9IGZyb20gXCIuLi9tb2RlbHMvbXNnTGlzdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpUmVsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgUGVlckNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BlZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlc0xpc3RDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9tc2dzTGlzdC5jb21wXCI7XHJcblxyXG4vKiogVGhpcyBjbGFzcyBob2xkcyBmdW5jdGlvbnMgd2hpY2ggbWFuYWdlcyBNZXNzYWdlIExpc3QgSFRNTCAmIERhdGEsIGFuZCBQZWVyIENvbXBvbmVudCBIVE1MIFVwZGF0ZS4qL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZUV2ZW50IHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0OiBNZXNzYWdlRXZlbnQ7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGVudGFpbHMgdGhlIG9jY3VyaW5nIGxvZ2ljIHdoZW4gYSBtZXNzYWdlIGlzIHJlY2VpdmVkLlxyXG4gICAqIC0gbWVzc2FnZSBsaXN0IEhUTUwgdXBkYXRlXHJcbiAgICogLSBwZWVyIGxpc3QgSFRNTCB1cGRhdGVcclxuICAgKiAtIG1lc3NhZ2UgbGlzdCBkYXRhIHVwZGF0ZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgaU1zZ0JvZHkgfSBkYXRhIC0gbWVzc2FnZSByZWNlaXZlZCBmcm9tIHNvY2tldFxyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBwb3N0TWVzc2FnZVIgPSAoZGF0YTogaU1zZ0JvZHkpOiB2b2lkID0+IHtcclxuICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5jcmVhdGVNc2dJdGVtKFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ0JvZHkoKSxcclxuICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldENoYXRNc2dzTGlzdFdyYXAoKSxcclxuICAgICAgLy8gMCAtIGZyb20gY2xpZW50IGJyb3dzZXIgICAgICAxIC0gZnJvbSBvdGhlciB1c2VyKHMpXHJcbiAgICAgIDFcclxuICAgICk7XHJcblxyXG4gICAgUGVlckNvbXBvbmVudC51cGRhdGVQZWVyTGlzdEhUTUwoXHJcbiAgICAgIHsgYWNjbnRfaWQ6IGRhdGEuc2VuZGVySWQsIGNoYXRfaWQ6IGRhdGEuY2hhdElkIH0gYXMgaVJlbGF0aW9uLFxyXG4gICAgICBkYXRhXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0SW5zdCgpICE9PSBudWxsKVxyXG4gICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0SW5zdCgpIS5pbmNyTXNnc0xpc3RDbnQoKTtcclxuXHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuc2V0TXNnTGlzdEluZm8oXHJcbiAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCkuZGF0YXNldC5jaGF0SWQhLFxyXG4gICAgICBkYXRhLFxyXG4gICAgICBudWxsXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIG5ldyBvciB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBNZXNzYWdlRXZlbnQgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0ID0gKCk6IE1lc3NhZ2VFdmVudCA9PiB7XHJcbiAgICBpZiAoIXRoaXMuaW5zdCkgdGhpcy5pbnN0ID0gbmV3IE1lc3NhZ2VFdmVudCgpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdDtcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBSZWxhdGlvbkV2ZW50IHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0OiBSZWxhdGlvbkV2ZW50O1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgcGF0Y2hSZWxhdGlvbiA9ICgpID0+IHt9O1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdCA9ICgpOiBSZWxhdGlvbkV2ZW50ID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0KSB0aGlzLmluc3QgPSBuZXcgUmVsYXRpb25FdmVudCgpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdDtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IEdlblV0aWwgfSBmcm9tIFwiLi4vdXRpbC9nZW4udXRpbFwiO1xyXG5pbXBvcnQgeyBpUmVxVHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvZ2VuLm1vZGVsXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvbi51dGlsXCI7XHJcbmltcG9ydCB7IFNvY2tldE1ldGhvZHMgfSBmcm9tIFwiLi4vdXRpbC9zb2NrZXQudXRpbFwiO1xyXG5pbXBvcnQgeyBVc2VyQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvdXNlci5jb21wXCI7XHJcbmltcG9ydCB7IFBlZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wZWVyLmNvbXBcIjtcclxuaW1wb3J0IHsgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbXNnc09wdHMuY29tcFwiO1xyXG5pbXBvcnQgeyBpUmVxdWVzdCwgaVJlcXVlc3RBcHByb3ZlRGF0YSB9IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5cclxuLyoqIFRoaXMgY2xhc3MgaG9sZHMgZnVuY3Rpb24gICovXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0RXZlbnRzIHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0OiBSZXF1ZXN0RXZlbnRzO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBlbnRhaWxzIHRoZSBsb2dpYyB1cG9uIHJlY2VpdmluZyBhIHJlcXVlc3QgcG9zdCBmcm9tIHNvY2tldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlSZXF1ZXN0IH0gcmVxdWVzdEl0ZW0gLSByZXF1ZXN0IGJvZHkgb2JqZWN0XHJcbiAgICogQHBhcmFtIHsgMCB8IDEgfSB0eXBlIC0gMCBvdXRnb2luZyB8IDEgaW5jb21pbmdcclxuICAgKiBAcGFyYW0geyBpUmVxVHlwZSB9IHJlcVR5cGUgLSAxIHUydSAodXNlci11c2VyKSB8IDIgdTJnICh1c2VyLWdyb3VwKSB8IDMgZzJ1IChncm91cC11c2VyKVxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGdyb3VwIGNoYXQgaWQgb2YgdGhlIHRhcmdldCBncm91cCBvZiByZXF1ZXN0XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHBvc3RSZXF1ZXN0UiA9IChcclxuICAgIHJlcXVlc3RJdGVtOiBpUmVxdWVzdCxcclxuICAgIHR5cGU6IDAgfCAxLFxyXG4gICAgcmVxVHlwZTogaVJlcVR5cGUsXHJcbiAgICBjaGF0SWQ6IHN0cmluZ1xyXG4gICk6IHZvaWQgPT4ge1xyXG4gICAgLy8gT1BUSU9OIEZPUiBBRERJTkcgUkVRVUVTVCBWSUEgU09DS0VUIElTIE5PVCBWSUFCTEUgU0lOQ0UgU09DS0VUIElEIEFSRSBGUk9NIFVTRVIgSUQsIENPTk5FQ1RFRCBVUE9OIExPR0dJTkcgSU4sIEdST1VQIFNPQ0tFVCBJRFMsIE1VU1QgRklSU1QgQkUgRVNUQUJMSVNIRURcclxuICAgIHJlcXVlc3RJdGVtID0gR2VuVXRpbC5yZXF1ZXN0U3RySW50VG9Cb29sKHJlcXVlc3RJdGVtKTtcclxuXHJcbiAgICBpZiAocmVxVHlwZSA9PT0gMSkge1xyXG4gICAgICAvLyBpZiB1MnUsIGFkZCByZXF1ZXN0IHRvIHVzZXIgY29tcFxyXG4gICAgICBVc2VyQ29tcG9uZW50LmNyZWF0ZVJlcXVlc3QoXHJcbiAgICAgICAgcmVxdWVzdEl0ZW0sXHJcbiAgICAgICAgdHlwZSA9PT0gMFxyXG4gICAgICAgICAgPyBVc2VyQ29tcG9uZW50LmNoYXRVc2VyT3V0Z29pbmdXcmFwXHJcbiAgICAgICAgICA6IFVzZXJDb21wb25lbnQuY2hhdFVzZXJJbmNvbWluZ1dyYXAsXHJcbiAgICAgICAgdHlwZSA9PT0gMCA/IFwib3V0Z29pbmdcIiA6IFwiaW5jb21pbmdcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChyZXFUeXBlID09PSAyKSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBpZiB1MmcsIGVpdGhlclxyXG4gICAgICAgKiAtIGFkZCByZXF1ZXN0IHRvIHVzZXIgY29tcCBpZiBvdXRnb2luZ1xyXG4gICAgICAgKiAtIGFkZCByZXF1ZXN0IHRvIG1lc3NhZ2UgY29tcCBpZiBpbmNvbWluZ1xyXG4gICAgICAgKi9cclxuICAgICAgaWYgKHR5cGUgPT09IDApXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVSZXF1ZXN0KFxyXG4gICAgICAgICAgcmVxdWVzdEl0ZW0sXHJcbiAgICAgICAgICBVc2VyQ29tcG9uZW50LmNoYXRVc2VyT3V0Z29pbmdXcmFwLFxyXG4gICAgICAgICAgXCJvdXRnb2luZ1wiXHJcbiAgICAgICAgKTtcclxuICAgICAgZWxzZVxyXG4gICAgICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5jcmVhdGVSZXF1ZXN0KFxyXG4gICAgICAgICAgcmVxdWVzdEl0ZW0sXHJcbiAgICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c0luY29taW5nV3JhcCgpLFxyXG4gICAgICAgICAgXCJpbmNvbWluZ1wiLFxyXG4gICAgICAgICAgY2hhdElkXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBpZiBnMnUsXHJcbiAgICAgICAqIC0gYWRkIHJlcXVlc3QgdG8gbWVzc2FnZSBjb21wIGlmIG91dGdvaW5nXHJcbiAgICAgICAqIC0gYWRkIHJlcXVlc3QgdG8gdXNlciBjb21wIGlmIGluY29taW5nXHJcbiAgICAgICAqL1xyXG4gICAgICBpZiAodHlwZSA9PT0gMClcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuY3JlYXRlUmVxdWVzdChcclxuICAgICAgICAgIHJlcXVlc3RJdGVtLFxyXG4gICAgICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmdldE1zZ09wdHNPdXRnb2luZ1dyYXAoKSxcclxuICAgICAgICAgIFwib3V0Z29pbmdcIixcclxuICAgICAgICAgIGNoYXRJZFxyXG4gICAgICAgICk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBVc2VyQ29tcG9uZW50LmNyZWF0ZVJlcXVlc3QoXHJcbiAgICAgICAgICByZXF1ZXN0SXRlbSxcclxuICAgICAgICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJJbmNvbWluZ1dyYXAsXHJcbiAgICAgICAgICBcImluY29taW5nXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gZW50YWlscyB0aGUgbG9naWMgdXBvbiByZWNlaXZpbmcgYSByZXF1ZXN0IHBhdGNoIGZyb20gc29ja2V0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcmVxdWVzdEl0ZW1JZCAtIGFjY291bnQgaWQgb2YgdGhlIG90aGVyIHBhcnR5IG9mIHJlcXVlc3RcclxuICAgKiBAcGFyYW0geyAwIHwgMSB9IHR5cGUgLSAwIG91dGdvaW5nIHwgMSBpbmNvbWluZ1xyXG4gICAqIEBwYXJhbSB7IGlSZXF1ZXN0QXBwcm92ZURhdGEgfSBhcHByb3ZlRGF0YSAtIG5ldyByZXF1ZXN0IHN0YXR1cyBhbmQga2V5IHJlbGF0aW9uIGl0ZW0gb2YgdGhlIG90aGVyIHBhcnR5IG9mIHJlcXVlc3RcclxuICAgKiBAcGFyYW0geyBpUmVxVHlwZSB9IHJlcVR5cGUgLSAxIHUydSAodXNlci11c2VyKSB8IDIgdTJnICh1c2VyLWdyb3VwKSB8IDMgZzJ1IChncm91cC11c2VyKVxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGdyb3VwIGNoYXQgaWQgb2YgdGhlIHRhcmdldCBncm91cCBvZiByZXF1ZXN0XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhdGNoUmVxdWVzdFIgPSAoXHJcbiAgICByZXF1ZXN0SXRlbUlkOiBzdHJpbmcsXHJcbiAgICB0eXBlOiAwIHwgMSxcclxuICAgIGFwcHJvdmVEYXRhOiBpUmVxdWVzdEFwcHJvdmVEYXRhLFxyXG4gICAgcmVxVHlwZTogaVJlcVR5cGUsXHJcbiAgICBjaGF0SWQ6IHN0cmluZ1xyXG4gICk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGFwcHJvdmVEYXRhLnJlbEl0ZW0udHlwZSA9PT0gXCJ1c2VyXCIpXHJcbiAgICAgIFVzZXJDb21wb25lbnQuZGVsZXRlUmVxdWVzdChyZXF1ZXN0SXRlbUlkLCB0eXBlKTtcclxuXHJcbiAgICBpZiAocmVxVHlwZSA9PT0gMiB8fCByZXFUeXBlID09PSAzKVxyXG4gICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZGVsZXRlUmVxdWVzdChyZXF1ZXN0SXRlbUlkLCBjaGF0SWQpO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgVmFsaWRhdGUuYXBwcm92ZURhdGEoYXBwcm92ZURhdGEpLmlzVmFsaWQgJiZcclxuICAgICAgVmFsaWRhdGUuY29udGFjdEl0ZW0oYXBwcm92ZURhdGEucmVsSXRlbSkuaXNWYWxpZFxyXG4gICAgKSB7XHJcbiAgICAgIFBlZXJDb21wb25lbnQudXBkYXRlUGVlckxpc3RIVE1MKGFwcHJvdmVEYXRhLnJlbEl0ZW0pO1xyXG5cclxuICAgICAgLy8gam9pbnMgcm9vbSBvZiB0aGUgbmV3IGNvbm5lY3RlZCBwZWVyIGluIHNvY2tldFxyXG4gICAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChcclxuICAgICAgICBTb2NrZXRNZXRob2RzLmpvaW5Sb29tRXYsXHJcbiAgICAgICAgYXBwcm92ZURhdGEucmVsSXRlbS5jaGF0X2lkLFxyXG4gICAgICAgIChyZXM6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgbmV3IG9yIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgY2xhc3MuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IFJlcXVlc3RFdmVudHMgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRJbnN0ID0gKCk6IFJlcXVlc3RFdmVudHMgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3QpIHRoaXMuaW5zdCA9IG5ldyBSZXF1ZXN0RXZlbnRzKCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0O1xyXG4gIH07XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYW4gYXN5bmNocm9ub3VzIHdyYXBwZXIgZm9yIEhUVFAgcmVxdWVzdGluZyBmdW5jdGlvbnMgd2hpY2ggcmV0dXJucyBhIHRyYW5zZm9ybWVkIEhUVFAgcmVzcG9uc2Ugb2JqZWN0IGZvciBlcnJvciBtYW5hZ2VtZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0geyBGdW5jdGlvbiB9IGZ4IC0gYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7IGFueVtdIH0gW3BhcmFtc10gLSBvcHRpb25hbCBwYXJhbWV0ZXIocylcclxuICpcclxuICogQHJldHVybnMgeyBQcm9taXNlPHsgZXJyOiBhbnk7IGRhdGE6IGFueSB9PiB9XHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdHJ5Q2F0Y2goXHJcbiAgZng6IEZ1bmN0aW9uLFxyXG4gIC4uLnBhcmFtczogYW55W11cclxuKTogUHJvbWlzZTx7IGVycjogYW55OyBkYXRhOiBhbnkgfT4ge1xyXG4gIHRyeSB7XHJcbiAgICBsZXQgZGF0YTtcclxuXHJcbiAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgIGRhdGEgPSBhd2FpdCBmeCguLi5wYXJhbXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YSA9IGF3YWl0IGZ4KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKChkYXRhLnN0YXR1c0NvZGUgYXMgbnVtYmVyKSA+PSA0MDApIHtcclxuICAgICAgcmV0dXJuIHsgZXJyOiBkYXRhLCBkYXRhOiBudWxsIH07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4geyBlcnI6IG51bGwsIGRhdGEgfTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiB7IGVyciwgZGF0YTogbnVsbCB9O1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gXCIuL2FzeW5jV3JhcC51dGlsXCI7XHJcbmltcG9ydCB7IGh0dHBHZXRBdXRoIH0gZnJvbSBcIi4uL2hvb2tzL3JlcXVlc3RzLmhvb2tcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwLmNvbXBcIjtcclxuaW1wb3J0IHsgU29ja2V0TWV0aG9kcyB9IGZyb20gXCIuL3NvY2tldC51dGlsXCI7XHJcbmltcG9ydCB7IGlIdHRwUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2h0dHAubW9kZWxcIjtcclxuaW1wb3J0IHsgVXNlckNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3VzZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBQZWVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGVlci5jb21wXCI7XHJcbmltcG9ydCB7IEVycm9yQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZXJyb3IuY29tcFwiO1xyXG5pbXBvcnQgeyBpUmVsYXRpb24sIGlSZXF1ZXN0IH0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcblxyXG4vKiogVGhpIGNsYXNzIGhvbGRzIGEgdmFyaWV0eSBvZiBoZWxwZXIgZnVuY3Rpb25zIHVzZWQgdGhyb3VnaG91dCB0aGUgY2xpZW50IGNvZGUgYmFzZS4gKi9cclxuZXhwb3J0IGNsYXNzIEdlblV0aWwge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3Q6IEdlblV0aWw7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHRyYW5zZm9ybXMgYW4gaVJlcXVlc3Qgb2JqZWN0IHJldHJpZXZlZCBmcm9tIGEgcmVkaXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBhbnkgfSBvYmpcclxuICAgKiBAcmV0dXJucyB7IGlSZXF1ZXN0IH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgcmVxdWVzdFN0ckludFRvQm9vbCA9IChvYmo6IGFueSk6IGlSZXF1ZXN0ID0+IHtcclxuICAgIGlmIChvYmouaXNHcm91cCA9PT0gXCIwXCIgfHwgb2JqLmlzR3JvdXAgPT09IDApIHtcclxuICAgICAgb2JqLmlzR3JvdXAgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAob2JqLmlzR3JvdXAgPT09IFwiMVwiIHx8IG9iai5pc0dyb3VwID09PSAxKSB7XHJcbiAgICAgIG9iai5pc0dyb3VwID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB0cmFuc2Zvcm1zIGFuIGlSZWxhdGlvbiBvYmplY3QgcmV0cmlldmVkIGZyb20gYSByZWRpcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGFueSB9IG9ialxyXG4gICAqIEByZXR1cm5zIHsgaVJlbGF0aW9uIH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgcmVsYXRpb25TdHJJbnRUb0Jvb2wgPSAob2JqOiBhbnkpOiBpUmVsYXRpb24gPT4ge1xyXG4gICAgaWYgKG9iai5hZG1pbiA9PT0gXCIwXCIgfHwgb2JqLmFkbWluID09PSAwKSB7XHJcbiAgICAgIG9iai5hZG1pbiA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChvYmouYWRtaW4gPT09IFwiMVwiIHx8IG9iai5hZG1pbiA9PT0gMSkge1xyXG4gICAgICBvYmouYWRtaW4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5ibG9jayA9PT0gXCIwXCIgfHwgb2JqLmJsb2NrID09PSAwKSB7XHJcbiAgICAgIG9iai5ibG9jayA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChvYmouYmxvY2sgPT09IFwiMVwiIHx8IG9iai5ibG9jayA9PT0gMSkge1xyXG4gICAgICBvYmouYmxvY2sgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5tdXRlID09PSBcIjBcIiB8fCBvYmoubXV0ZSA9PT0gMCkge1xyXG4gICAgICBvYmoubXV0ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChvYmoubXV0ZSA9PT0gXCIxXCIgfHwgb2JqLm11dGUgPT09IDEpIHtcclxuICAgICAgb2JqLm11dGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5hcmNoaXZlID09PSBcIjBcIiB8fCBvYmouYXJjaGl2ZSA9PT0gMCkge1xyXG4gICAgICBvYmouYXJjaGl2ZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIGlmIChvYmouYXJjaGl2ZSA9PT0gXCIxXCIgfHwgb2JqLmFyY2hpdmUgPT09IDEpIHtcclxuICAgICAgb2JqLmFyY2hpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgb2JqLmJ1bXAgPSBwYXJzZUludChvYmouYnVtcCk7XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2Zvcm1zIGEgbnVtYmVyIGludG8gZm9ybWF0dGVkIHRpbWUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWlsbGlzZWNvbmRzIC0gRGF0ZSBpbiBtaWxsaXNlY29uZHMuXHJcbiAgICogQHJldHVybnMge3N0cmluZ30gLSBGb3JtYXR0ZWQgRGF0ZSBlLmcuIDY6MjE6NTAgQU0gfCAxMjowMTowMCBQTVxyXG4gICAqXHJcbiAgICogQGV4YW1wbGVcclxuICAgKiBHZW5VdGlsLm1pbGxpVG9UaW1lKDE2OTI5NDY0MDg4NDQpOyAvLyBSZXR1cm5zICcyOjUzOjI4IFBNJ1xyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBtaWxsaVRvVGltZTogKG1pbGxpc2Vjb25kczogbnVtYmVyKSA9PiBzdHJpbmcgPSAoXHJcbiAgICBtaWxsaXNlY29uZHNcclxuICApID0+IHtcclxuICAgIC8qKiBEYXRhIEdhdGhlcmluZ1xyXG4gICAgICogLSBUcmFuc2Zvcm1zIG1pbGxpc2Vjb25kIGludG8gaG91cnMsIG1pbnV0ZXMsICYgc2Vjb25kcy5cclxuICAgICAqL1xyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKG1pbGxpc2Vjb25kcyk7XHJcbiAgICBjb25zdCBob3VycyA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgIGNvbnN0IHNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKTtcclxuXHJcbiAgICAvLyBBZGQgbGVhZGluZyB6ZXJvcyBpZiBuZWVkZWRcclxuICAgIGNvbnN0IGhhbGZEYXlIcnM6IG51bWJlciA9IGhvdXJzICUgMTI7XHJcbiAgICBjb25zdCB0aW1lUGVyaW9kOiBcIkFNXCIgfCBcIlBNXCIgPSBNYXRoLmNlaWwoaG91cnMgLyAxMikgPT09IDEgPyBcIkFNXCIgOiBcIlBNXCI7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWRIb3VycyA9IGhhbGZEYXlIcnMgPCAxMCA/IGAwJHtoYWxmRGF5SHJzfWAgOiBoYWxmRGF5SHJzO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkTWludXRlcyA9IG1pbnV0ZXMgPCAxMCA/IGAwJHttaW51dGVzfWAgOiBtaW51dGVzO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IHNlY29uZHMgPCAxMCA/IGAwJHtzZWNvbmRzfWAgOiBzZWNvbmRzO1xyXG5cclxuICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPSBgJHtoYWxmRGF5SHJzfToke2Zvcm1hdHRlZE1pbnV0ZXN9OiR7Zm9ybWF0dGVkU2Vjb25kc30gJHt0aW1lUGVyaW9kfWA7XHJcbiAgICByZXR1cm4gZm9ybWF0dGVkVGltZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiAtIFRoaXMgZnVuY3Rpb24gcmVxdWVzdHMgdGhlIHNlcnZlciB0byBhdXRoZW50aWNhdGUgYSBjbGllbnQgaWYgaXQgaGFzIHRoZSBjcmVkZW50aWFscyBvZiBhIHVzZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0V2ZW50fSBbZV1cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxib29sZWFuPn1cclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIGxvYWRcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgbG9nVXNlciA9IGFzeW5jIChlPzogRXZlbnQpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcclxuICAgIC8qKiBEQVRBIEdBVEhFUklOR1xyXG4gICAgICogLSBQcmVwYXJlcyBjaGF0IGFwcGxpY2F0aW9uIGNvbXBvbmVudC5cclxuICAgICAqL1xyXG4gICAgY29uc3QgYXBwQ29tcCA9IEFwcENvbXBvbmVudC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIC8qKiBIVFRQIFJFUVVFU1RcclxuICAgICAqIC0gUmVxdWVzdHMgYW4gSFRUUCBHRVQgdG8gdGhlIHNlcnZlciBmb3IgYXV0aGVudGljYXRpb24uXHJcbiAgICAgKiAtIEltbWVkaWF0ZWx5IHJldHVybnMgYW5kIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uIGxvZ2ljIGVycm9yLlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiAtIFdpdGggY3JlZGVudGlhbHMuXHJcbiAgICAgKiBhd2FpdCB0cnlDYXRjaChodHRwR2V0QXV0aCk7IC8vIE9iamVjdCB7IGVycjogbnVsbCwgZGF0YTogey4uLn0gfVxyXG4gICAgICogLSBXaXRob3V0IGNyZWRlbnRpYWxzLlxyXG4gICAgICogYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldEF1dGgpOyAvLyBPYmplY3QgeyBlcnI6IG51bGwsIGRhdGE6IHt9IH1cclxuICAgICAqIC0gSW52YWxpZCBjcmVkZW50aWFscy5cclxuICAgICAqIGF3YWl0IHRyeUNhdGNoKGh0dHBHZXRBdXRoKTsgLy8gT2JqZWN0IHsgZXJyOiB7Li4ufSwgZGF0YTogbnVsbCB9XHJcbiAgICAgKi9cclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBHZXRBdXRoKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBFcnJvckNvbXBvbmVudC5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIHJlcXVlc3QgZm9yIGF1dGhlbnRpY2F0aW9uXCIsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyB1cG9uIGludmFsaWQgcmVzcG9uc2UuXHJcbiAgICAgKi9cclxuICAgIGlmIChcclxuICAgICAgKHJlc3BvbnNlLmVyciAhPT0gbnVsbCAmJiByZXNwb25zZS5lcnIgIT09IHVuZGVmaW5lZCkgfHxcclxuICAgICAgIShcInN0YXR1c0NvZGVcIiBpbiByZXNwb25zZS5kYXRhKVxyXG4gICAgKSB7XHJcbiAgICAgIGFwcENvbXAuYXBwQXV0aCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIC0gQ3JlYXRlIGluc3RhbmNlcyBvZiByZXF1aXJlZCBpbml0aWFsIGNvbXBvbmVudHMgKi9cclxuICAgIFBlZXJDb21wb25lbnQuZ2V0SW5zdGFuY2UoZmFsc2UsIHJlc3BvbnNlLmRhdGEuZGF0YSk7XHJcbiAgICBVc2VyQ29tcG9uZW50LmdldEluc3RhbmNlKGZhbHNlKTtcclxuXHJcbiAgICBhcHBDb21wLmFwcFVzZXIoKTtcclxuXHJcbiAgICBTb2NrZXRNZXRob2RzLmluaXQoKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZSBHZW5VdGlsIGNsYXNzLlxyXG4gICAqIEByZXR1cm5zIHtHZW5VdGlsfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0OiAoKSA9PiBHZW5VdGlsID0gKCk6IEdlblV0aWwgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3QpIHRoaXMuaW5zdCA9IG5ldyBHZW5VdGlsKCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0O1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgU29ja2V0LCBpbyB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VFdmVudCB9IGZyb20gXCIuLi9zb2NrZXQvbWVzc2FnZS5ldmVudHNcIjtcclxuaW1wb3J0IHsgUmVxdWVzdEV2ZW50cyB9IGZyb20gXCIuLi9zb2NrZXQvcmVxdWVzdC5ldmVudHNcIjtcclxuaW1wb3J0IHsgUmVsYXRpb25FdmVudCB9IGZyb20gXCIuLi9zb2NrZXQvcmVsYXRpb24uZXZlbnRzXCI7XHJcblxyXG4vKiogVGhpcyBjbGFzcyBob2xkcyBldmVudCBhbmQgY2FsbGJhY2sgY29uZmlndXJhdGlvbiBmb3IgU29ja2V0IGV2ZW50cy4gKi9cclxuZXhwb3J0IGNsYXNzIFNvY2tldE1ldGhvZHMge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBTb2NrZXRNZXRob2RzO1xyXG4gIHN0YXRpYyBzb2NrZXQ6IFNvY2tldCB8IG51bGw7XHJcblxyXG4gIHN0YXRpYyByZWFkb25seSBwb3N0UmVxdWVzdEV2ID0gXCJwb3N0UmVxdWVzdFwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBwb3N0UmVxdWVzdFJldiA9IFwicG9zdFJlcXVlc3RSXCI7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhdGNoUmVxdWVzdEV2ID0gXCJwYXRjaFJlcXVlc3RcIjtcclxuICBzdGF0aWMgcmVhZG9ubHkgcGF0Y2hSZXF1ZXN0UmV2ID0gXCJwYXRjaFJlcXVlc3RSXCI7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhdGNoUmVsYXRpb25FdiA9IFwicGF0Y2hSZWxhdGlvblwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXRjaFJlbGF0aW9uUmV2ID0gXCJwYXRjaFJlbGF0aW9uUlwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBwb3N0TWVzc2FnZUV2ID0gXCJwb3N0TWVzc2FnZVwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBwb3N0TWVzc2FnZVJldiA9IFwicG9zdE1lc3NhZ2VSXCI7XHJcbiAgc3RhdGljIHJlYWRvbmx5IGpvaW5Sb29tRXYgPSBcImpvaW5Sb29tXCI7XHJcbiAgc3RhdGljIHJlYWRvbmx5IGpvaW5Sb29tc0V2ID0gXCJqb2luUm9vbXNcIjtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IHNlcnZlckVyclJldiA9IFwic2VydmVyRXJyUlwiO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb246XHJcbiAgICogLSBjb25uZWN0cyB0aGUgY2xpZW50IHRvIHRoZSBzZXJ2ZXIgdmlhIHNvY2tldFxyXG4gICAqIC0gaW5zdGFudGlhdGVzIGEgbmV3IGNsaWVudCBzb2NrZXQgY2xhc3NcclxuICAgKiAtIHByZXBhcmVzIHNvY2tldCBldmVudHNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgaW5pdCA9ICgpID0+IHtcclxuICAgIHRoaXMuc29ja2V0ID0gaW8oXCJodHRwczovL2xvY2FsaG9zdDo4MDAwXCIpO1xyXG4gICAgU29ja2V0TWV0aG9kcy5nZXQoKTtcclxuICAgIFNvY2tldE1ldGhvZHMuY29uZmlndXJlU29ja2V0KHRoaXMuc29ja2V0KTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgY29uZmlndXJlU29ja2V0ID0gKHNvYzogU29ja2V0KTogdm9pZCA9PiB7XHJcbiAgICBTb2NrZXRNZXRob2RzLmNvbmZpZ0Nvbm5Fdihzb2MpO1xyXG4gICAgU29ja2V0TWV0aG9kcy5jb25maWdSZXF1ZXN0RXYoc29jKTtcclxuICAgIFNvY2tldE1ldGhvZHMuY29uZmlnUmVsYXRpb25Fdihzb2MpO1xyXG4gICAgU29ja2V0TWV0aG9kcy5jb25maWdNZXNzYWdlRXYoc29jKTtcclxuXHJcbiAgICBTb2NrZXRNZXRob2RzLmNvbmZpZ0VyckV2KHNvYyk7XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNvbmZpZ0Nvbm5FdiA9IChzb2M6IFNvY2tldCk6IHZvaWQgPT4ge1xyXG4gICAgc29jLm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuc29ja2V0IS5pZH0gY29udGVjdGVkIHRvIHNlcnZlcmApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNvbmZpZ1JlcXVlc3RFdiA9IChzb2M6IFNvY2tldCk6IHZvaWQgPT4ge1xyXG4gICAgc29jLm9uKHRoaXMucG9zdFJlcXVlc3RSZXYsIFJlcXVlc3RFdmVudHMucG9zdFJlcXVlc3RSKTtcclxuICAgIHNvYy5vbih0aGlzLnBhdGNoUmVxdWVzdFJldiwgUmVxdWVzdEV2ZW50cy5wYXRjaFJlcXVlc3RSKTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgY29uZmlnUmVsYXRpb25FdiA9IChzb2M6IFNvY2tldCk6IHZvaWQgPT4ge1xyXG4gICAgc29jLm9uKHRoaXMucGF0Y2hSZWxhdGlvbkV2LCBSZWxhdGlvbkV2ZW50LnBhdGNoUmVsYXRpb24pO1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyByZWFkb25seSBjb25maWdNZXNzYWdlRXYgPSAoc29jOiBTb2NrZXQpOiB2b2lkID0+IHtcclxuICAgIHNvYy5vbih0aGlzLnBvc3RNZXNzYWdlUmV2LCBNZXNzYWdlRXZlbnQucG9zdE1lc3NhZ2VSKTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgY29uZmlnRXJyRXYgPSAoc29jOiBTb2NrZXQpOiB2b2lkID0+IHtcclxuICAgIHNvYy5vbih0aGlzLnNlcnZlckVyclJldiwgKGVycikgPT4ge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBkaXNjb25uZWN0cyBjbGllbnQgZnJvbSBhbnkgY29ubmVjdGVkIHJvb21zIGFuZCBzZXJ2ZXIgc29ja2V0IGNvbm5lY3Rpb24uICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNvY2tldCEuZGlzY29ubmVjdCgpO1xyXG4gICAgY29uc29sZS5sb2coYCR7dGhpcy5zb2NrZXQhLmlkfSB1c2VyIGRpc2Nvbm5lY3RlZCB0byBzZXJ2ZXJgKTtcclxuICAgIHRoaXMuc29ja2V0ID0gbnVsbDtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgbmV3IG9yIG9sZCBpbnN0YW5jZSBvZiB0aGUgY2xhc3MuICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldCA9ICgpOiBTb2NrZXRNZXRob2RzID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBTb2NrZXRNZXRob2RzKCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IGlOZXdHcnBCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9ncm91cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpQXV0aElucHV0cyB9IGZyb20gXCIuLi9tb2RlbHMvYXV0aC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9odHRwLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlWYWxpZGl0eVR5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL3ZhbGlkaXR5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IGlDaGF0VHlwZSwgaVJlcXVlc3RCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgYXMgZXJyb3IgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9lcnJvci5jb21wXCI7XHJcbmltcG9ydCB7IHVzZXJuYW1lX3BhdHRlcm4sIHBhc3N3b3JkX3BhdHRlcm4gfSBmcm9tIFwiLi4vbW9kZWxzL2F1dGgubW9kZWxcIjtcclxuaW1wb3J0IHtcclxuICBjaGF0VHlwZSxcclxuICBjb250YWN0QWN0LFxyXG4gIGlTZWFyY2hJdGVtLFxyXG4gIGlSZWxhdGlvbkFjdCxcclxuICBpU2VhcmNoVmFsdWVzLFxyXG59IGZyb20gXCIuLi9tb2RlbHMvcGVlci5tb2RlbFwiO1xyXG5pbXBvcnQge1xyXG4gIGlSZXF1ZXN0LFxyXG4gIGlSZWxhdGlvbixcclxuICBpVXNlclBhc3N3b3JkLFxyXG4gIHJlcXVlc3RBY3Rpb25zLFxyXG4gIGlQcml2YWN5UmVxdWVzdCxcclxuICBpUmVxdWVzdEFjdGlvbnMsXHJcbiAgaVVzZXJQcml2YWN5UHJvcCxcclxuICBpVXNlclBhdGNoUmVxdWVzdCxcclxuICBpUmVxdWVzdEFwcHJvdmVEYXRhLFxyXG59IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5cclxuLyoqIFRoaXMgY2xhc3MgaG9sZHMgYSByYW5nZSBvZiBpbnB1dCB2YWxpZGF0aW9uIG1ldGhvZHMgdXNlZCB0aHJvdWdob3V0IHRoZSBjbGllbnQgY29kZS4gKi9cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRlIHtcclxuICBzdGF0aWMgaW5zdGFuY2U6IFZhbGlkYXRlIHwgbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHN0YXRpYyByZWFkb25seSByZWdpc3RlckZvcm0gPSAoXHJcbiAgICByZWdpc3RlcklucHV0czogaUF1dGhJbnB1dHNcclxuICApOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIC8vIFVTRVJOQU1FIFZBTElEQVRFXHJcbiAgICAvLyAtLS0gbXVzdCBvbmx5IGhhdmUgVVBQRVJDQVNFLCBMT1dFUkNBU0UsIE5VTUVSSUMsIG9yIFNQRUNJQUwgY2hhcmFjdGVyc1xyXG4gICAgLy8gLS0tIGF0IGxlbmd0aCBvZiA4LTIwIGNoYXJhY3RlcnNcclxuICAgIC8vIFBBU1NXT1JEIFZBTElEQVRFXHJcbiAgICAvLyAtLS0gbXVzdCBvbmx5IGhhdmUgVVBQRVJDQVNFLCBMT1dFUkNBU0UsIE5VTUVSSUMsIGFuZCBTUEVDSUFMIGNoYXJhY3RlcnNcclxuICAgIC8vIC0tLSBhdCBsZWFzdCBvbmUgVVBQRVJDQVNFLCBMT1dFUkNBU0UsIE5VTUVSSUMsIGFuZCBTUEVDSUFMIGNoYXJhY3RlclxyXG4gICAgLy8gLS0tIGF0IGxlYXN0IDggY2hhcmFjdGVyc1xyXG4gICAgLy8gUkUtUEFTU1dPUkQgVkFMSURBVEVcclxuICAgIC8vIC0tLSBtdXN0IG9ubHkgaGF2ZSBVUFBFUkNBU0UsIExPV0VSQ0FTRSwgTlVNRVJJQywgYW5kIFNQRUNJQUwgY2hhcmFjdGVyc1xyXG4gICAgLy8gLS0tIGVxdWFscyBwYXNzd29yZFxyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHJlZ2lzdGVySW5wdXRzLnVzZXJuYW1lLm1hdGNoKHVzZXJuYW1lX3BhdHRlcm4pXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlVzZXJuYW1lIG11c3QgY29udGFpbiA4LTIwIHVwcGVyY2FzZSwgbG93ZXJjYXNlLCBudW1lcmljLCBvciAjPyFAJCVeJiogY2hhcmFjdGVyc1wiLFxyXG4gICAgICByZWdpc3RlcklucHV0cy5wYXNzd29yZC5tYXRjaChwYXNzd29yZF9wYXR0ZXJuKVxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nIGFuZCBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgMSB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgbnVtZXJpYywgYW5kICM/IUAkJV4mKiBjaGFyYWN0ZXJzXCIsXHJcbiAgICAgIHJlZ2lzdGVySW5wdXRzLnJlUGFzc3dvcmQhLm1hdGNoKHBhc3N3b3JkX3BhdHRlcm4pXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIkNvbmZpcm1lZCBwYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nIGFuZCBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgMSB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgbnVtZXJpYywgYW5kICM/IUAkJV4mKiBjaGFyYWN0ZXJzXCIsXHJcbiAgICAgIHJlZ2lzdGVySW5wdXRzLnBhc3N3b3JkID09PSByZWdpc3RlcklucHV0cy5yZVBhc3N3b3JkXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlBhc3N3b3JkICYgQ29uZmlybWF0aW9uIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBsb2dpbkZvcm0gPSAobG9naW5JbnB1dHM6IGlBdXRoSW5wdXRzKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICAvLyBVU0VSTkFNRSAmIFBBU1NXT1JEIEFSRSBSRVFVSVJFRFxyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIGxvZ2luSW5wdXRzLnVzZXJuYW1lLnRyaW0oKS5sZW5ndGggPCAxID8gXCJVc2VybmFtZSBpcyByZXF1aXJlXCIgOiBudWxsLFxyXG4gICAgICBsb2dpbklucHV0cy5wYXNzd29yZC50cmltKCkubGVuZ3RoIDwgMSA/IFwiUGFzc3dvcmQgaXMgcmVxdWlyZVwiIDogbnVsbCxcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IHNlYXJjaCA9IChcclxuICAgIHNlYXJjaEl0ZW06IGlTZWFyY2hWYWx1ZXMsXHJcbiAgICBzdHJUeXBlOiBpQ2hhdFR5cGVcclxuICApOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGNvbnN0IHsgcGF0dGVybiwgdHlwZSwgc2tpcCB9ID0gc2VhcmNoSXRlbTtcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICB0eXBlb2YgcGF0dGVybiA9PT0gXCJzdHJpbmdcIiA/IG51bGwgOiBcIlNlYXJjaCBQYXR0ZXJuIG11c3QgYmUgYXN0cmluZ1wiLFxyXG4gICAgICB0eXBlID09PSAwIHx8IHR5cGUgPT09IDFcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IGBTZWFyY2ggU3RyaW5nIFR5cGVzIGNhbiBvbmx5IGJlIGVpdGhlciAxIG9yIDFgLFxyXG4gICAgICBzdHJUeXBlID09PSBcInVzZXJcIiB8fCBzdHJUeXBlID09PSBcImdyb3VwXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IGBTZWFyY2ggVHlwZSBjYW4gb25seSBiZSBlaXRoZXIgJHtjaGF0VHlwZS51c2VyfSBvciAke2NoYXRUeXBlLmdyb3VwfWAsXHJcbiAgICAgIHR5cGVvZiBza2lwID09PSBcIm51bWJlclwiID8gbnVsbCA6IGBTZWFyY2ggU2tpcCBtdXN0IGJlIGEgbnVtYmVyYCxcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IGNoYW5nZVBhc3N3b3JkRm9ybSA9IChcclxuICAgIHJlUGFzc3dvcmRJbnB1dHM6IGlVc2VyUGFzc3dvcmRcclxuICApOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIC8vIFBBU1NXT1JEIFZBTElEQVRFXHJcbiAgICAvLyAtLS0gbXVzdCBvbmx5IGhhdmUgVVBQRVJDQVNFLCBMT1dFUkNBU0UsIE5VTUVSSUMsIGFuZCBTUEVDSUFMIGNoYXJhY3RlcnNcclxuICAgIC8vIC0tLSBhdCBsZWFzdCBvbmUgVVBQRVJDQVNFLCBMT1dFUkNBU0UsIE5VTUVSSUMsIGFuZCBTUEVDSUFMIGNoYXJhY3RlclxyXG4gICAgLy8gLS0tIGF0IGxlYXN0IDggY2hhcmFjdGVyc1xyXG4gICAgLy8gUkUtUEFTU1dPUkQgVkFMSURBVEVcclxuICAgIC8vIC0tLSBtdXN0IG9ubHkgaGF2ZSBVUFBFUkNBU0UsIExPV0VSQ0FTRSwgTlVNRVJJQywgYW5kIFNQRUNJQUwgY2hhcmFjdGVyc1xyXG4gICAgLy8gLS0tIGVxdWFscyBwYXNzd29yZFxyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHJlUGFzc3dvcmRJbnB1dHMucGFzc3dvcmQubWF0Y2gocGFzc3dvcmRfcGF0dGVybilcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZyBhbmQgbXVzdCBjb250YWluIGF0IGxlYXN0IDEgdXBwZXJjYXNlLCBsb3dlcmNhc2UsIG51bWVyaWMsIGFuZCAjPyFAJCVeJiogY2hhcmFjdGVyc1wiLFxyXG4gICAgICByZVBhc3N3b3JkSW5wdXRzLnJlUGFzc3dvcmQubWF0Y2gocGFzc3dvcmRfcGF0dGVybilcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQ29uZmlybWVkIHBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcgYW5kIG11c3QgY29udGFpbiBhdCBsZWFzdCAxIHVwcGVyY2FzZSwgbG93ZXJjYXNlLCBudW1lcmljLCBhbmQgIz8hQCQlXiYqIGNoYXJhY3RlcnNcIixcclxuICAgICAgcmVQYXNzd29yZElucHV0cy5wYXNzd29yZCA9PT0gcmVQYXNzd29yZElucHV0cy5yZVBhc3N3b3JkXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlBhc3N3b3JkICYgQ29uZmlybWF0aW9uIHBhc3N3b3JkIGRvZXMgbm90IG1hdGNoXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSByZWxhdGlvbkFjdGlvbiA9IChcclxuICAgIHJlbGF0aW9uQWN0OiBpUmVsYXRpb25BY3RcclxuICApOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICB0eXBlb2YgcmVsYXRpb25BY3QucmVjaXBpZW50SWQgPT09IFwic3RyaW5nXCIgJiZcclxuICAgICAgcmVsYXRpb25BY3QucmVjaXBpZW50SWQubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJSZWNpcGllbnQgaWQgaXMgcmVxdWlyZWRcIixcclxuICAgICAgcmVsYXRpb25BY3QudXNlckFjdGlvbiA9PT0gY29udGFjdEFjdC5ibG9jayB8fFxyXG4gICAgICByZWxhdGlvbkFjdC51c2VyQWN0aW9uID09PSBjb250YWN0QWN0Lm11dGUgfHxcclxuICAgICAgcmVsYXRpb25BY3QudXNlckFjdGlvbiA9PT0gY29udGFjdEFjdC5hcmNoaXZlXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBgUmVsYXRpb24gYWN0aW9uIG11c3Qgb25seSBiZSAke2NvbnRhY3RBY3QuYXJjaGl2ZX0sICR7Y29udGFjdEFjdC5tdXRlfSwgb3Ike2NvbnRhY3RBY3QuYmxvY2t9YCxcclxuICAgICAgdHlwZW9mIHJlbGF0aW9uQWN0LmFjdGlvblZhbHVlID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJSZWxhdGlvbiBhY3Rpb24gdmFsdWUgbXVzdCBvbmx5IGJlIGEgYm9vbGVhbiBkYXRhIHR5cGVcIixcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IHJlcXVlc3REZWwgPSAoaWQ6IHN0cmluZywgdHlwZTogMCB8IDEpOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICB0eXBlb2YgaWQgPT09IFwic3RyaW5nXCIgJiYgaWQubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJSZXF1ZXN0IGl0ZW0gaWQgaXMgaW52YWxpZFwiLFxyXG4gICAgICB0eXBlID09PSAwIHx8IHR5cGUgPT09IDEgPyBudWxsIDogXCJSZXF1ZXN0IFR5cGUgaXMgaW52YWxpZFwiLFxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgcmVxdWVzdEJvZHkgPSAocmVxQm9keTogaVJlcXVlc3RCb2R5KTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB7IHR5cGUsIHJlY2lwaWVudElkLCBncm91cElkIH0gPSByZXFCb2R5O1xyXG4gICAgbGV0IHZhbGlkaXR5OiBBcnJheTxudWxsIHwgc3RyaW5nPiA9IFtcclxuICAgICAgdHlwZSA9PT0gMSB8fCB0eXBlID09PSAyIHx8IHR5cGUgPT09IDNcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUmVxdWVzdCB0eXBlIGNhbiBvbmx5IGJlIDEsIDIsIG9yIDNcIixcclxuICAgIF07XHJcblxyXG4gICAgaWYgKHR5cGUgIT09IDIpIHtcclxuICAgICAgdmFsaWRpdHkucHVzaChcclxuICAgICAgICB0eXBlb2YgcmVjaXBpZW50SWQgPT09IFwic3RyaW5nXCIgJiYgcmVjaXBpZW50SWQubGVuZ3RoID4gMFxyXG4gICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICA6IFwiR3JvdXAgdG8gVXNlciBSZXF1ZXN0IHJlcXVpcmVkIFJlY2lwaWVudCBJRFwiXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWxpZGl0eS5wdXNoKFxyXG4gICAgICAgICFyZWNpcGllbnRJZCA/IG51bGwgOiBcIlVzZXIgdG8gR3JvdXAgcmVxdWVzdCBtdXN0IG5vdCBoYXZlIFJlY2lwaWVudCBJRFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZSAhPT0gMSkge1xyXG4gICAgICB2YWxpZGl0eS5wdXNoKFxyXG4gICAgICAgIHR5cGVvZiBncm91cElkID09PSBcInN0cmluZ1wiICYmIGdyb3VwSWQubGVuZ3RoID4gMFxyXG4gICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICA6IFwiVXNlciB0byBHcm91cCBSZXF1ZXN0IHJlcXVpcmVkIEdyb3VwIElEXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAgICAgIWdyb3VwSWQgPyBudWxsIDogXCJVc2VyIHRvIFVzZXIgcmVxdWVzdCBtdXN0IG5vdCBoYXZlIGdyb3VwIElEXCJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVUERBVEU6IFRSQU5TSVRJT04gQUJBTkRPTkVEXHJcbiAgICAvLyBSRUFTT046ICFcIlwiIElTIGEgdHJ1dGh5IHZhbHVlLCBtZWFuaW5nLCBcIlwiIGlzIGZhbHN5XHJcbiAgICAvLyBUUkFOU0lUSU9OIFRPIENPREUgQkVMT1cgVVBPTiBGVVJUSEVSIFRFU1RJTkdcclxuICAgIC8vIGlmICh0eXBlICE9PSAyKSB7XHJcbiAgICAvLyAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAvLyAgICAgdHlwZW9mIHJlY2lwaWVudElkID09PSBcInN0cmluZ1wiICYmIHJlY2lwaWVudElkLmxlbmd0aCA+IDBcclxuICAgIC8vICAgICAgID8gbnVsbFxyXG4gICAgLy8gICAgICAgOiBcIkdyb3VwIHRvIFVzZXIgUmVxdWVzdCByZXF1aXJlZCBSZWNpcGllbnQgSURcIlxyXG4gICAgLy8gICApO1xyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgdmFsaWRpdHkucHVzaChcclxuICAgIC8vICAgICB0eXBlb2YgcmVjaXBpZW50SWQgPT09IFwic3RyaW5nXCIgJiYgcmVjaXBpZW50SWQubGVuZ3RoID09PSAwXHJcbiAgICAvLyAgICAgICA/IG51bGxcclxuICAgIC8vICAgICAgIDogXCJVc2VyIHRvIEdyb3VwIHJlcXVlc3QgbXVzdCBub3QgaGF2ZSBSZWNpcGllbnQgSURcIlxyXG4gICAgLy8gICApO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gaWYgKHR5cGUgIT09IDEpIHtcclxuICAgIC8vICAgdmFsaWRpdHkucHVzaChcclxuICAgIC8vICAgICB0eXBlb2YgZ3JvdXBJZCA9PT0gXCJzdHJpbmdcIiAmJiBncm91cElkLmxlbmd0aCA+IDBcclxuICAgIC8vICAgICAgID8gbnVsbFxyXG4gICAgLy8gICAgICAgOiBcIlVzZXIgdG8gR3JvdXAgUmVxdWVzdCByZXF1aXJlZCBHcm91cCBJRFwiXHJcbiAgICAvLyAgICk7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICB2YWxpZGl0eS5wdXNoKFxyXG4gICAgLy8gICAgIHR5cGVvZiBncm91cElkID09PSBcInN0cmluZ1wiICYmIGdyb3VwSWQubGVuZ3RoID09PSAwXHJcbiAgICAvLyAgICAgICA/IG51bGxcclxuICAgIC8vICAgICAgIDogXCJVc2VyIHRvIFVzZXIgcmVxdWVzdCBtdXN0IG5vdCBoYXZlIGdyb3VwIElEXCJcclxuICAgIC8vICAgKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgcmVxdWVzdEl0ZW0gPSAoXHJcbiAgICBpdGVtOiBpUmVxdWVzdCxcclxuICAgIHdyYXBwZXI6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgdHlwZTogXCJpbmNvbWluZ1wiIHwgXCJvdXRnb2luZ1wiXHJcbiAgKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB2YWxpZGl0eSA9IFtcclxuICAgICAgdHlwZW9mIGl0ZW0uYWNjbnRfaWQgPT09IFwic3RyaW5nXCIgJiYgaXRlbS5hY2NudF9pZC5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlJlcXVlc3QgaXRlbSBJRCBhY2NudF9pZCBpcyBpbnZhbGlkXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFjY250X25hbWUgPT09IFwic3RyaW5nXCIgJiYgaXRlbS5hY2NudF9uYW1lLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUmVxdWVzdCBpdGVtIGFjY250X25hbWUgaXMgaW52YWxpZFwiLFxyXG4gICAgICB0eXBlb2YgaXRlbS5pc0dyb3VwID09PSBcImJvb2xlYW5cIiA/IG51bGwgOiBcIlJlcXVlc3QgaXRlbSB0eXBlIGlzIGludmFsaWRcIixcclxuICAgICAgaXRlbS5zdGF0dXMgPT09IFwiYXBwcm92ZWRcIiB8fFxyXG4gICAgICBpdGVtLnN0YXR1cyA9PT0gXCJjYW5jZWxsZWRcIiB8fFxyXG4gICAgICBpdGVtLnN0YXR1cyA9PT0gXCJwZW5kaW5nXCIgfHxcclxuICAgICAgaXRlbS5zdGF0dXMgPT09IFwicmVqZWN0ZWRcIlxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogYFJlcXVlc3QgaXRlbSBzdGF0dXMgY2FuIG9ubHkgYmUgJ2FwcHJvdmVkJywgJ2NhbmNjZWxsZWQnLCBvciAncmVqZWN0ZWQnYCxcclxuICAgICAgd3JhcHBlciBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50XHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIldyYXBwZXIgbXVzdCBiZSBhbiBIVE1MRURpdmxlbWVudFwiLFxyXG4gICAgICB0eXBlID09PSBcImluY29taW5nXCIgfHwgdHlwZSA9PT0gXCJvdXRnb2luZ1wiXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBgUmVxdWVzdCB0eXBlIGNhbiBvbmx5IGJlICdpbmNvbWluZycgb3IgJ291dGdvaW5nJ2AsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBtdXRlQmxvY2tJdGVtID0gKFxyXG4gICAgaXRlbTogaVJlbGF0aW9uLFxyXG4gICAgd3JhcHBlcjogSFRNTERpdkVsZW1lbnQsXHJcbiAgICB0eXBlOiAwIHwgMVxyXG4gICk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgLy8gMCAobXV0ZSkgMSAoYmxvY2spXHJcbiAgICBjb25zdCB7IGFjY250X2lkLCBhY2NudF9uYW1lIH0gPSBpdGVtO1xyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHR5cGVvZiBhY2NudF9pZCA9PT0gXCJzdHJpbmdcIiAmJiBhY2NudF9pZC5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBgJHt0eXBlID09PSAwID8gXCJNdXRlXCIgOiBcIkJsb2NrXCJ9ICBpdGVtIHJlcXVpcmVzIHVzZXIgSURgLFxyXG4gICAgICB3cmFwcGVyIGluc3RhbmNlb2YgSFRNTERpdkVsZW1lbnRcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiV3JhcHBlciBtdXN0IGJlIGFuIEhUTUxEaXZFbGVtZW50XCIsXHJcbiAgICAgIHR5cGVvZiBhY2NudF9uYW1lID09PSBcInN0cmluZ1wiICYmIGFjY250X25hbWUubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogYCR7dHlwZSA9PT0gMCA/IFwiTXV0ZVwiIDogXCJCbG9ja1wifSAgaXRlbSByZXF1aXJlcyB1c2VyIElEYCxcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhdGNoUmVxdWVzdERhdGEgPSAoXHJcbiAgICBwYXRjaFJlcXVlc3Q6IGlSZXF1ZXN0Qm9keSxcclxuICAgIGFjdGlvbjogaVJlcXVlc3RBY3Rpb25zXHJcbiAgKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB7IHR5cGUsIHJlY2lwaWVudElkLCBncm91cElkIH0gPSBwYXRjaFJlcXVlc3Q7XHJcblxyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIGFjdGlvbiA9PT0gcmVxdWVzdEFjdGlvbnMuYXBwcm92ZSB8fFxyXG4gICAgICBhY3Rpb24gPT09IHJlcXVlc3RBY3Rpb25zLnJlamVjdCB8fFxyXG4gICAgICBhY3Rpb24gPT09IHJlcXVlc3RBY3Rpb25zLmNhbmNlbFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogYFJlcXVlc3QgYWN0aW9uIG11c3Qgb25seSBiZSAke3JlcXVlc3RBY3Rpb25zLmFwcHJvdmV9LCR7cmVxdWVzdEFjdGlvbnMucmVqZWN0fSwgb3IgJHtyZXF1ZXN0QWN0aW9ucy5jYW5jZWx9YCxcclxuICAgIF07XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IDEgfHwgdHlwZSA9PT0gMiB8fCB0eXBlID09PSAzKSB7XHJcbiAgICAgIGlmICh0eXBlICE9PSAyKSB7XHJcbiAgICAgICAgdmFsaWRpdHkucHVzaChcclxuICAgICAgICAgIHR5cGVvZiByZWNpcGllbnRJZCA9PT0gXCJzdHJpbmdcIiAmJiByZWNpcGllbnRJZC5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICA6IGBUeXBlOiAke3R5cGV9IGFjdGlvbiByZXF1aXJlcyBSZWNpcGllbnQgSURgXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YWxpZGl0eS5wdXNoKFxyXG4gICAgICAgICAgIXJlY2lwaWVudElkID8gbnVsbCA6IGBUeXBlOiAke3R5cGV9IGFjdGlvbiByZXF1aXJlcyBubyBSZWNpcGllbnQgSURgXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZSAhPT0gMSkge1xyXG4gICAgICAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAgICAgICB0eXBlb2YgZ3JvdXBJZCA9PT0gXCJzdHJpbmdcIiAmJiBncm91cElkLmxlbmd0aCA+IDBcclxuICAgICAgICAgICAgPyBudWxsXHJcbiAgICAgICAgICAgIDogYFR5cGU6ICR7dHlwZX0gYWN0aW9uIHJlcXVpcmVzIEdyb3VwIElEYFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsaWRpdHkucHVzaChcclxuICAgICAgICAgICFncm91cElkID8gbnVsbCA6IGBUeXBlOiAke3R5cGV9IGFjdGlvbiByZXF1aXJlcyBubyBHcm91cCBJRGBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWxpZGl0eS5wdXNoKFwiQWN0aW9uIFR5cGUgY2FuIG9ubHkgYmUgMSwgMiwgb3IgM1wiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgYXBwcm92ZURhdGEgPSAoZGF0YTogaVJlcXVlc3RBcHByb3ZlRGF0YSk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIGRhdGEubmV3U3RhdHVzID09PSBcImFwcHJvdmVkXCIgPyBudWxsIDogXCJTdGF0dXMgZGF0YSBpcyBpbnZhbGlkXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBwcml2YWN5RGF0YSA9IChcclxuICAgIHByaXZhY3lEYXRhOiBpUHJpdmFjeVJlcXVlc3QsXHJcbiAgICBwcm9wOiBpVXNlclByaXZhY3lQcm9wXHJcbiAgKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB2YWxpZGl0eSA9IFtcclxuICAgICAgcHJpdmFjeURhdGEucHJvcGVydHkgPT09IHByb3AgPyBudWxsIDogYFByaXZhY3kgcHJvcGVydHkgbXVzdCBiZSAke3Byb3B9YCxcclxuICAgICAgcHJpdmFjeURhdGEudmFsdWUgPT09IFwidHJ1ZVwiIHx8IHByaXZhY3lEYXRhLnZhbHVlID09PSBcImZhbHNlXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUHJpdmFjeSBwcm9wZXJ0eSB2YWx1ZSBtdXN0IGJlIGEgc3RyaW5naWZpZWQgYm9vbGVhblwiLFxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgc2VhcmNoSXRlbSA9IChpdGVtOiBpU2VhcmNoSXRlbSk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFjY250X2lkID09PSBcInN0cmluZ1wiICYmIGl0ZW0uYWNjbnRfaWQubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJBY2NvdW50IElEIGlzIHJlcXVpcmVkIGZvciBhIHNlYXJjaCBpdGVtXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFjdF9uYW1lID09PSBcInN0cmluZ1wiICYmIGl0ZW0uYWN0X25hbWUubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJBY2NvdW50IE5hbWUgaXMgcmVxdWlyZWQgZm9yIGEgc2VhcmNoIGl0ZW1cIixcclxuICAgICAgdHlwZW9mIGl0ZW0uYXZhaWxhYmlsaXR5ID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJBY2NvdW50IE5hbWUgaXMgcmVxdWlyZWQgZm9yIGEgc2VhcmNoIGl0ZW1cIixcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IGNvbnRhY3RJdGVtID0gKGl0ZW06IGlSZWxhdGlvbik6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFjY250X2lkID09PSBcInN0cmluZ1wiICYmIGl0ZW0uYWNjbnRfaWQubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJBY2NvdW50IElEIGlzIHJlcXVpcmVkIGZvciBhIHNlYXJjaCBpdGVtXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFjY250X25hbWUgPT09IFwic3RyaW5nXCIgJiYgaXRlbS5hY2NudF9uYW1lLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBOYW1lIGlzIHJlcXVpcmVkIGZvciBhIHNlYXJjaCBpdGVtXCIsXHJcbiAgICAgIGl0ZW0udHlwZSA9PT0gY2hhdFR5cGUudXNlciB8fCBpdGVtLnR5cGUgPT09IGNoYXRUeXBlLmdyb3VwXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBgQWNjb3VudCBUeXBlIG11c3QgYmUgZWl0aGVyICR7Y2hhdFR5cGUudXNlcn0gb3IgJHtjaGF0VHlwZS5ncm91cH1gLFxyXG4gICAgICB0eXBlb2YgaXRlbS5jaGF0X2lkID09PSBcInN0cmluZ1wiICYmIGl0ZW0uY2hhdF9pZC5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIkFjY291bnQgQ2hhdCBJRCBpcyBpbnZhbGlkXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFkbWluID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJBY2NvdW50IEFkbWluIFByb3BlcnR5IGlzIGludmFsaWRcIixcclxuICAgICAgdHlwZW9mIGl0ZW0uYXJjaGl2ZSA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBBcmNoaXZlIFByb3BlcnR5IGlzIGludmFsaWRcIixcclxuICAgICAgdHlwZW9mIGl0ZW0ubXV0ZSA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBNdXRlIFByb3BlcnR5IGlzIGludmFsaWRcIixcclxuICAgICAgdHlwZW9mIGl0ZW0uYmxvY2sgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIkFjY291bnQgQmxvY2sgUHJvcGVydHkgaXMgaW52YWxpZFwiLFxyXG4gICAgICB0eXBlb2YgaXRlbS5idW1wID09PSBcIm51bWJlclwiID8gbnVsbCA6IFwiQWNjb3VudCBCdW1wIFByb3BlcnR5IGlzIGludmFsaWRcIixcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IG5ld0dyb3VwSW5wdXQgPSAoZ3JwQm9keTogaU5ld0dycEJvZHkpOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGNvbnN0IHsgcmVjaXBpZW50SWQsIGdycE5hbWUgfSA9IGdycEJvZHk7XHJcbiAgICBjb25zdCB2YWxpZGl0eSA9IFtcclxuICAgICAgdHlwZW9mIHJlY2lwaWVudElkID09PSBcInN0cmluZ1wiICYmIHJlY2lwaWVudElkLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUmVjaXBpZW50IElEIGlzIHJlcXVpcmVkXCIsXHJcbiAgICAgIHR5cGVvZiBncnBOYW1lID09PSBcInN0cmluZ1wiICYmIGdycE5hbWUubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJHcm91cCBuYW1lIGlzIHJlcXVpcmVkXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBzZXRWYWxpZGl0eSA9IChcclxuICAgIHZhbGlkaXR5OiBBcnJheTxudWxsIHwgc3RyaW5nPlxyXG4gICk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgaWYgKHZhbGlkaXR5LmpvaW4oXCJcIikpIHtcclxuICAgICAgcmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIGVycm9yOiB2YWxpZGl0eS5maWx0ZXIoKGVycikgPT4gZXJyICE9PSBudWxsKSB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHsgaXNWYWxpZDogdHJ1ZSwgZXJyb3I6IG51bGwgfTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBIVFRQIFJFU1BPTlNFIFZBTElEQVRJT05cclxuICAvKipcclxuICAgKiBUaGlzIGlzIGEgc3BlY2lhbCB2YWxpZGF0aW9uIGZ1bmN0aW9uIGZvciBIVFRQIFJlc3BvbnNlcyBmcm9tIHRyeUNhdGNoKClcclxuICAgKiAtIGluc3BlY3RzIEhUVFAgcmVzcG9uc2VzIGZvciBzaWducyBvZiBlcnJvclxyXG4gICAqIC0gaW5zdHJ1Y3RzIGVycm9yIGNvbXBvbmVudCB0byBhY3RpdmF0ZSB1cG9uIGhpbnQgb2YgZXJyb3JcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlIdHRwUmVzcG9uc2UgfSByZXMgLSBIVFRQIFJlc3BvbnNlIGZyb20gdHJ5Q2F0Y2hcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSB1bmtub3duRXJyIC0gYW4gdW5jYXRjaGVkIHNlcnZlciBlcnJvciBvY2N1cmVkXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0ga25vd25FcnIgLSBhbiBjYXRjaGVkIHNlcnZlciBlcnJvciBvY2N1cmVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBodHRwUmVzKFxyXG4gICAgcmVzOiBpSHR0cFJlc3BvbnNlLFxyXG4gICAgdW5rbm93bkVycjogc3RyaW5nLFxyXG4gICAga25vd25FcnI6IHN0cmluZ1xyXG4gICk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgaWYgKCFyZXMuZGF0YSkge1xyXG4gICAgICBlcnJvci5zaG93Q29tcChgRVJST1I6ICR7dW5rbm93bkVycn1gLCByZXMuZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlcy5kYXRhLnN0YXR1c0NvZGUgPCAyMDAgfHwgcmVzLmRhdGEuc3RhdHVzQ29kZSA+PSA0MDApIHtcclxuICAgICAgZXJyb3Iuc2hvd0NvbXAoYEVSUk9SOiAke2tub3duRXJyfWAsIHJlcy5lcnIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSBuZXcgb3Igb2xkIGluc3RhbmNlIG9mIHRoaXMgZnVuY3Rpb24uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IFZhbGlkYXRlIH1cclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdGFuY2UgPSAoKTogVmFsaWRhdGUgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFZhbGlkYXRlKCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsIi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGlhcyB1c2VkIGZvciByZXNlcnZlZCBldmVudHMgKHByb3RlY3RlZCBtZXRob2QpXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UmVzZXJ2ZWQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC9oYXMtY29yc1xubGV0IHZhbHVlID0gZmFsc2U7XG50cnkge1xuICAgIHZhbHVlID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbn1cbmNhdGNoIChlcnIpIHtcbiAgICAvLyBpZiBYTUxIdHRwIHN1cHBvcnQgaXMgZGlzYWJsZWQgaW4gSUUgdGhlbiBpdCB3aWxsIHRocm93XG4gICAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG59XG5leHBvcnQgY29uc3QgaGFzQ09SUyA9IHZhbHVlO1xuIiwiLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2Fsa24vcXVlcnlzdHJpbmdcbi8qKlxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGUob2JqKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnJic7XG4gICAgICAgICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbi8qKlxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHFzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZShxcykge1xuICAgIGxldCBxcnkgPSB7fTtcbiAgICBsZXQgcGFpcnMgPSBxcy5zcGxpdCgnJicpO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcGFpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxldCBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgfVxuICAgIHJldHVybiBxcnk7XG59XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWxrbi9wYXJzZXVyaVxuLyoqXG4gKiBQYXJzZXMgYSBVUklcbiAqXG4gKiBOb3RlOiB3ZSBjb3VsZCBhbHNvIGhhdmUgdXNlZCB0aGUgYnVpbHQtaW4gVVJMIG9iamVjdCwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBvbiBhbGwgcGxhdGZvcm1zLlxuICpcbiAqIFNlZTpcbiAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1VSTFxuICogLSBodHRwczovL2Nhbml1c2UuY29tL3VybFxuICogLSBodHRwczovL3d3dy5yZmMtZWRpdG9yLm9yZy9yZmMvcmZjMzk4NiNhcHBlbmRpeC1CXG4gKlxuICogSGlzdG9yeSBvZiB0aGUgcGFyc2UoKSBtZXRob2Q6XG4gKiAtIGZpcnN0IGNvbW1pdDogaHR0cHM6Ly9naXRodWIuY29tL3NvY2tldGlvL3NvY2tldC5pby1jbGllbnQvY29tbWl0LzRlZTFkNWQ5NGIzOTA2YTljMDUyYjQ1OWYxYTgxOGIxNWYzOGY5MWNcbiAqIC0gZXhwb3J0IGludG8gaXRzIG93biBtb2R1bGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9lbmdpbmUuaW8tY2xpZW50L2NvbW1pdC9kZTJjNTYxZTQ1NjRlZmViNzhmMWJkYjFiYTM5ZWY4MWIyODIyY2IzXG4gKiAtIHJlaW1wb3J0OiBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vZW5naW5lLmlvLWNsaWVudC9jb21taXQvZGYzMjI3N2MzZjZkNjIyZWVjNWVkMDlmNDkzY2FlM2YzMzkxZDI0MlxuICpcbiAqIEBhdXRob3IgU3RldmVuIExldml0aGFuIDxzdGV2ZW5sZXZpdGhhbi5jb20+IChNSVQgbGljZW5zZSlcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5jb25zdCByZSA9IC9eKD86KD8hW146QFxcLz8jXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QFxcLz8jXSopKD86OihbXjpAXFwvPyNdKikpPyk/QCk/KCg/OlthLWYwLTldezAsNH06KXsyLDd9W2EtZjAtOV17MCw0fXxbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO1xuY29uc3QgcGFydHMgPSBbXG4gICAgJ3NvdXJjZScsICdwcm90b2NvbCcsICdhdXRob3JpdHknLCAndXNlckluZm8nLCAndXNlcicsICdwYXNzd29yZCcsICdob3N0JywgJ3BvcnQnLCAncmVsYXRpdmUnLCAncGF0aCcsICdkaXJlY3RvcnknLCAnZmlsZScsICdxdWVyeScsICdhbmNob3InXG5dO1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICAgIGNvbnN0IHNyYyA9IHN0ciwgYiA9IHN0ci5pbmRleE9mKCdbJyksIGUgPSBzdHIuaW5kZXhPZignXScpO1xuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBiKSArIHN0ci5zdWJzdHJpbmcoYiwgZSkucmVwbGFjZSgvOi9nLCAnOycpICsgc3RyLnN1YnN0cmluZyhlLCBzdHIubGVuZ3RoKTtcbiAgICB9XG4gICAgbGV0IG0gPSByZS5leGVjKHN0ciB8fCAnJyksIHVyaSA9IHt9LCBpID0gMTQ7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICB1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJztcbiAgICB9XG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xuICAgICAgICB1cmkuc291cmNlID0gc3JjO1xuICAgICAgICB1cmkuaG9zdCA9IHVyaS5ob3N0LnN1YnN0cmluZygxLCB1cmkuaG9zdC5sZW5ndGggLSAxKS5yZXBsYWNlKC87L2csICc6Jyk7XG4gICAgICAgIHVyaS5hdXRob3JpdHkgPSB1cmkuYXV0aG9yaXR5LnJlcGxhY2UoJ1snLCAnJykucmVwbGFjZSgnXScsICcnKS5yZXBsYWNlKC87L2csICc6Jyk7XG4gICAgICAgIHVyaS5pcHY2dXJpID0gdHJ1ZTtcbiAgICB9XG4gICAgdXJpLnBhdGhOYW1lcyA9IHBhdGhOYW1lcyh1cmksIHVyaVsncGF0aCddKTtcbiAgICB1cmkucXVlcnlLZXkgPSBxdWVyeUtleSh1cmksIHVyaVsncXVlcnknXSk7XG4gICAgcmV0dXJuIHVyaTtcbn1cbmZ1bmN0aW9uIHBhdGhOYW1lcyhvYmosIHBhdGgpIHtcbiAgICBjb25zdCByZWd4ID0gL1xcL3syLDl9L2csIG5hbWVzID0gcGF0aC5yZXBsYWNlKHJlZ3gsIFwiL1wiKS5zcGxpdChcIi9cIik7XG4gICAgaWYgKHBhdGguc2xpY2UoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc2xpY2UoLTEpID09ICcvJykge1xuICAgICAgICBuYW1lcy5zcGxpY2UobmFtZXMubGVuZ3RoIC0gMSwgMSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lcztcbn1cbmZ1bmN0aW9uIHF1ZXJ5S2V5KHVyaSwgcXVlcnkpIHtcbiAgICBjb25zdCBkYXRhID0ge307XG4gICAgcXVlcnkucmVwbGFjZSgvKD86XnwmKShbXiY9XSopPT8oW14mXSopL2csIGZ1bmN0aW9uICgkMCwgJDEsICQyKSB7XG4gICAgICAgIGlmICgkMSkge1xuICAgICAgICAgICAgZGF0YVskMV0gPSAkMjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBkYXRhO1xufVxuIiwiLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdW5zaGlmdGlvL3llYXN0XG4ndXNlIHN0cmljdCc7XG5jb25zdCBhbHBoYWJldCA9ICcwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ei1fJy5zcGxpdCgnJyksIGxlbmd0aCA9IDY0LCBtYXAgPSB7fTtcbmxldCBzZWVkID0gMCwgaSA9IDAsIHByZXY7XG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKG51bSkge1xuICAgIGxldCBlbmNvZGVkID0gJyc7XG4gICAgZG8ge1xuICAgICAgICBlbmNvZGVkID0gYWxwaGFiZXRbbnVtICUgbGVuZ3RoXSArIGVuY29kZWQ7XG4gICAgICAgIG51bSA9IE1hdGguZmxvb3IobnVtIC8gbGVuZ3RoKTtcbiAgICB9IHdoaWxlIChudW0gPiAwKTtcbiAgICByZXR1cm4gZW5jb2RlZDtcbn1cbi8qKlxuICogUmV0dXJuIHRoZSBpbnRlZ2VyIHZhbHVlIHNwZWNpZmllZCBieSB0aGUgZ2l2ZW4gc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge051bWJlcn0gVGhlIGludGVnZXIgdmFsdWUgcmVwcmVzZW50ZWQgYnkgdGhlIHN0cmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gICAgbGV0IGRlY29kZWQgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gICAgfVxuICAgIHJldHVybiBkZWNvZGVkO1xufVxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHllYXN0KCkge1xuICAgIGNvbnN0IG5vdyA9IGVuY29kZSgrbmV3IERhdGUoKSk7XG4gICAgaWYgKG5vdyAhPT0gcHJldilcbiAgICAgICAgcmV0dXJuIHNlZWQgPSAwLCBwcmV2ID0gbm93O1xuICAgIHJldHVybiBub3cgKyAnLicgKyBlbmNvZGUoc2VlZCsrKTtcbn1cbi8vXG4vLyBNYXAgZWFjaCBjaGFyYWN0ZXIgdG8gaXRzIGluZGV4LlxuLy9cbmZvciAoOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG4iLCJleHBvcnQgY29uc3QgZ2xvYmFsVGhpc1NoaW0gPSAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICB9XG59KSgpO1xuIiwiaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5leHBvcnQgeyBTb2NrZXQgfTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IFNvY2tldC5wcm90b2NvbDtcbmV4cG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuL3RyYW5zcG9ydC5qc1wiO1xuZXhwb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmV4cG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmV4cG9ydCB7IHBhcnNlIH0gZnJvbSBcIi4vY29udHJpYi9wYXJzZXVyaS5qc1wiO1xuZXhwb3J0IHsgbmV4dFRpY2sgfSBmcm9tIFwiLi90cmFuc3BvcnRzL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5qc1wiO1xuIiwiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucywgYnl0ZUxlbmd0aCB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSAtIHVyaSBvciBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzID0ge30pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHVyaSA9IHBhcnNlKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gXCJodHRwc1wiIHx8IHVyaS5wcm90b2NvbCA9PT0gXCJ3c3NcIjtcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSlcbiAgICAgICAgICAgICAgICBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNlKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbXG4gICAgICAgICAgICBcInBvbGxpbmdcIixcbiAgICAgICAgICAgIFwid2Vic29ja2V0XCIsXG4gICAgICAgICAgICBcIndlYnRyYW5zcG9ydFwiLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGF0aDogXCIvZW5naW5lLmlvXCIsXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcFBhcmFtOiBcInRcIixcbiAgICAgICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgICAgICBhZGRUcmFpbGluZ1NsYXNoOiB0cnVlLFxuICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiB0cnVlLFxuICAgICAgICAgICAgcGVyTWVzc2FnZURlZmxhdGU6IHtcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGQ6IDEwMjQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJhbnNwb3J0T3B0aW9uczoge30sXG4gICAgICAgICAgICBjbG9zZU9uQmVmb3JldW5sb2FkOiBmYWxzZSxcbiAgICAgICAgfSwgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cy5wYXRoID1cbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSArXG4gICAgICAgICAgICAgICAgKHRoaXMub3B0cy5hZGRUcmFpbGluZ1NsYXNoID8gXCIvXCIgOiBcIlwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMucXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5xdWVyeSA9IGRlY29kZSh0aGlzLm9wdHMucXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBvbiBoYW5kc2hha2VcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIHRoaXMudXBncmFkZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnBpbmdJbnRlcnZhbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAvLyBzZXQgb24gaGVhcnRiZWF0XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsb3NlT25CZWZvcmV1bmxvYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGNsb3NlcyB0aGUgY29ubmVjdGlvbiB3aGVuIHRoZSBcImJlZm9yZXVubG9hZFwiIGV2ZW50IGlzIGVtaXR0ZWQgYnV0IG5vdCBDaHJvbWUuIFRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmVzIGV2ZXJ5IGJyb3dzZXIgYmVoYXZlcyB0aGUgc2FtZSAobm8gXCJkaXNjb25uZWN0XCIgZXZlbnQgYXQgdGhlIFNvY2tldC5JTyBsZXZlbCB3aGVuIHRoZSBwYWdlIGlzXG4gICAgICAgICAgICAgICAgLy8gY2xvc2VkL3JlbG9hZGVkKVxuICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JldW5sb2FkRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaWxlbnRseSBjbG9zZSB0aGUgdHJhbnNwb3J0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgdGhpcy5iZWZvcmV1bmxvYWRFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5ob3N0bmFtZSAhPT0gXCJsb2NhbGhvc3RcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmbGluZUV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBjbG9zZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJuZXR3b3JrIGNvbm5lY3Rpb24gbG9zdFwiLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsIHRoaXMub2ZmbGluZUV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyB0cmFuc3BvcnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlVHJhbnNwb3J0KG5hbWUpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdHMucXVlcnkpO1xuICAgICAgICAvLyBhcHBlbmQgZW5naW5lLmlvIHByb3RvY29sIGlkZW50aWZpZXJcbiAgICAgICAgcXVlcnkuRUlPID0gcHJvdG9jb2w7XG4gICAgICAgIC8vIHRyYW5zcG9ydCBuYW1lXG4gICAgICAgIHF1ZXJ5LnRyYW5zcG9ydCA9IG5hbWU7XG4gICAgICAgIC8vIHNlc3Npb24gaWQgaWYgd2UgYWxyZWFkeSBoYXZlIG9uZVxuICAgICAgICBpZiAodGhpcy5pZClcbiAgICAgICAgICAgIHF1ZXJ5LnNpZCA9IHRoaXMuaWQ7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdHMsIHtcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgICAgc29ja2V0OiB0aGlzLFxuICAgICAgICAgICAgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUsXG4gICAgICAgICAgICBzZWN1cmU6IHRoaXMuc2VjdXJlLFxuICAgICAgICAgICAgcG9ydDogdGhpcy5wb3J0LFxuICAgICAgICB9LCB0aGlzLm9wdHMudHJhbnNwb3J0T3B0aW9uc1tuYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgdHJhbnNwb3J0c1tuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0O1xuICAgICAgICBpZiAodGhpcy5vcHRzLnJlbWVtYmVyVXBncmFkZSAmJlxuICAgICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoXCJ3ZWJzb2NrZXRcIikgIT09IC0xKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnQgPSBcIndlYnNvY2tldFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKDAgPT09IHRoaXMudHJhbnNwb3J0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xuICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgXCJObyB0cmFuc3BvcnRzIGF2YWlsYWJsZVwiKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnRzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICAvLyBSZXRyeSB3aXRoIHRoZSBuZXh0IHRyYW5zcG9ydCBpZiB0aGUgdHJhbnNwb3J0IGlzIGRpc2FibGVkIChqc29ucDogZmFsc2UpXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyYW5zcG9ydC5vcGVuKCk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRUcmFuc3BvcnQodHJhbnNwb3J0KSB7XG4gICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IHVwIHRyYW5zcG9ydFxuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgICAgICAgLy8gc2V0IHVwIHRyYW5zcG9ydCBsaXN0ZW5lcnNcbiAgICAgICAgdHJhbnNwb3J0XG4gICAgICAgICAgICAub24oXCJkcmFpblwiLCB0aGlzLm9uRHJhaW4uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcInBhY2tldFwiLCB0aGlzLm9uUGFja2V0LmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oXCJlcnJvclwiLCB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChyZWFzb24pID0+IHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBjbG9zZVwiLCByZWFzb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0cmFuc3BvcnQgbmFtZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgKG1zZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmYWlsZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoXCJwb25nXCIgPT09IG1zZy50eXBlICYmIFwicHJvYmVcIiA9PT0gbXNnLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGluZ1wiLCB0cmFuc3BvcnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYW5zcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IFwid2Vic29ja2V0XCIgPT09IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5wYXVzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcImNsb3NlZFwiID09PSB0aGlzLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwidXBncmFkZVwiIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwidXBncmFkZVwiLCB0cmFuc3BvcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZXJyLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBmcmVlemVUcmFuc3BvcnQoKSB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIEFueSBjYWxsYmFjayBjYWxsZWQgYnkgdHJhbnNwb3J0IHNob3VsZCBiZSBpZ25vcmVkIHNpbmNlIG5vd1xuICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG4gICAgICAgIGNvbnN0IG9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yOiBcIiArIGVycik7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBlcnJvci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlKCkge1xuICAgICAgICAgICAgb25lcnJvcihcInRyYW5zcG9ydCBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIGNsb3NlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwic29ja2V0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgICAgICBmdW5jdGlvbiBvbnVwZ3JhZGUodG8pIHtcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gICAgICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoXCJlcnJvclwiLCBvbmVycm9yKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImNsb3NlXCIsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJjbG9zZVwiLCBvbmNsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkaW5nXCIsIG9udXBncmFkZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwib3BlblwiLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgICAgICB0cmFuc3BvcnQub25jZShcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICB0cmFuc3BvcnQub25jZShcImNsb3NlXCIsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJjbG9zZVwiLCBvbmNsb3NlKTtcbiAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkaW5nXCIsIG9udXBncmFkZSk7XG4gICAgICAgIGlmICh0aGlzLnVwZ3JhZGVzLmluZGV4T2YoXCJ3ZWJ0cmFuc3BvcnRcIikgIT09IC0xICYmXG4gICAgICAgICAgICBuYW1lICE9PSBcIndlYnRyYW5zcG9ydFwiKSB7XG4gICAgICAgICAgICAvLyBmYXZvciBXZWJUcmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWZhaWxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMub3B0cy51cGdyYWRlKSB7XG4gICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICBjb25zdCBsID0gdGhpcy51cGdyYWRlcy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvYmUodGhpcy51cGdyYWRlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uSGFuZHNoYWtlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoYW5kc2hha2VcIiwgZGF0YSk7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudXBncmFkZXMgPSB0aGlzLmZpbHRlclVwZ3JhZGVzKGRhdGEudXBncmFkZXMpO1xuICAgICAgICB0aGlzLnBpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICAgICAgICB0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDtcbiAgICAgICAgdGhpcy5tYXhQYXlsb2FkID0gZGF0YS5tYXhQYXlsb2FkO1xuICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICAvLyBJbiBjYXNlIG9wZW4gaGFuZGxlciBjbG9zZXMgc29ja2V0XG4gICAgICAgIGlmIChcImNsb3NlZFwiID09PSB0aGlzLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuZCByZXNldHMgcGluZyB0aW1lb3V0IHRpbWVyIGJhc2VkIG9uIHNlcnZlciBwaW5ncy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcmVzZXRQaW5nVGltZW91dCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgIH0sIHRoaXMucGluZ0ludGVydmFsICsgdGhpcy5waW5nVGltZW91dCk7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIudW5yZWYoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkRyYWluKCkge1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuICAgICAgICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gICAgICAgIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAgICAgICAvLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxuICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZmx1c2goKSB7XG4gICAgICAgIGlmIChcImNsb3NlZFwiICE9PSB0aGlzLnJlYWR5U3RhdGUgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LndyaXRhYmxlICYmXG4gICAgICAgICAgICAhdGhpcy51cGdyYWRpbmcgJiZcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWNrZXRzID0gdGhpcy5nZXRXcml0YWJsZVBhY2tldHMoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQocGFja2V0cyk7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IHBhY2tldHMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJmbHVzaFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbnN1cmUgdGhlIGVuY29kZWQgc2l6ZSBvZiB0aGUgd3JpdGVCdWZmZXIgaXMgYmVsb3cgdGhlIG1heFBheWxvYWQgdmFsdWUgc2VudCBieSB0aGUgc2VydmVyIChvbmx5IGZvciBIVFRQXG4gICAgICogbG9uZy1wb2xsaW5nKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBnZXRXcml0YWJsZVBhY2tldHMoKSB7XG4gICAgICAgIGNvbnN0IHNob3VsZENoZWNrUGF5bG9hZFNpemUgPSB0aGlzLm1heFBheWxvYWQgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0Lm5hbWUgPT09IFwicG9sbGluZ1wiICYmXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCA+IDE7XG4gICAgICAgIGlmICghc2hvdWxkQ2hlY2tQYXlsb2FkU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVCdWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBheWxvYWRTaXplID0gMTsgLy8gZmlyc3QgcGFja2V0IHR5cGVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy53cml0ZUJ1ZmZlcltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkU2l6ZSArPSBieXRlTGVuZ3RoKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPiAwICYmIHBheWxvYWRTaXplID4gdGhpcy5tYXhQYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVCdWZmZXIuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXlsb2FkU2l6ZSArPSAyOyAvLyBzZXBhcmF0b3IgKyBwYWNrZXQgdHlwZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIC0gbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICB3cml0ZShtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VuZFBhY2tldChcIm1lc3NhZ2VcIiwgbXNnLCBvcHRpb25zLCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZW5kKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGU6IHBhY2tldCB0eXBlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZW5kUGFja2V0KHR5cGUsIGRhdGEsIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBkYXRhKSB7XG4gICAgICAgICAgICBmbiA9IGRhdGE7XG4gICAgICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBvcHRpb25zKSB7XG4gICAgICAgICAgICBmbiA9IG9wdGlvbnM7XG4gICAgICAgICAgICBvcHRpb25zID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJjbG9zaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCBcImNsb3NlZFwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgb3B0aW9ucy5jb21wcmVzcyA9IGZhbHNlICE9PSBvcHRpb25zLmNvbXByZXNzO1xuICAgICAgICBjb25zdCBwYWNrZXQgPSB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0Q3JlYXRlXCIsIHBhY2tldCk7XG4gICAgICAgIHRoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO1xuICAgICAgICBpZiAoZm4pXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJmbHVzaFwiLCBmbik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSBjb25uZWN0aW9uLlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBjb25zdCBjbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZShcImZvcmNlZCBjbG9zZVwiKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNsZWFudXBBbmRDbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRlRXJyb3JcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHdhaXRGb3JVcGdyYWRlID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMub25jZShcInVwZ3JhZGVcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub25jZShcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NpbmdcIjtcbiAgICAgICAgICAgIGlmICh0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcImRyYWluXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGVycm9yXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkNsb3NlKHJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICAgICAgIFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICAgICAgIFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyIHRpbWVyc1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuICAgICAgICAgICAgLy8gc3RvcCBldmVudCBmcm9tIGZpcmluZyBhZ2FpbiBmb3IgdHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJjbG9zZVwiKTtcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0cmFuc3BvcnQgd29uJ3Qgc3RheSBvcGVuXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZW1vdmVFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMuYmVmb3JldW5sb2FkRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsIHRoaXMub2ZmbGluZUV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgICAgIC8vIGNsZWFyIHNlc3Npb24gaWRcbiAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICAgICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIC8vIGNsZWFuIGJ1ZmZlcnMgYWZ0ZXIsIHNvIHVzZXJzIGNhbiBzdGlsbFxuICAgICAgICAgICAgLy8gZ3JhYiB0aGUgYnVmZmVycyBvbiBgY2xvc2VgIGV2ZW50XG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbHRlcnMgdXBncmFkZXMsIHJldHVybmluZyBvbmx5IHRob3NlIG1hdGNoaW5nIGNsaWVudCB0cmFuc3BvcnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gdXBncmFkZXMgLSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbiIsImltcG9ydCB7IGRlY29kZVBhY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuY2xhc3MgVHJhbnNwb3J0RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IocmVhc29uLCBkZXNjcmlwdGlvbiwgY29udGV4dCkge1xuICAgICAgICBzdXBlcihyZWFzb24pO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMudHlwZSA9IFwiVHJhbnNwb3J0RXJyb3JcIjtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgVHJhbnNwb3J0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogVHJhbnNwb3J0IGFic3RyYWN0IGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICAgICAgICB0aGlzLnNvY2tldCA9IG9wdHMuc29ja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcGFyYW0gY29udGV4dCAtIHRoZSBlcnJvciBjb250ZXh0XG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fSBmb3IgY2hhaW5pbmdcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25FcnJvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIG5ldyBUcmFuc3BvcnRFcnJvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLmRvT3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlbmluZ1wiIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gICAgICovXG4gICAgc2VuZChwYWNrZXRzKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKHBhY2tldHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBtaWdodCBoYXBwZW4gaWYgdGhlIHRyYW5zcG9ydCB3YXMgc2lsZW50bHkgY2xvc2VkIGluIHRoZSBiZWZvcmV1bmxvYWQgZXZlbnQgaGFuZGxlclxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIG9wZW5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IGRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uUGFja2V0KHBhY2tldCkge1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJwYWNrZXRcIiwgcGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25DbG9zZShkZXRhaWxzKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIGRldGFpbHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgdGhlIHRyYW5zcG9ydCwgaW4gb3JkZXIgbm90IHRvIGxvc2UgcGFja2V0cyBkdXJpbmcgYW4gdXBncmFkZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvblBhdXNlXG4gICAgICovXG4gICAgcGF1c2Uob25QYXVzZSkgeyB9XG4gICAgY3JlYXRlVXJpKHNjaGVtYSwgcXVlcnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIHRoaXMuX2hvc3RuYW1lKCkgK1xuICAgICAgICAgICAgdGhpcy5fcG9ydCgpICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5KHF1ZXJ5KSk7XG4gICAgfVxuICAgIF9ob3N0bmFtZSgpIHtcbiAgICAgICAgY29uc3QgaG9zdG5hbWUgPSB0aGlzLm9wdHMuaG9zdG5hbWU7XG4gICAgICAgIHJldHVybiBob3N0bmFtZS5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBob3N0bmFtZSA6IFwiW1wiICsgaG9zdG5hbWUgKyBcIl1cIjtcbiAgICB9XG4gICAgX3BvcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKCh0aGlzLm9wdHMuc2VjdXJlICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCAhPT0gNDQzKSkgfHxcbiAgICAgICAgICAgICAgICAoIXRoaXMub3B0cy5zZWN1cmUgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gODApKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiOlwiICsgdGhpcy5vcHRzLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcXVlcnkocXVlcnkpIHtcbiAgICAgICAgY29uc3QgZW5jb2RlZFF1ZXJ5ID0gZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGVuY29kZWRRdWVyeS5sZW5ndGggPyBcIj9cIiArIGVuY29kZWRRdWVyeSA6IFwiXCI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgUG9sbGluZyB9IGZyb20gXCIuL3BvbGxpbmcuanNcIjtcbmltcG9ydCB7IFdTIH0gZnJvbSBcIi4vd2Vic29ja2V0LmpzXCI7XG5pbXBvcnQgeyBXVCB9IGZyb20gXCIuL3dlYnRyYW5zcG9ydC5qc1wiO1xuZXhwb3J0IGNvbnN0IHRyYW5zcG9ydHMgPSB7XG4gICAgd2Vic29ja2V0OiBXUyxcbiAgICB3ZWJ0cmFuc3BvcnQ6IFdULFxuICAgIHBvbGxpbmc6IFBvbGxpbmcsXG59O1xuIiwiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgeWVhc3QgfSBmcm9tIFwiLi4vY29udHJpYi95ZWFzdC5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGF5bG9hZCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBjcmVhdGVDb29raWVKYXIsIFhIUiBhcyBYTUxIdHRwUmVxdWVzdCwgfSBmcm9tIFwiLi94bWxodHRwcmVxdWVzdC5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZ2xvYmFsVGhpc1NoaW0gYXMgZ2xvYmFsVGhpcyB9IGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHtcbiAgICAgICAgeGRvbWFpbjogZmFsc2UsXG4gICAgfSk7XG4gICAgcmV0dXJuIG51bGwgIT0geGhyLnJlc3BvbnNlVHlwZTtcbn0pKCk7XG5leHBvcnQgY2xhc3MgUG9sbGluZyBleHRlbmRzIFRyYW5zcG9ydCB7XG4gICAgLyoqXG4gICAgICogWEhSIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYWNrYWdlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzU1NMID0gXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgICAgICBsZXQgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG4gICAgICAgICAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgICAgICAgICBpZiAoIXBvcnQpIHtcbiAgICAgICAgICAgICAgICBwb3J0ID0gaXNTU0wgPyBcIjQ0M1wiIDogXCI4MFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54ZCA9XG4gICAgICAgICAgICAgICAgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgICAgICAgICBvcHRzLmhvc3RuYW1lICE9PSBsb2NhdGlvbi5ob3N0bmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGhhc1hIUjIgJiYgIWZvcmNlQmFzZTY0O1xuICAgICAgICBpZiAodGhpcy5vcHRzLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICAgICAgdGhpcy5jb29raWVKYXIgPSBjcmVhdGVDb29raWVKYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZG9PcGVuKCkge1xuICAgICAgICB0aGlzLnBvbGwoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGF1c2VzIHBvbGxpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblBhdXNlIC0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXG4gICAgICogQHBhY2thZ2VcbiAgICAgKi9cbiAgICBwYXVzZShvblBhdXNlKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwicGF1c2luZ1wiO1xuICAgICAgICBjb25zdCBwYXVzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwicGF1c2VkXCI7XG4gICAgICAgICAgICBvblBhdXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLnBvbGxpbmcgfHwgIXRoaXMud3JpdGFibGUpIHtcbiAgICAgICAgICAgIGxldCB0b3RhbCA9IDA7XG4gICAgICAgICAgICBpZiAodGhpcy5wb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgdG90YWwrKztcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoXCJwb2xsQ29tcGxldGVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMud3JpdGFibGUpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcImRyYWluXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgcG9sbGluZyBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcG9sbCgpIHtcbiAgICAgICAgdGhpcy5wb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb1BvbGwoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwb2xsXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkRhdGEoZGF0YSkge1xuICAgICAgICBjb25zdCBjYWxsYmFjayA9IChwYWNrZXQpID0+IHtcbiAgICAgICAgICAgIC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbiAgICAgICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHBhY2tldC50eXBlID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgICAgICAgICBpZiAoXCJjbG9zZVwiID09PSBwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DbG9zZSh7IGRlc2NyaXB0aW9uOiBcInRyYW5zcG9ydCBjbG9zZWQgYnkgdGhlIHNlcnZlclwiIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIHRoaXMub25QYWNrZXQocGFja2V0KTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZGVjb2RlIHBheWxvYWRcbiAgICAgICAgZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKS5mb3JFYWNoKGNhbGxiYWNrKTtcbiAgICAgICAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgLy8gaWYgd2UgZ290IGRhdGEgd2UncmUgbm90IHBvbGxpbmdcbiAgICAgICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwb2xsQ29tcGxldGVcIik7XG4gICAgICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9sbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKFt7IHR5cGU6IFwiY2xvc2VcIiB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAgICAgICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJvcGVuXCIsIGNsb3NlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzIC0gZGF0YSBwYWNrZXRzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBlbmNvZGVQYXlsb2FkKHBhY2tldHMsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvV3JpdGUoZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmkoc2NoZW1hLCBxdWVyeSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcmVxdWVzdChvcHRzID0ge30pIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihvcHRzLCB7IHhkOiB0aGlzLnhkLCBjb29raWVKYXI6IHRoaXMuY29va2llSmFyIH0sIHRoaXMub3B0cyk7XG4gICAgICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLnVyaSgpLCBvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkb1dyaXRlKGRhdGEsIGZuKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbihcInN1Y2Nlc3NcIiwgZm4pO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCAoeGhyU3RhdHVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCB4aHJTdGF0dXMsIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZG9Qb2xsKCkge1xuICAgICAgICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgICAgICAgcmVxLm9uKFwiZGF0YVwiLCB0aGlzLm9uRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmVxLm9uKFwiZXJyb3JcIiwgKHhoclN0YXR1cywgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwieGhyIHBvbGwgZXJyb3JcIiwgeGhyU3RhdHVzLCBjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucG9sbFhociA9IHJlcTtcbiAgICB9XG59XG5leHBvcnQgY2xhc3MgUmVxdWVzdCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHBhY2thZ2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IG9wdHMubWV0aG9kIHx8IFwiR0VUXCI7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3Qgb3B0cyA9IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJhdXRvVW5yZWZcIik7XG4gICAgICAgIG9wdHMueGRvbWFpbiA9ICEhdGhpcy5vcHRzLnhkO1xuICAgICAgICBjb25zdCB4aHIgPSAodGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0cnVlKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayAmJiB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5vcHRzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICBpZiAoXCJQT1NUXCIgPT09IHRoaXMubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCIqLypcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICAoX2EgPSB0aGlzLm9wdHMuY29va2llSmFyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkQ29va2llcyh4aHIpO1xuICAgICAgICAgICAgLy8gaWU2IGNoZWNrXG4gICAgICAgICAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy5vcHRzLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucmVxdWVzdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICB4aHIudGltZW91dCA9IHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLm9wdHMuY29va2llSmFyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyc2VDb29raWVzKHhocik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICg0ICE9PSB4aHIucmVhZHlTdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICgyMDAgPT09IHhoci5zdGF0dXMgfHwgMTIyMyA9PT0geGhyLnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKHR5cGVvZiB4aHIuc3RhdHVzID09PSBcIm51bWJlclwiID8geGhyLnN0YXR1cyA6IDApO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gTmVlZCB0byBkZWZlciBzaW5jZSAuY3JlYXRlKCkgaXMgY2FsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgICAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAgICAgICAgIC8vIG9jY3Vycy4gIFRoZXJlZm9yZSwgYWxzbywgd2UgY2Fubm90IHRocm93IGhlcmUgYXQgYWxsLlxuICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihlKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSBSZXF1ZXN0LnJlcXVlc3RzQ291bnQrKztcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF0gPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVycm9yLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkVycm9yKGVycikge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVyciwgdGhpcy54aHIpO1xuICAgICAgICB0aGlzLmNsZWFudXAodHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBob3VzZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnhoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRhdGFcIiwgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBYm9ydHMgdGhlIHJlcXVlc3QuXG4gICAgICpcbiAgICAgKiBAcGFja2FnZVxuICAgICAqL1xuICAgIGFib3J0KCkge1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB9XG59XG5SZXF1ZXN0LnJlcXVlc3RzQ291bnQgPSAwO1xuUmVxdWVzdC5yZXF1ZXN0cyA9IHt9O1xuLyoqXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XG4gKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gKiBlbWl0dGVkLlxuICovXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0eXBlb2YgYXR0YWNoRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGF0dGFjaEV2ZW50KFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29uc3QgdGVybWluYXRpb25FdmVudCA9IFwib25wYWdlaGlkZVwiIGluIGdsb2JhbFRoaXMgPyBcInBhZ2VoaWRlXCIgOiBcInVubG9hZFwiO1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyKHRlcm1pbmF0aW9uRXZlbnQsIHVubG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1bmxvYWRIYW5kbGVyKCkge1xuICAgIGZvciAobGV0IGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge1xuICAgICAgICBpZiAoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0c1tpXS5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZ2xvYmFsVGhpc1NoaW0gYXMgZ2xvYmFsVGhpcyB9IGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgY29uc3QgbmV4dFRpY2sgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGlzUHJvbWlzZUF2YWlsYWJsZSA9IHR5cGVvZiBQcm9taXNlID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFByb21pc2UucmVzb2x2ZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIGlmIChpc1Byb21pc2VBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIChjYikgPT4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKGNiLCBzZXRUaW1lb3V0Rm4pID0+IHNldFRpbWVvdXRGbihjYiwgMCk7XG4gICAgfVxufSkoKTtcbmV4cG9ydCBjb25zdCBXZWJTb2NrZXQgPSBnbG9iYWxUaGlzLldlYlNvY2tldCB8fCBnbG9iYWxUaGlzLk1veldlYlNvY2tldDtcbmV4cG9ydCBjb25zdCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRCaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuIiwiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgeWVhc3QgfSBmcm9tIFwiLi4vY29udHJpYi95ZWFzdC5qc1wiO1xuaW1wb3J0IHsgcGljayB9IGZyb20gXCIuLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBkZWZhdWx0QmluYXJ5VHlwZSwgbmV4dFRpY2ssIHVzaW5nQnJvd3NlcldlYlNvY2tldCwgV2ViU29ja2V0LCB9IGZyb20gXCIuL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbi8vIGRldGVjdCBSZWFjdE5hdGl2ZSBlbnZpcm9ubWVudFxuY29uc3QgaXNSZWFjdE5hdGl2ZSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgbmF2aWdhdG9yLnByb2R1Y3QgPT09IFwic3RyaW5nXCIgJiZcbiAgICBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSBcInJlYWN0bmF0aXZlXCI7XG5leHBvcnQgY2xhc3MgV1MgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIGNvbm5lY3Rpb24gb3B0aW9uc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gIW9wdHMuZm9yY2VCYXNlNjQ7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJ3ZWJzb2NrZXRcIjtcbiAgICB9XG4gICAgZG9PcGVuKCkge1xuICAgICAgICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgICAgICAgICAgLy8gbGV0IHByb2JlIHRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cmkgPSB0aGlzLnVyaSgpO1xuICAgICAgICBjb25zdCBwcm90b2NvbHMgPSB0aGlzLm9wdHMucHJvdG9jb2xzO1xuICAgICAgICAvLyBSZWFjdCBOYXRpdmUgb25seSBzdXBwb3J0cyB0aGUgJ2hlYWRlcnMnIG9wdGlvbiwgYW5kIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIGFueXRoaW5nIGVsc2UgaXMgcGFzc2VkXG4gICAgICAgIGNvbnN0IG9wdHMgPSBpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICA/IHt9XG4gICAgICAgICAgICA6IHBpY2sodGhpcy5vcHRzLCBcImFnZW50XCIsIFwicGVyTWVzc2FnZURlZmxhdGVcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImxvY2FsQWRkcmVzc1wiLCBcInByb3RvY29sVmVyc2lvblwiLCBcIm9yaWdpblwiLCBcIm1heFBheWxvYWRcIiwgXCJmYW1pbHlcIiwgXCJjaGVja1NlcnZlcklkZW50aXR5XCIpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gdGhpcy5vcHRzLmV4dHJhSGVhZGVycztcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy53cyA9XG4gICAgICAgICAgICAgICAgdXNpbmdCcm93c2VyV2ViU29ja2V0ICYmICFpc1JlYWN0TmF0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gcHJvdG9jb2xzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpKVxuICAgICAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cy5iaW5hcnlUeXBlID0gdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSB8fCBkZWZhdWx0QmluYXJ5VHlwZTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLndzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5fc29ja2V0LnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSAoY2xvc2VFdmVudCkgPT4gdGhpcy5vbkNsb3NlKHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIndlYnNvY2tldCBjb25uZWN0aW9uIGNsb3NlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogY2xvc2VFdmVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gKGV2KSA9PiB0aGlzLm9uRGF0YShldi5kYXRhKTtcbiAgICAgICAgdGhpcy53cy5vbmVycm9yID0gKGUpID0+IHRoaXMub25FcnJvcihcIndlYnNvY2tldCBlcnJvclwiLCBlKTtcbiAgICB9XG4gICAgd3JpdGUocGFja2V0cykge1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gICAgICAgIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYWNrZXQgPSBwYWNrZXRzW2ldO1xuICAgICAgICAgICAgY29uc3QgbGFzdFBhY2tldCA9IGkgPT09IHBhY2tldHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGVuY29kZVBhY2tldChwYWNrZXQsIHRoaXMuc3VwcG9ydHNCaW5hcnksIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRzID0ge307XG4gICAgICAgICAgICAgICAgaWYgKCF1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuID0gXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgZGF0YSA/IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpIDogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVuIDwgdGhpcy5vcHRzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4gICAgICAgICAgICAgICAgLy8gaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUeXBlRXJyb3IgaXMgdGhyb3duIHdoZW4gcGFzc2luZyB0aGUgc2Vjb25kIGFyZ3VtZW50IG9uIFNhZmFyaVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cy5zZW5kKGRhdGEsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsYXN0UGFja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZha2UgZHJhaW5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGVmZXIgdG8gbmV4dCB0aWNrIHRvIGFsbG93IFNvY2tldCB0byBjbGVhciB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuc2V0VGltZW91dEZuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwid3NzXCIgOiBcIndzXCI7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgLy8gYXBwZW5kIHRpbWVzdGFtcCB0byBVUklcbiAgICAgICAgaWYgKHRoaXMub3B0cy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgICAgICAgICAgcXVlcnlbdGhpcy5vcHRzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tbXVuaWNhdGUgYmluYXJ5IHN1cHBvcnQgY2FwYWJpbGl0aWVzXG4gICAgICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmkoc2NoZW1hLCBxdWVyeSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZlYXR1cmUgZGV0ZWN0aW9uIGZvciBXZWJTb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNoZWNrKCkge1xuICAgICAgICByZXR1cm4gISFXZWJTb2NrZXQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgbmV4dFRpY2sgfSBmcm9tIFwiLi93ZWJzb2NrZXQtY29uc3RydWN0b3IuanNcIjtcbmltcG9ydCB7IGVuY29kZVBhY2tldFRvQmluYXJ5LCBkZWNvZGVQYWNrZXRGcm9tQmluYXJ5LCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5mdW5jdGlvbiBzaG91bGRJbmNsdWRlQmluYXJ5SGVhZGVyKHBhY2tldCwgZW5jb2RlZCkge1xuICAgIC8vIDQ4ID09PSBcIjBcIi5jaGFyQ29kZUF0KDApIChPUEVOIHBhY2tldCB0eXBlKVxuICAgIC8vIDU0ID09PSBcIjZcIi5jaGFyQ29kZUF0KDApIChOT09QIHBhY2tldCB0eXBlKVxuICAgIHJldHVybiAocGFja2V0LnR5cGUgPT09IFwibWVzc2FnZVwiICYmXG4gICAgICAgIHR5cGVvZiBwYWNrZXQuZGF0YSAhPT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICBlbmNvZGVkWzBdID49IDQ4ICYmXG4gICAgICAgIGVuY29kZWRbMF0gPD0gNTQpO1xufVxuZXhwb3J0IGNsYXNzIFdUIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwid2VidHJhbnNwb3J0XCI7XG4gICAgfVxuICAgIGRvT3BlbigpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAodHlwZW9mIFdlYlRyYW5zcG9ydCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IG5ldyBXZWJUcmFuc3BvcnQodGhpcy5jcmVhdGVVcmkoXCJodHRwc1wiKSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbdGhpcy5uYW1lXSk7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlZFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwid2VidHJhbnNwb3J0IGVycm9yXCIsIGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBub3RlOiB3ZSBjb3VsZCBoYXZlIHVzZWQgYXN5bmMvYXdhaXQsIGJ1dCB0aGF0IHdvdWxkIHJlcXVpcmUgc29tZSBhZGRpdGlvbmFsIHBvbHlmaWxsc1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZWFkeS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LmNyZWF0ZUJpZGlyZWN0aW9uYWxTdHJlYW0oKS50aGVuKChzdHJlYW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0ucmVhZGFibGUuZ2V0UmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZXIgPSBzdHJlYW0ud3JpdGFibGUuZ2V0V3JpdGVyKCk7XG4gICAgICAgICAgICAgICAgbGV0IGJpbmFyeUZsYWc7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVhZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoeyBkb25lLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmluYXJ5RmxhZyAmJiB2YWx1ZS5ieXRlTGVuZ3RoID09PSAxICYmIHZhbHVlWzBdID09PSA1NCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeUZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBleHBvc2UgYmluYXJ5dHlwZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25QYWNrZXQoZGVjb2RlUGFja2V0RnJvbUJpbmFyeSh2YWx1ZSwgYmluYXJ5RmxhZywgXCJhcnJheWJ1ZmZlclwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluYXJ5RmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZWFkKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZHNoYWtlID0gdGhpcy5xdWVyeS5zaWQgPyBgMHtcInNpZFwiOlwiJHt0aGlzLnF1ZXJ5LnNpZH1cIn1gIDogXCIwXCI7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZXJcbiAgICAgICAgICAgICAgICAgICAgLndyaXRlKG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShoYW5kc2hha2UpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB0aGlzLm9uT3BlbigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgd3JpdGUocGFja2V0cykge1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBlbmNvZGVQYWNrZXRUb0JpbmFyeShwYWNrZXQsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNob3VsZEluY2x1ZGVCaW5hcnlIZWFkZXIocGFja2V0LCBkYXRhKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRlci53cml0ZShVaW50OEFycmF5Lm9mKDU0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVyLndyaXRlKGRhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy50cmFuc3BvcnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbG9zZSgpO1xuICAgIH1cbn1cbiIsIi8vIGJyb3dzZXIgc2hpbSBmb3IgeG1saHR0cHJlcXVlc3QgbW9kdWxlXG5pbXBvcnQgeyBoYXNDT1JTIH0gZnJvbSBcIi4uL2NvbnRyaWIvaGFzLWNvcnMuanNcIjtcbmltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi4vZ2xvYmFsVGhpcy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIFhIUihvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29va2llSmFyKCkgeyB9XG4iLCJpbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4vZ2xvYmFsVGhpcy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHBpY2sob2JqLCAuLi5hdHRyKSB7XG4gICAgcmV0dXJuIGF0dHIucmVkdWNlKChhY2MsIGspID0+IHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgYWNjW2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufVxuLy8gS2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgcmVhbCB0aW1lb3V0IGZ1bmN0aW9ucyBzbyB0aGV5IGNhbiBiZSB1c2VkIHdoZW4gb3ZlcnJpZGRlblxuY29uc3QgTkFUSVZFX1NFVF9USU1FT1VUID0gZ2xvYmFsVGhpcy5zZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBnbG9iYWxUaGlzLmNsZWFyVGltZW91dDtcbmV4cG9ydCBmdW5jdGlvbiBpbnN0YWxsVGltZXJGdW5jdGlvbnMob2JqLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMudXNlTmF0aXZlVGltZXJzKSB7XG4gICAgICAgIG9iai5zZXRUaW1lb3V0Rm4gPSBOQVRJVkVfU0VUX1RJTUVPVVQuYmluZChnbG9iYWxUaGlzKTtcbiAgICAgICAgb2JqLmNsZWFyVGltZW91dEZuID0gTkFUSVZFX0NMRUFSX1RJTUVPVVQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG9iai5zZXRUaW1lb3V0Rm4gPSBnbG9iYWxUaGlzLnNldFRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICAgICAgb2JqLmNsZWFyVGltZW91dEZuID0gZ2xvYmFsVGhpcy5jbGVhclRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG59XG4vLyBiYXNlNjQgZW5jb2RlZCBidWZmZXJzIGFyZSBhYm91dCAzMyUgYmlnZ2VyIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQpXG5jb25zdCBCQVNFNjRfT1ZFUkhFQUQgPSAxLjMzO1xuLy8gd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgYG5ldyBCbG9iKFtvYmpdKS5zaXplYCwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBpbiBJRTlcbmV4cG9ydCBmdW5jdGlvbiBieXRlTGVuZ3RoKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB1dGY4TGVuZ3RoKG9iaik7XG4gICAgfVxuICAgIC8vIGFycmF5YnVmZmVyIG9yIGJsb2JcbiAgICByZXR1cm4gTWF0aC5jZWlsKChvYmouYnl0ZUxlbmd0aCB8fCBvYmouc2l6ZSkgKiBCQVNFNjRfT1ZFUkhFQUQpO1xufVxuZnVuY3Rpb24gdXRmOExlbmd0aChzdHIpIHtcbiAgICBsZXQgYyA9IDAsIGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgbGVuZ3RoICs9IDQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbn1cbiIsImNvbnN0IFBBQ0tFVF9UWVBFUyA9IE9iamVjdC5jcmVhdGUobnVsbCk7IC8vIG5vIE1hcCA9IG5vIHBvbHlmaWxsXG5QQUNLRVRfVFlQRVNbXCJvcGVuXCJdID0gXCIwXCI7XG5QQUNLRVRfVFlQRVNbXCJjbG9zZVwiXSA9IFwiMVwiO1xuUEFDS0VUX1RZUEVTW1wicGluZ1wiXSA9IFwiMlwiO1xuUEFDS0VUX1RZUEVTW1wicG9uZ1wiXSA9IFwiM1wiO1xuUEFDS0VUX1RZUEVTW1wibWVzc2FnZVwiXSA9IFwiNFwiO1xuUEFDS0VUX1RZUEVTW1widXBncmFkZVwiXSA9IFwiNVwiO1xuUEFDS0VUX1RZUEVTW1wibm9vcFwiXSA9IFwiNlwiO1xuY29uc3QgUEFDS0VUX1RZUEVTX1JFVkVSU0UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuT2JqZWN0LmtleXMoUEFDS0VUX1RZUEVTKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgUEFDS0VUX1RZUEVTX1JFVkVSU0VbUEFDS0VUX1RZUEVTW2tleV1dID0ga2V5O1xufSk7XG5jb25zdCBFUlJPUl9QQUNLRVQgPSB7IHR5cGU6IFwiZXJyb3JcIiwgZGF0YTogXCJwYXJzZXIgZXJyb3JcIiB9O1xuZXhwb3J0IHsgUEFDS0VUX1RZUEVTLCBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgRVJST1JfUEFDS0VUIH07XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9iYXNlNjQtYXJyYXlidWZmZXJcbmNvbnN0IGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuY29uc3QgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG59XG5leHBvcnQgY29uc3QgZW5jb2RlID0gKGFycmF5YnVmZmVyKSA9PiB7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuICAgIGlmIChsZW4gJSAzID09PSAyKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nO1xuICAgIH1cbiAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JztcbiAgICB9XG4gICAgcmV0dXJuIGJhc2U2NDtcbn07XG5leHBvcnQgY29uc3QgZGVjb2RlID0gKGJhc2U2NCkgPT4ge1xuICAgIGxldCBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSwgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICBlbmNvZGVkMSA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAyKV07XG4gICAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAzKV07XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlidWZmZXI7XG59O1xuIiwiaW1wb3J0IHsgRVJST1JfUEFDS0VULCBQQUNLRVRfVFlQRVNfUkVWRVJTRSB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmV4cG9ydCBjb25zdCBkZWNvZGVQYWNrZXQgPSAoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZW5jb2RlZFBhY2tldCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBtYXBCaW5hcnkoZW5jb2RlZFBhY2tldCwgYmluYXJ5VHlwZSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGVuY29kZWRQYWNrZXQuY2hhckF0KDApO1xuICAgIGlmICh0eXBlID09PSBcImJcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBkZWNvZGVCYXNlNjRQYWNrZXQoZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSksIGJpbmFyeVR5cGUpXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXTtcbiAgICBpZiAoIXBhY2tldFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIEVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWRQYWNrZXQubGVuZ3RoID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdLFxuICAgICAgICAgICAgZGF0YTogZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSlcbiAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdXG4gICAgICAgIH07XG59O1xuY29uc3QgZGVjb2RlQmFzZTY0UGFja2V0ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGUoZGF0YSk7XG4gICAgICAgIHJldHVybiBtYXBCaW5hcnkoZGVjb2RlZCwgYmluYXJ5VHlwZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4geyBiYXNlNjQ6IHRydWUsIGRhdGEgfTsgLy8gZmFsbGJhY2sgZm9yIG9sZCBicm93c2Vyc1xuICAgIH1cbn07XG5jb25zdCBtYXBCaW5hcnkgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIHN3aXRjaCAoYmluYXJ5VHlwZSkge1xuICAgICAgICBjYXNlIFwiYmxvYlwiOlxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBXZWJTb2NrZXQgKyBiaW5hcnlUeXBlIFwiYmxvYlwiXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIEhUVFAgbG9uZy1wb2xsaW5nIG9yIFdlYlRyYW5zcG9ydFxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQmxvYihbZGF0YV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBjYXNlIFwiYXJyYXlidWZmZXJcIjpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIEhUVFAgbG9uZy1wb2xsaW5nIChiYXNlNjQpIG9yIFdlYlNvY2tldCArIGJpbmFyeVR5cGUgXCJhcnJheWJ1ZmZlclwiXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIFdlYlRyYW5zcG9ydCAoVWludDhBcnJheSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgICAgICAgICB9XG4gICAgfVxufTtcbiIsImltcG9ydCB7IFBBQ0tFVF9UWVBFUyB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG4vLyBBcnJheUJ1ZmZlci5pc1ZpZXcgbWV0aG9kIGlzIG5vdCBkZWZpbmVkIGluIElFMTBcbmNvbnN0IGlzVmlldyA9IG9iaiA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqICYmIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCBlbmNvZGVQYWNrZXQgPSAoeyB0eXBlLCBkYXRhIH0sIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBpZiAoc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNCYXNlNjQoZGF0YSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJlxuICAgICAgICAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhkYXRhKSkpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KG5ldyBCbG9iKFtkYXRhXSksIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBwbGFpbiBzdHJpbmdcbiAgICByZXR1cm4gY2FsbGJhY2soUEFDS0VUX1RZUEVTW3R5cGVdICsgKGRhdGEgfHwgXCJcIikpO1xufTtcbmNvbnN0IGVuY29kZUJsb2JBc0Jhc2U2NCA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZmlsZVJlYWRlci5yZXN1bHQuc3BsaXQoXCIsXCIpWzFdO1xuICAgICAgICBjYWxsYmFjayhcImJcIiArIChjb250ZW50IHx8IFwiXCIpKTtcbiAgICB9O1xuICAgIHJldHVybiBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZGF0YSk7XG59O1xuZnVuY3Rpb24gdG9BcnJheShkYXRhKSB7XG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEuYnl0ZUxlbmd0aCk7XG4gICAgfVxufVxubGV0IFRFWFRfRU5DT0RFUjtcbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGVQYWNrZXRUb0JpbmFyeShwYWNrZXQsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHdpdGhOYXRpdmVCbG9iICYmIHBhY2tldC5kYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICByZXR1cm4gcGFja2V0LmRhdGFcbiAgICAgICAgICAgIC5hcnJheUJ1ZmZlcigpXG4gICAgICAgICAgICAudGhlbih0b0FycmF5KVxuICAgICAgICAgICAgLnRoZW4oY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiZcbiAgICAgICAgKHBhY2tldC5kYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KHBhY2tldC5kYXRhKSkpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRvQXJyYXkocGFja2V0LmRhdGEpKTtcbiAgICB9XG4gICAgZW5jb2RlUGFja2V0KHBhY2tldCwgZmFsc2UsIGVuY29kZWQgPT4ge1xuICAgICAgICBpZiAoIVRFWFRfRU5DT0RFUikge1xuICAgICAgICAgICAgVEVYVF9FTkNPREVSID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soVEVYVF9FTkNPREVSLmVuY29kZShlbmNvZGVkKSk7XG4gICAgfSk7XG59XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQgfTtcbiIsImltcG9ydCB7IGVuY29kZVBhY2tldCwgZW5jb2RlUGFja2V0VG9CaW5hcnkgfSBmcm9tIFwiLi9lbmNvZGVQYWNrZXQuanNcIjtcbmltcG9ydCB7IGRlY29kZVBhY2tldCB9IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmxldCBURVhUX0RFQ09ERVI7XG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlUGFja2V0RnJvbUJpbmFyeShkYXRhLCBpc0JpbmFyeSwgYmluYXJ5VHlwZSkge1xuICAgIGlmICghVEVYVF9ERUNPREVSKSB7XG4gICAgICAgIC8vIGxhemlseSBjcmVhdGVkIGZvciBjb21wYXRpYmlsaXR5IHdpdGggb2xkIGJyb3dzZXIgcGxhdGZvcm1zXG4gICAgICAgIFRFWFRfREVDT0RFUiA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgIH1cbiAgICAvLyA0OCA9PT0gXCIwXCIuY2hhckNvZGVBdCgwKSAoT1BFTiBwYWNrZXQgdHlwZSlcbiAgICAvLyA1NCA9PT0gXCI2XCIuY2hhckNvZGVBdCgwKSAoTk9PUCBwYWNrZXQgdHlwZSlcbiAgICBjb25zdCBpc1BsYWluQmluYXJ5ID0gaXNCaW5hcnkgfHwgZGF0YVswXSA8IDQ4IHx8IGRhdGFbMF0gPiA1NDtcbiAgICByZXR1cm4gZGVjb2RlUGFja2V0KGlzUGxhaW5CaW5hcnkgPyBkYXRhIDogVEVYVF9ERUNPREVSLmRlY29kZShkYXRhKSwgYmluYXJ5VHlwZSk7XG59XG5leHBvcnQgY29uc3QgcHJvdG9jb2wgPSA0O1xuZXhwb3J0IHsgZW5jb2RlUGFja2V0LCBlbmNvZGVQYWNrZXRUb0JpbmFyeSwgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGFja2V0LCBkZWNvZGVQYXlsb2FkIH07XG4iLCIvKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICAgIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gICAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICAgIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gICAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgICAgIHZhciByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgICAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uIChtaW4pIHtcbiAgICB0aGlzLm1zID0gbWluO1xufTtcbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24gKG1heCkge1xuICAgIHRoaXMubWF4ID0gbWF4O1xufTtcbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbiAoaml0dGVyKSB7XG4gICAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuIiwiaW1wb3J0IHsgdXJsIH0gZnJvbSBcIi4vdXJsLmpzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4vbWFuYWdlci5qc1wiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5jb25zdCBjYWNoZSA9IHt9O1xuZnVuY3Rpb24gbG9va3VwKHVyaSwgb3B0cykge1xuICAgIGlmICh0eXBlb2YgdXJpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgY29uc3QgcGFyc2VkID0gdXJsKHVyaSwgb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiKTtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXJzZWQuc291cmNlO1xuICAgIGNvbnN0IGlkID0gcGFyc2VkLmlkO1xuICAgIGNvbnN0IHBhdGggPSBwYXJzZWQucGF0aDtcbiAgICBjb25zdCBzYW1lTmFtZXNwYWNlID0gY2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdW1wibnNwc1wiXTtcbiAgICBjb25zdCBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fFxuICAgICAgICBvcHRzW1wiZm9yY2UgbmV3IGNvbm5lY3Rpb25cIl0gfHxcbiAgICAgICAgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8XG4gICAgICAgIHNhbWVOYW1lc3BhY2U7XG4gICAgbGV0IGlvO1xuICAgIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgICAgIGlvID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICAgICAgICBjYWNoZVtpZF0gPSBuZXcgTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlvID0gY2FjaGVbaWRdO1xuICAgIH1cbiAgICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnlLZXk7XG4gICAgfVxuICAgIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuLy8gc28gdGhhdCBcImxvb2t1cFwiIGNhbiBiZSB1c2VkIGJvdGggYXMgYSBmdW5jdGlvbiAoZS5nLiBgaW8oLi4uKWApIGFuZCBhcyBhXG4vLyBuYW1lc3BhY2UgKGUuZy4gYGlvLmNvbm5lY3QoLi4uKWApLCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuT2JqZWN0LmFzc2lnbihsb29rdXAsIHtcbiAgICBNYW5hZ2VyLFxuICAgIFNvY2tldCxcbiAgICBpbzogbG9va3VwLFxuICAgIGNvbm5lY3Q6IGxvb2t1cCxcbn0pO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgcHJvdG9jb2wgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuLyoqXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgTWFuYWdlciwgU29ja2V0LCBsb29rdXAgYXMgaW8sIGxvb2t1cCBhcyBjb25uZWN0LCBsb29rdXAgYXMgZGVmYXVsdCwgfTtcbiIsImltcG9ydCB7IFNvY2tldCBhcyBFbmdpbmUsIGluc3RhbGxUaW1lckZ1bmN0aW9ucywgbmV4dFRpY2ssIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0ICogYXMgcGFyc2VyIGZyb20gXCJzb2NrZXQuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBvbiB9IGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgeyBCYWNrb2ZmIH0gZnJvbSBcIi4vY29udHJpYi9iYWNrbzIuanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIsIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmV4cG9ydCBjbGFzcyBNYW5hZ2VyIGV4dGVuZHMgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uc3BzID0ge307XG4gICAgICAgIHRoaXMuc3VicyA9IFtdO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIG9wdHMucGF0aCA9IG9wdHMucGF0aCB8fCBcIi9zb2NrZXQuaW9cIjtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgICAgICAgdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKChfYSA9IG9wdHMucmFuZG9taXphdGlvbkZhY3RvcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMC41KTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmID0gbmV3IEJhY2tvZmYoe1xuICAgICAgICAgICAgbWluOiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksXG4gICAgICAgICAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICAgICAgICAgIGppdHRlcjogdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgY29uc3QgX3BhcnNlciA9IG9wdHMucGFyc2VyIHx8IHBhcnNlcjtcbiAgICAgICAgdGhpcy5lbmNvZGVyID0gbmV3IF9wYXJzZXIuRW5jb2RlcigpO1xuICAgICAgICB0aGlzLmRlY29kZXIgPSBuZXcgX3BhcnNlci5EZWNvZGVyKCk7XG4gICAgICAgIHRoaXMuX2F1dG9Db25uZWN0ID0gb3B0cy5hdXRvQ29ubmVjdCAhPT0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvQ29ubmVjdClcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb24odikge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25BdHRlbXB0cyh2KSB7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHM7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkRlbGF5KHYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5O1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7XG4gICAgICAgIChfYSA9IHRoaXMuYmFja29mZikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldE1pbih2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJhbmRvbWl6YXRpb25GYWN0b3Iodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvcjtcbiAgICAgICAgdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7XG4gICAgICAgIChfYSA9IHRoaXMuYmFja29mZikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldEppdHRlcih2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkRlbGF5TWF4KHYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4O1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heCA9IHY7XG4gICAgICAgIChfYSA9IHRoaXMuYmFja29mZikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnNldE1heCh2KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHRpbWVvdXQodikge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZW91dDtcbiAgICAgICAgdGhpcy5fdGltZW91dCA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcbiAgICAgKiBzdGFydGVkIHJlY29ubmVjdGluZyB5ZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbWF5YmVSZWNvbm5lY3RPbk9wZW4oKSB7XG4gICAgICAgIC8vIE9ubHkgdHJ5IHRvIHJlY29ubmVjdCBpZiBpdCdzIHRoZSBmaXJzdCB0aW1lIHdlJ3JlIGNvbm5lY3RpbmdcbiAgICAgICAgaWYgKCF0aGlzLl9yZWNvbm5lY3RpbmcgJiZcbiAgICAgICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbiAmJlxuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmLmF0dGVtcHRzID09PSAwKSB7XG4gICAgICAgICAgICAvLyBrZWVwcyByZWNvbm5lY3Rpb24gZnJvbSBmaXJpbmcgdHdpY2UgZm9yIHRoZSBzYW1lIHJlY29ubmVjdGlvbiBsb29wXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBvcHRpb25hbCwgY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb3Blbihmbikge1xuICAgICAgICBpZiAofnRoaXMuX3JlYWR5U3RhdGUuaW5kZXhPZihcIm9wZW5cIikpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgRW5naW5lKHRoaXMudXJpLCB0aGlzLm9wdHMpO1xuICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgdGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7XG4gICAgICAgIC8vIGVtaXQgYG9wZW5gXG4gICAgICAgIGNvbnN0IG9wZW5TdWJEZXN0cm95ID0gb24oc29ja2V0LCBcIm9wZW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbm9wZW4oKTtcbiAgICAgICAgICAgIGZuICYmIGZuKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBvbkVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgICAgIGZuKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgbm8gZm4gdG8gaGFuZGxlIHRoZSBlcnJvclxuICAgICAgICAgICAgICAgIHRoaXMubWF5YmVSZWNvbm5lY3RPbk9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gZW1pdCBgZXJyb3JgXG4gICAgICAgIGNvbnN0IGVycm9yU3ViID0gb24oc29ja2V0LCBcImVycm9yXCIsIG9uRXJyb3IpO1xuICAgICAgICBpZiAoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICAgICAgICAgICAgLy8gc2V0IHRpbWVyXG4gICAgICAgICAgICBjb25zdCB0aW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBvcGVuU3ViRGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIG9uRXJyb3IobmV3IEVycm9yKFwidGltZW91dFwiKSk7XG4gICAgICAgICAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWJEZXN0cm95KTtcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIG9wZW4oKVxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbm5lY3QoZm4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3Blbihmbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbm9wZW4oKSB7XG4gICAgICAgIC8vIGNsZWFyIG9sZCBzdWJzXG4gICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAvLyBtYXJrIGFzIG9wZW5cbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIC8vIGFkZCBuZXcgc3Vic1xuICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgICAgICAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCBcInBpbmdcIiwgdGhpcy5vbnBpbmcuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJkYXRhXCIsIHRoaXMub25kYXRhLmJpbmQodGhpcykpLCBvbihzb2NrZXQsIFwiZXJyb3JcIiwgdGhpcy5vbmVycm9yLmJpbmQodGhpcykpLCBvbihzb2NrZXQsIFwiY2xvc2VcIiwgdGhpcy5vbmNsb3NlLmJpbmQodGhpcykpLCBvbih0aGlzLmRlY29kZXIsIFwiZGVjb2RlZFwiLCB0aGlzLm9uZGVjb2RlZC5iaW5kKHRoaXMpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgcGluZy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25waW5nKCkge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGF0YShkYXRhKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLm9uY2xvc2UoXCJwYXJzZSBlcnJvclwiLCBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kZWNvZGVkKHBhY2tldCkge1xuICAgICAgICAvLyB0aGUgbmV4dFRpY2sgY2FsbCBwcmV2ZW50cyBhbiBleGNlcHRpb24gaW4gYSB1c2VyLXByb3ZpZGVkIGV2ZW50IGxpc3RlbmVyIGZyb20gdHJpZ2dlcmluZyBhIGRpc2Nvbm5lY3Rpb24gZHVlIHRvIGEgXCJwYXJzZSBlcnJvclwiXG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgICAgIH0sIHRoaXMuc2V0VGltZW91dEZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc29ja2V0IGZvciB0aGUgZ2l2ZW4gYG5zcGAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNvY2tldChuc3AsIG9wdHMpIHtcbiAgICAgICAgbGV0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICBpZiAoIXNvY2tldCkge1xuICAgICAgICAgICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgICAgICAgICAgdGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fYXV0b0Nvbm5lY3QgJiYgIXNvY2tldC5hY3RpdmUpIHtcbiAgICAgICAgICAgIHNvY2tldC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29ja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGVzdHJveShzb2NrZXQpIHtcbiAgICAgICAgY29uc3QgbnNwcyA9IE9iamVjdC5rZXlzKHRoaXMubnNwcyk7XG4gICAgICAgIGZvciAoY29uc3QgbnNwIG9mIG5zcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICAgICAgaWYgKHNvY2tldC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3BhY2tldChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSB0aGlzLmVuY29kZXIuZW5jb2RlKHBhY2tldCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICB0aGlzLnN1YnMubGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5kZWNvZGVyLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2UgdGhlIGN1cnJlbnQgc29ja2V0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uY2xvc2UoXCJmb3JjZWQgY2xvc2VcIik7XG4gICAgICAgIGlmICh0aGlzLmVuZ2luZSlcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLmNsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBjbG9zZSgpXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdCBhIHJlY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcmVjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9mYWlsZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2F0dGVtcHRcIiwgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucmVjb25uZWN0KCkge1xuICAgICAgICBjb25zdCBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0XCIsIGF0dGVtcHQpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBvbihvYmosIGV2LCBmbikge1xuICAgIG9iai5vbihldiwgZm4pO1xuICAgIHJldHVybiBmdW5jdGlvbiBzdWJEZXN0cm95KCkge1xuICAgICAgICBvYmoub2ZmKGV2LCBmbik7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IFBhY2tldFR5cGUgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG4vKipcbiAqIEEgU29ja2V0IGlzIHRoZSBmdW5kYW1lbnRhbCBjbGFzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgc2VydmVyLlxuICpcbiAqIEEgU29ja2V0IGJlbG9uZ3MgdG8gYSBjZXJ0YWluIE5hbWVzcGFjZSAoYnkgZGVmYXVsdCAvKSBhbmQgdXNlcyBhbiB1bmRlcmx5aW5nIHtAbGluayBNYW5hZ2VyfSB0byBjb21tdW5pY2F0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAqXG4gKiBzb2NrZXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAqICAgY29uc29sZS5sb2coXCJjb25uZWN0ZWRcIik7XG4gKiB9KTtcbiAqXG4gKiAvLyBzZW5kIGFuIGV2ZW50IHRvIHRoZSBzZXJ2ZXJcbiAqIHNvY2tldC5lbWl0KFwiZm9vXCIsIFwiYmFyXCIpO1xuICpcbiAqIHNvY2tldC5vbihcImZvb2JhclwiLCAoKSA9PiB7XG4gKiAgIC8vIGFuIGV2ZW50IHdhcyByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXJcbiAqIH0pO1xuICpcbiAqIC8vIHVwb24gZGlzY29ubmVjdGlvblxuICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKGBkaXNjb25uZWN0ZWQgZHVlIHRvICR7cmVhc29ufWApO1xuICogfSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihpbywgbnNwLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBzb2NrZXQgaXMgY3VycmVudGx5IGNvbm5lY3RlZCB0byB0aGUgc2VydmVyLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAgICAgKlxuICAgICAgICAgKiBzb2NrZXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAgICAgICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuY29ubmVjdGVkKTsgLy8gdHJ1ZVxuICAgICAgICAgKiB9KTtcbiAgICAgICAgICpcbiAgICAgICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmNvbm5lY3RlZCk7IC8vIGZhbHNlXG4gICAgICAgICAqIH0pO1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIGNvbm5lY3Rpb24gc3RhdGUgd2FzIHJlY292ZXJlZCBhZnRlciBhIHRlbXBvcmFyeSBkaXNjb25uZWN0aW9uLiBJbiB0aGF0IGNhc2UsIGFueSBtaXNzZWQgcGFja2V0cyB3aWxsXG4gICAgICAgICAqIGJlIHRyYW5zbWl0dGVkIGJ5IHRoZSBzZXJ2ZXIuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY292ZXJlZCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnVmZmVyIGZvciBwYWNrZXRzIHJlY2VpdmVkIGJlZm9yZSB0aGUgQ09OTkVDVCBwYWNrZXRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogQnVmZmVyIGZvciBwYWNrZXRzIHRoYXQgd2lsbCBiZSBzZW50IG9uY2UgdGhlIHNvY2tldCBpcyBjb25uZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHF1ZXVlIG9mIHBhY2tldHMgdG8gYmUgc2VudCB3aXRoIHJldHJ5IGluIGNhc2Ugb2YgZmFpbHVyZS5cbiAgICAgICAgICpcbiAgICAgICAgICogUGFja2V0cyBhcmUgc2VudCBvbmUgYnkgb25lLCBlYWNoIHdhaXRpbmcgZm9yIHRoZSBzZXJ2ZXIgYWNrbm93bGVkZ2VtZW50LCBpbiBvcmRlciB0byBndWFyYW50ZWUgdGhlIGRlbGl2ZXJ5IG9yZGVyLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcXVldWUgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgc2VxdWVuY2UgdG8gZ2VuZXJhdGUgdGhlIElEIG9mIHRoZSB7QGxpbmsgUXVldWVkUGFja2V0fS5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3F1ZXVlU2VxID0gMDtcbiAgICAgICAgdGhpcy5pZHMgPSAwO1xuICAgICAgICB0aGlzLmFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMubnNwID0gbnNwO1xuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLmF1dGgpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCA9IG9wdHMuYXV0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cyk7XG4gICAgICAgIGlmICh0aGlzLmlvLl9hdXRvQ29ubmVjdClcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBzb2NrZXQgaXMgY3VycmVudGx5IGRpc2Nvbm5lY3RlZFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuZGlzY29ubmVjdGVkKTsgLy8gZmFsc2VcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmRpc2Nvbm5lY3RlZCk7IC8vIHRydWVcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBnZXQgZGlzY29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuY29ubmVjdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdG8gb3BlbiwgY2xvc2UgYW5kIHBhY2tldCBldmVudHNcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3ViRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBpbyA9IHRoaXMuaW87XG4gICAgICAgIHRoaXMuc3VicyA9IFtcbiAgICAgICAgICAgIG9uKGlvLCBcIm9wZW5cIiwgdGhpcy5vbm9wZW4uYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJwYWNrZXRcIiwgdGhpcy5vbnBhY2tldC5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG9uKGlvLCBcImVycm9yXCIsIHRoaXMub25lcnJvci5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG9uKGlvLCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgU29ja2V0IHdpbGwgdHJ5IHRvIHJlY29ubmVjdCB3aGVuIGl0cyBNYW5hZ2VyIGNvbm5lY3RzIG9yIHJlY29ubmVjdHMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gICAgICpcbiAgICAgKiBjb25zb2xlLmxvZyhzb2NrZXQuYWN0aXZlKTsgLy8gdHJ1ZVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gICAgICogICBpZiAocmVhc29uID09PSBcImlvIHNlcnZlciBkaXNjb25uZWN0XCIpIHtcbiAgICAgKiAgICAgLy8gdGhlIGRpc2Nvbm5lY3Rpb24gd2FzIGluaXRpYXRlZCBieSB0aGUgc2VydmVyLCB5b3UgbmVlZCB0byBtYW51YWxseSByZWNvbm5lY3RcbiAgICAgKiAgICAgY29uc29sZS5sb2coc29ja2V0LmFjdGl2ZSk7IC8vIGZhbHNlXG4gICAgICogICB9XG4gICAgICogICAvLyBlbHNlIHRoZSBzb2NrZXQgd2lsbCBhdXRvbWF0aWNhbGx5IHRyeSB0byByZWNvbm5lY3RcbiAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5hY3RpdmUpOyAvLyB0cnVlXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdWJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgc29ja2V0ID0gaW8oe1xuICAgICAqICAgYXV0b0Nvbm5lY3Q6IGZhbHNlXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQuY29ubmVjdCgpO1xuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLnN1YkV2ZW50cygpO1xuICAgICAgICBpZiAoIXRoaXMuaW9bXCJfcmVjb25uZWN0aW5nXCJdKVxuICAgICAgICAgICAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5pby5fcmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHRoaXMub25vcGVuKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIGNvbm5lY3QoKX0uXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG1pbWljcyB0aGUgV2ViU29ja2V0LnNlbmQoKSBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXQvc2VuZFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuc2VuZChcImhlbGxvXCIpO1xuICAgICAqXG4gICAgICogLy8gdGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICogc29ja2V0LmVtaXQoXCJtZXNzYWdlXCIsIFwiaGVsbG9cIik7XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBzZW5kKC4uLmFyZ3MpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KFwibWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgYGVtaXRgLlxuICAgICAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuZW1pdChcImhlbGxvXCIsIFwid29ybGRcIik7XG4gICAgICpcbiAgICAgKiAvLyBhbGwgc2VyaWFsaXphYmxlIGRhdGFzdHJ1Y3R1cmVzIGFyZSBzdXBwb3J0ZWQgKG5vIG5lZWQgdG8gY2FsbCBKU09OLnN0cmluZ2lmeSlcbiAgICAgKiBzb2NrZXQuZW1pdChcImhlbGxvXCIsIDEsIFwiMlwiLCB7IDM6IFtcIjRcIl0sIDU6IFVpbnQ4QXJyYXkuZnJvbShbNl0pIH0pO1xuICAgICAqXG4gICAgICogLy8gd2l0aCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyXG4gICAgICogc29ja2V0LmVtaXQoXCJoZWxsb1wiLCBcIndvcmxkXCIsICh2YWwpID0+IHtcbiAgICAgKiAgIC8vIC4uLlxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgZW1pdChldiwgLi4uYXJncykge1xuICAgICAgICBpZiAoUkVTRVJWRURfRVZFTlRTLmhhc093blByb3BlcnR5KGV2KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcIicgKyBldi50b1N0cmluZygpICsgJ1wiIGlzIGEgcmVzZXJ2ZWQgZXZlbnQgbmFtZScpO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MudW5zaGlmdChldik7XG4gICAgICAgIGlmICh0aGlzLl9vcHRzLnJldHJpZXMgJiYgIXRoaXMuZmxhZ3MuZnJvbVF1ZXVlICYmICF0aGlzLmZsYWdzLnZvbGF0aWxlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRUb1F1ZXVlKGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5FVkVOVCxcbiAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgIH07XG4gICAgICAgIHBhY2tldC5vcHRpb25zID0ge307XG4gICAgICAgIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gdGhpcy5mbGFncy5jb21wcmVzcyAhPT0gZmFsc2U7XG4gICAgICAgIC8vIGV2ZW50IGFjayBjYWxsYmFja1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMuaWRzKys7XG4gICAgICAgICAgICBjb25zdCBhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJBY2tDYWxsYmFjayhpZCwgYWNrKTtcbiAgICAgICAgICAgIHBhY2tldC5pZCA9IGlkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVHJhbnNwb3J0V3JpdGFibGUgPSB0aGlzLmlvLmVuZ2luZSAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0aGlzLmlvLmVuZ2luZS50cmFuc3BvcnQud3JpdGFibGU7XG4gICAgICAgIGNvbnN0IGRpc2NhcmRQYWNrZXQgPSB0aGlzLmZsYWdzLnZvbGF0aWxlICYmICghaXNUcmFuc3BvcnRXcml0YWJsZSB8fCAhdGhpcy5jb25uZWN0ZWQpO1xuICAgICAgICBpZiAoZGlzY2FyZFBhY2tldCkge1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZsYWdzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZWdpc3RlckFja0NhbGxiYWNrKGlkLCBhY2spIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCB0aW1lb3V0ID0gKF9hID0gdGhpcy5mbGFncy50aW1lb3V0KSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB0aGlzLl9vcHRzLmFja1RpbWVvdXQ7XG4gICAgICAgIGlmICh0aW1lb3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWNrc1tpZF0gPSBhY2s7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCB0aW1lciA9IHRoaXMuaW8uc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbaWRdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZW5kQnVmZmVyW2ldLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFjay5jYWxsKHRoaXMsIG5ldyBFcnJvcihcIm9wZXJhdGlvbiBoYXMgdGltZWQgb3V0XCIpKTtcbiAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgIHRoaXMuYWNrc1tpZF0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5pby5jbGVhclRpbWVvdXRGbih0aW1lcik7XG4gICAgICAgICAgICBhY2suYXBwbHkodGhpcywgW251bGwsIC4uLmFyZ3NdKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgYW5kIHdhaXRzIGZvciBhbiBhY2tub3dsZWRnZW1lbnRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gd2l0aG91dCB0aW1lb3V0XG4gICAgICogY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzb2NrZXQuZW1pdFdpdGhBY2soXCJoZWxsb1wiLCBcIndvcmxkXCIpO1xuICAgICAqXG4gICAgICogLy8gd2l0aCBhIHNwZWNpZmljIHRpbWVvdXRcbiAgICAgKiB0cnkge1xuICAgICAqICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzb2NrZXQudGltZW91dCgxMDAwKS5lbWl0V2l0aEFjayhcImhlbGxvXCIsIFwid29ybGRcIik7XG4gICAgICogfSBjYXRjaCAoZXJyKSB7XG4gICAgICogICAvLyB0aGUgc2VydmVyIGRpZCBub3QgYWNrbm93bGVkZ2UgdGhlIGV2ZW50IGluIHRoZSBnaXZlbiBkZWxheVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc2VydmVyIGFja25vd2xlZGdlcyB0aGUgZXZlbnRcbiAgICAgKi9cbiAgICBlbWl0V2l0aEFjayhldiwgLi4uYXJncykge1xuICAgICAgICAvLyB0aGUgdGltZW91dCBmbGFnIGlzIG9wdGlvbmFsXG4gICAgICAgIGNvbnN0IHdpdGhFcnIgPSB0aGlzLmZsYWdzLnRpbWVvdXQgIT09IHVuZGVmaW5lZCB8fCB0aGlzLl9vcHRzLmFja1RpbWVvdXQgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCgoYXJnMSwgYXJnMikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh3aXRoRXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcmcxID8gcmVqZWN0KGFyZzEpIDogcmVzb2x2ZShhcmcyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGFyZzEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KGV2LCAuLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgcGFja2V0IHRvIHRoZSBxdWV1ZS5cbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFRvUXVldWUoYXJncykge1xuICAgICAgICBsZXQgYWNrO1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLl9xdWV1ZVNlcSsrLFxuICAgICAgICAgICAgdHJ5Q291bnQ6IDAsXG4gICAgICAgICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICBmbGFnczogT2JqZWN0LmFzc2lnbih7IGZyb21RdWV1ZTogdHJ1ZSB9LCB0aGlzLmZsYWdzKSxcbiAgICAgICAgfTtcbiAgICAgICAgYXJncy5wdXNoKChlcnIsIC4uLnJlc3BvbnNlQXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKHBhY2tldCAhPT0gdGhpcy5fcXVldWVbMF0pIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgcGFja2V0IGhhcyBhbHJlYWR5IGJlZW4gYWNrbm93bGVkZ2VkXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaGFzRXJyb3IgPSBlcnIgIT09IG51bGw7XG4gICAgICAgICAgICBpZiAoaGFzRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LnRyeUNvdW50ID4gdGhpcy5fb3B0cy5yZXRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjayhudWxsLCAuLi5yZXNwb25zZUFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhY2tldC5wZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhaW5RdWV1ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcXVldWUucHVzaChwYWNrZXQpO1xuICAgICAgICB0aGlzLl9kcmFpblF1ZXVlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmQgdGhlIGZpcnN0IHBhY2tldCBvZiB0aGUgcXVldWUsIGFuZCB3YWl0IGZvciBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyLlxuICAgICAqIEBwYXJhbSBmb3JjZSAtIHdoZXRoZXIgdG8gcmVzZW5kIGEgcGFja2V0IHRoYXQgaGFzIG5vdCBiZWVuIGFja25vd2xlZGdlZCB5ZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2RyYWluUXVldWUoZm9yY2UgPSBmYWxzZSkge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkIHx8IHRoaXMuX3F1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHRoaXMuX3F1ZXVlWzBdO1xuICAgICAgICBpZiAocGFja2V0LnBlbmRpbmcgJiYgIWZvcmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcGFja2V0LnBlbmRpbmcgPSB0cnVlO1xuICAgICAgICBwYWNrZXQudHJ5Q291bnQrKztcbiAgICAgICAgdGhpcy5mbGFncyA9IHBhY2tldC5mbGFncztcbiAgICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIHBhY2tldC5hcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwYWNrZXQocGFja2V0KSB7XG4gICAgICAgIHBhY2tldC5uc3AgPSB0aGlzLm5zcDtcbiAgICAgICAgdGhpcy5pby5fcGFja2V0KHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF1dGggPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGgoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZW5kQ29ubmVjdFBhY2tldChkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VuZENvbm5lY3RQYWNrZXQodGhpcy5hdXRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIENPTk5FQ1QgcGFja2V0IHRvIGluaXRpYXRlIHRoZSBTb2NrZXQuSU8gc2Vzc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2VuZENvbm5lY3RQYWNrZXQoZGF0YSkge1xuICAgICAgICB0aGlzLnBhY2tldCh7XG4gICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkNPTk5FQ1QsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLl9waWRcbiAgICAgICAgICAgICAgICA/IE9iamVjdC5hc3NpZ24oeyBwaWQ6IHRoaXMuX3BpZCwgb2Zmc2V0OiB0aGlzLl9sYXN0T2Zmc2V0IH0sIGRhdGEpXG4gICAgICAgICAgICAgICAgOiBkYXRhLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIG9yIG1hbmFnZXIgYGVycm9yYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBlcnJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZXJyb3IoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgY2xvc2VgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHJlYXNvblxuICAgICAqIEBwYXJhbSBkZXNjcmlwdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmlkO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRpc2Nvbm5lY3RcIiwgcmVhc29uLCBkZXNjcmlwdGlvbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgY29uc3Qgc2FtZU5hbWVzcGFjZSA9IHBhY2tldC5uc3AgPT09IHRoaXMubnNwO1xuICAgICAgICBpZiAoIXNhbWVOYW1lc3BhY2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUOlxuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQuZGF0YSAmJiBwYWNrZXQuZGF0YS5zaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmNvbm5lY3QocGFja2V0LmRhdGEuc2lkLCBwYWNrZXQuZGF0YS5waWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIG5ldyBFcnJvcihcIkl0IHNlZW1zIHlvdSBhcmUgdHJ5aW5nIHRvIHJlYWNoIGEgU29ja2V0LklPIHNlcnZlciBpbiB2Mi54IHdpdGggYSB2My54IGNsaWVudCwgYnV0IHRoZXkgYXJlIG5vdCBjb21wYXRpYmxlIChtb3JlIGluZm9ybWF0aW9uIGhlcmU6IGh0dHBzOi8vc29ja2V0LmlvL2RvY3MvdjMvbWlncmF0aW5nLWZyb20tMi14LXRvLTMtMC8pXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5ESVNDT05ORUNUOlxuICAgICAgICAgICAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVF9FUlJPUjpcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IocGFja2V0LmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGVyci5kYXRhID0gcGFja2V0LmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBldmVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZXZlbnQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBwYWNrZXQuZGF0YSB8fCBbXTtcbiAgICAgICAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgICAgICAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRFdmVudChhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKE9iamVjdC5mcmVlemUoYXJncykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVtaXRFdmVudChhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlMaXN0ZW5lcnMgJiYgdGhpcy5fYW55TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGlmICh0aGlzLl9waWQgJiYgYXJncy5sZW5ndGggJiYgdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fbGFzdE9mZnNldCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhY2soaWQpIHtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBzZW50ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gcHJldmVudCBkb3VibGUgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAoc2VudClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYucGFja2V0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBQYWNrZXRUeXBlLkFDSyxcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uYWNrKHBhY2tldCkge1xuICAgICAgICBjb25zdCBhY2sgPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGFjaykge1xuICAgICAgICAgICAgYWNrLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jb25uZWN0KGlkLCBwaWQpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnJlY292ZXJlZCA9IHBpZCAmJiB0aGlzLl9waWQgPT09IHBpZDtcbiAgICAgICAgdGhpcy5fcGlkID0gcGlkOyAvLyBkZWZpbmVkIG9ubHkgaWYgY29ubmVjdGlvbiBzdGF0ZSByZWNvdmVyeSBpcyBlbmFibGVkXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0XCIpO1xuICAgICAgICB0aGlzLl9kcmFpblF1ZXVlKHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBlbWl0QnVmZmVyZWQoKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5mb3JFYWNoKChhcmdzKSA9PiB0aGlzLmVtaXRFdmVudChhcmdzKSk7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaCgocGFja2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBzZXJ2ZXIgZGlzY29ubmVjdFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcbiAgICAgKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICAgICAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzKSB7XG4gICAgICAgICAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICAgICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICAgICAgdGhpcy5zdWJzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW9bXCJfZGVzdHJveVwiXSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS4gSW4gdGhhdCBjYXNlLCB0aGUgc29ja2V0IHdpbGwgbm90IHRyeSB0byByZWNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIGlzIHRoZSBsYXN0IGFjdGl2ZSBTb2NrZXQgaW5zdGFuY2Ugb2YgdGhlIHtAbGluayBNYW5hZ2VyfSwgdGhlIGxvdy1sZXZlbCBjb25uZWN0aW9uIHdpbGwgYmUgY2xvc2VkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gICAgICogICAvLyBjb25zb2xlLmxvZyhyZWFzb24pOyBwcmludHMgXCJpbyBjbGllbnQgZGlzY29ubmVjdFwiXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuRElTQ09OTkVDVCB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAvLyBmaXJlIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gY2xpZW50IGRpc2Nvbm5lY3RcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB7QGxpbmsgZGlzY29ubmVjdCgpfS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5jb21wcmVzcyhmYWxzZSkuZW1pdChcImhlbGxvXCIpO1xuICAgICAqXG4gICAgICogQHBhcmFtIGNvbXByZXNzIC0gaWYgYHRydWVgLCBjb21wcmVzc2VzIHRoZSBzZW5kaW5nIGRhdGFcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBjb21wcmVzcyhjb21wcmVzcykge1xuICAgICAgICB0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBldmVudCBtZXNzYWdlIHdpbGwgYmUgZHJvcHBlZCB3aGVuIHRoaXMgc29ja2V0IGlzIG5vdFxuICAgICAqIHJlYWR5IHRvIHNlbmQgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC52b2xhdGlsZS5lbWl0KFwiaGVsbG9cIik7IC8vIHRoZSBzZXJ2ZXIgbWF5IG9yIG1heSBub3QgcmVjZWl2ZSBpdFxuICAgICAqXG4gICAgICogQHJldHVybnMgc2VsZlxuICAgICAqL1xuICAgIGdldCB2b2xhdGlsZSgpIHtcbiAgICAgICAgdGhpcy5mbGFncy52b2xhdGlsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGVycm9yIHdoZW4gdGhlXG4gICAgICogZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgd2l0aG91dCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyOlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQudGltZW91dCg1MDAwKS5lbWl0KFwibXktZXZlbnRcIiwgKGVycikgPT4ge1xuICAgICAqICAgaWYgKGVycikge1xuICAgICAqICAgICAvLyB0aGUgc2VydmVyIGRpZCBub3QgYWNrbm93bGVkZ2UgdGhlIGV2ZW50IGluIHRoZSBnaXZlbiBkZWxheVxuICAgICAqICAgfVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHJldHVybnMgc2VsZlxuICAgICAqL1xuICAgIHRpbWVvdXQodGltZW91dCkge1xuICAgICAgICB0aGlzLmZsYWdzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQub25BbnkoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgZ290ICR7ZXZlbnR9YCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBvbkFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnByZXBlbmRBbnkoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgZ290IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcmVwZW5kQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGNhdGNoQWxsTGlzdGVuZXIgPSAoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBnb3QgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBzb2NrZXQub25BbnkoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyByZW1vdmUgYSBzcGVjaWZpYyBsaXN0ZW5lclxuICAgICAqIHNvY2tldC5vZmZBbnkoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyBvciByZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqIHNvY2tldC5vZmZBbnkoKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIG9mZkFueShsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FueUxpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBsaXN0ZW5pbmcgZm9yIGFueSBldmVudCB0aGF0IGlzIHNwZWNpZmllZC4gVGhpcyBhcnJheSBjYW4gYmUgbWFuaXB1bGF0ZWQsXG4gICAgICogZS5nLiB0byByZW1vdmUgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIGxpc3RlbmVyc0FueSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogTm90ZTogYWNrbm93bGVkZ2VtZW50cyBzZW50IHRvIHRoZSBzZXJ2ZXIgYXJlIG5vdCBpbmNsdWRlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgc2VudCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgb25BbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIE5vdGU6IGFja25vd2xlZGdlbWVudHMgc2VudCB0byB0aGUgc2VydmVyIGFyZSBub3QgaW5jbHVkZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5wcmVwZW5kQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgc2VudCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgcHJlcGVuZEFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGNhdGNoQWxsTGlzdGVuZXIgPSAoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBzZW50IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyByZW1vdmUgYSBzcGVjaWZpYyBsaXN0ZW5lclxuICAgICAqIHNvY2tldC5vZmZBbnlPdXRnb2luZyhjYXRjaEFsbExpc3RlbmVyKTtcbiAgICAgKlxuICAgICAqIC8vIG9yIHJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICogc29ja2V0Lm9mZkFueU91dGdvaW5nKCk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gW2xpc3RlbmVyXSAtIHRoZSBjYXRjaC1hbGwgbGlzdGVuZXIgKG9wdGlvbmFsKVxuICAgICAqL1xuICAgIG9mZkFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55T3V0Z29pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm90aWZ5IHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggcGFja2V0IHNlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbm90aWZ5T3V0Z29pbmdMaXN0ZW5lcnMocGFja2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyAmJiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IHBhcnNlIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbi8qKlxuICogVVJMIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0gdXJpIC0gdXJsXG4gKiBAcGFyYW0gcGF0aCAtIHRoZSByZXF1ZXN0IHBhdGggb2YgdGhlIGNvbm5lY3Rpb25cbiAqIEBwYXJhbSBsb2MgLSBBbiBvYmplY3QgbWVhbnQgdG8gbWltaWMgd2luZG93LmxvY2F0aW9uLlxuICogICAgICAgIERlZmF1bHRzIHRvIHdpbmRvdy5sb2NhdGlvbi5cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVybCh1cmksIHBhdGggPSBcIlwiLCBsb2MpIHtcbiAgICBsZXQgb2JqID0gdXJpO1xuICAgIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gICAgbG9jID0gbG9jIHx8ICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24pO1xuICAgIGlmIChudWxsID09IHVyaSlcbiAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgbG9jLmhvc3Q7XG4gICAgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG4gICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDApKSB7XG4gICAgICAgICAgICBpZiAoXCIvXCIgPT09IHVyaS5jaGFyQXQoMSkpIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MuaG9zdCArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSkge1xuICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBsb2MpIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBcImh0dHBzOi8vXCIgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGFyc2VcbiAgICAgICAgb2JqID0gcGFyc2UodXJpKTtcbiAgICB9XG4gICAgLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG4gICAgaWYgKCFvYmoucG9ydCkge1xuICAgICAgICBpZiAoL14oaHR0cHx3cykkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgIG9iai5wb3J0ID0gXCI4MFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjQ0M1wiO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9iai5wYXRoID0gb2JqLnBhdGggfHwgXCIvXCI7XG4gICAgY29uc3QgaXB2NiA9IG9iai5ob3N0LmluZGV4T2YoXCI6XCIpICE9PSAtMTtcbiAgICBjb25zdCBob3N0ID0gaXB2NiA/IFwiW1wiICsgb2JqLmhvc3QgKyBcIl1cIiA6IG9iai5ob3N0O1xuICAgIC8vIGRlZmluZSB1bmlxdWUgaWRcbiAgICBvYmouaWQgPSBvYmoucHJvdG9jb2wgKyBcIjovL1wiICsgaG9zdCArIFwiOlwiICsgb2JqLnBvcnQgKyBwYXRoO1xuICAgIC8vIGRlZmluZSBocmVmXG4gICAgb2JqLmhyZWYgPVxuICAgICAgICBvYmoucHJvdG9jb2wgK1xuICAgICAgICAgICAgXCI6Ly9cIiArXG4gICAgICAgICAgICBob3N0ICtcbiAgICAgICAgICAgIChsb2MgJiYgbG9jLnBvcnQgPT09IG9iai5wb3J0ID8gXCJcIiA6IFwiOlwiICsgb2JqLnBvcnQpO1xuICAgIHJldHVybiBvYmo7XG59XG4iLCJpbXBvcnQgeyBpc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciB8IEJsb2IgfCBGaWxlIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbnN0cnVjdFBhY2tldChwYWNrZXQpIHtcbiAgICBjb25zdCBidWZmZXJzID0gW107XG4gICAgY29uc3QgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICAgIGNvbnN0IHBhY2sgPSBwYWNrZXQ7XG4gICAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gICAgcmV0dXJuIHsgcGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzIH07XG59XG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGlzQmluYXJ5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29uc3RydWN0UGFja2V0KHBhY2tldCwgYnVmZmVycykge1xuICAgIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhLCBidWZmZXJzKTtcbiAgICBkZWxldGUgcGFja2V0LmF0dGFjaG1lbnRzOyAvLyBubyBsb25nZXIgdXNlZnVsXG4gICAgcmV0dXJuIHBhY2tldDtcbn1cbmZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gICAgaWYgKCFkYXRhKVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLl9wbGFjZWhvbGRlciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpc0luZGV4VmFsaWQgPSB0eXBlb2YgZGF0YS5udW0gPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgICAgIGRhdGEubnVtID49IDAgJiZcbiAgICAgICAgICAgIGRhdGEubnVtIDwgYnVmZmVycy5sZW5ndGg7XG4gICAgICAgIGlmIChpc0luZGV4VmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBidWZmZXJzW2RhdGEubnVtXTsgLy8gYXBwcm9wcmlhdGUgYnVmZmVyIChzaG91bGQgYmUgbmF0dXJhbCBvcmRlciBhbnl3YXkpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGF0dGFjaG1lbnRzXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkYXRhW2ldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFbaV0sIGJ1ZmZlcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBkZWNvbnN0cnVjdFBhY2tldCwgcmVjb25zdHJ1Y3RQYWNrZXQgfSBmcm9tIFwiLi9iaW5hcnkuanNcIjtcbmltcG9ydCB7IGlzQmluYXJ5LCBoYXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogVGhlc2Ugc3RyaW5ncyBtdXN0IG5vdCBiZSB1c2VkIGFzIGV2ZW50IG5hbWVzLCBhcyB0aGV5IGhhdmUgYSBzcGVjaWFsIG1lYW5pbmcuXG4gKi9cbmNvbnN0IFJFU0VSVkVEX0VWRU5UUyA9IFtcbiAgICBcImNvbm5lY3RcIixcbiAgICBcImNvbm5lY3RfZXJyb3JcIixcbiAgICBcImRpc2Nvbm5lY3RcIixcbiAgICBcImRpc2Nvbm5lY3RpbmdcIixcbiAgICBcIm5ld0xpc3RlbmVyXCIsXG4gICAgXCJyZW1vdmVMaXN0ZW5lclwiLCAvLyB1c2VkIGJ5IHRoZSBOb2RlLmpzIEV2ZW50RW1pdHRlclxuXTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDU7XG5leHBvcnQgdmFyIFBhY2tldFR5cGU7XG4oZnVuY3Rpb24gKFBhY2tldFR5cGUpIHtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUXCJdID0gMF0gPSBcIkNPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJESVNDT05ORUNUXCJdID0gMV0gPSBcIkRJU0NPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJFVkVOVFwiXSA9IDJdID0gXCJFVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkFDS1wiXSA9IDNdID0gXCJBQ0tcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUX0VSUk9SXCJdID0gNF0gPSBcIkNPTk5FQ1RfRVJST1JcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfRVZFTlRcIl0gPSA1XSA9IFwiQklOQVJZX0VWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0FDS1wiXSA9IDZdID0gXCJCSU5BUllfQUNLXCI7XG59KShQYWNrZXRUeXBlIHx8IChQYWNrZXRUeXBlID0ge30pKTtcbi8qKlxuICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxuICovXG5leHBvcnQgY2xhc3MgRW5jb2RlciB7XG4gICAgLyoqXG4gICAgICogRW5jb2RlciBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmVwbGFjZXIgLSBjdXN0b20gcmVwbGFjZXIgdG8gcGFzcyBkb3duIHRvIEpTT04ucGFyc2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXBsYWNlcikge1xuICAgICAgICB0aGlzLnJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBhIHBhY2tldCBhcyBhIHNpbmdsZSBzdHJpbmcgaWYgbm9uLWJpbmFyeSwgb3IgYXMgYVxuICAgICAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHBhY2tldCBvYmplY3RcbiAgICAgKi9cbiAgICBlbmNvZGUob2JqKSB7XG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVCB8fCBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5BQ0spIHtcbiAgICAgICAgICAgIGlmIChoYXNCaW5hcnkob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZUFzQmluYXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gUGFja2V0VHlwZS5CSU5BUllfRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogUGFja2V0VHlwZS5CSU5BUllfQUNLLFxuICAgICAgICAgICAgICAgICAgICBuc3A6IG9iai5uc3AsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9iai5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBpZDogb2JqLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdGhpcy5lbmNvZGVBc1N0cmluZyhvYmopXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gICAgICovXG4gICAgZW5jb2RlQXNTdHJpbmcob2JqKSB7XG4gICAgICAgIC8vIGZpcnN0IGlzIHR5cGVcbiAgICAgICAgbGV0IHN0ciA9IFwiXCIgKyBvYmoudHlwZTtcbiAgICAgICAgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIG9iai50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmouYXR0YWNobWVudHMgKyBcIi1cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gICAgICAgIC8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuICAgICAgICBpZiAob2JqLm5zcCAmJiBcIi9cIiAhPT0gb2JqLm5zcCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5uc3AgKyBcIixcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmlkKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGpzb24gZGF0YVxuICAgICAgICBpZiAobnVsbCAhPSBvYmouZGF0YSkge1xuICAgICAgICAgICAgc3RyICs9IEpTT04uc3RyaW5naWZ5KG9iai5kYXRhLCB0aGlzLnJlcGxhY2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAgICAgKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXG4gICAgICogYSBsaXN0IG9mIGJ1ZmZlcnMuXG4gICAgICovXG4gICAgZW5jb2RlQXNCaW5hcnkob2JqKSB7XG4gICAgICAgIGNvbnN0IGRlY29uc3RydWN0aW9uID0gZGVjb25zdHJ1Y3RQYWNrZXQob2JqKTtcbiAgICAgICAgY29uc3QgcGFjayA9IHRoaXMuZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTtcbiAgICAgICAgY29uc3QgYnVmZmVycyA9IGRlY29uc3RydWN0aW9uLmJ1ZmZlcnM7XG4gICAgICAgIGJ1ZmZlcnMudW5zaGlmdChwYWNrKTsgLy8gYWRkIHBhY2tldCBpbmZvIHRvIGJlZ2lubmluZyBvZiBkYXRhIGxpc3RcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcnM7IC8vIHdyaXRlIGFsbCB0aGUgYnVmZmVyc1xuICAgIH1cbn1cbi8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NTExMjgxL2NoZWNrLWlmLWEtdmFsdWUtaXMtYW4tb2JqZWN0LWluLWphdmFzY3JpcHRcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuZXhwb3J0IGNsYXNzIERlY29kZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBEZWNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXZpdmVyIC0gY3VzdG9tIHJldml2ZXIgdG8gcGFzcyBkb3duIHRvIEpTT04uc3RyaW5naWZ5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmV2aXZlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJldml2ZXIgPSByZXZpdmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGFuIGVuY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gICAgICovXG4gICAgYWRkKG9iaikge1xuICAgICAgICBsZXQgcGFja2V0O1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdvdCBwbGFpbnRleHQgZGF0YSB3aGVuIHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5kZWNvZGVTdHJpbmcob2JqKTtcbiAgICAgICAgICAgIGNvbnN0IGlzQmluYXJ5RXZlbnQgPSBwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ7XG4gICAgICAgICAgICBpZiAoaXNCaW5hcnlFdmVudCB8fCBwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICAgICAgcGFja2V0LnR5cGUgPSBpc0JpbmFyeUV2ZW50ID8gUGFja2V0VHlwZS5FVkVOVCA6IFBhY2tldFR5cGUuQUNLO1xuICAgICAgICAgICAgICAgIC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTtcbiAgICAgICAgICAgICAgICAvLyBubyBhdHRhY2htZW50cywgbGFiZWxlZCBiaW5hcnkgYnV0IG5vIGJpbmFyeSBkYXRhIHRvIGZvbGxvd1xuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQuYXR0YWNobWVudHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5vbi1iaW5hcnkgZnVsbCBwYWNrZXRcbiAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNCaW5hcnkob2JqKSB8fCBvYmouYmFzZTY0KSB7XG4gICAgICAgICAgICAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gdHlwZTogXCIgKyBvYmopO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICAgICAqL1xuICAgIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAvLyBsb29rIHVwIHR5cGVcbiAgICAgICAgY29uc3QgcCA9IHtcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcihzdHIuY2hhckF0KDApKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFBhY2tldFR5cGVbcC50eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHBhY2tldCB0eXBlIFwiICsgcC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gICAgICAgIGlmIChwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlIChzdHIuY2hhckF0KCsraSkgIT09IFwiLVwiICYmIGkgIT0gc3RyLmxlbmd0aCkgeyB9XG4gICAgICAgICAgICBjb25zdCBidWYgPSBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpKTtcbiAgICAgICAgICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIGF0dGFjaG1lbnRzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gICAgICAgIGlmIChcIi9cIiA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKFwiLFwiID09PSBjKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLm5zcCA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcC5uc3AgPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGlkXG4gICAgICAgIGNvbnN0IG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgICAgICAgaWYgKFwiXCIgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmlkID0gTnVtYmVyKHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudHJ5UGFyc2Uoc3RyLnN1YnN0cihpKSk7XG4gICAgICAgICAgICBpZiAoRGVjb2Rlci5pc1BheWxvYWRWYWxpZChwLnR5cGUsIHBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgcC5kYXRhID0gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgcGF5bG9hZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG4gICAgdHJ5UGFyc2Uoc3RyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIsIHRoaXMucmV2aXZlcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNQYXlsb2FkVmFsaWQodHlwZSwgcGF5bG9hZCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBpc09iamVjdChwYXlsb2FkKTtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5ESVNDT05ORUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVF9FUlJPUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIgfHwgaXNPYmplY3QocGF5bG9hZCk7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJlxuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHBheWxvYWRbMF0gPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgcGF5bG9hZFswXSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJFU0VSVkVEX0VWRU5UUy5pbmRleE9mKHBheWxvYWRbMF0pID09PSAtMSkpKTtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWFsbG9jYXRlcyBhIHBhcnNlcidzIHJlc291cmNlc1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG1hbmFnZXIgb2YgYSBiaW5hcnkgZXZlbnQncyAnYnVmZmVyIHNlcXVlbmNlJy4gU2hvdWxkXG4gKiBiZSBjb25zdHJ1Y3RlZCB3aGVuZXZlciBhIHBhY2tldCBvZiB0eXBlIEJJTkFSWV9FVkVOVCBpc1xuICogZGVjb2RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtCaW5hcnlSZWNvbnN0cnVjdG9yfSBpbml0aWFsaXplZCByZWNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIEJpbmFyeVJlY29uc3RydWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhY2tldCkge1xuICAgICAgICB0aGlzLnBhY2tldCA9IHBhY2tldDtcbiAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgICAgIHRoaXMucmVjb25QYWNrID0gcGFja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gICAgICogYWZ0ZXIgYSBCSU5BUllfRVZFTlQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAgICAgKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSByZXR1cm5zIG51bGwgaWYgbW9yZSBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCBvclxuICAgICAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIHRha2VCaW5hcnlEYXRhKGJpbkRhdGEpIHtcbiAgICAgICAgdGhpcy5idWZmZXJzLnB1c2goYmluRGF0YSk7XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlcnMubGVuZ3RoID09PSB0aGlzLnJlY29uUGFjay5hdHRhY2htZW50cykge1xuICAgICAgICAgICAgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgICAgICAgICBjb25zdCBwYWNrZXQgPSByZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjaywgdGhpcy5idWZmZXJzKTtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHBhY2tldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxuICAgICAqL1xuICAgIGZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVjb25QYWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgfVxufVxuIiwiY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1ZpZXcgPSAob2JqKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufTtcbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIEZpbGUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgRmlsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEZpbGUpID09PSBcIltvYmplY3QgRmlsZUNvbnN0cnVjdG9yXVwiKTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIEJ1ZmZlciwgYW4gQXJyYXlCdWZmZXIsIGEgQmxvYiBvciBhIEZpbGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQmluYXJ5KG9iaikge1xuICAgIHJldHVybiAoKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KG9iaikpKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBoYXNCaW5hcnkob2JqLCB0b0pTT04pIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChoYXNCaW5hcnkob2JqW2ldKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGlzQmluYXJ5KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvYmoudG9KU09OICYmXG4gICAgICAgIHR5cGVvZiBvYmoudG9KU09OID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gaGFzQmluYXJ5KG9iai50b0pTT04oKSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBoYXNCaW5hcnkob2JqW2tleV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEdlblV0aWwgfSBmcm9tIFwiLi91dGlsL2dlbi51dGlsXCI7XHJcbmltcG9ydCB7IEF1dGhDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2F1dGguY29tcFwiO1xyXG5pbXBvcnQgeyBDaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9jaGF0LmNvbXBcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2Vycm9yLmNvbXBcIjtcclxuXHJcbkF1dGhDb21wb25lbnQuZ2V0SW5zdGFuY2UoKTtcclxuQ2hhdENvbXBvbmVudC5nZXRJbnN0YW5jZSgpO1xyXG5FcnJvckNvbXBvbmVudC5nZXRJbnN0YW5jZSgpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIEdlblV0aWwubG9nVXNlcik7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==