import { prisma } from '../../prisma.js';
import asyncHandler from 'express-async-handler';

// @desc Update status of complete workout log
// @route  PATCH /api/workout/log/complete/:id
// @access Private
export const updateCompleteWorkoutLog = asyncHandler(
    async (req, res) => {
        const workoutLog = await prisma.workoutLog.update({
            where: { id: +req.params.id },
            data: { isCompleted: true },
            include: {
                workout: true,
                workoutLog: true,
            },
        });
        res.json(workoutLog);
    }
);
