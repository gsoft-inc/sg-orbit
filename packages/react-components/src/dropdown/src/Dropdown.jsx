import "./Dropdown.css";

import { DropdownButtonItem } from "./DropdownButtonItem";
import { DropdownContext } from "./DropdownContext";
import { DropdownDivider } from "./DropdownDivider";
import { DropdownHeader } from "./DropdownHeader";
import { DropdownItem } from "./DropdownItem";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownMenu, createDropdownMenu } from "./DropdownMenu";
import { DropdownTitleTrigger } from "./DropdownTitleTrigger";
import { KEYS, augmentElement, resolvePopperPosition, useChainedEventCallback, useEventCallback } from "../../shared";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useState } from "react";
import { isNil } from "lodash";
import { useAutoControlledPopper } from "../../popper";

const propTypes = {
    /**
     * A controlled open value that determined whether or not the menu is displayed.
     */
    open: bool,
    /**
     * The initial value of open.
     */
    defaultOpen: bool,
    /**
     * The default trigger text.
     */
    title: string,
    /**
     * The default trigger icon.
     */
    icon: element,
    /**
     * A custom element to trigger the visibility of the menu. When specified, will have precedence over the the title prop.
     */
    trigger: element,
    /**
     * A dropdown can vary in size.
     */
    size: oneOf(["small", "large"]),
    /**
     * A dropdown menu can open upward.
     */
    upward: bool,
    /**
     * A dropdown menu can open to the left or to the right.
     */
    direction: oneOf(["left", "right"]),
    /**
     * When true, disables automatic repositioning of the component, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * z-index of the dropdown menu.
     */
    zIndex: number,
    /**
     * Whether or not the trigger will be rendered as fluid.
     */
    fluid: bool,
    /**
     * A dropdown can have its menu scroll.
     */
    scrolling: bool,
    /**
     * Called when the dropdown open / close.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the dropdown menu is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for the dropdown menu.
     */
    menu: oneOfType([element, object])
};

const defaultProps = {
    direction: "right",
    menu: DropdownMenu
};

function throwWhenMutuallyExclusivePropsAreProvided({ title, trigger }) {
    if (!isNil(title) && !isNil(trigger)) {
        throw new Error("Dropdown - \"title\" and \"trigger\" props cannot be both specified.");
    }
}

function resolveTrigger(title, icon, trigger) {
    return !isNil(title) ? <DropdownTitleTrigger title={title} icon={icon} /> : trigger;
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
        onVisibilityChange,
        menu,
        active,
        focus,
        hover,
        children,
        forwardedRef,
        ...rest
    } = props;
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const [isOpen, setIsOpen] = useState();

    const handleVisibilityChange = useChainedEventCallback(onVisibilityChange, (event, isVisible) => {
        setIsOpen(isVisible);
    });

    const dropdownTrigger = augmentElement(resolveTrigger(title, icon, trigger), {
        size,
        fluid,
        active,
        focus,
        hover,
        // Spreading on the trigger for convenience since a basic dropdown trigger is rendered by default when a "title" prop is provided.
        ...rest
    });

    const { renderPopper, hidePopper: closePopper, focusTrigger } = useAutoControlledPopper({
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
        onVisibilityChange: handleVisibilityChange,
        popper: {
            className: "o-ui dropdown"
        }
    });

    const handleSelectItem = useEventCallback(event => {
        // HACK: anchors were not activated on enter keydown, delaying close fix it.
        setTimeout(() => {
            closePopper(event);
            focusTrigger();
        }, 0);
    });

    const dropdownMenu = createDropdownMenu(menu, {
        scrolling,
        fluid,
        onSelectItem: handleSelectItem,
        children,
        ref: forwardedRef
    });

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
    x.DropdownTitleTrigger = DropdownTitleTrigger;
});


