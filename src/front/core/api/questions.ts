import BaseAPI from './instance';

export default class QuestionAPI extends BaseAPI {
    getAll() {
        return this.instance.get('/questions');
    }
    getOne(id: string) {
        return this.instance.get(`/questions/${id}`);
    }
}