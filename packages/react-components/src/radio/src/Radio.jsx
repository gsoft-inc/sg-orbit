import "./Radio.css";

import {
    ClearSlots,
    SlotProvider,
    cssModule,
    getSizeClass,
    mergeClasses,
    mergeProps,
    omitProps,
    useAutoFocus,
    useCheckable,
    useControllableState,
    useEventCallback,
    useForwardInputApi,
    useRenderProps, useTextContent
} from "../../shared";
import { Text } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSlot } from "../../icons";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * A controlled checked state value.
     */
    checked: bool,
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked: bool,
    /**
     * The value to associate with when in a group.
     */
    value: oneOfType([string, number]).isRequired,
    /**
     * Whether the radio should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Whether the radio should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the radio checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * A checkbox can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Invert the order of the checkmark box and the label.
     */
    reverse: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerRadio(props) {
    const [checkableProps] = useCheckable(props);

    const {
        value,
        name,
        checked,
        defaultChecked,
        autoFocus,
        autoFocusDelay,
        validationState,
        onChange,
        onCheck,
        size,
        reverse,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        as: ElementType = "label",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        omitProps(props, ["role"]),
        checkableProps
    );

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);

    const labelRef = useRef();
    const inputRef = useRef();

    useAutoFocus(inputRef, autoFocus, { delay: autoFocusDelay });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(labelRef);
    });

    const handleChange = useEventCallback(event => {
        setIsChecked(!isChecked);

        if (!isNil(onChange)) {
            onChange(event);
        }
    });

    const handleCheck = useEventCallback(event => {
        onCheck(event, value);
    });

    const content = useTextContent(Text, useRenderProps({ isChecked }, props, children));

    return (
        <ElementType
            data-testid="radio"
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-radio",
                    isChecked && "checked",
                    reverse && "reverse",
                    validationState && validationState,
                    disabled && "disabled",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass(size)
                ),
                className
            )}
            ref={labelRef}
        >
            <VisuallyHidden
                as="input"
                type="radio"
                value={value}
                name={name}
                checked={isChecked}
                onChange={!isNil(onCheck) ? handleCheck : handleChange}
                disabled={disabled}
                tabIndex={tabIndex}
                aria-invalid={validationState === "invalid"}
                ref={inputRef}
            />
            <span className="o-ui-radio-button"></span>
            <ClearSlots>
                <SlotProvider
                    slots={useMemo(() => ({
                        text: {
                            size,
                            className: "o-ui-radio-label"
                        },
                        icon: embeddedIconSlot({
                            size,
                            className: "o-ui-radio-icon"
                        }),
                        counter: {
                            size,
                            reverse,
                            className: "o-ui-radio-counter"
                        }
                    }), [size, reverse])}
                >
                    {content}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerRadio.propTypes = propTypes;

export const Radio = forwardRef((props, ref) => (
    <InnerRadio {...props} forwardedRef={ref} />
));
