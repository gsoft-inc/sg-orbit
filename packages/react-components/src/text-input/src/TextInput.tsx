import "./TextInput.css";

import { AbstractInputProps, useInput, useInputButton, useInputIcon, wrappedInputPropsAdapter } from "../../input";
import { Box, BoxProps } from "../../box";
import { ChangeEvent, ComponentProps, ReactElement, forwardRef } from "react";
import { ClearInputGroupContext, useInputGroupTextInputProps } from "../../input-group";
import { HtmlElements } from "../../html";
import { JsxElement, OmitInternalProps, cssModule, isNil, mergeProps, omitProps, useChainedEventCallback, useControllableState } from "../../shared";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface AbstractTextInputProps<T extends JsxElement<T>> extends AbstractInputProps<typeof DefaultElement> {
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button?: ReactElement;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon?: ReactElement;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {string} value - The new input value.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    /**
     * A controlled value.
     */
    value?: string | null;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
}

const DefaultElement = "input";

export interface InnerTextInputProps extends AbstractTextInputProps<typeof DefaultElement> {
    /**
     * The type of the input.
     */
    type?: "text" | "password" | "search" | "url" | "tel" | "email";
}

export function InnerTextInput(props: InnerTextInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();
    const [inputGroupProps] = useInputGroupTextInputProps();

    const contextualProps = mergeProps(
        {},
        omitProps(toolbarProps, ["orientation"]),
        fieldProps,
        inputGroupProps
    );

    const {
        active,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        as = HtmlElements[DefaultElement],
        autoFocus,
        button,
        defaultValue,
        disabled,
        fluid,
        focus,
        forwardedRef,
        hover,
        icon,
        id,
        loading,
        onChange,
        onValueChange,
        placeholder,
        readOnly,
        required,
        type = "text",
        validationState,
        value,
        wrapperProps: userWrapperProps,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(contextualProps)
    );

    if (isNil(ariaLabel) && isNil(ariaLabelledBy) && isNil(placeholder)) {
        console.error("An input component must either have an \"aria-label\" attribute, an \"aria-labelledby\" attribute or a \"placeholder\" attribute.");
    }

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        setValue(newValue);

        if (!isNil(onValueChange)) {
            onValueChange(event, newValue);
        }
    });

    const { inputProps, wrapperProps } = useInput({
        active,
        autoFocus,
        cssModule: "o-ui-text-input",
        disabled,
        fluid,
        focus,
        forwardedRef,
        hover,
        id,
        loading,
        onChange: handleChange,
        placeholder,
        readOnly,
        required,
        type,
        validationState,
        value: inputValue
    });

    const iconMarkup = useInputIcon(icon, { disabled });

    const buttonMarkup = useInputButton(button, !disabled && !readOnly);

    const content = (
        <>
            {iconMarkup}
            <Box
                {...mergeProps(
                    rest,
                    {
                        "aria-label": ariaLabel,
                        "aria-labelledby": ariaLabelledBy,
                        as
                    },
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

export const TextInput = forwardRef<HTMLInputElement, OmitInternalProps<InnerTextInputProps>>((props, ref) => (
    <InnerTextInput {...props} forwardedRef={ref} />
));

export type TextInputProps = ComponentProps<typeof TextInput>;
