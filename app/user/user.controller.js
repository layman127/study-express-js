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
        res.status(200);
        res.json(user);
    }
);
