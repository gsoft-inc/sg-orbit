import { any, elementType, func, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

export const TabPanel = forwardRef(({
    as: ElementType = "div",
    className,
    children,
    ...rest
}, ref) => {
    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tab-panel"
                ),
                className
            )}
            ref={ref}
        >
            {children}
        </ElementType>
    );
});

TabPanel.propTypes = propTypes;
