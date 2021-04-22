import "./Checkbox.css";

import { Box } from "../../box";
import { ElementType, ForwardedRef, ReactNode, SyntheticEvent, useMemo } from "react";
import { InteractionStatesProps, forwardRef, isNil, mergeProps, omitProps, resolveChildren, useCheckableProps, useEventCallback, useSlots } from "../../shared";
import { Text } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { embeddedIconSize } from "../../icons";
import { useCheckbox } from "./useCheckbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface InnerCheckboxProps extends InteractionStatesProps {
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
    checked?: boolean;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * A controlled indeterminate state value.
     */
    indeterminate?: boolean;
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
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent) => void;
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

    const handleCheck = useEventCallback(event => {
        onCheck(event, value);
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
        onChange: !isNil(onCheck) ? handleCheck : onChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
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

Checkbox.displayName = "Checkbox";
