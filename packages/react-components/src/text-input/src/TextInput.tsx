import "./TextInput.css";

import { Box, BoxProps } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, SyntheticEvent } from "react";
import { InteractionStatesProps, cssModule, forwardRef, mergeProps, omitProps, useControllableState, useEventCallback } from "../../shared";
import { useFieldInputProps } from "../../field";
import { useInput, useInputButton, useInputIcon, wrappedInputPropsAdapter } from "../../input";
import { useToolbarProps } from "../../toolbar";

export interface InnerTextInputProps extends InteractionStatesProps {
    /**
     * @ignore
     */
    id?: string;
    /**
     * A controlled value.
     */
    value?: string,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string,
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string,
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
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange?(event: SyntheticEvent): void,
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type?: "text" | "password" | "search" | "url" | "tel" | "email";
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon?: ReactElement,
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button?: ReactElement,
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}

export function InnerTextInput(props: InnerTextInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        value,
        defaultValue,
        placeholder,
        required,
        validationState,
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
        wrapperProps: userWrapperProps,
        as: TriggerType = "input",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        wrappedInputPropsAdapter(fieldProps)
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const handleChange = useEventCallback(event => {
        setValue(event.target.value);
    });

    const { wrapperProps, inputProps } = useInput({
        cssModule: "o-ui-text-input",
        id,
        value: inputValue,
        placeholder,
        required,
        validationState,
        onChange: handleChange,
        type,
        autoFocus,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        forwardedRef
    });

    const iconMarkup = useInputIcon(icon, { disabled });

    const buttonMarkup = useInputButton(button, !disabled && !readOnly);

    const content = (
        <>
            {iconMarkup}
            <TriggerType
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
            {...mergeProps(
                userWrapperProps,
                {
                    className: cssModule(
                        "o-ui-input",
                        iconMarkup && "has-icon",
                        buttonMarkup && "has-button"
                    )
                },
                wrapperProps
            )}
        >
            {content}
        </Box>
    );
}

export const TextInput = forwardRef<InnerTextInputProps, "input">((props, ref) => (
    <InnerTextInput {...props} forwardedRef={ref} />
));

export type TextInputProps = ComponentProps<typeof TextInput>

TextInput.displayName = "TextInput";
