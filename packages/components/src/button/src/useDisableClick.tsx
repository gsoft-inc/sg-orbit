/**
 * useDisableInteraction provides the original event handler but disables interaction
 * if the boolean passed is true.
 */
import { useCallback, MouseEventHandler } from "react";

export function useDisableClick<T = Element>(disabled: boolean, handleClick: MouseEventHandler<T>) {
    const handleClickWrapper = useCallback<MouseEventHandler<T>>(
        event => {
            if (disabled) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        [disabled],
    );

    if (!disabled) {
        return handleClick;
    }

    return handleClickWrapper;
}
