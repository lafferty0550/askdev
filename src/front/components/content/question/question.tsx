import React from 'react';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {LikeIcon, StarIcon} from '$components/icons';

import {IQuestion} from '$common/types';

import './question.less';

type Props = {
    question: IQuestion,
    className?: string,
    like: (_id: string) => void,
    star: (_id: string) => void
};

export const Question = (({question, className, like, star}) => {
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
                <div>
                    <LikeIcon onClick={() => like(question._id)}/>
                    <span>{question.likes}</span>
                </div>
                <div>
                    <StarIcon onClick={() => star(question._id)}/>
                    <span>{question.stars}</span>
                </div>
            </div>
        </div>
    );
}) as React.FC<Props>;