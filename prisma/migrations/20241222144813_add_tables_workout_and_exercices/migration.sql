/*
  Warnings:

  - You are about to drop the column `type` on the `Exercice` table. All the data in the column will be lost.
  - Added the required column `icon_path` to the `Exercice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercice" DROP COLUMN "type",
ADD COLUMN     "icon_path" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciceToWorkout" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ExerciceToWorkout_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workout_id_key" ON "Workout"("id");

-- CreateIndex
CREATE INDEX "_ExerciceToWorkout_B_index" ON "_ExerciceToWorkout"("B");

-- AddForeignKey
ALTER TABLE "_ExerciceToWorkout" ADD CONSTRAINT "_ExerciceToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciceToWorkout" ADD CONSTRAINT "_ExerciceToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
