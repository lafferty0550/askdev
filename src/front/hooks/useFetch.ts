import {useState} from 'react';
import {AxiosError} from 'axios';

import {Data, Response} from '$common/types';
import {APIHandler} from '$core/api';

export enum Pending {
    'idle',
    'fetching',
    'fetched'
}

export type FetchResult<T = any> = {
    pending: Pending,
    success?: boolean,
    msg?: string,
    data?: T,

    makeFetch: (handler: APIHandler) => Promise<void>
};

// ExpectedData is data which comes from server
export const useFetch = <ExpectedData extends Data>(): FetchResult<ExpectedData> => {
    const [pending, setPending] = useState<Pending>(Pending.idle);
    const [success, setSuccess] = useState<boolean>();
    const [msg, setMsg] = useState<string>();
    const [data, setData] = useState<ExpectedData>();

    // Takes API handler that should make call to API
    // For example: makeFetch(() => API.{target}.{action}());
    const makeFetch = async (handler: APIHandler) => {
        setPending(Pending.fetching);
        try {
            const res: Response = await handler();
            setMsg(res.msg);
            if (res.data)
                setData(res.data);
            setSuccess(true);
        } catch (err) {
            const ex: AxiosError<Response> = err;
            setSuccess(false);
            if (ex.response)
                setMsg(ex.response.data.msg);
        }
        setPending(Pending.fetched);
    };

    return {pending, success, msg, data, makeFetch};
};