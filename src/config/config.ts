import 'dotenv/config';
import Config from '../interfaces/config.interface';
import Joi from 'joi';

const envSchema: Joi.ObjectSchema = Joi.object()
    .keys({
        SERVER_URL: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        MONGO_URL: Joi.string().required(),
        ACCESS_JWT_SECRET: Joi.string().required(),
        ACCESS_JWT_EXPIRES_IN: Joi.string().required(),
        REFRESH_JWT_SECRET: Joi.string().required(),
        REFRESH_JWT_EXPIRES_IN: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASS: Joi.string().required(),
        MAIL_SERVICE: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required()
    })
    .unknown();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config: Config = {
    app: {
        server_url: envVars.SERVER_URL,
        env: envVars.NODE_ENV,
        port: envVars.PORT,
    },
    mail: {
        host: envVars.MAIL_HOST,
        user: envVars.MAIL_USER,
        pass: envVars.MAIL_PASS,
        service: envVars.MAIL_SERVICE,
    },
    client: {
        client_url: envVars.CLIENT_URL,
    },
    db: {
        mongoUrl: envVars.MONGO_URL,
    },
    jwt: {
        accessToken: {
            secret: envVars.ACCESS_JWT_SECRET,
            expiresIn: envVars.ACCESS_JWT_EXPIRES_IN,
        },
        refreshToken: {
            secret: envVars.REFRESH_JWT_SECRET,
            expiresIn: envVars.REFRESH_JWT_EXPIRES_IN,
        },
    },
    cloudinary: {
        cloudName: envVars.CLOUDINARY_CLOUD_NAME,
        apiKey: envVars.CLOUDINARY_API_KEY,
        apiSecret: envVars.CLOUDINARY_API_SECRET
    }
};

export default config;
