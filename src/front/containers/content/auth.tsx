import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {API} from '$core/api';
import {LoginData, RegisterData} from '$common/types';
import {Pending, useFetch} from '$hooks/useFetch';
import {LoadingWrapper} from '$components/content/loading-wrapper';
import {Auth} from '$components/content/auth';
import {AccountDispatchContext} from '$account/context';
import {ACTION_TYPES} from '$account/reducer';
import {UserInput} from '$core/api/account';

type Props = { isLogin: boolean };

export const AuthContainer = (({isLogin}) => {
    const [redirect, setRedirect] = useState(false);
    const {pending, success, msg, data, makeFetch} = isLogin ? useFetch<LoginData>() : useFetch<RegisterData>();
    const dispatch = useContext(AccountDispatchContext);

    useEffect(() => {
        if (pending === Pending.fetched && success) {
            if (isLogin) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({type: ACTION_TYPES.SET_USER, user: data.user});
                dispatch({type: ACTION_TYPES.SET_JWT, JWT: data.token});
            }
            setRedirect(true);
        }
    }, [pending, success]);

    let handler: any;
    if (isLogin)
        handler = async (user: UserInput) =>
            await makeFetch(() => API.account.login(user));
    else
        handler = async (user: UserInput) =>
            await makeFetch(() => API.account.register(user));

    if (redirect)
        return <Redirect to={isLogin ? '/questions' : '/signin'}/>;

    return (
        <LoadingWrapper pending={pending} success={success}>
            <Auth handler={handler} isLogin={isLogin}/>
        </LoadingWrapper>
    )
}) as React.FC<Props>;