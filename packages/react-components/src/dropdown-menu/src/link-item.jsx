import { DropdownMenuItem } from "./item";
import { elementType, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

const propTypes = {
    /**
     * The HTML href attribute.
     */
    href: string.isRequired,
    /**
     * The HTML target attribute.
     */
    target: string,
    /**
     * The HTML rel attribute.
     */
    rel: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "a"
};

export function DropdownMenuLinkItem({ as, ...props }) {
    return <DropdownMenuItem {...props} as={as} />;
}

DropdownMenuLinkItem.propTypes = propTypes;
DropdownMenuLinkItem.defaultProps = defaultProps;

// ***** API *****

export function dropdownMenuLinkItem(text, href, props = {}) {
    const { target, rel } = props;

    return {
        as: "a",
        text,
        href,
        tabIndex: "-1",
        key: text,
        rel: isNil(rel) && !isNil(target) ? "noopener noreferrer" : undefined,
        ...props
    };
}
