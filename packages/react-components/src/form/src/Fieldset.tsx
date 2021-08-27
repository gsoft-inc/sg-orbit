import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, mergeProps, useId } from "../../shared";

const DefaultElement = "div";

export interface InnerFieldsetProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * A label identifying the group.
     */
    label: string;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerFieldset({
    id,
    label,
    as: As = DefaultElement,
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

export const Fieldset = forwardRef<any, OmitInternalProps<InnerFieldsetProps>>((props, ref) => (
    <InnerFieldset {...props} forwardedRef={ref} />
));

export type FieldsetProps = ComponentProps<typeof Fieldset>;

Fieldset.displayName = "Fieldset";
