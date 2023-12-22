import { StatusCodes } from 'http-status-codes';
import type { Response, Request, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import config from '../config/config';

const sendDevError = (
    err: {
        status: number;
        statusText: string;
        message: string;
        stack: string | undefined;
        error: AppError;
    },
    res: Response,
) =>
    res.status(err.status).json({
        statusText: err.statusText,
        message: err.message,
        stack: err.stack,
        error: err,
    });

const sendProdError = (
    err: {
        status: number;
        statusText: string;
        message: string;
        stack: string | undefined;
        error: AppError;
    },
    res: Response,
) => {
    return res.status(err.status).json({
        statusText: err.statusText,
        message: err.message,
    });
};

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    const errObj = {
        message: 'Something went wrong',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: 'Error',
        stack: err.stack,
        error: err,
    };

    if (err instanceof AppError) {
        errObj.message = err.message;
        errObj.status = err.statusCode;
        errObj.statusText = err.statusText;
        errObj.stack = err.stack;
    }

    if (err.name == 'TokenExpiredError') {
        errObj.status = 401;
        errObj.message = err.message;
    }

    if (config.app.env === 'development') {
        // if (err instanceof QueryFailedError) {
        //     if (err.driverError.code === '23505') {
        //         errObj.message = err.driverError.detail;
        //         errObj.status = StatusCodes.CONFLICT;
        //         errObj.statusText = 'Fail';
        //         errObj.stack = err.stack;
        //     }
        // }

        sendDevError(errObj, res);
    } else if (config.app.env === 'production') {
        sendProdError(errObj, res);
    }
};

export default errorHandler;
