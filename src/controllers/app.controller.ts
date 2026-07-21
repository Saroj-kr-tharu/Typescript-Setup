import { NextFunction, Request, Response } from 'express';
import todoSVC from '../service/todo.service';
import userSVC from '../service/user.service';
import { BadRequestError } from '../utils/errors/app.error';
import { createTodo, getAllTodos, getTodoById, updateTodo } from '../validators/todo.validator';
import { CheckToken } from '../validators/user.validator';

export const pingHandler = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Pong!' });
};

export const appCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createTodo.safeParse(req.body);
    const parsedToken = CheckToken.safeParse({ 'x-access-token': req.headers['x-access-token'] });

    if (!parsedToken.success) {
      throw new BadRequestError(parsedToken.error.issues.map((i) => i.message).join(', '));
    }
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues.map((i) => i.message).join(', '));
    }

    const user = await userSVC.checkTokenService(parsedToken.data['x-access-token']);

    const result = await todoSVC.createService({ ...parsed.data, authorId: Number(user.id) });

    res.status(201).json({
      success: true,
      message: 'Successfully created todo',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const appList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = getAllTodos.safeParse(req.query);
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues.map((i) => i.message).join(', '));
    }
    const parsedToken = CheckToken.safeParse({ 'x-access-token': req.headers['x-access-token'] });

    if (!parsedToken.success) {
      throw new BadRequestError(parsedToken.error.issues.map((i) => i.message).join(', '));
    }

    const user = await userSVC.checkTokenService(parsedToken.data['x-access-token']);

    const { page, limit, search, color } = parsed.data;

    const { rows, count } = await todoSVC.getAllService(page, limit, {
      authorId: user.id,
      ...(color && { color }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    });

    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      message: 'Successfully fetched todos',
      data: {
        todos: rows,
        pagination: {
          total: count,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const appById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = getTodoById.safeParse(req.params);
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues.map((i) => i.message).join(', '));
    }
    const { id } = parsed.data;

    const parsedToken = CheckToken.safeParse({ 'x-access-token': req.headers['x-access-token'] });
    if (!parsedToken.success) {
      throw new BadRequestError(parsedToken.error.issues.map((i) => i.message).join(', '));
    }
    const user = await userSVC.checkTokenService(parsedToken.data['x-access-token']);

    const result = await todoSVC.getByIdService({ id, authorId: Number(user.id) });
    if (!result) {
      res.status(404).json({
        success: false,
        message: `Todo with id ${id} not found`,
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully fetched todo',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const appDeleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = getTodoById.safeParse(req.params);
    if (!parsed.success) {
      throw new BadRequestError(parsed.error.issues.map((i) => i.message).join(', '));
    }
    const parsedToken = CheckToken.safeParse({ 'x-access-token': req.headers['x-access-token'] });
    if (!parsedToken.success) {
      throw new BadRequestError(parsedToken.error.issues.map((i) => i.message).join(', '));
    }
    const user = await userSVC.checkTokenService(parsedToken.data['x-access-token']);

    const { id } = parsed.data;

    const existing = await todoSVC.getByIdService({ id, authorId: Number(user.id) });
    if (!existing) {
      res.status(404).json({
        success: false,
        message: `Todo with id ${id} not found`,
        data: null,
      });
      return;
    }

    const deleted = await todoSVC.deleteService({ id });

    res.status(200).json({
      success: true,
      message: 'Successfully deleted todo',
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedToken = CheckToken.safeParse({ 'x-access-token': req.headers['x-access-token'] });
    const paramsParsed = getTodoById.safeParse(req.params);
    const bodyParsed = updateTodo.safeParse(req.body);

    if (!parsedToken.success) {
      throw new BadRequestError(parsedToken.error.issues.map((i) => i.message).join(', '));
    }
    if (!paramsParsed.success) {
      throw new BadRequestError(paramsParsed.error.issues.map((i) => i.message).join(', '));
    }

    if (!bodyParsed.success) {
      throw new BadRequestError(bodyParsed.error.issues.map((i) => i.message).join(', '));
    }
    const { id } = paramsParsed.data;

    const existing = await todoSVC.getByIdService({ id });
    if (!existing) {
      res.status(404).json({
        success: false,
        message: `Todo with id ${id} not found`,
        data: null,
      });
      return;
    }
    const user = await userSVC.checkTokenService(parsedToken.data['x-access-token']);

    const updated = await todoSVC.updateService({ id, authorId: Number(user.id) }, bodyParsed.data);

    res.status(200).json({
      success: true,
      message: 'Successfully updated todo',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
