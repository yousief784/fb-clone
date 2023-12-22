import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { BadRequestError } from '../utils/errors';
import asyncHandler from 'express-async-handler';

export const isObjectId = asyncHandler((req: Request, res: Response, next: NextFunction) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) throw new BadRequestError('invalid id');
    next();
});
