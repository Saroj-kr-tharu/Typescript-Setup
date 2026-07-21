import { prismaClient } from "../config/db.config";
import { UserWhereInput } from "../generated/prisma/models";
import CrudRepo from "./curd.repo";


class UserRepo extends CrudRepo<typeof prismaClient.user> {
    constructor(){
        super(prismaClient.user)
    }

    override findOne(where: UserWhereInput): Promise<any> {
        return this.model.findFirst({ where } as any);
    }
}


const userRepo = new UserRepo();
export default userRepo;