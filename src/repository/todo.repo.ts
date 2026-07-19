import { prismaClient } from '../config/db.config';
import CrudRepo from './curd.repo';

class TodoRepo extends CrudRepo<typeof prismaClient.todoLists> {
  constructor() {
    super(prismaClient.todoLists);
  }
}

const todoRepo = new TodoRepo();
export default todoRepo;
