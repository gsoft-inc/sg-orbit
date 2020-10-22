import { Box } from "../../box/src/Box";
import { TabsContext } from "./TabsContext";
import { any, elementType, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses } from "../../shared";
import { forwardRef, useContext } from "react";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export const TabPanel = forwardRef(({
    index,
    tabId,
    className,
    children,
    ...rest
}, ref) => {
    const { selectedIndex } = useContext(TabsContext);

    return (
        <Box
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tab-panel"
                ),
                className
            )}
            role="tabpanel"
            tabIndex="0"
            hidden={index !== selectedIndex}
            aria-labelledby={tabId}
            ref={ref}
        >
            {children}
        </Box>
    );
});

TabPanel.propTypes = propTypes;
