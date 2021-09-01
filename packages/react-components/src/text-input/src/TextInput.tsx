import "./TextInput.css";

import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { ChangeEvent, ChangeEventHandler, ComponentProps, ReactElement, forwardRef } from "react";
import { ClearInputGroupContext, useInputGroupTextInputProps } from "../../input-group";
import { InteractionProps, InternalProps, OmitInternalProps, OrbitComponentProps, cssModule, isNil, mergeProps, omitProps, useChainedEventCallback, useControllableState } from "../../shared";
import { useFieldInputProps } from "../../field";
import { useInput, useInputButton, useInputIcon, wrappedInputPropsAdapter } from "../../input";
import { useToolbarProps } from "../../toolbar";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

const DefaultElement = "input";

export interface InnerTextInputProps extends InternalProps, InteractionProps, Omit<OrbitComponentProps<typeof DefaultElement>, "autoFocus"> {
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
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
     * @ignore
     */
    onChange?: ChangeEventHandler;
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {string} value - The new input value.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * @ignore
     */
    readOnly?: boolean;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * The type of the input.
     */
    type?: "text" | "password" | "search" | "url" | "tel" | "email";
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * A controlled value.
     */
    value?: string | null;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
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
        id,
        value,
        defaultValue,
        placeholder,
        required,
        validationState,
        onValueChange,
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
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        wrapperProps: userWrapperProps,
        as = DefaultElement,
        forwardedRef,
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
