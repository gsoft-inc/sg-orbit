import "./Label.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { Text } from "../../text";
import { forwardRef, mergeProps } from "../../shared";
import { useFieldLabelProps } from "./FieldContext";

export interface InnerLabelProps {
    /**
     * Whether or not the label show a required state.
     */
    required?: boolean;
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

function RequiredIndicator() {
    return (
        <span className="o-ui-field-label-required" aria-hidden="true">*</span>
    );
}

export function InnerLabel(props: InnerLabelProps) {
    const [fieldProps] = useFieldLabelProps(props);

    const {
        required,
        as = "label",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    return (
        <Text
            {...mergeProps<any>(
                rest,
                {
                    size: "md",
                    className: "o-ui-field-label",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
            {required && <RequiredIndicator />}
        </Text>
    );
}

export const Label = forwardRef<InnerLabelProps>((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));

export type LabelProps = ComponentProps<typeof Label>;

Label.displayName = "Label";
