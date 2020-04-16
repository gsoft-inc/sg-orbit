import "./popper.css";

import { Children, cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { KEYS, mergeClasses, useDomEventListener, useResizeObserver } from "../../shared";
import { array, arrayOf, bool, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { createPortal } from "react-dom";
import { isNil, merge } from "lodash";
import { usePopper } from "react-popper";

// USAGE:
// Trigger:
//    - The trigger must accept an `onClick` prop.
//    - The trigger must accept a `ref` prop and assign it to it's root element.
// If wrap is false, Poppper Element:
//    - The popper element will receive a bunch of data attributes (starting with data-popper*) that must be spread on it's root element.
//    - The popper element must accept a `style` prop.
//    - The popper element must accept a `ref` prop and assign it to it's root element.
// This is done this way to avoid adding an additional root element around the popper element.

// STORIES:
// Flip:
//    - With a custom boundary when in a container that is not the document or the viewport OR disablePortal
// Prevent Overflow:
//    - With a custom boundary when in a container that is not the document or the viewport OR disablePortal


// TODO:
// - Do I want to add a DIV at the root?

const propTypes = {
    defaultOpen: bool,
    trigger: node.isRequired,
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
    wrap: bool,
    /**
     * Allow to displace the popper element from its trigger element.
     * Ex: ["10px", "-10px"]
     */
    offset: arrayOf(number),
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
    closeOnOutsideClick: bool,
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
     * Additional classes.
     */
    className: string,
    /**
     * Additional inline styles.
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

const defaultProps = {
    position: "bottom",
    closeOnEscape: true,
    closeOnBlur: true,
    closeOnOutsideClick: false,
    pinned: false,
    wrap: true,
    disabled: false,
    disablePortal: false,
    animate: true
};

function disableModifier(name, modifiers) {
    const modifier = modifiers.find(x => x.name === name);

    if (!isNil(modifier)) {
        modifier.enabled = false;
    } else {
        modifiers.push({
            name: name,
            enabled: false
        });
    }
}

function setModifierOptions(name, options, modifiers) {
    const modifier = modifiers.find(x => x.name === name);

    if (!isNil(modifier)) {
        modifier.options = merge(modifier.options, options);
    } else {
        modifiers.push({
            name,
            options
        });
    }
}

export function PurePopper({
    defaultOpen,
    trigger,
    position,
    onVisibilityChange,
    onDocumentKeyDown,
    onFocus,
    onBlur,
    onOutsideClick,
    closeOnEscape,
    closeOnBlur,
    closeOnOutsideClick,
    pinned,
    wrap,
    offset,
    disabled,
    popperModifiers,
    popperOptions,
    containerElement: portalElement,
    disablePortal,
    animate,
    className,
    style,
    forwardedRef,
    children,
    ...rest
}) {
    const [triggerElement, setTriggerElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [isVisible, setVisibility] = useState(defaultOpen);
    const hasFocus = useRef();

    useEffect(() => {
        hasFocus.current = false;
    }, [hasFocus]);

    const createModifiers = () => {
        const mergedModifiers = popperModifiers || [];

        if (pinned) {
            disableModifier("preventOverflow", mergedModifiers);
            disableModifier("flip", mergedModifiers);
        }

        if (!isNil(offset)) {
            setModifierOptions("offset", { offset }, mergedModifiers);
        }

        return mergedModifiers;
    };

    const { styles, attributes, update: updatePopper } = usePopper(triggerElement, popperElement, {
        placement: position,
        modifiers: createModifiers(),
        ...(popperOptions || {})
    });

    const show = useCallback(event => {
        console.log("** show");

        setVisibility(true);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }, [onVisibilityChange]);

    const hide = useCallback(event => {
        console.log("** hide");

        setVisibility(false);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }

        // TODO:
        // this.focusTrigger();
    }, [onVisibilityChange]);

    const toggleVisibility = useCallback(event => {
        console.log("** toggleVisibility");

        if (isVisible) {
            hide(event);
        } else {
            show(event);
        }
    }, [isVisible, show, hide]);

    const handlePopperElementResize = useCallback(() => {
        updatePopper();
    }, [updatePopper]);

    const handleDocumentKeyDown = useCallback(event => {
        if (event.keyCode === KEYS.esc) {
            hide(event);
        }

        if (!isNil(onDocumentKeyDown)) {
            onDocumentKeyDown(event);
        }
    }, [hide, onDocumentKeyDown]);

    const handleFocus = useCallback(event => {
        console.log("** handleFocus");

        hasFocus.current = true;

        if (!isNil(onFocus)) {
            onFocus(event);
        }
    }, [hasFocus, onFocus]);

    // Closing the dropdown on blur will:
    // - close on outside click
    // - close on blur
    const handleBlur = useCallback(event => {
        console.log("** handleBlur");

        hasFocus.current = false;

        // if (open) {
        //     if (closeOnBlur) {
        //         event.persist();

        //         // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
        //         setTimeout(() => {
        //             if (!this._hasFocus) {
        //                 this.close(event);
        //             }
        //         }, 0);
        //     }
        // }

        if (!isNil(onBlur)) {
            onBlur(event);
        }
    }, [hasFocus, onBlur]);

    const handleOutsideClick = useCallback(() => {
        console.log("** handleOutsideClick");
    });

    // This code aims to solve a bug where no blur event will happen when the focused element becomes disable and that element lose the focus.
    // More info at: https://allyjs.io/tutorials/mutating-active-element.html
    const handleDocumentBlur = useCallback(() => {
        console.log("** handleDocumentBlur");

    });

    useResizeObserver(popperElement, handlePopperElementResize);
    useDomEventListener("keydown", handleDocumentKeyDown);
    useDomEventListener("click", handleOutsideClick);
    useDomEventListener("blur", handleDocumentBlur, undefined, true);

    const renderTrigger = () => {
        if (!disabled) {
            return cloneElement(trigger, {
                onClick: event => { toggleVisibility(event); },
                ref: setTriggerElement
            });
        }

        return trigger;
    };

    const renderWrapper = popper => {
        const classes = mergeClasses(
            "outline-0",
            className
        );

        return (
            <div
                className={classes}
                tabIndex="-1"
                ref={forwardedRef}
                {...rest}
            >
                {popper}
            </div>
        );
    };

    const renderPopper = () => {
        const popper = Children.only(children);

        return cloneElement(wrap ? renderWrapper(popper) : popper, {
            style: {
                ...style,
                ...styles.popper,
                display: isVisible ? "block" : "none",
                animation: animate ? "ou-popper-fade-in 0.3s" : undefined
            },
            ref: setPopperElement,
            ...attributes.popper
        });
    };

    return (
        <>
            {renderTrigger()}
            <If condition={!disabled}>
                <Choose>
                    <When condition={disablePortal}>
                        {renderPopper()}
                    </When>
                    <Otherwise>
                        {createPortal(renderPopper(), portalElement || window.document.body)}
                    </Otherwise>
                </Choose>
            </If>
        </>
    );
}

PurePopper.propTypes = propTypes;
PurePopper.defaultProps = defaultProps;

export const Popper = forwardRef((props, ref) => (
    <PurePopper { ...props } forwardedRef={ref} />
));
