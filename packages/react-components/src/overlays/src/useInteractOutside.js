import { isNil } from "lodash";
import { useDocumentListener, useEventCallback } from "../../shared";

export function useInteractOutside({ targetRef, onInteractOutside, isDisabled }) {
    const handleDocumentClick = useEventCallback(event => {
        if (!targetRef.current.contains(event.target)) {
            if (!isNil(onInteractOutside)) {
                onInteractOutside(event);
            }
        }
    }, [targetRef, onInteractOutside]);

    useDocumentListener("click", handleDocumentClick, !isDisabled);
}
