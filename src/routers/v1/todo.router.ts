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
  validateParams,
  validateQueryParams,
  validateRequestBody,
} from '../../validators';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from '../../validators/application.validator';
import { pingSchema } from '../../validators/ping.validator';
const appRouter = express.Router();

appRouter.get('/', validateRequestBody(pingSchema), pingHandler);
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

export default appRouter;
