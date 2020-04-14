import { isNil } from "lodash";
import { useEffect, useRef } from "react";

function resolveTarget(target) {
    if (target === "document") {
        return document;
    } else if (target === "window") {
        return window;
    } else if (target instanceof HTMLElement) {
        return target;
    }

    // It's a ref.
    return target.current;
}

export function useDomEventListener(name, on, target = "document", capture = false) {
    const resolvedTarget = useRef();

    useEffect(() => {
        resolvedTarget.current = resolveTarget(target);

        if (!isNil(resolvedTarget.current)) {
            resolvedTarget.current.addEventListener(name, on, capture);
        }

        return () => {
            if (!isNil(resolvedTarget.current)) {
                resolvedTarget.current.removeEventListener(name, on, capture);
            }
        };
    }, [resolvedTarget, name, on, target, capture]);
}
