import "./Tabs.css";

import { Text } from "../../text";
import { any, elementType, object, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
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
    panel: { key, tabId, panelId },
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const { selectedKey } = useTabsContext();

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    id: panelId,
                    className: "o-ui-tab-panel",
                    role: "tabpanel",
                    hidden: key !== selectedKey,
                    "aria-labelledby": tabId,
                    as,
                    ref: forwardedRef
                }
            )}
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
