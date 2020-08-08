import {model, Schema, Document} from 'mongoose';

import Validator from '../helpers/validator';
import {IComment} from './comment';
import {IQuestion} from './question';

export interface IUser extends Document {
    email: string,
    nickname: string,
    password: String,

    likedComments: IComment[],
    likedQuestions: IQuestion[],

    staredComments: IComment[],
    staredQuestions: IQuestion[],

    questions: IQuestion[],
    comments: IComment[]
}

const schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [Validator.isEmail, 'Please fill the correct email']
    },
    nickname: {
        type: String,
        required: true,
        trim: true,
        validate: [Validator.isNickname, 'Please fill the correct nickname']
    },
    password: {
        type: String,
        required: true,
        validate: [Validator.isPassword, "Please fill longer password"]
    },

    likedComments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    likedQuestions: [{
        type: Schema.Types.ObjectId,
        ref: 'question'
    }],

    staredComments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
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

export default model<IUser>('user', schema);