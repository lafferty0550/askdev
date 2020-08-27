import React, {useMemo} from 'react';
import {Route} from 'react-router-dom';

import {Layout} from '$components/layout';
import {NavbarContainer} from './navbar';
import {Content} from '$containers/content/content';
import {useAuth} from '$hooks/useAuth';

export const App = () => {
    // fetch user info
    const {pending} = useAuth();

    const ContentMemo = useMemo(() => <Content/>, []);

    return (
        <Layout>
            <Route path='/' render={(props) =>
                <NavbarContainer loginPending={pending} path={props.location.pathname}/>}/>
            {ContentMemo}
        </Layout>
    );
};