import {useState} from 'react';

import {Pending, useFetch} from '$hooks/useFetch';
import {PostStarData} from '$common/types';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {API} from '$core/api';

export const useStars = (initial: number = 0) => {
    const [stars, setStars] = useState(initial);
    const starResult = useFetch<PostStarData>();

    useChangeEffect(() => {
        if (starResult.pending !== Pending.fetched)
            return;
        if (starResult.data)
            setStars(starResult.data!.count);
    }, [starResult.pending]);

    const star = (id: string) =>
        starResult.makeFetch(() => API.stars.post({target: 'question', id}));

    return {starResult, setStars, stars, star};
};