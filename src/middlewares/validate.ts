import type { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { BadRequestError } from '../utils/errors';

const validate = (validator: any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = Joi.compile(validator);
    const { error } = validSchema.validate(req.body, { abortEarly: false });

    if (error) {
        throw new BadRequestError(error.message);
    }

    next();
};

export default validate;
