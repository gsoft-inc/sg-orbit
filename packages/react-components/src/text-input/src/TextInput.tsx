import "./TextInput.css";

import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { ChangeEvent, ComponentProps, ElementType, ForwardedRef, ReactElement } from "react";
import { ClearInputGroupContext, useInputGroupTextInputProps } from "../../input-group";
import { DomProps, InteractionStatesProps, cssModule, forwardRef, isNil, mergeProps, omitProps, useControllableState, useEventCallback } from "../../shared";
import { useFieldInputProps } from "../../field";
import { useInput, useInputButton, useInputIcon, wrappedInputPropsAdapter } from "../../input";
import { useToolbarProps } from "../../toolbar";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface InnerTextInputProps extends DomProps, InteractionStatesProps {
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
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the input value change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {string} value - The input value.
     * @returns {void}
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
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
    icon?: ReactElement;
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button?: ReactElement;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * @ignore
     */
    readOnly?: boolean;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
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

export function InnerTextInput(props: InnerTextInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();
    const [inputGroupProps] = useInputGroupTextInputProps();

    const {
        id,
        value,
        defaultValue,
        placeholder,
        required,
        validationState,
        onChange,
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
        as: As = "input",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(mergeProps(
            {},
            omitProps(toolbarProps, ["orientation"]),
            fieldProps,
            inputGroupProps
        ))
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const handleChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (!isNil(onChange)) {
            onChange(event, newValue);
        }

        setValue(newValue);
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
            <As
                {...mergeProps(
                    rest,
                    inputProps
                )}
            />
            {/* Otherwise an input button will receive an addon className */}
            <ClearInputGroupContext>
                {buttonMarkup}
            </ClearInputGroupContext>
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
                        disabled && "disabled",
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

export type TextInputProps = ComponentProps<typeof TextInput>;

TextInput.displayName = "TextInput";
