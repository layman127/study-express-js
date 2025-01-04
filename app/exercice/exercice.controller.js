import { prisma } from '../prisma.js';
import expressAsyncHandler from 'express-async-handler';
// @desc    get exercice
// @route   GET api/exercice
// @access  Private
export const getExercice = expressAsyncHandler(
    async (req, res) => {
        const exercice = await prisma.exercice.findMany({
            orderBy: { createdAt: 'desc' },
        });
        if (!exercice) {
            res.status(404);
            throw new Error('Workouts not finded');
        }
        res.json(exercice);
    }
);
// @desc    create exercice
// @route   POST api/exercice
// @access  Private
export const createExercice = expressAsyncHandler(
    async (req, res) => {
        const { name, iconPath, time } = req.body;
        const exercice = await prisma.exercice.create({
            data: { name, time, iconPath },
        });

        res.json({ exercice });
    }
);
// @desc    update exercice
// @route   PUT api/exercice/:id
// @access  Private
export const updateExercice = expressAsyncHandler(
    async (req, res) => {
        const { name, time, iconPath } = req.body;
        const exercice = await prisma.exercice.update({
            where: { id: +req.params.id },
            data: { name, time, iconPath },
        });
        if (!exercice) {
            res.status(404);
            throw new Error('Workouts not finded');
        }
        res.json({ exercice });
    }
);
// @desc    delete exercice
// @route   DELETE api/exercice/:id
// @access  Private
export const deleteExercice = expressAsyncHandler(
    async (req, res) => {
        await prisma.exercice.delete({
            where: { id: +req.params.id },
        });
        res.json({ msg: 'Success Delete' });
    }
);
