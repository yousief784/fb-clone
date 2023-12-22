import {Request, Response} from 'express'
import asyncHandler from "express-async-handler";
import PostModel from '../../models/posts'
import mongoose from "mongoose";
import RequestWithUser from "../../interfaces/requestWithUser";
import {ForbiddenError, NotFoundError} from "../../utils/errors";
import {StatusCodes} from "http-status-codes";
import {StatusText} from "../../interfaces/statusCodeText.interface";
import cloudinary from "../../apis/cloudnairy";

const postModel = new PostModel()
export const index = asyncHandler(async (req: Request, res: Response) => {
    const {page, limit} = req.query
    const posts = await postModel.index({page: Number(page), limit: Number(limit)})

    if (!posts) throw new NotFoundError("Not found posts")

    res.status(StatusCodes.OK).json({
        status: StatusText.SUCCESS,
        data: posts,
        message: "OK"
    })
})

export const show = asyncHandler(async (req: Request, res: Response) => {

})

export const create = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.user && new mongoose.Types.ObjectId(req.user._id)
    let imagesArray: { public_id: string, url: string }[] = []
    const uploadFile = await Promise.all((req.files as Express.Multer.File[]).map(async (image) => {
        const result = await cloudinary.uploader.upload(image.path,
            {
                folder: 'social-media/posts',
                public_id: `${Date.now()}`, // Optional: specify a custom public_id
                resource_type: "auto"
            },
            (error, result) => {
                if (error) {
                    // error in handling this
                    throw new ForbiddenError(error.message)
                } else if (result) {
                    imagesArray.push({public_id: result.public_id, url: result.url})
                }
            }
        );
    }))

    const createPost = await postModel.create({...req.body, user: userId, images: imagesArray})

    if (!createPost) throw new ForbiddenError("Can't create post")

    res.status(StatusCodes.CREATED).json({
        status: StatusText.SUCCESS,
        data: createPost,
        message: "OK"
    })
})
export const update = asyncHandler(async (req: Request, res: Response) => {

})
export const deletePost = asyncHandler(async (req: Request, res: Response) => {

})