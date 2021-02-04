import { isFunction, isNil } from "lodash";
import { useCallback, useEffect } from "react";

export function useEventListener(eventTarget: EventTarget | (() => EventTarget), eventName: string, listener: EventListenerOrEventListenerObject | null, active = true, capture = false) {
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

export function useDocumentListener(eventName: string, listener: EventListenerOrEventListenerObject | null, active: boolean, capture: boolean) {
    const documentTarget = useCallback(() => document, []);

    useEventListener(documentTarget, eventName, listener, active, capture);
}

export function useWindowListener(eventName: string, listener: EventListenerOrEventListenerObject | null, active: boolean, capture: boolean) {
    const documentTarget = useCallback(() => window, []);

    useEventListener(documentTarget, eventName, listener, active, capture);
}
