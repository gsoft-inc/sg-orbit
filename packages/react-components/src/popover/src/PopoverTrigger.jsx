import { Children, forwardRef, useCallback } from "react";
import { Overlay, OverlayArrow, useOverlayBorderOffset, usePopup } from "../../overlay";
import { PopoverTriggerContext } from "./PopoverTriggerContext";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, resolveChildren } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Whether or not to show the popover.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * The interaction that triggers the popover.
     */
    trigger: oneOf(["click", "hover"]),
    /**
     * Position of the popover element related to the trigger.
     */
    position: oneOf([
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end"
    ]),
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the popover is visible.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * Whether or not the focus should be transferred to the first interactive element of the popover element when it opens.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the popover element can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the popover element position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the popover element.
     */
    zIndex: number,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerPopoverTrigger({
    id,
    open,
    defaultOpen,
    trigger: triggerProp = "click",
    position: positionProp = "bottom",
    onOpenChange,
    autoFocus,
    allowFlip = true,
    allowPreventOverflow = true,
    containerElement,
    zIndex,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const { isOpen, setIsOpen, overlayElement, triggerProps, overlayProps, arrowProps, position } = usePopup("dialog", {
        id,
        open,
        defaultOpen,
        onOpenChange,
        hideOnEscape: true,
        hideOLeave: true,
        hideOnOutsideClick: true,
        autoFocus,
        autoFocusOptions: {
            canFocus: useCallback(element => element.id !== "o-ui-popover-close-button", [])
        },
        restoreFocus: true,
        trigger: triggerProp,
        hasArrow: true,
        position: positionProp,
        allowFlip,
        allowPreventOverflow,
        boundaryElement: containerElement
    });

    const overlayOffsetStyles = useOverlayBorderOffset(position, "var(--o-ui-scale-bravo)");

    const close = useCallback(event => {
        setIsOpen(event, false);
    }, [setIsOpen]);

    const [trigger, popover] = Children.toArray(resolveChildren(children, { isOpen, close }));

    if (isNil(trigger) || isNil(popover)) {
        throw new Error("A popover trigger must have exactly 2 children.");
    }

    const triggerMarkup = augmentElement(trigger, triggerProps);

    return (
        <PopoverTriggerContext.Provider
            value={{
                isOpen,
                close
            }}
        >
            {triggerMarkup}
            <Overlay
                {...mergeProps(
                    rest,
                    overlayProps,
                    {
                        zIndex,
                        className: "o-ui-popover-overlay",
                        style: overlayOffsetStyles,
                        as,
                        ref: forwardedRef
                    }
                )}
            >
                {popover}
                <OverlayArrow {...arrowProps} />
            </Overlay>
        </PopoverTriggerContext.Provider>
    );
}

InnerPopoverTrigger.propTypes = propTypes;

export const PopoverTrigger = forwardRef((props, ref) => (
    <InnerPopoverTrigger {...props} forwardedRef={ref} />
));

PopoverTrigger.displayName = "PopoverTrigger";
