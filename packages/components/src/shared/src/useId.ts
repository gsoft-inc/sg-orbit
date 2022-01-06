import { isNil } from "./assertions";
import { useMemo } from "react";

let id = 0;

export function useId(userId?: string, prefix?: string) {
    const [uuid] = useMemo(() => (++id).toString(), []);

    if (!isNil(userId)) {
        return userId;
    }

    return !isNil(prefix) ? `${prefix}-${uuid}` : uuid;
}
