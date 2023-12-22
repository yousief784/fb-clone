import {Response} from 'express'
import asyncHandler from "express-async-handler";
import RequestWithUser from "../../../interfaces/requestWithUser";
import mongoose from "mongoose";
import {BadRequestError, ForbiddenError, NotFoundError} from "../../../utils/errors";
import PendingFriendsModel from "../../../models/users/user/friendRequest";
import {StatusCodes} from "http-status-codes";
import {StatusText} from "../../../interfaces/statusCodeText.interface";

const pendingFriendsModel = new PendingFriendsModel()

export const sendFriendRequest = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.user && req.user._id
    const {receiveFriendRequest} = req.body

    if (!mongoose.Types.ObjectId.isValid(receiveFriendRequest) || userId == receiveFriendRequest) throw new BadRequestError("invalid receive friend id")

    const sendRequest = await pendingFriendsModel.sendFriendRequest({sendRequest: new mongoose.Types.ObjectId(userId), receiveRequest: new mongoose.Types.ObjectId(receiveFriendRequest)})

    if (!sendRequest) throw new ForbiddenError("can't send friend request")

    res.status(StatusCodes.CREATED).json({
        status: StatusText.SUCCESS,
        data: null,
        message: "Sent friend request"
    })
})

export const getFriendRequest = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.user && req.user._id
    const getFriendRequest = await pendingFriendsModel.getFriendRequest(new mongoose.Types.ObjectId(userId))

    if (!getFriendRequest) throw new NotFoundError("NO Pending Friend Request")

    res.status(StatusCodes.OK).json({
        status: StatusText.SUCCESS,
        data: getFriendRequest,
        message: "OK"
    })
})

export const acceptFriendRequest = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.user && req.user._id
    const {acceptUserRequest} = req.body

    if (!acceptUserRequest || !mongoose.Types.ObjectId.isValid(acceptUserRequest) || userId == acceptUserRequest) throw new BadRequestError("invalid receive friend id")

    const acceptFriendRequest = await pendingFriendsModel.acceptFriendRequest({userId: new mongoose.Types.ObjectId(userId), acceptUserRequest: new mongoose.Types.ObjectId(acceptUserRequest)})

    if (!acceptUserRequest) throw new ForbiddenError("try again later!")

    res.status(StatusCodes.OK).json({
        status: StatusText.SUCCESS,
        data: null,
        message: "Accepted"
    })
})

export const refuseFriendRequest = asyncHandler(async (req: RequestWithUser, res: Response) => {
    const userId = req.user && req.user._id
    const {refusedUserRequest} = req.body

    if (!refusedUserRequest || !mongoose.Types.ObjectId.isValid(refusedUserRequest) || userId == refusedUserRequest) throw new BadRequestError("invalid receive friend id")

    const refusedFriendRequest = await pendingFriendsModel.refuseFriendRequest({userId: new mongoose.Types.ObjectId(userId), refusedFriendRequest: new mongoose.Types.ObjectId(refusedUserRequest)})

    if (!refusedFriendRequest) throw new ForbiddenError("try again later!")

    res.status(StatusCodes.NO_CONTENT)
})