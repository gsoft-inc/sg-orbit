import { SlotProvider, getSizeClass, mergeClasses, slotBuilder, useAutoFocus, useChainedEventCallback, useControllableState, useForwardInputApi, useMergedRefs } from "../../shared";
import { any, bool, element, elementType, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { isNil } from "lodash";

// TODO:
// Add slot support for text

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
    wrapperClassName,
    wrapperStyle,
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

    return (
        <ElementType
            data-testid="text-input"
            {...rest}
            className={mergeClasses(
                "o-ui text-input",
                variant && "variant",
                fluid && "fluid",
                loading && loading,
                getSizeClass(size),
                wrapperClassName
            )}
            style={wrapperStyle}
            ref={wrapperRef}
        >
            <div className="prefix">
                <SlotProvider
                    slots={slotBuilder()
                        .icon({
                            size,
                            className: "icon"
                        })
                        .build()
                    }
                >
                    {prefix}
                </SlotProvider>
            </div>
            <input
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
                inputMode={inputMode}
                disabled={disabled}
                readOnly={readOnly}
                ref={inputRef}
            />
            <div className="suffix">
                <SlotProvider
                    slots={slotBuilder()
                        .icon({
                            size,
                            className: "icon"
                        })
                        .button({
                            size,
                            className: "button"
                        })
                        .build()
                    }
                >
                    {suffix}
                </SlotProvider>
            </div>
        </ElementType>
    );
}

InnerTextInput.propTypes = propTypes;
InnerTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput { ...props } forwardedRef={ref} />
));
