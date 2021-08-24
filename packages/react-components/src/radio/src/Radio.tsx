import "./Radio.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, FormEvent, ForwardedRef, ReactNode, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import {
    InteractionStatesProps,
    cssModule,
    isNil,
    isNumber,
    mergeProps,
    omitProps,
    resolveChildren,
    useAutoFocus,
    useChainedEventCallback,
    useCheckableProps,
    useControllableState,
    useForwardInputApi,
    useSlots
} from "../../shared";
import { Text } from "../../typography";
import { VisuallyHidden } from "../../visually-hidden";

const DefaultElement = "label";

export interface InnerRadioProps extends InteractionStatesProps, Omit<ComponentProps<typeof DefaultElement>, "onChange"> {
    /**
     * A controlled checked state value.
     */
    checked?: boolean | null;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * The value to associate with when in a group.
     */
    value?: string;
    /**
     * Whether or not the radio should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the radio should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Whether or not the radio is disabled.
     */
    disabled?: boolean;
    /**
     * Called when the radio checked state change.
     * @param {FormEvent} event - React's original synthetic event.
     * @param {boolean} isChecked - Whether or not the radio is checked.
     * @returns {void}
     */
    onValueChange?: (event: FormEvent<HTMLInputElement>, isChecked: boolean) => void;
    /**
     * @ignore
     */
    onChange?: (event: FormEvent<HTMLInputElement>, isChecked: boolean) => void;
    /**
     * Invert the order of the checkmark box and the label.
     */
    reverse?: boolean;
    /**
     * @ignore
     */
    tabIndex?: number;
    /**
     * Radio name.
     */
    name?: string;
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerRadio(props: InnerRadioProps) {
    const [checkableProps] = useCheckableProps(props);

    const {
        value,
        name,
        checked,
        defaultChecked,
        autoFocus,
        validationState,
        onValueChange,
        onChange,
        onCheck,
        reverse,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        as = DefaultElement,
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

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(labelRef);
    });

    const handleStateChange = useChainedEventCallback(onChange, event => {
        const newValue = !isChecked;

        setIsChecked(newValue);

        if (!isNil(onValueChange)) {
            onValueChange(event, true);
        }
    });

    const handleCheck = useChainedEventCallback(onChange, event => {
        if (!isNil(onValueChange)) {
            onValueChange(event, true);
        }

        if (!isNil(onCheck)) {
            onCheck(event, value);
        }
    });

    const content = resolveChildren(children);

    const { text, icon, counter } = useSlots(content, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        text: {
            color: "inherit",
            className: "o-ui-radio-label"
        },
        icon: {
            size: "sm",
            className: "o-ui-radio-icon"
        },
        counter: {
            variant: "divider",
            color: "inherit",
            reverse,
            pushed: true,
            className: "o-ui-radio-counter"
        }
    }), [reverse]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-radio",
                        isChecked && "checked",
                        reverse && "reverse",
                        validationState && validationState,
                        disabled && "disabled",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    as,
                    ref: labelRef
                }
            )}
        >
            <VisuallyHidden
                as="input"
                type="radio"
                value={value}
                name={name}
                checked={isChecked}
                onChange={!isNil(onCheck) ? handleCheck : handleStateChange}
                disabled={disabled}
                tabIndex={tabIndex}
                data-type={typeof (value)}
                aria-invalid={validationState === "invalid"}
                ref={inputRef}
            />
            <span className="o-ui-radio-button"></span>
            {text}
            {icon}
            {counter}
        </Box>
    );
}

export const Radio = forwardRef<any, Omit<InnerRadioProps, "forwardedRef">>((props, ref) => (
    <InnerRadio {...props} forwardedRef={ref} />
));

export type RadioProps = ComponentProps<typeof Radio>;

Radio.displayName = "Radio";
