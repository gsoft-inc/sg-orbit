import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, cssModule, isNil, mergeProps, useControllableState, useEventCallback, useId } from "../../shared";
import { TabList } from "./TabList";
import { TabPanels } from "./TabPanels";
import { TabsContext } from "./TabsContext";
import { useMemo } from "react";
import { useTabsItems } from "./useTabsItems";

const DefaultElement = "div";

export interface InnerTabsProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * Tabs title for screen readers.
     */
    "aria-label": string;
    /**
     * Whether or not the first focusable tab should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey?: string;
    /**
     * Whether or not the tabs take up the width of the container.
     */
    fluid?: boolean;
    /**
     * The element's unique identifier.
     * @ignore
     */
    id?: string;
    /**
     * Whether or not keyboard navigation changes focus between tabs but doens't activate it.
     */
    manual?: boolean;
    /**
     * Called when the selected tab change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {string} key - The selected tab key.
     * @returns {void}
     */
    onSelectionChange?: (event: SyntheticEvent, key: string) => void;
    /**
     * The orientation of the tabs elements.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * A controlled selected key.
     */
    selectedKey?: string | null;
}

export function InnerTabs({
    "aria-label": ariaLabel,
    autoFocus,
    children,
    defaultSelectedKey,
    fluid,
    forwardedRef,
    id,
    manual,
    onSelectionChange,
    orientation = "horizontal",
    selectedKey: selectedKeyProp,
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
                    className: cssModule(
                        "o-ui-tabs",
                        fluid && "fluid",
                        orientation
                    ),
                    id,
                    ref: forwardedRef
                }
            )}
        >
            <TabsContext.Provider
                value={{
                    isManual: manual,
                    onSelect: handleSelect,
                    orientation,
                    selectedKey: adjustedKey
                }}
            >
                <TabList
                    aria-label={ariaLabel}
                    autoFocus={autoFocus}
                    tabs={tabs}
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
