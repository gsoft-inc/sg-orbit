import "./TextArea.css";

import { InputLabel } from "./InputLabel";
import { InputMessage } from "./InputMessage";
import { bool, element, elementType, func, node, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback, useLayoutEffect, useRef, useState } from "react";
import { isNil } from "lodash";
import { mergeClasses, useChainedEventCallback, useControllableState } from "../../shared";
import { useInput } from "./useInput";
import { useInputButton } from "./useInputContent";

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
     * Whether an element is resizable, and if so, in which directions. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/resize).
     */
    resize: oneOf(["vertical", "none"]),
    /**
     * Label identifying the input.
     */
    label: node,
    /**
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Additional text to describe the input.
     */
    description: string,
    /**
     * Help message displayed beneath the input when `validateState` is undefined.
     */
    helpMessage: node,
    /**
     * Invalid message displayed beneath the input when `validateState` is `"invalid"`.
     */
    invalidMessage: node,
    /**
     * Valid message displayed beneath the input when `validateState` is `"valid"`.
     */
    validMessage: node,
    /**
     * Whether the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * Style to use.
     */
    variant: oneOf(["outline", "transparent"]),
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type: oneOf(["text", "password", "search", "url", "tel", "email"]),
    /**
     * Whether the input should autofocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the value.
     */
    button: element,
    /**
     * Whether theinput take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether to render a loader.
     */
    loading: bool,
    /**
     * The number of visible text lines.
     */
    rows: number,
    /**
     * The maximum number of visible text lines before displaying a scrollbar.
     */
    maxRows: number,
    /**
     * An input can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
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

export function InnerTextArea({
    id,
    value,
    defaultValue,
    placeholder,
    resize,
    label,
    required,
    description,
    helpMessage,
    invalidMessage,
    validMessage,
    validationState,
    onChange,
    variant = "outline",
    type = "text",
    autoFocus,
    autoFocusDelay,
    button,
    disabled,
    readOnly,
    fluid,
    loading,
    rows: rowsProp,
    maxRows,
    size,
    active,
    focus,
    hover,
    className,
    style,
    wrapperProps: userWrapperProps,
    as: ElementType = "div",
    forwardedRef,
    ...rest
}) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, "");
    const [rows, setRows] = useState(rowsProp);

    const inputRef = useRef();

    const handleChange = useChainedEventCallback(onChange, event => {
        setValue(event.target.value);
    });

    const { wrapperProps, inputProps, labelProps, messageProps } = useInput({
        id,
        value: inputValue,
        placeholder,
        label,
        required,
        description,
        helpMessage,
        invalidMessage,
        validMessage,
        validationState,
        onChange: handleChange,
        variant,
        type,
        autoFocus,
        autoFocusDelay,
        disabled,
        readOnly,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        className,
        userWrapperProps,
        inputRef,
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

    const labelMarkup = labelProps && (
        <InputLabel {...labelProps} />
    );

    const messageMarkup = messageProps && (
        <InputMessage {...messageProps} />
    );

    const buttonMarkup = useInputButton(button, !disabled && !readOnly, { size });

    const content = (
        <>
            <textarea
                {...rest}
                {...inputProps}
                rows={rows}
                style={{
                    "--o-ui-resize": resize,
                    ...style
                }}
            />
            {buttonMarkup}
            {messageMarkup}
        </>
    );

    return (
        <ElementType
            data-testid="text-area"
            {...wrapperProps}
            className={mergeClasses(
                "o-ui input text-area",
                button && "with-button",
                wrapperProps.className
            )}
        >
            {!labelMarkup ? content : (
                <>
                    {labelMarkup}
                    <div className="labeled-input">
                        {content}
                    </div>
                </>
            )}
        </ElementType>
    );
}

InnerTextArea.propTypes = propTypes;

export const TextArea = forwardRef((props, ref) => (
    <InnerTextArea {...props} forwardedRef={ref} />
));
