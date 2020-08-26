import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {API} from '$core/api';
import {LoginData, LoginPayload, RegisterData, RegisterPayload} from '$common/types';
import {useFetch} from '$hooks/useFetch';
import {LoadingWrapper} from '$components/content/loading-wrapper';
import {Auth} from '$components/content/auth';
import {AccountDispatchContext} from '$account/context';
import {ACTION_TYPES} from '$account/reducer';
import {LocalStorage} from '$core/helpers/local-storage';
import {AccountDispatch} from '$account/types';
import {useChangeEffect} from '$hooks/useChangeEffect';

type Props = { isLogin: boolean };

export const AuthContainer = (({isLogin}) => {
    const [redirect, setRedirect] = useState(false);
    if (isLogin) {
        const {pending, success, msg, data, makeFetch} = useFetch<LoginData>();
        const dispatch = useContext<AccountDispatch>(AccountDispatchContext);

        useChangeEffect(() => {
            if (!success) return;
            LocalStorage.JWT = data!.token;
            LocalStorage.refreshJWT = data!.refreshToken;
            dispatch({type: ACTION_TYPES.SET_USER, user: data!.user});
            setRedirect(true);
        }, [success, data]);

        const handler = async (user: LoginPayload) =>
            await makeFetch(() => API.account.login(user));

        if (redirect)
            return <Redirect to='/questions'/>;

        return (
            <LoadingWrapper pending={pending}>
                <Auth login={handler} isLogin={true}/>
            </LoadingWrapper>
        )
    } else {
        const {pending, success, msg, makeFetch} = useFetch<RegisterData>();

        useEffect(() => {
            if (success)
                setRedirect(true);
        }, [success]);

        const handler = async (user: RegisterPayload) =>
            await makeFetch(() => API.account.register(user));

        if (redirect)
            return <Redirect to='/signin'/>;

        return (
            <LoadingWrapper pending={pending} success={success}>
                <Auth register={handler} isLogin={false}/>
            </LoadingWrapper>
        )
    }
}) as React.FC<Props>;