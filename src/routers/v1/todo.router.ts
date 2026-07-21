import express from 'express';
import {
  appById,
  appCreate,
  appDeleteById,
  appList,
  pingHandler,
  updateById,
} from '../../controllers/app.controller';
import {
  changePasswordCtrl,
  checkTokenCtrl,
  loginCtrl,
  updateUserCtrl,
  userCreate,
} from '../../controllers/user.controller';
import {
  validateHeaders,
  validateParams,
  validateQueryParams,
  validateRequestBody,
} from '../../validators';
import { pingSchema } from '../../validators/ping.validator';
import { createTodo, getAllTodos, getTodoById, updateTodo } from '../../validators/todo.validator';
import {
  ChangePassword,
  CheckToken,
  createUser,
  loginUser,
  updateUser,
} from '../../validators/user.validator';
const appRouter = express.Router();

appRouter.get('/', validateRequestBody(pingSchema), pingHandler);

// todo router
appRouter.post('/todo', validateHeaders(CheckToken), validateRequestBody(createTodo), appCreate);
appRouter.get('/todo', validateHeaders(CheckToken), validateQueryParams(getAllTodos), appList);
appRouter.get('/todo/:id', validateHeaders(CheckToken), validateParams(getTodoById), appById);
appRouter.delete(
  '/todo/:id',
  validateHeaders(CheckToken),
  validateParams(getTodoById),
  appDeleteById,
);
appRouter.patch(
  '/todo/:id',
  validateHeaders(CheckToken),
  validateParams(getTodoById),
  validateRequestBody(updateTodo),
  updateById,
);

// user router
appRouter.post('/auth/register', validateRequestBody(createUser), userCreate);
appRouter.post('/auth/login', validateRequestBody(loginUser), loginCtrl);
appRouter.get('/auth/token', validateHeaders(CheckToken), checkTokenCtrl);
appRouter.patch(
  '/auth/update',
  validateHeaders(CheckToken),
  validateRequestBody(updateUser),
  updateUserCtrl,
);
appRouter.post(
  '/auth/changepassword',
  validateHeaders(CheckToken),
  validateRequestBody(ChangePassword),
  changePasswordCtrl,
);

export default appRouter;
