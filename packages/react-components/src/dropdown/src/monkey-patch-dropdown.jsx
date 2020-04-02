import { Dropdown, Image as SemanticImage } from "semantic-ui-react";
import { DropdownContext } from "./context";
import { LARGE, MEDIUM, SMALL } from "../../shared";
import { get, invoke, isNil, isUndefined, size as lodashSize, noop } from "lodash";
import { isElement } from "react-is";
import cx from "classnames";
import keyboardKey from "keyboard-key";

// TODO:
// - Standard
// - Searchable
// - Multiple values

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

// Monkey patch fixes:
//
// When an option have an avatar, the avatar should be rendered in the selected item.
export class MonkeyPatchDropdown extends Dropdown {
    static contextType = DropdownContext;

    renderText = () => {
        const { multiple, placeholder, search, inline, text } = this.props;
        const { searchQuery, value, open, focus } = this.state;

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
                            {renderAvatar(item.avatar, this.context.size, inline)}
                            {itemText}
                        </>
                    );
                }
            }
        }
        else if (!open && !multiple && focus) {
            const item = this.getSelectedItem();
            const itemText = result = get(item, "text");

            if (!search && !isNil(item)) {
                if (!isNil(item.avatar)) {
                    result = (
                        <>
                            {renderAvatar(item.avatar, this.context.size, inline)}
                            {itemText}
                        </>
                    );
                }
            }
        }
        else if (hasValue) {
            const item = this.getItemByValue(value);
            const itemText = result = get(item, "text");

            if (!isNil(item)) {
                if (!isNil(item.avatar)) {
                    result = (
                        <>
                            {renderAvatar(item.avatar, this.context.size, inline)}
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

    selectItemOnEnter = e => {
        // debug("selectItemOnEnter()", keyboardKey.getKey(e));
        const { search } = this.props;

        console.log("** selectItemOnEnter");

        const shouldSelect =
          keyboardKey.getCode(e) === keyboardKey.Enter ||
          // https://github.com/Semantic-Org/Semantic-UI-React/pull/3766
          (!search && keyboardKey.getCode(e) === keyboardKey.Spacebar);

        console.log("** shouldSelect: ", shouldSelect);

        if (!shouldSelect) {
            return;
        }

        e.preventDefault();

        const optionSize = lodashSize(this.getMenuOptions());
        if (search && optionSize === 0) {
            return;
        }

        this.makeSelectedItemActive(e);
        this.closeOnChange(e);
        this.clearSearchQuery();

        if (search) {
            invoke(this.searchRef.current, "focus");
        }
    }

    closeOnChange = e => {
        const { closeOnChange, multiple } = this.props;
        const shouldClose = isUndefined(closeOnChange) ? !multiple : closeOnChange;

        console.log("** shouldClose: ", shouldClose);

        if (shouldClose) {this.close(e, noop);}

        const that = this;

        setTimeout(() => {
            console.log("** isOpen: ", that.state.open);
        }, 500);
    }
}

