import "./Accordion.css";

import { Box } from "../../box";
import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses, omitProps } from "../../shared";

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

export function InnerAccordionPanel(props) {
    const {
        as = "div",
        className,
        children,
        forwardedRef,
        ...rest
    } = omitProps(props, ["panel"]);

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

AccordionPanel.displayName = "AccordionPanel";
