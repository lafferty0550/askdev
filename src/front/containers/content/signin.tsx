import React, {useContext} from 'react';

import SignIn from '../../components/content/signin';
import {AccountContext} from '../../account/context';

export default (() => {
    const {actions, selectors} = useContext(AccountContext);

    return <SignIn login={actions.login} loginStatus={selectors.loginStatus()}/>
}) as React.FC;