import {IUser} from '../../common/types';

export type Action = {
    type: string,
    user?: any,
    msg?: string,
    JWT?: string
};

export interface AccountState {
    authorized: boolean,
    about: IUser | null,
    JWT: string
}