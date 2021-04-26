import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, ForwardedRef } from "react";
import { Keys, forwardRef, isNumber, mergeProps, useAutoFocusChild, useFocusManager, useFocusScope, useKeyboardNavigation, useKeyedRovingFocus, useMergedRefs } from "../../shared";
import { Tab, TabKeyProp } from "./Tab";
import { TabType } from "./useTabsItems";
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

export interface InnerTabListProps {
    autoFocus?: boolean | number;
    tabs?: TabType[];
    forwardedRef: ForwardedRef<any>;
}

export function InnerTabList({
    tabs,
    autoFocus,
    forwardedRef,
    ...rest
}: InnerTabListProps) {
    const { selectedKey, orientation } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();
    const tabRef = useMergedRefs(setFocusRef, forwardedRef);

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
                    ref: tabRef
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

export const TabList = forwardRef<InnerTabListProps>((props, ref) => (
    <InnerTabList {...props} forwardedRef={ref} />
));

export type TabListProps = ComponentProps<typeof TabList>;



