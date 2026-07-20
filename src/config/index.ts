// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';
import logger from './logger.config';

type ServerConfig = {
  PORT: number;
  FORTEND_URL: string;
  PRIVATEJWT: string, 
  RefreshPRIVATEJWT: string,
  SALT: string
};

type DBConfig = {
  DATABASE_URL: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
};

function loadEnv() {
  dotenv.config();
  logger.info('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3001,
  FORTEND_URL: String(process.env.FORTEND_URL) ,
  PRIVATEJWT: String(process.env.PRIVATEJWT) ,
  RefreshPRIVATEJWT: String(process.env.RefreshPRIVATEJWT) ,
  SALT: String(process.env.SALT) ,
};

export const dbConfig: DBConfig = {
  DATABASE_URL: process.env.DATABASE_URL || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || 'root',
  DB_NAME: process.env.DB_NAME || 'test_db',
};
