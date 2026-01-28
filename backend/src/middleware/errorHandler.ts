import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/appError";
import { ApiResponse } from "../utils/response";
import logger from "../utils/logger";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    statusCode = 400;
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    message = `Duplicate field value: ${value}. Please use another value!`;
  }

  if (statusCode === 500) {
    logger.error(err);
  } else {
    logger.warn(`An Error Occured: ${message}`);
  }

  res
    .status(statusCode)
    .json(
      ApiResponse.error(
        message,
        process.env.NODE_ENV === "development" ? err : undefined,
      ),
    );
};

export default errorHandler;
