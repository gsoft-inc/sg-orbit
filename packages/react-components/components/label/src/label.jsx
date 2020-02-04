import { ArgumentError, mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";
import { Ref, Label as SemanticLabel } from "semantic-ui-react";
import { bool, element, func, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef } from "react";
import { createButtonFromShorthand } from "@orbit-ui/react-button";
import { createIconFromExisting } from "@orbit-ui/icons";
import { createTagFromShorthand } from "./factories";
import { isElement } from "react-is";
import { isNil } from "lodash";

const UNSUPPORTED_PROPS = ["attached", "color", "corner", "empty", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon"];

const propTypes = {
    /**
     * A label can be colorless. Use this variant if you need to customize the label.
     */
    naked: bool,
    /**
     * A label can contain a button. Can be a button element or shorthand props.
     */
    button: oneOfType([element, object]),
    /**
     * A label can contain an icon.
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["right", "left"]),
    /**
     * A label can contain a tag. Can be a tag element or shorthand props.
     */
    tag: oneOfType([element, object]),
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
    iconPosition: "left"
};

function throwWhenMutuallyExclusivePropsAreProvided({ button, tag, icon, iconPosition }) {
    if (!isNil(button) && iconPosition === "right") {
        throw new ArgumentError("@orbit/react-label doesn't support having a button and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new ArgumentError("@orbit/react-label doesn't support having a tag and a left positioned icon at the same time.");
    }
}

export function PureLabel(props) {
    const { naked, button, icon, iconPosition, tag, className, children, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-label");
    throwWhenMutuallyExclusivePropsAreProvided(props);

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
                right = createIconFromExisting(icon);
            } else {
                left = createIconFromExisting(icon);
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
        const classes = mergeClasses(
            naked && "naked",
            !isNil(button) && "with-button",
            !isNil(icon) && "with-icon",
            !isNil(icon) && iconPosition === "right" && "with-icon-right",
            !isNil(tag) && "with-tag",
            className
        );

        return (
            <SemanticLabel className={classes} {...rest}>
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

