import { ArgumentError, KEYS, mergeClasses, useAutoControlledState, useCombinedRefs, useDomEventListener } from "../../shared";
import { POSITIONS } from "./positions";
import { Popper } from "./popper";
import { PopperButtonTrigger } from "./popper-button-trigger";
import { PopperTextInputTrigger } from "./popper-text-input-trigger";
import { array, arrayOf, bool, element, func, instanceOf, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { createPopperFromShorthand } from "./factories";
import { isElement } from "react-is";
import { isFunction, isNil } from "lodash";

/////////////////

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const SHARED_POPPER_PROP_TYPES = {
    /**
     * Wether to show the popper element or not.
     */
    show: bool,
    /**
     * Position of the popper element.
     */
    position: oneOf(POSITIONS),
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
    noPortal: false,
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
    hideOnOutsideClick: bool,
    /**
     * The popper component.
     */
    popper: oneOfType([element, object])
};

const defaultProps = {
    ...SHARED_POPPER_DEFAULT_PROPS,
    fluid: false,
    showOnSpacebar: true,
    showOnEnter: true,
    focusTriggerOnShow: false,
    focusTriggerOnEscape: true,
    focusPopperOnShow: false,
    hideOnEscape: true,
    hideOnBlur: true,
    hideOnOutsideClick: false
};

/////////////////

function findFirstFocusableElement(container) {
    return container.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
}

function useThrowWhenMutuallyExclusivePropsAreProvided({ hideOnBlur, hideOnOutsideClick, focusTriggerOnShow, focusPopperOnShow }) {
    useEffect(() => {
        if (hideOnBlur && hideOnOutsideClick) {
            throw new ArgumentError("PopperTrigger - \"hideOnBlur\" and \"hideOnOutsideClick\" props cannot be both \"true\".");
        }

        if (focusTriggerOnShow && focusPopperOnShow) {
            throw new ArgumentError("PopperTrigger - \"focusTriggerOnShow\" and \"focusPopperOnShow\" props cannot be both \"true\".");
        }
    }, [hideOnBlur, hideOnOutsideClick, focusTriggerOnShow, focusPopperOnShow]);
}

function useShowPopper(setIsVisible, onVisibilityChange) {
    return useCallback(event => {
        setIsVisible(true);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }, [setIsVisible, onVisibilityChange]);
}

function useHidePopper(setIsVisible, onVisibilityChange) {
    return useCallback(event => {
        setIsVisible(false);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }
    }, [setIsVisible, onVisibilityChange]);
}

function usePopperVisibility(show, defaultShow, onVisibilityChange) {
    const [isVisible, setIsVisible] = useAutoControlledState(show, defaultShow, false);

    const showPopper = useShowPopper(setIsVisible, onVisibilityChange);
    const hidePopper = useHidePopper(setIsVisible, onVisibilityChange);

    return [isVisible, showPopper, hidePopper];
}

function useFocusTrigger(triggerElement) {
    return useCallback(() => {
        setTimeout(() => {
            if (!isNil(triggerElement)) {
                if (isFunction(triggerElement.focus)) {
                    triggerElement.focus();
                }
            }
        }, 0);
    }, [triggerElement]);
}

