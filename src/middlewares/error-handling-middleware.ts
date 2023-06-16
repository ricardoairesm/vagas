import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError } from '../types/users.ts';

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {

  if (err.name === 'ConflictError' || err.name === 'DuplicatedNameError') {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
