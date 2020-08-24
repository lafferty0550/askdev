import React from 'react';

import {IQuestion} from '$common/types';
import {QuestionContainer} from '$containers/content/question/question';

import './list.less';

type Props = {
    list?: IQuestion[]
};

export const QuestionList = (({list}) => {
    return (
        <div className='list container'>
            {list?.map((item: IQuestion) => <QuestionContainer question={item} key={item._id}/>)}
        </div>
    );
}) as React.FC<Props>;