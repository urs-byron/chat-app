import { Router } from "express";
import { getLougOut } from "./logout.controller";

export const logout_router = Router();

// ------ LOGOUT ROUTE
logout_router.get("/", getLougOut);
