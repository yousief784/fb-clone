import { Router } from 'express';
import { login, refreshToken, register, show, logout } from '../../controllers/user/auth';
import validate from '../../middlewares/validate';
import { loginValidator, registerValidator } from '../../validators/auth.validator';
import { isObjectId } from '../../middlewares/checkObjectId';
import authMiddleWare from '../../middlewares/auth.middleware';
import { isEmailExist } from '../../middlewares/checkEmailExist';
import multer from "multer";
import storage from '../../apis/multer'

const authRouter: Router = Router();

const uploadProfileImage = multer({ storage }).single('profileImage');

/**
 * @route /api/users/auth/register
 */
authRouter.post('/register', uploadProfileImage, validate(registerValidator), isEmailExist, register);

/**
 * @route /api/users/auth/login
 */
authRouter.post('/login', validate(loginValidator), login);

/**
 * @route /api/users/auth/refresh-token
 */
authRouter.get('/refresh-token', refreshToken);


authRouter.use(authMiddleWare)

/**
 * @route /api/users/auth/logout
 * */
authRouter.get('/logout', logout);

/**
 * @route /api/users/auth/:userId
 */
authRouter.get('/:userId', isObjectId, show);

export default authRouter;
