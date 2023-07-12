/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-undefined */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import ApiError from '../../errors/ApiError';
import config from '../../config';
import { IGenericErrorMessage } from '../interfaces/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
   config.env === 'development'
      ? console.log(`Global Error Handler: ${error}`)
      : console.error(error);

   let statusCode = 500;
   let message = 'Something went wrong !';
   let errorMessages: IGenericErrorMessage[] = [];

   if (error instanceof ZodError) {
      const simplifiedError = handleZodError(error);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message;
      errorMessages = simplifiedError.errorMessages;
   } else if (error instanceof ApiError) {
      statusCode = error?.statusCode;
      message = error?.message;
      errorMessages = error?.message ? [{ path: '', message: error?.message }] : [];
   } else if (error instanceof Error) {
      message = error?.message;
      errorMessages = error?.message ? [{ path: '', message: error?.message }] : [];
   }

   res.status(statusCode).json({
      success: false,
      message,
      errorMessages,
      stack: config.env !== 'production' ? error?.stack : undefined,
   });

   next();
};

export default globalErrorHandler;
