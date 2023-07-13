import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { DonorRoutes } from '../modules/donor/donor.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { DonationRoutes } from '../modules/donation/donation.route';
const router = express.Router();

const moduleRoutes = [
   {
      path: '/auth',
      route: AuthRoutes,
   },
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
   {
      path: '/donations',
      route: DonationRoutes,
   },
];

moduleRoutes.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
