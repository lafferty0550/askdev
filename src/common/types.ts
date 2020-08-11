import {Schema} from 'mongoose';

import {IComment} from '../server/models';

export interface IUser {
    email: string,
    nickname: string,
    password?: String,

    likedQuestions: IQuestion[],
    staredQuestions: IQuestion[],

    questions: IQuestion[],
    comments: IComment[]
}

export interface IQuestion {
    _id?: string,
    title: string,
    body: string,
    date: string,
    likes: number,
    stars: number,
    comments: IComment[]
}