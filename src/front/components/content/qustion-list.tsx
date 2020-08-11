import React, {Ref, useEffect, useRef} from 'react';
import dateFormat from 'dateformat';

import {IQuestion} from '../../../common/types';

import './question-list.less';
import {LikeIcon, StarIcon} from '../ui/icons';

type Props = {
    list: Array<IQuestion>
};

export default (({list}) => (
        <div className='list'>
            {console.log(list)}
            {list.map((item: IQuestion) => (
                <div className='list-item' key={item._id}>
                    <div className='list-item__left-section'>
                        <div className="list-item__title">{item.title}</div>
                        <div className="list-item__body">{item.body}</div>
                        <div className="list-item__date">
                            {dateFormat(item.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
                        </div>
                    </div>
                    <div className='list-item__right-section'>
                        <div className="list-item__likes">
                            <LikeIcon/>
                            <span>{item.likes}</span>
                        </div>
                        <div className="list-item__start">
                            <StarIcon/>
                            <span>{item.stars}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
) as React.FC<Props>;