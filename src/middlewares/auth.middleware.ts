import { Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { ForbiddenError, UnAuthorizedError } from '../utils/errors';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import RequestWithUser from '../interfaces/requestWithUser';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

const authMiddleWare = asyncHandler(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) throw new UnAuthorizedError('Invalid authorization header');

    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, config.jwt.accessToken.secret) as JwtPayload;
    req.user = {
        _id: decode._id,
    };

    next();
});

export default authMiddleWare;
