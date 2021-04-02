import { isFunction, isNil } from "lodash";
import { useCallback, useEffect } from "react";

export function useEventListener(eventTarget: EventTarget | (() => EventTarget), eventName: string, listener: EventListenerOrEventListenerObject | null, active = true, options?: boolean | EventListenerOptions) {
    useEffect(() => {
        const target = isFunction(eventTarget) ? eventTarget() : eventTarget;

        if (active) {
            if (!isNil(target)) {
                target.addEventListener(eventName, listener, options);
            }
        }

        return () => {
            if (!isNil(target)) {
                target.removeEventListener(eventName, listener, options);
            }
        };
    }, [eventTarget, eventName, listener, active, options]);
}

export function useDocumentListener(eventName: string, listener: EventListenerOrEventListenerObject | null, active: boolean, options?: boolean | EventListenerOptions) {
    const documentTarget = useCallback(() => document, []);

    useEventListener(documentTarget, eventName, listener, active, options);
}

export function useWindowListener(eventName: string, listener: EventListenerOrEventListenerObject | null, active: boolean, options?: boolean | EventListenerOptions) {
    const documentTarget = useCallback(() => window, []);

    useEventListener(documentTarget, eventName, listener, active, options);
}
