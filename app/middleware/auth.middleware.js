import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { prisma } from '../prisma.js';

// функция которая проверяет токен пользователя
export const protect = expressAsyncHandler(
    async (req, res, next) => {
        // проверяем что тип токена 'Bearer'
        if (
            req.headers.authorization?.startsWith('Bearer')
        ) {
            //вытаскиваем токен
            let token =
                req.headers.authorization.split(' ')[1];
            // console.log('token: ', token);
            //декодируем токен
            const decoded = jwt.verify(
                token,
                process.env.ACCESS_TOKEN
            );
            // console.log('decoded: ', decoded);
            //так как мы в токен закладывали айди пользователя из бд,
            // проверяем, есть ли в бд пользователь с айди из токена,
            // который пришел в запросе
            const userFound = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            //если пользователь найден в бд -
            // прокидываем его дальше к эндпоинту
            if (userFound) {
                req.user = userFound;
                next();
                //иначе сбрасываем ошибку, что токен неверный
            } else {
                res.status(401);
                throw new Error(
                    'Non authorized, token failed'
                );
            }
        }
    }
);
