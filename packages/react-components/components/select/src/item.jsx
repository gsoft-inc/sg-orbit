import { ArgumentError, LARGE, MEDIUM, SMALL, mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";
import { Dropdown, DropdownContext } from "@orbit-ui/react-dropdown";
import { Image as SemanticImage } from "semantic-ui-react";
import { arrayOf, bool, element, oneOf, oneOfType, shape, string } from "prop-types";
import { createIconForControl } from "@orbit-ui/react-icons";
import { isArray, isNil } from "lodash";
import { isElement } from "react-is";
import { useContext } from "react";

const UNSUPPORTED_PROPS = ["content", "flag", "icon", "image", "label"];

const AVATAR_SHAPE = {
    src: string.isRequired,
    alt: string
};

const SIZES_TO_AVATAR = {
    [SMALL]: "tiny",
    [MEDIUM]: "small",
    [LARGE]: "small"
};

const propTypes = {
    /**
     * The item text.
     */
    text: string,
    /**
     * A description to display with less emphasize.
     */
    description: string,
    /**
     * A select item can display an avatar before it's content.
     */
    avatar: oneOfType([element, shape(AVATAR_SHAPE)]),
    /**
     * A select item can display icons.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * Icons can appear on the left or right of the item content.
     */
    iconsPosition: oneOf(["left", "right"]),
    /**
     * A disabled select item cannot be selected.
     */
    disabled: bool,
    /**
     * @ignore
     */
    raw: element
};

const defaultProps = {
    iconsPosition: "left",
    disabled: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ icons, iconsPosition, avatar }) {
    if (!isNil(icons) && iconsPosition === "left" && !isNil(avatar)) {
        throw new ArgumentError("@orbit-ui/react-select/item doesn't support having a left positioned icons and an avatar at the same time.");
    }
}

export function SelectItem(props) {
    const { text, icons, iconsPosition, avatar, description, children, ...rest } = props;
    const context = useContext(DropdownContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-select/item");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const renderAvatar = () => {
        const defaults = {
            avatar: true,
            size: SIZES_TO_AVATAR[context.size]
        };

        if (isElement(avatar)) {
            return <SemanticImage {...defaults}>{avatar}</SemanticImage>;
        }

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
    };

    const renderIcons = () => {
        const normalizedIcons = isArray(icons) ? icons : [icons];

        return <>{normalizedIcons.map((x, index) => createIconForControl(x, context.size, { key: index }))}</>;
    };

    const renderText = hasRightContent => {
        if (!isNil(text)) {
            const classes = mergeClasses(
                "text",
                hasRightContent && "mr1"
            );

            return <span className={classes}>{text}</span>;
        }
    };

    const renderDescription = () => {
        if (!isNil(description)) {
            return <span className="description">{description}</span>;
        }
    };

    const renderContent = () => {
        let left;
        let right;

        if (!isNil(icons)) {
            if (iconsPosition === "right") {
                right = renderIcons(icons, context.size);
            } else {
                left = renderIcons(icons, context.size);
            }
        }

        if (!isNil(avatar)) {
            left = renderAvatar();
        }

        if (!isNil(text) || !isNil(description) || !isNil(left) || !isNil(right)) {
            return <>{!isNil(left) && left}{renderText(!isNil(right))}{!isNil(right) && right}{renderDescription()}</>;
        }

        return children;
    };

    return (
        <Dropdown.Item {...rest}>
            {renderContent()}
        </Dropdown.Item>
    );
}

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

export function createSelectItem(props) {
    return <SelectItem {...props} />;
}
