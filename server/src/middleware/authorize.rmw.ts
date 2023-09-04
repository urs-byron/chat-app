import { iUser } from "../models/user.imodel";
import { newApiError } from "../global/httpErrors.global";
import { RequestHandler } from "express";

export const userLoggedErr: RequestHandler = async (req, res, next) => {
  // COOKIE-SESSION DECRYPTS AND ENCRYPTS RESPONSE AND REQUEST COOKIE TO POPULATE req.session
  if (req.user ? Object.keys(req.user as iUser).length : false) {
    const err = newApiError(400, "logged account present");
    // PER OBSERVATION, PROVIDING AN ERROR IN THE next() IMMEDIATELY CALLS THE ERRORHANDLER MIDDLEWARE
    next(err);
  } else {
    next();
  }
};

export const userNotLoggedErr: RequestHandler = (req, res, next) => {
  if (req.user ? Object.keys(req.user as iUser).length : false) {
    next();
  } else {
    const err = newApiError(400, "no account present");
    next(err);
  }
};
