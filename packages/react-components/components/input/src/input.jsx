import { Input as SemanticInput } from "semantic-ui-react";
import { bool, oneOf, string } from "prop-types";
import { isNil } from "lodash";
import { mergeClasses, throwWhenUnsupportedPropIsProvided } from "@orbit-ui/react-components-shared";

const UNSUPPORTED_PROPS = [];

const propTypes = {
    transparent: bool,
    /**
     * @ignore
     */
    className: string
};

const defaultProps = {
    transparent: false
};

export function Input({ transparent, className, children, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS);

    const classes = mergeClasses(
        transparent && "transparent",
        className
    );

    return <SemanticInput className={classes} {...props}>{children}</SemanticInput>;
}

// eslint-disable-next-line react/forbid-foreign-prop-types
if (!isNil(SemanticInput.propTypes)) {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    SemanticInput.propTypes.size = oneOf(["tiny", "small", "medium", "large"]);
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
