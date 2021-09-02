import "./Label.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { Text } from "../../typography";
import { useFieldLabelProps } from "./FieldContext";

const DefaultElement = "label";

export interface InnerLabelProps extends InternalProps, Omit<StyledComponentProps<typeof DefaultElement>, "color"> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the label show a required state.
     */
    required?: boolean;
}

function RequiredIndicator() {
    return (
        <span aria-hidden="true" className="o-ui-field-label-required">*</span>
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
                    as,
                    className: "o-ui-field-label",
                    ref: forwardedRef,
                    size: "md"
                } as const
            )}
        >
            {children}
            {required && <RequiredIndicator />}
        </Text>
    );
}

export const Label = forwardRef<any, OmitInternalProps<InnerLabelProps>>((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));

export type LabelProps = ComponentProps<typeof Label>;
