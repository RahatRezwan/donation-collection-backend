import { z } from 'zod';

const loginZodSchema = z.object({
   body: z.object({
      password: z.string({
         required_error: 'Password is required',
      }),
      email: z
         .string({ required_error: 'Email is required' })
         .email({ message: 'Invalid email address' }),
   }),
});

export const AuthValidation = { loginZodSchema };
