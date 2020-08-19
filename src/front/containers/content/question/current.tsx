import React, {useEffect} from 'react';

import {Current} from '../../../components/content/question/current';
import {useFetch} from '../../../hooks/useFetch';
import {GetQuestionData} from '../../../../common/types';
import {API} from '../../../core/api';
import {LoadingWrapper} from '../../../components/content/loading-wrapper';

type Props = {
    id: string
};

export const CurrentContainer = (({id}) => {
    const {pending, success, msg, data, makeFetch} = useFetch<GetQuestionData>();
    useEffect(() => {
        if (id)
            makeFetch(() => API.questions.getOne(id)).then();
    }, []);

    return (
        <LoadingWrapper pending={pending} success={success}>
            {data && <Current data={data.question}/>}
        </LoadingWrapper>
    );
}) as React.FC<Props>;