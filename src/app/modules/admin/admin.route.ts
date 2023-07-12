import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middleware/validateRequest';
import { AdminValidation } from './admin.validation';
const router = express.Router();

/* get single admin */
router.get('/:id', AdminController.getSingleAdmin);

/* update single admin */
router.patch(
   '/:id',
   validateRequest(AdminValidation.updateAdminZodSchema),
   AdminController.updateSingleAdmin,
);

/* delete single admin */
router.delete('/:id', AdminController.deleteSingleAdmin);

/* get all admins */
router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;
