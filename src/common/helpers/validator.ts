import {validate as isEmail} from 'isemail';

type ValidatorType = (text: string) => boolean;

// Simple validator
export class Validator {
    static isEmail: ValidatorType = text => {
        return isEmail(text);
    }

    static isNickname: ValidatorType = text => {
        return (text.length >= 5) && (text.length <= 16);
    }

    static isPassword: ValidatorType = text => {
        return (text.length >= 5) && (text.length <= 32);
    }
}