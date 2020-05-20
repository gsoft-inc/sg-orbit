import { ArgumentError, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Dropdown, DropdownContext } from "../../dropdown";
import { arrayOf, bool, element, oneOf, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";
import { renderAvatar } from "./render-avatar";
import { renderIcons } from "./render-icons";
import { useContext } from "react";

const UNSUPPORTED_PROPS = ["content", "flag", "icon", "image", "label"];

const AVATAR_SHAPE = {
    src: string.isRequired,
    alt: string
};

const propTypes = {
    /**
     * The item text.
     */
    text: string,
    /**
     * The item value.
     */
    value: string,
    /**
     * A description to display with less emphasize.
     */
    description: string,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display an avatar before the text.
     */
    avatar: oneOfType([element, shape(AVATAR_SHAPE)]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for [icons](/?path=/docs/components-icon--default-story).
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * Icons can appear on the left or right of the item content.
     */
    iconsPosition: oneOf(["left", "right"]),
    /**
     * A disabled item cannot be selected.
     */
    disabled: bool
};

const defaultProps = {
    iconsPosition: "left",
    disabled: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ icons, iconsPosition, avatar }) {
    if (!isNil(icons) && iconsPosition === "left" && !isNil(avatar)) {
        throw new ArgumentError("@orbit-ui/react-components/select/item doesn't support having a left positioned icons and an avatar at the same time.");
    }
}

function useTextRenderer({ text }) {
    return hasRightContent => {
        if (!isNil(text)) {
            const classes = mergeClasses(
                "text",
                hasRightContent && "mr1"
            );

            return <span className={classes}>{text}</span>;
        }
    };
}

function useDescriptionRenderer({ description }) {
    return () => {
        if (!isNil(description)) {
            return <span className="description">{description}</span>;
        }
    };
}

function useContentRenderer({ text, icons, iconsPosition, avatar, description }, size) {
    const renderText = useTextRenderer({ text });
    const renderDescription = useDescriptionRenderer({ description });

    return () => {
        let left;
        let right;

        if (!isNil(icons)) {
            if (iconsPosition === "right") {
                right = renderIcons(icons, size);
            } else {
                left = renderIcons(icons, size);
            }
        }

        if (!isNil(avatar)) {
            left = renderAvatar(avatar, size);
        }

        return <>{!isNil(left) && left}{renderText(!isNil(right))}{!isNil(right) && right}{renderDescription()}</>;
    };
}

function useRenderer({ rest }, content) {
    return () => {
        return (
            <Dropdown.Item {...rest}>
                {content}
            </Dropdown.Item>
        );
    };
}

export function SelectItem(props) {
    const { text, icons, iconsPosition, avatar, description, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/select/item");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const { size } = useContext(DropdownContext);

    const renderContent = useContentRenderer({ text, icons, iconsPosition, avatar, description }, size);
    const render = useRenderer({ rest }, renderContent());

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

// ***** API *****

export function createSelectItem(props) {
    return <SelectItem {...props} />;
}

export function selectItem(text, value, additionalProps) {
    if (!isNil(additionalProps)) {
        return {
            text,
            value,
            key: value,
            ...additionalProps
        };
    }

    return {
        text,
        value,
        key: value
    };
}
