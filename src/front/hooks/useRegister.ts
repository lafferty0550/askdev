import {Pending, useFetch} from '$hooks/useFetch';
import {RegisterData, RegisterPayload} from '$common/types';
import {useChangeEffect} from '$hooks/useChangeEffect';
import {API} from '$core/api';

export const useRegister = (successCallback?: any, failureCallback?: any) => {
    const {pending, success, msg, makeFetch} = useFetch<RegisterData>();

    useChangeEffect(() => {
        if (pending !== Pending.fetched)
            return;
        if (!success) {
            failureCallback && failureCallback();
            return;
        }
        successCallback && successCallback()
    }, [pending]);

    const register = (user: RegisterPayload) => makeFetch(() => API.account.register(user));

    return {pending, success, msg, register};
};