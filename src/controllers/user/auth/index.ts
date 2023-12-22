import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler';
import {BadRequestError, ForbiddenError, NotFoundError, UnAuthorizedError} from '../../../utils/errors';
import {StatusCodes} from 'http-status-codes';
import AuthModel from '../../../models/users/auth';
import {StatusText} from '../../../interfaces/statusCodeText.interface';
import RequestWithUser from '../../../interfaces/requestWithUser';
import mongoose from "mongoose";
import cloudinary from "../../../apis/cloudnairy";

const authModel = new AuthModel();

/**
 * @route /api/users/auth/:userId
 * @param {string} userId
 * @method get
 */
export const show = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const user = await authModel.show(req.params.userId);

    if (!user) throw new NotFoundError('Not found user with this id');

    res.status(StatusCodes.OK).json({
        status: StatusText.SUCCESS,
        data: user,
        message: 'OK',
    });
});

/**
 * @route /api/users/auth/login
 * @method post
 * @RequestBody ()
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
        const profileImage = req.file && req.file
        let profileImageObject: { public_id: string, url: string } = {
            public_id: 'social-media/profileImage/default',
            url: 'https://res.cloudinary.com/dsjqrrbkk/image/upload/v1701055766/social-media/profileImage/default.png'
        }

        if (profileImage) {
            await cloudinary.uploader.upload(profileImage.path,
                {
                    folder: 'social-media/profileImage',
                    public_id: `${Date.now()}`, // Optional: specify a custom public_id
                    resource_type: "auto"
                },
                (error, result) => {
                    if (error) {
                        // error in handling this
                        throw new ForbiddenError(error.message)
                    } else if (result) {
                        profileImageObject = {public_id: result.public_id, url: result.url}
                        return result
                    }
                }
            );
        }


        const user = await authModel.register({...req.body, profileImage: profileImageObject});

        res.cookie('jwt', user.refreshToken, {
            httpOnly: true,
            // secure: true,
        }).status(StatusCodes.CREATED)
            .json({
                status: StatusText.SUCCESS,
                data: user.data,
                message: 'verification token sended to your email',
            });
    })
;

/**
 * @route /api/user/auth/login
 * @method post
 * @RequestBody (email, password)
 */
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await authModel.login(req.body);

    if (!user) throw new BadRequestError('invalid email or password');
    res.status(StatusCodes.OK)
        .cookie('jwt', user.refreshToken, {
            httpOnly: true,
            // secure: true,
        })
        .json({
            status: StatusText.SUCCESS,
            data: user.data,
            message: 'OK',
        });
});

/**
 * @route /api/users/auth/refresh-token
 * @method get
 */
export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {jwt} = req.cookies;

    if (!jwt) throw new UnAuthorizedError('Unauthorized');

    const validToken = await authModel.refreshToken(jwt);

    if (!validToken) throw new ForbiddenError('invalid token');
    res.status(StatusCodes.OK).json({
        status: StatusText.SUCCESS,
        data: validToken,
        message: 'OK',
    });
});

/**
 * @route /api/users/auth/logout
 * @required (auth)
 * */
export const logout = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.user && req.user._id
    if (!userId || !mongoose.Types.ObjectId.isValid(userId))
        throw new ForbiddenError("invalid jwt or id")

    const data = await authModel.logout(new mongoose.Types.ObjectId(userId))

    if (!data) throw new ForbiddenError("you already logedout")
    res.clearCookie('jwt', {httpOnly: true}).status(204).json()
})
