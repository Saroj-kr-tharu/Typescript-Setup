import { NextFunction, Request, Response } from 'express';
import userSVC from '../service/user.service';
import { BadRequestError } from '../utils/errors/app.error';
import {
  ChangePassword,
  CheckToken,
  createUser,
  loginUser
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
    const parsed = loginUser.safeParse(req.body);

    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues.map((i) => i.message).join(', '),
      );
    }

    const result = await userSVC.loginService(parsed.data);

    res.status(201).json({
      success: true,
      message: 'Successfully registered user',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const checkTokenCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rawToken = req.headers['x-access-token'];
    const parsed = CheckToken.safeParse({ 'x-access-token': rawToken });
    if (!parsed.success) {
      throw new BadRequestError(
        parsed.error.issues.map((i) => i.message).join(', '),
      );
    }

    const result = await userSVC.checkTokenService(parsed.data['x-access-token']);

    res.status(201).json({
      success: true,
      message: 'Successfully Check Token',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};





export const changePasswordCtrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const rawToken = req.headers['x-access-token'];
    const parsedToken = CheckToken.safeParse({ 'x-access-token': rawToken });
    const parsedData = ChangePassword.safeParse(req?.body);

    if (!parsedToken.success) {
      throw new BadRequestError(
        parsedToken.error.issues.map((i) => i.message).join(', '),
      );
    }

    if (!parsedData.success) {
      throw new BadRequestError(
        parsedData.error.issues.map((i) => i.message).join(', '),
      );
    }

    const result = await userSVC.changePassword(parsedToken.data['x-access-token'],parsedData.data);

    res.status(201).json({
      success: true,
      message: 'Successfully Check Token',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


