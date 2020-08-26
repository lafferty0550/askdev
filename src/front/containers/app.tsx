import React, {useContext, useEffect, useMemo} from 'react';
import {Route} from 'react-router-dom';

import {AccountDispatchContext} from '$account/context';
import {Pending, useFetch} from '$hooks/useFetch';
import {GetMeData} from '$common/types';
import {API} from '$core/api';
import {ACTION_TYPES} from '$account/reducer';
import {Layout} from '$components/layout';
import {NavbarContainer} from './navbar';
import {Content} from '$containers/content/content';
import {AccountDispatch} from '$account/types';
import {LocalStorage} from '$core/helpers/local-storage';
import {useChangeEffect} from '$hooks/useChangeEffect';

export const App = () => {
    // fetch user info
    const dispatch: AccountDispatch = useContext(AccountDispatchContext);
    const {pending, success, data, makeFetch} = useFetch<GetMeData>();

    // if user has JWT then try to login
    useEffect(() => {
        if (LocalStorage.JWT)
            makeFetch(() => API.account.me()).then();
    }, []);
    useChangeEffect(() => {
        if (pending === Pending.fetched) {
            // if JWT is not valid then remove tokens
            if (!success)
                LocalStorage.cleanup();
            // if JWT is valid then put user info into store
            else
                dispatch({type: ACTION_TYPES.SET_USER, user: data!.user})
        }
    }, [pending, success, data]);

    const ContentMemo = useMemo(() => <Content/>, []);

    return (
        <Layout>
            <Route path='/'
                   render={(props) => <NavbarContainer loginPending={pending} path={props.location.pathname}/>}/>
            {ContentMemo}
        </Layout>
    );
};