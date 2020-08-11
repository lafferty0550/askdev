import {model, Schema, Document} from 'mongoose';

import {IUser} from '../../common/types';

export interface IUserDoc extends IUser, Document {}

const schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },

    likedQuestions: [{
        type: Schema.Types.ObjectId,
        ref: 'question'
    }],
    staredQuestions: [{
        type: Schema.Types.ObjectId,
        ref: 'question'
    }],

    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'question'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

export default model<IUserDoc>('user', schema);