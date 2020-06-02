import { DropdownButtonItem } from "./DropdownButtonItem";
import { DropdownContext } from "./DropdownContext";
import { DropdownDivider } from "./DropdownDivider";
import { DropdownHeader } from "./DropdownHeader";
import { DropdownItem } from "./DropdownItem";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownMenu, createDropdownMenu } from "./DropdownMenu";
import { DropdownTitleTrigger } from "./DropdownTitleTrigger";
import { KEYS, resolvePopperPosition, useEventCallback } from "../../shared";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useEffect, useState } from "react";
import { isNil } from "lodash";
import { usePopperTrigger } from "../../popper";

const propTypes = {
    open: bool,
    defaultOpen: bool,
    title: string,
    icon: element,
    trigger: element,
    /**
     * A dropdown can vary in size.
     */
    size: oneOf(["small", "large"]),
    upward: bool,
    direction: oneOf(["left", "right"]),
    pinned: bool,
    zIndex: number,
    fluid: bool,
    /**
     * A dropdown can have its menu scroll.
     */
    scrolling: bool,
    /**
     * Whether or not the menu should close when the dropdown menu loose focus.
     */
    closeOnBlur: bool,
    /**
     * Whether or not the menu should close when a click happens outside the dropdown.
     * Requires `closeOnBlur` to be false.
     */
    closeOnOutsideClick: bool,
    onVisibilityChange: func,
    menu: oneOfType([element, object])
};

const defaultProps = {
    direction: "right"
};

function useDropdownTrigger(title, icon, trigger, size, rest) {
    const triggerComponent = !isNil(title) ? <DropdownTitleTrigger title={title} icon={icon} /> : trigger;

    return cloneElement(triggerComponent, {
        ...rest,
        size
    });
}

function useDropdownMenu(scrolling, menu, handleSelectItem, children, ref) {
    const props = {
        scrolling,
        onSelectItem: handleSelectItem,
        children,
        ref
    };

    if (!isNil(menu)) {
        return createDropdownMenu(menu, props);
    }

    return <DropdownMenu {...props}>{children}</DropdownMenu>;
}

export function InnerDropdown(props) {
    const {
        open,
        defaultOpen,
        title,
        icon,
        trigger,
        size,
        upward,
        direction,
        pinned,
        zIndex,
        fluid,
        scrolling,
        closeOnBlur,
        closeOnOutsideClick,
        onVisibilityChange,
        menu,
        children,
        forwardedRef,
        ...rest
    } = props;
    useEffect(() => {
        if (!isNil(title) && !isNil(trigger)) {
            throw new Error("Dropdown - \"title\" and \"trigger\" props cannot be both specified.");
        }
    }, [title, trigger]);

    const [isOpen, setIsOpen] = useState();

    const handleVisibilityChange = useEventCallback((event, isVisible) => {
        setIsOpen(isVisible);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, isVisible);
        }
    });

    const dropdownTrigger = useDropdownTrigger(title, icon, trigger, size, rest);

    const { renderPopper, hidePopper: closePopper, focusTrigger } = usePopperTrigger({
        show: open,
        defaultShow: defaultOpen,
        trigger: dropdownTrigger,
        toggleHandler: "onClick",
        position: resolvePopperPosition(upward, direction),
        pinned,
        offset: [0, 10],
        zIndex,
        fluid,
        showOnKeys: [upward ? KEYS.up : KEYS.down],
        focusFirstElementOnKeyboardShow: true,
        hideOnBlur: closeOnBlur,
        hideOnOutsideClick: closeOnOutsideClick,
        onVisibilityChange: handleVisibilityChange
    });

    const handleSelectItem = useEventCallback(event => {
        // HACK: anchors were not activated on enter keydown, delaying close fix it.
        setTimeout(() => {
            closePopper(event);
            focusTrigger();
        }, 0);
    });

    const dropdownMenu = useDropdownMenu(scrolling, menu, handleSelectItem, children, forwardedRef);

    return (
        <DropdownContext.Provider
            value={{
                isOpen,
                size,
                upward,
                direction
            }}
        >
            {renderPopper(dropdownMenu)}
        </DropdownContext.Provider>
    );
}

InnerDropdown.propTypes = propTypes;
InnerDropdown.defaultProps = defaultProps;

export const Dropdown = forwardRef((props, ref) => (
    <InnerDropdown {...props} forwardedRef={ref} />
));

[InnerDropdown, Dropdown].forEach(x => {
    x.Menu = DropdownMenu;
    x.Item = DropdownItem;
    x.LinkItem = DropdownLinkItem;
    x.ButtonItem = DropdownButtonItem;
    x.Header = DropdownHeader;
    x.Divider = DropdownDivider;
});


