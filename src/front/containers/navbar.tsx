import React, {useContext} from 'react';

import {Navbar} from '$components/navbar';
import {AccountContext, AccountDispatchContext} from '$account/context';
import {ACTION_TYPES} from '$account/reducer';
import {Pending} from '$hooks/useFetch';

type Props = {
    loginPending: Pending
};

export const NavbarContainer = (({loginPending}) => {
    const {authorized} = useContext(AccountContext);
    const dispatch = useContext(AccountDispatchContext);

    const logout = () => {
        dispatch({type: ACTION_TYPES.LOGOUT});
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };

    return <Navbar logout={logout} isAuth={authorized} loginPending={loginPending}/>;
}) as React.FC<Props>;