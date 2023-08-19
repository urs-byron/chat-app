import { Server } from "node:https";
import { RedisMethods } from "../services/redis.srvcs.js";
import { SocketMethods } from "../services/socket.srvcs.js";
import { MongoDBMethods } from "../services/mongo.srvcs.js";

// CONNECTS TO DBs, SOCKET, THEN STARTS THE SERVER
export class ServerMethods {
  private static instance: ServerMethods;
  private static server: Server;

  private constructor() {}

  private configureServer() {
    ServerMethods.server.on("close", () => {});
  }

  static async startServer(server: Server): Promise<void> {
    this.server = server;

    MongoDBMethods.init();
    RedisMethods.init();
    SocketMethods.init(server);
    await MongoDBMethods.connect();
    await RedisMethods.connect();

    // await MongoDBMethods.flush();
    // await RedisMethods.client.flushAll();

    server.listen(process.env.SERVER_M1_PORT, (): void => {
      console.log(`Server @ ${process.env.SERVER_M1_PORT} ...`);
    });

    // UTILITY
  }

  // static async stopServer(err: any): Promise<void> {
  static async stopServer() {
    await Promise.all([RedisMethods.disconnect(), MongoDBMethods.disconnect()]);
  }

  static getInst(): ServerMethods {
    if (!this.instance) this.instance = new ServerMethods();
    return this.instance;
  }
}
