import React from 'react';

import './button.less';

type Props = {
    type: 'accept' | 'cancel'
};

export default (({type, children}) => (
    <div className={`button button-${type}`}>
        {children}
    </div>
)) as React.FC<Props>;