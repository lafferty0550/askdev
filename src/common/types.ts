import {Schema} from "mongoose";

/**
 * Models
 */

export interface IUser {
    _id: any,

    email: string,
    nickname: string,
    password: string,

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

export interface IComment {
    _id: any,
    body: string,
    user: Schema.Types.ObjectId,
    date: Date,
    likes: number,
    comments: any
}

/**
 * Returned data from server
 */

export type LoginData = { user: IUser, token: string, refreshToken: string };
export type RegisterData = { msg: string };
export type RefreshTokenData = { token: string };
export type GetMeData = { user: IUser };
export type PatchMeData = { user: IUser };

export type GetQuestionsData = { questions: IQuestion[] };
export type GetQuestionData = { question: IQuestion };
export type PostQuestionData = any;

export type PostCommentData = any;

export type Data = LoginData | RegisterData | RefreshTokenData | GetMeData | PatchMeData | GetQuestionsData |
    GetQuestionData | PostQuestionData | PostCommentData;


/**
 * Response from server
 */


export type LoginResponse = { data?: LoginData, msg: string };
export type RegisterResponse = { data?: RegisterData, msg: string };
export type RefreshTokenResponse = { data?: RefreshTokenData, msg?: string };
export type GetMeResponse = { data?: GetMeData, msg?: string };
export type PatchMeResponse = { data?: PatchMeData, msg?: string };

export type GetQuestionsResponse = { data?: GetQuestionsData, msg?: string };
export type GetQuestionResponse = { data?: GetQuestionData, msg?: string };
export type PostQuestionResponse = { data?: PostQuestionData, msg: string };

export type PostCommentResponse = { data?: any, msg: string };

export type Response = LoginResponse | RegisterResponse | RefreshTokenResponse | GetMeResponse | PatchMeResponse |
    GetQuestionsResponse | GetQuestionResponse | PostQuestionResponse | PostCommentResponse;


/**
 * Sent data from client
 */

export type LoginPayload = { email: string, password: string };
export type RegisterPayload = { email: string, nickname: string, password: string };

export type PostQuestionPayload = { title: string, body: string };

export type PostCommentPayload = { body: string };


/**
 * Post comment query
 * /comment?target=${TARGET}&id=${ID}
 * where TARGET is a collection (question, comment etc.)
 * and ID is its ID
 */

export type PostCommentQuery = { target: string, id: string };