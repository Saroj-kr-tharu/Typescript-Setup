import express from 'express';
import {
  appById,
  appCreate,
  appDeleteById,
  appList,
  pingHandler,
  updateById,
} from '../../controllers/app.controller';
import { updateUserById, userById, userCreate, userDeleteById, usersList, } from '../../controllers/user.controller';
import {
  validateParams,
  validateQueryParams,
  validateRequestBody,
} from '../../validators';
import { pingSchema } from '../../validators/ping.validator';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from '../../validators/todo.validator';
import { createUser, getAllUser, getUserById, updateUser } from '../../validators/user.validator';
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
appRouter.post("/user", validateRequestBody(createUser), userCreate)
appRouter.get('/user', validateQueryParams(getAllUser), usersList);
appRouter.get('/user/:id', validateParams(getUserById), userById);
appRouter.delete('/user/:id', validateParams(getUserById), userDeleteById);
appRouter.patch(
  '/user/:id',
  validateParams(getUserById),
  validateRequestBody(updateUser),
  updateUserById
);

export default appRouter;
