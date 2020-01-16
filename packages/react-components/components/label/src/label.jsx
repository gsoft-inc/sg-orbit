import { Label as SemanticLabel } from "semantic-ui-react";
import { bool, string } from "prop-types";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = ["attached", "corner", "floating", "horizontal", "icon", "image", "pointing", "prompt", "removeIcon", "ribbon"];

const propTypes = {
    /**
     * A label can be colorless. Use this variant if you need to customize the label.
     */
    naked: bool,
    /**
     * @ignore
     */
    className: string
};

const defaultProps = {
    naked: false
};

export function Label({ naked, className, children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const classes = mergeClasses(
        naked && "naked",
        className
    );

    return <SemanticLabel className={classes} {...props}>{children}</SemanticLabel>;
}

Label.Detail = SemanticLabel.Detail;
Label.Group = SemanticLabel.Group;

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;
