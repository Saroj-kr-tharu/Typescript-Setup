import express from 'express';
import todoRouter from './todo.router';

const v1Router = express.Router();

v1Router.use('/', todoRouter);

export default v1Router;
