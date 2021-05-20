import { FocusEvent, KeyboardEvent, RefObject, SyntheticEvent } from "react";
import { Keys, isNil, mergeProps, useEventCallback, useRefState } from "../../shared";
import { UseOverlayLightDismissOptions, useOverlayLightDismiss } from "./useOverlayLightDismiss";
import { isDevToolsBlurEvent } from "./isDevtoolsBlurEvent";
import { isTargetParent } from "./isTargetParent";

export function usePopupLightDismiss(triggerRef: RefObject<HTMLElement>, overlayRef: RefObject<HTMLElement>, {
    trigger,
    onHide,
    hideOnEscape,
    hideOnLeave,
    hideOnOutsideClick
}: UseOverlayLightDismissOptions = {}) {
    const [isHandled, setIsHandled] = useRefState(false);

    const hide = (event: SyntheticEvent) => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.tab) {
            // When the popup doesn't have any focusable siblings, tabbing out from the overlay the focus will go back to the trigger.
            // Without this hack, the overlay would not close because we have code which prevent the overlay from closing when the focus move to the trigger.
            // This code specifically handle "tabs" to force close the overlay.
            setIsHandled(true);

            if (hideOnLeave) {
                hide(event);
            }
        }
    });

    const props = useOverlayLightDismiss(overlayRef, {
        trigger,
        onHide: useEventCallback((event: SyntheticEvent) => {
            switch (event.type) {
                case "click": {
                    // Ignore events related to the trigger to prevent double toggle.
                    //
                    // useOverlayTrigger "onHide" already handle most of this logic but still, this case must be handled here to distinguish
                    // "trigger" clicks from other "outside" clicks.
                    if (!isTargetParent(event.target, triggerRef)) {
                        hide(event);
                    }
                    break;
                }
                case "blur": {
                    // Sad hack, I am not sure why but keydown event occurs after blur event.
                    setTimeout(() => {
                        if (!isHandled.current) {
                            if (!isDevToolsBlurEvent(overlayRef)) {
                                // Ignore events related to the trigger to prevent double toggle.
                                if ((event as FocusEvent).relatedTarget !== triggerRef.current) {
                                    hide(event);
                                }
                            }
                        }

                        setIsHandled(false);
                    }, 0);
                    break;
                }
                default: {
                    hide(event);
                }
            }
        }),
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick
    });

    return mergeProps(
        props,
        {
            onKeyDown: handleKeyDown
        }
    );
}

