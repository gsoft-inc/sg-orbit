import "./Tabs.css";

import { Box } from "../../box";
import { Keys, cssModule, mergeProps, useEventCallback, useSlots } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, object, oneOfType, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { useTabsContext } from "./TabsContext";

export const TabKeyProp = "data-o-ui-key";

const propTypes = {
    /**
     * Matching tab item.
     */
    tab: object.isRequired,
    /**
     * Whether or not the tab is selected.
     */
    selected: bool,
    /**
     * Whether or not the tab is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerTab({
    tab: { key, tabId, panelId },
    disabled,
    active,
    focus,
    hover,
    as = "button",
    children,
    forwardedRef,
    ...rest
}) {
    const { selectedKey, onSelect, isManual } = useTabsContext();

    const { icon, text, lozenge } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: "sm",
            className: "o-ui-tab-icon"
        },
        text: {
            className: "o-ui-tab-text"
        },
        lozenge: {
            color: "primary",
            size: "sm",
            className: "o-ui-tab-lozenge"
        }
    }), []));

    const handleClick = useEventCallback(event => {
        event.preventDefault();
        onSelect(event, key);
    });

    const handleFocus = useEventCallback(event => {
        onSelect(event, key);
    });

    const handleKeyDown = useEventCallback(event => {
        switch(event.key) {
            case Keys.enter:
            case Keys.space:
                event.preventDefault();
                onSelect(event, key);
                break;
        }
    });

    // Hotfix for https://bugzilla.mozilla.org/show_bug.cgi?id=1487102
    const handleKeyUp = useEventCallback(event => {
        if (event.key === Keys.space) {
            event.preventDefault();
        }
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: tabId,
                    onClick: handleClick,
                    onFocus: !isManual ? handleFocus : undefined,
                    onKeyDown: isManual ? handleKeyDown : undefined,
                    onKeyUp: isManual ? handleKeyUp : undefined,
                    className: cssModule(
                        "o-ui-tab",
                        icon && "has-icon",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    disabled,
                    role: "tab",
                    [TabKeyProp]: key,
                    "aria-selected": key === selectedKey,
                    "aria-controls": panelId,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {icon}
            {text}
            {lozenge}
        </Box>
    );
}

InnerTab.propTypes = propTypes;

export const Tab = forwardRef((props, ref) => (
    <InnerTab {...props} forwardedRef={ref} />
));

Tab.displayName = "Tab";
