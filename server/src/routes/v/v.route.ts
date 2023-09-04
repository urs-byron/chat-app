import { Router } from "express";
import { auth_router } from "../auth/auth.route";
import { user_router } from "../user/user.route";
import { chat_router } from "../chat/chat.route";
import { group_router } from "../group/group.route";
import { request_router } from "../request/request.route";
import { relations_router } from "../relations/relations.route";

export const v1_router = Router();

v1_router.use("/auth", auth_router);
v1_router.use("/user", user_router);
v1_router.use("/chat", chat_router);
v1_router.use("/group", group_router);
v1_router.use("/relation", relations_router);
// v1_router.use("/request", request_router);
