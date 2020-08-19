import React from 'react';

import './checkbox.less';

type Props = {
    title: string
};

export const Checkbox = (({title}) => {
    return (
        <div className='checkbox'>
            <input type='checkbox'/>
            <span>{title}</span>
        </div>
    )
}) as React.FC<Props>;