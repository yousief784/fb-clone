import mongoose from "mongoose";
import {PostInterface, PostPrivacy} from "../interfaces/post.interface";

const postSchema = new mongoose.Schema<PostInterface>(
    {
        description: {
            type: String,
            default: ''
        },
        images: [{
            public_id: String,
            url: String,
            _id: false
        }],
        likeCount: {
            type: Number,
            default: 0
        },
        privacy: {
            type: String,
            enum: PostPrivacy,
            default: PostPrivacy.PUBLIC
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comments: [{
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }]
    }
    , {timestamps: true})


const Post = mongoose.model<PostInterface>('Post', postSchema)

export default Post