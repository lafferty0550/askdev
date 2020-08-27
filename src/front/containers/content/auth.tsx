import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import {LoadingWrapper} from '$components/content/loading-wrapper';
import {Auth} from '$components/content/auth';
import {useLogin} from '$hooks/useLogin';
import {useRegister} from '$hooks/useRegister';

type Props = { isLogin: boolean };

export const AuthContainer = (({isLogin}) => {
    const [redirect, setRedirect] = useState(false); // used when auth is success

    if (isLogin) {
        const {pending, login} = useLogin(() => setRedirect(true), () => console.log(123123));
        if (redirect)
            return <Redirect to='/questions'/>;
        return (
            <LoadingWrapper pending={pending}>
                <Auth login={login} isLogin={true}/>
            </LoadingWrapper>
        )
    } else {
        const {pending, register} = useRegister(() => setRedirect(true));
        if (redirect)
            return <Redirect to='/signin'/>;
        return (
            <LoadingWrapper pending={pending}>
                <Auth register={register} isLogin={false}/>
            </LoadingWrapper>
        )
    }
}) as React.FC<Props>;