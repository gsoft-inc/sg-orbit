import { isNil } from "./assertions";
import { useDocumentListener } from "./useEventListener";
import { useEventCallback } from "./useEventCallback";
import { useFocusWithin } from "./useFocusWithin";
import { useRefState } from "./useRefState";

export interface UseFocusVisibleWithinOptions {
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    isDisabled?: boolean;
}

export function useFocusVisibleWithin({
    onFocus,
    onBlur,
    isDisabled
}: UseFocusVisibleWithinOptions = {}) {
    const [isKeyboardInteractionRef, setIsKeyboardInteraction] = useRefState();

    const handleMouseDown = useEventCallback(() => {
        setIsKeyboardInteraction(false);
    });

    const handleKeyDown = useEventCallback(() => {
        setIsKeyboardInteraction(true);
    });

    useDocumentListener("mousedown", handleMouseDown, !isDisabled);
    useDocumentListener("keydown", handleKeyDown, !isDisabled);

    return useFocusWithin({
        // @ts-ignore
        onFocus: useEventCallback((event: FocusEvent) => {
            if (isKeyboardInteractionRef.current && !isNil(onFocus)) {
                onFocus(event);
            }
        }),
        // @ts-ignore
        onBlur,
        isDisabled
    });
}
