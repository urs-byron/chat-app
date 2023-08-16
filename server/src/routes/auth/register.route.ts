import express, { Router } from "express";
import { postRegister } from "./register.controller.js";

const register_router: express.Router = Router();

register_router.post("/", postRegister);

export { register_router };
