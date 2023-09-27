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
            let i = 0;
            const { start, end } = this.getStartEnd(this.relSkip);
            this.relSkip++;
            const slicedArrHTML = PeerComponent.chatPeerRelationsHTML.slice(start, end);
            const chatIds = slicedArrHTML
                .map((h) => h.dataset.chatId)
                .filter((s) => s !== undefined && s !== null && s.length > 0);
            let response;
            try {
                response = yield (0,_util_asyncWrap_util__WEBPACK_IMPORTED_MODULE_1__.tryCatch)(_hooks_requests_hook__WEBPACK_IMPORTED_MODULE_9__.httpGetTopMsg, chatIds);
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
            PeerComponent.updateMsgs(slicedArrHTML, data);
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
        const chatIds = PeerComponent.chatPeerRelationsInfo
            .filter((rel) => !rel.block)
            .map((rel) => rel.chat_id);
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
 * This function requests an HTTP GET to the server to retrieve its most recent message.
 *
 * @param { HTMLDivElement } htmlArr - peer item html as source of chat ID
 * @param { any } data -
 *
 * @static
 */
PeerComponent.updateMsgs = (htmlArr, data) => {
    console.log(data);
};
/**
 * This function updates an HTML message info elements.
 *
 * @param { HTMLDivElement } html - HTML element to be modified
 * @param { iMsgBody } data - message data
 *
 * @static
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
function httpGetTopMsg(chatIds) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        let data;
        try {
            response = yield fetch(`/1/chat`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(chatIds),
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




sessionStorage.clear();
_components_auth_comp__WEBPACK_IMPORTED_MODULE_1__.AuthComponent.getInstance();
_components_chat_comp__WEBPACK_IMPORTED_MODULE_2__.ChatComponent.getInstance();
_components_error_comp__WEBPACK_IMPORTED_MODULE_3__.ErrorComponent.getInstance();
window.addEventListener("load", _util_gen_util__WEBPACK_IMPORTED_MODULE_0__.GenUtil.logUser);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qiw2QkFBNkI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaUJBQWlCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsOENBQU07QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkJBQTJCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDcldPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTDhDO0FBQ2pCO0FBQzJCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q3RDO0FBQ0E7QUFDQSxpQkFBaUIsc0VBQXdCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDREQUFjO0FBQ3BDO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxjQUFjO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLE1BQU0sbUVBQXFCLEVBQUU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixNQUFNO0FBQ2xDLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE1BQU07QUFDeEMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE1BQU07QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekMsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNCQUFzQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3IwQnlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx1REFBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFEMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUFRO0FBQ2hCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ087QUFDUDtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZ1RDtBQUNZO0FBQ2Q7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsZ0NBQWdDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHdEQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw2REFBaUI7QUFDaEQ7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCO0FBQ08sc0JBQXNCLGlFQUFPO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGVBQWUsVUFBVTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsdURBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxxQkFBcUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDLGdCQUFnQixlQUFlO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiw2REFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNqREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ04wQztBQUNhO0FBQ0E7QUFDRTtBQUV6RCxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFdkIsNEVBQXlCLEVBQUUsQ0FBQztBQUM1Qiw0RUFBeUIsRUFBRSxDQUFDO0FBQzVCLDhFQUEwQixFQUFFLENBQUM7QUFFN0IsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSwyREFBZSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9hcHAuY29tcC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9hdXRoLmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvYmFzZS5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9jb21wb25lbnRzL2NoYXQuY29tcC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9lcnJvci5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9jb21wb25lbnRzL2dyb3VwLmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvbXNncy5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9jb21wb25lbnRzL21zZ3NMaXN0LmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvbXNnc09wdHMuY29tcC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvY29tcG9uZW50cy9wZWVyLmNvbXAudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL2NvbXBvbmVudHMvdXNlci5jb21wLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9ob29rcy9yZXF1ZXN0cy5ob29rLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9tb2RlbHMvYXV0aC5tb2RlbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvbW9kZWxzL3BlZXIubW9kZWwudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL21vZGVscy91c2VyLm1vZGVsLnRzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL3NyYy9zb2NrZXQvbWVzc2FnZS5ldmVudHMudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL3NvY2tldC9yZWxhdGlvbi5ldmVudHMudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vc3JjL3NvY2tldC9yZXF1ZXN0LmV2ZW50cy50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC9hc3luY1dyYXAudXRpbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC9nZW4udXRpbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC9zb2NrZXQudXRpbC50cyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvdXRpbC92YWxpZGF0aW9uLnV0aWwudHMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL0Bzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXIvaW5kZXgubWpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL2hhcy1jb3JzLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3BhcnNlcXMuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvcGFyc2V1cmkuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIveWVhc3QuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbFRoaXMuYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3NvY2tldC5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LWNvbnN0cnVjdG9yLmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy94bWxodHRwcmVxdWVzdC5icm93c2VyLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS91dGlsLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb21tb25zLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb250cmliL2Jhc2U2NC1hcnJheWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vZGVjb2RlUGFja2V0LmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2VuY29kZVBhY2tldC5icm93c2VyLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9iYWNrbzIuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9vbi5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwid2VicGFjazovL2NoYXQtYXBwLWNsaWVudC8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS91cmwuanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaW5kZXguanMiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50Ly4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2lzLWJpbmFyeS5qcyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2hhdC1hcHAtY2xpZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jaGF0LWFwcC1jbGllbnQvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhDb21wb25lbnQgfSBmcm9tIFwiLi9hdXRoLmNvbXBcIjtcclxuXHJcbi8qKlxyXG4gKiBDb250cm9scyB2aWV3YWJpbGl0eSBvZiB0aGUgY2hhdCBjb21wb25lbnQgYW5kIHRoZSBhdXRoIGNvbW1wb25lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBBcHBDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0QXBwITogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYXNzIGRlZmluZXMgbWFpbiBjaGF0IGRpdiBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jaGF0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGF0LWFwcFwiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tIENMQVNTIFVUSUxJVFkgLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIG1vdmUgdGhlIGF1dGggY29tcG9uZW50IGFzaWRlIGFuZCBzaG93IHRoZSBjaGF0IGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhcHBVc2VyKCkge1xyXG4gICAgdGhpcy5jaGF0QXBwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWFwcC11c2VyLXN0YXRlXCIpO1xyXG4gICAgQXV0aENvbXBvbmVudC5oaWRlQ29tcCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIG1vdmUgdGhlIGNoYXQgY29tcG9uZW50IGFzaWRlIGFuZCBzaG93IHRoZSBhdXRoIGNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHB1YmxpYyBhcHBBdXRoKCkge1xyXG4gICAgQXV0aENvbXBvbmVudC5zaG93Q29tcCgpO1xyXG4gICAgdGhpcy5jaGF0QXBwLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGF0LWFwcC11c2VyLXN0YXRlXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGVpdGhlciBhIG5ldyBpbnN0YW5jZSBvciB0aGUgb2xkIGluc3RhbmNlXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7QXBwQ29tcG9uZW50fVxyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9ICgpOiBBcHBDb21wb25lbnQgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IEFwcENvbXBvbmVudCgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgVmFsaWRhdGUgfSBmcm9tIFwiLi4vdXRpbC92YWxpZGF0aW9uLnV0aWxcIjtcclxuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tIFwiLi4vdXRpbC9hc3luY1dyYXAudXRpbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLmNvbXBcIjtcclxuaW1wb3J0IHsgaUF1dGhJbnB1dHMgfSBmcm9tIFwiLi4vbW9kZWxzL2F1dGgubW9kZWxcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBcIjtcclxuaW1wb3J0IHsgaUh0dHBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaHR0cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpVmFsaWRpdHlUeXBlIH0gZnJvbSBcIi4uL21vZGVscy92YWxpZGl0eS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHZW5VdGlsIGFzIEdlbiB9IGZyb20gXCIuLi91dGlsL2dlbi51dGlsXCI7XHJcbmltcG9ydCB7IEVycm9yQ29tcG9uZW50LCBFcnJvckNvbXBvbmVudCBhcyBlcnJvciB9IGZyb20gXCIuL2Vycm9yLmNvbXBcIjtcclxuaW1wb3J0IHsgaHR0cFBvc3RMb2dpbiwgaHR0cFBvc3RSZWdpc3RlciB9IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcblxyXG4vKipcclxuICogQ29udHJvbHMgcHJvY2Vzc2VzIHJlbGF0ZWQgdG8gdGhlIGF1dGggY29tcG9uZW50XHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEF1dGhDb21wb25lbnQ7XHJcblxyXG4gIHByaXZhdGUgYXBwQ29tcDogQXBwQ29tcG9uZW50ID0gQXBwQ29tcG9uZW50LmdldEluc3RhbmNlKCk7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgYXV0aFdyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIGF1dGhMb2FkZXI6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgYXV0aENvbXBzITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBhdXRoUmVnaXN0ZXJDb21wITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBhdXRoTG9naW5Db21wITogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgcmVnRm9ybSE6IEhUTUxGb3JtRWxlbWVudDtcclxuICBwcml2YXRlIHJlZ1VzZXJuYW1lSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVnUGFzc3dvcmRJbnB1dCE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSByZWdSZVBhc3N3b3JkSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgcmVnU3VibWl0ITogSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgcHJpdmF0ZSBzaWduSW5TcGFuITogSFRNTFNwYW5FbGVtZW50O1xyXG4gIHByaXZhdGUgbG9nRm9ybSE6IEhUTUxGb3JtRWxlbWVudDtcclxuICBwcml2YXRlIGxvZ1VzZXJuYW1lSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgbG9nUGFzc3dvcmRJbnB1dCE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBsb2dTdWJtaXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHByaXZhdGUgc2lnblVwU3BhbiE6IEhUTUxTcGFuRWxlbWVudDtcclxuICBwcml2YXRlIHNpZ25PbiE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc2lnbk9uTGlua3MhOiBIVE1MTGlua0VsZW1lbnRbXTtcclxuXHJcbiAgcHJpdmF0ZSByZWFkb25seSBzaG93U2lnbkNsYXNzOiBzdHJpbmcgPSBcInNob3ctc2lnbi1pblwiO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1hcHBcIiwgXCJhdXRoLXRlbXBcIiwgXCJhZnRlcmJlZ2luXCIpO1xyXG4gICAgdGhpcy5jb25maWd1cmVDb21wb25lbnQoKTtcclxuICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICBBdXRoQ29tcG9uZW50LmF1dGhXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuYXV0aC1jb21wXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgQXV0aENvbXBvbmVudC5hdXRoTG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuYXV0aC13cmFwIC5sb2FkZXJcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLmF1dGhSZWdpc3RlckNvbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5hdXRoLXJlZ2lzdGVyLWRpdlwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuYXV0aExvZ2luQ29tcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiYXV0aC1sb2dpbi1kaXZcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlZ0Zvcm0gPSB0aGlzLmluc2VydGVkRWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNyZWdpc3Rlci1mb3JtXCJcclxuICAgICkhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHRoaXMuYXV0aENvbXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdXRoLWNvbXBzXCIpISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMucmVnVXNlcm5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBcInJlZy11c2VybmFtZVwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5yZWdQYXNzd29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwicmVnLXBhc3N3b3JkXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBcInJlZy1yZVBhc3N3b3JkXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLnJlZ1N1Ym1pdCA9IHRoaXMucmVnRm9ybS5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcImlucHV0Omxhc3QtY2hpbGRcIlxyXG4gICAgKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMubG9nRm9ybSA9IHRoaXMuaW5zZXJ0ZWRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI2xvZ2luLWZvcm1cIlxyXG4gICAgKSEgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgdGhpcy5sb2dVc2VybmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIFwibG9nLXVzZXJuYW1lXCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmxvZ1Bhc3N3b3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgICAgXCJsb2ctcGFzc3dvcmRcIlxyXG4gICAgKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMubG9nU3VibWl0ID0gdGhpcy5sb2dGb3JtLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiaW5wdXQ6bGFzdC1jaGlsZFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5zaWduSW5TcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuYXV0aC1yZWdpc3Rlci1kaXYgcCBzcGFuXCJcclxuICAgICkhIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIHRoaXMuc2lnblVwU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmF1dGgtbG9naW4tZGl2IHAgc3BhblwiXHJcbiAgICApISBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICB0aGlzLnNpZ25PbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1zaWdub24tZGl2XCIpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5zaWduT25MaW5rcyA9IFtcclxuICAgICAgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdXRoLXNpZ25vbi1kaXYgYVwiKSxcclxuICAgIF0hIGFzIEhUTUxMaW5rRWxlbWVudFtdO1xyXG5cclxuICAgIHRoaXMuc2lnbkluU3Bhbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja1NpZ25JblNwYW4pO1xyXG4gICAgdGhpcy5zaWduVXBTcGFuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrU2lnblVwU3Bhbik7XHJcbiAgICB0aGlzLnJlZ0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFJlZ2lzdGVyRm9ybUhhbmRsZXIpO1xyXG4gICAgdGhpcy5sb2dGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRMb2dpbkZvcm1IYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckNvbXBvbmVudCgpOiB2b2lkIHtcclxuICAgIHRoaXMubG9nVXNlcm5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgIHRoaXMubG9nUGFzc3dvcmRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgIHRoaXMubG9nU3VibWl0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG5cclxuICAgIHRoaXMuc2lnbk9uLmNsYXNzTGlzdC5hZGQoXCJoaWRlRWxlbWVudFwiLCBcImludmlzaWJsZUVsZW1cIik7XHJcbiAgfVxyXG5cclxuICAvKiogRVZFTlQgTElTVEVORVJTICovXHJcblxyXG4gIC8qKlxyXG4gICAqIC0gVGhpcyBmdW5jdGlvbiBzdWJtaXRzIHVzZXIgcmVnaXN0cmF0aW9uIGRhdGEuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N1Ym1pdEV2ZW50fSBlXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBTdWJtaXRFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0UmVnaXN0ZXJGb3JtSGFuZGxlciA9IGFzeW5jIChlOiBTdWJtaXRFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8qKiBEQVRBIEdBVEhFUklOR1xyXG4gICAgICogLSBHYXRoZXJzIHJlcXVlc3QgYm9keSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBjb25zdCByZWdJbnB1dHM6IGlBdXRoSW5wdXRzID0gdGhpcy5nZXRSZWdpc3RlcklucHV0KCk7XHJcblxyXG4gICAgLyoqIFZBTElEQVRJT05cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uIGludmFsaWQgZ2F0aGVyZWQgZGF0YS5cclxuICAgICAqL1xyXG5cclxuICAgIC8qKiBAY29uc3RhbnQgQHR5cGUge2lWYWxpZGl0eVR5cGV9ICovXHJcbiAgICBjb25zdCByZWdWYWxpZDogaVZhbGlkaXR5VHlwZSA9IFZhbGlkYXRlLnJlZ2lzdGVyRm9ybShyZWdJbnB1dHMpO1xyXG4gICAgaWYgKCFyZWdWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBzdWJtaXR0ZWQgcmVnaXN0cmF0aW9uIGRhdGEgaXMgaW52YWxpZFwiLFxyXG4gICAgICAgIHJlZ1ZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEhUVFAgUkVRVUVTVFxyXG4gICAgICogLSBSZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlci5cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uIGxvZ2ljIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwUG9zdFJlZ2lzdGVyLCByZWdJbnB1dHMpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCBmb3IgcmVnaXN0cmF0aW9uYCxcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uID49IDQwMCBzdGF0dXMgY29kZS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgcmVzVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgXCJzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgcmVxdWVzdCBmb3IgcmVnaXN0cmF0aW9uXCIsXHJcbiAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciByZWdpc3RyYXRpb25gXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qKiBQUk9DRVNTICovXHJcbiAgICB0aGlzLmNsZWFyUmVnaXN0ZXJJbnB1dCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIC0gVGhpcyBmdW5jdGlvbiBzdWJtaXRzIHVzZXIgY3JlZGVudGlhbHMgZm9yIHNpZ24taW4uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1N1Ym1pdEV2ZW50fSBlXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBTdWJtaXRFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0TG9naW5Gb3JtSGFuZGxlciA9IGFzeW5jIChlOiBTdWJtaXRFdmVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8qKiBEQVRBIEdBVEhFUklOR1xyXG4gICAgICogLSBHYXRoZXJzIHJlcXVlc3QgYm9keSBkYXRhLlxyXG4gICAgICovXHJcbiAgICBjb25zdCBsb2dpbklucHV0czogaUF1dGhJbnB1dHMgPSB0aGlzLmdldExvZ2luSW5wdXQoKTtcclxuXHJcbiAgICAvKiogVkFMSURBVElPTlxyXG4gICAgICogLSBJbW1lZGlhdGVseSByZXR1cm5zIGFuZCAmIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uIGludmFsaWQgZGF0YS5cclxuICAgICAqL1xyXG4gICAgY29uc3QgbG9naW5WYWxpZDogaVZhbGlkaXR5VHlwZSA9IFZhbGlkYXRlLmxvZ2luRm9ybShsb2dpbklucHV0cyk7XHJcbiAgICBpZiAoIWxvZ2luVmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgYEVSUk9SOiBzdWJtaXR0ZWQgbG9naW4gZGF0YSBpcyBpbnZhbGlkYCxcclxuICAgICAgICBsb2dpblZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEhUVFAgUkVRVUVTVFxyXG4gICAgICogLSBSZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlciBpbmNsdWRpbmcgdXNlciBjcmVkZW50aWFscy5cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyBhbmQgaW5zdHJ1Y3RzIFVJIHRvIHNob3cgZXhjZXB0aW9uIHVwb24gbG9naWMgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQb3N0TG9naW4sIGxvZ2luSW5wdXRzKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IGZvciBsb2dpblwiLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICAgKiAtIEltbWVkaWF0ZWx5IHJldHVybnMgYW5kIGluc3RydWN0cyBVSSB0byBzaG93IGV4Y2VwdGlvbiB1cG9uID49IDQwMCBzdGF0dXMgY29kZVxyXG4gICAgICovXHJcbiAgICBjb25zdCByZXNWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBcInNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyBjbGllbnQncyByZXF1ZXN0IGZvciBsb2dpblwiLFxyXG4gICAgICBgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIHVwb24gY2xpZW50J3MgcmVxdWVzdCBmb3IgbG9naW5gXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qKiBIVFRQIFJFUVVFU1RcclxuICAgICAqIC0gUmVxdWVzdHMgYW4gSFRUUCBHRVQgdG8gdGhlIHNlcnZlciBmb3IgYXV0aGVudGljYXRpb25cclxuICAgICAqIC0gSW1tZWRpYXRlbHkgcmV0dXJucyB1cG9uIHVuc3VjY2Vzc2Z1bCBzaWduLWluXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGxvZ1N1Y2Nlc3MgPSBhd2FpdCBHZW4ubG9nVXNlcigpO1xyXG4gICAgaWYgKCFsb2dTdWNjZXNzKSByZXR1cm47XHJcblxyXG4gICAgLyoqIFBST0NFU1MgKi9cclxuICAgIHRoaXMuZGlzYWJsZVJlZ0VsZW1lbnRzKCk7XHJcbiAgICB0aGlzLmRpc2FibGVMb2dFbGVtZW50cygpO1xyXG4gICAgdGhpcy5hcHBDb21wLmFwcFVzZXIoKTtcclxuICAgIHRoaXMuY2xlYXJMb2dpbklucHV0KCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBUaGlzIGZ1bmN0aW9uIGRpc3BsYXlzIHRoZSBsb2dpbiBmb3JtIHdpdGhpbiB0aGUgYXV0aCBjb21wb25lbnQgdXBvbiBhIGNsaWNrIG9mIGEgY2VydGFpbiBzcGFuIGVsZW1lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrU2lnbkluU3BhbiA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAoIXRoaXMuYXV0aENvbXBzLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLnNob3dTaWduQ2xhc3MpKSB7XHJcbiAgICAgIHRoaXMuc2hvd0xvZ0Zvcm0oKTtcclxuXHJcbiAgICAgIHRoaXMuZGlzYWJsZVJlZ0VsZW1lbnRzKCk7XHJcbiAgICAgIHRoaXMuZW5hYmxlTG9nRWxlbWVudHMoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiAtIFRoaXMgZnVuY3Rpb24gZGlzcGxheXMgdGhlIHJlZ2lzdHJhdGlvbiBmb3JtIHdpdGhpbiB0aGUgYXV0aCBjb21wb25lbnQgdXBvbiBhIGNsaWNrIG9mIGEgY2VydGFpbiBzcGFuIGVsZW1lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrU2lnblVwU3BhbiA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBpZiAodGhpcy5hdXRoQ29tcHMuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuc2hvd1NpZ25DbGFzcykpIHtcclxuICAgICAgdGhpcy5hdXRoQ29tcHMuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLnNob3dTaWduQ2xhc3MpO1xyXG5cclxuICAgICAgdGhpcy5lbmFibGVSZWdFbGVtZW50cygpO1xyXG4gICAgICB0aGlzLmRpc2FibGVMb2dFbGVtZW50cygpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiAtIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbGwgdGhlIGlucHV0IHZhbHVlcyBmcm9tIHRoZSByZWdpc3RlciBmb3JtIGlucHV0IGVsZW1lbnRzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge2lBdXRoSW5wdXRzfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0UmVnaXN0ZXJJbnB1dCgpOiBpQXV0aElucHV0cyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB1c2VybmFtZTogdGhpcy5yZWdVc2VybmFtZUlucHV0LnZhbHVlLFxyXG4gICAgICBwYXNzd29yZDogdGhpcy5yZWdQYXNzd29yZElucHV0LnZhbHVlLFxyXG4gICAgICByZVBhc3N3b3JkOiB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dC52YWx1ZSxcclxuICAgIH0gYXMgaUF1dGhJbnB1dHM7XHJcbiAgfVxyXG5cclxuICAvKiogIFRoaXMgZnVuY3Rpb24gbW92ZXMgQXV0aENvbXBzIHRvIGRpc3BsYXkgc2lnbi1pbiBmb3JtLiAqL1xyXG4gIHB1YmxpYyBzaG93TG9nRm9ybSA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuYXV0aENvbXBzLmNsYXNzTGlzdC5hZGQodGhpcy5zaG93U2lnbkNsYXNzKTtcclxuICB9O1xyXG5cclxuICAvKiogLSBUaGlzIGZ1bmN0aW9uIGFzc2lnbnMgZGlzYWJsZSBIVE1MIGF0dHJpYnV0ZSB0byBhbGwgb2YgcmVnaXN0ZXIgZm9ybSdzIGlucHV0IGVsZW1lbnRzLiAqL1xyXG4gIHB1YmxpYyBkaXNhYmxlUmVnRWxlbWVudHMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnJlZ1VzZXJuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICB0aGlzLnJlZ1Bhc3N3b3JkSW5wdXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcbiAgICB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcclxuICAgIHRoaXMucmVnU3VibWl0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gIH07XHJcblxyXG4gIC8qKiAtIFRoaXMgZnVuY3Rpb24gcmVtb3ZlcyBkaXNhYmxlIEhUTUwgYXR0cmlidXRlIHRvIGFsbCBvZiByZWdpc3RlciBmb3JtJ3MgaW5wdXQgZWxlbWVudHMuICovXHJcbiAgcHVibGljIGVuYWJsZVJlZ0VsZW1lbnRzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5yZWdVc2VybmFtZUlucHV0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgdGhpcy5yZWdQYXNzd29yZElucHV0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgdGhpcy5yZWdSZVBhc3N3b3JkSW5wdXQucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICB0aGlzLnJlZ1N1Ym1pdC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGhpZGVzIGVsZW1lbnRzIG9mIHRoZSBsb2dpbiBmb3JtXHJcbiAgICogLSBBc3NpZ25zIGRpc2FibGUgSFRNTCBhdHRyaWJ1dGUgdG8gYWxsIG9mIGxvZ2luIGZvcm0ncyBpbnB1dCBlbGVtZW50cy5cclxuICAgKiAtIEhpZGVzIGFsbCBvZiBsb2dpbiBmb3JtJ3Mgc2lnbi1vbiBidXR0b24gZWxlbWVudHMuXHJcbiAgICogKi9cclxuICBwdWJsaWMgZGlzYWJsZUxvZ0VsZW1lbnRzID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5sb2dVc2VybmFtZUlucHV0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgdGhpcy5sb2dQYXNzd29yZElucHV0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xyXG4gICAgdGhpcy5sb2dTdWJtaXQuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuc2lnbk9uLmNsYXNzTGlzdC5hZGQoXCJoaWRlRWxlbWVudFwiLCBcImludmlzaWJsZUVsZW1cIik7XHJcbiAgICB9LCAyNTApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYXNzdXJlcyB2aXNpYmlsaXR5IHRvIGVsZW1lbnRzIG9mIHRoZSBsb2dpbiBmb3JtXHJcbiAgICogLSBSZW1vdmVzIGRpc2FibGUgSFRNTCBhdHRyaWJ1dGUgdG8gYWxsIG9mIGxvZ2luIGZvcm0ncyBpbnB1dCBlbGVtZW50cy5cclxuICAgKiAtIFJlbW92ZSBub24tZGlzcGxheWluZyBzdHlsZXMgdG8gYWxsIG9mIGxvZ2luIGZvcm0ncyBzaWduLW9uIGJ1dHRvbiBlbGVtZW50cy5cclxuICAgKiAqL1xyXG4gIHB1YmxpYyBlbmFibGVMb2dFbGVtZW50cyA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMubG9nVXNlcm5hbWVJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIHRoaXMubG9nUGFzc3dvcmRJbnB1dC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgIHRoaXMubG9nU3VibWl0LnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG5cclxuICAgIHRoaXMuc2lnbk9uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlRWxlbWVudFwiLCBcImludmlzaWJsZUVsZW1cIik7XHJcbiAgfTtcclxuXHJcbiAgLyoqIC0gQ2xlYXIgdXNlZCByZWdpc3RlciBpbnB1dCB0YWcgdmFsdWVzLiAqL1xyXG4gIHByaXZhdGUgY2xlYXJSZWdpc3RlcklucHV0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZWdVc2VybmFtZUlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgIHRoaXMucmVnUGFzc3dvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLnJlZ1JlUGFzc3dvcmRJbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiAtIFJldHVybnMgYWxsIHRoZSBpbnB1dCB2YWx1ZXMgZnJvbSB0aGUgbG9naW4gZm9ybSBpbnB1dCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtpQXV0aElucHV0c31cclxuICAgKi9cclxuICBwcml2YXRlIGdldExvZ2luSW5wdXQoKTogaUF1dGhJbnB1dHMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdXNlcm5hbWU6IHRoaXMubG9nVXNlcm5hbWVJbnB1dC52YWx1ZSxcclxuICAgICAgcGFzc3dvcmQ6IHRoaXMubG9nUGFzc3dvcmRJbnB1dC52YWx1ZSxcclxuICAgIH0gYXMgaUF1dGhJbnB1dHM7XHJcbiAgfVxyXG5cclxuICAvKiogLSBDbGVhciB1c2VkIGxvZ2luIGlucHV0IHRhZyB2YWx1ZXMuICovXHJcbiAgcHJpdmF0ZSBjbGVhckxvZ2luSW5wdXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmxvZ1VzZXJuYW1lSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5sb2dQYXNzd29yZElucHV0LnZhbHVlID0gXCJcIjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYXNzdXJlcyB2aXNpYmlsaXR5IG9mIGF1dGggY29tcG9uZW50IGJ5IGhpZGluZyBhdXRoIGNvbXBvbmVudCBsb2FkZXIuXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBzaG93Q29tcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYXV0aExvYWRlci5jbGFzc0xpc3QuYWRkKFwiaGlkZUVsZW1lbnRcIik7XHJcbiAgICB0aGlzLmF1dGhXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlRWxlbWVudFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaGlkZXMgYm90aCBhdXRoIGNvbXBvbmVudCAmIGF1dGggY29tcG9uZW50IGxvYWRlciBnaWYuXHJcbiAgICogQHN0YXRpY1xyXG4gICAqICAqL1xyXG4gIHN0YXRpYyBoaWRlQ29tcCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYXV0aExvYWRlci5jbGFzc0xpc3QuYWRkKFwiaGlkZUVsZW1lbnRcIik7XHJcbiAgICB0aGlzLmF1dGhXcmFwLmNsYXNzTGlzdC5hZGQoXCJoaWRlRWxlbWVudFwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYXNzdXJlcyB2aXNpYmlsaXR5IG9mIGF1dGggY29tcG9uZW50IGxvYWRlciBieSBoaWRpbmcgdGhlIGF1dGggY29tcG9uZW50LlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgbG9hZGluZ0NvbXAoKTogdm9pZCB7XHJcbiAgICB0aGlzLmF1dGhMb2FkZXIuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVFbGVtZW50XCIpO1xyXG4gICAgdGhpcy5hdXRoV3JhcC5jbGFzc0xpc3QuYWRkKFwiaGlkZUVsZW1lbnRcIik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGVpdGhlciBhIG5ldyBvciB0aGUgb2xkIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnRcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHtBdXRoQ29tcG9uZW50fVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9ICgpOiBBdXRoQ29tcG9uZW50ID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBBdXRoQ29tcG9uZW50KCk7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsImV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICBwcm90ZWN0ZWQgd3JhcHBlckVsZW1lbnQ6IFQ7XHJcbiAgcHJvdGVjdGVkIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICBwcm90ZWN0ZWQgaW5zZXJ0ZWRFbGVtZW50OiBVO1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGNvbnN0cnVjdG9yLCB1cG9uIGluc3RhbnRpYXRpbmcsIGF0dGFjaGVzIGEgdGVtbGF0ZSBIVE1MIGVsZW1lbnQgd2l0aGluIHdyYXBwZXIgZWxlbWVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHdyYXBwZXJDbGFzcyAtIGNsYXNzIG9mIHRoZSBzb29uIGNvbnRhaW5lciBvZiB0aGUgdGVtcGxhdGUgZWxlbWVudFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZW1wbGF0ZUlkIC0gaWQgb2YgdGhlIHRlbXBsYXRlIGVsZW1lbnRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5zZXJ0ZWRQb3NpdGlvbiAtIHBvc2l0aW9uIHdpdGhpbiB0aGUgd3JhcHBlckVsZW1lbnQgd2hlcmUgdGhlIHRlbXBsYXRlIHdpbGwgYmUgaW5zZXJ0ZWRcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2luc2VydGVkSWRdIC0gYXNzaWducyBpZCB0byB0aGUgaW5zZXJ0ZWRFbGVtZW50IGlmIG5vdCBudWxsIHwgdW5kZWZpbmVkXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAYWJzdHJhY3RcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHdyYXBwZXJDbGFzczogc3RyaW5nLFxyXG4gICAgdGVtcGxhdGVJZDogc3RyaW5nLFxyXG4gICAgaW5zZXJ0ZWRQb3NpdGlvbjogc3RyaW5nLFxyXG4gICAgaW5zZXJ0ZWRJZD86IHN0cmluZ1xyXG4gICkge1xyXG4gICAgLy8gLS0tIC0tLSBjbGFzcyB2YXJpYWJsZXMgYXMgSFRNTFxyXG4gICAgdGhpcy53cmFwcGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlckNsYXNzKSEgYXMgVDtcclxuICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIHRlbXBsYXRlSWRcclxuICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcblxyXG4gICAgLy8gLS0tIC0tLSAtLS0gbmV3Tm9kZSBhcyBpbXBvcnQgY2hpbGQgY29weSBvZiB0ZW1wbGF0ZVxyXG4gICAgdGhpcy5pbnNlcnRlZEVsZW1lbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKFxyXG4gICAgICB0aGlzLnRlbXBsYXRlRWxlbWVudC5jb250ZW50LFxyXG4gICAgICB0cnVlXHJcbiAgICApLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XHJcblxyXG4gICAgLy8gLS0tIC0tLSBuZXdOb2RlIHNldCBpZFxyXG4gICAgaWYgKGluc2VydGVkSWQpIHRoaXMuaW5zZXJ0ZWRFbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGluc2VydGVkSWQpO1xyXG5cclxuICAgIC8vIC0tLSAtLS0gYXR0YWNoIGNhbGxcclxuICAgIHRoaXMuYXR0YWNoRWxlbWVudChpbnNlcnRlZFBvc2l0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaW5zZXJ0cyB0aGUgdGVtcGxhdGUgZWxlbWVudCB3aXRoaW4gdGhlIHdyYXBwZXIgZWxlbWVudCBkZXBlbmRpbmcgb24gdGhlIHBvc2l0aW9uLlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwb3NpdGlvblxyXG4gICAqL1xyXG4gIGF0dGFjaEVsZW1lbnQocG9zaXRpb246IHN0cmluZykge1xyXG4gICAgdGhpcy53cmFwcGVyRWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXHJcbiAgICAgIHBvc2l0aW9uIGFzIEluc2VydFBvc2l0aW9uLFxyXG4gICAgICB0aGlzLmluc2VydGVkRWxlbWVudFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGNvbmZpZ3VyZXMgY2xhc3MgcmVsYXRlZCB2YXJpYWJsZXMgYW5kIGV2ZW50IGxpc3RlbmVycy4gKi9cclxuICBhYnN0cmFjdCBjb25maWd1cmVDb21wb25lbnQoLi4uYXJnczogYW55W10pOiB2b2lkO1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBjb25maWd1cmVzIGluaXRpYWwgZWxlbWVudHMgYW5kIHN0eWxpbmcgY29uZmlndXJhdGlvbi4gKi9cclxuICBhYnN0cmFjdCByZW5kZXJDb21wb25lbnQoLi4uYXJnczogYW55W10pOiB2b2lkO1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoYXRDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENoYXRDb21wb25lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgY2xhc3MsIHVwb24gaW5zdGFudGlhdGlvbiwgY3JlYXRlcyBIVE1MIGVsZW1lbnQgZm9yIG1haW4gY2hhdCBjb21wb25lbnRcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcIi5jaGF0LWFwcFwiLCBcImNoYXQtdGVtcFwiLCBcImFmdGVyYmVnaW5cIik7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7fVxyXG4gIHJlbmRlckNvbXBvbmVudCgpOiB2b2lkIHt9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgZWl0aGVyIGEgbmV3IG9yIHRoZSBvbGQgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMge0NoYXRDb21wb25lbnR9XHJcbiAgICovXHJcbiAgc3RhdGljIGdldEluc3RhbmNlID0gKCk6IENoYXRDb21wb25lbnQgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IENoYXRDb21wb25lbnQoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS5jb21wXCI7XHJcblxyXG4vKiogVGhpcyBjbGFzcyBjcmVhdGVzIEhUTUwgZWxlbWVudCBmb3IgY2xpZW50IFVJIGNvbXBvbmVudHMgdXBvbiBzdXBlciAqL1xyXG5leHBvcnQgY2xhc3MgRXJyb3JDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTEVsZW1lbnQsIEhUTUxEaXZFbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEVycm9yQ29tcG9uZW50O1xyXG5cclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1hcHBcIiwgXCJlcnJvci10ZW1wXCIsIFwiYWZ0ZXJiZWdpblwiKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZUNvbXBvbmVudCguLi5hcmdzOiBhbnlbXSk6IHZvaWQge31cclxuICByZW5kZXJDb21wb25lbnQoLi4uYXJnczogYW55W10pOiB2b2lkIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gaW5zdHJ1Y3RzIGVycm9yIGNvbXBvbmVudCB0byBiZTpcclxuICAgKiAtIHRlbXBvcmFyaWx5IHZpc2libGVcclxuICAgKiAtIGlmIG5vdCBlbXB0eSwgZGlzcGxheSBlcnJvclxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRcclxuICAgKiBAcGFyYW0ge2FueX0gY29udGVudFxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBzaG93Q29tcCA9IChoZWFkOiBzdHJpbmcsIGNvbnRlbnQ/OiBhbnkpOiB2b2lkID0+IHtcclxuICAgIC8qKiBlcnJvciBjb250YWluZXIgZWxlbWVudCAqL1xyXG4gICAgY29uc3Qgd3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXJyb3Itd3JhcFwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIC8qKiBlcnJvciBoZWFkIGVsZW1lbnQgKi9cclxuICAgIGNvbnN0IGVycm9ySGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmVycm9yLWhlYWRcIlxyXG4gICAgKSBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICAvKiogZXJyb3IgY29udGVudCBlbGVtZW50ICovXHJcbiAgICBjb25zdCBlcnJvckNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5lcnJvci1jb250ZW50XCJcclxuICAgICkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcblxyXG4gICAgLy8gYXNzaWduIHZhbHVlcyB0byBlcnJvciBjb21wb25lbnRcclxuICAgIGVycm9ySGVhZC50ZXh0Q29udGVudCA9IGhlYWQ7XHJcbiAgICBjb250ZW50XHJcbiAgICAgID8gKGVycm9yQ29udGVudC50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpKVxyXG4gICAgICA6IChlcnJvckNvbnRlbnQudGV4dENvbnRlbnQgPSBudWxsKTtcclxuXHJcbiAgICAvLyB0ZW1wb3JhcmlseSBhcHBseSB2aXNpYmlsaXR5IGVycm9yIGNvbXBvbmVudCB0aHJvdWdoIHN0eWxpbmdcclxuICAgIHdyYXAuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVDb21wXCIpO1xyXG4gICAgd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52aXNpYmxlRWxlbVwiKTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZChcInNob3ctZXJyb3Itd3JhcFwiKTtcclxuICAgIHdyYXAuY2xhc3NMaXN0LmFkZChcImZhZGVJblwiKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgd3JhcC5jbGFzc0xpc3QuYWRkKFwiaW52aXNpYmxlRWxlbVwiKTtcclxuICAgICAgd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwiZmFkZUluXCIpO1xyXG4gICAgICB3cmFwLmNsYXNzTGlzdC5hZGQoXCJoaWRlQ29tcFwiKTtcclxuICAgICAgd3JhcC5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1lcnJvci13cmFwXCIpO1xyXG4gICAgfSwgNTAwMCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGVpdGhlciBhIG5ldyBvciB0aGUgb2xkIGluc3RhbmNlIG9mIHRoZSBjb21wb25lbnRcclxuICAgKiBAcmV0dXJucyB7RXJyb3JDb21wb25lbnR9XHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldEluc3RhbmNlID0gKCk6IEVycm9yQ29tcG9uZW50ID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBFcnJvckNvbXBvbmVudCgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tIFwiLi4vdXRpbC9hc3luY1dyYXAudXRpbFwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZSB9IGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb24udXRpbFwiO1xyXG5pbXBvcnQgeyBpUmVsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgaU5ld0dycEJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2dyb3VwLm1vZGVsXCI7XHJcbmltcG9ydCB7IFBlZXJDb21wb25lbnQgfSBmcm9tIFwiLi9wZWVyLmNvbXBcIjtcclxuaW1wb3J0IHsgU29ja2V0TWV0aG9kcyB9IGZyb20gXCIuLi91dGlsL3NvY2tldC51dGlsXCI7XHJcbmltcG9ydCB7IGlIdHRwUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL2h0dHAubW9kZWxcIjtcclxuaW1wb3J0IHsgaVZhbGlkaXR5VHlwZSB9IGZyb20gXCIuLi9tb2RlbHMvdmFsaWRpdHkubW9kZWxcIjtcclxuaW1wb3J0IHsgaUNvbXBGdW5jdGlvbnMgfSBmcm9tIFwiLi4vbW9kZWxzL2NvbXAubW9kZWxcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgYXMgZXJyb3IgfSBmcm9tIFwiLi9lcnJvci5jb21wXCI7XHJcbmltcG9ydCB7IGlDaGF0VHlwZSwgaVJlcXVlc3RCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuaW1wb3J0IHsgaHR0cEdldEdyb3VwcywgaHR0cFBvc3RHcm91cCB9IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcblxyXG4vKiogVGhpcyBjbGFzcyBob2xkcyBmdW5jdGlvbnMgcmVsYXRlZCB0byBtYW5hZ2luZyAmIHJlbmRlcmluZyBvZiBjbGllbnQgc3RvcmVkIGdyb3VwIGRhdGEgKi9cclxuZXhwb3J0IGNsYXNzIEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgaUNvbXBGdW5jdGlvbnMge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBHcm91cENvbXBvbmVudCB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGdyb3Vwc1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgZ3JvdXBSZXF1ZXN0QnRuITogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBncm91cHNGb3JtITogSFRNTEZvcm1FbGVtZW50O1xyXG4gIHByaXZhdGUgZ3JvdXBzSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAvKiogQHR5cGUgeyBpUmVsYXRpb25bXSB9IC0gYXJyYXkgb2YgaW5mb3JtYXRpb24gYWJvdXQgY29ubmVjdGVkIHVzZXIgZ3JvdXBzICovXHJcbiAgcHJpdmF0ZSB1c2VyR3JvdXBzOiBBcnJheTxpUmVsYXRpb24+ID0gW107XHJcbiAgLyoqIEB0eXBlIHsgc3RyaW5nIH0gLSBhY2NvdW50IGlkIG9mIGNvbm5lY3RlZCB1c2VyIHBlZXIgKi9cclxuICBwcml2YXRlIHN0YXRpYyBzUGVlcklkOiBzdHJpbmc7XHJcbiAgLyoqIEB0eXBlIHsgaVJlcXVlc3RCb2R5W10gfSAtIGFycmF5IG9mIHJlcXVlc3QgZGF0YSBmb3IgbXVsdGlwbGUgZ3JvdXAtdG8tdXNlciByZXF1ZXN0cyAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlcXVlc3RTdGFjazogaVJlcXVlc3RCb2R5W10gPSBbXTtcclxuICAvKiogQHR5cGUgeyBzdHJpbmcgfSAtIG5hbWluZyBzaWduYXR1cmUgZm9yIGZvciBhbGwgZ3JvdXBzIHN0b3JlZCB3aXRoaW4gc2Vzc2lvblN0b3JhZ2UgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ3JwU2Vzc2lvblN0b3JlTmFtZTogc3RyaW5nID0gXCJzZXNzaW9uR3JvdXBzXCI7XHJcblxyXG4gIC8vIEZPUkVJR04gRUxFTUVOVChTKVxyXG4gIHByaXZhdGUgY2hhdE1zZ3MhOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBpbnN0YW50aWF0aW5nLCB0aGUgY29uc3RydWN0b3IgZmV0Y2hlcyAmIHJlbmRlcnMgdXNlciByZWxhdGVkIGdyb3Vwc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgY29ubmVjdGVkIHVzZXIgcGVlclxyXG4gICAqIEBwYXJhbSB7aUNoYXRUeXBlfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSBwZWVyXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwZWVySWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZTogaUNoYXRUeXBlXHJcbiAgKSB7XHJcbiAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0R3JvdXBzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlndXJlQ29tcG9uZW50KCk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoKTtcclxuICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZXJyb3Iuc2hvd0NvbXAoXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBnZXQgdXNlciBncm91cHNcIiwgZXJyKTtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZUNvbXBvbmVudCguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgR3JvdXBDb21wb25lbnQuc1BlZXJJZCA9IHRoaXMucGVlcklkO1xyXG4gICAgR3JvdXBDb21wb25lbnQuZ3JvdXBzV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLWdyb3Vwc1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuZ3JvdXBSZXF1ZXN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctZ3JvdXBzLWhlYWQgaVwiXHJcbiAgICApIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgdGhpcy5ncm91cHNGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctZ3JvdXAtbmV3XCJcclxuICAgICkhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHRoaXMuZ3JvdXBzSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1ncm91cC1uZXcgaW5wdXRcIlxyXG4gICAgKSEgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoYXQtbXNnc1wiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5ncm91cFJlcXVlc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLnN1Ym1pdE1lbWJlcnNoaXBSZXF1ZXN0XHJcbiAgICApO1xyXG4gICAgdGhpcy5ncm91cHNGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXROZXdHcm91cCk7XHJcbiAgfVxyXG4gIHJlbmRlckNvbXBvbmVudCguLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgdGhpcy5nZW5lcmF0ZUdyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tIEdFVCB8IFNFVCAtLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIEVtcHRpZXMgZ3JvdXAtdG8tdXNlciByZXF1ZXN0IHN0YWNrXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGVtcHR5UmVxdWVzdFN0YWNrID0gKCkgPT4ge1xyXG4gICAgR3JvdXBDb21wb25lbnQucmVxdWVzdFN0YWNrID0gW107XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLSBFVkVOVCBIQU5ETEVSUyAtLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb25zIHNlbmRzIG11bHRpcGxlIGluY29taW5nIHBlZXIgcmVxdWVzdCB0byB1c2VyIHJlbGF0ZWQgZ3JvdXBzIHZpYSBzb2NrZXRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3VibWl0TWVtYmVyc2hpcFJlcXVlc3QgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKFxyXG4gICAgICBHcm91cENvbXBvbmVudC5yZXF1ZXN0U3RhY2sgPT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICBHcm91cENvbXBvbmVudC5yZXF1ZXN0U3RhY2sgPT09IG51bGwgfHxcclxuICAgICAgIUFycmF5LmlzQXJyYXkoR3JvdXBDb21wb25lbnQucmVxdWVzdFN0YWNrKSB8fFxyXG4gICAgICBHcm91cENvbXBvbmVudC5yZXF1ZXN0U3RhY2subGVuZ3RoIDwgMFxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgLyoqIERhdGEgR2F0aGVyaW5nICovXHJcbiAgICAvKiogQHR5cGUge2lSZXF1ZXN0Qm9keX0gLSB0ZW1wb3JhcnkgcmVxdWVzdCBib2R5IGhvbGRlciAqL1xyXG4gICAgbGV0IHJlcTogaVJlcXVlc3RCb2R5O1xyXG4gICAgLyoqIEB0eXBlIHtpVmFsaWRpdHlUeXBlfSAtIHRlbXBvcmFyeSByZXF1ZXN0IGJvZHkgdmFsaWRpdHkgaG9sZGVyICovXHJcbiAgICBsZXQgcmVxVmFsaWQ6IGlWYWxpZGl0eVR5cGU7XHJcblxyXG4gICAgLyoqIExvb3BzIG92ZXIgcmVxdWVzdCBzdGFjayBmb3IgbXVsdGlwbGUgZ3JvdXAtMi11c2VyIHJlcXVlc3RzIHZpYSBzb2NrZXQgKi9cclxuICAgIGZvciAocmVxIG9mIEdyb3VwQ29tcG9uZW50LnJlcXVlc3RTdGFjaykge1xyXG4gICAgICAvKiogSW5zcGVjdHMgcmVxdWVzdCBib2R5IHZhbGlkaXR5LCBza2lwcyBkYXRhIHVwb24gZGF0YSBpbnZhbGlkaXR5LiAqL1xyXG4gICAgICByZXFWYWxpZCA9IFZhbGlkYXRlLnJlcXVlc3RCb2R5KHJlcSk7XHJcbiAgICAgIGlmICghcmVxVmFsaWQuaXNWYWxpZCkgY29udGludWU7XHJcblxyXG4gICAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBvc3RSZXF1ZXN0RXYsIHJlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgR3JvdXBDb21wb25lbnQuZW1wdHlSZXF1ZXN0U3RhY2soKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIGdyb3VwLXRvLXVzZXIgcmVxdWVzdCBzdGFjayBhbmQgY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnRzXHJcbiAgICogLSBpbi9kZWNyZW1lbnQgZ3JvdXAtdG8tdXNlciByZXF1ZXN0IHN0YWNrLlxyXG4gICAqIC0gbW9kaWZpZXMgSFRNTCBlbGVtZW50IHdoaWNoIGNvcnJlc3BvbmRzIHRvIGdyb3VwIGNsaWNrZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGFkZE1lbWJlcnNoaXBSZXF1ZXN0ID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGdycEJ0bnMgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBncnBJZCA9IGdycEJ0bnMuZGF0YXNldC5ncnBJZCE7XHJcblxyXG4gICAgLy8gdG9nZ2xlIGNsYXNzXHJcbiAgICBncnBCdG5zLmNsYXNzTGlzdC50b2dnbGUoXCJjaGF0LW1zZy1ncm91cC1hY3Rpb24tdW5kb1wiKTtcclxuXHJcbiAgICAvLyBpZiBhZnRlciB0b2dnbGluZywgdW5kbyBjbGFzcyBpcyBwcmVzZW50OiBwdXNoIHRvIHN0YWNrXHJcbiAgICBpZiAoZ3JwQnRucy5jbGFzc0xpc3QuY29udGFpbnMoXCJjaGF0LW1zZy1ncm91cC1hY3Rpb24tdW5kb1wiKSlcclxuICAgICAgdGhpcy5yZXF1ZXN0U3RhY2sucHVzaChcclxuICAgICAgICBHcm91cENvbXBvbmVudC5jcmVhdGVSZXF1ZXN0Qm9keShncnBJZCwgR3JvdXBDb21wb25lbnQuc1BlZXJJZClcclxuICAgICAgKTtcclxuICAgIC8vIGlmIGFmdGVyIHRvZ2dsaW5nLCB1bmRvIGNsYXNzIGlzIHByZXNlbnQ6IHJlbW92ZSB0byBzdGFja1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLnJlcXVlc3RTdGFjayA9IHRoaXMucmVxdWVzdFN0YWNrLmZpbHRlcihcclxuICAgICAgICAocmVxOiBpUmVxdWVzdEJvZHkpID0+IHJlcS5ncm91cElkICE9PSBncnBJZFxyXG4gICAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmVxdWVzdHMgYW4gSFRUUCBQT1NUIHRvIHRoZSBzZXJ2ZXIgdG8gY3JlYXRlIGEgbmV3IGdyb3VwLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdWJtaXRFdmVudH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgU3VibWl0RXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHN1Ym1pdE5ld0dyb3VwID0gYXN5bmMgKGU6IFN1Ym1pdEV2ZW50KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgLyoqIG5ldyBncm91cCBvYmplY3QgKi9cclxuICAgIGNvbnN0IG5ld0dycE9iajogaU5ld0dycEJvZHkgPSB7XHJcbiAgICAgIHJlY2lwaWVudElkOiB0aGlzLmNoYXRNc2dzLmRhdGFzZXQudXNlcklkXHJcbiAgICAgICAgPyB0aGlzLmNoYXRNc2dzLmRhdGFzZXQudXNlcklkXHJcbiAgICAgICAgOiBcIlwiLFxyXG4gICAgICBncnBOYW1lOiB0aGlzLmdyb3Vwc0lucHV0LnZhbHVlLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogUmV0dXJucyBpbW1lZGlhdGVseSBpZiByZXF1ZXN0IGRhdGEgaXMgZm91bmQgaW52YWxpZC4gKi9cclxuICAgIGNvbnN0IG5ld0dycFZhbGlkID0gVmFsaWRhdGUubmV3R3JvdXBJbnB1dChuZXdHcnBPYmopO1xyXG4gICAgaWYgKCFuZXdHcnBWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBjbGllbnQncyBuZXcgZ3JvdXAgcmVxdWVzdCBkYXRhIGlzIGludmFsaWRcIixcclxuICAgICAgICBuZXdHcnBWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBSZXF1ZXN0IEhUVFAgUE9TVCB0byBzZXJ2ZXIgdG8gY3JlYXRlIG5ldyBncm91cC4gKi9cclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQb3N0R3JvdXAsIG5ld0dycE9iaik7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCBmb3IgdXNlciBncm91cHNcIixcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogSW1tZWRpYXRlbHkgcmV0dXJucyBpZiB0aGUgSFRUUCByZXNwb25zZSBpcyBpbnZhbGlkLiAqL1xyXG4gICAgbGV0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIHJlcXVlc3QgZm9yIHN1Ym1pdHRpbmcgbmV3IGdyb3VwYCxcclxuICAgICAgYHNlcnZlciByZXNwb25kZWQgd2l0aCBhbiBlcnJvciB1cG9uIGNsaWVudCdzIHJlcXVlc3QgZm9yIHVzZXIgZ3JvdXBzYFxyXG4gICAgKTtcclxuICAgIGlmICghaHR0cFZhbGlkKSByZXR1cm47XHJcblxyXG4gICAgLyoqIEdhdGhlciBkYXRhIGZvciBzZXF1ZW50aWFsIGdyb3VwLXRvLXVzZXIgcmVxdWVzdCBhZnRlciBzdWNjZXNzZnVsIGdyb3VwIGNyZWF0aW9uICovXHJcbiAgICBjb25zdCBncnBSZWwgPSByZXNwb25zZS5kYXRhLmRhdGEgYXMgaVJlbGF0aW9uO1xyXG4gICAgY29uc3QgZ3JwX2lkOiBzdHJpbmcgPSBncnBSZWwuYWNjbnRfaWQ7XHJcbiAgICBjb25zdCByZXFCb2R5OiBpUmVxdWVzdEJvZHkgPSBHcm91cENvbXBvbmVudC5jcmVhdGVSZXF1ZXN0Qm9keShcclxuICAgICAgdGhpcy5jaGF0TXNncy5kYXRhc2V0LnVzZXJJZCBhcyBzdHJpbmcsXHJcbiAgICAgIGdycF9pZFxyXG4gICAgKTtcclxuXHJcbiAgICAvKiogUmV0dXJucyBpbW1lZGlhdGVseSBpZiByZXF1ZXN0IGRhdGEgaXMgZm91bmQgaW52YWxpZC4gKi9cclxuICAgIGNvbnN0IHJlcVZhbGlkID0gVmFsaWRhdGUucmVxdWVzdEJvZHkocmVxQm9keSk7XHJcbiAgICBpZiAoIXJlcVZhbGlkLmlzVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvKiogUmVxdWVzdCB2aWEgc29ja2V0IHRvIHNlcnZlciBjcmVhdGUgcmVxdWVzdCBmcm9tIGdyb3VwLXRvLXVzZXIuICovXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBvc3RSZXF1ZXN0RXYsIHJlcUJvZHkpO1xyXG5cclxuICAgIC8qKiBVcGRhdGUgcGVlciBjb21wb25lbnQgbGlzdCB3aXRoIG5ldyBncm91cCAqL1xyXG4gICAgUGVlckNvbXBvbmVudC51cGRhdGVQZWVyTGlzdEhUTUwoZ3JwUmVsKTtcclxuXHJcbiAgICAvKiogQ29ubmVjdCB0byBzb2NrZXQgcm9vbSBhZnRlciBzdWNjZXNzZnVsIGdyb3VwIGNyZWF0aW9uICovXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChcclxuICAgICAgU29ja2V0TWV0aG9kcy5qb2luUm9vbUV2LFxyXG4gICAgICBncnBSZWwuY2hhdF9pZCxcclxuICAgICAgKHJlczogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvKiogQ2xlYXIgdXNlZCBncm91cCBpbnB1dCBlbGVtZW50ICovXHJcbiAgICB0aGlzLmdyb3Vwc0lucHV0LnZhbHVlID0gXCJcIjtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tIENMQVNTIFVUSUxJVFkgLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uOlxyXG4gICAqIC0gZmV0Y2hlcyBncm91cHMgZnJvbSB0aGUgc2VydmVyXHJcbiAgICogLSBzdG9yZXMgaXQgaW4gdGhlIHNlc3Npb25Tb3RyYWdlXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8dm9pZD4gfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXN5bmMgZ2V0R3JvdXBzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgLyoqIENoZWNrIGlmIHNlc3Npb25TdG9yYWdlIGhhcyBzdG9yZWQgZ3JvdXAgaXRlbXMuICovXHJcbiAgICBjb25zdCBncyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oR3JvdXBDb21wb25lbnQuZ3JwU2Vzc2lvblN0b3JlTmFtZSk7XHJcbiAgICAvKiogSW1tZWRpYXRlbHkgcmV0dXJucyBpZiB0cnVlLiAqL1xyXG4gICAgaWYgKGdzICYmIEFycmF5LmlzQXJyYXkoSlNPTi5wYXJzZShncykpKSB7XHJcbiAgICAgIHRoaXMudXNlckdyb3VwcyA9IEpTT04ucGFyc2UoZ3MpIGFzIGlSZWxhdGlvbltdO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIFJlcXVlc3QgSFRUUCBHRVQgdG8gdGhlIHNlcnZlciBmb3IgdXNlciByZWxhdGVkIGdyb3VwcyAqL1xyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldEdyb3Vwcyk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gZ2V0IHVzZXIgZ3JvdXBzXCIsIGVycik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEltbWVkaWF0ZWx5IHJldHVybnMgaWYgSFRUUCBSZXNwb25zZSBpcyBpbnZhbGlkICovXHJcbiAgICBjb25zdCBodHRwVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgYHNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyByZXF1ZXN0IGZvciB1c2VyIGdyb3Vwc2AsXHJcbiAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIGdyb3Vwc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qKiBTdG9yZSBncm91cHMgcmVjZWl2ZWQgdG86XHJcbiAgICAgKiAtIGNsYXNzXHJcbiAgICAgKiAtIHNlc3Npb25TdG9yYWdlXHJcbiAgICAgKiAqL1xyXG4gICAgdGhpcy51c2VyR3JvdXBzID0gcmVzcG9uc2UuZGF0YS5kYXRhIGFzIEFycmF5PGlSZWxhdGlvbj47XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICBHcm91cENvbXBvbmVudC5ncnBTZXNzaW9uU3RvcmVOYW1lLFxyXG4gICAgICBKU09OLnN0cmluZ2lmeSh0aGlzLnVzZXJHcm91cHMpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBncm91cCBsaXN0cyBmb3IgYSBncm91cCB0eXBlIG1lc3NhZ2UgY29tcG9uZW50ICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUdyb3VwcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikgcmV0dXJuO1xyXG5cclxuICAgIGxldCBncnA6IGlSZWxhdGlvbjtcclxuXHJcbiAgICBmb3IgKGdycCBvZiB0aGlzLnVzZXJHcm91cHMpIHtcclxuICAgICAgaWYgKGdycC5hY2NudF9pZCAhPT0gdGhpcy5wZWVySWQpXHJcbiAgICAgICAgR3JvdXBDb21wb25lbnQuY3JlYXRlR3JvdXBJdGVtSFRNTChncnAsIEdyb3VwQ29tcG9uZW50Lmdyb3Vwc1dyYXApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIEhUTUwgZWxlbWVudCB3aXRoaW4gdGhlIG1lc3NhZ2UgY29tcG9uZW50J3MgY29ubmVjdGVkIGdyb3VwcyBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgaVJlbGF0aW9uIH0gZ3JwXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwcGVyXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlR3JvdXBJdGVtSFRNTCA9IChcclxuICAgIGdycDogaVJlbGF0aW9uLFxyXG4gICAgd3JhcHBlcjogSFRNTERpdkVsZW1lbnRcclxuICApOiB2b2lkID0+IHtcclxuICAgIC8vICAgPGRpdiBjbGFzcz0nY2hhdC1tc2ctZ3JvdXAtaXRlbSc+XHJcbiAgICBjb25zdCBncnBXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGdycFdyYXAuY2xhc3NMaXN0LmFkZChcImNoYXQtbXNnLWdyb3VwLWl0ZW1cIik7XHJcblxyXG4gICAgLy8gICAgIDxoND5ncnAgMTwvaDQ+XHJcbiAgICBjb25zdCBncnBOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpO1xyXG4gICAgZ3JwTmFtZS50ZXh0Q29udGVudCA9IGdycC5hY2NudF9uYW1lO1xyXG5cclxuICAgIC8vICAgICA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1ncm91cC1hY3Rpb24nPlxyXG4gICAgY29uc3QgZ3JwQnRucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBncnBCdG5zLmNsYXNzTGlzdC5hZGQoXCJjaGF0LW1zZy1ncm91cC1hY3Rpb25cIik7XHJcblxyXG4gICAgLy8gICAgICAgPHNwYW4+dW5kbzwvc3Bhbj5cclxuICAgIGNvbnN0IHVuZG9CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHVuZG9CdG4udGV4dENvbnRlbnQgPSBcInVuZG9cIjtcclxuXHJcbiAgICAvLyAgICAgICA8aSBjbGFzcz0nZmEtc29saWQgZmEtcGx1cyc+PC9pPlxyXG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtcGx1c1wiKTtcclxuXHJcbiAgICBncnBCdG5zLmFwcGVuZENoaWxkKHVuZG9CdG4pO1xyXG4gICAgZ3JwQnRucy5hcHBlbmRDaGlsZChhZGRCdG4pO1xyXG4gICAgZ3JwQnRucy5kYXRhc2V0LmdycElkID0gZ3JwLmFjY250X2lkO1xyXG5cclxuICAgIGdycFdyYXAuYXBwZW5kQ2hpbGQoZ3JwTmFtZSk7XHJcbiAgICBncnBXcmFwLmFwcGVuZENoaWxkKGdycEJ0bnMpO1xyXG5cclxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZ3JwV3JhcCk7XHJcblxyXG4gICAgZ3JwQnRucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgR3JvdXBDb21wb25lbnQuYWRkTWVtYmVyc2hpcFJlcXVlc3QpO1xyXG4gICAgLy8gICAgIDwvZGl2PlxyXG4gICAgLy8gICA8L2Rpdj5cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSByZXF1ZXN0IG9iamVjdCBmb3IgYSBncm91cC10by11c2VyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gZ3JvdXBJZFxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHJlY2VpdmVySWRcclxuICAgKiBAcmV0dXJucyB7IGlSZXF1ZXN0Qm9keSB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlUmVxdWVzdEJvZHkoXHJcbiAgICBncm91cElkOiBzdHJpbmcsXHJcbiAgICByZWNlaXZlcklkOiBzdHJpbmdcclxuICApOiBpUmVxdWVzdEJvZHkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogMyxcclxuICAgICAgcmVjaXBpZW50SWQ6IHJlY2VpdmVySWQsXHJcbiAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGVpdGhlcjpcclxuICAgKiAtIG5ldyBvciBvbGQgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICogLSBudWxsIGlmIHRoZSBjbGFzcyBpcyB0byBiZSBkZWxldGVkXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVySWQgLSBhY2NvdW50IGlkIG9mIHRoZSB1c2VyJ3MgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSB1c2VyJ3MgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZGVsZXRlSW5zdGFuY2UgLSBmbGFnIGluZGljYXRpbmcgd2hldGhlciBjbGFzcyBpcyB0byBiZSBkZWxldGVkIG9yIG5vdFxyXG4gICAqIEByZXR1cm5zIHsgR3JvdXBDb21wb25lbnQgfCBudWxsIH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdGFuY2UgPSAoXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHR5cGU6IGlDaGF0VHlwZSxcclxuICAgIGRlbGV0ZUluc3RhbmNlOiBib29sZWFuXHJcbiAgKTogR3JvdXBDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghZGVsZXRlSW5zdGFuY2UpIHtcclxuICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBHcm91cENvbXBvbmVudChwZWVySWQsIHR5cGUpO1xyXG4gICAgICAgIEdyb3VwQ29tcG9uZW50LmVtcHR5UmVxdWVzdFN0YWNrKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgaUNoYXRUeXBlIH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vYmFzZS5jb21wXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VzTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL21zZ3NMaXN0LmNvbXBcIjtcclxuaW1wb3J0IHsgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IH0gZnJvbSBcIi4vbXNnc09wdHMuY29tcFwiO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgY2xhc3MgaG9sZHMgZnVuY3Rpb25zIHJlbGF0ZWQgdG8gbW9kaWZ5aW5nIGNsYXNzIGluc3RhbmNlcyBhbmQgVUkgaW50ZXJmYWNlIG9mOlxyXG4gKiAtIE1lc3NhZ2VzTGlzdENvbXBvbmVudFxyXG4gKiAtIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+IHtcclxuICBzdGF0aWMgaW5zdGFuY2U6IE1lc3NhZ2VzQ29tcG9uZW50IHwgbnVsbDtcclxuXHJcbiAgLy8gQ09NUE9ORU5UU1xyXG4gIHN0YXRpYyBtc2dMaXN0SW5zdGFuY2U6IE1lc3NhZ2VzTGlzdENvbXBvbmVudCB8IG51bGw7XHJcbiAgc3RhdGljIG1zZ09wdHNJbnN0YW5jZTogTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IHwgbnVsbDtcclxuXHJcbiAgLy8gQ09NUE9ORU5UIEVMRU1FTlRTXHJcbiAgc3RhdGljIGNoYXRNc2dzOiBIVE1MRGl2RWxlbWVudDtcclxuICBzdGF0aWMgcmVhZG9ubHkgY2hhdE1zZ1VzZXJDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZ3MtdXNlclwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBjaGF0TXNnR3JvdXBDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZ3MtZ3JvdXBcIjtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFwiLmNoYXQtbXNncy13cmFwXCIsIFwibXNncy10ZW1wXCIsIFwiYWZ0ZXJiZWdpblwiKTtcclxuXHJcbiAgICB0aGlzLmNvbmZpZ3VyZUNvbXBvbmVudCgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb21wb25lbnQoKTtcclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZUNvbXBvbmVudCgpOiB2b2lkIHt9XHJcblxyXG4gIHJlbmRlckNvbXBvbmVudCgpOiB2b2lkIHt9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGNvbnRyb2xzIHdoZXRoZXIgTWVzc2FnZXNDb21wb25lbnQgZWl0aGVyOlxyXG4gICAqIC0gY2FsbCBhIG5ldyBjbGFzcyBmb3IgYSBuZXcgcGVlciBtZXNzYWdlIGNvbXBvbmVudFxyXG4gICAqIC0gZGVsZXRlIGNsYXNzIGFuZCBjb3JyZXNwb25kaW5nIEhUTUwgZWxlbWVudHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHVzZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIGNsaWVudCBsb2dnZWQgaW5cclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVySWQgLSBhY2NvdW50IGlkIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0IGNvbm5lY3RlZCBwZWVyXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcGVlck5hbWUgLSBhY2NvdW50IG5hbWUgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBjaGF0SWQgLSBjaGF0IGlkIGJldHdlZW4gdGhlIHVzZXIgJiBwZWVyIHwgZ3JvdXBcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gYXZhaWxhYmlsaXR5IC0gIGF2YWlsYWJpbGl0eSBzZXR0aW5nIG9mIHRoZSB1c2VyIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGUgLSBjaGF0IHR5cGUgb2YgdGhlIHVzZXIncyB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZGVsZXRlSW5zdGFuY2UgLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIG1lc3NhZ2UgY29tcCB3aWxsIGJlIGRlbGV0ZWRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZnJvbVBlZXIgLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgdGFyZ2V0IGlzIGZyb20gdGhlIHBlZXIgbGlzdFxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBNZXNzYWdlc0NvbXBvbmVudCB8IG51bGwgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9IChcclxuICAgIHVzZXJJZDogc3RyaW5nLFxyXG4gICAgcGVlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVyTmFtZTogc3RyaW5nLFxyXG4gICAgY2hhdElkOiBzdHJpbmcsXHJcbiAgICBhdmFpbGFiaWxpdHk6IGJvb2xlYW4sXHJcbiAgICB0eXBlOiBpQ2hhdFR5cGUsXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhbixcclxuICAgIGZyb21QZWVyOiBib29sZWFuXHJcbiAgKTogTWVzc2FnZXNDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIC8vIGlmIHN0YXRpYyBmdW5jdGlvbiBpcyBjYWxsZWQgZm9yIGNyZWF0aW5nIG5ldyBjbGFzcyBjb21wb25lbnRzXHJcbiAgICBpZiAoIWRlbGV0ZUluc3RhbmNlKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICAgIC8vIGlmIG5vIG1lc3NhZ2VDb21wb25lbnQgZXhpc3RzLCBjcmVhdGUgYSBuZXcgb25lXHJcbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBNZXNzYWdlc0NvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMuY2hhdE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNoYXQtbXNnc1wiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIHNldCBtZXNzYWdlIGNvbXBvbmVudCBjaGF0IHR5cGVcclxuICAgICAgICB0eXBlID09PSBcInVzZXJcIlxyXG4gICAgICAgICAgPyBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNncy5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAgICAgICAgIE1lc3NhZ2VzQ29tcG9uZW50LmNoYXRNc2dVc2VyQ2xhc3NcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgOiBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNncy5jbGFzc0xpc3QuYWRkKFxyXG4gICAgICAgICAgICAgIE1lc3NhZ2VzQ29tcG9uZW50LmNoYXRNc2dHcm91cENsYXNzXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TXNnc0luc3RhbmNlKFxyXG4gICAgICAgICAgdXNlcklkLFxyXG4gICAgICAgICAgcGVlcklkLFxyXG4gICAgICAgICAgcGVlck5hbWUsXHJcbiAgICAgICAgICBjaGF0SWQsXHJcbiAgICAgICAgICBhdmFpbGFiaWxpdHksXHJcbiAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgZnJvbVBlZXIsXHJcbiAgICAgICAgICBmYWxzZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGF0TXNncy5kYXRhc2V0LnVzZXJJZCAhPT0gcGVlcklkKSB7XHJcbiAgICAgICAgLy8gZWxzZSwgZGVsZXRlIHRoZW4gcmVwbGFjZSB0aGUgcHJldmlvdXMgb25lXHJcbiAgICAgICAgdGhpcy5nZXRNc2dzSW5zdGFuY2UoXHJcbiAgICAgICAgICBcImRlbGV0ZUlkXCIsXHJcbiAgICAgICAgICBcImRlbGV0ZUlkXCIsXHJcbiAgICAgICAgICBcImRlbGV0ZU5hbWVcIixcclxuICAgICAgICAgIFwiZGVsZXRlQ2hhdElkXCIsXHJcbiAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICBmcm9tUGVlcixcclxuICAgICAgICAgIHRydWVcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBkZWxldGUgbWVzc2FnZSBjb21wb25lbnQgSFRNTFxyXG4gICAgICAgIHRoaXMuY2hhdE1zZ3MuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8gcmVwbGFjZSBtZXNzYWdlIGNvbXBvbmVudCBjaGF0IHR5cGVcclxuICAgICAgICB0eXBlID09PSBcInVzZXJcIlxyXG4gICAgICAgICAgPyBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNncy5jbGFzc0xpc3QucmVwbGFjZShcclxuICAgICAgICAgICAgICBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNnR3JvdXBDbGFzcyxcclxuICAgICAgICAgICAgICBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNnVXNlckNsYXNzXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgIDogTWVzc2FnZXNDb21wb25lbnQuY2hhdE1zZ3MuY2xhc3NMaXN0LnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgTWVzc2FnZXNDb21wb25lbnQuY2hhdE1zZ1VzZXJDbGFzcyxcclxuICAgICAgICAgICAgICBNZXNzYWdlc0NvbXBvbmVudC5jaGF0TXNnR3JvdXBDbGFzc1xyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmdldE1zZ3NJbnN0YW5jZShcclxuICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgIHBlZXJJZCxcclxuICAgICAgICAgIHBlZXJOYW1lLFxyXG4gICAgICAgICAgY2hhdElkLFxyXG4gICAgICAgICAgYXZhaWxhYmlsaXR5LFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGZyb21QZWVyLFxyXG4gICAgICAgICAgZmFsc2VcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBlbHNlLCBkZWxldGUgY29tcG9uZW50XHJcbiAgICAgIHRoaXMuZ2V0TXNnc0luc3RhbmNlKFxyXG4gICAgICAgIFwiZGVsZXRlSWRcIixcclxuICAgICAgICBcImRlbGV0ZUlkXCIsXHJcbiAgICAgICAgXCJkZWxldGVOYW1lXCIsXHJcbiAgICAgICAgXCJkZWxldGVDaGF0SWRcIixcclxuICAgICAgICBmYWxzZSxcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIGZyb21QZWVyLFxyXG4gICAgICAgIHRydWVcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGNvbnRyb2xzIHdoZXRoZXIgTWVzc2FnZXNMaXN0Q29tcG9uZW50ICYgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IHdpbGw6XHJcbiAgICogLSBjcmVhdGVzIGEgbmV3IGNsYXNzIGZvciBhIG5ldyB1c2VyIG1lc3NhZ2UgY29tcG9uZW50XHJcbiAgICogLSBkZWxldGUgY2xhc3MgYW5kIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gdXNlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgY2xpZW50IGxvZ2dlZCBpblxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSAgYXZhaWxhYmlsaXR5IHNldHRpbmcgb2YgdGhlIHVzZXIgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgaUNoYXRUeXBlIH0gdHlwZSAtIGNoYXQgdHlwZSBvZiB0aGUgdXNlcidzIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBmcm9tUGVlciAtIGZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdXNlciB0YXJnZXQgaXMgZnJvbSB0aGUgcGVlciBsaXN0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGRlbGV0ZUluc3RhbmNlIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBtZXNzYWdlIGNvbXAgd2lsbCBiZSBkZWxldGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IE1lc3NhZ2VzQ29tcG9uZW50IHwgbnVsbCB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZ2V0TXNnc0luc3RhbmNlID0gKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHBlZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZyxcclxuICAgIGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHR5cGU6IFwidXNlclwiIHwgXCJncm91cFwiLFxyXG4gICAgZnJvbVBlZXI6IGJvb2xlYW4sXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhblxyXG4gICk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHBlZXJJZCA9PT0gdGhpcy5jaGF0TXNncy5kYXRhc2V0LnVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgIGRlbGV0ZUluc3RhbmNlXHJcbiAgICAgID8gKHRoaXMuY2hhdE1zZ3MuZGF0YXNldC51c2VySWQgPSBcIlwiKVxyXG4gICAgICA6ICh0aGlzLmNoYXRNc2dzLmRhdGFzZXQudXNlcklkID0gcGVlcklkKTtcclxuXHJcbiAgICB0aGlzLm1zZ09wdHNJbnN0YW5jZSA9IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRJbnN0YW5jZShcclxuICAgICAgcGVlcklkLFxyXG4gICAgICBwZWVyTmFtZSxcclxuICAgICAgY2hhdElkLFxyXG4gICAgICB0eXBlLFxyXG4gICAgICBhdmFpbGFiaWxpdHksXHJcbiAgICAgIGZyb21QZWVyLFxyXG4gICAgICBkZWxldGVJbnN0YW5jZVxyXG4gICAgKTtcclxuICAgIHRoaXMubXNnTGlzdEluc3RhbmNlID0gTWVzc2FnZXNMaXN0Q29tcG9uZW50LmluaXQoXHJcbiAgICAgIHVzZXJJZCxcclxuICAgICAgcGVlcklkLFxyXG4gICAgICBwZWVyTmFtZSxcclxuICAgICAgY2hhdElkLFxyXG4gICAgICBhdmFpbGFiaWxpdHksXHJcbiAgICAgIHR5cGUsXHJcbiAgICAgIGZyb21QZWVyLFxyXG4gICAgICBkZWxldGVJbnN0YW5jZVxyXG4gICAgKTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IEdlblV0aWwgfSBmcm9tIFwiLi4vdXRpbC9nZW4udXRpbFwiO1xyXG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gXCIuLi91dGlsL2FzeW5jV3JhcC51dGlsXCI7XHJcbmltcG9ydCB7IGlNc2dCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9tc2dMaXN0Lm1vZGVsXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvbi51dGlsXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcFwiO1xyXG5pbXBvcnQgeyBpUmVsYXRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgaHR0cEdldE1zZ3MgfSBmcm9tIFwiLi4vaG9va3MvcmVxdWVzdHMuaG9va1wiO1xyXG5pbXBvcnQgeyBpQ2hhdFJlcUJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2NoYXQubW9kZWxcIjtcclxuaW1wb3J0IHsgUGVlckNvbXBvbmVudCB9IGZyb20gXCIuL3BlZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBTb2NrZXRNZXRob2RzIH0gZnJvbSBcIi4uL3V0aWwvc29ja2V0LnV0aWxcIjtcclxuaW1wb3J0IHsgaUh0dHBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaHR0cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHcm91cENvbXBvbmVudCB9IGZyb20gXCIuL2dyb3VwLmNvbXBcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgYXMgZXJyb3IgfSBmcm9tIFwiLi9lcnJvci5jb21wXCI7XHJcbmltcG9ydCB7IGlDaGF0VHlwZSwgaVJlcXVlc3RCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9nZW4ubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGhvbGRzIGZ1bmN0aW9ucyB3aGljaCBtYW5hZ2UgYW5kIHJlbmRlciBkYXRhIHJlbGF0ZWQgdG8gdGhlIHVzZXIgYW5kIHRoZWlyIHBlZXIocyknIG1lc3NhZ2UgbGlzdHMgYW5kIGl0cyBpdGVtcy5cclxuICpcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNMaXN0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PFxyXG4gIEhUTUxEaXZFbGVtZW50LFxyXG4gIEhUTUxFbGVtZW50XHJcbj4ge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBNZXNzYWdlc0xpc3RDb21wb25lbnQgfCBudWxsO1xyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRNc2dzTGlzdDogSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRNc2dzTGlzdFdyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdE1zZ0hlYWQhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRNc2dIZWFkTmFtZSE6IEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRMaXN0R3JwQnRuV3JhcCE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdExpc3RHcnBCdG4hOiBIVE1MRWxlbWVudDtcclxuICBwcml2YXRlIHN0YXRpYyBjaGF0TXNnQm9keTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0TXNnc0Zvcm1zITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0TXNnUmVxdWVzdCE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdE1zZ0Zvcm0hOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0TXNnTW9kYWwhOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBtb2RhbEdyb3VwSW5wdXQhOiBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAvKiogQ1NTIENsYXNzIG5hbWUgdG8gc3R5bGUgdXNlciBzZW50IG1lc3NhZ2UuICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgbXlNc2dDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZy1taW5lXCI7XHJcbiAgLyoqIENTUyBDbGFzcyBuYW1lIHRvIHN0eWxlIHBlZXIocykgc2VudCBtZXNzYWdlLiAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHBlZXJNc2dDbGFzczogc3RyaW5nID0gXCJjaGF0LW1zZy1vdGhlcnNcIjtcclxuICAvKiogTmFtaW5nIGNvbnZlbnRpb24gZm9yIHNlc3Npb24gc3RvcmVkIG1lc3NhZ2UgbGlzdCBhcnJheS4gKi9cclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBzZXNzaW9uU3RvcmVMaXN0S2V5OiBzdHJpbmcgPSBcIm1zZ0xpc3RcIjtcclxuICAvKiogQWNjb3VudCBJRCBvZiB0aGUgdXNlcidzIHRhcmdldC4gKi9cclxuICBwcml2YXRlIHN0YXRpYyBzUGVlcklkOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTa2lwIGNvdW50ZXIgZm9yIHRoZSBwZWVyIGxpc3QncyBwYWdpbmF0aW9uIGxvZ2ljLiAqL1xyXG4gIHByaXZhdGUgc2tpcDogbnVtYmVyID0gMDtcclxuICAvKiogU2tpcCBDb25zdGFudCBmb3IgdGhlIHBlZXIgbGlzdCdzIHBhZ2luYXRpb24gbG9naWMuICovXHJcbiAgcHJpdmF0ZSBza2lwQ250OiAzMCA9IDMwO1xyXG4gIC8qKiBNZXNzYWdlIElEIGJldHdlZW4gdGhlIHVzZXIgJiBwZWVyJ3MgY2hhdCBkYXRhLiAqL1xyXG4gIHByaXZhdGUgbXNnc0lkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcclxuICAvKiogTWVzc2FnZSBMaXN0IEl0ZW1zIE1hcCBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlcidzIGNoYXQgZGF0YS4gKi9cclxuICBwcml2YXRlIG1zZ3NMaXN0czogTWFwPHN0cmluZywgaU1zZ0JvZHlbXT4gPSBuZXcgTWFwKCk7XHJcbiAgLyoqIE1lc3NhZ2UgTGlzdCBJdGVtcyBjb3VudCBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlcidzIGNoYXQgZGF0YS4gKi9cclxuICBwcml2YXRlIG1zZ3NMaXN0Q250OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGluc3RhbnRpYXRpb24sIHRoZSBjb25zdHJ1Y3RvcjpcclxuICAgKiAtIGNoZWNrcyBmb3IgYXZhaWxhYmxlIHNlc3Npb24gc3RvcmVkIG1hdGNoaW5nIG1lc3NhZ2UgbGlzdFxyXG4gICAqIC0gaWYgYXZhaWxhYmxlOiBza2lwcyBmZXRjaGluZyBmcm9tIHNlcnZlciBhbmQgbW9kaWZpZXMgcGFnaW5hdGlvbiByZWxhdGVkIGRhdGFcclxuICAgKiAtIGVsc2UgICAgICAgIDogZmV0Y2hlcyBmcm9tIHNlcnZlclxyXG4gICAqXHJcbiAgICogVGhlbjpcclxuICAgKiAtIGNvbmZpZ3VyZXMgcmVsYXRlZCBVSSBjb21wb25lbnRcclxuICAgKiAtIHJlbmRlciByZWxhdGVkIFVJIGNvbXBvbmVudFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gdXNlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgY2xpZW50IGxvZ2dlZCBpblxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSBhdmFpbGFiaWxpdHkgc2V0dGluZyBvZiB0aGUgdXNlciB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGZyb21QZWVyIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIHRhcmdldCBpcyBmcm9tIHRoZSBwZWVyIGxpc3RcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHVzZXJJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwZWVySWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGVlck5hbWU6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhdElkOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZTogaUNoYXRUeXBlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBmcm9tUGVlcjogYm9vbGVhblxyXG4gICkge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1tc2dzXCIsIFwibXNncy1saXN0LXRlbXBcIiwgXCJhZnRlcmJlZ2luXCIpO1xyXG5cclxuICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmIChQZWVyQ29tcG9uZW50LnNlYXJjaFBlZXJJbmZvKHRoaXMuY2hhdElkKSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgbiA9IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRNc2dMaXN0SW5mb0NvdW50KHRoaXMuY2hhdElkKTtcclxuICAgICAgICBpZiAoIW4pIGF3YWl0IHRoaXMuZ2V0TWVzc2FnZXMoKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIHRoaXMubXNnc0xpc3RDbnQgPSBuO1xyXG4gICAgICAgICAgY29uc3QgbSA9IE1hdGguZmxvb3IobiAvIHRoaXMuc2tpcENudCk7XHJcbiAgICAgICAgICB0aGlzLnNraXAgPSBtO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5jb25maWd1cmVDb21wb25lbnQoKTtcclxuICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoXHJcbiAgICAgICAgdXNlcklkLFxyXG4gICAgICAgIHBlZXJJZCxcclxuICAgICAgICBwZWVyTmFtZSxcclxuICAgICAgICBjaGF0SWQsXHJcbiAgICAgICAgYXZhaWxhYmlsaXR5LFxyXG4gICAgICAgIHR5cGVcclxuICAgICAgKTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuc1BlZXJJZCA9IHRoaXMucGVlcklkO1xyXG4gICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNoYXRNc2dzTGlzdFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1ib2R5LXdyYXBcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuY2hhdE1zZ3NMaXN0V3JhcC5kYXRhc2V0LmNoYXRJZCA9IHRoaXMuY2hhdElkO1xyXG4gICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNoYXRNc2dCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjY2hhdC1tc2ctYm9keVwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ0hlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1oZWFkXCJcclxuICAgICkhIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ0hlYWROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctaGVhZC1uYW1lIGgyXCJcclxuICAgICkhIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdExpc3RHcnBCdG5XcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctaGVhZC1vcHRzLWJ0blwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdExpc3RHcnBCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1oZWFkLW9wdHMtYnRuIGlcIlxyXG4gICAgKSEgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRNc2dzRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1mb3Jtc1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdE1zZ1JlcXVlc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1yZXF1ZXN0XCJcclxuICAgICkhIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0TXNnRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLWZvcm1cIlxyXG4gICAgKSEgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0TXNnTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1ncm91cC1tb2RhbFwiXHJcbiAgICApISBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgICB0aGlzLm1vZGFsR3JvdXBJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLWdyb3VwLW5ldyBpbnB1dFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuY2hhdE1zZ1JlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLmNsaWNrTXNnQnRuUmVxdWVzdEhhbmRsZXJcclxuICAgICk7XHJcbiAgICB0aGlzLmNoYXRNc2dGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXRNZXNzYWdlSGFuZGxlcik7XHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuY2hhdE1zZ3NMaXN0V3JhcC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcInNjcm9sbFwiLFxyXG4gICAgICB0aGlzLmdldE1vcmVNZXNzYWdlc1xyXG4gICAgKTtcclxuICB9XHJcbiAgcmVuZGVyQ29tcG9uZW50KFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHBlZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZyxcclxuICAgIGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHR5cGU6IFwidXNlclwiIHwgXCJncm91cFwiXHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYXRNc2dzRm9ybXMuZGF0YXNldC5wZWVySWQgPSBwZWVySWQ7XHJcbiAgICB0aGlzLmNoYXRNc2dzRm9ybXMuZGF0YXNldC5jaGF0VHlwZSA9IHR5cGU7XHJcbiAgICB0aGlzLmNoYXRNc2dIZWFkTmFtZS50ZXh0Q29udGVudCA9IHBlZXJOYW1lO1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIikge1xyXG4gICAgICB0aGlzLmNoYXRNc2dIZWFkLnJlbW92ZUNoaWxkKHRoaXMuY2hhdExpc3RHcnBCdG5XcmFwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWF2YWlsYWJpbGl0eSkge1xyXG4gICAgICB0aGlzLmNoYXRMaXN0R3JwQnRuLmNsYXNzTGlzdC5hZGQoXHJcbiAgICAgICAgXCJjaGF0LW1zZy1oZWFkLW9wdHMtYnRuLXVuYXZhaWxhYmxlLXN0YXRlXCJcclxuICAgICAgKTtcclxuICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldENoYXRNc2dzTGlzdFdyYXAoKS5zY3JvbGxUb3AgPVxyXG4gICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICB0aGlzLmNoYXRNc2dzRm9ybXMuY2xhc3NMaXN0LmFkZChcImNoYXQtbXNnLWZvcm0tcmVxdWVzdC1zdGF0ZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2hhdExpc3RHcnBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICBcImNsaWNrXCIsXHJcbiAgICAgICAgdGhpcy5jbGlja01zZ09wdHNCdG5IYW5kbGVyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IFwidXNlclwiKSBHcm91cENvbXBvbmVudC5nZXRJbnN0YW5jZShwZWVySWQsIHR5cGUsIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlTXNnSXRlbXMoXHJcbiAgICAgIHVzZXJJZCxcclxuICAgICAgSlNPTi5wYXJzZShcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFxyXG4gICAgICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LnNlc3Npb25TdG9yZUxpc3RLZXkgKyB0aGlzLmNoYXRJZFxyXG4gICAgICAgICkhXHJcbiAgICAgIClcclxuICAgICk7XHJcblxyXG4gICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldENoYXRNc2dzTGlzdFdyYXAoKS5zY3JvbGxUb3AgPVxyXG4gICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLnNjcm9sbEhlaWdodDtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLSBHRVQgfCBTRVQgLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIHN0YXRpYyByZWFkb25seSBnZXRDaGF0TXNnc0xpc3RXcmFwID0gKCk6IEhUTUxEaXZFbGVtZW50ID0+IHtcclxuICAgIHJldHVybiB0aGlzLmNoYXRNc2dzTGlzdFdyYXA7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0Q2hhdE1zZ0JvZHkgPSAoKTogSFRNTERpdkVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY2hhdE1zZ0JvZHk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRvdGFsIG1lc3NhZ2UgbGlzdCBpdGVtcyBjb3VudC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEByZXR1cm5zIHsgbnVtYmVyIH1cclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0TXNnTGlzdEluZm9Db3VudCA9IChjaGF0SWQ6IHN0cmluZyk6IG51bWJlciA9PiB7XHJcbiAgICBjb25zdCB0ID0gSlNPTi5wYXJzZShcclxuICAgICAgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnNlc3Npb25TdG9yZUxpc3RLZXkgKyBjaGF0SWQpIVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBuID0gdCAhPT0gbnVsbCAmJiBBcnJheS5pc0FycmF5KHQpICYmIHQubGVuZ3RoID8gdC5sZW5ndGggOiAwO1xyXG5cclxuICAgIHJldHVybiBuO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIHNlc3Npb24gTWVzc2FnZSBMaXN0IERhdGEgYnkgZWl0aGVyOlxyXG4gICAqIC0gYWRkaW5nIGEgc2luZ2xlIG1lc3NhZ2UgaXRlbVxyXG4gICAqIC0gYWRkaW5nIGFuIGFycmF5IG9mIG1lc3NhZ2UgaXRlbXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5IHwgbnVsbCB9IFttc2ddIC0gbWVzc2FnZSBpdGVtIG9iamVjdFxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5W10gfCBudWxsIH0gW21zZ3NdIC0gYXJyYXkgb2YgbWVzc2FnZSBpdGVtIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHsgdm9pZCB9XHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHNldE1zZ0xpc3RJbmZvID0gKFxyXG4gICAgY2hhdElkOiBzdHJpbmcsXHJcbiAgICBtc2c6IGlNc2dCb2R5IHwgbnVsbCxcclxuICAgIG1zZ3M6IGlNc2dCb2R5W10gfCBudWxsXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICAvLyBzZXNzaW9uIGl0ZW0ga2V5IG5hbWVcclxuICAgIGNvbnN0IGtleU5hbWUgPSB0aGlzLnNlc3Npb25TdG9yZUxpc3RLZXkgKyBjaGF0SWQ7XHJcblxyXG4gICAgLy8gZ2V0IHNlc3Npb24gaXRlbVxyXG4gICAgY29uc3QgcyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXlOYW1lKSEpIGFzIGlNc2dCb2R5W10gfCBudWxsO1xyXG4gICAgY29uc3Qgc2Vzc2lvbkxpc3QgPVxyXG4gICAgICBzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KHMpID8gKFtdIGFzIGlNc2dCb2R5W10pIDogcztcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIChtc2cgPT09IG51bGwgfHwgIShcIm1zZ1wiIGluIG1zZykgfHwgT2JqZWN0LmtleXMobXNnKS5sZW5ndGggIT09IDUpICYmXHJcbiAgICAgIChtc2dzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KG1zZ3MpIHx8ICFtc2dzLmxlbmd0aClcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8vIGNyZWF0ZSB0ZW1wb3JhcnkgYXJyYXkgd2l0aCBuZXcgbXNnc1xyXG4gICAgY29uc3QgYTEgPVxyXG4gICAgICBtc2dzICE9PSBudWxsICYmIEFycmF5LmlzQXJyYXkobXNncykgJiYgbXNncy5sZW5ndGhcclxuICAgICAgICA/IFsuLi5zZXNzaW9uTGlzdCwgLi4uKG1zZ3MgYXMgaU1zZ0JvZHlbXSldXHJcbiAgICAgICAgOiBbLi4uc2Vzc2lvbkxpc3RdO1xyXG5cclxuICAgIC8vIGFkZCBuZXcgbXNnIHRvIHRlbXBvcmFyeSBhcnJheVxyXG4gICAgaWYgKG1zZyAhPT0gbnVsbCAmJiBcIm1zZ1wiIGluIG1zZyAmJiBPYmplY3Qua2V5cyhtc2cpLmxlbmd0aCA9PT0gNSlcclxuICAgICAgYTEudW5zaGlmdChtc2cpO1xyXG5cclxuICAgIC8vIHNldCBzZXNzaW9uIGl0ZW1cclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5TmFtZSwgSlNPTi5zdHJpbmdpZnkoYTEpKTtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBpbmNyZW1lbnRzIHRoZSBNZXNzYWdlIExpc3QgSXRlbXMgY291bnQgb2YgYSBzcGVjaWZpYyBjaGF0IGRhdGEgYnkgb25lICgxKS4gKi9cclxuICBwdWJsaWMgcmVhZG9ubHkgaW5jck1zZ3NMaXN0Q250ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5tc2dzTGlzdENudCsrO1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gRVZFTlQgSEFORExFUlMgLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGxpc3RlbmVyIGZ1bmN0aW9uIHNob3dzIGdyb3VwIGNvbXBvbmVudCBpZiB0aGUgdGFyZ2V0IHBlZXIgdHlwZSBpcyB1c2VyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrTXNnT3B0c0J0bkhhbmRsZXIgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgdGhpcy5jaGF0TXNnTW9kYWwuY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtbXNnLWdyb3VwLW1vZGFsLXNob3ctc3RhdGVcIik7XHJcbiAgICBHcm91cENvbXBvbmVudC5lbXB0eVJlcXVlc3RTdGFjaygpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbGlzdGVuZXIgZnVuY3Rpb24gc2VuZHMgcmVxdWVzdCB0byB0aGUgdGFyZ2V0IHBlZXIgdmlhIHNvY2tldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGlja01zZ0J0blJlcXVlc3RIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHJlcUJvZHk6IGlSZXF1ZXN0Qm9keSA9IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5jcmVhdGVSZXF1ZXN0Qm9keShcclxuICAgICAgdGhpcy5jaGF0TXNnc0Zvcm1zLmRhdGFzZXQuY2hhdFR5cGUgYXMgXCJ1c2VyXCIgfCBcImdyb3VwXCIsXHJcbiAgICAgIHRoaXMucGVlcklkIGFzIHN0cmluZ1xyXG4gICAgKTtcclxuXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBvc3RSZXF1ZXN0RXYsIHJlcUJvZHkpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgbGlzdGVuZXIgZnVuY3Rpb24gc2VuZHMgbWVzc2FnZSBib2R5IHRvIHRoZSB0YXJnZXQgcGVlciBjaGF0IHZpYSBzb2NrZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBTdWJtaXRFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIFN1Ym1pdEV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJtaXRNZXNzYWdlSGFuZGxlciA9IChlOiBTdWJtaXRFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgaW5wdXRITVRMID0gKGUudGFyZ2V0IGFzIEhUTUxGb3JtRWxlbWVudCkucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCJpbnB1dFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIC8qKiBNZXNzYWdlIEl0ZW0gdG8gYmUgc2VudCB0byBjaGF0ICovXHJcbiAgICBjb25zdCBtc2dCb2R5OiBpTXNnQm9keSA9IHtcclxuICAgICAgbXNnOiBpbnB1dEhNVEwudmFsdWUsXHJcbiAgICAgIG1zZ0lkOiBjcnlwdG8ucmFuZG9tVVVJRCgpLnJlcGxhY2UoLy0vZywgXCJcIiksXHJcbiAgICAgIGNoYXRJZDogdGhpcy5jaGF0SWQsXHJcbiAgICAgIHNlbmRlck5hbWU6IFwiWW91XCIsXHJcbiAgICAgIHNlbmRlcklkOiB0aGlzLnVzZXJJZCxcclxuICAgICAgdGltZVJlY2VpdmVkOiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogU29ja2V0IEV2ZW50IGFuZCBjYWxsYmFjayBSZXNwb25zZSB1cG9uIHNlbmRpbmcgbWVzc2FnZSB0byBjaGF0ICovXHJcbiAgICBTb2NrZXRNZXRob2RzLnNvY2tldCEuZW1pdChcclxuICAgICAgU29ja2V0TWV0aG9kcy5wb3N0TWVzc2FnZUV2LFxyXG4gICAgICBtc2dCb2R5LFxyXG4gICAgICB0aGlzLnBlZXJJZCxcclxuICAgICAgdGhpcy50eXBlLFxyXG4gICAgICAocmVzOiBpTXNnQm9keSkgPT4ge1xyXG4gICAgICAgIGlmIChcIm1zZ1wiIGluIHJlcykge1xyXG4gICAgICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNyZWF0ZU1zZ0l0ZW0oXHJcbiAgICAgICAgICAgIHJlcyxcclxuICAgICAgICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNoYXRNc2dCb2R5LFxyXG4gICAgICAgICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLFxyXG4gICAgICAgICAgICAwXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIFBlZXJDb21wb25lbnQudXBkYXRlUGVlckxpc3RIVE1MKFxyXG4gICAgICAgICAgICB7IGFjY250X2lkOiB0aGlzLnBlZXJJZCwgY2hhdF9pZDogcmVzLmNoYXRJZCB9IGFzIGlSZWxhdGlvbixcclxuICAgICAgICAgICAgcmVzXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIHRoaXMubXNnc0xpc3RDbnQgPSB0aGlzLm1zZ3NMaXN0Q250ICsgMTtcclxuICAgICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5zZXRNc2dMaXN0SW5mbyh0aGlzLmNoYXRJZCwgcmVzLCBudWxsKTtcclxuXHJcbiAgICAgICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLnNjcm9sbFRvcCA9XHJcbiAgICAgICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgICAgIFwiRVJST1I6IHNlcnZlciBmYWlsZWQgdG8gc2VuZCBtZXNzYWdlXCIsXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlcylcclxuICAgICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgaW5wdXRITVRMLnZhbHVlID0gXCJcIjtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGxpc3RlbmVyIGZ1bmN0aW9uIHJldHJpZXZlcyBhZGRpdGlvbiBtZXNzYWdlIGxpc3QgaXRlbXMgZnJvbSB0YXJnZXQgcGVlciBjaGF0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgRXZlbnQgfSBlIC0gc3BlY2lmaWNhbGx5IGEgc2Nyb2xsIGV2ZW50XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBFdmVudCAtIHNwZWNpZmljYWxseSBhIHNjcm9sbCBldmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0TW9yZU1lc3NhZ2VzID0gYXN5bmMgKGU6IEV2ZW50KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAvLyBEQVRBIEZBVEhFUklOR1xyXG4gICAgY29uc3QgdCA9IGUudGFyZ2V0IGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIGNvbnN0IHNraXBDaGF0UmVxID0gdGhpcy5nZXRDaGF0UmVxQm9keSgpO1xyXG5cclxuICAgIC8vIFZBTElEQVRJT046IGlmIHNjcm9sbCBoZWlnaHQgaXMgbm90IGF0IHRvcCwgcmV0dXJuXHJcbiAgICBpZiAodC5zY3JvbGxUb3AgIT09IDApIHJldHVybjtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBpZiBtZXNzYWdlIGl0ZW1zIGV4Y2VlZCBzdGFydGluZyBza2lwIGl0ZW0sIHJldHVyblxyXG4gICAgY29uc3QgbGlzdENudCA9IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRNc2dMaXN0SW5mb0NvdW50KHRoaXMuY2hhdElkKTtcclxuICAgIGlmICh0aGlzLnNraXAgKiB0aGlzLnNraXBDbnQgPiBsaXN0Q250KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY3VycmVudFNjcm9sbGxIZWlnaHQgPSB0LnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFUVVFU1RcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldE1zZ3MsIHNraXBDaGF0UmVxKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBmZXRjaCBjaGF0IG1lc3NhZ2VzXCIsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgY29uc3QgaHR0cFZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIGBzZXJ2ZXIgZXJyb3Igb2NjdXJlZGAsXHJcbiAgICAgIGBjbGllbnQgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgZm9yIHVwb24gcmVxdWVzdCBmb3IgY2hhdCBtZXNzYWdlc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFZBTElEQVRJT046IGNoZWNrIGlmIHJlc3BvbnNlIGhhcyBhZGRpdGlvbmFsIGRhdGFcclxuICAgIGlmIChyZXNwb25zZS5kYXRhLmRhdGEgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtc2dzOiBpTXNnQm9keVtdID0gcmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3M7XHJcbiAgICAvLyBWQUxJREFUSU9OOiBjaGVjayBpZiBhcnJheSBoYXMgY29udGVudHNcclxuICAgIGlmIChtc2dzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KG1zZ3MpIHx8ICFtc2dzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFBST0NFU1M6IGFkZCBIVE1MIG1lc3NhZ2UgaXRlbXNcclxuICAgIHRoaXMuZ2VuZXJhdGVNc2dJdGVtcyh0aGlzLnVzZXJJZCwgbXNncyBhcyBpTXNnQm9keVtdKTtcclxuXHJcbiAgICAvLyBQUk9DRVNTOiByZXZlcnNlIHJlY2VpdmVkIGFycmF5XHJcbiAgICAvLyBjb25zdCByZXZBcnJNc2dzOiBpTXNnQm9keVtdID0gW107XHJcbiAgICAvLyBsZXQgbXNnOiBpTXNnQm9keTtcclxuXHJcbiAgICAvLyBmb3IgKG1zZyBvZiBtc2dzKSB7XHJcbiAgICAvLyAgIHJldkFyck1zZ3MudW5zaGlmdChtc2cpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIFBST0NFU1M6ICsxIHRvIHNraXBcclxuICAgIHRoaXMuc2tpcCsrO1xyXG4gICAgLy8gUFJPQ0VTUzogYWRkIGxpc3QgaXRlbXMgY291bnRcclxuICAgIHRoaXMubXNnc0xpc3RDbnQgPSB0aGlzLm1zZ3NMaXN0Q250ICsgbXNncy5sZW5ndGg7XHJcblxyXG4gICAgLy8gUFJPQ0VTUzogdXBkYXRlIGNsYXNzIG1lc3NhZ2UgbGlzdFxyXG4gICAgLy8gdGhpcy5tc2dzTGlzdHMuc2V0KHRoaXMuY2hhdElkLCBbXHJcbiAgICAvLyAgIC4uLnRoaXMubXNnc0xpc3RzLmdldCh0aGlzLmNoYXRJZCkhLFxyXG4gICAgLy8gICAuLi5yZXZBcnJNc2dzLFxyXG4gICAgLy8gXSk7XHJcblxyXG4gICAgLy8gUFJPQ0VTUzogdXBkYXRlIHNlc3Npb24gc3RvcmFnZSBtZXNzYWdlIGxpc3RcclxuICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5zZXRNc2dMaXN0SW5mbyh0aGlzLmNoYXRJZCwgbnVsbCwgbXNncyk7XHJcblxyXG4gICAgLy8gUFJPQ0VTUzogbWFpbnRhaW4gY3VycmVudCBzY3JvbGwgbG9jYXRpb25cclxuICAgIHQuc2Nyb2xsVG9wID0gdC5zY3JvbGxIZWlnaHQgLSBjdXJyZW50U2Nyb2xsbEhlaWdodDtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tIENMQVNTIFVUSUxJVFkgLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlciB0byByZXRyaWV2ZSBmaXJzdCBiYXRjaCBvZiBjaGF0IGRhdGEgbWVzc2FnZSBpdGVtcy5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRNZXNzYWdlcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgY29uc3QgY2hhdFJlcUJvZHk6IGlDaGF0UmVxQm9keSA9IHRoaXMuZ2V0Q2hhdFJlcUJvZHkoKTtcclxuXHJcbiAgICAvLyBIVFRQIFJFUVVFU1Q6IHJlcXVlc3QgZm9yIGNoYXQgbWVzc2FnZXNcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldE1zZ3MsIGNoYXRSZXFCb2R5KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBmZXRjaCBjaGF0IG1lc3NhZ2VzXCIsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgY29uc3QgaHR0cFZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIGBzZXJ2ZXIgZXJyb3Igb2NjdXJlZGAsXHJcbiAgICAgIGBjbGllbnQgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgZm9yIHVwb24gcmVxdWVzdCBmb3IgY2hhdCBtZXNzYWdlc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgLy8gLS0tICsxIGZvciBza2lwXHJcbiAgICB0aGlzLnNraXArKztcclxuICAgIC8vIC0tLSBzdG9yZSBtZXNzYWdlSWRcclxuICAgIHRoaXMubXNnc0lkID0gcmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3NJZDtcclxuXHJcbiAgICAvLyAtLS0gc3RvcmUgY2hhdCBtZXNzYWdlcyBhcyBzZXNzaW9uIHN0b3JhZ2VcclxuICAgIC8vIHRoaXMubXNnc0xpc3RzLnNldCh0aGlzLmNoYXRJZCwgcmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3MpO1xyXG4gICAgLy8gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcclxuICAgIC8vICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LnNlc3Npb25TdG9yZUxpc3RLZXkgKyB0aGlzLmNoYXRJZCxcclxuICAgIC8vICAgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UuZGF0YS5kYXRhLm1zZ3MpXHJcbiAgICAvLyApO1xyXG5cclxuICAgIC8vIFBST0NFU1M6IGZ1cnRoZXIgaWYgdGhlIG1lc3NhZ2UgZGF0YSByZXRyaWV2ZWQgaXMgbm90IGVtcHR5IGJ5IGFueSBtZWFuc1xyXG4gICAgaWYgKFxyXG4gICAgICByZXNwb25zZS5kYXRhLmRhdGEubXNncyAhPT0gbnVsbCAmJlxyXG4gICAgICBBcnJheS5pc0FycmF5KHJlc3BvbnNlLmRhdGEuZGF0YS5tc2dzKSAmJlxyXG4gICAgICByZXNwb25zZS5kYXRhLmRhdGEubXNncy5sZW5ndGhcclxuICAgIClcclxuICAgICAgdGhpcy5tc2dzTGlzdENudCA9IHJlc3BvbnNlLmRhdGEuZGF0YS5tc2dzLmxlbmd0aDtcclxuXHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuc2V0TXNnTGlzdEluZm8oXHJcbiAgICAgIHRoaXMuY2hhdElkLFxyXG4gICAgICBudWxsLFxyXG4gICAgICByZXNwb25zZS5kYXRhLmRhdGEubXNncyBhcyBpTXNnQm9keVtdXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZW5kZXJzIHJldHJpZXZlZCBhcnJheSBvZiBtZXNzYWdlIGxpc3QgaXRlbXMgdG8gSFRNTCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHVzZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIGNsaWVudCBsb2dnZWQgaW5cclxuICAgKiBAcGFyYW0geyBpTXNnQm9keVtdIH0gbXNncyAtIE1lc3NhZ2UgTGlzdCBJdGVtcyBBcnJheSBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlcidzIGNoYXQgZGF0YS5cclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGdlbmVyYXRlTXNnSXRlbXMgPSAoXHJcbiAgICB1c2VySWQ6IHN0cmluZyxcclxuICAgIG1zZ3M6IGlNc2dCb2R5W11cclxuICApOiB2b2lkID0+IHtcclxuICAgIGxldCBtc2c6IGlNc2dCb2R5O1xyXG5cclxuICAgIGlmIChtc2dzID09PSBudWxsIHx8ICFBcnJheS5pc0FycmF5KG1zZ3MpIHx8ICFtc2dzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgIGZvciAobXNnIG9mIG1zZ3MpIHtcclxuICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmNyZWF0ZU1zZ0l0ZW0oXHJcbiAgICAgICAgbXNnLFxyXG4gICAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5jaGF0TXNnQm9keSxcclxuICAgICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLFxyXG4gICAgICAgIHVzZXJJZCA9PT0gbXNnLnNlbmRlcklkID8gMCA6IDEsXHJcbiAgICAgICAgdHJ1ZVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhbiBvYmplY3QgZm9yIHRoZSB1c2VyJ3Mgb3V0Z29pbmcgcmVxdWVzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGUgLSBjaGF0IHR5cGUgb2YgdGhlIHVzZXIncyB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSByZWNlaXZlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgdXNlcidzIHJlcXVlc3QgcmVjaXBpZW50XHJcbiAgICogQHJldHVybnMgeyBpUmVxdWVzdEJvZHkgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyBjcmVhdGVSZXF1ZXN0Qm9keSh0eXBlOiBpQ2hhdFR5cGUsIHJlY2VpdmVySWQ6IHN0cmluZyk6IGlSZXF1ZXN0Qm9keSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiB0eXBlID09PSBcInVzZXJcIiA/IDEgOiAyLFxyXG4gICAgICByZWNpcGllbnRJZDogdHlwZSA9PT0gXCJ1c2VyXCIgPyByZWNlaXZlcklkISA6IG51bGwsXHJcbiAgICAgIGdyb3VwSWQ6IHR5cGUgPT09IFwiZ3JvdXBcIiA/IHJlY2VpdmVySWQhIDogbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHRyYW5zZm9ybXMgdGhlIG1lc3NhZ2UgbGlzdCBpdGVtIG9iamVjdCBpbnRvIGEgSFRNTGVsZW1lbnQgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBNZXNzYWdlQ29tcG9uZW50TGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5IH0gbXNnXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSBjaGF0TXNnc0xpc3RXcmFwXHJcbiAgICogQHBhcmFtIHsgMCB8IDF9IHR5cGVcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gaXNGZXRjaGVkXHJcbiAgICogQHJldHVybnNcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlTXNnSXRlbSA9IChcclxuICAgIG1zZzogaU1zZ0JvZHksXHJcbiAgICB3cmFwOiBIVE1MRGl2RWxlbWVudCxcclxuICAgIGNoYXRNc2dzTGlzdFdyYXA6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgLy8gMCAtIGZyb20gY2xpZW50IGJyb3dzZXIgICAgICAxIC0gZnJvbSBvdGhlciB1c2VyKHMpXHJcbiAgICB0eXBlOiAwIHwgMSxcclxuICAgIGlzRmV0Y2hlZDogYm9vbGVhbiA9IGZhbHNlXHJcbiAgKSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgIG1zZy5jaGF0SWQgIT09IE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCkuZGF0YXNldC5jaGF0SWRcclxuICAgICkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtc2cuY2hhdElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1zZ1dyYXBXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnN0IG1zZ1dyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGNvbnN0IG1zZ1NlbmRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBtc2dTZW5kZXIudGV4dENvbnRlbnQgPSB0eXBlID8gbXNnLnNlbmRlck5hbWUgOiBcIllvdVwiO1xyXG4gICAgbXNnU2VuZGVyLmRhdGFzZXQubXNnSWQgPSBtc2cubXNnSWQ7XHJcbiAgICBjb25zdCBtc2dDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICBtc2dDb250ZW50LnRleHRDb250ZW50ID0gbXNnLm1zZztcclxuXHJcbiAgICBjb25zdCBtc2dUaW1lV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCBtc2dUaW1lU3ViID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN1YlwiKTtcclxuICAgIGNvbnN0IG1zZ1RpbWVTdWJTdWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3ViXCIpO1xyXG4gICAgbXNnVGltZVN1YlN1Yi50ZXh0Q29udGVudCA9IEdlblV0aWwubWlsbGlUb1RpbWUoXHJcbiAgICAgIHR5cGVvZiBtc2cudGltZVJlY2VpdmVkICE9PSBcIm51bWJlclwiXHJcbiAgICAgICAgPyBwYXJzZUludChtc2cudGltZVJlY2VpdmVkKVxyXG4gICAgICAgIDogbXNnLnRpbWVSZWNlaXZlZFxyXG4gICAgKTtcclxuICAgIG1zZ1RpbWVTdWIuYXBwZW5kQ2hpbGQobXNnVGltZVN1YlN1Yik7XHJcbiAgICBtc2dUaW1lV3JhcC5hcHBlbmRDaGlsZChtc2dUaW1lU3ViKTtcclxuXHJcbiAgICBtc2dXcmFwLmFwcGVuZENoaWxkKG1zZ1NlbmRlcik7XHJcbiAgICBtc2dXcmFwLmFwcGVuZENoaWxkKG1zZ0NvbnRlbnQpO1xyXG4gICAgbXNnV3JhcC5hcHBlbmRDaGlsZChtc2dUaW1lV3JhcCk7XHJcblxyXG4gICAgbXNnV3JhcFdyYXAuYXBwZW5kQ2hpbGQobXNnV3JhcCk7XHJcblxyXG4gICAgbXNnV3JhcFdyYXAuY2xhc3NMaXN0LmFkZCh0eXBlID8gdGhpcy5wZWVyTXNnQ2xhc3MgOiB0aGlzLm15TXNnQ2xhc3MpO1xyXG5cclxuICAgIGlmIChpc0ZldGNoZWQpIHdyYXAucHJlcGVuZChtc2dXcmFwV3JhcCk7XHJcbiAgICBlbHNlIHdyYXAuYXBwZW5kKG1zZ1dyYXBXcmFwKTtcclxuXHJcbiAgICAvLyA8ZGl2IGNsYXNzPVwiY2hhdC1tc2ctb3RoZXJzXCI+XHJcbiAgICAvLyAgIDxkaXY+XHJcbiAgICAvLyAgICAgPGRpdj5TZW5kZXI8L2Rpdj5cclxuICAgIC8vICAgICA8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldDwvcD5cclxuICAgIC8vICAgICA8ZGl2PlxyXG4gICAgLy8gICAgICAgPHN1Yj48c3ViPjk6MDAuQU08L3N1Yj48L3N1Yj5cclxuICAgIC8vICAgICA8L2Rpdj5cclxuICAgIC8vICAgPC9kaXY+XHJcbiAgICAvLyA8L2Rpdj5cclxuICAgIC8vXHJcbiAgICAvLyA8ZGl2IGNsYXNzPVwiY2hhdC1tc2ctbWluZVwiPlxyXG4gICAgLy8gICA8ZGl2PlxyXG4gICAgLy8gICAgIDxkaXY+U2VuZGVyPC9kaXY+XHJcbiAgICAvLyAgICAgPHA+XHJcbiAgICAvLyAgICAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldC4gTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXRcclxuICAgIC8vICAgICAgIGNvbnNlY3RldHVyIGFkaXBpc2ljaW5nIGVsaXQuIEVvcyBwbGFjZWF0IGlwc2FtIGlkIGVpdXNcclxuICAgIC8vICAgICAgIGRlYml0aXMsIG5hdHVzIGV2ZW5pZXQgbWFpb3JlcyBpbmNpZHVudCBtYXhpbWUgbm9iaXMhXHJcbiAgICAvLyAgICAgPC9wPlxyXG4gICAgLy8gICAgIDxkaXY+XHJcbiAgICAvLyAgICAgICA8c3VwPjxzdWI+OTowMC5BTTwvc3ViPjwvc3VwPlxyXG4gICAgLy8gICAgIDwvZGl2PlxyXG4gICAgLy8gICA8L2Rpdj5cclxuICAgIC8vIDwvZGl2PlxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhbiBvYmplY3QgdG8gYmUgdXNlIGZvciByZXF1ZXN0aW5nIHN1YnNlcXVlbnQgYmF0Y2ggb2YgbWVzc2FnZSBsaXN0IGl0ZW1zLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBpQ2hhdFJlcUJvZHkgfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZ2V0Q2hhdFJlcUJvZHkoKTogaUNoYXRSZXFCb2R5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNraXA6IHRoaXMuc2tpcCxcclxuICAgICAgdHlwZTogdGhpcy50eXBlLFxyXG4gICAgICBjaGF0SWQ6IHRoaXMuY2hhdElkLFxyXG4gICAgICBsaXN0Q250OiB0aGlzLm1zZ3NMaXN0Q250LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gY29udHJvbHMgcmV0dXJucyBpdHMgY29uc3RydWN0b3IgaW5zdGFuY2UgJiB3aGV0aGVyIE1lc3NhZ2VzTGlzdENvbXBvbmVudCBlaXRoZXI6XHJcbiAgICogLSBjYWxsIGEgbmV3IGNsYXNzIGZvciBhIG5ldyBwZWVyIG1lc3NhZ2UgY29tcG9uZW50XHJcbiAgICogLSBkZWxldGUgY2xhc3MgYW5kIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gdXNlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgY2xpZW50IGxvZ2dlZCBpblxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSBhdmFpbGFiaWxpdHkgc2V0dGluZyBvZiB0aGUgdXNlciB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlIC0gY2hhdCB0eXBlIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGZyb21QZWVyIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIHRhcmdldCBpcyBmcm9tIHRoZSBwZWVyIGxpc3RcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZGVsZXRlSW5zdGFuY2UgLSBmbGFnIGluZGljYXRpbmcgaWYgdXNlciB0YXJnZXQgY29tcCBpcyB0byBiZSBkZWxldGVkXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7IE1lc3NhZ2VzTGlzdENvbXBvbmVudCB8IG51bGwgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBpbml0ID0gKFxyXG4gICAgdXNlcklkOiBzdHJpbmcsXHJcbiAgICBwZWVySWQ6IHN0cmluZyxcclxuICAgIHBlZXJOYW1lOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZyxcclxuICAgIGF2YWlsYWJpbGl0eTogYm9vbGVhbixcclxuICAgIHR5cGU6IGlDaGF0VHlwZSxcclxuICAgIGZyb21QZWVyOiBib29sZWFuLFxyXG4gICAgZGVsZXRlSW5zdGFuY2U6IGJvb2xlYW5cclxuICApOiBNZXNzYWdlc0xpc3RDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghZGVsZXRlSW5zdGFuY2UpIHtcclxuICAgICAgLy8gY2FsbHMgZm9yIGEgbmV3IGluc3RhbmNlIGlmIHRoZXJlIGlzIG5vIHByZXZpb3VzIGNhbGxlZCBpbnN0YW5jZVxyXG4gICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE1lc3NhZ2VzTGlzdENvbXBvbmVudChcclxuICAgICAgICAgIHVzZXJJZCxcclxuICAgICAgICAgIHBlZXJJZCxcclxuICAgICAgICAgIHBlZXJOYW1lLFxyXG4gICAgICAgICAgY2hhdElkLFxyXG4gICAgICAgICAgYXZhaWxhYmlsaXR5LFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGZyb21QZWVyXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gc2V0cyBuZXcgbWFpbiBjb21wb25lbnQgZGl2IGVsZW1lbnRcclxuICAgICAgICB0aGlzLmNoYXRNc2dzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICBcIi5jaGF0LW1zZy1saXN0XCJcclxuICAgICAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGUgPT09IFwidXNlclwiKSBHcm91cENvbXBvbmVudC5nZXRJbnN0YW5jZShwZWVySWQsIHR5cGUsIHRydWUpO1xyXG5cclxuICAgICAgdGhpcy5pbnN0YW5jZSA9IG51bGw7XHJcbiAgICAgIHRoaXMuY2hhdE1zZ3NMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfTtcclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhdmFpbGFibGUgTWVzc2FnZUxpc3RDb21wb25lbnQgaW5zdGFuY2UgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdCA9ICgpOiBNZXNzYWdlc0xpc3RDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IEdlblV0aWwgfSBmcm9tIFwiLi4vdXRpbC9nZW4udXRpbFwiO1xyXG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gXCIuLi91dGlsL2FzeW5jV3JhcC51dGlsXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvbi51dGlsXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcFwiO1xyXG5pbXBvcnQgeyBodHRwR2V0R3JvdXAgfSBmcm9tIFwiLi4vaG9va3MvcmVxdWVzdHMuaG9va1wiO1xyXG5pbXBvcnQgeyBpSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9odHRwLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlWYWxpZGl0eVR5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL3ZhbGlkaXR5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IFNvY2tldE1ldGhvZHMgfSBmcm9tIFwiLi4vdXRpbC9zb2NrZXQudXRpbFwiO1xyXG5pbXBvcnQgeyBFcnJvckNvbXBvbmVudCBhcyBlcnJvciB9IGZyb20gXCIuL2Vycm9yLmNvbXBcIjtcclxuaW1wb3J0IHsgaUNoYXRUeXBlLCBpUmVxdWVzdEJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2dlbi5tb2RlbFwiO1xyXG5pbXBvcnQge1xyXG4gIGlSZWxhdGlvbixcclxuICBpUmVxdWVzdCxcclxuICBpUmVxdWVzdEFjdGlvbnMsXHJcbiAgcmVxdWVzdEFjdGlvbnMsXHJcbn0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBob2xkcyBmdW5jdGlvbnMgd2hpY2ggbWFuYWdlIGFuZCByZW5kZXIgZGF0YSByZWxhdGVkIHRvIHRoZSB1c2VyIGFuZCB0aGVpciBwZWVyKHMpJyBtZXNzYWdlIG9wdGlvbnMgYW5kIGl0cyBpdGVtcy5cclxuICpcclxuICogQGV4dGVuZHMgQ29tcG9uZW50XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PFxyXG4gIEhUTUxEaXZFbGVtZW50LFxyXG4gIEhUTUxFbGVtZW50XHJcbj4ge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQgfCBudWxsO1xyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRNc2dzT3B0czogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBtc2dPcHRzTWVtYmVyc2hpcCE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIG1zZ09wdHNJbmNvbWluZ1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIG1zZ09wdHNPdXRnb2luZ1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgc3RhdGljIG1zZ09wdHNBZG1pbnNnV3JhcDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgbXNnT3B0c01lbWJlcnNXcmFwOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgLyoqIEFycmF5IG9mIEhUTUwgZGl2IGVsZW1lbnRzIGNvbnRhaW5pbmcgY2xpY2thYmxlIGV2ZW50cy4gKi9cclxuICBwcml2YXRlIG1zZ09wdHNIZWFkcyE6IEhUTUxEaXZFbGVtZW50W107XHJcblxyXG4gIC8qKiBHcm91cCBkYXRhIGZyb20gSWQsIG5hbWUsIHJlcXVlc3RzLCAmIHJlbGF0aW9ucy4gKi9cclxuICBwcml2YXRlIG1zZ0dycEluZm8hOiB7XHJcbiAgICBhY2NudF9uYW1lOiBzdHJpbmc7XHJcbiAgICBhY2NudF9pZDogc3RyaW5nO1xyXG4gICAgcHJpdmFjeTogYm9vbGVhbjtcclxuICAgIHJlcXVlc3RzOiB7XHJcbiAgICAgIGluY29taW5nOiBpUmVxdWVzdFtdO1xyXG4gICAgICBvdXRnb2luZzogaVJlcXVlc3RbXTtcclxuICAgIH07XHJcbiAgICByZWxhdGlvbnM6IGlSZWxhdGlvbltdO1xyXG4gIH07XHJcbiAgLyoqIENoYXQgVHlwZSBvZiB0aGUgdGFyZ2V0IHBlZXIuICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgc1R5cGU6IGlDaGF0VHlwZTtcclxuICAvKiogQ2hhdCBJRCBiZXR3ZWVuIHRoZSB1c2VyICYgdGhlIHRhcmdldCBwZWVyKHMpIGNoYXQgZGF0YS4gKi9cclxuICBwcml2YXRlIHN0YXRpYyBzQ2hhdElkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gaW5zdGFudGlhdGlvbiwgaWYgdGhlIHBlZXIgdHlwZSBpcyAnZ3JvdXAnLCB0aGUgY29uc3RydWN0b3Igd2lsbCBjYWxsIGZvciB0aGUgZ3JvdXAgZGF0YS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJJZCAtIGFjY291bnQgaWQgb2YgdGhlIHVzZXIncyB0YXJnZXQgY29ubmVjdGVkIHBlZXJcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBwZWVyTmFtZSAtIGFjY291bnQgbmFtZSBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGNoYXRJZCAtIGNoYXQgaWQgYmV0d2VlbiB0aGUgdXNlciAmIHBlZXIgfCBncm91cFxyXG4gICAqIEBwYXJhbSB7IGlDaGF0VHlwZSB9IHR5cGUgLSBjaGF0IHR5cGUgb2YgdGhlIHVzZXIncyB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gYXZhaWxhYmlsaXR5IC0gYXZhaWxhYmlsaXR5IHNldHRpbmcgb2YgdGhlIHVzZXIgdGFyZ2V0XHJcbiAgICogQHBhcmFtIHsgYm9vbGVhbiB9IGZyb21QZWVyIC0gZmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIHRhcmdldCBpcyBmcm9tIHRoZSBwZWVyIGxpc3RcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBlZXJJZDogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwZWVyTmFtZTogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjaGF0SWQ6IHN0cmluZyxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgdHlwZTogaUNoYXRUeXBlLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBhdmFpbGFiaWxpdHk6IGJvb2xlYW4sXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGZyb21QZWVyOiBib29sZWFuXHJcbiAgKSB7XHJcbiAgICBzdXBlcihcIi5jaGF0LW1zZ3NcIiwgXCJtc2dzLW9wdHMtdGVtcFwiLCBcImFmdGVyYmVnaW5cIik7XHJcbiAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50eXBlID09PSBcImdyb3VwXCIgJiYgdGhpcy5mcm9tUGVlcikgYXdhaXQgdGhpcy5nZXRHcm91cChwZWVySWQpO1xyXG5cclxuICAgICAgdGhpcy5jb25maWd1cmVDb21wb25lbnQoKTtcclxuICAgICAgdGhpcy5yZW5kZXJDb21wb25lbnQoKTtcclxuICAgIH0pKCk7XHJcbiAgfVxyXG5cclxuICBjb25maWd1cmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuc1R5cGUgPSB0aGlzLnR5cGU7XHJcbiAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuc0NoYXRJZCA9IHRoaXMuY2hhdElkO1xyXG5cclxuICAgIE9iamVjdC5mcmVlemUoTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LnNUeXBlKTtcclxuICAgIE9iamVjdC5mcmVlemUoTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LnNDaGF0SWQpO1xyXG5cclxuICAgIHRoaXMubXNnT3B0c0hlYWRzID0gW1xyXG4gICAgICAuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNoYXQtbXNnLW9wdHMtaGVhZFwiKSxcclxuICAgIF0hIGFzIEhUTUxEaXZFbGVtZW50W107XHJcbiAgICB0aGlzLm1zZ09wdHNNZW1iZXJzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIjY2hhdC1tc2ctb3B0cy1tZW1iZXJzaGlwc1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5tc2dPcHRzSW5jb21pbmdXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1tc2ctb3B0cy1pbmNvbWluZy13cmFwXCJcclxuICAgICkgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQubXNnT3B0c091dGdvaW5nV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLW9wdHMtb3V0Z29pbmctd3JhcFwiXHJcbiAgICApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50Lm1zZ09wdHNBZG1pbnNnV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtbXNnLW9wdHMtYWRtaW5zLXdyYXBcIlxyXG4gICAgKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5tc2dPcHRzTWVtYmVyc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LW1zZy1vcHRzLW1lbWJlcnMtd3JhcFwiXHJcbiAgICApIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZ3JvdXBcIilcclxuICAgICAgdGhpcy5tc2dPcHRzTWVtYmVyc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja0dyb3VwUmVxdWVzdCk7XHJcblxyXG4gICAgdGhpcy5jaGF0VG9nZ2xlVXNlclNlY3Rpb24oKTtcclxuICB9XHJcbiAgcmVuZGVyQ29tcG9uZW50KCk6IHZvaWQge1xyXG4gICAgY29uc3QgbXNnT3B0c0hUTUwgPSBbLi4udGhpcy53cmFwcGVyRWxlbWVudC5jaGlsZHJlbl1bMF07XHJcblxyXG4gICAgaWYgKHRoaXMuZnJvbVBlZXIgJiYgdGhpcy50eXBlID09PSBcInVzZXJcIikge1xyXG4gICAgICBtc2dPcHRzSFRNTC5pbm5lckhUTUwgPSBcIkNoYXQgc2V0dGluZ3MgaXMgb25seSBhdmFpbGFibGUgZm9yIGdyb3VwIGNoYXRzXCI7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuZnJvbVBlZXIpIHtcclxuICAgICAgbXNnT3B0c0hUTUwuaW5uZXJIVE1MID1cclxuICAgICAgICBcIkNoYXQgc2V0dGluZ3MgaXMgb25seSBhdmFpbGFibGUgZm9yIHJlbGF0ZWQgcGVlcnNcIjtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVSZXF1ZXN0cygpO1xyXG4gICAgdGhpcy5nZW5lcmF0ZUFkbWlucygpO1xyXG4gICAgdGhpcy5nZW5lcmF0ZU1lbWJlcnMoKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLSBHRVQgfCBTRVQgLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0TXNnT3B0c0luY29taW5nV3JhcCA9ICgpOiBIVE1MRGl2RWxlbWVudCA9PiB7XHJcbiAgICByZXR1cm4gdGhpcy5tc2dPcHRzSW5jb21pbmdXcmFwO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldE1zZ09wdHNPdXRnb2luZ1dyYXAgPSAoKTogSFRNTERpdkVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubXNnT3B0c091dGdvaW5nV3JhcDtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRNc2dPcHRzQWRtaW5zZ1dyYXAgPSAoKTogSFRNTERpdkVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubXNnT3B0c0FkbWluc2dXcmFwO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldE1zZ09wdHNNZW1iZXJzV3JhcCA9ICgpOiBIVE1MRGl2RWxlbWVudCA9PiB7XHJcbiAgICByZXR1cm4gdGhpcy5tc2dPcHRzTWVtYmVyc1dyYXA7XHJcbiAgfTtcclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLSBFVkVOVCBIQU5ETEVSUyAtLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gYWRkcyBhbiBldmVudCBsaXN0ZW5lciB0byBtZXNzYWdlIG9wdGlvbiBoZWFkIGVsZW1lbnRzLlxyXG4gICAqXHJcbiAgICogQGZpcmVzIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNoYXRUb2dnbGVVc2VyU2VjdGlvbiA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMubXNnT3B0c0hlYWRzLmZvckVhY2goKGhlYWQ6IEhUTUxEaXZFbGVtZW50KSA9PiB7XHJcbiAgICAgIGhlYWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tNc2dPcHRzU2VjdGlvbkhhbmRsZXIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBjYWxsYmFjayBsaXN0ZW5zIHRvIGNsaWNrIGV2ZW50cyB3aGljaCB3aWxsIHRvZ2dsZSB2aXNpYmlsaXR5IG9mIHNwZWNpZmljIG1lc3NhZ2Ugb3B0aW9uIHNlY3Rpb25zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrTXNnT3B0c1NlY3Rpb25IYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGhlYWRJY29uOiBIVE1MRWxlbWVudCA9IChcclxuICAgICAgZS50YXJnZXQgYXMgSFRNTEhlYWRpbmdFbGVtZW50XHJcbiAgICApLnF1ZXJ5U2VsZWN0b3IoXCJpXCIpISBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGhlYWRTaWJsaW5nOiBIVE1MRWxlbWVudCA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudClcclxuICAgICAgLm5leHRFbGVtZW50U2libGluZyEgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaGVhZEljb24uY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtbXNnLW9wdHMtaGVhZC10b2dnbGVkXCIpO1xyXG4gICAgaGVhZFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtbXNnLW9wdHMtY29udGVudC10b2dnbGVcIik7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBjYWxsYmFjayBsaXN0ZW5zIHRvIGNsaWNrIGV2ZW50cyB3aGljaCB3aWxsIGVtaXQgYSBzb2NrZXQgZXZlbnQgdG8gdGhlIHNlcnZlciB0byByZXNwb25kIHRvIHBlZXIgcmVxdWVzdHMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tHcm91cFJlcXVlc3QgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgcmVxQm9keSA9IHRoaXMuY3JlYXRlUmVxdWVzdEJvZHkoXHJcbiAgICAgIHRoaXMucGVlcklkLFxyXG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8uZGF0YXNldC51c2VySWQgYXMgc3RyaW5nXHJcbiAgICApO1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGFyZ2V0LmRhdGFzZXQucmVxdWVzdEFjdGlvbiBhcyBpUmVxdWVzdEFjdGlvbnM7XHJcblxyXG4gICAgaWYgKCFhY3Rpb24pIHJldHVybjtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCByZXF1ZXN0VmFsaWQgPSBWYWxpZGF0ZS5wYXRjaFJlcXVlc3REYXRhKHJlcUJvZHksIGFjdGlvbik7XHJcbiAgICBpZiAoIXJlcXVlc3RWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IGNsaWVudCBkYXRhIGZvciBncm91cCByZXF1ZXN0IGFjdGlvbiBpcyBpbnZhbGlkYCxcclxuICAgICAgICByZXF1ZXN0VmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTT0NLRVQgUkVRVUVTVFxyXG4gICAgaWYgKHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJyZXF1ZXN0LWFjdGlvblwiKSkge1xyXG4gICAgICBTb2NrZXRNZXRob2RzLnNvY2tldD8uZW1pdChTb2NrZXRNZXRob2RzLnBhdGNoUmVxdWVzdEV2LCByZXFCb2R5LCBhY3Rpb24pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJlcXVlc3RzIGFuIEhUVFAgR0VUIHRvIHRoZSBzZXJ2ZXIgdG8gcmV0cmlldmUgZ3JvdXAgZGF0YS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGlkIC0gR3JvdXAgSWRcclxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8dm9pZD4gfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZ2V0R3JvdXAgPSBhc3luYyAoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldEdyb3VwLCBpZCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gZmV0Y2ggZ3JvdXAgZGF0YVwiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGVycm9yIG9jY3VyZWRgLFxyXG4gICAgICBgY2xpZW50IHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIGZvciB1cG9uIHJlcXVlc3QgZm9yIGdyb3VwIGluZm9ybWF0aW9uYFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgdGhpcy5tc2dHcnBJbmZvID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb246XHJcbiAgICogLSBzZW5kcyByZXRyaWV2ZWQgR3JvdXAgRGF0YSBSZXF1ZXN0cyB0byBhbiBIVE1MIGVsZW1lbnRzIHRyYW5zZm9ybWluZyBmdW5jdGlvblxyXG4gICAqIC0gZGVjaWRlcyB0eXBlIG9mIHJlbmRpdGlvblxyXG4gICAqIC0gJiB3aGVyZSB0byBhdHRhY2ggcmVxdWVzdCByZW5kaXRpb25zIHdpdGhpbiBNZXNzYWdlIE9wdGlvbnMgUmVxdWVzdCBTZWN0aW9uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZVJlcXVlc3RzKCk6IHZvaWQge1xyXG4gICAgaWYgKFxyXG4gICAgICAhdGhpcy5tc2dHcnBJbmZvIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLm1zZ0dycEluZm8gIT09IFwib2JqZWN0XCIgfHxcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5tc2dHcnBJbmZvKS5sZW5ndGggPCAxXHJcbiAgICApXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBpbmNvbWluZyA9IHRoaXMubXNnR3JwSW5mby5yZXF1ZXN0cy5pbmNvbWluZztcclxuICAgIGNvbnN0IG91dGdvaW5nID0gdGhpcy5tc2dHcnBJbmZvLnJlcXVlc3RzLm91dGdvaW5nO1xyXG5cclxuICAgIGxldCBpdGVtOiBpUmVxdWVzdDtcclxuXHJcbiAgICBmb3IgKGl0ZW0gb2YgaW5jb21pbmcpIHtcclxuICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmNyZWF0ZVJlcXVlc3QoXHJcbiAgICAgICAgaXRlbSxcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c0luY29taW5nV3JhcCgpLFxyXG4gICAgICAgIFwiaW5jb21pbmdcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaXRlbSBvZiBvdXRnb2luZykge1xyXG4gICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuY3JlYXRlUmVxdWVzdChcclxuICAgICAgICBpdGVtLFxyXG4gICAgICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRNc2dPcHRzT3V0Z29pbmdXcmFwKCksXHJcbiAgICAgICAgXCJvdXRnb2luZ1wiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSByZW5kZXJzIGdyb3VwIHJlcXVlc3QgZGF0YSB0byBhbiBIVE1MIGVsZW1lbnQgYW5kXHJcbiAgICogLSBhdHRhY2ggcmVxdWVzdCByZW5kaXRpb25zIHdpdGhpbiBNZXNzYWdlIE9wdGlvbnMgUmVxdWVzdCBTZWN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVxdWVzdCB9IGl0ZW0gLSBncm91cCByZXF1ZXN0IGl0ZW1cclxuICAgKiBAcGFyYW0geyBIVE1MRGl2RWxlbWVudCB9IHdyYXBwZXJcclxuICAgKiBAcGFyYW0geyBcImluY29taW5nXCIgfCBcIm91dGdvaW5nXCIgfSB0eXBlIC0gcmVxdWVzdCByZW5kaXRpb24gc2VjdGlvbiBpbmRpY2F0b3JcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBjaGF0SWQgLSB1c2VkIHRvIHZlcmlmeSBvZiB0aGUgcmVxdWVzdCBpdGVtIGJlbG9uZ3MgdG8gYSB1c2VyXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZVJlcXVlc3QgPSAoXHJcbiAgICBpdGVtOiBpUmVxdWVzdCxcclxuICAgIHdyYXBwZXI6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgdHlwZTogXCJpbmNvbWluZ1wiIHwgXCJvdXRnb2luZ1wiLFxyXG4gICAgY2hhdElkPzogc3RyaW5nXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICBpdGVtID0gR2VuVXRpbC5yZXF1ZXN0U3RySW50VG9Cb29sKGl0ZW0pIGFzIGlSZXF1ZXN0O1xyXG5cclxuICAgIGlmIChjaGF0SWQgIT09IHVuZGVmaW5lZClcclxuICAgICAgaWYgKHRoaXMuc1R5cGUgPT09IFwidXNlclwiIHx8IHRoaXMuc0NoYXRJZCAhPT0gY2hhdElkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdFZhbGlkOiBpVmFsaWRpdHlUeXBlID0gVmFsaWRhdGUucmVxdWVzdEl0ZW0oXHJcbiAgICAgIGl0ZW0sXHJcbiAgICAgIHdyYXBwZXIsXHJcbiAgICAgIHR5cGVcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFyZXF1ZXN0VmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogUmVxdWVzdCBpdGVtIGRhdGEgaXMgaW52YWxpZFwiLFxyXG4gICAgICAgIHJlcXVlc3RWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICBjb25zdCBpdGVtQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgbGV0IGl0ZW1DYW5jZWwhOiBIVE1MRWxlbWVudDtcclxuICAgIGxldCBpdGVtQXBwcm92ZSE6IEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGl0ZW1SZWplY3QhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gXCJvdXRnb2luZ1wiKSB7XHJcbiAgICAgIGl0ZW1DYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgIGl0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LW1zZy1vcHRzLW91dGdvaW5nLWl0ZW1cIik7XHJcbiAgICAgIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gaXRlbS5hY2NudF9uYW1lO1xyXG4gICAgICBpdGVtQ2FuY2VsLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLXhtYXJrXCIsIFwicmVxdWVzdC1hY3Rpb25cIik7XHJcbiAgICAgIGl0ZW1DYW5jZWwuZGF0YXNldC5yZXF1ZXN0QWN0aW9uID0gcmVxdWVzdEFjdGlvbnMuY2FuY2VsO1xyXG5cclxuICAgICAgaXRlbUFjdGlvbnMuYXBwZW5kQ2hpbGQoaXRlbUNhbmNlbCk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiaW5jb21pbmdcIikge1xyXG4gICAgICBpdGVtQXBwcm92ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICBpdGVtUmVqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgICBpdGVtV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1tc2ctb3B0cy1pbmNvbWluZy1pdGVtXCIpO1xyXG4gICAgICBpdGVtTmFtZS50ZXh0Q29udGVudCA9IGl0ZW0uYWNjbnRfbmFtZTtcclxuICAgICAgaXRlbUFwcHJvdmUuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEtY2hlY2tcIiwgXCJyZXF1ZXN0LWFjdGlvblwiKTtcclxuICAgICAgaXRlbUFwcHJvdmUuZGF0YXNldC5yZXF1ZXN0QWN0aW9uID0gcmVxdWVzdEFjdGlvbnMuYXBwcm92ZTtcclxuICAgICAgaXRlbVJlamVjdC5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS14bWFya1wiLCBcInJlcXVlc3QtYWN0aW9uXCIpO1xyXG4gICAgICBpdGVtUmVqZWN0LmRhdGFzZXQucmVxdWVzdEFjdGlvbiA9IHJlcXVlc3RBY3Rpb25zLnJlamVjdDtcclxuXHJcbiAgICAgIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGl0ZW1BcHByb3ZlKTtcclxuICAgICAgaXRlbUFjdGlvbnMuYXBwZW5kQ2hpbGQoaXRlbVJlamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVdyYXAuZGF0YXNldC51c2VySWQgPSBpdGVtLmFjY250X2lkO1xyXG4gICAgaXRlbVdyYXAuZGF0YXNldC5pc0dyb3VwID0gaXRlbS5pc0dyb3VwID8gYHRydWVgIDogYGZhbHNlYDtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1BY3Rpb25zKTtcclxuXHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGl0ZW1XcmFwKTtcclxuXHJcbiAgICAvLyBIVE1MIFRFTVBMQVRFIC0gaW5jb21pbmcgcmVxdWVzdCBpdGVtXHJcbiAgICAvLyA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1vcHRzLWluY29taW5nLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5pbmNvbWluZyBtZW1iZXIgcmVxdWVzdDwvcD5cclxuICAgIC8vICAgPHA+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLWNoZWNrJz48L2k+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLXhtYXJrJz48L2k+XHJcbiAgICAvLyAgIDwvcD5cclxuICAgIC8vIDwvZGl2PjtcclxuXHJcbiAgICAvLyBIVE1MIFRFTVBMQVRFIC0gb3V0Z29pbmcgcmVxdWVzdCBpdGVtXHJcbiAgICAvLyA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1vcHRzLW91dGdvaW5nLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5vdXRnb2luZyBtZW1iZXIgcmVxdWVzdDwvcD5cclxuICAgIC8vICAgPHA+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLXhtYXJrJz48L2k+XHJcbiAgICAvLyAgIDwvcD5cclxuICAgIC8vIDwvZGl2PjtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBmZWVkcyBhcnJheSBvZiBncm91cCBhZG1pbnMgZGF0YSBIVE1MIGVsZW1lbnRzIHJlbmRlcmluZyBmdW5jdGlvbiBjb3JyZXNwb25kaW5nIHRvIGdyb3VwIGFkbWlucy4gKi9cclxuICBwcml2YXRlIGdlbmVyYXRlQWRtaW5zKCk6IHZvaWQge1xyXG4gICAgY29uc3QgYWRtaW5zID0gdGhpcy5tc2dHcnBJbmZvLnJlbGF0aW9ucyBhcyBpUmVsYXRpb25bXTtcclxuICAgIGxldCBhZG1pbjogaVJlbGF0aW9uO1xyXG5cclxuICAgIGZvciAoYWRtaW4gb2YgYWRtaW5zKSB7XHJcbiAgICAgIGFkbWluID0gR2VuVXRpbC5yZWxhdGlvblN0ckludFRvQm9vbChhZG1pbik7XHJcbiAgICAgIGlmICghYWRtaW4uYWRtaW4pIGNvbnRpbnVlO1xyXG5cclxuICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmNyZWF0ZUFkbWluKFxyXG4gICAgICAgIGFkbWluLFxyXG4gICAgICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRNc2dPcHRzQWRtaW5zZ1dyYXAoKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB0cmFuc2Zvcm1zIGdyb3VwIGFkbWluIHJlbGF0aW9uIG9iamVjdHMgaW50byBhIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50IGFuZCBhdHRhY2hlcyBpdCB0byB0aGUgTWVzc2FnZSBPcHRpb24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVsYXRpb24gfSBpdGVtIC0gZ3JvdXAgcmVsYXRpb24gaXRlbSBmb3IgYWRtaW5zXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZUFkbWluID0gKFxyXG4gICAgaXRlbTogaVJlbGF0aW9uLFxyXG4gICAgd3JhcDogSFRNTERpdkVsZW1lbnRcclxuICApOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IGl0ZW1XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGl0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LW1zZy1vcHRzLWFkbWluLWl0ZW1cIik7XHJcblxyXG4gICAgY29uc3QgaXRlbU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gaXRlbS5hY2NudF9uYW1lO1xyXG5cclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIHdyYXAuYXBwZW5kQ2hpbGQoaXRlbVdyYXApO1xyXG5cclxuICAgIC8vIEhUTUwgVEVNUExBVEUgLSBhZG1pbiBpdGVtXHJcbiAgICAvLyA8ZGl2IGNsYXNzPSdjaGF0LW1zZy1vcHRzLWFkbWluLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5hZG1pbiBuYW1lPC9wPlxyXG4gICAgLy8gPC9kaXY+O1xyXG4gIH07XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGZlZWRzIGFycmF5IG9mIGdyb3VwIG1lbWJlcnMgZGF0YSBIVE1MIGVsZW1lbnRzIHJlbmRlcmluZyBmdW5jdGlvbiBjb3JyZXNwb25kaW5nIHRvIGdyb3VwIG1lbWJlcnMuICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZU1lbWJlcnMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBtZW1iZXJzID0gdGhpcy5tc2dHcnBJbmZvLnJlbGF0aW9ucyBhcyBpUmVsYXRpb25bXTtcclxuICAgIGxldCBtZW1iZXI6IGlSZWxhdGlvbjtcclxuXHJcbiAgICBmb3IgKG1lbWJlciBvZiBtZW1iZXJzKSB7XHJcbiAgICAgIG1lbWJlciA9IEdlblV0aWwucmVsYXRpb25TdHJJbnRUb0Jvb2wobWVtYmVyKTtcclxuICAgICAgaWYgKG1lbWJlci5hZG1pbikgY29udGludWU7XHJcblxyXG4gICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuY3JlYXRlTWVtYmVyKFxyXG4gICAgICAgIG1lbWJlcixcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c01lbWJlcnNXcmFwKClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gdHJhbnNmb3JtcyBncm91cCBtZW1iZXIgcmVsYXRpb24gb2JqZWN0cyBpbnRvIGEgY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnQgYW5kIGF0dGFjaGVzIGl0IHRvIHRoZSBNZXNzYWdlIE9wdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlSZWxhdGlvbiB9IGl0ZW0gLSBncm91cCByZWxhdGlvbiBpdGVtIGZvciBub24tYWRtaW5zXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZU1lbWJlciA9IChcclxuICAgIGl0ZW06IGlSZWxhdGlvbixcclxuICAgIHdyYXA6IEhUTUxEaXZFbGVtZW50XHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBpdGVtV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpdGVtV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1tc2ctb3B0cy1tZW1iZXItaXRlbVwiKTtcclxuXHJcbiAgICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpdGVtLmFjY250X25hbWU7XHJcblxyXG4gICAgY29uc3QgaXRlbUFjdGlvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGNvbnN0IGlBZG1pbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xyXG4gICAgaUFkbWluLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLWNyb3duXCIpO1xyXG4gICAgY29uc3QgaU11dGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlNdXRlLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLWNvbW1lbnQtc2xhc2hcIik7XHJcbiAgICBjb25zdCBpQmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGlCbG9jay5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS11c2VyLXNsYXNoXCIpO1xyXG5cclxuICAgIC8vIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGlNdXRlKTtcclxuICAgIC8vIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGlCbG9jayk7XHJcbiAgICBpdGVtQWN0aW9ucy5hcHBlbmRDaGlsZChpQWRtaW4pO1xyXG5cclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1BY3Rpb25zKTtcclxuXHJcbiAgICB3cmFwLmFwcGVuZENoaWxkKGl0ZW1XcmFwKTtcclxuXHJcbiAgICAvLyBIVE1MIFRFTVBMQVRFID0gbWVtYmVyIGl0ZW1cclxuICAgIC8vIDxkaXYgY2xhc3M9J2NoYXQtbXNnLW9wdHMtbWVtYmVyLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5tZW1iZXIgbmFtZTwvcD5cclxuICAgIC8vICAgPHA+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLWNyb3duJz48L2k+XHJcbiAgICAvLyAgICAgPGkgY2xhc3M9J2ZhLXNvbGlkIGZhLWNvbW1lbnQtc2xhc2gnPjwvaT5cclxuICAgIC8vICAgICA8aSBjbGFzcz0nZmEtc29saWQgZmEtdXNlci1zbGFzaCc+PC9pPlxyXG4gICAgLy8gICA8L3A+XHJcbiAgICAvLyA8L2Rpdj47XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIG9iamVjdCB3aGljaCB3aWxsIGJlIHNlbnQgdG8gdGhlIHNlcnZlciB0byBhY3QgdXBvbiBhIHNwZWNpZmljIHBlbmRpbmcgZ3JvdXAtdG8tdXNlciByZXF1ZXN0IG9mIHRoZSBncm91cFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gZ3JvdXBJZCAtIGdyb3VwIGlkIG9mIHRoZSBjdXJyZW50IG1lc3NhZ2UgY29tcG9uZW50IGluc3RhbmNlXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcmVjZWl2ZXJJZCAtIHRhcmdldCB1c2VyLCByZWNpcGllbnQgb2YgdGhlIHJlcXVlc3QgcmVzcG9uc2VcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgY3JlYXRlUmVxdWVzdEJvZHkoZ3JvdXBJZDogc3RyaW5nLCByZWNlaXZlcklkOiBzdHJpbmcpOiBpUmVxdWVzdEJvZHkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogMyxcclxuICAgICAgcmVjaXBpZW50SWQ6IHJlY2VpdmVySWQsXHJcbiAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBkZWxldGVzIGEgY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnQgb2YgYSBtZXNzYWdlIG9wdGlvbiBjb21wIHJlcXVlc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSByZXF1ZXN0SXRlbUlkXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gY2hhdElkXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGRlbGV0ZVJlcXVlc3QgPSAoXHJcbiAgICByZXF1ZXN0SXRlbUlkOiBzdHJpbmcsXHJcbiAgICBjaGF0SWQ6IHN0cmluZ1xyXG4gICk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHRoaXMuc1R5cGUgPT09IFwidXNlclwiIHx8IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5zQ2hhdElkICE9PSBjaGF0SWQpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICAoXHJcbiAgICAgIFtcclxuICAgICAgICAuLi5NZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c091dGdvaW5nV3JhcCgpLmNoaWxkcmVuLFxyXG4gICAgICBdIGFzIEhUTUxEaXZFbGVtZW50W11cclxuICAgICkuZm9yRWFjaCgoaHRtbDogSFRNTERpdkVsZW1lbnQpID0+IHtcclxuICAgICAgaWYgKGh0bWwuZGF0YXNldC51c2VySWQgPT09IHJlcXVlc3RJdGVtSWQpXHJcbiAgICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmdldE1zZ09wdHNPdXRnb2luZ1dyYXAoKS5yZW1vdmVDaGlsZChodG1sKTtcclxuICAgIH0pO1xyXG5cclxuICAgIChcclxuICAgICAgW1xyXG4gICAgICAgIC4uLk1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRNc2dPcHRzSW5jb21pbmdXcmFwKCkuY2hpbGRyZW4sXHJcbiAgICAgIF0gYXMgSFRNTERpdkVsZW1lbnRbXVxyXG4gICAgKS5mb3JFYWNoKChodG1sOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoaHRtbC5kYXRhc2V0LnVzZXJJZCA9PT0gcmVxdWVzdEl0ZW1JZClcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuZ2V0TXNnT3B0c0luY29taW5nV3JhcCgpLnJlbW92ZUNoaWxkKGh0bWwpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBlaXRoZXI6XHJcbiAgICogLSBjYWxscyBmb3IgYSBuZXcgaW5zdGFuY2Ugb2YgdGhpcyBjbGFzc1xyXG4gICAqIC0gZGVsZXRlIHRoZSBpbnN0YW5jZSBvZiB0aGlzIGNsYXNzIGFuZCBhbGwgcmVsYXRlZCBkYXRhIHdpdGhpblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcGVlcklkIC0gYWNjb3VudCBpZCBvZiB0aGUgdXNlcidzIHRhcmdldCBjb25uZWN0ZWQgcGVlclxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHBlZXJOYW1lIC0gYWNjb3VudCBuYW1lIG9mIHRoZSB1c2VyJ3MgdGFyZ2V0IGNvbm5lY3RlZCBwZWVyXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gY2hhdElkIC0gY2hhdCBpZCBiZXR3ZWVuIHRoZSB1c2VyICYgcGVlciB8IGdyb3VwXHJcbiAgICogQHBhcmFtIHsgaUNoYXRUeXBlIH0gdHlwZSAtIGNoYXQgdHlwZSBvZiB0aGUgdXNlcidzIHRhcmdldFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBhdmFpbGFiaWxpdHkgLSBhdmFpbGFiaWxpdHkgc2V0dGluZyBvZiB0aGUgdXNlciB0YXJnZXRcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZnJvbVBlZXIgLSBmbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgdGFyZ2V0IGlzIGZyb20gdGhlIHBlZXIgbGlzdFxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBkZWxldGVJbnN0YW5jZSAtIGZsYWcgaW5kaWNhdGluZyBpZiB1c2VyIHRhcmdldCBjb21wIGlzIHRvIGJlIGRlbGV0ZWRcclxuICAgKiBAcmV0dXJucyB7IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudCB8IG51bGwgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXRJbnN0YW5jZSA9IChcclxuICAgIHBlZXJJZDogc3RyaW5nLFxyXG4gICAgcGVlck5hbWU6IHN0cmluZyxcclxuICAgIGNoYXRJZDogc3RyaW5nLFxyXG4gICAgdHlwZTogaUNoYXRUeXBlLFxyXG4gICAgYXZhaWxhYmlsaXR5OiBib29sZWFuLFxyXG4gICAgZnJvbVBlZXI6IGJvb2xlYW4sXHJcbiAgICBkZWxldGVJbnN0YW5jZTogYm9vbGVhblxyXG4gICk6IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudCB8IG51bGwgPT4ge1xyXG4gICAgaWYgKCFkZWxldGVJbnN0YW5jZSkge1xyXG4gICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgICB0aGlzLmluc3RhbmNlID0gbmV3IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudChcclxuICAgICAgICAgIHBlZXJJZCxcclxuICAgICAgICAgIHBlZXJOYW1lLFxyXG4gICAgICAgICAgY2hhdElkLFxyXG4gICAgICAgICAgdHlwZSxcclxuICAgICAgICAgIGF2YWlsYWJpbGl0eSxcclxuICAgICAgICAgIGZyb21QZWVyXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGF0TXNnc09wdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgXCIuY2hhdC1tc2ctb3B0c1wiXHJcbiAgICAgICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgICB0aGlzLmNoYXRNc2dzT3B0cy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBHZW5VdGlsIH0gZnJvbSBcIi4uL3V0aWwvZ2VuLnV0aWxcIjtcclxuaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tIFwiLi4vdXRpbC9hc3luY1dyYXAudXRpbFwiO1xyXG5pbXBvcnQgeyBpTXNnQm9keSB9IGZyb20gXCIuLi9tb2RlbHMvbXNnTGlzdC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZSB9IGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb24udXRpbFwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9iYXNlLmNvbXBcIjtcclxuaW1wb3J0IHsgVXNlckNvbXBvbmVudCB9IGZyb20gXCIuL3VzZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBTb2NrZXRNZXRob2RzIH0gZnJvbSBcIi4uL3V0aWwvc29ja2V0LnV0aWxcIjtcclxuaW1wb3J0IHsgaUh0dHBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaHR0cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpVmFsaWRpdHlUeXBlIH0gZnJvbSBcIi4uL21vZGVscy92YWxpZGl0eS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBHcm91cENvbXBvbmVudCB9IGZyb20gXCIuL2dyb3VwLmNvbXBcIjtcclxuaW1wb3J0IHsgTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tIFwiLi9tc2dzLmNvbXBcIjtcclxuaW1wb3J0IHsgaUNoYXRUeXBlLCBpUmVsQm9keSB9IGZyb20gXCIuLi9tb2RlbHMvZ2VuLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlSZWxhdGlvbiwgaVVzZXJPYmogfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgRXJyb3JDb21wb25lbnQgYXMgZXJyb3IgfSBmcm9tIFwiLi9lcnJvci5jb21wXCI7XHJcbmltcG9ydCB7IGh0dHBHZXRUb3BNc2csIGh0dHBHZXRVc2VycyB9IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcbmltcG9ydCB7XHJcbiAgaHR0cFBhdGNoUmVsYXRpb24sXHJcbiAgaHR0cEdldFVzZXJSZWxhdGlvbnMsXHJcbn0gZnJvbSBcIi4uL2hvb2tzL3JlcXVlc3RzLmhvb2tcIjtcclxuaW1wb3J0IHtcclxuICBjaGF0VHlwZSxcclxuICBjb250YWN0QWN0LFxyXG4gIGlTZWFyY2hJdGVtLFxyXG4gIGlSZWxhdGlvbkFjdCxcclxuICBpU2VhcmNoSXRlbXMsXHJcbiAgaVNlYXJjaFZhbHVlcyxcclxufSBmcm9tIFwiLi4vbW9kZWxzL3BlZXIubW9kZWxcIjtcclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIGhvbGRzIGZ1bmN0aW9ucyB3aGljaCBtYW5hZ2UgYW5kIHJlbmRlciBkYXRhIHJlbGF0ZWQgdG8gdGhlIHVzZXIgcGVlcihzKScgYW5kIGl0cyBkYXRhIGFuZCBIVE1MIGl0ZW1zLlxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBDb21wb25lbnRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBQZWVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4ge1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBQZWVyQ29tcG9uZW50IHwgbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBjaGF0VXNlcldyYXAhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyVG9nZ2xlITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0UGVlckhlYWRpbmdzITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0UGVlckxpc3RzITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0U2VhcmNoRm9ybSE6IEhUTUxGb3JtRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRSZW1vdmVTZWFyY2ghOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRTZWFyY2hUeXBlcyE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFNlYXJjaElucHV0ITogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRTZWFyY2hMaXN0ITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0U2VhcmNoTGlzdFdyYXAhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIHN0YXRpYyBjaGF0UGVlckxpc3Q6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFBlZXJMaXN0V3JhcCE6IEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAvKiogYXJyYXkgb2YgcGVlciBsaXN0IGl0ZW0gZGF0YSAqL1xyXG4gIHByaXZhdGUgc3RhdGljIGNoYXRQZWVyUmVsYXRpb25zSW5mbzogQXJyYXk8aVJlbGF0aW9uPiA9IFtdO1xyXG4gIC8qKiBhcnJheSBvZiBwZWVyIGxpc3QgaXRlbSBIVE1MIGVsZW1lbnRzICovXHJcbiAgcHJpdmF0ZSBzdGF0aWMgY2hhdFBlZXJSZWxhdGlvbnNIVE1MOiBBcnJheTxIVE1MRGl2RWxlbWVudD4gPSBbXTtcclxuXHJcbiAgLyoqIHNraXAgY291bnRlciBmb3IgcGVlciBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHJlbFNraXA6IG51bWJlciA9IDA7XHJcbiAgLyoqIHNraXAgbGltaXQgY29uc3RhbnQgZm9yIHBlZXIgbGlzdCBwYWdpbmF0aW9uIGxvZ2ljICovXHJcbiAgcHJpdmF0ZSByZWxTa2lwQ29uc3Q6IG51bWJlciA9IDE1O1xyXG4gIC8qKiBza2lwIGNvdW50ZXIgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaFNraXA6IG51bWJlciA9IDA7XHJcbiAgLyoqIHNraXAgbGltaXQgY29uc3RhbnQgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaFNraXBDb25zdDogbnVtYmVyID0gMTU7XHJcbiAgLyoqIHNraXAgZnVsbCBpbmRpY2F0b3IgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaEZ1bGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvKiogc2VhcmNoIGl0ZW0gdG90YWwgY291bnQgZm9yIHNlYXJjaCBsaXN0IHBhZ2luYXRpb24gbG9naWMgKi9cclxuICBwcml2YXRlIHNlYXJjaFJlc3VsdHM6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vIEZPUkVJR04gQ09NUE9ORU5UIEVMRU1FTlRcclxuICBwcml2YXRlIGNoYXRBcHAhOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBpbnN0YW50aWF0aW9uLCB0aGUgY29uc3RydWN0b3I6XHJcbiAgICogLSBpbW1lZGlhdGVseSBmZXRjaGVzIGZvciB1c2VyIGNvbm5lY3RlZCBwZWVyc1xyXG4gICAqIC0gcmVuZGVycyBkYXRhIGludG8gY29ycmVzcG9uZGluZyBIVE1MIGVsZW1lbnRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpVXNlck9iaiB9IHVzZXJEYXRhIC0gc2V0IG9mIGRhdGEgcmV0cmlldmVkIGZyb20gdGhlIHNlcnZlciwgc3BlY2lmaWMgZm9yIHRoZSBsb2dnZWQgdXNlclxyXG4gICAqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHVzZXJEYXRhOiBpVXNlck9iaikge1xyXG4gICAgc3VwZXIoXCIuY2hhdC1wZWVyLXdyYXBcIiwgXCJwZWVyLXRlbXBcIiwgXCJhZnRlcmJlZ2luXCIpO1xyXG5cclxuICAgIChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRVc2VyQ29udGFjdHMoKTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZUNvbXBvbmVudCgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMucmVuZGVyQ29tcG9uZW50KCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IHVzZXIgcmVsYXRpb25zXCIsXHJcbiAgICAgICAgICBlcnJcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlQ29tcG9uZW50KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGF0VXNlcldyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItd3JhcFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItdG9nZ2xlID4gYnV0dG9uXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0UGVlckhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1saXN0cy1oZWFkXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0UGVlckxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1saXN0c1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFNlYXJjaEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXNlYXJjaC1mb3JtXCJcclxuICAgICkhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFJlbW92ZVNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtcmVtb3ZlLXNlYXJjaFwiXHJcbiAgICApISBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFNlYXJjaFR5cGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1zZWFyY2gtdHlwZXNcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBcImNoYXQtc2VhcmNoLWlucHV0XCJcclxuICAgICkhIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1zZWFyY2gtbGlzdFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFNlYXJjaExpc3RXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC1zZWFyY2gtbGlzdC13cmFwXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LWNvbnRhY3QtbGlzdFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFBlZXJMaXN0V3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtY29udGFjdC1saXN0LXdyYXBcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5jaGF0QXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGF0LWFwcFwiKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcblxyXG4gICAgdGhpcy5jaGF0VXNlclRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja1VzZXJUb2dnbGVIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFJlbW92ZVNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZW1vdmVTZWFyY2hIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrU2VhcmNoSGFuZGxlcik7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5zdWJtaXRTZWFyY2hIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFNlYXJjaEhhbmRsZXIpO1xyXG4gICAgdGhpcy5jaGF0U2VhcmNoVHlwZXMuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLmNsaWNrU2VhcmNoVHlwZXNIYW5kbGVyXHJcbiAgICApO1xyXG4gICAgUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgXCJjbGlja1wiLFxyXG4gICAgICB0aGlzLnRvZ2dsZVBlZXJUb29sdGlwSGFuZGxlclxyXG4gICAgKTtcclxuICAgIHRoaXMuY2hhdFNlYXJjaExpc3RXcmFwLmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwic2Nyb2xsXCIsXHJcbiAgICAgIHRoaXMuc2Nyb2xsQm90dG9tU2VhcmNoTGlzdFxyXG4gICAgKTtcclxuICAgIHRoaXMuY2hhdFBlZXJMaXN0V3JhcC5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMuc2Nyb2xsQm90dG9tUGVlckxpc3QpO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnVuZG9FdmVudENsaWNrSGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgdGhpcy51bmRvRXZlbnRLZXlIYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3RUb1NvY2tldFJvb21zKCk7XHJcbiAgfVxyXG4gIGFzeW5jIHJlbmRlckNvbXBvbmVudCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuY2hhdFNlYXJjaFR5cGVzXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNoYXQtc2VhcmNoLXR5cGUtdXNlclwiKVxyXG4gICAgICA/LmNsYXNzTGlzdC5hZGQoXCJjaGF0LXNlYXJjaC10eXBlXCIpO1xyXG4gICAgdGhpcy5jaGF0U2VhcmNoVHlwZXMuZGF0YXNldC5jaGF0VHlwZSA9IGNoYXRUeXBlLnVzZXI7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZUNvbnRhY3RJdGVtcygpO1xyXG4gICAgdGhpcy5jcmVhdGVGaXJzdFBlZXJNc2dDb21wKCk7XHJcbiAgICBhd2FpdCB0aGlzLmZldGNoVG9wTXNncygpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLSBFVkVOVCBIQU5ETEVSUyAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgY2FsbGJhY2sgbGlzdGVucyB0byBhIGNsaWNrIGV2ZW50LCB3aGljaCB1cG9uIGRvaW5nIHNvLCBpbnN0cnVjdHMgVUkgdG8gbWFrZSB0aGUgdXNlciBjb21wb25lbnQgdmlzaWJsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGlja1VzZXJUb2dnbGVIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuY2hhdFVzZXJXcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LXVzZXItc2hvd1wiKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uLCB1cG9uIGludm9raW5nLCBtb2RpZmllcyBIVE1MIGxpc3RzJyBDU1MgY2xhc3NlcyB0byBhcHBseSB2aXNpYmlsaXR5IHRvIHBlZXIgbGlzdCBhbG9uZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBbZV1cclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHJlbW92ZVNlYXJjaEhhbmRsZXIgPSAoZT86IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuY2hhdFBlZXJIZWFkaW5ncy5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1saXN0cy1zZWFyY2hcIik7XHJcbiAgICB0aGlzLmNoYXRQZWVyTGlzdHMuY2xhc3NMaXN0LnJlbW92ZShcImNoYXQtbGlzdHMtc2VhcmNoXCIpO1xyXG4gICAgdGhpcy5jaGF0U2VhcmNoRm9ybS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1zZWFyY2gtZm9ybS1zZWFyY2gtc3RhdGVcIik7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBjaGVja3Mgd2hldGhlciBzZWFyY2ggbGlzdCBpcyB2aXNpYmxlLCB0aGVuIGhpZGVzIGl0IGlmIHNvLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrU2VhcmNoSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAvLyBpZiBzZWFyY2ggbGlzdCBpcyB2aXNpYmxlXHJcbiAgICBpZiAodGhpcy5jaGF0UGVlckhlYWRpbmdzLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtbGlzdHMtc2VhcmNoXCIpKSB7XHJcbiAgICAgIC8vIGlmIHNlYXJjaCBpbnB1dCBoYXMgdmFsdWVcclxuICAgICAgaWYgKCF0aGlzLmNoYXRTZWFyY2hJbnB1dC52YWx1ZS5sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVNlYXJjaEhhbmRsZXIoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jaGF0UGVlckhlYWRpbmdzLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWxpc3RzLXNlYXJjaFwiKTtcclxuICAgICAgdGhpcy5jaGF0UGVlckxpc3RzLmNsYXNzTGlzdC5hZGQoXCJjaGF0LWxpc3RzLXNlYXJjaFwiKTtcclxuICAgICAgdGhpcy5jaGF0U2VhcmNoRm9ybS5jbGFzc0xpc3QuYWRkKFwiY2hhdC1zZWFyY2gtZm9ybS1zZWFyY2gtc3RhdGVcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgc2VhcmNoIGNvbXBvbmVudCBzdW1tYXJ5IG9iamVjdCwgcmVmbGVjdGluZyBvZiB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgc2VhcmNoIGxpc3QsIHRvIGJlIHVzZWQgaW4gYW4gSFRUUCByZXF1ZXN0LlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBpU2VhcmNoVmFsdWVzIH1cclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGNyZWF0ZVNlYXJjaFJlcU9iaiA9ICgpOiBpU2VhcmNoVmFsdWVzID0+IHtcclxuICAgIGNvbnN0IHNlYXJjaFR5cGU6IGlDaGF0VHlwZSA9IHRoaXMuY2hhdFNlYXJjaFR5cGVzLmRhdGFzZXRcclxuICAgICAgLmNoYXRUeXBlISBhcyBpQ2hhdFR5cGU7XHJcbiAgICBjb25zdCBza2lwOiBudW1iZXIgPSB0aGlzLnNlYXJjaFNraXA7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcGF0dGVybjogdGhpcy5jaGF0U2VhcmNoSW5wdXQudmFsdWUudHJpbSgpLFxyXG4gICAgICB0eXBlOiBzZWFyY2hUeXBlID09PSBcInVzZXJcIiA/IDAgOiAxLFxyXG4gICAgICBza2lwOiBza2lwLFxyXG4gICAgICBjbnQ6IHRoaXMuc2VhcmNoUmVzdWx0cyxcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbjpcclxuICAgKiAtIHJlc2V0cyBzZWFyY2ggcmVsYXRlZCB2YXJpYWJsZXNcclxuICAgKiAtIHNlbmRzIHNlYXJjaCByZWxhdGVkIHZhcmlhYmxlcyBmb3IgbmV3IGJhdGNoIG9mIHNlYXJjaCBpdGVtc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgRXZlbnQgfSBlXHJcbiAgICogQHJldHVybnMgeyBQcm9taXNlPHZvaWQ+IH1cclxuICAgKi9cclxuICBwcml2YXRlIHN1Ym1pdFNlYXJjaEhhbmRsZXIgPSBhc3luYyAoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBQUk9DRVNTOiByZXNldCBzZWFyY2ggZGF0YVxyXG4gICAgdGhpcy5zZWFyY2hTa2lwID0gMDtcclxuICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IDA7XHJcbiAgICB0aGlzLnNlYXJjaEZ1bGwgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgY2hhdFNlYXJjaFZhbHVlOiBpU2VhcmNoVmFsdWVzID0gdGhpcy5jcmVhdGVTZWFyY2hSZXFPYmooKTtcclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCBzZWFyY2hWYWxpZCA9IFZhbGlkYXRlLnNlYXJjaChcclxuICAgICAgY2hhdFNlYXJjaFZhbHVlLFxyXG4gICAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlISBhcyBpQ2hhdFR5cGVcclxuICAgICk7XHJcbiAgICBpZiAoIXNlYXJjaFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IGNsaWVudCBzZWFyY2ggZGF0YSBpcyBpbmF2YWxpZFwiLFxyXG4gICAgICAgIHNlYXJjaFZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNoYXRTZWFyY2hWYWx1ZS5wYXR0ZXJuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmNoYXRTZWFyY2hMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiByZXR1cm5zXHJcbiAgICBpZiAodGhpcy5zZWFyY2hGdWxsKSByZXR1cm47XHJcblxyXG4gICAgLy8gSFRUUCBSRVFVRVNUXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwR2V0VXNlcnMsIGNoYXRTZWFyY2hWYWx1ZSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IGZvciB1c2VyIHNlYXJjaGAsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgY29uc3QgaHR0cFZhbGlkID0gVmFsaWRhdGUuaHR0cFJlcyhcclxuICAgICAgcmVzcG9uc2UsXHJcbiAgICAgIGBzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgdXNlciBzZWFyY2hgLFxyXG4gICAgICBgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIHVwb24gY2xpZW50J3MgcmVxdWVzdCBmb3IgdXNlciBzZWFyY2hgXHJcbiAgICApO1xyXG4gICAgaWYgKCFodHRwVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyBQUk9DRVNTXHJcbiAgICB0aGlzLmNoYXRTZWFyY2hMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBjb25zdCBzZWFyY2hJdGVtczogaVNlYXJjaEl0ZW1zID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xyXG4gICAgaWYgKFxyXG4gICAgICBzZWFyY2hJdGVtcyAmJlxyXG4gICAgICB0eXBlb2Ygc2VhcmNoSXRlbXMgPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgc2VhcmNoSXRlbXMubGVuZ3RoID4gMFxyXG4gICAgKSB7XHJcbiAgICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB0aGlzLnNlYXJjaFJlc3VsdHMgKyBzZWFyY2hJdGVtcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuc2VhcmNoU2tpcCsrO1xyXG4gICAgICB0aGlzLmdlbmVyYXRlU2VhcmNoSXRlbXMoXHJcbiAgICAgICAgc2VhcmNoSXRlbXMsXHJcbiAgICAgICAgdGhpcy5jaGF0U2VhcmNoVHlwZXMuZGF0YXNldC5jaGF0VHlwZSEgYXMgaUNoYXRUeXBlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzZWFyY2hJdGVtcy5sZW5ndGggfHwgc2VhcmNoSXRlbXMubGVuZ3RoIDwgdGhpcy5zZWFyY2hTa2lwQ29uc3QpXHJcbiAgICAgIHRoaXMuc2VhcmNoRnVsbCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBzZW5kcyBzZWFyY2ggc3RhdHVzIHN1bW1hcnkgZm9yIG5leHQgYmF0Y2ggb2Ygc2VhcmNoIGl0ZW1zLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgRXZlbnQgfSBlXHJcbiAgICogQHJldHVybnMgeyBQcm9taXNlPHZvaWQ+IH1cclxuICAgKi9cclxuICBwcml2YXRlIHNjcm9sbEJvdHRvbVNlYXJjaExpc3QgPSBhc3luYyAoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGlmICh0aGlzLnNlYXJjaEZ1bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKHQuc2Nyb2xsVG9wID09PSB0LnNjcm9sbEhlaWdodCAtIHQub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICAgIGNvbnN0IGNoYXRTZWFyY2hWYWx1ZTogaVNlYXJjaFZhbHVlcyA9IHRoaXMuY3JlYXRlU2VhcmNoUmVxT2JqKCk7XHJcblxyXG4gICAgICAvLyBWQUxJREFUSU9OXHJcbiAgICAgIGNvbnN0IHNlYXJjaFZhbGlkID0gVmFsaWRhdGUuc2VhcmNoKFxyXG4gICAgICAgIGNoYXRTZWFyY2hWYWx1ZSxcclxuICAgICAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlISBhcyBpQ2hhdFR5cGVcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFzZWFyY2hWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgICAgXCJFUlJPUjogY2xpZW50IHNlYXJjaCBkYXRhIGlzIGluYXZhbGlkXCIsXHJcbiAgICAgICAgICBzZWFyY2hWYWxpZC5lcnJvclxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldFVzZXJzLCBjaGF0U2VhcmNoVmFsdWUpO1xyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgICBgRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCBmb3IgdXNlciBzZWFyY2hgLFxyXG4gICAgICAgICAgZXJyXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgICBjb25zdCBodHRwVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICAgIHJlc3BvbnNlLFxyXG4gICAgICAgIGBzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgdXNlciBzZWFyY2hgLFxyXG4gICAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIHNlYXJjaGBcclxuICAgICAgKTtcclxuICAgICAgaWYgKCFodHRwVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIFBST0NFU1NcclxuICAgICAgY29uc3Qgc2VhcmNoSXRlbXM6IGlTZWFyY2hJdGVtcyA9IHJlc3BvbnNlLmRhdGEuZGF0YTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHNlYXJjaEl0ZW1zICYmXHJcbiAgICAgICAgdHlwZW9mIHNlYXJjaEl0ZW1zID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgc2VhcmNoSXRlbXMubGVuZ3RoID4gMFxyXG4gICAgICApIHtcclxuICAgICAgICAvLyBIVFRQIFJFU1BPTlNFIFBST0NFU1NJTkdcclxuICAgICAgICB0aGlzLnNlYXJjaFNraXArKztcclxuICAgICAgICB0aGlzLnNlYXJjaFJlc3VsdHMgPSB0aGlzLnNlYXJjaFJlc3VsdHMgKyBzZWFyY2hJdGVtcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVNlYXJjaEl0ZW1zKFxyXG4gICAgICAgICAgc2VhcmNoSXRlbXMsXHJcbiAgICAgICAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlISBhcyBpQ2hhdFR5cGVcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNlYXJjaEl0ZW1zLmxlbmd0aCB8fCBzZWFyY2hJdGVtcy5sZW5ndGggPCB0aGlzLnNlYXJjaFNraXBDb25zdClcclxuICAgICAgICB0aGlzLnNlYXJjaEZ1bGwgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgc2VhcmNoIHR5cGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tTZWFyY2hUeXBlc0hhbmRsZXIgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcblxyXG4gICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtc2VhcmNoLXR5cGVcIilcclxuICAgICAgPyB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImNoYXQtc2VhcmNoLXR5cGVcIilcclxuICAgICAgOiBudWxsO1xyXG5cclxuICAgIHRhcmdldC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgPyB0YXJnZXQubmV4dEVsZW1lbnRTaWJsaW5nIS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1zZWFyY2gtdHlwZVwiKVxyXG4gICAgICA6IHRhcmdldC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hhdC1zZWFyY2gtdHlwZVwiKTtcclxuXHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImNoYXQtc2VhcmNoLXR5cGVcIik7XHJcbiAgICB0aGlzLmNoYXRTZWFyY2hUeXBlcy5kYXRhc2V0LmNoYXRUeXBlID0gdGFyZ2V0LmRhdGFzZXQuY2hhdFR5cGU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBjYWxscyBmb3IgYSBuZXcgaW5zdGFuY2Ugb2YgdGhlIE1lc3NhZ2UgQ29tcG9uZW50LCBjb3JyZXNwb25kaW5nIHRoZSBjbGlja2VkIHBlZXIgfCBnb3J1cCB0YXJnZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xpY2tTZWFyY2hJdGVtSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgbGV0IGNoYXRJZDogc3RyaW5nID0gXCJcIjtcclxuICAgIGxldCBwZWVyRmxhZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm8ubWFwKChyZWw6IGlSZWxhdGlvbikgPT4ge1xyXG4gICAgICBpZiAocmVsLmFjY250X2lkID09PSB0YXJnZXQuZGF0YXNldC51c2VySWQhKSB7XHJcbiAgICAgICAgY2hhdElkID0gcmVsLmNoYXRfaWQ7XHJcbiAgICAgICAgcGVlckZsYWcgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBNZXNzYWdlc0NvbXBvbmVudC5nZXRJbnN0YW5jZShcclxuICAgICAgdGhpcy51c2VyRGF0YS5hY3RfaWQuYWNjbnRfaWQsXHJcbiAgICAgIHRhcmdldC5kYXRhc2V0LnVzZXJJZCEsXHJcbiAgICAgIHRhcmdldC5xdWVyeVNlbGVjdG9yKFwiaDNcIikhLnRleHRDb250ZW50ISxcclxuICAgICAgY2hhdElkLFxyXG4gICAgICBwZWVyRmxhZyxcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQuY2hhdFR5cGUgYXMgXCJ1c2VyXCIgfCBcImdyb3VwXCIsXHJcbiAgICAgIGZhbHNlLFxyXG4gICAgICBwZWVyRmxhZ1xyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uIHByb2NlZWRzIHdpdGggYSBsb2dpYyB0byBkZWNpZGUgd2hldGhlciB0aGUgZXZlbnQgY2FuIGluc3RydWN0IHRoZSBQZWVyIENvbXBvbmVudCB0byBoaWRlIHNlYXJjaCBsaXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHVuZG9FdmVudENsaWNrSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAvLyBpZiBjbGlja2VkIGVsZW1lbnQgaXMgbm90IFwiY2hhdC1zZWFyY2gtaW5wdXRcIiBvciBzZWFyY2gtdHlwZXMgYnV0dG9uXHJcbiAgICBpZiAoZS50eXBlID09PSBcImNsaWNrXCIpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGUuYnV0dG9uID09PSAwICYmXHJcbiAgICAgICAgdGFyZ2V0ICE9PSB0aGlzLmNoYXRTZWFyY2hJbnB1dCAmJlxyXG4gICAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hhdC1zZWFyY2gtdHlwZS1ncm91cFwiKSAmJlxyXG4gICAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hhdC1zZWFyY2gtdHlwZS11c2VyXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIC8vIGlmIHNlYXJjaCBoZWFkICYgbGlzdCBhcmUgb3BlblxyXG4gICAgICAgICAgdGhpcy5jaGF0UGVlckhlYWRpbmdzLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtbGlzdHMtc2VhcmNoXCIpICYmXHJcbiAgICAgICAgICAvLyBpZiBzZWFyY2ggaW5wdXQgaGFzIHZhbHVlXHJcbiAgICAgICAgICAhdGhpcy5jaGF0U2VhcmNoSW5wdXQudmFsdWUubGVuZ3RoXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbW92ZVNlYXJjaEhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uIHByZXZlbnRzIHByZXNzaW5nICdFbnRlcicga2V5IHRvIGhpZGUgc2VhcmNoIGxpc3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBLZXlib2FyZEV2ZW50IH0gZVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgS2V5Ym9hcmRFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgdW5kb0V2ZW50S2V5SGFuZGxlciA9IChlOiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICAvLyBpZiAoXHJcbiAgICAvLyAgIGUudHlwZSA9PT0gXCJrZXlwcmVzc1wiICYmXHJcbiAgICAvLyAgIGUua2V5ID09PSBcIkVudGVyXCIgJiZcclxuICAgIC8vICAgdGhpcy5jaGF0QXBwLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtYXBwLXVzZXItc3RhdGVcIilcclxuICAgIC8vIClcclxuICAgIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gY2FsbHMgZm9yIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBNZXNzYWdlIENvbXBvbmVudCwgY29ycmVzcG9uZGluZyB0aGUgY2xpY2tlZCBwZWVyIHwgZ29ydXAgdGFyZ2V0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrUGVlckl0ZW1IYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHRhcmdldCA9IChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLnBhcmVudEVsZW1lbnQhO1xyXG5cclxuICAgIE1lc3NhZ2VzQ29tcG9uZW50LmdldEluc3RhbmNlKFxyXG4gICAgICB0aGlzLnVzZXJEYXRhLmFjdF9pZC5hY2NudF9pZCxcclxuICAgICAgdGFyZ2V0LmRhdGFzZXQudXNlcklkISxcclxuICAgICAgdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJoM1wiKSEudGV4dENvbnRlbnQhLFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jaGF0SWQhLFxyXG4gICAgICB0cnVlLFxyXG4gICAgICB0YXJnZXQuZGF0YXNldC5jaGF0VHlwZSBhcyBcInVzZXJcIiB8IFwiZ3JvdXBcIixcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRydWVcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiBlaXRoZXI6XHJcbiAgICogLSBoaWRlIHZpc2libGUgcGVlciBpdGVtIHRvb2x0aXBcclxuICAgKiAtIHNob3cgYSBwZWVyIGl0ZW0gdG9vbHRpcFxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIHRvZ2dsZVBlZXJUb29sdGlwSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKFxyXG4gICAgICAhdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtY29udGFjdC10b29sdGlwXCIpICYmXHJcbiAgICAgICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmEtZWxsaXBzaXMtdmVydGljYWxcIilcclxuICAgIClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8vIGlmIHRhcmdldCBjbGlja2VkIGlzIHRoZSBpY29uIGluc3RlYWQgb2YgdGhlIHRvb2x0aXAgYXJlYSwgY2hhbmdlIHRhcmdldCB0byBwYXJlbnRcclxuICAgIGlmICh0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmEtZWxsaXBzaXMtdmVydGljYWxcIikpIHtcclxuICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWN0aW9uID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtY29udGFjdC10b29sdGlwLWNvbnRlbnRcIlxyXG4gICAgKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoYWN0aW9uLmNsYXNzTGlzdC5jb250YWlucyhcImNoYXQtY29udGFjdC10b29sdGlwLXNob3dcIikpIHtcclxuICAgICAgLy8gcmVtb3ZlIGEgc2luZ2xlIHZpc2libGUgdG9vbHRpcFxyXG4gICAgICBhY3Rpb24uY2xhc3NMaXN0LnJlbW92ZShcImNoYXQtY29udGFjdC10b29sdGlwLXNob3dcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBhY3Rpb25zID0gW1xyXG4gICAgICAgIC4uLlBlZXJDb21wb25lbnQuY2hhdFBlZXJMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICAgICAgICBcIi5jaGF0LWNvbnRhY3QtdG9vbHRpcC1jb250ZW50XCJcclxuICAgICAgICApLFxyXG4gICAgICBdIGFzIEFycmF5PEhUTUxEaXZFbGVtZW50PjtcclxuXHJcbiAgICAgIC8vIHJlbW92ZSBhbGwgdmlzaWJsZSB0b29sdGlwXHJcbiAgICAgIGFjdGlvbnMubGVuZ3RoID4gMFxyXG4gICAgICAgID8gYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgYWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGF0LWNvbnRhY3QtdG9vbHRpcC1zaG93XCIpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICA6IG51bGw7XHJcblxyXG4gICAgICAvLyBhcHBseSB2aXNpYmlsaXR5IHRvIGNsaWNrZWQgdG9vbHRpcFxyXG4gICAgICBhY3Rpb24uY2xhc3NMaXN0LmFkZChcImNoYXQtY29udGFjdC10b29sdGlwLXNob3dcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvblxyXG4gICAqIC0gcmVxdWVzdHMgYW4gSFRUUCBQQVRDSCB0byB0aGUgc2VydmVyIHRvIG1vZGlmeSB1c2VyIHJlbGF0aW9uc2hpcCBzdGF0dXMgZnJvbSB0YXJnZXQgcGVlclxyXG4gICAqIC0gbW9kaWZpZXMgcGVlciBsaXN0IGl0ZW0gYWNjb3JkaW5nIHRvIGFjdGlpb24gdGFrZW5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICogQHJldHVybnMgeyBQcm9taXNlPHZvaWQ+IH1cclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBjbGlja0NvbnRhY3RBY3Rpb25IYW5kbGVyID0gYXN5bmMgKFxyXG4gICAgZTogTW91c2VFdmVudFxyXG4gICk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGFyZ2V0LmRhdGFzZXQuY29udGFjdEFjdCEgYXMgXCJhcmNoaXZlXCIgfCBcImJsb2NrXCIgfCBcIm11dGVcIjtcclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICBsZXQgcmVsQWN0VmFsaWQhOiBpVmFsaWRpdHlUeXBlO1xyXG5cclxuICAgIGNvbnN0IHQgPSB0YXJnZXQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudCE7XHJcbiAgICBjb25zdCByZWxhdGlvbkFjdDogaVJlbGF0aW9uQWN0ID0ge1xyXG4gICAgICByZWNpcGllbnRJZDogdC5kYXRhc2V0LnVzZXJJZCEsXHJcbiAgICAgIHVzZXJBY3Rpb246IGFjdGlvbixcclxuICAgICAgLy8gQ09OVEFDVCBUT09MVElQUyBXSUxMIEFMV0FZUyBIQVZFIEEgVkFMVUUgT0YgVFJVRVxyXG4gICAgICBhY3Rpb25WYWx1ZTogdHJ1ZSxcclxuICAgIH07XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgcmVsQWN0VmFsaWQgPSBWYWxpZGF0ZS5yZWxhdGlvbkFjdGlvbihyZWxhdGlvbkFjdCk7XHJcbiAgICBpZiAoIXJlbEFjdFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IFVzZXIgZGF0YSBmb3IgcmVxdWVzdGluZyB1c2VyIHJlbGF0aW9uIGFjdGlvbiBpcyBpbnZhbGlkXCIsXHJcbiAgICAgICAgcmVsQWN0VmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBUkNISVZFXHJcbiAgICAvLyAtLS0gdGVtcG9yYXJpbHkgaGlkZSBjaGF0IGl0ZW0gZWxlbWVudFxyXG4gICAgaWYgKGFjdGlvbiA9PT0gXCJhcmNoaXZlXCIpIHtcclxuICAgICAgUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QucmVtb3ZlQ2hpbGQodCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIVFRQIFJFUVVFU1RcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cFBhdGNoUmVsYXRpb24sIHJlbGF0aW9uQWN0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IHJlbGF0aW9uIGFjdGlvblwiLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGlzIHVuYWJsZSB0byBwcm9jZXNzIHJlcXVlc3QgZm9yIHVzZXIgYWN0aW9uYCxcclxuICAgICAgYHNlcnZlciByZXNwb25kZWQgd2l0aCBhbiBlcnJvciB1cG9uIGNsaWVudCdzIHJlcXVlc3QgZm9yIHJlbGF0aW9uIGFjdGlvbmBcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgY29uc3QgaXRlbTogaVJlbGF0aW9uID0ge1xyXG4gICAgICBhY2NudF9pZDogdC5kYXRhc2V0LnVzZXJJZCEsXHJcbiAgICAgIGFjY250X25hbWU6IFsuLi50LmNoaWxkcmVuXVswXS5xdWVyeVNlbGVjdG9yKFwiaDNcIik/LnRleHRDb250ZW50ISxcclxuICAgICAgdHlwZTogdC5kYXRhc2V0LmNoYXRUeXBlISBhcyBcInVzZXJcIiB8IFwiZ3JvdXBcIixcclxuICAgICAgY2hhdF9pZDogXCJwc2V1ZG9cIixcclxuICAgICAgYWRtaW46IGZhbHNlLFxyXG4gICAgICBhcmNoaXZlOiB0LmRhdGFzZXQuaXNBcmNoaXZlZCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2UsXHJcbiAgICAgIGJsb2NrOiB0LmRhdGFzZXQuaXNCbG9ja2VkID09PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZSxcclxuICAgICAgbXV0ZTogdC5kYXRhc2V0LmlzTXV0ZWQgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlLFxyXG4gICAgICBidW1wOiAwLFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoYWN0aW9uID09PSBcImJsb2NrXCIgJiYgaXRlbS50eXBlID09PSBcImdyb3VwXCIpIHtcclxuICAgICAgbGV0IGdzID0gSlNPTi5wYXJzZShcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEdyb3VwQ29tcG9uZW50LmdycFNlc3Npb25TdG9yZU5hbWUpIVxyXG4gICAgICApIGFzIGlSZWxhdGlvbltdO1xyXG4gICAgICBncyA9IGdzLmZpbHRlcigoZykgPT4gaXRlbS5hY2NudF9pZCAhPT0gZy5hY2NudF9pZCk7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oR3JvdXBDb21wb25lbnQuZ3JwU2Vzc2lvblN0b3JlTmFtZSk7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXHJcbiAgICAgICAgR3JvdXBDb21wb25lbnQuZ3JwU2Vzc2lvblN0b3JlTmFtZSxcclxuICAgICAgICBKU09OLnN0cmluZ2lmeShncylcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWN0aW9uID09PSBcIm11dGVcIikge1xyXG4gICAgICAvLyAgTVVURVxyXG4gICAgICAvLyAgLS0tIGVyYXNlIGNoYXQgaXRlbSBtZXNzYWdlIGRpc3BsYXkgZnJvbSBtdXRpbmcgcGFydHlcclxuICAgICAgY29uc3QgcCA9IHQucXVlcnlTZWxlY3RvcihcInBcIikhO1xyXG4gICAgICBwLnRleHRDb250ZW50ID0gXCItLS0tLVwiO1xyXG5cclxuICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVNdXRlQmxvY2tJdGVtKFxyXG4gICAgICAgIGl0ZW0sXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jaGF0VXNlck11dGVzV3JhcCxcclxuICAgICAgICAwXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBCTE9DS1xyXG4gICAgICAvLyAtLS0gdW5hYmxlIHRvIGFjY2VwdCB8IHJlY2VpdmVyIG1lc3NhZ2UgZnJvbSBib3RoIHBhcnRpZXNcclxuICAgICAgLy8gLS0tIG5vdCBzZWFyY2hhYmxlIGJ5IGJvdGggcGFydGllc1xyXG5cclxuICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVNdXRlQmxvY2tJdGVtKFxyXG4gICAgICAgIGl0ZW0sXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jaGF0VXNlckJsb2Nrc1dyYXAsXHJcbiAgICAgICAgMVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gUGVlckNvbXBvbmVudC5jaGF0UGVlckxpc3QucmVtb3ZlQ2hpbGQodCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gREVMRVRFIEFDVElPTiBPUFRJT05cclxuICAgIHRhcmdldC5wYXJlbnRFbGVtZW50Py5yZW1vdmVDaGlsZCh0YXJnZXQpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gZmVlZHMgYSBmdW5jdGlvbiB3aXRoIGFuIGFycmF5IG9mIHBlZXIgaXRlbSBkYXRhIGFuZCB0cmFuc2Zvcm0gdGhlbSBpbnRvIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IEV2ZW50IH0gZVxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBFdmVudCAtIHNjcm9sbFxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgc2Nyb2xsQm90dG9tUGVlckxpc3QgPSBhc3luYyAoZTogRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGNvbnN0IHQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAodC5zY3JvbGxUb3AgPT09IHQuc2Nyb2xsSGVpZ2h0IC0gdC5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgdGhpcy5nZW5lcmF0ZUNvbnRhY3RJdGVtcygpO1xyXG4gICAgICBhd2FpdCB0aGlzLmZldGNoVG9wTXNncygpO1xyXG5cclxuICAgICAgdGhpcy5yZWxTa2lwKys7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgc2V0IG9mIHN0YXJ0aW5nIGFuZCBlbmRpbmcgbnVtYmVycyBmb3IgdGhlIHBhZ2luYXRpb24gbG9naWMgb2YgdGhlIHBlZXIgbGlzdC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IG51bWJlciB9IHNraXAgLSBjdXJyZW50IHNraXAgc3RhdHVzIG9mIHRoZSBsaXN0XHJcbiAgICogQHBhcmFtIHsgbnVtYmVyIH0gW2tdIC0gaW5pdGlhbGx5LCBza2lwIGxpbWl0IGNvbnN0YW50IG9mIHRoZSBwZWVyIGxpc3RcclxuICAgKiBAcmV0dXJucyB7IHsgc3RhcnQ6IG51bWJlcjsgZW5kOiBudW1iZXIgfSB8IHZvaWQgfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZ2V0U3RhcnRFbmQgPSAoXHJcbiAgICBza2lwOiBudW1iZXIsXHJcbiAgICBrOiBudW1iZXIgPSB0aGlzLnJlbFNraXBDb25zdFxyXG4gICk6IHsgc3RhcnQ6IG51bWJlcjsgZW5kOiBudW1iZXIgfSB8IHZvaWQgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBza2lwICE9PSBcIm51bWJlclwiIHx8IHR5cGVvZiBrICE9PSBcIm51bWJlclwiKSByZXR1cm47XHJcblxyXG4gICAgcmV0dXJuIHsgc3RhcnQ6IHNraXAgPyBza2lwICogayA6IDAsIGVuZDogKHNraXAgPyAoc2tpcCArIDEpICogayA6IGspIC0gMSB9O1xyXG4gIH07XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0gQ0xBU1MgVVRJTElUWSAtLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSByZXF1ZXN0cyBhbiBIVFRQIFBPU1QgdG8gdGhlIHNlcnZlciB0byByZXRyaWV2ZSB1c2VyIGNvbnRhY3RzLlxyXG4gICAqIC0gc3RvcmVzIHJldHJpZXZlZCBkYXRhIHdpdGhpbiBjbGFzcyBtZXRob2RcclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHsgUHJvbWlzZTx2b2lkPiB9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhc3luYyBnZXRVc2VyQ29udGFjdHMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgcmVsQm9keSA9IHRoaXMuY3JlYXRlUmVsUmVxQm9keSgpO1xyXG5cclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldFVzZXJSZWxhdGlvbnMsIHJlbEJvZHkpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIHJlcXVlc3QgdXNlciByZWxhdGlvbnNcIixcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICBjb25zdCBodHRwVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgYHNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyByZXF1ZXN0IGZvciB1c2VyIHJlbGF0aW9uc2AsXHJcbiAgICAgIGBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIHJlbGF0aW9uc2BcclxuICAgICk7XHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFJFU1BPTlNFIFBST0NFU1NJTkdcclxuICAgIGxldCByZWw6IGlSZWxhdGlvbjtcclxuICAgIGZvciAocmVsIG9mIHJlc3BvbnNlLmRhdGEuZGF0YSkge1xyXG4gICAgICBQZWVyQ29tcG9uZW50LmNoYXRQZWVyUmVsYXRpb25zSW5mby5wdXNoKFxyXG4gICAgICAgIEdlblV0aWwucmVsYXRpb25TdHJJbnRUb0Jvb2wocmVsKSBhcyBpUmVsYXRpb25cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGNvbm5lY3RzIGNsaWVudCB0byBvdGhlciB1c2VyIGJhc2VkIG9uIGRhdGEgYWJvdXQgY29ubmVjdGVkIHBlZXJzLiAqL1xyXG4gIHByaXZhdGUgY29ubmVjdFRvU29ja2V0Um9vbXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBjaGF0SWRzID0gUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm9cclxuICAgICAgLmZpbHRlcigocmVsOiBpUmVsYXRpb24pID0+ICFyZWwuYmxvY2spXHJcbiAgICAgIC5tYXAoKHJlbDogaVJlbGF0aW9uKSA9PiByZWwuY2hhdF9pZCk7XHJcblxyXG4gICAgU29ja2V0TWV0aG9kcy5zb2NrZXQ/LmVtaXQoXHJcbiAgICAgIFNvY2tldE1ldGhvZHMuam9pblJvb21zRXYsXHJcbiAgICAgIGNoYXRJZHMsXHJcbiAgICAgIChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGxvb3BzIG92ZXIgc2VhcmNoIGl0ZW0gZGF0YSBhbmQgdHJhbnNmb3JtcyB0aGVtIGludG8gSFRNTCBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlTZWFyY2hJdGVtcyB9IHVzZXJJdGVtcyAtIGFycmF5IG9mIHNlYXJjaCBpdGVtIGRhdGFcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZVNlYXJjaEl0ZW1zKHVzZXJJdGVtczogaVNlYXJjaEl0ZW1zLCB0eXBlOiBpQ2hhdFR5cGUpOiB2b2lkIHtcclxuICAgIGxldCB1c2VyOiBpU2VhcmNoSXRlbTtcclxuICAgIGZvciAodXNlciBvZiB1c2VySXRlbXMpIHtcclxuICAgICAgdGhpcy5jcmVhdGVTZWFyY2hJdGVtKHVzZXIsIHR5cGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvblxyXG4gICAqIC0gY3JlYXRlcyBhIGNvcnJlc3BvbmRpbmcgSFRNTCBlbGVtZW50IGZyb20gdGhlIHVzZXIgb2JqZWN0XHJcbiAgICogLSBhdHRhY2hlcyB0aGVtIHRvIHRoZSBzZWFyY2ggbGlzdCBlbGVtZW50XHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpU2VhcmNoSXRlbXMgfSB1c2VyIC0gdXNlciBvYmplY3RcclxuICAgKiBAcGFyYW0geyBpQ2hhdFR5cGUgfSB0eXBlIC0gdXNlciBjaGF0IHR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZVNlYXJjaEl0ZW0odXNlcjogaVNlYXJjaEl0ZW0sIHR5cGU6IGlDaGF0VHlwZSk6IHZvaWQge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHVzZXJWYWxpZCA9IFZhbGlkYXRlLnNlYXJjaEl0ZW0odXNlcik7XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgaWYgKCF1c2VyVmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogc2VhcmNoIGl0ZW0gZGF0YSBpcyBpbnZhbGlkXCIsXHJcbiAgICAgICAgdXNlclZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUFJPQ0VTU0lOR1xyXG4gICAgY29uc3Qgc2VhcmNoSXRlbTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFxyXG4gICAgICBcImRpdlwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIGNvbnN0IHVzZXJIMzogSFRNTEhlYWRpbmdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcclxuICAgICAgXCJoM1wiXHJcbiAgICApISBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICBjb25zdCB1c2VyTmFtZTogVGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHVzZXIuYWN0X25hbWUpISBhcyBUZXh0O1xyXG5cclxuICAgIHNlYXJjaEl0ZW0uY2xhc3NMaXN0LmFkZChcImNoYXQtc2VhcmNoLWl0ZW1cIik7XHJcbiAgICBzZWFyY2hJdGVtLmRhdGFzZXQudXNlcklkID0gdXNlci5hY2NudF9pZDtcclxuICAgIHNlYXJjaEl0ZW0uZGF0YXNldC5jaGF0VHlwZSA9IHR5cGU7XHJcbiAgICBzZWFyY2hJdGVtLmRhdGFzZXQuYXZhaWxhYmlsaXR5ID0gYCR7dXNlci5hdmFpbGFiaWxpdHl9YDtcclxuXHJcbiAgICB1c2VySDMuYXBwZW5kQ2hpbGQodXNlck5hbWUpO1xyXG4gICAgc2VhcmNoSXRlbS5hcHBlbmRDaGlsZCh1c2VySDMpO1xyXG4gICAgc2VhcmNoSXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja1NlYXJjaEl0ZW1IYW5kbGVyKTtcclxuXHJcbiAgICB0aGlzLmNoYXRTZWFyY2hMaXN0Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBzZWFyY2hJdGVtKTtcclxuICB9XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGxvb3BzIG92ZXIgcGVlciBpdGVtIGRhdGEgYW5kIHRyYW5zZm9ybXMgdGhlbSBpbnRvIEhUTUwgZWxlbWVudHMuICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZUNvbnRhY3RJdGVtcyA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcy5nZXRTdGFydEVuZCh0aGlzLnJlbFNraXApITtcclxuICAgIGxldCBpOiBudW1iZXIgPSBzdGFydDtcclxuICAgIGlmIChzdGFydCA+IFBlZXJDb21wb25lbnQuY2hhdFBlZXJSZWxhdGlvbnNJbmZvLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgc2xpY2VkQXJyID0gUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm8uc2xpY2UoXHJcbiAgICAgIHRoaXMucmVsU2tpcCA9PT0gMCA/IDAgOiBzdGFydCAtIDEsXHJcbiAgICAgIGVuZCArIDFcclxuICAgICk7XHJcblxyXG4gICAgbGV0IGl0ZW06IGlSZWxhdGlvbjtcclxuICAgIGZvciAoaXRlbSBvZiBzbGljZWRBcnIpIHtcclxuICAgICAgaWYgKGkgPT09IGVuZCkgYnJlYWs7XHJcbiAgICAgIFBlZXJDb21wb25lbnQuY3JlYXRlUmVsYXRpb25JdGVtSFRNTChpdGVtKTtcclxuICAgICAgaSsrO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhbmQgcmV0dXJucyBhbiBIVE1MIGVsZW1lbnQgZnJvbSBhIHVzZXIgcmVsYXRpb24gZGF0YSBhYm91dCBhIHBlZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVsYXRpb24gfSBpdGVtIC0gdXNlcidzIHJlbGF0aW9uIG9iamVjdCB0byBkZXNjcmliZSBwZWVyXHJcbiAgICogQHJldHVybnMgeyBIVE1MRGl2RWxlbWVudCB8IHZvaWQgfVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZVJlbGF0aW9uSXRlbUhUTUwgPSAoXHJcbiAgICBpdGVtOiBpUmVsYXRpb25cclxuICApOiBIVE1MRGl2RWxlbWVudCB8IHZvaWQgPT4ge1xyXG4gICAgaXRlbSA9IEdlblV0aWwucmVsYXRpb25TdHJJbnRUb0Jvb2woaXRlbSkgYXMgaVJlbGF0aW9uO1xyXG4gICAgY29uc3QgdXNlclZhbGlkID0gVmFsaWRhdGUuY29udGFjdEl0ZW0oaXRlbSk7XHJcblxyXG4gICAgLy8gaWYgKCF1c2VyVmFsaWQuaXNWYWxpZCkge1xyXG4gICAgLy8gICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAvLyAgICAgXCJFUlJPUjogY29udGFjdCBpdGVtIGRhdGEgaXMgaW52YWxpZFwiLFxyXG4gICAgLy8gICAgIHVzZXJWYWxpZC5lcnJvclxyXG4gICAgLy8gICApO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIGl0ZW0gd3JhcHBlclxyXG4gICAgY29uc3QgaXRlbVdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaXRlbVdyYXAuY2xhc3NMaXN0LmFkZChcImNoYXQtY29udGFjdC1pdGVtXCIpO1xyXG4gICAgaXRlbVdyYXAuZGF0YXNldC51c2VySWQgPSBpdGVtLmFjY250X2lkO1xyXG4gICAgaXRlbVdyYXAuZGF0YXNldC5jaGF0SWQgPSBpdGVtLmNoYXRfaWQ7XHJcbiAgICBpdGVtV3JhcC5kYXRhc2V0LmlzTXV0ZWQgPSBgJHtpdGVtLm11dGV9YDtcclxuICAgIGl0ZW1XcmFwLmRhdGFzZXQuaXNCbG9ja2VkID0gYCR7aXRlbS5ibG9ja31gO1xyXG4gICAgaXRlbVdyYXAuZGF0YXNldC5pc0FyY2hpdmVkID0gYCR7aXRlbS5hcmNoaXZlfWA7XHJcbiAgICBpdGVtV3JhcC5kYXRhc2V0LmNoYXRUeXBlID0gaXRlbS50eXBlO1xyXG5cclxuICAgIC8vIGl0ZW0gbWFpblxyXG4gICAgLy8vLyBpdGVtIG1haW4gaWNvblxyXG4gICAgY29uc3QgaXRlbU5hbWVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGl0ZW1OYW1lSWNvbi50ZXh0Q29udGVudCA9IGl0ZW0uYWNjbnRfbmFtZVswXTtcclxuICAgIGl0ZW1OYW1lSWNvbi5jbGFzc0xpc3QuYWRkKFwiY2hhdC1jb250YWN0LWljb25cIik7XHJcblxyXG4gICAgLy8vLyBpdGVtIG1haW4gd3JhcFxyXG4gICAgY29uc3QgaXRlbU5hbWVXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGl0ZW1OYW1lV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1jb250YWN0LWluZm9cIik7XHJcbiAgICAvLy8vIGl0ZW0gbWFpbiBuYW1lXHJcbiAgICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcclxuICAgIGl0ZW1OYW1lLnRleHRDb250ZW50ID0gaXRlbS5hY2NudF9uYW1lO1xyXG4gICAgLy8vLyBpdGVtIG1haW4gY29udGVudCAtLS0tLS0tLS0tLS0tLS0gRURJVFxyXG4gICAgY29uc3QgaXRlbVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuXHJcbiAgICBjb25zdCBpdGVtVGV4dFRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIGNvbnN0IGl0ZW1UZXh0TXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHJcblxyXG4gICAgaWYgKGl0ZW0ubXV0ZSkge1xyXG4gICAgICBpdGVtVGV4dFRpbWUudGV4dENvbnRlbnQgPSBgLS0tYDtcclxuICAgICAgaXRlbVRleHRNc2cudGV4dENvbnRlbnQgPSBgIC0gLS0tLS0tYDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW1UZXh0VGltZS50ZXh0Q29udGVudCA9IGAtLS1gO1xyXG4gICAgICBpdGVtVGV4dE1zZy50ZXh0Q29udGVudCA9IGAgLSBTYXkgSGkhYDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmaXN0IG1zZyBpbmZvIGlzIHRpbWVcclxuICAgIGl0ZW1UZXh0LmFwcGVuZENoaWxkKGl0ZW1UZXh0VGltZSk7XHJcbiAgICAvLyBsYXN0IG1zZyBpbmZvIGlzIG1lc3NhZ2VcclxuICAgIGl0ZW1UZXh0LmFwcGVuZENoaWxkKGl0ZW1UZXh0TXNnKTtcclxuICAgIGl0ZW1OYW1lV3JhcC5hcHBlbmRDaGlsZChpdGVtTmFtZSk7XHJcbiAgICBpdGVtTmFtZVdyYXAuYXBwZW5kQ2hpbGQoaXRlbVRleHQpO1xyXG5cclxuICAgIC8vIGl0ZW0gdG9vbHRpcFxyXG4gICAgY29uc3QgaXRlbVRvb2x0aXBXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGl0ZW1Ub29sdGlwV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1jb250YWN0LXRvb2x0aXBcIik7XHJcblxyXG4gICAgLy8vLyBpdGVtIHRvb2x0aXAgaWNvblxyXG4gICAgY29uc3QgaXRlbVRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcclxuICAgIGl0ZW1Ub29sdGlwLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLWVsbGlwc2lzLXZlcnRpY2FsXCIpO1xyXG4gICAgLy8vLyBpdGVtIHRvb2x0aXAgY29udGVudFxyXG4gICAgY29uc3QgaXRlbVRvb2x0aXBDb250ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGl0ZW1Ub29sdGlwQ29udGV4dC5jbGFzc0xpc3QuYWRkKFwiY2hhdC1jb250YWN0LXRvb2x0aXAtY29udGVudFwiKTtcclxuXHJcbiAgICBpZiAoIWl0ZW0uYmxvY2spIHtcclxuICAgICAgY29uc3QgaXRlbVRvb2x0aXBCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICBpdGVtVG9vbHRpcEJsb2NrLnRleHRDb250ZW50ID0gY29udGFjdEFjdC5ibG9jaztcclxuICAgICAgaXRlbVRvb2x0aXBCbG9jay5kYXRhc2V0LmNvbnRhY3RBY3QgPSBjb250YWN0QWN0LmJsb2NrO1xyXG4gICAgICBpdGVtVG9vbHRpcENvbnRleHQuYXBwZW5kQ2hpbGQoaXRlbVRvb2x0aXBCbG9jayk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWl0ZW0ubXV0ZSkge1xyXG4gICAgICBjb25zdCBpdGVtVG9vbHRpcE11dGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgaXRlbVRvb2x0aXBNdXRlLnRleHRDb250ZW50ID0gY29udGFjdEFjdC5tdXRlO1xyXG4gICAgICBpdGVtVG9vbHRpcE11dGUuZGF0YXNldC5jb250YWN0QWN0ID0gY29udGFjdEFjdC5tdXRlO1xyXG4gICAgICBpdGVtVG9vbHRpcENvbnRleHQuYXBwZW5kQ2hpbGQoaXRlbVRvb2x0aXBNdXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpdGVtVG9vbHRpcEFyY2hpdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGl0ZW1Ub29sdGlwQXJjaGl2ZS50ZXh0Q29udGVudCA9IGNvbnRhY3RBY3QuYXJjaGl2ZTtcclxuICAgIGl0ZW1Ub29sdGlwQXJjaGl2ZS5kYXRhc2V0LmNvbnRhY3RBY3QgPSBjb250YWN0QWN0LmFyY2hpdmU7XHJcbiAgICBpdGVtVG9vbHRpcENvbnRleHQuYXBwZW5kQ2hpbGQoaXRlbVRvb2x0aXBBcmNoaXZlKTtcclxuICAgIGl0ZW1Ub29sdGlwQ29udGV4dC5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcImNsaWNrXCIsXHJcbiAgICAgIHRoaXMuY2xpY2tDb250YWN0QWN0aW9uSGFuZGxlclxyXG4gICAgKTtcclxuXHJcbiAgICBpdGVtVG9vbHRpcFdyYXAuYXBwZW5kQ2hpbGQoaXRlbVRvb2x0aXApO1xyXG4gICAgaXRlbVRvb2x0aXBXcmFwLmFwcGVuZENoaWxkKGl0ZW1Ub29sdGlwQ29udGV4dCk7XHJcblxyXG4gICAgaXRlbVdyYXAuYXBwZW5kQ2hpbGQoaXRlbU5hbWVJY29uKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lV3JhcCk7XHJcbiAgICBpdGVtV3JhcC5hcHBlbmRDaGlsZChpdGVtVG9vbHRpcFdyYXApO1xyXG4gICAgaXRlbU5hbWVXcmFwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmluc3RhbmNlIS5jbGlja1BlZXJJdGVtSGFuZGxlcik7XHJcblxyXG4gICAgdGhpcy5jaGF0UGVlckxpc3QuYXBwZW5kQ2hpbGQoaXRlbVdyYXApO1xyXG5cclxuICAgIHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNIVE1MLnB1c2goaXRlbVdyYXApO1xyXG5cclxuICAgIHJldHVybiBpdGVtV3JhcDtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGFuIG9iamVjdCBmb3IgYW4gSFRUUCBQT1NUIGZvciBwZWVyIGxpc3QgaXRlbXMgcmV0cmlldmFsLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBpUmVsQm9keSB9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjcmVhdGVSZWxSZXFCb2R5KCk6IGlSZWxCb2R5IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNvbnRhY3RUeXBlOiBcImNvbnRhY3RcIixcclxuICAgICAgY2hhdFR5cGU6IFwidXNlclwiLFxyXG4gICAgICBncm91cElkOiBudWxsLFxyXG4gICAgICBza2lwOiB0aGlzLnJlbFNraXAsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgcGVlciBsaXN0cyBmaXJzdCBpdGVtIGlmIGF2YWlsYWJsZS4gKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGNyZWF0ZUZpcnN0UGVlck1zZ0NvbXAgPSAoKSA9PiB7XHJcbiAgICBpZiAoUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm8ubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0UmVsYXRpb24gPSBQZWVyQ29tcG9uZW50LmNoYXRQZWVyUmVsYXRpb25zSW5mb1swXTtcclxuXHJcbiAgICAgIE1lc3NhZ2VzQ29tcG9uZW50LmdldEluc3RhbmNlKFxyXG4gICAgICAgIHRoaXMudXNlckRhdGEuYWN0X2lkLmFjY250X2lkLFxyXG4gICAgICAgIGZpcnN0UmVsYXRpb24uYWNjbnRfaWQsXHJcbiAgICAgICAgZmlyc3RSZWxhdGlvbi5hY2NudF9uYW1lLFxyXG4gICAgICAgIGZpcnN0UmVsYXRpb24uY2hhdF9pZCxcclxuICAgICAgICB0cnVlLFxyXG4gICAgICAgIGZpcnN0UmVsYXRpb24udHlwZSxcclxuICAgICAgICBmYWxzZSxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyBhIHBlZXIgaXRlbSBIVE1MLCBmcm9tOlxyXG4gICAqIC0gYWRkaW5nIGFuIGl0ZW0gdG8gcGVlciBsaXN0XHJcbiAgICogLSBtZXNzYWdlIGluZm9ybWF0aW9uXHJcbiAgICogLSByZW9yZGVyaW5nIHBlZXIgbGlzdCBpdGVtc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgaVJlbGF0aW9uIH0gcmVsIC0gdXNlciBkYXRhIG9uIGEgcGVlciBhYm91dCB0aGVpciByZWxhdGlvblxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5IH0gW21zZ10gLSBvcHRpb25hbCBtZXNzYWdlIGl0ZW1cclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgdXBkYXRlUGVlckxpc3RIVE1MID0gKHJlbDogaVJlbGF0aW9uLCBtc2c/OiBpTXNnQm9keSkgPT4ge1xyXG4gICAgY29uc3QgdlJlbEluZm8gPSB0aGlzLnNlYXJjaFBlZXJJbmZvKHJlbC5jaGF0X2lkKTtcclxuICAgIGxldCB2UmVsSFRNTDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBsZXQgd2l0aGluTGlzdDogYm9vbGVhbjtcclxuXHJcbiAgICBpZiAodlJlbEluZm8gJiYgXCJjaGF0X2lkXCIgaW4gdlJlbEluZm8pIHtcclxuICAgICAgd2l0aGluTGlzdCA9IHRydWU7XHJcbiAgICAgIC8vIGlmIHJlbCBpcyB3aXRoaW4gcGVlckluZm8sIGZldGNoIHByZXNlbnQgcmVwcmVzZW50aW5nIEhUTUxcclxuICAgICAgdlJlbEhUTUwgPSB0aGlzLnNlYXJjaFBlZXJIVE1MKHJlbC5jaGF0X2lkKSE7XHJcblxyXG4gICAgICAvLyBpZiByZWwgbm90IGF0b3AgcGVlckxpc3QsIHJlbW92ZSByZWwgZnJvbSBwZWVyTGlzdCAmIHBlZXJJbmZvXHJcbiAgICAgIGlmICh0aGlzLmNoYXRQZWVyUmVsYXRpb25zSFRNTFswXSAhPT0gdlJlbEhUTUwpIHtcclxuICAgICAgICB0aGlzLmNoYXRQZWVyUmVsYXRpb25zSFRNTCA9IHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNIVE1MLmZpbHRlcihcclxuICAgICAgICAgIChodG1sOiBIVE1MRGl2RWxlbWVudCkgPT4gaHRtbC5kYXRhc2V0LmNoYXRJZCAhPT0gcmVsLmNoYXRfaWRcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuY2hhdFBlZXJSZWxhdGlvbnNJbmZvID0gdGhpcy5jaGF0UGVlclJlbGF0aW9uc0luZm8uZmlsdGVyKFxyXG4gICAgICAgICAgKHJlbEluZm86IGlSZWxhdGlvbikgPT4gcmVsSW5mby5jaGF0X2lkICE9PSByZWwuY2hhdF9pZFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdpdGhpbkxpc3QgPSBmYWxzZTtcclxuICAgICAgLy8gaWYgcmVsIGlzIG5vdCB3aXRoaW4gcGVlckluZm8sIGNyZWF0ZSByZXByZXNlbnRpbmcgSFRNTFxyXG4gICAgICB2UmVsSFRNTCA9IHRoaXMuY3JlYXRlUmVsYXRpb25JdGVtSFRNTChyZWwpITtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBjYWxsZWQgZnJvbSBuZXcgbXNnLCBhZGQgbWVzc2FnZVxyXG4gICAgaWYgKG1zZyAhPT0gdW5kZWZpbmVkICYmIG1zZyAhPT0gbnVsbCAmJiBcIm1zZ1wiIGluIG1zZykge1xyXG4gICAgICBQZWVyQ29tcG9uZW50LnVwZGF0ZU1zZyh2UmVsSFRNTCwgbXNnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiByZWwgbm90IGF0b3AgcGVlckxpc3RcclxuICAgIGlmICh0aGlzLmNoYXRQZWVyUmVsYXRpb25zSFRNTFswXSAhPT0gdlJlbEhUTUwpIHtcclxuICAgICAgLy8gcGxhY2UgaXQgYXQgdGhlIHBlZXJMaXN0J3MgJiBwZWVySW5mbydzIGJlZ2lubmluZ1xyXG4gICAgICB0aGlzLmNoYXRQZWVyUmVsYXRpb25zSFRNTC51bnNoaWZ0KHZSZWxIVE1MKTtcclxuICAgICAgdGhpcy5jaGF0UGVlclJlbGF0aW9uc0luZm8udW5zaGlmdChyZWwpO1xyXG5cclxuICAgICAgLy8gcGxhY2UgaXQgYXQgdGhlIHBlZXJMaXN0J3MgSFRNTCBiZWdpbm5pbmdcclxuICAgICAgdGhpcy5jaGF0UGVlckxpc3QucmVtb3ZlQ2hpbGQodlJlbEhUTUwpO1xyXG4gICAgICB0aGlzLmNoYXRQZWVyTGlzdC5wcmVwZW5kKHZSZWxIVE1MKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgbWF0Y2hpbmcgcGVlciBpdGVtIG9iamVjdCBmcm9tIGNsYXNzIHN0b3JlZCBwZWVyIGl0ZW1zIGRhdGEuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBpZCAtIGFjY291bnQgaWQgb3IgZ3JvdXAgaWQgb2YgYSB1c2VyIHBlZXJcclxuICAgKiBAcmV0dXJucyB7IGlSZWxhdGlvbiB8IHVuZGVmaW5lZCB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHNlYXJjaFBlZXJJbmZvID0gKGlkOiBzdHJpbmcpOiBpUmVsYXRpb24gfCB1bmRlZmluZWQgPT4ge1xyXG4gICAgY29uc3QgdDogaVJlbGF0aW9uIHwgdW5kZWZpbmVkID0gUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0luZm8uZmluZChcclxuICAgICAgKHJlbDogaVJlbGF0aW9uKSA9PiByZWwuY2hhdF9pZCA9PT0gaWRcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIG1hdGNoaW5nIHBlZXIgaXRlbSBIVE1MIGVsZW1lbnQgZnJvbSBjbGFzcyB0cmFja2VkIHBlZXIgSFRNTCBhcnJheS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGlkIC0gYWNjb3VudCBpZCBvciBncm91cCBpZCBvZiBhIHVzZXIgcGVlclxyXG4gICAqIEByZXR1cm5zIHsgRGl2RWxlbWVudCB8IHVuZGVmaW5lZCB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHNlYXJjaFBlZXJIVE1MID0gKGlkOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB8IHZvaWQgPT4ge1xyXG4gICAgbGV0IGh0bWw7XHJcbiAgICB0aGlzLmNoYXRQZWVyUmVsYXRpb25zSFRNTC5mb3JFYWNoKChoOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoaC5kYXRhc2V0LmNoYXRJZCA9PT0gaWQpIHtcclxuICAgICAgICBodG1sID0gaDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGh0bWw7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvblxyXG4gICAqIC0gbG9vcHMgb3ZlciBhIGNlcnRhaW4gcmFuZ2Ugb2YgcGVlciBpdGVtIEhUTUxcclxuICAgKiAtIGZldGNoIGl0cyBtb3N0IHJlY2VudCBtZXNzYWdlLCBpZiBhdmFpbGFibGVcclxuICAgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IGZldGNoVG9wTXNncyA9IGFzeW5jICgpID0+IHtcclxuICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSB0aGlzLmdldFN0YXJ0RW5kKHRoaXMucmVsU2tpcCkhO1xyXG4gICAgdGhpcy5yZWxTa2lwKys7XHJcbiAgICBjb25zdCBzbGljZWRBcnJIVE1MID0gUGVlckNvbXBvbmVudC5jaGF0UGVlclJlbGF0aW9uc0hUTUwuc2xpY2Uoc3RhcnQsIGVuZCk7XHJcbiAgICBjb25zdCBjaGF0SWRzOiBBcnJheTxzdHJpbmcgfCB1bmRlZmluZWQ+ID0gc2xpY2VkQXJySFRNTFxyXG4gICAgICAubWFwKChoOiBIVE1MRGl2RWxlbWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiBoLmRhdGFzZXQuY2hhdElkKVxyXG4gICAgICAuZmlsdGVyKFxyXG4gICAgICAgIChzOiBzdHJpbmcgfCB1bmRlZmluZWQpID0+IHMgIT09IHVuZGVmaW5lZCAmJiBzICE9PSBudWxsICYmIHMubGVuZ3RoID4gMFxyXG4gICAgICApO1xyXG5cclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwR2V0VG9wTXNnLCBjaGF0SWRzKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgIGVycm9yLnNob3dDb21wKFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gZmV0Y2ggdG9wIGNoYXQgbWVzc2FnZVwiLCBlcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGNvbnN0IGh0dHBWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBgc2VydmVyIGVycm9yIG9jY3VyZWRgLFxyXG4gICAgICBgY2xpZW50IHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIGZvciB1cG9uIHJlcXVlc3QgZm9yIHRvcCBjaGF0IG1lc3NhZ2VgXHJcbiAgICApO1xyXG5cclxuICAgIGlmICghaHR0cFZhbGlkKSByZXR1cm47XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5kYXRhIGFzIGlNc2dCb2R5O1xyXG5cclxuICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YSA9PT0gbnVsbCB8fCAhKFwibXNnXCIgaW4gZGF0YSkpIHJldHVybjtcclxuXHJcbiAgICBQZWVyQ29tcG9uZW50LnVwZGF0ZU1zZ3Moc2xpY2VkQXJySFRNTCwgZGF0YSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXF1ZXN0cyBhbiBIVFRQIEdFVCB0byB0aGUgc2VydmVyIHRvIHJldHJpZXZlIGl0cyBtb3N0IHJlY2VudCBtZXNzYWdlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSBodG1sQXJyIC0gcGVlciBpdGVtIGh0bWwgYXMgc291cmNlIG9mIGNoYXQgSURcclxuICAgKiBAcGFyYW0geyBhbnkgfSBkYXRhIC1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgdXBkYXRlTXNncyA9IChodG1sQXJyOiBIVE1MRGl2RWxlbWVudFtdLCBkYXRhOiBhbnkpOiB2b2lkID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gdXBkYXRlcyBhbiBIVE1MIG1lc3NhZ2UgaW5mbyBlbGVtZW50cy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IEhUTUxEaXZFbGVtZW50IH0gaHRtbCAtIEhUTUwgZWxlbWVudCB0byBiZSBtb2RpZmllZFxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5IH0gZGF0YSAtIG1lc3NhZ2UgZGF0YVxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IHVwZGF0ZU1zZyA9IChcclxuICAgIGh0bWw6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgZGF0YTogaU1zZ0JvZHlcclxuICApID0+IHtcclxuICAgIGNvbnN0IHQgPSBodG1sLnF1ZXJ5U2VsZWN0b3IoXCJzcGFuOmZpcnN0LWNoaWxkXCIpITtcclxuICAgIHQudGV4dENvbnRlbnQgPSBHZW5VdGlsLm1pbGxpVG9UaW1lKCtkYXRhLnRpbWVSZWNlaXZlZCk7XHJcbiAgICBjb25zdCBtID0gaHRtbC5xdWVyeVNlbGVjdG9yKFwic3BhbjpsYXN0LWNoaWxkXCIpITtcclxuICAgIG0udGV4dENvbnRlbnQgPSBcIiAtIFwiLmNvbmNhdChkYXRhLm1zZy5zbGljZSgwLCAxMCkpLmNvbmNhdChcIiAuLi5cIik7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBlaXRoZXIgcmV0dXJuc1xyXG4gICAqIC0gYW5ldyBvciBvbGQgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzXHJcbiAgICogLSBudWxsIGlmIHRoZSBjbGFzcyBpcyBpbnN0cnVjdGVkIHRvIGJlIGRlbGV0ZWRcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGJvb2xlYW4gfSBkZWxldGVJbnN0YW5jZSAtIGZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRoaXMgY2xhc3Mgd2lsbCBiZSBkZWxldGVkXHJcbiAgICogQHBhcmFtIHsgaVVzZXJPYmogfSB1c2VyT2JqIC0gdXNlciBkYXRhXHJcbiAgICogQHJldHVybnMgeyBQZWVyQ29tcG9uZW50IHwgbnVsbCB9XHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldEluc3RhbmNlID0gKFxyXG4gICAgZGVsZXRlSW5zdGFuY2U6IGJvb2xlYW4sXHJcbiAgICB1c2VyT2JqOiBpVXNlck9ialxyXG4gICk6IFBlZXJDb21wb25lbnQgfCBudWxsID0+IHtcclxuICAgIGlmICghZGVsZXRlSW5zdGFuY2UpIHtcclxuICAgICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFBlZXJDb21wb25lbnQodXNlck9iaik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcclxuICAgICAgdGhpcy5jaGF0UGVlclJlbGF0aW9uc0luZm8ubGVuZ3RoID0gMDtcclxuICAgICAgdGhpcy5jaGF0UGVlclJlbGF0aW9uc0hUTUwubGVuZ3RoID0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IEdlblV0aWwgfSBmcm9tIFwiLi4vdXRpbC9nZW4udXRpbFwiO1xyXG5pbXBvcnQgeyB0cnlDYXRjaCB9IGZyb20gXCIuLi91dGlsL2FzeW5jV3JhcC51dGlsXCI7XHJcbmltcG9ydCB7IFZhbGlkYXRlIH0gZnJvbSBcIi4uL3V0aWwvdmFsaWRhdGlvbi51dGlsXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2Jhc2UuY29tcFwiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcFwiO1xyXG5pbXBvcnQgeyBpUmVsYXRpb25BY3QgfSBmcm9tIFwiLi4vbW9kZWxzL3BlZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgUGVlckNvbXBvbmVudCB9IGZyb20gXCIuL3BlZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSBcIi4vYXV0aC5jb21wXCI7XHJcbmltcG9ydCB7IFNvY2tldE1ldGhvZHMgfSBmcm9tIFwiLi4vdXRpbC9zb2NrZXQudXRpbFwiO1xyXG5pbXBvcnQgeyBpSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9odHRwLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlWYWxpZGl0eVR5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL3ZhbGlkaXR5Lm1vZGVsXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VzQ29tcG9uZW50IH0gZnJvbSBcIi4vbXNncy5jb21wXCI7XHJcbmltcG9ydCB7IGlSZXF1ZXN0Qm9keSwgaVN0ckJvb2wgfSBmcm9tIFwiLi4vbW9kZWxzL2dlbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBFcnJvckNvbXBvbmVudCBhcyBlcnJvciB9IGZyb20gXCIuL2Vycm9yLmNvbXBcIjtcclxuaW1wb3J0IHtcclxuICBpUmVxdWVzdCxcclxuICBpUmVsYXRpb24sXHJcbiAgaVByaXZhY3lSZXF1ZXN0LFxyXG4gIGlVc2VyUHJpdmFjeVByb3AsXHJcbiAgaVVzZXJPYmosXHJcbn0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7XHJcbiAgaVVzZXIsXHJcbiAgdXNlclNldHRpbmdzLFxyXG4gIGlVc2VyUGFzc3dvcmQsXHJcbiAgcmVxdWVzdEFjdGlvbnMsXHJcbiAgaVJlcXVlc3RBY3Rpb25zLFxyXG59IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQge1xyXG4gIGh0dHBHZXRVc2VyLFxyXG4gIGh0dHBHZXRMb2dvdXQsXHJcbiAgaHR0cFBhdGNoUmVsYXRpb24sXHJcbiAgaHR0cFB1dFVzZXJSZXF1ZXN0LFxyXG4gIGh0dHBQdXRVc2VyUHJpdmFjeSxcclxuICBodHRwUHV0VXNlclBhc3N3b3JkLFxyXG59IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBob2xkcyBmdW5jdGlvbnMgdy9jIG1hbmFnZXMgYW5kIHJlbmRlcnMgZGF0YSByZWdhcmRpbmcgdXNlciBzZXR0aW5ncyBhbmQgcmVxdWVzdHMuXHJcbiAqXHJcbiAqIEBleHRlbmRzIENvbXBvbmVudFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVzZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxFbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFVzZXJDb21wb25lbnQgfCBudWxsO1xyXG5cclxuICBwcml2YXRlIGFwcENvbXA6IEFwcENvbXBvbmVudCA9IEFwcENvbXBvbmVudC5nZXRJbnN0YW5jZSgpO1xyXG4gIHByaXZhdGUgY2hhdFVzZXJXcmFwITogSFRNTERpdkVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0UGVlcldyYXAhOiBIVE1MRGl2RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyUmVtb3ZlITogSFRNTEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0VXNlck5hbWUhOiBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0VXNlckhlYWRzITogQXJyYXk8SFRNTEhlYWRpbmdFbGVtZW50PjtcclxuICBwcml2YXRlIGNoYXRVc2VySW52aXRlcyE6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHN0YXRpYyBjaGF0VXNlckluY29taW5nV3JhcDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgc3RhdGljIGNoYXRVc2VyT3V0Z29pbmdXcmFwOiBIVE1MRGl2RWxlbWVudDtcclxuICBzdGF0aWMgY2hhdFVzZXJNdXRlc1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHN0YXRpYyBjaGF0VXNlckJsb2Nrc1dyYXA6IEhUTUxEaXZFbGVtZW50O1xyXG4gIHByaXZhdGUgY2hhdFVzZXJQdWJsaWMhOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyQXZhaWxhYmlsaXR5ITogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0VXNlckZvcm0hOiBIVE1MRm9ybUVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGF0VXNlclBhc3N3b3JkITogSFRNTElucHV0RWxlbWVudDtcclxuICBwcml2YXRlIGNoYXRVc2VyUmVQYXNzd29yZCE6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgcHJpdmF0ZSBjaGFzdFVzZXJMb2dvdXQhOiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgLy8gQ09NUE9ORU5UIEZFVENIRUQgREFUQVxyXG5cclxuICAvKiogQHR5cGUgeyBpVXNlciB9IC0gZGF0YSByZWdhcmRpbmcgbG9nZ2VkIHVzZXIncyBzZWN1cml0eSwgcmVxdWVzdHMsICYgcmVsYXRpb25zKi9cclxuICBwcml2YXRlIGNoYXRVc2VySW5mbyE6IGlVc2VyO1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGluc3RhbnRpYXRpb24sIHRoZSBjb25zdHJ1Y3RvciBpbW1lZGlhdGVseSBzZW5kcyByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgZm9yIHVzZXIgZGF0YS5cclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcihcIi5jaGF0LXVzZXItd3JhcFwiLCBcInVzZXItdGVtcFwiLCBcImFmdGVyYmVnaW5cIik7XHJcblxyXG4gICAgdGhpcy5jb25maWd1cmVDb21wb25lbnQoKTtcclxuXHJcbiAgICAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0VXNlcigpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQ29tcG9uZW50KCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGVycm9yLnNob3dDb21wKGBjbGllbnQgaXMgdW5hYmxlIHRvIGdldCB1c2VyIGRhdGFgLCBlcnIpO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuXHJcbiAgY29uZmlndXJlQ29tcG9uZW50KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jaGF0VXNlclJlbW92ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci1uYW1lID4gaVwiXHJcbiAgICApISBhcyBIVE1MRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC11c2VyLW5hbWUgPiBoMlwiXHJcbiAgICApISBhcyBIVE1MSGVhZGluZ0VsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRVc2VyV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci13cmFwXCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0UGVlcldyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXBlZXItd3JhcFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJIZWFkcyA9IFtcclxuICAgICAgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jaGF0LXVzZXItaGVhZFwiKSxcclxuICAgIF0hIGFzIEFycmF5PEhUTUxIZWFkaW5nRWxlbWVudD47XHJcbiAgICB0aGlzLmNoYXRVc2VySW52aXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLmNoYXQtdXNlci1pbnZpdGF0aW9uc1wiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJJbmNvbWluZ1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItaW5jb21pbmctaXRlbXMtd3JhcFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJPdXRnb2luZ1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItb3V0Z29pbmctaXRlbXMtd3JhcFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIC8vIFVzZXJDb21wb25lbnQuY2hhdFVzZXJNdXRlc1dyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgLy8gICBcIi5jaGF0LXVzZXItbXV0ZXNcIlxyXG4gICAgLy8gKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBVc2VyQ29tcG9uZW50LmNoYXRVc2VyTXV0ZXNXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC11c2VyLW11dGUtaXRlbXMtd3JhcFwiXHJcbiAgICApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIC8vIFVzZXJDb21wb25lbnQuY2hhdFVzZXJCbG9ja3NXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgIC8vICAgXCIuY2hhdC11c2VyLWJsb2Nrc1wiXHJcbiAgICAvLyApISBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJCbG9ja3NXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC11c2VyLWJsb2NrLWl0ZW1zLXdyYXBcIlxyXG4gICAgKSEgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0aGlzLmNoYXRVc2VyUHVibGljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuY2hhdC11c2VyLXNlY3VyaXR5LXB1YmxpY1wiXHJcbiAgICApISBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJBdmFpbGFiaWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItc2VjdXJpdHktYXZhaWxhYmlsaXR5XCJcclxuICAgICkhIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0VXNlckZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItc2V0LXBhc3N3b3JkXCJcclxuICAgICkhIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuICAgIHRoaXMuY2hhdFVzZXJQYXNzd29yZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI3NldC1wYXNzd29yZFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5jaGF0VXNlclJlUGFzc3dvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNzZXQtcmVQYXNzd29yZFwiXHJcbiAgICApISBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgdGhpcy5jaGFzdFVzZXJMb2dvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIi5jaGF0LXVzZXItbG9nb3V0XCJcclxuICAgICkhIGFzIEhUTUxEaXZFbGVtZW50O1xyXG5cclxuICAgIHRoaXMuY2hhdFVzZXJSZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2hhdFVzZXJSZW1vdmVIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFVzZXJQdWJsaWMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tVc2VyUHVibGljSGFuZGxlcik7XHJcbiAgICB0aGlzLmNoYXRVc2VyQXZhaWxhYmlsaXR5LmFkZEV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwiY2xpY2tcIixcclxuICAgICAgdGhpcy5jbGlja1VzZXJBdmFpbGFiaWxpdHlIYW5kbGVyXHJcbiAgICApO1xyXG4gICAgdGhpcy5jaGF0VXNlckZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCB0aGlzLnN1Ym1pdFBhc3N3b3JkSGFuZGxlcik7XHJcbiAgICB0aGlzLmNoYXRVc2VySW52aXRlcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5jbGlja1VzZXJSZXF1ZXN0KTtcclxuICAgIHRoaXMuY2hhc3RVc2VyTG9nb3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnVzZXJMb2dvdXRIYW5kbGVyKTtcclxuICAgIHRoaXMuY2hhdFRvZ2dsZVVzZXJTZWN0aW9uKCk7XHJcbiAgfVxyXG4gIHJlbmRlckNvbXBvbmVudCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hhdFVzZXJOYW1lLnRleHRDb250ZW50ID0gdGhpcy5jaGF0VXNlckluZm8uYWNjbnRfbmFtZTtcclxuICAgIHRoaXMuY2hhdFVzZXJQdWJsaWMuZGF0YXNldC5zZXR0aW5nc1Byb3BlcnR5ID0gdXNlclNldHRpbmdzLnB1YmxpYztcclxuICAgIHRoaXMuY2hhdFVzZXJQdWJsaWMuZGF0YXNldC5zZXR0aW5nc1B1YmxpYyA9IGAke3RoaXMuY2hhdFVzZXJJbmZvLnByaXZhY3kucHVibGljfWA7XHJcbiAgICB0aGlzLmNoYXRVc2VyQXZhaWxhYmlsaXR5LmRhdGFzZXQuc2V0dGluZ3NQcm9wZXJ0eSA9XHJcbiAgICAgIHVzZXJTZXR0aW5ncy5hdmFpbGFiaWxpdHk7XHJcbiAgICB0aGlzLmNoYXRVc2VyQXZhaWxhYmlsaXR5LmRhdGFzZXQuc2V0dGluZ3NBdmFpbGFiaWxpdHkgPSBgJHt0aGlzLmNoYXRVc2VySW5mby5wcml2YWN5LmF2YWlsYWJpbGl0eX1gO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVSZXF1ZXN0cygpO1xyXG4gICAgdGhpcy5nZW5lcmF0ZU11dGVCbG9ja0l0ZW0oKTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLSBFVkVOVCBIQU5ETEVSUyAtLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gaGlkZXMgdXNlciBjb21wb25lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBNb3VzZUV2ZW50IH0gW2VdXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjaGF0VXNlclJlbW92ZUhhbmRsZXIgPSAoZT86IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcclxuICAgIHRoaXMuY2hhdFVzZXJXcmFwLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGF0LXVzZXItc2hvd1wiKTtcclxuICB9O1xyXG5cclxuICAvKiogVGhpcyBmdW5jdGlvbiBhc3NpZ25zIGV2ZW50IGxpc3RlbmVycyB0byB1c2VyIGNvbXBvbmVudCBzZWN0aW9ucycgaGVhZHMuICovXHJcbiAgcHJpdmF0ZSBjaGF0VG9nZ2xlVXNlclNlY3Rpb24gPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLmNoYXRVc2VySGVhZHMuZm9yRWFjaCgoaGVhZCkgPT4ge1xyXG4gICAgICBoZWFkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsaWNrVXNlclNlY3Rpb25IYW5kbGVyKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb24gdG9nZ2xlcyB2aXNpYmlsaXR5IG9mIGNsaWNrZWQgdXNlciBjb21wb25lbnQgc2VjdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGlja1VzZXJTZWN0aW9uSGFuZGxlciA9IChlOiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBoZWFkSWNvbjogSFRNTEVsZW1lbnQgPSAoXHJcbiAgICAgIGUudGFyZ2V0IGFzIEhUTUxIZWFkaW5nRWxlbWVudFxyXG4gICAgKS5xdWVyeVNlbGVjdG9yKFwiaVwiKSEgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdCBoZWFkU2libGluZzogSFRNTEVsZW1lbnQgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpXHJcbiAgICAgIC5uZXh0RWxlbWVudFNpYmxpbmchIGFzIEhUTUxFbGVtZW50O1xyXG5cclxuICAgIGhlYWRJY29uLmNsYXNzTGlzdC50b2dnbGUoXCJjaGF0LXVzZXItaGVhZC10b2dnbGVkXCIpO1xyXG4gICAgaGVhZFNpYmxpbmcuY2xhc3NMaXN0LnRvZ2dsZShcImNoYXQtdXNlci1jb250ZW50LXRvZ2dsZVwiKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGNhbGxiYWNrIGxpc3RlbnMgdG8gY2xpY2sgZXZlbnRzIHdoaWNoIHdpbGwgZW1pdCBhIHNvY2tldCBldmVudCB0byB0aGUgc2VydmVyIHRvIHJlc3BvbmQgdG8gcGVlciB8IGdyb3VwIHJlcXVlc3RzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrVXNlclJlcXVlc3QgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgLy8gREFUQSBHQVRIRVJJTkdcclxuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgcmVxQm9keSA9IHRoaXMuY3JlYXRlUmVxdWVzdEJvZHkoXHJcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5kYXRhc2V0LmlzR3JvdXAgYXMgaVN0ckJvb2wsXHJcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5kYXRhc2V0LnVzZXJJZCBhcyBzdHJpbmdcclxuICAgICk7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0YXJnZXQuZGF0YXNldC5yZXF1ZXN0QWN0aW9uIGFzIGlSZXF1ZXN0QWN0aW9ucztcclxuXHJcbiAgICBpZiAoIWFjdGlvbikgcmV0dXJuO1xyXG5cclxuICAgIC8vIFZBTElEQVRJT05cclxuICAgIGNvbnN0IHJlcXVlc3RWYWxpZCA9IFZhbGlkYXRlLnBhdGNoUmVxdWVzdERhdGEocmVxQm9keSwgYWN0aW9uKTtcclxuICAgIGlmICghcmVxdWVzdFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRVJST1I6IGNsaWVudCBkYXRhIGZvciB1c2VyIHJlcXVlc3QgYWN0aW9uIGlzIGludmFsaWRgKTtcclxuICAgICAgY29uc29sZS5lcnJvcihyZXF1ZXN0VmFsaWQuZXJyb3IpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU09DS0VUIFJFUVVFU1RcclxuICAgIGlmIChcclxuICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJlcXVlc3QtYWN0aW9uXCIpICYmXHJcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50XHJcbiAgICApIHtcclxuICAgICAgU29ja2V0TWV0aG9kcy5zb2NrZXQ/LmVtaXQoU29ja2V0TWV0aG9kcy5wYXRjaFJlcXVlc3RFdiwgcmVxQm9keSwgYWN0aW9uKTtcclxuXHJcbiAgICAgIC8vIHRyeSB7XHJcbiAgICAgIC8vICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwUHV0VXNlclJlcXVlc3QsIHJlcUJvZHksIGFjdGlvbik7XHJcblxyXG4gICAgICAvLyAgIGlmIChyZXNwb25zZS5kYXRhKSB7XHJcbiAgICAgIC8vICAgICBpZiAoXHJcbiAgICAgIC8vICAgICAgIHJlc3BvbnNlLmRhdGEuc3RhdHVzQ29kZSA+PSAyMDAgJiZcclxuICAgICAgLy8gICAgICAgcmVzcG9uc2UuZGF0YS5zdGF0dXNDb2RlIDwgNDAwXHJcbiAgICAgIC8vICAgICApIHtcclxuICAgICAgLy8gICAgICAgcmV0dXJuO1xyXG4gICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgLy8gICAgICAgY29uc29sZS5lcnJvcihcclxuICAgICAgLy8gICAgICAgICBcIkVSUk9SOiBzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyLXRvLXVzZXIgY29udGFjdCByZXF1ZXN0XCJcclxuICAgICAgLy8gICAgICAgKTtcclxuICAgICAgLy8gICAgICAgY29uc29sZS5lcnJvcihyZXNwb25zZS5kYXRhKTtcclxuICAgICAgLy8gICAgICAgcmV0dXJuO1xyXG4gICAgICAvLyAgICAgfVxyXG4gICAgICAvLyAgIH0gZWxzZSB7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAvLyAgICAgICBcIkVSUk9SOiBzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgdXNlciByZXF1ZXN0IGZybyB1c2VyLXRvLXVzZXIgY29udGFjdCByZXF1ZXN0XCJcclxuICAgICAgLy8gICAgICk7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmVycm9yKHJlc3BvbnNlLmVycik7XHJcbiAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgIC8vICAgfVxyXG4gICAgICAvLyB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgLy8gICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAvLyAgICAgYEVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIHJlcXVlc3QgdXNlci10by11c2VyIGNvbnRhY3QgcmVxdWVzdGBcclxuICAgICAgLy8gICApO1xyXG4gICAgICAvLyAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcclxuICAgICAgLy8gfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqICBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uXHJcbiAgICogLSByZXF1ZXN0cyBhbiBIVFRQIFBBVENIIHRvIHRoZSBzZXJ2ZXIgdG8gbW9kaWZ5IHVzZXIgcmVsYXRpb25zaGlwIHN0YXR1cyBmcm9tIHRhcmdldCBwZWVyXHJcbiAgICogLSBtb2RpZmllcyBwZWVyIGxpc3QgaXRlbSBhY2NvcmRpbmcgdG8gYWN0aWlvbiB0YWtlblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8dm9pZD4gfVxyXG4gICAqXHJcbiAgICogQGxpc3RlbnMgTW91c2VFdmVudFxyXG4gICAqL1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGNsaWNrVXNlck11dGVCbG9jayA9IGFzeW5jIChcclxuICAgIGU6IE1vdXNlRXZlbnRcclxuICApOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCBhcyBIVE1MRWxlbWVudDtcclxuICAgIGNvbnN0IGFjdGlvbjogXCJtdXRlXCIgfCBcImJsb2NrXCIgPSAodGFyZ2V0LnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpXHJcbiAgICAgIC5kYXRhc2V0LmFjdGlvbiEgYXMgXCJtdXRlXCIgfCBcImJsb2NrXCI7XHJcblxyXG4gICAgY29uc3QgcmVsYXRpb25BY3Q6IGlSZWxhdGlvbkFjdCA9IHtcclxuICAgICAgcmVjaXBpZW50SWQ6ICh0YXJnZXQucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCkuZGF0YXNldFxyXG4gICAgICAgIC51c2VySWQhIGFzIHN0cmluZyxcclxuICAgICAgdXNlckFjdGlvbjogYWN0aW9uLFxyXG4gICAgICBhY3Rpb25WYWx1ZTogZmFsc2UsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFZBTElEQVRJT05cclxuICAgIGNvbnN0IHJlbEFjdFZhbGlkID0gVmFsaWRhdGUucmVsYXRpb25BY3Rpb24ocmVsYXRpb25BY3QpO1xyXG4gICAgaWYgKCFyZWxBY3RWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBjbGllbnQgcmVxdWVzdCBkYXRhIGZvciB1c2VyIHJlbGF0aW9uIHBhdGNoIGlzIGludmFsaWRcIixcclxuICAgICAgICByZWxBY3RWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgLy8gUEFUQ0ggdG8gdXNlciByZWxhdGlvbnNcclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQYXRjaFJlbGF0aW9uLCByZWxhdGlvbkFjdCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIFwiRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gcmVxdWVzdCBmb3IgcGF0Y2hpbmcgb2YgdXNlciByZWxhdGlvbnNcIixcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICBjb25zdCByZXNWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBcInNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyB1c2VyJ3MgcmVxdWVzdCBmb3IgcGF0Y2hpbmcgcmVsYXRpb25zXCIsXHJcbiAgICAgIFwic2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIHVwb24gdXNlcidzIHJlcXVlc3QgZm9yIHBhdGNoaW5nIHJlbGF0aW9uc1wiXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8qXHJcbiAgICBNVVRFIHwgQkxPQ0tcclxuICAgIC0tLSBpZiB1bm11dGVkIHBlZXIgbGlzdCBpdGVtIGlzIHdpdGhpbiB2aXNpYmxlIHBlZXJsaXN0XHJcbiAgICAtLS0gc29ydCBieSBidW1wLCB0aGVuIGFkZCBpdGVtXHJcbiAgICAqL1xyXG5cclxuICAgIC8vIFJFTU9WRSBNVVRFIHwgQkxPQ0sgSVRFTVxyXG4gICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnJlbW92ZUNoaWxkKFxyXG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudFxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTRUFSQ0ggRk9SIFJFTEFUSU9OIElURU0gSU4gUEVFUiBDT01QT05FTlRcclxuICAgIC8vIC0tLSBJRiBWSVNJQkxFLCBBQ1QsIE9USEVSV0lTRSwgSUdOT1JFXHJcbiAgICBjb25zdCByZWxJdGVtID0gUGVlckNvbXBvbmVudC5zZWFyY2hQZWVySFRNTChcclxuICAgICAgKHRhcmdldC5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnVzZXJJZCBhcyBzdHJpbmdcclxuICAgICk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVXBvbiBjYWxsYmFjaywgdGhpcyBmdW5jdGlvbiByZXF1ZXN0cyBhbiBIVFRQIFBVVCB0byB0aGUgc2VydmVyIHRvIG1vZGlmeSB0aGVpciBwdWJsaWNpdHkgc2V0dGluZy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBlXHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBNb3VzZUV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGlja1VzZXJQdWJsaWNIYW5kbGVyID0gYXN5bmMgKGU6IE1vdXNlRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIC8vIERBVEEgR0FUSEVSSU5HXHJcbiAgICBjb25zdCB1c2VyUHJpdmFjeTogaVByaXZhY3lSZXF1ZXN0ID0ge1xyXG4gICAgICBwcm9wZXJ0eTogdGhpcy5jaGF0VXNlclB1YmxpYy5kYXRhc2V0XHJcbiAgICAgICAgLnNldHRpbmdzUHJvcGVydHkgYXMgaVVzZXJQcml2YWN5UHJvcCxcclxuICAgICAgdmFsdWU6XHJcbiAgICAgICAgKHRoaXMuY2hhdFVzZXJQdWJsaWMuZGF0YXNldC5zZXR0aW5nc1B1YmxpYyBhcyBpU3RyQm9vbCkgPT09IFwidHJ1ZVwiXHJcbiAgICAgICAgICA/IFwiZmFsc2VcIlxyXG4gICAgICAgICAgOiBcInRydWVcIixcclxuICAgIH07XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgY29uc3QgcHJpdmFjeURhdGFWYWxpZCA9IFZhbGlkYXRlLnByaXZhY3lEYXRhKFxyXG4gICAgICB1c2VyUHJpdmFjeSxcclxuICAgICAgdXNlclNldHRpbmdzLnB1YmxpY1xyXG4gICAgKTtcclxuICAgIGlmICghcHJpdmFjeURhdGFWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IHByaXZhY3kgZGF0YSBmb3IgdXNlciBwdWJsaWNpdHkgY29uZmlndXJhdGlvbiByZXF1ZXN0IGlzIGludmFsaWRgLFxyXG4gICAgICAgIHByaXZhY3lEYXRhVmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIVFRQIFJFUVVFU1RcclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQdXRVc2VyUHJpdmFjeSwgdXNlclByaXZhY3kpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IGNsaWVudCBpcyB1bmFibGUgdG8gc2VuZCByZXF1ZXN0IGZvciB1c2VyIHByaXZhY3kgY29uZmlndXJhdGlvbmAsXHJcbiAgICAgICAgZXJyXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVkFMSURBVElPTjogSFRUUCBSRVNQT05TRVxyXG4gICAgY29uc3QgcmVzVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgXCJzZXJ2ZXIgaXMgdW5hYmxlIHRvIHByb2Nlc3MgY2xpZW50J3MgcmVxdWVzdCBmb3IgcHJpdmFjeSBjb25maWd1cmF0aW9uXCIsXHJcbiAgICAgIFwic2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIHVwb24gY2xpZW50J3MgcmVxdWVzdCBmb3IgdXNlciBwcml2YWN5IGNvbmZpZ3VyYXRpb25cIlxyXG4gICAgKTtcclxuICAgIGlmICghcmVzVmFsaWQpIHJldHVybjtcclxuXHJcbiAgICAvLyBIVFRQIFJFUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgY29uc3QgcHVibGljVmFsdWUgPVxyXG4gICAgICAodGhpcy5jaGF0VXNlclB1YmxpYy5kYXRhc2V0LnNldHRpbmdzUHVibGljIGFzIGlTdHJCb29sKSA9PT0gXCJ0cnVlXCJcclxuICAgICAgICA/IFwiZmFsc2VcIlxyXG4gICAgICAgIDogXCJ0cnVlXCI7XHJcbiAgICB0aGlzLmNoYXRVc2VyUHVibGljLmRhdGFzZXQuc2V0dGluZ3NQdWJsaWMgPSBwdWJsaWNWYWx1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uIHJlcXVlc3RzIGFuIEhUVFAgUFVUIHRvIHRoZSBzZXJ2ZXIgdG8gbW9kaWZ5IHRoZWlyIGF2YWlsYWJpbGl0eSBzZXR0aW5nLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgTW91c2VFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIE1vdXNlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIGNsaWNrVXNlckF2YWlsYWJpbGl0eUhhbmRsZXIgPSBhc3luYyAoXHJcbiAgICBlOiBNb3VzZUV2ZW50XHJcbiAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgdXNlclByaXZhY3k6IGlQcml2YWN5UmVxdWVzdCA9IHtcclxuICAgICAgcHJvcGVydHk6IHRoaXMuY2hhdFVzZXJBdmFpbGFiaWxpdHkuZGF0YXNldFxyXG4gICAgICAgIC5zZXR0aW5nc1Byb3BlcnR5IGFzIGlVc2VyUHJpdmFjeVByb3AsXHJcbiAgICAgIHZhbHVlOlxyXG4gICAgICAgICh0aGlzLmNoYXRVc2VyQXZhaWxhYmlsaXR5LmRhdGFzZXQuc2V0dGluZ3NBdmFpbGFiaWxpdHkgYXMgaVN0ckJvb2wpID09PVxyXG4gICAgICAgIFwidHJ1ZVwiXHJcbiAgICAgICAgICA/IFwiZmFsc2VcIlxyXG4gICAgICAgICAgOiBcInRydWVcIixcclxuICAgIH07XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgY29uc3QgcHJpdmFjeURhdGFWYWxpZCA9IFZhbGlkYXRlLnByaXZhY3lEYXRhKFxyXG4gICAgICB1c2VyUHJpdmFjeSxcclxuICAgICAgdXNlclNldHRpbmdzLmF2YWlsYWJpbGl0eVxyXG4gICAgKTtcclxuICAgIGlmICghcHJpdmFjeURhdGFWYWxpZC5pc1ZhbGlkKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IHByaXZhY3kgZGF0YSBmb3IgdXNlciBhdmFpbGFiaWxpdHkgY29uZmlndXJhdGlvbiByZXF1ZXN0IGlzIGludmFsaWRgLFxyXG4gICAgICAgIHByaXZhY3lEYXRhVmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIVFRQIFJFUVVFU1RcclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBQdXRVc2VyUHJpdmFjeSwgdXNlclByaXZhY3kpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBcIkVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIHNlbmQgcmVxdWVzdCBmb3IgcHVibGljaXR5IGNvbmZpZ3VyYXRpb25cIixcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICBjb25zdCByZXNWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBcInNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyBjbGllbnQncyByZXF1ZXN0IGZvciBwcml2YWN5IGNvbmZpZ3VyYXRpb25cIixcclxuICAgICAgXCJzZXJ2ZXIgcmVzcG9uZGVkIHdpdGggYW4gZXJyb3IgdXBvbiBjbGllbnQncyByZXF1ZXN0IGZvciB1c2VyIHByaXZhY3kgY29uZmlndXJhdGlvblwiXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgY29uc3QgcHVibGljVmFsdWUgPVxyXG4gICAgICAodGhpcy5jaGF0VXNlckF2YWlsYWJpbGl0eS5kYXRhc2V0LnNldHRpbmdzQXZhaWxhYmlsaXR5IGFzIGlTdHJCb29sKSA9PT1cclxuICAgICAgXCJ0cnVlXCJcclxuICAgICAgICA/IFwiZmFsc2VcIlxyXG4gICAgICAgIDogXCJ0cnVlXCI7XHJcbiAgICB0aGlzLmNoYXRVc2VyQXZhaWxhYmlsaXR5LmRhdGFzZXQuc2V0dGluZ3NBdmFpbGFiaWxpdHkgPSBwdWJsaWNWYWx1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBVcG9uIGNhbGxiYWNrLCB0aGlzIGZ1bmN0aW9uIHJlcXVlc3RzIGFuIEhUVFAgUFVUIHRvIHRoZSBzZXJ2ZXIgdG8gbW9kaWZ5IHRoZWlyIGFjY291bnQgcGFzc3dvcmQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBTdWJtaXRFdmVudCB9IGVcclxuICAgKlxyXG4gICAqIEBsaXN0ZW5zIFN1Ym1pdEV2ZW50XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzdWJtaXRQYXNzd29yZEhhbmRsZXIgPSBhc3luYyAoZTogU3VibWl0RXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgcGFzc3dvcmRTZXQ6IGlVc2VyUGFzc3dvcmQgPSB0aGlzLmdldFBhc3N3b3JkRm9ybSgpO1xyXG4gICAgY29uc3QgcGFzc3dvcmRWYWxpZDogaVZhbGlkaXR5VHlwZSA9XHJcbiAgICAgIFZhbGlkYXRlLmNoYW5nZVBhc3N3b3JkRm9ybShwYXNzd29yZFNldCk7XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgaWYgKCFwYXNzd29yZFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogcGFzc3dvcmQgZGF0YSBmb3IgdXNlciBzZWN1cml0eSBjb25maWd1cmF0aW9uIHJlcXVlc3QgaXMgaW52YWxpZGAsXHJcbiAgICAgICAgcGFzc3dvcmRWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cFB1dFVzZXJQYXNzd29yZCwgcGFzc3dvcmRTZXQpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIHJldHVybiBlcnJvci5zaG93Q29tcChcclxuICAgICAgICBgRVJST1I6IHNvbWV0aGluZyB3ZW50IHdyb25nIHVwb24gY2xpZW50J3MgcmVxdWVzdCBmb3IgcGFzc3dvcmQgY2hhbmdlYCxcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICBjb25zdCByZXNWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBcInNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyB1c2VyIGxvZ291dFwiLFxyXG4gICAgICBcInNlcnZlciByZXNwb25kZWQgd2l0aCBhbiBlcnJvciBpcyB1bmFibGUgdG8gc2VuZCByZXF1ZXN0IGZvciB1c2VyIGxvZ291dFwiXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IHRoaXMudXNlckxvZ291dEhhbmRsZXIoKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgYEVSUk9SOiBjbGllbnQgaXMgdW5hYmxlIHRvIHNlbmQgcmVxdWVzdCBmb3IgdXNlciBsb2dvdXRgLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jbGVhclBhc3N3b3JkRm9ybSgpO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwb24gY2FsbGJhY2ssIHRoaXMgZnVuY3Rpb246XHJcbiAgICogLSByZXF1ZXN0cyBIVFRQIEdFVCB0byB0aGUgc2VydmVyIHRvIGluaXRpYXRlIGFjY291bnQgbG9nb3V0XHJcbiAgICogLSBkZXN0cm95IGFueSBvdGhlciBjb25uZWN0aW9uc1xyXG4gICAqIC0gZGVsZXRlcyByZWxhdGVkIEhUTUwgZWxlbWVudHNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IE1vdXNlRXZlbnQgfSBbZV1cclxuICAgKiBAcmV0dXJucyB7IFByb21pc2U8dm9pZD4gfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdXNlckxvZ291dEhhbmRsZXIgPSBhc3luYyAoZT86IE1vdXNlRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgIC8vIEhUVFAgUkVRVUVTVFxyXG4gICAgbGV0IHJlc3BvbnNlITogaUh0dHBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldExvZ291dCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBzZW5kIHJlcXVlc3QgZm9yIHVzZXIgbG9nb3V0YCxcclxuICAgICAgICBlcnJcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OXHJcbiAgICBjb25zdCByZXNWYWxpZCA9IFZhbGlkYXRlLmh0dHBSZXMoXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBcInNlcnZlciBpcyB1bmFibGUgdG8gcHJvY2VzcyB1c2VyIGxvZ291dFwiLFxyXG4gICAgICBgc2VydmVyIHJlc3BvbmRlZCB3aXRoIGFuIGVycm9yIHVwb24gY2xpZW50J3MgcmVxdWVzdCBmb3IgdXNlciBsb2dvdXRgXHJcbiAgICApO1xyXG4gICAgaWYgKCFyZXNWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIFNvY2tldE1ldGhvZHMuZGVzdHJveSgpO1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIHRoaXMuYXBwQ29tcC5hcHBBdXRoKCk7XHJcblxyXG4gICAgY29uc3QgYXV0aENvbXAgPSBBdXRoQ29tcG9uZW50LmdldEluc3RhbmNlKCk7XHJcbiAgICBhdXRoQ29tcC5lbmFibGVMb2dFbGVtZW50cygpO1xyXG4gICAgYXV0aENvbXAuZGlzYWJsZVJlZ0VsZW1lbnRzKCk7XHJcbiAgICBhdXRoQ29tcC5zaG93TG9nRm9ybSgpO1xyXG5cclxuICAgIHRoaXMuZGVsZXRlVXNlckNvbXBvbmVudHMoKTtcclxuICB9O1xyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tIENMQVNTIFVUSUxJVFkgLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvblxyXG4gICAqIC0gcmVxdWVzdHMgYW4gSFRUUCBHRVQgdG8gdGhlIHNlcnZlclxyXG4gICAqIC0gc3RvcmVzIHJlY2VpdmVkIHVzZXIgZGF0YSB0byBjbGFzc1xyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBQcm9taXNlPHZvaWQ+IH1cclxuICAgKi9cclxuICBwcml2YXRlIGFzeW5jIGdldFVzZXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyBIVFRQIFJFUVVFU1RcclxuICAgIGxldCByZXNwb25zZSE6IGlIdHRwUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICByZXNwb25zZSA9IGF3YWl0IHRyeUNhdGNoKGh0dHBHZXRVc2VyKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byBmZXRjaCB1c2VyIGRhdGFcIiwgZXJyKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICBjb25zdCBodHRwVmFsaWQgPSBWYWxpZGF0ZS5odHRwUmVzKFxyXG4gICAgICByZXNwb25zZSxcclxuICAgICAgYHNlcnZlciBlcnJvciBvY2N1cmVkYCxcclxuICAgICAgYGNsaWVudCByZXNwb25kZWQgd2l0aCBhbiBlcnJvciBmb3IgdXBvbiByZXF1ZXN0IGZvciB1c2VyIGluZm9ybWF0aW9uYFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoIWh0dHBWYWxpZCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIEhUVFAgUkVTUE9OU0UgUFJPQ0VTU0lOR1xyXG4gICAgdGhpcy5jaGF0VXNlckluZm8gPSByZXNwb25zZS5kYXRhLmRhdGE7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHJpZXZlcyB2YWx1ZXMgZnJvbSBwYXNzd29yZCBzZWN0aW9uIGlucHV0IGVsZW1lbnRzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBpVXNlclBhc3N3b3JkIH1cclxuICAgKi9cclxuICBwcml2YXRlIGdldFBhc3N3b3JkRm9ybSgpOiBpVXNlclBhc3N3b3JkIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHBhc3N3b3JkOiB0aGlzLmNoYXRVc2VyUGFzc3dvcmQudmFsdWUsXHJcbiAgICAgIHJlUGFzc3dvcmQ6IHRoaXMuY2hhdFVzZXJSZVBhc3N3b3JkLnZhbHVlLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uIGNsZWFycyB2YWx1ZXMgb2YgcGFzc3dvcmQgc2VjdGlvbiBpbnB1dCBlbGVtZW50cy4qL1xyXG4gIHByaXZhdGUgY2xlYXJQYXNzd29yZEZvcm0oKTogdm9pZCB7XHJcbiAgICB0aGlzLmNoYXRVc2VyUGFzc3dvcmQudmFsdWUgPSBcIlwiO1xyXG4gICAgdGhpcy5jaGF0VXNlclJlUGFzc3dvcmQudmFsdWUgPSBcIlwiO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkZWxldGVVc2VyQ29tcG9uZW50cygpOiB2b2lkIHtcclxuICAgIFVzZXJDb21wb25lbnQuZ2V0SW5zdGFuY2UodHJ1ZSk7XHJcbiAgICBQZWVyQ29tcG9uZW50LmdldEluc3RhbmNlKHRydWUsIHt9IGFzIGlVc2VyT2JqKTtcclxuICAgIE1lc3NhZ2VzQ29tcG9uZW50LmdldEluc3RhbmNlKFxyXG4gICAgICBcImRlbGV0ZUlkXCIsXHJcbiAgICAgIFwiZGVsZXRlSWRcIixcclxuICAgICAgXCJkZWxldGVOYW1lXCIsXHJcbiAgICAgIFwiZGVsZXRlQ2hhdElkXCIsXHJcbiAgICAgIGZhbHNlLFxyXG4gICAgICBcInVzZXJcIixcclxuICAgICAgdHJ1ZSxcclxuICAgICAgZmFsc2VcclxuICAgICk7XHJcbiAgICB0aGlzLmNoYXRVc2VyV3JhcC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgdGhpcy5jaGF0UGVlcldyYXAuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIHRoaXMuY2hhdFVzZXJSZW1vdmVIYW5kbGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKiogTG9vcHMgb3ZlciBhdmFpbGFibGUgcmVxdWVzdCBpdGVtcyBhcnJheSBmcm9tIHVzZXIgZGF0YSBmb3IgcmVuZGVyaW5nLiAqL1xyXG4gIHByaXZhdGUgZ2VuZXJhdGVSZXF1ZXN0cygpOiB2b2lkIHtcclxuICAgIGlmIChcclxuICAgICAgIXRoaXMuY2hhdFVzZXJJbmZvIHx8XHJcbiAgICAgIHR5cGVvZiB0aGlzLmNoYXRVc2VySW5mbyAhPT0gXCJvYmplY3RcIiB8fFxyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNoYXRVc2VySW5mbykubGVuZ3RoIDwgMVxyXG4gICAgKVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaW5jb21pbmcgPSB0aGlzLmNoYXRVc2VySW5mby5yZXF1ZXN0cy5pbmNvbWluZztcclxuICAgIGNvbnN0IG91dGdvaW5nID0gdGhpcy5jaGF0VXNlckluZm8ucmVxdWVzdHMub3V0Z29pbmc7XHJcblxyXG4gICAgbGV0IGl0ZW06IGlSZXF1ZXN0O1xyXG5cclxuICAgIGZvciAoaXRlbSBvZiBpbmNvbWluZykge1xyXG4gICAgICBVc2VyQ29tcG9uZW50LmNyZWF0ZVJlcXVlc3QoXHJcbiAgICAgICAgaXRlbSxcclxuICAgICAgICBVc2VyQ29tcG9uZW50LmNoYXRVc2VySW5jb21pbmdXcmFwLFxyXG4gICAgICAgIFwiaW5jb21pbmdcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaXRlbSBvZiBvdXRnb2luZykge1xyXG4gICAgICBVc2VyQ29tcG9uZW50LmNyZWF0ZVJlcXVlc3QoXHJcbiAgICAgICAgaXRlbSxcclxuICAgICAgICBVc2VyQ29tcG9uZW50LmNoYXRVc2VyT3V0Z29pbmdXcmFwLFxyXG4gICAgICAgIFwib3V0Z29pbmdcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvblxyXG4gICAqIC0gdHJhbnNmb3JtcyBhIHJlcXVlc3QgaXRlbSBkYXRhIGludG8gYW4gSFRNTCBlbGVtZW50XHJcbiAgICogLSBhdHRhY2hlcyBpdCB0byBhIGNvcnJlc3BvbmRpbmcgcmVxdWVzdCBzZWN0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVxdWVzdCB9IGl0ZW0gLSByZXF1ZXN0IGl0ZW0gZGF0YVxyXG4gICAqIEBwYXJhbSB7IEhUTUxEaXZFbGVtZW50IH0gd3JhcHBlciAtIHJlcXVlc3QgaXRlbSBzZWN0aW9uIGNvbnRhaW5lclxyXG4gICAqIEBwYXJhbSB7IFwiaW5jb21pbmdcIiB8IFwib3V0Z29pbmdcIiB9IHR5cGUgLSByZXF1ZXN0ZXIgY2hhdCB0eXBlXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNyZWF0ZVJlcXVlc3QgPSAoXHJcbiAgICBpdGVtOiBpUmVxdWVzdCxcclxuICAgIHdyYXBwZXI6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgdHlwZTogXCJpbmNvbWluZ1wiIHwgXCJvdXRnb2luZ1wiXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICBpdGVtID0gR2VuVXRpbC5yZXF1ZXN0U3RySW50VG9Cb29sKGl0ZW0pIGFzIGlSZXF1ZXN0O1xyXG5cclxuICAgIC8vIGlmIChpdGVtLmlzR3JvdXAgJiYgdHlwZSA9PT0gXCJvdXRnb2luZ1wiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdFZhbGlkOiBpVmFsaWRpdHlUeXBlID0gVmFsaWRhdGUucmVxdWVzdEl0ZW0oXHJcbiAgICAgIGl0ZW0sXHJcbiAgICAgIHdyYXBwZXIsXHJcbiAgICAgIHR5cGVcclxuICAgICk7XHJcblxyXG4gICAgaWYgKCFyZXF1ZXN0VmFsaWQuaXNWYWxpZCkge1xyXG4gICAgICByZXR1cm4gZXJyb3Iuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogUmVxdWVzdCBpdGVtIGRhdGEgaXMgaW52YWxpZFwiLFxyXG4gICAgICAgIHJlcXVlc3RWYWxpZC5lcnJvclxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGl0ZW1XcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgIGNvbnN0IGl0ZW1OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIikgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICBjb25zdCBpdGVtQWN0aW9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgbGV0IGl0ZW1DYW5jZWwhOiBIVE1MRWxlbWVudDtcclxuICAgIGxldCBpdGVtQXBwcm92ZSE6IEhUTUxFbGVtZW50O1xyXG4gICAgbGV0IGl0ZW1SZWplY3QhOiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAodHlwZSA9PT0gXCJvdXRnb2luZ1wiKSB7XHJcbiAgICAgIGl0ZW1DYW5jZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgIGl0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LXVzZXItb3V0Z29pbmctaXRlbVwiKTtcclxuICAgICAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpdGVtLmFjY250X25hbWU7XHJcbiAgICAgIGl0ZW1DYW5jZWwuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEteG1hcmtcIiwgXCJyZXF1ZXN0LWFjdGlvblwiKTtcclxuICAgICAgaXRlbUNhbmNlbC5kYXRhc2V0LnJlcXVlc3RBY3Rpb24gPSByZXF1ZXN0QWN0aW9ucy5jYW5jZWw7XHJcblxyXG4gICAgICBpdGVtQWN0aW9ucy5hcHBlbmRDaGlsZChpdGVtQ2FuY2VsKTtcclxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJpbmNvbWluZ1wiKSB7XHJcbiAgICAgIGl0ZW1BcHByb3ZlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIikgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIGl0ZW1SZWplY3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICAgIGl0ZW1XcmFwLmNsYXNzTGlzdC5hZGQoXCJjaGF0LXVzZXItaW5jb21pbmctaXRlbVwiKTtcclxuICAgICAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpdGVtLmFjY250X25hbWU7XHJcbiAgICAgIGl0ZW1BcHByb3ZlLmNsYXNzTGlzdC5hZGQoXCJmYS1zb2xpZFwiLCBcImZhLWNoZWNrXCIsIFwicmVxdWVzdC1hY3Rpb25cIik7XHJcbiAgICAgIGl0ZW1BcHByb3ZlLmRhdGFzZXQucmVxdWVzdEFjdGlvbiA9IHJlcXVlc3RBY3Rpb25zLmFwcHJvdmU7XHJcbiAgICAgIGl0ZW1SZWplY3QuY2xhc3NMaXN0LmFkZChcImZhLXNvbGlkXCIsIFwiZmEteG1hcmtcIiwgXCJyZXF1ZXN0LWFjdGlvblwiKTtcclxuICAgICAgaXRlbVJlamVjdC5kYXRhc2V0LnJlcXVlc3RBY3Rpb24gPSByZXF1ZXN0QWN0aW9ucy5yZWplY3Q7XHJcblxyXG4gICAgICBpdGVtQWN0aW9ucy5hcHBlbmRDaGlsZChpdGVtQXBwcm92ZSk7XHJcbiAgICAgIGl0ZW1BY3Rpb25zLmFwcGVuZENoaWxkKGl0ZW1SZWplY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1XcmFwLmRhdGFzZXQudXNlcklkID0gaXRlbS5hY2NudF9pZDtcclxuICAgIGl0ZW1XcmFwLmRhdGFzZXQuaXNHcm91cCA9IGl0ZW0uaXNHcm91cCA/IGB0cnVlYCA6IGBmYWxzZWA7XHJcbiAgICBpdGVtV3JhcC5hcHBlbmRDaGlsZChpdGVtTmFtZSk7XHJcbiAgICBpdGVtV3JhcC5hcHBlbmRDaGlsZChpdGVtQWN0aW9ucyk7XHJcblxyXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChpdGVtV3JhcCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBkZWxldGVzIGEgcmVxdWVzdCBIVE1MIGVsZW1lbnQgZnJvbSB0aGUgdXNlciBjb21wb25lbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSByZXF1ZXN0SXRlbUlkIC0gYWNjb3VudCBvciBncm91cCBpZCBvZiB0aGUgcmVxdWVzdCBpdGVtXHJcbiAgICogQHBhcmFtIHsgMCB8IDEgfSB0eXBlIC0gYWNjb3VudCB0eXBlIG9mIHRoZSByZXF1ZXN0IGl0ZW1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZGVsZXRlUmVxdWVzdCA9IChcclxuICAgIHJlcXVlc3RJdGVtSWQ6IHN0cmluZyxcclxuICAgIHR5cGU6IDAgfCAxXHJcbiAgKTogdm9pZCA9PiB7XHJcbiAgICAvLyBEQVRBIEdBVEhFUklOR1xyXG4gICAgY29uc3QgaW5wdXRWYWxpZCA9IFZhbGlkYXRlLnJlcXVlc3REZWwocmVxdWVzdEl0ZW1JZCwgdHlwZSk7XHJcblxyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgaWYgKCFpbnB1dFZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogU2VydmVyIHNlbmQgaW52YWxpZCByZXF1ZXN0IGRlbGV0aW9uIGRhdGFgLFxyXG4gICAgICAgIGlucHV0VmFsaWQuZXJyb3JcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQUk9DRVNTOiB3cmFwcGVyIGlkZW50aWZpY2F0aW9uXHJcbiAgICBsZXQgcGFyZW50Tm9kZTogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICB0eXBlID09PSAwXHJcbiAgICAgID8gKHBhcmVudE5vZGUgPSB0aGlzLmNoYXRVc2VyT3V0Z29pbmdXcmFwKVxyXG4gICAgICA6IChwYXJlbnROb2RlID0gdGhpcy5jaGF0VXNlckluY29taW5nV3JhcCk7XHJcblxyXG4gICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChcclxuICAgICAgKFsuLi5wYXJlbnROb2RlLmNoaWxkcmVuXSBhcyBBcnJheTxIVE1MRGl2RWxlbWVudD4pLmZpbHRlcihcclxuICAgICAgICAoaXRlbSkgPT4gcmVxdWVzdEl0ZW1JZCA9PT0gaXRlbS5kYXRhc2V0LnVzZXJJZFxyXG4gICAgICApWzBdXHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uXHJcbiAgICogLSBsb29wcyBvZmVyIHJldHJpZXZlZCB1c2VyIHJlbGF0aW9uIGRhdGFcclxuICAgKiAtIHBpY2tzIHdobyB3aWxsIGJlbG9uZyB0byBtdXRlICYgYmxvY2sgc2VjdGlvblxyXG4gICAqICovXHJcbiAgcHJpdmF0ZSBnZW5lcmF0ZU11dGVCbG9ja0l0ZW0oKTogdm9pZCB7XHJcbiAgICBjb25zdCBtdXRlcyA9IHRoaXMuY2hhdFVzZXJJbmZvLnJlbGF0aW9ucy5tdXRlcztcclxuICAgIGNvbnN0IGJsb2NrcyA9IHRoaXMuY2hhdFVzZXJJbmZvLnJlbGF0aW9ucy5ibG9ja3M7XHJcbiAgICBsZXQgbXV0ZTogaVJlbGF0aW9uO1xyXG4gICAgbGV0IGJsb2NrOiBpUmVsYXRpb247XHJcblxyXG4gICAgZm9yIChtdXRlIG9mIG11dGVzKSB7XHJcbiAgICAgIFVzZXJDb21wb25lbnQuY3JlYXRlTXV0ZUJsb2NrSXRlbShcclxuICAgICAgICBtdXRlLFxyXG4gICAgICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJNdXRlc1dyYXAsXHJcbiAgICAgICAgMFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgZm9yIChibG9jayBvZiBibG9ja3MpIHtcclxuICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVNdXRlQmxvY2tJdGVtKFxyXG4gICAgICAgIGJsb2NrLFxyXG4gICAgICAgIFVzZXJDb21wb25lbnQuY2hhdFVzZXJCbG9ja3NXcmFwLFxyXG4gICAgICAgIDFcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb25cclxuICAgKiAtIHRyYW5zZm9ybXMgYSBpUmVsYXRpb24gaXRlbSBkYXRhIGludG8gYW4gSFRNTCBlbGVtZW50XHJcbiAgICogLSBhdHRhY2hlcyBpdCB0byBhIGNvcnJlc3BvbmRpbmcgc2VjdGlvblxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgaVJlbGF0aW9uIH0gaXRlbSAtIHJlcXVlc3QgaXRlbSBkYXRhXHJcbiAgICogQHBhcmFtIHsgSFRNTERpdkVsZW1lbnQgfSB3cmFwcGVyIC0gcmVxdWVzdCBpdGVtIHNlY3Rpb24gY29udGFpbmVyXHJcbiAgICogQHBhcmFtIHsgMCB8IDEgfSB0eXBlIC0gbXV0ZSB8IGJsb2NrIGl0ZW0gY2hhdCB0eXBlXHJcbiAgICogQHJldHVybnNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgY3JlYXRlTXV0ZUJsb2NrSXRlbSA9IChcclxuICAgIGl0ZW06IGlSZWxhdGlvbixcclxuICAgIHdyYXBwZXI6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgLy8gMCAobXV0ZSkgICAgKDEpIGJsb2NrXHJcbiAgICB0eXBlOiAwIHwgMVxyXG4gICk6IHZvaWQgPT4ge1xyXG4gICAgLy8gVkFMSURBVElPTlxyXG4gICAgY29uc3QgaXRlbVZhbGlkID0gVmFsaWRhdGUubXV0ZUJsb2NrSXRlbShpdGVtLCB3cmFwcGVyLCB0eXBlKTtcclxuICAgIGlmICghaXRlbVZhbGlkLmlzVmFsaWQpIHtcclxuICAgICAgcmV0dXJuIGVycm9yLnNob3dDb21wKFxyXG4gICAgICAgIGBFUlJPUjogTXV0ZSBpdGVtIGNvbnRhaW5zIGludmFsaWQgZGF0YWAsXHJcbiAgICAgICAgaXRlbVZhbGlkLmVycm9yXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaXRlbSB3cmFwcGVyXHJcbiAgICBjb25zdCBpdGVtV3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpdGVtV3JhcC5jbGFzc0xpc3QuYWRkKFwiY2hhdC11c2VyLWJsb2NrLWl0ZW1cIik7XHJcblxyXG4gICAgLy8gaXRlbSBuYW1lXHJcbiAgICBjb25zdCBpdGVtTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgaXRlbU5hbWUudGV4dENvbnRlbnQgPSBpdGVtLmFjY250X25hbWU7XHJcblxyXG4gICAgLy8gaXRlbSBhY3Rpb25cclxuICAgIGNvbnN0IGl0ZW1BY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgIGl0ZW1BY3Rpb24uZGF0YXNldC51c2VySWQgPSBpdGVtLmFjY250X2lkO1xyXG4gICAgaXRlbUFjdGlvbi5kYXRhc2V0LmFjdGlvbiA9IHR5cGUgPT09IDAgPyBcIm11dGVcIiA6IFwiYmxvY2tcIjtcclxuICAgIGl0ZW1BY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIFVzZXJDb21wb25lbnQuY2xpY2tVc2VyTXV0ZUJsb2NrKTtcclxuXHJcbiAgICAvLyBpdGVtIGljb25cclxuICAgIGNvbnN0IGl0ZW1JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XHJcbiAgICBpdGVtSWNvbi5jbGFzc0xpc3QuYWRkKFwiZmEtc29saWRcIiwgXCJmYS14bWFya1wiKTtcclxuXHJcbiAgICBpdGVtQWN0aW9uLmFwcGVuZENoaWxkKGl0ZW1JY29uKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1OYW1lKTtcclxuICAgIGl0ZW1XcmFwLmFwcGVuZENoaWxkKGl0ZW1BY3Rpb24pO1xyXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChpdGVtV3JhcCk7XHJcblxyXG4gICAgLy8gTU9ERUwgSFRNTFxyXG4gICAgLy8gPGRpdiBjbGFzcz0nY2hhdC11c2VyLWJsb2NrLWl0ZW0nPlxyXG4gICAgLy8gICA8cD5ibG9ja2VkIHVzZXI8L3A+XHJcbiAgICAvLyAgIDxwIGRhdGEtdXNlci1pZD0nM2FzZGEzZGE0JyBkYXRhLWFjdGlvbj0nYmxvY2snPlxyXG4gICAgLy8gICAgIDxpIGNsYXNzPSdmYS1zb2xpZCBmYS14bWFyayc+PC9pPlxyXG4gICAgLy8gICA8L3A+XHJcbiAgICAvLyA8L2Rpdj47XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGFuIG9iamVjdCB0byBiZSBzZW50IGFsb25nIGFuIEhUVFAgUmVxdWVzdCB3aGVuIHNlbmRpbmcgcGVlciByZXF1ZXN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgaVN0ckJvb2wgfSBpc0dyb3VwXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gcmVjZWl2ZXJJZFxyXG4gICAqIEByZXR1cm5zIHsgaVJlcXVlc3RCb2R5IH1cclxuICAgKi9cclxuICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RCb2R5KFxyXG4gICAgaXNHcm91cDogaVN0ckJvb2wsXHJcbiAgICByZWNlaXZlcklkOiBzdHJpbmdcclxuICApOiBpUmVxdWVzdEJvZHkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdHlwZTogaXNHcm91cCA9PT0gXCJ0cnVlXCIgPyAyIDogMSxcclxuICAgICAgcmVjaXBpZW50SWQ6IGlzR3JvdXAgPT09IFwiZmFsc2VcIiA/IHJlY2VpdmVySWQgOiBudWxsLFxyXG4gICAgICBncm91cElkOiBpc0dyb3VwID09PSBcInRydWVcIiA/IHJlY2VpdmVySWQgOiBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJuczpcclxuICAgKiAtIGEgbmV3IG9yIG9sZCBpbnN0YW5jZVxyXG4gICAqIC0gbnVsbCBpZiB0aGUgY29tcG9uZW50IGlzIGluc3RydWN0ZWQgZm9yIGRlbGV0aW9uXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBib29sZWFuIH0gZGVsZXRlSW5zdGFuY2UgLSBmbGFnIGluZGljYXRpbmcgd2h0aGVyIHRoZSBjb21wb25lbnQgd2lsbCBiZSBkZWxldGVkLlxyXG4gICAqIEByZXR1cm5zXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldEluc3RhbmNlID0gKFxyXG4gICAgZGVsZXRlSW5zdGFuY2U6IGJvb2xlYW5cclxuICApOiBVc2VyQ29tcG9uZW50IHwgbnVsbCA9PiB7XHJcbiAgICBpZiAoIWRlbGV0ZUluc3RhbmNlKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBVc2VyQ29tcG9uZW50KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluc3RhbmNlIS5jaGF0VXNlclJlbW92ZUhhbmRsZXIoKTtcclxuICAgICAgdGhpcy5pbnN0YW5jZSEuY2hhdFVzZXJXcmFwLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBpQXV0aElucHV0cyB9IGZyb20gXCIuLi9tb2RlbHMvYXV0aC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpQ2hhdFJlcUJvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL2NoYXQubW9kZWxcIjtcclxuaW1wb3J0IHsgaVJlbEJvZHksIGlSZXF1ZXN0Qm9keSB9IGZyb20gXCIuLi9tb2RlbHMvZ2VuLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlOZXdHcnBCb2R5IH0gZnJvbSBcIi4uL21vZGVscy9ncm91cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9odHRwLm1vZGVsXCI7XHJcbmltcG9ydCB7IGlSZWxhdGlvbkFjdCwgaVNlYXJjaFZhbHVlcyB9IGZyb20gXCIuLi9tb2RlbHMvcGVlci5tb2RlbFwiO1xyXG5pbXBvcnQge1xyXG4gIGlVc2VyUGF0Y2hSZXF1ZXN0LFxyXG4gIGlDb250YWN0VHlwZXMsXHJcbiAgaVByaXZhY3lSZXF1ZXN0LFxyXG4gIGlSZXF1ZXN0QWN0aW9ucyxcclxufSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwUG9zdExvZ2luKGxvZ2luQm9keTogaUF1dGhJbnB1dHMpIHtcclxuICBsZXQgcmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL2F1dGgvbG9naW5cIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCI6IFwidHJ1ZVwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShsb2dpbkJvZHkpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cFBvc3RSZWdpc3RlcihyZWdCb2R5OiBpQXV0aElucHV0cykge1xyXG4gIGxldCByZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvYXV0aC9yZWdpc3RlclwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIjogXCJ0cnVlXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlZ0JvZHkpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cEdldEF1dGgoKSB7XHJcbiAgbGV0IHJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvMS9hdXRoXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBHZXRVc2VycyhzZWFyY2hWYWx1ZXM6IGlTZWFyY2hWYWx1ZXMpIHtcclxuICBsZXQgcmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgLzEvdXNlci9zZWFyY2gvYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2VhcmNoVmFsdWVzKSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBQb3N0VXNlclJlcXVlc3QocmVxdWVzdEJvZHk6IGlSZXF1ZXN0Qm9keSkge1xyXG4gIGxldCByZXNwb25zZSE6IFJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvMS9yZXF1ZXN0XCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBQdXRVc2VyUmVxdWVzdChcclxuICByZXF1ZXN0Qm9keTogaVJlcXVlc3RCb2R5LFxyXG4gIHJlcXVlc3RBY3Rpb246IGlSZXF1ZXN0QWN0aW9uc1xyXG4pIHtcclxuICBsZXQgcmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgLzEvcmVxdWVzdC8ke3JlcXVlc3RBY3Rpb259YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBQdXRVc2VyUHJpdmFjeSh1c2VyU2V0dGluZ3M6IGlQcml2YWN5UmVxdWVzdCkge1xyXG4gIGxldCByZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvMS91c2VyL3NldHRpbmdzYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyU2V0dGluZ3MpLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwUHV0VXNlclBhc3N3b3JkKHBhc3N3b3JkU2V0OiB7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICByZVBhc3N3b3JkOiBzdHJpbmc7XHJcbn0pIHtcclxuICBsZXQgcmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL3VzZXIvc2V0dGluZ3MvcGFzc3dvcmRcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXNzd29yZFNldCksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwR2V0TG9nb3V0KCkge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL2F1dGgvbG9nb3V0XCIsIHtcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBHZXRVc2VyKCkge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL3VzZXJcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaHR0cEdldFVzZXJSZWxhdGlvbnMocmVsQm9keTogaVJlbEJvZHkpIHtcclxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC8xL3JlbGF0aW9uYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVsQm9keSksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwUGF0Y2hSZWxhdGlvbihyZWxhdGlvbkFjdDogaVJlbGF0aW9uQWN0KSB7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvcmVsYXRpb25cIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlbGF0aW9uQWN0KSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBHZXRHcm91cChncm91cElkOiBzdHJpbmcpIHtcclxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xyXG4gIGxldCBkYXRhITogaUh0dHBSZXNwb25zZTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC8xL2dyb3VwLyR7Z3JvdXBJZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwR2V0R3JvdXBzKCkge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL2dyb3VwXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGh0dHBQb3N0R3JvdXAobmV3R3JwOiBpTmV3R3JwQm9keSkge1xyXG4gIGxldCByZXNwb25zZTogUmVzcG9uc2U7XHJcbiAgbGV0IGRhdGEhOiBpSHR0cFJlc3BvbnNlO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi8xL2dyb3VwXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5ld0dycCksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwR2V0TXNncyhjaGF0RGF0YTogaUNoYXRSZXFCb2R5KSB7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiLzEvY2hhdFwiLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjaGF0RGF0YSksXHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBlcnI7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBodHRwR2V0VG9wTXNnKGNoYXRJZHM6IHN0cmluZ1tdKSB7XHJcbiAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICBsZXQgZGF0YSE6IGlIdHRwUmVzcG9uc2U7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvMS9jaGF0YCwge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiBcImluY2x1ZGVcIixcclxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjaGF0SWRzKSxcclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycikge1xyXG4gICAgcmV0dXJuIGVycjtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4gZXJyO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgY29uc3QgcGFzc3dvcmRfcGF0dGVybiA9IG5ldyBSZWdFeHAoXHJcbiAgXCJeKD89Lio/W0EtWl0pKD89Lio/W2Etel0pKD89Lio/WzAtOV0pKD89Lio/WyM/IUAkJV4mKi1dKS57OCx9JFwiLFxyXG4gIFwiZ1wiXHJcbik7XHJcbmV4cG9ydCBjb25zdCB1c2VybmFtZV9wYXR0ZXJuID0gbmV3IFJlZ0V4cChcIl5bYS16QS1aMC05Iz8hQCQlXiYqXXs4LDIwfSRcIik7XHJcbi8vIFVTRUQgQUxPTkdTSURFIC5tYXRjaCgpIG1ldGhvZFxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpQXV0aElucHV0cyB7XHJcbiAgdXNlcm5hbWU6IHN0cmluZztcclxuICBwYXNzd29yZDogc3RyaW5nO1xyXG4gIHJlUGFzc3dvcmQ/OiBzdHJpbmc7XHJcbn1cclxuIiwiZXhwb3J0IGNvbnN0IHJlbGF0aW9uVHlwZToge1xyXG4gIGNvbnRhY3Q6IFwiY29udGFjdFwiO1xyXG4gIG11dGU6IFwibXV0ZVwiO1xyXG4gIGJsb2NrOiBcImJsb2NrXCI7XHJcbn0gPSB7XHJcbiAgY29udGFjdDogXCJjb250YWN0XCIsXHJcbiAgbXV0ZTogXCJtdXRlXCIsXHJcbiAgYmxvY2s6IFwiYmxvY2tcIixcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjb250YWN0QWN0OiB7IGFyY2hpdmU6IFwiYXJjaGl2ZVwiOyBibG9jazogXCJibG9ja1wiOyBtdXRlOiBcIm11dGVcIiB9ID1cclxuICB7XHJcbiAgICBhcmNoaXZlOiBcImFyY2hpdmVcIixcclxuICAgIGJsb2NrOiBcImJsb2NrXCIsXHJcbiAgICBtdXRlOiBcIm11dGVcIixcclxuICB9O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoYXRUeXBlOiBpQ2hhdFR5cGUgPSB7XHJcbiAgdXNlcjogXCJ1c2VyXCIsXHJcbiAgZ3JvdXA6IFwiZ3JvdXBcIixcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaUNoYXRUeXBlIHtcclxuICB1c2VyOiBcInVzZXJcIjtcclxuICBncm91cDogXCJncm91cFwiO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlTZWFyY2hWYWx1ZXMge1xyXG4gIHBhdHRlcm46IHN0cmluZztcclxuICB0eXBlOiAwIHwgMTtcclxuICBza2lwOiBudW1iZXI7XHJcbiAgY250OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaVNlYXJjaEl0ZW0ge1xyXG4gIGFjY250X2lkOiBzdHJpbmc7XHJcbiAgYWN0X25hbWU6IHN0cmluZztcclxuICBhdmFpbGFiaWxpdHk6IGJvb2xlYW47XHJcbn1cclxuZXhwb3J0IHR5cGUgaVNlYXJjaEl0ZW1zID0gQXJyYXk8aVNlYXJjaEl0ZW0+O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpQ29udGFjdFZhbHVlIHtcclxuICBhY2NudF9pZDogc3RyaW5nO1xyXG4gIGFjY250X25hbWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpUmVsYXRpb25BY3Qge1xyXG4gIHJlY2lwaWVudElkOiBzdHJpbmc7XHJcbiAgdXNlckFjdGlvbjogXCJhcmNoaXZlXCIgfCBcImJsb2NrXCIgfCBcIm11dGVcIjtcclxuICBhY3Rpb25WYWx1ZTogYm9vbGVhbjtcclxufVxyXG4iLCJleHBvcnQgdHlwZSBpVXNlclR5cGUgPSBcImxvY2FsXCIgfCBcImdvb2dsZVwiIHwgXCJmYWNlYm9va1wiIHwgXCJnaXRodWJcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaVVzZXJPYmoge1xyXG4gIGFjdF9pZDoge1xyXG4gICAgYWNjbnRfdHlwZTogaVVzZXJUeXBlO1xyXG4gICAgYWNjbnRfaWQ6IHN0cmluZztcclxuICB9O1xyXG4gIGFjdF9uYW1lOiBzdHJpbmc7XHJcbiAgc2VjdXJpdHk6IHN0cmluZztcclxuICByZXF1ZXN0czogc3RyaW5nO1xyXG4gIHJlbGF0aW9uczogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVxdWVzdEFjdGlvbnM6IHtcclxuICBhcHByb3ZlOiBcImFwcHJvdmVcIjtcclxuICByZWplY3Q6IFwicmVqZWN0XCI7XHJcbiAgY2FuY2VsOiBcImNhbmNlbFwiO1xyXG59ID0ge1xyXG4gIGFwcHJvdmU6IFwiYXBwcm92ZVwiLFxyXG4gIHJlamVjdDogXCJyZWplY3RcIixcclxuICBjYW5jZWw6IFwiY2FuY2VsXCIsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXNlclNldHRpbmdzOiB7XHJcbiAgcHVibGljOiBcInB1YmxpY1wiO1xyXG4gIGF2YWlsYWJpbGl0eTogXCJhdmFpbGFiaWxpdHlcIjtcclxufSA9IHtcclxuICBwdWJsaWM6IFwicHVibGljXCIsXHJcbiAgYXZhaWxhYmlsaXR5OiBcImF2YWlsYWJpbGl0eVwiLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgaVVzZXJSZXF1ZXN0U3RhdGUgPVxyXG4gIHwgXCJhcHByb3ZlZFwiXHJcbiAgfCBcInBlbmRpbmdcIlxyXG4gIHwgXCJyZWplY3RlZFwiXHJcbiAgfCBcImNhbmNlbGxlZFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlSZXF1ZXN0VHlwZTogeyBvdXQ6IFwib3V0Z29pbmdcIjsgaW46IFwiaW5jb21pbmdcIiB9ID0ge1xyXG4gIG91dDogXCJvdXRnb2luZ1wiLFxyXG4gIGluOiBcImluY29taW5nXCIsXHJcbn07XHJcbmV4cG9ydCB0eXBlIGlVc2VyUHJpdmFjeVByb3AgPSBcInB1YmxpY1wiIHwgXCJhdmFpbGFiaWxpdHlcIjtcclxuZXhwb3J0IHR5cGUgaVVzZXJQcml2YWN5VmFsdWUgPSBcInRydWVcIiB8IFwiZmFsc2VcIjtcclxuXHJcbmV4cG9ydCB0eXBlIGlSZXF1ZXN0QWN0aW9ucyA9IFwiYXBwcm92ZVwiIHwgXCJyZWplY3RcIiB8IFwiY2FuY2VsXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGlSZXF1ZXN0QXBwcm92ZURhdGEge1xyXG4gIG5ld1N0YXR1czogaVVzZXJSZXF1ZXN0U3RhdGU7XHJcbiAgcmVsSXRlbTogaVJlbGF0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBpQ29udGFjdFR5cGVzID0gXCJjb250YWN0XCIgfCBcIm11dGVcIiB8IFwiYmxvY2tcIjtcclxuZXhwb3J0IGludGVyZmFjZSBpUmVsYXRpb24ge1xyXG4gIGFjY250X2lkOiBzdHJpbmc7XHJcbiAgYWNjbnRfbmFtZTogc3RyaW5nO1xyXG4gIHR5cGU6IFwidXNlclwiIHwgXCJncm91cFwiO1xyXG4gIGNoYXRfaWQ6IHN0cmluZztcclxuICBhZG1pbjogYm9vbGVhbjtcclxuICBibG9jazogYm9vbGVhbjtcclxuICBtdXRlOiBib29sZWFuO1xyXG4gIGFyY2hpdmU6IGJvb2xlYW47XHJcbiAgYnVtcDogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgaVByaXZhY3lSZXF1ZXN0IHtcclxuICBwcm9wZXJ0eTogaVVzZXJQcml2YWN5UHJvcDtcclxuICB2YWx1ZTogaVVzZXJQcml2YWN5VmFsdWU7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBpUmVxdWVzdCB7XHJcbiAgYWNjbnRfaWQ6IHN0cmluZztcclxuICBhY2NudF9uYW1lOiBzdHJpbmc7XHJcbiAgaXNHcm91cDogQm9vbGVhbjtcclxuICBzdGF0dXM6IFwiYXBwcm92ZWRcIiB8IFwicGVuZGluZ1wiIHwgXCJyZWplY3RlZFwiIHwgXCJjYW5jZWxsZWRcIjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpVXNlciB7XHJcbiAgYWNjbnRfaWQ6IHN0cmluZztcclxuICBhY2NudF9uYW1lOiBzdHJpbmc7XHJcbiAgcHJpdmFjeTogaVVzZXJQcml2YWN5O1xyXG4gIHJlcXVlc3RzOiB7XHJcbiAgICBpbmNvbWluZzogQXJyYXk8aVJlcXVlc3Q+O1xyXG4gICAgb3V0Z29pbmc6IEFycmF5PGlSZXF1ZXN0PjtcclxuICB9O1xyXG4gIHJlbGF0aW9uczoge1xyXG4gICAgbXV0ZXM6IEFycmF5PGlSZWxhdGlvbj47XHJcbiAgICBibG9ja3M6IEFycmF5PGlSZWxhdGlvbj47XHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpVXNlclBhdGNoUmVxdWVzdCB7XHJcbiAgcmVjaXBpZW50SWQ6IHN0cmluZztcclxuICBzdGF0dXM6IGlSZXF1ZXN0QWN0aW9ucztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBpVXNlclByaXZhY3kge1xyXG4gIHB1YmxpYzogYm9vbGVhbjtcclxuICBhdmFpbGFiaWxpdHk6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgaVVzZXJQYXNzd29yZCB7XHJcbiAgcGFzc3dvcmQ6IHN0cmluZztcclxuICByZVBhc3N3b3JkOiBzdHJpbmc7XHJcbn1cclxuIiwiaW1wb3J0IHsgaU1zZ0JvZHkgfSBmcm9tIFwiLi4vbW9kZWxzL21zZ0xpc3QubW9kZWxcIjtcclxuaW1wb3J0IHsgaVJlbGF0aW9uIH0gZnJvbSBcIi4uL21vZGVscy91c2VyLm1vZGVsXCI7XHJcbmltcG9ydCB7IFBlZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9wZWVyLmNvbXBcIjtcclxuaW1wb3J0IHsgTWVzc2FnZXNMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvbXNnc0xpc3QuY29tcFwiO1xyXG5cclxuLyoqIFRoaXMgY2xhc3MgaG9sZHMgZnVuY3Rpb25zIHdoaWNoIG1hbmFnZXMgTWVzc2FnZSBMaXN0IEhUTUwgJiBEYXRhLCBhbmQgUGVlciBDb21wb25lbnQgSFRNTCBVcGRhdGUuKi9cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VFdmVudCB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdDogTWVzc2FnZUV2ZW50O1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiBlbnRhaWxzIHRoZSBvY2N1cmluZyBsb2dpYyB3aGVuIGEgbWVzc2FnZSBpcyByZWNlaXZlZC5cclxuICAgKiAtIG1lc3NhZ2UgbGlzdCBIVE1MIHVwZGF0ZVxyXG4gICAqIC0gcGVlciBsaXN0IEhUTUwgdXBkYXRlXHJcbiAgICogLSBtZXNzYWdlIGxpc3QgZGF0YSB1cGRhdGVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IGlNc2dCb2R5IH0gZGF0YSAtIG1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSBzb2NrZXRcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgcG9zdE1lc3NhZ2VSID0gKGRhdGE6IGlNc2dCb2R5KTogdm9pZCA9PiB7XHJcbiAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuY3JlYXRlTXNnSXRlbShcclxuICAgICAgZGF0YSxcclxuICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldENoYXRNc2dCb2R5KCksXHJcbiAgICAgIE1lc3NhZ2VzTGlzdENvbXBvbmVudC5nZXRDaGF0TXNnc0xpc3RXcmFwKCksXHJcbiAgICAgIC8vIDAgLSBmcm9tIGNsaWVudCBicm93c2VyICAgICAgMSAtIGZyb20gb3RoZXIgdXNlcihzKVxyXG4gICAgICAxXHJcbiAgICApO1xyXG5cclxuICAgIFBlZXJDb21wb25lbnQudXBkYXRlUGVlckxpc3RIVE1MKFxyXG4gICAgICB7IGFjY250X2lkOiBkYXRhLnNlbmRlcklkLCBjaGF0X2lkOiBkYXRhLmNoYXRJZCB9IGFzIGlSZWxhdGlvbixcclxuICAgICAgZGF0YVxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldEluc3QoKSAhPT0gbnVsbClcclxuICAgICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LmdldEluc3QoKSEuaW5jck1zZ3NMaXN0Q250KCk7XHJcblxyXG4gICAgTWVzc2FnZXNMaXN0Q29tcG9uZW50LnNldE1zZ0xpc3RJbmZvKFxyXG4gICAgICBNZXNzYWdlc0xpc3RDb21wb25lbnQuZ2V0Q2hhdE1zZ3NMaXN0V3JhcCgpLmRhdGFzZXQuY2hhdElkISxcclxuICAgICAgZGF0YSxcclxuICAgICAgbnVsbFxyXG4gICAgKTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSBuZXcgb3IgdGhlIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBjbGFzcy5cclxuICAgKlxyXG4gICAqIEByZXR1cm5zIHsgTWVzc2FnZUV2ZW50IH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdCA9ICgpOiBNZXNzYWdlRXZlbnQgPT4ge1xyXG4gICAgaWYgKCF0aGlzLmluc3QpIHRoaXMuaW5zdCA9IG5ldyBNZXNzYWdlRXZlbnQoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3Q7XHJcbiAgfTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgUmVsYXRpb25FdmVudCB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdDogUmVsYXRpb25FdmVudDtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhdGNoUmVsYXRpb24gPSAoKSA9PiB7fTtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldEluc3QgPSAoKTogUmVsYXRpb25FdmVudCA9PiB7XHJcbiAgICBpZiAoIXRoaXMuaW5zdCkgdGhpcy5pbnN0ID0gbmV3IFJlbGF0aW9uRXZlbnQoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3Q7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBHZW5VdGlsIH0gZnJvbSBcIi4uL3V0aWwvZ2VuLnV0aWxcIjtcclxuaW1wb3J0IHsgaVJlcVR5cGUgfSBmcm9tIFwiLi4vbW9kZWxzL2dlbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBWYWxpZGF0ZSB9IGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb24udXRpbFwiO1xyXG5pbXBvcnQgeyBTb2NrZXRNZXRob2RzIH0gZnJvbSBcIi4uL3V0aWwvc29ja2V0LnV0aWxcIjtcclxuaW1wb3J0IHsgVXNlckNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3VzZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBQZWVyQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvcGVlci5jb21wXCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL21zZ3NPcHRzLmNvbXBcIjtcclxuaW1wb3J0IHsgaVJlcXVlc3QsIGlSZXF1ZXN0QXBwcm92ZURhdGEgfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuXHJcbi8qKiBUaGlzIGNsYXNzIGhvbGRzIGZ1bmN0aW9uICAqL1xyXG5leHBvcnQgY2xhc3MgUmVxdWVzdEV2ZW50cyB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdDogUmVxdWVzdEV2ZW50cztcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gZW50YWlscyB0aGUgbG9naWMgdXBvbiByZWNlaXZpbmcgYSByZXF1ZXN0IHBvc3QgZnJvbSBzb2NrZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpUmVxdWVzdCB9IHJlcXVlc3RJdGVtIC0gcmVxdWVzdCBib2R5IG9iamVjdFxyXG4gICAqIEBwYXJhbSB7IDAgfCAxIH0gdHlwZSAtIDAgb3V0Z29pbmcgfCAxIGluY29taW5nXHJcbiAgICogQHBhcmFtIHsgaVJlcVR5cGUgfSByZXFUeXBlIC0gMSB1MnUgKHVzZXItdXNlcikgfCAyIHUyZyAodXNlci1ncm91cCkgfCAzIGcydSAoZ3JvdXAtdXNlcilcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBjaGF0SWQgLSBncm91cCBjaGF0IGlkIG9mIHRoZSB0YXJnZXQgZ3JvdXAgb2YgcmVxdWVzdFxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBwb3N0UmVxdWVzdFIgPSAoXHJcbiAgICByZXF1ZXN0SXRlbTogaVJlcXVlc3QsXHJcbiAgICB0eXBlOiAwIHwgMSxcclxuICAgIHJlcVR5cGU6IGlSZXFUeXBlLFxyXG4gICAgY2hhdElkOiBzdHJpbmdcclxuICApOiB2b2lkID0+IHtcclxuICAgIC8vIE9QVElPTiBGT1IgQURESU5HIFJFUVVFU1QgVklBIFNPQ0tFVCBJUyBOT1QgVklBQkxFIFNJTkNFIFNPQ0tFVCBJRCBBUkUgRlJPTSBVU0VSIElELCBDT05ORUNURUQgVVBPTiBMT0dHSU5HIElOLCBHUk9VUCBTT0NLRVQgSURTLCBNVVNUIEZJUlNUIEJFIEVTVEFCTElTSEVEXHJcbiAgICByZXF1ZXN0SXRlbSA9IEdlblV0aWwucmVxdWVzdFN0ckludFRvQm9vbChyZXF1ZXN0SXRlbSk7XHJcblxyXG4gICAgaWYgKHJlcVR5cGUgPT09IDEpIHtcclxuICAgICAgLy8gaWYgdTJ1LCBhZGQgcmVxdWVzdCB0byB1c2VyIGNvbXBcclxuICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVSZXF1ZXN0KFxyXG4gICAgICAgIHJlcXVlc3RJdGVtLFxyXG4gICAgICAgIHR5cGUgPT09IDBcclxuICAgICAgICAgID8gVXNlckNvbXBvbmVudC5jaGF0VXNlck91dGdvaW5nV3JhcFxyXG4gICAgICAgICAgOiBVc2VyQ29tcG9uZW50LmNoYXRVc2VySW5jb21pbmdXcmFwLFxyXG4gICAgICAgIHR5cGUgPT09IDAgPyBcIm91dGdvaW5nXCIgOiBcImluY29taW5nXCJcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAocmVxVHlwZSA9PT0gMikge1xyXG4gICAgICAvKipcclxuICAgICAgICogaWYgdTJnLCBlaXRoZXJcclxuICAgICAgICogLSBhZGQgcmVxdWVzdCB0byB1c2VyIGNvbXAgaWYgb3V0Z29pbmdcclxuICAgICAgICogLSBhZGQgcmVxdWVzdCB0byBtZXNzYWdlIGNvbXAgaWYgaW5jb21pbmdcclxuICAgICAgICovXHJcbiAgICAgIGlmICh0eXBlID09PSAwKVxyXG4gICAgICAgIFVzZXJDb21wb25lbnQuY3JlYXRlUmVxdWVzdChcclxuICAgICAgICAgIHJlcXVlc3RJdGVtLFxyXG4gICAgICAgICAgVXNlckNvbXBvbmVudC5jaGF0VXNlck91dGdvaW5nV3JhcCxcclxuICAgICAgICAgIFwib3V0Z29pbmdcIlxyXG4gICAgICAgICk7XHJcbiAgICAgIGVsc2VcclxuICAgICAgICBNZXNzYWdlc09wdGlvbnNDb21wb25lbnQuY3JlYXRlUmVxdWVzdChcclxuICAgICAgICAgIHJlcXVlc3RJdGVtLFxyXG4gICAgICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmdldE1zZ09wdHNJbmNvbWluZ1dyYXAoKSxcclxuICAgICAgICAgIFwiaW5jb21pbmdcIixcclxuICAgICAgICAgIGNoYXRJZFxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvKipcclxuICAgICAgICogaWYgZzJ1LFxyXG4gICAgICAgKiAtIGFkZCByZXF1ZXN0IHRvIG1lc3NhZ2UgY29tcCBpZiBvdXRnb2luZ1xyXG4gICAgICAgKiAtIGFkZCByZXF1ZXN0IHRvIHVzZXIgY29tcCBpZiBpbmNvbWluZ1xyXG4gICAgICAgKi9cclxuICAgICAgaWYgKHR5cGUgPT09IDApXHJcbiAgICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmNyZWF0ZVJlcXVlc3QoXHJcbiAgICAgICAgICByZXF1ZXN0SXRlbSxcclxuICAgICAgICAgIE1lc3NhZ2VzT3B0aW9uc0NvbXBvbmVudC5nZXRNc2dPcHRzT3V0Z29pbmdXcmFwKCksXHJcbiAgICAgICAgICBcIm91dGdvaW5nXCIsXHJcbiAgICAgICAgICBjaGF0SWRcclxuICAgICAgICApO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgVXNlckNvbXBvbmVudC5jcmVhdGVSZXF1ZXN0KFxyXG4gICAgICAgICAgcmVxdWVzdEl0ZW0sXHJcbiAgICAgICAgICBVc2VyQ29tcG9uZW50LmNoYXRVc2VySW5jb21pbmdXcmFwLFxyXG4gICAgICAgICAgXCJpbmNvbWluZ1wiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGVudGFpbHMgdGhlIGxvZ2ljIHVwb24gcmVjZWl2aW5nIGEgcmVxdWVzdCBwYXRjaCBmcm9tIHNvY2tldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IHJlcXVlc3RJdGVtSWQgLSBhY2NvdW50IGlkIG9mIHRoZSBvdGhlciBwYXJ0eSBvZiByZXF1ZXN0XHJcbiAgICogQHBhcmFtIHsgMCB8IDEgfSB0eXBlIC0gMCBvdXRnb2luZyB8IDEgaW5jb21pbmdcclxuICAgKiBAcGFyYW0geyBpUmVxdWVzdEFwcHJvdmVEYXRhIH0gYXBwcm92ZURhdGEgLSBuZXcgcmVxdWVzdCBzdGF0dXMgYW5kIGtleSByZWxhdGlvbiBpdGVtIG9mIHRoZSBvdGhlciBwYXJ0eSBvZiByZXF1ZXN0XHJcbiAgICogQHBhcmFtIHsgaVJlcVR5cGUgfSByZXFUeXBlIC0gMSB1MnUgKHVzZXItdXNlcikgfCAyIHUyZyAodXNlci1ncm91cCkgfCAzIGcydSAoZ3JvdXAtdXNlcilcclxuICAgKiBAcGFyYW0geyBzdHJpbmcgfSBjaGF0SWQgLSBncm91cCBjaGF0IGlkIG9mIHRoZSB0YXJnZXQgZ3JvdXAgb2YgcmVxdWVzdFxyXG4gICAqXHJcbiAgICogQHN0YXRpY1xyXG4gICAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXRjaFJlcXVlc3RSID0gKFxyXG4gICAgcmVxdWVzdEl0ZW1JZDogc3RyaW5nLFxyXG4gICAgdHlwZTogMCB8IDEsXHJcbiAgICBhcHByb3ZlRGF0YTogaVJlcXVlc3RBcHByb3ZlRGF0YSxcclxuICAgIHJlcVR5cGU6IGlSZXFUeXBlLFxyXG4gICAgY2hhdElkOiBzdHJpbmdcclxuICApOiB2b2lkID0+IHtcclxuICAgIGlmIChhcHByb3ZlRGF0YS5yZWxJdGVtLnR5cGUgPT09IFwidXNlclwiKVxyXG4gICAgICBVc2VyQ29tcG9uZW50LmRlbGV0ZVJlcXVlc3QocmVxdWVzdEl0ZW1JZCwgdHlwZSk7XHJcblxyXG4gICAgaWYgKHJlcVR5cGUgPT09IDIgfHwgcmVxVHlwZSA9PT0gMylcclxuICAgICAgTWVzc2FnZXNPcHRpb25zQ29tcG9uZW50LmRlbGV0ZVJlcXVlc3QocmVxdWVzdEl0ZW1JZCwgY2hhdElkKTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIFZhbGlkYXRlLmFwcHJvdmVEYXRhKGFwcHJvdmVEYXRhKS5pc1ZhbGlkICYmXHJcbiAgICAgIFZhbGlkYXRlLmNvbnRhY3RJdGVtKGFwcHJvdmVEYXRhLnJlbEl0ZW0pLmlzVmFsaWRcclxuICAgICkge1xyXG4gICAgICBQZWVyQ29tcG9uZW50LnVwZGF0ZVBlZXJMaXN0SFRNTChhcHByb3ZlRGF0YS5yZWxJdGVtKTtcclxuXHJcbiAgICAgIC8vIGpvaW5zIHJvb20gb2YgdGhlIG5ldyBjb25uZWN0ZWQgcGVlciBpbiBzb2NrZXRcclxuICAgICAgU29ja2V0TWV0aG9kcy5zb2NrZXQ/LmVtaXQoXHJcbiAgICAgICAgU29ja2V0TWV0aG9kcy5qb2luUm9vbUV2LFxyXG4gICAgICAgIGFwcHJvdmVEYXRhLnJlbEl0ZW0uY2hhdF9pZCxcclxuICAgICAgICAocmVzOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIG5ldyBvciB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBSZXF1ZXN0RXZlbnRzIH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0SW5zdCA9ICgpOiBSZXF1ZXN0RXZlbnRzID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0KSB0aGlzLmluc3QgPSBuZXcgUmVxdWVzdEV2ZW50cygpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdDtcclxuICB9O1xyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGFuIGFzeW5jaHJvbm91cyB3cmFwcGVyIGZvciBIVFRQIHJlcXVlc3RpbmcgZnVuY3Rpb25zIHdoaWNoIHJldHVybnMgYSB0cmFuc2Zvcm1lZCBIVFRQIHJlc3BvbnNlIG9iamVjdCBmb3IgZXJyb3IgbWFuYWdlbWVudC5cclxuICpcclxuICogQHBhcmFtIHsgRnVuY3Rpb24gfSBmeCAtIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyBhbnlbXSB9IFtwYXJhbXNdIC0gb3B0aW9uYWwgcGFyYW1ldGVyKHMpXHJcbiAqXHJcbiAqIEByZXR1cm5zIHsgUHJvbWlzZTx7IGVycjogYW55OyBkYXRhOiBhbnkgfT4gfVxyXG4gKi9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRyeUNhdGNoKFxyXG4gIGZ4OiBGdW5jdGlvbixcclxuICAuLi5wYXJhbXM6IGFueVtdXHJcbik6IFByb21pc2U8eyBlcnI6IGFueTsgZGF0YTogYW55IH0+IHtcclxuICB0cnkge1xyXG4gICAgbGV0IGRhdGE7XHJcblxyXG4gICAgaWYgKHBhcmFtcykge1xyXG4gICAgICBkYXRhID0gYXdhaXQgZngoLi4ucGFyYW1zKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGEgPSBhd2FpdCBmeCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICgoZGF0YS5zdGF0dXNDb2RlIGFzIG51bWJlcikgPj0gNDAwKSB7XHJcbiAgICAgIHJldHVybiB7IGVycjogZGF0YSwgZGF0YTogbnVsbCB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHsgZXJyOiBudWxsLCBkYXRhIH07XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICByZXR1cm4geyBlcnIsIGRhdGE6IG51bGwgfTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgdHJ5Q2F0Y2ggfSBmcm9tIFwiLi9hc3luY1dyYXAudXRpbFwiO1xyXG5pbXBvcnQgeyBodHRwR2V0QXV0aCB9IGZyb20gXCIuLi9ob29rcy9yZXF1ZXN0cy5ob29rXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2FwcC5jb21wXCI7XHJcbmltcG9ydCB7IFNvY2tldE1ldGhvZHMgfSBmcm9tIFwiLi9zb2NrZXQudXRpbFwiO1xyXG5pbXBvcnQgeyBpSHR0cFJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy9odHRwLm1vZGVsXCI7XHJcbmltcG9ydCB7IFVzZXJDb21wb25lbnQgfSBmcm9tIFwiLi4vY29tcG9uZW50cy91c2VyLmNvbXBcIjtcclxuaW1wb3J0IHsgUGVlckNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL3BlZXIuY29tcFwiO1xyXG5pbXBvcnQgeyBFcnJvckNvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnRzL2Vycm9yLmNvbXBcIjtcclxuaW1wb3J0IHsgaVJlbGF0aW9uLCBpUmVxdWVzdCB9IGZyb20gXCIuLi9tb2RlbHMvdXNlci5tb2RlbFwiO1xyXG5cclxuLyoqIFRoaSBjbGFzcyBob2xkcyBhIHZhcmlldHkgb2YgaGVscGVyIGZ1bmN0aW9ucyB1c2VkIHRocm91Z2hvdXQgdGhlIGNsaWVudCBjb2RlIGJhc2UuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5VdGlsIHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0OiBHZW5VdGlsO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiB0cmFuc2Zvcm1zIGFuIGlSZXF1ZXN0IG9iamVjdCByZXRyaWV2ZWQgZnJvbSBhIHJlZGlzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsgYW55IH0gb2JqXHJcbiAgICogQHJldHVybnMgeyBpUmVxdWVzdCB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHJlcXVlc3RTdHJJbnRUb0Jvb2wgPSAob2JqOiBhbnkpOiBpUmVxdWVzdCA9PiB7XHJcbiAgICBpZiAob2JqLmlzR3JvdXAgPT09IFwiMFwiIHx8IG9iai5pc0dyb3VwID09PSAwKSB7XHJcbiAgICAgIG9iai5pc0dyb3VwID0gZmFsc2U7XHJcbiAgICB9IGVsc2UgaWYgKG9iai5pc0dyb3VwID09PSBcIjFcIiB8fCBvYmouaXNHcm91cCA9PT0gMSkge1xyXG4gICAgICBvYmouaXNHcm91cCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxuICB9O1xyXG4gIC8qKlxyXG4gICAqIFRoaXMgZnVuY3Rpb24gdHJhbnNmb3JtcyBhbiBpUmVsYXRpb24gb2JqZWN0IHJldHJpZXZlZCBmcm9tIGEgcmVkaXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBhbnkgfSBvYmpcclxuICAgKiBAcmV0dXJucyB7IGlSZWxhdGlvbiB9XHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IHJlbGF0aW9uU3RySW50VG9Cb29sID0gKG9iajogYW55KTogaVJlbGF0aW9uID0+IHtcclxuICAgIGlmIChvYmouYWRtaW4gPT09IFwiMFwiIHx8IG9iai5hZG1pbiA9PT0gMCkge1xyXG4gICAgICBvYmouYWRtaW4gPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAob2JqLmFkbWluID09PSBcIjFcIiB8fCBvYmouYWRtaW4gPT09IDEpIHtcclxuICAgICAgb2JqLmFkbWluID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChvYmouYmxvY2sgPT09IFwiMFwiIHx8IG9iai5ibG9jayA9PT0gMCkge1xyXG4gICAgICBvYmouYmxvY2sgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAob2JqLmJsb2NrID09PSBcIjFcIiB8fCBvYmouYmxvY2sgPT09IDEpIHtcclxuICAgICAgb2JqLmJsb2NrID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChvYmoubXV0ZSA9PT0gXCIwXCIgfHwgb2JqLm11dGUgPT09IDApIHtcclxuICAgICAgb2JqLm11dGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAob2JqLm11dGUgPT09IFwiMVwiIHx8IG9iai5tdXRlID09PSAxKSB7XHJcbiAgICAgIG9iai5tdXRlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChvYmouYXJjaGl2ZSA9PT0gXCIwXCIgfHwgb2JqLmFyY2hpdmUgPT09IDApIHtcclxuICAgICAgb2JqLmFyY2hpdmUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAob2JqLmFyY2hpdmUgPT09IFwiMVwiIHx8IG9iai5hcmNoaXZlID09PSAxKSB7XHJcbiAgICAgIG9iai5hcmNoaXZlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIG9iai5idW1wID0gcGFyc2VJbnQob2JqLmJ1bXApO1xyXG5cclxuICAgIHJldHVybiBvYmo7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNmb3JtcyBhIG51bWJlciBpbnRvIGZvcm1hdHRlZCB0aW1lLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IG1pbGxpc2Vjb25kcyAtIERhdGUgaW4gbWlsbGlzZWNvbmRzLlxyXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9IC0gRm9ybWF0dGVkIERhdGUgZS5nLiA2OjIxOjUwIEFNIHwgMTI6MDE6MDAgUE1cclxuICAgKlxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogR2VuVXRpbC5taWxsaVRvVGltZSgxNjkyOTQ2NDA4ODQ0KTsgLy8gUmV0dXJucyAnMjo1MzoyOCBQTSdcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgbWlsbGlUb1RpbWU6IChtaWxsaXNlY29uZHM6IG51bWJlcikgPT4gc3RyaW5nID0gKFxyXG4gICAgbWlsbGlzZWNvbmRzXHJcbiAgKSA9PiB7XHJcbiAgICAvKiogRGF0YSBHYXRoZXJpbmdcclxuICAgICAqIC0gVHJhbnNmb3JtcyBtaWxsaXNlY29uZCBpbnRvIGhvdXJzLCBtaW51dGVzLCAmIHNlY29uZHMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShtaWxsaXNlY29uZHMpO1xyXG4gICAgY29uc3QgaG91cnMgPSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICBjb25zdCBtaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICBjb25zdCBzZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XHJcblxyXG4gICAgLy8gQWRkIGxlYWRpbmcgemVyb3MgaWYgbmVlZGVkXHJcbiAgICBjb25zdCBoYWxmRGF5SHJzOiBudW1iZXIgPSBob3VycyAlIDEyO1xyXG4gICAgY29uc3QgdGltZVBlcmlvZDogXCJBTVwiIHwgXCJQTVwiID0gTWF0aC5jZWlsKGhvdXJzIC8gMTIpID09PSAxID8gXCJBTVwiIDogXCJQTVwiO1xyXG4gICAgY29uc3QgZm9ybWF0dGVkSG91cnMgPSBoYWxmRGF5SHJzIDwgMTAgPyBgMCR7aGFsZkRheUhyc31gIDogaGFsZkRheUhycztcclxuICAgIGNvbnN0IGZvcm1hdHRlZE1pbnV0ZXMgPSBtaW51dGVzIDwgMTAgPyBgMCR7bWludXRlc31gIDogbWludXRlcztcclxuICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZHMgPSBzZWNvbmRzIDwgMTAgPyBgMCR7c2Vjb25kc31gIDogc2Vjb25kcztcclxuXHJcbiAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gYCR7aGFsZkRheUhyc306JHtmb3JtYXR0ZWRNaW51dGVzfToke2Zvcm1hdHRlZFNlY29uZHN9ICR7dGltZVBlcmlvZH1gO1xyXG4gICAgcmV0dXJuIGZvcm1hdHRlZFRpbWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogLSBUaGlzIGZ1bmN0aW9uIHJlcXVlc3RzIHRoZSBzZXJ2ZXIgdG8gYXV0aGVudGljYXRlIGEgY2xpZW50IGlmIGl0IGhhcyB0aGUgY3JlZGVudGlhbHMgb2YgYSB1c2VyLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtFdmVudH0gW2VdXHJcbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59XHJcbiAgICpcclxuICAgKiBAbGlzdGVucyBsb2FkXHJcbiAgICpcclxuICAgKiBAc3RhdGljXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGxvZ1VzZXIgPSBhc3luYyAoZT86IEV2ZW50KTogUHJvbWlzZTxib29sZWFuPiA9PiB7XHJcbiAgICAvKiogREFUQSBHQVRIRVJJTkdcclxuICAgICAqIC0gUHJlcGFyZXMgY2hhdCBhcHBsaWNhdGlvbiBjb21wb25lbnQuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGFwcENvbXAgPSBBcHBDb21wb25lbnQuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICAvKiogSFRUUCBSRVFVRVNUXHJcbiAgICAgKiAtIFJlcXVlc3RzIGFuIEhUVFAgR0VUIHRvIHRoZSBzZXJ2ZXIgZm9yIGF1dGhlbnRpY2F0aW9uLlxyXG4gICAgICogLSBJbW1lZGlhdGVseSByZXR1cm5zIGFuZCBpbnN0cnVjdHMgVUkgdG8gc2hvdyBleGNlcHRpb24gdXBvbiBsb2dpYyBlcnJvci5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogLSBXaXRoIGNyZWRlbnRpYWxzLlxyXG4gICAgICogYXdhaXQgdHJ5Q2F0Y2goaHR0cEdldEF1dGgpOyAvLyBPYmplY3QgeyBlcnI6IG51bGwsIGRhdGE6IHsuLi59IH1cclxuICAgICAqIC0gV2l0aG91dCBjcmVkZW50aWFscy5cclxuICAgICAqIGF3YWl0IHRyeUNhdGNoKGh0dHBHZXRBdXRoKTsgLy8gT2JqZWN0IHsgZXJyOiBudWxsLCBkYXRhOiB7fSB9XHJcbiAgICAgKiAtIEludmFsaWQgY3JlZGVudGlhbHMuXHJcbiAgICAgKiBhd2FpdCB0cnlDYXRjaChodHRwR2V0QXV0aCk7IC8vIE9iamVjdCB7IGVycjogey4uLn0sIGRhdGE6IG51bGwgfVxyXG4gICAgICovXHJcbiAgICBsZXQgcmVzcG9uc2UhOiBpSHR0cFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmVzcG9uc2UgPSBhd2FpdCB0cnlDYXRjaChodHRwR2V0QXV0aCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgRXJyb3JDb21wb25lbnQuc2hvd0NvbXAoXHJcbiAgICAgICAgXCJFUlJPUjogY2xpZW50IGlzIHVuYWJsZSB0byByZXF1ZXN0IGZvciBhdXRoZW50aWNhdGlvblwiLFxyXG4gICAgICAgIGVyclxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWQUxJREFUSU9OOiBIVFRQIFJFU1BPTlNFXHJcbiAgICAgKiAtIEltbWVkaWF0ZWx5IHJldHVybnMgdXBvbiBpbnZhbGlkIHJlc3BvbnNlLlxyXG4gICAgICovXHJcbiAgICBpZiAoXHJcbiAgICAgIChyZXNwb25zZS5lcnIgIT09IG51bGwgJiYgcmVzcG9uc2UuZXJyICE9PSB1bmRlZmluZWQpIHx8XHJcbiAgICAgICEoXCJzdGF0dXNDb2RlXCIgaW4gcmVzcG9uc2UuZGF0YSlcclxuICAgICkge1xyXG4gICAgICBhcHBDb21wLmFwcEF1dGgoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiAtIENyZWF0ZSBpbnN0YW5jZXMgb2YgcmVxdWlyZWQgaW5pdGlhbCBjb21wb25lbnRzICovXHJcbiAgICBQZWVyQ29tcG9uZW50LmdldEluc3RhbmNlKGZhbHNlLCByZXNwb25zZS5kYXRhLmRhdGEpO1xyXG4gICAgVXNlckNvbXBvbmVudC5nZXRJbnN0YW5jZShmYWxzZSk7XHJcblxyXG4gICAgYXBwQ29tcC5hcHBVc2VyKCk7XHJcblxyXG4gICAgU29ja2V0TWV0aG9kcy5pbml0KCk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhbiBpbnN0YW5jZSBvZiB0aGUgR2VuVXRpbCBjbGFzcy5cclxuICAgKiBAcmV0dXJucyB7R2VuVXRpbH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgcmVhZG9ubHkgZ2V0SW5zdDogKCkgPT4gR2VuVXRpbCA9ICgpOiBHZW5VdGlsID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0KSB0aGlzLmluc3QgPSBuZXcgR2VuVXRpbCgpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdDtcclxuICB9O1xyXG59XHJcbiIsImltcG9ydCB7IFNvY2tldCwgaW8gfSBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlRXZlbnQgfSBmcm9tIFwiLi4vc29ja2V0L21lc3NhZ2UuZXZlbnRzXCI7XHJcbmltcG9ydCB7IFJlcXVlc3RFdmVudHMgfSBmcm9tIFwiLi4vc29ja2V0L3JlcXVlc3QuZXZlbnRzXCI7XHJcbmltcG9ydCB7IFJlbGF0aW9uRXZlbnQgfSBmcm9tIFwiLi4vc29ja2V0L3JlbGF0aW9uLmV2ZW50c1wiO1xyXG5cclxuLyoqIFRoaXMgY2xhc3MgaG9sZHMgZXZlbnQgYW5kIGNhbGxiYWNrIGNvbmZpZ3VyYXRpb24gZm9yIFNvY2tldCBldmVudHMuICovXHJcbmV4cG9ydCBjbGFzcyBTb2NrZXRNZXRob2RzIHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogU29ja2V0TWV0aG9kcztcclxuICBzdGF0aWMgc29ja2V0OiBTb2NrZXQgfCBudWxsO1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgcG9zdFJlcXVlc3RFdiA9IFwicG9zdFJlcXVlc3RcIjtcclxuICBzdGF0aWMgcmVhZG9ubHkgcG9zdFJlcXVlc3RSZXYgPSBcInBvc3RSZXF1ZXN0UlwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXRjaFJlcXVlc3RFdiA9IFwicGF0Y2hSZXF1ZXN0XCI7XHJcbiAgc3RhdGljIHJlYWRvbmx5IHBhdGNoUmVxdWVzdFJldiA9IFwicGF0Y2hSZXF1ZXN0UlwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXRjaFJlbGF0aW9uRXYgPSBcInBhdGNoUmVsYXRpb25cIjtcclxuICBzdGF0aWMgcmVhZG9ubHkgcGF0Y2hSZWxhdGlvblJldiA9IFwicGF0Y2hSZWxhdGlvblJcIjtcclxuICBzdGF0aWMgcmVhZG9ubHkgcG9zdE1lc3NhZ2VFdiA9IFwicG9zdE1lc3NhZ2VcIjtcclxuICBzdGF0aWMgcmVhZG9ubHkgcG9zdE1lc3NhZ2VSZXYgPSBcInBvc3RNZXNzYWdlUlwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBqb2luUm9vbUV2ID0gXCJqb2luUm9vbVwiO1xyXG4gIHN0YXRpYyByZWFkb25seSBqb2luUm9vbXNFdiA9IFwiam9pblJvb21zXCI7XHJcblxyXG4gIHN0YXRpYyByZWFkb25seSBzZXJ2ZXJFcnJSZXYgPSBcInNlcnZlckVyclJcIjtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIC8qKiBUaGlzIGZ1bmN0aW9uOlxyXG4gICAqIC0gY29ubmVjdHMgdGhlIGNsaWVudCB0byB0aGUgc2VydmVyIHZpYSBzb2NrZXRcclxuICAgKiAtIGluc3RhbnRpYXRlcyBhIG5ldyBjbGllbnQgc29ja2V0IGNsYXNzXHJcbiAgICogLSBwcmVwYXJlcyBzb2NrZXQgZXZlbnRzXHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGluaXQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnNvY2tldCA9IGlvKFwiaHR0cHM6Ly9sb2NhbGhvc3Q6ODAwMFwiKTtcclxuICAgIFNvY2tldE1ldGhvZHMuZ2V0KCk7XHJcbiAgICBTb2NrZXRNZXRob2RzLmNvbmZpZ3VyZVNvY2tldCh0aGlzLnNvY2tldCk7XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNvbmZpZ3VyZVNvY2tldCA9IChzb2M6IFNvY2tldCk6IHZvaWQgPT4ge1xyXG4gICAgU29ja2V0TWV0aG9kcy5jb25maWdDb25uRXYoc29jKTtcclxuICAgIFNvY2tldE1ldGhvZHMuY29uZmlnUmVxdWVzdEV2KHNvYyk7XHJcbiAgICBTb2NrZXRNZXRob2RzLmNvbmZpZ1JlbGF0aW9uRXYoc29jKTtcclxuICAgIFNvY2tldE1ldGhvZHMuY29uZmlnTWVzc2FnZUV2KHNvYyk7XHJcblxyXG4gICAgU29ja2V0TWV0aG9kcy5jb25maWdFcnJFdihzb2MpO1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyByZWFkb25seSBjb25maWdDb25uRXYgPSAoc29jOiBTb2NrZXQpOiB2b2lkID0+IHtcclxuICAgIHNvYy5vbihcImNvbm5lY3RcIiwgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLnNvY2tldCEuaWR9IGNvbnRlY3RlZCB0byBzZXJ2ZXJgKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHN0YXRpYyByZWFkb25seSBjb25maWdSZXF1ZXN0RXYgPSAoc29jOiBTb2NrZXQpOiB2b2lkID0+IHtcclxuICAgIHNvYy5vbih0aGlzLnBvc3RSZXF1ZXN0UmV2LCBSZXF1ZXN0RXZlbnRzLnBvc3RSZXF1ZXN0Uik7XHJcbiAgICBzb2Mub24odGhpcy5wYXRjaFJlcXVlc3RSZXYsIFJlcXVlc3RFdmVudHMucGF0Y2hSZXF1ZXN0Uik7XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNvbmZpZ1JlbGF0aW9uRXYgPSAoc29jOiBTb2NrZXQpOiB2b2lkID0+IHtcclxuICAgIHNvYy5vbih0aGlzLnBhdGNoUmVsYXRpb25FdiwgUmVsYXRpb25FdmVudC5wYXRjaFJlbGF0aW9uKTtcclxuICB9O1xyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgY29uZmlnTWVzc2FnZUV2ID0gKHNvYzogU29ja2V0KTogdm9pZCA9PiB7XHJcbiAgICBzb2Mub24odGhpcy5wb3N0TWVzc2FnZVJldiwgTWVzc2FnZUV2ZW50LnBvc3RNZXNzYWdlUik7XHJcbiAgfTtcclxuXHJcbiAgc3RhdGljIHJlYWRvbmx5IGNvbmZpZ0VyckV2ID0gKHNvYzogU29ja2V0KTogdm9pZCA9PiB7XHJcbiAgICBzb2Mub24odGhpcy5zZXJ2ZXJFcnJSZXYsIChlcnIpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gZGlzY29ubmVjdHMgY2xpZW50IGZyb20gYW55IGNvbm5lY3RlZCByb29tcyBhbmQgc2VydmVyIHNvY2tldCBjb25uZWN0aW9uLiAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBkZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5zb2NrZXQhLmRpc2Nvbm5lY3QoKTtcclxuICAgIGNvbnNvbGUubG9nKGAke3RoaXMuc29ja2V0IS5pZH0gdXNlciBkaXNjb25uZWN0ZWQgdG8gc2VydmVyYCk7XHJcbiAgICB0aGlzLnNvY2tldCA9IG51bGw7XHJcbiAgfTtcclxuXHJcbiAgLyoqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIG5ldyBvciBvbGQgaW5zdGFuY2Ugb2YgdGhlIGNsYXNzLiAqL1xyXG4gIHN0YXRpYyByZWFkb25seSBnZXQgPSAoKTogU29ja2V0TWV0aG9kcyA9PiB7XHJcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHRoaXMuaW5zdGFuY2UgPSBuZXcgU29ja2V0TWV0aG9kcygpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBpTmV3R3JwQm9keSB9IGZyb20gXCIuLi9tb2RlbHMvZ3JvdXAubW9kZWxcIjtcclxuaW1wb3J0IHsgaUF1dGhJbnB1dHMgfSBmcm9tIFwiLi4vbW9kZWxzL2F1dGgubW9kZWxcIjtcclxuaW1wb3J0IHsgaUh0dHBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaHR0cC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpVmFsaWRpdHlUeXBlIH0gZnJvbSBcIi4uL21vZGVscy92YWxpZGl0eS5tb2RlbFwiO1xyXG5pbXBvcnQgeyBpQ2hhdFR5cGUsIGlSZXF1ZXN0Qm9keSB9IGZyb20gXCIuLi9tb2RlbHMvZ2VuLm1vZGVsXCI7XHJcbmltcG9ydCB7IEVycm9yQ29tcG9uZW50IGFzIGVycm9yIH0gZnJvbSBcIi4uL2NvbXBvbmVudHMvZXJyb3IuY29tcFwiO1xyXG5pbXBvcnQgeyB1c2VybmFtZV9wYXR0ZXJuLCBwYXNzd29yZF9wYXR0ZXJuIH0gZnJvbSBcIi4uL21vZGVscy9hdXRoLm1vZGVsXCI7XHJcbmltcG9ydCB7XHJcbiAgY2hhdFR5cGUsXHJcbiAgY29udGFjdEFjdCxcclxuICBpU2VhcmNoSXRlbSxcclxuICBpUmVsYXRpb25BY3QsXHJcbiAgaVNlYXJjaFZhbHVlcyxcclxufSBmcm9tIFwiLi4vbW9kZWxzL3BlZXIubW9kZWxcIjtcclxuaW1wb3J0IHtcclxuICBpUmVxdWVzdCxcclxuICBpUmVsYXRpb24sXHJcbiAgaVVzZXJQYXNzd29yZCxcclxuICByZXF1ZXN0QWN0aW9ucyxcclxuICBpUHJpdmFjeVJlcXVlc3QsXHJcbiAgaVJlcXVlc3RBY3Rpb25zLFxyXG4gIGlVc2VyUHJpdmFjeVByb3AsXHJcbiAgaVVzZXJQYXRjaFJlcXVlc3QsXHJcbiAgaVJlcXVlc3RBcHByb3ZlRGF0YSxcclxufSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcclxuXHJcbi8qKiBUaGlzIGNsYXNzIGhvbGRzIGEgcmFuZ2Ugb2YgaW5wdXQgdmFsaWRhdGlvbiBtZXRob2RzIHVzZWQgdGhyb3VnaG91dCB0aGUgY2xpZW50IGNvZGUuICovXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0ZSB7XHJcbiAgc3RhdGljIGluc3RhbmNlOiBWYWxpZGF0ZSB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICBzdGF0aWMgcmVhZG9ubHkgcmVnaXN0ZXJGb3JtID0gKFxyXG4gICAgcmVnaXN0ZXJJbnB1dHM6IGlBdXRoSW5wdXRzXHJcbiAgKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICAvLyBVU0VSTkFNRSBWQUxJREFURVxyXG4gICAgLy8gLS0tIG11c3Qgb25seSBoYXZlIFVQUEVSQ0FTRSwgTE9XRVJDQVNFLCBOVU1FUklDLCBvciBTUEVDSUFMIGNoYXJhY3RlcnNcclxuICAgIC8vIC0tLSBhdCBsZW5ndGggb2YgOC0yMCBjaGFyYWN0ZXJzXHJcbiAgICAvLyBQQVNTV09SRCBWQUxJREFURVxyXG4gICAgLy8gLS0tIG11c3Qgb25seSBoYXZlIFVQUEVSQ0FTRSwgTE9XRVJDQVNFLCBOVU1FUklDLCBhbmQgU1BFQ0lBTCBjaGFyYWN0ZXJzXHJcbiAgICAvLyAtLS0gYXQgbGVhc3Qgb25lIFVQUEVSQ0FTRSwgTE9XRVJDQVNFLCBOVU1FUklDLCBhbmQgU1BFQ0lBTCBjaGFyYWN0ZXJcclxuICAgIC8vIC0tLSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcclxuICAgIC8vIFJFLVBBU1NXT1JEIFZBTElEQVRFXHJcbiAgICAvLyAtLS0gbXVzdCBvbmx5IGhhdmUgVVBQRVJDQVNFLCBMT1dFUkNBU0UsIE5VTUVSSUMsIGFuZCBTUEVDSUFMIGNoYXJhY3RlcnNcclxuICAgIC8vIC0tLSBlcXVhbHMgcGFzc3dvcmRcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICByZWdpc3RlcklucHV0cy51c2VybmFtZS5tYXRjaCh1c2VybmFtZV9wYXR0ZXJuKVxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJVc2VybmFtZSBtdXN0IGNvbnRhaW4gOC0yMCB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgbnVtZXJpYywgb3IgIz8hQCQlXiYqIGNoYXJhY3RlcnNcIixcclxuICAgICAgcmVnaXN0ZXJJbnB1dHMucGFzc3dvcmQubWF0Y2gocGFzc3dvcmRfcGF0dGVybilcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZyBhbmQgbXVzdCBjb250YWluIGF0IGxlYXN0IDEgdXBwZXJjYXNlLCBsb3dlcmNhc2UsIG51bWVyaWMsIGFuZCAjPyFAJCVeJiogY2hhcmFjdGVyc1wiLFxyXG4gICAgICByZWdpc3RlcklucHV0cy5yZVBhc3N3b3JkIS5tYXRjaChwYXNzd29yZF9wYXR0ZXJuKVxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJDb25maXJtZWQgcGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZyBhbmQgbXVzdCBjb250YWluIGF0IGxlYXN0IDEgdXBwZXJjYXNlLCBsb3dlcmNhc2UsIG51bWVyaWMsIGFuZCAjPyFAJCVeJiogY2hhcmFjdGVyc1wiLFxyXG4gICAgICByZWdpc3RlcklucHV0cy5wYXNzd29yZCA9PT0gcmVnaXN0ZXJJbnB1dHMucmVQYXNzd29yZFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJQYXNzd29yZCAmIENvbmZpcm1hdGlvbiBwYXNzd29yZCBkb2VzIG5vdCBtYXRjaFwiLFxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgbG9naW5Gb3JtID0gKGxvZ2luSW5wdXRzOiBpQXV0aElucHV0cyk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgLy8gVVNFUk5BTUUgJiBQQVNTV09SRCBBUkUgUkVRVUlSRURcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICBsb2dpbklucHV0cy51c2VybmFtZS50cmltKCkubGVuZ3RoIDwgMSA/IFwiVXNlcm5hbWUgaXMgcmVxdWlyZVwiIDogbnVsbCxcclxuICAgICAgbG9naW5JbnB1dHMucGFzc3dvcmQudHJpbSgpLmxlbmd0aCA8IDEgPyBcIlBhc3N3b3JkIGlzIHJlcXVpcmVcIiA6IG51bGwsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBzZWFyY2ggPSAoXHJcbiAgICBzZWFyY2hJdGVtOiBpU2VhcmNoVmFsdWVzLFxyXG4gICAgc3RyVHlwZTogaUNoYXRUeXBlXHJcbiAgKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB7IHBhdHRlcm4sIHR5cGUsIHNraXAgfSA9IHNlYXJjaEl0ZW07XHJcbiAgICBjb25zdCB2YWxpZGl0eSA9IFtcclxuICAgICAgdHlwZW9mIHBhdHRlcm4gPT09IFwic3RyaW5nXCIgPyBudWxsIDogXCJTZWFyY2ggUGF0dGVybiBtdXN0IGJlIGFzdHJpbmdcIixcclxuICAgICAgdHlwZSA9PT0gMCB8fCB0eXBlID09PSAxXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBgU2VhcmNoIFN0cmluZyBUeXBlcyBjYW4gb25seSBiZSBlaXRoZXIgMSBvciAxYCxcclxuICAgICAgc3RyVHlwZSA9PT0gXCJ1c2VyXCIgfHwgc3RyVHlwZSA9PT0gXCJncm91cFwiXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBgU2VhcmNoIFR5cGUgY2FuIG9ubHkgYmUgZWl0aGVyICR7Y2hhdFR5cGUudXNlcn0gb3IgJHtjaGF0VHlwZS5ncm91cH1gLFxyXG4gICAgICB0eXBlb2Ygc2tpcCA9PT0gXCJudW1iZXJcIiA/IG51bGwgOiBgU2VhcmNoIFNraXAgbXVzdCBiZSBhIG51bWJlcmAsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBjaGFuZ2VQYXNzd29yZEZvcm0gPSAoXHJcbiAgICByZVBhc3N3b3JkSW5wdXRzOiBpVXNlclBhc3N3b3JkXHJcbiAgKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICAvLyBQQVNTV09SRCBWQUxJREFURVxyXG4gICAgLy8gLS0tIG11c3Qgb25seSBoYXZlIFVQUEVSQ0FTRSwgTE9XRVJDQVNFLCBOVU1FUklDLCBhbmQgU1BFQ0lBTCBjaGFyYWN0ZXJzXHJcbiAgICAvLyAtLS0gYXQgbGVhc3Qgb25lIFVQUEVSQ0FTRSwgTE9XRVJDQVNFLCBOVU1FUklDLCBhbmQgU1BFQ0lBTCBjaGFyYWN0ZXJcclxuICAgIC8vIC0tLSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcclxuICAgIC8vIFJFLVBBU1NXT1JEIFZBTElEQVRFXHJcbiAgICAvLyAtLS0gbXVzdCBvbmx5IGhhdmUgVVBQRVJDQVNFLCBMT1dFUkNBU0UsIE5VTUVSSUMsIGFuZCBTUEVDSUFMIGNoYXJhY3RlcnNcclxuICAgIC8vIC0tLSBlcXVhbHMgcGFzc3dvcmRcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICByZVBhc3N3b3JkSW5wdXRzLnBhc3N3b3JkLm1hdGNoKHBhc3N3b3JkX3BhdHRlcm4pXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmcgYW5kIG11c3QgY29udGFpbiBhdCBsZWFzdCAxIHVwcGVyY2FzZSwgbG93ZXJjYXNlLCBudW1lcmljLCBhbmQgIz8hQCQlXiYqIGNoYXJhY3RlcnNcIixcclxuICAgICAgcmVQYXNzd29yZElucHV0cy5yZVBhc3N3b3JkLm1hdGNoKHBhc3N3b3JkX3BhdHRlcm4pXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIkNvbmZpcm1lZCBwYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nIGFuZCBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgMSB1cHBlcmNhc2UsIGxvd2VyY2FzZSwgbnVtZXJpYywgYW5kICM/IUAkJV4mKiBjaGFyYWN0ZXJzXCIsXHJcbiAgICAgIHJlUGFzc3dvcmRJbnB1dHMucGFzc3dvcmQgPT09IHJlUGFzc3dvcmRJbnB1dHMucmVQYXNzd29yZFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJQYXNzd29yZCAmIENvbmZpcm1hdGlvbiBwYXNzd29yZCBkb2VzIG5vdCBtYXRjaFwiLFxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgcmVsYXRpb25BY3Rpb24gPSAoXHJcbiAgICByZWxhdGlvbkFjdDogaVJlbGF0aW9uQWN0XHJcbiAgKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB2YWxpZGl0eSA9IFtcclxuICAgICAgdHlwZW9mIHJlbGF0aW9uQWN0LnJlY2lwaWVudElkID09PSBcInN0cmluZ1wiICYmXHJcbiAgICAgIHJlbGF0aW9uQWN0LnJlY2lwaWVudElkLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUmVjaXBpZW50IGlkIGlzIHJlcXVpcmVkXCIsXHJcbiAgICAgIHJlbGF0aW9uQWN0LnVzZXJBY3Rpb24gPT09IGNvbnRhY3RBY3QuYmxvY2sgfHxcclxuICAgICAgcmVsYXRpb25BY3QudXNlckFjdGlvbiA9PT0gY29udGFjdEFjdC5tdXRlIHx8XHJcbiAgICAgIHJlbGF0aW9uQWN0LnVzZXJBY3Rpb24gPT09IGNvbnRhY3RBY3QuYXJjaGl2ZVxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogYFJlbGF0aW9uIGFjdGlvbiBtdXN0IG9ubHkgYmUgJHtjb250YWN0QWN0LmFyY2hpdmV9LCAke2NvbnRhY3RBY3QubXV0ZX0sIG9yJHtjb250YWN0QWN0LmJsb2NrfWAsXHJcbiAgICAgIHR5cGVvZiByZWxhdGlvbkFjdC5hY3Rpb25WYWx1ZSA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUmVsYXRpb24gYWN0aW9uIHZhbHVlIG11c3Qgb25seSBiZSBhIGJvb2xlYW4gZGF0YSB0eXBlXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSByZXF1ZXN0RGVsID0gKGlkOiBzdHJpbmcsIHR5cGU6IDAgfCAxKTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB2YWxpZGl0eSA9IFtcclxuICAgICAgdHlwZW9mIGlkID09PSBcInN0cmluZ1wiICYmIGlkLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiUmVxdWVzdCBpdGVtIGlkIGlzIGludmFsaWRcIixcclxuICAgICAgdHlwZSA9PT0gMCB8fCB0eXBlID09PSAxID8gbnVsbCA6IFwiUmVxdWVzdCBUeXBlIGlzIGludmFsaWRcIixcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IHJlcXVlc3RCb2R5ID0gKHJlcUJvZHk6IGlSZXF1ZXN0Qm9keSk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgY29uc3QgeyB0eXBlLCByZWNpcGllbnRJZCwgZ3JvdXBJZCB9ID0gcmVxQm9keTtcclxuICAgIGxldCB2YWxpZGl0eTogQXJyYXk8bnVsbCB8IHN0cmluZz4gPSBbXHJcbiAgICAgIHR5cGUgPT09IDEgfHwgdHlwZSA9PT0gMiB8fCB0eXBlID09PSAzXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlJlcXVlc3QgdHlwZSBjYW4gb25seSBiZSAxLCAyLCBvciAzXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIGlmICh0eXBlICE9PSAyKSB7XHJcbiAgICAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAgICAgdHlwZW9mIHJlY2lwaWVudElkID09PSBcInN0cmluZ1wiICYmIHJlY2lwaWVudElkLmxlbmd0aCA+IDBcclxuICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgOiBcIkdyb3VwIHRvIFVzZXIgUmVxdWVzdCByZXF1aXJlZCBSZWNpcGllbnQgSURcIlxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsaWRpdHkucHVzaChcclxuICAgICAgICAhcmVjaXBpZW50SWQgPyBudWxsIDogXCJVc2VyIHRvIEdyb3VwIHJlcXVlc3QgbXVzdCBub3QgaGF2ZSBSZWNpcGllbnQgSURcIlxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGUgIT09IDEpIHtcclxuICAgICAgdmFsaWRpdHkucHVzaChcclxuICAgICAgICB0eXBlb2YgZ3JvdXBJZCA9PT0gXCJzdHJpbmdcIiAmJiBncm91cElkLmxlbmd0aCA+IDBcclxuICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgOiBcIlVzZXIgdG8gR3JvdXAgUmVxdWVzdCByZXF1aXJlZCBHcm91cCBJRFwiXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YWxpZGl0eS5wdXNoKFxyXG4gICAgICAgICFncm91cElkID8gbnVsbCA6IFwiVXNlciB0byBVc2VyIHJlcXVlc3QgbXVzdCBub3QgaGF2ZSBncm91cCBJRFwiXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVVBEQVRFOiBUUkFOU0lUSU9OIEFCQU5ET05FRFxyXG4gICAgLy8gUkVBU09OOiAhXCJcIiBJUyBhIHRydXRoeSB2YWx1ZSwgbWVhbmluZywgXCJcIiBpcyBmYWxzeVxyXG4gICAgLy8gVFJBTlNJVElPTiBUTyBDT0RFIEJFTE9XIFVQT04gRlVSVEhFUiBURVNUSU5HXHJcbiAgICAvLyBpZiAodHlwZSAhPT0gMikge1xyXG4gICAgLy8gICB2YWxpZGl0eS5wdXNoKFxyXG4gICAgLy8gICAgIHR5cGVvZiByZWNpcGllbnRJZCA9PT0gXCJzdHJpbmdcIiAmJiByZWNpcGllbnRJZC5sZW5ndGggPiAwXHJcbiAgICAvLyAgICAgICA/IG51bGxcclxuICAgIC8vICAgICAgIDogXCJHcm91cCB0byBVc2VyIFJlcXVlc3QgcmVxdWlyZWQgUmVjaXBpZW50IElEXCJcclxuICAgIC8vICAgKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAvLyAgICAgdHlwZW9mIHJlY2lwaWVudElkID09PSBcInN0cmluZ1wiICYmIHJlY2lwaWVudElkLmxlbmd0aCA9PT0gMFxyXG4gICAgLy8gICAgICAgPyBudWxsXHJcbiAgICAvLyAgICAgICA6IFwiVXNlciB0byBHcm91cCByZXF1ZXN0IG11c3Qgbm90IGhhdmUgUmVjaXBpZW50IElEXCJcclxuICAgIC8vICAgKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGlmICh0eXBlICE9PSAxKSB7XHJcbiAgICAvLyAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAvLyAgICAgdHlwZW9mIGdyb3VwSWQgPT09IFwic3RyaW5nXCIgJiYgZ3JvdXBJZC5sZW5ndGggPiAwXHJcbiAgICAvLyAgICAgICA/IG51bGxcclxuICAgIC8vICAgICAgIDogXCJVc2VyIHRvIEdyb3VwIFJlcXVlc3QgcmVxdWlyZWQgR3JvdXAgSURcIlxyXG4gICAgLy8gICApO1xyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgdmFsaWRpdHkucHVzaChcclxuICAgIC8vICAgICB0eXBlb2YgZ3JvdXBJZCA9PT0gXCJzdHJpbmdcIiAmJiBncm91cElkLmxlbmd0aCA9PT0gMFxyXG4gICAgLy8gICAgICAgPyBudWxsXHJcbiAgICAvLyAgICAgICA6IFwiVXNlciB0byBVc2VyIHJlcXVlc3QgbXVzdCBub3QgaGF2ZSBncm91cCBJRFwiXHJcbiAgICAvLyAgICk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IHJlcXVlc3RJdGVtID0gKFxyXG4gICAgaXRlbTogaVJlcXVlc3QsXHJcbiAgICB3cmFwcGVyOiBIVE1MRGl2RWxlbWVudCxcclxuICAgIHR5cGU6IFwiaW5jb21pbmdcIiB8IFwib3V0Z29pbmdcIlxyXG4gICk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFjY250X2lkID09PSBcInN0cmluZ1wiICYmIGl0ZW0uYWNjbnRfaWQubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJSZXF1ZXN0IGl0ZW0gSUQgYWNjbnRfaWQgaXMgaW52YWxpZFwiLFxyXG4gICAgICB0eXBlb2YgaXRlbS5hY2NudF9uYW1lID09PSBcInN0cmluZ1wiICYmIGl0ZW0uYWNjbnRfbmFtZS5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlJlcXVlc3QgaXRlbSBhY2NudF9uYW1lIGlzIGludmFsaWRcIixcclxuICAgICAgdHlwZW9mIGl0ZW0uaXNHcm91cCA9PT0gXCJib29sZWFuXCIgPyBudWxsIDogXCJSZXF1ZXN0IGl0ZW0gdHlwZSBpcyBpbnZhbGlkXCIsXHJcbiAgICAgIGl0ZW0uc3RhdHVzID09PSBcImFwcHJvdmVkXCIgfHxcclxuICAgICAgaXRlbS5zdGF0dXMgPT09IFwiY2FuY2VsbGVkXCIgfHxcclxuICAgICAgaXRlbS5zdGF0dXMgPT09IFwicGVuZGluZ1wiIHx8XHJcbiAgICAgIGl0ZW0uc3RhdHVzID09PSBcInJlamVjdGVkXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IGBSZXF1ZXN0IGl0ZW0gc3RhdHVzIGNhbiBvbmx5IGJlICdhcHByb3ZlZCcsICdjYW5jY2VsbGVkJywgb3IgJ3JlamVjdGVkJ2AsXHJcbiAgICAgIHdyYXBwZXIgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJXcmFwcGVyIG11c3QgYmUgYW4gSFRNTEVEaXZsZW1lbnRcIixcclxuICAgICAgdHlwZSA9PT0gXCJpbmNvbWluZ1wiIHx8IHR5cGUgPT09IFwib3V0Z29pbmdcIlxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogYFJlcXVlc3QgdHlwZSBjYW4gb25seSBiZSAnaW5jb21pbmcnIG9yICdvdXRnb2luZydgLFxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgbXV0ZUJsb2NrSXRlbSA9IChcclxuICAgIGl0ZW06IGlSZWxhdGlvbixcclxuICAgIHdyYXBwZXI6IEhUTUxEaXZFbGVtZW50LFxyXG4gICAgdHlwZTogMCB8IDFcclxuICApOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIC8vIDAgKG11dGUpIDEgKGJsb2NrKVxyXG4gICAgY29uc3QgeyBhY2NudF9pZCwgYWNjbnRfbmFtZSB9ID0gaXRlbTtcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICB0eXBlb2YgYWNjbnRfaWQgPT09IFwic3RyaW5nXCIgJiYgYWNjbnRfaWQubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogYCR7dHlwZSA9PT0gMCA/IFwiTXV0ZVwiIDogXCJCbG9ja1wifSAgaXRlbSByZXF1aXJlcyB1c2VyIElEYCxcclxuICAgICAgd3JhcHBlciBpbnN0YW5jZW9mIEhUTUxEaXZFbGVtZW50XHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIldyYXBwZXIgbXVzdCBiZSBhbiBIVE1MRGl2RWxlbWVudFwiLFxyXG4gICAgICB0eXBlb2YgYWNjbnRfbmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBhY2NudF9uYW1lLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IGAke3R5cGUgPT09IDAgPyBcIk11dGVcIiA6IFwiQmxvY2tcIn0gIGl0ZW0gcmVxdWlyZXMgdXNlciBJRGAsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBwYXRjaFJlcXVlc3REYXRhID0gKFxyXG4gICAgcGF0Y2hSZXF1ZXN0OiBpUmVxdWVzdEJvZHksXHJcbiAgICBhY3Rpb246IGlSZXF1ZXN0QWN0aW9uc1xyXG4gICk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgY29uc3QgeyB0eXBlLCByZWNpcGllbnRJZCwgZ3JvdXBJZCB9ID0gcGF0Y2hSZXF1ZXN0O1xyXG5cclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICBhY3Rpb24gPT09IHJlcXVlc3RBY3Rpb25zLmFwcHJvdmUgfHxcclxuICAgICAgYWN0aW9uID09PSByZXF1ZXN0QWN0aW9ucy5yZWplY3QgfHxcclxuICAgICAgYWN0aW9uID09PSByZXF1ZXN0QWN0aW9ucy5jYW5jZWxcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IGBSZXF1ZXN0IGFjdGlvbiBtdXN0IG9ubHkgYmUgJHtyZXF1ZXN0QWN0aW9ucy5hcHByb3ZlfSwke3JlcXVlc3RBY3Rpb25zLnJlamVjdH0sIG9yICR7cmVxdWVzdEFjdGlvbnMuY2FuY2VsfWAsXHJcbiAgICBdO1xyXG5cclxuICAgIGlmICh0eXBlID09PSAxIHx8IHR5cGUgPT09IDIgfHwgdHlwZSA9PT0gMykge1xyXG4gICAgICBpZiAodHlwZSAhPT0gMikge1xyXG4gICAgICAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAgICAgICB0eXBlb2YgcmVjaXBpZW50SWQgPT09IFwic3RyaW5nXCIgJiYgcmVjaXBpZW50SWQubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICA/IG51bGxcclxuICAgICAgICAgICAgOiBgVHlwZTogJHt0eXBlfSBhY3Rpb24gcmVxdWlyZXMgUmVjaXBpZW50IElEYFxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsaWRpdHkucHVzaChcclxuICAgICAgICAgICFyZWNpcGllbnRJZCA/IG51bGwgOiBgVHlwZTogJHt0eXBlfSBhY3Rpb24gcmVxdWlyZXMgbm8gUmVjaXBpZW50IElEYFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGUgIT09IDEpIHtcclxuICAgICAgICB2YWxpZGl0eS5wdXNoKFxyXG4gICAgICAgICAgdHlwZW9mIGdyb3VwSWQgPT09IFwic3RyaW5nXCIgJiYgZ3JvdXBJZC5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgID8gbnVsbFxyXG4gICAgICAgICAgICA6IGBUeXBlOiAke3R5cGV9IGFjdGlvbiByZXF1aXJlcyBHcm91cCBJRGBcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbGlkaXR5LnB1c2goXHJcbiAgICAgICAgICAhZ3JvdXBJZCA/IG51bGwgOiBgVHlwZTogJHt0eXBlfSBhY3Rpb24gcmVxdWlyZXMgbm8gR3JvdXAgSURgXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsaWRpdHkucHVzaChcIkFjdGlvbiBUeXBlIGNhbiBvbmx5IGJlIDEsIDIsIG9yIDNcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IGFwcHJvdmVEYXRhID0gKGRhdGE6IGlSZXF1ZXN0QXBwcm92ZURhdGEpOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICBkYXRhLm5ld1N0YXR1cyA9PT0gXCJhcHByb3ZlZFwiID8gbnVsbCA6IFwiU3RhdHVzIGRhdGEgaXMgaW52YWxpZFwiLFxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgcHJpdmFjeURhdGEgPSAoXHJcbiAgICBwcml2YWN5RGF0YTogaVByaXZhY3lSZXF1ZXN0LFxyXG4gICAgcHJvcDogaVVzZXJQcml2YWN5UHJvcFxyXG4gICk6IGlWYWxpZGl0eVR5cGUgPT4ge1xyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHByaXZhY3lEYXRhLnByb3BlcnR5ID09PSBwcm9wID8gbnVsbCA6IGBQcml2YWN5IHByb3BlcnR5IG11c3QgYmUgJHtwcm9wfWAsXHJcbiAgICAgIHByaXZhY3lEYXRhLnZhbHVlID09PSBcInRydWVcIiB8fCBwcml2YWN5RGF0YS52YWx1ZSA9PT0gXCJmYWxzZVwiXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlByaXZhY3kgcHJvcGVydHkgdmFsdWUgbXVzdCBiZSBhIHN0cmluZ2lmaWVkIGJvb2xlYW5cIixcclxuICAgIF07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsaWRpdHkodmFsaWRpdHkpO1xyXG4gIH07XHJcbiAgc3RhdGljIHJlYWRvbmx5IHNlYXJjaEl0ZW0gPSAoaXRlbTogaVNlYXJjaEl0ZW0pOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICB0eXBlb2YgaXRlbS5hY2NudF9pZCA9PT0gXCJzdHJpbmdcIiAmJiBpdGVtLmFjY250X2lkLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBJRCBpcyByZXF1aXJlZCBmb3IgYSBzZWFyY2ggaXRlbVwiLFxyXG4gICAgICB0eXBlb2YgaXRlbS5hY3RfbmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBpdGVtLmFjdF9uYW1lLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBOYW1lIGlzIHJlcXVpcmVkIGZvciBhIHNlYXJjaCBpdGVtXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLmF2YWlsYWJpbGl0eSA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBOYW1lIGlzIHJlcXVpcmVkIGZvciBhIHNlYXJjaCBpdGVtXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBjb250YWN0SXRlbSA9IChpdGVtOiBpUmVsYXRpb24pOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGNvbnN0IHZhbGlkaXR5ID0gW1xyXG4gICAgICB0eXBlb2YgaXRlbS5hY2NudF9pZCA9PT0gXCJzdHJpbmdcIiAmJiBpdGVtLmFjY250X2lkLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBJRCBpcyByZXF1aXJlZCBmb3IgYSBzZWFyY2ggaXRlbVwiLFxyXG4gICAgICB0eXBlb2YgaXRlbS5hY2NudF9uYW1lID09PSBcInN0cmluZ1wiICYmIGl0ZW0uYWNjbnRfbmFtZS5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIkFjY291bnQgTmFtZSBpcyByZXF1aXJlZCBmb3IgYSBzZWFyY2ggaXRlbVwiLFxyXG4gICAgICBpdGVtLnR5cGUgPT09IGNoYXRUeXBlLnVzZXIgfHwgaXRlbS50eXBlID09PSBjaGF0VHlwZS5ncm91cFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogYEFjY291bnQgVHlwZSBtdXN0IGJlIGVpdGhlciAke2NoYXRUeXBlLnVzZXJ9IG9yICR7Y2hhdFR5cGUuZ3JvdXB9YCxcclxuICAgICAgdHlwZW9mIGl0ZW0uY2hhdF9pZCA9PT0gXCJzdHJpbmdcIiAmJiBpdGVtLmNoYXRfaWQubGVuZ3RoID4gMFxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJBY2NvdW50IENoYXQgSUQgaXMgaW52YWxpZFwiLFxyXG4gICAgICB0eXBlb2YgaXRlbS5hZG1pbiA9PT0gXCJib29sZWFuXCJcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiQWNjb3VudCBBZG1pbiBQcm9wZXJ0eSBpcyBpbnZhbGlkXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLmFyY2hpdmUgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIkFjY291bnQgQXJjaGl2ZSBQcm9wZXJ0eSBpcyBpbnZhbGlkXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLm11dGUgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIkFjY291bnQgTXV0ZSBQcm9wZXJ0eSBpcyBpbnZhbGlkXCIsXHJcbiAgICAgIHR5cGVvZiBpdGVtLmJsb2NrID09PSBcImJvb2xlYW5cIlxyXG4gICAgICAgID8gbnVsbFxyXG4gICAgICAgIDogXCJBY2NvdW50IEJsb2NrIFByb3BlcnR5IGlzIGludmFsaWRcIixcclxuICAgICAgdHlwZW9mIGl0ZW0uYnVtcCA9PT0gXCJudW1iZXJcIiA/IG51bGwgOiBcIkFjY291bnQgQnVtcCBQcm9wZXJ0eSBpcyBpbnZhbGlkXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnNldFZhbGlkaXR5KHZhbGlkaXR5KTtcclxuICB9O1xyXG4gIHN0YXRpYyByZWFkb25seSBuZXdHcm91cElucHV0ID0gKGdycEJvZHk6IGlOZXdHcnBCb2R5KTogaVZhbGlkaXR5VHlwZSA9PiB7XHJcbiAgICBjb25zdCB7IHJlY2lwaWVudElkLCBncnBOYW1lIH0gPSBncnBCb2R5O1xyXG4gICAgY29uc3QgdmFsaWRpdHkgPSBbXHJcbiAgICAgIHR5cGVvZiByZWNpcGllbnRJZCA9PT0gXCJzdHJpbmdcIiAmJiByZWNpcGllbnRJZC5sZW5ndGggPiAwXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBcIlJlY2lwaWVudCBJRCBpcyByZXF1aXJlZFwiLFxyXG4gICAgICB0eXBlb2YgZ3JwTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBncnBOYW1lLmxlbmd0aCA+IDBcclxuICAgICAgICA/IG51bGxcclxuICAgICAgICA6IFwiR3JvdXAgbmFtZSBpcyByZXF1aXJlZFwiLFxyXG4gICAgXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5zZXRWYWxpZGl0eSh2YWxpZGl0eSk7XHJcbiAgfTtcclxuICBzdGF0aWMgcmVhZG9ubHkgc2V0VmFsaWRpdHkgPSAoXHJcbiAgICB2YWxpZGl0eTogQXJyYXk8bnVsbCB8IHN0cmluZz5cclxuICApOiBpVmFsaWRpdHlUeXBlID0+IHtcclxuICAgIGlmICh2YWxpZGl0eS5qb2luKFwiXCIpKSB7XHJcbiAgICAgIHJldHVybiB7IGlzVmFsaWQ6IGZhbHNlLCBlcnJvcjogdmFsaWRpdHkuZmlsdGVyKChlcnIpID0+IGVyciAhPT0gbnVsbCkgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7IGlzVmFsaWQ6IHRydWUsIGVycm9yOiBudWxsIH07XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gSFRUUCBSRVNQT05TRSBWQUxJREFUSU9OXHJcbiAgLyoqXHJcbiAgICogVGhpcyBpcyBhIHNwZWNpYWwgdmFsaWRhdGlvbiBmdW5jdGlvbiBmb3IgSFRUUCBSZXNwb25zZXMgZnJvbSB0cnlDYXRjaCgpXHJcbiAgICogLSBpbnNwZWN0cyBIVFRQIHJlc3BvbnNlcyBmb3Igc2lnbnMgb2YgZXJyb3JcclxuICAgKiAtIGluc3RydWN0cyBlcnJvciBjb21wb25lbnQgdG8gYWN0aXZhdGUgdXBvbiBoaW50IG9mIGVycm9yXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyBpSHR0cFJlc3BvbnNlIH0gcmVzIC0gSFRUUCBSZXNwb25zZSBmcm9tIHRyeUNhdGNoXHJcbiAgICogQHBhcmFtIHsgc3RyaW5nIH0gdW5rbm93bkVyciAtIGFuIHVuY2F0Y2hlZCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZFxyXG4gICAqIEBwYXJhbSB7IHN0cmluZyB9IGtub3duRXJyIC0gYW4gY2F0Y2hlZCBzZXJ2ZXIgZXJyb3Igb2NjdXJlZFxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBib29sZWFuIH1cclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKi9cclxuICBzdGF0aWMgaHR0cFJlcyhcclxuICAgIHJlczogaUh0dHBSZXNwb25zZSxcclxuICAgIHVua25vd25FcnI6IHN0cmluZyxcclxuICAgIGtub3duRXJyOiBzdHJpbmdcclxuICApOiBib29sZWFuIHtcclxuICAgIC8vIFZBTElEQVRJT046IEhUVFAgUkVTUE9OU0VcclxuICAgIGlmICghcmVzLmRhdGEpIHtcclxuICAgICAgZXJyb3Iuc2hvd0NvbXAoYEVSUk9SOiAke3Vua25vd25FcnJ9YCwgcmVzLmVycik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChyZXMuZGF0YS5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlcy5kYXRhLnN0YXR1c0NvZGUgPj0gNDAwKSB7XHJcbiAgICAgIGVycm9yLnNob3dDb21wKGBFUlJPUjogJHtrbm93bkVycn1gLCByZXMuZXJyKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgbmV3IG9yIG9sZCBpbnN0YW5jZSBvZiB0aGlzIGZ1bmN0aW9uLlxyXG4gICAqXHJcbiAgICogQHJldHVybnMgeyBWYWxpZGF0ZSB9XHJcbiAgICovXHJcbiAgc3RhdGljIHJlYWRvbmx5IGdldEluc3RhbmNlID0gKCk6IFZhbGlkYXRlID0+IHtcclxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkgdGhpcy5pbnN0YW5jZSA9IG5ldyBWYWxpZGF0ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfTtcclxufVxyXG4iLCIvKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBldmVudCBzcGVjaWZpYyBhcnJheXMgZm9yIGV2ZW50IHR5cGVzIHRoYXQgbm9cbiAgLy8gb25lIGlzIHN1YnNjcmliZWQgZm9yIHRvIGF2b2lkIG1lbW9yeSBsZWFrLlxuICBpZiAoY2FsbGJhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtNaXhlZH0gLi4uXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSlcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgfVxuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gYWxpYXMgdXNlZCBmb3IgcmVzZXJ2ZWQgZXZlbnRzIChwcm90ZWN0ZWQgbWV0aG9kKVxuRW1pdHRlci5wcm90b3R5cGUuZW1pdFJlc2VydmVkID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9jb21wb25lbnQvaGFzLWNvcnNcbmxldCB2YWx1ZSA9IGZhbHNlO1xudHJ5IHtcbiAgICB2YWx1ZSA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG59XG5jYXRjaCAoZXJyKSB7XG4gICAgLy8gaWYgWE1MSHR0cCBzdXBwb3J0IGlzIGRpc2FibGVkIGluIElFIHRoZW4gaXQgd2lsbCB0aHJvd1xuICAgIC8vIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZVxufVxuZXhwb3J0IGNvbnN0IGhhc0NPUlMgPSB2YWx1ZTtcbiIsIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dhbGtuL3F1ZXJ5c3RyaW5nXG4vKipcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKG9iaikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyYnO1xuICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGUocXMpIHtcbiAgICBsZXQgcXJ5ID0ge307XG4gICAgbGV0IHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsZXQgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHFyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gcXJ5O1xufVxuIiwiLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2Fsa24vcGFyc2V1cmlcbi8qKlxuICogUGFyc2VzIGEgVVJJXG4gKlxuICogTm90ZTogd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgdGhlIGJ1aWx0LWluIFVSTCBvYmplY3QsIGJ1dCBpdCBpc24ndCBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3Jtcy5cbiAqXG4gKiBTZWU6XG4gKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkxcbiAqIC0gaHR0cHM6Ly9jYW5pdXNlLmNvbS91cmxcbiAqIC0gaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzM5ODYjYXBwZW5kaXgtQlxuICpcbiAqIEhpc3Rvcnkgb2YgdGhlIHBhcnNlKCkgbWV0aG9kOlxuICogLSBmaXJzdCBjb21taXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9zb2NrZXQuaW8tY2xpZW50L2NvbW1pdC80ZWUxZDVkOTRiMzkwNmE5YzA1MmI0NTlmMWE4MThiMTVmMzhmOTFjXG4gKiAtIGV4cG9ydCBpbnRvIGl0cyBvd24gbW9kdWxlOiBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vZW5naW5lLmlvLWNsaWVudC9jb21taXQvZGUyYzU2MWU0NTY0ZWZlYjc4ZjFiZGIxYmEzOWVmODFiMjgyMmNiM1xuICogLSByZWltcG9ydDogaHR0cHM6Ly9naXRodWIuY29tL3NvY2tldGlvL2VuZ2luZS5pby1jbGllbnQvY29tbWl0L2RmMzIyNzdjM2Y2ZDYyMmVlYzVlZDA5ZjQ5M2NhZTNmMzM5MWQyNDJcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuY29uc3QgcmUgPSAvXig/Oig/IVteOkBcXC8/I10rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBcXC8/I10qKSg/OjooW146QFxcLz8jXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcbmNvbnN0IHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgICBjb25zdCBzcmMgPSBzdHIsIGIgPSBzdHIuaW5kZXhPZignWycpLCBlID0gc3RyLmluZGV4T2YoJ10nKTtcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuICAgIGxldCBtID0gcmUuZXhlYyhzdHIgfHwgJycpLCB1cmkgPSB7fSwgaSA9IDE0O1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7XG4gICAgfVxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuICAgIHVyaS5wYXRoTmFtZXMgPSBwYXRoTmFtZXModXJpLCB1cmlbJ3BhdGgnXSk7XG4gICAgdXJpLnF1ZXJ5S2V5ID0gcXVlcnlLZXkodXJpLCB1cmlbJ3F1ZXJ5J10pO1xuICAgIHJldHVybiB1cmk7XG59XG5mdW5jdGlvbiBwYXRoTmFtZXMob2JqLCBwYXRoKSB7XG4gICAgY29uc3QgcmVneCA9IC9cXC97Miw5fS9nLCBuYW1lcyA9IHBhdGgucmVwbGFjZShyZWd4LCBcIi9cIikuc3BsaXQoXCIvXCIpO1xuICAgIGlmIChwYXRoLnNsaWNlKDAsIDEpID09ICcvJyB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBuYW1lcy5zcGxpY2UoMCwgMSk7XG4gICAgfVxuICAgIGlmIChwYXRoLnNsaWNlKC0xKSA9PSAnLycpIHtcbiAgICAgICAgbmFtZXMuc3BsaWNlKG5hbWVzLmxlbmd0aCAtIDEsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXM7XG59XG5mdW5jdGlvbiBxdWVyeUtleSh1cmksIHF1ZXJ5KSB7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIHF1ZXJ5LnJlcGxhY2UoLyg/Ol58JikoW14mPV0qKT0/KFteJl0qKS9nLCBmdW5jdGlvbiAoJDAsICQxLCAkMikge1xuICAgICAgICBpZiAoJDEpIHtcbiAgICAgICAgICAgIGRhdGFbJDFdID0gJDI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cbiIsIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Vuc2hpZnRpby95ZWFzdFxuJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpLCBsZW5ndGggPSA2NCwgbWFwID0ge307XG5sZXQgc2VlZCA9IDAsIGkgPSAwLCBwcmV2O1xuLyoqXG4gKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBudW0gVGhlIG51bWJlciB0byBjb252ZXJ0LlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShudW0pIHtcbiAgICBsZXQgZW5jb2RlZCA9ICcnO1xuICAgIGRvIHtcbiAgICAgICAgZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO1xuICAgICAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gICAgfSB3aGlsZSAobnVtID4gMCk7XG4gICAgcmV0dXJuIGVuY29kZWQ7XG59XG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICAgIGxldCBkZWNvZGVkID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlZDtcbn1cbi8qKlxuICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdCgpIHtcbiAgICBjb25zdCBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuICAgIGlmIChub3cgIT09IHByZXYpXG4gICAgICAgIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgICByZXR1cm4gbm93ICsgJy4nICsgZW5jb2RlKHNlZWQrKyk7XG59XG4vL1xuLy8gTWFwIGVhY2ggY2hhcmFjdGVyIHRvIGl0cyBpbmRleC5cbi8vXG5mb3IgKDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgIG1hcFthbHBoYWJldFtpXV0gPSBpO1xuIiwiZXhwb3J0IGNvbnN0IGdsb2JhbFRoaXNTaGltID0gKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG4gICAgfVxufSkoKTtcbiIsImltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuZXhwb3J0IHsgU29ja2V0IH07XG5leHBvcnQgY29uc3QgcHJvdG9jb2wgPSBTb2NrZXQucHJvdG9jb2w7XG5leHBvcnQgeyBUcmFuc3BvcnQgfSBmcm9tIFwiLi90cmFuc3BvcnQuanNcIjtcbmV4cG9ydCB7IHRyYW5zcG9ydHMgfSBmcm9tIFwiLi90cmFuc3BvcnRzL2luZGV4LmpzXCI7XG5leHBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5leHBvcnQgeyBwYXJzZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2V1cmkuanNcIjtcbmV4cG9ydCB7IG5leHRUaWNrIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy93ZWJzb2NrZXQtY29uc3RydWN0b3IuanNcIjtcbiIsImltcG9ydCB7IHRyYW5zcG9ydHMgfSBmcm9tIFwiLi90cmFuc3BvcnRzL2luZGV4LmpzXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIGJ5dGVMZW5ndGggfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBkZWNvZGUgfSBmcm9tIFwiLi9jb250cmliL3BhcnNlcXMuanNcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcIi4vY29udHJpYi9wYXJzZXVyaS5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBwcm90b2NvbCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5leHBvcnQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogU29ja2V0IGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgLSB1cmkgb3Igb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cyA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgaWYgKHVyaSAmJiBcIm9iamVjdFwiID09PSB0eXBlb2YgdXJpKSB7XG4gICAgICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICAgICAgdXJpID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJpKSB7XG4gICAgICAgICAgICB1cmkgPSBwYXJzZSh1cmkpO1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHVyaS5ob3N0O1xuICAgICAgICAgICAgb3B0cy5zZWN1cmUgPSB1cmkucHJvdG9jb2wgPT09IFwiaHR0cHNcIiB8fCB1cmkucHJvdG9jb2wgPT09IFwid3NzXCI7XG4gICAgICAgICAgICBvcHRzLnBvcnQgPSB1cmkucG9ydDtcbiAgICAgICAgICAgIGlmICh1cmkucXVlcnkpXG4gICAgICAgICAgICAgICAgb3B0cy5xdWVyeSA9IHVyaS5xdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRzLmhvc3QpIHtcbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgPSBwYXJzZShvcHRzLmhvc3QpLmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLnNlY3VyZSA9XG4gICAgICAgICAgICBudWxsICE9IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgPyBvcHRzLnNlY3VyZVxuICAgICAgICAgICAgICAgIDogdHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICBpZiAob3B0cy5ob3N0bmFtZSAmJiAhb3B0cy5wb3J0KSB7XG4gICAgICAgICAgICAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG4gICAgICAgICAgICBvcHRzLnBvcnQgPSB0aGlzLnNlY3VyZSA/IFwiNDQzXCIgOiBcIjgwXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lIHx8XG4gICAgICAgICAgICAgICAgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiA/IGxvY2F0aW9uLmhvc3RuYW1lIDogXCJsb2NhbGhvc3RcIik7XG4gICAgICAgIHRoaXMucG9ydCA9XG4gICAgICAgICAgICBvcHRzLnBvcnQgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgPyBsb2NhdGlvbi5wb3J0XG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5zZWN1cmVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCI0NDNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIjgwXCIpO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydHMgPSBvcHRzLnRyYW5zcG9ydHMgfHwgW1xuICAgICAgICAgICAgXCJwb2xsaW5nXCIsXG4gICAgICAgICAgICBcIndlYnNvY2tldFwiLFxuICAgICAgICAgICAgXCJ3ZWJ0cmFuc3BvcnRcIixcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHBhdGg6IFwiL2VuZ2luZS5pb1wiLFxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgIHVwZ3JhZGU6IHRydWUsXG4gICAgICAgICAgICB0aW1lc3RhbXBQYXJhbTogXCJ0XCIsXG4gICAgICAgICAgICByZW1lbWJlclVwZ3JhZGU6IGZhbHNlLFxuICAgICAgICAgICAgYWRkVHJhaWxpbmdTbGFzaDogdHJ1ZSxcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB7XG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiAxMDI0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogZmFsc2UsXG4gICAgICAgIH0sIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMucGF0aCA9XG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgK1xuICAgICAgICAgICAgICAgICh0aGlzLm9wdHMuYWRkVHJhaWxpbmdTbGFzaCA/IFwiL1wiIDogXCJcIik7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLnF1ZXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMucXVlcnkgPSBkZWNvZGUodGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgb24gaGFuZHNoYWtlXG4gICAgICAgIHRoaXMuaWQgPSBudWxsO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gbnVsbDtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICB0aGlzLnBpbmdUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgLy8gc2V0IG9uIGhlYXJ0YmVhdFxuICAgICAgICB0aGlzLnBpbmdUaW1lb3V0VGltZXIgPSBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5jbG9zZU9uQmVmb3JldW5sb2FkKSB7XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveCBjbG9zZXMgdGhlIGNvbm5lY3Rpb24gd2hlbiB0aGUgXCJiZWZvcmV1bmxvYWRcIiBldmVudCBpcyBlbWl0dGVkIGJ1dCBub3QgQ2hyb21lLiBUaGlzIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlcyBldmVyeSBicm93c2VyIGJlaGF2ZXMgdGhlIHNhbWUgKG5vIFwiZGlzY29ubmVjdFwiIGV2ZW50IGF0IHRoZSBTb2NrZXQuSU8gbGV2ZWwgd2hlbiB0aGUgcGFnZSBpc1xuICAgICAgICAgICAgICAgIC8vIGNsb3NlZC9yZWxvYWRlZClcbiAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2lsZW50bHkgY2xvc2UgdGhlIHRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMuYmVmb3JldW5sb2FkRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaG9zdG5hbWUgIT09IFwibG9jYWxob3N0XCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibmV0d29yayBjb25uZWN0aW9uIGxvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0cmFuc3BvcnQgbmFtZVxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IHByb3RvY29sO1xuICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLCB7XG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgIHNvY2tldDogdGhpcyxcbiAgICAgICAgICAgIGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lLFxuICAgICAgICAgICAgc2VjdXJlOiB0aGlzLnNlY3VyZSxcbiAgICAgICAgICAgIHBvcnQ6IHRoaXMucG9ydCxcbiAgICAgICAgfSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IHRyYW5zcG9ydHNbbmFtZV0ob3B0cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gXCJ3ZWJzb2NrZXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIFwiTm8gdHJhbnNwb3J0cyBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCB1cCB0cmFuc3BvcnRcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gICAgICAgIC8vIHNldCB1cCB0cmFuc3BvcnQgbGlzdGVuZXJzXG4gICAgICAgIHRyYW5zcG9ydFxuICAgICAgICAgICAgLm9uKFwiZHJhaW5cIiwgdGhpcy5vbkRyYWluLmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oXCJwYWNrZXRcIiwgdGhpcy5vblBhY2tldC5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgdGhpcy5vbkVycm9yLmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAocmVhc29uKSA9PiB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIiwgcmVhc29uKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2JlcyBhIHRyYW5zcG9ydC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdHJhbnNwb3J0IG5hbWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb2JlKG5hbWUpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUpO1xuICAgICAgICBsZXQgZmFpbGVkID0gZmFsc2U7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgb25UcmFuc3BvcnRPcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInBpbmdcIiwgZGF0YTogXCJwcm9iZVwiIH1dKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5vbmNlKFwicGFja2V0XCIsIChtc2cpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXCJwcm9iZSBlcnJvcjogXCIgKyBlcnIpO1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgZXJyb3IudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwidXBncmFkZUVycm9yXCIsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gb25UcmFuc3BvcnRDbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJ0cmFuc3BvcnQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgICAgICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgICAgICAgICAgb25lcnJvcihcInNvY2tldCBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb251cGdyYWRlKHRvKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNwb3J0ICYmIHRvLm5hbWUgIT09IHRyYW5zcG9ydC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gdGhlIHRyYW5zcG9ydCBhbmQgb24gc2VsZlxuICAgICAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4ge1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwib3BlblwiLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoXCJjbG9zZVwiLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwiY2xvc2VcIiwgb25jbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGluZ1wiLCBvbnVwZ3JhZGUpO1xuICAgICAgICB9O1xuICAgICAgICB0cmFuc3BvcnQub25jZShcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJlcnJvclwiLCBvbmVycm9yKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJjbG9zZVwiLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICAgICAgdGhpcy5vbmNlKFwiY2xvc2VcIiwgb25jbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcInVwZ3JhZGluZ1wiLCBvbnVwZ3JhZGUpO1xuICAgICAgICBpZiAodGhpcy51cGdyYWRlcy5pbmRleE9mKFwid2VidHJhbnNwb3J0XCIpICE9PSAtMSAmJlxuICAgICAgICAgICAgbmFtZSAhPT0gXCJ3ZWJ0cmFuc3BvcnRcIikge1xuICAgICAgICAgICAgLy8gZmF2b3IgV2ViVHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFmYWlsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gXCJ3ZWJzb2NrZXRcIiA9PT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbiAgICAgICAgLy8gbGlzdGVuZXIgYWxyZWFkeSBjbG9zZWQgdGhlIHNvY2tldFxuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLm9wdHMudXBncmFkZSkge1xuICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMudXBncmFkZXMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2JlKHRoaXMudXBncmFkZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uUGFja2V0KHBhY2tldCkge1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJjbG9zaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwYWNrZXRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgIC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGVhcnRiZWF0XCIpO1xuICAgICAgICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvcGVuXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25IYW5kc2hha2UoSlNPTi5wYXJzZShwYWNrZXQuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UGluZ1RpbWVvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXCJzZXJ2ZXIgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtZXNzYWdlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZGF0YVwiLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwibWVzc2FnZVwiLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGhhbmRzaGFrZSBjb21wbGV0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBoYW5kc2hha2Ugb2JqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkhhbmRzaGFrZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGFuZHNoYWtlXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMubWF4UGF5bG9hZCA9IGRhdGEubWF4UGF5bG9hZDtcbiAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlc2V0UGluZ1RpbWVvdXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhbmQgcmVzZXRzIHBpbmcgdGltZW91dCB0aW1lciBiYXNlZCBvbiBzZXJ2ZXIgcGluZ3MuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlc2V0UGluZ1RpbWVvdXQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dFRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwicGluZyB0aW1lb3V0XCIpO1xuICAgICAgICB9LCB0aGlzLnBpbmdJbnRlcnZhbCArIHRoaXMucGluZ1RpbWVvdXQpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgdGhpcy5waW5nVGltZW91dFRpbWVyLnVucmVmKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIG9uIGBkcmFpbmAgZXZlbnRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25EcmFpbigpIHtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5wcmV2QnVmZmVyTGVuKTtcbiAgICAgICAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgICAgICAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgICAgICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcbiAgICAgICAgaWYgKDAgPT09IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICAgICAgICAgIXRoaXMudXBncmFkaW5nICYmXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0cyA9IHRoaXMuZ2V0V3JpdGFibGVQYWNrZXRzKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHBhY2tldHMpO1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSBwYWNrZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZmx1c2hcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBlbmNvZGVkIHNpemUgb2YgdGhlIHdyaXRlQnVmZmVyIGlzIGJlbG93IHRoZSBtYXhQYXlsb2FkIHZhbHVlIHNlbnQgYnkgdGhlIHNlcnZlciAob25seSBmb3IgSFRUUFxuICAgICAqIGxvbmctcG9sbGluZylcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0V3JpdGFibGVQYWNrZXRzKCkge1xuICAgICAgICBjb25zdCBzaG91bGRDaGVja1BheWxvYWRTaXplID0gdGhpcy5tYXhQYXlsb2FkICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5uYW1lID09PSBcInBvbGxpbmdcIiAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGggPiAxO1xuICAgICAgICBpZiAoIXNob3VsZENoZWNrUGF5bG9hZFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXlsb2FkU2l6ZSA9IDE7IC8vIGZpcnN0IHBhY2tldCB0eXBlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMud3JpdGVCdWZmZXJbaV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gYnl0ZUxlbmd0aChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCAmJiBwYXlsb2FkU2l6ZSA+IHRoaXMubWF4UGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gMjsgLy8gc2VwYXJhdG9yICsgcGFja2V0IHR5cGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53cml0ZUJ1ZmZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyAtIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgd3JpdGUobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJtZXNzYWdlXCIsIG1zZywgb3B0aW9ucywgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2VuZChtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VuZFBhY2tldChcIm1lc3NhZ2VcIiwgbXNnLCBvcHRpb25zLCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlOiBwYWNrZXQgdHlwZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2VuZFBhY2tldCh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZGF0YSkge1xuICAgICAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgZm4gPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldENyZWF0ZVwiLCBwYWNrZXQpO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgaWYgKGZuKVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwiZmx1c2hcIiwgZm4pO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoXCJmb3JjZWQgY2xvc2VcIik7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjbGVhbnVwQW5kQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCB3YWl0Rm9yVXBncmFkZSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRlRXJyb3JcIiwgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zaW5nXCI7XG4gICAgICAgICAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoXCJkcmFpblwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkVycm9yKGVycikge1xuICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGVycm9yXCIsIGVycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBjbG9zZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25DbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBjbGVhciB0aW1lcnNcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCB0aGlzLmJlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXQgcmVhZHkgc3RhdGVcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICAvLyBjbGVhciBzZXNzaW9uIGlkXG4gICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGVtaXQgY2xvc2UgZXZlbnRcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY2xvc2VcIiwgcmVhc29uLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbiAgICAgICAgICAgIC8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGaWx0ZXJzIHVwZ3JhZGVzLCByZXR1cm5pbmcgb25seSB0aG9zZSBtYXRjaGluZyBjbGllbnQgdHJhbnNwb3J0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHVwZ3JhZGVzIC0gc2VydmVyIHVwZ3JhZGVzXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBmaWx0ZXJVcGdyYWRlcyh1cGdyYWRlcykge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgY29uc3QgaiA9IHVwZ3JhZGVzLmxlbmd0aDtcbiAgICAgICAgZm9yICg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh+dGhpcy50cmFuc3BvcnRzLmluZGV4T2YodXBncmFkZXNbaV0pKVxuICAgICAgICAgICAgICAgIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG4gICAgfVxufVxuU29ja2V0LnByb3RvY29sID0gcHJvdG9jb2w7XG4iLCJpbXBvcnQgeyBkZWNvZGVQYWNrZXQgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5pbXBvcnQgeyBlbmNvZGUgfSBmcm9tIFwiLi9jb250cmliL3BhcnNlcXMuanNcIjtcbmNsYXNzIFRyYW5zcG9ydEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocmVhc29uKTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnR5cGUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgZXJyb3IgY29udGV4dFxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRXJyb3IocmVhc29uLCBkZXNjcmlwdGlvbiwgY29udGV4dCkge1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBuZXcgVHJhbnNwb3J0RXJyb3IocmVhc29uLCBkZXNjcmlwdGlvbiwgY29udGV4dCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgdGhpcy5kb09wZW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBcIm9wZW5pbmdcIiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICB0aGlzLmRvQ2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBtdWx0aXBsZSBwYWNrZXRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICAgICAqL1xuICAgIHNlbmQocGFja2V0cykge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgaGFwcGVuIGlmIHRoZSB0cmFuc3BvcnQgd2FzIHNpbGVudGx5IGNsb3NlZCBpbiB0aGUgYmVmb3JldW5sb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBvcGVuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25PcGVuKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkRhdGEoZGF0YSkge1xuICAgICAgICBjb25zdCBwYWNrZXQgPSBkZWNvZGVQYWNrZXQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSk7XG4gICAgICAgIHRoaXMub25QYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvblBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uQ2xvc2UoZGV0YWlscykge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCBkZXRhaWxzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGF1c2VzIHRoZSB0cmFuc3BvcnQsIGluIG9yZGVyIG5vdCB0byBsb3NlIHBhY2tldHMgZHVyaW5nIGFuIHVwZ3JhZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gb25QYXVzZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHsgfVxuICAgIGNyZWF0ZVVyaShzY2hlbWEsIHF1ZXJ5ID0ge30pIHtcbiAgICAgICAgcmV0dXJuIChzY2hlbWEgK1xuICAgICAgICAgICAgXCI6Ly9cIiArXG4gICAgICAgICAgICB0aGlzLl9ob3N0bmFtZSgpICtcbiAgICAgICAgICAgIHRoaXMuX3BvcnQoKSArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICB0aGlzLl9xdWVyeShxdWVyeSkpO1xuICAgIH1cbiAgICBfaG9zdG5hbWUoKSB7XG4gICAgICAgIGNvbnN0IGhvc3RuYW1lID0gdGhpcy5vcHRzLmhvc3RuYW1lO1xuICAgICAgICByZXR1cm4gaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgPT09IC0xID8gaG9zdG5hbWUgOiBcIltcIiArIGhvc3RuYW1lICsgXCJdXCI7XG4gICAgfVxuICAgIF9wb3J0KCkge1xuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgodGhpcy5vcHRzLnNlY3VyZSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQgIT09IDQ0MykpIHx8XG4gICAgICAgICAgICAgICAgKCF0aGlzLm9wdHMuc2VjdXJlICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3F1ZXJ5KHF1ZXJ5KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIHJldHVybiBlbmNvZGVkUXVlcnkubGVuZ3RoID8gXCI/XCIgKyBlbmNvZGVkUXVlcnkgOiBcIlwiO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFBvbGxpbmcgfSBmcm9tIFwiLi9wb2xsaW5nLmpzXCI7XG5pbXBvcnQgeyBXUyB9IGZyb20gXCIuL3dlYnNvY2tldC5qc1wiO1xuaW1wb3J0IHsgV1QgfSBmcm9tIFwiLi93ZWJ0cmFuc3BvcnQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgd2VidHJhbnNwb3J0OiBXVCxcbiAgICBwb2xsaW5nOiBQb2xsaW5nLFxufTtcbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IHllYXN0IH0gZnJvbSBcIi4uL2NvbnRyaWIveWVhc3QuanNcIjtcbmltcG9ydCB7IGVuY29kZVBheWxvYWQsIGRlY29kZVBheWxvYWQgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgY3JlYXRlQ29va2llSmFyLCBYSFIgYXMgWE1MSHR0cFJlcXVlc3QsIH0gZnJvbSBcIi4veG1saHR0cHJlcXVlc3QuanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuaW1wb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zLCBwaWNrIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi4vZ2xvYmFsVGhpcy5qc1wiO1xuZnVuY3Rpb24gZW1wdHkoKSB7IH1cbmNvbnN0IGhhc1hIUjIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCh7XG4gICAgICAgIHhkb21haW46IGZhbHNlLFxuICAgIH0pO1xuICAgIHJldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7XG59KSgpO1xuZXhwb3J0IGNsYXNzIFBvbGxpbmcgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAgIC8qKlxuICAgICAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKiBAcGFja2FnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25zdCBpc1NTTCA9IFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgbGV0IHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuICAgICAgICAgICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgICAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICAgICAgcG9ydCA9IGlzU1NMID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMueGQgPVxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUpIHx8XG4gICAgICAgICAgICAgICAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogWEhSIHN1cHBvcnRzIGJpbmFyeVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc3QgZm9yY2VCYXNlNjQgPSBvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQ7XG4gICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBoYXNYSFIyICYmICFmb3JjZUJhc2U2NDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29va2llSmFyID0gY3JlYXRlQ29va2llSmFyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcInBvbGxpbmdcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxuICAgICAqIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBvcGVuLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGRvT3BlbigpIHtcbiAgICAgICAgdGhpcy5wb2xsKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhdXNlcyBwb2xsaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25QYXVzZSAtIGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBwYWNrYWdlXG4gICAgICovXG4gICAgcGF1c2Uob25QYXVzZSkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcInBhdXNpbmdcIjtcbiAgICAgICAgY29uc3QgcGF1c2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcInBhdXNlZFwiO1xuICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5wb2xsaW5nIHx8ICF0aGlzLndyaXRhYmxlKSB7XG4gICAgICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMucG9sbGluZykge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwicG9sbENvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLndyaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgdG90YWwrKztcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoXCJkcmFpblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBvbGwoKSB7XG4gICAgICAgIHRoaXMucG9sbGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZG9Qb2xsKCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9sbFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcmxvYWRzIG9uRGF0YSB0byBkZXRlY3QgcGF5bG9hZHMuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAocGFja2V0KSA9PiB7XG4gICAgICAgICAgICAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG4gICAgICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSAmJiBwYWNrZXQudHlwZSA9PT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgaXRzIGEgY2xvc2UgcGFja2V0LCB3ZSBjbG9zZSB0aGUgb25nb2luZyByZXF1ZXN0c1xuICAgICAgICAgICAgaWYgKFwiY2xvc2VcIiA9PT0gcGFja2V0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoeyBkZXNjcmlwdGlvbjogXCJ0cmFuc3BvcnQgY2xvc2VkIGJ5IHRoZSBzZXJ2ZXJcIiB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgYnlwYXNzIG9uRGF0YSBhbmQgaGFuZGxlIHRoZSBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGRlY29kZSBwYXlsb2FkXG4gICAgICAgIGRlY29kZVBheWxvYWQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSkuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIC8vIGlmIGFuIGV2ZW50IGRpZCBub3QgdHJpZ2dlciBjbG9zaW5nXG4gICAgICAgIGlmIChcImNsb3NlZFwiICE9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG4gICAgICAgICAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9sbENvbXBsZXRlXCIpO1xuICAgICAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZShbeyB0eXBlOiBcImNsb3NlXCIgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgICAgICAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwib3BlblwiLCBjbG9zZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFja2V0cyAtIGRhdGEgcGFja2V0c1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgZW5jb2RlUGF5bG9hZChwYWNrZXRzLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb1dyaXRlKGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcImh0dHBzXCIgOiBcImh0dHBcIjtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICAgICAgICAvLyBjYWNoZSBidXN0aW5nIGlzIGZvcmNlZFxuICAgICAgICBpZiAoZmFsc2UgIT09IHRoaXMub3B0cy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgICAgICAgICAgcXVlcnlbdGhpcy5vcHRzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmI2NCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJpKHNjaGVtYSwgcXVlcnkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlcXVlc3Qob3B0cyA9IHt9KSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24ob3B0cywgeyB4ZDogdGhpcy54ZCwgY29va2llSmFyOiB0aGlzLmNvb2tpZUphciB9LCB0aGlzLm9wdHMpO1xuICAgICAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcy51cmkoKSwgb3B0cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZG9Xcml0ZShkYXRhLCBmbikge1xuICAgICAgICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oXCJzdWNjZXNzXCIsIGZuKTtcbiAgICAgICAgcmVxLm9uKFwiZXJyb3JcIiwgKHhoclN0YXR1cywgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwieGhyIHBvc3QgZXJyb3JcIiwgeGhyU3RhdHVzLCBjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsICh4aHJTdGF0dXMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcInhociBwb2xsIGVycm9yXCIsIHhoclN0YXR1cywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBvbGxYaHIgPSByZXE7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYWNrYWdlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCBcIkdFVFwiO1xuICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICAgICAgICB0aGlzLmNyZWF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBwaWNrKHRoaXMub3B0cywgXCJhZ2VudFwiLCBcInBmeFwiLCBcImtleVwiLCBcInBhc3NwaHJhc2VcIiwgXCJjZXJ0XCIsIFwiY2FcIiwgXCJjaXBoZXJzXCIsIFwicmVqZWN0VW5hdXRob3JpemVkXCIsIFwiYXV0b1VucmVmXCIpO1xuICAgICAgICBvcHRzLnhkb21haW4gPSAhIXRoaXMub3B0cy54ZDtcbiAgICAgICAgY29uc3QgeGhyID0gKHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdHJ1ZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMub3B0cy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgaWYgKFwiUE9TVFwiID09PSB0aGlzLm1ldGhvZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiKi8qXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgKF9hID0gdGhpcy5vcHRzLmNvb2tpZUphcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmFkZENvb2tpZXMoeGhyKTtcbiAgICAgICAgICAgIC8vIGllNiBjaGVja1xuICAgICAgICAgICAgaWYgKFwid2l0aENyZWRlbnRpYWxzXCIgaW4geGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRoaXMub3B0cy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLnJlcXVlc3RUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLm9wdHMucmVxdWVzdFRpbWVvdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gdGhpcy5vcHRzLmNvb2tpZUphcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcnNlQ29va2llcyh4aHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoNCAhPT0geGhyLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcih0eXBlb2YgeGhyLnN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHhoci5zdGF0dXMgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgICAgICAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25FcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIsIHRoaXMueGhyKTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbnMgdXAgaG91c2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNsZWFudXAoZnJvbUVycm9yKSB7XG4gICAgICAgIGlmIChcInVuZGVmaW5lZFwiID09PSB0eXBlb2YgdGhpcy54aHIgfHwgbnVsbCA9PT0gdGhpcy54aHIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcbiAgICAgICAgaWYgKGZyb21FcnJvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gbG9hZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhY2thZ2VcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi4vZ2xvYmFsVGhpcy5qc1wiO1xuZXhwb3J0IGNvbnN0IG5leHRUaWNrID0gKCgpID0+IHtcbiAgICBjb25zdCBpc1Byb21pc2VBdmFpbGFibGUgPSB0eXBlb2YgUHJvbWlzZSA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBQcm9taXNlLnJlc29sdmUgPT09IFwiZnVuY3Rpb25cIjtcbiAgICBpZiAoaXNQcm9taXNlQXZhaWxhYmxlKSB7XG4gICAgICAgIHJldHVybiAoY2IpID0+IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oY2IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIChjYiwgc2V0VGltZW91dEZuKSA9PiBzZXRUaW1lb3V0Rm4oY2IsIDApO1xuICAgIH1cbn0pKCk7XG5leHBvcnQgY29uc3QgV2ViU29ja2V0ID0gZ2xvYmFsVGhpcy5XZWJTb2NrZXQgfHwgZ2xvYmFsVGhpcy5Nb3pXZWJTb2NrZXQ7XG5leHBvcnQgY29uc3QgdXNpbmdCcm93c2VyV2ViU29ja2V0ID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBkZWZhdWx0QmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IHllYXN0IH0gZnJvbSBcIi4uL2NvbnRyaWIveWVhc3QuanNcIjtcbmltcG9ydCB7IHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZGVmYXVsdEJpbmFyeVR5cGUsIG5leHRUaWNrLCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQsIFdlYlNvY2tldCwgfSBmcm9tIFwiLi93ZWJzb2NrZXQtY29uc3RydWN0b3IuanNcIjtcbmltcG9ydCB7IGVuY29kZVBhY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG4vLyBkZXRlY3QgUmVhY3ROYXRpdmUgZW52aXJvbm1lbnRcbmNvbnN0IGlzUmVhY3ROYXRpdmUgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgdHlwZW9mIG5hdmlnYXRvci5wcm9kdWN0ID09PSBcInN0cmluZ1wiICYmXG4gICAgbmF2aWdhdG9yLnByb2R1Y3QudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWFjdG5hdGl2ZVwiO1xuZXhwb3J0IGNsYXNzIFdTIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICAvKipcbiAgICAgKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBjb25uZWN0aW9uIG9wdGlvbnNcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9ICFvcHRzLmZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwid2Vic29ja2V0XCI7XG4gICAgfVxuICAgIGRvT3BlbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrKCkpIHtcbiAgICAgICAgICAgIC8vIGxldCBwcm9iZSB0aW1lb3V0XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy51cmkoKTtcbiAgICAgICAgY29uc3QgcHJvdG9jb2xzID0gdGhpcy5vcHRzLnByb3RvY29scztcbiAgICAgICAgLy8gUmVhY3QgTmF0aXZlIG9ubHkgc3VwcG9ydHMgdGhlICdoZWFkZXJzJyBvcHRpb24sIGFuZCB3aWxsIHByaW50IGEgd2FybmluZyBpZiBhbnl0aGluZyBlbHNlIGlzIHBhc3NlZFxuICAgICAgICBjb25zdCBvcHRzID0gaXNSZWFjdE5hdGl2ZVxuICAgICAgICAgICAgPyB7fVxuICAgICAgICAgICAgOiBwaWNrKHRoaXMub3B0cywgXCJhZ2VudFwiLCBcInBlck1lc3NhZ2VEZWZsYXRlXCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJsb2NhbEFkZHJlc3NcIiwgXCJwcm90b2NvbFZlcnNpb25cIiwgXCJvcmlnaW5cIiwgXCJtYXhQYXlsb2FkXCIsIFwiZmFtaWx5XCIsIFwiY2hlY2tTZXJ2ZXJJZGVudGl0eVwiKTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IHRoaXMub3B0cy5leHRyYUhlYWRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud3MgPVxuICAgICAgICAgICAgICAgIHVzaW5nQnJvd3NlcldlYlNvY2tldCAmJiAhaXNSZWFjdE5hdGl2ZVxuICAgICAgICAgICAgICAgICAgICA/IHByb3RvY29sc1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBuZXcgV2ViU29ja2V0KHVyaSlcbiAgICAgICAgICAgICAgICAgICAgOiBuZXcgV2ViU29ja2V0KHVyaSwgcHJvdG9jb2xzLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9IHRoaXMuc29ja2V0LmJpbmFyeVR5cGUgfHwgZGVmYXVsdEJpbmFyeVR5cGU7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRoaXMud3MuX3NvY2tldC51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gKGNsb3NlRXZlbnQpID0+IHRoaXMub25DbG9zZSh7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ3ZWJzb2NrZXQgY29ubmVjdGlvbiBjbG9zZWRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IGNsb3NlRXZlbnQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IChldikgPT4gdGhpcy5vbkRhdGEoZXYuZGF0YSk7XG4gICAgICAgIHRoaXMud3Mub25lcnJvciA9IChlKSA9PiB0aGlzLm9uRXJyb3IoXCJ3ZWJzb2NrZXQgZXJyb3JcIiwgZSk7XG4gICAgfVxuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAgICAgICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCB0aGlzLnN1cHBvcnRzQmluYXJ5LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGFsd2F5cyBjcmVhdGUgYSBuZXcgb2JqZWN0IChHSC00MzcpXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0cyA9IHt9O1xuICAgICAgICAgICAgICAgIGlmICghdXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWNrZXQub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IHBhY2tldC5vcHRpb25zLmNvbXByZXNzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGRhdGEgPyBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8IHRoaXMub3B0cy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAgICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAgICAgICAgIC8vIHRocm93IGFuIGVycm9yXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBmYWtlIGRyYWluXG4gICAgICAgICAgICAgICAgICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLndzLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLndzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIC8vIGFwcGVuZCB0aW1lc3RhbXAgdG8gVVJJXG4gICAgICAgIGlmICh0aGlzLm9wdHMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICAgICAgICAgIHF1ZXJ5W3RoaXMub3B0cy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbW11bmljYXRlIGJpbmFyeSBzdXBwb3J0IGNhcGFiaWxpdGllc1xuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmI2NCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJpKHNjaGVtYSwgcXVlcnkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciB0aGlzIHRyYW5zcG9ydCBpcyBhdmFpbGFibGUuXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjaGVjaygpIHtcbiAgICAgICAgcmV0dXJuICEhV2ViU29ja2V0O1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IG5leHRUaWNrIH0gZnJvbSBcIi4vd2Vic29ja2V0LWNvbnN0cnVjdG9yLmpzXCI7XG5pbXBvcnQgeyBlbmNvZGVQYWNrZXRUb0JpbmFyeSwgZGVjb2RlUGFja2V0RnJvbUJpbmFyeSwgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuZnVuY3Rpb24gc2hvdWxkSW5jbHVkZUJpbmFyeUhlYWRlcihwYWNrZXQsIGVuY29kZWQpIHtcbiAgICAvLyA0OCA9PT0gXCIwXCIuY2hhckNvZGVBdCgwKSAoT1BFTiBwYWNrZXQgdHlwZSlcbiAgICAvLyA1NCA9PT0gXCI2XCIuY2hhckNvZGVBdCgwKSAoTk9PUCBwYWNrZXQgdHlwZSlcbiAgICByZXR1cm4gKHBhY2tldC50eXBlID09PSBcIm1lc3NhZ2VcIiAmJlxuICAgICAgICB0eXBlb2YgcGFja2V0LmRhdGEgIT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgZW5jb2RlZFswXSA+PSA0OCAmJlxuICAgICAgICBlbmNvZGVkWzBdIDw9IDU0KTtcbn1cbmV4cG9ydCBjbGFzcyBXVCBleHRlbmRzIFRyYW5zcG9ydCB7XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIndlYnRyYW5zcG9ydFwiO1xuICAgIH1cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKHR5cGVvZiBXZWJUcmFuc3BvcnQgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSBuZXcgV2ViVHJhbnNwb3J0KHRoaXMuY3JlYXRlVXJpKFwiaHR0cHNcIiksIHRoaXMub3B0cy50cmFuc3BvcnRPcHRpb25zW3RoaXMubmFtZV0pO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZWRcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcIndlYnRyYW5zcG9ydCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbm90ZTogd2UgY291bGQgaGF2ZSB1c2VkIGFzeW5jL2F3YWl0LCBidXQgdGhhdCB3b3VsZCByZXF1aXJlIHNvbWUgYWRkaXRpb25hbCBwb2x5ZmlsbHNcbiAgICAgICAgdGhpcy50cmFuc3BvcnQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jcmVhdGVCaWRpcmVjdGlvbmFsU3RyZWFtKCkudGhlbigoc3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLnJlYWRhYmxlLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVyID0gc3RyZWFtLndyaXRhYmxlLmdldFdyaXRlcigpO1xuICAgICAgICAgICAgICAgIGxldCBiaW5hcnlGbGFnO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlYWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHsgZG9uZSwgdmFsdWUgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJpbmFyeUZsYWcgJiYgdmFsdWUuYnl0ZUxlbmd0aCA9PT0gMSAmJiB2YWx1ZVswXSA9PT0gNTQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnlGbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gZXhwb3NlIGJpbmFyeXR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUGFja2V0KGRlY29kZVBhY2tldEZyb21CaW5hcnkodmFsdWUsIGJpbmFyeUZsYWcsIFwiYXJyYXlidWZmZXJcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeUZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVhZCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRzaGFrZSA9IHRoaXMucXVlcnkuc2lkID8gYDB7XCJzaWRcIjpcIiR7dGhpcy5xdWVyeS5zaWR9XCJ9YCA6IFwiMFwiO1xuICAgICAgICAgICAgICAgIHRoaXMud3JpdGVyXG4gICAgICAgICAgICAgICAgICAgIC53cml0ZShuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoaGFuZHNoYWtlKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5vbk9wZW4oKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IHBhY2tldHNbaV07XG4gICAgICAgICAgICBjb25zdCBsYXN0UGFja2V0ID0gaSA9PT0gcGFja2V0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZW5jb2RlUGFja2V0VG9CaW5hcnkocGFja2V0LCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaG91bGRJbmNsdWRlQmluYXJ5SGVhZGVyKHBhY2tldCwgZGF0YSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0ZXIud3JpdGUoVWludDhBcnJheS5vZig1NCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLndyaXRlci53cml0ZShkYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RQYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMudHJhbnNwb3J0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xvc2UoKTtcbiAgICB9XG59XG4iLCIvLyBicm93c2VyIHNoaW0gZm9yIHhtbGh0dHByZXF1ZXN0IG1vZHVsZVxuaW1wb3J0IHsgaGFzQ09SUyB9IGZyb20gXCIuLi9jb250cmliL2hhcy1jb3JzLmpzXCI7XG5pbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4uL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBYSFIob3B0cykge1xuICAgIGNvbnN0IHhkb21haW4gPSBvcHRzLnhkb21haW47XG4gICAgLy8gWE1MSHR0cFJlcXVlc3QgY2FuIGJlIGRpc2FibGVkIG9uIElFXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkgeyB9XG4gICAgaWYgKCF4ZG9tYWluKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGdsb2JhbFRoaXNbW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKV0oXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvb2tpZUphcigpIHsgfVxuIiwiaW1wb3J0IHsgZ2xvYmFsVGhpc1NoaW0gYXMgZ2xvYmFsVGhpcyB9IGZyb20gXCIuL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBmdW5jdGlvbiBwaWNrKG9iaiwgLi4uYXR0cikge1xuICAgIHJldHVybiBhdHRyLnJlZHVjZSgoYWNjLCBrKSA9PiB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIGFjY1trXSA9IG9ialtrXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn1cbi8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHJlYWwgdGltZW91dCBmdW5jdGlvbnMgc28gdGhleSBjYW4gYmUgdXNlZCB3aGVuIG92ZXJyaWRkZW5cbmNvbnN0IE5BVElWRV9TRVRfVElNRU9VVCA9IGdsb2JhbFRoaXMuc2V0VGltZW91dDtcbmNvbnN0IE5BVElWRV9DTEVBUl9USU1FT1VUID0gZ2xvYmFsVGhpcy5jbGVhclRpbWVvdXQ7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbFRpbWVyRnVuY3Rpb25zKG9iaiwgb3B0cykge1xuICAgIGlmIChvcHRzLnVzZU5hdGl2ZVRpbWVycykge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gTkFUSVZFX1NFVF9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gZ2xvYmFsVGhpcy5zZXRUaW1lb3V0LmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IGdsb2JhbFRoaXMuY2xlYXJUaW1lb3V0LmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxufVxuLy8gYmFzZTY0IGVuY29kZWQgYnVmZmVycyBhcmUgYWJvdXQgMzMlIGJpZ2dlciAoaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0KVxuY29uc3QgQkFTRTY0X09WRVJIRUFEID0gMS4zMztcbi8vIHdlIGNvdWxkIGFsc28gaGF2ZSB1c2VkIGBuZXcgQmxvYihbb2JqXSkuc2l6ZWAsIGJ1dCBpdCBpc24ndCBzdXBwb3J0ZWQgaW4gSUU5XG5leHBvcnQgZnVuY3Rpb24gYnl0ZUxlbmd0aChvYmopIHtcbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gdXRmOExlbmd0aChvYmopO1xuICAgIH1cbiAgICAvLyBhcnJheWJ1ZmZlciBvciBibG9iXG4gICAgcmV0dXJuIE1hdGguY2VpbCgob2JqLmJ5dGVMZW5ndGggfHwgb2JqLnNpemUpICogQkFTRTY0X09WRVJIRUFEKTtcbn1cbmZ1bmN0aW9uIHV0ZjhMZW5ndGgoc3RyKSB7XG4gICAgbGV0IGMgPSAwLCBsZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHhkODAwIHx8IGMgPj0gMHhlMDAwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGxlbmd0aCArPSA0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGg7XG59XG4iLCJjb25zdCBQQUNLRVRfVFlQRVMgPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBubyBNYXAgPSBubyBwb2x5ZmlsbFxuUEFDS0VUX1RZUEVTW1wib3BlblwiXSA9IFwiMFwiO1xuUEFDS0VUX1RZUEVTW1wiY2xvc2VcIl0gPSBcIjFcIjtcblBBQ0tFVF9UWVBFU1tcInBpbmdcIl0gPSBcIjJcIjtcblBBQ0tFVF9UWVBFU1tcInBvbmdcIl0gPSBcIjNcIjtcblBBQ0tFVF9UWVBFU1tcIm1lc3NhZ2VcIl0gPSBcIjRcIjtcblBBQ0tFVF9UWVBFU1tcInVwZ3JhZGVcIl0gPSBcIjVcIjtcblBBQ0tFVF9UWVBFU1tcIm5vb3BcIl0gPSBcIjZcIjtcbmNvbnN0IFBBQ0tFVF9UWVBFU19SRVZFUlNFID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbk9iamVjdC5rZXlzKFBBQ0tFVF9UWVBFUykuZm9yRWFjaChrZXkgPT4ge1xuICAgIFBBQ0tFVF9UWVBFU19SRVZFUlNFW1BBQ0tFVF9UWVBFU1trZXldXSA9IGtleTtcbn0pO1xuY29uc3QgRVJST1JfUEFDS0VUID0geyB0eXBlOiBcImVycm9yXCIsIGRhdGE6IFwicGFyc2VyIGVycm9yXCIgfTtcbmV4cG9ydCB7IFBBQ0tFVF9UWVBFUywgUEFDS0VUX1RZUEVTX1JFVkVSU0UsIEVSUk9SX1BBQ0tFVCB9O1xuIiwiLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vYmFzZTY0LWFycmF5YnVmZmVyXG5jb25zdCBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcbi8vIFVzZSBhIGxvb2t1cCB0YWJsZSB0byBmaW5kIHRoZSBpbmRleC5cbmNvbnN0IGxvb2t1cCA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IFtdIDogbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbmZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xufVxuZXhwb3J0IGNvbnN0IGVuY29kZSA9IChhcnJheWJ1ZmZlcikgPT4ge1xuICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSwgaSwgbGVuID0gYnl0ZXMubGVuZ3RoLCBiYXNlNjQgPSAnJztcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDMpIHtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2ldID4+IDJdO1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpXSAmIDMpIDw8IDQpIHwgKGJ5dGVzW2kgKyAxXSA+PiA0KV07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdO1xuICAgIH1cbiAgICBpZiAobGVuICUgMyA9PT0gMikge1xuICAgICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArICc9JztcbiAgICB9XG4gICAgZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAyKSArICc9PSc7XG4gICAgfVxuICAgIHJldHVybiBiYXNlNjQ7XG59O1xuZXhwb3J0IGNvbnN0IGRlY29kZSA9IChiYXNlNjQpID0+IHtcbiAgICBsZXQgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsIGxlbiA9IGJhc2U2NC5sZW5ndGgsIGksIHAgPSAwLCBlbmNvZGVkMSwgZW5jb2RlZDIsIGVuY29kZWQzLCBlbmNvZGVkNDtcbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gJz0nKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAyXSA9PT0gJz0nKSB7XG4gICAgICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgICBlbmNvZGVkMiA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMildO1xuICAgICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMyldO1xuICAgICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMiAmIDE1KSA8PCA0KSB8IChlbmNvZGVkMyA+PiAyKTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IChlbmNvZGVkNCAmIDYzKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5YnVmZmVyO1xufTtcbiIsImltcG9ydCB7IEVSUk9SX1BBQ0tFVCwgUEFDS0VUX1RZUEVTX1JFVkVSU0UgfSBmcm9tIFwiLi9jb21tb25zLmpzXCI7XG5pbXBvcnQgeyBkZWNvZGUgfSBmcm9tIFwiLi9jb250cmliL2Jhc2U2NC1hcnJheWJ1ZmZlci5qc1wiO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5leHBvcnQgY29uc3QgZGVjb2RlUGFja2V0ID0gKGVuY29kZWRQYWNrZXQsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAodHlwZW9mIGVuY29kZWRQYWNrZXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgZGF0YTogbWFwQmluYXJ5KGVuY29kZWRQYWNrZXQsIGJpbmFyeVR5cGUpXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHR5cGUgPSBlbmNvZGVkUGFja2V0LmNoYXJBdCgwKTtcbiAgICBpZiAodHlwZSA9PT0gXCJiXCIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgZGF0YTogZGVjb2RlQmFzZTY0UGFja2V0KGVuY29kZWRQYWNrZXQuc3Vic3RyaW5nKDEpLCBiaW5hcnlUeXBlKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBwYWNrZXRUeXBlID0gUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV07XG4gICAgaWYgKCFwYWNrZXRUeXBlKSB7XG4gICAgICAgIHJldHVybiBFUlJPUl9QQUNLRVQ7XG4gICAgfVxuICAgIHJldHVybiBlbmNvZGVkUGFja2V0Lmxlbmd0aCA+IDFcbiAgICAgICAgPyB7XG4gICAgICAgICAgICB0eXBlOiBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXSxcbiAgICAgICAgICAgIGRhdGE6IGVuY29kZWRQYWNrZXQuc3Vic3RyaW5nKDEpXG4gICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICB0eXBlOiBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXVxuICAgICAgICB9O1xufTtcbmNvbnN0IGRlY29kZUJhc2U2NFBhY2tldCA9IChkYXRhLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgaWYgKHdpdGhOYXRpdmVBcnJheUJ1ZmZlcikge1xuICAgICAgICBjb25zdCBkZWNvZGVkID0gZGVjb2RlKGRhdGEpO1xuICAgICAgICByZXR1cm4gbWFwQmluYXJ5KGRlY29kZWQsIGJpbmFyeVR5cGUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHsgYmFzZTY0OiB0cnVlLCBkYXRhIH07IC8vIGZhbGxiYWNrIGZvciBvbGQgYnJvd3NlcnNcbiAgICB9XG59O1xuY29uc3QgbWFwQmluYXJ5ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBzd2l0Y2ggKGJpbmFyeVR5cGUpIHtcbiAgICAgICAgY2FzZSBcImJsb2JcIjpcbiAgICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gV2ViU29ja2V0ICsgYmluYXJ5VHlwZSBcImJsb2JcIlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBIVFRQIGxvbmctcG9sbGluZyBvciBXZWJUcmFuc3BvcnRcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2FzZSBcImFycmF5YnVmZmVyXCI6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBIVFRQIGxvbmctcG9sbGluZyAoYmFzZTY0KSBvciBXZWJTb2NrZXQgKyBiaW5hcnlUeXBlIFwiYXJyYXlidWZmZXJcIlxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBXZWJUcmFuc3BvcnQgKFVpbnQ4QXJyYXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgICAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBQQUNLRVRfVFlQRVMgfSBmcm9tIFwiLi9jb21tb25zLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuLy8gQXJyYXlCdWZmZXIuaXNWaWV3IG1ldGhvZCBpcyBub3QgZGVmaW5lZCBpbiBJRTEwXG5jb25zdCBpc1ZpZXcgPSBvYmogPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iaiAmJiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgZW5jb2RlUGFja2V0ID0gKHsgdHlwZSwgZGF0YSB9LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUJsb2IgJiYgZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KGRhdGEsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiZcbiAgICAgICAgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcoZGF0YSkpKSB7XG4gICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChuZXcgQmxvYihbZGF0YV0pLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gcGxhaW4gc3RyaW5nXG4gICAgcmV0dXJuIGNhbGxiYWNrKFBBQ0tFVF9UWVBFU1t0eXBlXSArIChkYXRhIHx8IFwiXCIpKTtcbn07XG5jb25zdCBlbmNvZGVCbG9iQXNCYXNlNjQgPSAoZGF0YSwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9IGZpbGVSZWFkZXIucmVzdWx0LnNwbGl0KFwiLFwiKVsxXTtcbiAgICAgICAgY2FsbGJhY2soXCJiXCIgKyAoY29udGVudCB8fCBcIlwiKSk7XG4gICAgfTtcbiAgICByZXR1cm4gZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGRhdGEpO1xufTtcbmZ1bmN0aW9uIHRvQXJyYXkoZGF0YSkge1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpO1xuICAgIH1cbn1cbmxldCBURVhUX0VOQ09ERVI7XG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlUGFja2V0VG9CaW5hcnkocGFja2V0LCBjYWxsYmFjaykge1xuICAgIGlmICh3aXRoTmF0aXZlQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHBhY2tldC5kYXRhXG4gICAgICAgICAgICAuYXJyYXlCdWZmZXIoKVxuICAgICAgICAgICAgLnRoZW4odG9BcnJheSlcbiAgICAgICAgICAgIC50aGVuKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmXG4gICAgICAgIChwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhwYWNrZXQuZGF0YSkpKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh0b0FycmF5KHBhY2tldC5kYXRhKSk7XG4gICAgfVxuICAgIGVuY29kZVBhY2tldChwYWNrZXQsIGZhbHNlLCBlbmNvZGVkID0+IHtcbiAgICAgICAgaWYgKCFURVhUX0VOQ09ERVIpIHtcbiAgICAgICAgICAgIFRFWFRfRU5DT0RFUiA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKFRFWFRfRU5DT0RFUi5lbmNvZGUoZW5jb2RlZCkpO1xuICAgIH0pO1xufVxuZXhwb3J0IHsgZW5jb2RlUGFja2V0IH07XG4iLCJpbXBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBhY2tldFRvQmluYXJ5IH0gZnJvbSBcIi4vZW5jb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgeyBkZWNvZGVQYWNrZXQgfSBmcm9tIFwiLi9kZWNvZGVQYWNrZXQuanNcIjtcbmNvbnN0IFNFUEFSQVRPUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMzApOyAvLyBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRGVsaW1pdGVyI0FTQ0lJX2RlbGltaXRlZF90ZXh0XG5jb25zdCBlbmNvZGVQYXlsb2FkID0gKHBhY2tldHMsIGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gc29tZSBwYWNrZXRzIG1heSBiZSBhZGRlZCB0byB0aGUgYXJyYXkgd2hpbGUgZW5jb2RpbmcsIHNvIHRoZSBpbml0aWFsIGxlbmd0aCBtdXN0IGJlIHNhdmVkXG4gICAgY29uc3QgbGVuZ3RoID0gcGFja2V0cy5sZW5ndGg7XG4gICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHBhY2tldHMuZm9yRWFjaCgocGFja2V0LCBpKSA9PiB7XG4gICAgICAgIC8vIGZvcmNlIGJhc2U2NCBlbmNvZGluZyBmb3IgYmluYXJ5IHBhY2tldHNcbiAgICAgICAgZW5jb2RlUGFja2V0KHBhY2tldCwgZmFsc2UsIGVuY29kZWRQYWNrZXQgPT4ge1xuICAgICAgICAgICAgZW5jb2RlZFBhY2tldHNbaV0gPSBlbmNvZGVkUGFja2V0O1xuICAgICAgICAgICAgaWYgKCsrY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVuY29kZWRQYWNrZXRzLmpvaW4oU0VQQVJBVE9SKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmNvbnN0IGRlY29kZVBheWxvYWQgPSAoZW5jb2RlZFBheWxvYWQsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IGVuY29kZWRQYXlsb2FkLnNwbGl0KFNFUEFSQVRPUik7XG4gICAgY29uc3QgcGFja2V0cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGVjb2RlZFBhY2tldCA9IGRlY29kZVBhY2tldChlbmNvZGVkUGFja2V0c1tpXSwgYmluYXJ5VHlwZSk7XG4gICAgICAgIHBhY2tldHMucHVzaChkZWNvZGVkUGFja2V0KTtcbiAgICAgICAgaWYgKGRlY29kZWRQYWNrZXQudHlwZSA9PT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFja2V0cztcbn07XG5sZXQgVEVYVF9ERUNPREVSO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZVBhY2tldEZyb21CaW5hcnkoZGF0YSwgaXNCaW5hcnksIGJpbmFyeVR5cGUpIHtcbiAgICBpZiAoIVRFWFRfREVDT0RFUikge1xuICAgICAgICAvLyBsYXppbHkgY3JlYXRlZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG9sZCBicm93c2VyIHBsYXRmb3Jtc1xuICAgICAgICBURVhUX0RFQ09ERVIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICB9XG4gICAgLy8gNDggPT09IFwiMFwiLmNoYXJDb2RlQXQoMCkgKE9QRU4gcGFja2V0IHR5cGUpXG4gICAgLy8gNTQgPT09IFwiNlwiLmNoYXJDb2RlQXQoMCkgKE5PT1AgcGFja2V0IHR5cGUpXG4gICAgY29uc3QgaXNQbGFpbkJpbmFyeSA9IGlzQmluYXJ5IHx8IGRhdGFbMF0gPCA0OCB8fCBkYXRhWzBdID4gNTQ7XG4gICAgcmV0dXJuIGRlY29kZVBhY2tldChpc1BsYWluQmluYXJ5ID8gZGF0YSA6IFRFWFRfREVDT0RFUi5kZWNvZGUoZGF0YSksIGJpbmFyeVR5cGUpO1xufVxuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gNDtcbmV4cG9ydCB7IGVuY29kZVBhY2tldCwgZW5jb2RlUGFja2V0VG9CaW5hcnksIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCB9O1xuIiwiLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICAgIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICAgIGlmICh0aGlzLmppdHRlcikge1xuICAgICAgICB2YXIgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICAgICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbiAobWluKSB7XG4gICAgdGhpcy5tcyA9IG1pbjtcbn07XG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uIChtYXgpIHtcbiAgICB0aGlzLm1heCA9IG1heDtcbn07XG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24gKGppdHRlcikge1xuICAgIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcbiIsImltcG9ydCB7IHVybCB9IGZyb20gXCIuL3VybC5qc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuL21hbmFnZXIuanNcIjtcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuY29uc3QgY2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGxvb2t1cCh1cmksIG9wdHMpIHtcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGNvbnN0IHBhcnNlZCA9IHVybCh1cmksIG9wdHMucGF0aCB8fCBcIi9zb2NrZXQuaW9cIik7XG4gICAgY29uc3Qgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgICBjb25zdCBpZCA9IHBhcnNlZC5pZDtcbiAgICBjb25zdCBwYXRoID0gcGFyc2VkLnBhdGg7XG4gICAgY29uc3Qgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXVtcIm5zcHNcIl07XG4gICAgY29uc3QgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHxcbiAgICAgICAgb3B0c1tcImZvcmNlIG5ldyBjb25uZWN0aW9uXCJdIHx8XG4gICAgICAgIGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fFxuICAgICAgICBzYW1lTmFtZXNwYWNlO1xuICAgIGxldCBpbztcbiAgICBpZiAobmV3Q29ubmVjdGlvbikge1xuICAgICAgICBpbyA9IG5ldyBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgICAgICAgY2FjaGVbaWRdID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBpbyA9IGNhY2hlW2lkXTtcbiAgICB9XG4gICAgaWYgKHBhcnNlZC5xdWVyeSAmJiAhb3B0cy5xdWVyeSkge1xuICAgICAgICBvcHRzLnF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5S2V5O1xuICAgIH1cbiAgICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoLCBvcHRzKTtcbn1cbi8vIHNvIHRoYXQgXCJsb29rdXBcIiBjYW4gYmUgdXNlZCBib3RoIGFzIGEgZnVuY3Rpb24gKGUuZy4gYGlvKC4uLilgKSBhbmQgYXMgYVxuLy8gbmFtZXNwYWNlIChlLmcuIGBpby5jb25uZWN0KC4uLilgKSwgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbk9iamVjdC5hc3NpZ24obG9va3VwLCB7XG4gICAgTWFuYWdlcixcbiAgICBTb2NrZXQsXG4gICAgaW86IGxvb2t1cCxcbiAgICBjb25uZWN0OiBsb29rdXAsXG59KTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB7IHByb3RvY29sIH0gZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbi8qKlxuICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB7IE1hbmFnZXIsIFNvY2tldCwgbG9va3VwIGFzIGlvLCBsb29rdXAgYXMgY29ubmVjdCwgbG9va3VwIGFzIGRlZmF1bHQsIH07XG4iLCJpbXBvcnQgeyBTb2NrZXQgYXMgRW5naW5lLCBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIG5leHRUaWNrLCB9IGZyb20gXCJlbmdpbmUuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmltcG9ydCAqIGFzIHBhcnNlciBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHsgQmFja29mZiB9IGZyb20gXCIuL2NvbnRyaWIvYmFja28yLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyLCB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5leHBvcnQgY2xhc3MgTWFuYWdlciBleHRlbmRzIEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubnNwcyA9IHt9O1xuICAgICAgICB0aGlzLnN1YnMgPSBbXTtcbiAgICAgICAgaWYgKHVyaSAmJiBcIm9iamVjdFwiID09PSB0eXBlb2YgdXJpKSB7XG4gICAgICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICAgICAgdXJpID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgXCIvc29ja2V0LmlvXCI7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb24ob3B0cy5yZWNvbm5lY3Rpb24gIT09IGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyhvcHRzLnJlY29ubmVjdGlvbkF0dGVtcHRzIHx8IEluZmluaXR5KTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheShvcHRzLnJlY29ubmVjdGlvbkRlbGF5IHx8IDEwMDApO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KG9wdHMucmVjb25uZWN0aW9uRGVsYXlNYXggfHwgNTAwMCk7XG4gICAgICAgIHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigoX2EgPSBvcHRzLnJhbmRvbWl6YXRpb25GYWN0b3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDAuNSk7XG4gICAgICAgIHRoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHtcbiAgICAgICAgICAgIG1pbjogdGhpcy5yZWNvbm5lY3Rpb25EZWxheSgpLFxuICAgICAgICAgICAgbWF4OiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KCksXG4gICAgICAgICAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50aW1lb3V0KG51bGwgPT0gb3B0cy50aW1lb3V0ID8gMjAwMDAgOiBvcHRzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgIGNvbnN0IF9wYXJzZXIgPSBvcHRzLnBhcnNlciB8fCBwYXJzZXI7XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IG5ldyBfcGFyc2VyLkVuY29kZXIoKTtcbiAgICAgICAgdGhpcy5kZWNvZGVyID0gbmV3IF9wYXJzZXIuRGVjb2RlcigpO1xuICAgICAgICB0aGlzLl9hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fYXV0b0Nvbm5lY3QpXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uKHYpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uQXR0ZW1wdHModikge1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheSh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNaW4odik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByYW5kb21pemF0aW9uRmFjdG9yKHYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7XG4gICAgICAgIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3IgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRKaXR0ZXIodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheU1heCh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNYXgodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aW1lb3V0KHYpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gICAgICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG1heWJlUmVjb25uZWN0T25PcGVuKCkge1xuICAgICAgICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gICAgICAgIGlmICghdGhpcy5fcmVjb25uZWN0aW5nICYmXG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gJiZcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgICAgICAgICAgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gb3B0aW9uYWwsIGNhbGxiYWNrXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9wZW4oZm4pIHtcbiAgICAgICAgaWYgKH50aGlzLl9yZWFkeVN0YXRlLmluZGV4T2YoXCJvcGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEVuZ2luZSh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlO1xuICAgICAgICAvLyBlbWl0IGBvcGVuYFxuICAgICAgICBjb25zdCBvcGVuU3ViRGVzdHJveSA9IG9uKHNvY2tldCwgXCJvcGVuXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25vcGVuKCk7XG4gICAgICAgICAgICBmbiAmJiBmbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb25FcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgICAgICB0aGlzLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCBvbkVycm9yKTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcInRpbWVvdXRcIikpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aW1lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnMucHVzaChvcGVuU3ViRGVzdHJveSk7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKGVycm9yU3ViKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBvcGVuKClcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KGZuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4oZm4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICAvLyBjbGVhciBvbGQgc3Vic1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgLy8gbWFyayBhcyBvcGVuXG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgICAgICAvLyBhZGQgbmV3IHN1YnNcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgXCJwaW5nXCIsIHRoaXMub25waW5nLmJpbmQodGhpcykpLCBvbihzb2NrZXQsIFwiZGF0YVwiLCB0aGlzLm9uZGF0YS5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImVycm9yXCIsIHRoaXMub25lcnJvci5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSwgb24odGhpcy5kZWNvZGVyLCBcImRlY29kZWRcIiwgdGhpcy5vbmRlY29kZWQuYmluZCh0aGlzKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHBpbmcuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucGluZygpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwaW5nXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRhdGEoZGF0YSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwicGFyc2UgZXJyb3JcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGVjb2RlZChwYWNrZXQpIHtcbiAgICAgICAgLy8gdGhlIG5leHRUaWNrIGNhbGwgcHJldmVudHMgYW4gZXhjZXB0aW9uIGluIGEgdXNlci1wcm92aWRlZCBldmVudCBsaXN0ZW5lciBmcm9tIHRyaWdnZXJpbmcgYSBkaXNjb25uZWN0aW9uIGR1ZSB0byBhIFwicGFyc2UgZXJyb3JcIlxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U29ja2V0fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb2NrZXQobnNwLCBvcHRzKSB7XG4gICAgICAgIGxldCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgaWYgKCFzb2NrZXQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2F1dG9Db25uZWN0ICYmICFzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICBzb2NrZXQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rlc3Ryb3koc29ja2V0KSB7XG4gICAgICAgIGNvbnN0IG5zcHMgPSBPYmplY3Qua2V5cyh0aGlzLm5zcHMpO1xuICAgICAgICBmb3IgKGNvbnN0IG5zcCBvZiBuc3BzKSB7XG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS53cml0ZShlbmNvZGVkUGFja2V0c1tpXSwgcGFja2V0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgdGhpcy5zdWJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Nsb3NlKCkge1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICBpZiAodGhpcy5lbmdpbmUpXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZmFpbGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuYmFja29mZi5kdXJhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9hdHRlbXB0XCIsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlbGYub3BlbigoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnJlY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdCA9IHRoaXMuYmFja29mZi5hdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdFwiLCBhdHRlbXB0KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gb24ob2JqLCBldiwgZm4pIHtcbiAgICBvYmoub24oZXYsIGZuKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgb2JqLm9mZihldiwgZm4pO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBQYWNrZXRUeXBlIH0gZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbmltcG9ydCB7IG9uIH0gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIsIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbi8qKlxuICogSW50ZXJuYWwgZXZlbnRzLlxuICogVGhlc2UgZXZlbnRzIGNhbid0IGJlIGVtaXR0ZWQgYnkgdGhlIHVzZXIuXG4gKi9cbmNvbnN0IFJFU0VSVkVEX0VWRU5UUyA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNvbm5lY3Q6IDEsXG4gICAgY29ubmVjdF9lcnJvcjogMSxcbiAgICBkaXNjb25uZWN0OiAxLFxuICAgIGRpc2Nvbm5lY3Rpbmc6IDEsXG4gICAgLy8gRXZlbnRFbWl0dGVyIHJlc2VydmVkIGV2ZW50czogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9ldmVudHMuaHRtbCNldmVudHNfZXZlbnRfbmV3bGlzdGVuZXJcbiAgICBuZXdMaXN0ZW5lcjogMSxcbiAgICByZW1vdmVMaXN0ZW5lcjogMSxcbn0pO1xuLyoqXG4gKiBBIFNvY2tldCBpcyB0aGUgZnVuZGFtZW50YWwgY2xhc3MgZm9yIGludGVyYWN0aW5nIHdpdGggdGhlIHNlcnZlci5cbiAqXG4gKiBBIFNvY2tldCBiZWxvbmdzIHRvIGEgY2VydGFpbiBOYW1lc3BhY2UgKGJ5IGRlZmF1bHQgLykgYW5kIHVzZXMgYW4gdW5kZXJseWluZyB7QGxpbmsgTWFuYWdlcn0gdG8gY29tbXVuaWNhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gKlxuICogc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGVkXCIpO1xuICogfSk7XG4gKlxuICogLy8gc2VuZCBhbiBldmVudCB0byB0aGUgc2VydmVyXG4gKiBzb2NrZXQuZW1pdChcImZvb1wiLCBcImJhclwiKTtcbiAqXG4gKiBzb2NrZXQub24oXCJmb29iYXJcIiwgKCkgPT4ge1xuICogICAvLyBhbiBldmVudCB3YXMgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyXG4gKiB9KTtcbiAqXG4gKiAvLyB1cG9uIGRpc2Nvbm5lY3Rpb25cbiAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKHJlYXNvbikgPT4ge1xuICogICBjb25zb2xlLmxvZyhgZGlzY29ubmVjdGVkIGR1ZSB0byAke3JlYXNvbn1gKTtcbiAqIH0pO1xuICovXG5leHBvcnQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW8sIG5zcCwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgc29ja2V0IGlzIGN1cnJlbnRseSBjb25uZWN0ZWQgdG8gdGhlIHNlcnZlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAgICAgICAgICpcbiAgICAgICAgICogc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmNvbm5lY3RlZCk7IC8vIHRydWVcbiAgICAgICAgICogfSk7XG4gICAgICAgICAqXG4gICAgICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5jb25uZWN0ZWQpOyAvLyBmYWxzZVxuICAgICAgICAgKiB9KTtcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBjb25uZWN0aW9uIHN0YXRlIHdhcyByZWNvdmVyZWQgYWZ0ZXIgYSB0ZW1wb3JhcnkgZGlzY29ubmVjdGlvbi4gSW4gdGhhdCBjYXNlLCBhbnkgbWlzc2VkIHBhY2tldHMgd2lsbFxuICAgICAgICAgKiBiZSB0cmFuc21pdHRlZCBieSB0aGUgc2VydmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJ1ZmZlciBmb3IgcGFja2V0cyByZWNlaXZlZCBiZWZvcmUgdGhlIENPTk5FQ1QgcGFja2V0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJ1ZmZlciBmb3IgcGFja2V0cyB0aGF0IHdpbGwgYmUgc2VudCBvbmNlIHRoZSBzb2NrZXQgaXMgY29ubmVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBxdWV1ZSBvZiBwYWNrZXRzIHRvIGJlIHNlbnQgd2l0aCByZXRyeSBpbiBjYXNlIG9mIGZhaWx1cmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFBhY2tldHMgYXJlIHNlbnQgb25lIGJ5IG9uZSwgZWFjaCB3YWl0aW5nIGZvciB0aGUgc2VydmVyIGFja25vd2xlZGdlbWVudCwgaW4gb3JkZXIgdG8gZ3VhcmFudGVlIHRoZSBkZWxpdmVyeSBvcmRlci5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3F1ZXVlID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHNlcXVlbmNlIHRvIGdlbmVyYXRlIHRoZSBJRCBvZiB0aGUge0BsaW5rIFF1ZXVlZFBhY2tldH0uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9xdWV1ZVNlcSA9IDA7XG4gICAgICAgIHRoaXMuaWRzID0gMDtcbiAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5pbyA9IGlvO1xuICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hdXRoKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBvcHRzLmF1dGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpO1xuICAgICAgICBpZiAodGhpcy5pby5fYXV0b0Nvbm5lY3QpXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgc29ja2V0IGlzIGN1cnJlbnRseSBkaXNjb25uZWN0ZWRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImNvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmRpc2Nvbm5lY3RlZCk7IC8vIGZhbHNlXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQub24oXCJkaXNjb25uZWN0XCIsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5kaXNjb25uZWN0ZWQpOyAvLyB0cnVlXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZ2V0IGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNvbm5lY3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YkV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VicylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaW8gPSB0aGlzLmlvO1xuICAgICAgICB0aGlzLnN1YnMgPSBbXG4gICAgICAgICAgICBvbihpbywgXCJvcGVuXCIsIHRoaXMub25vcGVuLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwicGFja2V0XCIsIHRoaXMub25wYWNrZXQuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIFNvY2tldCB3aWxsIHRyeSB0byByZWNvbm5lY3Qgd2hlbiBpdHMgTWFuYWdlciBjb25uZWN0cyBvciByZWNvbm5lY3RzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAqXG4gICAgICogY29uc29sZS5sb2coc29ja2V0LmFjdGl2ZSk7IC8vIHRydWVcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKHJlYXNvbikgPT4ge1xuICAgICAqICAgaWYgKHJlYXNvbiA9PT0gXCJpbyBzZXJ2ZXIgZGlzY29ubmVjdFwiKSB7XG4gICAgICogICAgIC8vIHRoZSBkaXNjb25uZWN0aW9uIHdhcyBpbml0aWF0ZWQgYnkgdGhlIHNlcnZlciwgeW91IG5lZWQgdG8gbWFudWFsbHkgcmVjb25uZWN0XG4gICAgICogICAgIGNvbnNvbGUubG9nKHNvY2tldC5hY3RpdmUpOyAvLyBmYWxzZVxuICAgICAqICAgfVxuICAgICAqICAgLy8gZWxzZSB0aGUgc29ja2V0IHdpbGwgYXV0b21hdGljYWxseSB0cnkgdG8gcmVjb25uZWN0XG4gICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuYWN0aXZlKTsgLy8gdHJ1ZVxuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGdldCBhY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuc3VicztcbiAgICB9XG4gICAgLyoqXG4gICAgICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKHtcbiAgICAgKiAgIGF1dG9Db25uZWN0OiBmYWxzZVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogc29ja2V0LmNvbm5lY3QoKTtcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5zdWJFdmVudHMoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlvW1wiX3JlY29ubmVjdGluZ1wiXSlcbiAgICAgICAgICAgIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMuaW8uX3JlYWR5U3RhdGUpXG4gICAgICAgICAgICB0aGlzLm9ub3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBjb25uZWN0KCl9LlxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBtaW1pY3MgdGhlIFdlYlNvY2tldC5zZW5kKCkgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0L3NlbmRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnNlbmQoXCJoZWxsb1wiKTtcbiAgICAgKlxuICAgICAqIC8vIHRoaXMgaXMgZXF1aXZhbGVudCB0b1xuICAgICAqIHNvY2tldC5lbWl0KFwibWVzc2FnZVwiLCBcImhlbGxvXCIpO1xuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgc2VuZCguLi5hcmdzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIGBlbWl0YC5cbiAgICAgKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LmVtaXQoXCJoZWxsb1wiLCBcIndvcmxkXCIpO1xuICAgICAqXG4gICAgICogLy8gYWxsIHNlcmlhbGl6YWJsZSBkYXRhc3RydWN0dXJlcyBhcmUgc3VwcG9ydGVkIChubyBuZWVkIHRvIGNhbGwgSlNPTi5zdHJpbmdpZnkpXG4gICAgICogc29ja2V0LmVtaXQoXCJoZWxsb1wiLCAxLCBcIjJcIiwgeyAzOiBbXCI0XCJdLCA1OiBVaW50OEFycmF5LmZyb20oWzZdKSB9KTtcbiAgICAgKlxuICAgICAqIC8vIHdpdGggYW4gYWNrbm93bGVkZ2VtZW50IGZyb20gdGhlIHNlcnZlclxuICAgICAqIHNvY2tldC5lbWl0KFwiaGVsbG9cIiwgXCJ3b3JsZFwiLCAodmFsKSA9PiB7XG4gICAgICogICAvLyAuLi5cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqL1xuICAgIGVtaXQoZXYsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKFJFU0VSVkVEX0VWRU5UUy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCInICsgZXYudG9TdHJpbmcoKSArICdcIiBpcyBhIHJlc2VydmVkIGV2ZW50IG5hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnVuc2hpZnQoZXYpO1xuICAgICAgICBpZiAodGhpcy5fb3B0cy5yZXRyaWVzICYmICF0aGlzLmZsYWdzLmZyb21RdWV1ZSAmJiAhdGhpcy5mbGFncy52b2xhdGlsZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG9RdWV1ZShhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFBhY2tldFR5cGUuRVZFTlQsXG4gICAgICAgICAgICBkYXRhOiBhcmdzLFxuICAgICAgICB9O1xuICAgICAgICBwYWNrZXQub3B0aW9ucyA9IHt9O1xuICAgICAgICBwYWNrZXQub3B0aW9ucy5jb21wcmVzcyA9IHRoaXMuZmxhZ3MuY29tcHJlc3MgIT09IGZhbHNlO1xuICAgICAgICAvLyBldmVudCBhY2sgY2FsbGJhY2tcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLmlkcysrO1xuICAgICAgICAgICAgY29uc3QgYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyQWNrQ2FsbGJhY2soaWQsIGFjayk7XG4gICAgICAgICAgICBwYWNrZXQuaWQgPSBpZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1RyYW5zcG9ydFdyaXRhYmxlID0gdGhpcy5pby5lbmdpbmUgJiZcbiAgICAgICAgICAgIHRoaXMuaW8uZW5naW5lLnRyYW5zcG9ydCAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0LndyaXRhYmxlO1xuICAgICAgICBjb25zdCBkaXNjYXJkUGFja2V0ID0gdGhpcy5mbGFncy52b2xhdGlsZSAmJiAoIWlzVHJhbnNwb3J0V3JpdGFibGUgfHwgIXRoaXMuY29ubmVjdGVkKTtcbiAgICAgICAgaWYgKGRpc2NhcmRQYWNrZXQpIHtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlPdXRnb2luZ0xpc3RlbmVycyhwYWNrZXQpO1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVnaXN0ZXJBY2tDYWxsYmFjayhpZCwgYWNrKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdGltZW91dCA9IChfYSA9IHRoaXMuZmxhZ3MudGltZW91dCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fb3B0cy5hY2tUaW1lb3V0O1xuICAgICAgICBpZiAodGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFja3NbaWRdID0gYWNrO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLmlvLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW2lkXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VuZEJ1ZmZlcltpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2suY2FsbCh0aGlzLCBuZXcgRXJyb3IoXCJvcGVyYXRpb24gaGFzIHRpbWVkIG91dFwiKSk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB0aGlzLmFja3NbaWRdID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuaW8uY2xlYXJUaW1lb3V0Rm4odGltZXIpO1xuICAgICAgICAgICAgYWNrLmFwcGx5KHRoaXMsIFtudWxsLCAuLi5hcmdzXSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtaXRzIGFuIGV2ZW50IGFuZCB3YWl0cyBmb3IgYW4gYWNrbm93bGVkZ2VtZW50XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIHdpdGhvdXQgdGltZW91dFxuICAgICAqIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc29ja2V0LmVtaXRXaXRoQWNrKFwiaGVsbG9cIiwgXCJ3b3JsZFwiKTtcbiAgICAgKlxuICAgICAqIC8vIHdpdGggYSBzcGVjaWZpYyB0aW1lb3V0XG4gICAgICogdHJ5IHtcbiAgICAgKiAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgc29ja2V0LnRpbWVvdXQoMTAwMCkuZW1pdFdpdGhBY2soXCJoZWxsb1wiLCBcIndvcmxkXCIpO1xuICAgICAqIH0gY2F0Y2ggKGVycikge1xuICAgICAqICAgLy8gdGhlIHNlcnZlciBkaWQgbm90IGFja25vd2xlZGdlIHRoZSBldmVudCBpbiB0aGUgZ2l2ZW4gZGVsYXlcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIGEgUHJvbWlzZSB0aGF0IHdpbGwgYmUgZnVsZmlsbGVkIHdoZW4gdGhlIHNlcnZlciBhY2tub3dsZWRnZXMgdGhlIGV2ZW50XG4gICAgICovXG4gICAgZW1pdFdpdGhBY2soZXYsIC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gdGhlIHRpbWVvdXQgZmxhZyBpcyBvcHRpb25hbFxuICAgICAgICBjb25zdCB3aXRoRXJyID0gdGhpcy5mbGFncy50aW1lb3V0ICE9PSB1bmRlZmluZWQgfHwgdGhpcy5fb3B0cy5hY2tUaW1lb3V0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBhcmdzLnB1c2goKGFyZzEsIGFyZzIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAod2l0aEVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJnMSA/IHJlamVjdChhcmcxKSA6IHJlc29sdmUoYXJnMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShhcmcxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChldiwgLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHBhY2tldCB0byB0aGUgcXVldWUuXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb1F1ZXVlKGFyZ3MpIHtcbiAgICAgICAgbGV0IGFjaztcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWNrZXQgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5fcXVldWVTZXErKyxcbiAgICAgICAgICAgIHRyeUNvdW50OiAwLFxuICAgICAgICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgZmxhZ3M6IE9iamVjdC5hc3NpZ24oeyBmcm9tUXVldWU6IHRydWUgfSwgdGhpcy5mbGFncyksXG4gICAgICAgIH07XG4gICAgICAgIGFyZ3MucHVzaCgoZXJyLCAuLi5yZXNwb25zZUFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmIChwYWNrZXQgIT09IHRoaXMuX3F1ZXVlWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHBhY2tldCBoYXMgYWxyZWFkeSBiZWVuIGFja25vd2xlZGdlZFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhhc0Vycm9yID0gZXJyICE9PSBudWxsO1xuICAgICAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC50cnlDb3VudCA+IHRoaXMuX29wdHMucmV0cmllcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGFjaykge1xuICAgICAgICAgICAgICAgICAgICBhY2sobnVsbCwgLi4ucmVzcG9uc2VBcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWNrZXQucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYWluUXVldWUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3F1ZXVlLnB1c2gocGFja2V0KTtcbiAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIHRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHF1ZXVlLCBhbmQgd2FpdCBmb3IgYW4gYWNrbm93bGVkZ2VtZW50IGZyb20gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gZm9yY2UgLSB3aGV0aGVyIHRvIHJlc2VuZCBhIHBhY2tldCB0aGF0IGhhcyBub3QgYmVlbiBhY2tub3dsZWRnZWQgeWV0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kcmFpblF1ZXVlKGZvcmNlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCB8fCB0aGlzLl9xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWNrZXQgPSB0aGlzLl9xdWV1ZVswXTtcbiAgICAgICAgaWYgKHBhY2tldC5wZW5kaW5nICYmICFmb3JjZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhY2tldC5wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgcGFja2V0LnRyeUNvdW50Kys7XG4gICAgICAgIHRoaXMuZmxhZ3MgPSBwYWNrZXQuZmxhZ3M7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBwYWNrZXQuYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFja2V0KHBhY2tldCkge1xuICAgICAgICBwYWNrZXQubnNwID0gdGhpcy5uc3A7XG4gICAgICAgIHRoaXMuaW8uX3BhY2tldChwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbm9wZW4oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5hdXRoID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5hdXRoKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VuZENvbm5lY3RQYWNrZXQoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRDb25uZWN0UGFja2V0KHRoaXMuYXV0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBDT05ORUNUIHBhY2tldCB0byBpbml0aWF0ZSB0aGUgU29ja2V0LklPIHNlc3Npb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NlbmRDb25uZWN0UGFja2V0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5wYWNrZXQoe1xuICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5DT05ORUNULFxuICAgICAgICAgICAgZGF0YTogdGhpcy5fcGlkXG4gICAgICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKHsgcGlkOiB0aGlzLl9waWQsIG9mZnNldDogdGhpcy5fbGFzdE9mZnNldCB9LCBkYXRhKVxuICAgICAgICAgICAgICAgIDogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBkZWxldGUgdGhpcy5pZDtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkaXNjb25uZWN0XCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgICAgICAgaWYgKCFzYW1lTmFtZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgcGFja2V0LmRhdGEuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25jb25uZWN0KHBhY2tldC5kYXRhLnNpZCwgcGFja2V0LmRhdGEucGlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBuZXcgRXJyb3IoXCJJdCBzZWVtcyB5b3UgYXJlIHRyeWluZyB0byByZWFjaCBhIFNvY2tldC5JTyBzZXJ2ZXIgaW4gdjIueCB3aXRoIGEgdjMueCBjbGllbnQsIGJ1dCB0aGV5IGFyZSBub3QgY29tcGF0aWJsZSAobW9yZSBpbmZvcm1hdGlvbiBoZXJlOiBodHRwczovL3NvY2tldC5pby9kb2NzL3YzL21pZ3JhdGluZy1mcm9tLTIteC10by0zLTAvKVwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkVWRU5UOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKHBhY2tldC5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICBlcnIuZGF0YSA9IHBhY2tldC5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmV2ZW50KHBhY2tldCkge1xuICAgICAgICBjb25zdCBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gICAgICAgIGlmIChudWxsICE9IHBhY2tldC5pZCkge1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0RXZlbnQoYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChPYmplY3QuZnJlZXplKGFyZ3MpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbWl0RXZlbnQoYXJncykge1xuICAgICAgICBpZiAodGhpcy5fYW55TGlzdGVuZXJzICYmIHRoaXMuX2FueUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdXBlci5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBpZiAodGhpcy5fcGlkICYmIGFyZ3MubGVuZ3RoICYmIHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RPZmZzZXQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYWNrKGlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VudCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgICAgICAgICAgaWYgKHNlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VudCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLnBhY2tldCh7XG4gICAgICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5BQ0ssXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmFjayhwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhY2spIHtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY29ubmVjdChpZCwgcGlkKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5yZWNvdmVyZWQgPSBwaWQgJiYgdGhpcy5fcGlkID09PSBwaWQ7XG4gICAgICAgIHRoaXMuX3BpZCA9IHBpZDsgLy8gZGVmaW5lZCBvbmx5IGlmIGNvbm5lY3Rpb24gc3RhdGUgcmVjb3ZlcnkgaXMgZW5hYmxlZFxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdEJ1ZmZlcmVkKCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdFwiKTtcbiAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZW1pdEJ1ZmZlcmVkKCkge1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIuZm9yRWFjaCgoYXJncykgPT4gdGhpcy5lbWl0RXZlbnQoYXJncykpO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyLmZvckVhY2goKHBhY2tldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlPdXRnb2luZ0xpc3RlbmVycyhwYWNrZXQpO1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gc2VydmVyIGRpc2Nvbm5lY3RcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gICAgICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAgICAgKiB0aGF0IHJlY29ubmVjdGlvbnMgZG9uJ3QgZ2V0IHRyaWdnZXJlZCBmb3IgdGhpcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vicykge1xuICAgICAgICAgICAgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG4gICAgICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgICAgIHRoaXMuc3VicyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlvW1wiX2Rlc3Ryb3lcIl0odGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuIEluIHRoYXQgY2FzZSwgdGhlIHNvY2tldCB3aWxsIG5vdCB0cnkgdG8gcmVjb25uZWN0LlxuICAgICAqXG4gICAgICogSWYgdGhpcyBpcyB0aGUgbGFzdCBhY3RpdmUgU29ja2V0IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgTWFuYWdlcn0sIHRoZSBsb3ctbGV2ZWwgY29ubmVjdGlvbiB3aWxsIGJlIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKHJlYXNvbikgPT4ge1xuICAgICAqICAgLy8gY29uc29sZS5sb2cocmVhc29uKTsgcHJpbnRzIFwiaW8gY2xpZW50IGRpc2Nvbm5lY3RcIlxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBQYWNrZXRUeXBlLkRJU0NPTk5FQ1QgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgLy8gZmlyZSBldmVudHNcbiAgICAgICAgICAgIHRoaXMub25jbG9zZShcImlvIGNsaWVudCBkaXNjb25uZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIGRpc2Nvbm5lY3QoKX0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuY29tcHJlc3MoZmFsc2UpLmVtaXQoXCJoZWxsb1wiKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21wcmVzcyAtIGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgY29tcHJlc3MoY29tcHJlc3MpIHtcbiAgICAgICAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIG1vZGlmaWVyIGZvciBhIHN1YnNlcXVlbnQgZXZlbnQgZW1pc3Npb24gdGhhdCB0aGUgZXZlbnQgbWVzc2FnZSB3aWxsIGJlIGRyb3BwZWQgd2hlbiB0aGlzIHNvY2tldCBpcyBub3RcbiAgICAgKiByZWFkeSB0byBzZW5kIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQudm9sYXRpbGUuZW1pdChcImhlbGxvXCIpOyAvLyB0aGUgc2VydmVyIG1heSBvciBtYXkgbm90IHJlY2VpdmUgaXRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKi9cbiAgICBnZXQgdm9sYXRpbGUoKSB7XG4gICAgICAgIHRoaXMuZmxhZ3Mudm9sYXRpbGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIG1vZGlmaWVyIGZvciBhIHN1YnNlcXVlbnQgZXZlbnQgZW1pc3Npb24gdGhhdCB0aGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBlcnJvciB3aGVuIHRoZVxuICAgICAqIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHdpdGhvdXQgYW4gYWNrbm93bGVkZ2VtZW50IGZyb20gdGhlIHNlcnZlcjpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnRpbWVvdXQoNTAwMCkuZW1pdChcIm15LWV2ZW50XCIsIChlcnIpID0+IHtcbiAgICAgKiAgIGlmIChlcnIpIHtcbiAgICAgKiAgICAgLy8gdGhlIHNlcnZlciBkaWQgbm90IGFja25vd2xlZGdlIHRoZSBldmVudCBpbiB0aGUgZ2l2ZW4gZGVsYXlcbiAgICAgKiAgIH1cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKi9cbiAgICB0aW1lb3V0KHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy5mbGFncy50aW1lb3V0ID0gdGltZW91dDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0Lm9uQW55KChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYGdvdCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgb25BbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suIFRoZSBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5wcmVwZW5kQW55KChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYGdvdCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgcHJlcGVuZEFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBjYXRjaEFsbExpc3RlbmVyID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgZ290IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55KGNhdGNoQWxsTGlzdGVuZXIpO1xuICAgICAqXG4gICAgICogLy8gcmVtb3ZlIGEgc3BlY2lmaWMgbGlzdGVuZXJcbiAgICAgKiBzb2NrZXQub2ZmQW55KGNhdGNoQWxsTGlzdGVuZXIpO1xuICAgICAqXG4gICAgICogLy8gb3IgcmVtb3ZlIGFsbCBsaXN0ZW5lcnNcbiAgICAgKiBzb2NrZXQub2ZmQW55KCk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBvZmZBbnkobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbnlMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdGhhdCBhcmUgbGlzdGVuaW5nIGZvciBhbnkgZXZlbnQgdGhhdCBpcyBzcGVjaWZpZWQuIFRoaXMgYXJyYXkgY2FuIGJlIG1hbmlwdWxhdGVkLFxuICAgICAqIGUuZy4gdG8gcmVtb3ZlIGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBsaXN0ZW5lcnNBbnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIE5vdGU6IGFja25vd2xlZGdlbWVudHMgc2VudCB0byB0aGUgc2VydmVyIGFyZSBub3QgaW5jbHVkZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5vbkFueU91dGdvaW5nKChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYHNlbnQgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIG9uQW55T3V0Z29pbmcobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgPSB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suIFRoZSBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkuXG4gICAgICpcbiAgICAgKiBOb3RlOiBhY2tub3dsZWRnZW1lbnRzIHNlbnQgdG8gdGhlIHNlcnZlciBhcmUgbm90IGluY2x1ZGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQucHJlcGVuZEFueU91dGdvaW5nKChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYHNlbnQgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHByZXBlbmRBbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBjYXRjaEFsbExpc3RlbmVyID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgc2VudCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHNvY2tldC5vbkFueU91dGdvaW5nKGNhdGNoQWxsTGlzdGVuZXIpO1xuICAgICAqXG4gICAgICogLy8gcmVtb3ZlIGEgc3BlY2lmaWMgbGlzdGVuZXJcbiAgICAgKiBzb2NrZXQub2ZmQW55T3V0Z29pbmcoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyBvciByZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqIHNvY2tldC5vZmZBbnlPdXRnb2luZygpO1xuICAgICAqXG4gICAgICogQHBhcmFtIFtsaXN0ZW5lcl0gLSB0aGUgY2F0Y2gtYWxsIGxpc3RlbmVyIChvcHRpb25hbClcbiAgICAgKi9cbiAgICBvZmZBbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBsaXN0ZW5pbmcgZm9yIGFueSBldmVudCB0aGF0IGlzIHNwZWNpZmllZC4gVGhpcyBhcnJheSBjYW4gYmUgbWFuaXB1bGF0ZWQsXG4gICAgICogZS5nLiB0byByZW1vdmUgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIGxpc3RlbmVyc0FueU91dGdvaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5vdGlmeSB0aGUgbGlzdGVuZXJzIGZvciBlYWNoIHBhY2tldCBzZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCkge1xuICAgICAgICBpZiAodGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgJiYgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJlbmdpbmUuaW8tY2xpZW50XCI7XG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHVyaSAtIHVybFxuICogQHBhcmFtIHBhdGggLSB0aGUgcmVxdWVzdCBwYXRoIG9mIHRoZSBjb25uZWN0aW9uXG4gKiBAcGFyYW0gbG9jIC0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cmwodXJpLCBwYXRoID0gXCJcIiwgbG9jKSB7XG4gICAgbGV0IG9iaiA9IHVyaTtcbiAgICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICAgIGxvYyA9IGxvYyB8fCAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGxvY2F0aW9uKTtcbiAgICBpZiAobnVsbCA9PSB1cmkpXG4gICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIGxvYy5ob3N0O1xuICAgIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLmhvc3QgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgICAgICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgbG9jKSB7XG4gICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJpID0gXCJodHRwczovL1wiICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHBhcnNlXG4gICAgICAgIG9iaiA9IHBhcnNlKHVyaSk7XG4gICAgfVxuICAgIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICAgIGlmICghb2JqLnBvcnQpIHtcbiAgICAgICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgIG9iai5wb3J0ID0gXCI0NDNcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYmoucGF0aCA9IG9iai5wYXRoIHx8IFwiL1wiO1xuICAgIGNvbnN0IGlwdjYgPSBvYmouaG9zdC5pbmRleE9mKFwiOlwiKSAhPT0gLTE7XG4gICAgY29uc3QgaG9zdCA9IGlwdjYgPyBcIltcIiArIG9iai5ob3N0ICsgXCJdXCIgOiBvYmouaG9zdDtcbiAgICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gICAgb2JqLmlkID0gb2JqLnByb3RvY29sICsgXCI6Ly9cIiArIGhvc3QgKyBcIjpcIiArIG9iai5wb3J0ICsgcGF0aDtcbiAgICAvLyBkZWZpbmUgaHJlZlxuICAgIG9iai5ocmVmID1cbiAgICAgICAgb2JqLnByb3RvY29sICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgaG9zdCArXG4gICAgICAgICAgICAobG9jICYmIGxvYy5wb3J0ID09PSBvYmoucG9ydCA/IFwiXCIgOiBcIjpcIiArIG9iai5wb3J0KTtcbiAgICByZXR1cm4gb2JqO1xufVxuIiwiaW1wb3J0IHsgaXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgfCBCbG9iIHwgRmlsZSBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBzb2NrZXQuaW8gZXZlbnQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggZGVjb25zdHJ1Y3RlZCBwYWNrZXQgYW5kIGxpc3Qgb2YgYnVmZmVyc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0KSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuICAgIGNvbnN0IHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICBjb25zdCBwYWNrID0gcGFja2V0O1xuICAgIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICAgIHJldHVybiB7IHBhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVycyB9O1xufVxuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChpc0JpbmFyeShkYXRhKSkge1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IHsgX3BsYWNlaG9sZGVyOiB0cnVlLCBudW06IGJ1ZmZlcnMubGVuZ3RoIH07XG4gICAgICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSBuZXcgQXJyYXkoZGF0YS5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGEgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0RhdGE7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xufVxuLyoqXG4gKiBSZWNvbnN0cnVjdHMgYSBiaW5hcnkgcGFja2V0IGZyb20gaXRzIHBsYWNlaG9sZGVyIHBhY2tldCBhbmQgYnVmZmVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBldmVudCBwYWNrZXQgd2l0aCBwbGFjZWhvbGRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlcnMgLSBiaW5hcnkgYnVmZmVycyB0byBwdXQgaW4gcGxhY2Vob2xkZXIgcG9zaXRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWNvbnN0cnVjdFBhY2tldChwYWNrZXQsIGJ1ZmZlcnMpIHtcbiAgICBwYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSwgYnVmZmVycyk7XG4gICAgZGVsZXRlIHBhY2tldC5hdHRhY2htZW50czsgLy8gbm8gbG9uZ2VyIHVzZWZ1bFxuICAgIHJldHVybiBwYWNrZXQ7XG59XG5mdW5jdGlvbiBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaXNJbmRleFZhbGlkID0gdHlwZW9mIGRhdGEubnVtID09PSBcIm51bWJlclwiICYmXG4gICAgICAgICAgICBkYXRhLm51bSA+PSAwICYmXG4gICAgICAgICAgICBkYXRhLm51bSA8IGJ1ZmZlcnMubGVuZ3RoO1xuICAgICAgICBpZiAoaXNJbmRleFZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gYnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBhdHRhY2htZW50c1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbn1cbiIsImltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuaW1wb3J0IHsgZGVjb25zdHJ1Y3RQYWNrZXQsIHJlY29uc3RydWN0UGFja2V0IH0gZnJvbSBcIi4vYmluYXJ5LmpzXCI7XG5pbXBvcnQgeyBpc0JpbmFyeSwgaGFzQmluYXJ5IH0gZnJvbSBcIi4vaXMtYmluYXJ5LmpzXCI7XG4vKipcbiAqIFRoZXNlIHN0cmluZ3MgbXVzdCBub3QgYmUgdXNlZCBhcyBldmVudCBuYW1lcywgYXMgdGhleSBoYXZlIGEgc3BlY2lhbCBtZWFuaW5nLlxuICovXG5jb25zdCBSRVNFUlZFRF9FVkVOVFMgPSBbXG4gICAgXCJjb25uZWN0XCIsXG4gICAgXCJjb25uZWN0X2Vycm9yXCIsXG4gICAgXCJkaXNjb25uZWN0XCIsXG4gICAgXCJkaXNjb25uZWN0aW5nXCIsXG4gICAgXCJuZXdMaXN0ZW5lclwiLFxuICAgIFwicmVtb3ZlTGlzdGVuZXJcIiwgLy8gdXNlZCBieSB0aGUgTm9kZS5qcyBFdmVudEVtaXR0ZXJcbl07XG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcHJvdG9jb2wgPSA1O1xuZXhwb3J0IHZhciBQYWNrZXRUeXBlO1xuKGZ1bmN0aW9uIChQYWNrZXRUeXBlKSB7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQ09OTkVDVFwiXSA9IDBdID0gXCJDT05ORUNUXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiRElTQ09OTkVDVFwiXSA9IDFdID0gXCJESVNDT05ORUNUXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiRVZFTlRcIl0gPSAyXSA9IFwiRVZFTlRcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJBQ0tcIl0gPSAzXSA9IFwiQUNLXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQ09OTkVDVF9FUlJPUlwiXSA9IDRdID0gXCJDT05ORUNUX0VSUk9SXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0VWRU5UXCJdID0gNV0gPSBcIkJJTkFSWV9FVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkJJTkFSWV9BQ0tcIl0gPSA2XSA9IFwiQklOQVJZX0FDS1wiO1xufSkoUGFja2V0VHlwZSB8fCAoUGFja2V0VHlwZSA9IHt9KSk7XG4vKipcbiAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEVuY29kZXIge1xuICAgIC8qKlxuICAgICAqIEVuY29kZXIgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlcGxhY2VyIC0gY3VzdG9tIHJlcGxhY2VyIHRvIHBhc3MgZG93biB0byBKU09OLnBhcnNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGFjZXIpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAgICAgKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gICAgICovXG4gICAgZW5jb2RlKG9iaikge1xuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlQgfHwgb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQUNLKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9iaikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGVBc0JpbmFyeSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFBhY2tldFR5cGUuQklOQVJZX0FDSyxcbiAgICAgICAgICAgICAgICAgICAgbnNwOiBvYmoubnNwLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvYmouZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG9iai5pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RoaXMuZW5jb2RlQXNTdHJpbmcob2JqKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICAgICAgICAvLyBmaXJzdCBpcyB0eXBlXG4gICAgICAgIGxldCBzdHIgPSBcIlwiICsgb2JqLnR5cGU7XG4gICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgaWYgKG9iai5uc3AgJiYgXCIvXCIgIT09IG9iai5uc3ApIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwICsgXCIsXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5pZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBqc29uIGRhdGFcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSwgdGhpcy5yZXBsYWNlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICAgICAqL1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaikge1xuICAgICAgICBjb25zdCBkZWNvbnN0cnVjdGlvbiA9IGRlY29uc3RydWN0UGFja2V0KG9iaik7XG4gICAgICAgIGNvbnN0IHBhY2sgPSB0aGlzLmVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgIHJldHVybiBidWZmZXJzOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgICB9XG59XG4vLyBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODUxMTI4MS9jaGVjay1pZi1hLXZhbHVlLWlzLWFuLW9iamVjdC1pbi1qYXZhc2NyaXB0XG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xufVxuLyoqXG4gKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBEZWNvZGVyIGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogRGVjb2RlciBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmV2aXZlciAtIGN1c3RvbSByZXZpdmVyIHRvIHBhc3MgZG93biB0byBKU09OLnN0cmluZ2lmeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJldml2ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXZpdmVyID0gcmV2aXZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhbiBlbmNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICAgICAqL1xuICAgIGFkZChvYmopIHtcbiAgICAgICAgbGV0IHBhY2tldDtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgcGxhaW50ZXh0IGRhdGEgd2hlbiByZWNvbnN0cnVjdGluZyBhIHBhY2tldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhY2tldCA9IHRoaXMuZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgICAgICAgICBjb25zdCBpc0JpbmFyeUV2ZW50ID0gcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UO1xuICAgICAgICAgICAgaWYgKGlzQmluYXJ5RXZlbnQgfHwgcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgICAgIHBhY2tldC50eXBlID0gaXNCaW5hcnlFdmVudCA/IFBhY2tldFR5cGUuRVZFTlQgOiBQYWNrZXRUeXBlLkFDSztcbiAgICAgICAgICAgICAgICAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG4gICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzQmluYXJ5KG9iaikgfHwgb2JqLmJhc2U2NCkge1xuICAgICAgICAgICAgLy8gcmF3IGJpbmFyeSBkYXRhXG4gICAgICAgICAgICBpZiAoIXRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdvdCBiaW5hcnkgZGF0YSB3aGVuIG5vdCByZWNvbnN0cnVjdGluZyBhIHBhY2tldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHR5cGU6IFwiICsgb2JqKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAgICAgKi9cbiAgICBkZWNvZGVTdHJpbmcoc3RyKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgLy8gbG9vayB1cCB0eXBlXG4gICAgICAgIGNvbnN0IHAgPSB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIoc3RyLmNoYXJBdCgwKSksXG4gICAgICAgIH07XG4gICAgICAgIGlmIChQYWNrZXRUeXBlW3AudHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biBwYWNrZXQgdHlwZSBcIiArIHAudHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICAgICAgICBpZiAocC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVCB8fFxuICAgICAgICAgICAgcC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoc3RyLmNoYXJBdCgrK2kpICE9PSBcIi1cIiAmJiBpICE9IHN0ci5sZW5ndGgpIHsgfVxuICAgICAgICAgICAgY29uc3QgYnVmID0gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgICAgICBpZiAoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT09IFwiLVwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCBhdHRhY2htZW50c1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuYXR0YWNobWVudHMgPSBOdW1iZXIoYnVmKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICAgICAgICBpZiAoXCIvXCIgPT09IHN0ci5jaGFyQXQoaSArIDEpKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKCsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmIChcIixcIiA9PT0gYylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5uc3AgPSBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHAubnNwID0gXCIvXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBpZFxuICAgICAgICBjb25zdCBuZXh0ID0gc3RyLmNoYXJBdChpICsgMSk7XG4gICAgICAgIGlmIChcIlwiICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKCsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgICAgICAgICAgICAgLS1pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5pZCA9IE51bWJlcihzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAganNvbiBkYXRhXG4gICAgICAgIGlmIChzdHIuY2hhckF0KCsraSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnRyeVBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgICAgICAgICAgaWYgKERlY29kZXIuaXNQYXlsb2FkVmFsaWQocC50eXBlLCBwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgIHAuZGF0YSA9IHBheWxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHBheWxvYWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHRyeVBhcnNlKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLCB0aGlzLnJldml2ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGlzUGF5bG9hZFZhbGlkKHR5cGUsIHBheWxvYWQpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNPYmplY3QocGF5bG9hZCk7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IGlzT2JqZWN0KHBheWxvYWQpO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkVWRU5UOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBwYXlsb2FkWzBdID09PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHBheWxvYWRbMF0gPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSRVNFUlZFRF9FVkVOVFMuaW5kZXhPZihwYXlsb2FkWzBdKSA9PT0gLTEpKSk7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBCaW5hcnlSZWNvbnN0cnVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgICAgICAgdGhpcy5wYWNrZXQgPSBwYWNrZXQ7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxuICAgICAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXG4gICAgICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAgICAgKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAgICAgKi9cbiAgICB0YWtlQmluYXJ5RGF0YShiaW5EYXRhKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICAgICAgICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgIC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAgICAgKi9cbiAgICBmaW5pc2hlZFJlY29uc3RydWN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgIH1cbn1cbiIsImNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNWaWV3ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gXCJbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl1cIik7XG5jb25zdCB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBGaWxlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChGaWxlKSA9PT0gXCJbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl1cIik7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBCdWZmZXIsIGFuIEFycmF5QnVmZmVyLCBhIEJsb2Igb3IgYSBGaWxlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0JpbmFyeShvYmopIHtcbiAgICByZXR1cm4gKCh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhvYmopKSkgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzQmluYXJ5KG9iaiwgdG9KU09OKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc0JpbmFyeShvYmopKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob2JqLnRvSlNPTiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBHZW5VdGlsIH0gZnJvbSBcIi4vdXRpbC9nZW4udXRpbFwiO1xyXG5pbXBvcnQgeyBBdXRoQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9hdXRoLmNvbXBcIjtcclxuaW1wb3J0IHsgQ2hhdENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvY2hhdC5jb21wXCI7XHJcbmltcG9ydCB7IEVycm9yQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9lcnJvci5jb21wXCI7XHJcblxyXG5zZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xyXG5cclxuQXV0aENvbXBvbmVudC5nZXRJbnN0YW5jZSgpO1xyXG5DaGF0Q29tcG9uZW50LmdldEluc3RhbmNlKCk7XHJcbkVycm9yQ29tcG9uZW50LmdldEluc3RhbmNlKCk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgR2VuVXRpbC5sb2dVc2VyKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9