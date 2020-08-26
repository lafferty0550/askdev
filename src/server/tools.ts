import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {JWTPayload, TokenType} from './types';

import {TOKEN_SECRET, JWT_EXP, JWT_REFRESH_EXP} from './constants';

export default class Tools {
    static generateJWT = (type: TokenType, id: string): string => {
        return jwt.sign({id},
            TOKEN_SECRET,
            {expiresIn: Number((type === TokenType.access) ? JWT_EXP : JWT_REFRESH_EXP)}
        );
    }

    static decodeJWT = (token: string): JWTPayload => {
        return <JWTPayload>jwt.decode(token);
    }

    static generateHash = (text: string): string => {
        return bcrypt.hashSync(text, 8);
    }

    static compareHash = (a: string, b: string): boolean => {
        return bcrypt.compareSync(a, b);
    }

    static getUserIdFromJWT = (token: string): string => {
        const payload = Tools.decodeJWT(token);
        return payload.id;
    }
}