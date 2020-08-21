import {AccountState, Action} from './types';

export enum ACTION_TYPES {
    'SET_USER',
    'SET_JWT',
    'LOGOUT'
}

const JWT: string = localStorage.getItem('token') || '';

export const initialState: AccountState = {authorized: false, about: null, JWT};

export const reducer = (state = initialState, action: Action): AccountState => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER:
            return {
                ...state,
                authorized: true,
                about: action.user
            };
        case ACTION_TYPES.SET_JWT:
            return {
                ...state,
                JWT: action.JWT || ''
            };

        case ACTION_TYPES.LOGOUT:
            return {
                ...initialState,
                authorized: false
            };
        default:
            return initialState;
    }
};