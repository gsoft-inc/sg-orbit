// Copied from https://github.com/react-restart/hooks/blob/master/src/useEventCallback.ts

import { useStaticCallback } from "./use-static-callback";

export function useEventCallback(callback) {
    return useStaticCallback(callback);
}
