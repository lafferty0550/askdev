import axios, { AxiosInstance } from 'axios';

export default class BaseAPI {
    protected instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: `${window.location.origin}/api`
        });
    }
}