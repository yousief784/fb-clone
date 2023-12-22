import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String },
});

const Token = model('Token', tokenSchema);
export default Token;
