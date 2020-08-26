import { useEffect, useRef } from 'react';

// useEffect that calls only when deps are changed (not in first render)
export const useChangeEffect = (func: Function, deps: Array<any>) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) func();
        else didMount.current = true;
    }, deps);
}