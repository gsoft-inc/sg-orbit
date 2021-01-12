import "./TextArea.css";

import { Box } from "../../box";
import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, mergeProps, useChainedEventCallback, useControllableState } from "../../shared";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";
import { useInput } from "./useInput";
import { useInputButton } from "./useInputContent";
import { wrappedInputPropsAdapter } from "./wrappedInputPropsAdapter";

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
     * Whether or not an element is resizable, and if so, in which directions. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/resize).
     */
    resize: oneOf(["vertical", "none"]),
    /**
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["outline", "transparent"]),
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type: oneOf(["text", "password", "search", "url", "tel", "email"]),
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * [Button](/?path=/docs/button--default-story) component rendered after the value.
     */
    button: element,
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not to render a loader.
     */
    loading: bool,
    /**
     * Whether or not the input is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the input is readonly.
     */
    readOnly: bool,
    /**
     * The number of visible text lines.
     */
    rows: number,
    /**
     * The maximum number of visible text lines before displaying a scrollbar.
     */
    maxRows: number,
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const pxToInt = value => {
    return !isNil(value) ? parseInt(value.replace("px", ""), 10) : 0;
};

export function InnerTextArea(props) {
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        value,
        defaultValue,
        placeholder,
        resize,
        required,
        validationState,
        onChange,
        variant = "outline",
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
        className,
        style,
        wrapperProps: userWrapperProps,
        as = "div",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(fieldProps)
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, "");
    const [rows, setRows] = useState(rowsProp);

    const handleChange = useChainedEventCallback(onChange, event => {
        setValue(event.target.value);
    });

    const {
        wrapperProps: { className: wrapperClassName, ...wrapperProps },
        inputProps,
        inputRef
    } = useInput({
        cssModule: "o-ui-text-area",
        id,
        value: inputValue,
        placeholder,
        required,
        validationState,
        onChange: handleChange,
        variant,
        type,
        autoFocus,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        className,
        wrapperProps: userWrapperProps,
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
                    inputProps
                )}
                rows={rows}
                style={{
                    "--o-ui-resize": resize,
                    ...style
                }}
            />
            {buttonMarkup}
        </>
    );

    return (
        <Box
            {...wrapperProps}
            className={mergeClasses(
                cssModule(
                    "o-ui-input",
                    buttonMarkup && "has-button"
                ),
                wrapperClassName
            )}
            as={as}
        >
            {content}
        </Box>
    );
}

InnerTextArea.propTypes = propTypes;

export const TextArea = forwardRef((props, ref) => (
    <InnerTextArea {...props} forwardedRef={ref} />
));

TextArea.displayName = "TextArea";
