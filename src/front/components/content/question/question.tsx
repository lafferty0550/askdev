import React from 'react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {LikeIcon, StarIcon} from '$components/ui/icons';

import {IQuestion} from '$common/types';

import './question.less';

export const Question = (({_id, title, body, date, likes, stars, className}) => {
    let classname = 'question';
    if (className)
        classname += ` ${className}`;

    return (
        <div className={classname}>
            <div className='question__left-section'>
                <Link to={`/questions/${_id}`} className="question__title">
                    {title}
                </Link>
                <div className="question__body">{body}</div>
                <div className="question__date">
                    {dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                </div>
            </div>
            <div className='question__right-section'>
                <div onClick={() => console.log('like icon')}>
                    <LikeIcon/>
                    <span>{likes}</span>
                </div>
                <div onClick={() => console.log('star icon')}>
                    <StarIcon/>
                    <span>{stars}</span>
                </div>
            </div>
        </div>
    );
}) as React.FC<IQuestion & { className?: string }>;