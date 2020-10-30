import { Text } from "../../text";
import { any, bool, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
    /**
     * The id of the tab controlling the tab panel.
     */
    tabId: string,
    /**
     * Whether or not the tab panel is selected.
     */
    selected: bool,
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
    tabId,
    selected,
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Text
            {...rest}
            className={mergeClasses("o-ui-tab-panel", className)}
            role="tabpanel"
            hidden={!selected}
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
