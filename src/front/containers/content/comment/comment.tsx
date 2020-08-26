import React, {useState} from 'react';

import {Comment} from '$components/content/comment/comment';
import {IComment, PostLikeData} from '$common/types';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {API} from '$core/api';
import {useFetch} from '$hooks/useFetch';

type Props = {
    comment: IComment,
    className?: string
};

export const CommentContainer = (({comment, className}) => {
    const [likes, setLikes] = useState(comment?.likes || 0); // likes count
    const likeResult = useFetch<PostLikeData>();
    
    useChangeEffect(() => setLikes(likeResult.data!.count), [likeResult.data]);

    const like = () =>
        likeResult.makeFetch(() => API.likes.post({target: 'comment', id: comment._id}));

    return <Comment comment={{...comment, likes}} like={like} className={className}/>;
}) as React.FC<Props>;