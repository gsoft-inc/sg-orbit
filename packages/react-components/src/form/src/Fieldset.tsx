import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { forwardRef, mergeProps, useId } from "../../shared";

export interface InnerFieldsetProps {
    /**
     * A label identifying the group.
     */
    label: string;
    /**
     * An HTML element type or a custom React element type to render as.
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

export function InnerFieldset({
    label,
    as: As = "div",
    children,
    forwardedRef,
    ...rest
}: InnerFieldsetProps) {
    const labelId = useId(null, "o-ui-fieldset-label");

    return (
        <As
            {...mergeProps(
                rest,
                {
                    className: "o-ui-fieldset",
                    role: "group",
                    "aria-labelledby": labelId,
                    ref: forwardedRef
                }
            )}
        >
            <span
                id={labelId}
                className="o-ui-fieldset-label"
            >
                {label}
            </span>
            {children}
        </As>
    );
}

export const Fieldset = forwardRef<InnerFieldsetProps>((props, ref) => (
    <InnerFieldset {...props} forwardedRef={ref} />
));

export type FieldsetProps = ComponentProps<typeof Fieldset>;

Fieldset.displayName = "Fieldset";
