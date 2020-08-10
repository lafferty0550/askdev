import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import db from '../models';
import Validator from '../../common/helpers/validator';

export const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
       const user = await db.user.findOne({ email: req.body.email });
       if (user)
           return res.status(400).send({
               success: false,
               msg: 'email is already in use'
           });
       next();
    } catch (err) {
        console.error(err.toString());
        res.status(500).send({
            success: false,
            msg: err.toString()
        });
    }
};

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    const {email, nickname, password} = req.body;

    const isEmailValid = Validator.isEmail(email);
    const isNicknameValid = nickname ? Validator.isNickname(nickname) : true;
    const isPasswordValid = Validator.isPassword(password);

    if (isEmailValid && isNicknameValid && isPasswordValid)
        next();
    else res.status(401).send({
        success: false,
        msg: 'validation error'
    });
};

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    let token = (req.headers['authorization'] || req.headers['x-access-token']) as string;
    if (!token)
        return res.status(400).json({
            success: false,
            msg: 'No token'
        });
    if (token.startsWith('Bearer '))
        token = token.slice(7, token.length);

    if (!token)
        return res.status(400).json({
            success: false,
            msg: 'No token'
        });

    try {
        jwt.verify(token, process.env.TOKEN_SECRET || 'mysecretpassword');
        next();
    } catch (err) {
        console.error( err.toString());
        res.status(400).json({
            success: false,
            msg: err.toString()
        });
    }
};