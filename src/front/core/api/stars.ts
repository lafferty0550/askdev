import {AxiosResponse} from 'axios';

import BaseAPI from './instance';
import {PostStarQuery, PostStarResponse} from '$common/types';

/*
    Star API
 */
export default class StarAPI extends BaseAPI {
    public post = async (query: PostStarQuery): Promise<PostStarResponse> => {
        const res: AxiosResponse = await this.auth_instance
            .post(`/stars?target=${query.target}&id=${query.id}`);
        return res.data;
    }
}