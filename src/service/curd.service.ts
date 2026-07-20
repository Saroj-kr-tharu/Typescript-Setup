import logger from '../config/logger.config';
import CrudRepo, { PrismaDelegate } from '../repository/curd.repo';
import { BadRequestError } from '../utils/errors/app.error';

class CrudService<T extends PrismaDelegate> {
  private repo: CrudRepo<T>;

  constructor(repo: CrudRepo<T>) {
    this.repo = repo;
  }

  async createService(
    data: Parameters<T['create']>[0] extends { data: infer D } ? D : never,
  ) {
    try {
      const res = await this.repo.create(data);
      return res;
    } catch (error) {
      logger.error('Something went wrong in service level (create)', error);
      throw BadRequestError;
    }
  }

  async updateService(
    where: Parameters<T['findUnique']>[0] extends { where: infer W }
      ? W
      : never,
    data: Parameters<T['update']>[0] extends { data: infer D } ? D : never,
  ) {
    try {
      const res = await this.repo.update(where, data);
      return res;
    } catch (error) {
      logger.error('Something went wrong in service level (update)', error);
      throw error;
    }
  }

  async deleteService(
    where: Parameters<T['findUnique']>[0] extends { where: infer W }
      ? W
      : never,
  ) {
    try {
      const res = await this.repo.delete(where);
      return res;
    } catch (error) {
      logger.error('Something went wrong in service level (delete)', error);
      throw error;
    }
  }

  async getAllService(page = 1, limit = 10, filters: Record<string, any> = {}) {
    try {
      const [rows, count] = await Promise.all([
        this.repo.findAll({
          where: filters,
          skip: (page - 1) * limit,
          take: limit,
        } as any),
        this.repo.count(filters as any),
      ]);
      return { rows, count };
    } catch (error) {
      logger.error('Something went wrong in service level (getAll)', error);
      throw error;
    }
  }

  async getByIdService(
    where: Parameters<T['findUnique']>[0] extends { where: infer W }
      ? W
      : never,
  ) {
    try {
      const res = await this.repo.findById(where);
      return res;
    } catch (error) {
      logger.error('Something went wrong in service level (getById)', error);
      throw error;
    }
  }
}

export default CrudService;
