import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';

import {RefreshTokenResponse} from '$common/types';
import {JWT_EXPIRES} from '$server/constants';
import {LocalStorage} from '$core/helpers/local-storage';

/*
    Base API
 */
export default class BaseAPI {
    protected instance: AxiosInstance; // common axios instance
    protected auth_instance: AxiosInstance; // axios instance that has x-access-token in its headers

    private baseURL = `${window.location.origin}/api`; // base url for fetch

    constructor() {
        this.instance = axios.create({baseURL: this.baseURL});

        // used when request needs JWT token
        this.auth_instance = axios.create({baseURL: this.baseURL, headers: {'x-access-token': LocalStorage.JWT}});
        /**
         *  because of LocalStorage.JWT can be changed at any time we need to
            take its info every request and put in headers...
            Consider to use:
            this.auth_instance.interceptors.request.use((config) => {
                return {...config, headers: {...config.headers, 'x-access-token': LocalStorage.JWT}};
            });
         */
        this.auth_instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                // if response of the previous request is failed because of JWT expiration
                // we need to refresh the token and repeat the request
                if (error.response?.data.msg !== JWT_EXPIRES)
                    return Promise.reject(error);

                try {
                    const res: AxiosResponse<RefreshTokenResponse> = await this.instance.post('/account/token', {
                        refreshToken: LocalStorage.refreshJWT
                    });
                    if (res.data.data) {
                        LocalStorage.JWT = res.data.data.token;
                        // repeat request
                        error.config.headers['x-access-token'] = res.data.data.token;
                        return this.instance.request(error.config);
                    }
                } catch (err) {
                    LocalStorage.cleanup();
                    return Promise.reject(err);
                }
            }
        )
    }
}