import { TabsContext } from "./TabsContext";
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

export function InnerTabs({
    as: ElementType = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    // const registerChild = useCallback(() => {

    // }, []);

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tabs"
                ),
                className
            )}
            ref={forwardedRef}
        >
            <TabsContext.Provider
                value={{

                }}
            >
                {children}
            </TabsContext.Provider>
        </ElementType>
    );
}

InnerTabs.propTypes = propTypes;

export const Tabs = forwardRef((props, ref) => (
    <InnerTabs {...props} forwardedRef={ref} />
));
