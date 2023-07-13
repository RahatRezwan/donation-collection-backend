import express from 'express';
import { DonationController } from './donation.controller';

const router = express.Router();

/* create donation */
router.post('/create-donation', DonationController.createDonation);

/* get all donations */
router.get('/', DonationController.getAllDonations);

/* get single donation */
router.get('/:id', DonationController.getSingleDonation);

/* update single donation */
router.put('/:id', DonationController.updateSingleDonation);

/* delete single donation */
router.delete('/:id', DonationController.deleteSingleDonation);

/* get donation by donor */
router.get('/:donorId', DonationController.getDonationsByDonor);

export const DonationRoutes = router;
