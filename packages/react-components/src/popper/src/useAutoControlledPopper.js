import { AutoControlledPopperContext } from "./AutoControlledPopperContext";
import {
    KEYS,
    augmentElement,
    mergeClasses,
    useAutoControlledState,
    useChainedEventCallback,
    useDocumentListener,
    useEventCallback,
    useMergedRefs
} from "../../shared";
import { Popper, createPopper } from "./Popper";
import { isFunction, isNil } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";

function throwWhenMutuallyExclusivePropsAreProvided({ focusTriggerOnShow, focusFirstElementOnKeyboardShow }) {
    if (focusTriggerOnShow && focusFirstElementOnKeyboardShow) {
        throw new Error("AutoControlledPopper - \"focusTriggerOnShow\" and \"focusFirstElementOnKeyboardShow\" props cannot be both \"true\".");
    }
}

function getFirstFocusableElement(container) {
    return container.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
}

function useHideOnBlur({ hideOnBlur, disabled }, isVisible, hidePopper, setFocusPopper, containerRef) {
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
                        if (!isNil(containerRef.current)) {
                            containerRef.current.focus();
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
        trigger,
        onVisibilityChange,
        onFocus,
        onBlur,
        fluid,
        zIndex,
        position,
        pinned,
        noWrap,
        offset,
        popper = Popper,
        popperModifiers,
        popperOptions,
        portalContainerElement,
        noPortal,
        animate,
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
        disabled,
        className,
        forwardedRef,
        ...rest
    } = props;
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const [isVisible, setIsVisible] = useAutoControlledState(show, defaultShow, false);
    const [triggerElement, setTriggerElement] = useState();
    const [popperElement, setPopperElement] = useState();

    const lastTriggerEventRef = useRef();
    const wrapperRef = useMergedRefs(forwardedRef);

    const setFocusTrigger = useCallback(() => {
        setTimeout(() => {
            if (!isNil(triggerElement)) {
                if (isFunction(triggerElement.focus)) {
                    triggerElement.focus();
                }
            }
        }, 0);
    }, [triggerElement]);

    const setFocusPopper = useCallback((onCannotFocus, delay = 0) => {
        setTimeout(() => {
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
    }, [popperElement]);

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

    const [handleFocus, handleBlur] = useHideOnBlur({ hideOnBlur, disabled }, isVisible, hidePopper, setFocusPopper, wrapperRef);

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
        if (!triggerElement.contains(event.target) && !popperElement.contains(event.target)) {
            if (hideOnOutsideClick) {
                hidePopper(event);
            }
        }
    }, [hideOnOutsideClick, triggerElement, popperElement, hidePopper]);

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

    const handleWrapperFocus = useChainedEventCallback(handleFocus, onFocus);
    const handleWrapperBlur = useChainedEventCallback(handleBlur, onBlur);

    const render = content => {
        const popperMarkup = !isNil(triggerElement) && createPopper(popper, {
            show: isVisible,
            triggerElement,
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
            style: {
                zIndex
            },
            children: content,
            ref: setPopperElement
        });

        const triggerMarkup = augmentElement(trigger, {
            onClick: handleTriggerClick,
            onKeyDown: handleTriggerKeyDown,
            ref: setTriggerElement
        });

        return (
            <AutoControlledPopperContext.Provider
                value={{
                    isVisible,
                    position
                }}
            >
                <div
                    data-testid="popper-trigger"
                    tabIndex="-1"
                    {...rest}
                    // Can use focus and blur since the React implementation of those events is not standard to the specs and bubbles.
                    // For more info: https://github.com/facebook/react/issues/6410
                    onFocus={handleWrapperFocus}
                    onBlur={handleWrapperBlur}
                    className={mergeClasses(
                        "outline-0",
                        !fluid && "dib",
                        className
                    )}
                    ref={wrapperRef}
                >
                    {triggerMarkup}
                    {popperMarkup}
                </div>
            </AutoControlledPopperContext.Provider>
        );
    };

    return {
        renderPopper: render,
        showPopper,
        hidePopper,
        togglePopper,
        focusTrigger: setFocusTrigger,
        focusPopper: setFocusPopper
    };
}
