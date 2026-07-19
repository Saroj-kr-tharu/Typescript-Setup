-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GREEN', 'RED', 'ORANGE');

-- CreateTable
CREATE TABLE "TodoLists" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "color" "Role" NOT NULL DEFAULT 'ORANGE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TodoLists_pkey" PRIMARY KEY ("id")
);
