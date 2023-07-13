import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { DonationTypeService } from './donationType.service';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';

/* create donation type */
const createDonationType = catchAsync(async (req: Request, res: Response) => {
   const { ...donationTypeData } = req.body;
   const donationType = await DonationTypeService.createDonationType(donationTypeData);

   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Donation type created successfully',
      data: donationType,
   });
});

// get all donationTypes
const getAllDonationTypes = catchAsync(async (req: Request, res: Response) => {
   const donationTypes = await DonationTypeService.getAllDonationTypes();

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation types fetched successfully',
      data: donationTypes,
   });
});

// get single donationType
const getSingleDonationType = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const donationType = await DonationTypeService.getSingleDonationType(id);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation type fetched successfully',
      data: donationType,
   });
});

// update single donationType
const updateSingleDonationType = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const { ...updateData } = req.body;
   const donationType = await DonationTypeService.updateSingleDonationType(id, updateData);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation type updated successfully',
      data: donationType,
   });
});

// delete single donationType
const deleteSingleDonationType = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const donationType = await DonationTypeService.deleteSingleDonationType(id);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation type deleted successfully',
      data: donationType,
   });
});

export const DonationTypeController = {
   createDonationType,
   getAllDonationTypes,
   getSingleDonationType,
   updateSingleDonationType,
   deleteSingleDonationType,
};
