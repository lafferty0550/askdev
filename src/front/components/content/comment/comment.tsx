import React from 'react';
import dateFormat from 'dateformat';

import {IComment} from '$common/types';
import {LikeIcon} from '$components/icons';

import './comment.less';

type Props = {
    comment: IComment,
    like: () => void,
    className?: string
};

export const Comment = (({comment: {body, user, date, likes}, like, className}) => (
    <div className={className ? `comment ${className}` : 'comment'}>
        <div className="comment__likes">
            <LikeIcon onClick={like}/>
            <span>{likes}</span>
        </div>
        <div className="comment__text">
            <div className="comment__body">{body}</div>
            <div className="comment__info">
                <div className="comment__user">{user.nickname}</div>
                <div className="comment__date">{dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</div>
            </div>
        </div>
    </div>
)) as React.FC<Props>;