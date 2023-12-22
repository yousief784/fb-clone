import { Router } from 'express';
import userRouter from './users/index.routes';
import postRouter from "./posts/index.routes";

const router: Router = Router();
router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;