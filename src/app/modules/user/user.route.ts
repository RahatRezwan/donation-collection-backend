import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
const router = express.Router();

/* create donor */
router.post(
   '/create-donor',
   validateRequest(UserValidation.createDonorZodSchema),
   UserController.createDonor,
);

/* create admin */
router.post(
   '/create-admin',
   validateRequest(UserValidation.createAdminZodSchema),
   UserController.createAdmin,
);

/* get all users */
router.get('/', auth(), UserController.getAllUsers);

export const userRoutes = router;
