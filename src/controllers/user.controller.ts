import { NextFunction, Request, Response } from 'express';
import userSVC from '../service/user.service';
import { BadRequestError } from '../utils/errors/app.error';
import {
  createUser
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
      message: 'Successfully registered user',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginCtrl = async (
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
      message: 'Successfully registered user',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};







