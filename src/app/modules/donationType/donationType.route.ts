import express from 'express';
import { DonationTypeController } from './donationType.controller';
import validateRequest from '../../middleware/validateRequest';
import { DonationTypeValidation } from './donationType.validation';

const router = express.Router();

/* Create donation type */
router.post(
   '/create-donation-type',
   validateRequest(DonationTypeValidation.createDonationZodSchema),
   DonationTypeController.createDonationType,
);

/* Get all donation types */
router.get('/', DonationTypeController.getAllDonationTypes);

/* Get single donation type */
router.get('/:id', DonationTypeController.getSingleDonationType);

/* Update single donation type */
router.patch(
   '/:id',
   validateRequest(DonationTypeValidation.updateDonationZodSchema),
   DonationTypeController.updateSingleDonationType,
);

/* Delete single donation type */
router.delete('/:id', DonationTypeController.deleteSingleDonationType);

export const DonationTypeRoutes = router;
