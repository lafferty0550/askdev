import {Request, Response} from 'express';

import db from '$models';
import Tools from '$server/tools';
import {
    GetMeResponse,
    IUser,
    LoginData,
    LoginPayload,
    LoginResponse,
    PatchMeResponse,
    RefreshTokenResponse,
    RegisterPayload,
    RegisterResponse
} from '$common/types';
import {JWTPayload, TokenType} from '$server/types';
import {typedSend} from '$server/generics';
import {INVALID_CREDENTIALS, INVALID_TOKEN, LOGIN_SUCCESS, REGISTER_SUCCESS, USER_DOES_NOT_EXIST} from '$server/constants';

const refreshTokens = {} as { [key: string]: LoginData };

export const login = async (req: Request, res: Response) => {
    const _send = typedSend<LoginResponse>(res);
    const {email, password} = <LoginPayload>req.body;

    try {
        const user: IUser = await db.user.findOne({email}, {__v: 0});
        if (!user)
            return _send({msg: USER_DOES_NOT_EXIST}, 401);

        const isMatch: boolean = Tools.compareHash(password, user.password);
        if (!isMatch)
            return _send({msg: INVALID_CREDENTIALS}, 401);

        const token: string = Tools.generateJWT(TokenType.access, user._id);
        const refreshToken: string = Tools.generateJWT(TokenType.refresh, user._id);

        const data: LoginData = {
            user: {...user, password: ''},
            token,
            refreshToken,
        };
        refreshTokens[refreshToken] = data;
        _send({data: data, msg: LOGIN_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 401);
    }
};

export const register = async (req: Request, res: Response) => {
    const _send = typedSend<RegisterResponse>(res);
    const {email, nickname, password} = <RegisterPayload>req.body

    try {
        await db.user({email, nickname, password: Tools.generateHash(password)}).save();
        _send({msg: REGISTER_SUCCESS});
    } catch (err) {
        _send({msg: err.toString()}, 401);
    }
};

export const refreshToken = (req: Request, res: Response) => {
    const _send = typedSend<RefreshTokenResponse>(res);
    const {refreshToken} = req.body

    if (refreshToken && (refreshToken in refreshTokens))
        _send({data: {token: Tools.generateJWT(TokenType.access, refreshTokens[refreshToken].user._id)}});
    else {
        _send({msg: INVALID_TOKEN}, 401);
    }
};

export const getMe = async (req: Request, res: Response) => {
    const _send = typedSend<GetMeResponse>(res);
    try {
        const decoded: JWTPayload = Tools.decodeJWT(<string>req.headers['x-access-token']);
        const user: IUser = await db.user.findById(decoded.id, {__v: 0, password: 0});
        _send({data: {user}});
    } catch (err) {
        _send({msg: err.toString()}, 401);
    }
};

export const patchMe = async (req: Request, res: Response) => {
    const _send = typedSend<PatchMeResponse>(res);
    const {changes} = req.body;
    try {
        const decoded: JWTPayload = Tools.decodeJWT(<string>req.headers['x-access-token']);

        if (changes.password)
            changes.password = Tools.generateHash(changes.password);
        delete changes._id;

        const user: IUser = await db.user.updateOne({_id: decoded.id}, {$set: changes});
        _send({data: {user}});
    } catch (err) {
        _send({msg: err.toString()}, 401);
    }
};