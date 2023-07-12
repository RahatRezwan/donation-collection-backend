import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { UserService } from './user.service';
import { IUser } from './user.interface';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
   const users = await UserService.getAllUsers();
   //get all users from db
   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully',
      data: users,
   });
});

export const UserController = {
   getAllUsers,
};
