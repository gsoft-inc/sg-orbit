import { ComponentProps, ForwardedRef, KeyboardEvent, RefObject, SyntheticEvent, forwardRef, useCallback, useState } from "react";
import { Div, HtmlButton } from "../../html";
import {
    FocusScopeContext,
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
import { Overlay, OverlayProps, useOverlayPosition, useOverlayTrigger, usePopupAriaProps, usePopupLightDismiss } from "../../overlay";
import { Tab, TabKeyProp } from "./Tab";

import { Box } from "../../box";
import { TabType } from "./useTabsItems";
import { useCollapsibleTabs } from "./useCollapsibleTabs";
import { useTabsContext } from "./TabsContext";

const TabGap = 8;
const PopoverTriggerWidth = 3;

interface TabListPopoverProps extends Omit<StyledComponentProps<"button">, "onSelect"> {
    autoFocusTarget: string;
    containerElement: HTMLElement;
    getTabPosition: (tabIndex: number) => number;
    onClose: (event: SyntheticEvent, options?: { focusTarget?: string }) => void;
    onOpen: (event: SyntheticEvent) => void;
    onSelect: (event: SyntheticEvent, key: string) => void;
    open: boolean;
    overlayProps?: Partial<OverlayProps>;
    setSize: number;
    tabs: TabType[];
}

const TabListPopover = forwardRef(({
    autoFocusTarget,
    containerElement,
    getTabPosition,
    onClose,
    onOpen,
    onSelect,
    open: openProp,
    setSize,
    tabs,
    overlayProps: { id: overlayId, ...overlayProps } = {},
    ...rest
}: TabListPopoverProps,
ref) => {
    const { selectedKey } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    const triggerProps = useOverlayTrigger(openProp, {
        hideOnLeave: false,
        onHide: useEventCallback((event: SyntheticEvent) => {
            onClose(event, { focusTarget: selectedKey });
        }),
        onShow: useEventCallback((event: SyntheticEvent) => {
            onOpen(event);
        })
    });

    const { overlayRef: overlayPositionRef, triggerRef: overlayPositionTriggerRef } = useOverlayPosition({
        allowFlip: true,
        allowPreventOverflow: true,
        position: "bottom-end"
    });

    const { overlayProps: overlayAriaProps, triggerProps: triggerAriaProps } = usePopupAriaProps(openProp, "dialog", { id: overlayId });

    const triggerRef = useMergedRefs(overlayPositionTriggerRef, ref);

    const overlayDismissProps = usePopupLightDismiss(triggerRef as RefObject<HTMLElement>, focusScope, {
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: false,
        onHide: useEventCallback((event: SyntheticEvent) => {
            onClose(event, { focusTarget: event.type !== "blur" ? selectedKey : undefined });
        })
    });

    useAutoFocusChild(focusManager, {
        isDisabled: !openProp,
        target: autoFocusTarget
    });

    const handleTabSelect = useEventCallback((event: SyntheticEvent, key: string) => {
        onSelect(event, key);
        onClose(event);
    });

    // Not using role="dialog" on the overlay because the screen reader will anounce the dialog and this is not what we want since the
    // arrows navigation should be seemless for a screen reader user which is not aware of the existence of a popup.
    return (
        <>
            <HtmlButton
                {...mergeProps(
                    rest,
                    {
                        "aria-hidden": true,
                        className: "o-ui-tab-list-popover-trigger",
                        ref: triggerRef,
                        tabIndex: -1,
                        type: "button" as const,
                        width: `${PopoverTriggerWidth}rem`
                    },
                    triggerProps,
                    triggerAriaProps
                )}
            >
                +{tabs.length}
            </HtmlButton>
            <Overlay
                containerElement={containerElement}
                ref={overlayPositionRef}
                show={openProp}
                zIndex={1000}
            >
                <Div
                    {...mergeProps(
                        overlayProps,
                        {
                            className: "o-ui-tab-list-popover",
                            ref: setFocusRef
                        },
                        overlayDismissProps,
                        overlayAriaProps
                    )}
                >
                    {tabs.map(({
                        elementType: ElementType = Tab,
                        key,
                        panelId,
                        props,
                        ref: tabRef,
                        tabId
                    }, index) =>
                        <ElementType
                            {...props}
                            aria-posinset={getTabPosition(index)}
                            aria-setsize={setSize}
                            key={key}
                            onSelect={handleTabSelect}
                            ref={tabRef}
                            tab={{
                                key,
                                panelId,
                                tabId
                            }}
                        />
                    )}
                </Div>
            </Overlay>
        </>
    );
});

const DefaultElement = "div";

export interface InnerTabListProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    autoFocus?: boolean | number;
    forwardedRef: ForwardedRef<any>;
    tabs?: TabType[];
}

