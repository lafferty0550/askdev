import React, {useContext, useEffect, useMemo} from 'react';

import {AccountContext, AccountDispatchContext} from '$account/context';
import {FetchResult, useFetch} from '$hooks/useFetch';
import {GetMeData} from '$common/types';
import {API} from '$core/api';
import {ACTION_TYPES} from '$account/reducer';
import {Layout} from '$components/layout';
import {NavbarContainer} from './navbar';
import {Content} from '$components/content/content';
import {AccountDispatch, AccountState} from '$account/types';

export const App = () => {
    // fetch user info
    const {JWT}: AccountState = useContext(AccountContext);
    const dispatch: AccountDispatch = useContext(AccountDispatchContext);
    const {pending, data, makeFetch}: FetchResult<GetMeData> = useFetch<GetMeData>();

    useEffect(() => {
        if (JWT)
            makeFetch(() => API.account.me()).then();
    }, []);
    useEffect(() => {
        if (data)
            dispatch({type: ACTION_TYPES.SET_USER, user: data})
    }, [data]);

    const ContentMemo = useMemo(() => <Content/>, []);

    return (
        <Layout>
            <NavbarContainer loginPending={pending}/>
            {ContentMemo}
        </Layout>
    );
};