import "./Checkbox.css";

import { AbstractInputProps } from "../../input";
import { Box } from "../../box";
import { ChangeEvent, ChangeEventHandler, ComponentProps, forwardRef, useMemo } from "react";
import { OmitInternalProps, isNil, mergeProps, omitProps, resolveChildren, useChainedEventCallback, useCheckableProps, useSlots } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Text } from "../../typography";
import { VisuallyHidden } from "../../visually-hidden";
import { embeddedIconSize } from "../../icons";
import { useCheckbox } from "./useCheckbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "label";

export interface InnerCheckboxProps extends Omit<AbstractInputProps<typeof DefaultElement>, "onChange"> {
    /**
    * A controlled checked state value.
    */
    checked?: boolean | null;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * The initial value of `indeterminate`.
     */
    defaultIndeterminate?: boolean;
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * A controlled indeterminate state value.
     */
    indeterminate?: boolean | null;
    /**
     * @ignore
     */
    name?: string;
    /**
     * Called when the checkbox checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onChange?: ChangeEventHandler;
    /**
     * Called when the checkbox checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {boolean} isChecked - Whether or not the input is checked.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse?: boolean;
    /**
     * A checkbox can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md">;
    /**
     * The value to associate with when in a group.
     */
    value?: string;
}

export function InnerCheckbox(props: InnerCheckboxProps) {
    const [checkableProps] = useCheckableProps(props);
    const [fieldProps, isInField] = useFieldInputProps();
    const [toolbarProps] = useToolbarProps();

    const {
        active,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        as = DefaultElement,
        autoFocus,
        checked,
        children,
        defaultChecked,
        defaultIndeterminate,
        disabled,
        focus,
        forwardedRef,
        hover,
        id,
        indeterminate,
        name,
        onChange,
        onCheck,
        onValueChange,
        required,
        reverse,
        // Usually provided by the field inputs.
        size,
        tabIndex,
        validationState,
        value,
        ...rest
    } = mergeProps(
        omitProps(props, ["role"]),
        checkableProps,
        omitProps(toolbarProps, ["orientation"]),
        omitProps(fieldProps, ["fluid"])
    );

    if (isNil(children) && isNil(ariaLabel) && isNil(ariaLabelledBy)) {
        console.error("A checkbox must either have children, an \"aria-label\" attribute or an \"aria-labelledby\" attribute.");
    }

    const sizeValue = useResponsiveValue(size);

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => {
        if (!isNil(onValueChange)) {
            onValueChange(event, isChecked);
        }

        if (!isNil(onCheck)) {
            onCheck(event, value);
        }
    });

    const { inputProps, wrapperProps } = useCheckbox({
        active,
        ariaLabel,
        ariaLabelledBy,
        autoFocus,
        checked,
        cssModule: "o-ui-checkbox",
        defaultChecked,
        defaultIndeterminate,
        disabled,
        focus,
        forwardedRef,
        hover,
        id,
        indeterminate,
        isInField,
        name,
        onChange: handleChange,
        required,
        reverse,
        size: sizeValue,
        tabIndex,
        validationState
    });

    const content = resolveChildren(children);

    const { counter, icon, text } = useSlots(content, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        counter: {
            className: "o-ui-checkbox-counter",
            color: "inherit",
            pushed: true,
            reverse,
            size: sizeValue,
            variant: "divider"
        },
        icon: {
            className: "o-ui-checkbox-icon",
            size: embeddedIconSize(sizeValue)
        },
        text: {
            className: "o-ui-checkbox-label",
            color: "inherit",
            size: sizeValue
        }
    }), [sizeValue, reverse]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as
                },
                wrapperProps
            )}
        >
            <VisuallyHidden {...inputProps} />
            <span className="o-ui-checkbox-box" />
            {text}
            {icon}
            {counter}
        </Box>
    );
}

export const Checkbox = forwardRef<any, OmitInternalProps<InnerCheckboxProps>>((props, ref) => (
    <InnerCheckbox {...props} forwardedRef={ref} />
));

export type CheckboxProps = ComponentProps<typeof Checkbox>;