const NonCollapsibleNavigationKeyBinding = {
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

export function InnerTabList({
    as = DefaultElement,
    autoFocus,
    forwardedRef,
    tabs,
    ...rest
}: InnerTabListProps) {
    const { isCollapsible, isManual, onSelect, orientation, selectedKey } = useTabsContext();

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverAutoFocusTargetRef, setPopoverAutoFocusTarget] = useRefState(selectedKey);

    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    const openPopover = useCallback(() => {
        setIsPopoverOpen(true);
    }, []);

    const closePopover = useCallback(() => {
        setIsPopoverOpen(false);
    }, []);

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: TabKeyProp });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: selectedKey
    });

    const { collapsedTabs, collapsibleTabsRef, hiddenTabs, visibleTabs } = useCollapsibleTabs(tabs, selectedKey, {
        gap: TabGap,
        isDisabled: !isCollapsible || orientation === "vertical",
        popoverTriggerWidth: PopoverTriggerWidth
    });

    const hasCollapsedTabs = collapsedTabs.length > 0;

    const tabListRef = useMergedRefs(setFocusRef, collapsibleTabsRef, forwardedRef);

    const selectTab = useCallback((event: SyntheticEvent, key: string) => {
        if (!isNil(key)) {
            onSelect(event, key);
        }
    }, [onSelect]);

    const handleTabSelect = useEventCallback((event: SyntheticEvent, key: string) => {
        selectTab(event, key);
    });

    const handleAutoActivationSelect = useEventCallback((event: KeyboardEvent, element: HTMLElement) => {
        selectTab(event, element?.getAttribute(TabKeyProp));
    });

    const nonCollapsibleNavigationProps = useKeyboardNavigation(focusManager, NonCollapsibleNavigationKeyBinding[orientation], {
        onSelect: !isManual ? handleAutoActivationSelect : undefined
    });

    const collapsibleNavigationProps = {
        onKeyDown:  useEventCallback((event: KeyboardEvent) => {
            switch (event.key) {
                case Keys.arrowDown: {
                    if (!isPopoverOpen) {
                        break;
                    }
                }
                // eslint-disable-next-line no-fallthrough
                case Keys.arrowRight: {
                    event.preventDefault();

                    const activeIndex = focusManager.getActiveElementIndex({ includeChildScopes: true });

                    // Open the popover when the next tab is collapsed.
                    if (activeIndex === visibleTabs.length - 1) {
                        setPopoverAutoFocusTarget(collapsedTabs[0].key);
                        openPopover();
                    } else {
                        const nextElement = focusManager.focusNext({ includeChildScopes: true });

                        if (!isManual) {
                            const tabKey = nextElement?.getAttribute(TabKeyProp);

                            if (visibleTabs.some(x => x.key === tabKey)) {
                                selectTab(event, tabKey);
                            }
                        }
                    }

                    break;
                }
                case Keys.arrowUp: {
                    if (!isPopoverOpen) {
                        break;
                    }
                }
                // eslint-disable-next-line no-fallthrough
                case Keys.arrowLeft: {
                    event.preventDefault();

                    const activeIndex = focusManager.getActiveElementIndex({ includeChildScopes: true });

                    // Open the popover when the previous tab is collapsed.
                    if (activeIndex === 0) {
                        setPopoverAutoFocusTarget(collapsedTabs[collapsedTabs.length - 1].key);
                        openPopover();
                    } else {
                        const previousElement = focusManager.focusPrevious({ includeChildScopes: true });

                        if (!isManual) {
                            const tabKey = previousElement?.getAttribute(TabKeyProp);

                            if (visibleTabs.some(x => x.key === tabKey)) {
                                selectTab(event, tabKey);
                            }
                        }
                    }

                    break;
                }
                case Keys.home: {
                    event.preventDefault();

                    const firstElement = focusManager.focusFirst({ includeChildScopes: true });

                    if (!isManual) {
                        const tabKey = firstElement?.getAttribute(TabKeyProp);

                        if (visibleTabs.some(x => x.key === tabKey)) {
                            selectTab(event, tabKey);
                        }
                    }

                    break;
                }
                case Keys.end: {
                    event.preventDefault();

                    setPopoverAutoFocusTarget(collapsedTabs[collapsedTabs.length - 1].key);
                    openPopover();

                    break;
                }
            }
        })
    };

    const navigationProps = hasCollapsedTabs
        ? collapsibleNavigationProps
        : nonCollapsibleNavigationProps;

    const handlePopoverTabSelect = useEventCallback((event: SyntheticEvent, key: string) => {
        selectTab(event, key);

        // HACK: If the newly selected tab wasn't visible, it requires a re-render so we must wait.
        requestAnimationFrame(() => {
            focusManager.focusTarget(key);
        });
    });

    const handlePopoverOpen = useEventCallback(() => {
        openPopover();
    });

    const handlePopoverClose = useEventCallback((event: SyntheticEvent, { focusTarget }: { focusTarget?: string } = {}) => {
        closePopover();

        if (!isNil(focusTarget)) {
            focusManager.focusTarget(focusTarget);
        }
    });

    const popoverId = useId(undefined, "o-ui-tab-list-popover");

    const getTabPosition = useCallback((tabIndex: number, startingPosition = 0) => {
        return startingPosition + tabIndex + 1;
    }, []);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-orientation": orientation,
                    "aria-owns": isPopoverOpen ? popoverId : undefined,
                    as,
                    className: "o-ui-tab-list",
                    ref: tabListRef,
                    role: "tablist"
                },
                navigationProps
            )}
        >
            <FocusScopeContext.Provider value={{ scope: focusScope }}>
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
                        aria-posinset={hasCollapsedTabs ? getTabPosition(index) : undefined}
                        aria-setsize={hasCollapsedTabs ? tabs.length : undefined}
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
                {hasCollapsedTabs && (
                    <TabListPopover
                        autoFocusTarget={popoverAutoFocusTargetRef.current}
                        containerElement={tabListRef.current}
                        getTabPosition={(tabIndex: number) => getTabPosition(tabIndex, visibleTabs.length)}
                        onClose={handlePopoverClose}
                        onOpen={handlePopoverOpen}
                        onSelect={handlePopoverTabSelect}
                        open={isPopoverOpen}
                        overlayProps={{ id: popoverId }}
                        setSize={tabs.length}
                        tabs={collapsedTabs}
                    />
                )}
                {/* Rendering hidden tabs to allow the useCollapsibleTabs hook to calculate the actual size of all the tabs and divide them into visible/collapsed buckets. */}
                <Div aria-hidden="true" className="o-ui-tab-list-hidden-tabs">
                    {hiddenTabs.map(({
                        elementType: ElementType = Tab,
                        key,
                        // HACK: removing data-testid prop otherwise the test id will be rendered on the hidden element which will break the Jest tests.
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        props: { "data-testid": testId, ...props } = {}
                    }) =>
                        <ElementType
                            {...props}
                            className="o-ui-tab-list-hidden-tab"
                            data-o-ui-type="hidden-tab"
                            disabled
                            key={key}
                            role="none"
                            tab={{
                                key: undefined,
                                panelId: undefined,
                                tabId: undefined
                            }}
                        />
                    )}
                </Div>
            </FocusScopeContext.Provider>
        </Box>
    );
}

/**
 * [Documentation](https://orbit.sharegate.design/?path=/docs/tabs--default-story)
*/
export const TabList = forwardRef<any, OmitInternalProps<InnerTabListProps>>((props, ref) => (
    <InnerTabList {...props} forwardedRef={ref} />
));

export type TabListProps = ComponentProps<typeof TabList>;
