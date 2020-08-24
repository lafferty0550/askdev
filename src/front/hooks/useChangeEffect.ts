import React, { useEffect, useRef } from 'react';

export const useChangeEffect = (func: Function, deps: Array<any>) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}