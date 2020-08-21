import React, {useState} from 'react';

import {IComment, IQuestion, PostCommentData, PostCommentPayload, PostCommentQuery} from '$common/types';
import {useFetch} from '$hooks/useFetch';
import {API} from '$core/api';
import {Question} from './question';
import {Comment} from '../comment/comment';
import {PostComment} from '../comment/post-comment';

import './current.less';

export const Current = ((question) => {
    const {pending, success, msg, data, makeFetch} = useFetch<PostCommentData>();

    const [isCommentFormShown, showCommentForm] = useState(false);

    const postComment = async (body: string) => {
        await makeFetch(() => API.comments.post({
                target: 'question',
                id: question._id
            } as PostCommentQuery,
            {body} as PostCommentPayload)
        );
    };

    return (
        <div className='current'>
            <Question {...question} className='current__question'/>
            {question.comments.map(((comment: IComment) => <Comment {...comment}/>))}
            <div onClick={() => showCommentForm(true)}>Add a comment</div>
            {isCommentFormShown ? (<PostComment post={postComment}/>) : null}
        </div>
    );
}) as React.FC<IQuestion>;