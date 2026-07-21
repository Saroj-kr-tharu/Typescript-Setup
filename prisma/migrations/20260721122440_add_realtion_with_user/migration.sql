-- AlterTable
ALTER TABLE "TodoLists" ADD COLUMN     "authorId" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "TodoLists" ADD CONSTRAINT "TodoLists_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
