import { Dropdown } from "semantic-ui-react";
import { DropdownContext } from "../../dropdown";
import { get, isNil } from "lodash";
import { renderAvatar } from "./avatar";
import cx from "classnames";

export class MonkeyPatchSemanticDropdown extends Dropdown {
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
                        {renderAvatar(item.avatar, !inline ? this.context.size : undefined, { inline })}
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

