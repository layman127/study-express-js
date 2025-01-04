-- CreateTable
CREATE TABLE "Exercice_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "exerciceId" INTEGER,
    "user_id" INTEGER,
    "workoutLogId" INTEGER,

    CONSTRAINT "Exercice_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercice_time" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "weight" INTEGER NOT NULL,
    "repeat" INTEGER NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "exercice_log_id" INTEGER,

    CONSTRAINT "Exercice_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout_log" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "workout_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "Workout_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercice_log_id_key" ON "Exercice_log"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercice_time_id_key" ON "Exercice_time"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_log_id_key" ON "Workout_log"("id");

-- AddForeignKey
ALTER TABLE "Exercice_log" ADD CONSTRAINT "Exercice_log_exerciceId_fkey" FOREIGN KEY ("exerciceId") REFERENCES "Exercice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercice_log" ADD CONSTRAINT "Exercice_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercice_log" ADD CONSTRAINT "Exercice_log_workoutLogId_fkey" FOREIGN KEY ("workoutLogId") REFERENCES "Workout_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercice_time" ADD CONSTRAINT "Exercice_time_exercice_log_id_fkey" FOREIGN KEY ("exercice_log_id") REFERENCES "Exercice_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_log" ADD CONSTRAINT "Workout_log_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout_log" ADD CONSTRAINT "Workout_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
