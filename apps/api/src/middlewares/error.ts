import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import envConfig from "../configs/envConfig";
import logger from "../configs/logger";
import ApiError from "../utils/ApiError";

export const errorConverter: ErrorRequestHandler = (error, _req, _res, next) => {
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode // || error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    const customMessage = message;
    error = new ApiError(statusCode, message, false, error.stack, customMessage);
  };
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const { statusCode, message, customMessage } = err;
  // if (envVars.NODE_ENV === 'prod' && !err.isOperational) {
  //   statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  //   message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  // }

  logger.debug(err);
  res.locals.errorMessage = err.message;
  const response = {
    status: statusCode,
    message,
    customMessage,
    ...(envConfig.NODE_ENV !== 'prod' && { stack: err.stack})
  };
  console.log(response);

  if(envConfig.NODE_ENV !== 'prod') {
    logger.error(err);
  };
  res.status(statusCode).send(response);
}