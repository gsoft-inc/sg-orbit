import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { DomProps, forwardRef, mergeProps, useId } from "../../shared";

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
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerFieldsetProps) {
    const rootId = useId(id, "o-ui-fieldset");
    const labelId = `${rootId}-label`;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    id: rootId,
                    className: "o-ui-fieldset",
                    role: "group",
                    "aria-labelledby": labelId,
                    as,
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
        </Box>
    );
}

export const Fieldset = forwardRef<InnerFieldsetProps>((props, ref) => (
    <InnerFieldset {...props} forwardedRef={ref} />
));

export type FieldsetProps = ComponentProps<typeof Fieldset>;
