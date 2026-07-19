import { NextFunction, Request, Response } from 'express';
import todoSVC from '../service/todo.service';
import userSVC from '../service/user.service';
import { BadRequestError } from '../utils/errors/app.error';
import {
  createUser,
  getAllUser,
  getUserById,
  updateUser
} from '../validators/user.validator';



export const userCreate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = createUser.safeParse(req.body);

    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues.map((i) => i.message).join(', '),
      );
    }

    const result = await userSVC.createService(parsed.data);

    res.status(201).json({
      success: true,
      message: 'Successfully created todo',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const usersList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = getAllUser.safeParse(req.query);
    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues.map((i) => i.message).join(', '),
      );
    }
    const { page, limit } = parsed.data;
    const { rows, count } = await todoSVC.getAllService(page, limit  );
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      success: true,
      message: 'Successfully fetched User',
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

export const userById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = getUserById.safeParse(req.params);
    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues.map((i) => i.message).join(', '),
      );
    }
    const { id } = parsed.data;
    const result = await todoSVC.getByIdService({ id });
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

export const userDeleteById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = getUserById.safeParse(req.params);
    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues.map((i) => i.message).join(', '),
      );
    }
    const { id } = parsed.data;
    const existing = await todoSVC.getByIdService({ id });
    if (!existing) {
      res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
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

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const paramsParsed = getUserById.safeParse(req.params);
    if (!paramsParsed.success) {
      throw new BadRequestError(
        paramsParsed.error.issues.map((i) => i.message).join(', '),
      );
    }
    const { id } = paramsParsed.data;

    const bodyParsed = updateUser.safeParse(req.body);
    if (!bodyParsed.success) {
      throw new BadRequestError(
        bodyParsed.error.issues.map((i) => i.message).join(', '),
      );
    }

    const existing = await todoSVC.getByIdService({ id });
    if (!existing) {
      res.status(404).json({
        success: false,
        message: `Todo with id ${id} not found`,
        data: null,
      });
      return;
    }

    const updated = await todoSVC.updateService({ id }, bodyParsed.data);

    res.status(200).json({
      success: true,
      message: 'Successfully updated todo',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
