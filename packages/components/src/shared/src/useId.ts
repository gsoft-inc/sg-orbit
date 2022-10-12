import { isNil } from "./assertions";
import { useId as _useId } from "react";

export function useId(userId?: string, prefix?: string) {
    const uuid = _useId();

    if (!isNil(userId)) {
        return userId;
    }

    return !isNil(prefix) ? `${prefix}-${uuid}` : uuid;
}
