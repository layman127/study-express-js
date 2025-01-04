import { prisma } from '../prisma.js';
import expressAsyncHandler from 'express-async-handler';
// @desc    get workout
// @route   GET api/workout/:id
// @access  Private
export const getWorkout = expressAsyncHandler(
    async (req, res) => {
        const workout = await prisma.workout.findUnique({
            where: { id: +req.params.id },
            include: { exercices: true },
        });

        if (!workout) {
            res.status(404);
            throw new Error('Workouts not finded');
        }
        res.json(workout);
    }
);
// @desc    get workouts
// @route   GET api/workout/
// @access  Private
export const getWorkouts = expressAsyncHandler(
    async (req, res) => {
        const workouts = await prisma.workout.findMany({
            include: { exercices: true },
            orderBy: { createdAt: 'desc' },
        });
        if (!workouts) {
            res.status(404);
            throw new Error('Workouts not finded');
        }
        res.json(workouts);
    }
);
// @desc    create workout
// @route   POST api/workout
// @access  Private
export const createWorkout = expressAsyncHandler(
    async (req, res) => {
        const { name, exerciceIds } = req.body;
        const workout = await prisma.workout.create({
            data: {
                name,
                exercices: {
                    connect: exerciceIds.map((id) => ({
                        id: +id,
                    })),
                },
            },
        });
        res.json({ workout });
    }
);
// @desc    update workout
// @route   PUT api/workout/:id
// @access  Private
export const updateWorkout = expressAsyncHandler(
    async (req, res) => {
        const { name, exerciceIds } = req.body;
        const workout = await prisma.workout.update({
            where: { id: +req.params.id },
            data: {
                name,
                exercices: {
                    set: exerciceIds.map((id) => ({
                        id: +id,
                    })),
                },
            },
        });
        res.json({ workout });
    }
);
// @desc    delete workout
// @route   DELETE api/workout/:id
// @access  Private
export const deleteWorkout = expressAsyncHandler(
    async (req, res) => {
        await prisma.workout.delete({
            where: { id: +req.params.id },
        });
        res.json({ msg: 'Success Delete' });
    }
);
