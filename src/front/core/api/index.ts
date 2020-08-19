import AccountAPI from './account';
import QuestionAPI from './questions';

import {Response} from '../../../common/types';

export type APIHandler = () => Promise<Response>;

export const API = {
    account: new AccountAPI(),
    questions: new QuestionAPI()
};