import "./Tooltip.css";

import { Children, forwardRef, useCallback, useState } from "react";
import { Overlay, OverlayArrow, isTargetParent, useOverlayLightDismiss, useOverlayPosition, useOverlayTrigger } from "../../overlay";
import { TooltipTriggerContext } from "./TooltipTriggerContext";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, resolveChildren, useCommittedRef, useControllableState, useEventCallback, useId, useMergedRefs } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Whether or not to show the tooltip.
     */
    open: bool,
    /**
     * The initial value of `open` when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * Position of the tooltip element related to the trigger.
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
     * @param {boolean} isOpen - Indicate if the tooltip is visible.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * Whether or not the tooltip should be disabled, independent from the trigger.
     */
    disabled: bool,
    /**
     * Whether or not the tooltip element can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
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

export function parseTooltipTrigger(children) {
    const array = Children.toArray(resolveChildren(children));

    if (array.length !== 2) {
        throw new Error("A tooltip trigger must have exactly 2 children.");
    }

    return array;
}

export function InnerTooltipTrigger({
    open,
    defaultOpen,
    position : positionProp = "top",
    onOpenChange,
    disabled,
    allowFlip = true,
    containerElement,
    zIndex,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);
    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();
    const [arrowElement, setArrowElement] = useState();

    const overlayRef = useMergedRefs(setOverlayElement, forwardedRef);

    const updateIsOpen = useCallback((event, newValue) => {
        if (isOpen !== newValue) {
            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }

            setIsOpen(newValue);
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const triggerProps = useOverlayTrigger({
        trigger: "hover",
        onToggle: useEventCallback(event => {
            updateIsOpen(event, !isOpen);
        }),
        onShow: useEventCallback(event => {
            updateIsOpen(event, true);
        }),
        onHide: useEventCallback(event => {
            // Prevent from closing when the focus or mouse goes to an element of the overlay.
            if (!isTargetParent(event.relatedTarget, overlayElement)) {
                updateIsOpen(event, false);
            }
        })
    });

    const overlayDismissProps = useOverlayLightDismiss(useCommittedRef(overlayElement), {
        trigger: "hover",
        onHide: useEventCallback(event => {
            // Ignore events related to the trigger.
            // if (event.target !== triggerElement && !isTargetParent(event.target, triggerElement) && event.relatedTarget !== triggerElement) {
            if (!isTargetParent(event.target, triggerElement) && event.relatedTarget !== triggerElement) {
                updateIsOpen(event, false);
            }
        }),
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: false
    });

    const { overlayStyles, overlayProps: overlayPositionProps, arrowStyles } = useOverlayPosition(triggerElement, overlayElement, {
        arrowElement,
        position: positionProp,
        allowFlip,
        boundaryElement: containerElement,
        // Not accepting prevent overflow feature because the tooltip big enough and it cause arrow render issue sometime when the position if left or right.
        allowPreventOverflow: false
    });

    const [trigger, tooltip] = parseTooltipTrigger(children);

    const tooltipId = useId(tooltip.props.id, tooltip.props.id ? undefined : "o-ui-tooltip");

    const triggerMarkup = augmentElement(trigger, mergeProps(
        !disabled ? triggerProps : {},
        {
            "aria-describedby": !disabled && isOpen ? tooltipId : undefined,
            ref: setTriggerElement
        }
    ));

    const tooltipMarkup = augmentElement(tooltip, {
        id: tooltipId
    });

    return (
        <TooltipTriggerContext.Provider
            value={{
                isOpen
            }}
        >
            {triggerMarkup}
            <Overlay
                {...mergeProps(
                    rest,
                    overlayDismissProps,
                    overlayPositionProps,
                    {
                        show: !disabled && isOpen,
                        borderOffset: "var(--o-ui-scale-bravo)",
                        zIndex,
                        className: "o-ui-tooltip-overlay",
                        style: overlayStyles,
                        role: "tooltip",
                        as,
                        ref: overlayRef
                    }
                )}
            >
                {tooltipMarkup}
                <OverlayArrow
                    style={arrowStyles}
                    ref={setArrowElement}
                />
            </Overlay>
        </TooltipTriggerContext.Provider>
    );
}

InnerTooltipTrigger.propTypes = propTypes;

export const TooltipTrigger = forwardRef((props, ref) => (
    <InnerTooltipTrigger {...props} forwardedRef={ref} />
));

TooltipTrigger.displayName = "TooltipTrigger";
