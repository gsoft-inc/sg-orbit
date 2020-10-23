import { Box } from "../../box/src/Box";
import { KEYS, mergeClasses, useAutoFocusFirstTabbableElement, useKeyboardNavigation, useRovingFocus } from "../../shared";
import { TabImpl as Tab } from "./Tab";
import { TabsContext } from "./TabsContext";
import { useContext, useRef } from "react";

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
    const { selectedIndex, orientation } = useContext(TabsContext);

    const ref = useRef();

    useRovingFocus(ref, selectedIndex.toString(), { keyProp: "data-index" });
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
            {tabs.map(props =>
                <Tab {...props} />
            )}
        </Box>
    );
}
