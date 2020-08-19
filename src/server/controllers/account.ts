import {Request, Response} from 'express';

import db from '../models';
import Tools from '../tools';
import {
    GetMeResponse, LoginData,
    LoginResponse,
    PatchMeResponse,
    RefreshTokenResponse,
    RegisterResponse
} from '../../common/types';

const refreshTokens = {} as {
    [key: string]: LoginData
};

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await db.user.findOne({email}, {__v: 0});
        if (!user)
            return res.status(401).send({msg: 'user does not exist'} as LoginResponse);
        const isMatch = Tools.compareHash(password, user.password as string);
        if (!isMatch)
            return res.status(401).send({msg: 'invalid credentials'} as LoginResponse);

        const token = Tools.generateJWT('access', user.id);
        const refreshToken = Tools.generateJWT('refresh', user.id);

        const data: LoginData = {
            user: {...user.toJSON(), password: undefined},
            token,
            refreshToken,
        };
        refreshTokens[refreshToken] = data;
        res.send({data: data, msg: 'login successful'} as LoginResponse);
    } catch (err) {
        res.status(401).send({msg: err.toString()} as LoginResponse);
    }
};

export const register = async (req: Request, res: Response) => {
    const {email, nickname, password} = req.body

    try {
        await new db.user({email, nickname, password: Tools.generateHash(password)}).save();
        res.json({msg: 'register successful'} as RegisterResponse);
    } catch (err) {
        res.status(401).send({msg: err.toString()} as RegisterResponse);
    }
};

export const refreshToken = (req: Request, res: Response) => {
    const {refreshToken} = req.body
    if (refreshToken && (refreshToken in refreshTokens))
        res.send({data: {token: Tools.generateJWT('access', refreshTokens[refreshToken].user._id)}} as RefreshTokenResponse);
    else {
        res.status(404).json({msg: 'invalid refresh token'} as RefreshTokenResponse);
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const decoded: any = Tools.decodeJWT(req.headers['x-access-token'] as string);
        const user = await db.user.findById(decoded.id, {__v: 0, password: 0});
        res.send({data: {user}} as GetMeResponse);
    } catch (err) {
        res.status(401).send({msg: err.toString()} as GetMeResponse);
    }
};

export const patchMe = async (req: Request, res: Response) => {
    const {changes} = req.body;
    try {
        const decoded: any = Tools.decodeJWT(req.headers['x-access-token'] as string);

        if (changes.password)
            changes.password = Tools.generateHash(changes.password);
        delete changes._id;

        const user = await db.user.updateOne({_id: decoded.id}, {$set: changes});
        res.send({data: {user}} as PatchMeResponse);
    } catch (err) {
        res.status(401).send({msg: err.toString()} as PatchMeResponse);
    }
};