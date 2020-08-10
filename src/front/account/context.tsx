import React, {createContext, useReducer} from 'react';

import {AccountState} from './types';
import {useActions} from './actions';
import {useSelectors} from './selectors';
import {initialState, reducer} from './reducer';

type ContextType = {
    state: AccountState,
    actions: ReturnType<typeof useActions>,
    selectors: ReturnType<typeof useSelectors>
};
// dummy values
const initialContext: ContextType = {
    state: {...initialState},
    actions: {
        login: async () => undefined,
        register: async () => undefined,
        logout: async () => undefined,
        /*updateUser: async () => undefined,
        updateJWT: async () => undefined*/
    },
    selectors: {
        loginStatus: () => ({pending: false, success: false, msg: null}),
        registerStatus: () => ({pending: false, success: false, msg: null}),
        authorized: () => false,
        user: () => ({
            email: '',
            nickname: '',

            questions: [],
            comments: [],

            likedQuestions: [],
            staredQuestions: []
        }),
        JWT: () => ''
    }
};

export const AccountContext = createContext<ContextType>(initialContext);

export const AccountProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const actions = useActions(state, dispatch);
    const selectors = useSelectors(state);
    const contextValue = {
        state: {...state},
        actions: {...actions},
        selectors: {...selectors}
    };
    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    )
};