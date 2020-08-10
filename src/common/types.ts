import {IComment, IQuestion} from '../server/models';

export interface IUser {
    email: string,
    nickname: string,
    password?: String,

    likedQuestions: IQuestion[],
    staredQuestions: IQuestion[],

    questions: IQuestion[],
    comments: IComment[]
}