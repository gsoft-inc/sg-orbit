import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { DomProps, mergeProps, useId } from "../../shared";

export interface InnerFieldsetProps extends DomProps {
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
    id,
    label,
    as: As = "div",
    children,
    forwardedRef,
    ...rest
}: InnerFieldsetProps) {
    const rootId = useId(id, "o-ui-fieldset");
    const labelId = `${rootId}-label`;

    return (
        <As
            {...mergeProps(
                rest,
                {
                    id: rootId,
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

export const Fieldset = forwardRef<any, Omit<InnerFieldsetProps, "forwardedRef">>((props, ref) => (
    <InnerFieldset {...props} forwardedRef={ref} />
));

export type FieldsetProps = ComponentProps<typeof Fieldset>;

Fieldset.displayName = "Fieldset";
