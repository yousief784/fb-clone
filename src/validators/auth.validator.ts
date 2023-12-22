import Joi from 'joi';
import { UserGender } from '../interfaces/user.interface';
export const registerValidator = {
    firstName: Joi.string().required().trim().max(50),
    lastName: Joi.string().required().trim().max(50),
    email: Joi.string().email().required().trim().max(50),
    password: Joi.string().required().trim().min(8).max(50),
    confirmPassword: Joi.string().required().trim().valid(Joi.ref('password')).messages({
        'any.ref': 'password not equal',
    }),
    userGender: Joi.string().required().trim().valid(UserGender.MALE, UserGender.FEMALE),
};

export const loginValidator = {
    email: Joi.string().required().email(),
    password: Joi.string().required().trim().min(8),
};
