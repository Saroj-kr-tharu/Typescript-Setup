import { z } from 'zod';

const roleEnum = z.enum([ 'CUSTOMER', 'ADMIN'], {
  error: 'role must be one of customer, admin '
});

export const createUser = z.object({
  email: z.string().min(3, 'email is required'),
  username: z.string().optional(),
  role: roleEnum.default('CUSTOMER'),
  isActive: z.boolean().default(true).optional(),
  password: z.string().min(4, 'password is required'),
  refreshToken: z.string().min(4, 'refreshToken is required').optional(),
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
