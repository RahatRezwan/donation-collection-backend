import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/users';
const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.loginUser);

router.post(
   '/refresh-token',
   validateRequest(AuthValidation.refreshTokenZodSchema),
   AuthController.refreshToken,
);

router.get(
   '/user-data',
   auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.DONOR),
   AuthController.getUserData,
);
export const AuthRoutes = router;
