import express from 'express';
import { DonorController } from './donor.controller';
import validateRequest from '../../middleware/validateRequest';
import { DonorValidation } from './donor.validation';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middleware/auth';
const router = express.Router();

/* get single donor */
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), DonorController.getSingleDonor);

/* update single donor */
router.patch(
   '/:id',
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DONOR),
   validateRequest(DonorValidation.updateDonorZodSchema),
   DonorController.updateSingleDonor,
);

/* delete single donor */
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), DonorController.deleteSingleDonor);

/* get all donors */
router.get('/', auth(ENUM_USER_ROLE.ADMIN), DonorController.getAllDonors);

export const DonorRoutes = router;
