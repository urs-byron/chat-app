import { Server } from "node:https";
import { RedisMethods } from "../services/redis.srvcs.js";
import { SocketMethods } from "../services/socket.srvcs.js";
import { MongoDBMethods } from "../services/mongo.srvcs.js";

// CONNECTS TO DBs, SOCKET, THEN STARTS THE SERVER

/** This class holds functions which manages the steps of starting & stopping the server. */
export class ServerMethods {
  private static instance: ServerMethods;
  private static server: Server;

  private constructor() {}

  /**
   * This function manages the logic pertaining the pre- and post- start of server.
   *
   * @param { Server } server
   */
  static async startServer(server: Server): Promise<void> {
    this.server = server;

    MongoDBMethods.init();
    RedisMethods.init();
    await MongoDBMethods.connect();
    await RedisMethods.connect();

    // await MongoDBMethods.flush();
    // await RedisMethods.client.flushAll();

    server.listen(process.env.SERVER_M1_PORT, (): void => {
      console.log(`Server @ ${process.env.SERVER_M1_PORT} ...`);
    });

    SocketMethods.init(server);
  }

  /** This function manages the logic before total server closing. */
  static async stopServer() {
    await Promise.all([RedisMethods.disconnect(), MongoDBMethods.disconnect()]);
  }

  static getInst(): ServerMethods {
    if (!this.instance) this.instance = new ServerMethods();
    return this.instance;
  }
}
