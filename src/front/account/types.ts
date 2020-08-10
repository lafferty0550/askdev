import {IUser} from '../../common/types';

export type Action = {
    type: string,
    user?: any,
    msg?: string
};

export type Status = {
    pending: boolean,
    success: boolean,
    msg: string | null
};

export interface AccountState {
    status: {
        login: Status,
        register: Status
    },

    authorized: boolean,
    about: IUser,
    JWT: string | null
}