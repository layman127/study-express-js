import { prisma } from '../../prisma.js';
import asyncHandler from 'express-async-handler';
// @desc Update exercice log time
// @route  PUT /api/exercices/log/time/:Id
// @access Private
export const updateExerciceLogtime = asyncHandler(
    async (req, res) => {
        const { weight, repeat, isCompleted } = req.body;

        const exerciceLogTime =
            await prism.exerciceLogTime.update({
                where: { id: +req.params.id },
                data: { weight, repeat, isCompleted },
            });

        if (!exerciceLogTime) {
            res.status(404);
            throw new Error('Exercice log time not found!');
        }
        res.json(exerciceLogTime);
    }
);
// @desc Update status of complete exercice log
// @route  GET /api/exercices/log/complete/:id
// @access Private
export const completeExerciceLog = asyncHandler(
    async (req, res) => {
        const { isCompleted } = req.body;
        const exerciceLog = await prisma.exerciceLog.update(
            {
                where: { id: +req.params.id },
                data: { isCompleted },
                include: {
                    exercice: true,
                    workoutLog: true,
                },
            }
        );
        res.json(exerciceLog);
    }
);
