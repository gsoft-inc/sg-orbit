import { Children, forwardRef, useCallback } from "react";
import { Overlay, Trigger, usePopup } from "../../overlay";
import { PopoverTriggerContext } from "./PopoverTriggerContext";
import { any, arrayOf, bool, func, instanceOf, number, oneOf, oneOfType } from "prop-types";
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
     * Position of the popover element.
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
     * Allow to displace the popover element from its trigger.
     * Ex: `[10, -10]`
     */
    offset: arrayOf(number),
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
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerPopoverTrigger({
    open,
    defaultOpen,
    trigger: triggerProp = Trigger.click,
    position = "bottom",
    offset,
    onOpenChange,
    autoFocus,
    allowFlip = true,
    allowPreventOverflow = true,
    containerElement,
    zIndex,
    children,
    forwardedRef,
    ...rest
}) {
    const { isOpen, setIsOpen, triggerProps, overlayProps } = usePopup("dialog", {
        open,
        defaultOpen,
        onOpenChange,
        hideOnEscape: true,
        hideOnBlur: true,
        autoFocus,
        restoreFocus: true,
        trigger: triggerProp,
        position,
        offset: offset ?? [0, 4],
        allowFlip,
        allowPreventOverflow,
        boundaryElement: containerElement,
        zIndex
    });

    const close = useCallback(event => {
        setIsOpen(event, false);
    }, [setIsOpen]);

    const [trigger, popover] = Children.toArray(resolveChildren(children, { isOpen, close }));

    if (isNil(trigger) || isNil(popover)) {
        throw new Error("A popover trigger must have exactly 2 children.");
    }

    const triggerMarkup = augmentElement(trigger, triggerProps);

    return (
        <>
            {triggerMarkup}
            <Overlay
                {...mergeProps(
                    rest,
                    overlayProps,
                    {
                        ref: forwardedRef
                    }
                )}
            >
                <PopoverTriggerContext.Provider
                    value={{
                        isOpen,
                        close
                    }}
                >
                    {popover}
                </PopoverTriggerContext.Provider>
            </Overlay>
        </>
    );
}

InnerPopoverTrigger.propTypes = propTypes;

export const PopoverTrigger = forwardRef((props, ref) => (
    <InnerPopoverTrigger {...props} forwardedRef={ref} />
));

PopoverTrigger.displayName = "PopoverTrigger";
