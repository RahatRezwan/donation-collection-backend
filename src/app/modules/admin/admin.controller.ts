import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import catchAsync from '../../shared/catchAsync';
import { AdminService } from './admin.service';
import { Request, Response } from 'express';

/* get all admins */
const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
   const admins = await AdminService.getAllAdmins();

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admins fetched successfully',
      data: admins,
   });
});

/* get single admin */
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
   const adminId = req.params.id;
   const admin = await AdminService.getSingleAdmin(adminId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin fetched successfully',
      data: admin,
   });
});

/* update single admin */
const updateSingleAdmin = catchAsync(async (req: Request, res: Response) => {
   const adminId = req.params.id;
   const updateData = req.body;
   const admin = await AdminService.updateSingleAdmin(adminId, updateData);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully',
      data: admin,
   });
});

/* delete single admin */
const deleteSingleAdmin = catchAsync(async (req: Request, res: Response) => {
   const adminId = req.params.id;
   const admin = await AdminService.deleteSingleAdmin(adminId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted successfully',
      data: admin,
   });
});

export const AdminController = {
   getAllAdmins,
   getSingleAdmin,
   updateSingleAdmin,
   deleteSingleAdmin,
};
