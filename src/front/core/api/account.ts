import {AxiosResponse} from 'axios';

import BaseAPI from './instance';
import {GetMeResponse, LoginResponse, RegisterResponse} from '../../../common/types';

export type UserInput = {
    email: string,
    nickname?: string,
    password: string
};

export default class AccountAPI extends BaseAPI {
    public login = async (user: UserInput): Promise<LoginResponse> => {
        const res: AxiosResponse = await this.instance.post('/account/login', user);
        return res.data;
    }
    public register = async (user: UserInput): Promise<RegisterResponse> => {
        const res: AxiosResponse<RegisterResponse> = await this.instance.post('/account/register', user);
        return res.data;
    }
    public me = async (): Promise<GetMeResponse> => {
        const res: AxiosResponse<GetMeResponse> = await this.secure_instance.get('/account/me');
        return res.data;
    }
}