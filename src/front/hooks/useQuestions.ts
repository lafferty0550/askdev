import {useState, useEffect} from 'react';

import API from '../core/api';
import {IQuestion} from '../../common/types';

export default () => {
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');
    const [data, setData] = useState([] as Array<IQuestion>);
    useEffect(() => {
        (async () => {
            try {
                setPending(true);
                const res = await API.questions.getAll();
                setData(res.data.questions);
                setSuccess(true);
            } catch (err) {
                setSuccess(false);
                setMsg(err.response.data.msg);
            }
            setPending(false);
        })();
    }, []);
    return {pending, success, msg, data};
};