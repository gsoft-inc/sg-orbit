import "./Dropdown.css";

import { DropdownBasicTrigger } from "./DropdownBasicTrigger";
import { DropdownButtonItem } from "./DropdownButtonItem";
import { DropdownCarret } from "./DropdownCarret";
import { DropdownContext } from "./DropdownContext";
import { DropdownDivider } from "./DropdownDivider";
import { DropdownItem } from "./DropdownItem";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownTitle } from "./DropdownTitle";
import { DropdownTrigger } from "./DropdownTrigger";
import { KEYS, mergeClasses, useChainedEventCallback, useEventCallback, useMergedRefs } from "../../shared";
import { any, bool, func, oneOf } from "prop-types";
import { forwardRef, useRef } from "react";
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
     * A dropdown can vary in size.
     */
    size: oneOf(["sm", "lg"]),
    /**
     * A dropdown menu can open upward.
     */
    upward: bool,
    /**
     * A dropdown menu can open to the left or to the right.
     */
    direction: oneOf(["left", "right"]),
    /**
     * Whether the trigger will be rendered as fluid.
     */
    fluid: bool,
    /**
     * Called when the dropdown open / close.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the dropdown menu is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    direction: "right"
};

export function InnerDropdown(props) {
    const {
        open,
        defaultOpen,
        size,
        upward,
        direction,
        fluid,
        onVisibilityChange,
        onFocus,
        onBlur,
        className,
        children,
        forwardedRef,
        ...rest
    } = props;
    const triggerRef = useRef();
    const menuRef = useRef();
    const wrapperRef = useMergedRefs(forwardedRef);

    const {
        isVisible,
        show: openPopper,
        hide: closePopper,
        focusTrigger,
        onTriggerClick,
        onTriggerKeyDown,
        onWrapperFocus,
        onWrapperBlur
    } = useAutoControlledPopper({
        show: open,
        defaultShow: defaultOpen,
        triggerRef,
        popperRef: menuRef,
        wrapperRef,
        onVisibilityChange,
        focusFirstElementOnKeyboardShow: true,
        showOnKeys: [upward ? KEYS.up : KEYS.down]
    });

    const handleSelectItem = useEventCallback(event => {
        // HACK: anchors were not activated on enter keydown, delaying close fix it.
        setTimeout(() => {
            closePopper(event);
            focusTrigger();
        }, 0);
    });

    const handleWrapperFocus = useChainedEventCallback(onWrapperFocus, onFocus);
    const handleWrapperBlur = useChainedEventCallback(onWrapperBlur, onBlur);

    return (
        <DropdownContext.Provider
            value={{
                isOpen: isVisible,
                fluid,
                size,
                upward,
                direction,
                open: openPopper,
                close: closePopper,
                triggerRef,
                menuRef,
                wrapperRef,
                onTriggerClick,
                onTriggerKeyDown,
                onSelectItem: handleSelectItem
            }}
        >
            <div
                data-testid="dropdown-wrapper"
                tabIndex="-1"
                {...rest}
                // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
                // For more info: https://github.com/facebook/react/issues/6410
                onFocus={handleWrapperFocus}
                onBlur={handleWrapperBlur}
                className={mergeClasses(
                    "o-ui dropdown",
                    "outline-0",
                    !fluid && "dib",
                    className
                )}
                ref={wrapperRef}
            >
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

InnerDropdown.propTypes = propTypes;
InnerDropdown.defaultProps = defaultProps;

export const Dropdown = forwardRef((props, ref) => (
    <InnerDropdown {...props} forwardedRef={ref} />
));

[InnerDropdown, Dropdown].forEach(x => {
    x.Trigger = DropdownTrigger;
    x.BasicTrigger = DropdownBasicTrigger;
    x.Menu = DropdownMenu;
    x.Item = DropdownItem;
    x.LinkItem = DropdownLinkItem;
    x.ButtonItem = DropdownButtonItem;
    x.Title = x.Header = DropdownTitle;
    x.Divider = DropdownDivider;
    x.Carret = DropdownCarret;
});


