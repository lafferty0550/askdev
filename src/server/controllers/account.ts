import {Request, Response} from 'express';

import db from '../models';
import Tools from '../tools';

const refreshTokens = {} as {
    [key: string]: any
};

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await db.user.findOne({email}, {__v: 0});
        if (!user)
            return res.status(401).send({
                success: false,
                msg: 'user does not exist'
            });
        const isMatch = Tools.compareHash(password, user.password as string);
        if (!isMatch)
            return res.status(401).send({
                success: false,
                msg: 'invalid credentials'
            });

        const token = Tools.generateJWT('access', user.id);
        const refreshToken = Tools.generateJWT('refresh', user.id);

        const response = {
            success: true,
            user: {
                ...user.toJSON(),
                password: undefined
            },
            token,
            refreshToken,
            msg: 'login successful'
        };
        refreshTokens[refreshToken] = response;
        res.send(response);
    } catch (err) {
        console.error(err.toString());
        res.status(401).send({
            success: false,
            msg: err.toString()
        });
    }
};

export const register = async (req: Request, res: Response) => {
    const {email, nickname, password} = req.body

    try {
        await new db.user({email, nickname, password: Tools.generateHash(password)}).save();
        res.json({success: true, msg: 'register successful'});
    } catch (err) {
        console.error(err.toString());
        res.status(401).send({
            success: false,
            msg: err.toString()
        });
    }
};

export const refreshToken = (req: Request, res: Response) => {
    const {refreshToken, id} = req.body

    if (refreshToken && (refreshToken in refreshTokens))
        res.send({
            success: true,
            token: Tools.generateJWT('access', id)
        });
    else {
        console.error('refresh token failed: no refresh token')
        res.status(404).json({
            success: false,
            msg: 'invalid refresh token'
        });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const decoded: any = Tools.decodeJWT(req.headers['x-access-token'] as string);
        const user = await db.user.findById(decoded.id, {__v: 0, password: 0});
        res.send({
            success: true,
            user: user
        });
    } catch (err) {
        console.error(err.toString());
        res.status(401).send({
            success: false,
            msg: err.toString()
        });
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
        res.send({
            success: true,
            user: user
        });
    } catch (err) {
        console.error(err.toString());
        res.status(401).send({
            success: false,
            msg: err.toString()
        });
    }
};