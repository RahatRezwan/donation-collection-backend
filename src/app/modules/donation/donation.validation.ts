import { z } from 'zod';

const createDonationZodSchema = z.object({
   body: z.object({
      donation_plan: z.string().optional(),
      amount: z.number({
         required_error: 'Amount is required',
      }),
      currency: z.string({
         required_error: 'Currency is required',
      }),
      paymentMethod: z.string().optional(),
      donor: z.number({
         required_error: 'Donor is required',
      }),
   }),
});

const updateDonationZodSchema = z.object({
   body: z.object({
      donation_plan: z.string().optional(),
      amount: z.number().optional(),
      currency: z.string().optional(),
      paymentMethod: z.string().optional(),
      donor: z.number().optional(),
   }),
});

export const DonationValidation = {
   createDonationZodSchema,
   updateDonationZodSchema,
};
