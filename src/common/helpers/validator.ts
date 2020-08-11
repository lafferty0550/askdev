import {validate as isEmail} from 'isemail';

export default class {
    static isEmail(text: string) {
        return isEmail(text);
    }

    static isNickname(text: string) {
        return (text.length >= 5) && (text.length <= 16);
    }

    static isPassword(text: string) {
        return (text.length >= 5) && (text.length <= 32);
    }

    static isComment(text: string) {
        return (text.length > 30) && (text.length < 300);
    }
}