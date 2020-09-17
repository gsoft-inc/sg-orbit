import "./Input.css";

import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, mergeProps, omitProps, useChainedEventCallback, useControllableState } from "../../shared";
import { forwardRef } from "react";
import { useFieldInput } from "../../field";
import { useInput } from "./useInput";
import { useInputButton, useInputIcon } from "./useInputContent";
import { useToolbar } from "../../toolbar";

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
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether the input should display as "valid" or "invalid".
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
     * Whether the input should autofocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the value.
     */
    icon: element,
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the value.
     */
    button: element,
    /**
     * Whether the input take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether to render a loader.
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

export function InnerTextInput(props) {
    const toolbarProps = useToolbar();
    const fieldProps = useFieldInput();

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
        autoFocusDelay,
        icon,
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
        as: ElementType = "div",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["isInToolbar", "orientation"]),
        omitProps(fieldProps, ["isInField"])
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
        wrapperProps: userWrapperProps,
        forwardedRef
    });

    const iconMarkup = useInputIcon(icon, { size, disabled });

    const buttonMarkup = useInputButton(button, !disabled && !readOnly, { size });

    const content = (
        <>
            {iconMarkup}
            <input
                data-testid="text-input"
                {...rest}
                {...inputProps}
            />
            {buttonMarkup}
        </>
    );

    return (
        <ElementType
            {...wrapperProps}
            className={mergeClasses(
                cssModule(
                    "o-ui-input",
                    iconMarkup && "has-icon",
                    buttonMarkup && "has-button"
                ),
                wrapperClassName
            )}
        >
            {content}
        </ElementType>
    );
}

InnerTextInput.propTypes = propTypes;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput {...props} forwardedRef={ref} />
));
