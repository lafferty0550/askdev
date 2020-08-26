import {Schema, Document, model} from 'mongoose';

import {IQuestion} from '$common/types';

export interface IQuestionDoc extends Document, IQuestion {}

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
    date: { // date when this question was posted
        type: Date,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    stars: {
        type: Number,
        default: 0
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

schema.plugin(require('mongoose-autopopulate'));

export default model<IQuestionDoc>('question', schema);