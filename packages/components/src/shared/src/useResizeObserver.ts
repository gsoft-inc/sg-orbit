// Inspired from https://github.com/react-restart/hooks/blob/master/src/useResizeObserver.ts.

import { RefCallback, RefObject, useCallback, useRef } from "react";
import { isFunction, isNil } from "./assertions";

interface MapValue {
    elementRef: RefObject<HTMLElement>;
    handler: (entry: ResizeObserverEntry, elementRef: RefObject<HTMLElement>) => void;
}

const handlersMap = new WeakMap<Element, MapValue>();

let observer: ResizeObserver;

function getResizeObserver() {
    return (observer = observer || new ResizeObserver((entries: ResizeObserverEntry[]) => {
        entries.forEach(entry => {
            const mapValue = handlersMap.get(entry.target);

            if (!isNil(mapValue)) {
                const { elementRef, handler } = mapValue;

                if (isFunction(handler)) {
                    handler(entry, elementRef);
                }
            }
        });
    }));
}

interface UseResizeObserverOptions extends ResizeObserverOptions {
    isDisabled?: boolean;
}

export const useResizeObserver = (onResize: (entry: ResizeObserverEntry, elementRef: RefObject<HTMLElement>) => void, { box, isDisabled }: UseResizeObserverOptions = {}): RefCallback<HTMLElement> => {
    const elementRef = useRef<HTMLElement>(null);

    const dispose = useCallback(() => {
        const element = elementRef.current;

        if (!isNil(element)) {
            elementRef.current = null;

            if (!handlersMap.has(element)) {
                getResizeObserver().unobserve(element);
            }

            handlersMap.delete(element);
        }
    }, [elementRef]);

    const resizeRef = ((element: HTMLElement) => {
        dispose();

        if (!isDisabled) {
            if (!isNil(element)) {
                elementRef.current = element;

                getResizeObserver().observe(element, { box });

                handlersMap.set(element, {
                    elementRef: elementRef,
                    handler: onResize
                });
            }
        }
    });

    return resizeRef;
};
