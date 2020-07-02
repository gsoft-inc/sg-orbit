import { DropdownItem } from "./DropdownItem";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "button"
};

export function InnerDropdownButtonItem({ forwardedRef, ...rest }) {
    return (
        <DropdownItem
            {...rest}
            className="dropdown-button-item"
            ref={forwardedRef}
        />
    );
}

InnerDropdownButtonItem.propTypes = propTypes;
InnerDropdownButtonItem.defaultProps = defaultProps;

export const DropdownButtonItem = forwardRef((props, ref) => (
    <InnerDropdownButtonItem {...props} forwardedRef={ref} />
));
