import { Box } from "../../box";
import { ChevronIcon } from "@orbit-ui/react-components";
import { Text } from "../../text";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
};

export function InnerAccordionHeader({
    // index,
    open,
    as = "button",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Box
            {...rest}
            className={mergeClasses("o-ui-accordion-header", className)}
            type="button"
            as={as}
            ref={forwardedRef}
        >
            <Text className="o-ui-accordion-title">{children}</Text>
            <ChevronIcon
                className={mergeClasses(
                    open ? "o-ui-rotate-270" : "o-ui-rotate-90",
                    "o-ui-accordion-header-icon"
                )}
            />
        </Box>
    );
}

InnerAccordionHeader.propTypes = propTypes;

export const AccordionHeader = forwardRef((props, ref) => (
    <InnerAccordionHeader {...props} forwardedRef={ref} />
));
