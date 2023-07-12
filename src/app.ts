import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import routes from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
const app: Application = express();

//import router

/* Middleware & CORS*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use('/api/v1', routes);

app.use(globalErrorHandler);

//handle not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Route not found',
      errorMessages: [
         {
            path: req.originalUrl,
            message: 'Route not found',
         },
      ],
   });
   next();
});
export default app;
