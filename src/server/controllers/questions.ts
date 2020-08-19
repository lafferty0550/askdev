import {Request, Response} from 'express';

import {
    GetQuestionResponse,
    GetQuestionsResponse,
    PostQuestionResponse
} from '../../common/types';
import db from '../models';

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await db.question.find({}, {__v: 0});
        res.send({data: {questions}} as GetQuestionsResponse);
    } catch (err) {
        res.status(500).send({msg: err.toString()} as GetQuestionsResponse);
    }
};

export const getQuestion = async (req: Request, res: Response) => {
    try {
        const question = await db.question.findOne({_id: req.params.id}, {__v: 0});
        res.json({data: {question}} as GetQuestionResponse);
    } catch (err) {
        res.status(500).send({msg: err.toString()} as GetQuestionResponse);
    }
};

export const postQuestion = async (req: Request, res: Response) => {
    try {
        await db.question.create({...req.body, date: new Date()});
        res.status(200).json({msg: 'created successfuly'} as PostQuestionResponse);
    } catch (err) {
        res.status(500).json({msg: `Error while creating: ${err.toString()}`} as PostQuestionResponse);
    }
};