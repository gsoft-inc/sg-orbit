// Copied from https://github.com/react-restart/hooks/blob/master/src/useEventCallback.ts.

import { isNil } from "lodash";
import { useCallback } from "react";
import { useCommittedRef } from "./useCommittedRef";

export function useEventCallback(callback: (...args: any[]) => void): (...args: any[]) => void {
    const ref = useCommittedRef(callback);

    return useCallback((...args) => {
        if (!isNil(ref.current)) {
            ref.current(...args);
        }
    }, [ref]);
}
