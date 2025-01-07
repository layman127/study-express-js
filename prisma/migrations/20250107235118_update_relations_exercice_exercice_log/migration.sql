/*
  Warnings:

  - You are about to drop the column `exerciceLogId` on the `Exercice` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercice" DROP CONSTRAINT "Exercice_exerciceLogId_fkey";

-- AlterTable
ALTER TABLE "Exercice" DROP COLUMN "exerciceLogId";

-- AlterTable
ALTER TABLE "Exercice_log" ADD COLUMN     "exercice_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Exercice_log" ADD CONSTRAINT "Exercice_log_exercice_id_fkey" FOREIGN KEY ("exercice_id") REFERENCES "Exercice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
