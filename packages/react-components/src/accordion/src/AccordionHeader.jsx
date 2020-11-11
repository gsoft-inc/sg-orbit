import { Box } from "../../box";
import { ChevronIcon } from "@orbit-ui/react-components";
import { Text } from "../../text";
import { cssModule, mergeClasses, useSlots } from "../../shared";
import { forwardRef } from "react";
import { useAccordionItemContext } from "./AccordionItemContext";

const propTypes = {
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
            className: "o-ui-accordion-title"
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
                    hover && "hover"
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
                    isOpen ? "o-ui-rotate-270" : "o-ui-rotate-90",
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
