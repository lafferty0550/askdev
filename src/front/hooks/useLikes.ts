import {useState} from 'react';

import {Pending, useFetch} from '$hooks/useFetch';
import {PostLikeData} from '$common/types';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {API} from '$core/api';

export const useLikes = (initial: number = 0, target: 'question' | 'comment') => {
    const [likes, setLikes] = useState(initial);
    const likeResult = useFetch<PostLikeData>();

    useChangeEffect(() => {
        if (likeResult.pending !== Pending.fetched)
            return;
        if (likeResult.data)
            setLikes(likeResult.data!.count);
    }, [likeResult.pending, likeResult.data]);

    const like = (id: string) =>
        likeResult.makeFetch(() => API.likes.post({target, id}));

    return {likeResult, setLikes, likes, like};
};