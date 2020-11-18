import { KEYS } from "../../shared";
import { SelectContext } from "./SelectContext";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { isNil } from "lodash";
import { renderAvatar } from "./renderAvatar";
import { renderIcons } from "./renderIcons";
import cx from "classnames";

export class MonkeyPatchSemanticDropdown extends SemanticDropdown {
    static contextType = SelectContext;

    openOnSpace = event => {
        const key = event.keyCode;

        // HACK: don't open on spacebar keydown since the Select component will take care of it.
        if (key === KEYS.space) {
            event.preventDefault();

            this.open(event);
        }
    }

    renderAvatarResult = ({ text, avatar }) => {
        const { inline } = this.props;
        const { size } = this.context;

        return (
            <>
                {renderAvatar(avatar, !inline ? size : undefined)}
                <span>{text}</span>
            </>
        );
    }

    renderIconsResult = ({ text, icons, iconsPosition }) => {
        const { inline } = this.props;
        const { size } = this.context;

        let left = null;
        let right = null;

        let renderedIcons = renderIcons(icons, size);

        if (inline) {
            renderedIcons = (
                <span className={iconsPosition === "right" ? "fr" : "fl"}>
                    {renderedIcons}
                </span>
            );
        }

        if (iconsPosition === "right") {
            right = renderedIcons;
        } else {
            left = renderedIcons;
        }

        return (
            <>
                {!isNil(left) && left}
                <span className="mr1">{text}</span>
                {!isNil(right) && right}
            </>
        );
    }

    renderCustomResult = item => {
        const { text, avatar, icons } = item;

        if (!isNil(avatar)) {
            return this.renderAvatarResult(item);
        } else if (!isNil(icons)) {
            return this.renderIconsResult(item);
        }

        return <span>{text}</span>;
    }

    // Monkey patch fixes:
    //
    // When a select option have an avatar or icons, the avatar or icons should be rendered in the selected item text.
    renderText = () => {
        const { multiple, placeholder, search, text } = this.props;
        const { searchQuery, value, open, focus } = this.state;

        let result = placeholder;

        const hasValue = this.hasValue();

        if (!isNil(text)) {
            result = text;
        } else if (!multiple) {
            if (open && focus) {
                const item = this.getSelectedItem();

                if (!isNil(item)) {
                    if (!search) {
                        result = this.renderCustomResult(item);
                    } else {
                        result = item.text;
                    }
                }
            } else if (hasValue) {
                const item = this.getItemByValue(value);

                if (!isNil(item)) {
                    if (!search || !focus) {
                        result = this.renderCustomResult(item);
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

    // Monkey patch fixes:
    //
    // When a select close on escape, the select trigger should be focused instead of the body.
    closeOnEscape = event => {
        const { closeOnEscape } = this.props;

        if (closeOnEscape) {
            if (event.keyCode === KEYS.esc) {
                event.preventDefault();

                this.close(event);

                setTimeout(() => {
                    if (!isNil(this.ref.current)) {
                        this.ref.current.focus();
                    }
                }, 0);
            }
        }
    }
}

