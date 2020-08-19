import React from 'react';

import {IQuestion} from '../../../../common/types';

type Props = {
    data: IQuestion
};

import './current.less';
import {LikeIcon, StarIcon} from '../../ui/icons';

export const Current = (({data}) => (
    <div className='current'>
        <div className="current__section-left">
            <div className="current__title">{data.title}</div>
            <div className="current__body">{data.body}</div>
            <div className="current__date">{data.date}</div>
        </div>
        <div className='current__section-right'>
            <div>
                <LikeIcon/>
                <span>{data.likes}</span>
            </div>
            <div>
                <StarIcon/>
                <span>{data.stars}</span>
            </div>
        </div>
    </div>
)) as React.FC<Props>;