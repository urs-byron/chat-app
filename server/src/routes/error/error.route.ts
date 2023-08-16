import { Router } from "express";
import { unavailableRoute } from "./error.controller.js";

export const error_router: Router = Router();

error_router.get("/*", unavailableRoute);
