import { RequestHandler } from "express";

export const postLoginLocal: RequestHandler = (req, res, next) => {
  return res.status(200).json({ statusCode: 200, data: null });
};
