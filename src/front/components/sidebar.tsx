import React, {useState} from 'react';

import Select, {Option} from './ui/select';
import Checkbox from './ui/checkbox';
import Button from './ui/button';

import './sidebar.less';

export default (() => {
    const [show, setShow] = useState(true);

    return (
        <div className={`sidebar ${!show ? 'sidebar-hidden' : 'sidebar-showed'}`}>
            <button className="sidebar__toggle">
                {show ? <div onClick={() => setShow(false)}>{'>'}</div> : <div onClick={() => setShow(true)}>{'<'}</div>}
            </button>
            <div className="sidebar__sections">
                <div className="sidebar__section">
                    <div className="sidebar__section-title">Search settings</div>
                    <div className="sidebar__section-items">
                        <div className="sidebar__section-search">
                            <input type="text" placeholder="type text here"/>
                            <svg viewBox="0 0 512.005 512.005">
                                <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
                    S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
                    c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
                     M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="sidebar__section">
                    <div className="sidebar__section-title">Filter settings</div>
                    <div className="sidebar__section-items">
                        <div className="sidebar__section-item">
                            <Select
                                options={[{value: '0', title: 'Most popular'}, {value: '1', title: 'Most relevant'}, {
                                    value: '2',
                                    title: 'New'
                                }] as Array<Option>}/>
                        </div>
                        <div className="sidebar__section-item">
                            <Checkbox title='Not answered'/>
                        </div>
                        <div className="sidebar__section-item">
                            <Checkbox title='Show closed'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar__actions">
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