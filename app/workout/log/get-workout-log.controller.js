import { prisma } from '../../prisma.js';
import asyncHandler from 'express-async-handler';
// @desc GET workoutLog
// @route  GET /api/workout/log/:workoutId
// @access Private
export const getWorkoutLog = asyncHandler(
    async (req, res) => {
        const workoutLog =
            await prisma.workoutLog.findUnique({
                where: { id: +req.params.workoutId },
                include: {
                    workout: {
                        include: { exercice: true },
                    },
                    exerciceLog: {
                        orderBy: { id: 'asc' },
                        include: { exercice: true },
                    },
                },
            });
        if (!workoutLog) {
            res.status(404);
            throw new Error('Exercise Log Not Found!');
        }

        res.json({ ...workoutLog });
    }
);
