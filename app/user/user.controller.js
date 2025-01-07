import { prisma } from '../prisma.js';
import expressAsyncHandler from 'express-async-handler';
// @desc    get current user profile
// @route   GET api/user/profile
// @access  Private
export const getCurrentUserProfile = expressAsyncHandler(
    async (req, res) => {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: { id: true, name: true, email: true },
        });

        const countExerciceTimeComplete =
            await prisma.exerciceLog.count({
                where: {
                    iserId: req.user.id,
                    isCompleted: true,
                },
            });
        const kgs = await prisma.exerciceTime.aggregate({
            where: {
                exerciceLog: { userId: req.user.id },
                isCompleted: true,
            },
            _sum: { weight: true },
        });
        const workouts = await prisma.workoutLog.count({
            where: { userId: user.id, isCompleted: true },
        });
        res.status(200);
        res.json(user);
        res.json({
            ...user,
            statistic: [
                {
                    label: 'Minutes',
                    value: Math.ceil(
                        countExerciceTimeComplete * 2.3 || 0
                    ),
                },
                {
                    label: 'Kilograms',
                    value: kgs._sum.weight || 0,
                },
                {
                    label: 'Workouts',
                    value: workouts,
                },
            ],
        });
    }
);
