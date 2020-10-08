import "./Input.css";

import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, mergeProps, omitProps, useChainedEventCallback, useControllableState } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useFieldInput } from "../../field";
import { useInput } from "./useInput";
import { useInputClearButton, useInputIcon } from "./useInputContent";
import { useToolbarContext } from "../../toolbar";
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
     * Called when the clear button is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClear: func,
    /**
     * The style to use.
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
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the value.
     */
    icon: element,
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the value.
     */
    // button: element,
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
    size: oneOf(["sm", "md", "lg"]),
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
    const [toolbarProps] = useToolbarContext();
    const [fieldProps] = useFieldInput();

    const {
        id,
        value,
        defaultValue,
        placeholder,
        required,
        validationState,
        onChange,
        onClear,
        variant = "outline",
        type = "text",
        autoFocus,
        autoFocusDelay,
        icon,
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

    const clearMarkup = useInputClearButton(!isNil(onClear) && !disabled && !readOnly, {
        onClick: onClear,
        size
    });

    const content = (
        <>
            {iconMarkup}
            <input
                data-testid="text-input"
                {...rest}
                {...inputProps}
            />
            {clearMarkup}
        </>
    );

    return (
        <ElementType
            {...wrapperProps}
            className={mergeClasses(
                cssModule(
                    "o-ui-input",
                    iconMarkup && "has-icon",
                    clearMarkup && "has-clear-button"
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
