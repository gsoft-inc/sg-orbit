import "./Tooltip.css";

import { Children, ComponentProps, ElementType, FocusEvent, ForwardedRef, ReactElement, ReactNode, SyntheticEvent, useCallback } from "react";
import { Overlay, OverlayArrow, isTargetParent, useOverlayLightDismiss, useOverlayPosition, useOverlayTrigger } from "../../overlay";
import { TooltipTriggerContext } from "./TooltipTriggerContext";
import { augmentElement, forwardRef, isNil, mergeProps, resolveChildren, useControllableState, useEventCallback, useId, useMergedRefs } from "../../shared";

interface InnerTooltipTriggerProps {
    /**
    * Whether or not to show the tooltip.
    */
    open?: boolean | null;
    /**
     * The initial value of `open` when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * Position of the tooltip element related to the trigger.
     */
    position?:
    "auto"
    | "auto-start"
    | "auto-end"
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "right"
    | "right-start"
    | "right-end"
    | "left"
    | "left-start"
    | "left-end";

    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the tooltip is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Whether or not the tooltip should be disabled, independent from the trigger.
     */
    disabled?: boolean;
    /**
     * Whether or not the tooltip element can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * z-index of the popover element.
     */
    zIndex?: number;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    containerElement?: HTMLElement;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}


export function parseTooltipTrigger(children: ReactNode) {
    const array = Children.toArray(resolveChildren(children));

    if (array.length !== 2) {
        throw new Error("A tooltip trigger must have exactly 2 children.");
    }

    return array as [ReactElement, ReactElement];
}

export function InnerTooltipTrigger({
    open,
    defaultOpen,
    position: positionProp = "top",
    onOpenChange,
    disabled,
    allowFlip = true,
    containerElement,
    zIndex = 10000,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerTooltipTriggerProps) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);

    const updateIsOpen = useCallback((event: SyntheticEvent, newValue: boolean) => {
        if (isOpen !== newValue) {
            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }

            setIsOpen(newValue);
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const { triggerRef, overlayRef: overlayPositionRef, arrowRef } = useOverlayPosition({
        hasArrow: true,
        position: positionProp,
        allowFlip,
        boundaryElement: containerElement,
        // Not accepting prevent overflow feature because when the tooltip is big enough, it cause arrow render issue sometimes when the position is left or right.
        allowPreventOverflow: false
    });

    const overlayRef = useMergedRefs(overlayPositionRef, forwardedRef);

    const triggerProps = useOverlayTrigger(isOpen, {
        trigger: "hover",
        onShow: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, true);
        }),
        onHide: useEventCallback((event: SyntheticEvent) => {
            // Prevent from closing when the focus goes to an element of the overlay on opening.
            if (!isTargetParent((event as FocusEvent).relatedTarget, overlayRef)) {
                updateIsOpen(event, false);
            }
        }),
        hideOnLeave: true,
        isDisabled: disabled
    });

    const overlayDismissProps = useOverlayLightDismiss(overlayRef, {
        trigger: "hover",
        onHide: useEventCallback((event: SyntheticEvent) => {
            // Ignore events related to the trigger.
            if (!isTargetParent(event.target, triggerRef) && (event as FocusEvent).relatedTarget !== triggerRef.current) {
                updateIsOpen(event, false);
            }
        }),
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: false
    });

    const [trigger, tooltip] = parseTooltipTrigger(children);

    const tooltipId = useId(tooltip.props.id, "o-ui-tooltip");

    const triggerMarkup = augmentElement(trigger, mergeProps(
        triggerProps,
        {
            "aria-describedby": isOpen ? tooltipId : undefined,
            ref: triggerRef
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
                    {
                        show: isOpen,
                        borderOffset: "var(--o-ui-global-scale-charlie)",
                        zIndex,
                        as,
                        ref: overlayRef
                    },
                    overlayDismissProps
                )}
            >
                {tooltipMarkup}
                <OverlayArrow ref={arrowRef} />
            </Overlay>
        </TooltipTriggerContext.Provider>
    );
}

export const TooltipTrigger = forwardRef<InnerTooltipTriggerProps>((props, ref) => (
    <InnerTooltipTrigger {...props} forwardedRef={ref} />
));

export type TooltipTriggerProps = ComponentProps<typeof TooltipTrigger>;

TooltipTrigger.displayName = "TooltipTrigger";
