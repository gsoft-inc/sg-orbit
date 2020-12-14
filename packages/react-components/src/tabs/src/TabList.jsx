import "./Tabs.css";

import { Box } from "../../box";
import { KEYS, mergeClasses, useAutoFocusFirstTabbableElement, useKeyboardNavigation, useKeyedRovingFocus } from "../../shared";
import { Tab } from "./Tab";
import { useRef } from "react";
import { useTabsContext } from "./TabsContext";

const NavigationKeyBinding = {
    horizontal: {
        previous: [KEYS.left],
        next: [KEYS.right],
        first: [KEYS.home],
        last: [KEYS.end]
    },
    vertical: {
        previous: [KEYS.up],
        next: [KEYS.down],
        first: [KEYS.home],
        last: [KEYS.end]
    }
};

export function TabList({
    tabs,
    autoFocus,
    autoFocusDelay,
    className,
    ...rest
}) {
    const { selectedIndex, orientation } = useTabsContext();

    const containerRef = useRef();

    useKeyedRovingFocus({ rootRef: containerRef, currentKey: selectedIndex, keyProp: "data-index" });
    useAutoFocusFirstTabbableElement({ rootRef: containerRef, isDisabled: !autoFocus, delay: autoFocusDelay });

    const navigationProps = useKeyboardNavigation(NavigationKeyBinding[orientation]);

    return (
        <Box
            {...rest}
            {...navigationProps}
            className={mergeClasses("o-ui-tab-list", className)}
            role="tablist"
            aria-orientation={orientation}
            ref={containerRef}
        >
            {tabs.map(({
                index,
                type: ElementType = Tab,
                ...tabProps
            }) =>
                <ElementType
                    {...tabProps}
                    index={index}
                    selected={selectedIndex === index}
                />
            )}
        </Box>
    );
}

TabList.displayName = "TabList";
