import { StatusCodes } from 'http-status-codes';
import { StatusText } from '../interfaces/statusCodeText.interface';

export class AppError extends Error {
    statusText: string;
    constructor(
        message: string,
        public statusCode: number,
    ) {
        super(message);
        this.statusText = `${this.statusCode}`.startsWith('4') ? StatusText.FALI : StatusText.ERROR;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

export class UnAuthorizedError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.FORBIDDEN);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
