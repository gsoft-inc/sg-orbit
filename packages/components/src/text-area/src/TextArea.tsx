import { AbstractInputProps, adaptInputStylingProps, useInput, useInputButton, useInputHasFocus, useInputSpinner } from "../../input";
import { Box, BoxProps } from "../../box";
import { ChangeEvent, ComponentProps, ReactElement, forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { OmitInternalProps, cssModule, getBodyElement, isNil, mergeProps, useChainedEventCallback, useControllableState, useIsomorphicLayoutEffect } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
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
    fluid?: ResponsiveProp<boolean>;
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

const useFontFaceReady = () => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        const loadFonts = async () => {
            await document.fonts.ready;
            if (!isCancelled) { setReady(true); }
        };
        loadFonts();

        return () => { isCancelled = true; };
    }, []);

    return ready;
};

function useCalculateLineHeight(input: HTMLTextAreaElement) {
    const fontsLoaded = useFontFaceReady();

    return useMemo(() => {
        if (isNil(input) || !fontsLoaded) {
            return 0;
        }

        const { font, lineHeight } = window.getComputedStyle(input);

        if (lineHeight !== "normal") { return pxToInt(lineHeight); }

        const element = document.createElement("SPAN");

        element.id = "o-ui-line-height-helper";
        element.style.visibility = "hidden";
        element.style.font = font;
        element.innerText = "LineHeightHelper";

        getBodyElement().appendChild(element);

        const height = element.getBoundingClientRect().height;

        getBodyElement().removeChild(element);

        return height;
    }, [input, fontsLoaded]);
}

export function InnerTextArea(props: InnerTextAreaProps) {
    const [fieldProps] = useFieldInputProps();

    const {
        active,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        as = DefaultElement,
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
        wrapperProps: { as: wrapperAs = "div", ...userWrapperProps } = {},
        ...rest
    } = adaptInputStylingProps(props, fieldProps);

    if (isNil(ariaLabel) && isNil(ariaLabelledBy) && isNil(placeholder)) {
        console.error("An input component must either be wrapped inside a `<Field>` component with a `<Label>`, have an \"aria-label\" attribute, an \"aria-labelledby\" attribute or a \"placeholder\" attribute.");
    }

    const fluidValue = useResponsiveValue(fluid);

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
        fluid: fluidValue,
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

    const lineHeight = useCalculateLineHeight(inputRef.current);

    const adjustRows = useCallback(() => {
        const input = inputRef.current;

        const { paddingBottom, paddingTop } = window.getComputedStyle(input);

        const padding = pxToInt(paddingTop) + pxToInt(paddingBottom);
        const currentRows = Math.floor((input.scrollHeight - padding) / lineHeight);

        const newRows = !isNil(maxRows) && currentRows > maxRows
            ? maxRows
            : currentRows;

        setRows(newRows);
    }, [inputRef, lineHeight, maxRows]);

    useIsomorphicLayoutEffect(() => {
        adjustRows();
    }, [adjustRows, inputValue]);

    const { hasFocus, inputProps: inputFocusProps } = useInputHasFocus();

    const buttonMarkup = useInputButton(button, !disabled && !readOnly);

    const loadingMarkup = useInputSpinner(loading);

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
                    inputProps,
                    inputFocusProps
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
                        buttonMarkup && "has-button",
                        hasFocus && "has-focus"
                    )
                },
                wrapperProps
            )}
        >
            {content}
            {loadingMarkup}
        </Box>
    );
}

InnerTextArea.defaultElement = DefaultElement;

/**
 * A textarea is a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/textarea--default-story)
*/
export const TextArea = forwardRef<any, OmitInternalProps<InnerTextAreaProps>>((props, ref) => (
    <InnerTextArea {...props} forwardedRef={ref} />
));

export type TextAreaProps = ComponentProps<typeof TextArea>;
