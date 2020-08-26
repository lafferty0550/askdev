import React, {ChangeEvent} from 'react';

import './text-area.less';

type Props = {
    className?: string,
    placeholder?: string,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
};

export const TextArea = (({className, placeholder, onChange}) => {
    let cn = 'text-area';
    if (className)
        cn += ` ${className}`;

    return <textarea className={cn} placeholder={placeholder} onChange={onChange}/>;
}) as React.FC<Props>;