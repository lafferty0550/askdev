import React, {useState} from 'react';

import {Option, Select} from '../select';
import {Checkbox} from '../checkbox';
import {Button, ButtonType} from '../button';
import {MagnifierIcon} from '../icons';

import './sidebar.less';

export const Sidebar = (() => {
    const [show, setShow] = useState(true);

    return (
        <div className={`sidebar ${!show ? 'sidebar-hidden' : 'sidebar-showed'}`}>
            <button className='sidebar__toggle'>
                <div id='toggle' onClick={() => {
                    if (show)
                        setShow(false);
                    else
                        setShow(true);
                }}>=
                </div>
            </button>
            <div className='sidebar__sections'>
                <div className='sidebar__section'>
                    <div className='sidebar__section-title'>Search settings</div>
                    <div className='sidebar__section-items'>
                        <div className='sidebar__section-search'>
                            <input type='text' placeholder='type text here'/>
                            <MagnifierIcon/>
                        </div>
                    </div>
                </div>
                <div className='sidebar__section'>
                    <div className='sidebar__section-title'>Filter settings</div>
                    <div className='sidebar__section-items'>
                        <div className='sidebar__section-item'>
                            <Select className='sidebar__select'
                                options={[{value: '0', title: 'Most popular'}, {value: '1', title: 'Most relevant'}, {
                                    value: '2',
                                    title: 'New'
                                }] as Array<Option>}/>
                        </div>
                        <div className='sidebar__section-item'>
                            <Checkbox title='Not answered'/>
                        </div>
                        <div className='sidebar__section-item'>
                            <Checkbox title='Show closed'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sidebar__actions'>
                <Button fullWidth>Accept</Button>
                <Button type={ButtonType.error} fullWidth>Reset</Button>
            </div>
        </div>
    )
}) as React.FC;