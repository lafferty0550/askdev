import React from 'react';

import Navbar from '../containers/navbar';
import Sidebar from './sidebar';
import Content from './content/content';

import './app.less';

export default () => (
    <div className='layout'>
        <Navbar/>
        <Content/>
        <Sidebar/>
    </div>
);