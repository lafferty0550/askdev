import React from 'react';
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom';

import {IQuestion} from '../../../../common/types';

import './list.less';
import {LikeIcon, StarIcon} from '../../ui/icons';

type Props = {
    list?: IQuestion[]
};

export const QuestionList = (({list}) => {
    return (
        <div className='list'>
            {list?.map((item: IQuestion) => (
                <Link className='list-item' key={item._id} to={`/questions/${item._id}`}>
                    <div className='list-item__left-section'>
                        <div className="list-item__title">{item.title}</div>
                        <div className="list-item__body">{item.body}</div>
                        <div className="list-item__date">
                            {dateFormat(item.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        </div>
                    </div>
                    <div className='list-item__right-section'>
                        <div>
                            <LikeIcon/>
                            <span>{item.likes}</span>
                        </div>
                        <div>
                            <StarIcon/>
                            <span>{item.stars}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}) as React.FC<Props>;