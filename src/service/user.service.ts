import { prismaClient } from "../config/db.config";
import logger from "../config/logger.config";
import { UserCreateInput, UserUncheckedCreateInput } from "../generated/prisma/models";
import userRepo from "../repository/user.repo";
import bcryptHelper from "../utils/helpers/Brcypt.helper";
import jwtHelperClass from "../utils/helpers/Jwt.helper";
import CrudService from "./curd.service";


type loginData = {
    email: string, 
    password: string
}

interface LoginResponse {
  email: string;
  role: string;
  isActive: boolean;
  token: string;
  refreshToken: string;
}



class UserService extends CrudService<typeof prismaClient.user> {
    constructor(){
        super(userRepo)
    }

    override async createService(data: ({} & UserUncheckedCreateInput) | ({ id?: undefined; } & UserCreateInput)): Promise<any> {
        try {
            // 1. get the data 
            // 3. get the email 
             const user = await userRepo.findOne({ email: data.email });
             logger.info('user => ', user)
             if(user) throw new Error("Email is already Exist");
             
            // 4. generate the hash of password 
             const hash = await bcryptHelper.generateHashService(data.password);

            // 5. write in db 
            const res = await userRepo.create({...data, password:hash})
            // 6. return response
            return {
                email: res.email, 
                username: res.username, 
                role: res.role,
                isActive: res.isActive
            }; 

            

        } catch (error) {
            logger.info("Error in userCreating ", error)
            const message = error instanceof Error ? error.message : String(error);
           throw new Error(message, { cause: error });
        }
    }

    async loginService(data: loginData  ) : Promise<LoginResponse>{
        try {

           // 1. get data 
           const user = await userRepo.findOne({email:data.email});
           if(!user) throw new Error("Invalid email or password", )
           // 2. check the hash 
           const match = await bcryptHelper.checkPasswordService(data.password, user.password)
           if(!match) throw new Error("Invalid email or password")
           // 3. create token 
           const token = await jwtHelperClass.createToken({email: user.email, role: user.role,  isActive: user.isActive})
           // 4. create refresh token 
           const refreshToken = await jwtHelperClass.createRefreshToken({email: user.email, role: user.role,isActive: user.isActive})
           // return res 
           return {email: user.email, role: user.role,isActive: user.isActive ,token, refreshToken, }

        } catch (error) {
            logger.info("Error in userCreating ", error)
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(message, { cause: error });
        }
    }

    async checkTokenService(token: string  ) : Promise< Partial<LoginResponse>  >{
        try {
          // 1. get token 
          // 2. verify token 
          const user = jwtHelperClass.verifyToken(token);
          // 3. return the token 
          return user ; 

        } catch (error) {
            logger.info("Error in userCreating ", error)
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(message, { cause: error });
        }
    }

    async changePassword(token:string, data: {oldPassword: string, newPassword: string} ) : Promise< Partial<LoginResponse>  >{
        try {
            // 0. check user is login or not 
            const user =  await this.checkTokenService(token);
            // 01. get user by email 
            const res =  await this.getByIdService({email: user.email});

          // 1. verify the password 
          const match =  await bcryptHelper.checkPasswordService(data.oldPassword, res.password)
          if(!match) throw new Error("Invalid Credentials")
          // 2. generate the hassh 
          const hash = await bcryptHelper.generateHashService(data.newPassword);
          // 3. update the db 
          const updateRes = await this.updateService({email:user.email}, {
            password: hash
          })
          // 4. return the data 
          const { password, refreshToken, ...updatedRes } = updateRes;
          return updatedRes;

        } catch (error) {
            logger.info("Error in changing password ", error)
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(message, { cause: error });
        }
    }


}

const userSVC = new UserService();
export default userSVC; 