import {useContext, useEffect} from 'react';

import {AccountDispatch} from '$account/types';
import {AccountDispatchContext} from '$account/context';
import {Pending, useFetch} from '$hooks/useFetch';
import {GetMeData} from '$common/types';
import {LocalStorage} from '$core/helpers/local-storage';
import {API} from '$core/api';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {ACTION_TYPES} from '$account/reducer';

export const useAuth = () => {
    const dispatch: AccountDispatch = useContext(AccountDispatchContext);
    const {pending, success, data, makeFetch} = useFetch<GetMeData>();

    // if user has JWT then try to login
    useEffect(() => {
        if (LocalStorage.JWT)
            makeFetch(() => API.account.me()).then();
    }, []);
    useChangeEffect(() => {
        if (pending !== Pending.fetched)
            return;
        // if JWT is not valid then remove tokens
        if (!success)
            LocalStorage.cleanup();
        // if JWT is valid then put user info into store
        else
            dispatch({type: ACTION_TYPES.SET_USER, user: data!.user})
    }, [pending]);

    return {pending, success, data};
};