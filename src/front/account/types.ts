import {IUser} from '$common/types';
import {ACTION_TYPES} from './reducer';

export type Action = {
    type: ACTION_TYPES,
    user?: any,
    msg?: string,
    JWT?: string
};

export interface AccountState {
    authorized: boolean,
    about: IUser | null,
    JWT: string
}

export type AccountDispatch = (action: Action) => void;