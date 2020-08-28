import * as mongoose from 'mongoose';

import {IQuestion} from '../common/types';

export default [
    {
        _id: mongoose.Types.ObjectId(),
        title: 'How to implement my own store like redux?',
        body: 'I want to implement my own global store in my application but i dont know how to do it.. Please, help..',
        date: Date.now().toString(),
        likes: 0,
        stars: 0,
        comments: []
    },
    {
        _id: mongoose.Types.ObjectId(),
        title: 'What should know a junior frontend developer?',
        body: 'I have been getting ready for an interview for last two weeks and i dont know what should I learn the most',
        date: Date.now().toString(),
        likes: 0,
        stars: 0,
        comments: []
    }
] as Array<IQuestion>;