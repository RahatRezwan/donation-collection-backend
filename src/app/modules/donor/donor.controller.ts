import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { DonorService } from './donor.service';

/* get all donors */
const getAllDonors = catchAsync(async (req: Request, res: Response) => {
   const donors = await DonorService.getAllDonors();

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donors fetched successfully',
      data: donors,
   });
});

/* get single donor */
const getSingleDonor = catchAsync(async (req: Request, res: Response) => {
   const donorId = req.params.id;
   const donor = await DonorService.getSingleDonor(donorId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donor fetched successfully',
      data: donor,
   });
});

/* update single donor */
const updateSingleDonor = catchAsync(async (req: Request, res: Response) => {
   const donorId = req.params.id;
   const updateData = req.body;
   const donor = await DonorService.updateSingleDonor(donorId, updateData);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donor updated successfully',
      data: donor,
   });
});

/* delete single donor */
const deleteSingleDonor = catchAsync(async (req: Request, res: Response) => {
   const donorId = req.params.id;
   const donor = await DonorService.deleteSingleDonor(donorId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donor deleted successfully',
      data: donor,
   });
});

export const DonorController = {
   getAllDonors,
   getSingleDonor,
   updateSingleDonor,
   deleteSingleDonor,
};
