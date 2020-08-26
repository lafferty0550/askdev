import React, {useContext, useEffect, useMemo} from 'react';
import { Route } from 'react-router-dom';

import {AccountContext, AccountDispatchContext} from '$account/context';
import {FetchResult, useFetch} from '$hooks/useFetch';
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
    const {pending, data, makeFetch} = useFetch<GetMeData>();

    useEffect(() => {
        if (LocalStorage.JWT)
            makeFetch(() => API.account.me()).then();
    }, []);
    useChangeEffect(() => {
        dispatch({type: ACTION_TYPES.SET_USER, user: data!.user})
    }, [data]);

    const ContentMemo = useMemo(() => <Content/>, []);

    return (
        <Layout>
            <Route path='/' render={(props) => <NavbarContainer loginPending={pending} path={props.location.pathname}/>}/>
            {ContentMemo}
        </Layout>
    );
};