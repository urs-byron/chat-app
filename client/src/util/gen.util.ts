import { tryCatch } from "./asyncWrap.util";
import { httpGetAuth } from "../hooks/requests.hook";
import { AppComponent } from "../components/app.comp";
import { SocketMethods } from "./socket.util";
import { iHttpResponse } from "../models/http.model";
import { UserComponent } from "../components/user.comp";
import { PeerComponent } from "../components/peer.comp";
import { ErrorComponent } from "../components/error.comp";
import { iRelation, iRequest } from "../models/user.model";

export class GenUtil {
  private static inst: GenUtil;

  private constructor() {}

  static readonly requestStrIntToBool = (obj: any): iRequest => {
    if (obj.isGroup === "0" || obj.isGroup === 0) {
      obj.isGroup = false;
    } else if (obj.isGroup === "1" || obj.isGroup === 1) {
      obj.isGroup = true;
    }

    return obj;
  };

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

  static readonly milliToTime: (milliseconds: number) => string = (
    milliseconds
  ) => {
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

  static readonly logUser = async (e?: Event): Promise<void> => {
    const appComp = AppComponent.getInstance();
    let response!: iHttpResponse;

    try {
      response = await tryCatch(httpGetAuth);

      if (response.data) {
        if (response.data.statusCode >= 200 && response.data.statusCode < 400) {
          // INSTANTIATE COMPONENTS
          PeerComponent.getInstance(false, response.data.data);
          UserComponent.getInstance(false);

          // EDIT
          appComp.appUser();

          SocketMethods.init();
        } else {
          appComp.appAuth();
          ErrorComponent.showComp(
            "ERROR: server responded with an error from client's authentication",
            JSON.stringify(response.data.data)
          );
          return;
        }
      } else {
        ErrorComponent.showComp(
          "ERROR: upon user's request for authentication"
        );
        return;
      }
    } catch (err) {
      console.error("ERROR: client is unable to request for authentication");
      console.error(err);
    }
  };

  static readonly getInst: () => GenUtil = (): GenUtil => {
    if (!this.inst) this.inst = new GenUtil();
    return this.inst;
  };
}
