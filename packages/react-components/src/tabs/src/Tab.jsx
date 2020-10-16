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

////////

export const TabPlaceholder = forwardRef(() => {
    return null;
});

TabPlaceholder.propTypes = propTypes;

TabPlaceholder.getCollectionNode = props => {
    return {
        type: "tab",
        props
    };
};

////////

export const Tab = forwardRef(({
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
