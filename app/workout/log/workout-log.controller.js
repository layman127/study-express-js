import { prisma } from '../../prisma.js';
import asyncHandler from 'express-async-handler';
// @desc Create new workoutLog
// @route  POST /api/workouts/log/:workoutId
// @access Private
export const createWorkoutLog = asyncHandler(
    async (req, res) => {
        //создаем тренировку из нескольких упражнейний
        // Преобразуем параметр workoutId из строки в число
        const workoutId = +req.params.workoutId;

        // Ищем конкретную тренировку в базе данных по ID, включая связанные упражнения
        const workout = await prisma.workout.findUnique({
            where: { id: workoutId }, // Условие поиска: ID тренировки
            include: { exercices: true }, // Также загружаем связанные упражнения
        });

        // Если тренировка не найдена, возвращаем 404 ошибку и выбрасываем исключение
        if (!workout) {
            res.status(404); // Устанавливаем HTTP статус 404 (не найдено)
            throw new Error('No workout'); // Генерируем ошибку с сообщением
        }

        // Создаем лог тренировки в базе данных
        const workoutLog = await prisma.workoutLog.create({
            data: {
                // Связываем лог с текущим пользователем через его ID
                user: { connect: { id: req.user.id } },
                // Связываем лог с найденной тренировкой
                workout: {
                    connect: { id: workoutId },
                },
                // Создаем записи логов для всех упражнений тренировки
                exerciceLog: {
                    create: workout.exercices.map(
                        // Для каждого упражнения...
                        (exercices) => ({
                            // Создаем объект для логирования упражнения
                            exercices: {
                                connect: {
                                    // Связываем лог упражнения с конкретным упражнением
                                    id: exercices.id,
                                },
                            },
                            // Создаем массив объектов для логирования подходов
                            times: {
                                create: Array.from(
                                    {
                                        length: exercices.time,
                                    }, // Длина массива соответствует количеству подходов (time)
                                    () => ({
                                        // Инициализируем каждую запись с нулями
                                        weight: 0, // Вес по умолчанию 0
                                        repeat: 0, // Повторы по умолчанию 0
                                    })
                                ),
                            },
                            user: {
                                connect: {
                                    id: req.user.id,
                                },
                            },
                        })
                    ),
                },
            },
        });

        res.json(workoutLog);
    }
);
