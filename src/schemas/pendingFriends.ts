import {Schema, model} from 'mongoose'

const pendingFriendsSchema = new Schema({
    sendingRequest: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiveRequest: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const PendingFriends = model('PendingFriends', pendingFriendsSchema)

export default PendingFriends