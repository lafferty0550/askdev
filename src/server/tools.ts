import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const {TOKEN_SECRET, JWT_EXPIRES, JWT_REFRESH_EXPIRES} = process.env;

export default class {
    static generateJWT(type: 'access' | 'refresh', id: string) {
        if (type === 'access')
            return jwt.sign({id}, TOKEN_SECRET || 'mysecretpassword', {expiresIn: Number(JWT_EXPIRES || 900)});
        else
            return jwt.sign({id}, TOKEN_SECRET || 'mysecretpassword', {expiresIn: Number(JWT_REFRESH_EXPIRES || 900)});
    }

    static decodeJWT(token: string) {
        return jwt.decode(token);
    }

    static generateHash(text: string) {
        return bcrypt.hashSync(text, 8);
    }

    static compareHash(a: string, b: string) {
        return bcrypt.compareSync(a, b);
    }
}