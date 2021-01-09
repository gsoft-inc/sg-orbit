import "./Tabs.css";

import { Box } from "../../box";
import { TabList } from "./TabList";
import { TabPanels } from "./TabPanels";
import { TabsContext } from "./TabsContext";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, useControllableState, useEventCallback, useId } from "../../shared";
import { forwardRef, useLayoutEffect } from "react";
import { isNil } from "lodash";
import { useTabsBuilder } from "./useTabsBuilder";

const propTypes = {
    /**
     * The index of the active tab.
     */
    index: number,
    /**
     * The index of the initially active tab.
     */
    defaultIndex: number,
    /**
     * Called when the active tab change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {number} index - The newly active tab index.
     * @returns {void}
     */
    onChange: func,
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
    index,
    defaultIndex,
    onChange,
    manual,
    autoFocus,
    fluid,
    orientation = "horizontal",
    "aria-label": ariaLabel,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const [selectedIndex, setSelectedIndex, isControlledIndex] = useControllableState(index, defaultIndex, 0);

    const [tabs, panels] = useTabsBuilder(children, selectedIndex, useId(id, id ? undefined : "o-ui-tabs"));

    // Give an heads up to the consumer if he doesn't manage correctly the selected tab index & the disabled state.
    if (isControlledIndex) {
        if (isNil(selectedIndex)) {
            throw new Error("The selected tab index cannot be null.");
        }

        if (tabs[selectedIndex].disabled) {
            throw new Error("The selected tab index cannot match a disabled tab.");
        }
    }

    // When uncontrolled, ensure the initial selected tab is not a disabled one.
    useLayoutEffect(() => {
        if (tabs[selectedIndex]?.props?.disabled) {
            setSelectedIndex(tabs.find(x => !x.props?.disabled)?.index ?? 0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = useEventCallback((event, newIndex) => {
        setSelectedIndex(newIndex);

        if (!isNil(onChange)) {
            onChange(event, newIndex);
        }
    });

    return (
        <Box
            {...rest}
            id={id}
            className={mergeClasses(
                cssModule(
                    "o-ui-tabs",
                    fluid && "fluid",
                    orientation
                ),
                className
            )}
            ref={forwardedRef}
        >
            <TabsContext.Provider
                value={{
                    selectedIndex,
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
