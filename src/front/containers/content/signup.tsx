import React, {useContext} from 'react';

import SignUp from '../../components/content/signup';
import {AccountContext} from '../../account/context';

export default (() => {
    const {actions, selectors} = useContext(AccountContext);

    return <SignUp register={actions.register} registerStatus={selectors.registerStatus()}/>
}) as React.FC;