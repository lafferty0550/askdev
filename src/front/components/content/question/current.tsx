import React, {useEffect, useState} from 'react';

import {IComment, IQuestion, PostCommentData, PostCommentPayload, PostCommentQuery} from '$common/types';
import {useFetch} from '$hooks/useFetch';
import {API} from '$core/api';
import {Question} from './question';
import {Comment} from '../comment/comment';
import {PostComment} from '../comment/post-comment';
import {LoadingWrapper} from '$components/content/loading-wrapper';

import './current.less';

type Props = {
    question: IQuestion,
    like: (_id: string) => void,

    showComments?: boolean
};

export const Current = (({question, like, showComments}) => {
    const [isShown, showCommentForm] = useState(false);
    const [showAll, showAllComments] = useState(false);
    const [comments, setComments] = useState<IComment[]>(question.comments);

    const {pending, success, msg, data, makeFetch} = useFetch<PostCommentData>();

    const postComment = async (body: string) => {
        await makeFetch(() => API.comments.post({
                target: 'question',
                id: question._id
            } as PostCommentQuery,
            {body} as PostCommentPayload));
    };

    useEffect(() => {
        if (data)
            setComments([...comments, data]);
    }, [data]);

    return (
        <div className='current'>
            <Question question={question} like={like}/>
            {showComments ? (
                <LoadingWrapper pending={pending} success={true}>
                    <div className="current__comments">
                        {(!showAll ? comments.slice(0, 3) : comments).map(((comment: IComment) =>
                            <Comment {...comment} className='current__comment' key={comment._id}/>)
                        )}
                        <div onClick={() => showAllComments(!showAll)} className='current__btn'>
                            {showAll ? 'Hide' : 'Show more'}
                        </div>
                        <div onClick={() => showCommentForm(true)} className='current__btn'>Add a comment</div>
                        {isShown ? (<PostComment post={postComment} className='current__post'/>) : null}
                    </div>
                </LoadingWrapper>
            ) : null}
        </div>
    );
}) as React.FC<Props>;