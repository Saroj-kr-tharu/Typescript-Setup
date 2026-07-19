import { z } from 'zod';

const colorEnum = z.enum(['GREEN', 'RED', 'ORANGE']);

export const createTodo = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  color: colorEnum.default('ORANGE'),
});

export const updateTodo = createTodo
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided to update',
  });

export const getAllTodos = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  color: colorEnum.optional(),
  search: z.string().optional(),
});

export const getTodoById = z.object({
  id: z.coerce.number().int().positive('Id must be a positive number'),
});

export type GetTodoByIdParam = z.infer<typeof getTodoById>;
export type CreateTodoInput = z.infer<typeof createTodo>;
export type UpdateTodoInput = z.infer<typeof updateTodo>;
export type GetAllTodosQuery = z.infer<typeof getAllTodos>;
