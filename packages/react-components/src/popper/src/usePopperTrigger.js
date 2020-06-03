import { KEYS, mergeClasses, useAutoControlledState, useCombinedRefs, useDocumentListener } from "../../shared";
import { Popper, createPopper } from "./Popper";
import { cloneElement, useCallback, useEffect, useRef, useState } from "react";
import { isFunction, isNil } from "lodash";

function throwWhenMutuallyExclusivePropsAreProvided({ focusTriggerOnShow, focusFirstElementOnKeyboardShow }) {
    if (focusTriggerOnShow && focusFirstElementOnKeyboardShow) {
        throw new Error("PopperTrigger - \"focusTriggerOnShow\" and \"focusFirstElementOnKeyboardShow\" props cannot be both \"true\".");
    }
}

function getFirstFocusableElement(container) {
    return container.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
}

function useShowPopper({ onVisibilityChange }, setIsVisible) {
    return useCallback(event => {
        setIsVisible(true);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, true);
        }
    }, [onVisibilityChange, setIsVisible]);
}

function useHidePopper({ onVisibilityChange }, setIsVisible) {
    return useCallback(event => {
        setIsVisible(false);

        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, false);
        }
    }, [onVisibilityChange, setIsVisible]);
}

function useTogglePopper(isVisible, showPopper, hidePopper) {
    return useCallback(event => {
        if (isVisible) {
            hidePopper(event);
        } else {
            showPopper(event);
        }
    }, [isVisible, showPopper, hidePopper]);
}

function useSetFocusTrigger(triggerElement) {
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

function useSetFocusPopper(popperElement) {
    return useCallback(onCannotFocus => {
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
        }, 0);
    }, [popperElement]);
}

function useSetFocusWhenTransitioningToVisible({ focusTriggerOnShow, focusFirstElementOnShow, focusFirstElementOnKeyboardShow }, isVisible, lastTriggerEventRef, setFocusTrigger, setFocusPopper) {
    useEffect(() => {
        if (isVisible) {
            if (focusTriggerOnShow) {
                setFocusTrigger();
            }
            else if (focusFirstElementOnShow) {
                setFocusPopper();
            }
            else if (focusFirstElementOnKeyboardShow) {
                const type = lastTriggerEventRef.current;

                if (!isNil(type) && /^key.+$/.test(type)) {
                    setFocusPopper();
                }
            }
        }
    }, [focusTriggerOnShow, focusFirstElementOnShow, focusFirstElementOnKeyboardShow, isVisible, lastTriggerEventRef, setFocusTrigger, setFocusPopper]);
}

function useHandleTriggerToggle({ disabled }, lastTriggerEventRef, togglePopper) {
    return useCallback(event => {
        lastTriggerEventRef.current = event.type;

        if (!disabled) {
            togglePopper(event);
        }
    }, [disabled, lastTriggerEventRef, togglePopper]);
}

