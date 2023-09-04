import { Router } from "express";
import { getGroup, getGroups, postGroup } from "./group.controller";

export const group_router = Router();

group_router.get("/:groupId", getGroup);
group_router.get("/", getGroups);
group_router.post("/", postGroup);
