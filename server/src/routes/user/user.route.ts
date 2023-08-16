import { Router } from "express";
import { getUser } from "./user.controller";
import {
  userLoggedErr,
  userNotLoggedErr,
} from "../../middleware/authorize.rmw";
import { search_router } from "./search.route";
import { settings_router } from "./settings.route";

export const user_router = Router();

user_router.use("/search", userNotLoggedErr, search_router);
user_router.use("/settings", userNotLoggedErr, settings_router);
user_router.get("/", userNotLoggedErr, getUser);
