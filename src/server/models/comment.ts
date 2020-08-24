import {Schema, Document, model} from 'mongoose';

import {IComment} from '$common/types';

export interface ICommentDoc extends Document, IComment {}

const schema = new Schema({
    body: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    date: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }
});

export default model<ICommentDoc>('comment', schema);