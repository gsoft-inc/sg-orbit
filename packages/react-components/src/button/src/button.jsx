/* eslint-disable react/forbid-foreign-prop-types */

import { ArgumentError, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { Children, cloneElement, forwardRef } from "react";
import { Ref, Button as SemanticButton } from "semantic-ui-react";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { createIconForControl } from "../../icons";
import { createLabelFromShorthand } from "../../label";
import { createTagFromShorthand } from "../../tag";
import { isElement } from "react-is";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["mini", "tiny", "small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["animated", "attached", "color", "labelPosition", "floated", "inverted"];

const propTypes = {
    /**
     * A ghost button doesn't have a background color until it's hovered.
     */
    ghost: bool,
    /**
     * A button can look like a link.
     */
    link: bool,
    /**
     * A button can contain an icon.
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
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
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
    /**
     * @ignore
     */
    loading: bool,
    /**
     * @ignore
     */
    disabled: bool,
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
    link: false,
    iconPosition: "left",
    naked: false,
    size: DEFAULT_SIZE,
    type: "button",
    loading: false,
    disabled: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ label, tag, icon, iconPosition }) {
    if (!isNil(label) && !isNil(icon) && iconPosition === "right") {
        throw new ArgumentError("@orbit-ui/react-components/button doesn't support having a label and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new ArgumentError("@orbit-ui/react-components/button doesn't support having a tag and a left positioned icon at the same time.");
    }
}

export function PureButton(props) {
    const { basic, ghost, link, naked, icon, iconPosition, label, tag, size, loading, disabled, className, forwardedRef, children, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/button");
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
            size: "mini",
            highlight: true,
            disabled: disabled
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
            size: "mini",
            disabled: disabled
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
        if (!loading) {
            let left;
            let right;

            if (!isNil(icon)) {
                if (iconPosition === "right") {
                    right = createIconForControl(icon, size);
                } else {
                    left = createIconForControl(icon, size);
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
        }

        return children;
    };

    const renderButton = () => {
        const hasText = Children.count(children) > 0;

        const classes = mergeClasses(
            naked && "naked",
            ghost && "ghost",
            link && "link",
            !isNil(icon) && "with-icon",
            !isNil(icon) && iconPosition === "right" && "with-icon-right",
            !isNil(label) && "with-label",
            !isNil(tag) && "with-tag",
            !hasText && "without-text",
            className
        );

        return (
            <SemanticButton
                data-testid="button"
                {...rest}
                basic={basic}
                size={size}
                loading={loading}
                disabled={disabled}
                className={classes}
            >
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
