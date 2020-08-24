import {AccountState, Action} from './types';

export enum ACTION_TYPES {
    'SET_USER',
    'LOGOUT'
}

export const initialState: AccountState = {authorized: false, about: null};

export const reducer = (state = initialState, action: Action): AccountState => {
    switch (action.type) {
        case ACTION_TYPES.SET_USER:
            return {
                authorized: true,
                about: action.user
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