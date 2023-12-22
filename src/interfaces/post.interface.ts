import mongoose from "mongoose";
import {UserInterface} from "./user.interface";
import {CommentInterface} from "./comment.interface";

export interface PostInterface {
    _id: mongoose.Types.ObjectId,
    description: string,
    images?: { public_id: string, url: string }[],
    likeCount: number,
    privacy: PostPrivacy,
    user: UserInterface,
    comments: CommentInterface[],
    createdAt: Date,
    updatedAt: Date,
}

export interface CreatePostDto {
    description: string,
    images?: { public_id: string, url: string }[],
    privacy?: PostPrivacy
    user: mongoose.Types.ObjectId,
}

export enum PostPrivacy {
    PUBLIC = 'public',
    PRIVATE = 'private',
    FRIENDS = 'fiends'
}