interface Config {
    app: {
        server_url: string;
        env: NODE_ENV_ENUM;
        port: number;
    };
    mail: {
        host: string;
        user: string;
        pass: string;
        service: string;
    };
    client: {
        client_url: string;
    };
    db: {
        mongoUrl: string;
    };
    jwt: {
        accessToken: {
            secret: string;
            expiresIn: number;
        };
        refreshToken: {
            secret: string;
            expiresIn: number;
        };
    };
    cloudinary: {
        cloudName: string,
        apiKey: string,
        apiSecret: string
    }
}

enum NODE_ENV_ENUM {
    prod = 'production',
    dev = 'development',
}

export default Config;
