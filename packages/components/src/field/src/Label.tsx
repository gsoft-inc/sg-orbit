import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, StyledComponentProps, mergeProps } from "../../shared";
import { Text } from "../../typography";
import { useFieldLabelProps } from "./FieldContext";

const DefaultElement = "label";

export interface InnerLabelProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
}

function RequiredIndicator() {
    return (
        <span aria-hidden="true" className="o-ui-field-label-required">*</span>
    );
}

export function InnerLabel(props: InnerLabelProps) {
    const [fieldProps] = useFieldLabelProps(props);

    const {
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
                    size: "md" as const
                }
            )}
        >
            {children}
        </Text>
    );
}

InnerLabel.defaultElement = DefaultElement;

export const Label = forwardRef<any, OmitInternalProps<InnerLabelProps>>((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));

export type LabelProps = ComponentProps<typeof Label>;
