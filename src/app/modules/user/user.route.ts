import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.get('/', UserController.getAllUsers);

export const userRoutes = router;