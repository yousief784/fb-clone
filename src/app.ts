import express, { Application, Request, Response } from 'express';
import config from './config/config';
import database from './config/database';
import { StatusCodes } from 'http-status-codes';
import router from './routes/index.routes';
import errorHandler from './middlewares/errorHandler';
import { NotFoundError } from './utils/errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000',
    }),
);

app.get('/', (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Welcome in our api',
    });
});

app.use('/api', router);

app.all('*', (_req: Request, _res: Response) => {
    throw new NotFoundError('not found this route');
});

app.use(errorHandler);

app.listen(config.app.port, () => {
    console.log(`Server Start at ${config.app.server_url}:${config.app.port}`);
    database.connect();
});
