import {CreatePostDto, PostInterface} from "../../interfaces/post.interface";
import Post from "../../schemas/post";
import mongoose from "mongoose";
import User from "../../schemas/user";

class PostModel {
    index = async (query: { page: number, limit: number }) => {
        // pagination setup
        const page: number = query.page || 1
        const limit: number = query.limit || 2
        const skip: number = (page - 1) * limit

        const posts = await Post.find({}, {'__v': false, 'updatedAt': false}).populate({
            path: 'user',
            model: User,
            select: ['_id', 'firstName', 'lastName']
        }).skip(skip).limit(limit)

        if (!posts || !posts.length) return null

        return posts
    }

    show = async (postId: mongoose.Types.ObjectId) => {
        // const getPost =
    }

    create = async (body: CreatePostDto) => {
        let createPost = await Post.create(body)
        createPost = await createPost.populate({
            path: 'user',
            model: 'User',
            select: ['_id', 'firstName', 'lastName']
        })

        if (!createPost) return null
        return createPost
    }
}

export default PostModel