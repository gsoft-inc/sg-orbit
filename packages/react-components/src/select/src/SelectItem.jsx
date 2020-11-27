import { SelectContext } from "./SelectContext";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { arrayOf, bool, element, number, oneOf, oneOfType, shape, string } from "prop-types";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { renderAvatar } from "./renderAvatar";
import { renderIcons } from "./renderIcons";
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
    value: oneOfType([bool, number, string]),
    /**
     * A description to display with less emphasize.
     */
    description: string,
    /**
     * Avatar rendered before the text.
     */
    avatar: oneOfType([element, shape(AVATAR_SHAPE)]),
    /**
     * [Icon](/?path=/docs/icon--default-story) components rendered before or after the text.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * Icons can appear on the left or right of the text.
     */
    iconsPosition: oneOf(["left", "right"])
};

const defaultProps = {
    iconsPosition: "left"
};

function throwWhenMutuallyExclusivePropsAreProvided({ icons, iconsPosition, avatar }) {
    if (!isNil(icons) && iconsPosition === "left" && !isNil(avatar)) {
        throw new Error("@orbit-ui/react-components/SelectItem doesn't support having a left positioned icons and an avatar at the same time.");
    }
}

export function SelectItem(props) {
    const { text, icons, iconsPosition, avatar, description, className, ...rest } = props;
    const { size } = useContext(SelectContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/SelectItem");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const iconsMarkup = !isNil(icons) && renderIcons(icons, size);

    const avatarMarkup = !isNil(avatar) && renderAvatar(avatar, size);

    const textMarkup = !isNil(text) && (
        <span className="text">
            {text}
        </span>
    );

    const descriptionMarkup = !isNil(description) && (
        <span className="description">
            {description}
        </span>
    );

    const content = (
        <>
            {iconsPosition === "left" && iconsMarkup}{avatarMarkup}
            {textMarkup}
            {iconsPosition === "right" && iconsMarkup}
            {descriptionMarkup}
        </>
    );

    return (
        <SemanticDropdown.Item
            {...rest}
            className={mergeClasses(
                avatarMarkup && "with-avatar",
                iconsMarkup && iconsPosition === "left" && "with-icons-left",
                iconsMarkup && iconsPosition === "right" && "with-icons-right",
                className
            )}
        >
            {content}
        </SemanticDropdown.Item>
    );
}

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

SemanticDropdown.Item.create = props => {
    return <SelectItem {...props} />;
};

// ***** API *****

export function selectItem(text, value, props = {}) {
    return {
        text,
        value,
        key: value,
        ...props
    };
}
