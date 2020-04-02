import { Dropdown, Image as SemanticImage } from "semantic-ui-react";
import { DropdownContext } from "./context";
import { LARGE, MEDIUM, SMALL } from "../../shared";
import { get, isNil } from "lodash";
import { isElement } from "react-is";
import cx from "classnames";

const SIZES_TO_AVATAR = {
    [SMALL]: "tiny",
    [MEDIUM]: "small",
    [LARGE]: "small"
};

function renderAvatar(avatar, size, isInlineSelect) {
    const defaults = {
        avatar: true,
        size: isInlineSelect ? undefined : SIZES_TO_AVATAR[size],
        inline: isInlineSelect
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

export class MonkeyPatchDropdown extends Dropdown {
    static contextType = DropdownContext;

    // Monkey patch fixes:
    //
    // When an option have an avatar, the avatar should be rendered in the selected item.
    renderText = () => {
        const { multiple, placeholder, search, inline, text } = this.props;
        const { searchQuery, value, open, focus } = this.state;

        const hasValue = this.hasValue();
        let result = placeholder;

        if (!isNil(text)) {
            result = text;
        } else {
            const toAvatarResult = (item, itemText) => {
                return (
                    <>
                        {renderAvatar(item.avatar, this.context.size, inline)}
                        {itemText}
                    </>
                );
            };

            if ((open && !multiple) || (!open && !multiple && focus)) {
                const item = this.getSelectedItem();
                const itemText = result = get(item, "text");

                if (!search && !isNil(item)) {
                    if (!isNil(item.avatar)) {
                        result = toAvatarResult(item, itemText);
                    }
                }

            } else if (hasValue) {
                const item = this.getItemByValue(value);
                const itemText = result = get(item, "text");

                if (!isNil(item)) {
                    if (!isNil(item.avatar)) {
                        result = toAvatarResult(item, itemText);
                    }
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

