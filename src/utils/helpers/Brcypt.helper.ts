import bcrypt from 'bcrypt';
import { serverConfig } from '../../config';
import logger from '../../config/logger.config';
import { BadRequestError, NotImplementedError } from '../errors/app.error';


class BcryptHelperClass {
    async checkPasswordService(plainpasword:string, hash:string) {
      try {

        const match = bcrypt.compareSync(plainpasword, hash);
        if (!match) 
            throw new NotImplementedError('Creditals invlaid');
      
        return match;
      } catch (error) {
          logger.error("Something went wrong in bcrypt helper layer (checkPasswordService)", error);
          throw new BadRequestError('bcrypt Error')
        }
    }

    async generateHashService(plainpasword:string): Promise<string> {
       try {
          const salt = await bcrypt.genSalt(serverConfig.SALT_ROUNDS)
          const hash = await bcrypt.hash(plainpasword, salt);
          return hash;
        } catch (error) {
            logger.error("Something went wrong in bcrypt helper layer (checkPasswordService)", error);
            throw new BadRequestError('bcrypt Error')
          }
    }

}


const bcryptHelper= new BcryptHelperClass();
export default bcryptHelper;