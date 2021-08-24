import "./Switch.css";

import { AriaLabelingProps, InteractionStatesProps, isNil, mergeProps, omitProps, resolveChildren, useSlots } from "../../shared";
import { Box } from "../../box";
import { ChangeEvent, ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef, useMemo } from "react";
import { Text } from "../../typography";
import { VisuallyHidden } from "../../visually-hidden";
import { embeddedIconSize } from "../../icons";
import { useCheckbox } from "../../checkbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "label";

export interface InnerSwitchProps extends InteractionStatesProps, AriaLabelingProps, Omit<ComponentProps<typeof DefaultElement>, "onChange"> {
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
     * Invert the order the checkmark box and the label.
     */
    reverse?: boolean;
    /**
     * Called when the switch checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {boolean} isChecked - Whether or not the input is checked.
     * @returns {void}
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
    /**
     * Whether or not the switch is disabled.
     */
    disabled?: boolean;
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * React children.
     */
    children?: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerSwitch(props: InnerSwitchProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();

    const {
        id,
        checked,
        defaultChecked,
        autoFocus,
        required,
        validationState,
        onChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

    if (isNil(children) && isNil(ariaLabel) && isNil(ariaLabelledBy)) {
        console.error("A switch must either have children, an \"aria-label\" attribute or an \"aria-labelledby\" attribute.");
    }

    const { wrapperProps, inputProps } = useCheckbox({
        cssModule: "o-ui-switch",
        isInField,
        id,
        checked,
        defaultChecked,
        autoFocus,
        required,
        validationState,
        onChange,
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
            className: "o-ui-switch-label"
        },
        icon: {
            size: embeddedIconSize(size),
            className: "o-ui-switch-icon"
        },
        counter: {
            variant: "divider",
            color: "inherit",
            size,
            reverse,
            pushed: true,
            className: "o-ui-switch-counter"
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
            <VisuallyHidden
                {...inputProps}
                role="switch"
            />
            <span className="o-ui-switch-control" />
            {text}
            {icon}
            {counter}
        </Box>
    );
}


export const Switch = forwardRef<any, Omit<InnerSwitchProps, "forwardedRef">>((props, ref) => (
    <InnerSwitch {...props} forwardedRef={ref} />
));

export type SwitchProps = ComponentProps<typeof Switch>;

Switch.displayName = "Switch";
