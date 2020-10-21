import { TabsContext } from "./TabsContext";
import { any, elementType, func, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, useEventCallback, useId } from "../../shared";
import { forwardRef, useContext } from "react";

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
    index,
    panelId,
    as: ElementType,
    className,
    children,
    ...rest
}, ref) => {
    const { selectedIndex, setSelectedIndex } = useContext(TabsContext);

    const handleClick = useEventCallback(() => {
        setSelectedIndex(index);
    });

    return (
        <ElementType
            {...rest}
            as="button"
            onClick={handleClick}
            className={mergeClasses(
                cssModule(
                    "o-ui-tab"
                ),
                className
            )}
            role="tab"
            aria-selected={index === selectedIndex}
            aria-controls={panelId}
            ref={ref}
        >
            {children}
        </ElementType>
    );
});
