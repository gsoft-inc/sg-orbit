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
     * Whether the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the text input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * Style to use.
     */
    variant: oneOf(["outline", "transparent"]),
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
    iconLeft: element,
    /**
     * Whether theinput take up the width of its container.
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

const defaultProps = {
    variant: "outline",
    as: "div"
};

export function InnerPasswordInput(props) {
    const [isHidden, setIsHidden] = useState(true);

    const handleClick = useEventCallback(() => {
        setIsHidden(x => !x);
    });

    return (
        <TextInput
            {...props}
            type={isHidden ? "password" : "text"}
            button={
                <IconButton
                    variant="ghost"
                    onClick={handleClick}
                >
                    {isHidden ? <EyeIcon /> : <PrivacyIcon />}
                </IconButton>
            }
        />
    );
}

InnerPasswordInput.propTypes = propTypes;
InnerPasswordInput.defaultProps = defaultProps;

export const PasswordInput = forwardRef((props, ref) => (
    <InnerPasswordInput { ...props } forwardedRef={ref} />
));
