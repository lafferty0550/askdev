import React, {useContext, useEffect, useMemo} from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import {AccountDispatchContext} from '$account/context';
import {useFetch} from '$hooks/useFetch';
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
    const dispatch: AccountDispatch = useContext(AccountDispatchContext);
    const {pending, data, makeFetch} = useFetch<GetMeData>();

    useEffect(() => {
        // If user has JWT then we try to login
        if (LocalStorage.JWT)
            makeFetch(() => API.account.me()).then();
    }, []);
    useChangeEffect(() => {
        // If user logged in then put his info into store
        dispatch({type: ACTION_TYPES.SET_USER, user: data!.user})
    }, [data]);

    const ContentMemo = useMemo(() => <Content/>, []);

    return (
        <Layout>
            <Route path='/' render={({location: {pathname}}: RouteComponentProps) =>
                <NavbarContainer loginPending={pending} path={pathname}/>}>
            </Route>
            {ContentMemo}
        </Layout>
    );
};