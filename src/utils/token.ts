import jwt from 'jsonwebtoken';
import config from '../config/config';
import mongoose from 'mongoose';
import { TOKEN_TYPE } from '../interfaces/token.interface';

export const generateJwtToken = (_id: mongoose.Types.ObjectId, tokenType: TOKEN_TYPE) => {
    let tokenSecret: string;
    let tokenExpiresIn: number;

    if (tokenType == TOKEN_TYPE.ACCESS_TOKEN) {
        tokenSecret = config.jwt.accessToken.secret;
        tokenExpiresIn = config.jwt.accessToken.expiresIn;
    } else {
        tokenSecret = config.jwt.refreshToken.secret;
        tokenExpiresIn = config.jwt.refreshToken.expiresIn;
    }

    return jwt.sign(
        {
            _id,
        },
        tokenSecret,
        {
            expiresIn: tokenExpiresIn,
        },
    );
};
