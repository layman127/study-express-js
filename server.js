import express from 'express';
import authRoutes from './app/auth/auth.routes.js';
import userRoutes from './app/user/user.routes.js';
import exerciceRoutes from './app/exercice/exercice.routes.js';
import workoutRoutes from './app/workout/workout.routes.js';
import morgan from 'morgan';
import 'dotenv/config';
import { prisma } from './app/prisma.js';
import {
    errorHandler,
    notFound,
} from './app/middleware/error.middleware.js';
import path from 'path';
import { cors } from 'cors';
// определяем приложение
const app = express();
const stage = process.env.NODE_ENV;

//основная функция
async function main() {
    // подключем морган если НЕ прод
    if (stage == 'development') {
        app.use(morgan('dev'));
    }
    app.use(cors());
    // подключение json для апишек
    app.use(express.json());
    //отдаем статический контент
    const _dirname = path.resolve();
    app.use(
        '/uploads',
        express.static(path.join(_dirname, '/uploads/'))
    );
    //поделючаем роутеры с контроллерами. При каждом запросе эндпоинт ищется среди них.
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/exercice', exerciceRoutes);
    app.use('/api/workout', workoutRoutes);
    //если ни один из роутеров не срабоает, то запустится обработчик ошибок
    app.use(notFound);
    app.use(errorHandler);

    //определяем порт и запускаем сервер
    const PORT = process.env.PORT;
    app.listen(
        PORT,
        console.log(
            `Server started on port = ${PORT} \nStage = ${stage}`
        )
    );
}
main()
    // отключение от бд в конце работы функции
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
