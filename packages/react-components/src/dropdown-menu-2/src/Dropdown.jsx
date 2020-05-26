import { DropdownButtonItem } from "./DropdownButtonItem";
import { DropdownContext } from "./context";
import { DropdownHeader } from "./DropdownHeader";
import { DropdownItem } from "./DropdownItem";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownMenu } from "./DropdownMenu";
import { KEYS } from "../../shared";
import { PopperTrigger } from "../../popper";
import { bool, element, func, number, oneOf } from "prop-types";
import { cloneElement, forwardRef, useCallback } from "react";
import { isNil } from "lodash";

// TODO:
// Menu component should be overridable.

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const propTypes = {
    open: bool,
    defaultOpen: bool,
    trigger: element.isRequired,
    /**
     * A dropdown menu can vary in size.
     */
    size: oneOf(SIZES),
    upward: bool,
    fluid: bool,
    zIndex: number,
    /**
     * Whether or not the menu should close when the dropdown menu loose focus.
     */
    closeOnBlur: bool,
    /**
     * Whether or not the menu should close when a click happens outside the dropdown menu.
     * Requires `closeOnBlur` to be false.
     */
    closeOnOutsideClick: bool,
    onOpen: func,
    onClose: func,
    /**
     * @ignore
     */
    active: bool,
    /**
     * @ignore
     */
    focus: bool,
    /**
     * @ignore
     */
    hover: bool
};

const defaultProps = {
    size: DEFAULT_SIZE
};

function useHandleVisibilityChange({ onOpen, onClose }) {
    return useCallback((event, isVisible) => {
        if (isVisible) {
            if (!isNil(onOpen)) {
                onOpen(event);
            }
        } else {
            if (!isNil(onClose)) {
                onClose(event);
            }
        }
    }, [onOpen, onClose]);
}

function useTriggerRenderer({ trigger, fluid, active, focus, hover }) {
    return () => {
        return cloneElement(trigger, {
            fluid,
            active,
            focus,
            hover
        });
    };
}

function useMenuRenderer({ children, forwardedRef, rest }) {
    return () => {
        return (
            <DropdownMenu
                {...rest}
                ref={forwardedRef}
            >
                {children}
            </DropdownMenu>
        );
    };
}

function usePopperRenderer({ open, defaultOpen, upward, fluid, zIndex, closeOnBlur, closeOnOutsideClick }, handleVisibilityChange, trigger, menu) {
    return () => {
        return (
            <PopperTrigger
                show={open}
                defaultShow={defaultOpen}
                trigger={trigger}
                toggleHandler="onClick"
                toggleKeyCodes={[KEYS.enter, KEYS.space, upward ? KEYS.up : KEYS.down]}
                position={upward ? "top-start" : "bottom-start"}
                fluid={fluid}
                zIndex={zIndex}
                hideOnBlur={closeOnBlur}
                hideOnOutsideClick={closeOnOutsideClick}
                focusFirstElementOnKeyboardShow
                onVisibilityChange={handleVisibilityChange}
                noPortal
            >
                {menu}
            </PopperTrigger>
        );
    };
}

function useRenderer(size, popper) {
    return () => {
        return (
            <DropdownContext.Provider value={{ size }}>
                {popper}
            </DropdownContext.Provider>
        );
    };
}

export function InnerDropdown({
    open,
    defaultOpen,
    trigger,
    size,
    upward,
    fluid,
    zIndex,
    closeOnBlur,
    closeOnOutsideClick,
    onOpen,
    onClose,
    active,
    focus,
    hover,
    children,
    forwardedRef,
    ...rest
}) {
    const handleVisibilityChange = useHandleVisibilityChange({ onOpen, onClose });

    const renderTrigger = useTriggerRenderer({ trigger, fluid, active, focus, hover });
    const renderMenu = useMenuRenderer({ children, forwardedRef, rest });
    const renderPopper = usePopperRenderer({ open, defaultOpen, upward, fluid, zIndex, closeOnBlur, closeOnOutsideClick }, handleVisibilityChange, renderTrigger(), renderMenu());
    const render = useRenderer(size, renderPopper());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
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
});


