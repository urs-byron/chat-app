import { Router } from "express";
import { putUserPrivacy, putUserPassword } from "./settings.controller";

export const settings_router = Router();

settings_router.put("/", putUserPrivacy);
settings_router.put("/password", putUserPassword);
