import { Children, forwardRef, useCallback } from "react";
import { DisclosureContext } from "../../disclosure";
import { FocusTarget, Keys, augmentElement, mergeProps, resolveChildren, useChainedEventCallback, useEventCallback, useId, useRefState } from "../../shared";
import { MenuTriggerContext } from "./MenuTriggerContext";
import { Overlay, usePopup } from "../../overlay";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Whether or not to show the menu.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is visible.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * Whether or not the menu should close when an item is selected.
     */
    closeOnSelect: bool,
    /**
     * The direction the menu will open relative to the trigger.
     */
    direction: oneOf(["bottom", "top"]),
    /**
     * The horizontal alignment of the menu relative to the trigger.
     */
    align: oneOf(["start", "end"]),
    /**
     * Whether or not the menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the menu.
     */
    zIndex: number,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerMenuTrigger({
    id,
    open: openProp,
    defaultOpen,
    onOpenChange,
    closeOnSelect = true,
    direction = "bottom",
    align = "start",
    allowFlip,
    allowPreventOverflow,
    zIndex,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const [focusTargetRef, setFocusTarget] = useRefState(null);

    const handleOpenChange = useChainedEventCallback(onOpenChange, (event, isVisible) => {
        if (isVisible) {
            // Focusing the first item on open if nore are already set to be focused.
            if (isNil(focusTargetRef.current)) {
                setFocusTarget(FocusTarget.first);
            }
        }
    });

    const { isOpen, setIsOpen, triggerProps, overlayProps } = usePopup("menu", {
        id,
        open: openProp,
        defaultOpen,
        onOpenChange: handleOpenChange,
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: true,
        autoFocus: false,
        restoreFocus: true,
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow
    });

    const [trigger, menu] = Children.toArray(resolveChildren(children));

    if (isNil(trigger) || isNil(menu)) {
        throw new Error("A menu trigger must have exactly 2 children.");
    }

    const open = useCallback((event, focusTarget) => {
        setFocusTarget(focusTarget);
        setIsOpen(event, true);
    }, [setIsOpen, setFocusTarget]);

    const close = useCallback(event => {
        setFocusTarget(null);
        setIsOpen(event, false);
    }, [setIsOpen, setFocusTarget]);

    // Open the menu on up & down arrow keydown.
    const handleTriggerKeyDown = useEventCallback(event => {
        switch (event.key) {
            case Keys.down:
                event.preventDefault();
                open(event, FocusTarget.first);
                break;
            case Keys.up:
                event.preventDefault();
                open(event, FocusTarget.last);
                break;
        }
    });

    const handleSelectionChange = useEventCallback(event => {
        if (closeOnSelect) {
            close(event);
        }
    });

    const triggerId = useId(trigger.props.id, trigger.props.id ? null : "o-ui-menu-trigger");

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

InnerMenuTrigger.propTypes = propTypes;

export const MenuTrigger = forwardRef((props, ref) => (
    <InnerMenuTrigger {...props} forwardedRef={ref} />
));

MenuTrigger.displayName = "MenuTrigger";
