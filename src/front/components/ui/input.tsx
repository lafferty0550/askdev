import React, {ChangeEvent, FunctionComponent, useState} from 'react';

import './input.less';

type Props = {
    Icon?: FunctionComponent,
    placeholder: string,
    notice?: string,
    warning?: boolean,
    type?: string,

    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default (({
                     Icon, placeholder, notice,
                     warning, type = 'text', onChange
                 }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div>
            <div className={`input ${warning ? 'input-error' : 'input-success'}`}>
                {Icon && <div>
                    <Icon/>
                </div>}
                <input type={type} placeholder={placeholder} onFocus={() => setFocused(true)}
                       onBlur={() => setFocused(false)} onChange={onChange}/>
            </div>
            {focused && <div className='notice'>{notice}</div>}
        </div>
    );
}) as React.FC<Props>;