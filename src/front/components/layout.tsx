import React from 'react';

import './layout.less';

export const Layout = (({children}) => (
    <div className='layout'>
        {children}
    </div>
)) as React.FC;