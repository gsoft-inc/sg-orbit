import { Box } from "../../box";
import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerAccordionPanel({
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Box
            {...rest}
            className={mergeClasses("o-ui-accordion-panel", className)}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Box>
    );
}

InnerAccordionPanel.propTypes = propTypes;

export const AccordionPanel = forwardRef((props, ref) => (
    <InnerAccordionPanel {...props} forwardedRef={ref} />
));
