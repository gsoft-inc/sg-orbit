import { Dropdown } from "semantic-ui-react";
import { DropdownContext } from "../../dropdown";
import { isNil } from "lodash";
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

        let result = placeholder;
        const hasValue = this.hasValue();

        if (!isNil(text)) {
            result = text;
        } else if (!multiple) {
            const toAvatarResult = ({ text: itemText, avatar }) => {
                return (
                    <>
                        {renderAvatar(avatar, !inline ? this.context.size : undefined, { inline })}
                        {itemText}
                    </>
                );
            };

            const toIconsResult = ({ text: itemText, icons, iconsPosition }) => {
                let left = null;
                let right = null;

                if (iconsPosition === "right") {
                    right = renderIcons(icons, this.context.size, inline, iconsPosition);
                } else {
                    left = renderIcons(icons, this.context.size, inline, iconsPosition);
                }

                return (
                    <>
                        {!isNil(left) && left}
                        <span className="mr1">{itemText}</span>
                        {!isNil(right) && right}
                    </>
                );
            };

            const tryRenderCustomContent = item => {
                if (!isNil(item.avatar)) {
                    result = toAvatarResult(item);
                } else if (!isNil(item.icons)) {
                    result = toIconsResult(item);
                }
            };

            if (open && focus) {
                const item = this.getSelectedItem();

                if (!isNil(item)) {
                    if (!search) {
                        tryRenderCustomContent(this.getSelectedItem());
                    } else {
                        result = item.text;
                    }
                }
            }
            else if (hasValue) {
                const item = this.getItemByValue(value);

                if (!isNil(item)) {
                    if (!search || !focus) {
                        tryRenderCustomContent(item);
                    } else {
                        result = item.text;
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

