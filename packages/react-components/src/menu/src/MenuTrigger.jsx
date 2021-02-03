import { Children, forwardRef, useCallback } from "react";
import { DisclosureContext } from "../../disclosure/src/DisclosureContext";
import { FocusTarget, Keys, augmentElement, mergeProps, resolveChildren, useChainedEventCallback, useEventCallback, useId, useRefState } from "../../shared";
import { MenuTriggerContext } from "./MenuTriggerContext";
import { Overlay, usePopup } from "../../overlay";
import { any, bool, func, number, oneOf, oneOfType } from "prop-types";
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
     * Called when a menu item is selected.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} key - The menu item key.
     * @returns {void}
     */
    onSelect: func,
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is visible.
     * @returns {void}
     */
    onOpenChange: func,
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
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerMenuTrigger({
    id,
    open: openProp,
    defaultOpen,
    onSelect,
    onOpenChange,
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

    const { isOpen, setIsOpen, triggerProps, overlayProps } = usePopup("menu", {
        id,
        open: openProp,
        defaultOpen,
        // Focusing the first item on open if nore are already set to be focused.
        onOpenChange: useChainedEventCallback(onOpenChange, (event, newValue) => {
            if (newValue) {
                if (isNil(focusTargetRef.current)) {
                    setFocusTarget(FocusTarget.first);
                }
            }
        }),
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: true,
        autoFocus: false,
        restoreFocus: true,
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow,
        zIndex
    });

    const [trigger, menu] = Children.toArray(resolveChildren(children));

    if (isNil(trigger) || isNil(menu)) {
        throw new Error("A menu trigger must have exactly 2 children.");
    }

    const { id: triggerIdProp, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy } = trigger.props;

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
        switch (event.keyCode) {
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

    const handleSelect = useEventCallback((event, key) => {
        if (!isNil(onSelect)) {
            onSelect(event, key);
        }

        close();
    });

    const triggerId = useId(triggerIdProp, triggerIdProp ? undefined : "o-ui-menu-trigger");

    const triggerMarkup = augmentElement(trigger, mergeProps(
        triggerProps,
        {
            id: triggerId,
            onKeyDown: !isOpen ? handleTriggerKeyDown : undefined
        }
    ));

    const menuMarkup = augmentElement(menu, {
        onSelect: handleSelect,
        // Must be conditional to isOpen otherwise it will steal the focus from the trigger when selecting
        // a value because the menu re-render before the exit animation is done.
        autoFocus: isOpen,
        defaultFocusTarget: focusTargetRef.current,
        "aria-labelledby": ariaLabelledBy ?? triggerId,
        "aria-describedby": ariaDescribedBy
    });

    return (
        <MenuTriggerContext.Provider
            value={{
                isOpen,
                close
            }}
        >
            {triggerMarkup}
            <Overlay
                {...mergeProps(
                    rest,
                    overlayProps,
                    {
                        as,
                        ref: forwardedRef
                    }
                )}
            >
                {menuMarkup}
            </Overlay>
        </MenuTriggerContext.Provider>
    );
}


export const MenuTrigger = forwardRef((props, ref) => (
    <InnerMenuTrigger {...props} forwardedRef={ref} />
));

MenuTrigger.displayName = "MenuTrigger";
