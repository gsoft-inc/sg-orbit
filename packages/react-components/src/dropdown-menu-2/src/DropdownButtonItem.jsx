import { DropdownItem } from "./DropdownItem";
import { elementType, func, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Called when a click event happens.
     */
    onClick: func.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownButtonItem({ as, ...props }) {
    return <DropdownItem {...props} as={as} />;
}

InnerDropdownButtonItem.propTypes = propTypes;
InnerDropdownButtonItem.defaultProps = defaultProps;

export const DropdownButtonItem = forwardRef((props, ref) => (
    <InnerDropdownButtonItem {...props} forwardedRef={ref} />
));

DropdownButtonItem.name = "DropdownItem";
