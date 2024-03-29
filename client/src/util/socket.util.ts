import { Socket, io } from "socket.io-client";
import { MessageEvent } from "../socket/message.events";
import { RequestEvents } from "../socket/request.events";
import { RelationEvent } from "../socket/relation.events";

/** This class holds event and callback configuration for Socket events. */
export class SocketMethods {
  private static instance: SocketMethods;
  static socket: Socket | null;

  static readonly postRequestEv = "postRequest";
  static readonly postRequestRev = "postRequestR";
  static readonly patchRequestEv = "patchRequest";
  static readonly patchRequestRev = "patchRequestR";
  static readonly patchRelationEv = "patchRelation";
  static readonly patchRelationRev = "patchRelationR";
  static readonly postMessageEv = "postMessage";
  static readonly postMessageRev = "postMessageR";
  static readonly joinRoomEv = "joinRoom";
  static readonly joinRoomsEv = "joinRooms";

  static readonly serverErrRev = "serverErrR";

  private constructor() {}

  /** This function:
   * - connects the client to the server via socket
   * - instantiates a new client socket class
   * - prepares socket events
   */
  static readonly init = () => {
    this.socket = io("https://localhost:8000");
    SocketMethods.get();
    SocketMethods.configureSocket(this.socket);
  };

  static readonly configureSocket = (soc: Socket): void => {
    SocketMethods.configConnEv(soc);
    SocketMethods.configRequestEv(soc);
    SocketMethods.configRelationEv(soc);
    SocketMethods.configMessageEv(soc);

    SocketMethods.configErrEv(soc);
  };

  static readonly configConnEv = (soc: Socket): void => {
    soc.on("connect", () => {
      console.log(`${this.socket!.id} contected to server`);
    });
  };

  static readonly configRequestEv = (soc: Socket): void => {
    soc.on(this.postRequestRev, RequestEvents.postRequestR);
    soc.on(this.patchRequestRev, RequestEvents.patchRequestR);
  };

  static readonly configRelationEv = (soc: Socket): void => {
    soc.on(this.patchRelationEv, RelationEvent.patchRelation);
  };

  static readonly configMessageEv = (soc: Socket): void => {
    soc.on(this.postMessageRev, MessageEvent.postMessageR);
  };

  static readonly configErrEv = (soc: Socket): void => {
    soc.on(this.serverErrRev, (err) => {
      console.error(err);
    });
  };

  /** This function disconnects client from any connected rooms and server socket connection. */
  static readonly destroy = () => {
    this.socket!.disconnect();
    console.log(`${this.socket!.id} user disconnected to server`);
    this.socket = null;
  };

  /** This function returns a new or old instance of the class. */
  static readonly get = (): SocketMethods => {
    if (!this.instance) this.instance = new SocketMethods();
    return this.instance;
  };
}
