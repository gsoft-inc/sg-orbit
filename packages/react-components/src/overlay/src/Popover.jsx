import { Children, forwardRef, useCallback, useRef, useState } from "react";
import { Overlay } from "./Overlay";
import { PopoverContext } from "./PopoverContext";
import { any, arrayOf, bool, func, instanceOf, number, oneOf, oneOfType } from "prop-types";
import {
    augmentElement,
    mergeClasses,
    resolveChildren,
    useAutoFocusChild,
    useControllableState,
    useEventCallback,
    useFocusManager,
    useFocusableScope,
    useMergedRefs
} from "../../shared";
import { isNil } from "lodash";
import { useOverlay } from "./useOverlay";
import { usePopoverPosition } from "./usePopoverPosition";
import { usePopoverTrigger } from "./usePopoverTrigger";
import { useRestoreFocus } from "./useRestoreFocus";

/*
SO (again):
- It will be offered has a basic Popover.
- Orbit components will not use this but will rater use all the hooks.
*/

/*
Select:
- must work in a form (submit value with an hidden value) - Will be specific to a select though and not to a Popover.
- clicking on a field label should focus the select (can't use label for I think)
- user must be able to set it's id.
- might have to support .focus() (also check if TextInput, NumberInput, PasswordInput still support .focus() ?)

- don't forget to handle a state OBJECT. Maybe use a reducer.

https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts
https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx
*/

const propTypes = {
    /**
     * Whether or not to show the overlay element.
     */
    show: bool,
    /**
     * The initial value of show when in auto controlled mode.
     */
    defaultShow: bool,
    /**
     * Position of the overlay element.
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
     * Called when the overlay is hidden.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the overlay is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * Allow to displace the overlay from its trigger.
     * Ex: `[10, -10]`
     */
    offset: arrayOf(number),
    /**
     * Whether or not the overlay should hide on escape keydown.
     */
    hideOnEscape: bool,
    /**
     * Whether or not the overlay should hide on blur.
     */
    hideOnBlur: bool,
    /**
     * Whether or not to restore the focus after the overlay is hidden.
     */
    restoreFocus: bool,
    /**
     * When true, disables automatic repositioning of the overlay, it will always be placed according to the position value.
     */
    pinned: bool,
    /**
     * Whether or not the overlay can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the overlay position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * A DOM element in which the overlay element will be appended via a React portal.
     */
    containerElement: instanceOf(HTMLElement),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerPopover({
    show,
    defaultShow,
    position = "bottom",
    onVisibilityChange,
    offset,
    hideOnEscape = true,
    hideOnBlur = true,
    restoreFocus = true,
    pinned,
    allowFlip = true,
    allowPreventOverflow = true,
    containerElement,
    className,
    style,
    children,
    forwardedRef,
    ...rest
}) {
    const [isVisible, setIsVisible] = useControllableState(show, defaultShow, false);
    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();

    const isVisibleRef = useRef(isVisible);
    const overlayRef = useMergedRefs(setOverlayElement, forwardedRef);

    const updateVisibility = useCallback((event, newVisibility) => {
        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, newVisibility);
        }

        setIsVisible(newVisibility);
        isVisibleRef.current = newVisibility;
    }, [onVisibilityChange, setIsVisible]);

    const hide = useCallback(event => {
        updateVisibility(event, false);
    }, [updateVisibility]);

    const [trigger, content] = Children.toArray(resolveChildren(children, { isVisible, hide }));

    if (isNil(trigger) || isNil(content)) {
        throw new Error("A popover must have exactly 2 children.");
    }

    const handleToggle = useEventCallback(event => {
        updateVisibility(event, !isVisible);
    });

    const handleHide = useEventCallback(event => {
        hide(event);
    });

    const { overlayProps } = useOverlay({
        isVisible,
        onHide: handleHide,
        // Do not hide on blur when the focus is on the trigger.
        canHideOnBlur: useCallback(target => target !== triggerElement, [triggerElement]),
        hideOnEscape,
        hideOnBlur,
        overlayRef
    });

    const { triggerProps, overlayProps: overlayTriggerProps } = usePopoverTrigger("dialog", { isVisible, onToggle: handleToggle });

    const { overlayStyles, overlayProps: overlayPositionProps } = usePopoverPosition({
        position,
        triggerElement,
        overlayElement,
        offset,
        allowFlip,
        boundaryElement: containerElement,
        allowPreventOverflow,
        pinned
    });

    const domScope = useFocusableScope(overlayRef);

    const focusManager = useFocusManager(domScope);

    useRestoreFocus(isVisibleRef, { isDisabled: !restoreFocus || !isVisible });

    useAutoFocusChild(focusManager, { isDisabled: !isVisible, onNotFound: useEventCallback(() => { overlayElement?.focus(); }) });

    const triggerMarkup = augmentElement(trigger, {
        ...triggerProps,
        ref: setTriggerElement
    });

    return (
        <>
            {triggerMarkup}
            <Overlay
                {...rest}
                {...overlayProps}
                {...overlayPositionProps}
                {...overlayTriggerProps}
                show={isVisible}
                className={mergeClasses(
                    "o-ui-popover",
                    className
                )}
                style={{
                    ...(style ?? {}),
                    ...overlayStyles
                }}
                containerElement={containerElement}
                ref={overlayRef}
            >
                <PopoverContext.Provider
                    value={{
                        isVisible,
                        hide
                    }}
                >
                    {content}
                </PopoverContext.Provider>
            </Overlay>
        </>
    );
}

InnerPopover.propTypes = propTypes;

export const Popover = forwardRef((props, ref) => (
    <InnerPopover {...props} forwardedRef={ref} />
));

Popover.displayName = "Popover";
