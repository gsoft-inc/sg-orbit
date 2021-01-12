import "./Select.css";

import { ChevronIcon } from "../../icons";
import { KEYS, mergeClasses, mergeProps, useAutoFocus, useChainedEventCallback, useControllableState, useEventCallback, useFocusScope, useMergedRefs, useSlots } from "../../shared";
import { ListboxBase } from "../../listbox";
import { Overlay, useOverlay, usePopoverPosition, usePopoverTrigger, useRestoreFocus } from "../../overlay";
import { Text } from "../../text";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { isNil, isNumber } from "lodash";
import { useCollectionBuilder } from "../../collection";

/*
Select:
- must work in a form (submit value with an hidden value) - Will be specific to a select though and not to a Popover.
- clicking on a field label should focus the select (can't use label for this I think) - not sure how it will integrate with Field, have a jest test.
- user must be able to set it's id.
- might have to support .focus() (also check if TextInput, NumberInput, PasswordInput still support .focus() ?)

https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/useSelect.ts
https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/select/src/HiddenSelect.tsx
*/

/*
Was thinkink in the beginning about making a Picker but now I do prefer a Select (everybody know what is a Select) and for the HTML version will make
an HtmlSelect component
*/

/*
Should also support:
    - items prop?
    - empty selection?
*/

/*
PROBLEMS:
    - can focus back to the trigger then can't close on blur or esc -> maybe just close when focusing back to the trigger?
    - restoreFocus doesn't work when selecting a value
*/

const propTypes = {
    /**
     * Whether or not to open the select element.
     */
    open: bool,
    /**
     * The initial value of show when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * A controlled array holding the currently selected key(s).
     */
    selectedKey: oneOfType([string, arrayOf(string)]),
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey: oneOfType([string, arrayOf(string)]),
    /**
     * Temporary text that occupies the select trigger when no value is selected.
     */
    placeholder: string,
    /**
     * Called when the select value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} selectedKey - The new selected key.
     * @returns {void}
     */
    onChange: func,
    /**
     * Called when the select visibility change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isVisible - Indicate if the select is visible.
     * @returns {void}
     */
    onVisibilityChange: func,
    /**
     * The horizontal alignment of the select menu relative to the input target.
     */
    align: oneOf(["start", "end"]),
    /**
     * The direction the select menu will open relative to the input.
     */
    direction: oneOf(["bottom", "top"]),
    /**
     * Whether or not the select should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the select take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the select is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the select is readonly.
     */
    readOnly: bool,
    /**
     * Whether or not the select menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * A label providing an accessible name to the select. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerSelect({
    open,
    defaultOpen,
    selectedKey: controlledKey,
    defaultSelectedKey,
    onChange,
    onVisibilityChange,
    onKeyDown,
    placeholder,
    align = "start",
    direction = "bottom",
    autoFocus,
    fluid,
    disabled,
    readOnly,
    allowFlip,
    allowPreventOverflow,
    "aria-label": ariaLabel,
    active,
    focus,
    hover,
    as: TriggerType = "button",
    children,
    forwardedRef,
    ...rest
}) {
    const [isVisible, setIsVisible] = useControllableState(open, defaultOpen, false);
    const [selectedKey, setSelectedKey] = useControllableState(controlledKey, defaultSelectedKey, null);

    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();

    const [focusScope, setFocusRef] = useFocusScope();

    const triggerRef = useMergedRefs(setTriggerElement, forwardedRef);
    const overlayRef = useMergedRefs(setOverlayElement, setFocusRef);

    const defaultFocusedKeyRef = useRef(null);

    const setVisibility = useCallback((event, newVisibility) => {
        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, newVisibility);
        }

        setIsVisible(newVisibility);
    }, [onVisibilityChange, setIsVisible]);

    const close = useCallback(event => {
        setVisibility(event, false);
        defaultFocusedKeyRef.current = null;
    }, [setVisibility]);

    const renderProps = useMemo(() => ({ isOpen: isVisible, close }), [isVisible, close]);

    const nodes = useCollectionBuilder(children, renderProps);

    const handleTriggerToggle = useEventCallback(event => {
        setVisibility(event, !isVisible);
    });

    const handleClose = useEventCallback(event => {
        close(event);
    });

    const handleSelectOption = useChainedEventCallback(onChange, (event, newSelectedKey) => {
        setSelectedKey(newSelectedKey);
        close(event);
    });

    const handleKeyDown = useChainedEventCallback(onKeyDown, event => {
        switch (event.keyCode) {
            case KEYS.down:
                defaultFocusedKeyRef.current = nodes[0]?.itemKey;
                setVisibility(event, true);
                break;
            case KEYS.up:
                defaultFocusedKeyRef.current = nodes[nodes.length - 1]?.itemKey;
                setVisibility(event, true);
                break;
        }
    });

    const { overlayProps } = useOverlay({
        isVisible,
        onHide: handleClose,
        // Do not hide on blur when the focus is on the trigger.
        canHideOnBlur: useCallback(target => target !== triggerElement, [triggerElement]),
        hideOnEscape: true,
        hideOnBlur: true,
        overlayRef
    });

    const { triggerProps, overlayProps: overlayTriggerProps } = usePopoverTrigger("listbox", { isVisible, onToggle: handleTriggerToggle });

    const { overlayStyles, overlayProps: overlayPositionProps } = usePopoverPosition(triggerElement, overlayElement, {
        position: `${direction}-${align}`,
        offset: [0, 4],
        allowFlip,
        allowPreventOverflow
    });

    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !isVisible });

    useAutoFocus(triggerRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const selectedNode = nodes.find(x => x.itemKey === selectedKey);

    const { icon: selectedIcon, text: selectedText, "right-icon": selectedRightIcon } = useSlots(selectedNode?.content, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: "sm",
            className: "o-ui-select-value-left-icon"
        },
        text: {
            className: "o-ui-select-value-label"
        },
        "right-icon": {
            size: "sm",
            className: "o-ui-select-value-right-icon"
        }
    });

    const value = !isNil(selectedNode) ? (
        <div className="o-ui-select-value">
            {selectedIcon}
            {selectedText}
            {selectedRightIcon}
        </div>
    ) : (
        <span className="o-ui-select-placeholder">{placeholder}</span>
    );

    return (
        <>
            <TriggerType
                {...mergeProps(
                    rest,
                    triggerProps,
                    {
                        onKeyDown: !isVisible ? handleKeyDown : undefined,
                        className: mergeClasses(
                            "o-ui-select-trigger",
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover",
                            readOnly && "readonly"
                        ),
                        disabled,
                        "aria-readonly": readOnly,
                        ref: triggerRef
                    }
                )}
            >
                {value}
                <ChevronIcon className={direction === "bottom" ? "o-ui-rotate-90" : "o-ui-rotate-270"} size="sm" />
            </TriggerType>
            <Overlay
                {...mergeProps(
                    overlayProps,
                    overlayPositionProps,
                    overlayTriggerProps,
                    restoreFocusProps,
                    {
                        show: isVisible,
                        className: "o-ui-select-menu",
                        style: overlayStyles,
                        ref: overlayRef
                    }
                )}
            >
                <ListboxBase
                    nodes={nodes}
                    selectedKey={selectedKey}
                    defaultFocusedKey={defaultFocusedKeyRef.current}
                    onChange={handleSelectOption}
                    autoFocus
                    aria-label={ariaLabel}
                />
            </Overlay>
        </>
    );
}

InnerSelect.propTypes = propTypes;

export const Select = forwardRef((props, ref) => (
    <InnerSelect {...props} forwardedRef={ref} />
));

Select.displayName = "Select";
