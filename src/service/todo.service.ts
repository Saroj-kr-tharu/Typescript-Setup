import { prismaClient } from '../config/db.config';
import logger from '../config/logger.config';
import { TodoListsCreateInput, TodoListsUncheckedCreateInput } from '../generated/prisma/models';
import todoRepo from '../repository/todo.repo';
import { BadRequestError } from '../utils/errors/app.error';
import CrudService from './curd.service';

class TodoSVC extends CrudService<typeof prismaClient.todoLists> {
  constructor() {
    super(todoRepo);
  }

  override async createService(
    data:
      | ({ author?: undefined } & TodoListsUncheckedCreateInput)
      | ({ id?: undefined; authorId?: undefined } & TodoListsCreateInput),
  ): Promise<any> {
    try {
      const res = await todoRepo.create(data);
      return res;
    } catch (error) {
      logger.error('Something went wrong in service level (create)', error);
      throw BadRequestError;
    }
  }
}

const todoSVC = new TodoSVC();
export default todoSVC;
