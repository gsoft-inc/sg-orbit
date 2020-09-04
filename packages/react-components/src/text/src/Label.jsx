import { Text } from "./Text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useSlotProps } from "../../shared";

const propTypes = {
    /**
     * A label can vary in size.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerLabel(props) {
    const {
        children,
        as = "span",
        forwardedRef,
        ...rest
    } = useSlotProps(props, "label");

    return (
        <Text
            {...rest}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Text>
    );
}

InnerLabel.propTypes = propTypes;

export const Label = forwardRef((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));
