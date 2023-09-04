import { iUser } from "../models/user.imodel";
import { Socket } from "socket.io";
import { newApiError } from "../global/httpErrors.global";
import { ExtendedError } from "socket.io/dist/namespace";
import { SocketMethods } from "../services/socket.srvcs";

export type SocketHandler = (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => void;

export const socketUserNotLoggedErr: SocketHandler = (socket, next) => {
  if (
    ((socket.request as any).user as iUser)
      ? Object.keys((socket.request as any).user as iUser).length
      : false
  ) {
    next();
  } else {
    return socket.emit(
      SocketMethods.serverErrRev,
      newApiError(403, "server found no account logged")
    );
  }
};

export const socketUserLoggedErr: SocketHandler = async (socket, next) => {
  // COOKIE-SESSION DECRYPTS AND ENCRYPTS RESPONSE AND REQUEST COOKIE TO POPULATE req.session
  if (
    ((socket.request as any).user as iUser)
      ? Object.keys((socket.request as any).user as iUser).length
      : false
  ) {
    return socket.emit(
      SocketMethods.serverErrRev,
      newApiError(400, "server found account already present")
    );
  } else {
    next();
  }
};
