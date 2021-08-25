import "./TextArea.css";

import { AriaLabelingProps, InteractionStatesProps, InternalProps, cssModule, isNil, mergeProps, useChainedEventCallback, useControllableState } from "../../shared";
import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { ChangeEvent, ChangeEventHandler, ComponentProps, ReactElement, forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { useFieldInputProps } from "../../field";
import { useInput, useInputButton, wrappedInputPropsAdapter } from "../../input";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

const DefaultElement = "div";

export interface InnerTextAreaProps extends InternalProps, InteractionStatesProps, AriaLabelingProps, Omit<ComponentProps<"textarea">, "onChange" | "autoFocus"> {
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
     * Whether or not an element is resizable, and if so, in which directions. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/resize).
     */
    resize?: "vertical" | "none";
    /**
     * Whether a user input is required before form submission.
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
    onValueChange?: (event: ChangeEvent<HTMLTextAreaElement>, value: string) => void;
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type?: "text" | "password" | "search" | "url" | "tel" | "email";
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: number | boolean;
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button?: ReactElement;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
    /**
     * The number of visible text lines.
     */
    rows?: number;
    /**
     * The maximum number of visible text lines before displaying a scrollbar.
     */
    maxRows?: number;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * @ignore
     */
    readOnly?: boolean;
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

    const { wrapperProps, inputProps, inputRef } = useInput({
        cssModule: "o-ui-text-area",
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

    const adjustRows = useCallback(() => {
        const input = inputRef.current;

        const { paddingBottom, paddingTop, lineHeight } = window.getComputedStyle(input);

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
                    className: cssModule(
                        "o-ui-input",
                        buttonMarkup && "has-button"
                    ),
                    as
                },
                wrapperProps
            )}
        >
            {content}
        </Box>
    );
}

export const TextArea = forwardRef<any, Omit<InnerTextAreaProps, "forwardedRef">>((props, ref) => (
    <InnerTextArea {...props} forwardedRef={ref} />
));

export type TextAreaProps = ComponentProps<typeof TextArea>;

TextArea.displayName = "TextArea";
