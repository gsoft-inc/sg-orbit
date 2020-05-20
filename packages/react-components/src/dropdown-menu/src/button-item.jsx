import { DropdownMenuItem } from "./item";
import { func } from "prop-types";
import { isNil } from "lodash";

const propTypes = {
    onClick: func.isRequired
};

export function DropdownMenuButtonItem(props) {
    return <DropdownMenuItem {...props} as="button" />;
}

DropdownMenuButtonItem.propTypes = propTypes;

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
