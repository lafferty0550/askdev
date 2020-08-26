import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {Create} from '$components/content/question/create';
import {API} from '$core/api';
import {useFetch} from '$hooks/useFetch';
import {PostQuestionData, PostQuestionPayload} from '$common/types';
import {LoadingWrapper} from '$components/content/loading-wrapper';
import {useChangeEffect} from '$hooks/useChangeEffect';

export const CreateContainer = (() => {
    const [redirect, setRedirect] = useState(false);
    const {pending, success, msg, makeFetch} = useFetch<PostQuestionData>();

    useChangeEffect(() => {
        // if success is true (default value is false) then do redirect
        setRedirect(true);
    }, [success]);

    const postQuestion = (question: PostQuestionPayload) =>
        makeFetch(() => API.questions.post(question)).then();

    if (redirect)
        return <Redirect to='/questions'/>;

    return (
        <LoadingWrapper pending={pending}>
            <Create accept={postQuestion}/>
        </LoadingWrapper>
    );
}) as React.FC;