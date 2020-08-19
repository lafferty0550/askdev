import React, {useEffect, useMemo} from 'react';

import {QuestionList} from '../../../components/content/question/list';
import {useFetch} from '../../../hooks/useFetch';
import {GetQuestionsData} from '../../../../common/types';
import {API} from '../../../core/api';
import {LoadingWrapper} from '../../../components/content/loading-wrapper';

export const QuestionListContainer = (() => {
    const {pending, success, data, msg, makeFetch} = useFetch<GetQuestionsData>();

    useEffect(() => {
        makeFetch(() => API.questions.getAll()).then();
    }, []);

    const QuestionListMemo = useMemo(() => <QuestionList list={data?.questions}/>, [data]);
    return (
        <LoadingWrapper pending={pending} success={success}>
            {QuestionListMemo}
        </LoadingWrapper>
    );
}) as React.FC;