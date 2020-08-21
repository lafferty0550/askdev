import comment from './comment';
import question, {IQuestionDoc} from './question';
import user from './user';
import { IComment } from '$common/types';

export type {IComment, IQuestionDoc};

export default {comment, question, user} as {[key: string]: any};