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

function createItem(text, href) {
    return {
        as: "a",
        text,
        href,
        tabIndex: "-1",
        key: text
    };
}

export function dropdownMenuLinkItem(text, href, additionalProps) {
    if (!isNil(additionalProps)) {
        const { target, rel } = additionalProps;

        return {
            ...createItem(text, href, target),
            rel: isNil(rel) && !isNil(target) ? "noreferrer" : undefined,
            ...additionalProps
        };
    }

    return createItem(text, href);
}
