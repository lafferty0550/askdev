import AccountAPI from './account';
import QuestionAPI from './questions';
import CommentAPI from './comments';
import LikeAPI from './likes';
import StarAPI from './stars';

import {Response} from '$common/types';

export type APIHandler = () => Promise<Response>;

export const API = {
    account: new AccountAPI(),
    questions: new QuestionAPI(),
    comments: new CommentAPI(),
    likes: new LikeAPI(),
    stars: new StarAPI()
};