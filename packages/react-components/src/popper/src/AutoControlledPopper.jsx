/* eslint-disable react/no-unused-prop-types */

import { Popper } from "./Popper";
import { array, arrayOf, bool, element, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useAutoControlledPopper } from "./useAutoControlledPopper";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const SHARED_POPPER_PROP_TYPES = {
    /**
     * Wether to show the popper element or not.
     */
    show: bool,
    /**
     * Position of the popper element.
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
     * When true, disables automatic repositioning of the component, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * Whether or not to render the popper element in an additional element that will handles [PopperJs](https://popper.js.org) references, attributes and styles.
     */
    noWrap: bool,
    /**
     * Allow to displace the popper element from its trigger element.
     * Ex: ["10px", "-10px"]
     */
    offset: arrayOf(number),
    /**
     * An array of modifiers passed directly to [PopperJs](https://popper.js.org) modifiers. For more info, view [PopperJs modifiers documentation](https://popper.js.org/docs/v2/modifiers).
     */
    popperModifiers: array,
    /**
     * A set of options passed directly to [PopperJs](https://popper.js.org). For more info, view [PopperJs options documentation](https://popper.js.org/docs/v2/constructors/#options).
     */
    popperOptions: object,
    /**
     * A DOM element in which the popper element will appended via a React portal.
     */
    portalContainerElement: instanceOf(HTMLElement),
    /**
     * Whether or not to render the popper element with React portal. The popper element will be rendered within it's parent DOM hierarchy.
     */
    noPortal: bool,
    /**
     * Whether or not to animate the popper element when opening / closing.
     */
    animate: bool
};

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const SHARED_POPPER_DEFAULT_PROPS = {
    position: "bottom",
    animate: true
};

/////////////////

const propTypes = {
    ...SHARED_POPPER_PROP_TYPES,
    /**
     * The initial value of show.
     */
    defaultShow: bool,
    /**
     * The popper trigger.
     */
    trigger: node.isRequired,
    /**
     * The [event handler](https://reactjs.org/docs/events.html) that toggle the popper visibility.
     * Ex. "onClick"
     */
    toggleHandler: string.isRequired,
    /**
     * Called when the popup open / close.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the popup is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * Whether or not the trigger will be rendered as fluid.
     */
    fluid: bool,
    /**
     * z-index of the popper element.
     */
    zIndex: number,
    /**
     * Whether or not to focus the trigger when the popper is made visible. When `true`, the trigger must expose a `focus` function in order to work.
     */
    focusTriggerOnShow: bool,
    /**
     * Whether or not to focus the trigger on escape keydown. When `true`, the trigger must expose a `focus` function in order to work.
     */
    focusTriggerOnEscape: bool,
    /**
     * Whether or not to focus the first element of the popper when the popper is shown.
     */
    focusFirstElementOnShow: bool,
    /**
     * Whether or not to focus the first element of the popper when the popper is shown on keydown.
     */
    focusFirstElementOnKeyboardShow: bool,
    /**
     * Additional [keys](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) to show the popper on keydown.
     * Ex. [13] for Enter
     */
    showOnKeys: arrayOf(number),
    /**
     * Whether or not to toggle the popper on spacebar keydown.
     */
    toggleOnSpacebar: bool,
    /**
     * Whether or not to toggle the popper on enter keydown.
     */
    toggleOnEnter: bool,
    /**
     * Whether or not the popper should hide on escape keydown.
     */
    hideOnEscape: bool,
    /**
     * Whether or not the popper should hide when it loose focus.
     */
    hideOnBlur: bool,
    /**
     * Whether or not the popper should hide when a click happens outside.
     */
    hideOnOutsideClick: bool,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for the popper.
     */
    popper: oneOfType([element, object])
};

/////////////////

const defaultProps = {
    ...SHARED_POPPER_DEFAULT_PROPS,
    focusTriggerOnEscape: true,
    toggleOnSpacebar: true,
    toggleOnEnter: true,
    hideOnEscape: true,
    hideOnBlur: true,
    hideOnOutsideClick: true,
    popper: Popper
};

export function InnerAutoControlledPopper({ children, ...rest }) {
    const { renderPopper } = useAutoControlledPopper(rest);

    // Without a fragment, react-docgen doesn't work.
    return <>{renderPopper(children)}</>;
}

InnerAutoControlledPopper.propTypes = propTypes;
InnerAutoControlledPopper.defaultProps = defaultProps;

export const AutoControlledPopper = forwardRef((props, ref) => (
    <InnerAutoControlledPopper {...props} forwardedRef={ref} />
));
