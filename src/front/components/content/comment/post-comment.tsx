import React, {useState} from 'react';

import {Button} from '$components/button';
import {TextArea} from '$components/text-area';

type Props = {
    post: (body: string) => void,
    className?: string
};

export const PostComment = (({post, className}) => {
    const [body, setBody] = useState('');

    let classname = 'comment-post';
    if (className)
        classname += ` ${className}`;

    return (
        <div className={classname}>
            <TextArea onChange={e => setBody(e.target.value)}/>
            <Button onClick={() => post(body)}>Add comment</Button>
        </div>
    );
}) as React.FC<Props>;