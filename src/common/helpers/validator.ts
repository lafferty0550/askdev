import {validate as isEmail} from 'isemail';

type Validator = (text: string) => boolean;

export default class {
    static isEmail: Validator = text => {
        return isEmail(text);
    }

    static isNickname: Validator = text => {
        return (text.length >= 5) && (text.length <= 16);
    }

    static isPassword: Validator = text => {
        return (text.length >= 5) && (text.length <= 32);
    }
}