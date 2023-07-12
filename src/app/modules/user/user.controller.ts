import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { UserService } from './user.service';

/* create donor */
const createDonor = catchAsync(async (req: Request, res: Response) => {
   const { donor, ...userData } = req.body;
   const donorCreated = await UserService.createDonor(donor, userData);

   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Donor created successfully',
      data: donorCreated,
   });
});

/* create admin */
const createAdmin = catchAsync(async (req: Request, res: Response) => {
   const { admin, ...userData } = req.body;
   const adminCreated = await UserService.createAdmin(admin, userData);

   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Admin created successfully',
      data: adminCreated,
   });
});

/* get all users */
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
   const users = await UserService.getAllUsers();

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users fetched successfully',
      data: users,
   });
});

export const UserController = {
   createDonor,
   createAdmin,
   getAllUsers,
};
