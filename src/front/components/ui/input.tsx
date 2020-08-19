import React, {ChangeEvent, FunctionComponent, useState} from 'react';

import {InfoIcon} from '../ui/icons';

import './input.less';

type Props = {
    Icon?: FunctionComponent,
    placeholder: string,
    notice?: string,
    warning?: boolean,
    type?: string,

    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = (({
                     Icon, placeholder, notice,
                     warning, type = 'text', onChange
                 }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className={`input ${warning ? 'input-error' : 'input-success'}`}>
            {Icon && <div className='icon'>
                <Icon/>
            </div>}
            <input type={type} placeholder={placeholder} onFocus={() => setFocused(true)}
                   onBlur={() => setFocused(false)} onChange={onChange}/>
            {focused && notice && <div className='notice'>
                <InfoIcon/>
                <span>{notice}</span>
            </div>}
        </div>
    );
}) as React.FC<Props>;
