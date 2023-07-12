import { z } from 'zod';

const createDonorZodSchema = z.object({
   body: z.object({
      password: z.string({
         required_error: 'Password is required',
      }),
      donor: z.object({
         firstName: z.string({
            required_error: 'First name is required',
         }),
         lastName: z.string({
            required_error: 'Last name is required',
         }),
         email: z
            .string({
               required_error: 'Email is required',
            })
            .email({
               message: 'Invalid email address',
            }),
         phone: z.string().optional(),
         presentAddress: z.string({
            required_error: 'Present address is required',
         }),
         permanentAddress: z.string().optional(),
      }),
   }),
});

const createAdminZodSchema = z.object({
   body: z.object({
      password: z.string({
         required_error: 'Password is required',
      }),
      admin: z.object({
         firstName: z.string({
            required_error: 'First name is required',
         }),
         lastName: z.string({
            required_error: 'Last name is required',
         }),
         email: z
            .string({
               required_error: 'Email is required',
            })
            .email({
               message: 'Invalid email address',
            }),
      }),
   }),
});

export const UserValidation = {
   createDonorZodSchema,
   createAdminZodSchema,
};
