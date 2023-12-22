import mongoose from "mongoose";
import PendingFriends from "../../../schemas/pendingFriends";
import User from "../../../schemas/user";

class PendingFriendsModel {
    sendFriendRequest = async (body: {
        sendRequest: mongoose.Types.ObjectId,
        receiveRequest: mongoose.Types.ObjectId
    }) => {
        const isAlreadyFriends = await User.findOne({
            _id: body.sendRequest,
            friends: body.receiveRequest
        }, {firstName: true, lastName: true, email: true})

        if (isAlreadyFriends) return null;

        const isSentFriendRequest = await PendingFriends.findOne({
            $or: [
                {
                    sendingRequest: body.sendRequest,
                    receiveRequest: body.receiveRequest
                },
                {
                    sendingRequest: body.receiveRequest,
                    receiveRequest: body.sendRequest
                }
            ]
        })

        if (isSentFriendRequest) return {
            message: "Already requested accept "
        }


        const sendFriendRequest = await PendingFriends.create({
            sendingRequest: body.sendRequest,
            receiveRequest: body.receiveRequest
        })

        if (!sendFriendRequest) return null

        return true
    }
    getFriendRequest = async (userId: mongoose.Types.ObjectId) => {
        let getFriendsRequests = await PendingFriends.find({
                receiveRequest: userId
            },
            {
                '__v': false, 'updatedAt': false, 'receiveRequest': false
            })
            .populate({
                path: 'sendingRequest',
                model: User,
                select: ['_id', 'firstName', 'lastName']
            })

        if (!getFriendsRequests || !getFriendsRequests.length) return null

        return getFriendsRequests
    }
    acceptFriendRequest = async (body: { userId: mongoose.Types.ObjectId, acceptUserRequest: mongoose.Types.ObjectId }) => {
        await User.findById(body.userId).then(async (user: any) => {
            user.friends.push(body.acceptUserRequest)
            await user.save();
        })

        await User.findById(body.acceptUserRequest).then(async (user: any) => {
            user.friends.push(body.userId)
            await user.save()
        })


        return true
    }
    refuseFriendRequest = async (body: { userId: mongoose.Types.ObjectId, refusedFriendRequest: mongoose.Types.ObjectId }) => {
        const deletePending = await PendingFriends.findOneAndDelete({receiveRequest: body.refusedFriendRequest, sendingRequest: body.userId})

        if (!deletePending) return null

        return true
    }
}

export default PendingFriendsModel