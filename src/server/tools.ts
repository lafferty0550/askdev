import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {JWTPayload, TokenType} from './types';

const {TOKEN_SECRET, JWT_EXPIRES, JWT_REFRESH_EXPIRES} = process.env;

export default class Tools {
    static generateJWT = (type: TokenType, id: string): string => {
        return jwt.sign({id},
            TOKEN_SECRET || 'mysecretpassword',
            {expiresIn: Number(((type === TokenType.access) ? JWT_EXPIRES : JWT_REFRESH_EXPIRES) || 900)}
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