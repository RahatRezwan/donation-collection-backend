import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

/* create donor */
router.post(
   '/create-donor',
   validateRequest(UserValidation.createDonorZodSchema),
   UserController.createDonor,
);

/* get all users */
router.get('/', UserController.getAllUsers);

export const userRoutes = router;
