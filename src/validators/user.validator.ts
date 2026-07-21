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

export const updateUser = createUser
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided to update',
  });

export const getAllUser = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export const getUserById = z.object({
  id: z.coerce.number().int().positive('Id must be a positive number'),
});

export type GetUserByIdParam = z.infer<typeof getUserById>;
export type CreateUserInput = z.infer<typeof createUser>;
export type UpdateUserInput = z.infer<typeof updateUser>;
export type GetAllUserQuery = z.infer<typeof getAllUser>;
