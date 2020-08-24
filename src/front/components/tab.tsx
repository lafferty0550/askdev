import React, {ReactElement, useState, Fragment} from 'react';

import './tab.less';

type TabProps = {
    label: string,
    active?: boolean,
    onClick?: (tab: string) => void,

    className?: string
};

export const Tab = (({label, active = false, className, onClick = () => {}}) => {
    let classname = 'tab';

    if (active)
        classname += ' tab-active';
    if (className)
        classname += className;

    return (
        <div className={classname} onClick={() => onClick(label)}>{label}</div>
    );
}) as React.FC<TabProps>;

type TabsProps = {
    children: Array<ReactElement>,

    className?: string
};

export const Tabs = (({children, className}) => {
    const [active, setActive] = useState(children[0].props.label);

    let classname = 'tabs';
    if (className)
        classname += className;

    return (
        <div className={classname}>
            <div className="tabs__list">
                {children.map(child => (
                    <Tab label={child.props.label} key={child.props.label} active={active === child.props.label}
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