import { z } from 'zod';

const createDonationZodSchema = z.object({
   body: z.object({
      title: z.string({
         required_error: 'Title is required',
      }),
      description: z.string().optional(),
      thumbnail: z.string().optional(),
   }),
});

const updateDonationZodSchema = z.object({
   body: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      thumbnail: z.string().optional(),
   }),
});

export const DonationTypeValidation = {
   createDonationZodSchema,
   updateDonationZodSchema,
};
