import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.config';
import { AppError } from '../utils/errors/app.error';

export const appErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    error: err
  });
};

export const genericErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info(err);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
};
