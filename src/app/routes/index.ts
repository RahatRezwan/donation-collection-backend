import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { DonorRoutes } from '../modules/donor/donor.route';
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
];

moduleRoutes.forEach((route) => {
   router.use(route.path, route.route);
});

export default router;
