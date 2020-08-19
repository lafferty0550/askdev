import {AccountState, Action} from './types';

export const ACTION_TYPES = {
    SET_USER: 'account/SET_USER',
    SET_JWT: 'account/SET_JWT',
    LOGOUT: 'account/LOGOUT',

    /*UPDATE_USER: 'account/UPDATE_USER',
    UPDATE_JWT: 'account/UPDATE-JWT'*/
};

const JWT = localStorage.getItem('token') || '';

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


        /*case ACTION_TYPES.UPDATE_USER:
            return {
                ...state,
                about: {
                    ...state.about,
                    ...action.payload
                }
            };
        case ACTION_TYPES.UPDATE_JWT:
            return {
                ...state,
                JWT: action.payload
            };*/

        default:
            return initialState;
    }
};