// Copied from https://github.com/react-restart/hooks/blob/master/src/useCommittedRef.ts.

import { MutableRefObject, useEffect, useRef } from "react";

export function useCommittedRef<T>(value: T): MutableRefObject<T> {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
}
