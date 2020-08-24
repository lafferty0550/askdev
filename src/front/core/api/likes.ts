import {AxiosResponse} from 'axios';

import BaseAPI from './instance';
import {PostCommentResponse, PostLikeQuery} from '$common/types';

export default class CommentAPI extends BaseAPI {
    public post = async (query: PostLikeQuery): Promise<PostCommentResponse> => {
        const res: AxiosResponse = await this.auth_instance
            .post(`/likes?target=${query.target}&id=${query.id}`);
        return res.data;
    }
}