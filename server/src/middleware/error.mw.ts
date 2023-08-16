import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err) {
    console.log(`\n--------- ERROR ---------`);
    console.log(err);
    console.log(`-------------------------\n`);

    res.status(err.statusCode ? err.statusCode : 400).json(err);
  }
};
