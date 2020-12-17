import { isNil } from "lodash";
import { useDocumentListener, useEventCallback } from "../../shared";

export function useInteractOutside(rootRef, { isDisabled, onInteractOutside } = {}) {
    const handleDocumentClick = useEventCallback(event => {
        if (!rootRef.current?.contains(event.target)) {
            if (!isNil(onInteractOutside)) {
                onInteractOutside(event);
            }
        }
    }, [rootRef, onInteractOutside]);

    useDocumentListener("click", handleDocumentClick, !isDisabled);
}
