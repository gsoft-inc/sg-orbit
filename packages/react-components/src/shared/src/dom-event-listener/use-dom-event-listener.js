import { isNil } from "lodash";
import { useEffect } from "react";

// TODO:
//  - Add params validation

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

export function useDomEventListener(name, on, active = true, { target = "document", capture = false } = {}) {
    useEffect(() => {
        const resolvedTarget = resolveTarget(target);

        if (active) {
            if (!isNil(resolvedTarget)) {
                resolvedTarget.addEventListener(name, on, capture);
            }
        }

        return () => {
            if (!isNil(resolvedTarget)) {
                resolvedTarget.removeEventListener(name, on, capture);
            }
        };
    }, [name, on, active, target, capture]);
}
