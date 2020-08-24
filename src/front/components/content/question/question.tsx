import React from 'react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {LikeIcon, StarIcon} from '$components/icons';

import {IQuestion} from '$common/types';

import './question.less';
import {API} from '$core/api';

export const Question = (({question, className, like}) => {
    let classname = 'question';
    if (className)
        classname += ` ${className}`;

    return (
        <div className={classname}>
            <div className='question__left-section'>
                <Link to={`/questions/${question._id}`} className="question__title">
                    {question.title}
                </Link>
                <div className="question__body">{question.body}</div>
                <div className="question__date">
                    {dateFormat(question.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                </div>
            </div>
            <div className='question__right-section'>
                <div onClick={() => like(question._id)}>
                    <LikeIcon/>
                    <span>{question.likes}</span>
                </div>
                <div onClick={() => console.log('star icon')}>
                    <StarIcon/>
                    <span>{question.stars}</span>
                </div>
            </div>
        </div>
    );
}) as React.FC<{ question: IQuestion, className?: string, like: (_id: string) => void }>;