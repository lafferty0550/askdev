import {useState} from 'react';

import {Data, Response} from '../../common/types';
import {AxiosError} from 'axios';
import {APIHandler} from '../core/api';

export enum Pending {
    'idle',
    'fetching',
    'fetched'
}

export const useFetch = <ExpectedData extends Data>() => {
    const [pending, setPending] = useState<Pending>(Pending.idle);
    const [success, setSuccess] = useState<boolean>(false);
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