import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import {Create} from '$components/content/question/create';
import {API} from '$core/api';
import {Pending, useFetch} from '$hooks/useFetch';
import {PostQuestionData} from '$common/types';
import {LoadingWrapper} from '$components/content/loading-wrapper';

export const CreateContainer = (() => {
    const [redirect, setRedirect] = useState(false);
    const {pending, success, msg, makeFetch} = useFetch<PostQuestionData>();

    useEffect(() => {
        if (pending === Pending.fetched && success)
            setRedirect(true);
    }, [pending, success]);

    const postQuestion = (title: string, body: string) => {
        makeFetch(() => API.questions.post({title, body})).then();
    };

    if (redirect)
        return <Redirect to='/questions'/>

    return (
        <LoadingWrapper pending={pending} success={success}>
            <Create accept={postQuestion}/>
        </LoadingWrapper>
    );
}) as React.FC;