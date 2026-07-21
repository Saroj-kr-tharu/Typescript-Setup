-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isActive" SET DEFAULT true,
ALTER COLUMN "refreshToken" DROP NOT NULL;
