import { iNewGrpBody } from "../models/group.model";
import { iAuthInputs } from "../models/auth.model";
import { iHttpResponse } from "../models/http.model";
import { iValidityType } from "../models/validity.model";
import { iChatType, iRequestBody } from "../models/gen.model";
import { ErrorComponent as error } from "../components/error.comp";
import { username_pattern, password_pattern } from "../models/auth.model";
import {
  chatType,
  contactAct,
  iSearchItem,
  iRelationAct,
  iSearchValues,
} from "../models/peer.model";
import {
  iRequest,
  iRelation,
  iUserPassword,
  requestActions,
  iPrivacyRequest,
  iRequestActions,
  iUserPrivacyProp,
  iUserPatchRequest,
  iRequestApproveData,
} from "../models/user.model";

/** This class holds a range of input validation methods used throughout the client code. */
export class Validate {
  static instance: Validate | null;

  private constructor() {}

  static readonly registerForm = (
    registerInputs: iAuthInputs
  ): iValidityType => {
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
      registerInputs.username.match(username_pattern)
        ? null
        : "Username must contain 8-20 uppercase, lowercase, numeric, or #?!@$%^&* characters",
      registerInputs.password.match(password_pattern)
        ? null
        : "Password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
      registerInputs.rePassword!.match(password_pattern)
        ? null
        : "Confirmed password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
      registerInputs.password === registerInputs.rePassword
        ? null
        : "Password & Confirmation password does not match",
    ];

