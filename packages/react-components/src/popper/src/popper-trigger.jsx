import { KEYS, mergeClasses, useAutoControlledState, useCombinedRefs, useDomEventListener } from "../../shared";
import { Popper } from "./popper";
import { PopperButtonTrigger } from "./popper-button-trigger";
import { array, arrayOf, bool, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { isNil } from "lodash";

// USAGE:
// Trigger:
//    - The trigger must accept an `onOpen` prop. `onClose` is optional.
//    - The trigger must accept a `ref` prop and assign it to it's root element.
// If noWrap is true, the Poppper Element:
//    - The popper element will receive a bunch of data attributes (starting with data-popper*) that must be spread on it's root element.
//    - The popper element must accept a `style` prop.
//    - The popper element must accept a `ref` prop and assign it to it's root element.
//    - This is done this way to avoid adding an additional root element around the popper element.

// TODO:
//  - I don't think we want to list the native handlers like onFocus and onBlur in the propTypes. SUI doesn't, we might don't want to since our goal is to support all
//    of them thourgh ...rest props.

// TODO:
//  - Focus the trigger on open?

// *******************

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
    portalContainerElement: instanceOf(HTMLElement),
    /**
     * Disable the React portal behavior. The popper element will be rendered within it's parent DOM hierarchy.
     */
    disablePortal: bool,
    /**
     * Whether or not to animate the popper element when opening / closing.
     */
    animate: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    style: object,
    /**
     * @ignore
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

// *******************

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
    toggleHandler: string.isRequired,
    /**
     * Called when the popup open / close.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the popup is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * Whether or not the popper should hide on escape keydown.
     */
    hideOnEscape: bool,
    /**
     * Whether or not the popper should hide when the popup loose focus.
     */
    hideOnBlur: bool,
    /**
     * Whether or not the popper should hide when a click happens outside.
     * Requires `hideOnBlur` to be `false`.
     */
    hideOnOutsideClick: bool
};

const defaultProps = {
    ...SHARED_POPPER_DEFAULT_PROPS,
    hideOnEscape: true,
    hideOnBlur: true,
    hideOnOutsideClick: false
};

export function InnerPopperTrigger(props) {
    const {
        show,
        defaultShow,
        trigger,
        toggleHandler,
        onVisibilityChange,
        position,
        pinned,
        noWrap,
        offset,
        popperModifiers,
        popperOptions,
        portalContainerElement,
        disablePortal,
        animate,
        hideOnEscape,
        hideOnBlur,
        hideOnOutsideClick,
        disabled,
        className,
        forwardedRef,
        children,
        ...rest
    } = props;

    const [triggerElement, setTriggerElement] = useState(null);
    const [isVisible, setIsVisible] = useAutoControlledState(show, defaultShow, false);

    const containerRef = useCombinedRefs(forwardedRef);
    const hasFocus = useRef();

    const showPopper = useCallback(event => {
        setIsVisible(true);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }, [setIsVisible, onVisibilityChange]);

    const hidePopper = useCallback(event => {
        setIsVisible(false);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }

        // TODO:
        // this.focusTrigger();
    }, [setIsVisible, onVisibilityChange]);

    const handleTriggerToggle = useCallback(event => {
        if (isVisible) {
            hidePopper(event);
        } else {
            showPopper(event);
        }
    }, [isVisible, showPopper, hidePopper]);

    const handleFocus = useCallback(() => {
        hasFocus.current = true;
    }, [hasFocus]);

    // Hiding the popper on blur will:
    // - hide on outside click
    // - hide on blur
    const handleBlur = useCallback(event => {
        hasFocus.current = false;

        if (isVisible) {
            if (hideOnBlur) {
                event.persist();

                // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
                setTimeout(() => {
                    if (!hasFocus.current) {
                        hidePopper(event);
                    }
                }, 0);
            }
        }
    }, [isVisible, hideOnBlur, hasFocus, hidePopper]);

    // This code aims to solve a bug where no blur event will happen when the focused element becomes disable and that element lose the focus.
    // More info at: https://allyjs.io/tutorials/mutating-active-element.html
    const handleDocumentBlur = useCallback(() => {
        setTimeout(() => {
            if (document.activeElement.nodeName === "BODY") {
                if (!isNil(containerRef.current)) {
                    // Chrome, Edge
                    containerRef.current.focus();
                }
            } else {
                // Firefox dont switch focus to body, it keeps it on the disabled element and doesn't trigger a proper blur event when another element is focused.
                // That's an ugly hack to fix this.
                setTimeout(() => {
                    if (document.activeElement.disabled) {
                        if (!isNil(containerRef.current)) {
                            containerRef.current.focus();
                        }
                    }
                }, 100);
            }
        }, 0);
    }, [containerRef]);

    const handleDocumentKeyDown = useCallback(event => {
        if (event.keyCode === KEYS.esc) {
            if (hideOnEscape) {
                hidePopper(event);
            }
        }
    }, [hidePopper, hideOnEscape]);

    useDomEventListener("keydown", handleDocumentKeyDown);
    useDomEventListener("blur", handleDocumentBlur, undefined, true);

    const renderTrigger = () => {
        if (!disabled) {
            return cloneElement(trigger, {
                [toggleHandler]: handleTriggerToggle,
                ref: setTriggerElement
            });
        }

        return trigger;
    };

    const renderPopper = () => {
        if (!isNil(triggerElement)) {
            return (
                <Popper
                    show={isVisible}
                    triggerElement={triggerElement}
                    position={position}
                    pinned={pinned}
                    noWrap={noWrap}
                    offset={offset}
                    disabled={disabled}
                    popperModifiers={popperModifiers}
                    popperOptions={popperOptions}
                    portalContainerElement={portalContainerElement}
                    disablePortal={disablePortal}
                    animate={animate}
                >
                    {children}
                </Popper>
            );
        }
    };

    const classes = mergeClasses(
        "outline-0",
        className
    );

    return (
        <div
            {...rest}
            // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
            // For more info: https://github.com/facebook/react/issues/6410
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex="-1"
            className={classes}
            ref={containerRef}
        >
            {renderTrigger()}
            {renderPopper()}
        </div>
    );
}

InnerPopperTrigger.propTypes = propTypes;
InnerPopperTrigger.defaultProps = defaultProps;

export const PopperTrigger = forwardRef((props, ref) => (
    <InnerPopperTrigger {...props} forwardedRef={ref} />
));

[InnerPopperTrigger, PopperTrigger].forEach(x => {
    x.Button = PopperButtonTrigger;
});
