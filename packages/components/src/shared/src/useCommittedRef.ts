// Copied from https://github.com/react-restart/hooks/blob/master/src/useCommittedRef.ts.

import { RefObject, useEffect, useRef } from "react";

export function useCommittedRef<T>(value: T): RefObject<T> {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
}
