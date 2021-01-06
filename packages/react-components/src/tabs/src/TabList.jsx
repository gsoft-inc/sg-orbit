import "./Tabs.css";

import { Box } from "../../box";
import { KEYS, mergeClasses, useAutoFocusChild, useBasicKeyboardNavigation, useFocusManager, useFocusableScope, useKeyedRovingFocus } from "../../shared";
import { Tab } from "./Tab";
import { isNumber } from "lodash";
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

const KeyProp = "data-o-ui-index";

export function TabList({
    tabs,
    autoFocus,
    className,
    ...rest
}) {
    const { selectedIndex, orientation } = useTabsContext();

    const containerRef = useRef();

    const domScope = useFocusableScope(containerRef);

    const focusManager = useFocusManager(domScope, { keyProp: KeyProp });

    useKeyedRovingFocus(domScope, selectedIndex, { keyProp: KeyProp });

    useAutoFocusChild(focusManager, {
        target: selectedIndex,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationProps = useBasicKeyboardNavigation(focusManager, NavigationKeyBinding[orientation]);

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


