import { Router } from "express";
import { userNotLoggedErr } from "../../middleware/authorize.rmw";
import { postRequest, patchRequest } from "./request.controller";

export const request_router = Router();

request_router.post("/", userNotLoggedErr, postRequest);
request_router.patch("/:action", userNotLoggedErr, patchRequest);
