import { Text } from "./Text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useSlotProps } from "../../shared";

const propTypes = {
    /**
     * A text can vary in size.
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

const defaultProps = {
    as: "span"
};

export function InnerLabel(props) {
    const {
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "label");

    return (
        <Text
            {...rest}
            ref={forwardedRef}
        >
            {children}
        </Text>
    );
}

InnerLabel.propTypes = propTypes;
InnerLabel.defaultProps = defaultProps;

export const Label = forwardRef((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));
