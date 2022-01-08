import { FocusScope, isNil, useDocumentListener, useEventCallback } from "../../shared";

import { MouseEvent } from "react";

export interface UseInteractOutsideOptions {
    isDisabled?: boolean;
    onInteractOutside?: (e: MouseEvent) => void;
}

export function useInteractOutside(focusScope: FocusScope, { isDisabled, onInteractOutside }: UseInteractOutsideOptions = {}) {
    const handleDocumentClick = useEventCallback(event => {
        if (!focusScope.isInScope(event.target, { includeChildScopes: true })) {
            if (!isNil(onInteractOutside)) {
                onInteractOutside(event);
            }
        }
    });

    // Cannot use "click" because of the following React issue so we fallback to "mouseup".
    // https://github.com/facebook/react/issues/23074
    useDocumentListener("mouseup", handleDocumentClick, !isDisabled);
}
