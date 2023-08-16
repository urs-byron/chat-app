import { Router } from "express";
import { postUserSearch } from "./search.controller";

export const search_router = Router();

search_router.post("/", postUserSearch);
