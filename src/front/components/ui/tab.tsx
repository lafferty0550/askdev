import React, {ReactElement, useState, Fragment} from 'react';

import './tab.less';

type TabProps = {
    label: string,
    active?: boolean,
    onClick?: (tab: string) => void
};

export const Tab = (({label, active, onClick = () => {}}) => {
    let className = 'tab';
    if (active)
        className += ' tab-active';

    return (
        <div className={className} onClick={() => onClick(label)}>{label}</div>
    );
}) as React.FC<TabProps>;

type TabsProps = {
    children: Array<ReactElement>
};

export const Tabs = (({children}) => {
    const [active, setActive] = useState(children[0].props.label);

    return (
        <div className='tabs'>
            <div className="tabs__list">
                {children.map(child => (
                    <Tab label={child.props.label} key={child.props.label} active={active}
                         onClick={(tab: string) => setActive(tab)}/>
                ))}
            </div>
            <div className="tabs__content">
                {children.map((child, index) => {
                    if (child.props.label !== active)
                        return null;
                    return <Fragment key={index}>{child.props.children()}</Fragment>;
                })}
            </div>
        </div>
    );
}) as React.FC<TabsProps>;