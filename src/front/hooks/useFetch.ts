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
    success: boolean,
    msg?: string,
    data?: T,

    makeFetch: (handler: APIHandler) => Promise<void>
};

export const useFetch = <ExpectedData extends Data>(): FetchResult<ExpectedData> => {
    const [pending, setPending] = useState<Pending>(Pending.idle);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState<string>();
    const [data, setData] = useState<ExpectedData>();

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
            if (ex.response)
                setMsg(ex.response.data.msg);
        }
        setPending(Pending.fetched);
    };

    return {pending, success, msg, data, makeFetch};
};