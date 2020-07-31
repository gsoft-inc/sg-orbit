import "./TextInput.css";

import { EmbeddedIcon } from "../../icons";
import {
    augmentElement,
    getSizeClass,
    mergeClasses,
    useAutoFocus,
    useChainedEventCallback,
    useControllableState,
    useMergedRefs
} from "../../shared";
import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { embedButton } from "../../button";
import { forwardRef, useCallback } from "react";
import { isNil } from "lodash";

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
     * Temporary text that occupies the text input when it is empty.
     */
    placeholder: string,
    /**
     * Called when the text input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * Style to use.
     */
    variant: oneOf(["outline", "transparent"]),
    /**
     * The color accent.
     */
    color: oneOf(["error"]),
    /**
     * The type of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).
     */
    type: oneOf(["text", "search", "url", "tel", "email", "password"]),
    /**
     * Whether or not the text input should autofocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the value.
     */
    iconLeft: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the value.
     */
    iconRight: element,
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the value.
     */
    button: element,
    /**
     * Whether or not the text input take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not to render a loader.
     */
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
    onChange,
    variant,
    color,
    type,
    autoFocus,
    autoFocusDelay,
    iconLeft,
    iconRight,
    button,
    disabled,
    readOnly,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    className,
    wrapperProps,
    as: ElementType,
    forwardedRef,
    ...rest
}) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const inputRef = useMergedRefs(forwardedRef);

    const setFocus = useCallback(() => {
        if (!isNil(inputRef.current)) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const autoFocusProps = useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

    const handleChange = useChainedEventCallback(onChange, event => {
        setValue(event.target.value);
    });

    const iconLeftMarkup = !isNil(iconLeft) && (
        <EmbeddedIcon size={size}>{iconLeft}</EmbeddedIcon>
    );

    const iconRightMarkup = !isNil(iconRight) && (
        <EmbeddedIcon size={size}>{iconRight}</EmbeddedIcon>
    );

    const buttonMarkup = !isNil(button) && embedButton(button, {
        size,
        variant: "ghost",
        color: "secondary",
        shape: "circular",
        className: "button"
    });

    wrapperProps = wrapperProps ?? {};

    return (
        <ElementType
            data-testid="text-input"
            {...wrapperProps}
            className={mergeClasses(
                "o-ui text-input",
                variant,
                color,
                iconLeftMarkup && "with-left-icon",
                iconRightMarkup && "with-right-icon",
                button && "with-button",
                fluid && "fluid",
                loading && "loading",
                getSizeClass(size),
                wrapperProps.className
            )}
        >
            {iconLeftMarkup}
            <input
                {...rest}
                {...autoFocusProps}
                value={inputValue}
                placeholder={placeholder}
                onChange={handleChange}
                className={mergeClasses(
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    className
                )}
                type={type}
                disabled={disabled}
                readOnly={readOnly}
                ref={inputRef}
            />
            {iconRightMarkup}
            {buttonMarkup}
        </ElementType>
    );
}

InnerTextInput.propTypes = propTypes;
InnerTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput { ...props } forwardedRef={ref} />
));
