import React from 'react';

import {Pending} from '$hooks/useFetch';
import {Spinner} from '../spinner';

type Props = { pending: Pending }

import './loading-wrapper.less';

export const LoadingWrapper = (({pending = true, children}) => (
    <>
        {(pending === Pending.fetching) ? (
            <div className="loading">
                <Spinner/>
            </div>
        ) : children}
    </>
)) as React.FC<Props>;