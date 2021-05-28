import "./Popover.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { Text } from "../../text";
import { forwardRef, mergeProps, useSlots } from "../../shared";

export interface InnerPopoverProps {
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

export function InnerPopover({
    as = "section",
    children,
    forwardedRef,
    ...rest
}: InnerPopoverProps) {
    const { heading, content, footer, button, "button-group": buttonGroup } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        heading: {
            size: "sm",
            as: "h3"
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
            {headerMarkup}
            {content}
            {footerMarkup}
        </Box>
    );
}

export const Popover = forwardRef<InnerPopoverProps>((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

export type PopoverProps = ComponentProps<typeof Popover>;

Popover.displayName = "Popover";
