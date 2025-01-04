/*
  Warnings:

  - You are about to drop the column `exerciceId` on the `Exercice_log` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercice_log" DROP CONSTRAINT "Exercice_log_exerciceId_fkey";

-- AlterTable
ALTER TABLE "Exercice" ADD COLUMN     "exerciceLogId" INTEGER;

-- AlterTable
ALTER TABLE "Exercice_log" DROP COLUMN "exerciceId";

-- AddForeignKey
ALTER TABLE "Exercice" ADD CONSTRAINT "Exercice_exerciceLogId_fkey" FOREIGN KEY ("exerciceLogId") REFERENCES "Exercice_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;
