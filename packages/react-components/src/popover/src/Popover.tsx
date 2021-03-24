import "./Popover.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent, useMemo } from "react";
import { CrossButton } from "../../button";
import { Text } from "../../text";
import { forwardRef, mergeProps, useEventCallback, useSlots } from "../../shared";
import { usePopoverTriggerContext } from "./PopoverTriggerContext";

export interface InnerPopoverProps {
    /**
     * Whether or not to hide the close button.
     */
    hideCloseButton?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode | Function
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerPopover({
    hideCloseButton,
    as = "section",
    children,
    forwardedRef,
    ...rest
}: InnerPopoverProps) {
    const { close } = usePopoverTriggerContext();

    const handleCloseButtonClick = useEventCallback((event: SyntheticEvent) => {
        close(event);
    });

    const { heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
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
    }), []));

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

export const Popover = forwardRef<InnerPopoverProps>((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

export type PopoverProps = ComponentProps<typeof Popover>

Popover.displayName = "Popover";
