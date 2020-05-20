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

function createItem(text, onClick) {
    return {
        as: "button",
        text,
        onClick,
        tabIndex: "-1",
        key: text
    };
}

export function dropdownMenuButtonItem(text, onClick, additionalProps) {
    if (!isNil(additionalProps)) {
        return {
            ...createItem(text, onClick),
            ...additionalProps
        };
    }

    return createItem(text, onClick);
}
