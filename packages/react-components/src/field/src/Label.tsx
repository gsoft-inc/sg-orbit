import "./Label.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, mergeProps } from "../../shared";
import { Text } from "../../typography";
import { useFieldLabelProps } from "./FieldContext";

const DefaultElement = "label";

export interface InnerLabelProps extends InternalProps, Omit<ComponentProps<typeof DefaultElement>, "color">{
    /**
     * Whether or not the label show a required state.
     */
    required?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
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
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    size: "md",
                    className: "o-ui-field-label",
                    as,
                    ref: forwardedRef
                } as const
            )}
        >
            {children}
            {required && <RequiredIndicator />}
        </Text>
    );
}

export const Label = forwardRef<any, Omit<InnerLabelProps, "forwardedRef">>((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));

export type LabelProps = ComponentProps<typeof Label>;

Label.displayName = "Label";
