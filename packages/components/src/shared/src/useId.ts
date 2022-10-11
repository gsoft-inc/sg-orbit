import { isNil } from "./assertions";
import { useId as useIdReact, useState } from "react";

// Polyfill to support useId on React versions below 18.0.0, doesn't work on server
let currentId = 0;
const isSSR = !(typeof window !== "undefined" && window.document && window.document.createElement);
const useIdPolyfill = () => {
    const [id] = useState(() => (":" + currentId++));

    if (isSSR) {
        return undefined;
    }

    return id;
};

const useAutoId = useIdReact ?? useIdPolyfill;

export function useId(userId?: string, prefix?: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const uuid = useAutoId();

    if (!isNil(userId)) {
        return userId;
    }

    return !isNil(prefix) ? `${prefix}-${uuid}` : uuid;
}
