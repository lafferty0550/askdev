import React, {useState} from 'react';

import './select.less';

export type Option = {
    value: string,
    title: string
};

type Props = {
    options: Option[],
    className?: string
};

export const Select = (({options, className}) => {
    const [selected, setSelected] = useState({} as Option);
    const [show, setShow] = useState(false);

    const onSelect = (option: Option) => {
        setSelected(option);
        setShow(false);
    };

    return (
        <div className={className ? `select ${className}` : 'select'} onMouseEnter={() => setShow(true)}
             onMouseLeave={() => setShow(false)}>
            <div className='select-title'>
                <svg viewBox='0 0 477.875 477.875'>
                    <path d='M460.804,0H17.071C7.645,0,0.004,7.641,0.004,17.067V102.4c0.001,4.836,2.054,9.445,5.649,12.681l165.018,148.514V460.8
                        c-0.004,9.426,7.633,17.07,17.059,17.075c2.651,0.001,5.266-0.615,7.637-1.8l102.4-51.2c5.786-2.891,9.441-8.806,9.438-15.275
                        V263.595l165.018-148.48c3.604-3.243,5.658-7.866,5.649-12.715V17.067C477.871,7.641,470.23,0,460.804,0z M443.737,94.805
                        L278.72,243.285c-3.604,3.243-5.657,7.866-5.649,12.715v143.053l-68.267,34.133V256c-0.001-4.836-2.054-9.445-5.649-12.68
                        L34.137,94.805V34.133h409.6V94.805z'/>
                </svg>
                {selected.title || <span>Filter by</span>}
            </div>
            <div className={`select-options select-options-${show ? 'showed' : 'hidden'}`}>
                {options.map(option => (
                    <div key={option.value} onClick={() => onSelect(option)}>{option.title}</div>
                ))}
            </div>
        </div>
    )
}) as React.FC<Props>;