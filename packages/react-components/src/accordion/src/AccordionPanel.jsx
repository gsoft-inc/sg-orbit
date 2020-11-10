import { Box } from "../../box";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
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