function useFocusPopper(popperElement) {
    return useCallback(onCannotFocus => {
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
}

function useSetFocusWhenTransitioningToVisible(isVisible, focusTriggerOnShow, focusPopperOnShow, focusTrigger, focusPopper) {
    useEffect(() => {
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
}

function useHandleTriggerToggle(isVisible, disabled, showPopper, hidePopper) {
    return useCallback(event => {
        if (!disabled) {
            if (isVisible) {
                hidePopper(event);
            } else {
                showPopper(event);
            }
        }
    }, [isVisible, disabled, showPopper, hidePopper]);
}

function useHandleTriggerKeyDown(disabled, showOnSpacebar, showOnEnter, showPopper) {
    return useCallback(event => {
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
}

function useHandleContainerFocus(hasFocus) {
    return useCallback(() => {
        hasFocus.current = true;
    }, [hasFocus]);
}

// Hiding the popper on blur will:
// - hide on outside click
// - hide on blur
function useHandleContainerBlur(isVisible, hideOnBlur, hasFocus, hidePopper) {
    return useCallback(event => {
        hasFocus.current = false;

        if (isVisible) {
            if (hideOnBlur) {
                event.persist();

                // Using a focus / unfocus flag was not the preferred way to prevent the popper from hiding on blur when the new focused item was inside the popper.
                // The first attempt has been to use a setTimeout in pair with the document.activeElement. The setTimeout ensured that the new focused element was set to
                // with document.activeElement. This was working well in browsers.
                //
                // However, our interaction tests rely on jsdom and jsdom support for document.activementElement is not reliable (in fact, it doesn't have the same behavior
                // as browsers).
                //
                // The fallback is to use this hasFocus flag. The idea is that when the blur event pop, we wait for a tick (with a setTimeout) and if hasFocus is false
                // after that tick, it means that the new focused element is not inside the popper and we can safely hide the popper.The check has to be delayed since between
                // leaving the old element and entering the new element the active element will always be the document/body itself.
                setTimeout(() => {
                    if (!hasFocus.current) {
                        hidePopper(event);
                    }
                }, 0);
            }
        }
    }, [isVisible, hideOnBlur, hasFocus, hidePopper]);
}

function useHandleDocumentKeyDown(isVisible, hasFocus, hidePopper, focusTrigger, hideOnEscape, focusTriggerOnEscape) {
    const handler = useCallback(event => {
        if (hasFocus.current) {
            if (event.keyCode === KEYS.esc) {
                if (hideOnEscape) {
                    hidePopper(event);

                    if (focusTriggerOnEscape) {
                        focusTrigger();
                    }
                }
            }
        }
    }, [hasFocus, hidePopper, focusTrigger, hideOnEscape, focusTriggerOnEscape]);

    useDomEventListener("keydown", handler, isVisible);
}

// This code aims to solve a bug where no blur event will happen when the focused element becomes disable and that element lose the focus.
// More info at: https://allyjs.io/tutorials/mutating-active-element.html
function useHandleDocumentBlur(isVisible, containerRef, hasFocus, focusPopper) {
    const handler = useCallback(() => {
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
    }, [containerRef, hasFocus, focusPopper]);

    useDomEventListener("blur", handler, isVisible, { capture: true });
}

function useHandleDocumentClick(isVisible, triggerElement, popperElement, hideOnOutsideClick, hidePopper) {
    const handler = useCallback(event => {
        if (!triggerElement.contains(event.target) && !popperElement.contains(event.target)) {
            if (hideOnOutsideClick) {
                hidePopper(event);
            }
        }
    }, [triggerElement, popperElement, hideOnOutsideClick, hidePopper]);

    useDomEventListener("click", handler, isVisible);
}

// Ensure the original handler is called if provided by the consumer.
function getToggleHandler(trigger, handlerName, handler) {
    if (!isNil(trigger.props[handlerName])) {
        return event => {
            handler(event);

            // Call the original handler.
            trigger.props[handlerName](event);
        };
    }

    return handler;
}

function useTriggerRenderer(trigger, toggleHandler, disabled, handleToggle, handleKeyDown) {
    const [triggerElement, setTriggerElement] = useState();

    const ref = useCombinedRefs(setTriggerElement, !isNil(trigger.ref) ? trigger.ref : undefined);
    const focusTrigger = useFocusTrigger(triggerElement);

    const renderer = () => {
        if (!disabled) {
            return cloneElement(trigger, {
                [toggleHandler]: !disabled ? getToggleHandler(trigger, toggleHandler, handleToggle) : undefined,
                onKeyDown: !disabled ? handleKeyDown : undefined,
                ref: ref
            });
        }

        return trigger;
    };

    return [renderer, focusTrigger, triggerElement];
}

function getPopperElement(popper, triggerElement, children) {
    if (!isNil(popper)) {
        if (isElement(popper)) {
            return cloneElement(popper, {
                triggerElement,
                children
            });
        }

        return createPopperFromShorthand({
            ...popper,
            triggerElement,
            content: children
        });
    }

    return <Popper triggerElement={triggerElement} children={children} />;
}

function usePopperRenderer(
    isVisible,
    zIndex,
    position,
    pinned,
    noWrap,
    offset,
    disabled,
    popper,
    popperModifiers,
    popperOptions,
    portalContainerElement,
    noPortal,
    animate,
    children,
    triggerElement
) {
    const [popperElement, setPopperElement] = useState();

    const focusPopper = useFocusPopper(popperElement);

    const renderer = () => {
        if (!isNil(triggerElement)) {
            const inferredElement = getPopperElement(popper, triggerElement, children);

            const styles = {
                ...(inferredElement.style || {}),
                zIndex
            };

            return cloneElement(inferredElement, {
                show: isVisible,
                position,
                pinned,
                noWrap,
                offset,
                disabled,
                popperModifiers,
                popperOptions,
                portalContainerElement,
                noPortal,
                animate,
                style: styles,
                ref: setPopperElement
            });
        }
    };

    return [renderer, focusPopper, popperElement];
}

export function InnerPopperTrigger(props) {
    const {
        show,
        defaultShow,
        trigger,
        toggleHandler,
        onVisibilityChange,
        fluid,
        zIndex,
        position,
        pinned,
        noWrap,
        offset,
        popper,
        popperModifiers,
        popperOptions,
        portalContainerElement,
        noPortal,
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
    useThrowWhenMutuallyExclusivePropsAreProvided(props);

    const [isVisible, showPopper, hidePopper] = usePopperVisibility(show, defaultShow, onVisibilityChange);
    const hasFocus = useRef();
    const containerRef = useCombinedRefs(forwardedRef);

    const handleTriggerToggle = useHandleTriggerToggle(isVisible, disabled, showPopper, hidePopper);
    const handleTriggerKeyDown = useHandleTriggerKeyDown(disabled, showOnSpacebar, showOnEnter, showPopper);

    const [triggerRenderer, focusTrigger, triggerElement] = useTriggerRenderer(trigger, toggleHandler, disabled, handleTriggerToggle, handleTriggerKeyDown);

    const [popperRenderer, focusPopper, popperElement] = usePopperRenderer(
        isVisible,
        zIndex,
        position,
        pinned,
        noWrap,
        offset,
        disabled,
        popper,
        popperModifiers,
        popperOptions,
        portalContainerElement,
        noPortal,
        animate,
        children,
        triggerElement);

    useSetFocusWhenTransitioningToVisible(isVisible, focusTriggerOnShow, focusPopperOnShow, focusTrigger, focusPopper);

    const handleContainerFocus = useHandleContainerFocus(hasFocus);
    const handleContainerBlur = useHandleContainerBlur(isVisible, hideOnBlur, hasFocus, hidePopper);

    useHandleDocumentKeyDown(isVisible, hasFocus, hidePopper, focusTrigger, hideOnEscape, focusTriggerOnEscape);
    useHandleDocumentBlur(isVisible, containerRef, hasFocus, focusPopper);
    useHandleDocumentClick(isVisible, triggerElement, popperElement, hideOnOutsideClick, hidePopper);

    const classes = mergeClasses(
        "outline-0",
        !fluid && "dib",
        className
    );

    return (
        <div
            data-testid="popper-trigger"
            tabIndex="-1"
            {...rest}
            // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
            // For more info: https://github.com/facebook/react/issues/6410
            onFocus={!disabled ? handleContainerFocus : undefined}
            onBlur={!disabled ? handleContainerBlur : undefined}
            className={classes}
            ref={containerRef}
        >
            {triggerRenderer()}
            {popperRenderer()}
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
