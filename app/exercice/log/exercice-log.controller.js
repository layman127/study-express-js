import { prisma } from '../../prisma.js';
import asyncHandler from 'express-async-handler';
// @desc Create new exerciceLog
// @route  POST /api/exercices/log/:exerciceId
// @access Private
export const createExerciceLog = asyncHandler(
    async (req, res) => {
        //создаем тренировку над одним упражнением. В нем есть подходы - times
        const exerciceId = +req.params.exerciceId;
        const exercice = await prisma.exercice.findUnique({
            where: { id: exerciceId },
        });
        if (!exercice) {
            res.status(404);
            throw new Error('No exercise');
        }
        let timeDeafult = [];
        for (let i = 0; i < exercice.time; i++) {
            timeDeafult.push({
                weight: 0,
                repeat: 0,
            });
        }
        const exerciceLog = await prisma.exerciceLog.create(
            {
                data: {
                    user: { connect: { id: req.user.id } },
                    exercice: {
                        connect: { id: exerciceId },
                    },
                    times: {
                        createMany: {
                            data: timeDeafult,
                        },
                    },
                },
                include: {
                    times: true,
                },
            }
        );
        res.json(exerciceLog);
    }
);
