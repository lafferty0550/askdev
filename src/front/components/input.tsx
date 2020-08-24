import React, {ChangeEvent, FunctionComponent, useState} from 'react';

import {InfoIcon} from './icons';

import './input.less';

type Props = {
    Icon?: FunctionComponent,
    placeholder?: string,
    notice?: string,
    warning?: boolean,
    type?: string,
    value?: string,

    className?: string,

    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = (({
                           Icon, placeholder, notice, value,
                           warning, type = 'text', onChange, className
                       }) => {
    const [focused, setFocused] = useState(false);

    let classname = `input ${warning ? 'input-error' : 'input-success'}`;
    if (className)
        classname += ` ${className}`;

    return (
        <div className={classname}>
            {Icon && <div className='icon'>
                <Icon/>
            </div>}
            <input type={type} placeholder={placeholder} onFocus={() => setFocused(true)}
                   onBlur={() => setFocused(false)} onChange={onChange} value={value}/>
            {focused && notice && <div className='notice'>
                <InfoIcon/>
                <span>{notice}</span>
            </div>}
        </div>
    );
}) as React.FC<Props>;
