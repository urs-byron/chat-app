// ---------------------
// ------ IMPORTS ------
// ---------------------
import "express-async-errors";

import cors from "cors";
import path from "node:path";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";

// ----------------------------
// ------ CUSTOM IMPORTS ------
// ----------------------------
// --- cstm-CONFIGURATIONS
import "./config/passport.config";

// --- cstm-UTILITIES

// --- cstm-OPTIONS
import { cors_opts } from "./global/cors.global";
import { cookie_opts } from "./global/cookie.global";

// --- cstm-MIDDLEWARES
import { errorHandler } from "./middleware/error.mw";

// --- cstm-ROUTERS
import { v1_router } from "./routes/v/v.route";

// ---------------------------
// ------ EXPRESS SETUP ------
// ---------------------------
// --- exp-SERVER VARIABLES
export const app_e1 = express();

// --- exp-SESSION
export const cookieMiddleware = cookieSession(cookie_opts);

// --- exp-PARSING
app_e1.use(cookieParser());
app_e1.use(express.json());
app_e1.use(express.urlencoded({ extended: false }));

// --- exp-PUBLIC
app_e1.use(express.static(path.resolve(__dirname, "..", "public")));

// --- exp-MIDDLEWARES --- EDIT
app_e1.use(helmet());
app_e1.use(cors(cors_opts));
app_e1.use(morgan("combined"));
app_e1.use(cookieMiddleware);
app_e1.use(passport.initialize());
app_e1.use(passport.session());

// --- exp-ROUTERS
app_e1.use("/1", v1_router);

app_e1.get("/*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "..", "public", "index.html"));
});

// --- exp-ERRORHANDLER
app_e1.use(errorHandler);
