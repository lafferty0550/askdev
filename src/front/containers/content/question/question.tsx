import React, {ReactNode, useEffect, useState} from 'react';

import {Current} from '$components/content/question/current';
import {useFetch} from '$hooks/useFetch';
import {GetQuestionData, IQuestion, PostLikeData} from '$common/types';
import {API} from '$core/api';
import {LoadingWrapper} from '$components/content/loading-wrapper';
import {useChangeEffect} from '$hooks/useChangeEffect';

type Props = {
    id?: string,

    question?: IQuestion,
    showComments?: boolean
};

export const QuestionContainer = (({id, question, showComments = false}) => {
    const [likes, setLikes] = useState(question?.likes || 0);
    const questionResult = useFetch<GetQuestionData>();
    const likeResult = useFetch<PostLikeData>();

    // if there is no data in props then fetch question
    useEffect(() => {
        if (!question)
            questionResult.makeFetch(() => API.questions.getOne(id!)).then();
    }, []);
    // if there is no data in props then we takes likes amount from fetch data
    useChangeEffect(() => {
        if (!question)
            setLikes(questionResult.data!.question.likes);
    }, [questionResult.data]);

    useChangeEffect(() => setLikes(likeResult.data!.count), [likeResult.data]);

    const like = (_id: string) =>
        likeResult.makeFetch(() => API.likes.post({target: 'question', id: _id}));

    const renderOneOf = (a: IQuestion | undefined, b: IQuestion | undefined): ReactNode | null => {
        if (a) return <Current question={{...a, likes}} like={like} showComments={showComments}/>;
        if (b) return renderOneOf(b, undefined);
        return null;
    };

    return (
        <LoadingWrapper pending={questionResult.pending} success={questionResult.success}>
            {renderOneOf(question, questionResult.data?.question)}
        </LoadingWrapper>
    );
}) as React.FC<Props>;