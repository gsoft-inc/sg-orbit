import "./Popover.css";

import { Box } from "../../box";
import { CrossButton } from "../../button";
import { Text } from "../../text";
import { any, bool, elementType, func, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useEventCallback, useSlots } from "../../shared";
import { usePopoverTriggerContext } from "./PopoverTriggerContext";

const propTypes = {
    /**
     * Whether or not to hide the close button.
     */
    hideCloseButton: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerPopover({
    hideCloseButton,
    as = "section",
    children,
    forwardedRef,
    ...rest
}) {
    const { close } = usePopoverTriggerContext();

    const handleCloseButtonClick = useEventCallback(event => {
        close(event);
    });

    const { heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, {
        _: {
            required: ["heading", "content"]
        },
        heading: {
            size: "sm",
            as: "h1"
        },
        content: {
            className: "o-ui-popover-content",
            role: "dialog",
            as: Text
        },
        footer: {
            className: "o-ui-popover-footer-text",
            as: Text
        },
        button: {
            className: "o-ui-popover-button",
            size: "sm"
        },
        "button-group": {
            className: "o-ui-popover-button-group",
            size: "sm"
        }
    });

    const closeButtonMarkup = !hideCloseButton && (
        <CrossButton
        // Used to prevent autoFocusing the close button.
            id="o-ui-popover-close-button"
            onClick={handleCloseButtonClick}
            condensed
            size="xs"
            className="o-ui-popover-close-button"
            aria-label="Close"
        />
    );

    const headerMarkup = heading && (
        <header className="o-ui-popover-header">
            {heading}
        </header>
    );

    const footerMarkup = (button || buttonGroup || footer) && (
        <footer className="o-ui-popover-footer">
            {footer}
            {button}
            {buttonGroup}
        </footer>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-popover",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {closeButtonMarkup}
            {headerMarkup}
            {content}
            {footerMarkup}
        </Box>
    );
}

InnerPopover.propTypes = propTypes;

export const Popover = forwardRef((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

Popover.displayName = "Popover";
