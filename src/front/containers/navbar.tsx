import React, {useContext} from 'react';

import Navbar from '../components/navbar';
import {AccountContext} from '../account/context';

export default (() => {
    const {selectors, actions} = useContext(AccountContext);
    const isAuth = selectors.authorized();

    return <Navbar logout={actions.logout} isAuth={isAuth}/>;
}) as React.FC;