import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InternalProps, OmitInternalProps, cssModule, isNil, mergeProps, useControllableState, useEventCallback, useId } from "../../shared";
import { TabList } from "./TabList";
import { TabPanels } from "./TabPanels";
import { TabsContext } from "./TabsContext";
import { useMemo } from "react";
import { useTabsItems } from "./useTabsItems";

const DefaultElement = "div";

export interface InnerTabsProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * The element's unique identifier.
     * @ignore
     */
    id?: string;
    /**
     * A controlled selected key.
     */
    selectedKey?: string | null;
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey?: string;
    /**
     * Called when the selected tab change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {string} key - The selected tab key.
     * @returns {void}
     */
    onSelectionChange?: (event: SyntheticEvent, key: string) => void;
    /**
     * Whether or not keyboard navigation changes focus between tabs but doens't activate it.
     */
    manual?: boolean;
    /**
     * Whether or not the first focusable tab should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the tabs take up the width of the container.
     */
    fluid?: boolean;
    /**
     * The orientation of the tabs elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Tabs title for screen readers.
     */
    "aria-label": string;
    /**
     * React children.
     */
    children: ReactNode;
}

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
}: InnerTabsProps) {
    const [selectedKey, setSelectedKey] = useControllableState(selectedKeyProp, defaultSelectedKey, "0");

    const [tabs, panels] = useTabsItems(children, useId(id, "o-ui-tabs"));

    const handleSelect = useEventCallback((event: SyntheticEvent, newKey: string) => {
        if (newKey !== selectedKey) {
            setSelectedKey(newKey);

            if (!isNil(onSelectionChange)) {
                onSelectionChange(event, newKey);

            }
        }
    });

    // Ensure the selected key match a valid tab which is not disabled.
    const adjustedKey = useMemo(() => {
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
                    selectedKey: adjustedKey,
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

export const Tabs = forwardRef<any, OmitInternalProps<InnerTabsProps>>((props, ref) => (
    <InnerTabs {...props} forwardedRef={ref} />
));

export type TabsProps = ComponentProps<typeof Tabs>;

Tabs.displayName = "Tabs";
