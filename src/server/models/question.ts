import {Schema, Document, model} from 'mongoose';

import {IQuestion} from '../../common/types';

export interface IQuestionDoc extends IQuestion, Document {}

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

export default model<IQuestionDoc>('question', schema);