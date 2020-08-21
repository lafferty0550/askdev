import React, {useContext, useEffect, useMemo} from 'react';

import {AccountContext, AccountDispatchContext} from '../account/context';
import {useFetch} from '../hooks/useFetch';
import {GetMeData} from '../../common/types';
import {API} from '../core/api';
import {ACTION_TYPES} from '../account/reducer';
import {Layout} from '../components/layout';
import {NavbarContainer} from './navbar';
import {Content} from '../components/content/content';
import {Sidebar} from '../components/sidebar';

export const App = () => {
    // fetch user info
    const {JWT} = useContext(AccountContext);
    const dispatch = useContext(AccountDispatchContext);
    const {pending, data, makeFetch} = useFetch<GetMeData>();

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