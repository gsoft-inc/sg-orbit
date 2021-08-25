import "./Tooltip.css";

import { Children, ComponentProps, FocusEvent, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
import { InternalProps, augmentElement, isNil, mergeProps, resolveChildren, useControllableState, useEventCallback, useId, useMergedRefs } from "../../shared";
import { Overlay, OverlayArrow, isTargetParent, useOverlayLightDismiss, useOverlayPosition, useOverlayTrigger } from "../../overlay";
import { TooltipTriggerContext } from "./TooltipTriggerContext";

const DefaultElement = "div";

export interface InnerTooltipTriggerProps extends InternalProps, ComponentProps<typeof DefaultElement> {
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
     * @param {SyntheticEvent} event - React's original event.
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
     * Whether or not the tooltip element position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * The z-index of the popover element.
     */
    zIndex?: number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    containerElement?: HTMLElement;
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
    allowPreventOverflow = true,
    containerElement,
    zIndex = 10000,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerTooltipTriggerProps) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);

    const updateIsOpen = useCallback((event: SyntheticEvent, newValue: boolean) => {
        if (isOpen !== newValue) {
            setIsOpen(newValue);

            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const { triggerRef, overlayRef: overlayPositionRef, arrowRef } = useOverlayPosition({
        hasArrow: true,
        position: positionProp,
        allowFlip,
        allowPreventOverflow,
        boundaryElement: containerElement
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

    const triggerWithDescribedBy = augmentElement(trigger, {
        "aria-describedby": isOpen ? tooltipId : undefined
    });

    // HACK: a disabled element doesn't fire event, therefore the element is wrapped in a div.
    const triggerElement = !triggerWithDescribedBy.props.disabled ? triggerWithDescribedBy : (
        <div className="o-ui-tooltip-disabled-wrapper">
            {triggerWithDescribedBy}
        </div>
    );

    const triggerMarkup = augmentElement(triggerElement, mergeProps(
        triggerProps,
        {
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

export const TooltipTrigger = forwardRef<any, Omit<InnerTooltipTriggerProps, "forwardedRef">>((props, ref) => (
    <InnerTooltipTrigger {...props} forwardedRef={ref} />
));

export type TooltipTriggerProps = ComponentProps<typeof TooltipTrigger>;

TooltipTrigger.displayName = "TooltipTrigger";
