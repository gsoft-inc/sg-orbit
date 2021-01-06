import "./Tabs.css";

import { Box } from "../../box";
import { KEYS, mergeClasses, useAutoFocusChild, useBasicKeyboardNavigation, useDomScope, useFocusManager, useKeyedRovingFocus, useMergedRefs } from "../../shared";
import { Tab } from "./Tab";
import { isNumber } from "lodash";
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
    className,
    ...rest
}) {
    const { selectedIndex, orientation } = useTabsContext();

    const [domScope, setDomScope] = useDomScope();

    const containerRef = useMergedRefs(setDomScope);

    const focusManager = useFocusManager(domScope, { keyProp: "data-o-ui-index" });

    useKeyedRovingFocus(containerRef, selectedIndex, { keyProp: "data-o-ui-index" });

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


