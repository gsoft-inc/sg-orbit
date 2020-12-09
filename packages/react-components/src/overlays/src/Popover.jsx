import { Box } from "../../box";
import { Children, forwardRef, useRef, useState } from "react";
import { Overlay } from "./Overlay";
import { any, arrayOf, bool, element, func, number, oneOf } from "prop-types";
import { augmentElement, mergeClasses, resolveChildren } from "../../shared";
import { isNil } from "lodash";
import { useOverlay } from "./useOverlay";
import { usePopoverPosition } from "./usePopoverPosition";

/*
SO:
- This component will be deleted and the concrete components will use the hooks directly. This decision has been made to have a better control over the outer wrapper.
*/

const propTypes = {
    /**
     * Whether or not to show the overlay element.
     */
    show: bool,
    /**
     * Position of the overlay element.
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
     * Allow to displace the overlay from its trigger.
     * Ex: `[10, -10]`
     */
    offset: arrayOf(number),
    /**
     * Called when the overlay is hidden.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onHide: func,
    /**
     * Whether or not the overlay should hide on escape keydown.
     */
    hideOnEscape: bool,
    /**
     * Whether or not the overlay should hide on blur.
     */
    hideOnBlur: bool,
    /**
     * When true, disables automatic repositioning of the overlay, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    container: element,
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerPopover({
    show,
    position = "bottom",
    offset,
    onHide,
    hideOnEscape = true,
    hideOnBlur = true,
    pinned,
    container,
    className,
    style,
    children,
    forwardedRef,
    ...rest
}) {
    const overlayRef = useRef(forwardedRef);

    const [triggerElement, setTriggerElement] = useState();
    const [contentElement, setContentElement] = useState();

    const [trigger, content] = Children.toArray(resolveChildren(children));

    if (isNil(trigger) || isNil(content)) {
        throw new Error("A popover must have exactly 2 children.");
    }

    const overlayProps = useOverlay({
        isVisible: show,
        onHide,
        hideOnEscape,
        hideOnBlur,
        overlayRef
    });

    const triggerMarkup = augmentElement(trigger, {
        ref: setTriggerElement
    });

    const contentMarkup = augmentElement(content, {
        ref: setContentElement
    });

    const { popoverPositionStyles, popoverPositionProps } = usePopoverPosition({
        position,
        triggerElement,
        contentElement,
        offset,
        shouldFlip: true,
        shouldUpdatePosition: true,
        pinned
    });

    return (
        <Box
            {...rest}
            {...overlayProps}
            role="presentation"
        >
            {triggerMarkup}
            <Overlay
                {...popoverPositionProps}
                show={show}
                className={mergeClasses(
                    "o-ui-popover",
                    className
                )}
                style={{
                    ...(style ?? {}),
                    ...popoverPositionStyles
                }}
                container={container}
                ref={overlayRef}
            >
                {contentMarkup}
            </Overlay>
        </Box>
    );
}

InnerPopover.propTypes = propTypes;

export const Popover = forwardRef((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

Popover.displayName = "Popover";
