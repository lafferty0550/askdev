import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {RefreshTokenResponse} from '../../../common/types';

export default class BaseAPI {
    protected instance: AxiosInstance;
    protected secure_instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: `${window.location.origin}/api`
        });

        // used if request needs JWT token
        this.secure_instance = axios.create({
            baseURL: `${window.location.origin}/api`,
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        this.secure_instance.interceptors.response.use(
            (response: AxiosResponse) => response,
            async (error: AxiosError) => {
                // TODO: make it better
                // if response of the previous request is failed because of JWT expiration
                // we need to refresh the token and repeat that one
                if (error.response?.data.msg === 'TokenExpiredError: jwt expired') {
                    try {
                        const res: AxiosResponse<RefreshTokenResponse> = await this.instance.post('/account/token', {
                            refreshToken: localStorage.getItem('refreshToken')
                        });
                        if (res.data.data) {
                            localStorage.setItem('token', res.data.data.token);
                            // repeat request
                            const {config} = error;
                            config.headers['x-access-token'] = res.data.data.token;
                            return this.instance.request(config);
                        } else return error;
                    } catch (err) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refreshToken');
                        return error;
                    }
                } else
                    return error;
            }
        )
    }
}