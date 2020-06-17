import { ResizeObserver } from "./resizeObserver";
import { isFunction, isNil } from "lodash";
import { useLayoutEffect } from "react";

export const useResizeObserver = (element, onResize) => {
    useLayoutEffect(() => {
        let observer;

        if (!isNil(element)) {
            observer = new ResizeObserver(entries => {
                if (isFunction(onResize)) {
                    onResize(entries);
                }
            });

            observer.observe(element);
        }

        return () => {
            if (!isNil(observer)) {
                observer.disconnect();
            }
        };
    }, [element, onResize]);
};
