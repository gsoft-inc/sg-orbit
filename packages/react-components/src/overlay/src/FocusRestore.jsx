import { any, bool } from "prop-types";
import { disposables } from "../../shared";
import { useLayoutEffect } from "react";

const propTypes = {
    /**
     * Whether or not to restore the focus when unmounted.
     */
    restoreFocus: bool,
    /**
     * Container element in which the focused element should be.
     */
    rootRef: any.isRequired,
    /**
     * React children.
     */
    children: any.isRequired
};

export function FocusRestore({
    restoreFocus = true,
    rootRef,
    children
}) {
    // useLayoutEffect instead of useEffect so the active element is saved synchronously instead of asynchronously.
    useLayoutEffect(() => {
        const elementToRestore = document.activeElement;
        const scopeElement = rootRef.current;

        return () => {
            if (restoreFocus && scopeElement?.contains(document.activeElement)) {
                disposables().nextFrame(() => {
                    if (document.body.contains(elementToRestore)) {
                        elementToRestore?.focus();
                    }
                });
            }
        };
    });

    return children;
}

FocusRestore.propTypes = propTypes;
