import { AutoControlledPopperContext } from "./AutoControlledPopperContext";
import { any, arrayOf, bool, func, node, number } from "prop-types";
import { augmentElement, mergeClasses, useChainedEventCallback, useMergedRefs } from "../../shared";
import { forwardRef, useState } from "react";
import { isNil } from "lodash";
import { useAutoControlledPopper } from "./useAutoControlledPopper";

const propTypes = {
    /**
     * A controlled show value that determined whether or not the popper is displayed.
     */
    show: bool,
    /**
     * The initial value of show when in auto controlled mode.
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
     * Whether or not the trigger will be rendered as fluid.
     */
    fluid: bool,
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
     * Ex. `[13]` for Enter
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
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    focusTriggerOnEscape: true,
    toggleOnSpacebar: true,
    toggleOnEnter: true,
    hideOnEscape: true,
    hideOnBlur: true,
    hideOnOutsideClick: true
};

export function InnerAutoControlledPopper({
    show,
    defaultShow,
    trigger,
    onVisibilityChange,
    onFocus,
    onBlur,
    fluid,
    position,
    focusTriggerOnShow,
    focusTriggerOnEscape,
    focusFirstElementOnShow,
    focusFirstElementOnKeyboardShow,
    toggleOnSpacebar,
    toggleOnEnter,
    showOnKeys,
    hideOnEscape,
    hideOnBlur,
    hideOnOutsideClick,
    disabled,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const [triggerElement, setTriggerElement] = useState();
    const [popperElement, setPopperElement] = useState();
    const [wrapperElement, setWrapperElement] = useState();

    const wrapperRef = useMergedRefs(setWrapperElement, forwardedRef);

    const {
        isVisible,
        onTriggerClick,
        onTriggerKeyDown,
        onWrapperFocus,
        onWrapperBlur
    } = useAutoControlledPopper({
        show,
        defaultShow,
        triggerElement,
        popperElement,
        wrapperElement,
        onVisibilityChange,
        focusTriggerOnShow,
        focusTriggerOnEscape,
        focusFirstElementOnShow,
        focusFirstElementOnKeyboardShow,
        toggleOnSpacebar,
        toggleOnEnter,
        showOnKeys,
        hideOnEscape,
        hideOnBlur,
        hideOnOutsideClick,
        disabled
    });

    const popperMarkup = !isNil(triggerElement) && augmentElement(children, {
        show: isVisible,
        triggerElement,
        ref: setPopperElement
    });

    const triggerMarkup = augmentElement(trigger, {
        onClick: onTriggerClick,
        onKeyDown: onTriggerKeyDown,
        ref: setTriggerElement
    });

    const handleWrapperFocus = useChainedEventCallback(onWrapperFocus, onFocus);
    const handleWrapperBlur = useChainedEventCallback(onWrapperBlur, onBlur);

    return (
        <AutoControlledPopperContext.Provider
            value={{
                isVisible,
                position
            }}
        >
            <div
                data-testid="auto-controlled-popper"
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
}

InnerAutoControlledPopper.propTypes = propTypes;
InnerAutoControlledPopper.defaultProps = defaultProps;

export const AutoControlledPopper = forwardRef((props, ref) => (
    <InnerAutoControlledPopper {...props} forwardedRef={ref} />
));
