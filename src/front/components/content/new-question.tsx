import React from 'react';

import TextArea from '../ui/text-area';
import Button from '../ui/button';

import './new-question.less';

export default (() => {
    return (
        <div className='new-question'>
            <div className="new-question__title">Create a new question</div>
            <TextArea className='new-question__title-area'/>
            <TextArea className='new-question__body-area'/>
            <div className="new-question__actions">
                <Button type='accept'>
                    Accept
                </Button>
                <Button type='cancel'>
                    Reset
                </Button>
            </div>
        </div>
    );
}) as React.FC;