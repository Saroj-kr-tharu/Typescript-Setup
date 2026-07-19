import { PrismaPg } from "@prisma/adapter-pg";
import { dbConfig } from '../config/index';
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: dbConfig.DATABASE_URL });

export const prismaClient = new PrismaClient({ adapter });