import { isNil } from "lodash";
import { useLayoutEffect } from "react";
import { walkFocusableElements } from "./TO_REMOVE_focusableTreeWalker";

// IS IT POSSIBLE TO USE SOMETHING LIKE THIS INSTEAD OF A MutationObserver?

// export function useFocusManager() {
//     const scopeRef = useRef([]);

//     // const ref = useRef(null);

//     const setRef = useCallback(node => {
//         if (node) {
//             let node = startRef.current.nextSibling;
//             const nodes = [];
//             while (node && node !== endRef.current) {
//                 nodes.push(node);
//                 node = node.nextSibling;
//             }

//             scopeRef.current = nodes;
//             // Check if a node is actually passed. Otherwise node would be null.
//             // You can now do what you need to, addEventListeners, measure, etc.
//         } else {
//             scopeRef.current = [];
//         }
//     }, []);

//     const focusManager = new FocusManager(scopeRef);

//     return {
//         focusManager,
//         ref: setRef
//     };

//     // return [setRef];

//     // const { focusManager } = useContext(FocusContext);

//     // return focusManager;
// }

export function useRovingFocus(rootRef) {
    useLayoutEffect(() => {
        const root = rootRef.current;
        const scope = [];

        let hasTabbableElement = false;

        const handleFocus = event => {
            walkFocusableElements(root, x => {
                if (x.tabIndex === 0) {
                    x.tabIndex = -1;
                }
            });

            event.target.tabIndex = 0;
            hasTabbableElement = true;
        };

        const addElement = (element, isTabbable) => {
            scope.push(element);

            element.tabIndex = isTabbable ? 0 : -1;

            if (isTabbable) {
                hasTabbableElement = true;
            }

            element.addEventListener("focusin", handleFocus, { capture: true });
        };

        const removeElement = (element, removeFromScope) => {
            const index = scope.indexOf(element);

            if (index !== -1) {
                if (element.tabIndex === 0) {
                    hasTabbableElement = false;
                }

                element.removeEventListener("focusin", handleFocus, { capture: true });

                if (removeFromScope) {
                    scope.splice(index, 1);
                }
            }
        };

        const initializeElements = () => {
            walkFocusableElements(root, (element, index) => {
                addElement(element, index === 0);
            });
        };

        initializeElements();

        // Watch for dynamic elements.
        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(x => {
                if (x.type === "childList") {
                    x.addedNodes.forEach(element => {
                        // When we don't have a tabbable element, the first focusable elements should be the tabbable element.
                        walkFocusableElements(
                            element,
                            (y, index) => {
                                addElement(y, !hasTabbableElement && index === 0);
                            },
                            { includeRoot: true }
                        );
                    });

                    x.removedNodes.forEach(element => {
                        walkFocusableElements(element, y => { removeElement(y, true); }, { includeRoot: true });

                        if (!hasTabbableElement) {
                            // The tabbable element might have been removed, try to set a new tabbable element.
                            initializeElements();
                        }
                    });
                }
            });
        });

        mutationObserver.observe(root, {
            subtree: true,
            childList: true
        });

        return () => {
            scope.forEach(removeElement);
            mutationObserver.disconnect();
        };
    }, [rootRef]);
}

/*
Keyed roving focus doesn't handle disabled elements. This is the responsability of the calling component to ensure that the `currentKey` doesn't match a disabled element.
*/
export function useKeyedRovingFocus(rootRef, currentKey, { keyProp = "value" } = {}) {
    useLayoutEffect(() => {
        const root = rootRef.current;

        let hasTabbableElement = false;

        const setTabIndex = (element, position) => {
            let isTabbable;

            if (!isNil(currentKey)) {
                isTabbable = element.getAttribute(keyProp) === currentKey.toString();
            } else {
                // When the key is null and we don't have a tabbable element, the first focusable elements should be the tabbable element.
                isTabbable = !hasTabbableElement && position === 0;
            }

            element.tabIndex = isTabbable ? 0 : -1;

            if (isTabbable) {
                hasTabbableElement = true;
            }
        };

        const initializeElements = () => {
            walkFocusableElements(root, (element, index) => {
                setTabIndex(element, index);
            });
        };

        initializeElements();

        // Watch for dynamic elements.
        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(x => {
                if (x.type === "childList") {
                    x.addedNodes.forEach(element => {
                        // When all the elements are disabled and the key is null, the first of the new element should be tabbable.
                        walkFocusableElements(element, (y, index) => { setTabIndex(y, index); }, { includeRoot: true });
                    });

                    x.removedNodes.forEach(element => {
                        walkFocusableElements(
                            element,
                            y => {
                                if (y.tabIndex === 0) {
                                    hasTabbableElement = false;
                                }
                            },
                            { includeRoot: true }
                        );
                    });
                }
            });
        });

        mutationObserver.observe(root, {
            subtree: true,
            childList: true
        });

        return () => {
            mutationObserver.disconnect();
        };
    }, [rootRef, currentKey, keyProp]);
}
