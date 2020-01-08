import { Button as SemanticButton } from "semantic-ui-react";
import { UnsupportedSemanticPropError, mergeClasses } from "@orbit-ui/react-components-shared";
import { bool } from "prop-types";
import { isNil } from "lodash";

const propTypes = {
    naked: bool
};

const defaultProps = {
    naked: false
};

function throwWhenUnsupportedPropIsProvided({ color }) {
    if (!isNil(color)) {
        throw new UnsupportedSemanticPropError("color");
    }
}

export function Button({ naked, className, children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props);

    const classes = mergeClasses(
        naked && "naked",
        className
    );

    return <SemanticButton className={classes} {...props}>{children}</SemanticButton>;
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
