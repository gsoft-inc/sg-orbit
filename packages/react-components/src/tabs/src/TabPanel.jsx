import "./Tabs.css";

import { Text } from "../../text";
import { any, elementType, object, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";
import { useTabsContext } from "./TabsContext";

const propTypes = {
    /**
     * Matching panel item.
     */
    panel: object.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerTabPanel({
    panel: { index, tabId },
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const { selectedIndex } = useTabsContext();

    return (
        <Text
            {...rest}
            className={mergeClasses("o-ui-tab-panel", className)}
            role="tabpanel"
            hidden={index !== selectedIndex}
            aria-labelledby={tabId}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Text>
    );
}

InnerTabPanel.propTypes = propTypes;

export const TabPanel = forwardRef((props, ref) => (
    <InnerTabPanel {...props} forwardedRef={ref} />
));

TabPanel.displayName = "TabPanel";
