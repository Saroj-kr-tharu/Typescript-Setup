import { z } from 'zod';

const roleEnum = z.enum([ 'CUSTOMER', 'ADMIN'], {
  error: 'role must be one of customer, admin '
});

const passwordSchema = z
  .string({ error: "Password is required" })
  .min(5, "Password must be at least 8 characters long")
  .max(64, "Password must be at most 64 characters long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

const emailSchema =  z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email is too long")
    .email("Please enter a valid email address");

export const createUser = z.object({
  email: emailSchema ,
  username: z.string().optional(),
  role: roleEnum.default('CUSTOMER'),
  isActive: z.boolean().default(true).optional(),
  password: passwordSchema,
  refreshToken: z.string().min(4, 'refreshToken is required').optional(),
});

export const loginUser = z.object({
  email: emailSchema,
  password: passwordSchema,
});


export const CheckToken = z.object({
 'x-access-token': z.string().jwt({ alg: 'HS256' }),
});

export const ChangePassword = z.object({
 oldPassword: passwordSchema, 
 newPassword: passwordSchema
});


export type CreateUserInput = z.infer<typeof createUser>;
