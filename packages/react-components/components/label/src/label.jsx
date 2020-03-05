import { ArgumentError, BIG, HUGE, MASSIVE, MINI, mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";
import { Children, cloneElement, forwardRef } from "react";
import { Ref, Label as SemanticLabel } from "semantic-ui-react";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { createButtonFromShorthand } from "@orbit-ui/react-button";
import { createIconForControl } from "@orbit-ui/react-icons";
import { createTagFromShorthand } from "./factories";
import { isElement } from "react-is";
import { isNil } from "lodash";

const UNSUPPORTED_PROPS = ["attached", "color", "corner", "empty", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon"];

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const DEFAULT_SIZE = "medium";

const propTypes = {
    /**
     * A label can be colorless. Use this variant if you need to customize the label.
     */
    naked: bool,
    /**
     * A label can contain a button.
     */
    button: oneOfType([element, object]),
    /**
     * A label can contain an icon.
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * A label can contain a tag.
     */
    tag: oneOfType([element, object]),
    /**
     * Whether to add emphasis on the label text or not.
     */
    highlight: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    naked: false,
    iconPosition: "left",
    highlight: false,
    size: DEFAULT_SIZE
};

function throwWhenMutuallyExclusivePropsAreProvided({ button, tag, icon, iconPosition }) {
    if (!isNil(button) && iconPosition === "right") {
        throw new ArgumentError("@orbit-ui/react-label doesn't support having a button and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new ArgumentError("@orbit-ui/react-label doesn't support having a tag and a left positioned icon at the same time.");
    }
}

function throwWhenUnsupportedSizeIsProvided({ circular, size }) {
    if (circular) {
        if (size === MINI) {
            throw new ArgumentError(`@orbit-ui/react-label doesn't support "${MINI}" size when "circular".`);
        }
    } else {
        if (size === BIG || size === HUGE || size === MASSIVE) {
            throw new ArgumentError(`@orbit-ui/react-label doesn't support "${BIG}", "${HUGE}" or "${MASSIVE}" sizes.`);
        }
    }
}

export function PureLabel(props) {
    const { naked, button, icon, iconPosition, tag, highlight, size, className, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-label");
    throwWhenMutuallyExclusivePropsAreProvided(props);
    throwWhenUnsupportedSizeIsProvided(props);

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderLabel()}
            </Ref>
        );
    };

    const renderButton = () => {
        const defaults = {
            size: "tiny",
            circular: true,
            ghost: true,
            secondary: true,
            type: "button"
        };

        if (isElement(button)) {
            return cloneElement(button, defaults);
        }

        return createButtonFromShorthand({
            ...defaults,
            ...button
        });
    };

    const renderTag = () => {
        const defaults = {
            as: "span",
            size: "mini"
        };

        if (isElement(tag)) {
            return cloneElement(tag, defaults);
        }

        return createTagFromShorthand({
            ...defaults,
            ...tag
        });
    };

    const renderContent = () => {
        let left;
        let right;

        if (!isNil(icon)) {
            if (iconPosition === "right") {
                right = createIconForControl(icon, size);
            } else {
                left = createIconForControl(icon, size);
            }
        }

        if (!isNil(button)) {
            right = renderButton();
        }

        if (!isNil(tag)) {
            left = renderTag();
        }

        if (!isNil(left) || !isNil(right)) {
            return <>{!isNil(left) && left}{children}{!isNil(right) && right}</>;
        }

        return children;
    };

    const renderLabel = () => {
        const hasText = Children.count(children);

        const classes = mergeClasses(
            naked && "naked",
            highlight && "highlight",
            !isNil(button) && "with-button",
            !isNil(icon) && "with-icon",
            !isNil(icon) && iconPosition === "right" && "with-icon-right",
            !isNil(tag) && "with-tag",
            !hasText && "without-text",
            className
        );

        return (
            <SemanticLabel size={size} className={classes} {...rest}>
                {renderContent()}
            </SemanticLabel>
        );
    };

    return isNil(forwardedRef) ? renderLabel() : renderWithRef();
}

PureLabel.propTypes = propTypes;
PureLabel.defaultProps = defaultProps;

export const Label = forwardRef((props, ref) => (
    <PureLabel { ...props } forwardedRef={ref} />
));

[PureLabel, Label].forEach(x => {
    x.Detail = SemanticLabel.Detail;
    x.Group = SemanticLabel.Group;
});

