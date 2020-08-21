import React, {createContext, useReducer} from 'react';

import {initialState, reducer} from './reducer';
import {AccountDispatch, AccountState} from './types';

const JWT: string = localStorage.getItem('token') || '';

const initialContext: AccountState = {authorized: false, about: null, JWT};

const initialDispatchContext: AccountDispatch = () => {};

export const AccountContext = createContext<AccountState>(initialContext);
export const AccountDispatchContext = createContext<AccountDispatch>(initialDispatchContext);

export const AccountProvider: React.FC = ({children}) => {
    const [state, dispatch]: [AccountState, AccountDispatch] = useReducer(reducer, initialState);

    return (
        <AccountContext.Provider value={{...state}}>
            <AccountDispatchContext.Provider value={dispatch}>
                {children}
            </AccountDispatchContext.Provider>
        </AccountContext.Provider>
    )
};