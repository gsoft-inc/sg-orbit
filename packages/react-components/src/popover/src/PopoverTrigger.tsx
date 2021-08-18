import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
import { DomProps, augmentElement, isNil, mergeProps, resolveChildren, useMergedRefs } from "../../shared";
import { Overlay, OverlayArrow, usePopup } from "../../overlay";
import { PopoverTriggerContext } from "./PopoverTriggerContext";

const defaultElement = "div";

export interface InnerPopoverTriggerProps extends DomProps, ComponentProps<typeof defaultElement> {
    /**
     * Whether or not to show the popover.
     */
    open?: boolean | null;
    /**
     * The initial value of `open` when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * Position of the popover element related to the trigger.
     */
    position?: (
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
        | "left-end");
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {boolean} isOpen - Indicate if the popover is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Whether or not the popover should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Whether or not the popover element can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * Whether or not the popover element position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * The z-index of the popover element.
     */
    zIndex?: number;
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    containerElement?: HTMLElement;
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
    forwardedRef: ForwardedRef<any>;
}

export function InnerPopoverTrigger({
    id,
    open,
    defaultOpen,
    position: positionProp = "bottom",
    onOpenChange,
    dismissable = true,
    allowFlip = true,
    allowPreventOverflow = true,
    containerElement,
    zIndex = 10000,
    as = defaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerPopoverTriggerProps) {
    const overlayRef = useMergedRefs(forwardedRef);

    const { isOpen, setIsOpen, triggerProps, overlayProps, arrowProps } = usePopup("dialog", {
        id,
        open,
        defaultOpen,
        onOpenChange,
        hideOnEscape: true,
        hideOnLeave: false,
        hideOnOutsideClick: dismissable,
        restoreFocus: true,
        trigger: "click",
        hasArrow: true,
        position: positionProp,
        allowFlip,
        allowPreventOverflow,
        boundaryElement: containerElement
    });

    const close = useCallback((event: SyntheticEvent) => {
        setIsOpen(event, false);
    }, [setIsOpen]);

    const [trigger, popover] = Children.toArray(resolveChildren(children, { close })) as [ReactElement, ReactElement];

    if (isNil(trigger) || isNil(popover)) {
        throw new Error("A popover trigger must have exactly 2 children.");
    }

    const triggerMarkup = augmentElement(
        trigger,
        // Since we provide a "close" function to the render function we can't provide a "disabled" prop to usePopup. Therefore, we handle disabled manually.
        trigger.props.disabled ? {} : triggerProps
    );

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
                    {
                        borderOffset: "var(--o-ui-global-scale-charlie)",
                        zIndex,
                        className: "o-ui-popover-overlay",
                        as,
                        ref: overlayRef
                    },
                    overlayProps
                )}
            >
                {popover}
                <OverlayArrow {...arrowProps} />
            </Overlay>
        </PopoverTriggerContext.Provider>
    );
}

export const PopoverTrigger = forwardRef<any, Omit<InnerPopoverTriggerProps, "forwardedRef">>((props, ref) => (
    <InnerPopoverTrigger {...props} forwardedRef={ref} />
));

export type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>;

PopoverTrigger.displayName = "PopoverTrigger";
