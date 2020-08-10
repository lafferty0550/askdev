import React, {useState} from 'react';

import Select, {Option} from './ui/select';
import Checkbox from './ui/checkbox';
import Button from './ui/button';
import {MagnifierIcon} from './ui/icons';

import './sidebar.less';

export default (() => {
    const [show, setShow] = useState(true);

    return (
        <div className={`sidebar ${!show ? 'sidebar-hidden' : 'sidebar-showed'}`}>
            <button className='sidebar__toggle'>
                {show ? <div onClick={() => setShow(false)}>{'>'}</div> : <div onClick={() => setShow(true)}>{'<'}</div>}
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
                            <Select
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
                <Button type='accept'>
                    Accept
                </Button>
                <Button type='cancel'>
                    Reset
                </Button>
            </div>
        </div>
    )
}) as React.FC;