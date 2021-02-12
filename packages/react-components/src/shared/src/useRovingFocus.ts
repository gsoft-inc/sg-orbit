import { isNil } from "lodash";
import { useLayoutEffect } from "react";
import type { ChangeEventHandler, FocusScope } from "./useFocusScope";

export function useRovingFocus(scope: FocusScope): void {
    useLayoutEffect(() => {
        const handleFocus = (event: FocusEvent): void => {
            scope.elements.forEach(x => {
                if (x.tabIndex === 0) {
                    x.tabIndex = -1;
                }
            });

            (event.target as HTMLElement).tabIndex = 0;
        };

        const registerElement = (element: HTMLElement, isTabbable: boolean): void => {
            element.tabIndex = isTabbable ? 0 : -1;

            element.addEventListener("focusin", handleFocus, { capture: true });
        };

        const disposeElement = (element: HTMLElement): void => {
            element.removeEventListener("focusin", handleFocus, { capture: true });
        };

        const initializeElements = (): void => {
            scope.elements.forEach((x, index) => {
                registerElement(x, index === 0);
            });
        };

        initializeElements();

        const onChange: ChangeEventHandler = (newElements, oldElements) => {
            oldElements.forEach(disposeElement);

            const tabbableIndex = newElements.findIndex(x => x.tabIndex === 0);

            newElements.forEach((x, index) => {
                // When we don't have a tabbable element, the first focusable elements should be the tabbable element.
                registerElement(x, (tabbableIndex === -1 && index === 0) || tabbableIndex === index);
            });
        };

        scope.registerChangeHandler(onChange);

        return (): void => {
            scope.elements.forEach(disposeElement);
            scope.removeChangeHandler(onChange);
        };
    }, [scope]);
}

/*
IMPORTANT: Keyed roving focus doesn't handle disabled elements. This is the responsability of the calling component to ensure that the `currentKey` doesn't match a disabled element.
*/
export function useKeyedRovingFocus(scope: FocusScope, currentKey: string, { keyProp = "value" } = {}): void {
    useLayoutEffect(() => {
        const setTabIndexes = (elements: HTMLElement[]): void => {
            if (!isNil(currentKey)) {
                const tabbableIndex = !isNil(currentKey)
                    ? elements.findIndex(x => x.getAttribute(keyProp) === currentKey.toString())
                    : -1;

                elements.forEach((x, index) => {
                    x.tabIndex = tabbableIndex === index ? 0 : -1;
                });
            } else {
                // When we don't have a tabbable element, the first focusable elements should be the tabbable element.
                elements.forEach((x, index) => {
                    x.tabIndex = index === 0 ? 0 : -1;
                });
            }
        };

        const initializeElements = (): void => {
            setTabIndexes(scope.elements);
        };

        initializeElements();

        const onChange = (newElements: HTMLElement[]): void => {
            setTabIndexes(newElements);
        };

        scope.registerChangeHandler(onChange);

        return (): void => {
            scope.removeChangeHandler(onChange);
        };
    }, [scope, currentKey, keyProp]);
}
