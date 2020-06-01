import { isFunction, isNil } from "lodash";
import { useCallback, useEffect } from "react";

export function useEventListener(eventTarget, eventName, listener, active = true, capture = false) {
    useEffect(() => {
        const target = isFunction(eventTarget) ? eventTarget() : eventTarget;

        if (active) {
            if (!isNil(target)) {
                target.addEventListener(eventName, listener, capture);
            }
        }

        return () => {
            if (!isNil(target)) {
                target.removeEventListener(eventName, listener, capture);
            }
        };
    }, [eventTarget, eventName, listener, active, capture]);
}

export function useDocumentListener(eventName, listener, active, capture) {
    const documentTarget = useCallback(() => document, []);

    useEventListener(documentTarget, eventName, listener, active, capture);
}

export function useWindowListener(eventName, listener, active, capture) {
    const documentTarget = useCallback(() => window, []);

    useEventListener(documentTarget, eventName, listener, active, capture);
}
