import { Router } from "express";
import { userNotLoggedErr } from "../../middleware/authorize.rmw.js";
import { postRequest, patchRequest } from "./request.controller.js";

export const request_router = Router();

request_router.post("/", userNotLoggedErr, postRequest);
request_router.patch("/:action", userNotLoggedErr, patchRequest);
