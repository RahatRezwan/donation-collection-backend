import { z } from 'zod';

const updateAdminZodSchema = z.object({
   body: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
   }),
});

export const AdminValidation = {
   updateAdminZodSchema,
};
