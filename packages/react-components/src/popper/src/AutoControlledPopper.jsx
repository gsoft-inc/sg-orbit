import { AutoControlledPopperAdapter } from "./AutoControlledPopperAdapter";
import { AutoControlledPopperContext } from "./AutoControlledPopperContext";
import { AutoControlledPopperTrigger } from "./AutoControlledPopperTrigger";
import { any, arrayOf, bool, func, number } from "prop-types";
import { forwardRef, useRef, useState } from "react";
import { mergeClasses, useChainedEventCallback, useMergedRefs } from "../../shared";
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
     * Called when the popup open / close.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the popup is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * Whether the trigger will be rendered as fluid.
     */
    fluid: bool,
    /**
     * Whether to focus the trigger when the popper is made visible. When `true`, the trigger must expose a `focus` function in order to work.
     */
    focusTriggerOnShow: bool,
    /**
     * Whether to focus the trigger on escape keydown. When `true`, the trigger must expose a `focus` function in order to work.
     */
    focusTriggerOnEscape: bool,
    /**
     * Whether to focus the first element of the popper when the popper is shown.
     */
    focusFirstElementOnShow: bool,
    /**
     * Whether to focus the first element of the popper when the popper is shown on keydown.
     */
    focusFirstElementOnKeyboardShow: bool,
    /**
     * Additional [keys](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) to show the popper on keydown.
     * Ex. `[13]` for Enter
     */
    showOnKeys: arrayOf(number),
    /**
     * Whether to toggle the popper on spacebar keydown.
     */
    toggleOnSpacebar: bool,
    /**
     * Whether to toggle the popper on enter keydown.
     */
    toggleOnEnter: bool,
    /**
     * Whether the popper should hide on escape keydown.
     */
    hideOnEscape: bool,
    /**
     * Whether the popper should hide when it loose focus.
     */
    hideOnBlur: bool,
    /**
     * Whether the popper should hide when a click happens outside.
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
    onVisibilityChange,
    onFocus,
    onBlur,
    fluid,
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
    // Not the preferred solution to have a triggerRef AND a state value for the triggerElement but the date pickers
    // brokes on the second "click" event when we only use a triggerRef. Might be fixed once the date pickers are refactored.
    // A previous implementation was relying only on state values but the date pickers were not focused on ESC keydown event
    // because of a reference mismatch.
    const [triggerElement, setTriggerElement] = useState();

    const triggerRef = useMergedRefs(setTriggerElement);
    const popperRef = useRef();
    const wrapperRef = useMergedRefs(forwardedRef);

    const {
        isVisible,
        onTriggerClick,
        onTriggerKeyDown,
        onWrapperFocus,
        onWrapperBlur
    } = useAutoControlledPopper({
        show,
        defaultShow,
        triggerRef,
        popperRef,
        wrapperRef,
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

    const handleWrapperFocus = useChainedEventCallback(onWrapperFocus, onFocus);
    const handleWrapperBlur = useChainedEventCallback(onWrapperBlur, onBlur);

    return (
        <AutoControlledPopperContext.Provider
            value={{
                isVisible,
                fluid,
                triggerRef,
                popperRef,
                wrapperRef,
                triggerElement,
                onTriggerClick,
                onTriggerKeyDown
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
                {children}
            </div>
        </AutoControlledPopperContext.Provider>
    );
}

InnerAutoControlledPopper.propTypes = propTypes;
InnerAutoControlledPopper.defaultProps = defaultProps;

export const AutoControlledPopper = forwardRef((props, ref) => (
    <InnerAutoControlledPopper {...props} forwardedRef={ref} />
));

[InnerAutoControlledPopper, AutoControlledPopper].forEach(x => {
    x.Trigger = AutoControlledPopperTrigger;
    x.Popper = AutoControlledPopperAdapter;
});
