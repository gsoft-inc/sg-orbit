// Strongly inspired by https://github.com/react-restart/hooks/blob/master/src/useResizeObserver.ts.

import { MutableRefObject, RefCallback, RefObject, useCallback, useRef } from "react";
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

export type ResizeRef = RefCallback<HTMLElement> & RefObject<HTMLElement>;

export const useResizeObserver = (onResize: (entry: ResizeObserverEntry) => void, { isDisabled, box }: UseResizeObserverOptions = {}): ResizeRef => {
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

        (resizeRef as MutableRefObject<HTMLElement>).current = element;

        if (!isDisabled) {
            if (!isNil(element)) {
                elementRef.current = element;

                getResizeObserver().observe(element, { box });

                handlersMap.set(element, onResize);
            }
        }
    }) as ResizeRef;

    return resizeRef;
};
