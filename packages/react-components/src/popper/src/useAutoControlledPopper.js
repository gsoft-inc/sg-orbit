import { KEYS, useControllableState, useDocumentListener, useEventCallback } from "../../shared";
import { isFunction, isNil } from "lodash";
import { useCallback, useEffect, useRef } from "react";

function throwWhenMutuallyExclusivePropsAreProvided({ focusTriggerOnShow, focusFirstElementOnKeyboardShow }) {
    if (focusTriggerOnShow && focusFirstElementOnKeyboardShow) {
        throw new Error("AutoControlledPopper - \"focusTriggerOnShow\" and \"focusFirstElementOnKeyboardShow\" props cannot be both \"true\".");
    }
}

function getFirstFocusableElement(container) {
    return container.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
}

// function useHideOnBlur({ wrapperElement: containerElement, hideOnBlur, disabled }, isVisible, hidePopper, setFocusPopper) {
function useHideOnBlur({ wrapperRef: containerRef, hideOnBlur, disabled }, isVisible, hidePopper, setFocusPopper) {
    const hasFocusRef = useRef();
    const activeElementRef = useRef();

    const handleContainerFocus = useEventCallback(() => {
        if (!disabled) {
            hasFocusRef.current = true;
            activeElementRef.current = document.activeElement;
        }
    });

    // Hiding the popper on blur will:
    // - hide on outside click
    // - hide on blur
    const handleContainerBlur = useEventCallback(event => {
        if (!disabled) {
            // This is a fix to prevent the popper from closing when the dev tools opens. Opening the dev tools will cause a blur event since the popper
            // loose the focus in favor of the dev tools. Since this is the dev tools who receive the focused, no elements of the popper will be focused on
            // the next tick which will cause the popper to close.
            // To prevent the popper from closing we leverage the fact that opening the dev tools doesn't update document.activeElement.
            if (activeElementRef.current !== document.activeElement) {
                hasFocusRef.current = false;

                if (isVisible) {
                    if (hideOnBlur) {
                        // The event must be persisted since it's used later in a setTimeout.
                        event.persist();

                        // Using a focus / unfocus flag was not the preferred way to prevent the popper from hiding on blur when the new focused item was inside the popper.
                        // The first attempt has been to use a setTimeout in pair with the document.activeElement. The setTimeout ensured that the new focused element was set to
                        // document.activeElement. This was working well in browsers.
                        //
                        // However, our interaction tests rely on jsdom and jsdom support for document.activementElement is not reliable (in fact, it doesn't have the same behavior
                        // as browsers).
                        //
                        // The fallback is to use this hasFocus flag. The idea is that when the blur event pop, we wait for a tick (with a setTimeout) and if hasFocus is false
                        // after that tick, it means that the new focused element is not inside the popper and we can safely hide the popper.The check has to be delayed since between
                        // leaving the old element and entering the new element the active element will always be the document/body itself.
                        setTimeout(() => {
                            if (!hasFocusRef.current) {
                                hidePopper(event);
                            }
                        }, 0);
                    }
                }
            }
        }
    });

    // This code aims to solve a bug on Chrome and Edge where no blur event will happen when the focused element becomes disable and that element lose the focus.
    // More info at: https://allyjs.io/tutorials/mutating-active-element.html
    const handleDocumentBlur = useEventCallback(() => {
        setTimeout(() => {
            if (!isNil(document.activeElement) && document.activeElement.nodeName === "BODY") {
                if (!isNil(activeElementRef.current) && activeElementRef.current.disabled) {
                    setFocusPopper(() => {
                        const containerElement = containerRef.current;

                        if (!isNil(containerElement)) {
                            containerElement.focus();
                        }
                    });
                }
            }
        }, 0);
    });

    useDocumentListener("blur", handleDocumentBlur, isVisible && hasFocusRef.current, true);

    return [
        handleContainerFocus,
        handleContainerBlur
    ];
}

