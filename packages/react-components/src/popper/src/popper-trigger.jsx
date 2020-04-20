import { KEYS, getUnhandledProps, mergeClasses, useAutoControlledState, useDomEventListener } from "../../shared";
import { Popper } from "./popper";
import { array, arrayOf, bool, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { isNil } from "lodash";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const SHARED_POPPER_PROP_TYPES = {
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
     * Disables automatic repositioning of the component, it will always be placed according to the position value.
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
     * A disabled popper only renders its trigger.
     */
    disabled: bool,
    /**
     * An array of modifiers passed directly to [PopperJs](https://popper.js.org) modifiers. For documentation, view [https://popper.js.org/docs/v2/modifiers](https://popper.js.org/docs/v2/modifiers).
     */
    popperModifiers: array,
    /**
     * A set of options passed directly to [PopperJs](https://popper.js.org). For documentation, view [https://popper.js.org/docs/v2/constructors/#options](https://popper.js.org/docs/v2/constructors/#options)
     */
    popperOptions: object,
    /**
     * A DOM element in which the popper element will appended via a React portal.
     */
    containerElement: instanceOf(HTMLElement),
    /**
     * Disable the React portal behavior. The popper element will be rendered within it's parent DOM hierarchy.
     */
    disablePortal: bool,
    /**
     * Whether or not to animate the popper element when opening / closing.
     */
    animate: bool,
    /**
     * Additional classes that will be added to the popper element wrapper when wrap is true.
     */
    className: string,
    /**
     * Additional inline styles that will be added to the popper element wrapper when wrap is true.
     */
    style: object,
    /**
     * The content of the popper.
     */
    children: node.isRequired,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const SHARED_POPPER_DEFAULT_PROPS = {
    position: "bottom",
    pinned: false,
    noWrap: false,
    disabled: false,
    disablePortal: false,
    animate: true
};

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
     * Called when the popup open / close.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the popup is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * Called on window.document keydown when the popup is opened.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onDocumentKeyDown: func,
    /**
     * Called on focus.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onFocus: func,
    /**
     * Called on blur.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onBlur: func,
    /**
     * Called on click outside of the popup.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onOutsideClick: func,
    /**
     * Whether or not the popup should close on escape keydown.
     */
    closeOnEscape: bool,
    /**
     * Whether or not the popup should close when the popup loose focus.
     */
    closeOnBlur: bool,
    /**
     * Whether or not the popup should close when a click happens outside.
     * Requires `closeOnBlur` to be `false`.
     */
    closeOnOutsideClick: bool
};

const defaultProps = {
    ...SHARED_POPPER_DEFAULT_PROPS
};

const autoControlledProps = {
    show: false
};

export function InnerPopperTrigger(props) {
    // Disabled until https://github.com/layershifter/babel-plugin-transform-react-handled-props is fixed to support spread.
    // eslint-disable-next-line no-unused-vars
    const { defaultShow, trigger, disabled, forwardedRef, ...rest } = props;
    // const { autoControlledState, setAutoControlledState } = useAutoControlledState(autoControlledProps, props, defaultProps);

    const [triggerElement, setTriggerElement] = useState();

    // TODO: useCallback
    const handleTriggerClick = () => {
        // setAutoControlledState({
        //     show: !autoControlledState.show
        // });
    };

    const renderTrigger = () => {
        if (!disabled) {
            return cloneElement(trigger, {
                onClick: handleTriggerClick,
                ref: setTriggerElement
            });
        }

        return trigger;
    };

    const renderPopper = () => {
        if (!isNil(triggerElement)) {
            return (
                <Popper
                    // show={autoControlledState.show}
                    triggerElement={triggerElement}
                    disabled={disabled}
                    ref={forwardedRef}
                    {...rest}
                />
            );
        }
    };

    return (
        <>
            {renderTrigger()}
            {renderPopper()}
        </>
    );
}

InnerPopperTrigger.propTypes = propTypes;
InnerPopperTrigger.defaultProps = defaultProps;

export const PopperTrigger = forwardRef((props, ref) => (
    <InnerPopperTrigger { ...props } forwardedRef={ref} />
));
