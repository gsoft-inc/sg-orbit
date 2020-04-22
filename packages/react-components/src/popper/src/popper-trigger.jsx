import { ArgumentError, KEYS, mergeClasses, useAutoControlledState, useCombinedRefs, useDomEventListener } from "../../shared";
import { Popper } from "./popper";
import { PopperButtonTrigger } from "./popper-button-trigger";
import { PopperTextInputTrigger } from "./popper-text-input-trigger";
import { array, arrayOf, bool, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { isFunction, isNil } from "lodash";

// USAGE:
// Trigger:
//    - The trigger must accept a toggle handler. The toggle handler will depend on the adapter type. For example for a PopperButtonTrigger, the trigger must accept a `onClick` trigger.
//    - The trigger must accept a `ref` prop and assign it to it's root element.
// If noWrap is true, the Poppper Element:
//    - The popper element will receive a bunch of data attributes (starting with data-popper*) that must be spread on it's root element.
//    - The popper element must accept a `style` prop.
//    - The popper element must accept a `ref` prop and assign it to it's root element.
//    - This is done this way to avoid adding an additional root element around the popper element.
// If focusTriggerOnHide is `true`, the trigger must expose a `focus` function in order to work.

// TODO:
//  - PopperInputTrigger
//  - Don't forget le canPropagate for onClick

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
     * Whether or not to show the popper on spacebar keydown.
     */
    showOnSpacebar: bool,
    /**
     * Whether or not to show the popper on enter keydown.
     */
    showOnEnter: bool,
    /**
     * Whether or not to focus the trigger when the popper is made visible. When `true`, the trigger must expose a `focus` function in order to work.
     */
    focusTriggerOnShow: bool,
    /**
     * Whether or not to focus the trigger on escape keydown. When `true`, the trigger must expose a `focus` function in order to work.
     */
    focusTriggerOnEscape: bool,
    /**
     * Whether or not to focus the first focusable element of the popper on show.
     */
    focusPopperOnShow: bool,
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
     * Requires `hideOnBlur` to be `false`.
     */
    hideOnOutsideClick: bool
};

const defaultProps = {
    ...SHARED_POPPER_DEFAULT_PROPS,
    showOnSpacebar: true,
    showOnEnter: true,
    focusTriggerOnShow: false,
    focusTriggerOnEscape: true,
    focusPopperOnShow: false,
    hideOnEscape: true,
    hideOnBlur: true,
    hideOnOutsideClick: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ hideOnBlur, hideOnOutsideClick, focusTriggerOnShow, focusPopperOnShow }) {
    if (hideOnBlur && hideOnOutsideClick) {
        throw new ArgumentError("PopperTrigger - \"hideOnBlur\" and \"hideOnOutsideClick\" props cannot be both \"true\".");
    }

    if (focusTriggerOnShow && focusPopperOnShow) {
        throw new ArgumentError("PopperTrigger - \"focusTriggerOnShow\" and \"focusPopperOnShow\" props cannot be both \"true\".");
    }
}

