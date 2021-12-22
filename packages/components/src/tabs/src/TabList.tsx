import { ComponentProps, ForwardedRef, KeyboardEvent, RefObject, SyntheticEvent, forwardRef, useCallback, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import { Div, HtmlButton } from "../../html";
import {
    FocusTarget,
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
    arrayify,
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
    useRefState,
    useResizeObserver
} from "../../shared";
import { Overlay, OverlayProps, useOverlayPosition, useOverlayTrigger, usePopupAriaProps, usePopupLightDismiss } from "../../overlay";
import { Tab, TabKeyProp } from "./Tab";

import { Box } from "../../box";
import { TabType } from "./useTabsItems";
import { match } from "./match";
import { useDebouncedCallback } from "use-debounce";
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

/*
TODO:
    - dynamic elements -> use mutation observer on tablist to recompute tabs on change -> should be ok since the hooks take tabs
        -> make sure the tabs array received does not mutate on every render

    - move "match" to shared
    - fonctionne quand est fluid?!?!
    - improvement, should set an aria-posinset="1" on every tab element
*/

const CollapsedTabsTriggerWidth = 50;

type ResizingState = "expanding" | "collapsing" | "none";

type ResizeActionType = "initialize" | "collapse" | "incrementCollapsedCount" | "completeCollapse" | "expand" | "continueExpandAfterRerender";

interface ResizeAction<T = number> {
    payload?: T;
    type: ResizeActionType;
}

export interface CollapsibleTabsState {
    collapsedCount: number;
    resizingState: ResizingState;
}

function collapsibleTabsReducer(state: CollapsibleTabsState, action: ResizeAction) {
    return match<ResizeActionType, CollapsibleTabsState>(action.type, {
        "collapse": () => ({
            collapsedCount: state.collapsedCount,
            resizingState: "collapsing"
        }),
        "completeCollapse": () => ({
            collapsedCount: state.collapsedCount,
            resizingState: "none"
        }),
        // The strategy to expand is to render all the tabs then remove those which doesn't fit.
        // This means that it requires 2 re-render to complete.
        // The first one will rednder all the tabs to their max-content witdh by setting the collapsed count to 0.
        // The second one (which is this one) will collapse the overflowing tabs, starting from the end.
        "continueExpandAfterRerender": () => ({
            collapsedCount: 0,
            resizingState: "collapsing"
        }),
        "expand": () => ({
            collapsedCount: 0,
            resizingState: "expanding"
        }),
        "incrementCollapsedCount": () => ({
            collapsedCount: state.collapsedCount + (action.payload as number),
            resizingState: "none"
        }),
        "initialize": () => ({
            collapsedCount: 0,
            resizingState: "collapsing"
        })
    });
}

interface UseCollapsibleTabsOptions {
    isDisabled?: boolean;
}

function useCollapsibleTabs(tabListRef: RefObject<HTMLDivElement>, tabs: TabType[], selectedKey: string, { isDisabled }: UseCollapsibleTabsOptions = {}) {
    const [{ collapsedCount, resizingState }, dispatch] = useReducer(collapsibleTabsReducer, {
        collapsedCount: 0,
        resizingState: "none"
    });

    const [tabListWidthRef, setTabListWidth] = useRefState();

    useLayoutEffect(() => {
        match(resizingState, {
            "collapsing": () => {
                const tabListElement = tabListRef.current;

                const tabListRect = tabListElement.getBoundingClientRect();
                const tabListThreshold = tabListRect.right - CollapsedTabsTriggerWidth;

                const tabElements = tabListElement.querySelectorAll("[role=\"tab\"]");

                const visibleCount = tabElements.length;

                if (visibleCount > 1) {
                    let toCollapse = 0;

                    do {
                        const element = tabElements[tabElements.length - (1 + toCollapse)];
                        const elementRect = element.getBoundingClientRect();

                        // Considered as overflowing if the current tab end after the width of the tab list element.
                        if (tabListThreshold < elementRect.right) {
                            toCollapse += 1;
                        } else {
                            break;
                        }
                    } while (visibleCount - toCollapse > 1);

                    if (toCollapse > 0) {
                        dispatch({ payload: toCollapse, type: "incrementCollapsedCount" });
                    }
                }

                dispatch({ type: "completeCollapse" });
            },
            "expanding": () => {
                dispatch({ type: "continueExpandAfterRerender" });
            },
            "none": () => {
                // nothing to do...
            }
        });
    }, [resizingState, tabListRef]);

    const handleResize = useDebouncedCallback(entry => {
        const newWidth = arrayify(entry.borderBoxSize)[0].inlineSize;

        const lastWidth = tabListWidthRef.current;

        if (resizingState === "none") {
            if (!isNil(lastWidth)) {
                if (newWidth > lastWidth) {
                    dispatch({ type: "expand" });
                } else if (newWidth < lastWidth) {
                    dispatch({ type: "collapse" });
                }
            } else {
                dispatch({ type: "initialize" });
            }
        }

        setTabListWidth(newWidth);
    }, 15);

    const resizeRef = useResizeObserver(handleResize, { isDisabled: isDisabled || tabs?.length < 2 });

    // Partition the tabs between "visible" and "collapsed" based on the collapsed count.
    const [collapsedTabs, visibleTabs] = useMemo(() => {
        if (collapsedCount > 0) {
            const visible = [];
            const collapsed = [];

            const visibleCount = tabs.length - collapsedCount;

            for (let i = 0; i < visibleCount; i += 1) {
                visible.push(tabs[i]);
            }

            let selectedTab;

            for (let i = 0; i < collapsedCount; i += 1) {
                const tab = tabs[visibleCount + i];

                if (tab.key === selectedKey) {
                    selectedTab = tab;
                } else {
                    collapsed.push(tab);
                }
            }

            // We want the selected tab to always be visible. If the selected tab is in the collapsed tabs, switch it with
            // the last visible tab.
            if (!isNil(selectedTab)) {
                const lastTab = visible.pop();

                visible.push(selectedTab);
                collapsed.unshift(lastTab);
            }

            return [collapsed, visible];
        }

        return [[], tabs];
    }, [collapsedCount, tabs, selectedKey]);

    return {
        collapsedTabs,
        collapsibleTabsRef: resizeRef,
        visibleTabs
    };
}

interface CollapsedTabsProps {
    defaultFocusTarget: string;
    onOpenChange: (event: SyntheticEvent, isOpen: boolean, options?: { focusTarget?: string }) => void;
    open: boolean;
    overlayProps?: Partial<OverlayProps>;
    tabs: TabType[];
}

const CollapsedTabs = forwardRef(({
    defaultFocusTarget,
    onOpenChange,
    open,
    tabs,
    overlayProps: { id: overlayId, ...overlayProps } = {},
    ...rest
}: CollapsedTabsProps,
ref) => {
    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope);

    const triggerProps = useOverlayTrigger(open, {
        hideOnLeave: false,
        onHide: useEventCallback((event: SyntheticEvent) => {
            onOpenChange(event, false);
        }),
        onShow: useEventCallback((event: SyntheticEvent) => {
            onOpenChange(event, true);
        })
    });

    const { overlayRef: overlayPositionRef, triggerRef: overlayPositionTriggerRef } = useOverlayPosition({
        allowFlip: true,
        allowPreventOverflow: true,
        position: "bottom"
    });

    const { overlayProps: overlayAriaProps, triggerProps: triggerAriaProps } = usePopupAriaProps(open, "dialog", { id: overlayId });

    const triggerRef = useMergedRefs(overlayPositionTriggerRef, ref);

    const overlayDismissProps = usePopupLightDismiss(triggerRef as RefObject<HTMLElement>, focusScope, {
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: true,
        onHide: useEventCallback((event: SyntheticEvent) => {
            onOpenChange(event, false);
        })
    });

    useAutoFocusChild(focusManager, {
        isDisabled: !open,
        target: defaultFocusTarget
    });

    // TODO: Should also support home/end
    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case Keys.arrowRight: {
                event.preventDefault();

                // Prevents the tab list keydown handler from executing.
                event.stopPropagation();

                if (focusScope.isLastElement(document.activeElement as HTMLElement)) {
                    onOpenChange(event, false, { focusTarget: FocusTarget.first });
                } else {
                    focusManager.focusNext();
                }
                break;
            }
            case Keys.arrowLeft: {
                event.preventDefault();

                // Prevents the tab list keydown handler from executing.
                event.stopPropagation();

                if (focusScope.isFirstElement(document.activeElement as HTMLElement)) {
                    onOpenChange(event, false, { focusTarget: FocusTarget.last });
                } else {
                    focusManager.focusPrevious();
                }
                break;
            }
        }
    });

    // Not using role="dialog" on the overlay because the screen reader will anounce the dialog which is not what we want since we want they arrow navigation
    // to be seemless for a screen reader user.
    return (
        <>
            <HtmlButton
                {...mergeProps(
                    rest,
                    {
                        "aria-hidden": true,
                        ref: triggerRef,
                        type: "button" as const,
                        width: `${CollapsedTabsTriggerWidth}px`
                    },
                    triggerProps,
                    triggerAriaProps
                )}
            >
                +{tabs.length}
            </HtmlButton>
            <Overlay
                ref={overlayPositionRef}
                show={open}
                zIndex={1000}
            >
                <Div
                    {...mergeProps(
                        overlayProps,
                        {
                            className: "o-ui-collapsed-tabs",
                            onKeyDown: handleKeyDown,
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
                    }) =>
                        <ElementType
                            {...props}
                            key={key}
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

// TODO: Maybe instead of use the CollapsedTabs as a controlled component instead CollapsedTabs could use an imperative ref and offer
// open(focusTarget)
// close()

export function InnerTabList({
    as = DefaultElement,
    autoFocus,
    forwardedRef,
    tabs,
    ...rest
}: InnerTabListProps) {
    const { isCollapsible, isManual, onSelect, orientation, selectedKey } = useTabsContext();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupFocusTargetRef, setPopupFocusTarget] = useRefState<FocusTarget>(FocusTarget.first);

    const [focusScope, setFocusRef] = useFocusScope();

    const tabListRef = useMergedRefs(setFocusRef, forwardedRef);
    const popupTriggerRef = useRef();

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: TabKeyProp });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: selectedKey
    });

    const updateIsPopupOpen = useCallback((newValue: boolean) => {
        if (isPopupOpen !== newValue) {
            setIsPopupOpen(newValue);
        }
    }, [isPopupOpen, setIsPopupOpen]);

    const openPopup = useCallback((focusTarget: FocusTarget) => {
        setPopupFocusTarget(focusTarget);
        updateIsPopupOpen(true);
    }, [setPopupFocusTarget, updateIsPopupOpen]);

    const closePopup = useCallback(() => {
        updateIsPopupOpen(false);
    }, [updateIsPopupOpen]);

    const { collapsedTabs, collapsibleTabsRef, visibleTabs } = useCollapsibleTabs(tabListRef, tabs, selectedKey, {
        isDisabled: !isCollapsible && orientation !== "horizontal"
    });

    const selectTab = useCallback((event: SyntheticEvent, tabElement: HTMLElement) => {
        // When there are collapsed tabs, only manual activation is supported, until the collapsed tabs selection is improved.
        if (!isManual && collapsedTabs.length === 0) {
            if (!isNil(tabElement)) {
                onSelect(event, tabElement.getAttribute(TabKeyProp));
            }
        }
    }, [collapsedTabs, isManual, onSelect]);

    const handleKeyboardCanSelect = useCallback((event: KeyboardEvent, element: HTMLElement, key: Keys) => {
        switch (key) {
            case Keys.arrowLeft: {
                if (element === popupTriggerRef.current) {
                    // When we hit the collapsed tabs popup trigger, instead of focusing the trigger, open the popup to navigate to the last collapsed tab.
                    openPopup(FocusTarget.last);

                    return false;
                }
                break;
            }
            case Keys.arrowRight: {
                if (element === popupTriggerRef.current) {
                    // When we hit the collapsed tabs popup trigger, instead of focusing the trigger, open the popup to navigate to the first collapsed tab.
                    openPopup(FocusTarget.first);

                    return false;
                }
                break;
            }
        }

        return true;
    }, [openPopup]);

    const handleKeyboardSelect = useEventCallback((event: KeyboardEvent, element: HTMLElement) => {
        selectTab(event, element);
    });

    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation], {
        // Only horizontal orientation support collapsing tabs.
        onCanSelect: orientation === "horizontal" ? handleKeyboardCanSelect : undefined,
        onSelect: !isManual ? handleKeyboardSelect : undefined
    });

    const handlePopupOpenChange = useEventCallback((event: SyntheticEvent, isOpen: boolean, { focusTarget }: { focusTarget?: string } = {}) => {
        if (isOpen) {
            openPopup(FocusTarget.first);
        } else {
            closePopup();
        }

        if (!isNil(focusTarget)) {
            let element;

            if (focusTarget !== FocusTarget.last) {
                element = focusManager.focusTarget(focusTarget);
            } else {
                // The last element is the collapsible tabs trigger instead of a tab, skip it.
                element = focusScope.elements[focusScope.length - 2];

                focusManager.focusElement(element);
            }

            selectTab(event, element);
        }
    });

    const popupOverlayId = useId(undefined, "o-ui-collapsed-tabs");

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-orientation": orientation,
                    "aria-owns": isPopupOpen ? popupOverlayId : undefined,
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
            {collapsedTabs.length > 0 && (
                <CollapsedTabs
                    defaultFocusTarget={popupFocusTargetRef.current}
                    onOpenChange={handlePopupOpenChange}
                    open={isPopupOpen}
                    overlayProps={{ id: popupOverlayId }}
                    ref={popupTriggerRef}
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



