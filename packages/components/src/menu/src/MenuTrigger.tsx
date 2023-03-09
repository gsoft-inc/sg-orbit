import { Children, ComponentProps, KeyboardEvent, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
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
import { Overlay, PopupPosition, PopupProps, usePopup } from "../../overlay";

import { DisclosureContext } from "../../disclosure";
import { MenuTriggerContext } from "./MenuTriggerContext";
import { useInputGroupMenuAddonProps } from "../../input-group";

const DefaultElement = "div";

export interface InnerMenuTriggerProps extends InternalProps, PopupProps, Omit<StyledComponentProps<typeof DefaultElement>, "zIndex"> {
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
        as = DefaultElement,
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

    const [autoFocusTargetRef, setAutoFocusTarget] = useRefState<string>(FocusTarget.first);

    const handleOpenChange = useChainedEventCallback(onOpenChange, (event: SyntheticEvent, isVisible: boolean) => {
        // When the menu is closed because of a blur or outside click event, reset the focus target.
        if (!isVisible) {
            setAutoFocusTarget(FocusTarget.first);
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
        hideOnOutsideClick: false,
        id,
        offset: [0, 4],
        onOpenChange: handleOpenChange,
        open: openProp,
        position: `${direction}-${align}` as PopupPosition,
        trigger: "click"
    });

    const open = useCallback((event: SyntheticEvent, focusTarget: string) => {
        setAutoFocusTarget(focusTarget);
        setIsOpen(event, true);
    }, [setIsOpen, setAutoFocusTarget]);

    const close = useCallback((event: SyntheticEvent) => {
        setAutoFocusTarget(null);
        setIsOpen(event, false);
    }, [setIsOpen, setAutoFocusTarget]);

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
        autoFocusTarget: autoFocusTargetRef.current,
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

InnerMenuTrigger.defaultElement = DefaultElement;

/**
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/menu--default-story)
*/

export const MenuTrigger = forwardRef<any, OmitInternalProps<InnerMenuTriggerProps>>((props, ref) => (
    <InnerMenuTrigger {...props} forwardedRef={ref} />
));

export type MenuTriggerProps = ComponentProps<typeof MenuTrigger>;
