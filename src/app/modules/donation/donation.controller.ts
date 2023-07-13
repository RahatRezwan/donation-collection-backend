import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { DonationService } from './donation.service';
import { Request, Response } from 'express';

// create donation
const createDonation = catchAsync(async (req: Request, res: Response) => {
   const { ...donationData } = req.body;
   const donation = await DonationService.createDonation(donationData);

   sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Donation created successfully',
      data: donation,
   });
});

// get all donations
const getAllDonations = catchAsync(async (req: Request, res: Response) => {
   const donations = await DonationService.getAllDonations();

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donations fetched successfully',
      data: donations,
   });
});

// get single donation
const getSingleDonation = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const donation = await DonationService.getSingleDonation(id);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation fetched successfully',
      data: donation,
   });
});

// update single donation
const updateSingleDonation = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const { ...updateData } = req.body;
   const donation = await DonationService.updateSingleDonation(id, updateData);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation updated successfully',
      data: donation,
   });
});

// delete single donation
const deleteSingleDonation = catchAsync(async (req: Request, res: Response) => {
   const { id } = req.params;
   const donation = await DonationService.deleteSingleDonation(id);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation deleted successfully',
      data: donation,
   });
});

// get donations by donor
const getDonationsByDonor = catchAsync(async (req: Request, res: Response) => {
   const { donorId } = req.params;
   const donations = await DonationService.getDonationsByDonor(donorId);

   sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donations fetched successfully',
      data: donations,
   });
});

export const DonationController = {
   createDonation,
   getAllDonations,
   getSingleDonation,
   updateSingleDonation,
   deleteSingleDonation,
   getDonationsByDonor,
};
