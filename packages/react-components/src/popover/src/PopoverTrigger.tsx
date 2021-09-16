import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
import { HtmlElements } from "../../html";
import {
    InternalProps,
    OmitInternalProps,
    StyledComponentProps,
    augmentElement,
    isNil,
    mergeProps,
    resolveChildren,
    useMergedRefs
} from "../../shared";
import { Overlay, OverlayArrow, PopupPosition, PopupProps, usePopup } from "../../overlay";
import { PopoverTriggerContext } from "./PopoverTriggerContext";
import { useThemeContext } from "../../theme-provider";

const DefaultElement = "div";

export interface InnerPopoverTriggerProps extends
    InternalProps,
    Omit<PopupProps, "align" | "direction">,
    Omit<StyledComponentProps<typeof DefaultElement>, "position" | "zIndex"> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    containerElement?: HTMLElement;
    /**
     * Whether or not the popover should close on outside interactions.
     */
    dismissable?: boolean;
    /**
     * Position of the popover element related to the trigger.
     */
    position?: PopupPosition;
}

export function InnerPopoverTrigger({
    allowFlip = true,
    allowPreventOverflow = true,
    as = HtmlElements[DefaultElement],
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
    const { themeAccessor } = useThemeContext();

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
                        borderOffset: themeAccessor.getSpace(3),
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
