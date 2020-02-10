/* eslint-disable react/forbid-foreign-prop-types */

import { ArgumentError, mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";
import { Children, cloneElement, forwardRef } from "react";
import { Ref, Button as SemanticButton } from "semantic-ui-react";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { createIconFromExisting } from "@orbit-ui/icons";
import { createLabelFromShorthand, createTagFromShorthand } from "@orbit-ui/react-label";
import { isElement } from "react-is";
import { isNil } from "lodash";

const UNSUPPORTED_PROPS = ["animated", "attached", "color", "labelPosition", "floated", "inverted"];
const SIZES = ["tiny", "small", "medium", "large"];

const propTypes = {
    /**
     * A ghost button doesn't have a background color until it's hovered.
     */
    ghost: bool,
    /**
     * A button can contain an icon.
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["right", "left"]),
    /**
     * A button can contain a label.
     */
    label: oneOfType([element, object]),
    /**
     * A button can contain a tag.
     */
    tag: oneOfType([element, object]),
    /**
     * A button can be colorless. Use this variant if you need to customize the button.
     */
    naked: bool,
    /**
     * @ignore
     */
    size: oneOf(SIZES),
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
    ghost: false,
    iconPosition: "left",
    naked: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ label, tag, icon, iconPosition }) {
    if (!isNil(label) && !isNil(icon) && iconPosition === "right") {
        throw new ArgumentError("@orbit/react-button doesn't support having a label and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new ArgumentError("@orbit/react-button doesn't support having a tag and a left positioned icon at the same time.");
    }
}

export function PureButton(props) {
    const { naked, ghost, icon, iconPosition, label, tag, size, className, forwardedRef, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-button");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderButton()}
            </Ref>
        );
    };

    const renderLabel = () => {
        const defaults = {
            as: "span",
            size: "mini"
        };

        if (isElement(label)) {
            return cloneElement(label, defaults);
        }

        return createLabelFromShorthand({
            ...defaults,
            ...label
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
                right = createIconFromExisting(icon, size);
            } else {
                left = createIconFromExisting(icon, size);
            }
        }

        if (!isNil(label)) {
            right = renderLabel();
        }

        if (!isNil(tag)) {
            left = renderTag();
        }

        if (!isNil(left) || !isNil(right)) {
            return <>{!isNil(left) && left}{children}{!isNil(right) && right}</>;
        }

        return children;
    };

    const renderButton = () => {
        const hasText = Children.count(children);

        const classes = mergeClasses(
            naked && "naked",
            ghost && "ghost",
            !isNil(icon) && "with-icon",
            !isNil(icon) && iconPosition === "right" && "with-icon-right",
            !isNil(label) && "with-label",
            !isNil(tag) && "with-tag",
            !hasText && "without-text",
            className
        );

        return (
            <SemanticButton size={size} className={classes} {...rest}>
                {renderContent()}
            </SemanticButton>
        );
    };

    return isNil(forwardedRef) ? renderButton() : renderWithRef();
}

PureButton.propTypes = propTypes;
PureButton.defaultProps = defaultProps;

export const Button = forwardRef((props, ref) => (
    <PureButton { ...props } forwardedRef={ref} />
));

// Button.Or is not supported yet.
[PureButton, Button].forEach(x => {
    x.Content = SemanticButton.Content;
    x.Group = SemanticButton.Group;
});

if (!isNil(SemanticButton.propTypes)) {
    SemanticButton.propTypes.size = oneOf(SIZES);
}