function useHandleTriggerKeyDown({ disabled, toggleOnSpacebar, toggleOnEnter, showOnKeys }, isVisible, lastTriggerEventRef, showPopper, togglePopper) {
    // Using a stringify version of showOnKeys since an array value is usually different on every render.
    const additionalKeys = JSON.stringify(showOnKeys || []);

    return useCallback(event => {
        lastTriggerEventRef.current = event.type;

        if (!disabled) {
            const key = event.keyCode;

            if (key === KEYS.space) {
                if (toggleOnSpacebar) {
                    event.preventDefault();
                    togglePopper(event);
                }
            } else if (key === KEYS.enter) {
                if (toggleOnEnter) {
                    event.preventDefault();
                    togglePopper(event);
                }
            } else if (!isNil(showOnKeys)) {
                if (showOnKeys.includes(key)) {
                    event.preventDefault();
                    showPopper(event);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        disabled,
        toggleOnSpacebar,
        toggleOnEnter,
        additionalKeys,
        isVisible,
        lastTriggerEventRef,
        showPopper,
        togglePopper
    ]);
}

function useHandleWrapperFocus({ disabled, onFocus }, hasFocusRef, activeElementRef) {
    return useCallback(event => {
        if (!disabled) {
            hasFocusRef.current = true;
            activeElementRef.current = document.activeElement;
        }

        if (!isNil(onFocus)) {
            onFocus(event);
        }
    }, [disabled, onFocus, hasFocusRef, activeElementRef]);
}

// // Hiding the popper on blur will:
// // - hide on outside click
// // - hide on blur
function useHandleWrapperBlur({ disabled, hideOnBlur, onBlur }, isVisible, hasFocusRef, activeElementRef, hidePopper) {
    return useCallback(event => {
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

        if (!isNil(onBlur)) {
            onBlur(event);
        }
    }, [disabled, hideOnBlur, onBlur, isVisible, hasFocusRef, activeElementRef, hidePopper]);
}

function useHandleDocumentKeyDown({ hideOnEscape, focusTriggerOnEscape, disabled }, isVisible, hidePopper, setFocusTrigger) {
    const handler = useCallback(event => {
        if (event.keyCode === KEYS.esc) {
            if (hideOnEscape) {
                hidePopper(event);

                if (focusTriggerOnEscape) {
                    setFocusTrigger();
                }
            }
        }
    }, [hideOnEscape, focusTriggerOnEscape, hidePopper, setFocusTrigger]);

    useDocumentListener("keydown", handler, isVisible && !disabled);
}

// This code aims to solve a bug where no blur event will happen when the focused element becomes disable and that element lose the focus.
// More info at: https://allyjs.io/tutorials/mutating-active-element.html
function useHandleDocumentBlur(isVisible, hasFocusRef, activeElementRef, wrapperRef, setFocusPopper) {
    const handler = useCallback(() => {
        setTimeout(() => {
            // Chrome and Edge move the focus to the body when the active element becomes disabled.
            if (document.activeElement.nodeName === "BODY") {
                if (!isNil(activeElementRef.current) && activeElementRef.current.disabled) {
                    setFocusPopper(() => {
                        if (!isNil(wrapperRef.current)) {
                            wrapperRef.current.focus();
                        }
                    });
                }

            } else {
                // Firefox doesn't switch focus to body, it keeps it on the disabled element and doesn't trigger a blur event when another element is focused.
                // That's an ugly hack to fix this.
                setTimeout(() => {
                    if (document.activeElement.disabled) {
                        setFocusPopper(() => {
                            if (!isNil(wrapperRef.current)) {
                                wrapperRef.current.focus();
                            }
                        });
                    }
                }, 100);
            }
        }, 0);
    }, [activeElementRef, wrapperRef, setFocusPopper]);

    useDocumentListener("blur", handler, isVisible && hasFocusRef.current, true);
}

function useHandleDocumentClick({ hideOnOutsideClick, disabled }, isVisible, triggerElement, popperElement, hidePopper) {
    const handler = useCallback(event => {
        if (!triggerElement.contains(event.target) && !popperElement.contains(event.target)) {
            if (hideOnOutsideClick) {
                hidePopper(event);
            }
        }
    }, [hideOnOutsideClick, triggerElement, popperElement, hidePopper]);

    console.log(isVisible);

    useDocumentListener("click", handler, isVisible && !disabled);
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

function useTriggerRenderer({ trigger, toggleHandler, disabled }, handleTriggerToggle, handleTriggerKeyDown, setTriggerElement) {
    const ref = useCombinedRefs(setTriggerElement, !isNil(trigger.ref) ? trigger.ref : undefined);

    return () => {
        if (!disabled) {
            return cloneElement(trigger, {
                // TODO: disabled here might not be a good idea since if there was an original handler it would not be called.
                [toggleHandler]: !disabled ? getToggleHandler(trigger, toggleHandler, handleTriggerToggle) : undefined,
                onKeyDown: !disabled ? handleTriggerKeyDown : undefined,
                ref: ref
            });
        }

        return trigger;
    };
}

function getPopperElement(popper, triggerElement, content) {
    if (!isNil(popper)) {
        return createPopper(popper, {
            triggerElement,
            children: content
        });
    }

    return <Popper triggerElement={triggerElement} children={content} />;
}

function usePopperRenderer(
    { zIndex, position, pinned, noWrap, offset, disabled, popper, popperModifiers, popperOptions, portalContainerElement, noPortal, animate, popperClassName, popperStyle },
    isVisible,
    triggerElement,
    setPopperElement
) {
    return content => {
        if (!isNil(triggerElement)) {
            const element = getPopperElement(popper, triggerElement, content);

            const styles = {
                ...(element.style || {}),
                zIndex,
                ...(popperStyle || {})
            };

            return cloneElement(element, {
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
                className: popperClassName,
                style: styles,
                ref: setPopperElement
            });
        }
    };
}

function useRenderer({ fluid, className, rest }, handleWrapperFocus, handleWrapperBlur, wrapperRef, trigger, renderPopper) {
    return content => {
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
                onFocus={handleWrapperFocus}
                onBlur={handleWrapperBlur}
                className={classes}
                ref={wrapperRef}
            >
                {trigger}
                {renderPopper(content)}
            </div>
        );
    };
}

export function usePopperTrigger(props) {
    const {
        show,
        defaultShow,
        trigger,
        toggleHandler,
        onVisibilityChange,
        onFocus,
        onBlur,
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
        popperClassName,
        popperStyle,
        forwardedRef,
        ...rest
    } = props;
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const [isVisible, setIsVisible] = useAutoControlledState(show, defaultShow, false);
    const [triggerElement, setTriggerElement] = useState();
    const [popperElement, setPopperElement] = useState();

    const hasFocusRef = useRef();
    const activeElementRef = useRef();
    const lastTriggerEventRef = useRef();
    const wrapperRef = useCombinedRefs(forwardedRef);

    const setFocusTrigger = useSetFocusTrigger(triggerElement);
    const setFocusPopper = useSetFocusPopper(popperElement);
    const showPopper = useShowPopper({ onVisibilityChange }, setIsVisible);
    const hidePopper = useHidePopper({ onVisibilityChange }, setIsVisible);
    const togglePopper = useTogglePopper(isVisible, showPopper, hidePopper);

    useSetFocusWhenTransitioningToVisible({ focusTriggerOnShow, focusFirstElementOnShow, focusFirstElementOnKeyboardShow }, isVisible, lastTriggerEventRef, setFocusTrigger, setFocusPopper);

    const handleTriggerToggle = useHandleTriggerToggle({ disabled }, lastTriggerEventRef, togglePopper);
    const handleTriggerKeyDown = useHandleTriggerKeyDown({ disabled, toggleOnSpacebar, toggleOnEnter, showOnKeys }, isVisible, lastTriggerEventRef, showPopper, togglePopper);
    const handleWrapperFocus = useHandleWrapperFocus({ disabled, onFocus }, hasFocusRef, activeElementRef);
    const handleWrapperBlur = useHandleWrapperBlur({ disabled, hideOnBlur, onBlur }, isVisible, hasFocusRef, activeElementRef, hidePopper);

    useHandleDocumentKeyDown({ hideOnEscape, focusTriggerOnEscape, disabled }, isVisible, hidePopper, setFocusTrigger);
    useHandleDocumentBlur(isVisible, hasFocusRef, activeElementRef, wrapperRef, setFocusPopper);
    useHandleDocumentClick({ hideOnOutsideClick, disabled }, isVisible, triggerElement, popperElement, hidePopper);

    const renderTrigger = useTriggerRenderer({ trigger, toggleHandler, disabled }, handleTriggerToggle, handleTriggerKeyDown, setTriggerElement);

    const renderPopper = usePopperRenderer(
        { zIndex, position, pinned, noWrap, offset, disabled, popper, popperModifiers, popperOptions, portalContainerElement, noPortal, animate, popperClassName, popperStyle },
        isVisible,
        triggerElement,
        setPopperElement);

    const render = useRenderer({ fluid, className, rest }, handleWrapperFocus, handleWrapperBlur, wrapperRef, renderTrigger(), renderPopper);

    return {
        renderPopper: render,
        showPopper,
        hidePopper,
        togglePopper,
        focusTrigger: setFocusTrigger,
        focusPopper: setFocusPopper
    };
}
