import "./Select.css";

import { ChevronIcon } from "../../icons";
import { HiddenSelect } from "./HiddenSelect";
import { Listbox } from "../../listbox";
import { Overlay } from "../../overlay";
import { Text } from "../../text";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeProps, useSlots } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";
import { useSelect } from "./useSelect";

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
     * A controlled selected key.
     */
    selectedKey: string,
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey: string,
    /**
     * Temporary text that occupies the select trigger when no value is selected.
     */
    placeholder: string,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the select value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} selectedKey - The new selected key.
     * @returns {void}
     */
    onChange: func,
    /**
     * Called when the select open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["outline", "inline", "transparent"]),
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
     * Whether or not the select menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the overlay element.
     */
    zIndex: number,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerSelect(props) {
    const [fieldProps] = useFieldInputProps();

    const {
        open,
        defaultOpen,
        selectedKey: userSelectedKey,
        defaultSelectedKey,
        placeholder,
        required,
        validationState,
        onChange,
        onOpenChange,
        variant = "outline",
        direction = "bottom",
        autoFocus,
        name,
        fluid,
        disabled,
        allowFlip,
        allowPreventOverflow,
        zIndex,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        as: TriggerType = "button",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const { selectedKey, selectedItem, triggerProps, overlayProps, listboxProps } = useSelect(children, {
        open,
        defaultOpen,
        selectedKey: userSelectedKey,
        defaultSelectedKey,
        onChange,
        onOpenChange,
        direction,
        autoFocus,
        disabled,
        allowFlip,
        allowPreventOverflow,
        zIndex,
        ariaLabel,
        ariaLabelledBy,
        ref: forwardedRef
    });

    const { icon: selectedIcon, text: selectedText, "right-icon": selectedRightIcon } = useSlots(selectedItem?.content, {
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: "sm",
            className: "o-ui-select-value-left-icon"
        },
        text: {
            className: "o-ui-select-value"
        },
        "right-icon": {
            size: "sm",
            className: "o-ui-select-value-right-icon"
        }
    });

    const valueMarkup = !isNil(selectedItem) ? (
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
            <HiddenSelect
                name={name}
                selectedKey={selectedKey}
                required={required}
                validationState={validationState}
                disabled={disabled}
            />
            <TriggerType
                {...mergeProps(
                    rest,
                    triggerProps,
                    {
                        className: cssModule(
                            "o-ui-select-trigger",
                            variant,
                            validationState,
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover"
                        )
                    }
                )}
            >
                {valueMarkup}
                <ChevronIcon
                    className={direction === "bottom" ? "o-ui-rotate-90" : "o-ui-rotate-270"}
                    size="sm"
                />
            </TriggerType>
            <Overlay
                {...mergeProps(
                    overlayProps,
                    { className: "o-ui-select-menu" }
                )}
            >
                <Listbox {...listboxProps} />
            </Overlay>
        </>
    );
}

InnerSelect.propTypes = propTypes;

export const Select = forwardRef((props, ref) => (
    <InnerSelect {...props} forwardedRef={ref} />
));

Select.displayName = "Select";
