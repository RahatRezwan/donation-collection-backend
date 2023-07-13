import { z } from 'zod';

const updateDonorZodSchema = z.object({
   body: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      phone: z.string().optional(),
      presentAddress: z.string(),
      permanentAddress: z.string().optional(),
      profilePic: z.string().optional(),
   }),
});

export const DonorValidation = {
   updateDonorZodSchema,
};
