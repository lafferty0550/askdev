import {AxiosResponse} from 'axios';

import BaseAPI from './instance';
import {
    GetMeResponse,
    LoginPayload,
    LoginResponse,
    PatchMePayload, PatchMeResponse,
    RegisterPayload,
    RegisterResponse
} from '$common/types';

/*
    Account API
 */
export default class AccountAPI extends BaseAPI {
    public login = async (user: LoginPayload): Promise<LoginResponse> => {
        const res: AxiosResponse = await this.instance.post('/account/login', user);
        return res.data;
    }
    public register = async (user: RegisterPayload): Promise<RegisterResponse> => {
        const res: AxiosResponse<RegisterResponse> = await this.instance.post('/account/register', user);
        return res.data;
    }
    public me = async (): Promise<GetMeResponse> => {
        const res: AxiosResponse<GetMeResponse> = await this.auth_instance.get('/account/me');
        return res.data;
    }
    public updateMe = async (user: PatchMePayload): Promise<PatchMeResponse> => {
        const res: AxiosResponse<PatchMeResponse> = await this.auth_instance.patch('/account/me', user);
        return res.data;
    }
}