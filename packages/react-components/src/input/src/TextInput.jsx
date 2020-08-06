import "./TextInput.css";

import { EmbeddedIcon } from "../../icons";
import { InputLabel } from "./InputLabel";
import { InputMessage } from "./InputMessage";
import { bool, element, elementType, func, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { embedButton } from "../../button";
import { forwardRef } from "react";
import { mergeClasses, useChainedEventCallback, useControllableState } from "../../shared";
import { useInput } from "./useInput";

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
     * Label identifying the input.
     */
    label: node,
    /**
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Help text displayed beneath the input when `validateState` is undefined.
     */
    help: node,
    /**
     * Invalid message displayed beneath the input when `validateState` is `"invalid"`.
     */
    invalidMessage: node,
    /**
     * Valid message displayed beneath the input when `validateState` is `"valid"`.
     */
    validMessage: node,
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
     * Style to use.
     */
    variant: oneOf(["outline", "transparent"]),
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type: oneOf(["text", "password", "search", "url", "tel", "email"]),
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the value.
     */
    iconLeft: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the value.
     */
    iconRight: element,
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the value.
     */
    button: element,
    /**
     * Whether or not theinput take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not to render a loader.
     */
    loading: bool,
    /**
     * An input can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    variant: "outline",
    type: "text",
    as: "div"
};

export function InnerTextInput({
    id,
    value,
    defaultValue,
    placeholder,
    label,
    required,
    help,
    invalidMessage,
    validMessage,
    validationState,
    onChange,
    variant,
    type,
    autoFocus,
    autoFocusDelay,
    iconLeft,
    iconRight,
    button,
    disabled,
    readOnly,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    className,
    wrapperProps: userWrapperProps,
    as: ElementType,
    forwardedRef,
    ...rest
}) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const handleChange = useChainedEventCallback(onChange, event => {
        setValue(event.target.value);
    });

    const { wrapperProps, inputProps, labelProps, messageProps } = useInput({
        id,
        value: inputValue,
        placeholder,
        label,
        required,
        help,
        invalidMessage,
        validMessage,
        validationState,
        onChange: handleChange,
        variant,
        type,
        autoFocus,
        autoFocusDelay,
        disabled,
        readOnly,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        className,
        userWrapperProps,
        forwardedRef
    });

    const labelMarkup = labelProps && (
        <InputLabel {...labelProps} />
    );

    const messageMarkup = messageProps && (
        <InputMessage {...messageProps} />
    );

    const iconLeftMarkup = iconLeft && (
        <EmbeddedIcon size={size}>{iconLeft}</EmbeddedIcon>
    );

    const iconRightMarkup = iconRight && (
        <EmbeddedIcon size={size}>{iconRight}</EmbeddedIcon>
    );

    const buttonMarkup = button && embedButton(button, {
        size,
        variant: "ghost",
        color: "secondary",
        shape: "circular",
        className: "button"
    });

    return (
        <ElementType
            data-testid="text-input"
            {...wrapperProps}
            className={mergeClasses(
                "o-ui input text-input",
                iconLeftMarkup && "with-left-icon",
                iconRightMarkup && "with-right-icon",
                button && "with-button",
                wrapperProps.className
            )}
        >
            {labelMarkup}
            {iconLeftMarkup}
            <input
                {...rest}
                {...inputProps}
            />
            {iconRightMarkup}
            {buttonMarkup}
            {messageMarkup}
        </ElementType>
    );
}

InnerTextInput.propTypes = propTypes;
InnerTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput { ...props } forwardedRef={ref} />
));
