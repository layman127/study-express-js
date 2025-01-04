import { prisma } from '../../prisma.js';
import asyncHandler from 'express-async-handler';
// @desc GET exerciceLog
// @route  GET /api/exercices/log/:Id
// @access Private
export const getExerciceLog = asyncHandler(
    async (req, res) => {
        const exerciceLog =
            await prisma.exerciceLog.findUnique({
                where: { id: +req.params.id },
                include: {
                    exercice: true,
                    times: true,
                },
            });
        if (!exerciceLog) {
            res.status(404);
            throw new Error('Exercise Log Not Found!');
        }
        const prevExerciceLog =
            await prisma.exerciceLog.findFirst({
                where: {
                    exerciceId: exerciceLog.exerciceId,
                    userId: req.user.id,
                    isCompleted: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                include: { times: true },
            });
        let newTimes = addPrevalues(
            exerciceLog,
            prevExerciceLog
        );
        res.json({ ...exerciceLog, times: newTimes });
    }
);

const addPrevalues = (log, prevLog = null) => {
    return log.times.map((item, index) => ({
        ...item,
        prevWeight: prevLog
            ? prevLog.times[index].weight
            : 0,
        prevRepeat: prevLog
            ? prevLog.times[index].repeat
            : 0,
    }));
};
