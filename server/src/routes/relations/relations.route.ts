import { Router } from "express";
import { userNotLoggedErr } from "../../middleware/authorize.rmw.js";
import { getUserRelations, patchRelations } from "./relations.controller.js";

export const relations_router = Router();

relations_router.post("/", userNotLoggedErr, getUserRelations);
relations_router.patch("/", userNotLoggedErr, patchRelations);
