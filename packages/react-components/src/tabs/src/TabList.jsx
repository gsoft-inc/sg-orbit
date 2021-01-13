import "./Tabs.css";

import { Box } from "../../box";
import { Keys, mergeClasses, mergeProps, useAutoFocusChild, useBasicKeyboardNavigation, useFocusManager, useFocusScope, useKeyedRovingFocus } from "../../shared";
import { Tab } from "./Tab";
import { isNumber } from "lodash";
import { useTabsContext } from "./TabsContext";

const NavigationKeyBinding = {
    horizontal: {
        previous: [Keys.left],
        next: [Keys.right],
        first: [Keys.home],
        last: [Keys.end]
    },
    vertical: {
        previous: [Keys.up],
        next: [Keys.down],
        first: [Keys.home],
        last: [Keys.end]
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

    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope, { keyProp: KeyProp });

    useKeyedRovingFocus(focusScope, selectedIndex, { keyProp: KeyProp });

    useAutoFocusChild(focusManager, {
        target: selectedIndex,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationProps = useBasicKeyboardNavigation(focusManager, NavigationKeyBinding[orientation]);

    return (
        <Box
            {...mergeProps(
                rest,
                navigationProps
            )}
            className={mergeClasses("o-ui-tab-list", className)}
            role="tablist"
            aria-orientation={orientation}
            ref={setFocusRef}
        >
            {tabs.map(({
                id,
                key,
                index,
                elementType: ElementType = Tab,
                ref,
                panelId,
                props
            }) =>
                <ElementType
                    {...props}
                    tab={{
                        index,
                        panelId
                    }}
                    id={id}
                    key={key}
                    ref={ref}
                />
            )}
        </Box>
    );
}


