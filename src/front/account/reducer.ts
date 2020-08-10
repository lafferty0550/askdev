import {AccountState, Action} from './types';

export const ACTION_TYPES = {
    LOGIN_PENDING: 'account/login/PENDING',
    LOGIN_SUCCESS: 'account/login/SUCCESS',
    LOGIN_FAILURE: 'account/login/FAILURE',

    LOGOUT: 'account/LOGOUT',

    REGISTER_PENDING: 'account/register/PENDING',
    REGISTER_SUCCESS: 'account/register/SUCCESS',
    REGISTER_FAILURE: 'account/register/FAILURE',

    /*UPDATE_USER: 'account/UPDATE_USER',
    UPDATE_JWT: 'account/UPDATE-JWT'*/
};

export const initialState: AccountState = {
    status: {
        login: {
            pending: false,
            success: false,
            msg: null
        },
        register: {
            pending: false,
            success: false,
            msg: null
        }
    },

    authorized: !!localStorage.getItem('token'),
    about: {
        email: '',
        nickname: '',

        questions: [],
        comments: [],

        likedQuestions: [],
        staredQuestions: []
    },
    JWT: null
};

export const reducer = (state = initialState, action: Action): AccountState => {
    const changeStatus = (field: string, status: 'pending' | 'success' | 'failed', msg?: string | null) => ({
        ...state,
        status: {
            ...state.status,
            [field]: {
                pending: (status === 'pending'),
                success: (status === 'success'),
                msg
            }
        }
    });

    switch (action.type) {
        case ACTION_TYPES.LOGIN_PENDING:
            return changeStatus('login', 'pending');
        case ACTION_TYPES.LOGIN_SUCCESS:
            return {
                ...changeStatus('login', 'success', action.msg),
                authorized: true,
                about: action.user
            };
        case ACTION_TYPES.LOGIN_FAILURE:
            return changeStatus('login', 'failed', action.msg);

        case ACTION_TYPES.REGISTER_PENDING:
            return changeStatus('register', 'pending');
        case ACTION_TYPES.REGISTER_SUCCESS:
            return changeStatus('register', 'success', action.msg);
        case ACTION_TYPES.REGISTER_FAILURE:
            return changeStatus('register', 'failed', action.msg);

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