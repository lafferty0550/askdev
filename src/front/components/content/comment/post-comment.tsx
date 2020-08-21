import React, {useState} from 'react';

import {Button} from '$components/ui/button';

type Props = {
    post: (body: string) => void
};

export const PostComment = (({post}) => {
    const [body, setBody] = useState('');

    return (
        <div className="comment-post">
            <input type="text" onChange={e => setBody(e.target.value)}/>
            <Button type='accept' onClick={() => post(body)}>Add comment</Button>
        </div>
    );
}) as React.FC<Props>;