import {Request, Response} from 'express';

import db from '../models';
import Tools from '../tools';

const refreshTokens = {} as {
    [key: string]: any
};

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await db.question.find({}, {__v: 0});
        res.send({
            success: true,
            questions
        });
    } catch (err) {
        console.error(err.toString());
        res.status(401).send({
            success: false,
            msg: err.toString()
        });
    }
};

export const getQuestion = async (req: Request, res: Response) => {
    try {
        const question = await db.question.findOne({_id: req.params.id}, {__v: 0});
        res.json({success: true, question});
    } catch (err) {
        console.error(err.toString());
        res.status(401).send({
            success: false,
            msg: err.toString()
        });
    }
};