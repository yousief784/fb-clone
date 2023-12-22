import {Schema, model} from 'mongoose'
import {CommentInterface} from "../interfaces/comment.interface";

const commentSchema = new Schema<CommentInterface>({}, {timestamps: true})

const Comment = model<CommentInterface>('Comment', commentSchema)

export default Comment