import AccountAPI from './account';
import QuestionAPI from './questions';
import CommentAPI from './comments';

import {Response} from '../../../common/types';

export type APIHandler = () => Promise<Response>;

export const API = {
    account: new AccountAPI(),
    questions: new QuestionAPI(),
    comments: new CommentAPI()
};