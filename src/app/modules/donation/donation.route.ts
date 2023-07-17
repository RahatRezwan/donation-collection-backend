import express from 'express';
import { DonationController } from './donation.controller';
import validateRequest from '../../middleware/validateRequest';
import { DonationValidation } from './donation.validation';

const router = express.Router();

/* create donation */
router.post(
   '/create-donation',
   validateRequest(DonationValidation.createDonationZodSchema),
   DonationController.createDonation,
);

/* get all donations */
router.get('/', DonationController.getAllDonations);

/* update single donation */
router.patch(
   '/:id',
   validateRequest(DonationValidation.updateDonationZodSchema),
   DonationController.updateSingleDonation,
);

/* delete single donation */
router.delete('/:id', DonationController.deleteSingleDonation);

/* get donation by donor */
router.get('/:donorId', DonationController.getDonationsByDonor);

export const DonationRoutes = router;
