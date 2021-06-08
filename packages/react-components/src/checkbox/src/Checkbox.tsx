import "./Checkbox.css";

import { AriaLabelingProps, InteractionStatesProps, forwardRef, isNil, mergeProps, omitProps, resolveChildren, useChainedEventCallback, useCheckableProps, useSlots } from "../../shared";
import { Box } from "../../box";
import { ChangeEvent, ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { Text } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { embeddedIconSize } from "../../icons";
import { useCheckbox } from "./useCheckbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface InnerCheckboxProps extends InteractionStatesProps, AriaLabelingProps {
    /**
     * @ignore
     */
    name?: string;
    /**
     * @ignore
     */
    tabIndex?: number;
    /**
    * A controlled checked state value.
    */
    checked?: boolean | null;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * A controlled indeterminate state value.
     */
    indeterminate?: boolean | null;
    /**
     * The initial value of `indeterminate`.
     */
    defaultIndeterminate?: boolean;
    /**
     * The value to associate with when in a group.
     */
    value?: string;
    /**
     * Whether or not the checkbox should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the checkbox should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * A checkbox can vary in size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the checkbox is disabled.
     */
    disabled?: boolean;
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse?: boolean;
    /**
     * Called when the checkbox checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {boolean} isChecked - Whether or not the input is checked.
     * @returns {void}
     */
    onValueChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
    /**
     * @ignore
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
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
        as = "label",
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

    const { wrapperProps, inputProps } = useCheckbox({
        cssModule: "o-ui-checkbox",
        isInField,
        id,
        checked,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        autoFocus,
        required,
        validationState,
        onChange: handleChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        ariaLabel,
        ariaLabelledBy,
        forwardedRef
    });

    const content = resolveChildren(children);

    const { text, icon, counter } = useSlots(content, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        text: {
            color: "inherit",
            size,
            className: "o-ui-checkbox-label"
        },
        icon: {
            size: embeddedIconSize(size),
            className: "o-ui-checkbox-icon"
        },
        counter: {
            variant: "divider",
            color: "inherit",
            size,
            reverse,
            pushed: true,
            className: "o-ui-checkbox-counter"
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

export const Checkbox = forwardRef<InnerCheckboxProps>((props, ref) => (
    <InnerCheckbox {...props} forwardedRef={ref} />
));


export type CheckboxProps = ComponentProps<typeof Checkbox>;

Checkbox.displayName = "Checkbox";
