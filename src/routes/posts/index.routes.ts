import {Router} from "express";
import {create, deletePost, index, show, update} from "../../controllers/posts";
import authMiddleWare from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate";
import {CreatePostValidator} from "../../validators/post.validators";
import multer from 'multer'
import storage from '../../apis/multer'

const postRouter: Router = Router();

const uploadPostsImage = multer({ storage }).array('images', 10);

/**
 * @route /api/posts
 * */
postRouter.route('/')
    .get(index)
    .post(authMiddleWare, uploadPostsImage, validate(CreatePostValidator), create)

/**
 * @route /api/posts/:postId
 * */
postRouter.route('/:postId')
    .get(show)
    .put(update)
    .delete(deletePost)

export default postRouter