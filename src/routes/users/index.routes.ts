import { Router } from 'express';
import authRouter from './auth.routes';
import userRouetr from './user.routes'
import authMiddleware from "../../middlewares/auth.middleware";

const userRouterMain: Router = Router();

userRouterMain.use('/auth', authRouter);
userRouterMain.use('/', authMiddleware, userRouetr);

export default userRouterMain;
