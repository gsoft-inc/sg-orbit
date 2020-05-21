import { DropdownMenuItem } from "./item";
import { elementType, func, oneOfType, string } from "prop-types";

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

export function DropdownMenuButtonItem({ as, ...props }) {
    return <DropdownMenuItem {...props} as={as} />;
}

DropdownMenuButtonItem.propTypes = propTypes;
DropdownMenuButtonItem.defaultProps = defaultProps;

// ***** API *****

export function dropdownMenuButtonItem(text, onClick, props = {}) {
    return {
        as: "button",
        text,
        onClick,
        tabIndex: "-1",
        key: text,
        ...props
    };
}
