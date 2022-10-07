import { isNil } from "./assertions";
import { useId as useAutoId, useState } from "react";

// Polyfill to support React versions below 18.0.0
let currentId = 0;
const useIdPolyfill = () => {
    const [id] = useState(() => (":" + currentId++));

    return id;
};

export function useId(userId?: string, prefix?: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const uuid = useAutoId ? useAutoId() : useIdPolyfill();

    if (!isNil(userId)) {
        return userId;
    }

    return !isNil(prefix) ? `${prefix}-${uuid}` : uuid;
}
