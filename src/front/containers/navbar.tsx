import React, {useContext} from 'react';

import {Navbar} from '$components/layout/navbar';
import {AccountContext, AccountDispatchContext} from '$account/context';
import {ACTION_TYPES} from '$account/reducer';
import {Pending} from '$hooks/useFetch';
import {LocalStorage} from '$core/helpers/local-storage';

type Props = {
    loginPending: Pending, // check if user is logging in now
    path: string           // current url
};

export const NavbarContainer = (({loginPending, path}) => {
    const {authorized} = useContext(AccountContext);
    const dispatch = useContext(AccountDispatchContext);

    const logout = () => {
        // remove user info from store and clean localstorage from tokens
        dispatch({type: ACTION_TYPES.LOGOUT});
        LocalStorage.cleanup();
    };

    return <Navbar logout={logout} isAuth={authorized} loginPending={loginPending} path={path}/>;
}) as React.FC<Props>;