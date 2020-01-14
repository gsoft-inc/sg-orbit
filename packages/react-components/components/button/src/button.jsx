import { Button as SemanticButton } from "semantic-ui-react";
import { bool, string } from "prop-types";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["animated", "attached", "color", "labelPosition", "floated", "inverted"];

const propTypes = {
    /**
     * A button can be colorless. Use this variant if you need to customize the button.
     */
    naked: bool,
    /**
     * A ghost button doesn't have a background color until it's hovered.
     */
    ghost: bool,
    /**
     * A button can be formatted to include a label _(overseed the original prop)_.
     */
    icon: bool,
    /**
     * A button can be formatted to include an icon _(overseed the original prop)_.
     */
    label: bool,
    /**
     * @ignore
     */
    className: string
};

const defaultProps = {
    naked: false,
    ghost: false,
    icon: false,
    label: false
};

export function Button({ naked, ghost, icon, label, className, children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const classes = mergeClasses(
        naked && "naked",
        ghost && "ghost",
        icon && "icon",
        label && "label",
        className
    );

    return <SemanticButton className={classes} {...props}>{children}</SemanticButton>;
}

Button.Content = SemanticButton.Content;
Button.Group = SemanticButton.Group;
Button.Or = SemanticButton.Or;

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
