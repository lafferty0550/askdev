import React from 'react';

import {IComment} from '$common/types';

export const Comment = (({body, user, date, likes, comments}) => (
    <div className='comment'>
        here is a comment
    </div>
)) as React.FC<IComment>;