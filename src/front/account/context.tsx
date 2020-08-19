import React, {createContext, useReducer} from 'react';

import {useSelectors} from './selectors';
import {initialState, reducer} from './reducer';
import {IUser} from '../../common/types';
import {Action} from './types';

const JWT = localStorage.getItem('token') || '';

type AccountContext = {
    authorized: boolean,
    about: IUser | null,
    JWT: string
};

const initialContext: AccountContext = {authorized: false, about: null, JWT};

const initialDispatchContext = (action: Action) => {};

type AccountDispatchContext = typeof initialDispatchContext;

export const AccountContext = createContext<AccountContext>(initialContext);
export const AccountDispatchContext = createContext<AccountDispatchContext>(initialDispatchContext);

export const AccountProvider: React.FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const selectors = useSelectors(state);
    const contextValue = {...selectors};
    return (
        <AccountContext.Provider value={contextValue}>
            <AccountDispatchContext.Provider value={dispatch}>
                {children}
            </AccountDispatchContext.Provider>
        </AccountContext.Provider>
    )
};