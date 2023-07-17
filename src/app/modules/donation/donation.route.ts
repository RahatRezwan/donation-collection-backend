import express from 'express';
import { DonationController } from './donation.controller';
import validateRequest from '../../middleware/validateRequest';
import { DonationValidation } from './donation.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';

const router = express.Router();

/* create donation */
router.post(
   '/create-donation',
   auth(ENUM_USER_ROLE.DONOR),
   validateRequest(DonationValidation.createDonationZodSchema),
   DonationController.createDonation,
);

/* get all donations */
router.get(
   '/',
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DONOR),
   DonationController.getAllDonations,
);

/* update single donation */
router.patch(
   '/:id',
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DONOR),
   validateRequest(DonationValidation.updateDonationZodSchema),
   DonationController.updateSingleDonation,
);

/* delete single donation */
router.delete(
   '/:id',
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DONOR),
   DonationController.deleteSingleDonation,
);

/* get donation by donor */
router.get(
   '/:donorId',
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DONOR),
   DonationController.getDonationsByDonor,
);

export const DonationRoutes = router;
