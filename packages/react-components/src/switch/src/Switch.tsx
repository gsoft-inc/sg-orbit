import "./Switch.css";

import { Box } from "../../box";
import { ChangeEvent, ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { InteractionStatesProps, InternalProps, OmitInternalProps, OrbitComponentProps, isNil, mergeProps, omitProps, resolveChildren, useSlots } from "../../shared";
import { Text } from "../../typography";
import { VisuallyHidden } from "../../visually-hidden";
import { embeddedIconSize } from "../../icons";
import { useCheckbox } from "../../checkbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "label";

export interface InnerSwitchProps extends InternalProps, InteractionStatesProps, Omit<OrbitComponentProps<typeof DefaultElement>, "onChange"> {
    /**
     * Whether or not the checkbox should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * A controlled checked state value.
     */
    checked?: boolean | null;
    /**
     * React children.
     */
    children?: ReactNode;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * Whether or not the switch is disabled.
     */
    disabled?: boolean;
    /**
     * @ignore
     */
    name?: string;
    /**
     * Called when the switch checked state change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {boolean} isChecked - Whether or not the input is checked.
     * @returns {void}
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
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
        active,
        ariaLabel,
        ariaLabelledBy,
        autoFocus,
        checked,
        cssModule: "o-ui-switch",
        defaultChecked,
        disabled,
        focus,
        forwardedRef,
        hover,
        id,
        isInField,
        name,
        onChange,
        required,
        reverse,
        size,
        tabIndex,
        validationState
    });

    const content = resolveChildren(children);

    const { text, icon, counter } = useSlots(content, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        counter: {
            className: "o-ui-switch-counter",
            color: "inherit",
            pushed: true,
            reverse,
            size,
            variant: "divider"
        },
        icon: {
            className: "o-ui-switch-icon",
            size: embeddedIconSize(size)
        },
        text: {
            className: "o-ui-switch-label",
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


export const Switch = forwardRef<any, OmitInternalProps<InnerSwitchProps>>((props, ref) => (
    <InnerSwitch {...props} forwardedRef={ref} />
));

export type SwitchProps = ComponentProps<typeof Switch>;
