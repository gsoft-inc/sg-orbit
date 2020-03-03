import { ArgumentError, mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";
import { DropdownContext } from "./context";
import { Dropdown as SemanticDropdown, Image as SemanticImage } from "semantic-ui-react";
import { arrayOf, element, oneOf, oneOfType, shape, string } from "prop-types";
import { createIconForControl } from "@orbit-ui/react-icons";
import { isArray, isNil } from "lodash";
import { isElement } from "react-is";
import { useContext } from "react";

const UNSUPPORTED_PROPS = ["content", "flag", "icon", "image", "label"];

const AVATAR_SHAPE = {
    src: string.isRequired,
    alt: string
};

const propTypes = {
    /**
     * A dropdown item can display an avatar before it's content.
     */
    avatar: oneOfType([element, shape(AVATAR_SHAPE)]),
    /**
     * A dropdown item can display icons.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * Icons can appear on the left or right of the item content.
     */
    iconsPosition: oneOf(["left", "right"]),
    /**
     * @ignore
     */
    text: string,
    /**
     * @ignore
     */
    description: string,
    /**
     * @ignore
     */
    raw: element
};

const defaultProps = {
    iconsPosition: "left"
};

function throwWhenMutuallyExclusivePropsAreProvided({ icons, iconsPosition, avatar }) {
    if (!isNil(icons) && iconsPosition === "left" && !isNil(avatar)) {
        throw new ArgumentError("@orbit-ui/react-dropdown/item doesn't support having an left positioned icons and an avatar at the same time.");
    }
}

function renderIcons(icons, size) {
    const normalizedIcons = isArray(icons) ? icons : [icons];

    return <>{normalizedIcons.map((x, index) => createIconForControl(x, size, { key: index }))}</>;
}

export function DropdownItem(props) {
    const { text, icons, iconsPosition, avatar, description, children, ...rest } = props;
    const context = useContext(DropdownContext);

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-dropdown/item");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const renderAvatar = () => {
        if (!isNil(avatar)) {
            if (isElement(avatar)) {
                return avatar;
            }

            return SemanticImage.create({
                ...avatar,
                avatar: true,
                size: "mini"
            });
        }
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
        <SemanticDropdown.Item {...rest}>
            {renderContent()}
        </SemanticDropdown.Item>
    );
}

DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

DropdownItem.create = ({ raw, ...rest }) => {
    return (
        <DropdownItem {...rest}>
            {raw}
        </DropdownItem>
    );
};
