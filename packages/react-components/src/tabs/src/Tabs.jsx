import "./Tabs.css";

import { Box } from "../../box";
import { TabList } from "./TabList";
import { TabPanels } from "./TabPanels";
import { TabsContext } from "./TabsContext";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeProps, useControllableState, useEventCallback, useId } from "../../shared";
import { forwardRef, useMemo } from "react";
import { isNil } from "lodash";
import { useTabsItems } from "./useTabsItems";

const propTypes = {
    /**
     * A controlled selected key.
     */
    selectedKey: string,
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey: string,
    /**
     * Called when the selected tab change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} key - The selected tab key.
     * @returns {void}
     */
    onSelectionChange: func,
    /**
     * Whether or not keyboard navigation changes focus between tabs but doens't activate it.
     */
    manual: bool,
    /**
     * Whether or not the first focusable tab should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the tabs take up the width of the container.
     */
    fluid: bool,
    /**
     * The orientation of the tabs elements.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Tabs title for screen readers.
     */
    "aria-label": string.isRequired,
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerTabs({
    id,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onSelectionChange,
    manual,
    autoFocus,
    fluid,
    orientation = "horizontal",
    "aria-label": ariaLabel,
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, "0");

    const [tabs, panels] = useTabsItems(children, selectedKey, useId(id, id ? null : "o-ui-tabs"));

    const handleSelect = useEventCallback((event, newKey) => {
        if (!isNil(onSelectionChange)) {
            onSelectionChange(event, newKey);
        }

        setSelectedKey(newKey);
    });

    // Ensure the selected key match a valid tab which is not disabled.
    const currentKey = useMemo(() => {
        const selectedTab = tabs.find(x => x.key === selectedKey);

        if (isNil(selectedTab)) {
            return tabs[0].key;
        }

        if (selectedTab.props?.disabled) {
            return tabs.find(x => !x.props?.disabled)?.key ?? tabs[0].key;
        }

        return selectedKey;
    }, [selectedKey, tabs]);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id,
                    className: cssModule(
                        "o-ui-tabs",
                        fluid && "fluid",
                        orientation
                    ),
                    ref: forwardedRef
                }
            )}
        >
            <TabsContext.Provider
                value={{
                    selectedKey: currentKey,
                    onSelect: handleSelect,
                    isManual: manual,
                    orientation
                }}
            >
                <TabList
                    tabs={tabs}
                    autoFocus={autoFocus}
                    aria-label={ariaLabel}
                />
                <TabPanels panels={panels} />
            </TabsContext.Provider>
        </Box>
    );
}

InnerTabs.propTypes = propTypes;

export const Tabs = forwardRef((props, ref) => (
    <InnerTabs {...props} forwardedRef={ref} />
));

Tabs.displayName = "Tabs";
