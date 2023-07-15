import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../../config';
import { ILoginUserResponse } from './auth.interface';

/* login user */
const loginUser = catchAsync(async (req: Request, res: Response) => {
   const { ...loginData } = req.body;
   const result = await AuthService.loginUser(loginData);

   const { refreshToken, ...other } = result;

   // Set refresh token in cookie
   const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
   };
   res.cookie('refreshToken', refreshToken, cookieOptions);

   sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      message: 'User logged in successfully',
      success: true,
      data: other,
   });
});

//refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
   const { refreshToken } = req.cookies;
   const result = await AuthService.refreshToken(refreshToken);

   // Set refresh token in cookie
   const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
   };
   res.cookie('refreshToken', refreshToken, cookieOptions);

   sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      message: 'User logged in successfully',
      success: true,
      data: result,
   });
});

export const AuthController = { loginUser, refreshToken };
