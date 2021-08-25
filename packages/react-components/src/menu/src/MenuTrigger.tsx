import { Children, ComponentProps, KeyboardEvent, ReactElement, ReactNode, SyntheticEvent, forwardRef, useCallback } from "react";
import { DisclosureContext } from "../../disclosure";
import {
    FocusTarget,
    InternalProps,
    Keys,
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
import { Overlay, usePopup } from "../../overlay";
import { useInputGroupMenuAddonProps } from "../../input-group";

const DefaultElement = "div";

export interface InnerMenuTriggerProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * Whether or not to show the menu.
     */
    open?: boolean;
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {boolean} isOpen - Indicate if the menu is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Whether or not the menu should close when an item is selected.
     */
    closeOnSelect?: boolean;
    /**
     * The direction the menu will open relative to the trigger.
     */
    direction?: "bottom" | "top";
    /**
     * The horizontal alignment of the menu relative to the trigger.
     */
    align?: "start" | "end";
    /**
     * Whether or not the menu can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * Whether or not the menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * The z-index of the menu.
     */
    zIndex?: number;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerMenuTrigger(props: InnerMenuTriggerProps) {
    const [inputGroupProps] = useInputGroupMenuAddonProps();

    const {
        id,
        open: openProp,
        defaultOpen,
        onOpenChange,
        closeOnSelect = true,
        direction = "bottom",
        align = "start",
        disabled,
        readOnly,
        allowFlip,
        allowPreventOverflow,
        zIndex = 10000,
        as = DefaultElement,
        children,
        forwardedRef,
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

    const { isOpen, setIsOpen, triggerProps, overlayProps } = usePopup("menu", {
        id,
        open: openProp,
        defaultOpen,
        onOpenChange: handleOpenChange,
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: true,
        restoreFocus: true,
        trigger: "click",
        position: `${direction}-${align}` as const,
        offset: [0, 4],
        disabled: disabled || readOnly || trigger.props.disabled,
        allowFlip,
        allowPreventOverflow
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
        onSelectionChange: handleSelectionChange,
        // Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
        // a value because the menu re-render before the exit animation is done.
        autoFocus: isOpen,
        defaultFocusTarget: focusTargetRef.current,
        "aria-labelledby": trigger.props["aria-labelledby"] ?? triggerId,
        "aria-describedby": trigger.props["aria-describedby"]
    });

    return (
        <MenuTriggerContext.Provider
            value={{
                isOpen,
                open,
                close
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
                        zIndex,
                        as,
                        ref: forwardedRef
                    },
                    overlayProps
                )}
            >
                {menuMarkup}
            </Overlay>
        </MenuTriggerContext.Provider>
    );
}

export const MenuTrigger = forwardRef<any, Omit<InnerMenuTriggerProps, "forwardedRef">>((props, ref) => (
    <InnerMenuTrigger {...props} forwardedRef={ref} />
));

export type MenuTriggerProps = ComponentProps<typeof MenuTrigger>;

MenuTrigger.displayName = "MenuTrigger";
