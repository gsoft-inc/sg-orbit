import { Children, ComponentProps, KeyboardEvent, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
import { DisclosureContext } from "../../disclosure";
import {
    FocusTarget,
    InternalProps,
    Keys,
    OmitInternalProps,
    StyledComponentProps,
    augmentElement,
    isNil,
    mergeProps,
    resolveChildren,
    useChainedEventCallback,
    useEventCallback,
    useId,
    useRefState
} from "../../shared";
import { MenuTriggerContext } from "./MenuTriggerContext";
import { Overlay, OverlayDefaultElement, PopupPosition, PopupProps, usePopup } from "../../overlay";
import { useInputGroupMenuAddonProps } from "../../input-group";

export interface InnerMenuTriggerProps extends InternalProps, PopupProps, Omit<StyledComponentProps<typeof OverlayDefaultElement>, "zIndex"> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the menu should close when an item is selected.
     */
    closeOnSelect?: boolean;
}

export function InnerMenuTrigger(props: InnerMenuTriggerProps) {
    const [inputGroupProps] = useInputGroupMenuAddonProps();

    const {
        align = "start",
        allowFlip,
        allowPreventOverflow,
        as = OverlayDefaultElement,
        children,
        closeOnSelect = true,
        defaultOpen,
        direction = "bottom",
        disabled,
        forwardedRef,
        id,
        onOpenChange,
        open: openProp,
        readOnly,
        zIndex = 10000,
        ...rest
    } = mergeProps(
        props,
        inputGroupProps
    );

    const [focusTargetRef, setFocusTarget] = useRefState<string>(FocusTarget.first);

    const handleOpenChange = useChainedEventCallback(onOpenChange, (event: SyntheticEvent, isVisible: boolean) => {
        // When the menu is closed because of a blur or outside click event, reset the focus target.
        if (!isVisible) {
            setFocusTarget(FocusTarget.first);
        }
    });

    const [trigger, menu] = Children.toArray(resolveChildren(children)) as [ReactElement, ReactElement];

    if (isNil(trigger) || isNil(menu)) {
        throw new Error("A menu trigger must have exactly 2 children.");
    }

    const { isOpen, overlayProps, setIsOpen, triggerProps } = usePopup("menu", {
        allowFlip,
        allowPreventOverflow,
        defaultOpen,
        disabled: disabled || readOnly || trigger.props.disabled,
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: true,
        id,
        offset: [0, 4],
        onOpenChange: handleOpenChange,
        open: openProp,
        position: `${direction}-${align}` as PopupPosition,
        restoreFocus: true,
        trigger: "click"
    });

    const open = useCallback((event: SyntheticEvent, focusTarget: string) => {
        setFocusTarget(focusTarget);
        setIsOpen(event, true);
    }, [setIsOpen, setFocusTarget]);

    const close = useCallback((event: SyntheticEvent) => {
        setFocusTarget(null);
        setIsOpen(event, false);
    }, [setIsOpen, setFocusTarget]);

    // Open the menu on up & down arrow keydown.
    const handleTriggerKeyDown = useEventCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case Keys.arrowDown:
                event.preventDefault();
                open(event, FocusTarget.first);
                break;
            case Keys.arrowUp:
                event.preventDefault();
                open(event, FocusTarget.last);
                break;
        }
    });

    const handleSelectionChange = useEventCallback((event: SyntheticEvent) => {
        if (closeOnSelect) {
            close(event);
        }
    });

    const triggerId = useId(trigger.props.id, "o-ui-menu-trigger");

    const triggerMarkup = augmentElement(trigger, mergeProps(
        {
            id: triggerId,
            onKeyDown: !isOpen ? handleTriggerKeyDown : undefined
        },
        triggerProps
    ));

    const menuMarkup = augmentElement(menu, {
        "aria-describedby": trigger.props["aria-describedby"],
        "aria-labelledby": trigger.props["aria-labelledby"] ?? triggerId,
        // Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
        // a value because the menu re-render before the exit animation is done.
        autoFocus: isOpen,
        defaultFocusTarget: focusTargetRef.current,
        onSelectionChange: handleSelectionChange
    });

    return (
        <MenuTriggerContext.Provider
            value={{
                close,
                isOpen,
                open
            }}
        >
            <DisclosureContext.Provider
                value={{
                    isOpen
                }}
            >
                {triggerMarkup}
            </DisclosureContext.Provider>
            <Overlay
                {...mergeProps(
                    rest,
                    {
                        as,
                        ref: forwardedRef,
                        zIndex
                    },
                    overlayProps
                )}
            >
                {menuMarkup}
            </Overlay>
        </MenuTriggerContext.Provider>
    );
}

export const MenuTrigger = forwardRef<any, OmitInternalProps<InnerMenuTriggerProps>>((props, ref) => (
    <InnerMenuTrigger {...props} forwardedRef={ref} />
));

export type MenuTriggerProps = ComponentProps<typeof MenuTrigger>;
