import "./Input.css";

import { Box } from "../../box";
import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, mergeProps, omitProps, useChainedEventCallback, useControllableState } from "../../shared";
import { forwardRef } from "react";
import { useFieldInputProps } from "../../field";
import { useInput } from "./useInput";
import { useInputButton, useInputIcon } from "./useInputContent";
import { useToolbarProps } from "../../toolbar";
import { wrappedInputPropsAdapter } from "./wrappedInputPropsAdapter";

const propTypes = {
    /**
     * A controlled value.
     */
    value: string,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue: string,
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder: string,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["outline", "transparent"]),
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type: oneOf(["text", "password", "search", "url", "tel", "email"]),
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon: element,
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button: element,
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not to render a loader.
     */
    loading: bool,
    /**
     * Whether or not the input is disabled.
     */
    disabled: bool,
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerTextInput(props) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        value,
        defaultValue,
        placeholder,
        required,
        validationState,
        onChange,
        variant = "outline",
        type = "text",
        autoFocus,
        icon,
        button,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        className,
        wrapperProps: userWrapperProps,
        as = "div",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        wrappedInputPropsAdapter(fieldProps)
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const handleChange = useChainedEventCallback(onChange, event => {
        setValue(event.target.value);
    });

    const {
        wrapperProps: { className: wrapperClassName, ...wrapperProps },
        inputProps
    } = useInput({
        cssModule: "o-ui-text-input",
        id,
        value: inputValue,
        placeholder,
        required,
        validationState,
        onChange: handleChange,
        variant,
        type,
        autoFocus,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        className,
        wrapperProps: userWrapperProps,
        forwardedRef
    });

    const iconMarkup = useInputIcon(icon, { disabled });

    const buttonMarkup = useInputButton(button, !disabled && !readOnly);

    const content = (
        <>
            {iconMarkup}
            <input
                {...mergeProps(
                    rest,
                    inputProps
                )}
            />
            {buttonMarkup}
        </>
    );

    return (
        <Box
            {...wrapperProps}
            className={mergeClasses(
                cssModule(
                    "o-ui-input",
                    iconMarkup && "has-icon",
                    buttonMarkup && "has-button"
                ),
                wrapperClassName
            )}
            as={as}
        >
            {content}
        </Box>
    );
}

InnerTextInput.propTypes = propTypes;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput {...props} forwardedRef={ref} />
));

TextInput.displayName = "TextInput";
