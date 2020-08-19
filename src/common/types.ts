import {IComment} from '../server/models';
import {MongooseDocument, MongooseDocumentOptionals} from 'mongoose';

export interface IUser {
    _id: any,

    email: string,
    nickname: string,
    password?: string,

    likedQuestions: IQuestion[],
    staredQuestions: IQuestion[],

    questions: IQuestion[],
    comments: IComment[]
}

export interface IQuestion {
    _id: any,
    title: string,
    body: string,
    date: string,
    likes: number,
    stars: number,
    comments: IComment[]
}

export type LoginData = { user: IUser, token: string, refreshToken: string };
export type RegisterData = any;
export type RefreshTokenData = { token: string };
export type GetMeData = { user: IUser };
export type PatchMeData = { user: IUser };

export type GetQuestionsData = { questions: IQuestion[] };
export type GetQuestionData = { question: IQuestion };
export type PostQuestionData = any;

export type Data = LoginData | RegisterData | RefreshTokenData | GetMeData | PatchMeData | GetQuestionsData |
    GetQuestionData | PostQuestionData;

export type LoginResponse = { data?: LoginData, msg: string };
export type RegisterResponse = { data?: RegisterData, msg: string };
export type RefreshTokenResponse = { data?: RefreshTokenData, msg: string };
export type GetMeResponse = { data?: GetMeData, msg?: string };
export type PatchMeResponse = { data?: PatchMeData, msg: string };


export type GetQuestionsResponse = { data?: GetQuestionsData, msg?: string };
export type GetQuestionResponse = { data?: GetQuestionData, msg?: string };
export type PostQuestionResponse = { data?: PostQuestionData, msg: string };

export type Response = LoginResponse | RegisterResponse | RefreshTokenResponse | GetMeResponse | PatchMeResponse |
    GetQuestionsResponse | GetQuestionResponse | PostQuestionResponse;