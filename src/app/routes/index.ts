import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { DonorRoutes } from '../modules/donor/donor.route';
import { AdminRoutes } from '../modules/admin/admin.route';
const router = express.Router();

const moduleRoutes = [
   {
      path: '/users',
      route: userRoutes,
   },
   {
      path: '/donors',
      route: DonorRoutes,
   },
   {
      path: '/admins',
      route: AdminRoutes,
   },
];

moduleRoutes.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
