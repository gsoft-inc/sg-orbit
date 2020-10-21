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

export const Tab = forwardRef(() => {
    return null;
});

Tab.propTypes = propTypes;

////////

export const TabImpl = forwardRef(({
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
                    "o-ui-tab"
                ),
                className
            )}
            ref={ref}
        >
            {children}
        </ElementType>
    );
});
