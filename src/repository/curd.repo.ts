
  export type PrismaDelegate = {
    create: (args: any) => Promise<any>;
    findMany: (args?: any) => Promise<any[]>;
    findUnique: (args: any) => Promise<any | null>;
    findFirst: (args?: any) => Promise<any | null>;
    update: (args: any) => Promise<any>;
    delete: (args: any) => Promise<any>;
    count: (args?: any) => Promise<number>;
  };

  class CrudRepo <
      T extends PrismaDelegate,
      CreateArgs = Parameters<T['create']>[0],
      UpdateArgs = Parameters<T['update']>[0],
      FindManyArgs = Parameters<T['findMany']>[0],
      WhereUniqueInput = Parameters<T['findUnique']>[0] extends { where: infer W } ? W : never,
      WhereInput = Parameters<T['findFirst']>[0] extends { where?: infer W } ? W : never
    > {

        protected model: T;
        constructor(model: T) {
          this.model = model;
        }

        create(data: CreateArgs extends { data: infer D } ? D : never) {
          return this.model.create({ data } as any);
        }

        findAll(args?: FindManyArgs) {
          return this.model.findMany(args as any);
        }

        findById(where: WhereUniqueInput) {
          return this.model.findUnique({ where } as any);
        }

        findOne(where: WhereInput) {
          return this.model.findFirst({ where } as any);
        }

        update(where: WhereUniqueInput, data: UpdateArgs extends { data: infer D } ? D : never) {
          return this.model.update({ where, data } as any);
        }

        delete(where: WhereUniqueInput) {
          return this.model.delete({ where } as any);
        }

        count(where?: WhereInput) {
          return this.model.count({ where } as any);
        }
  }


  export default CrudRepo;