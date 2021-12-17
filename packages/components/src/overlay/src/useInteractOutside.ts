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

    // If you remove "capture", test the popover component to make sure it still works.
    // https://reactjs.org/blog/2020/08/10/react-v17-rc.html#fixing-potential-issues
    useDocumentListener("click", handleDocumentClick, !isDisabled, { capture: true });
}

// export function useInteractOutside(rootElementRef: RefObject<HTMLElement>, { isDisabled, onInteractOutside }: UseInteractOutsideOptions = {}) {
//     const handleDocumentClick = useEventCallback(event => {
//         if (!rootElementRef.current?.contains(event.target as Node)) {
//             if (!isNil(onInteractOutside)) {
//                 onInteractOutside(event);
//             }
//         }
//     });

//     // If you remove "capture", test the popover component to make sure it still works.
//     // https://reactjs.org/blog/2020/08/10/react-v17-rc.html#fixing-potential-issues
//     useDocumentListener("click", handleDocumentClick, !isDisabled, { capture: true });
// }
