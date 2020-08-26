import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import db from '$server/models';
import {Validator} from '$common/helpers/validator';
import {IUser, LoginResponse, RegisterPayload} from '$common/types';
import {typedSend} from '$server/generics';
import {EMAIL_IS_ALREADY_EXISTS, JWT_EXPIRES, NO_TOKEN, VALIDATION_FAILED, TOKEN_SECRET} from '$server/constants';

/**
 * checkEmail middleware checks if user with the given e-mail is already exist
 * used while signing up only
 */

export const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
    const _send = typedSend<LoginResponse>(res);
    try {
        const user: IUser = await db.user.findOne({email: req.body.email});
        if (user)
            return _send({msg: EMAIL_IS_ALREADY_EXISTS}, 400);
        next();
    } catch (err) {
        _send({msg: err.toString()}, 500);
    }
};

/**
 * validate middleware checks are email, nickname and password valid
 * used while signing in and signing up
 */

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    const _send = typedSend<LoginResponse>(res);
    const {email, nickname, password}: RegisterPayload = req.body;

    const isEmailValid: boolean = Validator.isEmail(email);
    // if login, nickname does not exist
    const isNicknameValid: boolean = nickname ? Validator.isNickname(nickname) : true;
    const isPasswordValid: boolean = Validator.isPassword(password);

    if (isEmailValid && isNicknameValid && isPasswordValid)
        next();
    else _send({msg: VALIDATION_FAILED}, 401);
};

/**
 * checkJWT middleware checks does JWT exist and is valid
 * used in secure routes
 */

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    const _send = typedSend<LoginResponse>(res);

    let token = <string>req.headers['x-access-token'];
    if (!token)
        return _send({msg: NO_TOKEN}, 401);

    try {
        jwt.verify(token, TOKEN_SECRET);
        next();
    } catch (err) {
        _send({msg: JWT_EXPIRES}, 500);
    }
};