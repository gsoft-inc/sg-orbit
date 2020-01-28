import { Ref, Label as SemanticLabel } from "semantic-ui-react";
import { bool, func, node, object, oneOfType, oneOf, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["attached", "corner", "floating", "horizontal", "icon", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon"];

const propTypes = {
    /**
     * A label can be colorless. Use this variant if you need to customize the label.
     */
    naked: bool,
    /**
     * A label can contain a button.
     */
    button: bool,
    /**
     * A label can contain an icon.
     */
    icon: node,
    /**
     * A icon can be positionned.
     */
    iconPosition: oneOf(["right", "left"]),
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
    button: false
};

export function PureLabel({ naked, button, className, forwardedRef, icon, iconPosition, children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderLabel()}
            </Ref>
        );
    };

    const renderLabel = () => {
        const classes = mergeClasses(
            naked && "naked",
            button && "with-button",
            icon && "with-icon",
            iconPosition === "right" && "with-icon-right",
            className
        );

        return <SemanticLabel className={classes} {...props}>{icon && iconPosition !== "right" ? icon : null}{children}{icon && iconPosition === "right" ? icon : null}</SemanticLabel>;
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

