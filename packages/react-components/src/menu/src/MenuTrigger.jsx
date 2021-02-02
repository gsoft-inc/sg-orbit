import { Children, forwardRef } from "react";
import { Overlay, usePopup } from "../../overlay";
import { any, bool, func, number, oneOf, oneOfType } from "prop-types";
import { augmentElement, mergeProps, resolveChildren, useEventCallback, useId } from "../../shared";
import { isNil } from "lodash";

/*
TODO:
- autoFocus???
*/

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
     * Position of the menu related to the trigger.
     */
    position: oneOf([
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end"
    ]),
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
    open,
    defaultOpen,
    onSelect,
    onOpenChange,
    position,
    allowFlip,
    allowPreventOverflow,
    zIndex,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const { setIsOpen, triggerProps, overlayProps } = usePopup("menu", {
        id,
        open,
        defaultOpen,
        onOpenChange,
        hideOnEscape: true,
        hideOnLeave: true,
        hideOnOutsideClick: true,
        autoFocus: true,
        restoreFocus: true,
        position,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow,
        zIndex
    });

    const [trigger, menu] = Children.toArray(resolveChildren(children));

    if (isNil(trigger) || isNil(menu)) {
        throw new Error("An menu trigger must have exactly 2 children.");
    }

    const handleSelect = useEventCallback((event, key) => {
        if (!isNil(onSelect)) {
            onSelect(event, key);
        }

        setIsOpen(event, false);
    });

    // The trigger might already have a custom id.
    const { id: triggerIdProp, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy } = trigger.props;

    const triggerId = useId(triggerIdProp, triggerIdProp ? undefined : "o-ui-menu-trigger");

    const triggerMarkup = augmentElement(trigger, mergeProps(
        triggerProps,
        {
            id: triggerId
        }
    ));

    const menuMarkup = augmentElement(menu, {
        onSelect: handleSelect,
        fluid: true,
        "aria-labelledby": ariaLabelledBy ?? triggerId,
        "aria-describedby": ariaDescribedBy
    });

    return (
        <>
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
        </>
    );
}

InnerMenuTrigger.propTypes = propTypes;

export const MenuTrigger = forwardRef((props, ref) => (
    <InnerMenuTrigger {...props} forwardedRef={ref} />
));

MenuTrigger.displayName = "MenuTrigger";
