import { prismaClient } from "../config/db.config";
import { UserCreateInput, UserUncheckedCreateInput } from "../generated/prisma/models";
import userRepo from "../repository/user.repo";
import CrudService from "./curd.service";


class UserService extends CrudService<typeof prismaClient.user> {
    constructor(){
        super(userRepo)
    }

    override createService(data: ({} & UserUncheckedCreateInput) | ({ id?: undefined; } & UserCreateInput)): Promise<any> {
        
         // 1. get the data 
         // 2. verify the zod 

    }


}

const userSVC = new UserService();
export default userSVC; 