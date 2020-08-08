import {Schema, Document, model} from 'mongoose';

import {IComment} from './comment';

export interface IQuestion extends Document {
    title: string,
    body: string,
    date: Date,
    likes: number,
    stars: number,
    comments: IComment[]
}

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

export default model<IQuestion>('question', schema);