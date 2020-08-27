import React, {useEffect} from 'react';

import {Current} from '$components/content/question/current';
import {Pending, useFetch} from '$hooks/useFetch';
import {GetQuestionData, IQuestion} from '$common/types';
import {API} from '$core/api';
import {LoadingWrapper} from '$components/content/loading-wrapper';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {useLikes} from '$hooks/useLikes';
import {useStars} from '$hooks/useStars';

type Props = {
    id?: string, // used to fetch data
    question?: IQuestion, // used to render this question
    showComments?: boolean // used to render or not comments block
};

export const QuestionContainer = (({id, question, showComments = false}) => {
    const {likeResult, setLikes, likes, like} = useLikes(question?.likes || 0, 'question');
    const {starResult, setStars, stars, star} = useStars(question?.stars || 0);
    const questionResult = useFetch<GetQuestionData>();

    // if there is no data in props then we need to fetch question
    useEffect(() => {
        if (!question)
            questionResult.makeFetch(() => API.questions.getOne(id!)).then();
    }, []);
    // if there is no data in props and fetch is done then we takes likes and stars amount from fetched data
    useChangeEffect(() => {
        // if question exists
        if ((questionResult.pending !== Pending.fetched) || question)
            return;

        setLikes(questionResult.data!.question.likes);
        setStars(questionResult.data!.question.stars);
    }, [questionResult.pending]);

    let data = question || questionResult.data?.question!;
    return (
        <LoadingWrapper pending={questionResult.pending}>
            {/*if there is data in props then render it, otherwise we need to render fetched data*/}
            {data
                ? <Current question={{...data, likes, stars}} like={like}
                           star={star}
                           showComments={showComments}/>
                : null}
        </LoadingWrapper>
    );
}) as React.FC<Props>;