import "./TextArea.css";

import { AbstractInputProps, useInput, useInputButton, wrappedInputPropsAdapter } from "../../input";
import { Box, BoxProps } from "../../box";
import { ChangeEvent, ComponentProps, ReactElement, forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { HtmlElements } from "../../html";
import { OmitInternalProps, cssModule, isNil, mergeProps, useChainedEventCallback, useControllableState } from "../../shared";
import { useFieldInputProps } from "../../field";

const DefaultElement = "textarea";

export interface InnerTextAreaProps extends AbstractInputProps<typeof DefaultElement> {
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button?: ReactElement;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-cols).
     */
    cols?: number;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string;
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
     * Called when the input value change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {string} value - The input value.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLTextAreaElement>, value: string) => void;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows).
     */
    rows?: number;
    /**
     * The type of the input.
     */
    type?: "text" | "password" | "search" | "url" | "tel" | "email";
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
        id,
        loading,
        maxRows,
        onChange,
        onValueChange,
        placeholder,
        readOnly,
        required,
        rows: rowsProp,
        type = "text",
        validationState,
        value,
        wrapperProps: { as: wrapperAs = HtmlElements["div"], ...userWrapperProps } = {},
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
            <Box
                {...mergeProps(
                    rest,
                    {
                        "aria-label": ariaLabel,
                        "aria-labelledby": ariaLabelledBy,
                        as,
                        rows
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
                    as: wrapperAs,
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
