import { Box } from "../../box";
import { ChevronIcon } from "@orbit-ui/react-components";
import { Text } from "../../text";
import { any, bool, elementType, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, useSlots } from "../../shared";
import { forwardRef } from "react";
import { useAccordionItemContext } from "./AccordionItemContext";

const propTypes = {
    /**
     * Whether or not the tab is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerAccordionHeader({
    disabled,
    active,
    focus,
    hover,
    as = "button",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const { isOpen } = useAccordionItemContext();

    const { icon, text } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            className: "o-ui-accordion-icon"
        },
        text: {
            className: "o-ui-accordion-title",
            size: "xl"
        }
    });

    return (
        <Box
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-accordion-header",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    icon && "has-icon"
                ),
                className
            )}
            disabled={disabled}
            type="button"
            as={as}
            ref={forwardedRef}
        >
            {icon}
            {text}
            <ChevronIcon
                className={mergeClasses(
                    isOpen ? "o-ui-accordion-arrow-down" : "o-ui-accordion-arrow-up",
                    "o-ui-accordion-arrow"
                )}
            />
        </Box>
    );
}

InnerAccordionHeader.propTypes = propTypes;

export const AccordionHeader = forwardRef((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));
