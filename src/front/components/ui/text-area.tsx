import React from 'react';

import './text-area.less';

type Props = {
    className?: string
};

export default(({className}) => (
   <textarea className={`text-area ${className}`}/>
)) as React.FC<Props>;