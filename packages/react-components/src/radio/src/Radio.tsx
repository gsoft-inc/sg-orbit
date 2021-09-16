import "./Radio.css";

import { AbstractInputProps } from "../../input";
import { Box } from "../../box";
import { ChangeEvent, ChangeEventHandler, ComponentProps, ReactNode, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { HtmlElements } from "../../html";
import {
    OmitInternalProps,
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

export interface InnerRadioProps extends Omit<AbstractInputProps<typeof DefaultElement>, "onChange"> {
    /**
     * A controlled checked state value.
     */
    checked?: boolean | null;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * @ignore
     */
    name?: string;
    /**
     * Called when the radio checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onChange?: ChangeEventHandler;
    /**
     * Called when the radio checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {boolean} isChecked - Whether or not the radio is checked.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
    /**
     * Invert the order of the checkmark box and the label.
     */
    reverse?: boolean;
    /**
     * The value to associate with when in a group.
     */
    value?: string;
}

export function InnerRadio(props: InnerRadioProps) {
    const [checkableProps] = useCheckableProps(props);

    const {
        active,
        as = HtmlElements[DefaultElement],
        autoFocus,
        checked,
        children,
        defaultChecked,
        disabled,
        focus,
        forwardedRef,
        hover,
        name,
        onChange,
        onCheck,
        onValueChange,
        reverse,
        tabIndex,
        validationState,
        value,
        ...rest
    } = mergeProps(
        omitProps(props, ["role"]),
        checkableProps
    );

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);

    const labelRef = useRef();
    const inputRef = useRef();

    useAutoFocus(inputRef, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(labelRef);
    });

    const handleStateChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = !isChecked;

        setIsChecked(newValue);

        if (!isNil(onValueChange)) {
            onValueChange(event, true);
        }
    });

    const handleCheck = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>) => {
        if (!isNil(onValueChange)) {
            onValueChange(event, true);
        }

        if (!isNil(onCheck)) {
            onCheck(event, value);
        }
    });

    const content = resolveChildren(children);

    const { counter, icon, text } = useSlots(content, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        counter: {
            className: "o-ui-radio-counter",
            color: "inherit",
            pushed: true,
            reverse,
            variant: "divider"
        },
        icon: {
            className: "o-ui-radio-icon",
            size: "sm"
        },
        text: {
            className: "o-ui-radio-label",
            color: "inherit"
        }
    }), [reverse]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
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
                    ref: labelRef
                }
            )}
        >
            <VisuallyHidden
                aria-invalid={validationState === "invalid"}
                as="input"
                checked={isChecked}
                data-type={typeof (value)}
                disabled={disabled}
                name={name}
                onChange={!isNil(onCheck) ? handleCheck : handleStateChange}
                ref={inputRef}
                tabIndex={tabIndex}
                type="radio"
                value={value}
            />
            <span className="o-ui-radio-button"></span>
            {text}
            {icon}
            {counter}
        </Box>
    );
}

export const Radio = forwardRef<any, OmitInternalProps<InnerRadioProps>>((props, ref) => (
    <InnerRadio {...props} forwardedRef={ref} />
));

export type RadioProps = ComponentProps<typeof Radio>;
