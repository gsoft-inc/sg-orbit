import { elementType, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

const ACCEPTED_HTML_ELEMENTS = [
    "br",
    "b",
    "i",
    "strong",
    "big",
    "em",
    "code",
    "sub",
    "sup",
    "del",
    "pre",
    "samp",
    "a",
    "span"
];

const propTypes = {
    /**
     * An HTML element type or a custom React element type to wrap the content within.
     */
    as: oneOfType([string, elementType]).isRequired
};

export function Wrap({ as: ElementType, children }) {
    if (isNil(children)) {
        return null;
    }

    let canWrap = false;

    if (typeof children === "string") {
        canWrap = true;
    }
    else if (Array.isArray(children)) {
        canWrap = children.every(x => {
            return typeof x === "string" || ACCEPTED_HTML_ELEMENTS.includes(x.type);
        });
    }

    return canWrap
        ? <ElementType>{children}</ElementType>
        : children;
}

Wrap.propTypes = propTypes;
