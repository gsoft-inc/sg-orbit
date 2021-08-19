import { BoxProps as BoxPropsForDocumentation } from "../../box";
import { ChangeEvent,ChangeEventHandler, ComponentProps, ElementType, ForwardedRef, ReactElement, forwardRef } from "react";
import { EyeIcon, PrivacyIcon } from "../../icons";
import { IconButton } from "../../button";
import { TextInput, TextInputProps } from "./TextInput";
import { mergeProps, useControllableState, useEventCallback } from "../../shared";
import { useInputGroupTextInputProps } from "../../input-group";
import { useState } from "react";
import { wrappedInputPropsAdapter } from "../../input";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface InnerPasswordInputProps extends TextInputProps {
    /**
     * A controlled value.
     */
    value?: string | null;
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
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {string} value - The new input value.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
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
     * @ignore
     */
    as?: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerPasswordInput(props: InnerPasswordInputProps) {
    const [inputGroupProps] = useInputGroupTextInputProps();

    const {
        value,
        defaultValue,
        wrapperProps,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(inputGroupProps)
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");
    const [isHidden, setIsHidden] = useState(true);

    const handleChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    });

    const handleShowValue = useEventCallback(() => {
        setIsHidden(x => !x);
    });

    // Always show the button to play nice with password managers.
    const showButtonMarkup = (
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
            {...mergeProps(
                rest,
                {
                    value: inputValue,
                    onChange: handleChange,
                    wrapperProps: mergeProps(wrapperProps ?? {}, {
                        className: "o-ui-password-input"
                    }),
                    type: isHidden ? "password" : "text",
                    button: showButtonMarkup,
                    ref: forwardedRef
                } as const
            )}
        />
    );
}

export const PasswordInput = forwardRef<HTMLInputElement, Omit<InnerPasswordInputProps, "forwardedRef">>((props, ref) => (
    <InnerPasswordInput {...props} forwardedRef={ref} />
));

export type PasswordInputProps = ComponentProps<typeof PasswordInput>;

PasswordInput.displayName = "PasswordInput";
