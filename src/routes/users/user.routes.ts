import {Router} from "express";
import {
    acceptFriendRequest,
    getFriendRequest,
    refuseFriendRequest,
    sendFriendRequest
} from "../../controllers/user/user/friendRequest";

const userRouter: Router = Router()

userRouter
    .route('/friend-request')
    .get(getFriendRequest)
    .post(sendFriendRequest)
    .put(acceptFriendRequest)
    .delete(refuseFriendRequest)
export default userRouter