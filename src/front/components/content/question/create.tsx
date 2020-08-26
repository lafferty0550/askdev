import React, {useState} from 'react';

import {TextArea} from '$components/text-area';
import {Button, ButtonType} from '$components/button';
import {PostQuestionPayload} from '$common/types';

import './create.less';

type Props = {
    accept: (question: PostQuestionPayload) => void
};

export const Create = (({accept}) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    return (
        <div className='new-question'>
            <div className="new-question__title">Create a new question</div>
            <TextArea placeholder='Title of the question' className='new-question__title-area'
                      onChange={e => setTitle(e.target.value)}/>
            <TextArea placeholder='Body of the question (here will be wysiwyg soon)'
                      className='new-question__body-area'
                      onChange={e => setBody(e.target.value)}/>
            <div className="new-question__actions">
                <Button onClick={() => accept({title, body})}>
                    Accept
                </Button>
                <Button type={ButtonType.error}>
                    Reset
                </Button>
            </div>
        </div>
    );
}) as React.FC<Props>;