import { Div, HtmlButton } from "../../html";
import {
    FocusTarget,
    Keys,
    StyledComponentProps,
    mergeProps,
    useAutoFocusChild,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useMergedRefs
} from "../../shared";
import { KeyboardEvent, RefObject, SyntheticEvent, forwardRef, useCallback } from "react";
import { Overlay, OverlayProps, useOverlayPosition, useOverlayTrigger, usePopupAriaProps, usePopupLightDismiss } from "../../overlay";

import { CollapsedTabsTriggerWidth } from "./useCollapsibleTabs";
import { Tab } from "./Tab";
import { TabType } from "./useTabsItems";
import { useTabsContext } from "./TabsContext";

export interface CollapsedTabsProps extends Omit<StyledComponentProps<"button">, "onSelect"> {
    autoFocusTarget: string;
    initialIndex: number;
    onOpenChange: (event: SyntheticEvent, isOpen: boolean, options?: { focusTarget?: string }) => void;
    onSelect: (event: SyntheticEvent, key: string) => void;
    open: boolean;
    overlayProps?: Partial<OverlayProps>;
    tabs: TabType[];
}

export const CollapsedTabs = forwardRef(({
    autoFocusTarget,
    initialIndex,
    onOpenChange,
    onSelect,
    open: openProp,
    tabs,
    overlayProps: { id: overlayId, ...overlayProps } = {},
    ...rest
}: CollapsedTabsProps,
    ref) => {
    const { selectedKey } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope);

    const open = useCallback((event: SyntheticEvent) => {
        if (!openProp) {
            onOpenChange(event, true);
        }
    }, [openProp, onOpenChange]);

    const close = useCallback((event: SyntheticEvent, focusTarget: string) => {
        if (openProp) {
            onOpenChange(event, false, { focusTarget: focusTarget });
        }
    }, [openProp, onOpenChange]);

    const triggerProps = useOverlayTrigger(openProp, {
        hideOnLeave: false,
        onHide: useEventCallback((event: SyntheticEvent) => {
            close(event, selectedKey);
        }),
        onShow: useEventCallback((event: SyntheticEvent) => {
            open(event);
        })
    });

    const { overlayRef: overlayPositionRef, triggerRef: overlayPositionTriggerRef } = useOverlayPosition({
        allowFlip: true,
        allowPreventOverflow: true,
        position: "bottom"
    });

    const { overlayProps: overlayAriaProps, triggerProps: triggerAriaProps } = usePopupAriaProps(openProp, "dialog", { id: overlayId });

    const triggerRef = useMergedRefs(overlayPositionTriggerRef, ref);

    const overlayDismissProps = usePopupLightDismiss(triggerRef as RefObject<HTMLElement>, focusScope, {
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: false,
        onHide: useEventCallback((event: SyntheticEvent) => {
            close(event, selectedKey);
        })
    });

    useAutoFocusChild(focusManager, {
        isDisabled: !openProp,
        target: autoFocusTarget
    });

    const handleTabSelect = useEventCallback((event: SyntheticEvent, key: string) => {
        onSelect(event, key);
        close(event, key);
    });

    const handleKeyDown = useEventCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case Keys.arrowRight: {
                event.preventDefault();
                event.stopPropagation();

                if (focusScope.isLastElement(document.activeElement as HTMLElement)) {
                    close(event, FocusTarget.first);
                } else {
                    focusManager.focusNext();
                }
                break;
            }
            case Keys.arrowLeft: {
                event.preventDefault();
                event.stopPropagation();

                if (focusScope.isFirstElement(document.activeElement as HTMLElement)) {
                    close(event, FocusTarget.last);
                } else {
                    focusManager.focusPrevious();
                }
                break;
            }
            case Keys.home: {
                event.preventDefault();
                event.stopPropagation();

                close(event, FocusTarget.first);
                break;
            }
            case Keys.end: {
                event.preventDefault();
                event.stopPropagation();

                focusManager.focusLast();
                break;
            }
            case Keys.arrowUp:
            case Keys.arrowDown:
                event.preventDefault();
                break;
        }
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
                        className: "o-ui-tablist-trigger",
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
                show={openProp}
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
                    }, index) =>
                        <ElementType
                            {...props}
                            aria-posinset={initialIndex + index + 1}
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
