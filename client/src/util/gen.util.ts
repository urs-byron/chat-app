import { tryCatch } from "./asyncWrap.util";
import { httpGetAuth } from "../hooks/requests.hook";
import { AppComponent } from "../components/app.comp";
import { SocketMethods } from "./socket.util";
import { iHttpResponse } from "../models/http.model";
import { UserComponent } from "../components/user.comp";
import { PeerComponent } from "../components/peer.comp";
import { ErrorComponent } from "../components/error.comp";
import { iRelation, iRequest } from "../models/user.model";

/** Thi class holds a variety of helper functions used throughout the client code base. */
export class GenUtil {
  private static inst: GenUtil;

  private constructor() {}

  /**
   * This function transforms an iRequest object retrieved from a redis.
   *
   * @param { any } obj
   * @returns { iRequest }
   *
   * @static
   */
  static readonly requestStrIntToBool = (obj: any): iRequest => {
    if (obj.isGroup === "0" || obj.isGroup === 0) {
      obj.isGroup = false;
    } else if (obj.isGroup === "1" || obj.isGroup === 1) {
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
  static readonly relationStrIntToBool = (obj: any): iRelation => {
    if (obj.admin === "0" || obj.admin === 0) {
      obj.admin = false;
    } else if (obj.admin === "1" || obj.admin === 1) {
      obj.admin = true;
    }
    if (obj.block === "0" || obj.block === 0) {
      obj.block = false;
    } else if (obj.block === "1" || obj.block === 1) {
      obj.block = true;
    }
    if (obj.mute === "0" || obj.mute === 0) {
      obj.mute = false;
    } else if (obj.mute === "1" || obj.mute === 1) {
      obj.mute = true;
    }
    if (obj.archive === "0" || obj.archive === 0) {
      obj.archive = false;
    } else if (obj.archive === "1" || obj.archive === 1) {
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
  static readonly milliToTime: (milliseconds: number) => string = (
    milliseconds
  ) => {
    /** Data Gathering
     * - Transforms millisecond into hours, minutes, & seconds.
     */
    const date = new Date(milliseconds);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Add leading zeros if needed
    const halfDayHrs: number = hours % 12;
    const timePeriod: "AM" | "PM" = Math.ceil(hours / 12) === 1 ? "AM" : "PM";
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
  static readonly logUser = async (e?: Event): Promise<boolean> => {
    /** DATA GATHERING
     * - Prepares chat application component.
     */
    const appComp = AppComponent.getInstance();

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
    let response!: iHttpResponse;
    try {
      response = await tryCatch(httpGetAuth);
    } catch (err) {
      ErrorComponent.showComp(
        "ERROR: client is unable to request for authentication",
        err
      );
      return false;
    }

    /**
     * VALIDATION: HTTP RESPONSE
     * - Immediately returns upon invalid response.
     */
    if (
      (response.err !== null && response.err !== undefined) ||
      !("statusCode" in response.data)
    ) {
      appComp.appAuth();
      return false;
    }

    /** - Create instances of required initial components */
    PeerComponent.getInstance(false, response.data.data);
    UserComponent.getInstance(false);

    appComp.appUser();

    SocketMethods.init();

    return true;
  };

  /**
   * Returns an instance of the GenUtil class.
   * @returns {GenUtil}
   *
   * @static
   */
  static readonly getInst: () => GenUtil = (): GenUtil => {
    if (!this.inst) this.inst = new GenUtil();
    return this.inst;
  };
}