export function useAutoControlledPopper(props) {
    const {
        show,
        defaultShow,
        triggerRef,
        popperRef,
        wrapperRef,
        onVisibilityChange,
        focusTriggerOnShow,
        focusTriggerOnEscape = true,
        focusFirstElementOnShow,
        focusFirstElementOnKeyboardShow,
        toggleOnSpacebar = true,
        toggleOnEnter = true,
        showOnKeys,
        hideOnEscape = true,
        hideOnBlur = true,
        hideOnOutsideClick = true,
        disabled
    } = props;
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const [isVisible, setIsVisible] = useControllableState(show, defaultShow, false);
    const lastTriggerEventRef = useRef();

    const setFocusTrigger = useCallback((delay = 0) => {
        setTimeout(() => {
            const triggerElement = triggerRef.current;

            if (!isNil(triggerElement)) {
                if (isFunction(triggerElement.focus)) {
                    triggerElement.focus();
                }
            }
        }, delay);
    }, [triggerRef]);

    const setFocusPopper = useCallback((onCannotFocus, delay = 0) => {
        setTimeout(() => {
            const popperElement = popperRef.current;

            if (!isNil(popperElement)) {
                const focusableElement = getFirstFocusableElement(popperElement);

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
        }, delay);
    }, [popperRef]);

    const showPopper = useCallback(event => {
        setIsVisible(true);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }, [onVisibilityChange, setIsVisible]);

    const hidePopper = useCallback(event => {
        setIsVisible(false);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }
    }, [onVisibilityChange, setIsVisible]);

    const togglePopper = useCallback(event => {
        if (isVisible) {
            hidePopper(event);
        } else {
            showPopper(event);
        }
    }, [isVisible, showPopper, hidePopper]);

    const [handleFocus, handleBlur] = useHideOnBlur({ wrapperRef, hideOnBlur, disabled }, isVisible, hidePopper, setFocusPopper);

    const handleTriggerClick = useEventCallback(event => {
        lastTriggerEventRef.current = event.type;

        if (!disabled) {
            togglePopper(event);
        }
    });

    const handleTriggerKeyDown = useEventCallback(event => {
        lastTriggerEventRef.current = event.type;

        if (!disabled) {
            const key = event.keyCode;

            switch (key) {
                case KEYS.space:
                    if (toggleOnSpacebar) {
                        event.preventDefault();
                        togglePopper(event);
                    }
                    break;
                case KEYS.enter:
                    if (toggleOnEnter) {
                        event.preventDefault();
                        togglePopper(event);
                    }
                    break;
                default:
                    if (!isNil(showOnKeys)) {
                        if (showOnKeys.includes(key)) {
                            event.preventDefault();
                            showPopper(event);
                        }
                    }
                    break;
            }
        }
    });

    const handleDocumentKeyDown = useEventCallback(event => {
        if (event.keyCode === KEYS.esc) {
            if (hideOnEscape) {
                hidePopper(event);

                if (focusTriggerOnEscape) {
                    setFocusTrigger();
                }
            }
        }
    });

    useDocumentListener("keydown", handleDocumentKeyDown, isVisible && !disabled);

    const handleDocumentClick = useEventCallback(event => {
        if (!triggerRef.current.contains(event.target) && !popperRef.current.contains(event.target)) {
            if (hideOnOutsideClick) {
                hidePopper(event);
            }
        }
    }, [hideOnOutsideClick, triggerRef, popperRef, hidePopper]);

    useDocumentListener("click", handleDocumentClick, isVisible && !disabled);

    useEffect(() => {
        if (isVisible) {
            if (focusTriggerOnShow) {
                setFocusTrigger();
            }
        }
    }, [isVisible, focusTriggerOnShow, setFocusTrigger]);

    useEffect(() => {
        if (isVisible) {
            if (focusFirstElementOnShow) {
                setFocusPopper();
            }
        }
    }, [isVisible, focusFirstElementOnShow, setFocusPopper]);

    useEffect(() => {
        if (isVisible) {
            if (focusFirstElementOnKeyboardShow) {
                const type = lastTriggerEventRef.current;

                if (!isNil(type) && /^key.+$/.test(type)) {
                    // HACK: Added a delay of 100ms to prevent an intermittent bug with the date pickers where the keyboard event will propagate to
                    // the calendar nav button and cause a month transition on render. Doesn't make much sense but it is what it is.
                    setFocusPopper(null, 100);
                }
            }
        }
    }, [isVisible, focusFirstElementOnKeyboardShow, setFocusPopper, lastTriggerEventRef]);

    return {
        isVisible,
        show: showPopper,
        hide: hidePopper,
        toggle: togglePopper,
        focusTrigger: setFocusTrigger,
        focusPopper: setFocusPopper,
        onTriggerClick: handleTriggerClick,
        onTriggerKeyDown: handleTriggerKeyDown,
        onWrapperFocus: handleFocus,
        onWrapperBlur: handleBlur
    };
}
