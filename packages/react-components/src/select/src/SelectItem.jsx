import { SelectContext } from "./SelectContext";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { arrayOf, element, oneOf, oneOfType, shape, string } from "prop-types";
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

function Text({ hasRightContent, children }) {
    return (
        <span
            className={mergeClasses(
                "text",
                hasRightContent && "mr1"
            )}
        >
            {children}
        </span>
    );
}

function Description({ children }) {
    return <span className="description">{children}</span>;
}

function Content({ icons, iconsPosition, avatar, description, size, children }) {
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

    return (
        <>
            {!isNil(left) && left}
            {!isNil(children) && <Text hasRightContent={!isNil(right)}>{children}</Text>}
            {!isNil(right) && right}
            {!isNil(description) && <Description>{description}</Description>}
        </>
    );
}

export function SelectItem(props) {
    const { text, icons, iconsPosition, avatar, description, ...rest } = props;
    const { size } = useContext(SelectContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/SelectItem");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    return (
        <SemanticDropdown.Item {...rest}>
            <Content icons={icons} iconsPosition={iconsPosition} avatar={avatar} description={description} size={size}>
                {text}
            </Content>
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
