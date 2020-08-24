import React, {ChangeEvent} from 'react';

import './text-area.less';

type Props = {
    className?: string,
    placeholder?: string,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
};

export const TextArea = (({className, placeholder, onChange}) => (
   <textarea className={`text-area ${className}`} placeholder={placeholder} onChange={onChange}/>
)) as React.FC<Props>;