import express from 'express';
import { DonorController } from './donor.controller';
import validateRequest from '../../middleware/validateRequest';
import { DonorValidation } from './donor.validation';
const router = express.Router();

/* get single donor */
router.get('/:id', DonorController.getSingleDonor);

/* update single donor */
router.patch(
   '/:id',
   validateRequest(DonorValidation.updateDonorZodSchema),
   DonorController.updateSingleDonor,
);

/* delete single donor */
router.delete('/:id', DonorController.deleteSingleDonor);

/* get all donors */
router.get('/', DonorController.getAllDonors);

export const DonorRoutes = router;
