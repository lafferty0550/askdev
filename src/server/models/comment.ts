import {Schema, Document, model} from 'mongoose';

import Validator from '../../common/helpers/validator';

export interface IComment extends Document {
    body: string,
    user: Schema.Types.ObjectId,
    date: Date,
    likes: number,
    comments: IComment[]
}

const schema = new Schema({
    body: {
        type: String,
        required: true,
        trim: true,
        validate: [Validator.isComment, "Please fill the correct body of the comment"]
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
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

export default model<IComment>('comment', schema);