function findFirstFocusableElement(container) {
    return container.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
}

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
        showOnSpacebar,
        showOnEnter,
        focusTriggerOnShow,
        focusTriggerOnEscape,
        focusPopperOnShow,
        hideOnEscape,
        hideOnBlur,
        hideOnOutsideClick,
        disabled,
        className,
        forwardedRef,
        children,
        ...rest
    } = props;

    throwWhenMutuallyExclusivePropsAreProvided(props);

    const [triggerElement, setTriggerElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [isVisible, setIsVisible] = useAutoControlledState(show, defaultShow, false);

    const containerRef = useCombinedRefs(forwardedRef);

    // Using a focus / unfocus flag was not the preferred way to prevent the popper from hiding on blur when the new focused item was inside the popper.
    // The first attempt has been to use a setTimeout in pair with the document.activeElement. The setTimeout ensured that the new focused element was set to
    // with document.activeElement. This was working well in browsers.
    //
    // However, our interaction tests rely on jsdom and jsdom support for document.activementElement is not reliable (in fact, it doesn't have the same behavior
    // as browsers).
    //
    // The fallback is to use this hasFocus flag. The idea is that when the blur event pop, we wait for a tick (with a setTimeout) and if hasFocus is false
    // after that tick, it means that the new focused element is not inside the popper and we can safely hide the popper.
    const hasFocus = useRef();

    const focusTrigger = useCallback(() => {
        setTimeout(() => {
            if (!isNil(triggerElement)) {
                if (isFunction(triggerElement.focus)) {
                    triggerElement.focus();
                }
            }
        }, 0);
    }, [triggerElement]);

    const focusPopper = useCallback(onCannotFocus => {
        setTimeout(() => {
            if (!isNil(popperElement)) {
                const focusableElement = findFirstFocusableElement(popperElement);

                if (!isNil(focusableElement)) {
                    if (isFunction(focusableElement.focus)) {
                        focusableElement.focus();
                    }
                } else {
                    if (isFunction(onCannotFocus)) {
                        onCannotFocus();
                    }
                }
            }
        }, 0);
    }, [popperElement]);

    // Focus the trigger when transitioning the popper to being visible.
    useEffect(() => {
        console.log("** in useEffect");

        if (focusTriggerOnShow) {
            if (isVisible) {
                focusTrigger();
            }
        } else if (focusPopperOnShow) {
            if (isVisible) {
                focusPopper();
            }
        }
    }, [isVisible, focusTriggerOnShow, focusPopperOnShow, focusTrigger, focusPopper]);

    const showPopper = useCallback(event => {
        console.log("** showPopper");

        setIsVisible(true);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }, [setIsVisible, onVisibilityChange]);

    const hidePopper = useCallback(event => {
        console.log("** hidePopper");

        setIsVisible(false);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }
    }, [setIsVisible, onVisibilityChange]);

    const handleTriggerToggle = useCallback(event => {
        console.log("** handleTriggerToggle");

        if (!disabled) {
            if (isVisible) {
                hidePopper(event);
            } else {
                showPopper(event);
            }
        }

    }, [isVisible, disabled, showPopper, hidePopper]);

    const handleTriggerKeyDown = useCallback(event => {
        console.log("** handleTriggerKeyDown");

        if (!disabled) {
            const key = event.keyCode;

            if (key === KEYS.space) {
                if (showOnSpacebar) {
                    event.preventDefault();
                    showPopper(event);
                }

            } else if (key === KEYS.enter) {
                if (showOnEnter) {
                    event.preventDefault();
                    showPopper(event);
                }
            }
        }
    }, [disabled, showOnSpacebar, showOnEnter, showPopper]);

    const handleKeyDown = useCallback(event => {
        if (event.keyCode === KEYS.esc) {
            console.log("** handleKeyDown - esc");

            if (hideOnEscape) {
                hidePopper(event);

                if (focusTriggerOnEscape) {
                    focusTrigger();
                }
            }
        }
    }, [hidePopper, focusTrigger, hideOnEscape, focusTriggerOnEscape]);

    const handleFocus = useCallback(() => {
        console.log("** handleFocus");

        hasFocus.current = true;
    }, [hasFocus]);

    // Hiding the popper on blur will:
    // - hide on outside click
    // - hide on blur
    const handleBlur = useCallback(event => {
        console.log("** handleBlur");

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
        console.log("** handleDocumentBlur");

        // TODO: not sure if it's right to only run this code if it's has focus? Should add a test.
        if (hasFocus.current) {
            setTimeout(() => {
                if (document.activeElement.nodeName === "BODY") {
                    focusPopper(() => {
                        if (!isNil(containerRef.current)) {
                            // Chrome, Edge
                            containerRef.current.focus();
                        }
                    });
                } else {
                    // Firefox doesn't switch focus to body, it keeps it on the disabled element and doesn't trigger a blur event when another element is focused.
                    // That's an ugly hack to fix this.
                    setTimeout(() => {
                        if (document.activeElement.disabled) {
                            focusPopper(() => {
                                if (!isNil(containerRef.current)) {
                                    containerRef.current.focus();
                                }
                            });
                        }
                    }, 100);
                }
            }, 0);
        }
    }, [containerRef]);

    const handleDocumentClick = useCallback(event => {
        console.log("** handleDocumentClick");

        if (!containerRef.current.contains(event.target)) {
            console.log("** handleDocumentClick - outside");

            if (hideOnOutsideClick) {
                hidePopper(event);
            }
        }
    }, [containerRef, hideOnOutsideClick, hidePopper]);

    useDomEventListener("click", handleDocumentClick, isVisible);
    useDomEventListener("blur", handleDocumentBlur, isVisible, { capture: true });

    const renderTrigger = () => {
        if (!disabled) {
            return cloneElement(trigger, {
                [toggleHandler]: handleTriggerToggle,
                onKeyDown: handleTriggerKeyDown,
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
                    ref={setPopperElement}
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
            onKeyDown={handleKeyDown}
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
    x.TextInput = PopperTextInputTrigger;
});
