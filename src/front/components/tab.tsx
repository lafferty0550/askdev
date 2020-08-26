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
    const [active, setActive] = useState(children[0].props.label); // active link

    let cn = 'tabs';
    if (className)
        cn += className;

    return (
        <div className={cn}>
            <div className="tabs__list">
                {children.map(({props: {label}}) => (
                    <Tab label={label} key={label} active={active === label}
                         onClick={(tab: string) => setActive(tab)}/>
                ))}
            </div>
            <div className="tabs__content">
                {children.map(({props: {label, children}}) =>
                    // if current child is active then call children function that render a component
                    (label === active)
                        ? <Fragment key={label}>{children()}</Fragment>
                        : null
                )}
            </div>
        </div>
    );
}) as React.FC<TabsProps>;