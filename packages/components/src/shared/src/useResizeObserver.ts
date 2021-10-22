// Strongly inspired by https://github.com/react-restart/hooks/blob/master/src/useResizeObserver.ts.

import { RefCallback, useCallback, useRef } from "react";
import { isFunction, isNil } from "./assertions";

const handlersMap = new WeakMap<Element, (entry: ResizeObserverEntry) => void>();

let observer: ResizeObserver;

function getResizeObserver() {
    return (observer =
        observer || new ResizeObserver((entries: ResizeObserverEntry[]) => {
            entries.forEach(entry => {
                const handler = handlersMap.get(entry.target);

                if (isFunction(handler)) {
                    handler(entry);
                }
            });
        })
    );
}

interface UseResizeObserverOptions extends ResizeObserverOptions {
    isDisabled?: boolean;
}

export const useResizeObserver = (onResize: (entry: ResizeObserverEntry) => void, { box, isDisabled }: UseResizeObserverOptions = {}): RefCallback<HTMLElement> => {
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

                handlersMap.set(element, onResize);
            }
        }
    });

    return resizeRef;
};
