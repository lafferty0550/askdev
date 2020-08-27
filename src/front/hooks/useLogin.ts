import {useContext} from 'react';

import {Pending, useFetch} from '$hooks/useFetch';
import {LoginData, LoginPayload} from '$common/types';
import {AccountDispatch} from '$account/types';
import {AccountDispatchContext} from '$account/context';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {API} from '$core/api';
import {LocalStorage} from '$core/helpers/local-storage';
import {ACTION_TYPES} from '$account/reducer';

export const useLogin = (successCallback?: any, failureCallback?: any) => {
    const {pending, success, msg, data, makeFetch} = useFetch<LoginData>();
    const dispatch = useContext<AccountDispatch>(AccountDispatchContext);

    useChangeEffect(() => {
        if (pending !== Pending.fetched)
            return;
        if (!success) {
            failureCallback && failureCallback();
            return;
        }
        // when fetch is success then we put tokens into local storage and put user info into store
        // then do redirect
        LocalStorage.JWT = data!.token;
        LocalStorage.refreshJWT = data!.refreshToken;
        dispatch({type: ACTION_TYPES.SET_USER, user: data!.user});
        successCallback && successCallback();
    }, [pending]);

    const login = (user: LoginPayload) => makeFetch(() => API.account.login(user));

    return {pending, success, msg, data, login};
};