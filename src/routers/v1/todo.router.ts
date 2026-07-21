import express from 'express';
import {
  appById,
  appCreate,
  appDeleteById,
  appList,
  pingHandler,
  updateById,
} from '../../controllers/app.controller';
import { changePasswordCtrl, checkTokenCtrl, loginCtrl, userCreate } from '../../controllers/user.controller';
import {
  validateHeaders,
  validateParams,
  validateQueryParams,
  validateRequestBody
} from '../../validators';
import { pingSchema } from '../../validators/ping.validator';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from '../../validators/todo.validator';
import { ChangePassword, CheckToken, createUser, loginUser } from '../../validators/user.validator';
const appRouter = express.Router();

appRouter.get('/', validateRequestBody(pingSchema), pingHandler);

// todo router 
appRouter.post('/todo', validateRequestBody(createTodo), appCreate);
appRouter.get('/todo', validateQueryParams(getAllTodos), appList);
appRouter.get('/todo/:id', validateParams(getTodoById), appById);
appRouter.delete('/todo/:id', validateParams(getTodoById), appDeleteById);
appRouter.patch(
  '/todo/:id',
  validateParams(getTodoById),
  validateRequestBody(updateTodo),
  updateById,
);


// user router 
appRouter.post("/auth/register", validateRequestBody(createUser), userCreate)
appRouter.post('/auth/login', validateRequestBody(loginUser), loginCtrl);
appRouter.get('/auth/token', validateHeaders(CheckToken), checkTokenCtrl);
appRouter.post('/auth/changepassword', validateHeaders(CheckToken),validateRequestBody(ChangePassword) ,changePasswordCtrl);


export default appRouter;
