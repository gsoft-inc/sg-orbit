import "./PasswordInput.css";

import { IconButton } from "../../button";
import { PrivacyIcon, ViewIcon } from "../../icons";
import { TextInput } from "./TextInput";
import { bool, element, elementType, func, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNilOrEmpty, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { useState } from "react";

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
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Additional text to describe the input.
     */
    description: string,
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the text input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon: element,
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
     * Whether or not the input is readonly.
     */
    readOnly: bool,
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerPasswordInput({
    value,
    defaultValue,
    wrapperProps,
    forwardedRef,
    ...rest
}) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, "");
    const [isHidden, setIsHidden] = useState(true);

    const handleChange = useEventCallback(event => {
        setValue(event.target.value);
    });

    const handleShowValue = useEventCallback(() => {
        setIsHidden(x => !x);
    });

    const showButtonMarkup = !isNilOrEmpty(inputValue) && (
        <IconButton
            variant="ghost"
            onClick={handleShowValue}
            className="o-ui-password-input-show-button"
            title="Toggle password visibility"
            aria-label="Toggle password visibility"
        >
            {isHidden ? <ViewIcon /> : <PrivacyIcon />}
        </IconButton>
    );

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    value: inputValue,
                    onChange: handleChange,
                    wrapperProps: mergeProps(wrapperProps ?? {}, {
                        className: "o-ui-password-input"
                    }),
                    type: isHidden ? "password" : "text",
                    button: showButtonMarkup || undefined,
                    ref: forwardedRef
                }
            )}
        />
    );
}

InnerPasswordInput.propTypes = propTypes;

export const PasswordInput = forwardRef((props, ref) => (
    <InnerPasswordInput {...props} forwardedRef={ref} />
));

PasswordInput.displayName = "PasswordInput";
