import "./Tabs.css";

import { Box } from "../../box";
import { KeyProp, Tab } from "./Tab";
import { Keys, mergeProps, useAutoFocusChild, useFocusManager, useFocusScope, useKeyboardNavigation, useKeyedRovingFocus } from "../../shared";
import { isNumber } from "lodash";
import { useTabsContext } from "./TabsContext";

const NavigationKeyBinding = {
    horizontal: {
        previous: [Keys.arrowLeft],
        next: [Keys.arrowRight],
        first: [Keys.home],
        last: [Keys.end]
    },
    vertical: {
        previous: [Keys.arrowUp],
        next: [Keys.arrowDown],
        first: [Keys.home],
        last: [Keys.end]
    }
};

export function TabList({
    tabs,
    autoFocus,
    ...rest
}) {
    const { selectedKey, orientation } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope, { keyProp: KeyProp });

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: KeyProp });

    useAutoFocusChild(focusManager, {
        target: selectedKey,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation]);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-tab-list",
                    role: "tablist",
                    "aria-orientation": orientation,
                    ref: setFocusRef
                },
                navigationProps
            )}
        >
            {tabs.map(({
                key,
                elementType: ElementType = Tab,
                ref,
                tabId,
                panelId,
                props
            }) =>
                <ElementType
                    {...props}
                    tab={{
                        key,
                        tabId,
                        panelId
                    }}
                    key={key}
                    ref={ref}
                />
            )}
        </Box>
    );
}


