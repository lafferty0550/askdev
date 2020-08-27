import {Schema, Document, model, HookSyncCallback, Query, HookNextFunction} from 'mongoose';

import {IQuestion} from '$common/types';

export interface IQuestionDoc extends Document, IQuestion {
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
}, {versionKey: false});

const autoPopulate: HookSyncCallback<Query<any>> = function (next: HookNextFunction) {
    this.populate({path: 'comments', populate: {path: 'user'}});
    next();
}

schema.pre('find', autoPopulate);
schema.pre('findOne', autoPopulate);
schema.pre('findById', autoPopulate);

export default model<IQuestionDoc>('question', schema);