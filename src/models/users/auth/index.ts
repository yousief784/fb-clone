import { CreateUserDto, LoginUserDto } from '../../../interfaces/user.interface';
import User from '../../../schemas/user';
import { hashPassword, verifyPassword } from '../../../utils/password';
import crypto from 'crypto';
import { generateJwtToken } from '../../../utils/token';
import { TOKEN_TYPE } from '../../../interfaces/token.interface';
import { sendVerifyEmail } from '../../../utils/email';
import Token from '../../../schemas/token';
import jwt from 'jsonwebtoken';
import config from '../../../config/config';
import { JwtPayload } from '../../../interfaces/jwtPayload.interface';
import mongoose from 'mongoose';

class AuthModel {
    show = async (userId: string) => {
        const user = await User.findById(userId, {
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            profileImage: true
        });

        if (!user) return null;

        return user;
    };

    register = async (body: CreateUserDto) => {
        const hashedPassword = hashPassword(body.password);
        const user = await User.create({
            email: body.email,
            firstName: body.firstName,
            lastName: body.lastName,
            userGender: body.userGender,
            password: hashedPassword,
            profileImage: body.profileImage
        });
        const verifyEmailString = this.generateVerifyToken();
        const signAccessToken = generateJwtToken(user._id, TOKEN_TYPE.ACCESS_TOKEN);
        const signRefreshToken = generateJwtToken(user._id, TOKEN_TYPE.REFRESH_TOKEN);
        user.verifiyEmailToken = verifyEmailString;
        await user.save();
        await Token.create({ user: user._id, refreshToken: signRefreshToken });

        // sendVerifyEmail(user.email, user.verifiyEmailToken);
        return {
            data: {
                _id: user._id,
                accessToken: signAccessToken,
                role: user.role
            },
            refreshToken: signRefreshToken,
        };
    };

    login = async (body: LoginUserDto) => {
        const user = await User.findOne(
            { email: body.email },
            {firstName: false, lastName: false, email: false}
        );

        if (!user) return null;

        const verifyPass = verifyPassword(body.password, user.password);

        if (!verifyPass) return null;

        const generateAccessJwtToken = generateJwtToken(user._id, TOKEN_TYPE.ACCESS_TOKEN);
        const generateRefreshJwtToken = generateJwtToken(user._id, TOKEN_TYPE.REFRESH_TOKEN);

        await Token.create({ user: user._id, refreshToken: generateRefreshJwtToken });
        return {
            data: {
                _id: user._id,
                role: user.role,
                accessToken: generateAccessJwtToken,
            },
            refreshToken: generateRefreshJwtToken,
        };
    };

    refreshToken = async (jwtToken: string) => {
        const getUserFromDb = await Token.findOne({ refreshToken: jwtToken }, { user: true });
        const decode = jwt.verify(jwtToken, config.jwt.refreshToken.secret) as JwtPayload;
        if (!getUserFromDb) return null;

        const userIdDecodedFromCookies = new mongoose.Types.ObjectId(decode._id);
        if (String(getUserFromDb.user) != decode._id) return null;

        const generateAccessJwtToken = generateJwtToken(userIdDecodedFromCookies, TOKEN_TYPE.ACCESS_TOKEN);
        return { accessToken: generateAccessJwtToken };
    };

    logout = async (_id: mongoose.Types.ObjectId) => {
        const deleteQuery = await Token.deleteMany({user: _id})

        if (!deleteQuery.deletedCount) return null

        return {deleted: true}
    }

    private generateVerifyToken = (): string => crypto.randomBytes(32).toString('hex');
}

export default AuthModel;
