import "./PasswordInput.css";

import { BoxProps as BoxPropsForDocumentation } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, SyntheticEvent } from "react";
import { EyeIcon, PrivacyIcon } from "../../icons";
import { IconButton } from "../../button";
import { TextInput, TextInputProps } from "./TextInput";
import { forwardRef, isNilOrEmpty, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { useState } from "react";

// used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface InnerPasswordInputProps {
    /**
     * A controlled value.
     */
    value?: string;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * Label identifying the input.
     */
    label?: string;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the text input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent) => void;
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon?: ReactElement;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * @ignore
     */
    readOnly?: boolean;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerPasswordInput({
    value,
    defaultValue,
    wrapperProps,
    forwardedRef,
    ...rest
}: InnerPasswordInputProps) {
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
            {isHidden ? <EyeIcon /> : <PrivacyIcon />}
        </IconButton>
    );

    return (
        <TextInput
            {...mergeProps<Partial<TextInputProps>[]>(
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

export const PasswordInput = forwardRef<InnerPasswordInputProps, "input">((props, ref) => (
    <InnerPasswordInput {...props} forwardedRef={ref} />
));

export type PasswordInputProps = ComponentProps<typeof PasswordInput>;

PasswordInput.displayName = "PasswordInput";
