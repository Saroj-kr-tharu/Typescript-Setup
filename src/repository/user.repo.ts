import { prismaClient } from "../config/db.config";
import CrudRepo from "./curd.repo";


class UserRepo extends CrudRepo<typeof prismaClient.user> {
    constructor(){
        super(prismaClient.user)
    }
}


const userRepo = new UserRepo();
export default userRepo;