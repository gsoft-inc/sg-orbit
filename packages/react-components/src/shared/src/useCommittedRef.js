// Copied from https://github.com/react-restart/hooks/blob/master/src/useCommittedRef.ts.

import { useEffect, useRef } from "react";

export function useCommittedRef(value) {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
}
