import { Box } from "../../box";
import { KEYS, mergeClasses, useAutoFocusFirstTabbableElement, useKeyboardNavigation, useKeyedRovingFocus } from "../../shared";
import { TabElement } from "./TabElement";
import { useRef } from "react";
import { useTabsContext } from "./TabsContext";

const NAV_KEY_BINDING = {
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

    const ref = useRef();

    useKeyedRovingFocus(ref, selectedIndex, { keyProp: "data-index" });
    useAutoFocusFirstTabbableElement(ref, autoFocus, { delay: autoFocusDelay });

    const navigationProps = useKeyboardNavigation(NAV_KEY_BINDING[orientation]);

    return (
        <Box
            {...rest}
            {...navigationProps}
            className={mergeClasses("o-ui-tab-list", className)}
            role="tablist"
            aria-orientation={orientation}
            ref={ref}
        >
            {tabs.map(({
                index,
                type: ElementType = TabElement,
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
