import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../schemas/user';
import { BadRequestError } from '../utils/errors';

export const isEmailExist = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.countDocuments({ email });
    if (user) throw new BadRequestError('Email is already exist!');
    next()
});
