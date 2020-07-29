import "./TextInput.css";

import {
    SlotProvider,
    getSizeClass,
    mergeClasses,
    useAutoFocus,
    useChainedEventCallback,
    useControllableState,
    useForwardInputApi,
    useMergedRefs
} from "../../shared";
import { bool, element, elementType, number, object, oneOf, oneOfType, string } from "prop-types";
import { buttonSlot } from "../../button";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { iconSlot } from "../../icons";
import { isNil } from "lodash";
import { textSlot } from "../../text";

const propTypes = {
    value: string,
    defaultValue: string,
    placeholder: string,
    variant: oneOf(["outline", "transparent"]),
    color: oneOf(["error"]),
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type: oneOf(["text", "search", "url", "tel", "email", "password"]),
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    leftContent: element,
    rightContent: element,
    fluid: bool,
    loading: bool,
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

const defaultProps = {
    variant: "outline",
    type: "text",
    as: "div"
};

export function InnerTextInput({
    value,
    defaultValue,
    placeholder,
    variant,
    color,
    type,
    inputMode: userInputMode,
    autoFocus,
    autoFocusDelay,
    prefix,
    suffix,
    disabled,
    readOnly,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    /**
     * Called when the text input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange,
    className,
    wrapperProps = {},
    as: ElementType,
    forwardedRef,
    ...rest
}) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, null);

    const wrapperRef = useMergedRefs(forwardedRef);
    const inputRef = useRef();

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(wrapperRef);
    });

    const setFocus = useCallback(() => {
        if (!isNil(inputRef.current)) {
            inputRef.focus();
        }
    }, [inputRef]);

    const autoFocusProps = useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

    const inputMode = useMemo(() => {
        if (!isNil(userInputMode)) {
            return userInputMode;
        }

        return type !== "password" ? type : undefined;
    }, [userInputMode, type]);


    const handleChange = useChainedEventCallback(onChange, event => {
        setValue(event);
    });

    const prefixMarkup = prefix && (
        <div className="prefix">
            <SlotProvider
                slots={{
                    icon: iconSlot({
                        size,
                        className: "icon"
                    }),
                    text: textSlot({
                        size,
                        className: "text"
                    })
                }}
            >
                {prefix}
            </SlotProvider>
        </div>
    );

    const suffixMarkup = suffix && (
        <div className="suffix">
            <SlotProvider
                slots={{
                    icon: iconSlot({
                        size,
                        className: "icon"
                    }),
                    button: buttonSlot({
                        size,
                        circular: true,
                        variant: "ghost",
                        color: "secondary",
                        className: "button"
                    })
                }}
            >
                {suffix}
            </SlotProvider>
        </div>
    );

    return (
        <ElementType
            data-testid="text-input"
            {...wrapperProps}
            className={mergeClasses(
                "o-ui text-input",
                variant,
                color,
                fluid && "fluid",
                loading && "loading",
                getSizeClass(size),
                wrapperProps.className
            )}
            ref={wrapperRef}
        >
            {prefixMarkup}
            <input
                {...rest}
                {...autoFocusProps}
                value={inputValue ?? ""}
                placeholder={placeholder}
                onChange={handleChange}
                className={mergeClasses(
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    className
                )}
                type={type}
                inputMode={inputMode}
                disabled={disabled}
                readOnly={readOnly}
                ref={inputRef}
            />
            {suffixMarkup}
        </ElementType>
    );
}

InnerTextInput.propTypes = propTypes;
InnerTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput { ...props } forwardedRef={ref} />
));
