import { DropdownMenuItem } from "./item";
import { isNil } from "lodash";
import { string } from "prop-types";

const propTypes = {
    href: string.isRequired,
    target: string,
    rel: string
};

export function DropdownMenuLinkItem(props) {
    return <DropdownMenuItem {...props} as="a" />;
}

DropdownMenuLinkItem.propTypes = propTypes;

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
