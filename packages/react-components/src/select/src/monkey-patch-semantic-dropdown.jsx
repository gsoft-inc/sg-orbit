import { Dropdown } from "semantic-ui-react";
import { DropdownContext } from "../../dropdown";
import { get, isNil } from "lodash";
import { renderAvatar, renderIcons } from "./item";
import cx from "classnames";

export class MonkeyPatchSemanticDropdown extends Dropdown {
    static contextType = DropdownContext;

    // Monkey patch fixes:
    //
    // When an option have an avatar or icons, the avatar or icons should be rendered in the selected item text.
    renderText = () => {
        const { multiple, placeholder, search, inline, text } = this.props;
        const { searchQuery, value, open, focus } = this.state;

        const hasValue = this.hasValue();
        let result = placeholder;

        if (!isNil(text)) {
            result = text;
        } else {
            const toAvatarResult = ({ avatar }, itemText) => {
                return (
                    <>
                        {renderAvatar(avatar, !inline ? this.context.size : undefined, { inline })}
                        {itemText}
                    </>
                );
            };

            const toIconsResult = ({ icons, iconsPosition }, itemText) => {
                let left = null;
                let right = null;

                if (iconsPosition === "right") {
                    right = renderIcons(icons, this.context.size, inline ? { className: "fr" } : undefined);
                } else {
                    left = renderIcons(icons, this.context.size, inline ? { className: "fl" } : undefined);
                }

                return (
                    <>
                        {!isNil(left) && left}
                        <span className="mr1">{itemText}</span>
                        {!isNil(right) && right}
                    </>
                );
            };

            if ((open && !multiple) || (!open && !multiple && focus)) {
                const item = this.getSelectedItem();
                const itemText = result = get(item, "text");

                if (!search && !isNil(item)) {
                    if (!isNil(item.avatar)) {
                        result = toAvatarResult(item, itemText);
                    } else if (!isNil(item.icons)) {
                        result = toIconsResult(item, itemText);
                    }
                }

            } else if (hasValue) {
                const item = this.getItemByValue(value);
                const itemText = result = get(item, "text");

                if (!isNil(item)) {
                    if (!isNil(item.avatar)) {
                        result = toAvatarResult(item, itemText);
                    } else if (!isNil(item.icons)) {
                        result = toIconsResult(item, itemText);
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

