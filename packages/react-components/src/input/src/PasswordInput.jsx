import { EyeIcon, PrivacyIcon } from "../../icons";
import { IconButton } from "../../button";
import { TextInput } from "./TextInput";
import { bool, element, elementType, func, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useEventCallback } from "../../shared";
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
     * Help message displayed beneath the input when `validateState` is undefined.
     */
    helpMessage: node,
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
     * Called when the text input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["outline", "transparent"]),
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
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerPasswordInput({
    variant = "outline",
    forwardedRef,
    ...rest
}) {
    const [isHidden, setIsHidden] = useState(true);

    const handleClick = useEventCallback(() => {
        setIsHidden(x => !x);
    });

    return (
        <TextInput
            {...rest}
            variant={variant}
            type={isHidden ? "password" : "text"}
            button={
                <IconButton
                    variant="ghost"
                    onClick={handleClick}
                    title="Toggle password visibility"
                    aria-label="Toggle password visibility"
                >
                    {isHidden ? <EyeIcon /> : <PrivacyIcon />}
                </IconButton>
            }
            ref={forwardedRef}
        />
    );
}

InnerPasswordInput.propTypes = propTypes;

export const PasswordInput = forwardRef((props, ref) => (
    <InnerPasswordInput {...props} forwardedRef={ref} />
));

PasswordInput.displayName = "PasswordInput";
