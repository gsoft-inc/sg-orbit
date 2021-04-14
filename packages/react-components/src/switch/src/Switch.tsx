import "./Switch.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent, useMemo } from "react";
import { InteractionStatesProps, forwardRef, mergeProps, omitProps, resolveChildren, useSlots } from "../../shared";
import { Text } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { embeddedIconSize } from "../../icons";
import { useCheckbox } from "../../checkbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface InnerSwitchProps extends InteractionStatesProps {
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
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange?(event: SyntheticEvent): void;
    /**
     * An HTML element type or a custom React element type to render as.
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
        as = "label",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

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
            <VisuallyHidden {...inputProps} />
            <span className="o-ui-switch-control" />
            {text}
            {icon}
            {counter}
        </Box>
    );
}


export const Switch = forwardRef<InnerSwitchProps>((props, ref) => (
    <InnerSwitch {...props} forwardedRef={ref} />
));

export type SwitchProps = ComponentProps<typeof Switch>

Switch.displayName = "Switch";
