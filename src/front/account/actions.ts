import {AccountState, Action} from './types';
import {ACTION_TYPES} from './reducer';

import API from '../core/api';
import {Dispatch} from 'react';

export const useActions = (state: AccountState, dispatch: Dispatch<Action>) => ({
    login: async (email: string, password: string) => {
        try {
            dispatch({type: ACTION_TYPES.LOGIN_PENDING});
            const res = await API.account.login(email, password);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            dispatch({type: ACTION_TYPES.LOGIN_SUCCESS, msg: res.data.msg, user: res.data.user});
        } catch(err) {
            dispatch({type: ACTION_TYPES.LOGIN_FAILURE, msg: err.response.data.msg});
        }
    },
    register: async (email: string, nickname: string, password: string) => {
        try {
            dispatch({type: ACTION_TYPES.REGISTER_PENDING});
            const res = await API.account.register(email, nickname, password);
            dispatch({type: ACTION_TYPES.REGISTER_SUCCESS, msg: res.data.msg});
        } catch(err) {
            dispatch({type: ACTION_TYPES.REGISTER_FAILURE, msg: err.response.data.msg});
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        dispatch({type: ACTION_TYPES.LOGOUT});
    },
    /*updateUser: (changes: any) =>
        dispatch({type: ACTION_TYPES.UPDATE_USER, changes}),
    updateJWT: (JWT: string) =>
        dispatch({type: ACTION_TYPES.UPDATE_JWT, JWT})*/
});