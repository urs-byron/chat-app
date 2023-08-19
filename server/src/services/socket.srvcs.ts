import passport from "passport";

import { iUser, iUserDoc } from "../models/user.imodel";
import { APIError, newApiError } from "../global/httpErrors.global";
import { cookieMiddleware } from "../app";
import { Server as NodeServer } from "node:https";
import { RedisMethods as redis } from "./redis.srvcs";
import { socketUserNotLoggedErr } from "../middleware/authorize.smw";
import { Server as SocketServer, Socket } from "socket.io";
import { postRequest, patchRequest } from "../events/request.event";
import {
  iGenRequestActions,
  iGenRequestBody,
  iRelation,
} from "../models/gen.imodel";
import { postMessage } from "../events/chat.event";
import { iChatType, iMsgBody } from "../models/chat.imodel";

export class SocketMethods {
  private static instance: SocketMethods;
  private static socket: Socket;
  static socketServer: SocketServer;
  private static nodeServer: NodeServer;

  // SOCKET EVENTS
  static readonly postRequestEv = "postRequest";
  static readonly postRequestRev = "postRequestR";
  static readonly patchRequestEv = "patchRequest";
  static readonly patchRequestRev = "patchRequestR";
  static readonly postMessageEv = "postMessage";
  static readonly postMessageRev = "postMessageR";
  static readonly joinRoomEv = "joinRoom";
  static readonly joinRoomsEv = "joinRooms";
  static readonly serverErrRev = "serverErrR";

  private readonly socketWrap =
    (middleware: any) => (socket: Socket, next: any) =>
      middleware(socket.request, {}, next);

  private constructor() {
    this.configureSocketServer();
    console.log("Server -><- Socket.io");
  }

  // SOCKET CONFIGURATION
  private readonly configureSocketServer: () => void = () => {
    SocketMethods.socketServer = new SocketServer(SocketMethods.nodeServer);

    // MIDDLEWARE

    // --- COOKIE MW
    SocketMethods.socketServer.use(this.socketWrap(cookieMiddleware));
    // --- PASSPORT MW
    SocketMethods.socketServer.use(this.socketWrap(passport.initialize()));
    SocketMethods.socketServer.use(this.socketWrap(passport.session()));
    // --- AUTHORIZARION MW
    SocketMethods.socketServer.use(socketUserNotLoggedErr);

    SocketMethods.socketServer.on("connect", async (soc: Socket) => {
      const user = (soc.request as any).user as iUser;
      this.serverOnConnect(soc, user.act_id.accnt_id);

      soc.on("disconnect", async () => {
        await this.serverOnDisconnect(user.act_id.accnt_id);
      });

      // EVENTS
      SocketMethods.connectSocketToRooms(soc);
      SocketMethods.socketRequestEv(soc);
      SocketMethods.socketMessageEv(soc);
    });
  };

  // SOCKET EVENTS
  // --- CONNECTION EVENTS
  private readonly serverOnConnect: (soc: Socket, userId: string) => void =
    async (soc, userId) => {
      const tx = redis.client.multi();
      tx.set(redis.userSessionName(userId), soc.id);
      // tx.expire(redis.userSessionName(userId), redis.days(3));

      try {
        await tx.exec();

        console.log(
          `------------------------\n${userId} connected\n------------------------\n`
        );
      } catch (err) {
        console.error(
          newApiError(500, "server is unable to cache session", err)
        );
      }
    };
  private readonly serverOnDisconnect: (userId: string) => Promise<void> =
    async (userId) => {
      try {
        await redis.client.del(redis.userSessionName(userId));

        console.log(
          `------------------------\n${userId} disconnected\n------------------------\n`
        );
      } catch (err) {
        const new_err = newApiError(
          500,
          "server is unable to delete cache session",
          err
        );
        console.error(new_err);
        return;
      }
    };
  static readonly disconnect: () => void = () => {
    this.socketServer.close(() => {
      console.log("Server <--> Socket.io");
    });
  };

  // --- JOIN ROOMS
  static readonly connectSocketToRooms: (soc: Socket) => void = (soc) => {
    soc.on(SocketMethods.joinRoomEv, (data: string, cb) => {
      soc.join(data);
      cb("connected to room");
    });
    soc.on(SocketMethods.joinRoomsEv, (data: string[], cb) => {
      let rel: string;
      for (rel of data) soc.join(rel);
      cb("connected to rooms");
    });
  };

  // --- REQUEST EVENTS
  static readonly socketRequestEv: (soc: Socket) => void = (soc) => {
    soc.on(SocketMethods.postRequestEv, async (data: iGenRequestBody) => {
      await postRequest(data, soc, SocketMethods.socketServer.sockets.sockets);
    });
    soc.on(
      SocketMethods.patchRequestEv,
      async (data: iGenRequestBody, action: iGenRequestActions) => {
        await patchRequest(
          data,
          action,
          soc,
          SocketMethods.socketServer.sockets.sockets
        );
      }
    );
  };

  // --- MESSAGE EVENTS
  static readonly socketMessageEv: (soc: Socket) => void = (soc) => {
    soc.on(
      SocketMethods.postMessageEv,
      async (data: iMsgBody, recipientId: string, type: iChatType, cb) => {
        const res = await postMessage(data, recipientId, type, soc);

        cb(res);

        if (res instanceof APIError || res instanceof Error) return;

        soc.to(data.chatId).emit(SocketMethods.postMessageRev, res);
      }
    );
  };

  // UTIL
  static readonly getSocket: () => Socket = () => {
    return this.socket;
  };
  static readonly init: (server: NodeServer) => SocketMethods = (server) => {
    this.nodeServer = server;
    if (!this.instance) this.instance = new SocketMethods();
    return this.instance;
  };
}
