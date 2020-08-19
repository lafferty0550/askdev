import { AxiosResponse } from 'axios';

import BaseAPI from './instance';
import {
    GetQuestionResponse,
    GetQuestionsResponse,
    PostQuestionResponse
} from '../../../common/types';

export default class QuestionAPI extends BaseAPI {
    public getAll = async (): Promise<GetQuestionsResponse> => {
        const res: AxiosResponse = await this.instance.get('/questions');
        return res.data;
    }

    public getOne = async (id: string): Promise<GetQuestionResponse> => {
        const res: AxiosResponse = await this.instance.get(`/questions/${id}`);
        return res.data;
    }

    public post = async (title: string, body: string): Promise<PostQuestionResponse> => {
        const res: AxiosResponse = await this.instance.post('/questions', {title, body});
        return res.data;
    }
}