import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { HtmlElements } from "../../html";
import {
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useKeyboardNavigation,
    useKeyedRovingFocus,
    useMergedRefs
} from "../../shared";
import { Tab, TabKeyProp } from "./Tab";
import { TabType } from "./useTabsItems";
import { useTabsContext } from "./TabsContext";

const NavigationKeyBinding = {
    horizontal: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowRight],
        previous: [Keys.arrowLeft]
    },
    vertical: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowDown],
        previous: [Keys.arrowUp]
    }
};

const DefaultElement = "div";

export interface InnerTabListProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    autoFocus?: boolean | number;
    forwardedRef: ForwardedRef<any>;
    tabs?: TabType[];
}

export function InnerTabList({
    as = HtmlElements[DefaultElement],
    autoFocus,
    forwardedRef,
    tabs,
    ...rest
}: InnerTabListProps) {
    const { isManual, onSelect, orientation, selectedKey } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();
    const tabRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: TabKeyProp });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: selectedKey
    });

    const handleKeyboardSelect = useEventCallback((event, element) => {
        onSelect(event, element?.getAttribute(TabKeyProp));
    });

    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation], {
        onSelect: !isManual ? handleKeyboardSelect : undefined
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-orientation": orientation,
                    as,
                    className: "o-ui-tab-list",
                    ref: tabRef,
                    role: "tablist"
                },
                navigationProps
            )}
        >
            {tabs.map(({
                elementType: ElementType = Tab,
                key,
                panelId,
                props,
                ref,
                tabId
            }) =>
                <ElementType
                    {...props}
                    key={key}
                    ref={ref}
                    tab={{
                        key,
                        panelId,
                        tabId
                    }}
                />
            )}
        </Box>
    );
}

export const TabList = forwardRef<any, OmitInternalProps<InnerTabListProps>>((props, ref) => (
    <InnerTabList {...props} forwardedRef={ref} />
));

export type TabListProps = ComponentProps<typeof TabList>;



