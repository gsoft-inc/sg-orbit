import { ComponentProps, ForwardedRef, KeyboardEvent, SyntheticEvent, forwardRef, useCallback, useRef, useState } from "react";
import {
    FocusTarget,
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
    isNil,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useKeyboardNavigation,
    useKeyedRovingFocus,
    useMergedRefs,
    useRefState
} from "../../shared";
import { Tab, TabKeyProp } from "./Tab";

import { Box } from "../../box";
import { CollapsedTabs } from "./CollapsedTabs";
import { TabType } from "./useTabsItems";
import { useCollapsibleTabs } from "./useCollapsibleTabs";
import { useTabsContext } from "./TabsContext";

/*
TODO:
    - dynamic elements -> use mutation observer on tablist to recompute tabs on change -> should be ok since the hooks take tabs
        -> make sure the tabs array received does not mutate on every render

    - move "match" to shared
    - fonctionne quand est fluid?!?!
    - improvement, should set an aria-posinset="1" on every tab element
*/

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
    as = DefaultElement,
    autoFocus,
    forwardedRef,
    tabs,
    ...rest
}: InnerTabListProps) {
    const { isCollapsible, isManual, onSelect, orientation, selectedKey } = useTabsContext();

    const [isCollapsedTabsOpen, setIsCollapsedTabsOpen] = useState(false);
    const [collapsedTabsFocusTargetRef, setCollapsedTabsFocusTarget] = useRefState<string>(FocusTarget.first);

    const [focusScope, setFocusRef] = useFocusScope();

    const tabListRef = useMergedRefs(setFocusRef, forwardedRef);
    const collapsedTabsRef = useRef();

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: TabKeyProp });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: selectedKey
    });

    const openCollapsedTabs = useCallback((focusTarget: string) => {
        setCollapsedTabsFocusTarget(focusTarget);
        setIsCollapsedTabsOpen(true);
    }, [setCollapsedTabsFocusTarget, setIsCollapsedTabsOpen]);

    const closeCollapsedTabs = useCallback(() => {
        setIsCollapsedTabsOpen(false);
    }, [setIsCollapsedTabsOpen]);

    const { collapsedTabs, collapsibleTabsRef, visibleTabs } = useCollapsibleTabs(tabListRef, tabs, selectedKey, {
        isDisabled: !isCollapsible || orientation === "vertical"
    });

    // When there are collapsed tabs, only manual activation is supported, until the collapsed tabs selection is improved.
    const canAutoActivate = !isManual && collapsedTabs.length === 0;

    const selectTab = useCallback((event: SyntheticEvent, key: string) => {
        if (!isNil(key)) {
            onSelect(event, key);
        }
    }, [onSelect]);

    const handleTabSelect = useEventCallback((event: SyntheticEvent, key: string) => {
        selectTab(event, key);
    });

    // Using the "canSelect" filter to open the popup. This is a small hack to reuse the "focusManager" and the "useKeyboardNavigation".
    const handleKeyboardPreSelect = useCallback((event: KeyboardEvent, element: HTMLElement, key: Keys) => {
        switch (key) {
            case Keys.arrowLeft: {
                if (element === collapsedTabsRef.current) {
                    // When we hit the collapsed tabs popup trigger, instead of focusing the trigger, open the popup to navigate to the last collapsed tab.
                    openCollapsedTabs(FocusTarget.last);

                    return false;
                }
                break;
            }
            case Keys.arrowRight: {
                if (element === collapsedTabsRef.current) {
                    // When we hit the collapsed tabs popup trigger, instead of focusing the trigger, open the popup to navigate to the first collapsed tab.
                    openCollapsedTabs(FocusTarget.first);

                    return false;
                }
                break;
            }
            case Keys.end: {
                if (element === collapsedTabsRef.current) {
                    // When we hit the collapsed tabs popup trigger, instead of focusing the trigger, open the popup to navigate to the first collapsed tab.
                    openCollapsedTabs(FocusTarget.last);

                    return false;
                }
                break;
            }
        }

        return true;
    }, [openCollapsedTabs]);

    const handleKeyboardSelect = useEventCallback((event: KeyboardEvent, element: HTMLElement) => {
        selectTab(event, element?.getAttribute(TabKeyProp));
    });

    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation], {
        onCanSelect: collapsedTabs.length !== 0 ? handleKeyboardPreSelect : undefined,
        onSelect: canAutoActivate ? handleKeyboardSelect : undefined
    });

    const handleCollapsedTabsOpenChange = useEventCallback((event: SyntheticEvent, isOpen: boolean, { focusTarget }: { focusTarget?: string } = {}) => {
        if (isOpen) {
            openCollapsedTabs(FocusTarget.first);
        } else {
            closeCollapsedTabs();
        }

        if (!isNil(focusTarget)) {
            if (focusTarget !== FocusTarget.last) {
                focusManager.focusTarget(focusTarget);
            } else {
                // The last element is the collapsible tabs trigger, skip it.
                const element = focusScope.elements[focusScope.length - 2];

                focusManager.focusElement(element);
            }
        }
    });

    const handleCollapsedTabsSelect = useEventCallback((event: SyntheticEvent, key: string) => {
        selectTab(event, key);

        // HACK: If the newly selected tab wasn't visible, it requires a re-render so we must wait.
        requestAnimationFrame(() => {
            focusManager.focusTarget(key);
        });
    });

    const popupOverlayId = useId(undefined, "o-ui-collapsed-tabs");

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-orientation": orientation,
                    "aria-owns": isCollapsedTabsOpen ? popupOverlayId : undefined,
                    "aria-setsize": tabs.length,
                    as,
                    className: "o-ui-tab-list",
                    ref: useMergedRefs(tabListRef, collapsibleTabsRef),
                    role: "tablist"
                },
                navigationProps
            )}
        >
            {visibleTabs.map(({
                elementType: ElementType = Tab,
                key,
                panelId,
                props,
                ref,
                tabId
            }, index) =>
                <ElementType
                    {...props}
                    aria-posinset={index + 1}
                    key={key}
                    onSelect={handleTabSelect}
                    ref={ref}
                    tab={{
                        key,
                        panelId,
                        tabId
                    }}
                />
            )}
            {collapsedTabs.length > 0 && (
                <CollapsedTabs
                    autoFocusTarget={collapsedTabsFocusTargetRef.current}
                    initialIndex={visibleTabs.length}
                    onOpenChange={handleCollapsedTabsOpenChange}
                    onSelect={handleCollapsedTabsSelect}
                    open={isCollapsedTabsOpen}
                    overlayProps={{ id: popupOverlayId }}
                    ref={collapsedTabsRef}
                    tabs={collapsedTabs}
                />
            )}
        </Box>
    );
}

export const TabList = forwardRef<any, OmitInternalProps<InnerTabListProps>>((props, ref) => (
    <InnerTabList {...props} forwardedRef={ref} />
));

export type TabListProps = ComponentProps<typeof TabList>;


