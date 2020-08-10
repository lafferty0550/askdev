import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';

import App from './components/app';
import {AccountProvider} from './account/context';

import './launcher.less';

ReactDOM.render(
    <React.StrictMode>
        <AccountProvider>
            <HashRouter>
                <App/>
            </HashRouter>
        </AccountProvider>
    </React.StrictMode>,
    document.getElementById('root')
);