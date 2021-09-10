import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
import {
    InternalProps,
    OmitInternalProps,
    StyledComponentProps,
    ZindexProp,
    augmentElement,
    isNil,
    mergeProps,
    resolveChildren,
    useMergedRefs
} from "../../shared";
import { Overlay, OverlayArrow, OverlayDefaultElement, PopupPosition, usePopup } from "../../overlay";
import { PopoverTriggerContext } from "./PopoverTriggerContext";
import { useThemeContext } from "../../theme-provider";

export interface InnerPopoverTriggerProps extends InternalProps, Omit<StyledComponentProps<typeof OverlayDefaultElement>, "position" | "zIndex"> {
    /**
     * Whether or not the popover element can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * Whether or not the popover element position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    containerElement?: HTMLElement;
    /**
     * The initial value of `open` when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * Whether or not the popover should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {boolean} isOpen - Indicate if the popover is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Whether or not to show the popover.
     */
    open?: boolean | null;
    /**
     * Position of the popover element related to the trigger.
     */
    position?: PopupPosition;
    /**
     * The z-index of the popover element.
     */
    zIndex?: ZindexProp;
}

export function InnerPopoverTrigger({
    allowFlip = true,
    allowPreventOverflow = true,
    as = OverlayDefaultElement,
    children,
    containerElement,
    defaultOpen,
    dismissable = true,
    forwardedRef,
    id,
    onOpenChange,
    open,
    position: positionProp = "bottom",
    zIndex = 10000,
    ...rest
}: InnerPopoverTriggerProps) {
    const { theme } = useThemeContext();

    const overlayRef = useMergedRefs(forwardedRef);

    const { arrowProps, isOpen, overlayProps, setIsOpen, triggerProps } = usePopup("dialog", {
        allowFlip,
        allowPreventOverflow,
        boundaryElement: containerElement,
        defaultOpen,
        hasArrow: true,
        hideOnEscape: true,
        hideOnLeave: false,
        hideOnOutsideClick: dismissable,
        id,
        onOpenChange,
        open,
        position: positionProp,
        restoreFocus: true,
        trigger: "click"
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
                close,
                isOpen
            }}
        >
            {triggerMarkup}
            <Overlay
                {...mergeProps(
                    rest,
                    {
                        as,
                        // TODO: Maybe we should provide some kind of wrapping on top a theme to have access to 1 based indicees to match the vars.
                        borderOffset: theme.space[2],
                        className: "o-ui-popover-overlay",
                        ref: overlayRef,
                        zIndex
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

export const PopoverTrigger = forwardRef<any, OmitInternalProps<InnerPopoverTriggerProps>>((props, ref) => (
    <InnerPopoverTrigger {...props} forwardedRef={ref} />
));

export type PopoverTriggerProps = ComponentProps<typeof PopoverTrigger>;
