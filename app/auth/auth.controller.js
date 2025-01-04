import 'dotenv/config';
import { prisma } from '../prisma.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { hash, verify } from 'argon2';

// @desc    register user
// @route   POST api/auth/registration
// @access  Public
export const registationUser = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const userAlreadyCreated =
            await prisma.user.findUnique({
                where: {
                    email,
                },
            });
        if (userAlreadyCreated) {
            res.status(400);
            throw new Error('User already exist');
        }
        const user = await prisma.user.create({
            data: {
                email,
                password: await hash(password),
                name: 'JohnTester',
            },
        });
        const token = generateToken(user.id);
        res.json({ user, token });
    }
);

// @desc    auth user
// @route   POST api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (await verify(user.password, password)) {
        const token = generateToken(user.id);
        res.status(200);
        res.json({
            message: 'Authentification success',
            token: token,
        });
        return;
    }
    res.status(403);
    throw new Error('Forbidden');
});

function generateToken(userId) {
    return jwt.sign(
        {
            userId,
        },
        process.env.ACCESS_TOKEN,
        {
            expiresIn: '10h',
        }
    );
}
