import "./Tabs.css";

import { Box } from "../../box/src/Box";
import { TabList } from "./TabList";
import { TabPanel } from "./TabPanel";
import { TabsProvider } from "./TabsContext";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, useChainedEventCallback, useControllableState, useId } from "../../shared";
import { forwardRef, useMemo } from "react";
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
     * Whether or not keyboard navigation changes focus between tabs but doens't activate it. User will have to press `Enter` to active it.
     */
    manual: bool,
    /**
     * Whether the tabs take up the width of the container.
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
     * @ignore
     */
    children: any.isRequired
};

export function InnerTabs(props) {
    const {
        id,
        index,
        defaultIndex,
        onChange,
        manual,
        autoFocus,
        autoFocusDelay,
        fluid,
        orientation = "horizontal",
        className,
        children,
        forwardedRef,
        ...rest
    } = props;

    let [selectedIndex, setSelectedIndex, isControlledIndex] = useControllableState(index, defaultIndex);

    const [tabs, panels] = useTabsBuilder(children, useId(id, id ? undefined : "o-ui-tabs"));

    selectedIndex = useMemo(() => {
        if (isControlledIndex) {
            if (tabs[selectedIndex ?? 0].disabled) {
                throw new Error("The active tab index cannot match a disabled tab.");
            }

            return selectedIndex;
        }

        return isNil(selectedIndex)
            ? tabs.find(x => !x.disabled).index
            : selectedIndex;
    }, [selectedIndex, isControlledIndex, tabs]);

    const handleSelect = useChainedEventCallback(onChange, (event, newIndex) => {
        setSelectedIndex(newIndex);
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
            <TabsProvider
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
                    autoFocusDelay={autoFocusDelay}
                />
                <div
                    {...rest}
                    className="o-ui-tab-panels"
                >
                    {panels.map(panelProps =>
                        <TabPanel {...panelProps} />
                    )}
                </div>
            </TabsProvider>
        </Box>
    );
}

InnerTabs.propTypes = propTypes;

export const Tabs = forwardRef((props, ref) => (
    <InnerTabs {...props} forwardedRef={ref} />
));


