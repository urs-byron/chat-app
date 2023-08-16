import "dotenv/config";

import https from "node:https";
import process from "node:process";

import { app_e1 } from "./app.js";
import { ServerMethods } from "./config/server.config.js";
import { SocketMethods } from "./services/socket.srvcs.js";
import { SSL_KEYS, terminationSignals } from "./global/httpsOptions.global.js";

const server_m1: https.Server = https.createServer(SSL_KEYS, app_e1);

// SERVER START
(async function () {
  await ServerMethods.startServer(server_m1);
})();

// SERVER TERMINATION
process.stdin.resume();

terminationSignals.forEach(function (sig) {
  process.on(sig, exitHandler.bind(null));
});

async function exitHandler(sig: string) {
  console.log("------------------------------");
  console.log(sig, "Event");

  // try {
  //   await ServerMethods.stopServer();
  // } catch (err) {
  //   console.error("server failed to execute cleanup");
  //   console.error(err);
  // }

  SocketMethods.socketServer.close(() => {
    console.log("Socket.io is closed");
    server_m1.close(() => {
      console.log("Server is closed");
      process.exit(0);
    });
  });
}
