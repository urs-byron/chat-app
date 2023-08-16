import { Router } from "express";
import { userNotLoggedErr } from "../../middleware/authorize.rmw";
import { getChatMsgs, getTopChatMsg } from "./chat.controller";

export const chat_router = Router();

chat_router.post("/", userNotLoggedErr, getChatMsgs);
chat_router.get("/:id", userNotLoggedErr, getTopChatMsg);
