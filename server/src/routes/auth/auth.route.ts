import { Router } from "express";
import { getAuth } from "./auth.controller";
import { login_router } from "./login.route";
import { logout_router } from "./logout.route";
import { register_router } from "./register.route";
import {
  userLoggedErr,
  userNotLoggedErr,
} from "../../middleware/authorize.rmw";

export const auth_router = Router();

auth_router.use("/register", userLoggedErr, register_router);
auth_router.use("/login", userLoggedErr, login_router);
auth_router.use("/logout", userNotLoggedErr, logout_router);

auth_router.get("/", getAuth);
