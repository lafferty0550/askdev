import React, {useState} from 'react';

import {Comment} from '$components/content/comment/comment';
import {IComment, PostLikeData} from '$common/types';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {API} from '$core/api';
import {useFetch} from '$hooks/useFetch';
import {useLikes} from '$hooks/useLikes';

type Props = {
    comment: IComment,
    className?: string
};

export const CommentContainer = (({comment, className}) => {
    const {likeResult, likes, setLikes, like} = useLikes(comment.likes, 'comment');

    return <Comment comment={{...comment, likes}} like={() => like(comment._id)} className={className}/>;
}) as React.FC<Props>;