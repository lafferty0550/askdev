import React from 'react';

import {Pending} from '$hooks/useFetch';
import {Spinner} from '../ui/spinner';

type Props = {
    pending: Pending,
    success: boolean
}

import './loading-wrapper.less';

export const LoadingWrapper = (({pending, success, children}) => (
    <>
        {(pending === Pending.fetching) ? (
            <div className="loading">
                <Spinner/>
            </div>
        ) : children}
    </>
)) as React.FC<Props>;