import {Schema, model} from 'mongoose';
import {UserGender, UserRole} from '../interfaces/user.interface';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
            trim: true,
            maxlength: [50, 'First Name cannot be more than 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
            trim: true,
            maxlength: [50, 'Last Name cannot be more than 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            unique: true,
            maxlength: [50, 'Email cannot be more than 50 characters'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
            minlength: [8, 'Password must be at least 8 characters long'],
        },
        userGender: {
            type: String,
            enum: UserGender,
            required: [true, 'Gender is required'],
        },
        phoneNumber: {
            type: String,
            trim: true,
            minlength: [10, 'Phone Number must be at least 10 characters long'],
        },
        profileImage: {
            public_id: String,
            url: String,
            _id: false
        },
        role: {
            type: Array,
            enum: UserRole,
            default: UserRole.USER,
        },
        isEmailVerified: {
            type: Date,
            default: null,
        },
        verifiyEmailToken: {
            type: String,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        timestamps: true,
    },
);

const User = model('User', userSchema);

export default User;
