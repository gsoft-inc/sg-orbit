import "./Popover.css";

import { Box } from "../../box";
import { Content } from "../../placeholders";
import { any, func, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useEventCallback, useSlots } from "../../shared";
import { usePopoverTriggerContext } from "./PopoverTriggerContext";

const propTypes = {
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerPopover({
    as = "section",
    children,
    forwardedRef,
    ...rest
}) {
    const { close } = usePopoverTriggerContext();

    const handleCloseButtonClick = useEventCallback(event => {
        close(event);
    });

    const { header, content, button, "button-group": buttonGroup, "close-button": closeButton } = useSlots(children, {
        _: {
            defaultWrapper: Content
        },
        header: {
            className: "o-ui-popover-header",
            as: "header"
        },
        content: {
            className: "o-ui-popover-content"
        },
        button: {
            className: "o-ui-popover-single-button"
        },
        "button-group": {
            className: "o-ui-popover-button-group"
        },
        "close-button": {
            onClick: handleCloseButtonClick,
            size: "sm",
            className: "o-ui-popover-close-button"
        }
    });

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
            {header}
            {content}
            {button}
            {buttonGroup}
            {closeButton}
        </Box>
    );
}

InnerPopover.propTypes = propTypes;

export const Popover = forwardRef((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

Popover.displayName = "Popover";
