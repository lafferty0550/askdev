import React, {MouseEvent} from 'react';

import './button.less';

type Props = {
    type: 'accept' | 'cancel',
    disabled?: boolean,

    onClick?: (e: MouseEvent) => void
};

export default (({type, onClick, disabled, children}) => (
    <div className={`button button-${type} ${disabled ? 'button-disabled' : 'button-enabled'}`} onClick={onClick}>
        {children}
    </div>
)) as React.FC<Props>;