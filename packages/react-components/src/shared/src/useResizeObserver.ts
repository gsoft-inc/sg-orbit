// Strongly inspired by https://github.com/react-restart/hooks/blob/master/src/useResizeObserver.ts.

import { isFunction, isNil } from "lodash";
import { useEffect } from "react";

const handlersMap = new WeakMap<Element, (entry: ResizeObserverEntry) => void>();

let observer: ResizeObserver;

function getResizeObserver() {
    return (observer =
        observer || new ResizeObserver((entries: ResizeObserverEntry[]) => {
            entries.forEach((entry) => {
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

export const useResizeObserver = (element: Element, onResize: (entry: ResizeObserverEntry) => void, { isDisabled, box }: UseResizeObserverOptions = {}) => {
    useEffect(() => {
        if (!isDisabled) {
            if (!isNil(element)) {
                getResizeObserver().observe(element, { box });

                handlersMap.set(element, onResize);
            }

            return () => {
                if (!isNil(element)) {
                    handlersMap.delete(element);

                    if (!handlersMap.has(element)) {
                        getResizeObserver().unobserve(element);
                    }
                }

            };
        }
    }, [element, onResize, box, isDisabled]);
};
