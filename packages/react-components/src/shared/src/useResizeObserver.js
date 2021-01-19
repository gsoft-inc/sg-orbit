// Strongly inspired by https://github.com/react-restart/hooks/blob/master/src/useResizeObserver.ts.

import { ResizeObserver as Polyfill } from "@juggle/resize-observer";
import { isFunction, isNil } from "lodash";
import { useEffect } from "react";

const ResizeObserver = window.ResizeObserver || Polyfill;

const handlersMap = new WeakMap();

let observer;

function getResizeObserver() {
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

export const useResizeObserver = (element, onResize, { box } = {}) => {
    useEffect(() => {
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
    }, [element, onResize, box]);
};
