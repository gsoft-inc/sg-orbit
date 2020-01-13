import { Button as SemanticButton } from "semantic-ui-react";
import { bool, string } from "prop-types";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["animated", "attached", "color", "label", "labelPosition", "floated", "inverted"];

const propTypes = {
    /**
     * A button can be colorless. Use this variant if you need to customize the button.
     */
    naked: bool,
    /**
     * A button can be formatted without a background color until it's hovered.
     */
    ghost: bool,
    /**
     * @ignore
     */
    className: string
};

const defaultProps = {
    naked: false,
    ghost: false
};

export function Button({ naked, ghost, className, children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const classes = mergeClasses(
        naked && "naked",
        ghost && "ghost",
        className
    );

    return <SemanticButton className={classes} {...props}>{children}</SemanticButton>;
}

Button.Content = SemanticButton.Content;
Button.Group = SemanticButton.Group;
Button.Or = SemanticButton.Or;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
