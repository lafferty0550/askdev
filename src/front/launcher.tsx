import React, {ReactChild} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';

import {App} from './containers/app';
import {AccountProvider} from './account/context';

import './launcher.less';


ReactDOM.render(
    <AccountProvider>
        <HashRouter>
            <App/>
        </HashRouter>
    </AccountProvider>,
    document.getElementById('root')
);