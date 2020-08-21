import {Request, Response} from 'express';

import {
    GetQuestionResponse,
    GetQuestionsResponse, IQuestion, PostQuestionPayload,
    PostQuestionResponse
} from '$common/types';
import db from '$models';
import {typedSend} from '$server/generics';
import {CREATE_SUCCESS, NOT_FOUND} from '$server/constants';

export const getQuestions = async (req: Request, res: Response) => {
    const _send = typedSend<GetQuestionsResponse>(res);
    try {
        const questions: IQuestion[] = await db.question.find({}, {__v: 0});
        _send({data: {questions}});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};

export const getQuestion = async (req: Request, res: Response) => {
    const _send = typedSend<GetQuestionResponse>(res);
    const _id: string = req.params.id;
    try {
        const question: IQuestion = await db.question.findOne({_id}, {__v: 0});
        if (!question)
            return _send({msg: NOT_FOUND});
        _send({data: {question}});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};

export const postQuestion = async (req: Request, res: Response) => {
    const _send = typedSend<PostQuestionResponse>(res);
    try {
        await db.question.create({...<PostQuestionPayload>req.body, date: new Date()});
        _send({msg: CREATE_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};