import "./TextArea.css";

import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { ChangeEvent, ChangeEventHandler, ComponentProps, ReactElement, forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { InteractionStatesProps, InternalProps, OmitInternalProps, OrbitComponentProps, cssModule, isNil, mergeProps, useChainedEventCallback, useControllableState } from "../../shared";
import { useFieldInputProps } from "../../field";
import { useInput, useInputButton, wrappedInputPropsAdapter } from "../../input";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

const DefaultElement = "div";

export interface InnerTextAreaProps extends InternalProps, InteractionStatesProps, Omit<OrbitComponentProps<"textarea">, "onChange" | "autoFocus"> {
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: number | boolean;
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button?: ReactElement;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string;
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
    /**
     * The maximum number of visible text lines before displaying a scrollbar.
     */
    maxRows?: number;
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
    /**
     * Called when the input value change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {string} value - The input value.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLTextAreaElement>, value: string) => void;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * @ignore
     */
    readOnly?: boolean;
    /**
     * Whether a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not an element is resizable, and if so, in which directions.
     */
    resize?: "vertical" | "none";
    /**
     * The number of visible text lines.
     */
    rows?: number;
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

const pxToInt = (value?: string) => {
    return !isNil(value) ? parseInt(value.replace("px", ""), 10) : 0;
};

export function InnerTextArea(props: InnerTextAreaProps) {
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        value,
        defaultValue,
        placeholder,
        resize,
        required,
        validationState,
        onValueChange,
        onChange,
        type = "text",
        autoFocus,
        button,
        disabled,
        readOnly,
        fluid,
        loading,
        rows: rowsProp,
        maxRows,
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
        wrappedInputPropsAdapter(fieldProps)
    );

    if (isNil(ariaLabel) && isNil(ariaLabelledBy) && isNil(placeholder)) {
        console.error("An input component must either have an \"aria-label\" attribute, an \"aria-labelledby\" attribute or a \"placeholder\" attribute.");
    }

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");
    const [rows, setRows] = useState(rowsProp);

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;

        setValue(newValue);

        if (!isNil(onValueChange)) {
            onValueChange(event, newValue);
        }
    });

    const { inputProps, inputRef, wrapperProps } = useInput({
        active,
        autoFocus,
        cssModule: "o-ui-text-area",
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

    const adjustRows = useCallback(() => {
        const input = inputRef.current;

        const { lineHeight, paddingBottom, paddingTop } = window.getComputedStyle(input);

        const padding = pxToInt(paddingTop) + pxToInt(paddingBottom);
        const currentRows = Math.floor((input.scrollHeight - padding) / pxToInt(lineHeight));

        const newRows = !isNil(maxRows) && currentRows > maxRows
            ? maxRows
            : currentRows;

        setRows(newRows);
    }, [inputRef, maxRows]);

    useLayoutEffect(() => {
        adjustRows();
    }, [adjustRows, inputValue]);

    const buttonMarkup = useInputButton(button, !disabled && !readOnly);

    const content = (
        <>
            <textarea
                {...mergeProps(
                    rest,
                    {
                        "aria-label": ariaLabel,
                        "aria-labelledby": ariaLabelledBy,
                        rows,
                        style: {
                            ["--o-ui-resize" as any]: resize
                        }
                    },
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
                    as,
                    className: cssModule(
                        "o-ui-input",
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

export const TextArea = forwardRef<any, OmitInternalProps<InnerTextAreaProps>>((props, ref) => (
    <InnerTextArea {...props} forwardedRef={ref} />
));

export type TextAreaProps = ComponentProps<typeof TextArea>;
