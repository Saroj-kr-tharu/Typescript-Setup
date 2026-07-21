
import Jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { serverConfig } from '../../config/index';
import logger from '../../config/logger.config';


interface UserPayload  extends JwtPayload {
    email: string, 
    username?: string,
    role: 'CUSTOMER' | 'ADMIN',
    isActive: boolean
}

class JwtHelperClass {

        async createToken(data:UserPayload, time:StringValue = '10m'): Promise<string> {
            try {
                const options: SignOptions = {
                    algorithm: 'HS256' , 
                    expiresIn: time
                } 
                const token = await Jwt.sign(data,serverConfig.PRIVATEJWT, options)
                return token;

            } catch (error) {
                logger.info("Something went wrong in service layer (creating the token)", error);
                const message = error instanceof Error ? error.message : String(error);
                throw new Error(message, { cause: error });
            }
        }

        async createRefreshToken(data:UserPayload, time:StringValue = '7d'): Promise<string> {
            try {
                const options: SignOptions = {
                    algorithm: 'HS256' , 
                    expiresIn: time
                } 
                const token = await Jwt.sign(data,serverConfig.RefreshPRIVATEJWT, options)
                return token;

            } catch (error) {
                logger.info("Something went wrong in service layer (creating the refreshtoken)", error);
                const message = error instanceof Error ? error.message : String(error);
                throw new Error(message, { cause: error });
            }
        }

        async verifyToken(token:string ): Promise<UserPayload>  {
          try {
            const response = Jwt.verify(token, serverConfig.PRIVATEJWT) as UserPayload;
            if (!response) throw   new Error('Invalid Token ');
            return response;
          } catch (error) {
            logger.info("Error Occured in VerifyToken ", error)
            const message = error instanceof Error ? error.message : String(error);
           throw new Error(message, { cause: error });
          }
        }
        
        async verifyRefreshToken(token:string ): Promise<UserPayload>  {
          try {
            const response = Jwt.verify(token, serverConfig.RefreshPRIVATEJWT) as UserPayload;
            if (!response) throw   new Error('Invalid Token ');
            return response;
          } catch (error) {
            logger.info("Error Occured in VerifyToken ", error)
            const message = error instanceof Error ? error.message : String(error);
           throw new Error(message, { cause: error });
          }
        }
        
            
    }





const jwtHelperClass = new JwtHelperClass();
export default jwtHelperClass; 

