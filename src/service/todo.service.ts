import { prismaClient } from '../config/db.config';
import todoRepo from '../repository/todo.repo';
import CrudService from './curd.service';

class TodoSVC extends CrudService<typeof prismaClient.todoLists> {
  constructor() {
    super(todoRepo);
  }
}

const todoSVC = new TodoSVC();
export default todoSVC;
