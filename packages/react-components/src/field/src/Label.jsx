import "./Label.css";

import { SIZE, mergeClasses, useSlotProps } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Whether or not the label identify a required field.
     */
    required: bool,
    /**
     * A label can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

const ADAPTED_SIZE = {
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium
};

export function InnerLabel(props) {
    const {
        htmlFor,
        required,
        size,
        as = "label",
        className,
        fieldId,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "label");

    const label = required ? `${children} *` : children;

    return (
        <Text
            data-testid="field-label"
            {...rest}
            htmlFor={htmlFor ?? fieldId}
            size={ADAPTED_SIZE[size ?? SIZE.medium]}
            className={mergeClasses(
                "o-ui-field-label",
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            {label}
        </Text>
    );
}

InnerLabel.propTypes = propTypes;

export const Label = forwardRef((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));