    return this.setValidity(validity);
  };
  static readonly loginForm = (loginInputs: iAuthInputs): iValidityType => {
    // USERNAME & PASSWORD ARE REQUIRED
    const validity = [
      loginInputs.username.trim().length < 1 ? "Username is require" : null,
      loginInputs.password.trim().length < 1 ? "Password is require" : null,
    ];

    return this.setValidity(validity);
  };
  static readonly search = (
    searchItem: iSearchValues,
    strType: iChatType
  ): iValidityType => {
    const { pattern, type, skip } = searchItem;
    const validity = [
      typeof pattern === "string" ? null : "Search Pattern must be astring",
      type === 0 || type === 1
        ? null
        : `Search String Types can only be either 1 or 1`,
      strType === "user" || strType === "group"
        ? null
        : `Search Type can only be either ${chatType.user} or ${chatType.group}`,
      typeof skip === "number" ? null : `Search Skip must be a number`,
    ];

    return this.setValidity(validity);
  };
  static readonly changePasswordForm = (
    rePasswordInputs: iUserPassword
  ): iValidityType => {
    // PASSWORD VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL characters
    // --- at least one UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL character
    // --- at least 8 characters
    // RE-PASSWORD VALIDATE
    // --- must only have UPPERCASE, LOWERCASE, NUMERIC, and SPECIAL characters
    // --- equals password
    const validity = [
      rePasswordInputs.password.match(password_pattern)
        ? null
        : "Password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
      rePasswordInputs.rePassword.match(password_pattern)
        ? null
        : "Confirmed password must be at least 8 characters long and must contain at least 1 uppercase, lowercase, numeric, and #?!@$%^&* characters",
      rePasswordInputs.password === rePasswordInputs.rePassword
        ? null
        : "Password & Confirmation password does not match",
    ];

    return this.setValidity(validity);
  };
  static readonly relationAction = (
    relationAct: iRelationAct
  ): iValidityType => {
    const validity = [
      typeof relationAct.recipientId === "string" &&
      relationAct.recipientId.length > 0
        ? null
        : "Recipient id is required",
      relationAct.userAction === contactAct.block ||
      relationAct.userAction === contactAct.mute ||
      relationAct.userAction === contactAct.archive
        ? null
        : `Relation action must only be ${contactAct.archive}, ${contactAct.mute}, or${contactAct.block}`,
      typeof relationAct.actionValue === "boolean"
        ? null
        : "Relation action value must only be a boolean data type",
    ];

    return this.setValidity(validity);
  };
  static readonly requestDel = (id: string, type: 0 | 1): iValidityType => {
    const validity = [
      typeof id === "string" && id.length > 0
        ? null
        : "Request item id is invalid",
      type === 0 || type === 1 ? null : "Request Type is invalid",
    ];

    return this.setValidity(validity);
  };
  static readonly requestBody = (reqBody: iRequestBody): iValidityType => {
    const { type, recipientId, groupId } = reqBody;
    let validity: Array<null | string> = [
      type === 1 || type === 2 || type === 3
        ? null
        : "Request type can only be 1, 2, or 3",
    ];

    if (type !== 2) {
      validity.push(
        typeof recipientId === "string" && recipientId.length > 0
          ? null
          : "Group to User Request required Recipient ID"
      );
    } else {
      validity.push(
        !recipientId ? null : "User to Group request must not have Recipient ID"
      );
    }
    if (type !== 1) {
      validity.push(
        typeof groupId === "string" && groupId.length > 0
          ? null
          : "User to Group Request required Group ID"
      );
    } else {
      validity.push(
        !groupId ? null : "User to User request must not have group ID"
      );
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

    return this.setValidity(validity);
  };
  static readonly requestItem = (
    item: iRequest,
    wrapper: HTMLDivElement,
    type: "incoming" | "outgoing"
  ): iValidityType => {
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

    return this.setValidity(validity);
  };
  static readonly muteBlockItem = (
    item: iRelation,
    wrapper: HTMLDivElement,
    type: 0 | 1
  ): iValidityType => {
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

    return this.setValidity(validity);
  };
  static readonly patchRequestData = (
    patchRequest: iRequestBody,
    action: iRequestActions
  ): iValidityType => {
    const { type, recipientId, groupId } = patchRequest;

    const validity = [
      action === requestActions.approve ||
      action === requestActions.reject ||
      action === requestActions.cancel
        ? null
        : `Request action must only be ${requestActions.approve},${requestActions.reject}, or ${requestActions.cancel}`,
    ];

    if (type === 1 || type === 2 || type === 3) {
      if (type !== 2) {
        validity.push(
          typeof recipientId === "string" && recipientId.length > 0
            ? null
            : `Type: ${type} action requires Recipient ID`
        );
      } else {
        validity.push(
          !recipientId ? null : `Type: ${type} action requires no Recipient ID`
        );
      }
      if (type !== 1) {
        validity.push(
          typeof groupId === "string" && groupId.length > 0
            ? null
            : `Type: ${type} action requires Group ID`
        );
      } else {
        validity.push(
          !groupId ? null : `Type: ${type} action requires no Group ID`
        );
      }
    } else {
      validity.push("Action Type can only be 1, 2, or 3");
    }

    return this.setValidity(validity);
  };
  static readonly approveData = (data: iRequestApproveData): iValidityType => {
    const validity = [
      data.newStatus === "approved" ? null : "Status data is invalid",
    ];

    return this.setValidity(validity);
  };
  static readonly privacyData = (
    privacyData: iPrivacyRequest,
    prop: iUserPrivacyProp
  ): iValidityType => {
    const validity = [
      privacyData.property === prop ? null : `Privacy property must be ${prop}`,
      privacyData.value === "true" || privacyData.value === "false"
        ? null
        : "Privacy property value must be a stringified boolean",
    ];

    return this.setValidity(validity);
  };
  static readonly searchItem = (item: iSearchItem): iValidityType => {
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

    return this.setValidity(validity);
  };
  static readonly contactItem = (item: iRelation): iValidityType => {
    const validity = [
      typeof item.accnt_id === "string" && item.accnt_id.length > 0
        ? null
        : "Account ID is required for a search item",
      typeof item.accnt_name === "string" && item.accnt_name.length > 0
        ? null
        : "Account Name is required for a search item",
      item.type === chatType.user || item.type === chatType.group
        ? null
        : `Account Type must be either ${chatType.user} or ${chatType.group}`,
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

    return this.setValidity(validity);
  };
  static readonly newGroupInput = (grpBody: iNewGrpBody): iValidityType => {
    const { recipientId, grpName } = grpBody;
    const validity = [
      typeof recipientId === "string" && recipientId.length > 0
        ? null
        : "Recipient ID is required",
      typeof grpName === "string" && grpName.length > 0
        ? null
        : "Group name is required",
    ];

    return this.setValidity(validity);
  };
  static readonly setValidity = (
    validity: Array<null | string>
  ): iValidityType => {
    if (validity.join("")) {
      return { isValid: false, error: validity.filter((err) => err !== null) };
    } else {
      return { isValid: true, error: null };
    }
  };

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
  static httpRes(
    res: iHttpResponse,
    unknownErr: string,
    knownErr: string
  ): boolean {
    // VALIDATION: HTTP RESPONSE
    if (!res.data) {
      error.showComp(`ERROR: ${unknownErr}`, res.err);
      return false;
    }
    if (res.data.statusCode < 200 || res.data.statusCode >= 400) {
      error.showComp(`ERROR: ${knownErr}`, res.err);
      return false;
    }

    return true;
  }

  /**
   * This function returns a new or old instance of this function.
   *
   * @returns { Validate }
   */
  static readonly getInstance = (): Validate => {
    if (!this.instance) this.instance = new Validate();
    return this.instance;
  };
}
