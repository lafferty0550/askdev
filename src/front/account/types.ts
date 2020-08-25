import {IUser} from '$common/types';
import {ACTION_TYPES} from './reducer';

export type Action = {
    type: ACTION_TYPES,
    user?: any,
    msg?: string
};

export interface AccountState {
    authorized: boolean, // auth status
    about: IUser | null  // user info
}

export type AccountDispatch = (action: Action) => void;