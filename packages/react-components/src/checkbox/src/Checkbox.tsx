import "./Checkbox.css";

import { Box } from "../../box";
import { ChangeEvent, ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { InteractionStatesProps, InternalProps, OmitInternalProps, OrbitComponentProps, isNil, mergeProps, omitProps, resolveChildren, useChainedEventCallback, useCheckableProps, useSlots } from "../../shared";
import { Text } from "../../typography";
import { VisuallyHidden } from "../../visually-hidden";
import { embeddedIconSize } from "../../icons";
import { useCheckbox } from "./useCheckbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "label";

export interface InnerCheckboxProps extends InternalProps, InteractionStatesProps, Omit<OrbitComponentProps<typeof DefaultElement>, "onChange"> {
    /**
     * Whether or not the checkbox should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
    * A controlled checked state value.
    */
    checked?: boolean | null;
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * The initial value of `indeterminate`.
     */
    defaultIndeterminate?: boolean;
    /**
     * Whether or not the checkbox is disabled.
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
     * @ignore
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Called when the checkbox checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {boolean} isChecked - Whether or not the input is checked.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse?: boolean;
    /**
     * A checkbox can vary in size.
     */
    size?: "sm" | "md";
    /**
     * @ignore
     */
    tabIndex?: number;
    /**
     * Whether or not the checkbox should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
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
        id,
        checked,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        value,
        autoFocus,
        required,
        validationState,
        onValueChange,
        onChange,
        onCheck,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        "aria-label": ariaLabel,
        // Usually provided by the field inputs.
        "aria-labelledby": ariaLabelledBy,
        as = DefaultElement,
        children,
        forwardedRef,
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
        size,
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
            size,
            variant: "divider"
        },
        icon: {
            className: "o-ui-checkbox-icon",
            size: embeddedIconSize(size)
        },
        text: {
            className: "o-ui-checkbox-label",
            color: "inherit",
            size
        }
    }), [size, reverse]));

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
