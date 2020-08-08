import React, {FunctionComponent} from 'react';

import './input.less';

type Props = {
    Icon?: FunctionComponent,
    placeholder: string
}

export default (({Icon, placeholder}) => (
    <div className="input">
        {Icon && <div>
            <Icon/>
        </div>}
        <input type="text" placeholder={placeholder}/>
    </div>
)) as React.FC<Props>;