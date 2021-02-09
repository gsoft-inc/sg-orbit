// Strongly inspired by https://github.com/react-restart/hooks/blob/master/src/useResizeObserver.ts.

import { isFunction, isNil } from "lodash";
import { useEffect } from "react";

const handlersMap = new WeakMap<Element, (entry: ResizeObserverEntry) => void>();

let observer: ResizeObserver;

function getResizeObserver(): ResizeObserver {
    return (observer =
        observer || new ResizeObserver(entries => {
            entries.forEach(entry => {
                const handler = handlersMap.get(entry.target);

                if (isFunction(handler)) {
                    handler(entry);
                }
            });
        })
    );
}

export const useResizeObserver = (element: Element, onResize: (entry: ResizeObserverEntry) => void, { box }: ResizeObserverOptions = {}): void => {
    useEffect(() => {
        if (!isNil(element)) {
            getResizeObserver().observe(element, { box });

            handlersMap.set(element, onResize);
        }

        return (): void => {
            if (!isNil(element)) {
                handlersMap.delete(element);

                if (!handlersMap.has(element)) {
                    getResizeObserver().unobserve(element);
                }
            }

        };
    }, [element, onResize, box]);
};
