import { RequestHandler } from "express";

import { newApiError } from "../../global/httpErrors.global.js";

export const unavailableRoute: RequestHandler = (req, res, next) => {
  const err = newApiError(404, "Page Not Found");
  res.status(404).json(err);
};
