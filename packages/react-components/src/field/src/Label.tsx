import "./Label.css";

import { ElementType, ForwardedRef, ReactNode } from "react";
import { Text } from "../../text";
import { createSizeAdapter, cssModule, forwardRef, mergeProps, normalizeSize } from "../../shared";
import { useFieldLabelProps } from "./FieldContext";

export interface InnerLabelProps {
    /**
     * Whether or not the label show a required state.
     */
    required?: boolean;
    /**
     * A label can vary in size.
     */
    size?: "sm" | "md";
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

const adaptSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

function RequiredIndicator() {
    return (
        <span className="o-ui-field-label-required" focusable="false" aria-hidden="true">*</span>
    );
}

export function InnerLabel(props: InnerLabelProps) {
    const [fieldProps] = useFieldLabelProps(props);

    const {
        required,
        size,
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
            {...mergeProps(
                rest,
                {
                    size: adaptSize(size),
                    className: cssModule(
                        "o-ui-field-label",
                        normalizeSize(size)
                    ),
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

Label.displayName = "Label";
