import { Router } from "express";
import { unavailableRoute } from "./error.controller";

export const error_router: Router = Router();

error_router.get("/*", unavailableRoute);
