import {AxiosResponse} from 'axios';

import BaseAPI from './instance';
import {PostLikeQuery, PostLikeResponse} from '$common/types';

/*
    Like API
 */
export default class LikeAPI extends BaseAPI {
    public post = async (query: PostLikeQuery): Promise<PostLikeResponse> => {
        const res: AxiosResponse = await this.auth_instance
            .post(`/likes?target=${query.target}&id=${query.id}`);
        return res.data;
    }
}