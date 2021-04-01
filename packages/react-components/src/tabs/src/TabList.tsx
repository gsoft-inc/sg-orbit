import "./Tabs.css";

import { Box, BoxProps } from "../../box";
import { Keys, mergeProps, useAutoFocusChild, useFocusManager, useFocusScope, useKeyboardNavigation, useKeyedRovingFocus } from "../../shared";
import { Tab, TabKeyProp } from "./Tab";
import { TabType } from "./useTabsItems";
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


export interface TabListProps extends Omit<BoxProps, "autofocus"> {
    autoFocus?: boolean | number;
    tabs?: TabType[];
}

export function TabList({
    tabs,
    autoFocus,
    ...rest
}: TabListProps) {
    const { selectedKey, orientation } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: TabKeyProp });

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


