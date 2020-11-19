import { ChevronIcon } from "../../icons";
import { DisclosureArrow } from "./DisclosureArrow";
import { Heading } from "../../heading";
import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { createSizeAdapter, cssModule, mergeClasses, normalizeSize, useSlots } from "../../shared";
import { forwardRef } from "react";
import { useAccordionItemContext } from "./AccordionItemContext";

const propTypes = {
    size: oneOf(["sm"]),
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

const headerSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

export function InnerAccordionHeader({
    size,
    disabled,
    active,
    focus,
    hover,
    as = "h3",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const { icon, text } = useSlots(children, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            className: "o-ui-accordion-icon",
            size
        },
        text: {
            className: "o-ui-accordion-title",
            size: "inherit"
        }
    });

    return (
        <Heading
            {...rest}
            size={headerSize(size)}
            className={mergeClasses(
                cssModule(
                    "o-ui-accordion-header",
                    normalizeSize(size),
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    icon && "has-icon"
                ),
                className
            )}
            disabled={disabled}
            role="button"
            as={as}
            ref={forwardedRef}
        >
            {icon}
            {text}
            <DisclosureArrow />
        </Heading>
    );
}

InnerAccordionHeader.propTypes = propTypes;

export const AccordionHeader = forwardRef((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));
