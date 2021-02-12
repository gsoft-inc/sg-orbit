import "./ComboBox.css";

import { HiddenComboBox } from "./HiddenComboBox";
import { Listbox } from "../../listbox";
import { Overlay } from "../../overlay";
import { Text } from "../../text";
import { TextInput } from "../../input";
import { any, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, cssModule, mergeClasses, mergeProps } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useComboBox } from "./useComboBox";
import { useFieldInputProps } from "../../field";

/*
TODO:
- inputValue
- items
*/

const propTypes = {
    /**
     * Whether or not to open the combobox element.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
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
     * Temporary text that occupies the combobox trigger when no value is selected.
     */
    placeholder: string,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the combobox should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the combobox value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} selectedKey - The new selected key.
     * @returns {void}
     */
    onChange: func,
    /**
     * Called when the combobox open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * A trigger icon.
     */
    icon: element,
    /**
     * The direction the combobox menu will open relative to the input.
     */
    direction: oneOf(["bottom", "top"]),
    /**
     * The horizontal alignment of the combobox menu relative to the input.
     */
    align: oneOf(["start", "end"]),
    /**
     * Whether or not the combobox should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the combobox take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the combobox is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the combobox menu can flip when it will overflow it's boundary area.
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
     * Additional props to render on the menu of options.
     */
    menuProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerComboBox(props) {
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        open,
        defaultOpen,
        selectedKey: selectedKeyProp,
        defaultSelectedKey,
        placeholder,
        required,
        validationState,
        onChange,
        onOpenChange,
        icon,
        direction = "bottom",
        align = "start",
        autoFocus,
        name,
        fluid,
        disabled,
        allowFlip = true,
        allowPreventOverflow = true,
        zIndex,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        // Usually provided by the field inputs.
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        menuProps,
        as: TriggerType = TextInput,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const { selectedKey, selectedItem, triggerProps, overlayProps, listboxProps } = useComboBox(children, {
        id,
        open,
        defaultOpen,
        selectedKey: selectedKeyProp,
        defaultSelectedKey,
        onChange,
        onOpenChange,
        direction,
        align,
        autoFocus,
        disabled,
        allowFlip,
        allowPreventOverflow,
        zIndex,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        menuProps,
        ref: forwardedRef
    });

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-combobox-icon",
        size: "sm"
    });

    return (
        <>
            <HiddenComboBox
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
                        value: selectedItem?.text ?? "",
                        placeholder: isNil(selectedItem) ? placeholder : undefined,
                        icon: iconMarkup,
                        className: cssModule(
                            "o-ui-combobox-trigger",
                            validationState,
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover"
                        )
                    }
                )}
            />
            <Overlay
                {...overlayProps}
                zIndex={zIndex}
            >
                <Listbox {...listboxProps} />
            </Overlay>
        </>
    );
}

InnerComboBox.propTypes = propTypes;

export const ComboBox = forwardRef((props, ref) => (
    <InnerComboBox {...props} forwardedRef={ref} />
));

ComboBox.displayName = "ComboBox";
