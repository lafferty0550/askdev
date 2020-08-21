import {AxiosResponse} from 'axios';

import BaseAPI from './instance';
import {PostCommentPayload, PostCommentQuery, PostCommentResponse} from '$common/types';

export default class CommentAPI extends BaseAPI {
    public post = async (query: PostCommentQuery, comment: PostCommentPayload): Promise<PostCommentResponse> => {
        const res: AxiosResponse = await this.secure_instance
            .post(`/comments?target=${query.target}&id=${query.id}`, comment);
        return res.data;
    }
}