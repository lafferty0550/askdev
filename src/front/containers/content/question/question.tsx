import React, {ReactNode, useEffect, useState} from 'react';

import {Current} from '$components/content/question/current';
import {useFetch} from '$hooks/useFetch';
import {GetQuestionData, IQuestion, PostLikeData} from '$common/types';
import {API} from '$core/api';
import {LoadingWrapper} from '$components/content/loading-wrapper';
import {useChangeEffect} from '$hooks/useChangeEffect';

type Props = {
    id?: string, // used to fetch data
    question?: IQuestion, // used to render this question
    showComments?: boolean // used to render or not comments block
};

export const QuestionContainer = (({id, question, showComments = false}) => {
    const [likes, setLikes] = useState(question?.likes || 0); // likes count
    const questionResult = useFetch<GetQuestionData>();
    const likeResult = useFetch<PostLikeData>();

    // if there is no data in props then we need to fetch question
    useEffect(() => {
        if (!question)
            questionResult.makeFetch(() => API.questions.getOne(id!)).then();
    }, []);
    // if there is no data in props and fetch is done then we takes likes amount from fetch data
    useChangeEffect(() => {
        if (!question)
            setLikes(questionResult.data!.question.likes);
    }, [questionResult.data]);

    // update likes count after like a question
    useChangeEffect(() => setLikes(likeResult.data!.count), [likeResult.data]);

    const like = (_id: string) =>
        likeResult.makeFetch(() => API.likes.post({target: 'question', id: _id}));

    // if a exists then render Current component with a in props
    // otherwise if b exists then render Current component with b in props
    // otherwise return null
    const renderOneOf = (a: IQuestion | undefined, b: IQuestion | undefined): ReactNode | null => {
        if (a) return <Current question={{...a, likes}} like={like} showComments={showComments}/>;
        if (b) return renderOneOf(b, undefined);
        return null;
    };

    return (
        <LoadingWrapper pending={questionResult.pending} success={questionResult.success}>
            {/*if there is data in props then render it, otherwise we need to render fetched data*/}
            {renderOneOf(question, questionResult.data?.question)}
        </LoadingWrapper>
    );
}) as React.FC<Props>;