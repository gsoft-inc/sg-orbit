import { SlotProvider, slotBuilder, useForwardInputApi, useMergedRefs } from "../../shared";
import { any, bool, element, elementType, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTextInput } from "./useTextInput";

/*
    inputMode -> defaulted by type
*/

const propTypes = {
    value: string,
    defaultValue: string,
    placeholder: string,
    variant: oneOf(["outline", "transparent", "error"]),
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
     * Additional CSS classes to render on the wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the wrapper element.
     */
    wrapperStyle: object,
    wrapperRef: any,
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
    type,
    autoFocus,
    autoFocusDelay,
    leftContent,
    rightContent,
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
    wrapperClassName,
    wrapperStyle,
    as: ElementType,
    forwardedRef
}) {
    const wrapperRef = useMergedRefs(forwardedRef);
    const inputRef = useRef();

    const inputProps = useTextInput({
        value,
        defaultValue,
        placeholder,
        variant,
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
        onChange,
        className,
        inputRef
    });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(wrapperRef);
    });

    return (
        <ElementType
            className={wrapperClassName}
            style={wrapperStyle}
            ref={wrapperRef}
        >
            <input
                {...inputProps}
                type={type}
                ref={inputRef}
            />
            <SlotProvider
                slots={slotBuilder()
                    .icon({
                        size,
                        className: "left-icon"
                    })
                    .build()
                }
            >
                {leftContent}
            </SlotProvider>
            <SlotProvider
                slots={slotBuilder()
                    .icon({
                        size,
                        className: "right-icon"
                    })
                    .button({
                        size,
                        className: "button"
                    })
                    .build()
                }
            >
                {rightContent}
            </SlotProvider>
        </ElementType>
    );
}

InnerTextInput.propTypes = propTypes;
InnerTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput { ...props } forwardedRef={ref} />
));
