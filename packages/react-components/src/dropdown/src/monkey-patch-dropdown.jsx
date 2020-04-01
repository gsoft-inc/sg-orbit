import { Dropdown, Image as SemanticImage } from "semantic-ui-react";
import { DropdownContext } from "./context";
import { LARGE, MEDIUM, SMALL } from "../../shared";
import { get, isNil } from "lodash";
import { isElement } from "react-is";
import cx from "classnames";

// TODO:
// - Standard
// - Searchable
// - Multiple values

const SIZES_TO_AVATAR = {
    [SMALL]: "tiny",
    [MEDIUM]: "small",
    [LARGE]: "small"
};

function renderAvatar(avatar, size) {
    const defaults = {
        avatar: true,
        size: SIZES_TO_AVATAR[size]
    };

    if (!isNil(avatar)) {
        if (isElement(avatar)) {
            return (
                <SemanticImage {...defaults}>
                    {avatar}
                </SemanticImage>
            );
        }

        return SemanticImage.create({
            ...avatar,
            ...defaults
        });
    }
}

// Monkey patch fixes:
//
// When an option have an avatar, the avatar should be rendered in the selected item.
export class MonkeyPatchDropdown extends Dropdown {
    static contextType = DropdownContext;

    renderText = () => {
        const { multiple, placeholder, search, text } = this.props;
        const { searchQuery, value, open } = this.state;

        const hasValue = this.hasValue();
        let result = placeholder;

        if (text) {
            result = text;
        } else if (open && !multiple) {
            const item = this.getSelectedItem();
            const itemText = result = get(item, "text");

            if (!search && !isNil(item)) {
                if (!isNil(item.avatar)) {
                    result = (
                        <>
                            {renderAvatar(item.avatar, this.context.size)}
                            {itemText}
                        </>
                    );
                }
            }
        } else if (hasValue) {
            const item = this.getItemByValue(value);
            const itemText = result = get(item, "text");

            if (!isNil(item)) {
                if (!isNil(item.avatar)) {
                    result = (
                        <>
                            {renderAvatar(item.avatar, this.context.size)}
                            {itemText}
                        </>
                    );
                }
            }
        }

        const classes = cx(
            placeholder && !hasValue && "default",
            "text",
            search && searchQuery && "filtered"
        );

        return (
            <div className={classes} role="alert" aria-live="polite" aria-atomic>
                {result}
            </div>
        );
    }
}

