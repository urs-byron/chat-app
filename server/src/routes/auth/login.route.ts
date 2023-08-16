import passport from "passport";
import { Router } from "express";
import { postLoginLocal } from "./login.controller.js";

export const login_router = Router();

// ------ LOGIN AUTHENTICATION STRATEGIES
// --- LOCAL STRATEGY ROUTE
login_router.post("/", passport.authenticate("local"), postLoginLocal);

// --- GOOGLE STRATEGY ROUTE
login_router.get(
  "/google",

  passport.authenticate("google", { scope: ["email"] })
);
// --- GOOGLE STRATEGY CALLBACK ROUTE
login_router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
    session: true,
  })
);

// --- FACEBOOK STRATEGY ROUTE
login_router.get("/facebook", passport.authenticate("facebook"));
// --- FACEBOOK STRATEGY CALLBACK ROUTE
login_router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/",
    session: true,
  })
);

// --- GITHUB STRATEGY ROUTE
login_router.get("/github", passport.authenticate("github"));
// --- GITHUB STRATEGY CALLBACK ROUTE
login_router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/",
    session: true,
  })
);
