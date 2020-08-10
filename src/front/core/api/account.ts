import BaseAPI from './instance';

export default class AccountAPI extends BaseAPI {
    login(email: string, password: string) {
        return this.instance.post('/account/login', {email, password});
    }
    register(email: string, nickname: string, password: string) {
        return this.instance.post('/account/register', {email, nickname, password});
    }
}